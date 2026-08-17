/**
 * FitTracker Pro - Authentication & Cloud Sync Engine
 */

let currentUser = null;
let currentKakaoUser = null;
let cloudSyncTimeout = null;
let lastSyncTimestamp = null;

// Initialize Kakao SDK immediately
window.initKakaoSDK = function() {
  if (typeof Kakao === 'undefined') return false;
  if (!Kakao.isInitialized()) {
    try {
      Kakao.init('1a7625bf7e201a6f71ed9bef3d036b77');
    } catch (e) {
      console.warn('Kakao SDK init warning:', e);
    }
  }
  return Kakao.isInitialized();
};

// Native Android Kakao Login Callbacks
window.onKakaoNativeLoginSuccess = function(userData) {
  if (!userData) return;
  if (typeof userData === 'string') {
    try {
      userData = JSON.parse(userData);
    } catch (e) {
      console.warn('Failed to parse userData:', e);
    }
  }

  const nickname = userData.nickname || '카카오 사용자';
  const kakaoId = String(userData.kakaoId || '');

  currentKakaoUser = {
    kakaoId: kakaoId,
    nickname: nickname,
    email: userData.email || null,
    profileImage: userData.profileImage || null
  };
  localStorage.setItem('fit_tracker_kakao_user', JSON.stringify(currentKakaoUser));

  updateAuthUIState(currentKakaoUser);
  syncWorkoutsToAdminServer(currentKakaoUser);

  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth()) {
    firebase.auth().signInAnonymously().catch(() => {});
  }

  const authModal = document.getElementById('authModal');
  if (authModal) authModal.classList.add('hidden');

  alert(`${nickname}님, 클라우드 동기화 완료!`);
};

window.onKakaoNativeLoginFailure = function(errorMsg) {
  if (errorMsg && (errorMsg.includes('취소') || errorMsg.includes('Cancelled'))) {
    return;
  }
  alert(errorMsg || '카카오 로그인에 실패했습니다. 다시 시도해 주세요.');
};

// Global Kakao Sign-In Handler
window.signInWithKakao = function signInWithKakao() {
  // 1. Android Native App Bridge (Opens KakaoTalk app directly)
  if (window.AndroidBridge && typeof window.AndroidBridge.loginWithKakao === 'function') {
    window.AndroidBridge.loginWithKakao();
    return;
  }

  // 2. Standard Web Browser (Kakao JS SDK)
  function proceedLogin() {
    window.initKakaoSDK();
    if (typeof Kakao === 'undefined' || !Kakao.Auth) {
      alert('카카오 SDK 스크립트를 불러오지 못했습니다. 광고 차단 플러그인(uBlock/Brave 등)이나 네트워크 환경을 확인해 주세요.');
      return;
    }

    Kakao.Auth.login({
      throughTalk: true,
      success: function(authObj) {
        Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            const kakaoAccount = res.kakao_account || {};
            const profile = kakaoAccount.profile || {};
            const nickname = profile.nickname || '카카오 사용자';
            const kakaoId = String(res.id);

            currentKakaoUser = {
              kakaoId: kakaoId,
              nickname: nickname,
              email: kakaoAccount.email || null,
              profileImage: profile.profile_image_url || null
            };
            localStorage.setItem('fit_tracker_kakao_user', JSON.stringify(currentKakaoUser));

            updateAuthUIState(currentKakaoUser);
            syncWorkoutsToAdminServer(currentKakaoUser);

            if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth()) {
              firebase.auth().signInAnonymously().catch(() => {});
            }

            const authModal = document.getElementById('authModal');
            if (authModal) authModal.classList.add('hidden');

            alert(`${nickname}님, 클라우드 동기화 완료!`);
          },
          fail: function(err) {
            console.error('Kakao API error:', err);
            alert('카카오 프로필 정보를 가져오지 못했습니다. Kakao Developers 콘솔의 웹 사이트 도메인(https://gym.brightnetworks.kr) 등록을 확인해 주세요.');
          }
        });
      },
      fail: function(err) {
        console.error('Kakao login fail:', err);
        alert('카카오 로그인 실패: Kakao Developers 콘솔에 https://gym.brightnetworks.kr 도메인 등록을 확인해 주세요.');
      }
    });
  }

  if (typeof Kakao === 'undefined') {
    const existing = document.querySelector('script[src*="kakao.min.js"]');
    if (existing) {
      existing.onload = proceedLogin;
      // If script is already in DOM, trigger load check
      setTimeout(proceedLogin, 500);
    } else {
      const script = document.createElement('script');
      script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/1.43.0/kakao.min.js';
      script.onload = proceedLogin;
      script.onerror = function() {
        alert('카카오 SDK 로드 실패: 광고 차단 확장 프로그램이나 네트워크 연결을 확인해 주세요.');
      };
      document.head.appendChild(script);
    }
  } else {
    proceedLogin();
  }
};

// Global Sign-Out Handler
window.signOutUser = function signOutUser() {
  if (window.AndroidBridge && typeof window.AndroidBridge.logoutKakao === 'function') {
    try { window.AndroidBridge.logoutKakao(); } catch(e) {}
  }
  if (typeof Kakao !== 'undefined' && Kakao.Auth && Kakao.Auth.getAccessToken()) {
    try { Kakao.Auth.logout(); } catch(e) {}
  }
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth()) {
    firebase.auth().signOut().catch(() => {});
  }
  localStorage.removeItem('fit_tracker_kakao_user');
  currentKakaoUser = null;
  currentUser = null;
  updateAuthUIState(null);
  const authModal = document.getElementById('authModal');
  if (authModal) authModal.classList.add('hidden');
  alert('로그아웃되었습니다.');
};

// Global Account Deletion Handler
window.deleteAccountAndData = function deleteAccountAndData() {
  const confirmed = confirm('정말로 계정을 탈퇴하고 저장된 모든 운동 기록 및 클라우드 데이터를 삭제하시겠습니까?\n이 작업은 취소할 수 없으며 모든 데이터가 즉시 영구 삭제됩니다.');
  if (!confirmed) return;

  // 1. Delete data on Admin Server DB
  const adminEndpoint = 'https://admin.brightnetworks.kr/api/gym/sync';
  fetch(adminEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ delete: true, ...(currentKakaoUser || {}) }),
    credentials: 'include'
  }).catch(e => console.warn('Admin delete sync error:', e));

  // 2. Delete Cloud Firestore User Data & Firebase Auth
  if (typeof firebase !== 'undefined' && firebase.auth && firebase.auth()) {
    const user = firebase.auth().currentUser;
    if (user) {
      try {
        const db = firebase.firestore();
        db.collection('users').doc(user.uid).delete().catch(() => {});
      } catch (e) {}
      user.delete().catch(() => {}).finally(() => {
        firebase.auth().signOut().catch(() => {});
      });
    }
  }

  // 3. Unlink / Logout Kakao
  if (window.AndroidBridge && typeof window.AndroidBridge.logoutKakao === 'function') {
    try { window.AndroidBridge.logoutKakao(); } catch (e) {}
  }
  if (typeof Kakao !== 'undefined' && Kakao.Auth && Kakao.Auth.getAccessToken()) {
    try {
      Kakao.API.request({
        url: '/v1/user/unlink',
        success: function() { console.log('Kakao unlinked successfully'); },
        fail: function() { Kakao.Auth.logout(); }
      });
    } catch (e) {}
  }

  // 4. Clear Local Memory & LocalStorage
  if (typeof state !== 'undefined') {
    state.workouts = {};
    state.customPresets = [];
  }
  localStorage.removeItem('fit_tracker_workouts_v1');
  localStorage.removeItem('fit_tracker_custom_presets_v1');
  localStorage.removeItem('fit_tracker_kakao_user');

  currentKakaoUser = null;
  currentUser = null;
  lastSyncTimestamp = null;

  if (typeof saveState === 'function') saveState();
  if (typeof updateUI === 'function') updateUI();

  updateAuthUIState(null);

  alert('계정 탈퇴 및 운동 데이터 삭제가 성공적으로 완료되었습니다.');

  const authModal = document.getElementById('authModal');
  if (authModal) authModal.classList.add('hidden');
};

// Global Admin Sync Helper
window.syncWorkoutsToAdminServer = function syncWorkoutsToAdminServer(extraData = {}) {
  const adminEndpoint = 'https://admin.brightnetworks.kr/api/gym/sync';
  const payload = {
    workouts: (typeof state !== 'undefined' && state.workouts) || {},
    customPresets: (typeof state !== 'undefined' && state.customPresets) || [],
    ...(currentKakaoUser || {}),
    ...extraData
  };

  fetch(adminEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    credentials: 'include'
  }).then(res => res.json()).then(data => {
    if (data.success && data.workouts && typeof state !== 'undefined') {
      let hasNew = false;
      Object.keys(data.workouts).forEach(dateStr => {
        if (!state.workouts[dateStr]) {
          state.workouts[dateStr] = data.workouts[dateStr];
          hasNew = true;
        }
      });
      if (hasNew && typeof saveState === 'function') {
        saveState();
        if (typeof updateUI === 'function') updateUI();
      }
      lastSyncTimestamp = Date.now();
      updateSyncTimestampDisplay();
      console.log('Synced with Admin Server DB successfully.');
    }
  }).catch(err => {
    console.warn('Admin server sync error:', err);
  });
};

// Initialize Firebase & Kakao Sync Engine (Safe Wrapper)
function initFirebaseSync() {
  const savedKakao = localStorage.getItem('fit_tracker_kakao_user');
  if (savedKakao) {
    try {
      currentKakaoUser = JSON.parse(savedKakao);
      updateAuthUIState(currentKakaoUser);
      syncWorkoutsToAdminServer(currentKakaoUser);
    } catch (e) {
      console.warn('Saved Kakao user parse error:', e);
    }
  }

  try {
    if (typeof initFirebaseApp === 'function' && initFirebaseApp()) {
      firebase.auth().onAuthStateChanged((user) => {
        currentUser = user;
        updateAuthUIState(user);

        if (user) {
          console.log('Firebase User Logged In:', user.uid, user.email || user.displayName || 'User');
          pullWorkoutsFromCloud();
        } else if (!currentKakaoUser) {
          updateAuthUIState(null);
        }
      });
    }
  } catch (e) {
    console.warn('Firebase init sync error:', e);
  }

  // Initialize Kakao SDK on page load
  window.initKakaoSDK();
}

// Update UI badges & status text based on auth state
function updateAuthUIState(user) {
  const authModalBtn = document.getElementById('authModalBtn');
  const authBadgeDot = document.getElementById('authBadgeDot');
  const authUserEmail = document.getElementById('authUserEmail');
  const authUserEmailRow = document.getElementById('authUserEmailRow');
  const authUserName = document.getElementById('authUserName');
  const authUserKakaoId = document.getElementById('authUserKakaoId');
  const authLoggedOutView = document.getElementById('authLoggedOutView');
  const authLoggedInView = document.getElementById('authLoggedInView');

  const activeUser = user || currentKakaoUser;

  if (activeUser) {
    if (authModalBtn) authModalBtn.classList.add('logged-in');
    if (authBadgeDot) authBadgeDot.classList.remove('hidden');
    if (authLoggedOutView) authLoggedOutView.classList.add('hidden');
    if (authLoggedInView) authLoggedInView.classList.remove('hidden');

    const name = activeUser.displayName || activeUser.nickname || (activeUser.isAnonymous ? '게스트 사용자' : '카카오 연동 사용자');
    const kakaoId = activeUser.kakaoId || activeUser.uid || '연동 완료';
    const email = activeUser.email || '';

    if (authUserName) authUserName.textContent = name;
    if (authUserKakaoId) authUserKakaoId.textContent = kakaoId;
    
    if (authUserEmail && authUserEmailRow) {
      if (email) {
        authUserEmail.textContent = email;
        authUserEmailRow.classList.remove('hidden');
      } else {
        authUserEmailRow.classList.add('hidden');
      }
    }
  } else {
    if (authModalBtn) authModalBtn.classList.remove('logged-in');
    if (authBadgeDot) authBadgeDot.classList.add('hidden');
    if (authLoggedOutView) authLoggedOutView.classList.remove('hidden');
    if (authLoggedInView) authLoggedInView.classList.add('hidden');
    if (authUserKakaoId) authUserKakaoId.textContent = '-';
  }

  updateSyncTimestampDisplay();
}

function updateSyncTimestampDisplay() {
  const syncTimeEl = document.getElementById('lastCloudSyncTime');
  if (!syncTimeEl) return;

  if (lastSyncTimestamp) {
    const timeStr = new Date(lastSyncTimestamp).toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    syncTimeEl.textContent = `마지막 동기화: ${timeStr}`;
    syncTimeEl.style.color = 'var(--accent-emerald)';
  } else if (currentUser || currentKakaoUser) {
    syncTimeEl.textContent = '동기화 상태: 연결됨';
    syncTimeEl.style.color = 'var(--accent-emerald)';
  } else {
    syncTimeEl.textContent = '동기화 상태: 미연동 (로컬 전용)';
    syncTimeEl.style.color = 'var(--text-muted)';
  }
}

// Debounced Sync to Firestore (Triggered on saveState)
function debouncedCloudSync() {
  if (!currentUser) return;
  if (cloudSyncTimeout) clearTimeout(cloudSyncTimeout);

  cloudSyncTimeout = setTimeout(() => {
    syncWorkoutsToCloud();
  }, 1500);
}

// Push local state to Cloud Firestore
function syncWorkoutsToCloud() {
  if (!currentUser || typeof state === 'undefined') return;

  try {
    const db = firebase.firestore();
    const userDocRef = db.collection('users').doc(currentUser.uid);

    const payload = {
      workouts: state.workouts || {},
      customPresets: state.customPresets || [],
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      clientTimestamp: Date.now()
    };

    userDocRef.set(payload, { merge: true })
      .then(() => {
        lastSyncTimestamp = Date.now();
        updateSyncTimestampDisplay();
        console.log('Workouts synced to Cloud Firestore successfully.');
      })
      .catch((err) => {
        console.error('Error syncing workouts to Firestore:', err);
      });
  } catch (e) {
    console.warn('Firestore sync skipped:', e);
  }
}

// Pull workouts from Cloud Firestore & Merge with local state
function pullWorkoutsFromCloud() {
  if (!currentUser || typeof state === 'undefined') return;

  try {
    const db = firebase.firestore();
    const userDocRef = db.collection('users').doc(currentUser.uid);

    userDocRef.get().then((doc) => {
      if (doc.exists) {
        const data = doc.data();
        const cloudWorkouts = data.workouts || {};
        const cloudPresets = data.customPresets || [];

        let hasChanges = false;
        Object.keys(cloudWorkouts).forEach((dateStr) => {
          if (!state.workouts[dateStr]) {
            state.workouts[dateStr] = cloudWorkouts[dateStr];
            hasChanges = true;
          } else {
            const localList = state.workouts[dateStr];
            const cloudList = cloudWorkouts[dateStr];
            cloudList.forEach((cloudEx) => {
              const exists = localList.some((localEx) => localEx.name === cloudEx.name);
              if (!exists) {
                localList.push(cloudEx);
                hasChanges = true;
              }
            });
          }
        });

        cloudPresets.forEach((preset) => {
          const exists = state.customPresets.some((p) => p.name === preset.name);
          if (!exists) {
            state.customPresets.push(preset);
            hasChanges = true;
          }
        });

        if (hasChanges && typeof saveState === 'function') {
          saveState();
          if (typeof updateUI === 'function') updateUI();
        }

        lastSyncTimestamp = Date.now();
        updateSyncTimestampDisplay();
        console.log('Workouts pulled & merged from Cloud Firestore successfully.');
      } else {
        syncWorkoutsToCloud();
      }
    }).catch((err) => {
      console.error('Error pulling workouts from Firestore:', err);
    });
  } catch (e) {
    console.warn('Firestore pull skipped:', e);
  }
}
