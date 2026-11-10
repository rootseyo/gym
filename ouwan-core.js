/* Shared verbatim by the web app and Admin. Keep completion and snapshot rules identical. */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.OuwanCore = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  const categories = ['가슴', '등', '하체', '어깨', '팔', '복근/코어', '전신', '유산소', '기타'];
  const consentVersion = 'ouwan-2026-09-12-v1';
  function completed(set) {
    if (!set || typeof set !== 'object') return false;
    return set.completed === undefined ? set.isCompleted === true
      : set.completed === true || set.completed === 1 || set.completed === 'true';
  }
  function isComplete(exercises) {
    return Array.isArray(exercises) && exercises.length > 0 && exercises.length <= 100
      && exercises.every(ex => ex && typeof ex.name === 'string' && ex.name.trim()
        && Array.isArray(ex.sets) && ex.sets.length > 0 && ex.sets.length <= 100 && ex.sets.every(completed));
  }
  function number(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.min(10000, Math.max(0, parsed)) : 0;
  }
  function projection(exercises, defaultRest = () => 90) {
    if (!Array.isArray(exercises)) return [];
    return exercises.slice(0, 100).flatMap(ex => {
      if (!ex || typeof ex.name !== 'string' || !ex.name.trim() || !Array.isArray(ex.sets)) return [];
      const name = ex.name.trim().slice(0, 100);
      const category = categories.includes(ex.category) ? ex.category : '기타';
      const sets = ex.sets.slice(0, 100).flatMap((set, index) => completed(set) ? [{
        setNumber: index + 1, type: ['working', 'warmup', 'failure', 'drop'].includes(set.type) ? set.type : 'working',
        weight: number(set.weight), actualReps: number(set.actualReps),
      }] : []);
      return sets.length ? [{ name, category, type: ex.type === 'cardio' || category === '유산소' ? 'cardio' : 'strength',
        restSeconds: Math.min(3600, number(ex.restSeconds)) || defaultRest(name, category), sets }] : [];
    });
  }
  function totalVolume(exercises) {
    if (!Array.isArray(exercises)) return 0;
    return Math.round(exercises.reduce((total, exercise) => {
      if (!exercise || exercise.type === 'cardio' || exercise.category === '유산소' || !Array.isArray(exercise.sets)) return total;
      return total + exercise.sets.reduce((sum, set) => sum + number(set?.weight) * number(set?.actualReps), 0);
    }, 0) * 10) / 10;
  }
  function today(now = Date.now()) { return new Date(Number(now) + 9 * 3600000).toISOString().slice(0, 10); }
  function validDate(value) {
    return typeof value === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(value) && Number.isFinite(Date.parse(value))
      && new Date(value).toISOString().slice(0, 10) === value;
  }
  function periodStart(period, now = Date.now()) {
    const date = today(now);
    if (period === 'all') return '0001-01-01';
    if (period === 'month') return date.slice(0, 7) + '-01';
    const weekday = new Date(date).getUTCDay();
    return new Date(Date.parse(date) - ((weekday + 6) % 7) * 86400000).toISOString().slice(0, 10);
  }
  function normalizeNickname(value) { return typeof value === 'string' ? value.normalize('NFKC').trim().replace(/\s+/g, ' ') : ''; }
  function nicknameKey(value) { return normalizeNickname(value).replace(/\s/g, '').toLowerCase(); }
  return { completed, isComplete, projection, totalVolume, today, validDate, periodStart, normalizeNickname, nicknameKey, categories, consentVersion };
});
