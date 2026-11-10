const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

test('Exercise rest modal HTML has updated presets and incremental add chips without virtual keyboard input', () => {
  const html = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');

  // Verify preset chips in exerciseRestPresetChips
  const expectedPresets = [
    { text: '30초', sec: '30' },
    { text: '1분', sec: '60' },
    { text: '1분 30초', sec: '90' },
    { text: '2분', sec: '120' },
    { text: '3분', sec: '180' },
    { text: '5분', sec: '300' }
  ];

  for (const preset of expectedPresets) {
    assert.ok(
      html.includes(`data-sec="${preset.sec}">${preset.text}</button>`),
      `Expected preset button for ${preset.text} (${preset.sec}s)`
    );
  }

  // Verify incremental add chips
  const expectedAddChips = ['10', '30', '60', '120'];
  for (const add of expectedAddChips) {
    assert.ok(
      html.includes(`data-add="${add}">+${add}s</button>`),
      `Expected add chip for +${add}s`
    );
  }

  // Verify input is hidden to prevent soft keyboard on mobile
  assert.ok(
    html.includes('<input type="hidden" id="exerciseRestInput"'),
    'Expected exerciseRestInput to be a hidden input preventing virtual keyboard'
  );

  // Verify display elements exist
  assert.ok(
    html.includes('id="exerciseRestDisplayFormatted"'),
    'Expected exerciseRestDisplayFormatted element'
  );
  assert.ok(
    html.includes('id="exerciseRestDisplaySeconds"'),
    'Expected exerciseRestDisplaySeconds element'
  );
});

test('app.js does not trigger virtual keyboard via input.focus() in changeExerciseRestSeconds', () => {
  const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

  const match = appJs.match(/function changeExerciseRestSeconds[\s\S]*?\n}/);
  assert.ok(match, 'changeExerciseRestSeconds function found');

  const fnBody = match[0];
  assert.ok(
    !fnBody.includes('input.focus()'),
    'changeExerciseRestSeconds must not call input.focus() to avoid soft keyboard'
  );
  assert.ok(
    !fnBody.includes('input.select()'),
    'changeExerciseRestSeconds must not call input.select() to avoid soft keyboard'
  );
});
