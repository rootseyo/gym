const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const indexHtml = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');
const styleCss = fs.readFileSync(path.join(__dirname, '..', 'style.css'), 'utf8');

test('index.html contains help emoji button next to main brand image', () => {
  assert.ok(indexHtml.includes('id="openFeedbackBtn"'), 'Must have openFeedbackBtn');
  assert.ok(indexHtml.includes('class="header-help-btn"'), 'Must have header-help-btn class');
  assert.ok(indexHtml.includes('header-brand'), 'Must be inside header-brand');
  assert.ok(indexHtml.includes('❓'), 'Must contain help emoji');
});

test('index.html contains feedback submission modal and form elements', () => {
  assert.ok(indexHtml.includes('id="feedbackModal"'), 'Must have feedbackModal');
  assert.ok(indexHtml.includes('id="feedbackForm"'), 'Must have feedbackForm');
  assert.ok(indexHtml.includes('id="feedbackTypeSelect"'), 'Must have feedbackTypeSelect');
  assert.ok(indexHtml.includes('id="feedbackMessageInput"'), 'Must have feedbackMessageInput');
  assert.ok(indexHtml.includes('id="feedbackContactInput"'), 'Must have feedbackContactInput');
  assert.ok(indexHtml.includes('id="submitFeedbackBtn"'), 'Must have submitFeedbackBtn');
});

test('style.css defines responsive styles for help button and feedback modal', () => {
  assert.ok(styleCss.includes('.header-help-btn'), 'Must style .header-help-btn');
  assert.ok(styleCss.includes('.feedback-modal-content'), 'Must style .feedback-modal-content');
  assert.ok(styleCss.includes('.feedback-textarea'), 'Must style .feedback-textarea');
});

test('app.js configures feedback submission to admin site API', () => {
  assert.ok(appJs.includes('function initFeedbackModal()'), 'Must define initFeedbackModal');
  assert.ok(appJs.includes('initFeedbackModal();'), 'Must invoke initFeedbackModal on load');
  assert.ok(appJs.includes('https://admin.brightnetworks.kr/api/feedback'), 'Must point to admin feedback endpoint');
  assert.ok(appJs.includes("app: 'FitTracker'"), 'Must set app to FitTracker');
});
