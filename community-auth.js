/* Verified gym sessions are HttpOnly cookies; Kakao tokens are never persisted here. */
(function () {
  const base = 'https://admin.brightnetworks.kr/api/gym';
  let pending = null;
  let cachedSession = null;
  let validUntil = 0;
  let nativeReply = null;
  function savedUser() {
    try { return JSON.parse(localStorage.getItem('fit_tracker_kakao_user') || 'null'); } catch { return null; }
  }
  function init() {
    if (!window.Kakao) return false;
    if (!Kakao.isInitialized()) Kakao.init('1a7625bf7e201a6f71ed9bef3d036b77');
    return true;
  }
  async function request(path, options = {}) {
    const response = await fetch(base + path, { ...options, credentials: 'include', cache: 'no-store',
      headers: { 'Content-Type': 'application/json', ...options.headers }, signal: options.signal || AbortSignal.timeout(15000) });
    const data = await response.json();
    if (!response.ok) {
      const error = new Error(data.error || '요청을 처리하지 못했습니다.');
      error.status = response.status;
      throw error;
    }
    return data;
  }
  function photoUrl(postId, version = '') {
    return `${base}/community?photo=${encodeURIComponent(postId)}${version ? `&v=${encodeURIComponent(version)}` : ''}`;
  }
  window.onGymNativeToken = function (token) { if (nativeReply) nativeReply(token); };
  function nativeToken() {
    return new Promise(resolve => {
      const timer = setTimeout(() => { nativeReply = null; resolve(null); }, 10000);
      nativeReply = token => { clearTimeout(timer); nativeReply = null; resolve(token); };
      try { window.AndroidBridge.requestGymToken(); } catch { nativeReply(null); }
    });
  }
  async function establish(token, expectedId) {
    const data = await request('/session', { method: 'POST', body: JSON.stringify({ accessToken: token }) });
    if (expectedId && data.kakaoId !== String(expectedId)) {
      await request('/session', { method: 'POST', body: JSON.stringify({ action: 'logout' }) });
      throw new Error('현재 운동 계정과 다른 카카오 계정입니다. 기존 계정으로 로그인해 주세요.');
    }
    cachedSession = data; validUntil = Date.now() + 60000;
    window.dispatchEvent(new CustomEvent('gym-authenticated', { detail: { kakaoId: data.kakaoId } }));
    return data;
  }
  async function ensure(token, expectedId = savedUser()?.kakaoId) {
    if (token) return establish(token, expectedId);
    if (cachedSession && Date.now() < validUntil && (!expectedId || cachedSession.kakaoId === String(expectedId))) return cachedSession;
    if (pending) return pending;
    pending = (async () => {
      const session = await request('/session');
      if (session.authenticated && (!expectedId || session.kakaoId === String(expectedId))) {
        cachedSession = session; validUntil = Date.now() + 60000; return session;
      }
      const tokens = [];
      const addToken = value => { if (value && !tokens.includes(value)) tokens.push(value); };
      addToken(savedUser()?.accessToken);
      if (init() && window.Kakao?.Auth) addToken(Kakao.Auth.getAccessToken());
      // The native token manager can refresh expired tokens held by the WebView.
      if (window.AndroidBridge?.requestGymToken) addToken(await nativeToken());
      if (!tokens.length) throw new Error('카카오 로그인을 확인할 수 없습니다. 운동 화면에서 카카오 로그인을 다시 해 주세요.');
      let lastError;
      for (const accessToken of tokens) {
        try { return await establish(accessToken, expectedId); }
        catch (error) { lastError = error; }
      }
      throw lastError || new Error('카카오 로그인을 확인할 수 없습니다.');
    })().finally(() => { pending = null; });
    return pending;
  }
  async function syncFetch(url, options) {
    const user = savedUser();
    if (user?.kakaoId) {
      try { await ensure(null, user.kakaoId); }
      catch (error) {
        window.dispatchEvent(new Event('gym-session-required'));
        throw error;
      }
    }
    let response = await fetch(url, options);
    if (response.status === 401 && user?.kakaoId) {
      // Recover once if the server cookie expired while this page still held a
      // cached session. Re-establishing uses the same Kakao login as workouts.
      cachedSession = null; validUntil = 0;
      try {
        await ensure(null, user.kakaoId);
        response = await fetch(url, options);
      } catch (_) {}
    }
    if (response.status === 401) { cachedSession = null; validUntil = 0; window.dispatchEvent(new Event('gym-session-required')); }
    return response;
  }
  async function logout() {
    cachedSession = null; validUntil = 0;
    return request('/session', { method: 'POST', body: JSON.stringify({ action: 'logout' }) });
  }
  window.addEventListener('storage', event => { if (event.key === 'fit_tracker_kakao_user') { cachedSession = null; validUntil = 0; } });
  window.addEventListener('gym-session-required', () => {
    if (!document.getElementById('authModalBtn') || document.getElementById('gymSessionNotice')) return;
    const notice = document.createElement('p'); notice.id = 'gymSessionNotice'; notice.setAttribute('role', 'status');
    notice.style.cssText = 'padding:12px;border:1px solid #a88b34;border-radius:10px;color:#ffe49a';
    notice.append('카카오 계정의 서버 연결을 확인하지 못했어요. 운동과 오운완은 같은 카카오 로그인으로 연결됩니다. ');
    const link = document.createElement('a'); link.href = '#'; link.textContent = '카카오 계정 연결 확인';
    link.addEventListener('click', event => {
      event.preventDefault();
      document.getElementById('authModalBtn')?.click();
    });
    notice.append(link); document.querySelector('.app-header')?.after(notice);
  });
  function hasActiveSession(expectedId = savedUser()?.kakaoId) {
    return Boolean(cachedSession && Date.now() < validUntil && (!expectedId || cachedSession.kakaoId === String(expectedId)));
  }
  function waitForKakao(timeoutMs = 3000) {
    if (init() && window.Kakao?.Auth) return Promise.resolve(true);
    return new Promise(resolve => {
      const start = Date.now();
      const interval = setInterval(() => {
        if (init() && window.Kakao?.Auth) {
          clearInterval(interval);
          resolve(true);
        } else if (Date.now() - start >= timeoutMs) {
          clearInterval(interval);
          resolve(false);
        }
      }, 100);
    });
  }
  function login(expectedId = savedUser()?.kakaoId) {
    return new Promise(async (resolve, reject) => {
      if (window.AndroidBridge && typeof window.AndroidBridge.loginWithKakao === 'function') {
        let cleanup = () => {};
        const timer = setTimeout(() => {
          cleanup();
          reject(new Error('카카오 로그인 시간이 초과되었습니다. 다시 시도해 주세요.'));
        }, 60000);

        const authHandler = () => {
          cleanup();
          resolve(cachedSession);
        };

        const sessionReqHandler = () => {
          cleanup();
          reject(new Error('서버 세션 생성에 실패했습니다. 다시 시도해 주세요.'));
        };

        const prevFailure = window.onKakaoNativeLoginFailure;
        window.onKakaoNativeLoginFailure = function (errorMsg) {
          cleanup();
          if (typeof prevFailure === 'function') {
            try { prevFailure(errorMsg); } catch (_) {}
          }
          reject(new Error(errorMsg || '카카오 로그인에 실패했습니다.'));
        };

        const focusCheck = () => {
          setTimeout(() => {
            if (!cachedSession && document.visibilityState === 'visible') {
              const u = savedUser();
              if (u?.kakaoId && (!expectedId || u.kakaoId === String(expectedId))) {
                ensure(null, expectedId).then(session => {
                  cleanup();
                  resolve(session);
                }).catch(() => {
                  cleanup();
                  reject(new Error('카카오 로그인이 취소되었습니다.'));
                });
              } else {
                cleanup();
                reject(new Error('카카오 로그인이 취소되었습니다.'));
              }
            }
          }, 1500);
        };

        cleanup = () => {
          clearTimeout(timer);
          window.removeEventListener('gym-authenticated', authHandler);
          window.removeEventListener('gym-session-required', sessionReqHandler);
          window.removeEventListener('focus', focusCheck);
          document.removeEventListener('visibilitychange', focusCheck);
          window.onKakaoNativeLoginFailure = prevFailure;
        };

        window.addEventListener('gym-authenticated', authHandler);
        window.addEventListener('gym-session-required', sessionReqHandler);
        window.addEventListener('focus', focusCheck);
        document.addEventListener('visibilitychange', focusCheck);

        try {
          window.AndroidBridge.loginWithKakao();
        } catch (e) {
          cleanup();
          reject(e);
        }
        return;
      }
      const ready = await waitForKakao(3000);
      if (!ready || typeof Kakao === 'undefined' || !Kakao.Auth) {
        reject(new Error('카카오 SDK를 불러오지 못했습니다. 네트워크나 광고 차단 설정을 확인해 주세요.'));
        return;
      }
      Kakao.Auth.login({
        throughTalk: false,
        success: function (authObj) {
          Kakao.API.request({
            url: '/v2/user/me',
            success: async function (res) {
              const kakaoAccount = res.kakao_account || {};
              const profile = kakaoAccount.profile || {};
              const nickname = profile.nickname || '카카오 사용자';
              const kakaoId = String(res.id);
              const userObj = {
                kakaoId: kakaoId,
                nickname: nickname,
                email: kakaoAccount.email || null,
                profileImage: profile.profile_image_url || null,
                accessToken: authObj.access_token || null
              };
              localStorage.setItem('fit_tracker_kakao_user', JSON.stringify(userObj));
              if (typeof currentKakaoUser !== 'undefined') currentKakaoUser = userObj;
              if (typeof window.currentKakaoUser !== 'undefined') window.currentKakaoUser = userObj;
              if (typeof window.updateAuthUIState === 'function') window.updateAuthUIState(userObj);
              try {
                const s = await establish(authObj.access_token, kakaoId);
                if (typeof window.searchAndCollectAllLocalWorkouts === 'function') window.searchAndCollectAllLocalWorkouts();
                if (typeof window.syncWorkoutsToAdminServer === 'function') window.syncWorkoutsToAdminServer(userObj, true);
                resolve(s);
              } catch (err) {
                reject(err);
              }
            },
            fail: async function () {
              try {
                const s = await establish(authObj.access_token, expectedId);
                resolve(s);
              } catch (err) {
                reject(err);
              }
            }
          });
        },
        fail: function (err) {
          const msg = (err && (err.error_description || err.error)) ? String(err.error_description || err.error) : '카카오 로그인이 취소되었거나 실패했습니다.';
          reject(new Error(msg));
        }
      });
    });
  }
  window.GymAuth = { request, ensure, establish, syncFetch, logout, savedUser, init, photoUrl, login, hasActiveSession };
})();
