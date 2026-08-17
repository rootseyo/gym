const WORKOUT_STORAGE_KEY = 'fit_tracker_workouts_v1';
const ROUTINE_CODE_PREFIX = 'FITROUTINE_v1_';
const WEEKLY_CODE_PREFIX = 'FITWEEK_v1_';
const SECRET_XOR_KEY = 'FIT_TRACKER_KEY_2026';
const CATEGORIES = ['가슴', '등', '하체', '어깨', '팔', '복근/코어', '유산소', '전신', '기타'];

let workouts = {};
let toastTimer = null;
const dayExpandedState = new Map();

function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function addDays(dateString, amount) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + amount);
  return getLocalDateString(date);
}

function formatDate(dateString) {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  const weekday = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
  return `${month}월 ${day}일 (${weekday})`;
}

function loadWorkouts() {
  try {
    const parsed = JSON.parse(localStorage.getItem(WORKOUT_STORAGE_KEY) || '{}');
    workouts = parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {};
  } catch (error) {
    workouts = {};
  }
}

function decodeWeeklyString(code) {
  if (!code || !code.startsWith(WEEKLY_CODE_PREFIX)) return '';
  try {
    const binary = atob(code.substring(WEEKLY_CODE_PREFIX.length));
    const xorBytes = Uint8Array.from(binary, character => character.charCodeAt(0));
    const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);
    const utf8Bytes = new Uint8Array(xorBytes.length);
    for (let index = 0; index < xorBytes.length; index++) {
      utf8Bytes[index] = xorBytes[index] ^ keyBytes[index % keyBytes.length];
    }
    return new TextDecoder().decode(utf8Bytes);
  } catch (error) {
    return '';
  }
}

function encodeWeeklyString(jsonString) {
  try {
    const utf8Bytes = new TextEncoder().encode(jsonString);
    const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);
    const xorBytes = new Uint8Array(utf8Bytes.length);
    for (let index = 0; index < utf8Bytes.length; index++) {
      xorBytes[index] = utf8Bytes[index] ^ keyBytes[index % keyBytes.length];
    }
    let binary = '';
    xorBytes.forEach(byte => { binary += String.fromCharCode(byte); });
    return WEEKLY_CODE_PREFIX + btoa(binary);
  } catch (error) {
    return '';
  }
}

function generateWeeklyExportUrl() {
  const data = getVisibleDates().map(date => ({
    d: date,
    e: (workouts[date] || []).map((exercise, exerciseIndex) => ({
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
  if (data.length === 0) return '';
  const visibleDates = getVisibleDates();
  const code = encodeWeeklyString(JSON.stringify({
    type: 'FIT_TRACKER_WEEKLY',
    v: 1,
    anchor: getLocalDateString(),
    scope: { from: visibleDates[0], to: visibleDates[visibleDates.length - 1] },
    data
  }));
  if (!code) return '';
  const url = new URL('weekly.html', window.location.href);
  url.searchParams.set('week', code);
  return url.toString();
}

async function exportWeeklyDashboard() {
  const shareUrl = generateWeeklyExportUrl();
  if (!shareUrl) {
    showToast('내보낼 위클리 운동이 없습니다.');
    return;
  }
  const copied = await copyText(shareUrl);
  showToast(copied ? '위클리 공유 URL을 복사했습니다.' : '공유 URL을 복사하지 못했습니다.');
}

function importWeeklyShareCode(code) {
  if (!code) return false;
  try {
    const parsed = JSON.parse(decodeWeeklyString(code));
    if (parsed?.type !== 'FIT_TRACKER_WEEKLY' || parsed.v !== 1 || !Array.isArray(parsed.data)) return false;
    const allowedDate = /^\d{4}-\d{2}-\d{2}$/;
    const scopeFrom = String(parsed.scope?.from || '');
    const scopeTo = String(parsed.scope?.to || '');
    if (allowedDate.test(scopeFrom) && allowedDate.test(scopeTo) && scopeFrom <= scopeTo) {
      Object.keys(workouts).forEach(date => {
        if (date >= scopeFrom && date <= scopeTo) delete workouts[date];
      });
    }
    parsed.data.slice(0, 7).forEach(day => {
      if (!day || !allowedDate.test(String(day.d)) || !Array.isArray(day.e)) return;
      if (day.e.length === 0) {
        delete workouts[day.d];
        return;
      }
      workouts[day.d] = day.e.slice(0, 50).filter(item => item && typeof item === 'object').map(item => {
        const category = CATEGORIES.includes(item.c) ? item.c : '기타';
        const type = item.t === 'cardio' || category === '유산소' ? 'cardio' : 'strength';
        const sets = Array.isArray(item.s) ? item.s.slice(0, 30).map((set, index) => ({
          setNumber: index + 1,
          weight: Number.isFinite(Number(set.w)) ? Math.max(0, Number(set.w)) : (type === 'cardio' ? 9 : 40),
          targetReps: Number.isFinite(Number(set.r)) ? Math.max(1, Number(set.r)) : (type === 'cardio' ? 20 : 12),
          actualReps: Number.isFinite(Number(set.a)) ? Math.max(0, Number(set.a)) : 0,
          completed: set.x === 1
        })) : [];
        const exercise = {
          id: makeId(),
          name: String(item.n || '운동').trim().slice(0, 100) || '운동',
          category,
          type,
          targetSets: sets.length,
          collapsed: false,
          sets
        };
        return normalizeExercise(exercise);
      });
    });
    saveWorkouts();
    return true;
  } catch (error) {
    return false;
  }
}

function extractWeeklyCode(value) {
  const input = String(value || '').trim();
  if (!input) return '';
  if (input.startsWith(WEEKLY_CODE_PREFIX)) return input;
  try {
    return new URL(input).searchParams.get('week') || '';
  } catch (error) {
    return '';
  }
}

function importWeeklyShareFromUrl() {
  const url = new URL(window.location.href);
  const imported = importWeeklyShareCode(url.searchParams.get('week'));
  if (imported) {
    url.searchParams.delete('week');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }
  return imported;
}

function setWeeklyImportModal(open) {
  const modal = document.getElementById('weeklyImportModal');
  modal.classList.toggle('hidden', !open);
  if (open) setTimeout(() => document.getElementById('weeklyImportInput').focus(), 0);
}

function importWeeklyFromInput() {
  const input = document.getElementById('weeklyImportInput');
  const code = extractWeeklyCode(input.value);
  if (!code || !importWeeklyShareCode(code)) {
    showToast('올바른 위클리 URL 또는 코드가 아닙니다.');
    return;
  }
  input.value = '';
  setWeeklyImportModal(false);
  renderDashboard();
  showToast('위클리 운동을 가져와 저장했습니다.');
}

function saveWorkouts() {
  localStorage.setItem(WORKOUT_STORAGE_KEY, JSON.stringify(workouts));
}

function getVisibleDates() {
  const today = getLocalDateString();
  const todayTime = new Date(`${today}T00:00:00`).getTime();
  const workoutDates = Object.keys(workouts)
    .filter(date => Array.isArray(workouts[date]) && workouts[date].length > 0)
    .sort((a, b) => {
      const distanceA = Math.abs(new Date(`${a}T00:00:00`).getTime() - todayTime);
      const distanceB = Math.abs(new Date(`${b}T00:00:00`).getTime() - todayTime);
      return distanceA - distanceB || a.localeCompare(b);
    })
    .slice(0, 7);
  const selected = new Set(workoutDates);
  let futureOffset = 1;
  while (selected.size < 7) {
    selected.add(addDays(today, futureOffset));
    futureOffset++;
  }
  return Array.from(selected).sort();
}

function makeId() {
  return `ex_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}

function isCardio(exercise) {
  return exercise?.type === 'cardio' || exercise?.category === '유산소';
}

function normalizeExercise(exercise) {
  if (!Array.isArray(exercise.sets) || exercise.sets.length === 0) {
    exercise.sets = [{ setNumber: 1, weight: isCardio(exercise) ? 9 : 40, targetReps: isCardio(exercise) ? 20 : 12, actualReps: isCardio(exercise) ? 20 : 12, completed: false }];
  }
  exercise.sets.forEach((set, index) => { set.setNumber = index + 1; });
  exercise.targetSets = exercise.sets.length;
  return exercise;
}

function createElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function createNumberInput(value, min, step, label, onChange) {
  const input = createElement('input');
  input.type = 'number';
  input.value = value;
  input.min = min;
  input.step = step;
  input.setAttribute('aria-label', label);
  input.addEventListener('change', () => onChange(Number(input.value)));
  return input;
}

function showToast(message) {
  const toast = document.getElementById('weeklyToast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2200);
}

function persistAndRender() {
  saveWorkouts();
  renderDashboard();
}

function updateExercise(date, exerciseId, field, value) {
  const exercise = (workouts[date] || []).find(item => item.id === exerciseId);
  if (!exercise) return;
  exercise[field] = value;
  if (field === 'category') exercise.type = value === '유산소' ? 'cardio' : 'strength';
  persistAndRender();
}

function updateSet(date, exerciseId, setIndex, field, value) {
  const exercise = (workouts[date] || []).find(item => item.id === exerciseId);
  if (!exercise?.sets?.[setIndex]) return;
  exercise.sets[setIndex][field] = Number.isFinite(value) ? Math.max(0, value) : 0;
  saveWorkouts();
  updateSummary();
}

function updateSetCount(date, exerciseId, requestedCount) {
  const exercise = (workouts[date] || []).find(item => item.id === exerciseId);
  if (!exercise) return;
  const count = Math.min(30, Math.max(1, Math.round(requestedCount) || 1));
  const cardio = isCardio(exercise);
  while (exercise.sets.length < count) {
    const previous = exercise.sets.at(-1) || { weight: cardio ? 9 : 40, targetReps: cardio ? 20 : 12, actualReps: cardio ? 20 : 12 };
    exercise.sets.push({
      setNumber: exercise.sets.length + 1,
      weight: Number(previous.weight) || 0,
      targetReps: Number(previous.targetReps) || (cardio ? 20 : 12),
      actualReps: Number(previous.actualReps) || Number(previous.targetReps) || (cardio ? 20 : 12),
      completed: false
    });
  }
  exercise.sets.splice(count);
  normalizeExercise(exercise);
  persistAndRender();
}

function addWeeklySet(date, exerciseId) {
  const exercise = (workouts[date] || []).find(item => item.id === exerciseId);
  if (!exercise) return;
  updateSetCount(date, exerciseId, (exercise.sets || []).length + 1);
}

function deleteWeeklySet(date, exerciseId, setIndex) {
  const exercise = (workouts[date] || []).find(item => item.id === exerciseId);
  if (!exercise?.sets?.[setIndex]) return;
  if (exercise.sets.length === 1) {
    showToast('운동에는 최소 1세트가 필요합니다.');
    return;
  }
  exercise.sets.splice(setIndex, 1);
  normalizeExercise(exercise);
  persistAndRender();
}

function deleteExercise(date, exerciseId) {
  workouts[date] = (workouts[date] || []).filter(item => item.id !== exerciseId);
  if (workouts[date].length === 0) delete workouts[date];
  persistAndRender();
}

function addExercise(date, name, category) {
  const cleanName = name.trim().slice(0, 100);
  if (!cleanName) return;
  const cardio = category === '유산소';
  if (!Array.isArray(workouts[date])) workouts[date] = [];
  workouts[date].push({
    id: makeId(),
    name: cleanName,
    category,
    type: cardio ? 'cardio' : 'strength',
    targetSets: cardio ? 1 : 3,
    collapsed: false,
    sets: Array.from({ length: cardio ? 1 : 3 }, (_, index) => ({
      setNumber: index + 1,
      weight: cardio ? 9 : 40,
      targetReps: cardio ? 20 : 12,
      actualReps: cardio ? 20 : 12,
      completed: false
    }))
  });
  persistAndRender();
}

function encodeRoutineString(jsonString) {
  const utf8Bytes = new TextEncoder().encode(jsonString);
  const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);
  const xorBytes = new Uint8Array(utf8Bytes.length);
  for (let index = 0; index < utf8Bytes.length; index++) {
    xorBytes[index] = utf8Bytes[index] ^ keyBytes[index % keyBytes.length];
  }
  let binary = '';
  xorBytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return ROUTINE_CODE_PREFIX + btoa(binary);
}

function generateRoutineCode(date) {
  const exercises = workouts[date] || [];
  if (exercises.length === 0) return '';
  const data = exercises.map((exercise, index) => ({
    idx: index,
    n: exercise.name,
    c: exercise.category || '기타',
    t: exercise.type || (exercise.category === '유산소' ? 'cardio' : 'strength'),
    s: (exercise.sets || []).map(set => ({
      w: Number(set.weight) || 0,
      tr: Number(set.targetReps) || 12,
      ar: Number(set.actualReps) || Number(set.targetReps) || 12,
      cmp: set.completed ? 1 : 0
    }))
  }));
  return encodeRoutineString(JSON.stringify({ type: 'FIT_TRACKER_ROUTINE', v: 1, data }));
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    const textarea = createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    textarea.remove();
    return copied;
  }
}

async function exportDate(date) {
  const code = generateRoutineCode(date);
  if (!code) {
    showToast('내보낼 운동 항목이 없습니다.');
    return;
  }
  const copied = await copyText(code);
  showToast(copied ? `${formatDate(date)} 운동 코드를 복사했습니다.` : '코드를 복사하지 못했습니다.');
}

function renderExercise(date, exercise) {
  normalizeExercise(exercise);
  const wrapper = createElement('article', 'weekly-exercise');
  const head = createElement('div', 'weekly-exercise-head');
  const nameInput = createElement('input');
  nameInput.type = 'text';
  nameInput.value = exercise.name || '';
  nameInput.maxLength = 100;
  nameInput.setAttribute('aria-label', '운동 항목');
  nameInput.addEventListener('change', () => updateExercise(date, exercise.id, 'name', nameInput.value.trim() || '운동'));

  const categorySelect = createElement('select');
  categorySelect.setAttribute('aria-label', '운동 카테고리');
  CATEGORIES.forEach(category => {
    const option = createElement('option', '', category);
    option.value = category;
    option.selected = category === (exercise.category || '기타');
    categorySelect.appendChild(option);
  });
  categorySelect.addEventListener('change', () => updateExercise(date, exercise.id, 'category', categorySelect.value));

  const deleteButton = createElement('button', 'weekly-delete-btn');
  deleteButton.type = 'button';
  deleteButton.title = '운동 항목 삭제';
  deleteButton.setAttribute('aria-label', `${exercise.name} 삭제`);
  deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
  deleteButton.addEventListener('click', () => deleteExercise(date, exercise.id));
  head.append(nameInput, categorySelect, deleteButton);

  const setsHead = createElement('div', 'weekly-sets-head');
  setsHead.append(createElement('span', '', '세트'), createElement('span', '', isCardio(exercise) ? '속도(km/h)' : '중량(kg)'), createElement('span', '', isCardio(exercise) ? '시간(분)' : '횟수'), createElement('span', '', '삭제'));
  wrapper.append(head, setsHead);

  exercise.sets.forEach((set, setIndex) => {
    const row = createElement('div', 'weekly-set-row');
    const deleteSetButton = createElement('button', 'weekly-delete-set-btn');
    deleteSetButton.type = 'button';
    deleteSetButton.title = `${setIndex + 1}세트 삭제`;
    deleteSetButton.setAttribute('aria-label', `${setIndex + 1}세트 삭제`);
    deleteSetButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    deleteSetButton.addEventListener('click', () => deleteWeeklySet(date, exercise.id, setIndex));
    row.append(
      createElement('span', 'weekly-set-number', `${setIndex + 1}`),
      createNumberInput(set.weight, 0, isCardio(exercise) ? 0.5 : 2.5, '중량 또는 속도', value => updateSet(date, exercise.id, setIndex, 'weight', value)),
      createNumberInput(set.targetReps, 1, 1, '횟수 또는 시간', value => {
        updateSet(date, exercise.id, setIndex, 'targetReps', value);
        if (!set.completed) updateSet(date, exercise.id, setIndex, 'actualReps', value);
      }),
      deleteSetButton
    );
    wrapper.appendChild(row);
  });

  const addSetButton = createElement('button', 'weekly-add-set-btn');
  addSetButton.type = 'button';
  addSetButton.innerHTML = '<i class="fa-solid fa-plus"></i> 세트 추가';
  addSetButton.addEventListener('click', () => addWeeklySet(date, exercise.id));
  wrapper.appendChild(addSetButton);
  return wrapper;
}

function renderDayCard(date, today) {
  const exercises = Array.isArray(workouts[date]) ? workouts[date] : [];
  const defaultExpanded = !window.matchMedia('(max-width: 700px)').matches;
  const expanded = dayExpandedState.has(date) ? dayExpandedState.get(date) : defaultExpanded;
  const card = createElement('article', `day-card${date === today ? ' today' : ''}${expanded ? '' : ' details-collapsed'}`);
  const header = createElement('header', 'day-card-header');
  const titleRow = createElement('div', 'day-title-row');
  const label = date === today ? '오늘' : date < today ? '이전 운동' : '예정';
  titleRow.append(createElement('h2', '', formatDate(date)), createElement('span', 'day-label', label));

  const actions = createElement('div', 'day-header-actions');
  const exportButton = createElement('button', 'btn btn-outline export-day-btn');
  exportButton.type = 'button';
  exportButton.disabled = exercises.length === 0;
  exportButton.innerHTML = '<i class="fa-solid fa-code"></i> 코드 내보내기';
  exportButton.addEventListener('click', () => exportDate(date));
  const toggleButton = createElement('button', 'btn btn-secondary toggle-day-btn');
  toggleButton.type = 'button';
  toggleButton.title = expanded ? '상세 운동 접기' : '상세 운동 펼치기';
  toggleButton.setAttribute('aria-expanded', String(expanded));
  toggleButton.innerHTML = '<i class="fa-solid fa-chevron-up"></i>';
  toggleButton.addEventListener('click', () => {
    dayExpandedState.set(date, !expanded);
    renderDashboard();
  });
  actions.append(exportButton, toggleButton);
  header.append(titleRow, actions);

  const summary = createElement('div', 'day-summary');
  summary.appendChild(createElement('span', 'day-summary-count', `${exercises.length}개 종목`));
  exercises.slice(0, 5).forEach(exercise => summary.appendChild(createElement('span', 'day-summary-name', exercise.name)));
  if (exercises.length > 5) summary.appendChild(createElement('span', 'day-summary-name', `+${exercises.length - 5}`));

  const body = createElement('div', 'day-card-body');
  if (exercises.length === 0) body.appendChild(createElement('p', 'day-empty', '등록된 운동이 없습니다.'));
  exercises.forEach(exercise => body.appendChild(renderExercise(date, exercise)));

  const addRow = createElement('form', 'add-exercise-inline');
  const nameInput = createElement('input');
  nameInput.type = 'text';
  nameInput.placeholder = '운동 항목';
  nameInput.maxLength = 100;
  nameInput.required = true;
  const categorySelect = createElement('select');
  CATEGORIES.forEach(category => {
    const option = createElement('option', '', category);
    option.value = category;
    categorySelect.appendChild(option);
  });
  const addButton = createElement('button', 'btn btn-primary');
  addButton.type = 'submit';
  addButton.innerHTML = '<i class="fa-solid fa-plus"></i> 추가';
  addRow.append(nameInput, categorySelect, addButton);
  addRow.addEventListener('submit', event => {
    event.preventDefault();
    addExercise(date, nameInput.value, categorySelect.value);
  });
  body.appendChild(addRow);
  card.append(header, summary, body);
  return card;
}

function updateSummary() {
  const dates = getVisibleDates();
  let exerciseCount = 0;
  let setCount = 0;
  dates.forEach(date => {
    const exercises = workouts[date] || [];
    exerciseCount += exercises.length;
    exercises.forEach(exercise => { setCount += Array.isArray(exercise.sets) ? exercise.sets.length : 0; });
  });
  document.getElementById('visibleDateCount').textContent = `${dates.length}일`;
  document.getElementById('visibleExerciseCount').textContent = `${exerciseCount}개`;
  document.getElementById('visibleSetCount').textContent = `${setCount}세트`;
}

function renderDashboard() {
  const grid = document.getElementById('weeklyGrid');
  const today = getLocalDateString();
  const dates = getVisibleDates();
  if (dates.length === 0) {
    const empty = createElement('div', 'weekly-empty-dashboard');
    empty.innerHTML = '<i class="fa-solid fa-calendar-xmark"></i><strong>표시할 운동이 없습니다.</strong><span>메인 화면에서 운동을 추가하거나 위클리 코드를 가져와 주세요.</span>';
    grid.replaceChildren(empty);
  } else {
    grid.replaceChildren(...dates.map(date => renderDayCard(date, today)));
  }
  updateSummary();
}

document.addEventListener('DOMContentLoaded', () => {
  loadWorkouts();
  const importedFromUrl = importWeeklyShareFromUrl();
  renderDashboard();
  if (importedFromUrl) showToast('공유된 위클리 운동을 저장했습니다.');
  document.getElementById('refreshDashboardBtn').addEventListener('click', () => {
    loadWorkouts();
    renderDashboard();
    showToast('최신 운동 기록을 불러왔습니다.');
  });
  document.getElementById('openWeeklyImportBtn').addEventListener('click', () => setWeeklyImportModal(true));
  document.getElementById('exportWeeklyBtn').addEventListener('click', exportWeeklyDashboard);
  document.getElementById('closeWeeklyImportBtn').addEventListener('click', () => setWeeklyImportModal(false));
  document.getElementById('cancelWeeklyImportBtn').addEventListener('click', () => setWeeklyImportModal(false));
  document.getElementById('submitWeeklyImportBtn').addEventListener('click', importWeeklyFromInput);
  document.getElementById('weeklyImportModal').addEventListener('click', event => {
    if (event.target.id === 'weeklyImportModal') setWeeklyImportModal(false);
  });
  window.addEventListener('storage', event => {
    if (event.key === WORKOUT_STORAGE_KEY) {
      loadWorkouts();
      renderDashboard();
    }
  });
});
