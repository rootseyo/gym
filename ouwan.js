(() => {
  const core = window.OuwanCore;
  let context, dialog, activeDate, busy = false, processing = false, samplesPromise;
  const $ = id => document.getElementById(id);
  const account = () => String(window.GymAuth?.savedUser()?.kakaoId || 'guest');
  const key = () => 'fit_tracker_ouwan_' + account();
  function stored() { try { return JSON.parse(localStorage.getItem(key()) || '{}'); } catch { return {}; } }
  function persist(data) { localStorage.setItem(key(), JSON.stringify(data)); }
  function notice(text) { if ($('ouwanMessage')) $('ouwanMessage').textContent = text; }
  const projection = date => core.projection(context.getState().workouts[date], context.defaultRest);
  async function version(date) {
    const bytes = new TextEncoder().encode(JSON.stringify(projection(date)));
    const hash = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, '0')).join('');
  }
  async function sample() {
    samplesPromise ||= fetch('nickname-samples.json').then(response => response.json()).catch(() => ['힘센 거북이', '꾸준한 다람쥐']);
    const names = await samplesPromise;
    return names[crypto.getRandomValues(new Uint32Array(1))[0] % names.length];
  }
  async function profile(date = core.today()) {
    const expected = account();
    await GymAuth.ensure();
    const result = await GymAuth.request('/community?view=status&date=' + encodeURIComponent(date));
    if (account() !== expected) throw new Error('로그인 계정이 변경되었습니다.');
    const data = stored(); data.profile = result.profile; persist(data);
    return result;
  }
  function changed() {
    if (!context) return;
    const state = context.getState(), complete = state.currentDate === core.today() && core.isComplete(state.workouts[state.currentDate]);
    $('ouwanStatus').hidden = !complete;
    const postId = stored().shared?.[state.currentDate];
    $('ouwanPostLink').hidden = !postId;
    if (postId) $('ouwanPostLink').href = 'community.html?post=' + encodeURIComponent(postId);
    if (dialog?.open && (activeDate !== state.currentDate || !core.isComplete(state.workouts[activeDate]))) {
      dialog.close(); notice('운동 구성이 바뀌어 공유를 보류했습니다.');
    }
    // Never publish an outdated queued version after an edit/undo.
    const data = stored();
    if (data.pending) {
      const valid = data.pending.filter(item => core.isComplete(state.workouts[item.date]) && item.projection === JSON.stringify(projection(item.date)));
      if (valid.length !== data.pending.length) { data.pending = valid; persist(data); }
    }
  }
  async function open(date) {
    const expected = account();
    activeDate = date;
    if (!core.isComplete(context.getState().workouts[date])) return;
    const exercises = projection(date), data = stored();
    $('ouwanSummary').textContent = `${exercises.length}종목 · 완료 ${exercises.reduce((n, ex) => n + ex.sets.length, 0)}세트`;
    $('ouwanPreview').replaceChildren();
    exercises.forEach(ex => {
      const row = document.createElement('p');
      row.textContent = `${ex.name} · 휴식 ${ex.restSeconds}초 · ` + ex.sets.map(set => `${set.weight}${ex.type === 'cardio' ? 'km/h' : 'kg'} × ${set.actualReps}${ex.type === 'cardio' ? '분' : '회'}`).join(' / ');
      $('ouwanPreview').append(row);
    });
    $('ouwanNicknameSection').hidden = Boolean(data.profile);
    if (!data.profile) $('ouwanNickname').value = await sample();
    $('ouwanAuto').checked = false; $('ouwanDialogMessage').textContent = '';
    if (navigator.onLine && window.GymAuth && !window.GymAuth.hasActiveSession()) {
      GymAuth.ensure().then(() => profile(date).then(() => { $('ouwanNicknameSection').hidden = Boolean(stored().profile); }).catch(() => {})).catch(() => {});
    }
    if (account() === expected && context.getState().currentDate === date && date === core.today() && core.isComplete(context.getState().workouts[date]) && !dialog.open) dialog.showModal();
  }
  async function completedDay(date) {
    if (!context || date !== core.today() || !core.isComplete(context.getState().workouts[date])) return;
    changed();
    const expected = account();
    let data = stored();
    if (navigator.onLine && expected !== 'guest') { try { await profile(date); data = stored(); } catch { /* Use the last explicit setting for an offline queue. */ } }
    if (account() !== expected || !core.isComplete(context.getState().workouts[date])) return;
    if (data.dismissed?.[date]) return;
    if (data.profile?.autoShareEnabled) {
      await enqueue(date, 'auto', false); return;
    }
    await open(date);
  }
  async function enqueue(date, mode, enableAutoShare) {
    const expected = account();
    if (expected === 'guest') throw new Error('카카오 로그인을 먼저 확인해 주세요.');
    const fingerprint = JSON.stringify(projection(date)), recordVersion = await version(date);
    if (account() !== expected || fingerprint !== JSON.stringify(projection(date)) || !core.isComplete(context.getState().workouts[date])) throw new Error('운동 기록이 바뀌었습니다.');
    const data = stored();
    const item = { accountId: expected, date, mode, enableAutoShare, recordVersion, projection: fingerprint,
      autoShareVersion: data.profile?.autoShareVersion, createdAt: Date.now() };
    data.pending = [...(data.pending || []).filter(entry => entry.date !== date), item].slice(-31);
    persist(data);
    if (dialog.open) dialog.close();
    notice(navigator.onLine ? '오운완을 공유하고 있어요…' : '온라인으로 돌아오면 오운완 공유를 다시 시도합니다.');
    await processPending();
  }
  async function processPending() {
    if (processing || !navigator.onLine || !context || account() === 'guest' || !(stored().pending || []).length) return;
    processing = true;
    try {
      const expected = account();
      for (const item of [...(stored().pending || [])]) {
        if (account() !== expected || item.accountId !== expected) break;
        changed();
        if (!(stored().pending || []).some(entry => entry.date === item.date)) continue;
        try {
          await window.flushGymSync();
          const state = await profile(item.date);
          if (account() !== expected) break;
          if (!state.complete || state.recordVersion !== item.recordVersion || JSON.stringify(projection(item.date)) !== item.projection) throw Object.assign(new Error('운동 기록이 바뀌어 공유를 보류했습니다.'), { status: 409 });
          if (item.mode === 'auto' && (!state.profile?.autoShareEnabled || state.profile.autoShareVersion !== item.autoShareVersion || state.post?.status === 'DELETED')) throw Object.assign(new Error('자동 공유 설정 변경 또는 게시물 삭제로 대기 공유를 취소했습니다.'), { status: 409 });
          const result = await GymAuth.request('/community', { method: 'POST', body: JSON.stringify({ action: 'publish', date: item.date,
            mode: item.mode, recordVersion: item.recordVersion, autoShareVersion: item.autoShareVersion,
            enableAutoShare: item.enableAutoShare, consentVersion: core.consentVersion }) });
          if (account() !== expected) break;
          const data = stored(); data.pending = (data.pending || []).filter(entry => entry.date !== item.date);
          data.shared = { ...(data.shared || {}), [item.date]: result.id }; persist(data);
          $('ouwanPostLink').href = 'community.html?post=' + encodeURIComponent(result.id); $('ouwanPostLink').hidden = false;
          notice('오운완을 공유했어요!');
          await profile(item.date);
        } catch (error) {
          if (account() !== expected) break;
          if ([400, 403, 404, 409].includes(error.status)) {
            const data = stored(); data.pending = (data.pending || []).filter(entry => entry.date !== item.date); persist(data);
          }
          notice(error.message + ' 완료 요약에서 다시 공유할 수 있어요.');
          if (![400, 403, 404, 409].includes(error.status)) break;
        }
      }
    } finally { processing = false; }
  }
  function init(options) {
    context = options;
    const section = document.createElement('section'); section.id = 'ouwanStatus'; section.hidden = true;
    section.innerHTML = '<div><strong>오늘 운동 완료! 🎉</strong><p id="ouwanMessage" role="status">오늘의 노력을 오운완에 남겨보세요.</p></div><div class="ouwan-actions"><a id="ouwanPostLink" hidden>게시물 보기</a><button id="ouwanOpen" type="button">오운완 공유하기</button></div>';
    document.querySelector('.date-bar').after(section);
    dialog = document.createElement('dialog'); dialog.id = 'ouwanShareDialog';
    dialog.innerHTML = `<h2>오늘 운동 완료! 🎉</h2><p>오늘의 운동을 오운완 커뮤니티에 공유하시겠습니까?</p><strong id="ouwanSummary"></strong>
      <details><summary>공개할 운동 상세 보기</summary><div id="ouwanPreview"></div></details>
      <p class="ouwan-disclosure">닉네임, 운동 날짜, 운동 항목, 세트별 중량·횟수 또는 시간, 설정한 휴식 시간이 공개됩니다. 카카오 정보와 개인 메모는 공개되지 않습니다. 다른 회원이 복사한 운동 코드는 회수되지 않습니다.</p>
      <div id="ouwanNicknameSection"><label for="ouwanNickname">오운완에서 사용할 닉네임</label><div class="ouwan-nickname"><input id="ouwanNickname" maxlength="20"><button id="ouwanReroll" type="button">다른 닉네임</button></div></div>
      <label class="ouwan-check"><input id="ouwanAuto" type="checkbox"> 다음부터 오운완 자동 공유하기</label>
      <p id="ouwanDialogMessage" role="status"></p><div class="ouwan-actions"><button id="ouwanLater" type="button">다음에</button><button id="ouwanPublish" type="button">지금 공유하기</button></div>`;
    document.body.append(dialog);
    $('ouwanReroll').onclick = async () => { $('ouwanNickname').value = await sample(); };
    $('ouwanOpen').onclick = () => open(core.today());
    const dismiss = () => {
      const data = stored(); data.dismissed = { ...(data.dismissed || {}), [activeDate]: true }; persist(data); dialog.close();
    };
    $('ouwanLater').onclick = dismiss;
    dialog.addEventListener('cancel', event => { event.preventDefault(); dismiss(); });
    $('ouwanPublish').onclick = async () => {
      if (busy) return;
      busy = true; $('ouwanPublish').disabled = true; $('ouwanDialogMessage').textContent = '';
      try {
        let authed = Boolean(window.GymAuth?.hasActiveSession());
        if (!authed && window.GymAuth) {
          try {
            await GymAuth.ensure();
            authed = true;
          } catch {
            authed = false;
          }
        }
        if (!authed) {
          $('ouwanDialogMessage').textContent = '카카오 로그인 확인 중…';
          if (window.GymAuth?.login) {
            await window.GymAuth.login();
          } else if (window.signInWithKakao) {
            window.signInWithKakao();
            throw new Error('카카오 로그인 완료 후 지금 공유하기를 다시 눌러 주세요.');
          }
          await GymAuth.ensure();
        }
        const current = await profile(activeDate);
        if (!current.profile) {
          const nicknameVal = ($('ouwanNickname')?.value || '').trim();
          if (!nicknameVal) throw new Error('오운완에서 사용할 닉네임을 입력해 주세요.');
          const data = await GymAuth.request('/community', { method: 'POST', body: JSON.stringify({ action: 'nickname', nickname: nicknameVal }) });
          const cache = stored(); cache.profile = data.profile; persist(cache);
        }
        await enqueue(activeDate, 'manual', $('ouwanAuto').checked);
      } catch (error) {
        $('ouwanDialogMessage').textContent = error.message;
      }
      finally { busy = false; $('ouwanPublish').disabled = false; }
    };
    changed();
    if (account() !== 'guest' && navigator.onLine) profile().then(processPending).catch(() => {});
    window.addEventListener('online', processPending);
    window.addEventListener('gym-synced', () => { changed(); processPending(); });
    window.addEventListener('gym-authenticated', () => { if (account() !== 'guest') profile().then(processPending).catch(() => {}); });
    window.addEventListener('storage', event => {
      if (event.key === 'fit_tracker_community_changed') profile().then(processPending).catch(() => {});
      if (event.key === 'fit_tracker_kakao_user') { if (dialog.open) dialog.close(); changed(); }
    });
  }
  window.Ouwan = { init, changed, completedDay, processPending };
})();
