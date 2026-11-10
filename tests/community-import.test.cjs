const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const { webcrypto } = require('node:crypto');
const source = fs.readFileSync(require('node:path').join(__dirname, '../community-import.js'), 'utf8');

function setup(overrides = {}) {
  const pending = { accountId: '111', createdAt: Date.now(), date: '2026-09-10', exercises: [{
    name: '벤치프레스', category: '가슴', type: 'strength', restSeconds: 135,
    sets: [{ setNumber: 3, type: 'warmup', weight: 42.5, actualReps: 10, completed: true }],
  }], ...overrides };
  let stored = JSON.stringify(pending), saves = 0, pulls = 0;
  const alerts = [], state = { workouts: { '2026-09-09': [{ name: '이전 운동' }] }, currentDate: '2026-09-09', selectedExercisesForGraph: [] };
  const sandbox = { URL, Date, crypto: webcrypto, location: { href: 'https://gym.brightnetworks.kr/?communityImport=1' },
    document: { title: 'test' }, history: { replaceState() {} }, alert: text => alerts.push(text),
    sessionStorage: { getItem: () => stored, removeItem: () => { stored = null; } },
    GymAuth: { savedUser: () => ({ kakaoId: '111' }), ensure: async () => ({ kakaoId: '111' }) },
  };
  sandbox.window = sandbox;
  sandbox.pullWorkoutsFromAdminServer = async () => { pulls++; return true; };
  vm.createContext(sandbox); vm.runInContext(source, sandbox);
  const context = { state, defaultRest: () => 90, insert: (list, ex) => list.push(ex), save: () => saves++, update() {} };
  return { pending, state, sandbox, alerts, run: () => sandbox.consumeCommunityImport(context), get saved() { return saves; }, get stored() { return stored; }, get pulls() { return pulls; } };
}

test('imports selected day after server pull, preserves rest and resets completion without replacing records', async () => {
  const fixture = setup();
  fixture.state.workouts['2026-09-10'] = [{ name: '사이클', sets: [] }];
  await fixture.run();
  assert.equal(fixture.pulls, 1); assert.equal(fixture.saved, 1);
  assert.equal(fixture.state.workouts['2026-09-09'][0].name, '이전 운동');
  const day = fixture.state.workouts['2026-09-10']; assert.equal(day.length, 2);
  assert.equal(day[1].restSeconds, 135); assert.equal(day[1].sets[0].weight, 42.5);
  assert.equal(day[1].sets[0].setNumber, 1); assert.equal(day[1].sets[0].type, 'warmup');
  assert.equal(day[1].sets[0].targetReps, 10); assert.equal(day[1].sets[0].completed, false);
  assert.equal(fixture.state.currentDate, '2026-09-10'); assert.equal(fixture.stored, null);
  assert.equal(fixture.pending.exercises[0].sets[0].completed, true);
});
test('same-name workout is skipped and existing rest is not overwritten', async () => {
  const fixture = setup();
  fixture.state.workouts['2026-09-10'] = [{ name: '벤치프레스', restSeconds: 90 }];
  await fixture.run();
  assert.equal(fixture.state.workouts['2026-09-10'].length, 1);
  assert.equal(fixture.state.workouts['2026-09-10'][0].restSeconds, 90);
});
test('wrong account, expired request and impossible calendar date do not import', async () => {
  for (const override of [{ accountId: '222' }, { createdAt: Date.now() - 3600000 }, { date: '2026-02-31' }]) {
    const fixture = setup(override); await fixture.run(); assert.equal(fixture.saved, 0); assert.equal(fixture.pulls, 0); assert.equal(fixture.stored, null);
  }
});
test('failed sync preserves the pending request and does not overwrite local records', async () => {
  const fixture = setup(); fixture.sandbox.pullWorkoutsFromAdminServer = async () => false;
  await fixture.run(); assert.equal(fixture.saved, 0); assert.notEqual(fixture.stored, null);
  assert.equal(Object.keys(fixture.state.workouts).length, 1);
});
