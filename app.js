/**
 * FitTracker Pro - Main Application Logic
 * Audio API, Rest Timer Engine with Fixed Bottom Bar Controls, Autocomplete Search with Hangul Chosung (초성) Matching,
 * Auto-Category Mapping, Presets, Multi-Exercise Graph & Streamlined Routine Code Token Generator/Importer
 */

function addDaysToDateString(dateString, amount) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + amount);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function getWeeklyDashboardDates() {
  const today = getTodayString();
  const todayTime = new Date(`${today}T00:00:00`).getTime();
  const workoutDates = Object.keys(state.workouts)
    .filter(date => Array.isArray(state.workouts[date]) && state.workouts[date].length > 0)
    .sort((a, b) => {
      const distanceA = Math.abs(new Date(`${a}T00:00:00`).getTime() - todayTime);
      const distanceB = Math.abs(new Date(`${b}T00:00:00`).getTime() - todayTime);
      return distanceA - distanceB || a.localeCompare(b);
    })
    .slice(0, 7);
  const selected = new Set(workoutDates);
  let futureOffset = 1;
  while (selected.size < 7) {
    selected.add(addDaysToDateString(today, futureOffset));
    futureOffset++;
  }
  return Array.from(selected).sort();
}

function generateWeeklyDashboardShareUrl() {
  const dates = getWeeklyDashboardDates();
  const data = dates.map(date => ({
    d: date,
    e: (state.workouts[date] || []).map((exercise, exerciseIndex) => ({
      i: exerciseIndex,
      n: exercise.name,
      c: exercise.category || '기타',
      t: exercise.type || (exercise.category === '유산소' ? 'cardio' : 'strength'),
      s: (exercise.sets || []).map(set => ({
        w: Number(set.weight) || 0,
        r: Number(set.targetReps) || 0,
        a: Number(set.actualReps) || 0,
        x: set.completed ? 1 : 0
      }))
    }))
  }));
  const payload = JSON.stringify({
    type: 'FIT_TRACKER_WEEKLY',
    v: 1,
    anchor: getTodayString(),
    scope: { from: dates[0], to: dates[dates.length - 1] },
    data
  });
  const routineEncoded = encodeRoutineString(payload);
  const weeklyCode = WEEKLY_CODE_PREFIX + routineEncoded.substring(ROUTINE_CODE_PREFIX.length);
  const url = new URL('weekly.html', window.location.href);
  url.searchParams.set('week', weeklyCode);
  return url.toString();
}

// Comprehensive Exercise & Equipment Database with Evidence-based Rest Seconds
const EXERCISE_DATABASE = [
  // 가슴 (Chest - 15종)
  { name: '벤치프레스', category: '가슴', weight: 60, reps: 12, restSeconds: 150 },
  { name: '인클라인 벤치프레스', category: '가슴', weight: 50, reps: 12, restSeconds: 120 },
  { name: '디클라인 벤치프레스', category: '가슴', weight: 55, reps: 12, restSeconds: 120 },
  { name: '덤벨 벤치프레스', category: '가슴', weight: 20, reps: 12, restSeconds: 90 },
  { name: '인클라인 덤벨프레스', category: '가슴', weight: 18, reps: 12, restSeconds: 90 },
  { name: '덤벨 플라이', category: '가슴', weight: 12, reps: 12, restSeconds: 60 },
  { name: '인클라인 덤벨 플라이', category: '가슴', weight: 10, reps: 12, restSeconds: 60 },
  { name: '체스트 프레스 머신', category: '가슴', weight: 40, reps: 12, restSeconds: 90 },
  { name: '인클라인 체스트프레스 머신', category: '가슴', weight: 35, reps: 12, restSeconds: 90 },
  { name: '와이드 체스트 프레스 머신', category: '가슴', weight: 40, reps: 12, restSeconds: 90 },
  { name: '펙덱 플라이', category: '가슴', weight: 30, reps: 12, restSeconds: 60 },
  { name: '케이블 크로스오버', category: '가슴', weight: 15, reps: 15, restSeconds: 60 },
  { name: '스미스머신 벤치프레스', category: '가슴', weight: 50, reps: 12, restSeconds: 120 },
  { name: '시티드 딥스 머신', category: '가슴', weight: 45, reps: 12, restSeconds: 90 },
  { name: '딥스', category: '가슴', weight: 0, reps: 12, restSeconds: 90 },
  { name: '푸쉬업', category: '가슴', weight: 0, reps: 15, restSeconds: 60 },

  // 등 (Back - 14종)
  { name: '렛풀다운', category: '등', weight: 45, reps: 12, restSeconds: 90 },
  { name: '시티드 케이블 로우', category: '등', weight: 40, reps: 12, restSeconds: 90 },
  { name: '풀업 (턱걸이)', category: '등', weight: 0, reps: 10, restSeconds: 90 },
  { name: '친업', category: '등', weight: 0, reps: 10, restSeconds: 90 },
  { name: '어시스트 풀업', category: '등', weight: 30, reps: 10, restSeconds: 90 },
  { name: '바벨 로우', category: '등', weight: 50, reps: 12, restSeconds: 120 },
  { name: '원암 덤벨 로우', category: '등', weight: 20, reps: 12, restSeconds: 90 },
  { name: '티바 로우', category: '등', weight: 35, reps: 12, restSeconds: 90 },
  { name: '체스트 서포티드 로우', category: '등', weight: 30, reps: 12, restSeconds: 90 },
  { name: '로우 로우 머신', category: '등', weight: 35, reps: 12, restSeconds: 90 },
  { name: '하이 로우 머신', category: '등', weight: 40, reps: 12, restSeconds: 90 },
  { name: '원암 렛풀다운', category: '등', weight: 20, reps: 12, restSeconds: 60 },
  { name: '암 풀다운', category: '등', weight: 25, reps: 12, restSeconds: 60 },
  { name: '백 익스텐션', category: '등', weight: 0, reps: 15, restSeconds: 60 },

  // 하체 (Legs & Glutes - 17종)
  { name: '스쿼트', category: '하체', weight: 80, reps: 12, restSeconds: 180 },
  { name: '프론트 스쿼트', category: '하체', weight: 60, reps: 10, restSeconds: 150 },
  { name: '스미스머신 스쿼트', category: '하체', weight: 70, reps: 12, restSeconds: 150 },
  { name: '핵스쿼트', category: '하체', weight: 60, reps: 12, restSeconds: 150 },
  { name: 'V-스쿼트', category: '하체', weight: 60, reps: 12, restSeconds: 150 },
  { name: '펜듈럼 스쿼트', category: '하체', weight: 40, reps: 12, restSeconds: 150 },
  { name: '벨트 스쿼트', category: '하체', weight: 60, reps: 12, restSeconds: 120 },
  { name: '레그프레스', category: '하체', weight: 100, reps: 12, restSeconds: 120 },
  { name: '레그 익스텐션', category: '하체', weight: 35, reps: 15, restSeconds: 90 },
  { name: '레그컬', category: '하체', weight: 30, reps: 15, restSeconds: 90 },
  { name: '라잉 레그컬', category: '하체', weight: 30, reps: 12, restSeconds: 90 },
  { name: '이너싸이 (어덕션)', category: '하체', weight: 30, reps: 15, restSeconds: 60 },
  { name: '아웃싸이 (어브덕션)', category: '하체', weight: 35, reps: 15, restSeconds: 60 },
  { name: '힙 쓰러스터', category: '하체', weight: 60, reps: 12, restSeconds: 120 },
  { name: '글루트 킥백 머신', category: '하체', weight: 25, reps: 15, restSeconds: 60 },
  { name: '런지', category: '하체', weight: 12, reps: 12, restSeconds: 90 },
  { name: '불가리안 스플릿 스쿼트', category: '하체', weight: 10, reps: 10, restSeconds: 90 },
  { name: '카프 레이즈', category: '하체', weight: 40, reps: 20, restSeconds: 60 },

  // 어깨 (Shoulders - 11종)
  { name: '오버헤드 프레스 (OHP)', category: '어깨', weight: 40, reps: 10, restSeconds: 150 },
  { name: '덤벨 숄더프레스', category: '어깨', weight: 16, reps: 12, restSeconds: 90 },
  { name: '숄더프레스 머신', category: '어깨', weight: 30, reps: 12, restSeconds: 120 },
  { name: '아놀드 프레스', category: '어깨', weight: 14, reps: 12, restSeconds: 90 },
  { name: '사이드 레터럴 레이즈', category: '어깨', weight: 8, reps: 15, restSeconds: 60 },
  { name: '사이드 레터럴 레이즈 머신', category: '어깨', weight: 20, reps: 15, restSeconds: 60 },
  { name: '케이블 사이드 레터럴 레이즈', category: '어깨', weight: 7.5, reps: 15, restSeconds: 60 },
  { name: '프론트 레이즈', category: '어깨', weight: 7, reps: 12, restSeconds: 60 },
  { name: '페이스 풀', category: '어깨', weight: 20, reps: 15, restSeconds: 60 },
  { name: '리어 델토이드 머신', category: '어깨', weight: 25, reps: 15, restSeconds: 60 },
  { name: '슈러그', category: '어깨', weight: 60, reps: 15, restSeconds: 60 },

  // 팔 (Arms - 11종)
  { name: '바벨 컬', category: '팔', weight: 25, reps: 12, restSeconds: 60 },
  { name: '덤벨 컬', category: '팔', weight: 12, reps: 12, restSeconds: 60 },
  { name: '해머 컬', category: '팔', weight: 12, reps: 12, restSeconds: 60 },
  { name: '인클라인 덤벨 컬', category: '팔', weight: 10, reps: 12, restSeconds: 60 },
  { name: '베이지안 컬', category: '팔', weight: 10, reps: 12, restSeconds: 60 },
  { name: '리버스 컬', category: '팔', weight: 15, reps: 12, restSeconds: 60 },
  { name: '바이셉스 컬 머신', category: '팔', weight: 25, reps: 12, restSeconds: 60 },
  { name: '프리처 컬', category: '팔', weight: 20, reps: 12, restSeconds: 60 },
  { name: '트라이셉스 푸쉬다운', category: '팔', weight: 25, reps: 15, restSeconds: 60 },
  { name: '스컬 크러셔 (라잉 익스텐션)', category: '팔', weight: 20, reps: 12, restSeconds: 60 },
  { name: '오버헤드 트라이셉스 익스텐션', category: '팔', weight: 15, reps: 12, restSeconds: 60 },

  // 복근/코어 (Core & Abs - 6종)
  { name: '플랭크', category: '복근/코어', weight: 0, reps: 60, restSeconds: 45 },
  { name: '크런치', category: '복근/코어', weight: 0, reps: 20, restSeconds: 45 },
  { name: '앱도미널 머신', category: '복근/코어', weight: 35, reps: 15, restSeconds: 45 },
  { name: '행잉 레그레이즈', category: '복근/코어', weight: 0, reps: 15, restSeconds: 45 },
  { name: '케이블 크런치', category: '복근/코어', weight: 30, reps: 15, restSeconds: 45 },
  { name: '토르소 로테이션 머신', category: '복근/코어', weight: 25, reps: 15, restSeconds: 45 },

  // 전신 (Full Body - 7종)
  { name: '데드리프트', category: '전신', weight: 100, reps: 8, restSeconds: 180 },
  { name: '루마니안 데드리프트', category: '전신', weight: 80, reps: 10, restSeconds: 120 },
  { name: '스모 데드리프트', category: '전신', weight: 100, reps: 8, restSeconds: 180 },
  { name: '트랩바 데드리프트', category: '전신', weight: 100, reps: 8, restSeconds: 180 },
  { name: '랜드마인 프레스', category: '전신', weight: 20, reps: 12, restSeconds: 90 },
  { name: '케틀벨 스윙', category: '전신', weight: 16, reps: 20, restSeconds: 60 },
  { name: '파워 클린', category: '전신', weight: 50, reps: 5, restSeconds: 180 },

  // 유산소 (Cardio - 8종)
  { name: '런닝머신', category: '유산소', type: 'cardio', weight: 8.5, reps: 20, restSeconds: 30 },
  { name: '사이클', category: '유산소', type: 'cardio', weight: 15.0, reps: 30, restSeconds: 30 },
  { name: '천국의 계단 (스텝밀)', category: '유산소', type: 'cardio', weight: 8.0, reps: 15, restSeconds: 30 },
  { name: '아크 트레이너', category: '유산소', type: 'cardio', weight: 15.0, reps: 20, restSeconds: 30 },
  { name: '스키에르그', category: '유산소', type: 'cardio', weight: 6.0, reps: 15, restSeconds: 30 },
  { name: '에어바이크', category: '유산소', type: 'cardio', weight: 10.0, reps: 15, restSeconds: 30 },
  { name: '일립티컬', category: '유산소', type: 'cardio', weight: 10.0, reps: 20, restSeconds: 30 },
  { name: '로잉머신', category: '유산소', type: 'cardio', weight: 2.0, reps: 15, restSeconds: 30 }
];

// Merge expanded 168-item EQUIPMENT_CATALOG into EXERCISE_DATABASE for unified lookup
if (typeof EQUIPMENT_CATALOG !== 'undefined' && Array.isArray(EQUIPMENT_CATALOG)) {
  EQUIPMENT_CATALOG.forEach(item => {
    const existing = EXERCISE_DATABASE.find(db => db.name.toLowerCase() === item.name.toLowerCase());
    if (existing) {
      existing.id = item.id;
      existing.aliases = item.aliases || [];
      existing.equipCategory = item.equipCategory;
      existing.alternatives = item.alternatives || [];
    } else {
      EXERCISE_DATABASE.push({
        id: item.id,
        name: item.name,
        category: item.category,
        type: item.category === '유산소' ? 'cardio' : 'strength',
        weight: item.defaultWeight,
        reps: item.defaultReps,
        restSeconds: item.restSeconds,
        aliases: item.aliases || [],
        equipCategory: item.equipCategory,
        alternatives: item.alternatives || []
      });
    }
  });
}

function getDefaultRestForExercise(name, category) {
  const match = EXERCISE_DATABASE.find(item => item.name === name);
  if (match && match.restSeconds) return match.restSeconds;
  if (category === '유산소') return 30;
  if (category === '복근/코어') return 45;
  if (category === '팔' || category === '어깨') return 60;
  if (category === '등' || category === '가슴') return 90;
  if (category === '하체' || category === '전신') return 120;
  return 90;
}

// Hangul Chosung (초성) List
const CHOSUNG_LIST = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

function getHangulChosung(str) {
  if (!str) return '';
  let result = '';
  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const chosungIdx = Math.floor((code - 0xac00) / (21 * 28));
      result += CHOSUNG_LIST[chosungIdx];
    } else {
      result += str.charAt(i);
    }
  }
  return result;
}

// Default Presets
const defaultPresets = [
  { name: '벤치프레스', category: '가슴', weight: 60, reps: 12, sets: 3, restSeconds: 150 },
  { name: '스쿼트', category: '하체', weight: 80, reps: 12, sets: 3, restSeconds: 180 },
  { name: '데드리프트', category: '전신', weight: 100, reps: 10, sets: 3, restSeconds: 180 },
  { name: '렛풀다운', category: '등', weight: 45, reps: 12, sets: 3, restSeconds: 90 },
  { name: '숄더프레스', category: '어깨', weight: 30, reps: 12, sets: 3, restSeconds: 120 },
  { name: '덤벨 컬', category: '팔', weight: 12, reps: 12, sets: 3, restSeconds: 60 },
  { name: '풀업', category: '등', weight: 0, reps: 10, sets: 3, restSeconds: 90 },
  { name: '친업', category: '등', weight: 0, reps: 10, sets: 3, restSeconds: 90 },
  { name: '풀다운', category: '등', weight: 45, reps: 12, sets: 3, restSeconds: 90 },
  { name: '러닝', category: '유산소', type: 'cardio', weight: 9.0, reps: 20, sets: 1, restSeconds: 30 },
  { name: '사이클', category: '유산소', type: 'cardio', weight: 15.0, reps: 30, sets: 1, restSeconds: 30 }
];

// Helper to check if an exercise is Cardio/Running
function isCardioExercise(ex) {
  if (!ex) return false;
  return ex.category === '유산소' || ex.type === 'cardio' || (ex.name && (ex.name.includes('러닝') || ex.name.includes('사이클') || ex.name.includes('런닝')));
}

function isRunningExercise(ex) {
  return Boolean(ex?.name && (ex.name.includes('러닝') || ex.name.includes('런닝')));
}

// Global State
const state = {
  currentDate: getTodayString(),
  workouts: {}, // Schema: { 'YYYY-MM-DD': [ { id, name, category, type, collapsed, sets: [...] } ] }
  customPresets: [], // Stores user-created custom preset labels
  deletedDates: [], // Dates explicitly removed locally and pending cloud deletion
  soundEnabled: true,
  selectedExercisesForGraph: [], // Multi-select array of exercise names for graph comparison
  favoriteExercises: [], // User-bookmarked favorite exercises
  graphPeriod: 'daily', // 'daily' | 'monthly'

  // Fixed Bottom Rest Timer State
  timer: {
    intervalId: null,
    defaultSeconds: 30,
    totalSeconds: 30,
    remainingSeconds: 30,
    status: 'idle', // 'idle' | 'running' | 'paused'
    hasBeeped10s: false
  }
};

const REST_TIMER_MIN_SECONDS = 30;
const REST_TIMER_MAX_SECONDS = 180;
const REST_TIMER_STEP_SECONDS = 10;

function normalizeRestTimerDuration(seconds) {
  const parsedSeconds = Number(seconds);
  if (!Number.isFinite(parsedSeconds)) return REST_TIMER_MIN_SECONDS;
  const steppedSeconds = Math.round(parsedSeconds / REST_TIMER_STEP_SECONDS) * REST_TIMER_STEP_SECONDS;
  return Math.min(REST_TIMER_MAX_SECONDS, Math.max(REST_TIMER_MIN_SECONDS, steppedSeconds));
}

let deferredInstallPrompt = null;

function isNativeAppWebView() {
  const userAgent = navigator.userAgent || '';
  const isAndroidWebView = /\bwv\b/.test(userAgent);
  const hasIosNativeBridge = Boolean(window.webkit?.messageHandlers?.timerVibration);
  return isAndroidWebView || hasIosNativeBridge;
}

function isStandaloneWebApp() {
  return window.matchMedia?.('(display-mode: standalone)').matches
    || navigator.standalone === true;
}

function isIosSafariBrowser() {
  const userAgent = navigator.userAgent || '';
  const isIos = /iPhone|iPad|iPod/i.test(userAgent);
  const isOtherIosBrowser = /CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);
  return isIos && /Safari/i.test(userAgent) && !isOtherIosBrowser;
}

function updateInstallAppButton() {
  const button = document.getElementById('installAppBtn');
  if (!button) return;

  const canOfferInstall = !isNativeAppWebView()
    && !isStandaloneWebApp()
    && (Boolean(deferredInstallPrompt) || isIosSafariBrowser());
  button.classList.toggle('hidden', !canOfferInstall);
}

async function installWebApp() {
  if (deferredInstallPrompt) {
    deferredInstallPrompt.prompt();
    await deferredInstallPrompt.userChoice;
    deferredInstallPrompt = null;
    updateInstallAppButton();
    return;
  }

  if (isIosSafariBrowser()) {
    alert('Safari 하단의 공유 버튼을 누른 뒤 “홈 화면에 추가”를 선택해 주세요.');
  }
}

if (window.addEventListener) {
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
    updateInstallAppButton();
  });

  window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    updateInstallAppButton();
  });
}

// Web Audio API Synth Engine
let audioCtx = null;

function initAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

/**
 * Play synthesizer beep sounds
 * @param {number} type - 1: strong 10s warning, 2: strong rest-complete chime
 */
function playBeep(type = 1) {
  if (!state.soundEnabled) return;
  initAudioContext();
  if (!audioCtx) return;

  const now = audioCtx.currentTime;

  const playTone = (frequency, delay, duration, volume, oscillatorType = 'sine') => {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = oscillatorType;
    osc.frequency.setValueAtTime(frequency, now + delay);

    gain.gain.setValueAtTime(0.001, now + delay);
    gain.gain.exponentialRampToValueAtTime(volume, now + delay + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.001, now + delay + duration);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start(now + delay);
    osc.stop(now + delay + duration + 0.02);
  };

  if (type === 1) {
    // Three rising, slightly longer pulses cut through gym background noise.
    [
      [880, 0],
      [1047, 0.16],
      [1319, 0.32]
    ].forEach(([frequency, delay]) => {
      playTone(frequency, delay, 0.2, 0.48, 'triangle');
    });
  } else if (type === 2) {
    // A distinct four-note finish chime makes the end of rest unmistakable.
    [
      [1175, 0],
      [1397, 0.17],
      [1760, 0.34],
      [2093, 0.52]
    ].forEach(([frequency, delay], index) => {
      playTone(frequency, delay, index === 3 ? 0.34 : 0.2, 0.5, 'triangle');
    });
  }
}

function playTimerVibration(type = 1) {
  if (!state.soundEnabled) return;

  const pattern = type === 1
    ? [120, 80, 120, 80, 120]
    : [250, 120, 250, 120, 450];

  if (navigator.vibrate) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
    return;
  }

  const iosVibrationBridge = window.webkit?.messageHandlers?.timerVibration;
  if (iosVibrationBridge) {
    try { iosVibrationBridge.postMessage(type); } catch (e) {}
  }
}

// Screen Wake Lock API to prevent screen timeout during workout
let screenWakeLock = null;
async function requestScreenWakeLock() {
  if ('wakeLock' in navigator && document.visibilityState === 'visible') {
    try {
      if (!screenWakeLock) {
        screenWakeLock = await navigator.wakeLock.request('screen');
        screenWakeLock.addEventListener('release', () => {
          screenWakeLock = null;
        });
      }
    } catch (err) {
      // Non-critical, ignore if unsupported or denied
    }
  }
}

document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    requestScreenWakeLock();
  }
});

// Scientific Estimated 1RM Calculator (Epley Formula)
function calculateEstimated1RM(weight, reps) {
  const w = Number(weight) || 0;
  const r = Number(reps) || 0;
  if (w <= 0 || r <= 0) return 0;
  if (r === 1) return w;
  return Math.round(w * (1 + r / 30));
}

// Previous Session Insight (Progressive Overload Advisor)
function getPreviousSessionInsight(exerciseName, currentDate) {
  const allDates = Object.keys(state.workouts).sort();
  const pastDates = allDates.filter(d => d < currentDate && Array.isArray(state.workouts[d]));

  for (let i = pastDates.length - 1; i >= 0; i--) {
    const pastWorkoutList = state.workouts[pastDates[i]];
    const matchedEx = pastWorkoutList.find(e => e.name === exerciseName && Array.isArray(e.sets) && e.sets.some(s => s.completed));
    if (matchedEx) {
      const validCompletedSets = matchedEx.sets.filter(s => s.completed && s.type !== 'warmup');
      if (validCompletedSets.length > 0) {
        const maxWeight = Math.max(...validCompletedSets.map(s => Number(s.weight) || 0));
        const maxReps = Math.max(...validCompletedSets.map(s => Number(s.actualReps) || Number(s.targetReps) || 0));
        const allTargetReached = validCompletedSets.every(s => (Number(s.actualReps) || 0) >= (Number(s.targetReps) || 12));

        let recommendation = '';
        if (allTargetReached && validCompletedSets.length >= 3) {
          recommendation = `🔥 지난 세션(${formatDateDisplay(pastDates[i]).slice(5, 12)}) 전 세트 달성! 오늘 첫 세트는 +2.5kg 증량에 도전해 보세요.`;
        } else {
          recommendation = `💡 지난 세션(${formatDateDisplay(pastDates[i]).slice(5, 12)}): 최고 ${maxWeight}kg × ${maxReps}회 (${validCompletedSets.length}세트 완료)`;
        }

        return {
          date: pastDates[i],
          maxWeight,
          maxReps,
          setsCount: validCompletedSets.length,
          allTargetReached,
          recommendation
        };
      }
    }
  }
  return null;
}

// Helper Date Functions
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDateDisplay(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number);
  const dateObj = new Date(y, m - 1, d);
  const daysKR = ['일', '월', '화', '수', '목', '금', '토'];
  const dayName = daysKR[dateObj.getDay()];
  return `${y}. ${String(m).padStart(2, '0')}. ${String(d).padStart(2, '0')} (${dayName})`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Ensure exercise sets array remains clean, typed & indexed 1..N
function sanitizeExerciseSets(ex) {
  if (!ex || !Array.isArray(ex.sets)) return;
  if (!ex.restSeconds) {
    ex.restSeconds = getDefaultRestForExercise(ex.name, ex.category);
  }
  ex.sets.forEach((s, idx) => {
    s.setNumber = idx + 1;
    if (!s.type) s.type = 'working'; // 'working' | 'warmup' | 'failure' | 'drop'
  });
  ex.targetSets = ex.sets.length;
}

// LocalStorage Management
function loadState() {
  const savedData = localStorage.getItem('fit_tracker_workouts_v1');
  if (savedData) {
    try {
      state.workouts = JSON.parse(savedData);
      Object.values(state.workouts).forEach(list => {
        if (Array.isArray(list)) {
          list.forEach(sanitizeExerciseSets);
        }
      });
    } catch (e) {
      console.error('Failed to parse saved workouts:', e);
      state.workouts = {};
    }
  }

  const savedPresets = localStorage.getItem('fit_tracker_custom_presets_v1');
  if (savedPresets) {
    try {
      state.customPresets = JSON.parse(savedPresets);
    } catch (e) {
      console.error('Failed to parse custom presets:', e);
      state.customPresets = [];
    }
  }

  const savedSound = localStorage.getItem('fit_tracker_sound_enabled');
  if (savedSound !== null) {
    state.soundEnabled = savedSound === 'true';
  }

  const savedDeletedDates = localStorage.getItem('fit_tracker_deleted_dates_v1');
  if (savedDeletedDates) {
    try {
      const parsedDeletedDates = JSON.parse(savedDeletedDates);
      state.deletedDates = Array.isArray(parsedDeletedDates) ? parsedDeletedDates : [];
    } catch (e) {
      state.deletedDates = [];
    }
  }

  const savedRestSeconds = Number(localStorage.getItem('fit_tracker_rest_seconds'));
  if (Number.isFinite(savedRestSeconds)) {
    const normalizedSeconds = normalizeRestTimerDuration(savedRestSeconds);
    state.timer.defaultSeconds = normalizedSeconds;
    state.timer.totalSeconds = normalizedSeconds;
    state.timer.remainingSeconds = normalizedSeconds;
  }

  const savedFavorites = localStorage.getItem('fit_tracker_favorite_exercises_v1');
  if (savedFavorites) {
    try {
      const parsedFavs = JSON.parse(savedFavorites);
      state.favoriteExercises = Array.isArray(parsedFavs) ? parsedFavs : [];
    } catch (e) {
      state.favoriteExercises = [];
    }
  }
}

function saveState() {
  state.deletedDates = (state.deletedDates || []).filter(dateStr => {
    const exercises = state.workouts[dateStr];
    return !Array.isArray(exercises) || exercises.length === 0;
  });
  if (window.markGymWorkoutChanges) {
    let previous = {};
    try { previous = JSON.parse(localStorage.getItem('fit_tracker_workouts_v1') || '{}'); } catch {}
    window.markGymWorkoutChanges(previous, state.workouts);
  }
  localStorage.setItem('fit_tracker_workouts_v1', JSON.stringify(state.workouts));
  localStorage.setItem('fit_tracker_custom_presets_v1', JSON.stringify(state.customPresets));
  localStorage.setItem('fit_tracker_favorite_exercises_v1', JSON.stringify(state.favoriteExercises || []));
  localStorage.setItem('fit_tracker_deleted_dates_v1', JSON.stringify(state.deletedDates));
  localStorage.setItem('fit_tracker_sound_enabled', String(state.soundEnabled));
  localStorage.setItem('fit_tracker_rest_seconds', String(state.timer.defaultSeconds));

  if (typeof debouncedCloudSync === 'function') {
    debouncedCloudSync();
  }
  if (typeof syncWorkoutsToAdminServer === 'function') {
    syncWorkoutsToAdminServer();
  }
  window.Ouwan?.changed();
}

// Dynamic Preset Chips Renderer
function renderPresetChips() {
  const container = document.getElementById('presetChips');
  if (!container) return;

  container.innerHTML = '';

  const combined = [...defaultPresets];
  state.customPresets.forEach(cp => {
    if (!combined.some(dp => dp.name.trim().toLowerCase() === cp.name.trim().toLowerCase())) {
      combined.push(cp);
    }
  });

  combined.forEach(preset => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'preset-chip';
    chip.textContent = preset.name;

    chip.dataset.name = preset.name;
    chip.dataset.cat = preset.category || '가슴';
    chip.dataset.weight = preset.weight || (preset.category === '유산소' ? 9.0 : 40);
    chip.dataset.reps = preset.reps || (preset.category === '유산소' ? 20 : 12);

    chip.addEventListener('click', () => {
      document.getElementById('exerciseNameInput').value = preset.name;
      document.getElementById('exerciseCategorySelect').value = preset.category || '가슴';
      updateAddFormLabels(preset.category);

      if (preset.weight !== undefined) document.getElementById('defaultWeightInput').value = preset.weight;
      if (preset.reps !== undefined) document.getElementById('defaultRepsInput').value = preset.reps;

      const restSec = preset.restSeconds || getDefaultRestForExercise(preset.name, preset.category);
      const restInput = document.getElementById('defaultRestInput');
      if (restInput) restInput.value = restSec;
      updateRestPresetChips(restSec);
      
      const dropdown = document.getElementById('exerciseHintDropdown');
      if (dropdown) dropdown.classList.add('hidden');
    });

    container.appendChild(chip);
  });
}

function updateAddFormLabels(category) {
  const labelWeight = document.getElementById('labelWeightOrSpeed');
  const labelReps = document.getElementById('labelRepsOrDuration');
  const weightInput = document.getElementById('defaultWeightInput');
  const repsInput = document.getElementById('defaultRepsInput');

  if (category === '유산소') {
    if (labelWeight) labelWeight.textContent = '기본 속도 (km/h)';
    if (labelReps) labelReps.textContent = '목표 시간 (분)';
    if (weightInput && Number(weightInput.value) === 40) weightInput.value = 9.0;
    if (repsInput && Number(repsInput.value) === 12) repsInput.value = 20;
  } else {
    if (labelWeight) labelWeight.textContent = '기본 무게 (kg)';
    if (labelReps) labelReps.textContent = '목표 횟수 (회)';
  }
}

// Helper: Escape RegExp special characters
function escapeRegExp(str) {
  return String(str).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Helper: Highlight matching substring safely with HTML escaping
function highlightSearchText(text, query) {
  const safeText = escapeHtml(text || '');
  const trimmed = (query || '').trim();
  if (!trimmed) return safeText;

  // Check if query maps to a synonym
  const cleanQuery = trimmed.toLowerCase().replace(/\s+/g, '');
  const synonymTarget = (typeof EXERCISE_SYNONYMS !== 'undefined' && EXERCISE_SYNONYMS[cleanQuery])
    ? EXERCISE_SYNONYMS[cleanQuery]
    : null;

  const terms = [trimmed];
  if (synonymTarget && synonymTarget !== trimmed) terms.push(synonymTarget);

  for (const term of terms) {
    const escapedTerm = escapeHtml(term);
    if (!escapedTerm) continue;
    const regex = new RegExp(`(${escapeRegExp(escapedTerm)})`, 'gi');
    if (regex.test(safeText)) {
      return safeText.replace(regex, '<mark class="enc-highlight">$1</mark>');
    }
  }
  return safeText;
}

// Unified Smart Search Matcher (Name, English, Muscles, Equipment, Chosung, Aliases & Synonyms)
function matchExerciseSearch(item, rawQuery) {
  const trimmed = (rawQuery || '').trim();
  if (!trimmed) return { matched: true, matchedAlias: null };

  const lowerSearch = trimmed.toLowerCase();
  const cleanSearch = lowerSearch.replace(/\s+/g, '');
  const queryChosung = getHangulChosung(trimmed);
  const cleanChosung = queryChosung.replace(/\s+/g, '');

  const nameLower = (item.name || '').toLowerCase();
  const cleanName = nameLower.replace(/\s+/g, '');
  const itemChosung = getHangulChosung(item.name || '');
  const cleanItemChosung = itemChosung.replace(/\s+/g, '');

  // 1. Direct name or Chosung match
  if (nameLower.includes(lowerSearch) || cleanName.includes(cleanSearch)) {
    return { matched: true, matchedAlias: null };
  }
  if (itemChosung.includes(queryChosung) || (cleanChosung && cleanItemChosung.includes(cleanChosung))) {
    return { matched: true, matchedAlias: null };
  }

  // 2. English name, target muscles, or equipmentType match
  const engLower = (item.englishName || '').toLowerCase();
  const musclesLower = (item.targetMuscles || '').toLowerCase();
  const equipLower = (item.equipmentType || '').toLowerCase();
  if (engLower.includes(lowerSearch) || musclesLower.includes(lowerSearch) || equipLower.includes(lowerSearch)) {
    return { matched: true, matchedAlias: null };
  }

  // 3. Item aliases (slang / shorthand) & alias Chosung match
  if (Array.isArray(item.aliases)) {
    for (const alias of item.aliases) {
      const aliasLower = alias.toLowerCase();
      const cleanAlias = aliasLower.replace(/\s+/g, '');
      const aliasChosung = getHangulChosung(alias).replace(/\s+/g, '');
      if (
        aliasLower.includes(lowerSearch) ||
        cleanAlias.includes(cleanSearch) ||
        (cleanChosung && aliasChosung.includes(cleanChosung))
      ) {
        return { matched: true, matchedAlias: alias };
      }
    }
  }

  // 4. Global EXERCISE_SYNONYMS dictionary expansion
  if (typeof EXERCISE_SYNONYMS !== 'undefined') {
    for (const [slang, canonical] of Object.entries(EXERCISE_SYNONYMS)) {
      if (slang.includes(cleanSearch) || cleanSearch.includes(slang)) {
        const canonLower = canonical.toLowerCase();
        if (nameLower.includes(canonLower) || cleanName.includes(canonLower.replace(/\s+/g, ''))) {
          return { matched: true, matchedAlias: slang };
        }
      }
    }
  }

  return { matched: false, matchedAlias: null };
}

function getEquipCategoryShortLabel(equipCategory) {
  if (typeof EQUIPMENT_CATEGORIES !== 'undefined' && Array.isArray(EQUIPMENT_CATEGORIES)) {
    const found = EQUIPMENT_CATEGORIES.find(c => c.id === equipCategory);
    if (found) return found.shortLabel || found.label;
  }
  const map = {
    barbell: '바벨·스미스',
    dumbbell: '덤벨',
    pin_machine: '핀 머신',
    plate_loaded: '해머·플레이트',
    cable: '케이블',
    bodyweight: '맨몸·소도구',
    cardio: '유산소 기구'
  };
  return map[equipCategory] || '';
}

// Autocomplete Hint Dropdown Search Engine
function renderExerciseHintDropdown(query) {
  const dropdown = document.getElementById('exerciseHintDropdown');
  if (!dropdown) return;

  const trimmed = query.trim();
  if (!trimmed) {
    dropdown.innerHTML = '';
    dropdown.classList.add('hidden');
    return;
  }

  const catalogSource = (typeof EQUIPMENT_CATALOG !== 'undefined' && Array.isArray(EQUIPMENT_CATALOG))
    ? EQUIPMENT_CATALOG
    : EXERCISE_DATABASE;

  const matchedResults = [];
  catalogSource.forEach(item => {
    const res = matchExerciseSearch(item, trimmed);
    if (res.matched) {
      matchedResults.push({ item, matchedAlias: res.matchedAlias });
    }
  });

  if (matchedResults.length === 0) {
    dropdown.innerHTML = '';
    dropdown.classList.add('hidden');
    return;
  }

  dropdown.innerHTML = '';
  matchedResults.slice(0, 15).forEach(({ item, matchedAlias }) => {
    const div = document.createElement('div');
    div.className = 'hint-item';
    const aliasHtml = matchedAlias ? ` <span class="enc-alias-match-badge">#${escapeHtml(matchedAlias)}</span>` : '';
    div.innerHTML = `
      <span>${highlightSearchText(item.name, trimmed)}${aliasHtml}</span>
      <span class="hint-cat-tag">${escapeHtml(item.category)}</span>
    `;

    div.addEventListener('click', () => {
      const input = document.getElementById('exerciseNameInput');
      const catSelect = document.getElementById('exerciseCategorySelect');
      const weightInput = document.getElementById('defaultWeightInput');
      const repsInput = document.getElementById('defaultRepsInput');

      input.value = item.name;
      catSelect.value = item.category;
      updateAddFormLabels(item.category);

      const defaultW = item.defaultWeight !== undefined ? item.defaultWeight : item.weight;
      const defaultR = item.defaultReps !== undefined ? item.defaultReps : item.reps;
      if (defaultW !== undefined && weightInput) weightInput.value = defaultW;
      if (defaultR !== undefined && repsInput) repsInput.value = defaultR;

      const restSec = item.restSeconds || getDefaultRestForExercise(item.name, item.category);
      const restInput = document.getElementById('defaultRestInput');
      if (restInput) restInput.value = restSec;
      updateRestPresetChips(restSec);

      dropdown.innerHTML = '';
      dropdown.classList.add('hidden');
    });

    dropdown.appendChild(div);
  });

  dropdown.classList.remove('hidden');
}

// ==============================================================
// Pure Daily Total Volume Growth Chart Engine
// ==============================================================
let exerciseChart = null;

function isWorkoutSetCompleted(set) {
  return Boolean(set && (
    set.completed === true
    || set.completed === 1
    || set.completed === 'true'
    || set.isCompleted === true
  ));
}

function getWorkoutSetVolume(set, usePlannedReps = false) {
  if (!set) return 0;
  const weight = Number(set.weight) || 0;
  const reps = usePlannedReps
    ? (Number(set.actualReps) || Number(set.targetReps) || 0)
    : (Number(set.actualReps) || 0);
  return weight > 0 && reps > 0 ? weight * reps : 0;
}

function getTodayVolumeProjection() {
  const exercises = state.workouts[getTodayString()] || [];
  let completedSets = 0;
  let pendingSets = 0;
  let completedVolume = 0;
  let pendingVolume = 0;

  exercises.forEach(exercise => {
    if (!exercise || !Array.isArray(exercise.sets)) return;
    exercise.sets.forEach(set => {
      if (!set) return;
      if (isWorkoutSetCompleted(set)) {
        completedSets++;
        if (!isCardioExercise(exercise) && set.type !== 'warmup') completedVolume += getWorkoutSetVolume(set);
      } else {
        pendingSets++;
        if (!isCardioExercise(exercise) && set.type !== 'warmup') pendingVolume += getWorkoutSetVolume(set, true);
      }
    });
  });

  return {
    completedSets,
    pendingSets,
    totalSets: completedSets + pendingSets,
    completedVolume: Math.round(completedVolume),
    pendingVolume: Math.round(pendingVolume),
    projectedVolume: Math.round(completedVolume + pendingVolume)
  };
}

function getGraphPeriods() {
  const sortedDates = Object.keys(state.workouts).sort();
  const today = getTodayString();

  const validDates = sortedDates.filter(dateKey => {
    const list = state.workouts[dateKey];
    if (!Array.isArray(list) || list.length === 0) return false;

    return list.some(ex => {
      if (!ex || !Array.isArray(ex.sets)) return false;
      return ex.sets.some(set => isWorkoutSetCompleted(set) || (dateKey === today && set));
    });
  });

  if (state.graphPeriod !== 'monthly') {
    return validDates.map(dateKey => {
      const [, month, day] = dateKey.split('-');
      return { label: `${month}/${day}`, fullLabel: dateKey, dates: [dateKey] };
    });
  }

  const monthGroups = new Map();
  validDates.forEach(dateKey => {
    const monthKey = dateKey.slice(0, 7);
    if (!monthGroups.has(monthKey)) monthGroups.set(monthKey, []);
    monthGroups.get(monthKey).push(dateKey);
  });

  return Array.from(monthGroups, ([monthKey, dates]) => {
    const [year, month] = monthKey.split('-');
    return { label: `${year}.${month}`, fullLabel: `${year}년 ${month}월`, dates };
  });
}

// Render Interactive Touch/Hover Date Breakdown Card
function renderChartDateDetails(period) {
  const card = document.getElementById('chartPointDetailCard');
  if (!card) return;

  if (!period || !period.dates || period.dates.length === 0) {
    card.innerHTML = `
      <div class="detail-card-placeholder">
        <i class="fa-solid fa-hand-pointer text-cyan"></i>
        <span>그래프 지점을 터치하면 해당 날짜의 상세 운동 종목과 볼륨이 표시됩니다.</span>
      </div>
    `;
    return;
  }

  let totalVolume = 0;
  let totalSets = 0;
  let completedSets = 0;
  let pendingSets = 0;
  let pendingVolume = 0;
  const exerciseMap = new Map();
  const today = getTodayString();

  period.dates.forEach(dateKey => {
    const list = state.workouts[dateKey] || [];
    list.forEach(ex => {
      if (!ex || !Array.isArray(ex.sets)) return;
      const exName = ex.name || '기타 운동';
      const cat = ex.category || '가슴';

      if (!exerciseMap.has(exName)) {
        exerciseMap.set(exName, {
          name: exName,
          category: cat,
          totalSets: 0,
          completedSets: 0,
          pendingSets: 0,
          volume: 0,
          cardio: isCardioExercise(ex),
          minutes: 0,
          distance: 0,
          pendingVolume: 0
        });
      }

      const item = exerciseMap.get(exName);

      ex.sets.forEach(s => {
        if (!s) return;
        totalSets++;
        item.totalSets++;

        const isDone = isWorkoutSetCompleted(s);
        if (isDone) {
          completedSets++;
          item.completedSets++;
          const vol = !isCardioExercise(ex) && s.type !== 'warmup' ? getWorkoutSetVolume(s) : 0;
          if (isCardioExercise(ex)) {
            item.minutes += Number(s.actualReps) || 0;
            item.distance += (Number(s.weight) || 0) * (Number(s.actualReps) || 0) / 60;
          }
          totalVolume += vol;
          item.volume += vol;
        } else if (dateKey === today) {
          const vol = !isCardioExercise(ex) && s.type !== 'warmup' ? getWorkoutSetVolume(s, true) : 0;
          pendingSets++;
          item.pendingSets++;
          pendingVolume += vol;
          item.pendingVolume += vol;
        }
      });
    });
  });

  const tonStr = totalVolume >= 1000 ? ` (${(totalVolume / 1000).toFixed(2)}톤)` : '';
  const dateHeading = period.fullLabel || period.label;

  const exerciseItemsHtml = Array.from(exerciseMap.values())
    .filter(item => item.completedSets > 0 || item.totalSets > 0)
    .map(item => {
      const projectedItemVolume = item.volume + item.pendingVolume;
      const volumeHtml = item.cardio
        ? `<strong class="detail-ex-vol">${item.distance.toFixed(1)} km · ${item.minutes}분</strong>`
        : item.pendingSets > 0
        ? `<strong class="detail-ex-vol detail-ex-vol-projected" aria-label="완료 예상 총 중량 ${projectedItemVolume.toLocaleString()}킬로그램"><span>완료 시</span> ${projectedItemVolume.toLocaleString()} kg</strong>`
        : `<strong class="detail-ex-vol" aria-label="총 중량 ${item.volume.toLocaleString()}킬로그램">${item.volume.toLocaleString()} kg</strong>`;

      return `
        <div class="detail-exercise-item">
          <span class="detail-ex-cat">${escapeHtml(item.category)}</span>
          <span class="detail-ex-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</span>
          ${volumeHtml}
        </div>
      `;
    }).join('');

  const projectedVolume = totalVolume + pendingVolume;
  const projectedTonStr = projectedVolume >= 1000 ? ` (${(projectedVolume / 1000).toFixed(2)}톤)` : '';
  const hasTodayProjection = pendingSets > 0;
  const summaryHtml = hasTodayProjection
    ? `<span>현재 ${totalVolume.toLocaleString()} kg</span><strong>완료 예상 ${projectedVolume.toLocaleString()} kg${projectedTonStr}</strong>`
    : `총 볼륨: ${totalVolume.toLocaleString()} kg${tonStr}`;

  card.innerHTML = `
    <div class="chart-point-detail-content ${hasTodayProjection ? 'has-projection' : ''}">
      <div class="detail-header-row">
        <div class="detail-date-badge">
          <i class="fa-solid fa-calendar-check"></i>
          <span>${escapeHtml(dateHeading)}</span>
          <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: 500; margin-left: 4px;">
            (${completedSets}세트 완료)
          </span>
        </div>
        <div class="detail-vol-summary ${hasTodayProjection ? 'is-projected' : ''}">
          ${summaryHtml}
        </div>
      </div>
      <div class="detail-exercise-list">
        ${exerciseItemsHtml || '<div style="font-size:0.75rem; color:var(--text-muted); padding:4px;">기록된 완료 운동이 없습니다.</div>'}
      </div>
      ${hasTodayProjection ? `
        <div class="detail-projection-motivation">
          <i class="fa-solid fa-flag-checkered" aria-hidden="true"></i>
          <span>남은 ${pendingSets}세트를 완료하면 이 예상 볼륨이 성장 그래프에 기록돼요.</span>
        </div>
      ` : ''}
    </div>
  `;
}

function updateChartProjectionNotice(projection, projectedPeriodVolume) {
  const notice = document.getElementById('chartProjectionNotice');
  const message = document.getElementById('chartProjectionMessage');
  if (!notice || !message) return;

  if (!projection || projection.pendingSets === 0) {
    notice.classList.add('hidden');
    message.textContent = '';
    return;
  }

  const volumeLabel = Number(projectedPeriodVolume || 0).toLocaleString();
  message.textContent = state.graphPeriod === 'monthly'
    ? `회색 점선은 이번 달 완료 예상 ${volumeLabel} kg이에요. 남은 ${projection.pendingSets}세트만 채워보세요!`
    : `회색 점선은 오늘 완료 예상 ${volumeLabel} kg이에요. 남은 ${projection.pendingSets}세트만 채워보세요!`;
  notice.classList.remove('hidden');
}

function renderExerciseWeightChart() {
  const canvas = document.getElementById('exerciseWeightChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  document.getElementById('dailyGraphBtn')?.classList.toggle('active', state.graphPeriod === 'daily');
  document.getElementById('monthlyGraphBtn')?.classList.toggle('active', state.graphPeriod === 'monthly');

  const graphPeriods = getGraphPeriods();
  const todayProjection = getTodayVolumeProjection();

  if (graphPeriods.length === 0) {
    if (exerciseChart && typeof exerciseChart.destroy === 'function') {
      exerciseChart.destroy();
      exerciseChart = null;
    }
    updateChartProjectionNotice(null, 0);
    renderChartDateDetails(null);
    return;
  }

  const dateLabels = graphPeriods.map(period => period.label);
  const seriesData = [];

  graphPeriods.forEach(period => {
    let dailySum = 0;
    let hasData = false;

    period.dates.forEach(dateKey => {
      const list = state.workouts[dateKey] || [];
      list.forEach(ex => {
        if (!ex || !Array.isArray(ex.sets)) return;
        ex.sets.forEach(s => {
          if (!isWorkoutSetCompleted(s)) return;
          hasData = true;
          if (!isCardioExercise(ex) && s.type !== 'warmup') dailySum += getWorkoutSetVolume(s);
        });
      });
    });

    seriesData.push(hasData ? Math.round(dailySum) : null);
  });

  const today = getTodayString();
  const todayPeriodIndex = graphPeriods.findIndex(period => period.dates.includes(today));
  const projectedSeriesData = Array(graphPeriods.length).fill(null);
  let projectionAnchorIndex = -1;
  let projectedPeriodVolume = 0;

  if (todayProjection.pendingSets > 0 && todayPeriodIndex >= 0) {
    projectedPeriodVolume = (seriesData[todayPeriodIndex] || 0) + todayProjection.pendingVolume;
    projectedSeriesData[todayPeriodIndex] = projectedPeriodVolume;

    for (let index = todayPeriodIndex - 1; index >= 0; index--) {
      if (seriesData[index] !== null) {
        projectionAnchorIndex = index;
        projectedSeriesData[index] = seriesData[index];
        break;
      }
    }
  }

  updateChartProjectionNotice(todayProjection, projectedPeriodVolume);

  const gradient = ctx.createLinearGradient(0, 0, 0, 240);
  gradient.addColorStop(0, 'rgba(0, 242, 254, 0.40)');
  gradient.addColorStop(1, 'rgba(0, 242, 254, 0.01)');

  if (exerciseChart && typeof exerciseChart.destroy === 'function') {
    exerciseChart.destroy();
    exerciseChart = null;
  }

  const datasets = [{
    label: '기록된 총 볼륨 (kg)',
    data: seriesData,
    borderColor: '#00f2fe',
    backgroundColor: gradient,
    pointBackgroundColor: '#00e676',
    pointBorderColor: '#0b0f17',
    pointBorderWidth: 2,
    pointRadius: 5,
    pointHoverRadius: 9,
    pointHoverBackgroundColor: '#00f2fe',
    borderWidth: 3,
    tension: 0.35,
    fill: true,
    spanGaps: true
  }];

  if (todayProjection.pendingSets > 0 && todayPeriodIndex >= 0) {
    datasets.push({
      label: '오늘 완료 예상 (kg)',
      data: projectedSeriesData,
      borderColor: 'rgba(148, 163, 184, 0.9)',
      backgroundColor: 'transparent',
      borderDash: [7, 6],
      borderWidth: 2,
      pointBackgroundColor: '#0b0f17',
      pointBorderColor: 'rgba(203, 213, 225, 0.95)',
      pointBorderWidth: 2,
      pointRadius: context => context.dataIndex === todayPeriodIndex ? 6 : 0,
      pointHoverRadius: context => context.dataIndex === todayPeriodIndex ? 9 : 0,
      tension: 0.25,
      fill: false,
      spanGaps: true,
      projectionAnchorIndex
    });
  }

  exerciseChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateLabels,
      datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      onClick: (event, elements) => {
        if (elements && elements.length > 0) {
          const pointIndex = elements[0].index;
          if (graphPeriods[pointIndex]) {
            renderChartDateDetails(graphPeriods[pointIndex]);
          }
        }
      },
      onHover: (event, elements) => {
        if (elements && elements.length > 0) {
          const pointIndex = elements[0].index;
          if (graphPeriods[pointIndex]) {
            renderChartDateDetails(graphPeriods[pointIndex]);
          }
        }
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          titleColor: '#00f2fe',
          bodyColor: '#f8fafc',
          borderColor: 'rgba(0, 242, 254, 0.3)',
          borderWidth: 1,
          padding: 10,
          boxPadding: 4,
          usePointStyle: true,
          filter: context => context.dataset.projectionAnchorIndex !== context.dataIndex,
          callbacks: {
            title: (items) => {
              if (!items || items.length === 0) return '';
              const idx = items[0].dataIndex;
              return graphPeriods[idx]?.fullLabel || items[0].label;
            },
            label: (context) => {
              const val = context.parsed.y || 0;
              const tonStr = val >= 1000 ? ` (${(val / 1000).toFixed(2)}톤)` : '';
              return context.dataset.projectionAnchorIndex !== undefined
                ? `완료 예상: ${val.toLocaleString()} kg${tonStr}`
                : `기록된 볼륨: ${val.toLocaleString()} kg${tonStr}`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 10 } }
        },
        y: {
          title: {
            display: true,
            text: '총 볼륨 (kg)',
            color: '#00f2fe',
            font: { family: 'Outfit', size: 11, weight: '600' }
          },
          grid: { color: 'rgba(255,255,255,0.05)' },
          ticks: { color: '#94a3b8', font: { family: 'Outfit', size: 10 } },
          beginAtZero: true
        }
      }
    }
  });

  // Keep today's unfinished goal visible by default; otherwise show the latest record.
  const defaultPeriod = todayProjection.pendingSets > 0 && todayPeriodIndex >= 0
    ? graphPeriods[todayPeriodIndex]
    : graphPeriods[graphPeriods.length - 1];
  renderChartDateDetails(defaultPeriod);
}

// Live metrics update without destroying input focus (Hypertrophy & Effective Volume Engine)
function updateMetricsOnly() {
  const exercises = state.workouts[state.currentDate] || [];

  let totalActualEffectiveVolume = 0;
  let totalCardioDistance = 0;
  let totalSets = 0;
  let completedSets = 0;
  let completedHardSets = 0;
  let maxEstimated1RM = 0;
  let max1RMExercise = '';

  exercises.forEach(ex => {
    const isCardio = isCardioExercise(ex);
    ex.sets.forEach(s => {
      totalSets++;
      const isWarmup = s.type === 'warmup';
      const weight = Number(s.weight) || 0;
      const actualReps = Number(s.actualReps) || 0;

      if (isCardio) {
        if (s.completed) {
          completedSets++;
          completedHardSets++;
          const dist = (weight * actualReps) / 60;
          totalCardioDistance += dist;
        }
      } else {
        if (s.completed) {
          completedSets++;
          if (!isWarmup) {
            completedHardSets++;
            totalActualEffectiveVolume += weight * actualReps;
            const est1RM = calculateEstimated1RM(weight, actualReps);
            if (est1RM > maxEstimated1RM) {
              maxEstimated1RM = est1RM;
              max1RMExercise = ex.name;
            }
          }
        }
      }
    });
  });

  const targetStr = maxEstimated1RM > 0 ? `${maxEstimated1RM} kg` : '—';

  const actualStr = totalCardioDistance > 0
    ? `${totalActualEffectiveVolume.toLocaleString()} kg / ${totalCardioDistance.toFixed(1)}km`
    : `${totalActualEffectiveVolume.toLocaleString()} kg`;

  const setsRatioStr = `${completedSets} / ${totalSets} (본세트 ${completedHardSets})`;

  const targetWeightDisplay = document.getElementById('totalTargetWeightDisplay');
  const actualWeightDisplay = document.getElementById('totalActualWeightDisplay');
  const setsRatioDisplay = document.getElementById('completedSetsRatioDisplay');
  const countBadge = document.getElementById('exerciseCountBadge');

  if (targetWeightDisplay) {
    targetWeightDisplay.textContent = targetStr;
    targetWeightDisplay.title = max1RMExercise ? `${max1RMExercise} · 추정 1RM` : '완료한 근력 세트가 없습니다';
  }
  if (actualWeightDisplay) actualWeightDisplay.textContent = actualStr;
  if (setsRatioDisplay) setsRatioDisplay.textContent = setsRatioStr;
  if (countBadge) countBadge.textContent = `${exercises.length}개 종목`;

  renderExerciseWeightChart();
}

// Toggle individual exercise card collapse state
function toggleExerciseCardCollapse(exId) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex) return;

  ex.collapsed = !Boolean(ex.collapsed);
  saveState();
  updateUI();
}

function setAllExerciseCardsCollapsed(collapsed) {
  const exercises = state.workouts[state.currentDate] || [];
  if (exercises.length === 0) return;

  exercises.forEach(ex => {
    ex.collapsed = collapsed;
  });

  if (!collapsed) {
    const sectionCard = document.getElementById('exercisesSectionCard');
    if (sectionCard) sectionCard.classList.remove('collapsed');
  }

  saveState();
  updateUI();
}

function updateExerciseViewToggle() {
  const exercises = state.workouts[state.currentDate] || [];
  const toggleBtn = document.getElementById('toggleAllExercisesBtn');
  if (!toggleBtn) return;

  const allCollapsed = exercises.length === 0 || exercises.every(ex => Boolean(ex.collapsed));
  toggleBtn.disabled = exercises.length === 0;
  toggleBtn.title = allCollapsed ? '모든 운동의 세트 내용 펼치기' : '모든 운동의 세트 내용 접기';
  toggleBtn.innerHTML = allCollapsed
    ? '<i class="fa-solid fa-angles-down"></i> 전체 펼치기'
    : '<i class="fa-solid fa-angles-up"></i> 전체 접기';
}

function toggleAllExerciseCards() {
  const exercises = state.workouts[state.currentDate] || [];
  if (exercises.length === 0) return;

  const allCollapsed = exercises.every(ex => Boolean(ex.collapsed));
  setAllExerciseCardsCollapsed(!allCollapsed);
}

function closeWorkoutMoreMenu() {
  const menu = document.getElementById('workoutMoreMenu');
  const button = document.getElementById('workoutMoreMenuBtn');
  if (menu) menu.classList.add('hidden');
  if (button) button.setAttribute('aria-expanded', 'false');
}

function deleteAllExercisesForCurrentDate() {
  const exercises = state.workouts[state.currentDate] || [];
  if (exercises.length === 0) {
    alert('삭제할 운동이 없습니다.');
    return;
  }

  const selectedDate = formatDateDisplay(state.currentDate);
  if (!confirm(`${selectedDate}의 운동 ${exercises.length}개를 모두 삭제하시겠습니까?`)) return;

  delete state.workouts[state.currentDate];
  state.deletedDates = state.deletedDates || [];
  if (!state.deletedDates.includes(state.currentDate)) {
    state.deletedDates.push(state.currentDate);
  }
  state.selectedExercisesForGraph = [];
  saveState();
  updateUI();
  alert(`${selectedDate}의 운동 목록을 모두 삭제했습니다.`);
}

// Full UI Render
function updateUI() {
  document.getElementById('workoutDateInput').value = state.currentDate;
  document.getElementById('dateDisplay').textContent = formatDateDisplay(state.currentDate);

  const soundBtn = document.getElementById('soundToggleBtn');
  if (state.soundEnabled) {
    soundBtn.className = 'icon-btn sound-on';
    soundBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    soundBtn.title = '타이머 소리·진동 알림 끄기';
  } else {
    soundBtn.className = 'icon-btn sound-off';
    soundBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    soundBtn.title = '타이머 소리·진동 알림 켜기';
  }

  const exercises = state.workouts[state.currentDate] || [];

  exercises.forEach(sanitizeExerciseSets);

  updateExerciseViewToggle();
  updateMetricsOnly();

  renderExerciseList(exercises);

  renderExerciseWeightChart();
  renderPresetChips();
  updateFixedBottomTimerUI();
  window.Ouwan?.changed();
}

function toggleSetType(exId, setIdx) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex || !ex.sets[setIdx]) return;

  const typeCycle = ['working', 'warmup', 'failure', 'drop'];
  const current = ex.sets[setIdx].type || 'working';
  const nextType = typeCycle[(typeCycle.indexOf(current) + 1) % typeCycle.length];

  ex.sets[setIdx].type = nextType;
  saveState();
  updateUI();
}

function adjustSetField(exId, setIdx, field, delta) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex || !ex.sets[setIdx]) return;

  let val = Number(ex.sets[setIdx][field]) || 0;
  val = Math.max(0, val + delta);
  val = Math.round(val * 10) / 10;

  ex.sets[setIdx][field] = val;
  if (field === 'targetReps' && !ex.sets[setIdx].completed) {
    ex.sets[setIdx].actualReps = val;
  }
  saveState();
  updateMetricsOnly();
  renderExerciseList(list);
}

let pendingRestExerciseId = null;

function formatRestDuration(totalSec) {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  if (m === 0) return `${s}초`;
  if (s === 0) return `${m}분`;
  return `${m}분 ${s}초`;
}

function setExerciseRestModalSeconds(sec) {
  const clamped = Math.max(5, Math.min(600, parseInt(sec, 10) || 30));
  const input = document.getElementById('exerciseRestInput');
  const formattedEl = document.getElementById('exerciseRestDisplayFormatted');
  const secondsEl = document.getElementById('exerciseRestDisplaySeconds');
  const chips = document.querySelectorAll('#exerciseRestPresetChips .rest-chip');

  if (input) input.value = clamped;
  if (formattedEl) formattedEl.textContent = formatRestDuration(clamped);
  if (secondsEl) secondsEl.textContent = `(${clamped}초)`;

  chips.forEach(c => {
    c.classList.toggle('active', parseInt(c.dataset.sec, 10) === clamped);
  });
}

function initExerciseRestModal() {
  const modal = document.getElementById('exerciseRestModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeExerciseRestModalBtn');
  const cancelBtn = document.getElementById('cancelExerciseRestBtn');
  const form = document.getElementById('exerciseRestForm');
  const input = document.getElementById('exerciseRestInput');
  const presetChips = document.querySelectorAll('#exerciseRestPresetChips .rest-chip');
  const addChips = document.querySelectorAll('#exerciseRestAddChips .rest-add-chip');

  const close = () => {
    modal.classList.add('hidden');
    pendingRestExerciseId = null;
  };

  if (closeBtn) closeBtn.addEventListener('click', close);
  if (cancelBtn) cancelBtn.addEventListener('click', close);
  modal.addEventListener('click', e => {
    if (e.target === modal) close();
  });

  presetChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const sec = parseInt(chip.dataset.sec, 10);
      setExerciseRestModalSeconds(sec);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(10);
      }
    });
  });

  addChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const addVal = parseInt(chip.dataset.add, 10);
      const currentVal = parseInt(input?.value, 10) || 60;
      setExerciseRestModalSeconds(currentVal + addVal);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        navigator.vibrate(15);
      }
    });
  });

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!pendingRestExerciseId) return close();
      const list = state.workouts[state.currentDate] || [];
      const ex = list.find(item => item.id === pendingRestExerciseId);
      if (ex && input) {
        const parsed = parseInt(input.value, 10);
        if (!isNaN(parsed) && parsed >= 5 && parsed <= 600) {
          ex.restSeconds = parsed;
          saveState();
          updateUI();
        }
      }
      close();
    });
  }
}

function initFeedbackModal() {
  const openBtn = document.getElementById('openFeedbackBtn');
  const modal = document.getElementById('feedbackModal');
  if (!modal) return;

  const closeBtn = document.getElementById('closeFeedbackModalBtn');
  const cancelBtn = document.getElementById('cancelFeedbackBtn');
  const form = document.getElementById('feedbackForm');
  const typeSelect = document.getElementById('feedbackTypeSelect');
  const messageInput = document.getElementById('feedbackMessageInput');
  const contactInput = document.getElementById('feedbackContactInput');
  const charCountEl = document.getElementById('feedbackCharCount');
  const submitBtn = document.getElementById('submitFeedbackBtn');
  const statusNotice = document.getElementById('feedbackStatusNotice');

  function openModal() {
    modal.classList.remove('hidden');
    if (statusNotice) {
      statusNotice.classList.add('hidden');
      statusNotice.textContent = '';
      statusNotice.className = 'feedback-status-notice hidden margin-top-10';
    }
    if (messageInput) {
      setTimeout(() => messageInput.focus(), 50);
    }
  }

  function closeModal() {
    modal.classList.add('hidden');
    if (openBtn) openBtn.focus();
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (cancelBtn) cancelBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });

  modal.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
    }
  });

  if (messageInput && charCountEl) {
    messageInput.addEventListener('input', () => {
      charCountEl.textContent = String(messageInput.value.length);
    });
  }

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const message = messageInput ? messageInput.value.trim() : '';
      if (!message) {
        if (messageInput) messageInput.focus();
        return;
      }

      const type = typeSelect ? typeSelect.value : '개선사항';
      const contact = contactInput ? contactInput.value.trim() : '';
      const fullMessage = `[${type}] ${message}` + (contact ? `\n\n[연락처/이메일]: ${contact}` : '');

      let userId = null;
      try {
        const savedKakao = localStorage.getItem('fit_tracker_kakao_user');
        if (savedKakao) {
          const parsed = JSON.parse(savedKakao);
          userId = parsed.id ? String(parsed.id) : (parsed.kakao_account?.email || null);
        }
      } catch (err) {}

      let deviceId = localStorage.getItem('fit_tracker_device_id');
      if (!deviceId) {
        deviceId = 'ft_' + Math.random().toString(36).substring(2, 12);
        localStorage.setItem('fit_tracker_device_id', deviceId);
      }

      const originalBtnHtml = submitBtn ? submitBtn.innerHTML : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> 접수 중...';
      }
      if (statusNotice) statusNotice.classList.add('hidden');

      try {
        const res = await fetch('https://admin.brightnetworks.kr/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            app: 'FitTracker',
            userId: userId,
            deviceId: deviceId,
            message: fullMessage,
            appVersion: '1.0.6',
            deviceModel: (navigator.userAgent || '').slice(0, 100)
          })
        });

        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) {
          alert('소중한 의견이 관리자(Admin) 사이트에 성공적으로 접수되었습니다.\n보내주신 피드백을 적극 검토하여 더 좋은 서비스를 만들겠습니다. 감사합니다!');
          form.reset();
          if (charCountEl) charCountEl.textContent = '0';
          closeModal();
        } else {
          const errMsg = data.error || '접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.';
          if (statusNotice) {
            statusNotice.textContent = errMsg;
            statusNotice.className = 'feedback-status-notice margin-top-10';
            statusNotice.classList.remove('hidden');
          } else {
            alert(errMsg);
          }
        }
      } catch (error) {
        const errMsg = '네트워크 연결 오류로 접수하지 못했습니다. 인터넷 연결을 확인해 주세요.';
        if (statusNotice) {
          statusNotice.textContent = errMsg;
          statusNotice.className = 'feedback-status-notice margin-top-10';
          statusNotice.classList.remove('hidden');
        } else {
          alert(errMsg);
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;
        }
      }
    });
  }
}

function changeExerciseRestSeconds(exId) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex) return;

  const currentRest = ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category);
  pendingRestExerciseId = exId;

  const modal = document.getElementById('exerciseRestModal');
  const desc = document.getElementById('exerciseRestModalDesc');

  if (desc) desc.textContent = `[${ex.name}] 세트 간 휴식 시간(초)을 설정하세요.`;
  setExerciseRestModalSeconds(currentRest);

  if (modal) {
    modal.classList.remove('hidden');
  } else {
    const raw = prompt(`[${ex.name}] 세트 간 기본 휴식 시간(초)을 설정하세요 (예: 60, 90, 120, 150, 180):`, currentRest);
    if (raw !== null) {
      const parsed = parseInt(raw, 10);
      if (!isNaN(parsed) && parsed >= 5 && parsed <= 600) {
        ex.restSeconds = parsed;
        saveState();
        updateUI();
      }
    }
  }
}

const EXERCISE_LONG_PRESS_MS = 450;
const EXERCISE_SWIPE_ACTION_WIDTH = 84;
let exerciseGestureClickSuppressedUntil = 0;

function closeExerciseSwipeItem(item) {
  if (!item) return;
  item.classList.remove('swipe-open');
  const surface = item.querySelector('.exercise-card');
  const deleteButton = item.querySelector('.exercise-swipe-delete');
  if (surface) surface.style.transform = '';
  if (deleteButton) deleteButton.tabIndex = -1;
}

function openExerciseIconViewer(exId, event) {
  if (event) { event.preventDefault(); event.stopPropagation(); }
  if (Date.now() < exerciseGestureClickSuppressedUntil) return;
  const ex = (state.workouts[state.currentDate] || []).find(e => e.id === exId);
  if (!ex) return;

  const catalogItem = typeof EQUIPMENT_CATALOG !== 'undefined'
    ? (EQUIPMENT_CATALOG.find(e => e.name === ex.name) || EQUIPMENT_CATALOG.find(e => e.aliases?.includes(ex.name)))
    : null;

  if (catalogItem && catalogItem.imageUrl) {
    openExerciseDiagramModal(catalogItem);
    return;
  }

  if (typeof getExerciseSvgIcon !== 'function') return;

  let dialog = document.getElementById('exerciseIconViewer');
  if (!dialog) {
    dialog = document.createElement('dialog');
    dialog.id = 'exerciseIconViewer';
    dialog.className = 'exercise-icon-viewer';
    dialog.innerHTML = `
      <button type="button" class="exercise-icon-viewer-close" aria-label="닫기">&times;</button>
      <div class="exercise-icon-viewer-art"></div>
      <strong class="exercise-icon-viewer-name"></strong>
      <span class="exercise-icon-viewer-category"></span>
    `;
    dialog.addEventListener('click', e => { if (e.target === dialog || e.target.closest('.exercise-icon-viewer-close')) dialog.close(); });
    document.body.appendChild(dialog);
  }
  dialog.querySelector('.exercise-icon-viewer-art').innerHTML = getExerciseSvgIcon(ex.name, ex.category);
  dialog.querySelector('.exercise-icon-viewer-name').textContent = ex.name;
  dialog.querySelector('.exercise-icon-viewer-category').textContent = ex.category || '기타';
  if (!dialog.open) dialog.showModal();
}

function handleExerciseCardHeaderClick(exId, event) {
  const item = event.currentTarget.closest('.exercise-swipe-item');

  if (Date.now() < exerciseGestureClickSuppressedUntil) {
    event.preventDefault();
    event.stopPropagation();
    return;
  }

  if (item?.classList.contains('swipe-open')) {
    closeExerciseSwipeItem(item);
    return;
  }

  toggleExerciseCardCollapse(exId);
}

function handleExerciseTitleClick(exId, event) {
  event.stopPropagation();
  if (Date.now() < exerciseGestureClickSuppressedUntil) {
    event.preventDefault();
    return;
  }
  openEditExerciseModal(exId);
}

function persistExerciseOrderFromList(container) {
  const exercises = state.workouts[state.currentDate] || [];
  const exerciseById = new Map(exercises.map(exercise => [String(exercise.id), exercise]));
  const orderedExercises = Array.from(container.querySelectorAll('.exercise-swipe-item'))
    .map(item => exerciseById.get(String(item.dataset.exerciseId)))
    .filter(Boolean);

  if (orderedExercises.length !== exercises.length) return;
  state.workouts[state.currentDate] = orderedExercises;
  saveState();
}

function setupExerciseItemGestures(item, container) {
  const surface = item.querySelector('.exercise-card');
  const header = item.querySelector('.exercise-card-header');
  if (!surface || !header) return;

  let gesture = null;

  const clearLongPress = () => {
    if (gesture?.longPressTimer) {
      clearTimeout(gesture.longPressTimer);
      gesture.longPressTimer = null;
    }
  };

  const finishGesture = (gestureId, cancelled = false) => {
    if (!gesture || gestureId !== gesture.id) return;
    clearLongPress();

    if (gesture.dragging) {
      item.classList.remove('is-dragging');
      persistExerciseOrderFromList(container);
      exerciseGestureClickSuppressedUntil = Date.now() + 700;
      gesture = null;
      updateUI();
      return;
    }

    surface.classList.remove('is-swiping');
    surface.style.transform = '';

    if (gesture.swiping && !cancelled) {
      const shouldOpen = gesture.currentOffset < -(EXERCISE_SWIPE_ACTION_WIDTH * 0.42);
      container.querySelectorAll('.exercise-swipe-item.swipe-open').forEach(openItem => {
        if (openItem !== item) closeExerciseSwipeItem(openItem);
      });
      item.classList.toggle('swipe-open', shouldOpen);
      const deleteButton = item.querySelector('.exercise-swipe-delete');
      if (deleteButton) deleteButton.tabIndex = shouldOpen ? 0 : -1;
      exerciseGestureClickSuppressedUntil = Date.now() + 500;
    } else if (cancelled) {
      item.classList.toggle('swipe-open', gesture.startOffset < 0);
    }

    gesture = null;
  };

  const startGesture = (id, clientX, clientY, capturePointer = null) => {
    const startOffset = item.classList.contains('swipe-open') ? -EXERCISE_SWIPE_ACTION_WIDTH : 0;
    gesture = {
      id,
      startX: clientX,
      startY: clientY,
      currentOffset: startOffset,
      startOffset,
      dragging: false,
      swiping: false,
      longPressTimer: null,
      capturePointer
    };

    gesture.longPressTimer = setTimeout(() => {
      if (!gesture || gesture.id !== id) return;
      gesture.dragging = true;
      closeExerciseSwipeItem(item);
      item.classList.add('is-dragging');
      exerciseGestureClickSuppressedUntil = Date.now() + 700;
      gesture.capturePointer?.();
      if (navigator.vibrate) navigator.vibrate(30);
    }, EXERCISE_LONG_PRESS_MS);
  };

  const moveGesture = (gestureId, clientX, clientY, event) => {
    if (!gesture || gestureId !== gesture.id) return;
    const deltaX = clientX - gesture.startX;
    const deltaY = clientY - gesture.startY;

    if (gesture.dragging) {
      event.preventDefault();
      const target = document.elementFromPoint(clientX, clientY)?.closest('.exercise-swipe-item');
      if (target && target !== item && target.parentElement === container) {
        const rect = target.getBoundingClientRect();
        if (clientY < rect.top + (rect.height / 2)) {
          container.insertBefore(item, target);
        } else {
          container.insertBefore(item, target.nextSibling);
        }
      }
      return;
    }

    if (!gesture.swiping && Math.abs(deltaY) > 10 && Math.abs(deltaY) > Math.abs(deltaX)) {
      clearLongPress();
      return;
    }

    if (Math.abs(deltaX) > 8 && Math.abs(deltaX) > Math.abs(deltaY)) {
      clearLongPress();
      gesture.swiping = true;
      surface.classList.add('is-swiping');
      gesture.capturePointer?.();
    }

    if (gesture.swiping) {
      event.preventDefault();
      gesture.currentOffset = Math.max(-EXERCISE_SWIPE_ACTION_WIDTH, Math.min(0, gesture.startOffset + deltaX));
      surface.style.transform = `translateX(${gesture.currentOffset}px)`;
    }
  };

  header.addEventListener('pointerdown', event => {
    if (event.pointerType === 'touch' || !event.isPrimary || event.button !== 0) return;
    if (event.target.closest('button, input, select, textarea, a')) return;
    startGesture(event.pointerId, event.clientX, event.clientY, () => header.setPointerCapture?.(event.pointerId));
  });

  header.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    moveGesture(event.pointerId, event.clientX, event.clientY, event);
  });

  header.addEventListener('pointerup', event => {
    if (event.pointerType !== 'touch') finishGesture(event.pointerId);
  });
  header.addEventListener('pointercancel', event => {
    if (event.pointerType !== 'touch') finishGesture(event.pointerId, true);
  });

  header.addEventListener('touchstart', event => {
    if (event.touches.length !== 1) return;
    if (event.target.closest('button, input, select, textarea, a')) return;
    const touch = event.touches[0];
    startGesture(touch.identifier, touch.clientX, touch.clientY);
  }, { passive: true });

  header.addEventListener('touchmove', event => {
    if (!gesture) return;
    const touch = Array.from(event.touches).find(candidate => candidate.identifier === gesture.id);
    if (touch) moveGesture(touch.identifier, touch.clientX, touch.clientY, event);
  }, { passive: false });

  header.addEventListener('touchend', event => {
    const touch = Array.from(event.changedTouches).find(candidate => candidate.identifier === gesture?.id);
    if (touch) finishGesture(touch.identifier);
  });
  header.addEventListener('touchcancel', event => {
    const touch = Array.from(event.changedTouches).find(candidate => candidate.identifier === gesture?.id);
    if (touch) finishGesture(touch.identifier, true);
  });

  header.addEventListener('contextmenu', event => {
    if (gesture?.dragging) event.preventDefault();
  });
}

function renderExerciseList(exercises) {
  const container = document.getElementById('exerciseList');
  const emptyState = document.getElementById('emptyState');

  if (exercises.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }

  emptyState.style.display = 'none';
  container.innerHTML = '';

  exercises.forEach(ex => {
    sanitizeExerciseSets(ex);

    const isCardio = isCardioExercise(ex);
    const weightLabel = isCardio ? '속도(km/h)' : '무게(kg)';
    const allSetsCompleted = ex.sets.length > 0 && ex.sets.every(set => set.completed);
    const item = document.createElement('div');
    item.className = 'exercise-swipe-item';
    item.dataset.exerciseId = ex.id;

    const card = document.createElement('div');
    const isCollapsed = Boolean(ex.collapsed);
    card.className = `exercise-card ${isCollapsed ? 'collapsed' : ''}`;
    card.dataset.exerciseId = ex.id;

    const restSec = ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category);

    // Compute peak estimated 1RM for this exercise
    let peakOrm = 0;
    ex.sets.forEach(s => {
      if (s.completed && s.type !== 'warmup') {
        const orm = calculateEstimated1RM(s.weight, s.actualReps);
        if (orm > peakOrm) peakOrm = orm;
      }
    });

    const insight = getPreviousSessionInsight(ex.name, state.currentDate);

    let setsRowsHtml = '';
    ex.sets.forEach((s, setIdx) => {
      // Normalize completion status to prevent any unexpected uncheck
      const isSetCompleted = Boolean(s.completed === true || s.completed === 1 || s.completed === 'true' || s.isCompleted === true || s.done === true);
      s.completed = isSetCompleted;

      const isWarmup = s.type === 'warmup';
      const typeLabel = isWarmup ? 'W' : (s.type === 'failure' ? 'F' : (s.type === 'drop' ? 'D' : `${s.setNumber}`));
      const typeClass = `type-${s.type || 'working'}`;
      const rowClass = isWarmup ? 'set-row-warmup' : (s.type === 'failure' ? 'set-row-failure' : (s.type === 'drop' ? 'set-row-drop' : ''));

      setsRowsHtml += `
        <tr class="${rowClass}">
          <td>
            <button type="button" class="set-type-btn ${typeClass}"
              onclick="toggleSetType('${ex.id}', ${setIdx})"
              title="터치하여 세트 타입 변경 (본세트 / 웜업 W / 실패 F / 드롭 D)">
              ${typeLabel}
            </button>
          </td>
          <td>
            <input type="number" step="${isCardio ? '0.5' : '2.5'}" min="0" value="${s.weight}" inputmode="decimal"
              oninput="updateSetData('${ex.id}', ${setIdx}, 'weight', this.value)"
              onchange="updateSetData('${ex.id}', ${setIdx}, 'weight', this.value)"
              title="${weightLabel}">
          </td>
          <td>
            <input type="number" min="1" value="${s.targetReps}" inputmode="numeric" pattern="[0-9]*"
              oninput="updateSetData('${ex.id}', ${setIdx}, 'targetReps', this.value)"
              onchange="updateSetData('${ex.id}', ${setIdx}, 'targetReps', this.value)"
              title="${isCardio ? '목표시간(분)' : '목표횟수(회)'}">
          </td>
          <td>
            <input type="number" min="0" value="${s.actualReps}" inputmode="numeric" pattern="[0-9]*"
              oninput="updateSetData('${ex.id}', ${setIdx}, 'actualReps', this.value)"
              onchange="updateSetData('${ex.id}', ${setIdx}, 'actualReps', this.value)"
              title="${isCardio ? '실제시간(분)' : '실제횟수(회)'}">
          </td>
          <td>
            <button class="complete-set-btn ${isSetCompleted ? 'completed' : ''}"
              data-exercise-id="${ex.id}" data-set-index="${setIdx}"
              onclick="toggleSetComplete('${ex.id}', ${setIdx})" aria-pressed="${isSetCompleted}" aria-label="${setIdx + 1}세트 완료" title="세트 완료 체크">
              <i class="fa-solid fa-check"></i>
            </button>
          </td>

        </tr>
      `;
    });

    const svgThumb = typeof getExerciseSvgIcon === 'function' ? getExerciseSvgIcon(ex.name, ex.category) : '';
    const catalogItem = (typeof EQUIPMENT_CATALOG !== 'undefined')
      ? (EQUIPMENT_CATALOG.find(e => e.name === ex.name) || EQUIPMENT_CATALOG.find(e => e.aliases?.includes(ex.name)))
      : null;
    const hasGuideImage = Boolean(catalogItem?.imageUrl);

    card.innerHTML = `
      <div class="exercise-card-header" onclick="handleExerciseCardHeaderClick('${ex.id}', event)"
        role="button" tabindex="0" aria-expanded="${!isCollapsed}" aria-label="${escapeHtml(ex.name)} 세트 ${isCollapsed ? '펼치기' : '접기'}"
        onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleExerciseCardHeaderClick('${ex.id}', event); }"
        title="탭하여 세트 펼치기 · 길게 눌러 순서 변경 · 왼쪽으로 밀어 삭제">
        <div class="exercise-meta">
          <div class="ex-equip-thumb ${hasGuideImage ? 'has-guide' : ''}" role="button" tabindex="0"
            title="${escapeHtml(ex.name)} ${hasGuideImage ? '운동 도감 가이드 보기' : '크게 보기'}"
            aria-label="${escapeHtml(ex.name)} ${hasGuideImage ? '운동 도감 가이드 보기' : '아이콘 크게 보기'}"
            onclick="openExerciseIconViewer('${ex.id}', event)"
            onkeydown="if(event.key === 'Enter' || event.key === ' ') { openExerciseIconViewer('${ex.id}', event); }">
            ${svgThumb}
            ${hasGuideImage ? '<span class="thumb-guide-dot" title="운동 도감 2단계 가이드 포함"></span>' : ''}
          </div>
          <span class="category-tag" style="${isCardio ? 'background: rgba(0, 230, 118, 0.15); color: var(--accent-emerald);' : ''}">${escapeHtml(ex.category || '기타')}</span>
          <span class="exercise-title">
            <span class="exercise-title-text">${escapeHtml(ex.name)}</span>
          </span>
          <span class="exercise-set-summary">${ex.sets.filter(set => set.completed).length}/${ex.sets.length}</span>
          <span class="exercise-completion-status ${allSetsCompleted ? 'completed' : 'in-progress'}"
            title="${allSetsCompleted ? '모든 세트 완료' : '진행 중'}" aria-label="${allSetsCompleted ? '모든 세트 완료' : '진행 중'}">
            <i class="fa-solid ${allSetsCompleted ? 'fa-circle-check' : 'fa-circle-half-stroke'}"></i>
          </span>
        </div>
        <div class="exercise-actions" aria-hidden="true">
          <span class="exercise-drag-grip" title="길게 눌러 순서 변경"><i class="fa-solid fa-grip-lines"></i></span>
          <i class="fa-solid fa-chevron-up ex-toggle-chevron"></i>
        </div>
      </div>

      <div class="ex-card-badges" style="padding: 0 16px 8px 16px;">
        <span class="ex-stat-badge rest-badge" onclick="changeExerciseRestSeconds('${ex.id}')" title="터치하여 이 운동의 기본 휴식시간 변경">
          <i class="fa-solid fa-stopwatch"></i> 휴식 ${restSec}초
        </span>
        <span class="ex-stat-badge swap-badge" onclick="toggleQuickSwapDrawer('${ex.id}', event)" title="자리가 없을 때 동일 타겟 대체 기구로 1-클릭 교체">
          <i class="fa-solid fa-shuffle"></i> 대체 기구
        </span>
        ${hasGuideImage ? `
          <span class="ex-stat-badge guide-badge" onclick="openExerciseDiagramByName('${escapeHtml(ex.name)}', event)" title="2단계 동작 가이드 도감 크게 보기">
            <i class="fa-solid fa-person-running"></i> 운동 도감
          </span>
        ` : ''}
        ${!isCardio && peakOrm > 0 ? `
          <span class="ex-stat-badge orm-badge" title="Epley 공식 기반 오늘 최고 추정 1RM">
            <i class="fa-solid fa-trophy"></i> 최고 1RM ${peakOrm}kg
          </span>
        ` : ''}
      </div>

      <div id="quickSwapDrawer-${ex.id}" class="quick-swap-drawer hidden"></div>

      <div class="exercise-card-body">
        ${insight ? `
          <div class="overload-guide-banner">
            <i class="fa-solid fa-lightbulb"></i>
            <span>${escapeHtml(insight.recommendation)}</span>
          </div>
        ` : ''}

        <table class="sets-table">
          <thead>
            <tr>
              <th>세트</th>
              <th>${weightLabel}</th>
              <th>${isCardio ? '목표(분)' : '목표(회)'}</th>
              <th>${isCardio ? '실제(분)' : '실제(회)'}</th>
              <th>완료</th>
            </tr>
          </thead>
          <tbody>
            ${setsRowsHtml}
          </tbody>
        </table>

        <div class="set-action-buttons">
          <button class="add-set-btn" onclick="addSetToExercise('${ex.id}')">
            <i class="fa-solid fa-plus"></i> 세트 추가
          </button>
          <details class="exercise-manage-menu">
            <summary>운동 관리</summary>
            <div class="exercise-manage-actions">
              ${hasGuideImage ? `<button type="button" onclick="openExerciseDiagramByName('${escapeHtml(ex.name)}', event)"><i class="fa-solid fa-person-running"></i> 운동 도감 보기</button>` : ''}
              <button type="button" onclick="openEditExerciseModal('${ex.id}')">종목 교체</button>
              ${ex.sets.map((set, index) => `<button type="button" class="danger" onclick="deleteSpecificSet('${ex.id}', ${index})">${index + 1}세트 삭제</button>`).join('')}
              <button type="button" class="danger" onclick="deleteExercise('${ex.id}')">운동 삭제</button>
            </div>
          </details>
        </div>
      </div>
    `;

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.className = 'exercise-swipe-delete';
    deleteButton.tabIndex = -1;
    deleteButton.setAttribute('aria-label', `${ex.name} 삭제`);
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i><span>삭제</span>';
    deleteButton.addEventListener('click', () => deleteExercise(ex.id));

    item.append(deleteButton, card);
    container.appendChild(item);
    setupExerciseItemGestures(item, container);
  });
}

function toggleQuickSwapDrawer(exId, event) {
  if (event) event.stopPropagation();
  const drawer = document.getElementById(`quickSwapDrawer-${exId}`);
  if (!drawer) return;

  if (!drawer.classList.contains('hidden')) {
    drawer.classList.add('hidden');
    return;
  }

  const exercises = state.workouts[state.currentDate] || [];
  const ex = exercises.find(e => e.id === exId);
  if (!ex) return;

  const alternatives = (typeof getExerciseAlternatives === 'function')
    ? getExerciseAlternatives(ex.name, ex.category)
    : [];

  if (!alternatives || alternatives.length === 0) {
    drawer.innerHTML = `
      <div class="quick-swap-header">
        <span><i class="fa-solid fa-shuffle"></i> 대체 운동 추천</span>
        <button type="button" class="enc-cart-clear-btn" onclick="openEditExerciseModal('${ex.id}')">전체 도감에서 교체</button>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-muted);">동일 부위 추천 기구가 없습니다. 전체 도감에서 선택해 보세요.</div>
    `;
    drawer.classList.remove('hidden');
    return;
  }

  const chipsHtml = alternatives.map(alt => {
    const svg = (typeof getExerciseSvgIcon === 'function') ? getExerciseSvgIcon(alt.name, alt.category) : '';
    const equipLabel = getEquipCategoryShortLabel(alt.equipCategory) || alt.equipmentType || alt.category;
    const guideTag = alt.imageUrl ? ` <span class="quick-swap-guide-indicator" title="2단계 동작 가이드 포함"><i class="fa-solid fa-person-running"></i> 도감</span>` : '';
    return `
      <button type="button" class="quick-swap-chip" onclick="quickSwapExercise('${ex.id}', '${escapeHtml(alt.name)}')">
        <div class="quick-swap-chip-icon">${svg}</div>
        <div class="quick-swap-chip-info">
          <span class="quick-swap-chip-name">${escapeHtml(alt.name)}${guideTag}</span>
          <span class="quick-swap-chip-sub">${escapeHtml(equipLabel)} · ${alt.category === '유산소' ? `${alt.defaultWeight}km/h` : `${alt.defaultWeight}kg`}</span>
        </div>
      </button>
    `;
  }).join('');

  drawer.innerHTML = `
    <div class="quick-swap-header">
      <span><i class="fa-solid fa-shuffle"></i> 기구 자리 없을 때 1-클릭 대체 추천 (${alternatives.length}종)</span>
      <button type="button" class="enc-cart-clear-btn" onclick="openEditExerciseModal('${ex.id}')">전체 도감 열기</button>
    </div>
    <div class="quick-swap-list">
      ${chipsHtml}
    </div>
  `;
  drawer.classList.remove('hidden');
}

function quickSwapExercise(exId, targetName) {
  const exercises = state.workouts[state.currentDate] || [];
  const ex = exercises.find(e => e.id === exId);
  if (!ex || !targetName) return;

  const oldName = ex.name;
  const oldCatalog = (typeof EQUIPMENT_CATALOG !== 'undefined')
    ? EQUIPMENT_CATALOG.find(item => item.name === oldName)
    : null;
  const targetCatalog = (typeof EQUIPMENT_CATALOG !== 'undefined')
    ? EQUIPMENT_CATALOG.find(item => item.name === targetName)
    : EXERCISE_DATABASE.find(item => item.name === targetName);

  const newCat = targetCatalog?.category || ex.category || '가슴';
  const isCardio = newCat === '유산소' || targetName.includes('러닝') || targetName.includes('사이클') || targetName.includes('런닝');
  const newDefaultWeight = targetCatalog?.defaultWeight ?? targetCatalog?.weight ?? (isCardio ? 9.0 : 40);
  const newDefaultReps = targetCatalog?.defaultReps ?? targetCatalog?.reps ?? (isCardio ? 20 : 12);

  ex.name = targetName;
  ex.category = newCat;
  ex.type = isCardio ? 'cardio' : 'strength';
  ex.restSeconds = targetCatalog?.restSeconds || getDefaultRestForExercise(targetName, newCat);

  if (Array.isArray(ex.sets)) {
    ex.sets.forEach(s => {
      if (!s.completed) {
        if (!oldCatalog || Number(s.weight) === Number(oldCatalog.defaultWeight)) {
          s.weight = newDefaultWeight;
        }
        if (!oldCatalog || Number(s.targetReps) === Number(oldCatalog.defaultReps)) {
          s.targetReps = newDefaultReps;
          s.actualReps = newDefaultReps;
        }
      }
    });
  }

  if (state.selectedExercisesForGraph.includes(oldName)) {
    const idx = state.selectedExercisesForGraph.indexOf(oldName);
    if (idx !== -1) state.selectedExercisesForGraph[idx] = targetName;
  } else if (!state.selectedExercisesForGraph.includes(targetName)) {
    state.selectedExercisesForGraph.push(targetName);
  }

  saveState();
  updateUI();
}

function focusExerciseGraph(exerciseName) {
  renderExerciseWeightChart();

  const chartSec = document.getElementById('exerciseChartSection');
  if (chartSec) {
    chartSec.scrollIntoView({ behavior: 'smooth' });
  }
}

let editingExerciseId = null;
let activeEncyclopediaCategory = 'all';
let activeEncyclopediaEquipType = 'all';
let activeEncyclopediaSearch = '';
let selectedEncyclopediaItem = null;
let activeRoutineLevel = 'all';

function updateRestPresetChips(seconds) {
  const chips = document.querySelectorAll('#restPresetChips .rest-chip');
  chips.forEach(chip => {
    const sec = Number(chip.dataset.sec);
    if (sec === Number(seconds)) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

function switchAddExerciseModalTab(tabName) {
  const encTabBtn = document.getElementById('tabEncyclopediaBtn');
  const routinesTabBtn = document.getElementById('tabRoutinesBtn');
  const directTabBtn = document.getElementById('tabDirectInputBtn');
  const encPanel = document.getElementById('encyclopediaPanel');
  const routinesPanel = document.getElementById('routinesPanel');
  const directPanel = document.getElementById('directInputPanel');
  const tuningSec = document.querySelector('.enc-tuning-section');
  const modalFooter = document.querySelector('#addExerciseModal .modal-footer');

  if (!encTabBtn || !directTabBtn || !encPanel || !directPanel) return;

  // Reset tab active states
  [encTabBtn, routinesTabBtn, directTabBtn].forEach(b => b && b.classList.remove('active'));
  [encPanel, routinesPanel, directPanel].forEach(p => p && p.classList.add('hidden'));

  if (tabName === 'encyclopedia') {
    encTabBtn.classList.add('active');
    encPanel.classList.remove('hidden');
    if (tuningSec) tuningSec.classList.remove('hidden');
    if (modalFooter) modalFooter.classList.remove('hidden');
    renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, activeEncyclopediaEquipType);
  } else if (tabName === 'routines') {
    if (routinesTabBtn) routinesTabBtn.classList.add('active');
    if (routinesPanel) routinesPanel.classList.remove('hidden');
    if (tuningSec) tuningSec.classList.add('hidden');
    if (modalFooter) modalFooter.classList.add('hidden');
    renderRoutineRecommendations(activeRoutineLevel);
  } else {
    directTabBtn.classList.add('active');
    directPanel.classList.remove('hidden');
    if (tuningSec) tuningSec.classList.remove('hidden');
    if (modalFooter) modalFooter.classList.remove('hidden');
    renderPresetChips();
  }
}

function renderRoutineRecommendations(level = 'all') {
  activeRoutineLevel = level;
  const container = document.getElementById('routinePacksContainer');
  if (!container || typeof RECOMMENDED_ROUTINES === 'undefined') return;

  const filtered = RECOMMENDED_ROUTINES.filter(r => level === 'all' || r.level === level);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 24px 0; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        해당 레벨의 추천 루틴이 없습니다.
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(pack => {
    const levelClass = pack.level === 'beginner' ? 'beg' : (pack.level === 'intermediate' ? 'int' : 'exp');
    
    const exChipsHtml = pack.exercises.map(ex => {
      const svgIcon = typeof getExerciseSvgIcon === 'function' ? getExerciseSvgIcon(ex.name, ex.category) : '';
      return `
        <div class="routine-pack-ex-chip" title="${escapeHtml(ex.name)} (${ex.sets}세트)">
          <div class="ex-mini-icon">${svgIcon}</div>
          <span>${escapeHtml(ex.name)}</span>
          <span class="ex-sets-count">${ex.sets}세트</span>
        </div>
      `;
    }).join('');

    return `
      <div class="routine-pack-card ${levelClass}">
        <div class="routine-pack-header">
          <div class="routine-pack-title">${escapeHtml(pack.title)}</div>
          <span class="routine-pack-level-badge badge-${pack.badgeColor}">${escapeHtml(pack.levelLabel)}</span>
        </div>
        <div class="routine-pack-desc">${escapeHtml(pack.subtitle)}</div>
        <div class="routine-pack-meta">
          <span class="routine-meta-item"><i class="fa-solid fa-stopwatch text-cyan"></i> 약 ${pack.estimatedMinutes}분</span>
          <span class="routine-meta-item"><i class="fa-solid fa-bullseye text-emerald"></i> ${escapeHtml(pack.target)}</span>
          <span class="routine-meta-item"><i class="fa-solid fa-dumbbell text-orange"></i> ${pack.exercises.length}개 종목</span>
        </div>
        <div class="routine-pack-ex-list">
          ${exChipsHtml}
        </div>
        <button type="button" class="btn-apply-routine" onclick="applyRoutinePack('${pack.id}')">
          <i class="fa-solid fa-plus-circle"></i> 이 루틴 전체 추가하기 (${pack.exercises.length}종목)
        </button>
      </div>
    `;
  }).join('');
}

function applyRoutinePack(routineId) {
  if (typeof RECOMMENDED_ROUTINES === 'undefined') return;
  const pack = RECOMMENDED_ROUTINES.find(r => r.id === routineId);
  if (!pack) return;

  if (!state.workouts[state.currentDate]) {
    state.workouts[state.currentDate] = [];
  }

  const existingCount = state.workouts[state.currentDate].length;
  if (existingCount > 0) {
    if (!confirm(`오늘 이미 ${existingCount}개의 운동이 등록되어 있습니다.\n"${pack.title}" (${pack.exercises.length}개 종목)을(를) 추가하시겠습니까?`)) {
      return;
    }
  }

  pack.exercises.forEach(exSpec => {
    const isCardio = exSpec.category === '유산소' || exSpec.name.includes('러닝') || exSpec.name.includes('사이클') || exSpec.name.includes('계단');
    const numSets = Math.max(1, Number(exSpec.sets) || 3);
    const weightVal = Number(exSpec.weight) || (isCardio ? 8.0 : 40);
    const repsVal = Number(exSpec.reps) || (isCardio ? 20 : 12);
    const restVal = Number(exSpec.restSeconds) || 90;

    const sets = [];
    for (let i = 1; i <= numSets; i++) {
      sets.push({
        setNumber: i,
        weight: weightVal,
        targetReps: repsVal,
        actualReps: repsVal,
        completed: false,
        type: 'work'
      });
    }

    const newExercise = {
      id: generateId(),
      name: exSpec.name,
      category: exSpec.category || '가슴',
      type: isCardio ? 'cardio' : 'weight',
      restSeconds: restVal,
      sets: sets
    };

    insertExerciseByCompletionStatus(state.workouts[state.currentDate], newExercise);
  });

  saveState();
  updateUI();
  closeAddExerciseModal();

  alert(`🎯 "${pack.title}" (${pack.exercises.length}개 종목)이 오늘 운동 일지에 등록되었습니다!`);
}

let encyclopediaCart = [];

function toggleFavoriteExercise(exerciseName, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  if (!exerciseName) return;
  if (!Array.isArray(state.favoriteExercises)) {
    state.favoriteExercises = [];
  }
  const idx = state.favoriteExercises.indexOf(exerciseName);
  if (idx >= 0) {
    state.favoriteExercises.splice(idx, 1);
  } else {
    state.favoriteExercises.unshift(exerciseName);
  }
  localStorage.setItem('fit_tracker_favorite_exercises_v1', JSON.stringify(state.favoriteExercises));
  renderEncyclopediaPersonalBar();
  renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, activeEncyclopediaEquipType);
}

function getRecentExerciseNames(limit = 12) {
  const recent = [];
  const seen = new Set();
  const sortedDates = Object.keys(state.workouts || {}).sort().reverse();
  for (const dateStr of sortedDates) {
    const list = state.workouts[dateStr];
    if (!Array.isArray(list)) continue;
    for (let i = list.length - 1; i >= 0; i--) {
      const name = list[i]?.name?.trim();
      if (name && !seen.has(name)) {
        seen.add(name);
        recent.push(name);
        if (recent.length >= limit) return recent;
      }
    }
  }
  return recent;
}

function renderEncyclopediaPersonalBar() {
  const bar = document.getElementById('encyclopediaPersonalBar');
  if (!bar) return;

  const favs = Array.isArray(state.favoriteExercises) ? state.favoriteExercises.slice(0, 6) : [];
  const recents = getRecentExerciseNames(8).filter(name => !favs.includes(name)).slice(0, 6);

  if ((favs.length === 0 && recents.length === 0) || activeEncyclopediaSearch.trim() !== '') {
    bar.classList.add('hidden');
    bar.innerHTML = '';
    return;
  }

  const favChips = favs.map(name => `
    <button type="button" class="enc-personal-chip fav-chip" onclick="selectEncyclopediaItem('${escapeHtml(name)}', false)" title="즐겨찾기 운동 빠른 선택">
      <span>⭐</span><span>${escapeHtml(name)}</span>
    </button>
  `).join('');

  const recentChips = recents.map(name => `
    <button type="button" class="enc-personal-chip" onclick="selectEncyclopediaItem('${escapeHtml(name)}', false)" title="최근 수행 운동 빠른 선택">
      <span>🕒</span><span>${escapeHtml(name)}</span>
    </button>
  `).join('');

  bar.innerHTML = `
    <span class="enc-personal-label">빠른 선택</span>
    ${favChips}
    ${recentChips}
  `;
  bar.classList.remove('hidden');
}

function updateSubmitAddExerciseButton() {
  const submitBtn = document.getElementById('submitAddExerciseBtn');
  if (!submitBtn) return;

  if (editingExerciseId) {
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> 운동 교체하기';
  } else if (encyclopediaCart.length > 1) {
    submitBtn.innerHTML = `<i class="fa-solid fa-layer-group"></i> 선택한 ${encyclopediaCart.length}개 운동 일괄 추가하기`;
  } else {
    submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> 운동 추가하기';
  }
}

function syncActiveCartItemTuning() {
  if (editingExerciseId || encyclopediaCart.length === 0) return;
  const activeName = document.getElementById('exerciseNameInput')?.value.trim();
  if (!activeName) return;
  const target = encyclopediaCart.find(c => c.name === activeName);
  if (!target) return;

  target.category = document.getElementById('exerciseCategorySelect')?.value || target.category;
  target.weight = Number(document.getElementById('defaultWeightInput')?.value) || 0;
  target.reps = Number(document.getElementById('defaultRepsInput')?.value) || 10;
  target.restSeconds = Number(document.getElementById('defaultRestInput')?.value) || 90;
  renderEncyclopediaCartBar();
}

function focusEncyclopediaCartItem(exerciseName) {
  const cartItem = encyclopediaCart.find(c => c.name === exerciseName);
  if (!cartItem) return;
  const catItem = (typeof EQUIPMENT_CATALOG !== 'undefined')
    ? EQUIPMENT_CATALOG.find(e => e.name === exerciseName)
    : null;
  if (catItem) selectedEncyclopediaItem = catItem;

  const nameInput = document.getElementById('exerciseNameInput');
  const catSelect = document.getElementById('exerciseCategorySelect');
  const weightInput = document.getElementById('defaultWeightInput');
  const repsInput = document.getElementById('defaultRepsInput');
  const restInput = document.getElementById('defaultRestInput');

  if (nameInput) nameInput.value = cartItem.name;
  if (catSelect) {
    catSelect.value = cartItem.category;
    updateAddFormLabels(cartItem.category);
  }
  if (weightInput) weightInput.value = cartItem.weight;
  if (repsInput) repsInput.value = cartItem.reps;
  if (restInput) restInput.value = cartItem.restSeconds;
  updateRestPresetChips(cartItem.restSeconds);

  renderEncyclopediaCartBar();
  renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, activeEncyclopediaEquipType);
}

function removeEncyclopediaCartItem(exerciseName, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  encyclopediaCart = encyclopediaCart.filter(c => c.name !== exerciseName);
  if (selectedEncyclopediaItem?.name === exerciseName) {
    const last = encyclopediaCart[encyclopediaCart.length - 1];
    if (last) {
      focusEncyclopediaCartItem(last.name);
      return;
    } else {
      selectedEncyclopediaItem = null;
      const nameInput = document.getElementById('exerciseNameInput');
      if (nameInput) nameInput.value = '';
      const banner = document.getElementById('encyclopediaSelectedBanner');
      if (banner) banner.classList.add('hidden');
    }
  }
  renderEncyclopediaCartBar();
  updateSubmitAddExerciseButton();
  renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, activeEncyclopediaEquipType);
}

function clearEncyclopediaCart() {
  encyclopediaCart = [];
  selectedEncyclopediaItem = null;
  const nameInput = document.getElementById('exerciseNameInput');
  if (nameInput) nameInput.value = '';
  const banner = document.getElementById('encyclopediaSelectedBanner');
  if (banner) banner.classList.add('hidden');
  renderEncyclopediaCartBar();
  updateSubmitAddExerciseButton();
  renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, activeEncyclopediaEquipType);
}

function renderEncyclopediaCartBar() {
  const bar = document.getElementById('encyclopediaCartBar');
  if (!bar) return;

  if (editingExerciseId || encyclopediaCart.length === 0) {
    bar.classList.add('hidden');
    bar.innerHTML = '';
    return;
  }

  const activeName = document.getElementById('exerciseNameInput')?.value.trim();
  const chipsHtml = encyclopediaCart.map((c, idx) => {
    const isTuning = c.name === activeName;
    const unit = c.category === '유산소' ? `${c.weight}km/h` : `${c.weight}kg`;
    return `
      <div class="enc-cart-chip ${isTuning ? 'active-tuning' : ''}" onclick="focusEncyclopediaCartItem('${escapeHtml(c.name)}')" title="클릭하여 이 운동의 무게/횟수/휴식 개별 설정">
        <span>${idx + 1}. ${escapeHtml(c.name)} (${unit})</span>
        <button type="button" class="enc-cart-chip-remove" onclick="removeEncyclopediaCartItem('${escapeHtml(c.name)}', event)" aria-label="${escapeHtml(c.name)} 선택 해제">×</button>
      </div>
    `;
  }).join('');

  bar.innerHTML = `
    <div class="enc-cart-header">
      <span><i class="fa-solid fa-basket-shopping"></i> 담은 운동 (${encyclopediaCart.length}종목) — 카드를 추가로 눌러 여러 개를 한 번에 담을 수 있어요</span>
      <button type="button" class="enc-cart-clear-btn" onclick="clearEncyclopediaCart()">전체 비우기</button>
    </div>
    <div class="enc-cart-chips">
      ${chipsHtml}
    </div>
  `;
  bar.classList.remove('hidden');
}

function resetEncyclopediaFilters() {
  activeEncyclopediaCategory = 'all';
  activeEncyclopediaEquipType = 'all';
  activeEncyclopediaSearch = '';

  const searchInput = document.getElementById('encyclopediaSearchInput');
  if (searchInput) searchInput.value = '';

  document.querySelectorAll('.enc-filter-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === 'all');
  });
  document.querySelectorAll('.enc-equip-chip').forEach(chip => {
    chip.classList.toggle('active', chip.dataset.equip === 'all');
  });

  renderEquipmentEncyclopedia('all', '', 'all');
}

function renderEquipmentEncyclopedia(category = activeEncyclopediaCategory, search = activeEncyclopediaSearch, equipType = activeEncyclopediaEquipType) {
  activeEncyclopediaCategory = category;
  activeEncyclopediaSearch = search;
  activeEncyclopediaEquipType = equipType;

  const grid = document.getElementById('encyclopediaGrid');
  if (!grid || typeof EQUIPMENT_CATALOG === 'undefined') return;

  renderEncyclopediaPersonalBar();

  const trimmedSearch = (search || '').trim();
  const clearBtn = document.getElementById('encyclopediaSearchClearBtn');
  if (clearBtn) {
    clearBtn.classList.toggle('hidden', !trimmedSearch);
  }

  const favSet = new Set(Array.isArray(state.favoriteExercises) ? state.favoriteExercises : []);
  const recentList = category === 'recent' ? getRecentExerciseNames(24) : [];
  const recentSet = new Set(recentList);

  const matchedItems = [];
  EQUIPMENT_CATALOG.forEach(item => {
    if (category === 'favorites') {
      if (!favSet.has(item.name)) return;
    } else if (category === 'recent') {
      if (!recentSet.has(item.name)) return;
    } else if (category !== 'all' && item.category !== category) {
      return;
    }

    if (equipType !== 'all' && item.equipCategory !== equipType) {
      return;
    }
    const searchRes = matchExerciseSearch(item, trimmedSearch);
    if (!searchRes.matched) {
      return;
    }
    matchedItems.push({ item, matchedAlias: searchRes.matchedAlias });
  });

  if (category === 'recent') {
    matchedItems.sort((a, b) => recentList.indexOf(a.item.name) - recentList.indexOf(b.item.name));
  }

  const countBadge = document.getElementById('encyclopediaResultCount');
  if (countBadge) {
    countBadge.textContent = `${matchedItems.length}종`;
  }

  if (matchedItems.length === 0) {
    const emptyMsg = category === 'favorites'
      ? '⭐ 즐겨찾기한 운동 기구가 없습니다.<br><span style="font-size:0.75rem; color:var(--text-dim);">운동 카드 좌측 상단의 ☆ 버튼을 눌러 자주 쓰는 기구를 등록해 보세요!</span>'
      : category === 'recent'
      ? '🕒 최근 수행한 운동 기록이 없습니다.'
      : '일치하는 운동 기구가 없습니다.';

    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 24px 0; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-question" style="font-size: 1.5rem; margin-bottom: 6px; display: block; color: var(--text-dim);"></i>
        ${emptyMsg}<br>
        <button type="button" class="btn btn-secondary" style="margin-top: 8px; padding: 5px 12px; font-size: 0.78rem;" onclick="resetEncyclopediaFilters()">
          <i class="fa-solid fa-rotate-left"></i> 전체 목록 보기
        </button>
      </div>
    `;
    return;
  }

  const currentInputName = document.getElementById('exerciseNameInput')?.value || '';

  grid.innerHTML = matchedItems.map(({ item, matchedAlias }) => {
    const cartIdx = !editingExerciseId ? encyclopediaCart.findIndex(c => c.name === item.name) : -1;
    const isInCart = cartIdx >= 0;
    const isSelected = selectedEncyclopediaItem?.name === item.name || currentInputName === item.name;
    const isFav = favSet.has(item.name);
    const svgIcon = (typeof getExerciseSvgIcon === 'function') ? getExerciseSvgIcon(item.name, item.category) : '';
    const equipBadgeText = getEquipCategoryShortLabel(item.equipCategory);
    const aliasBadgeHtml = matchedAlias ? `<div class="enc-alias-match-badge">#${escapeHtml(matchedAlias)}</div>` : '';
    const cartBadgeHtml = isInCart ? `<span class="enc-card-cart-badge" title="담은 순서 ${cartIdx + 1}번">${cartIdx + 1}</span>` : '';
    const guideBadgeHtml = item.imageUrl ? `<button type="button" class="enc-card-guide-badge" onclick="openExerciseDiagramByName('${escapeHtml(item.name)}', event)" title="2단계 동작 가이드 도감 크게 보기" aria-label="${escapeHtml(item.name)} 2단계 동작 가이드 보기"><i class="fa-solid fa-person-running"></i> 도감 가이드</button>` : '';

    return `
      <div class="enc-card ${isSelected ? 'selected' : ''} ${isInCart ? 'in-cart' : ''}" data-name="${escapeHtml(item.name)}" role="button" tabindex="0" aria-pressed="${isSelected || isInCart}" onclick="selectEncyclopediaItem('${escapeHtml(item.name)}', false)" onkeydown="if(event.key === 'Enter' || event.key === ' ') { event.preventDefault(); selectEncyclopediaItem('${escapeHtml(item.name)}', false); }">
        <button type="button" class="enc-fav-btn ${isFav ? 'active' : ''}" onclick="toggleFavoriteExercise('${escapeHtml(item.name)}', event)" aria-label="${escapeHtml(item.name)} 즐겨찾기 ${isFav ? '해제' : '추가'}" title="즐겨찾기 ${isFav ? '해제' : '추가'}">
          <i class="fa-${isFav ? 'solid' : 'regular'} fa-star"></i>
        </button>
        ${cartBadgeHtml}
        ${guideBadgeHtml}
        <div class="enc-card-svg-wrap">
          ${svgIcon}
        </div>
        ${aliasBadgeHtml}
        <div class="enc-card-name">${highlightSearchText(item.name, trimmedSearch)}</div>
        <div class="enc-card-eng">${highlightSearchText(item.englishName || '', trimmedSearch)}</div>
        <div class="enc-card-badge-row">
          <span class="enc-badge cat">${escapeHtml(item.category)}</span>
          ${equipBadgeText ? `<span class="enc-badge equip-type">${escapeHtml(equipBadgeText)}</span>` : ''}
          <span class="enc-badge">${item.category === '유산소' ? `${item.defaultWeight}km/h` : `${item.defaultWeight}kg`}</span>
        </div>
      </div>
    `;
  }).join('');
}

function selectEncyclopediaItem(exerciseName, scrollToSettings = false) {
  if (typeof EQUIPMENT_CATALOG === 'undefined') return;
  const item = EQUIPMENT_CATALOG.find(e => e.name === exerciseName);
  if (!item) return;

  if (!editingExerciseId) {
    const existingIdx = encyclopediaCart.findIndex(c => c.name === item.name);
    if (existingIdx >= 0) {
      // Toggle off if already in cart
      removeEncyclopediaCartItem(item.name);
      return;
    } else {
      encyclopediaCart.push({
        name: item.name,
        category: item.category,
        weight: item.defaultWeight,
        reps: item.defaultReps,
        restSeconds: item.restSeconds || getDefaultRestForExercise(item.name, item.category)
      });
    }
  }

  selectedEncyclopediaItem = item;

  const nameInput = document.getElementById('exerciseNameInput');
  const catSelect = document.getElementById('exerciseCategorySelect');
  const weightInput = document.getElementById('defaultWeightInput');
  const repsInput = document.getElementById('defaultRepsInput');
  const restInput = document.getElementById('defaultRestInput');

  if (nameInput) nameInput.value = item.name;
  if (catSelect) {
    catSelect.value = item.category;
    updateAddFormLabels(item.category);
  }
  if (weightInput) weightInput.value = item.defaultWeight;
  if (repsInput) repsInput.value = item.defaultReps;
  if (restInput) restInput.value = item.restSeconds;
  updateRestPresetChips(item.restSeconds);

  // Update Selected Summary Banner & 2-Stage Diagram
  const banner = document.getElementById('encyclopediaSelectedBanner');
  const bannerIcon = document.getElementById('encSelectedIcon');
  const bannerTitle = document.getElementById('encSelectedTitle');
  const bannerDesc = document.getElementById('encSelectedDesc');
  const diagramWrap = document.getElementById('encSelectedDiagramWrap');
  const diagramImg = document.getElementById('encSelectedDiagramImg');

  if (banner && bannerIcon && bannerTitle && bannerDesc) {
    banner.classList.remove('hidden');
    bannerIcon.innerHTML = getExerciseSvgIcon(item.name, item.category);
    bannerTitle.textContent = `${item.name} (${item.equipmentType || item.category})`;
    bannerDesc.textContent = `💡 ${item.tips || item.targetMuscles}`;

    if (diagramWrap && diagramImg) {
      if (item.imageUrl) {
        diagramImg.onload = () => { diagramWrap.classList.remove('hidden'); };
        diagramImg.onerror = () => { diagramWrap.classList.add('hidden'); };
        diagramImg.src = item.imageUrl;
        diagramImg.alt = `${item.name} 2단계 동작 가이드`;
      } else {
        diagramWrap.classList.add('hidden');
        diagramImg.src = '';
      }
    }
  }

  renderEncyclopediaCartBar();
  updateSubmitAddExerciseButton();
  renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, activeEncyclopediaEquipType);
  if (scrollToSettings) document.querySelector('.enc-tuning-section')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

function openExerciseDiagramModal(item = selectedEncyclopediaItem) {
  if (!item) return;
  if (!item.imageUrl && typeof EQUIPMENT_CATALOG !== 'undefined') {
    const found = EQUIPMENT_CATALOG.find(e => e.name === item.name)
      || EQUIPMENT_CATALOG.find(e => e.aliases?.includes(item.name));
    if (found) item = found;
  }
  if (!item || !item.imageUrl) return;

  selectedEncyclopediaItem = item;
  const modal = document.getElementById('exerciseDiagramModal');
  const title = document.getElementById('diagramModalExerciseName');
  const muscles = document.getElementById('diagramModalMuscles');
  const tips = document.getElementById('diagramModalTips');
  const img = document.getElementById('diagramModalImg');

  if (title) title.textContent = `${item.name} (${item.englishName || item.equipmentType || ''})`;
  if (muscles) muscles.textContent = `🎯 자극 부위: ${item.targetMuscles || '-'}`;
  if (tips) tips.textContent = `💡 핵심 팁: ${item.tips || '-'}`;
  if (img) {
    img.src = item.imageUrl;
    img.alt = `${item.name} 2단계 동작 가이드`;
  }

  if (modal) modal.classList.remove('hidden');
}

function openExerciseDiagramByName(exerciseName, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  if (!exerciseName || typeof EQUIPMENT_CATALOG === 'undefined') return;
  const item = EQUIPMENT_CATALOG.find(e => e.name === exerciseName)
    || EQUIPMENT_CATALOG.find(e => e.aliases?.includes(exerciseName));
  if (!item || !item.imageUrl) return;

  openExerciseDiagramModal(item);
}

function closeExerciseDiagramModal() {
  const modal = document.getElementById('exerciseDiagramModal');
  if (modal) modal.classList.add('hidden');
}

window.openExerciseDiagramModal = openExerciseDiagramModal;
window.closeExerciseDiagramModal = closeExerciseDiagramModal;

let addModalReturnFocus;
function showAddExerciseModal(modal) {
  if (!modal) return;
  addModalReturnFocus = document.activeElement;
  modal.classList.remove('hidden');
  document.body.classList.add('add-modal-open');
  document.getElementById('addExerciseForm').scrollTop = 0;
  document.getElementById('closeAddModalBtn').focus({ preventScroll: true });
}

function openAddExerciseModal() {
  editingExerciseId = null;
  selectedEncyclopediaItem = null;
  encyclopediaCart = [];
  const modal = document.getElementById('addExerciseModal');
  const modalTitle = document.getElementById('addExerciseModalTitle');
  const submitBtn = document.getElementById('submitAddExerciseBtn');

  if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-dumbbell text-cyan"></i> 운동 기구 / 종목 선택';
  if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-plus"></i> 운동 추가하기';

  document.getElementById('exerciseNameInput').value = '';
  document.getElementById('exerciseCategorySelect').value = '가슴';
  document.getElementById('defaultWeightInput').value = 40;
  document.getElementById('defaultRepsInput').value = 12;

  const defaultRest = getDefaultRestForExercise('', '가슴');
  const restInput = document.getElementById('defaultRestInput');
  if (restInput) restInput.value = defaultRest;
  updateRestPresetChips(defaultRest);

  updateAddFormLabels('가슴');

  // Reset selected banner & cart bar
  const banner = document.getElementById('encyclopediaSelectedBanner');
  if (banner) banner.classList.add('hidden');
  renderEncyclopediaCartBar();

  // Reset search input & filters
  resetEncyclopediaFilters();

  initAudioContext();
  switchAddExerciseModalTab('encyclopedia');
  showAddExerciseModal(modal);
}

function openEditExerciseModal(exId) {
  const exercises = state.workouts[state.currentDate] || [];
  const ex = exercises.find(e => e.id === exId);
  if (!ex) return;

  editingExerciseId = exId;
  encyclopediaCart = [];
  renderEncyclopediaCartBar();
  const modal = document.getElementById('addExerciseModal');
  const modalTitle = document.getElementById('addExerciseModalTitle');
  const submitBtn = document.getElementById('submitAddExerciseBtn');

  if (modalTitle) modalTitle.innerHTML = '<i class="fa-solid fa-pen-to-square"></i> 운동 기구 / 종목 교체';
  if (submitBtn) submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> 운동 교체하기';

  const isCardio = isCardioExercise(ex);
  const firstSet = ex.sets && ex.sets[0];

  document.getElementById('exerciseNameInput').value = ex.name;
  document.getElementById('exerciseCategorySelect').value = ex.category || '가슴';
  updateAddFormLabels(ex.category || '가슴');

  if (firstSet) {
    document.getElementById('defaultWeightInput').value = firstSet.weight;
    document.getElementById('defaultRepsInput').value = firstSet.targetReps;
  } else {
    document.getElementById('defaultWeightInput').value = isCardio ? 9.0 : 40;
    document.getElementById('defaultRepsInput').value = isCardio ? 20 : 12;
  }

  const restSec = ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category);
  const restInput = document.getElementById('defaultRestInput');
  if (restInput) restInput.value = restSec;
  updateRestPresetChips(restSec);

  initAudioContext();
  switchAddExerciseModalTab('encyclopedia');
  selectEncyclopediaItem(ex.name);
  showAddExerciseModal(modal);
}

function closeAddExerciseModal() {
  editingExerciseId = null;
  selectedEncyclopediaItem = null;
  encyclopediaCart = [];
  renderEncyclopediaCartBar();
  const modal = document.getElementById('addExerciseModal');
  if (modal) modal.classList.add('hidden');
  document.body.classList.remove('add-modal-open');
  if (addModalReturnFocus?.isConnected) addModalReturnFocus.focus({ preventScroll: true });
}

function replaceExercise(exId, name, category, defaultWeight = 40, defaultReps = 12, restSeconds = 90) {
  const trimmedName = name.trim();
  if (!trimmedName) return;

  const exercises = state.workouts[state.currentDate] || [];
  const ex = exercises.find(e => e.id === exId);
  if (!ex) return;

  const oldName = ex.name;

  let mappedCategory = category;
  const dbMatch = EXERCISE_DATABASE.find(item => item.name.toLowerCase() === trimmedName.toLowerCase());
  if (dbMatch && dbMatch.category) {
    mappedCategory = dbMatch.category;
  }

  const isCardio = mappedCategory === '유산소' || trimmedName.includes('러닝') || trimmedName.includes('사이클') || trimmedName.includes('런닝');
  const numReps = Math.max(1, Number(defaultReps) || (isCardio ? 20 : 12));
  const parsedDefaultWeight = Number(defaultWeight);
  const initWeight = Number.isFinite(parsedDefaultWeight) && parsedDefaultWeight >= 0
    ? parsedDefaultWeight
    : (isCardio ? 9.0 : 40);

  ex.name = trimmedName;
  ex.category = mappedCategory;
  ex.type = isCardio ? 'cardio' : 'strength';
  ex.restSeconds = Number(restSeconds) || getDefaultRestForExercise(trimmedName, mappedCategory);

  if (Array.isArray(ex.sets)) {
    ex.sets.forEach(s => {
      s.weight = initWeight;
      s.targetReps = numReps;
      if (!s.completed) {
        s.actualReps = numReps;
      }
    });
  }

  if (state.selectedExercisesForGraph.includes(oldName)) {
    const idx = state.selectedExercisesForGraph.indexOf(oldName);
    if (idx !== -1) {
      state.selectedExercisesForGraph[idx] = trimmedName;
    }
  } else if (!state.selectedExercisesForGraph.includes(trimmedName)) {
    state.selectedExercisesForGraph.push(trimmedName);
  }

  const existsInDefault = defaultPresets.some(dp => dp.name.trim().toLowerCase() === trimmedName.toLowerCase());
  const existsInCustom = state.customPresets.some(cp => cp.name.trim().toLowerCase() === trimmedName.toLowerCase());

  if (!existsInDefault && !existsInCustom) {
    state.customPresets.push({
      name: trimmedName,
      category: mappedCategory,
      type: isCardio ? 'cardio' : 'strength',
      weight: initWeight,
      reps: numReps,
      sets: ex.sets ? ex.sets.length : (isCardio ? 1 : 3),
      restSeconds: ex.restSeconds
    });
  }

  saveState();
  updateUI();
}

// Exercise Actions & Automatic Custom Preset Addition
function addExercise(name, category, defaultWeight = 40, defaultReps = 12, restSeconds = 90) {
  const trimmedName = name.trim();
  if (!trimmedName) return;

  if (!state.workouts[state.currentDate]) {
    state.workouts[state.currentDate] = [];
  }

  let mappedCategory = category;
  const dbMatch = EXERCISE_DATABASE.find(item => item.name.toLowerCase() === trimmedName.toLowerCase());
  if (dbMatch && dbMatch.category) {
    mappedCategory = dbMatch.category;
  }

  const isCardio = mappedCategory === '유산소' || trimmedName.includes('러닝') || trimmedName.includes('사이클') || trimmedName.includes('런닝');
  const numSets = isCardio ? 1 : 3;
  const numReps = Math.max(1, Number(defaultReps) || (isCardio ? 20 : 12));
  const parsedDefaultWeight = Number(defaultWeight);
  const initWeight = Number.isFinite(parsedDefaultWeight) && parsedDefaultWeight >= 0
    ? parsedDefaultWeight
    : (isCardio ? 9.0 : 40);

  const initialSets = [];

  for (let i = 1; i <= numSets; i++) {
    initialSets.push({
      setNumber: i,
      type: 'working',
      weight: initWeight,
      targetReps: numReps,
      actualReps: numReps,
      completed: false
    });
  }

  const finalRest = Number(restSeconds) || getDefaultRestForExercise(trimmedName, mappedCategory);

  const newExercise = {
    id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    name: trimmedName,
    category: mappedCategory,
    type: isCardio ? 'cardio' : 'strength',
    targetSets: numSets,
    collapsed: true,
    restSeconds: finalRest,
    sets: initialSets
  };

  insertExerciseByCompletionStatus(state.workouts[state.currentDate], newExercise);
  if (!state.selectedExercisesForGraph.includes(trimmedName)) {
    state.selectedExercisesForGraph.push(trimmedName);
  }

  const existsInDefault = defaultPresets.some(dp => dp.name.trim().toLowerCase() === trimmedName.toLowerCase());
  const existsInCustom = state.customPresets.some(cp => cp.name.trim().toLowerCase() === trimmedName.toLowerCase());

  if (!existsInDefault && !existsInCustom) {
    state.customPresets.push({
      name: trimmedName,
      category: mappedCategory,
      type: isCardio ? 'cardio' : 'strength',
      weight: initWeight,
      reps: numReps,
      sets: numSets,
      restSeconds: finalRest
    });
  }

  saveState();
  updateUI();
}

function deleteExercise(exId, options = {}) {
  if (!options.skipConfirm && !confirm('이 운동 종목을 삭제하시겠습니까?')) return;
  const list = state.workouts[state.currentDate] || [];
  const updatedList = list.filter(e => String(e.id) !== String(exId));
  
  if (updatedList.length === 0) {
    delete state.workouts[state.currentDate];
    state.deletedDates = state.deletedDates || [];
    if (!state.deletedDates.includes(state.currentDate)) {
      state.deletedDates.push(state.currentDate);
    }
  } else {
    state.workouts[state.currentDate] = updatedList;
  }
  
  saveState();
  updateUI();
}

// Restore only the removed set; keep edits made after deletion intact.
function deleteSpecificSet(exId, setIndex) {
  const date = state.currentDate;
  const list = state.workouts[date] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex || !ex.sets[setIndex]) return;
  if (ex.sets.length <= 1) {
    if (confirm('마지막 세트입니다. 이 운동 종목 자체를 삭제하시겠습니까?')) {
      deleteExercise(exId, { skipConfirm: true });
    }
    return;
  }
  const account = localStorage.getItem('fit_tracker_kakao_user');
  const removed = { ...ex.sets[setIndex] };
  ex.sets.splice(setIndex, 1);
  sanitizeExerciseSets(ex);
  saveState();
  updateUI();
  showSetUndo(() => {
    if (localStorage.getItem('fit_tracker_kakao_user') !== account) return;
    const current = (state.workouts[date] || []).find(e => e.id === exId);
    if (!current) return;
    current.sets.splice(Math.min(setIndex, current.sets.length), 0, removed);
    sanitizeExerciseSets(current);
    saveState();
    updateUI();
  });
}

let setUndoTimeout;
function showSetUndo(restore) {
  clearTimeout(setUndoTimeout);
  document.getElementById('setUndoToast')?.remove();
  const toast = document.createElement('div');
  toast.id = 'setUndoToast';
  const message = document.createElement('span');
  message.setAttribute('role', 'status');
  message.textContent = '세트를 삭제했어요';
  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = '되돌리기';
  button.addEventListener('click', () => {
    clearTimeout(setUndoTimeout);
    toast.remove();
    restore();
  }, { once: true });
  toast.append(message, button);
  document.body.appendChild(toast);
  setUndoTimeout = setTimeout(() => toast.remove(), 10000);
}

function removeLastSetFromExercise(exId) {
  const ex = (state.workouts[state.currentDate] || []).find(e => e.id === exId);
  if (ex) deleteSpecificSet(exId, ex.sets.length - 1);
}

function addSetToExercise(exId) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex) return;

  const isCardio = isCardioExercise(ex);
  const lastSet = ex.sets[ex.sets.length - 1] || (isCardio ? { weight: 9.0, targetReps: 20, type: 'working' } : { weight: 40, targetReps: 12, type: 'working' });

  ex.sets.push({
    setNumber: ex.sets.length + 1,
    type: lastSet.type || 'working',
    weight: Number(lastSet.weight) || (isCardio ? 9.0 : 40),
    targetReps: Number(lastSet.targetReps) || (isCardio ? 20 : 12),
    actualReps: Number(lastSet.actualReps) || Number(lastSet.targetReps) || (isCardio ? 20 : 12),
    completed: false
  });

  sanitizeExerciseSets(ex);
  saveState();
  updateUI();
}

function updateSetData(exId, setIndex, field, value) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex || !ex.sets[setIndex]) return;

  ex.sets[setIndex][field] = Number(value) || 0;
  saveState();

  updateMetricsOnly();
}

function findNextIncompleteSet(exId, setIndex) {
  const exercises = state.workouts[state.currentDate] || [];
  let currentSetFound = false;

  for (const exercise of exercises) {
    for (let index = 0; index < exercise.sets.length; index++) {
      if (!currentSetFound) {
        if (exercise.id === exId && index === setIndex) {
          currentSetFound = true;
        }
        continue;
      }

      if (!exercise.sets[index].completed) {
        return { exerciseId: exercise.id, setIndex: index };
      }
    }
  }

  return null;
}

function isExerciseFullyCompleted(exercise) {
  return Array.isArray(exercise?.sets)
    && exercise.sets.length > 0
    && exercise.sets.every(set => set.completed);
}

function insertExerciseByCompletionStatus(exercises, exercise) {
  if (isExerciseFullyCompleted(exercise)) {
    exercises.push(exercise);
    return;
  }

  const firstCompletedIndex = exercises.findIndex(isExerciseFullyCompleted);
  const insertIndex = firstCompletedIndex === -1 ? exercises.length : firstCompletedIndex;
  exercises.splice(insertIndex, 0, exercise);
}

function moveExerciseToCompletionSection(exercises, exercise) {
  const currentIndex = exercises.indexOf(exercise);
  if (currentIndex === -1) return;

  exercises.splice(currentIndex, 1);
  insertExerciseByCompletionStatus(exercises, exercise);
}

function scrollToNextCompleteButton(nextSet) {
  if (!nextSet) return;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const buttons = Array.from(document.querySelectorAll('.complete-set-btn'));
      const nextButton = buttons.find(button => (
        button.dataset.exerciseId === nextSet.exerciseId
        && Number(button.dataset.setIndex) === nextSet.setIndex
      ));
      if (!nextButton) return;

      const buttonRect = nextButton.getBoundingClientRect();
      const bottomBar = document.getElementById('fixedBottomTimerBar');
      const bottomBarTop = bottomBar
        ? bottomBar.getBoundingClientRect().top
        : window.innerHeight;
      const usableViewportBottom = Math.min(window.innerHeight, bottomBarTop);
      const desiredButtonCenter = usableViewportBottom * 0.62;
      const currentButtonCenter = buttonRect.top + (buttonRect.height / 2);
      const relativeScrollDistance = currentButtonCenter - desiredButtonCenter;

      if (relativeScrollDistance > 0) {
        const reduceMotion = window.matchMedia
          && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        window.scrollBy({
          top: relativeScrollDistance,
          left: 0,
          behavior: reduceMotion ? 'auto' : 'smooth'
        });
      }
    });
  });
}

function toggleSetComplete(exId, setIndex) {
  initAudioContext();
  requestScreenWakeLock();

  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex || !ex.sets[setIndex]) return;

  const wasDayComplete = window.OuwanCore?.isComplete(list) || false;
  const targetSet = ex.sets[setIndex];
  const wasAllSetsCompleted = ex.sets.length > 0 && ex.sets.every(set => set.completed);
  const willBeCompleted = !targetSet.completed;
  targetSet.completed = willBeCompleted;
  const allSetsCompleted = ex.sets.length > 0 && ex.sets.every(set => set.completed);
  if (allSetsCompleted) {
    ex.collapsed = true;
  } else if (!willBeCompleted) {
    ex.collapsed = false;
  }

  const nextSet = willBeCompleted ? findNextIncompleteSet(exId, setIndex) : null;
  if (nextSet) {
    const nextExercise = list.find(item => item.id === nextSet.exerciseId);
    if (nextExercise) nextExercise.collapsed = false;
  }

  if (allSetsCompleted || wasAllSetsCompleted) {
    moveExerciseToCompletionSection(list, ex);
  }

  saveState();
  updateUI();

  if (willBeCompleted && !wasDayComplete && window.OuwanCore?.isComplete(list)) {
    window.Ouwan?.completedDay(state.currentDate);
  }

  if (willBeCompleted) {
    const restSec = ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category);
    startRestTimer(restSec, `[${ex.name}]`);
    scrollToNextCompleteButton(nextSet);
  }
}

// Fixed Bottom Bar Rest Timer Engine
function startRestTimer(seconds = state.timer.defaultSeconds, label = '') {
  initAudioContext();
  requestScreenWakeLock();

  state.timer.totalSeconds = seconds;
  state.timer.remainingSeconds = seconds;
  state.timer.status = 'running';
  state.timer.hasBeeped10s = false;
  state.timer.currentLabel = label;

  updateFixedBottomTimerUI();

  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
  }

  state.timer.intervalId = setInterval(() => {
    if (state.timer.status !== 'running') return;

    state.timer.remainingSeconds--;

    if (state.timer.remainingSeconds === 10 && !state.timer.hasBeeped10s) {
      state.timer.hasBeeped10s = true;
      playBeep(1);
      playTimerVibration(1);
    }

    if (state.timer.remainingSeconds <= 0) {
      clearInterval(state.timer.intervalId);
      state.timer.remainingSeconds = 0;
      state.timer.status = 'idle';
      playBeep(2);
      playTimerVibration(2);
      
      updateFixedBottomTimerUI();
      return;
    }

    updateFixedBottomTimerUI();
  }, 1000);
}

function pauseRestTimer() {
  state.timer.status = 'paused';
  updateFixedBottomTimerUI();
}

function resumeRestTimer() {
  state.timer.status = 'running';
  updateFixedBottomTimerUI();
}

function resetRestTimer(seconds = state.timer.defaultSeconds) {
  if (state.timer.intervalId) {
    clearInterval(state.timer.intervalId);
  }
  state.timer.intervalId = null;
  state.timer.totalSeconds = seconds;
  state.timer.remainingSeconds = seconds;
  state.timer.status = 'idle';
  state.timer.hasBeeped10s = false;
  state.timer.currentLabel = '';
  updateFixedBottomTimerUI();
}

function setRestDuration(seconds) {
  const parsedSeconds = Number(seconds);
  if (!Number.isFinite(parsedSeconds)) {
    updateFixedBottomTimerUI();
    return;
  }

  const previousDefault = state.timer.defaultSeconds;
  const nextDefault = normalizeRestTimerDuration(parsedSeconds);
  const appliedDelta = nextDefault - previousDefault;
  if (appliedDelta === 0) {
    updateFixedBottomTimerUI();
    return;
  }

  state.timer.defaultSeconds = nextDefault;

  if (state.timer.status === 'running' || state.timer.status === 'paused') {
    const previousRemaining = state.timer.remainingSeconds;
    state.timer.totalSeconds = Math.max(5, state.timer.totalSeconds + appliedDelta);
    state.timer.remainingSeconds = Math.max(1, state.timer.remainingSeconds + appliedDelta);

    if (previousRemaining > 10 && state.timer.remainingSeconds <= 10) {
      state.timer.hasBeeped10s = true;
      playBeep(1);
    } else if (state.timer.remainingSeconds > 10) {
      state.timer.hasBeeped10s = false;
    }
  } else {
    state.timer.totalSeconds = nextDefault;
    state.timer.remainingSeconds = nextDefault;
  }

  saveState();
  updateFixedBottomTimerUI();
}

function updateFixedBottomTimerUI() {
  const display = document.getElementById('bottomTimerDisplay');
  const statusSub = document.getElementById('bottomTimerStatus');
  const toggleBtn = document.getElementById('bottomTimerToggleBtn');
  const durationSelect = document.getElementById('bottomTimerDurationSelect');

  if (!display || !statusSub || !toggleBtn) return;

  const remaining = Math.max(0, state.timer.remainingSeconds);
  const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
  const secs = String(remaining % 60).padStart(2, '0');

  display.textContent = `${mins}:${secs}`;
  if (durationSelect) {
    durationSelect.value = String(state.timer.defaultSeconds);
  }

  if (state.timer.status === 'running') {
    statusSub.textContent = remaining <= 10 ? '🔥 세트 준비 10초 전!' : '다음 세트 휴식 진행 중...';
    statusSub.style.color = remaining <= 10 ? '#ef4444' : 'var(--accent-emerald)';
    toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 일시정지';
    toggleBtn.className = 'btn btn-accent btn-bottom-right';
  } else if (state.timer.status === 'paused') {
    statusSub.textContent = '⏸️ 휴식 시간 일시정지됨';
    statusSub.style.color = 'var(--accent-orange)';
    toggleBtn.innerHTML = '<i class="fa-solid fa-rotate-left"></i> 재시작';
    toggleBtn.className = 'btn btn-primary btn-bottom-right';
  } else {
    // idle
    statusSub.textContent = '세트 완료 시 자동 시작';
    statusSub.style.color = 'var(--text-muted)';
    toggleBtn.innerHTML = '<i class="fa-solid fa-play"></i> 시작';
    toggleBtn.className = 'btn btn-primary btn-bottom-right';
  }
}

// Date Selector Previous Workout Importer Engine
function openImportPreviousModal() {
  const allDates = Object.keys(state.workouts).sort();
  
  // Filter for dates other than state.currentDate that have 1 or more exercises
  const pastDatesWithWorkouts = allDates
    .filter(dateStr => dateStr !== state.currentDate && Array.isArray(state.workouts[dateStr]) && state.workouts[dateStr].length > 0)
    .reverse(); // Most recent past date first

  if (pastDatesWithWorkouts.length === 0) {
    alert('가져올 이전 운동 기록이 없습니다.');
    return;
  }

  const dateSelect = document.getElementById('importDateSelect');
  const datePicker = document.getElementById('importDatePicker');
  
  if (dateSelect) {
    dateSelect.innerHTML = '';
    pastDatesWithWorkouts.forEach(dateStr => {
      const option = document.createElement('option');
      option.value = dateStr;
      const count = state.workouts[dateStr].length;
      option.textContent = `${formatDateDisplay(dateStr)} — ${count}개 종목`;
      dateSelect.appendChild(option);
    });
    dateSelect.value = pastDatesWithWorkouts[0];
  }

  if (datePicker) {
    datePicker.value = pastDatesWithWorkouts[0];
  }

  renderImportPreview(pastDatesWithWorkouts[0]);

  const modal = document.getElementById('importPreviousModal');
  if (modal) {
    modal.classList.remove('hidden');
  }
}

function closeImportPreviousModal() {
  const modal = document.getElementById('importPreviousModal');
  if (modal) {
    modal.classList.add('hidden');
  }
}

function renderImportPreview(dateStr) {
  const previewTitle = document.getElementById('importPreviewTitle');
  const previewList = document.getElementById('importPreviewList');

  if (!previewList) return;

  if (!dateStr) {
    if (previewTitle) previewTitle.innerHTML = `<i class="fa-solid fa-list-check"></i> 운동 목록 미리보기`;
    previewList.innerHTML = `<div class="import-preview-empty"><i class="fa-solid fa-circle-info"></i> 날짜를 선택해 주세요.</div>`;
    return;
  }

  const exercises = state.workouts[dateStr] || [];
  const formattedDate = formatDateDisplay(dateStr);

  if (previewTitle) {
    previewTitle.innerHTML = `<i class="fa-solid fa-list-check"></i> ${formattedDate} (${exercises.length}개 종목)`;
  }

  if (exercises.length === 0) {
    previewList.innerHTML = `<div class="import-preview-empty"><i class="fa-solid fa-circle-info"></i> 해당 날짜에 기록된 운동이 없습니다.</div>`;
    return;
  }

  previewList.innerHTML = exercises.map(ex => {
    const cat = ex.category || '기타';
    return `
      <div class="import-preview-item">
        <span class="ex-name">${escapeHtml(ex.name)}</span>
        <span class="ex-meta">${escapeHtml(cat)} · ${ex.sets ? ex.sets.length : 0}세트</span>
      </div>
    `;
  }).join('');
}

function executeImportPreviousWorkouts() {
  const datePicker = document.getElementById('importDatePicker');
  const dateSelect = document.getElementById('importDateSelect');
  
  const selectedDate = (datePicker && datePicker.value) || (dateSelect && dateSelect.value);

  if (!selectedDate) {
    alert('불러올 날짜를 선택해 주세요.');
    return;
  }

  const pastWorkouts = state.workouts[selectedDate] || [];

  if (pastWorkouts.length === 0) {
    alert(`선택한 날짜(${formatDateDisplay(selectedDate)})에 가져올 운동 기록이 없습니다.`);
    return;
  }

  if (!state.workouts[state.currentDate]) {
    state.workouts[state.currentDate] = [];
  }

  let importedCount = 0;
  pastWorkouts.forEach(prevEx => {
    const exists = state.workouts[state.currentDate].some(e => e.name === prevEx.name);
    if (!exists) {
      const copiedSets = prevEx.sets.map(s => ({
        setNumber: s.setNumber,
        weight: s.weight,
        targetReps: s.targetReps,
        actualReps: s.actualReps !== undefined ? s.actualReps : s.targetReps,
        completed: false
      }));

      insertExerciseByCompletionStatus(state.workouts[state.currentDate], {
        id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: prevEx.name,
        category: prevEx.category,
        type: prevEx.type,
        targetSets: prevEx.targetSets || copiedSets.length,
        restSeconds: prevEx.restSeconds || getDefaultRestForExercise(prevEx.name, prevEx.category),
        collapsed: true, // Imported exercise cards start folded/collapsed
        sets: copiedSets
      });
      importedCount++;
    }
  });

  saveState();
  updateUI();
  closeImportPreviousModal();

  const formattedPastDate = formatDateDisplay(selectedDate);

  if (importedCount > 0) {
    alert(`선택한 날짜(${formattedPastDate})의 ${importedCount}개 종목을 접힌 상태로 성공적으로 가져왔습니다!`);
  } else {
    alert(`선택한 날짜(${formattedPastDate})의 종목들이 이미 오늘의 목록에 모두 포함되어 있습니다.`);
  }
}

function generateRoutineCodeData() {
  return generateExerciseRoutineCode(state.workouts[state.currentDate] || [], getDefaultRestForExercise);
}

function formatWorkoutNumber(value, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits }).format(Number(value) || 0);
}

function generateWorkoutSummaryText(targetDate = state.currentDate) {
  const exercises = state.workouts[targetDate] || [];
  if (exercises.length === 0) return '';

  let totalSets = 0;
  let completedSets = 0;
  let hardSets = 0;
  let effectiveVolume = 0;
  let cardioDistance = 0;

  exercises.forEach(ex => {
    const cardio = isCardioExercise(ex);
    (ex.sets || []).forEach(set => {
      totalSets++;
      if (!set.completed) return;

      completedSets++;
      if (cardio) {
        cardioDistance += ((Number(set.weight) || 0) * (Number(set.actualReps) || 0)) / 60;
      } else if (set.type !== 'warmup') {
        hardSets++;
        effectiveVolume += (Number(set.weight) || 0) * (Number(set.actualReps) || 0);
      }
    });
  });

  const summaryParts = [
    `${exercises.length}개 종목`,
    `${completedSets}/${totalSets}세트 완료 (본세트 ${hardSets}세트)`
  ];
  if (effectiveVolume > 0) summaryParts.push(`유효 본세트 볼륨 ${formatWorkoutNumber(effectiveVolume)}kg`);
  if (cardioDistance > 0) summaryParts.push(`유산소 거리 ${formatWorkoutNumber(cardioDistance)}km`);

  const lines = [
    'FitTracker 운동 기록',
    `날짜: ${formatDateDisplay(targetDate)}`,
    `요약: ${summaryParts.join(' · ')}`,
    ''
  ];

  exercises.forEach((ex, exerciseIndex) => {
    const cardio = isCardioExercise(ex);
    const restSec = ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category);
    lines.push(`${exerciseIndex + 1}. ${ex.name} (${ex.category || '기타'}, 휴식 ${restSec}초)`);

    (ex.sets || []).forEach((set, setIndex) => {
      const weight = Number(set.weight) || 0;
      const targetReps = Number(set.targetReps) || 0;
      const actualReps = Number(set.actualReps) || 0;
      const setTypeTag = set.type === 'warmup' ? '[웜업 W]' : (set.type === 'failure' ? '[실패 F]' : (set.type === 'drop' ? '[드롭 D]' : '[본세트]'));

      if (cardio) {
        if (set.completed) {
          const distance = (weight * actualReps) / 60;
          lines.push(`- ${setIndex + 1}세트: 속도 ${formatWorkoutNumber(weight)}km/h · ${formatWorkoutNumber(actualReps)}분 (목표 ${formatWorkoutNumber(targetReps)}분) · 거리 ${formatWorkoutNumber(distance)}km · 완료`);
        } else {
          lines.push(`- ${setIndex + 1}세트: 속도 ${formatWorkoutNumber(weight)}km/h · 목표 ${formatWorkoutNumber(targetReps)}분 · 미완료`);
        }
      } else if (set.completed) {
        const setVolume = weight * actualReps;
        const volDesc = set.type === 'warmup' ? '(웜업 볼륨 제외)' : `· 볼륨 ${formatWorkoutNumber(setVolume)}kg`;
        lines.push(`- ${setIndex + 1}세트 ${setTypeTag}: ${formatWorkoutNumber(weight)}kg × ${formatWorkoutNumber(actualReps)}회 (목표 ${formatWorkoutNumber(targetReps)}회) ${volDesc} · 완료`);
      } else {
        lines.push(`- ${setIndex + 1}세트 ${setTypeTag}: ${formatWorkoutNumber(weight)}kg × 목표 ${formatWorkoutNumber(targetReps)}회 · 미완료`);
      }
    });

    if (exerciseIndex < exercises.length - 1) lines.push('');
  });

  return lines.join('\n');
}

function generateWorkoutAnalysisPromptText() {
  const currentSummary = generateWorkoutSummaryText(state.currentDate);
  if (!currentSummary) return '';

  const pastDates = Object.keys(state.workouts || {})
    .filter(d => d < state.currentDate && Array.isArray(state.workouts[d]) && state.workouts[d].length > 0)
    .sort();
  const previousDate = pastDates.length > 0 ? pastDates[pastDates.length - 1] : null;
  const previousSummary = previousDate ? generateWorkoutSummaryText(previousDate) : '';

  let prompt = `FitTracker AI 운동 분석 요청
아래 운동 수행 데이터를 바탕으로 전문 피트니스 코칭 피드백을 제공해 주세요.

[오늘 운동 기록 (${formatDateDisplay(state.currentDate)})]
${currentSummary}
`;

  if (previousSummary && previousDate) {
    prompt += `
[직전 운동 기록 (${formatDateDisplay(previousDate)})]
${previousSummary}
`;
  }

  prompt += `
---
[AI 분석 요청 사항]
1. 운동 강도 및 볼륨 평가: 본세트 볼륨 및 세트 구성의 적절성${previousSummary ? ', 직전 운동 기록 대비 점진적 과부하(Overload) 달성 여부' : ''}
2. 타깃 부위별 자극 및 밸런스: 수행 종목 간 균형과 피로도 관리
3. 근비대(Hypertrophy) 관점 피드백: 우수한 점과 보완할 점
4. 다음 운동 제안: 다음 동일 부위 운동 시 권장하는 중량/반복수 가이드
5. 세트 간 휴식시간 및 회복/부상 방지 조언`;

  return prompt;
}

function generateWorkoutCodePrompt() {
  return `FitTracker에서 불러올 운동 루틴을 만들어 주세요.

내 운동 요청을 바탕으로 아래 스키마의 JSON만 응답하세요. 설명이나 인사말, 마크다운 코드 블록(\`\`\`)은 포함하지 마세요.

형식:
{"type":"FIT_TRACKER_ROUTINE","v":1,"data":[{"idx":0,"n":"벤치프레스","c":"가슴","t":"strength","rst":150,"s":[{"w":60,"tr":12,"ar":12,"tp":"working","cmp":0}]}]}

필드 규칙:
- data: 운동 종목 배열
- idx: 운동 순서. 0부터 시작
- n: 운동 이름
- c: 부위. 가슴, 등, 하체, 어깨, 팔, 복근/코어, 유산소, 전신, 기타 중 하나
- t: 근력 운동은 strength, 유산소 운동은 cardio
- rst: 세트 간 기본 휴식시간(초). 30~180
- s: 세트 배열
- w: 근력은 중량(kg), 유산소는 속도(km/h)
- tr: 근력은 목표 횟수, 유산소는 목표 시간(분)
- ar: 새 루틴에서는 tr과 같은 값
- tp: 세트 타입. working(본세트), warmup(웜업), failure(실패지점), drop(드롭세트)
- cmp: 새 루틴에서는 항상 0

각 운동에 현실적인 중량, 횟수, 세트 수를 넣고 모든 숫자는 따옴표 없는 숫자로 작성하세요.

내 운동 요청:
[이 부분을 원하는 운동 목표, 운동 시간, 경험 수준, 운동할 부위 등으로 바꿔 주세요]`;
}

async function copyTextToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (e) {
      // Fall through for older Android/iOS WebViews.
    }
  }

  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, textarea.value.length);

  let copied = false;
  try {
    copied = document.execCommand('copy');
  } catch (e) {
    copied = false;
  }
  textarea.remove();
  return copied;
}

function generateCompactWorkoutText(targetDate) {
  const exercises = state.workouts[targetDate] || [];
  if (exercises.length === 0) return '';

  const lines = [`${formatDateDisplay(targetDate)} 운동`];
  exercises.forEach(ex => {
    const cardio = isCardioExercise(ex);
    const sets = (ex.sets || []).map(set => {
      const weight = formatWorkoutNumber(set.weight);
      const reps = formatWorkoutNumber(set.actualReps || set.targetReps);
      const done = set.completed ? '' : '(예정)';
      return cardio ? `${weight}km/h·${reps}분${done}` : `${weight}kg×${reps}회${done}`;
    });
    if (sets.length) lines.push(`- ${ex.name}${ex.category ? `(${ex.category})` : ''}: ${sets.join(', ')}`);
  });
  return lines.join('\n');
}

function generateWorkoutChatPrompt() {
  const today = generateCompactWorkoutText(state.currentDate);
  const codeInstructions = `\n\n[FitTracker에서 운동 코드 만들기 안내]\nChatGPT에게 목표, 운동 부위, 기간, 운동 가능한 장비를 말하고 "FitTracker에 가져올 수 있는 운동 코드 JSON으로 만들어줘"라고 요청하면 됩니다. 결과는 설명이나 마크다운 없이 JSON만 생성해 달라고 하세요. 예시 형식: {"type":"FIT_TRACKER_ROUTINE","v":1,"data":[{"idx":0,"n":"운동명","c":"부위","t":"strength","rst":90,"s":[{"w":20,"tr":10,"ar":10,"tp":"working","cmp":0}]}]}. 생성된 JSON 전체를 복사한 뒤 FitTracker의 [운동 코드] 메뉴에서 [운동 코드 붙여넣기]에 붙여 넣고 [운동 코드 불러오기]를 누르면 됩니다. 각 세트 타입은 working(본세트), warmup(웜업), failure(실패지점), drop(드롭세트) 중 하나를 사용하세요.`;

  if (today) {
    return `오늘 운동을 간단히 분석해 주세요. 운동 균형과 볼륨, 잘한 점, 다음 운동에서 조정할 점을 짧게 알려주세요.\n\n${today}${codeInstructions}`;
  }

  const previousDates = Object.keys(state.workouts || {})
    .filter(date => date < state.currentDate && Array.isArray(state.workouts[date]) && state.workouts[date].length > 0)
    .sort();
  const previousDate = previousDates[previousDates.length - 1];
  if (previousDate) {
    const previous = generateCompactWorkoutText(previousDate);
    return `오늘 운동 기록은 없습니다. 아래 직전 운동을 참고해 무리 없이 점진적으로 발전할 다음 루틴을 만들어 주세요. 운동 코드 생성 프롬프트에 따라 결과는 가져오기 가능한 JSON만 출력해 주세요.\n\n직전 운동:\n${previous}${codeInstructions}`;
  }

  return `운동을 처음 시작하는 초보자용 전신 루틴을 만들어 주세요. 각 운동은 3세트로 구성하고, 스쿼트·푸시·당기기·힙힌지·코어 등 기초 동작 위주로 쉬운 종목과 보수적인 중량/횟수를 제안해 주세요. 설명은 생략하고 FitTracker에서 가져올 수 있는 운동 코드 JSON만 출력해 주세요.${codeInstructions}`;
}

function openWorkoutChatPrompt() {
  const prompt = generateWorkoutChatPrompt();
  const chatUrl = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  if (window.AndroidBridge?.openExternalChatGPT) {
    window.AndroidBridge.openExternalChatGPT(chatUrl);
    return;
  }
  const iosExternalChatGPT = window.webkit?.messageHandlers?.openExternalChatGPT;
  if (iosExternalChatGPT) {
    iosExternalChatGPT.postMessage(chatUrl);
    return;
  }
  const isAppWebView = /;\s*wv\)/i.test(navigator.userAgent)
    || Boolean(window.webkit?.messageHandlers?.timerVibration);
  if (isAppWebView) {
    // Older app builds do not expose the external browser bridge yet.
    window.location.href = chatUrl;
    return;
  }
  const link = document.createElement('a');
  link.href = chatUrl;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  link.remove();
}

async function copyWorkoutSummary() {
  const summaryText = generateWorkoutAnalysisPromptText() || generateWorkoutSummaryText(state.currentDate);
  if (!summaryText) {
    alert('복사할 운동 내용이 없습니다. 먼저 운동을 추가해 주세요.');
    return;
  }

  const copied = await copyTextToClipboard(summaryText);
  if (copied) {
    alert('운동 내용과 AI 분석 프롬프트를 복사했습니다. ChatGPT에 붙여넣어 분석해 보세요!');
  } else {
    window.prompt('자동 복사가 지원되지 않습니다. 아래 운동 내용을 직접 복사해 주세요.', summaryText);
  }
}

async function copyWorkoutCodePrompt() {
  const promptText = generateWorkoutCodePrompt();
  const copied = await copyTextToClipboard(promptText);
  if (copied) {
    alert('운동 코드 생성 프롬프트를 복사했습니다. ChatGPT에 붙여넣고 마지막 운동 요청을 수정해 주세요!');
  } else {
    window.prompt('자동 복사가 지원되지 않습니다. 아래 프롬프트를 직접 복사해 주세요.', promptText);
  }
}

/**
 * Helper to compress an array of set tokens by grouping consecutive identical tokens.
 * E.g., ['60kg×10', '60kg×10', '70kg×8'] -> '60kg×10×2, 70kg×8'
 */
function compressConsecutiveSetTokens(tokens) {
  if (!tokens || tokens.length === 0) return '';
  const compressed = [];
  let currentToken = tokens[0];
  let count = 1;

  for (let i = 1; i < tokens.length; i++) {
    if (tokens[i] === currentToken) {
      count++;
    } else {
      compressed.push(count > 1 ? `${currentToken}×${count}` : currentToken);
      currentToken = tokens[i];
      count = 1;
    }
  }
  compressed.push(count > 1 ? `${currentToken}×${count}` : currentToken);
  return compressed.join(', ');
}

/**
 * Generates a compressed 3-month workout history prompt tailored for AI analysis.
 * Features:
 * - 3-month window from the latest/current workout date
 * - Consolidated aggregate stats (total volume, frequency, muscle distribution)
 * - Major compound exercise progression (1RM and peak weight tracking)
 * - Ultra-compact daily logs with grouped identical sets
 */
function generateThreeMonthsWorkoutAnalysisPrompt(referenceDateStr = null) {
  const todayStr = getTodayString();
  const baseDate = referenceDateStr || (state.currentDate > todayStr ? state.currentDate : todayStr);

  const [by, bm, bd] = baseDate.split('-').map(Number);
  const endDate = new Date(by, bm - 1, bd);
  const startDate = new Date(by, bm - 1, bd);
  startDate.setMonth(startDate.getMonth() - 3);

  const toIso = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  const startDateStr = toIso(startDate);
  const endDateStr = toIso(endDate);

  const allWorkoutDates = Object.keys(state.workouts || {});
  const validDates = allWorkoutDates
    .filter(d => d >= startDateStr && d <= endDateStr)
    .filter(d => {
      const list = state.workouts[d];
      return Array.isArray(list) && list.some(ex => Array.isArray(ex.sets) && ex.sets.length > 0);
    })
    .sort(); // Chronological: oldest to newest

  if (validDates.length === 0) {
    return null;
  }

  const totalWorkoutDays = validDates.length;
  const totalCalendarDays = Math.max(1, Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1);
  const weeklyFrequency = ((totalWorkoutDays / totalCalendarDays) * 7).toFixed(1);

  let totalVolume = 0;
  let totalCardioDistance = 0;
  const categoryVolumeMap = {};
  const exerciseStatsMap = {};
  const dailyLogSections = [];

  validDates.forEach(dateStr => {
    const exercises = state.workouts[dateStr] || [];
    let dayVolume = 0;
    let dayCardioDistance = 0;
    const dayCategories = new Set();
    const dayExerciseLines = [];

    exercises.forEach(ex => {
      if (!ex || !Array.isArray(ex.sets) || ex.sets.length === 0) return;
      const cardio = isCardioExercise(ex);
      const cat = ex.category || (cardio ? '유산소' : '기타');
      dayCategories.add(cat);

      // Prefer completed sets; fallback to all sets if none marked completed
      const completedSets = ex.sets.filter(s => s.completed);
      const setsToFormat = completedSets.length > 0 ? completedSets : ex.sets;

      const tokens = [];
      setsToFormat.forEach(s => {
        const w = Number(s.weight) || 0;
        const tr = Number(s.targetReps) || 0;
        const ar = Number(s.actualReps) || tr || 0;

        if (cardio) {
          const dist = (w * ar) / 60;
          dayCardioDistance += dist;
          totalCardioDistance += dist;
          tokens.push(`${formatWorkoutNumber(w)}km/h·${formatWorkoutNumber(ar)}분`);
        } else {
          const vol = (s.type === 'warmup') ? 0 : (w * ar);
          dayVolume += vol;
          totalVolume += vol;
          categoryVolumeMap[cat] = (categoryVolumeMap[cat] || 0) + vol;

          if (w > 0 && ar > 0 && s.type !== 'warmup') {
            const est1RM = calculateEstimated1RM(w, ar);
            if (!exerciseStatsMap[ex.name]) {
              exerciseStatsMap[ex.name] = { count: 0, category: cat, records: [] };
            }
            exerciseStatsMap[ex.name].count++;
            exerciseStatsMap[ex.name].records.push({ date: dateStr, weight: w, reps: ar, est1RM });
          }

          let token = '';
          if (s.type === 'warmup') token += '[W]';
          if (w === 0) {
            token += `맨몸×${formatWorkoutNumber(ar)}`;
          } else {
            token += `${formatWorkoutNumber(w)}kg×${formatWorkoutNumber(ar)}`;
          }
          if (s.type === 'failure') token += '[F]';
          if (s.type === 'drop') token += '[D]';
          tokens.push(token);
        }
      });

      if (tokens.length > 0) {
        const compressed = compressConsecutiveSetTokens(tokens);
        dayExerciseLines.push(`- ${ex.name}${ex.category ? `(${ex.category})` : ''}: ${compressed}`);
      }
    });

    if (dayExerciseLines.length > 0) {
      const volTag = dayVolume > 0 ? `볼륨 ${formatWorkoutNumber(dayVolume)}kg` : '';
      const cardioTag = dayCardioDistance > 0 ? `유산소 ${formatWorkoutNumber(dayCardioDistance, 1)}km` : '';
      const tagStr = [volTag, cardioTag].filter(Boolean).join(' · ');
      const catStr = Array.from(dayCategories).join('/');

      const header = `■ ${formatDateDisplay(dateStr)}${catStr ? ` [${catStr}]` : ''}${tagStr ? ` (${tagStr})` : ''}`;
      dailyLogSections.push(`${header}\n${dayExerciseLines.join('\n')}`);
    }
  });

  if (dailyLogSections.length === 0) {
    return null;
  }

  // Volume by category
  const sortedCategories = Object.entries(categoryVolumeMap)
    .sort((a, b) => b[1] - a[1]);
  const categorySummaryStr = sortedCategories
    .map(([cat, vol]) => {
      const pct = totalVolume > 0 ? Math.round((vol / totalVolume) * 100) : 0;
      return `${cat} ${pct}%(${formatWorkoutNumber(vol)}kg)`;
    })
    .join(' · ');

  // Major exercise progression
  const majorExercises = Object.entries(exerciseStatsMap)
    .sort((a, b) => b[1].records.length - a[1].records.length)
    .slice(0, 5);

  const progressHighlights = [];
  majorExercises.forEach(([name, data]) => {
    if (data.records.length === 0) return;
    const firstRec = data.records[0];
    const latestRec = data.records[data.records.length - 1];
    const bestRec = data.records.reduce((max, r) => (r.est1RM > max.est1RM ? r : max), data.records[0]);

    const firstDateTag = firstRec.date.slice(5).replace('-', '.');
    const latestDateTag = latestRec.date.slice(5).replace('-', '.');

    if (data.records.length > 1 && (firstRec.weight !== latestRec.weight || firstRec.reps !== latestRec.reps)) {
      let line = `- ${name}: 초기(${firstDateTag}) ${firstRec.weight}kg×${firstRec.reps}회(1RM ~${firstRec.est1RM}kg) → 최근(${latestDateTag}) ${latestRec.weight}kg×${latestRec.reps}회(1RM ~${latestRec.est1RM}kg)`;
      if (bestRec.est1RM > latestRec.est1RM) {
        line += ` [3개월 최고: ${bestRec.weight}kg×${bestRec.reps}회(1RM ~${bestRec.est1RM}kg)]`;
      }
      progressHighlights.push(line);
    } else {
      progressHighlights.push(`- ${name}: 최고 기록 ${bestRec.weight}kg×${bestRec.reps}회 (추정 1RM ~${bestRec.est1RM}kg, 총 ${data.records.length}회 기록)`);
    }
  });

  const promptLines = [
    '# FitTracker 최근 3개월 운동 기록 및 AI 심층 분석 요청',
    '',
    '[3개월 운동 개요 및 통계]',
    `- 분석 기간: ${startDateStr} ~ ${endDateStr} (총 ${totalCalendarDays}일 중 ${totalWorkoutDays}일 운동 / 주당 평균 ${weeklyFrequency}회)`,
    `- 누적 총 볼륨: ${formatWorkoutNumber(totalVolume)}kg`,
    `- 유산소 누적 거리: ${totalCardioDistance > 0 ? `${formatWorkoutNumber(totalCardioDistance, 1)}km` : '0km'}`,
    `- 부위별 볼륨 비중: ${categorySummaryStr || '기록 없음'}`
  ];

  if (progressHighlights.length > 0) {
    promptLines.push('', '[주요 종목 3개월 변화 추이]', ...progressHighlights);
  }

  promptLines.push(
    '',
    '[AI 코칭 분석 요청 사항]',
    '전문 피트니스/보디빌딩 코치 관점에서 위 3개월간의 압축 운동 일지를 심층 분석해 주세요:',
    '1. 점진적 과부하(Progressive Overload) 분석: 주요 종목의 중량·반복수·볼륨 성장세 평가 및 정체 부위 진단',
    '2. 분할 루틴 및 부위별 밸런스: 상/하체, 길항근(밀기 vs 당기기) 균형 및 부위별 볼륨 배분의 적절성',
    '3. 운동 빈도 및 피로/회복 관리: 주당 운동 빈도와 휴식 주기의 적절성, 과훈련 또는 회복 부족 징후 점검',
    '4. 향후 3개월 맞춤형 추천 전략: 다음 단계 증량을 위한 세트/반복수/중량 주기화 가이드 및 보완 운동 추천',
    '',
    '---',
    `[3개월 압축 운동 일지 (총 ${dailyLogSections.length}일)]`,
    '',
    dailyLogSections.join('\n\n')
  );

  return promptLines.join('\n');
}

async function copyThreeMonthsWorkoutSummary() {
  const promptText = generateThreeMonthsWorkoutAnalysisPrompt();
  if (!promptText) {
    alert('최근 3개월간 기록된 운동 데이터가 없습니다. 먼저 운동을 기록해 주세요.');
    return;
  }

  const copied = await copyTextToClipboard(promptText);
  if (copied) {
    alert('최근 3개월 운동 기록(압축 완료)을 클립보드에 복사했습니다!\n\nChatGPT, Claude 등 AI 대화창에 바로 붙여넣어(Ctrl+V / 붙여넣기) 심층 운동 분석을 받아보세요.');
  } else {
    window.prompt('자동 복사가 지원되지 않습니다. 아래 운동 내용을 직접 복사해 주세요.', promptText);
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderMarkdownToHtml(markdown) {
  const safe = escapeHtml(markdown);
  return safe
    .replace(/^### (.*$)/gim, '<h5 style="margin: 12px 0 6px; color: var(--accent-cyan); font-size: 0.95rem;">$1</h5>')
    .replace(/^## (.*$)/gim, '<h4 style="margin: 14px 0 8px; color: var(--accent-orange); font-size: 1.05rem;">$1</h4>')
    .replace(/\*\*(.*?)\*\*/g, '<strong style="color: #ffffff;">$1</strong>')
    .replace(/^- (.*$)/gim, '<div style="margin-left: 10px; margin-bottom: 4px;">• $1</div>')
    .replace(/\n\n/g, '<div style="height: 8px;"></div>')
    .replace(/\n/g, '<br>');
}

function extractRoutineFromAiText(text) {
  if (!text || typeof text !== 'string') return null;

  // 1. Try markdown code block
  const jsonBlockMatch = text.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/i);
  if (jsonBlockMatch) {
    try {
      const parsed = JSON.parse(jsonBlockMatch[1]);
      if (parsed && parsed.type === 'FIT_TRACKER_ROUTINE' && Array.isArray(parsed.data)) {
        return parsed;
      }
    } catch (_) {}
  }

  // 2. Locate FIT_TRACKER_ROUTINE and find matching balanced braces
  const routineIdx = text.indexOf('FIT_TRACKER_ROUTINE');
  if (routineIdx !== -1) {
    const startIdx = text.lastIndexOf('{', routineIdx);
    if (startIdx !== -1) {
      let braceDepth = 0;
      let inString = false;
      let escape = false;
      for (let i = startIdx; i < text.length; i++) {
        const char = text[i];
        if (escape) {
          escape = false;
          continue;
        }
        if (char === '\\') {
          escape = true;
          continue;
        }
        if (char === '"') {
          inString = !inString;
          continue;
        }
        if (!inString) {
          if (char === '{') braceDepth++;
          else if (char === '}') {
            braceDepth--;
            if (braceDepth === 0) {
              const candidate = text.slice(startIdx, i + 1);
              try {
                const parsed = JSON.parse(candidate);
                if (parsed && parsed.type === 'FIT_TRACKER_ROUTINE' && Array.isArray(parsed.data)) {
                  return parsed;
                }
              } catch (_) {}
              break;
            }
          }
        }
      }
    }
  }

  return null;
}

function applyRoutineDataToCurrentDate(routineData, confirmReplace = true) {
  if (!routineData || routineData.type !== 'FIT_TRACKER_ROUTINE' || !Array.isArray(routineData.data)) {
    alert('올바른 FitTracker 운동 루틴 형식이 아닙니다.');
    return false;
  }

  const existingCount = (state.workouts[state.currentDate] || []).length;
  if (confirmReplace && existingCount > 0) {
    const ok = confirm(`오늘(${state.currentDate}) 이미 등록된 운동이 ${existingCount}개 있습니다.\n생성된 AI 맞춤 루틴으로 교체하시겠습니까?`);
    if (!ok) return false;
  }

  const sortedItems = routineData.data
    .filter(item => item && typeof item === 'object')
    .sort((a, b) => (Number(a.idx) || 0) - (Number(b.idx) || 0));

  const allowedCategories = ['가슴', '등', '하체', '어깨', '팔', '복근/코어', '유산소', '전신', '기타'];
  const importedExercises = [];

  sortedItems.forEach(item => {
    const name = String(item.n || '').trim().slice(0, 100);
    const requestedCategory = String(item.c || '기타');
    const category = allowedCategories.includes(requestedCategory) ? requestedCategory : '기타';
    const type = item.t === 'cardio' || category === '유산소' ? 'cardio' : 'strength';
    const restSec = Number(item.rst) || getDefaultRestForExercise(name, category);
    const sets = Array.isArray(item.s) ? item.s.slice(0, 100) : [];

    if (!name || /[<>"'&\\]/.test(name)) return;

    const fullSets = sets.map((s, idx) => {
      const weight = Number(s.w);
      const targetReps = Number(s.tr);
      const actualReps = Number(s.ar);
      const setType = ['working', 'warmup', 'failure', 'drop'].includes(s.tp) ? s.tp : 'working';

      return {
        setNumber: idx + 1,
        type: setType,
        weight: Number.isFinite(weight) && weight >= 0 ? weight : (type === 'cardio' ? 9.0 : 40),
        targetReps: Number.isFinite(targetReps) && targetReps > 0 ? targetReps : (type === 'cardio' ? 20 : 12),
        actualReps: Number.isFinite(actualReps) && actualReps >= 0
          ? actualReps
          : (Number.isFinite(targetReps) && targetReps > 0 ? targetReps : (type === 'cardio' ? 20 : 12)),
        completed: s.cmp === 1
      };
    });

    const importedSets = fullSets.length > 0 ? fullSets : [
      { setNumber: 1, type: 'working', weight: type === 'cardio' ? 9.0 : 40, targetReps: type === 'cardio' ? 20 : 12, actualReps: type === 'cardio' ? 20 : 12, completed: false }
    ];

    importedExercises.push({
      id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      name: name,
      category: category,
      type: type,
      targetSets: importedSets.length,
      collapsed: true,
      restSeconds: restSec,
      sets: importedSets
    });
  });

  if (importedExercises.length === 0) {
    alert('적용할 수 있는 운동 종목이 없습니다.');
    return false;
  }

  state.workouts[state.currentDate] = importedExercises;
  state.selectedExercisesForGraph = [...new Set(importedExercises.map(ex => ex.name))];

  saveState();
  updateUI();
  return true;
}

function updateAiModalViews() {
  const exercises = state.workouts[state.currentDate] || [];
  const hasExercises = exercises.length > 0;

  const noWorkoutBanner = document.getElementById('aiNoWorkoutBanner');
  const hasWorkoutBanner = document.getElementById('aiHasWorkoutBanner');
  const todayExCount = document.getElementById('aiTodayExCount');
  const prevWorkoutNotice = document.getElementById('aiPrevWorkoutNotice');

  const pastDates = Object.keys(state.workouts || {})
    .filter(d => d < state.currentDate && Array.isArray(state.workouts[d]) && state.workouts[d].length > 0)
    .sort();
  const previousDate = pastDates.length > 0 ? pastDates[pastDates.length - 1] : null;

  if (hasExercises) {
    if (noWorkoutBanner) noWorkoutBanner.classList.add('hidden');
    if (hasWorkoutBanner) hasWorkoutBanner.classList.remove('hidden');
    if (todayExCount) todayExCount.textContent = exercises.length;
  } else {
    if (noWorkoutBanner) noWorkoutBanner.classList.remove('hidden');
    if (hasWorkoutBanner) hasWorkoutBanner.classList.add('hidden');

    if (prevWorkoutNotice) {
      if (previousDate) {
        const prevExs = state.workouts[previousDate] || [];
        const names = prevExs.slice(0, 3).map(e => e.name).join(', ');
        const extra = prevExs.length > 3 ? ` 외 ${prevExs.length - 3}개` : '';
        prevWorkoutNotice.textContent = `직전 운동 기록(${previousDate}: ${names}${extra})을 분석하여 점진적 과부하가 적용된 오늘 루틴을 자동 생성합니다.`;
      } else {
        prevWorkoutNotice.textContent = `이전 운동 기록이 없습니다. 아래 [새 운동 루틴 만들기]에서 키/몸무게와 난이도를 선택해 맞춤 루틴을 생성해 보세요.`;
      }
    }
  }

  // Restore User Profile Inputs
  const savedHeight = localStorage.getItem('fittracker_user_height');
  const savedWeight = localStorage.getItem('fittracker_user_weight');
  const heightInput = document.getElementById('aiUserHeight');
  const weightInput = document.getElementById('aiUserWeight');
  if (heightInput && savedHeight) heightInput.value = savedHeight;
  if (weightInput && savedWeight) weightInput.value = savedWeight;

  const savedLevel = localStorage.getItem('fittracker_user_level') || 'beginner';
  const levelChips = document.querySelectorAll('.ai-level-chip');
  levelChips.forEach(chip => {
    if (chip.getAttribute('data-level') === savedLevel) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });

  // Keep pending routine button state if result already exists
  const applySection = document.getElementById('aiApplyRoutineSection');
  if (applySection) {
    if (window._pendingAiRoutine) {
      applySection.classList.remove('hidden');
    } else {
      applySection.classList.add('hidden');
    }
  }
}

function openWorkoutExportModal() {
  const modal = document.getElementById('workoutExportModal');
  if (modal) modal.classList.remove('hidden');
  const planNotice = document.getElementById('aiPlanNotice');
  if (planNotice) planNotice.classList.add('hidden');
  updateAiModalViews();
}

async function executeAiWorkflow(mode = 'analysis', forceRefresh = false) {
  const loadingBox = document.getElementById('aiAnalysisLoading');
  const loadingMsg = document.getElementById('aiLoadingMessage');
  const resultBox = document.getElementById('aiAnalysisResultContainer');
  const resultText = document.getElementById('aiAnalysisResultText');
  const planNotice = document.getElementById('aiPlanNotice');
  const applySection = document.getElementById('aiApplyRoutineSection');

  // All trigger buttons
  const triggerBtns = [
    document.getElementById('btnAiRecommendToday'),
    document.getElementById('btnAiAnalyzeToday'),
    document.getElementById('btnAiRecreateToday'),
    document.getElementById('btnAiCreateNewRoutine')
  ].filter(Boolean);

  const pastDates = Object.keys(state.workouts || {})
    .filter(d => d < state.currentDate && Array.isArray(state.workouts[d]) && state.workouts[d].length > 0)
    .sort();
  const previousDate = pastDates.length > 0 ? pastDates[pastDates.length - 1] : null;
  const previousSummary = previousDate ? generateWorkoutSummaryText(previousDate) : '';
  const currentSummary = generateWorkoutSummaryText(state.currentDate);

  if (mode === 'analysis') {
    const exercises = state.workouts[state.currentDate] || [];
    if (exercises.length === 0) {
      alert('오늘 등록된 운동 기록이 없습니다. 먼저 운동을 추가해 주세요.');
      return;
    }
    if (loadingMsg) loadingMsg.textContent = 'AI가 오늘 운동 기록과 수행 데이터를 정밀 분석하고 있습니다...';
  } else if (mode === 'recommend_routine') {
    if (!previousDate && (!state.workouts[state.currentDate] || state.workouts[state.currentDate].length === 0)) {
      alert('이전 운동 기록이 없습니다. 아래 [새 운동 루틴 만들기]에서 키와 몸무게를 입력하고 루틴을 생성해 보세요.');
      return;
    }
    if (loadingMsg) loadingMsg.textContent = '직전 운동의 모든 항목을 100% 유지하고 점진적 과부하(RIR 기반)를 정밀 분석하여 오늘 루틴을 계산 중입니다 (약 10~15초 소요)...';
  } else if (mode === 'create_routine') {
    if (loadingMsg) loadingMsg.textContent = '신체 스펙과 운동 레벨에 맞춘 최적의 종목, 세트수, 중량을 계산하고 있습니다...';
  }

  // Client-side cache check (Instant response, 0 API calls, 0 quota used)
  const prevExList = previousDate ? (state.workouts[previousDate] || []) : [];
  const clientCacheKey = `${mode}:${state.currentDate}:${previousDate || 'none'}:${prevExList.map(e => `${e.name}_${(e.sets||[]).length}`).join(';')}`;

  if (!forceRefresh && (mode === 'recommend_routine' || mode === 'create_routine')) {
    if (window._aiClientCache && window._aiClientCache[clientCacheKey]) {
      const cached = window._aiClientCache[clientCacheKey];
      window._lastAiAnalysisResult = cached.answer;
      window._pendingAiRoutine = cached.routineData;
      if (resultText) resultText.innerHTML = renderMarkdownToHtml(cached.answer);
      if (applySection) {
        if (cached.routineData) applySection.classList.remove('hidden');
        else applySection.classList.add('hidden');
      }
      if (resultBox) {
        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      return;
    }
  }

  // Read Profile inputs
  const heightInput = document.getElementById('aiUserHeight');
  const weightInput = document.getElementById('aiUserWeight');
  const targetPartSelect = document.getElementById('aiTargetPartSelect');
  const activeLevelChip = document.querySelector('.ai-level-chip.active');

  const heightVal = heightInput ? heightInput.value.trim() : '';
  const weightVal = weightInput ? weightInput.value.trim() : '';
  const levelVal = activeLevelChip ? activeLevelChip.getAttribute('data-level') : 'beginner';
  const targetPartVal = targetPartSelect ? targetPartSelect.value : 'AI 자동 추천 (균형 분할)';

  if (heightVal) localStorage.setItem('fittracker_user_height', heightVal);
  if (weightVal) localStorage.setItem('fittracker_user_weight', weightVal);
  if (levelVal) localStorage.setItem('fittracker_user_level', levelVal);

  if (loadingBox) loadingBox.classList.remove('hidden');
  if (resultBox) resultBox.classList.add('hidden');
  if (planNotice) planNotice.classList.add('hidden');
  if (applySection) applySection.classList.add('hidden');
  triggerBtns.forEach(btn => { btn.disabled = true; });

  const endpoint = 'https://admin.brightnetworks.kr/api/gym/ai-analysis';
  const fetchFn = (window.GymAuth && GymAuth.syncFetch) ? GymAuth.syncFetch : fetch;

  try {
    const response = await fetchFn(endpoint, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        mode: mode,
        forceRefresh: Boolean(forceRefresh),
        date: state.currentDate,
        summary: currentSummary,
        previousDate: previousDate,
        previousSummary: previousSummary,
        previousExercises: previousDate ? (state.workouts[previousDate] || []) : [],
        prompt: mode === 'analysis' ? generateWorkoutAnalysisPromptText() : '',
        exercises: state.workouts[state.currentDate] || [],
        userProfile: {
          height: heightVal,
          weight: weightVal,
          level: levelVal,
          targetPart: targetPartVal
        }
      })
    });

    if (response.status === 401) {
      if (planNotice) {
        planNotice.innerHTML = `
          <div style="display:flex;flex-direction:column;gap:8px;">
            <div><i class="fa-solid fa-wand-magic-sparkles text-cyan"></i> <strong>AI 맞춤 코치 (BETA)</strong><br>현재 베타 서비스 기간으로 모든 분께 무료로 제공됩니다. 맞춤 분석을 위해 카카오 로그인을 진행해 주세요.</div>
            <div><button id="btnAiLoginTrigger" class="btn btn-accent btn-sm" type="button"><i class="fa-solid fa-comment"></i> 카카오 로그인하고 계속하기</button></div>
          </div>
        `;
        planNotice.classList.remove('hidden');
        const loginBtn = document.getElementById('btnAiLoginTrigger');
        if (loginBtn) {
          loginBtn.onclick = async () => {
            try {
              if (window.GymAuth?.login) {
                await window.GymAuth.login();
              } else if (window.signInWithKakao) {
                window.signInWithKakao();
              }
              executeAiWorkflow(mode);
            } catch (err) {
              alert(err.message || '카카오 로그인에 실패했습니다.');
            }
          };
        }
      } else {
        alert('AI 맞춤 제안은 카카오 계정 로그인 후 누구나 무료로 이용하실 수 있습니다.');
      }
      return;
    }

    if (response.status === 402 || response.status === 403) {
      let errMsg = 'AI 맞춤 제안 베타 서비스 준비 중입니다. 잠시 후 다시 시도해 주세요.';
      try {
        const errJson = await response.json();
        if (errJson.message || errJson.error) errMsg = errJson.message || errJson.error;
      } catch (_) {}

      if (planNotice) {
        planNotice.innerHTML = `<i class="fa-solid fa-circle-info text-cyan"></i> <strong>AI 제안 (BETA)</strong><br>${errMsg}`;
        planNotice.classList.remove('hidden');
      } else {
        alert(errMsg.replace(/<[^>]*>/g, ''));
      }
      return;
    }

    if (response.status === 404 || response.status === 501) {
      if (planNotice) {
        planNotice.innerHTML = '<i class="fa-solid fa-gear"></i> <strong>서버 AI 서비스 준비 중</strong><br>서버 측 유료 AI 연동이 준비 중입니다. 잠시 후 이용해 주시거나 아래 [ChatGPT 프롬프트 복사]를 이용해 보세요.';
        planNotice.classList.remove('hidden');
      }
      return;
    }

    if (!response.ok) {
      let errMsg = response.statusText;
      try {
        const errJson = await response.json();
        errMsg = errJson.message || errJson.error || response.statusText;
      } catch (_) {}
      if (response.status === 503 || (errMsg && errMsg.includes('503')) || (errMsg && errMsg.includes('high demand'))) {
        errMsg = 'Google AI 서버의 일시적 트래픽 집중(High Demand) 상태입니다. 약 10~20초 후 다시 시도해 주세요.';
      } else if (response.status === 504 || (errMsg && errMsg.includes('504')) || errMsg === 'Gateway Timeout') {
        errMsg = 'AI 연산 시간이 길어져 응답이 지연되었습니다. 서버 타임아웃이 120초로 확장되었으니 다시 시도해 주세요.';
      }
      throw new Error(`서버 요청 실패 (${response.status}): ${errMsg}`);
    }

    const data = await response.json();
    const answer = data.analysis || data.result || data.content || data.message || '응답 결과를 받아오지 못했습니다.';
    window._lastAiAnalysisResult = answer;

    // Detect routine data
    const routineData = data.routineData || extractRoutineFromAiText(answer);
    window._pendingAiRoutine = routineData;

    // Cache on client side to avoid redundant network calls
    if (!window._aiClientCache) window._aiClientCache = {};
    window._aiClientCache[clientCacheKey] = {
      answer,
      routineData
    };

    if (resultText) {
      resultText.innerHTML = renderMarkdownToHtml(answer);
    }

    if (applySection) {
      if (routineData) {
        applySection.classList.remove('hidden');
      } else {
        applySection.classList.add('hidden');
      }
    }

    if (resultBox) {
      resultBox.classList.remove('hidden');
      resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  } catch (err) {
    if (planNotice) {
      planNotice.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> <strong>안내</strong><br>${escapeHtml(err.message)}<br><span style="font-size: 0.74rem; color: var(--text-muted);">아래 [ChatGPT 프롬프트 복사]를 사용하시면 ChatGPT에서 직접 동일한 분석 및 루틴을 받아보실 수 있습니다.</span>`;
      planNotice.classList.remove('hidden');
    } else {
      alert(`AI 서비스 안내: ${err.message}`);
    }
  } finally {
    if (loadingBox) loadingBox.classList.add('hidden');
    triggerBtns.forEach(btn => { btn.disabled = false; });
  }
}

function applyPendingAiRoutine() {
  if (!window._pendingAiRoutine) {
    alert('적용할 AI 루틴 데이터가 없습니다.');
    return;
  }
  const success = applyRoutineDataToCurrentDate(window._pendingAiRoutine, true);
  if (success) {
    alert(`오늘(${state.currentDate})의 운동 목록에 생성된 AI 루틴(${window._pendingAiRoutine.data.length}개 종목)이 성공적으로 적용되었습니다!`);
    const modal = document.getElementById('workoutExportModal');
    if (modal) modal.classList.add('hidden');
    window._pendingAiRoutine = null;
  }
}

function parseAndImportRoutineCode(codeStr) {
  if (!codeStr || !codeStr.trim()) {
    alert('운동 코드 또는 운동 URL을 입력해주세요.');
    return false;
  }

  const jsonStr = decodeRoutineString(extractRoutineCode(codeStr));

  try {
    const parsed = JSON.parse(jsonStr);
    const previousCount = (state.workouts[state.currentDate] || []).length;
    const success = applyRoutineDataToCurrentDate(parsed, false);
    if (success) {
      alert(`기존 운동 ${previousCount}개를 지우고 루틴 코드의 운동 ${parsed.data.length}개로 교체했습니다!`);
      return true;
    }
    return false;
  } catch (e) {
    alert('운동 코드 파싱 실패: 데이터 형식이 올바르지 않습니다.');
    return false;
  }
}

function openTextCodeModal() {
  const modal = document.getElementById('codeModal');
  if (!modal) return;
  modal.classList.remove('hidden');

  const input = document.getElementById('inputRoutineCode');
  if (input) {
    input.focus();
  }
}

function importRoutineFromUrl() {
  const currentUrl = new URL(window.location.href);
  const codeStr = currentUrl.searchParams.get('code');
  if (!codeStr) return;

  if (parseAndImportRoutineCode(codeStr)) {
    currentUrl.searchParams.delete('code');
    window.history.replaceState({}, document.title, currentUrl.toString());
  }
}

// DOM Event Listeners Initialization
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  state.currentDate = getTodayString();

  const installAppBtn = document.getElementById('installAppBtn');
  if (installAppBtn) {
    installAppBtn.addEventListener('click', installWebApp);
  }
  updateInstallAppButton();
  if (!isNativeAppWebView() && 'serviceWorker' in navigator && window.isSecureContext) {
    navigator.serviceWorker.register('/sw.js').catch(error => {
      console.warn('Service worker registration failed:', error);
    });
  }

  const dateInput = document.getElementById('workoutDateInput');
  dateInput.value = state.currentDate;

  dateInput.addEventListener('change', (e) => {
    if (e.target.value) {
      state.currentDate = e.target.value;
      updateUI();
    }
  });

  document.getElementById('prevDateBtn').addEventListener('click', () => {
    const d = new Date(state.currentDate);
    d.setDate(d.getDate() - 1);
    state.currentDate = d.toISOString().split('T')[0];
    updateUI();
  });

  document.getElementById('nextDateBtn').addEventListener('click', () => {
    const d = new Date(state.currentDate);
    d.setDate(d.getDate() + 1);
    state.currentDate = d.toISOString().split('T')[0];
    updateUI();
  });

  document.getElementById('todayBtn').addEventListener('click', () => {
    state.currentDate = getTodayString();
    updateUI();
  });

  document.getElementById('dailyGraphBtn')?.addEventListener('click', () => {
    state.graphPeriod = 'daily';
    renderExerciseWeightChart();
  });
  document.getElementById('monthlyGraphBtn')?.addEventListener('click', () => {
    state.graphPeriod = 'monthly';
    renderExerciseWeightChart();
  });

  const chartToggleBtn = document.getElementById('toggleExerciseChartBtn');
  if (chartToggleBtn) {
    chartToggleBtn.addEventListener('click', () => {
      const chartSection = document.getElementById('exerciseChartSection');
      const collapsed = chartSection.classList.toggle('chart-collapsed');
      chartToggleBtn.setAttribute('aria-expanded', String(!collapsed));
      chartToggleBtn.innerHTML = collapsed
        ? '<i class="fa-solid fa-chevron-down"></i> 펼치기'
        : '<i class="fa-solid fa-chevron-up"></i> 접기';
      localStorage.setItem('fit_tracker_chart_collapsed', String(collapsed));
      if (!collapsed) renderExerciseWeightChart();
    });

    if (localStorage.getItem('fit_tracker_chart_collapsed') === 'true') {
      document.getElementById('exerciseChartSection').classList.add('chart-collapsed');
      chartToggleBtn.setAttribute('aria-expanded', 'false');
      chartToggleBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i> 펼치기';
    }
  }

  const androidDownloadLink = document.getElementById('androidAppDownloadLink');
  if (androidDownloadLink) {
    const isAndroid = /android/i.test(navigator.userAgent);
    const isNativeApp = Boolean(window.AndroidBridge) || navigator.userAgent.includes('FitTracker');

    // Show Google Play download link only when accessed from an Android Web Browser (not inside native app)
    if (isAndroid && !isNativeApp) {
      androidDownloadLink.classList.remove('hidden');
    } else {
      androidDownloadLink.classList.add('hidden');
    }
  }

  const sectionTitleHeader = document.getElementById('exerciseSectionHeaderTitle');
  if (sectionTitleHeader) {
    sectionTitleHeader.addEventListener('click', () => {
      const sectionCard = document.getElementById('exercisesSectionCard');
      sectionCard.classList.toggle('collapsed');
    });
  }

  const importBtn = document.getElementById('importYesterdayBtn');
  if (importBtn) {
    importBtn.addEventListener('click', openImportPreviousModal);
  }

  const closeImportPreviousModalBtn = document.getElementById('closeImportPreviousModalBtn');
  if (closeImportPreviousModalBtn) {
    closeImportPreviousModalBtn.addEventListener('click', closeImportPreviousModal);
  }
  const cancelImportPreviousBtn = document.getElementById('cancelImportPreviousBtn');
  if (cancelImportPreviousBtn) {
    cancelImportPreviousBtn.addEventListener('click', closeImportPreviousModal);
  }
  const confirmImportPreviousBtn = document.getElementById('confirmImportPreviousBtn');
  if (confirmImportPreviousBtn) {
    confirmImportPreviousBtn.addEventListener('click', executeImportPreviousWorkouts);
  }
  const importDateSelect = document.getElementById('importDateSelect');
  if (importDateSelect) {
    importDateSelect.addEventListener('change', (e) => {
      const val = e.target.value;
      const datePicker = document.getElementById('importDatePicker');
      if (datePicker) datePicker.value = val;
      renderImportPreview(val);
    });
  }
  const importDatePicker = document.getElementById('importDatePicker');
  if (importDatePicker) {
    const handlePickerChange = (e) => {
      const val = e.target.value;
      const dateSelect = document.getElementById('importDateSelect');
      if (dateSelect) dateSelect.value = val;
      renderImportPreview(val);
    };
    importDatePicker.addEventListener('change', handlePickerChange);
    importDatePicker.addEventListener('input', handlePickerChange);
  }

  const deleteAllBtn = document.getElementById('deleteAllExercisesBtn');
  if (deleteAllBtn) {
    deleteAllBtn.addEventListener('click', (event) => {
      event.stopPropagation();
      deleteAllExercisesForCurrentDate();
    });
  }

  const copyWorkoutSummaryBtn = document.getElementById('copyWorkoutSummaryBtn');
  if (copyWorkoutSummaryBtn) {
    copyWorkoutSummaryBtn.addEventListener('click', openWorkoutChatPrompt);
  }

  const copyThreeMonthsBtn = document.getElementById('copyThreeMonthsBtn');
  if (copyThreeMonthsBtn) {
    copyThreeMonthsBtn.addEventListener('click', copyThreeMonthsWorkoutSummary);
  }

  const chartCopyThreeMonthsBtn = document.getElementById('chartCopyThreeMonthsBtn');
  if (chartCopyThreeMonthsBtn) {
    chartCopyThreeMonthsBtn.addEventListener('click', copyThreeMonthsWorkoutSummary);
  }

  const modalCopyThreeMonthsBtn = document.getElementById('modalCopyThreeMonthsBtn');
  if (modalCopyThreeMonthsBtn) {
    modalCopyThreeMonthsBtn.addEventListener('click', copyThreeMonthsWorkoutSummary);
  }

  const copyWorkoutContentBtn = document.getElementById('copyWorkoutContentBtn');
  if (copyWorkoutContentBtn) {
    copyWorkoutContentBtn.addEventListener('click', copyWorkoutSummary);
  }
  const copyWorkoutCodePromptBtn = document.getElementById('copyWorkoutCodePromptBtn');
  if (copyWorkoutCodePromptBtn) {
    copyWorkoutCodePromptBtn.addEventListener('click', copyWorkoutCodePrompt);
  }

  const btnAiRecommendToday = document.getElementById('btnAiRecommendToday');
  if (btnAiRecommendToday) {
    btnAiRecommendToday.addEventListener('click', () => executeAiWorkflow('recommend_routine'));
  }

  const btnAiAnalyzeToday = document.getElementById('btnAiAnalyzeToday');
  if (btnAiAnalyzeToday) {
    btnAiAnalyzeToday.addEventListener('click', () => executeAiWorkflow('analysis'));
  }

  const btnAiRecreateToday = document.getElementById('btnAiRecreateToday');
  if (btnAiRecreateToday) {
    btnAiRecreateToday.addEventListener('click', () => executeAiWorkflow('recommend_routine', true));
  }

  const btnAiCreateNewRoutine = document.getElementById('btnAiCreateNewRoutine');
  if (btnAiCreateNewRoutine) {
    btnAiCreateNewRoutine.addEventListener('click', () => executeAiWorkflow('create_routine'));
  }

  const btnAiApplyRoutine = document.getElementById('btnAiApplyRoutine');
  if (btnAiApplyRoutine) {
    btnAiApplyRoutine.addEventListener('click', applyPendingAiRoutine);
  }

  const aiLevelChipsContainer = document.getElementById('aiLevelChips');
  if (aiLevelChipsContainer) {
    aiLevelChipsContainer.addEventListener('click', (e) => {
      const chip = e.target.closest('.ai-level-chip');
      if (!chip) return;
      document.querySelectorAll('.ai-level-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const lvl = chip.getAttribute('data-level');
      if (lvl) localStorage.setItem('fittracker_user_level', lvl);
    });
  }

  const aiUserHeightInput = document.getElementById('aiUserHeight');
  if (aiUserHeightInput) {
    aiUserHeightInput.addEventListener('change', (e) => {
      localStorage.setItem('fittracker_user_height', e.target.value.trim());
    });
  }

  const aiUserWeightInput = document.getElementById('aiUserWeight');
  if (aiUserWeightInput) {
    aiUserWeightInput.addEventListener('change', (e) => {
      localStorage.setItem('fittracker_user_weight', e.target.value.trim());
    });
  }

  const copyAiResultBtn = document.getElementById('copyAiResultBtn');
  if (copyAiResultBtn) {
    copyAiResultBtn.addEventListener('click', async () => {
      if (window._lastAiAnalysisResult) {
        await copyTextToClipboard(window._lastAiAnalysisResult);
        alert('AI 분석/루틴 결과가 클립보드에 복사되었습니다!');
      } else {
        const textElem = document.getElementById('aiAnalysisResultText');
        if (textElem && textElem.innerText.trim()) {
          await copyTextToClipboard(textElem.innerText);
          alert('AI 분석/루틴 결과가 클립보드에 복사되었습니다!');
        }
      }
    });
  }

  document.getElementById('closeWorkoutExportModalBtn')?.addEventListener('click', () => {
    document.getElementById('workoutExportModal')?.classList.add('hidden');
  });
  document.getElementById('closeWorkoutExportFooterBtn')?.addEventListener('click', () => {
    document.getElementById('workoutExportModal')?.classList.add('hidden');
  });

  document.getElementById('openReleaseNotesBtn')?.addEventListener('click', () => {
    document.getElementById('releaseNotesModal')?.classList.remove('hidden');
  });
  document.getElementById('closeReleaseNotesModalBtn')?.addEventListener('click', () => {
    document.getElementById('releaseNotesModal')?.classList.add('hidden');
  });
  document.getElementById('closeReleaseNotesFooterBtn')?.addEventListener('click', () => {
    document.getElementById('releaseNotesModal')?.classList.add('hidden');
  });

  document.getElementById('soundToggleBtn')?.addEventListener('click', () => {
    initAudioContext();
    state.soundEnabled = !state.soundEnabled;
    if (state.soundEnabled) {
      playBeep(1);
    }
    saveState();
    updateUI();
  });

  // Exercise Name Autocomplete & Auto Category & Rest Time Mapping Listeners
  const exerciseNameInput = document.getElementById('exerciseNameInput');
  if (exerciseNameInput) {
    exerciseNameInput.addEventListener('input', (e) => {
      const val = e.target.value;
      renderExerciseHintDropdown(val);

      const match = EXERCISE_DATABASE.find(item => item.name.toLowerCase() === val.trim().toLowerCase());
      if (match) {
        const catSelect = document.getElementById('exerciseCategorySelect');
        if (catSelect) {
          catSelect.value = match.category;
          updateAddFormLabels(match.category);
        }
        if (match.weight !== undefined) document.getElementById('defaultWeightInput').value = match.weight;
        if (match.reps !== undefined) document.getElementById('defaultRepsInput').value = match.reps;
        const restSec = match.restSeconds || getDefaultRestForExercise(match.name, match.category);
        const restInput = document.getElementById('defaultRestInput');
        if (restInput) restInput.value = restSec;
        updateRestPresetChips(restSec);
      }
    });

    exerciseNameInput.addEventListener('blur', () => {
      setTimeout(() => {
        const dropdown = document.getElementById('exerciseHintDropdown');
        if (dropdown) dropdown.classList.add('hidden');
      }, 250);
    });

    exerciseNameInput.addEventListener('focus', (e) => {
      if (e.target.value.trim()) {
        renderExerciseHintDropdown(e.target.value);
      }
    });
  }

  // Fixed Bottom Bar Button Listeners
  const bottomTimerDurationSelect = document.getElementById('bottomTimerDurationSelect');
  if (bottomTimerDurationSelect) {
    bottomTimerDurationSelect.addEventListener('change', (event) => setRestDuration(event.target.value));
  }

  document.getElementById('bottomTimerResetBtn')?.addEventListener('click', () => resetRestTimer());

  document.getElementById('bottomTimerToggleBtn')?.addEventListener('click', () => {
    if (state.timer.status === 'running') {
      pauseRestTimer();
    } else if (state.timer.status === 'paused') {
      resumeRestTimer();
    } else {
      startRestTimer();
    }
  });

  // Streamlined Text Code Modal Listeners
  // Streamlined Text Code Modal Listeners
  const textShareBtn = document.getElementById('textShareBtn');
  if (textShareBtn) {
    textShareBtn.addEventListener('click', () => {
      openTextCodeModal();
    });
  }
  const closeCodeModalBtn = document.getElementById('closeCodeModalBtn');
  if (closeCodeModalBtn) {
    closeCodeModalBtn.addEventListener('click', () => {
      document.getElementById('codeModal').classList.add('hidden');
    });
  }
  const closeCodeFooterBtn = document.getElementById('closeCodeFooterBtn');
  if (closeCodeFooterBtn) {
    closeCodeFooterBtn.addEventListener('click', () => {
      document.getElementById('codeModal').classList.add('hidden');
    });
  }

  // "운동 코드 불러오기" -> Imports a code token or shared URL from input
  const importRoutineCodeBtn = document.getElementById('importRoutineCodeBtn');
  if (importRoutineCodeBtn) {
    importRoutineCodeBtn.addEventListener('click', () => {
      const text = document.getElementById('inputRoutineCode').value;
      if (parseAndImportRoutineCode(text)) {
        document.getElementById('codeModal').classList.add('hidden');
        document.getElementById('inputRoutineCode').value = '';
      }
    });
  }

  // "입력 내용 전체 삭제" -> Clears routine code input textarea
  const clearRoutineCodeInputBtn = document.getElementById('clearRoutineCodeInputBtn');
  if (clearRoutineCodeInputBtn) {
    clearRoutineCodeInputBtn.addEventListener('click', () => {
      const input = document.getElementById('inputRoutineCode');
      if (input) {
        input.value = '';
        input.focus();
      }
    });
  }

  // Modal Tabs Switching Listeners
  const tabEncBtn = document.getElementById('tabEncyclopediaBtn');
  const tabRoutinesBtn = document.getElementById('tabRoutinesBtn');
  const tabDirBtn = document.getElementById('tabDirectInputBtn');
  if (tabEncBtn) tabEncBtn.addEventListener('click', () => switchAddExerciseModalTab('encyclopedia'));
  if (tabRoutinesBtn) tabRoutinesBtn.addEventListener('click', () => switchAddExerciseModalTab('routines'));
  if (tabDirBtn) tabDirBtn.addEventListener('click', () => switchAddExerciseModalTab('direct'));

  // Recommended Routine Level Filter Chips Listeners
  const routineLevelChips = document.querySelectorAll('.routine-level-chip');
  routineLevelChips.forEach(chip => {
    chip.addEventListener('click', () => {
      routineLevelChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const lvl = chip.dataset.lvl || 'all';
      renderRoutineRecommendations(lvl);
    });
  });

  // Encyclopedia 1st-Tier Category Filter Chips Listeners
  const filterChips = document.querySelectorAll('.enc-filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat || 'all';
      renderEquipmentEncyclopedia(cat, activeEncyclopediaSearch, activeEncyclopediaEquipType);
    });
  });

  // Encyclopedia 2nd-Tier Equipment Type Filter Chips Listeners
  const equipChips = document.querySelectorAll('.enc-equip-chip');
  equipChips.forEach(chip => {
    chip.addEventListener('click', () => {
      equipChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const eq = chip.dataset.equip || 'all';
      renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch, eq);
    });
  });

  // Encyclopedia Live Search Input & Clear Button Listeners
  const encSearchInput = document.getElementById('encyclopediaSearchInput');
  if (encSearchInput) {
    encSearchInput.addEventListener('input', (e) => {
      renderEquipmentEncyclopedia(activeEncyclopediaCategory, e.target.value, activeEncyclopediaEquipType);
    });
  }
  const encSearchClearBtn = document.getElementById('encyclopediaSearchClearBtn');
  if (encSearchClearBtn) {
    encSearchClearBtn.addEventListener('click', () => {
      if (encSearchInput) {
        encSearchInput.value = '';
        encSearchInput.focus();
      }
      renderEquipmentEncyclopedia(activeEncyclopediaCategory, '', activeEncyclopediaEquipType);
    });
  }

  // Rest Preset Chips Click & Input Listeners in Add/Edit Modal
  const restChips = document.querySelectorAll('#restPresetChips .rest-chip');
  restChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const sec = chip.dataset.sec;
      const restInput = document.getElementById('defaultRestInput');
      if (restInput) restInput.value = sec;
      updateRestPresetChips(sec);
      syncActiveCartItemTuning();
    });
  });

  const defaultRestInput = document.getElementById('defaultRestInput');
  if (defaultRestInput) {
    defaultRestInput.addEventListener('input', (e) => {
      updateRestPresetChips(e.target.value);
      syncActiveCartItemTuning();
    });
  }

  const defaultWeightInput = document.getElementById('defaultWeightInput');
  if (defaultWeightInput) {
    defaultWeightInput.addEventListener('input', () => syncActiveCartItemTuning());
  }

  const defaultRepsInput = document.getElementById('defaultRepsInput');
  if (defaultRepsInput) {
    defaultRepsInput.addEventListener('input', () => syncActiveCartItemTuning());
  }

  // Dynamic Form Category Change Listener
  const catSelect = document.getElementById('exerciseCategorySelect');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      updateAddFormLabels(e.target.value);
      const name = document.getElementById('exerciseNameInput').value;
      const restVal = getDefaultRestForExercise(name, e.target.value);
      const restInput = document.getElementById('defaultRestInput');
      if (restInput) restInput.value = restVal;
      updateRestPresetChips(restVal);
      syncActiveCartItemTuning();
    });
  }

  // Add & Edit Exercise Modal Listeners
  document.getElementById('addExerciseBtn')?.addEventListener('click', openAddExerciseModal);
  document.getElementById('emptyAddBtn')?.addEventListener('click', openAddExerciseModal);
  document.getElementById('closeAddModalBtn')?.addEventListener('click', closeAddExerciseModal);
  document.getElementById('addExerciseModal')?.addEventListener('keydown', event => {
    if (event.key === 'Escape') { event.preventDefault(); closeAddExerciseModal(); return; }
    if (event.key !== 'Tab') return;
    const focusable = Array.from(event.currentTarget.querySelectorAll('button, input, select, [tabindex="0"]'))
      .filter(el => el.getClientRects().length && !el.disabled);
    const first = focusable[0], last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  });
  document.getElementById('cancelAddBtn')?.addEventListener('click', closeAddExerciseModal);

  const addExerciseForm = document.getElementById('addExerciseForm');
  if (addExerciseForm) {
    addExerciseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      syncActiveCartItemTuning();

      if (!editingExerciseId && encyclopediaCart.length > 1) {
        encyclopediaCart.forEach(item => {
          addExercise(item.name, item.category, item.weight, item.reps, item.restSeconds);
        });
        closeAddExerciseModal();
        const nameInput = document.getElementById('exerciseNameInput');
        if (nameInput) nameInput.value = '';
        return;
      }

      const name = document.getElementById('exerciseNameInput')?.value.trim() || '';
      const category = document.getElementById('exerciseCategorySelect')?.value || '가슴';
      const weight = document.getElementById('defaultWeightInput')?.value || 0;
      const reps = document.getElementById('defaultRepsInput')?.value || 10;
      const restSec = document.getElementById('defaultRestInput') ? document.getElementById('defaultRestInput').value : 90;

      if (!name) {
        alert('추가할 운동 종목이나 기구를 선택하거나 운동 이름을 직접 입력해 주세요.');
        const nameInput = document.getElementById('exerciseNameInput');
        if (nameInput) nameInput.focus();
        return;
      }

      if (editingExerciseId) {
        replaceExercise(editingExerciseId, name, category, weight, reps, restSec);
      } else {
        addExercise(name, category, weight, reps, restSec);
      }
      closeAddExerciseModal();
      const nameInput = document.getElementById('exerciseNameInput');
      if (nameInput) nameInput.value = '';
    });
  }

  // Firebase Auth Modal & Sync Listeners
  const authModalBtn = document.getElementById('authModalBtn');
  if (authModalBtn) {
    authModalBtn.addEventListener('click', () => {
      if (typeof updateAuthUIState === 'function') {
        updateAuthUIState(typeof currentKakaoUser !== 'undefined' ? currentKakaoUser : null);
      }
      document.getElementById('authModal').classList.remove('hidden');
    });
  }
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', () => {
      document.getElementById('authModal').classList.add('hidden');
    });
  }
  const closeAuthFooterBtn = document.getElementById('closeAuthFooterBtn');
  if (closeAuthFooterBtn) {
    closeAuthFooterBtn.addEventListener('click', () => {
      document.getElementById('authModal').classList.add('hidden');
    });
  }

  const kakaoLoginBtn = document.getElementById('kakaoLoginBtn');
  if (kakaoLoginBtn) {
    kakaoLoginBtn.addEventListener('click', () => {
      if (typeof window.signInWithKakao === 'function') {
        window.signInWithKakao();
      } else if (typeof signInWithKakao === 'function') {
        signInWithKakao();
      } else {
        alert('카카오 SDK 로딩 중입니다. 잠시 후 다시 시도해 주세요.');
      }
    });
  }
  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      if (confirm('카카오 계정에서 로그아웃 하시겠습니까?')) {
        if (typeof window.signOutUser === 'function') {
          window.signOutUser();
        } else if (typeof signOutUser === 'function') {
          signOutUser();
        }
      }
    });
  }

  const deleteAccountBtn = document.getElementById('deleteAccountBtn');
  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener('click', () => {
      if (typeof deleteAccountAndData === 'function') {
        deleteAccountAndData();
      }
    });
  }

  if (typeof initFirebaseSync === 'function') {
    initFirebaseSync();
  }

  initExerciseRestModal();
  initFeedbackModal();

  window.Ouwan?.init({ getState: () => state, defaultRest: getDefaultRestForExercise });
  updateUI();
  importRoutineFromUrl();
  if (window.consumeCommunityImport) {
    window.consumeCommunityImport({ state, defaultRest: getDefaultRestForExercise,
      insert: insertExerciseByCompletionStatus, save: saveState, update: updateUI });
  }

  window.compressConsecutiveSetTokens = compressConsecutiveSetTokens;
  window.generateThreeMonthsWorkoutAnalysisPrompt = generateThreeMonthsWorkoutAnalysisPrompt;
  window.copyThreeMonthsWorkoutSummary = copyThreeMonthsWorkoutSummary;
  window.openExerciseDiagramByName = openExerciseDiagramByName;
  window.openExerciseDiagramModal = openExerciseDiagramModal;
  window.closeExerciseDiagramModal = closeExerciseDiagramModal;
});
