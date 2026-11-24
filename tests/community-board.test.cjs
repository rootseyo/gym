const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const html = fs.readFileSync(path.join(__dirname, '..', 'community.html'), 'utf8');
const js = fs.readFileSync(path.join(__dirname, '..', 'community.js'), 'utf8');
const css = fs.readFileSync(path.join(__dirname, '..', 'community.css'), 'utf8');

test('community.html removes my-workout status display and places Top 5 at the top of boardPanel', () => {
  assert.ok(!html.includes('id="todayStatus"'), 'todayStatus must be removed');
  assert.ok(!html.includes('class="sharing-bar"'), 'sharing-bar must be removed');
  assert.ok(html.includes('id="topExercisesSection"'), 'topExercisesSection must exist');
  assert.ok(html.includes('id="topExercisesList"'), 'topExercisesList must exist');
  assert.ok(html.includes('오운완 운동 TOP 5'), 'Top 5 heading must be present');

  const boardIdx = html.indexOf('id="boardPanel"');
  const top5Idx = html.indexOf('id="topExercisesSection"');
  const tabsIdx = html.indexOf('class="community-tabs"');
  const feedIdx = html.indexOf('id="feedPanel"');
  assert.ok(boardIdx < top5Idx && top5Idx < tabsIdx && tabsIdx < feedIdx,
    'topExercisesSection must be at the top of boardPanel above tabs and feedPanel');
});

test('community.js renders single-line expandable details rows and Top 5 exercises without todayStatus', () => {
  assert.ok(!js.includes("$('todayStatus')"), 'community.js must not reference todayStatus');
  assert.ok(js.includes("document.createElement('details')"), 'feed items must use native details element');
  assert.ok(js.includes('class="workout-row-summary"'), 'feed items must have single-line summary');
  assert.ok(js.includes('class="workout-row-body"'), 'feed items must have expandable body');
  assert.ok(js.includes('function computeTopExercises'), 'computeTopExercises must be defined');
  assert.ok(js.includes('function renderTopExercises'), 'renderTopExercises must be defined');
  assert.ok(js.includes('toggleAllFeedBtn'), 'expand/collapse all button must be wired');
  assert.ok(js.includes('{ capture: true }'), 'toggle listener must use capture phase');
});

test('community.css styles single-line Top 5 rows and expandable workout rows', () => {
  assert.ok(css.includes('.top-exercise-row'), 'Must style .top-exercise-row');
  assert.ok(css.includes('.workout-row-summary'), 'Must style .workout-row-summary');
  assert.ok(css.includes('details.workout-row::details-content'), 'Must style ::details-content');
  assert.ok(css.includes('flex-direction: column'), '.feed must be a single-column list');
});
