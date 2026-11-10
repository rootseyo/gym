// Existing FitTracker v1 codec, shared by the app and Ouwan.
const ROUTINE_CODE_PREFIX = 'FITROUTINE_v1_';
const WEEKLY_CODE_PREFIX = 'FITWEEK_v1_';
const SECRET_XOR_KEY = 'FIT_TRACKER_KEY_2026';
const ROUTINE_SHARE_BASE_URL = 'https://gym.brightnetworks.kr/';

/**
 * Encrypt JSON payload into a sleek String token using XOR + Base64
 */
function encodeRoutineString(jsonString) {
  try {
    const utf8Bytes = new TextEncoder().encode(jsonString);
    const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);

    const xorBytes = new Uint8Array(utf8Bytes.length);
    for (let i = 0; i < utf8Bytes.length; i++) {
      xorBytes[i] = utf8Bytes[i] ^ keyBytes[i % keyBytes.length];
    }

    let binary = '';
    for (let i = 0; i < xorBytes.length; i++) {
      binary += String.fromCharCode(xorBytes[i]);
    }
    return ROUTINE_CODE_PREFIX + btoa(binary);
  } catch (e) {
    return ROUTINE_CODE_PREFIX + btoa(unescape(encodeURIComponent(jsonString)));
  }
}

/**
 * Decrypt String token (or raw JSON fallback) back into original JSON string
 */
function decodeRoutineString(codeStr) {
  let cleaned = codeStr.trim();
  if (cleaned.startsWith(ROUTINE_CODE_PREFIX)) {
    const raw = cleaned.substring(ROUTINE_CODE_PREFIX.length);
    try {
      const binary = atob(raw);
      const xorBytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) {
        xorBytes[i] = binary.charCodeAt(i);
      }
      const keyBytes = new TextEncoder().encode(SECRET_XOR_KEY);
      const utf8Bytes = new Uint8Array(xorBytes.length);
      for (let i = 0; i < xorBytes.length; i++) {
        utf8Bytes[i] = xorBytes[i] ^ keyBytes[i % keyBytes.length];
      }
      return new TextDecoder().decode(utf8Bytes);
    } catch (e) {
      try {
        return decodeURIComponent(escape(atob(raw)));
      } catch (err) {
        return raw;
      }
    }
  }
  return cleaned; // Raw JSON fallback for legacy codes
}

function extractRoutineCode(value) {
  let cleaned = String(value || '').trim();
  if (!cleaned) return '';

  const fencedJson = cleaned.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/i);
  if (fencedJson) {
    cleaned = fencedJson[1].trim();
  }

  try {
    const url = new URL(cleaned);
    return url.searchParams.get('code') || cleaned;
  } catch (e) {
    return cleaned;
  }
}

function generateRoutineShareUrl(codeStr) {
  if (!codeStr) return '';

  const url = new URL(ROUTINE_SHARE_BASE_URL);
  url.searchParams.set('code', codeStr);
  return url.toString();
}


function generateExerciseRoutineCode(exercises, defaultRest, resetCompletion = false) {
  if (!Array.isArray(exercises) || !exercises.length) return '';
  const data = exercises.map((ex, idx) => ({ idx, n: ex.name, c: ex.category || '기타', t: ex.type || 'strength',
    rst: ex.restSeconds || defaultRest(ex.name, ex.category),
    s: ex.sets.map(set => ({ w: Number(set.weight) || 0,
      tr: resetCompletion ? (Number(set.actualReps) || 0) : (Number(set.targetReps) || 12),
      ar: resetCompletion ? (Number(set.actualReps) || 0) : (Number(set.actualReps) || Number(set.targetReps) || 12),
      tp: set.type || 'working', cmp: resetCompletion ? 0 : (set.completed ? 1 : 0) })) }));
  return encodeRoutineString(JSON.stringify({ type: 'FIT_TRACKER_ROUTINE', v: 1, data }));
}
