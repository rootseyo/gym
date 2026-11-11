const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');

test('index.html positions encyclopediaSelectedBanner above encyclopediaGrid for direct visibility', () => {
  assert.ok(indexHtml.includes('id="encyclopediaSelectedBanner"'), 'Must have encyclopediaSelectedBanner');
  assert.ok(indexHtml.includes('id="encyclopediaGrid"'), 'Must have encyclopediaGrid');

  const bannerIndex = indexHtml.indexOf('id="encyclopediaSelectedBanner"');
  const gridIndex = indexHtml.indexOf('id="encyclopediaGrid"');
  assert.ok(bannerIndex < gridIndex, 'Selected banner must be positioned above grid so images are visible without scrolling');
});

test('style.css defines guide-badge, button styling, and elevated modal z-index', () => {
  assert.ok(styleCss.includes('#exerciseDiagramModal'), 'Must style #exerciseDiagramModal');
  assert.ok(styleCss.includes('z-index: 1200'), 'Must elevate exerciseDiagramModal z-index above standard modals');
  assert.ok(styleCss.includes('.ex-stat-badge.guide-badge'), 'Must define guide-badge styles for exercise items');
  assert.ok(styleCss.includes('.ex-equip-thumb.has-guide'), 'Must define has-guide highlight for exercise thumbnail');
});

test('app.js defines openExerciseDiagramByName and integrates guide badges in workout list and encyclopedia', () => {
  assert.ok(appJs.includes('function openExerciseDiagramByName'), 'Must define openExerciseDiagramByName helper');
  assert.ok(appJs.includes('function openExerciseDiagramModal(item = selectedEncyclopediaItem)'), 'Must accept item in openExerciseDiagramModal');
  assert.ok(appJs.includes('ex-stat-badge guide-badge'), 'renderWorkouts must include guide-badge on workout cards');
  assert.ok(appJs.includes('enc-card-guide-badge'), 'renderEquipmentEncyclopedia must include enc-card-guide-badge');
  assert.ok(appJs.includes('window.openExerciseDiagramByName = openExerciseDiagramByName'), 'Must expose function to window');
});
