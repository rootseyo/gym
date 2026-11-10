const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const code = fs.readFileSync(require('node:path').join(__dirname, '..', 'app.js'), 'utf8');
function fn(name) {
  const match = code.match(new RegExp(`function ${name}\\([^)]*\\) \\{[\\s\\S]*?\\n\\}`));
  assert.ok(match, name);
  return match[0];
}
function deletionContext() {
  let restore;
  let account = 'account-a';
  const original = [{weight: 40, completed: true}, {weight: 50, completed: false}, {weight: 60, completed: false}];
  const context = {
    state: {currentDate: '2026-10-12', workouts: {'2026-10-12': [{id: 'ex', sets: original}]}},
    localStorage: {getItem: () => account},
    sanitizeExerciseSets: ex => ex.sets.forEach((s, i) => {s.setNumber = i + 1;}),
    saveState() {}, updateUI() {},
    showSetUndo: callback => {restore = callback;},
    confirm: () => false,
  };
  vm.createContext(context);
  vm.runInContext(fn('deleteSpecificSet'), context);
  return {context, undo: () => restore(), switchAccount: () => {account = 'account-b';}};
}
test('undo restores the removed set on its original date and preserves later edits', () => {
  const {context, undo} = deletionContext();
  context.deleteSpecificSet('ex', 1);
  const ex = context.state.workouts['2026-10-12'][0];
  assert.equal(ex.sets.length, 2);
  ex.sets[0].weight = 45;
  context.state.currentDate = '2026-10-11';
  undo();
  assert.equal(ex.sets.length, 3);
  assert.equal(ex.sets[0].weight, 45);
  assert.equal(ex.sets[1].weight, 50);
  assert.equal(ex.sets[2].setNumber, 3);
});
test('undo does not restore records after account change or exercise deletion', () => {
  const first = deletionContext();
  first.context.deleteSpecificSet('ex', 1);
  first.switchAccount();
  first.undo();
  assert.equal(first.context.state.workouts['2026-10-12'][0].sets.length, 2);
  const second = deletionContext();
  second.context.deleteSpecificSet('ex', 1);
  second.context.state.workouts['2026-10-12'] = [];
  second.undo();
  assert.equal(second.context.state.workouts['2026-10-12'].length, 0);
});
test('volume projection counts cardio and warmup sets but excludes them from strength kilograms', () => {
  const context = {
    state: {workouts: {today: [
      {type: 'strength', sets: [{weight: 40, actualReps: 10, completed: true}, {weight: 50, actualReps: 8}]},
      {type: 'strength', sets: [{type: 'warmup', weight: 20, actualReps: 10, completed: true}]},
      {type: 'cardio', sets: [{weight: 9, actualReps: 20, completed: true}, {weight: 9, actualReps: 10}]},
    ]}},
    getTodayString: () => 'today',
    isCardioExercise: ex => ex.type === 'cardio',
    isWorkoutSetCompleted: s => Boolean(s.completed),
  };
  vm.createContext(context);
  vm.runInContext(fn('getWorkoutSetVolume') + '\n' + fn('getTodayVolumeProjection'), context);
  const result = context.getTodayVolumeProjection();
  assert.equal(result.totalSets, 5);
  assert.equal(result.completedSets, 3);
  assert.equal(result.completedVolume, 400);
  assert.equal(result.pendingVolume, 400);
  assert.equal(result.projectedVolume, 800);
});
