const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

// Read app.js to extract pure helper functions
const appCode = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

function extractFn(code, fnName) {
  const match = code.match(new RegExp(`function ${fnName}\\s*\\([^)]*\\)\\s*\\{[\\s\\S]*?\\n\\}`));
  if (!match) throw new Error(`Function ${fnName} not found`);
  return new Function(`return ${match[0]}`)();
}

const extractRoutineFromAiText = extractFn(appCode, 'extractRoutineFromAiText');

test('extracts valid routine JSON from fenced markdown code block', () => {
  const aiMarkdown = `### AI 코칭 추천
오늘의 운동은 가슴과 삼두근을 타깃으로 하는 밀기(Push) 루틴입니다.
- 충분한 웜업 후 본세트에 진입하세요.

\`\`\`json
{
  "type": "FIT_TRACKER_ROUTINE",
  "v": 1,
  "data": [
    {
      "idx": 0,
      "n": "바벨 벤치프레스",
      "c": "가슴",
      "t": "strength",
      "rst": 120,
      "s": [
        {"w": 60, "tr": 10, "ar": 10, "tp": "working", "cmp": 0},
        {"w": 65, "tr": 8, "ar": 8, "tp": "working", "cmp": 0}
      ]
    },
    {
      "idx": 1,
      "n": "인클라인 덤벨 프레스",
      "c": "가슴",
      "t": "strength",
      "rst": 90,
      "s": [
        {"w": 20, "tr": 12, "ar": 12, "tp": "working", "cmp": 0}
      ]
    }
  ]
}
\`\`\`

오늘도 부상 없이 안전하게 득근하세요!`;

  const extracted = extractRoutineFromAiText(aiMarkdown);
  assert.ok(extracted, 'Should extract routine object');
  assert.equal(extracted.type, 'FIT_TRACKER_ROUTINE');
  assert.equal(extracted.data.length, 2);
  assert.equal(extracted.data[0].n, '바벨 벤치프레스');
  assert.equal(extracted.data[0].s[0].w, 60);
  assert.equal(extracted.data[0].s[0].tr, 10);
});

test('extracts routine JSON from raw text without markdown fence', () => {
  const rawAiText = `추천 운동입니다: {"type":"FIT_TRACKER_ROUTINE","v":1,"data":[{"idx":0,"n":"스쿼트","c":"하체","t":"strength","rst":120,"s":[{"w":80,"tr":10,"ar":10,"tp":"working","cmp":0}]}]}`;

  const extracted = extractRoutineFromAiText(rawAiText);
  assert.ok(extracted);
  assert.equal(extracted.data[0].n, '스쿼트');
  assert.equal(extracted.data[0].s[0].w, 80);
});

test('returns null when no valid routine JSON is present', () => {
  const plainText = `운동을 열심히 하셨군요! 오늘의 피드백을 전달해 드립니다. 수고하셨습니다.`;
  assert.equal(extractRoutineFromAiText(plainText), null);
  assert.equal(extractRoutineFromAiText(''), null);
  assert.equal(extractRoutineFromAiText(null), null);
});
