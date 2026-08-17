/**
 * FitTracker Pro - Firebase Configuration & Initialization
 */

const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyDemoKeyFitTrackerPro2026Storage",
  authDomain: "fittracker-pro-app.firebaseapp.com",
  projectId: "fittracker-pro-app",
  storageBucket: "fittracker-pro-app.firebasestorage.app",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:a1b2c3d4e5f6g7h8i9j0"
};

function getFirebaseConfig() {
  const saved = localStorage.getItem('fit_tracker_firebase_config_v1');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse custom firebase config:', e);
    }
  }
  return DEFAULT_FIREBASE_CONFIG;
}

function saveFirebaseConfig(configObj) {
  localStorage.setItem('fit_tracker_firebase_config_v1', JSON.stringify(configObj));
}

let isFirebaseInitialized = false;

function initFirebaseApp() {
  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK not loaded.');
    return false;
  }
  if (firebase.apps && firebase.apps.length > 0) {
    isFirebaseInitialized = true;
    return true;
  }

  try {
    const config = getFirebaseConfig();
    firebase.initializeApp(config);
    
    // Enable Firestore offline persistence
    firebase.firestore().enablePersistence({ synchronizeTabs: true }).catch((err) => {
      if (err.code === 'failed-precondition') {
        console.warn('Firestore persistence failed: Multiple tabs open');
      } else if (err.code === 'unimplemented') {
        console.warn('Firestore persistence unsupported by browser');
      }
    });

    isFirebaseInitialized = true;
    console.log('Firebase App initialized successfully.');
    return true;
  } catch (err) {
    console.error('Firebase initialization error:', err);
    return false;
  }
}
