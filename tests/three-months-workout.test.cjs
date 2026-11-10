const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Read app.js
const appCode = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function extractFn(code, fnName) {
  const match = code.match(new RegExp(`function ${fnName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}`));
  if (!match) throw new Error(`Function ${fnName} not found`);
  return new Function(`return ${match[0]}`)();
}

const compressConsecutiveSetTokens = extractFn(appCode, 'compressConsecutiveSetTokens');
const calculateEstimated1RM = extractFn(appCode, 'calculateEstimated1RM');
const formatWorkoutNumber = extractFn(appCode, 'formatWorkoutNumber');
const isCardioExercise = extractFn(appCode, 'isCardioExercise');
const formatDateDisplay = extractFn(appCode, 'formatDateDisplay');

// Setup mock state for testing generateThreeMonthsWorkoutAnalysisPrompt
function createPromptGenerator(state) {
  const fnBody = `
    const state = ${JSON.stringify(state)};
    function getTodayString() { return "${state.currentDate || '2026-10-28'}"; }
    ${compressConsecutiveSetTokens.toString()}
    ${calculateEstimated1RM.toString()}
    ${formatWorkoutNumber.toString()}
    ${isCardioExercise.toString()}
    ${formatDateDisplay.toString()}
    ${extractFn(appCode, 'generateThreeMonthsWorkoutAnalysisPrompt').toString()}
    return generateThreeMonthsWorkoutAnalysisPrompt;
  `;
  return new Function(fnBody)();
}

test('compressConsecutiveSetTokens compresses identical consecutive sets', () => {
  const tokens = ['60kg×10', '60kg×10', '60kg×10', '70kg×8', '70kg×8', '80kg×5[F]'];
  const result = compressConsecutiveSetTokens(tokens);
  assert.equal(result, '60kg×10×3, 70kg×8×2, 80kg×5[F]');
});

test('compressConsecutiveSetTokens handles single or non-repeating sets', () => {
  assert.equal(compressConsecutiveSetTokens(['60kg×10']), '60kg×10');
  assert.equal(compressConsecutiveSetTokens(['60kg×10', '70kg×8', '80kg×6']), '60kg×10, 70kg×8, 80kg×6');
  assert.equal(compressConsecutiveSetTokens([]), '');
  assert.equal(compressConsecutiveSetTokens(null), '');
});

test('compressConsecutiveSetTokens handles bodyweight and warmup tags', () => {
  const tokens = ['[W]40kg×15', '[W]40kg×15', '맨몸×12', '맨몸×12', '맨몸×10'];
  const result = compressConsecutiveSetTokens(tokens);
  assert.equal(result, '[W]40kg×15×2, 맨몸×12×2, 맨몸×10');
});

test('generateThreeMonthsWorkoutAnalysisPrompt returns null when no workouts exist', () => {
  const state = {
    currentDate: '2026-10-28',
    workouts: {}
  };
  const generator = createPromptGenerator(state);
  assert.equal(generator(), null);
});

test('generateThreeMonthsWorkoutAnalysisPrompt filters out dates older than 3 months and formats prompt', () => {
  const state = {
    currentDate: '2026-10-28',
    workouts: {
      // 5 months ago (should be excluded)
      '2026-05-10': [
        {
          name: '벤치프레스',
          category: '가슴',
          sets: [{ weight: 50, actualReps: 10, type: 'working', completed: true }]
        }
      ],
      // 2.5 months ago (should be included)
      '2026-08-15': [
        {
          name: '벤치프레스',
          category: '가슴',
          sets: [
            { weight: 60, actualReps: 10, type: 'working', completed: true },
            { weight: 60, actualReps: 10, type: 'working', completed: true },
            { weight: 60, actualReps: 10, type: 'working', completed: true }
          ]
        },
        {
          name: '인클라인 덤벨프레스',
          category: '가슴',
          sets: [
            { weight: 20, actualReps: 12, type: 'working', completed: true },
            { weight: 20, actualReps: 12, type: 'working', completed: true }
          ]
        }
      ],
      // Yesterday (should be included)
      '2026-10-27': [
        {
          name: '벤치프레스',
          category: '가슴',
          sets: [
            { weight: 75, actualReps: 8, type: 'working', completed: true },
            { weight: 75, actualReps: 8, type: 'working', completed: true }
          ]
        },
        {
          name: '러닝',
          category: '유산소',
          type: 'cardio',
          sets: [
            { weight: 10, actualReps: 30, completed: true } // 10km/h * 30min = 5km
          ]
        }
      ]
    }
  };

  const generator = createPromptGenerator(state);
  const prompt = generator();

  assert.ok(prompt, 'Prompt should be generated');
  assert.ok(prompt.includes('FitTracker 최근 3개월 운동 기록 및 AI 심층 분석 요청'), 'Contains title');
  assert.ok(prompt.includes('2일 운동'), 'Correct workout day count');
  assert.ok(prompt.includes('[3개월 압축 운동 일지 (총 2일)]'), 'Contains total workout count section');
  assert.ok(prompt.includes('가슴'), 'Includes category');
  assert.ok(prompt.includes('유산소 누적 거리: 5km'), 'Includes cardio distance');
  assert.ok(!prompt.includes('2026-05-10'), 'Older date must be excluded');
  assert.ok(prompt.includes('60kg×10×3'), 'Includes compressed sets');
  assert.ok(prompt.includes('20kg×12×2'), 'Includes compressed dumbbell press sets');
  assert.ok(prompt.includes('75kg×8×2'), 'Includes compressed latest bench sets');
  assert.ok(prompt.includes('10km/h·30분'), 'Includes cardio set');
  assert.ok(prompt.includes('점진적 과부하(Progressive Overload) 분석'), 'Includes AI analysis questions');
});
