const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function createBrowserEnv() {
  const store = new Map();
  const listeners = new Map();
  const elements = new Map();

  const localStorage = {
    getItem: key => store.has(key) ? store.get(key) : null,
    setItem: (key, val) => store.set(key, String(val)),
    removeItem: key => store.delete(key),
    clear: () => store.clear()
  };

  const window = {
    addEventListener: (type, fn) => {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(fn);
    },
    removeEventListener: (type, fn) => {
      const list = listeners.get(type) || [];
      listeners.set(type, list.filter(cb => cb !== fn));
    },
    dispatchEvent: event => {
      const list = listeners.get(event.type) || [];
      list.forEach(cb => cb(event));
      return true;
    },
    localStorage,
    location: { href: 'https://gym.brightnetworks.kr/', pathname: '/' }
  };

  const document = {
    visibilityState: 'visible',
    addEventListener: window.addEventListener,
    removeEventListener: window.removeEventListener,
    getElementById: id => elements.get(id) || null,
    createElement: tag => ({
      tagName: tag.toUpperCase(),
      style: {},
      classList: { add: () => {}, remove: () => {} },
      setAttribute: () => {},
      append: () => {}
    }),
    querySelector: () => null,
    body: { append: () => {} }
  };

  function CustomEvent(type, init = {}) {
    return { type, detail: init.detail };
  }
  function Event(type) {
    return { type };
  }

  const context = vm.createContext({
    window,
    document,
    localStorage,
    fetch: async () => ({ ok: true, json: async () => ({}) }),
    setTimeout,
    clearTimeout,
    setInterval,
    clearInterval,
    Date,
    Promise,
    CustomEvent,
    Event,
    AbortSignal,
    console
  });
  window.window = window;
  window.document = document;

  return { context, window, document, elements, listeners };
}

test('throughTalk is false in community-auth.js to prevent mobile popup blocking', () => {
  const code = fs.readFileSync('community-auth.js', 'utf8');
  assert.ok(code.includes('throughTalk: false'), 'community-auth.js must use throughTalk: false');
  assert.ok(!code.includes('throughTalk: true'), 'community-auth.js must not use throughTalk: true');
});

test('throughTalk is false in firebase-sync.js to prevent mobile popup blocking', () => {
  const code = fs.readFileSync('firebase-sync.js', 'utf8');
  assert.ok(code.includes('throughTalk: false'), 'firebase-sync.js must use throughTalk: false');
  assert.ok(!code.includes('throughTalk: true'), 'firebase-sync.js must not use throughTalk: true');
});

test('community-auth.js login handles AndroidBridge failure', async () => {
  const { context, window } = createBrowserEnv();
  let loginCalled = false;
  window.AndroidBridge = {
    loginWithKakao: () => { loginCalled = true; }
  };

  const authCode = fs.readFileSync('community-auth.js', 'utf8');
  vm.runInContext(authCode, context);

  const promise1 = context.window.GymAuth.login();
  assert.equal(loginCalled, true);
  assert.equal(typeof window.onKakaoNativeLoginFailure, 'function');
  window.onKakaoNativeLoginFailure('사용자가 로그인을 취소했습니다.');
  await assert.rejects(promise1, /취소|실패/);
});

test('community-auth.js login handles AndroidBridge cancellation via focus', async () => {
  const { context, window } = createBrowserEnv();
  window.AndroidBridge = {
    loginWithKakao: () => {}
  };

  const authCode = fs.readFileSync('community-auth.js', 'utf8');
  vm.runInContext(authCode, context);

  const promise = context.window.GymAuth.login();
  context.window.dispatchEvent(new context.Event('focus'));
  await assert.rejects(promise, /취소/);
});

test('community-auth.js login succeeds via gym-authenticated event on Android', async () => {
  const { context, window } = createBrowserEnv();
  window.AndroidBridge = {
    loginWithKakao: () => {}
  };

  const authCode = fs.readFileSync('community-auth.js', 'utf8');
  vm.runInContext(authCode, context);

  const loginPromise = context.window.GymAuth.login();
  context.window.dispatchEvent(new context.CustomEvent('gym-authenticated', { detail: { kakaoId: '999888' } }));
  const result = await loginPromise;
  // Resolved successfully without hanging
  assert.ok(result !== undefined);
});

test('ouwanPublish flow checks ensure() before triggering login()', async () => {
  const ouwanCode = fs.readFileSync('ouwan.js', 'utf8');
  // Verify that ouwan.js now tests ensure() before calling login()
  assert.ok(ouwanCode.includes('await GymAuth.ensure()'), 'ouwan.js must ensure session');
  assert.ok(ouwanCode.includes('let authed = Boolean(window.GymAuth?.hasActiveSession())'), 'ouwan.js must check active session or ensure');
});

test('GymAuth.ensure seamlessly connects with saved cloud sync accessToken', async () => {
  const { context, window } = createBrowserEnv();
  // Simulate existing cloud sync Kakao login in LocalStorage
  window.localStorage.setItem('fit_tracker_kakao_user', JSON.stringify({
    kakaoId: '1234567',
    nickname: '운동하는사자',
    accessToken: 'mock_kakao_access_token_123'
  }));

  let postPayload = null;
  context.fetch = async (url, options) => {
    if (url.endsWith('/session') && options?.method === 'POST') {
      postPayload = JSON.parse(options.body);
      return { ok: true, json: async () => ({ authenticated: true, kakaoId: '1234567' }) };
    }
    if (url.endsWith('/session')) {
      return { ok: true, json: async () => ({ authenticated: false, kakaoId: null }) };
    }
    return { ok: true, json: async () => ({}) };
  };

  const authCode = fs.readFileSync('community-auth.js', 'utf8');
  vm.runInContext(authCode, context);

  // ensure() should pick up stored accessToken and call establish()
  const session = await context.window.GymAuth.ensure();
  assert.equal(session.kakaoId, '1234567');
  assert.equal(postPayload?.accessToken, 'mock_kakao_access_token_123');
});
