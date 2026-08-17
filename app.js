/**
 * FitTracker Pro - Main Application Logic
 * Audio API, Rest Timer Engine with Fixed Bottom Bar Controls, Autocomplete Search with Hangul Chosung (초성) Matching,
 * Auto-Category Mapping, Presets, Multi-Exercise Graph & Streamlined Routine Code Token Generator/Importer
 */

const ROUTINE_CODE_PREFIX = 'FITROUTINE_v1_';
const WEEKLY_CODE_PREFIX = 'FITWEEK_v1_';
const SECRET_XOR_KEY = 'FIT_TRACKER_KEY_2026';
const ROUTINE_SHARE_BASE_URL = 'https://gym.brightnetworks.kr/';

/**
 * Encrypt JSON payload into a sleek String token using XOR + Base64
 */
function encodeRoutineString(jsonString) {
  try {
    const utf8Bytes = new TextEncoder().encode(jsonString);
    const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);
    
    const xorBytes = new Uint8Array(utf8Bytes.length);
    for (let i = 0; i < utf8Bytes.length; i++) {
      xorBytes[i] = utf8Bytes[i] ^ keyBytes[i % keyBytes.length];
    }
    
    let binary = '';
    for (let i = 0; i < xorBytes.length; i++) {
      binary += String.fromCharCode(xorBytes[i]);
    }
    return ROUTINE_CODE_PREFIX + btoa(binary);
  } catch (e) {
    return ROUTINE_CODE_PREFIX + btoa(unescape(encodeURIComponent(jsonString)));
  }
}

/**
 * Decrypt String token (or raw JSON fallback) back into original JSON string
 */
function decodeRoutineString(codeStr) {
  let cleaned = codeStr.trim();
  if (cleaned.startsWith(ROUTINE_CODE_PREFIX)) {
    const raw = cleaned.substring(ROUTINE_CODE_PREFIX.length);
    try {
      const binary = atob(raw);
      const xorBytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        xorBytes[i] = binary.charCodeAt(i);
      }
      const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);
      const utf8Bytes = new Uint8Array(xorBytes.length);
      for (let i = 0; i < xorBytes.length; i++) {
        utf8Bytes[i] = xorBytes[i] ^ keyBytes[i % keyBytes.length];
      }
      return new TextDecoder().decode(utf8Bytes);
    } catch (e) {
      try {
        return decodeURIComponent(escape(atob(raw)));
      } catch (err) {
        return raw;
      }
    }
  }
  return cleaned; // Raw JSON fallback for legacy codes
}

function extractRoutineCode(value) {
  let cleaned = String(value || '').trim();
  if (!cleaned) return '';

  const fencedJson = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedJson) {
    cleaned = fencedJson[1].trim();
  }

  try {
    const url = new URL(cleaned);
    return url.searchParams.get('code') || cleaned;
  } catch (e) {
    return cleaned;
  }
}

function generateRoutineShareUrl(codeStr) {
  if (!codeStr) return '';

  const url = new URL(ROUTINE_SHARE_BASE_URL);
  url.searchParams.set('code', codeStr);
  return url.toString();
}

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

  // 팔 (Arms - 8종)
  { name: '바벨 컬', category: '팔', weight: 25, reps: 12, restSeconds: 60 },
  { name: '덤벨 컬', category: '팔', weight: 12, reps: 12, restSeconds: 60 },
  { name: '해머 컬', category: '팔', weight: 12, reps: 12, restSeconds: 60 },
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
  soundEnabled: true,
  selectedExercisesForGraph: [], // Multi-select array of exercise names for graph comparison
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

  const savedRestSeconds = Number(localStorage.getItem('fit_tracker_rest_seconds'));
  if (Number.isFinite(savedRestSeconds) && savedRestSeconds >= 5) {
    const normalizedSeconds = Math.min(600, Math.round(savedRestSeconds / 5) * 5);
    state.timer.defaultSeconds = normalizedSeconds;
    state.timer.totalSeconds = normalizedSeconds;
    state.timer.remainingSeconds = normalizedSeconds;
  }
}

function saveState() {
  localStorage.setItem('fit_tracker_workouts_v1', JSON.stringify(state.workouts));
  localStorage.setItem('fit_tracker_custom_presets_v1', JSON.stringify(state.customPresets));
  localStorage.setItem('fit_tracker_sound_enabled', String(state.soundEnabled));
  localStorage.setItem('fit_tracker_rest_seconds', String(state.timer.defaultSeconds));

  if (typeof debouncedCloudSync === 'function') {
    debouncedCloudSync();
  }
  if (typeof syncWorkoutsToAdminServer === 'function') {
    syncWorkoutsToAdminServer();
  }
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

  const queryChosung = getHangulChosung(trimmed);
  const lowerQuery = trimmed.toLowerCase();

  const matches = EXERCISE_DATABASE.filter(item => {
    const itemNameLower = item.name.toLowerCase();
    const itemChosung = getHangulChosung(item.name);

    if (itemNameLower.includes(lowerQuery)) return true;
    if (itemChosung.includes(queryChosung)) return true;

    return false;
  });

  if (matches.length === 0) {
    dropdown.innerHTML = '';
    dropdown.classList.add('hidden');
    return;
  }

  dropdown.innerHTML = '';
  matches.forEach(item => {
    const div = document.createElement('div');
    div.className = 'hint-item';
    div.innerHTML = `
      <span>${item.name}</span>
      <span class="hint-cat-tag">${item.category}</span>
    `;

    div.addEventListener('click', () => {
      const input = document.getElementById('exerciseNameInput');
      const catSelect = document.getElementById('exerciseCategorySelect');
      const weightInput = document.getElementById('defaultWeightInput');
      const repsInput = document.getElementById('defaultRepsInput');

      input.value = item.name;
      catSelect.value = item.category;
      updateAddFormLabels(item.category);

      if (item.weight !== undefined && weightInput) weightInput.value = item.weight;
      if (item.reps !== undefined && repsInput) repsInput.value = item.reps;

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

// Multi-Exercise Graph Selection & Chart Engine
let exerciseChart = null;

const colorPalette = [
  { border: '#00f2fe', bg: 'rgba(0, 242, 254, 0.15)' },  // Cyan
  { border: '#00e676', bg: 'rgba(0, 230, 118, 0.15)' },  // Emerald
  { border: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' }, // Violet
  { border: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' }, // Orange
  { border: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' }, // Pink
  { border: '#ffd166', bg: 'rgba(255, 209, 102, 0.15)' } // Gold
];

function getAllUniqueExerciseNames() {
  const namesSet = new Set();
  Object.values(state.workouts).forEach(exerciseList => {
    if (Array.isArray(exerciseList)) {
      exerciseList.forEach(ex => {
        if (ex && ex.name) namesSet.add(ex.name);
      });
    }
  });
  return Array.from(namesSet);
}

function renderExerciseMultiSelectChips() {
  const container = document.getElementById('exerciseMultiSelectContainer');
  if (!container) return;

  const uniqueNames = getUniqueExerciseNames();
  container.innerHTML = '';

  if (uniqueNames.length === 0) {
    container.innerHTML = '<span class="empty-text" style="font-size:0.8rem; color:var(--text-muted);">등록된 운동 기록이 없습니다.</span>';
    return;
  }

  uniqueNames.forEach(name => {
    const isSelected = state.selectedExercisesForGraph.includes(name);
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = `exercise-select-chip ${isSelected ? 'active' : ''}`;
    chip.innerHTML = `${escapeHtml(name)} ${isSelected ? '<i class="fa-solid fa-check"></i>' : '<i class="fa-solid fa-plus"></i>'}`;

    chip.addEventListener('click', () => {
      if (isSelected) {
        state.selectedExercisesForGraph = state.selectedExercisesForGraph.filter(n => n !== name);
      } else {
        if (state.selectedExercisesForGraph.length >= 6) {
          alert('비교 그래프는 최대 6개 운동까지 선택 가능합니다.');
          return;
        }
        state.selectedExercisesForGraph.push(name);
      }
      renderExerciseMultiSelectChips();
      renderExerciseWeightChart();
    });
    container.appendChild(chip);
  });
}

function getGraphPeriods(selectedNames = []) {
  const sortedDates = Object.keys(state.workouts).sort();

  const validDates = sortedDates.filter(dateKey => {
    const list = state.workouts[dateKey];
    if (!Array.isArray(list) || list.length === 0) return false;

    return list.some(ex => {
      if (!ex) return false;
      if (selectedNames && selectedNames.length > 0 && !selectedNames.includes(ex.name)) {
        return false;
      }
      if (!Array.isArray(ex.sets)) return false;
      return ex.sets.some(s => s && s.completed === true);
    });
  });

  if (state.graphPeriod !== 'monthly') {
    return validDates.map(dateKey => {
      const [, month, day] = dateKey.split('-');
      return { label: `${month}/${day}`, dates: [dateKey] };
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
    return { label: `${year}.${month}`, dates };
  });
}

function updateChartKpiStats(selectedNames) {
  const peakOrmEl = document.getElementById('kpiPeakOrm');
  const peakWeightEl = document.getElementById('kpiPeakWeight');
  const totalVolumeEl = document.getElementById('kpiTotalVolume');
  const sessionCountEl = document.getElementById('kpiSessionCount');

  if (!peakOrmEl || !peakWeightEl || !totalVolumeEl || !sessionCountEl) return;

  if (!selectedNames || selectedNames.length === 0) {
    peakOrmEl.textContent = '-';
    peakWeightEl.textContent = '-';
    totalVolumeEl.textContent = '-';
    sessionCountEl.textContent = '-';
    return;
  }

  let allTimePeakOrm = 0;
  let allTimePeakWeight = 0;
  let allTimeTotalVolume = 0;
  let totalSessions = 0;
  let isOnlyCardio = true;

  Object.entries(state.workouts).forEach(([dateKey, list]) => {
    if (!Array.isArray(list)) return;
    let hadSession = false;

    list.forEach(ex => {
      if (!ex || !selectedNames.includes(ex.name)) return;
      if (!Array.isArray(ex.sets)) return;

      const isCardio = isCardioExercise(ex);
      if (!isCardio) isOnlyCardio = false;

      ex.sets.forEach(s => {
        if (!s || !s.completed) return;
        hadSession = true;
        const w = Number(s.weight) || 0;
        const r = Number(s.actualReps) || 0;

        if (w > allTimePeakWeight) allTimePeakWeight = w;

        if (!isCardio && w > 0 && r > 0) {
          const orm = Math.round(w * (1 + r / 30));
          if (orm > allTimePeakOrm) allTimePeakOrm = orm;
        }

        if (isCardio) {
          allTimeTotalVolume += (w * r) / 60;
        } else {
          allTimeTotalVolume += (w * r);
        }
      });
    });

    if (hadSession) totalSessions++;
  });

  peakOrmEl.textContent = isOnlyCardio ? '해당없음' : (allTimePeakOrm > 0 ? `${allTimePeakOrm} kg` : '-');
  peakWeightEl.textContent = allTimePeakWeight > 0 ? `${allTimePeakWeight} ${isOnlyCardio ? 'km/h' : 'kg'}` : '-';
  totalVolumeEl.textContent = allTimeTotalVolume > 0 ? `${Math.round(allTimeTotalVolume).toLocaleString()} ${isOnlyCardio ? 'km' : 'kg'}` : '-';
  sessionCountEl.textContent = `${totalSessions}회`;
}

function renderExerciseWeightChart() {
  if (state.chartMainMode === 'balance') {
    renderMuscleBalanceChart();
    return;
  }

  const canvas = document.getElementById('exerciseWeightChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const selectedNames = state.selectedExercisesForGraph;
  document.getElementById('dailyGraphBtn')?.classList.toggle('active', state.graphPeriod === 'daily');
  document.getElementById('monthlyGraphBtn')?.classList.toggle('active', state.graphPeriod === 'monthly');

  // Update Metric chips active UI
  const metricChips = document.querySelectorAll('#chartMetricSelector .chart-metric-chip');
  metricChips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.metric === state.chartMetric);
  });

  updateChartKpiStats(selectedNames);

  if (!selectedNames || selectedNames.length === 0) {
    if (exerciseChart) exerciseChart.destroy();
    return;
  }

  const graphPeriods = getGraphPeriods(selectedNames);

  if (graphPeriods.length === 0) {
    if (exerciseChart) exerciseChart.destroy();
    return;
  }

  const dateLabels = graphPeriods.map(period => period.label);
  const datasets = [];

  selectedNames.forEach((exName, idx) => {
    const color = colorPalette[idx % colorPalette.length];
    const seriesData = [];

    const isCardio = isCardioExercise({ name: exName, category: EXERCISE_DATABASE.find(p => p.name === exName)?.category });

    graphPeriods.forEach(period => {
      let metricValue = 0;
      let hasData = false;

      period.dates.forEach(dateKey => {
        const list = state.workouts[dateKey] || [];
        const ex = list.find(e => e.name === exName);
        if (!ex || !Array.isArray(ex.sets)) return;

        ex.sets.forEach(s => {
          if (!s || !s.completed) return;
          hasData = true;
          const w = Number(s.weight) || 0;
          const reps = Number(s.actualReps) || 0;

          if (state.chartMetric === 'orm') {
            if (!isCardio && w > 0 && reps > 0) {
              const orm = Math.round(w * (1 + reps / 30));
              if (orm > metricValue) metricValue = orm;
            } else if (isCardio) {
              if (w > metricValue) metricValue = w;
            }
          } else if (state.chartMetric === 'max') {
            if (w > metricValue) metricValue = w;
          } else if (state.chartMetric === 'volume') {
            if (isCardio) {
              metricValue += (w * reps) / 60;
            } else {
              metricValue += (w * reps);
            }
          } else if (state.chartMetric === 'reps') {
            metricValue += reps;
          }
        });
      });

      if (state.chartMetric === 'volume' && isCardio) {
        metricValue = Math.round(metricValue * 100) / 100;
      }

      seriesData.push(hasData ? metricValue : null);
    });

    let metricLabel = '추정 1RM (kg)';
    if (state.chartMetric === 'max') metricLabel = isCardio ? '최고 속도 (km/h)' : '최고 무게 (kg)';
    if (state.chartMetric === 'volume') metricLabel = isCardio ? '총 이동 거리 (km)' : '총 볼륨 (kg)';
    if (state.chartMetric === 'reps') metricLabel = isCardio ? '총 운동 시간 (분)' : '총 반복 횟수 (회)';

    // Create subtle gradient area for single selection
    let bgFill = color.bg;
    if (selectedNames.length === 1) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 260);
      gradient.addColorStop(0, 'rgba(0, 242, 254, 0.35)');
      gradient.addColorStop(1, 'rgba(0, 242, 254, 0.0)');
      bgFill = gradient;
    }

    datasets.push({
      label: `${exName} (${metricLabel})`,
      data: seriesData,
      type: 'line',
      borderColor: color.border,
      backgroundColor: bgFill,
      pointBackgroundColor: color.border,
      pointBorderColor: '#0b0f17',
      pointBorderWidth: 2,
      pointRadius: 5,
      pointHoverRadius: 8,
      borderWidth: 3,
      tension: 0.35,
      fill: selectedNames.length === 1,
      spanGaps: true
    });
  });

  if (exerciseChart) {
    exerciseChart.destroy();
  }

  let yTitle = '추정 1RM (kg)';
  if (state.chartMetric === 'max') yTitle = '최고 수치 (kg / km/h)';
  if (state.chartMetric === 'volume') yTitle = '총 볼륨 (kg / km)';
  if (state.chartMetric === 'reps') yTitle = '반복수 / 시간';

  exerciseChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: dateLabels,
      datasets: datasets
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false,
      },
      plugins: {
        legend: {
          display: selectedNames.length > 1,
          labels: {
            color: '#94a3b8',
            font: { family: 'Outfit', size: 11, weight: '600' }
          }
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
          callbacks: {
            label: (context) => {
              const label = context.dataset.label || '';
              const val = context.parsed.y;
              if (val === null || val === undefined || isNaN(val)) return null;
              return `${label}: ${val.toLocaleString()}`;
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
            text: yTitle,
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
}

function renderMuscleBalanceChart() {
  const canvas = document.getElementById('muscleBalanceChart');
  const progressList = document.getElementById('muscleSetsProgressList');
  if (!canvas || !progressList) return;

  const ctx = canvas.getContext('2d');

  // Compute Volume & Sets by Category over all logged dates
  const categoryStats = {
    '가슴': { sets: 0, volume: 0, color: '#00f2fe' },
    '등': { sets: 0, volume: 0, color: '#00e676' },
    '하체': { sets: 0, volume: 0, color: '#ff6b00' },
    '어깨': { sets: 0, volume: 0, color: '#a855f7' },
    '팔': { sets: 0, volume: 0, color: '#ec4899' },
    '복근/코어': { sets: 0, volume: 0, color: '#ffd600' },
    '유산소': { sets: 0, volume: 0, color: '#10b981' }
  };

  let totalSetsCount = 0;

  Object.values(state.workouts).forEach(list => {
    if (!Array.isArray(list)) return;
    list.forEach(ex => {
      if (!ex) return;
      const cat = ex.category || '가슴';
      if (!categoryStats[cat]) return;

      if (Array.isArray(ex.sets)) {
        ex.sets.forEach(s => {
          if (!s || !s.completed) return;
          categoryStats[cat].sets += 1;
          totalSetsCount += 1;
          const w = Number(s.weight) || 0;
          const r = Number(s.actualReps) || 0;
          categoryStats[cat].volume += (w * r);
        });
      }
    });
  });

  const categories = Object.keys(categoryStats);
  const setsData = categories.map(c => categoryStats[c].sets);
  const colors = categories.map(c => categoryStats[c].color);

  if (muscleBalanceChart) {
    muscleBalanceChart.destroy();
  }

  muscleBalanceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: setsData,
        backgroundColor: colors,
        borderColor: '#0b0f17',
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            color: '#94a3b8',
            font: { family: 'Outfit', size: 11, weight: '600' },
            boxWidth: 14
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.95)',
          callbacks: {
            label: (ctx) => {
              const label = ctx.label || '';
              const sets = ctx.raw || 0;
              const pct = totalSetsCount > 0 ? Math.round((sets / totalSetsCount) * 100) : 0;
              return `${label}: ${sets}세트 (${pct}%)`;
            }
          }
        }
      },
      cutout: '65%'
    }
  });

  // Render Muscle Progress List with Hypertrophy Guideline Target (10~20 sets / week)
  progressList.innerHTML = categories.map(cat => {
    const data = categoryStats[cat];
    const targetSets = 16; // optimal weekly hypertrophy volume
    const percentage = Math.min(100, Math.round((data.sets / targetSets) * 100));

    return `
      <div class="muscle-progress-item">
        <div class="muscle-progress-header">
          <span class="muscle-progress-name">
            <span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${data.color};"></span>
            ${cat}
          </span>
          <span class="muscle-progress-stats">
            ${data.sets}세트 / 권장 ${targetSets}세트 (${percentage}%)
          </span>
        </div>
        <div class="muscle-progress-bar-bg">
          <div class="muscle-progress-bar-fill" style="width: ${percentage}%; background: ${data.color};"></div>
        </div>
      </div>
    `;
  }).join('');
}

function switchChartMainMode(mode) {
  state.chartMainMode = mode;
  const btnProg = document.getElementById('btnChartModeProgression');
  const btnBal = document.getElementById('btnChartModeBalance');
  const viewProg = document.getElementById('chartProgressionView');
  const viewBal = document.getElementById('chartBalanceView');

  if (mode === 'progression') {
    btnProg?.classList.add('active');
    btnBal?.classList.remove('active');
    viewProg?.classList.remove('hidden');
    viewBal?.classList.add('hidden');
    renderExerciseWeightChart();
  } else {
    btnBal?.classList.add('active');
    btnProg?.classList.remove('active');
    viewBal?.classList.remove('hidden');
    viewProg?.classList.add('hidden');
    renderMuscleBalanceChart();
  }
}

function setChartMetric(metric) {
  state.chartMetric = metric;
  renderExerciseWeightChart();
}

// Live metrics update without destroying input focus (Hypertrophy & Effective Volume Engine)
function updateMetricsOnly() {
  const exercises = state.workouts[state.currentDate] || [];

  let totalTarget = 0;
  let totalActualEffectiveVolume = 0;
  let totalCardioMinutes = 0;
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
      const targetReps = Number(s.targetReps) || 0;
      const actualReps = Number(s.actualReps) || 0;

      if (isCardio) {
        totalCardioMinutes += targetReps;
        if (s.completed) {
          completedSets++;
          completedHardSets++;
          const dist = (weight * actualReps) / 60;
          totalCardioDistance += dist;
        }
      } else {
        totalTarget += weight * targetReps;
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

  const targetStr = totalCardioMinutes > 0
    ? `${totalTarget.toLocaleString()} kg / 러닝 ${totalCardioMinutes}분`
    : (maxEstimated1RM > 0 ? `${maxEstimated1RM} kg (${max1RMExercise})` : `${totalTarget.toLocaleString()} kg`);

  const actualStr = totalCardioDistance > 0
    ? `${totalActualEffectiveVolume.toLocaleString()} kg / ${totalCardioDistance.toFixed(1)}km`
    : `${totalActualEffectiveVolume.toLocaleString()} kg`;

  const setsRatioStr = `${completedSets} / ${totalSets} (본세트 ${completedHardSets})`;

  const targetWeightDisplay = document.getElementById('totalTargetWeightDisplay');
  const actualWeightDisplay = document.getElementById('totalActualWeightDisplay');
  const setsRatioDisplay = document.getElementById('completedSetsRatioDisplay');
  const countBadge = document.getElementById('exerciseCountBadge');

  if (targetWeightDisplay) targetWeightDisplay.textContent = targetStr;
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

  renderExerciseMultiSelectChips();
  renderExerciseWeightChart();
  renderPresetChips();
  updateFixedBottomTimerUI();
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

function changeExerciseRestSeconds(exId) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex) return;

  const currentRest = ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category);
  const input = prompt(`[${ex.name}] 세트 간 기본 휴식 시간(초)을 설정하세요 (예: 60, 90, 120, 150, 180):`, currentRest);
  if (input !== null) {
    const parsed = parseInt(input, 10);
    if (!isNaN(parsed) && parsed >= 5 && parsed <= 600) {
      ex.restSeconds = parsed;
      saveState();
      updateUI();
    }
  }
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

  exercises.forEach((ex, exerciseIndex) => {
    sanitizeExerciseSets(ex);

    const isCardio = isCardioExercise(ex);
    const weightLabel = isCardio ? '속도(km/h)' : '무게(kg)';
    const allSetsCompleted = ex.sets.length > 0 && ex.sets.every(set => set.completed);
    const card = document.createElement('div');
    const isCollapsed = Boolean(ex.collapsed);
    card.className = `exercise-card ${isCollapsed ? 'collapsed' : ''}`;

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

    const orderButtonsHtml = `
      <div class="exercise-order-controls" aria-label="${escapeHtml(ex.name)} 순서 변경">
        ${exerciseIndex > 0 ? `
          <button class="order-exercise-btn" onclick="moveExercise('${ex.id}', -1)" title="위로 이동" aria-label="${escapeHtml(ex.name)} 위로 이동">
            <i class="fa-solid fa-chevron-up"></i>
          </button>
        ` : ''}
        ${exerciseIndex < exercises.length - 1 ? `
          <button class="order-exercise-btn" onclick="moveExercise('${ex.id}', 1)" title="아래로 이동" aria-label="${escapeHtml(ex.name)} 아래로 이동">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
        ` : ''}
      </div>
    `;

    let setsRowsHtml = '';
    ex.sets.forEach((s, setIdx) => {
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
            <div class="input-stepper-wrap">
              <button type="button" class="step-quick-btn" onclick="adjustSetField('${ex.id}', ${setIdx}, 'weight', ${isCardio ? -0.5 : -2.5})" title="감소">-</button>
              <input type="number" step="${isCardio ? '0.5' : '2.5'}" min="0" value="${s.weight}" 
                oninput="updateSetData('${ex.id}', ${setIdx}, 'weight', this.value)"
                onchange="updateSetData('${ex.id}', ${setIdx}, 'weight', this.value)"
                title="${weightLabel}">
              <button type="button" class="step-quick-btn" onclick="adjustSetField('${ex.id}', ${setIdx}, 'weight', ${isCardio ? 0.5 : 2.5})" title="증가">+</button>
            </div>
          </td>
          <td>
            <div class="input-stepper-wrap">
              <button type="button" class="step-quick-btn" onclick="adjustSetField('${ex.id}', ${setIdx}, 'targetReps', -1)" title="1 감소">-</button>
              <input type="number" min="1" value="${s.targetReps}" 
                oninput="updateSetData('${ex.id}', ${setIdx}, 'targetReps', this.value)"
                onchange="updateSetData('${ex.id}', ${setIdx}, 'targetReps', this.value)"
                title="${isCardio ? '목표시간(분)' : '목표횟수(회)'}">
              <button type="button" class="step-quick-btn" onclick="adjustSetField('${ex.id}', ${setIdx}, 'targetReps', 1)" title="1 증가">+</button>
            </div>
          </td>
          <td>
            <div class="input-stepper-wrap">
              <button type="button" class="step-quick-btn" onclick="adjustSetField('${ex.id}', ${setIdx}, 'actualReps', -1)" title="1 감소">-</button>
              <input type="number" min="0" value="${s.actualReps}" 
                oninput="updateSetData('${ex.id}', ${setIdx}, 'actualReps', this.value)"
                onchange="updateSetData('${ex.id}', ${setIdx}, 'actualReps', this.value)"
                title="${isCardio ? '실제시간(분)' : '실제횟수(회)'}">
              <button type="button" class="step-quick-btn" onclick="adjustSetField('${ex.id}', ${setIdx}, 'actualReps', 1)" title="1 증가">+</button>
            </div>
          </td>
          <td>
            <button class="complete-set-btn ${s.completed ? 'completed' : ''}"
              data-exercise-id="${ex.id}" data-set-index="${setIdx}"
              onclick="toggleSetComplete('${ex.id}', ${setIdx})" title="세트 완료 체크">
              <i class="fa-solid fa-check"></i>
            </button>
          </td>
          <td>
            <button class="delete-set-row-btn" onclick="deleteSpecificSet('${ex.id}', ${setIdx})" title="이 세트 삭제">
              <i class="fa-solid fa-xmark"></i>
            </button>
          </td>
        </tr>
      `;
    });

    const svgThumb = typeof getExerciseSvgIcon === 'function' ? getExerciseSvgIcon(ex.name, ex.category) : '';

    card.innerHTML = `
      <div class="exercise-card-header" onclick="toggleExerciseCardCollapse('${ex.id}')" title="터치하여 이 운동 세트 접기/펼치기">
        <div class="exercise-meta">
          <div class="ex-equip-thumb" title="${escapeHtml(ex.name)}">
            ${svgThumb}
          </div>
          <div>
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span class="category-tag" style="${isCardio ? 'background: rgba(0, 230, 118, 0.15); color: var(--accent-emerald);' : ''}">${escapeHtml(ex.category || '기타')}</span>
              <span class="exercise-title editable-title" onclick="event.stopPropagation(); openEditExerciseModal('${ex.id}')" title="터치하여 운동 종목 교체">
                ${escapeHtml(ex.name)} <i class="fa-solid fa-pen-to-square title-edit-icon"></i>
              </span>
            </div>
          </div>
          <span class="exercise-completion-status ${allSetsCompleted ? 'completed' : 'in-progress'}"
            title="${allSetsCompleted ? '모든 세트 완료' : '진행 중'}" aria-label="${allSetsCompleted ? '모든 세트 완료' : '진행 중'}">
            <i class="fa-solid ${allSetsCompleted ? 'fa-circle-check' : 'fa-circle-half-stroke'}"></i>
          </span>
          <i class="fa-solid fa-chevron-up ex-toggle-chevron"></i>
        </div>
        <div class="exercise-actions" onclick="event.stopPropagation()">
          ${orderButtonsHtml}
          <button class="icon-action-btn exercise-delete-btn" onclick="handleDeleteExerciseTap('${ex.id}', this)" title="한 번 더 누르면 삭제" aria-label="운동 삭제">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        </div>
      </div>

      <div class="ex-card-badges" style="padding: 0 16px 8px 16px;">
        <span class="ex-stat-badge rest-badge" onclick="changeExerciseRestSeconds('${ex.id}')" title="터치하여 이 운동의 기본 휴식시간 변경">
          <i class="fa-solid fa-stopwatch"></i> 휴식 ${restSec}초
        </span>
        ${!isCardio && peakOrm > 0 ? `
          <span class="ex-stat-badge orm-badge" title="Epley 공식 기반 오늘 최고 추정 1RM">
            <i class="fa-solid fa-trophy"></i> 최고 1RM ${peakOrm}kg
          </span>
        ` : ''}
      </div>

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
              <th>삭제</th>
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
          <button class="remove-set-btn" onclick="removeLastSetFromExercise('${ex.id}')">
            <i class="fa-solid fa-minus"></i> 세트 삭제
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

function focusExerciseGraph(exerciseName) {
  if (!state.selectedExercisesForGraph.includes(exerciseName)) {
    state.selectedExercisesForGraph.push(exerciseName);
  }
  renderExerciseMultiSelectChips();
  renderExerciseWeightChart();

  const chartSec = document.getElementById('exerciseChartSection');
  if (chartSec) {
    chartSec.scrollIntoView({ behavior: 'smooth' });
  }
}

function moveExercise(exId, direction) {
  const exercises = state.workouts[state.currentDate] || [];
  const currentIndex = exercises.findIndex(exercise => exercise.id === exId);
  const targetIndex = currentIndex + direction;

  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= exercises.length) return;

  [exercises[currentIndex], exercises[targetIndex]] = [exercises[targetIndex], exercises[currentIndex]];
  saveState();
  updateUI();
}

let editingExerciseId = null;
let activeEncyclopediaCategory = 'all';
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
    renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch);
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

    state.workouts[state.currentDate].push(newExercise);
  });

  saveState();
  updateUI();
  closeAddExerciseModal();

  alert(`🎯 "${pack.title}" (${pack.exercises.length}개 종목)이 오늘 운동 일지에 등록되었습니다!`);
}

function renderEquipmentEncyclopedia(category = 'all', search = '') {
  activeEncyclopediaCategory = category;
  activeEncyclopediaSearch = search;

  const grid = document.getElementById('encyclopediaGrid');
  if (!grid || typeof EQUIPMENT_CATALOG === 'undefined') return;

  const queryChosung = getHangulChosung(search.trim());
  const lowerSearch = search.trim().toLowerCase();

  const filtered = EQUIPMENT_CATALOG.filter(item => {
    if (category !== 'all' && item.category !== category) {
      return false;
    }
    if (lowerSearch) {
      const matchName = item.name.toLowerCase().includes(lowerSearch);
      const matchEng = (item.englishName || '').toLowerCase().includes(lowerSearch);
      const matchMuscles = (item.targetMuscles || '').toLowerCase().includes(lowerSearch);
      const matchChosung = getHangulChosung(item.name).includes(queryChosung);
      if (!matchName && !matchEng && !matchMuscles && !matchChosung) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; padding: 24px 0; text-align: center; color: var(--text-muted); font-size: 0.85rem;">
        <i class="fa-solid fa-circle-question" style="font-size: 1.5rem; margin-bottom: 6px; display: block; color: var(--text-dim);"></i>
        일치하는 운동 기구가 없습니다.<br>상단 '직접 입력' 탭에서 새 운동을 등록해 보세요.
      </div>
    `;
    return;
  }

  const currentInputName = document.getElementById('exerciseNameInput')?.value || '';

  grid.innerHTML = filtered.map(item => {
    const isSelected = selectedEncyclopediaItem?.name === item.name || currentInputName === item.name;
    const svgIcon = (typeof getExerciseSvgIcon === 'function') ? getExerciseSvgIcon(item.name, item.category) : '';
    
    return `
      <div class="enc-card ${isSelected ? 'selected' : ''}" data-name="${escapeHtml(item.name)}" onclick="selectEncyclopediaItem('${escapeHtml(item.name)}')">
        <div class="enc-card-svg-wrap">
          ${svgIcon}
        </div>
        <div class="enc-card-name">${escapeHtml(item.name)}</div>
        <div class="enc-card-eng">${escapeHtml(item.englishName || '')}</div>
        <div class="enc-card-badge-row">
          <span class="enc-badge cat">${escapeHtml(item.category)}</span>
          <span class="enc-badge">${item.category === '유산소' ? `${item.defaultWeight}km/h` : `${item.defaultWeight}kg`}</span>
          <span class="enc-badge">${item.restSeconds}초</span>
        </div>
      </div>
    `;
  }).join('');
}

function selectEncyclopediaItem(exerciseName) {
  if (typeof EQUIPMENT_CATALOG === 'undefined') return;
  const item = EQUIPMENT_CATALOG.find(e => e.name === exerciseName);
  if (!item) return;

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

  // Update Selected Summary Banner
  const banner = document.getElementById('encyclopediaSelectedBanner');
  const bannerIcon = document.getElementById('encSelectedIcon');
  const bannerTitle = document.getElementById('encSelectedTitle');
  const bannerDesc = document.getElementById('encSelectedDesc');

  if (banner && bannerIcon && bannerTitle && bannerDesc) {
    banner.classList.remove('hidden');
    bannerIcon.innerHTML = getExerciseSvgIcon(item.name, item.category);
    bannerTitle.textContent = `${item.name} (${item.equipmentType || item.category})`;
    bannerDesc.textContent = `💡 ${item.tips || item.targetMuscles}`;
  }

  renderEquipmentEncyclopedia(activeEncyclopediaCategory, activeEncyclopediaSearch);
}

function openAddExerciseModal() {
  editingExerciseId = null;
  selectedEncyclopediaItem = null;
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

  // Reset selected banner
  const banner = document.getElementById('encyclopediaSelectedBanner');
  if (banner) banner.classList.add('hidden');

  // Reset search input
  const searchInput = document.getElementById('encyclopediaSearchInput');
  if (searchInput) searchInput.value = '';
  activeEncyclopediaSearch = '';

  // Reset category filter chip active state
  const filterChips = document.querySelectorAll('.enc-filter-chip');
  filterChips.forEach(chip => {
    chip.classList.toggle('active', chip.dataset.cat === 'all');
  });
  activeEncyclopediaCategory = 'all';

  initAudioContext();
  switchAddExerciseModalTab('encyclopedia');
  if (modal) modal.classList.remove('hidden');
}

function openEditExerciseModal(exId) {
  const exercises = state.workouts[state.currentDate] || [];
  const ex = exercises.find(e => e.id === exId);
  if (!ex) return;

  editingExerciseId = exId;
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
  if (modal) modal.classList.remove('hidden');
}

function closeAddExerciseModal() {
  editingExerciseId = null;
  selectedEncyclopediaItem = null;
  const modal = document.getElementById('addExerciseModal');
  if (modal) modal.classList.add('hidden');
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
    collapsed: false,
    restSeconds: finalRest,
    sets: initialSets
  };

  state.workouts[state.currentDate].push(newExercise);
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

function handleDeleteExerciseTap(exId, button) {
  if (!button) return;

  if (button.dataset.deleteArmed === 'true') {
    clearTimeout(button.deleteResetTimer);
    deleteExercise(exId, { skipConfirm: true });
    return;
  }

  document.querySelectorAll('.exercise-delete-btn.delete-armed').forEach(activeButton => {
    activeButton.classList.remove('delete-armed');
    activeButton.dataset.deleteArmed = 'false';
    activeButton.title = '한 번 더 누르면 삭제';
    clearTimeout(activeButton.deleteResetTimer);
  });

  button.dataset.deleteArmed = 'true';
  button.classList.add('delete-armed');
  button.title = '한 번 더 누르면 삭제됩니다';
  button.deleteResetTimer = setTimeout(() => {
    button.classList.remove('delete-armed');
    button.dataset.deleteArmed = 'false';
    button.title = '한 번 더 누르면 삭제';
  }, 2500);
}

function deleteExercise(exId, options = {}) {
  if (!options.skipConfirm && !confirm('이 운동 종목을 삭제하시겠습니까?')) return;
  const list = state.workouts[state.currentDate] || [];
  state.workouts[state.currentDate] = list.filter(e => e.id !== exId);
  saveState();
  updateUI();
}

function deleteSpecificSet(exId, setIndex) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex || !ex.sets[setIndex]) return;

  if (ex.sets.length <= 1) {
    if (confirm('마지막 세트입니다. 이 운동 종목 자체를 삭제하시겠습니까?')) {
      deleteExercise(exId);
    }
    return;
  }

  ex.sets.splice(setIndex, 1);
  sanitizeExerciseSets(ex);
  saveState();
  updateUI();
}

function removeLastSetFromExercise(exId) {
  const list = state.workouts[state.currentDate] || [];
  const ex = list.find(e => e.id === exId);
  if (!ex) return;

  if (ex.sets.length <= 1) {
    if (confirm('마지막 세트입니다. 이 운동 종목 자체를 삭제하시겠습니까?')) {
      deleteExercise(exId);
    }
    return;
  }

  ex.sets.pop();
  sanitizeExerciseSets(ex);
  saveState();
  updateUI();
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

  const targetSet = ex.sets[setIndex];
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

  saveState();
  updateUI();

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
  state.timer.totalSeconds = seconds;
  state.timer.remainingSeconds = seconds;
  state.timer.status = 'idle';
  state.timer.hasBeeped10s = false;
  updateFixedBottomTimerUI();
}

function adjustRestDuration(deltaSeconds) {
  const previousDefault = state.timer.defaultSeconds;
  const nextDefault = Math.min(600, Math.max(5, previousDefault + deltaSeconds));
  const appliedDelta = nextDefault - previousDefault;
  if (appliedDelta === 0) return;

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
  const durationDisplay = document.getElementById('bottomTimerDuration');
  const minusBtn = document.getElementById('bottomTimerMinusBtn');
  const plusBtn = document.getElementById('bottomTimerPlusBtn');

  if (!display || !statusSub || !toggleBtn) return;

  const remaining = Math.max(0, state.timer.remainingSeconds);
  const mins = String(Math.floor(remaining / 60)).padStart(2, '0');
  const secs = String(remaining % 60).padStart(2, '0');

  display.textContent = `${mins}:${secs}`;
  if (durationDisplay) durationDisplay.textContent = `${state.timer.defaultSeconds}초`;
  if (minusBtn) minusBtn.disabled = state.timer.defaultSeconds <= 5;
  if (plusBtn) plusBtn.disabled = state.timer.defaultSeconds >= 600;

  if (state.timer.status === 'running') {
    statusSub.textContent = remaining <= 10 ? '🔥 세트 준비 10초 전!' : '다음 세트 휴식 진행 중...';
    statusSub.style.color = remaining <= 10 ? '#ef4444' : 'var(--accent-emerald)';
    toggleBtn.innerHTML = '<i class="fa-solid fa-pause"></i> 중지';
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
        actualReps: s.targetReps,
        completed: false
      }));

      state.workouts[state.currentDate].push({
        id: 'ex_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
        name: prevEx.name,
        category: prevEx.category,
        type: prevEx.type,
        targetSets: prevEx.targetSets || copiedSets.length,
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
  const exercises = state.workouts[state.currentDate] || [];
  if (exercises.length === 0) return '';

  const compactList = exercises.map((ex, orderIdx) => ({
    idx: orderIdx,
    n: ex.name,
    c: ex.category || '기타',
    t: ex.type || 'strength',
    rst: ex.restSeconds || getDefaultRestForExercise(ex.name, ex.category),
    s: ex.sets.map(s => ({
      w: Number(s.weight) || 0,
      tr: Number(s.targetReps) || 12,
      ar: Number(s.actualReps) || Number(s.targetReps) || 12,
      tp: s.type || 'working',
      cmp: s.completed ? 1 : 0
    }))
  }));

  const jsonPayload = JSON.stringify({ type: 'FIT_TRACKER_ROUTINE', v: 1, data: compactList });
  return encodeRoutineString(jsonPayload);
}

function formatWorkoutNumber(value, maximumFractionDigits = 2) {
  return new Intl.NumberFormat('ko-KR', { maximumFractionDigits }).format(Number(value) || 0);
}

function generateWorkoutSummaryText() {
  const exercises = state.workouts[state.currentDate] || [];
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
    'FitTracker 운동 기록 (Hypertrophy Analysis)',
    `날짜: ${formatDateDisplay(state.currentDate)}`,
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

async function copyWorkoutSummary() {
  const summaryText = generateWorkoutSummaryText();
  if (!summaryText) {
    alert('복사할 운동 내용이 없습니다. 먼저 운동을 추가해 주세요.');
    return;
  }

  const copied = await copyTextToClipboard(summaryText);
  if (copied) {
    alert('운동 내용을 복사했습니다. ChatGPT에 붙여넣어 분석해 보세요!');
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

function openWorkoutExportModal() {
  document.getElementById('workoutExportModal').classList.remove('hidden');
}

function parseAndImportRoutineCode(codeStr) {
  if (!codeStr || !codeStr.trim()) {
    alert('운동 코드 또는 운동 URL을 입력해주세요.');
    return false;
  }

  const jsonStr = decodeRoutineString(extractRoutineCode(codeStr));

  try {
    const parsed = JSON.parse(jsonStr);
    if (!parsed || parsed.type !== 'FIT_TRACKER_ROUTINE' || !Array.isArray(parsed.data)) {
      alert('올바른 FitTracker 운동 루틴 코드 형식이 아닙니다.');
      return false;
    }

    const sortedItems = parsed.data
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
        collapsed: false,
        restSeconds: restSec,
        sets: importedSets
      });
    });

    if (importedExercises.length === 0) {
      alert('불러올 수 있는 운동 종목이 없습니다.');
      return false;
    }

    const previousCount = (state.workouts[state.currentDate] || []).length;
    state.workouts[state.currentDate] = importedExercises;
    state.selectedExercisesForGraph = [...new Set(importedExercises.map(ex => ex.name))];

    saveState();
    updateUI();
    alert(`기존 운동 ${previousCount}개를 지우고 루틴 코드의 운동 ${importedExercises.length}개로 교체했습니다!`);
    return true;
  } catch (e) {
    alert('운동 코드 파싱 실패: 데이터 형식이 올바르지 않습니다.');
    return false;
  }
}

function openTextCodeModal() {
  const modal = document.getElementById('codeModal');
  modal.classList.remove('hidden');

  const codeStr = generateRoutineCodeData();
  const textOutput = document.getElementById('generatedRoutineCode');

  if (codeStr) {
    textOutput.value = codeStr;
  } else {
    textOutput.value = '오늘 등록된 운동 목록이 없습니다. 먼저 운동을 추가해 주세요.';
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

  // Chart Main Mode (Progression vs Balance) Listeners
  const btnProg = document.getElementById('btnChartModeProgression');
  const btnBal = document.getElementById('btnChartModeBalance');
  if (btnProg) btnProg.addEventListener('click', () => switchChartMainMode('progression'));
  if (btnBal) btnBal.addEventListener('click', () => switchChartMainMode('balance'));

  // Chart Metric Selector Chips Listeners (1RM, Max, Volume, Reps)
  const metricChips = document.querySelectorAll('#chartMetricSelector .chart-metric-chip');
  metricChips.forEach(chip => {
    chip.addEventListener('click', () => {
      metricChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const metric = chip.dataset.metric || 'orm';
      setChartMetric(metric);
    });
  });

  document.getElementById('dailyGraphBtn').addEventListener('click', () => {
    state.graphPeriod = 'daily';
    renderExerciseWeightChart();
  });
  document.getElementById('monthlyGraphBtn').addEventListener('click', () => {
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

  document.getElementById('toggleAllExercisesBtn').addEventListener('click', toggleAllExerciseCards);
  document.getElementById('deleteAllExercisesBtn').addEventListener('click', () => {
    closeWorkoutMoreMenu();
    deleteAllExercisesForCurrentDate();
  });
  document.getElementById('workoutMoreMenuBtn').addEventListener('click', (event) => {
    event.stopPropagation();
    const menu = document.getElementById('workoutMoreMenu');
    const button = document.getElementById('workoutMoreMenuBtn');
    const willOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden', !willOpen);
    button.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('click', (event) => {
    if (!event.target.closest('.header-more-menu')) {
      closeWorkoutMoreMenu();
    }
  });

  const copyWorkoutSummaryBtn = document.getElementById('copyWorkoutSummaryBtn');
  if (copyWorkoutSummaryBtn) {
    copyWorkoutSummaryBtn.addEventListener('click', openWorkoutExportModal);
  }

  document.getElementById('copyWorkoutContentBtn').addEventListener('click', copyWorkoutSummary);
  document.getElementById('copyWorkoutCodePromptBtn').addEventListener('click', copyWorkoutCodePrompt);
  document.getElementById('closeWorkoutExportModalBtn').addEventListener('click', () => {
    document.getElementById('workoutExportModal').classList.add('hidden');
  });
  document.getElementById('closeWorkoutExportFooterBtn').addEventListener('click', () => {
    document.getElementById('workoutExportModal').classList.add('hidden');
  });

  document.getElementById('openReleaseNotesBtn').addEventListener('click', () => {
    document.getElementById('releaseNotesModal').classList.remove('hidden');
  });
  document.getElementById('closeReleaseNotesModalBtn').addEventListener('click', () => {
    document.getElementById('releaseNotesModal').classList.add('hidden');
  });
  document.getElementById('closeReleaseNotesFooterBtn').addEventListener('click', () => {
    document.getElementById('releaseNotesModal').classList.add('hidden');
  });

  document.getElementById('soundToggleBtn').addEventListener('click', () => {
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
  document.getElementById('bottomTimerMinusBtn').addEventListener('click', () => adjustRestDuration(-5));
  document.getElementById('bottomTimerPlusBtn').addEventListener('click', () => adjustRestDuration(5));

  document.getElementById('bottomTimerToggleBtn').addEventListener('click', () => {
    if (state.timer.status === 'running') {
      pauseRestTimer();
    } else if (state.timer.status === 'paused') {
      resumeRestTimer();
    } else {
      startRestTimer();
    }
  });

  // Streamlined Text Code Modal Listeners
  document.getElementById('textShareBtn').addEventListener('click', () => {
    closeWorkoutMoreMenu();
    openTextCodeModal();
  });
  document.getElementById('closeCodeModalBtn').addEventListener('click', () => {
    document.getElementById('codeModal').classList.add('hidden');
  });
  document.getElementById('closeCodeFooterBtn').addEventListener('click', () => {
    document.getElementById('codeModal').classList.add('hidden');
  });

  // 1. "운동 코드 생성하기" -> Generates code token & automatically copies to clipboard
  document.getElementById('copyGeneratedCodeBtn').addEventListener('click', () => {
    const codeStr = generateRoutineCodeData();
    const textOutput = document.getElementById('generatedRoutineCode');

    if (!codeStr) {
      alert('오늘 등록된 운동 목록이 없습니다. 먼저 운동을 추가해 주세요.');
      textOutput.value = '';
      return;
    }

    textOutput.value = codeStr;

    navigator.clipboard.writeText(codeStr).then(() => {
      alert('오늘의 운동 루틴 코드가 생성되어 클립보드에 복사되었습니다!');
    }).catch(() => {
      alert('운동 루틴 코드가 생성되었습니다. 생성된 코드를 직접 드래그하여 복사해 주세요.');
    });
  });

  // 2. "운동 URL + 코드 생성하기" -> Generates a public URL containing the code
  document.getElementById('copyGeneratedUrlBtn').addEventListener('click', () => {
    const codeStr = generateRoutineCodeData();
    const textOutput = document.getElementById('generatedRoutineCode');

    if (!codeStr) {
      alert('오늘 등록된 운동 목록이 없습니다. 먼저 운동을 추가해 주세요.');
      textOutput.value = '';
      return;
    }

    const shareUrl = generateRoutineShareUrl(codeStr);
    textOutput.value = shareUrl;

    navigator.clipboard.writeText(shareUrl).then(() => {
      alert('운동 URL이 생성되어 클립보드에 복사되었습니다!');
    }).catch(() => {
      alert('운동 URL이 생성되었습니다. 생성된 URL을 직접 드래그하여 복사해 주세요.');
    });
  });

  // 3. "운동 코드 불러오기" -> Imports a code token or shared URL from input
  document.getElementById('importRoutineCodeBtn').addEventListener('click', () => {
    const text = document.getElementById('inputRoutineCode').value;
    if (parseAndImportRoutineCode(text)) {
      document.getElementById('codeModal').classList.add('hidden');
      document.getElementById('inputRoutineCode').value = '';
    }
  });

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

  // Encyclopedia Category Filter Chips Listeners
  const filterChips = document.querySelectorAll('.enc-filter-chip');
  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      const cat = chip.dataset.cat || 'all';
      renderEquipmentEncyclopedia(cat, activeEncyclopediaSearch);
    });
  });

  // Encyclopedia Live Search Input Listener
  const encSearchInput = document.getElementById('encyclopediaSearchInput');
  if (encSearchInput) {
    encSearchInput.addEventListener('input', (e) => {
      renderEquipmentEncyclopedia(activeEncyclopediaCategory, e.target.value);
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
    });
  });

  const defaultRestInput = document.getElementById('defaultRestInput');
  if (defaultRestInput) {
    defaultRestInput.addEventListener('input', (e) => {
      updateRestPresetChips(e.target.value);
    });
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
    });
  }

  // Add & Edit Exercise Modal Listeners
  document.getElementById('addExerciseBtn').addEventListener('click', openAddExerciseModal);
  document.getElementById('emptyAddBtn').addEventListener('click', openAddExerciseModal);
  document.getElementById('closeAddModalBtn').addEventListener('click', closeAddExerciseModal);
  document.getElementById('cancelAddBtn').addEventListener('click', closeAddExerciseModal);

  document.getElementById('addExerciseForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('exerciseNameInput').value.trim();
    const category = document.getElementById('exerciseCategorySelect').value;
    const weight = document.getElementById('defaultWeightInput').value;
    const reps = document.getElementById('defaultRepsInput').value;
    const restSec = document.getElementById('defaultRestInput') ? document.getElementById('defaultRestInput').value : 90;

    if (name) {
      if (editingExerciseId) {
        replaceExercise(editingExerciseId, name, category, weight, reps, restSec);
      } else {
        addExercise(name, category, weight, reps, restSec);
      }
      closeAddExerciseModal();
      document.getElementById('exerciseNameInput').value = '';
    }
  });

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
  const manualSyncBtn = document.getElementById('manualSyncBtn');
  if (manualSyncBtn) {
    manualSyncBtn.addEventListener('click', () => {
      if (typeof syncWorkoutsToAdminServer === 'function') {
        syncWorkoutsToAdminServer();
        alert('클라우드로 동기화되었습니다!');
      }
    });
  }

  if (typeof initFirebaseSync === 'function') {
    initFirebaseSync();
  }

  updateUI();
  importRoutineFromUrl();
});
