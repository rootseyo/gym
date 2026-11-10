(() => {
  const $ = id => document.getElementById(id), core = OuwanCore;
  let accountId, status, detail, cursor, tab = 'feed', rankPage = 0, generation = 0, bootGeneration = 0;
  let feedCache = [];
  let chartInteractionCleanup = null;

  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  function avatar(name) {
    return Object.entries({
      '거북이': '🐢', '다람쥐': '🐿️', '호랑이': '🐯', '사자': '🦁', '곰': '🐻',
      '판다': '🐼', '토끼': '🐰', '여우': '🦊', '수달': '🦦', '펭귄': '🐧', '고래': '🐳', '코끼리': '🐘'
    }).find(([animal]) => name.includes(animal))?.[1] || '💪';
  }

  const levelLabels = { BEGINNER: '🌱 헬스 초보', INTERMEDIATE: '🔥 헬스 중수', ADVANCED: '🏆 헬스 고수' };
  const levelLabel = value => levelLabels[value] || levelLabels.BEGINNER;
  const volume = value => `${Number(value || 0).toLocaleString('ko-KR', { maximumFractionDigits: 1 })} kg`;
  const levelBadge = value => `<span class="level-badge">${levelLabel(value)}</span>`;

  const heartSvgOutline = `<svg class="heart-svg" viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
  const heartSvgFilled = `<svg class="heart-svg heart-filled" viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

  function formatDateLabel(dateStr) {
    if (!dateStr || typeof dateStr !== 'string') return '';
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const m = parseInt(parts[1], 10);
      const d = parseInt(parts[2], 10);
      return `${m}/${d}`;
    }
    return dateStr.slice(-5);
  }

  function clearBoard() {
    generation++;
    detail = null;
    cursor = null;
    feedCache = [];
    if (chartInteractionCleanup) { chartInteractionCleanup(); chartInteractionCleanup = null; }
    $('feed').replaceChildren();
    $('rankingList').replaceChildren();
    $('detailExercises').replaceChildren();
    $('moreBtn').hidden = true;
    $('boardPanel').hidden = true;
    document.querySelectorAll('dialog[open]').forEach(d => d.close());
  }

  function panel(id) {
    ['loginPanel', 'profilePanel', 'boardPanel'].forEach(name => $(name).hidden = name !== id);
  }

  async function busy(button, task, target = 'message') {
    button.disabled = true;
    $(target).textContent = '';
    try {
      await task();
    } catch (error) {
      $(target).textContent = error.message || '다시 시도해 주세요.';
      if ([401, 403].includes(error.status)) { clearBoard(); await boot(); }
    } finally {
      button.disabled = false;
    }
  }

  const post = body => GymAuth.request('/community', { method: 'POST', body: JSON.stringify(body) });
  const changedSettings = () => localStorage.setItem('fit_tracker_community_changed', String(Date.now()));

  async function boot() {
    const ticket = ++bootGeneration;
    clearBoard();
    panel(null);
    const saved = GymAuth.savedUser();
    if (saved?.kakaoId) {
      $('message').textContent = (saved.nickname || '카카오 사용자') + '님의 계정으로 오운완을 연결하고 있어요…';
    } else {
      $('message').textContent = '오운완을 불러오고 있어요…';
    }
    try {
      const session = await GymAuth.ensure();
      accountId = session.kakaoId;
      const result = await GymAuth.request('/community?view=status');
      if (ticket !== bootGeneration || document.hidden) return;
      status = result;
      if (status.blocked) {
        panel('loginPanel');
        $('message').textContent = '커뮤니티 이용이 제한되어 있습니다. 내 운동 기록은 계속 사용할 수 있어요.';
        return;
      }
      if (!status.profile) {
        panel('profilePanel');
        $('nickname').value = status.suggestion || '힘센 거북이';
        $('message').textContent = '';
        return;
      }
      panel('boardPanel');
      $('myAvatar').textContent = avatar(status.profile.nickname);
      $('myNickname').textContent = status.profile.nickname;
      $('myLevel').textContent = levelLabel(status.profile.fitnessLevel);
      $('autoBadge').textContent = status.profile.autoShareEnabled ? '자동 공유 ON' : '자동 공유 OFF';
      $('autoBadge').className = 'auto-badge ' + (status.profile.autoShareEnabled ? 'on' : 'off');
      $('autoBadge').title = status.profile.autoShareEnabled ? '운동 완료 시 자동 공유됩니다' : '자동 공유가 꺼져 있습니다';

      $('todayStatus').textContent = status.post?.status === 'PUBLIC'
        ? '오늘 오운완 인증을 남겼어요!'
        : status.complete
          ? '오늘 운동 완료! 내 운동 화면에서 오운완을 공유할 수 있어요.'
          : '내 운동을 모두 완료하면 오운완을 공유할 수 있어요.';

      $('message').textContent = '';
      await loadView();

      const requested = new URL(location.href).searchParams.get('post');
      if (requested) {
        const url = new URL(location.href);
        url.searchParams.delete('post');
        history.replaceState({}, '', url);
        await openDetail(requested);
      }
    } catch (error) {
      if (ticket === bootGeneration) {
        panel('loginPanel');
        if (saved?.kakaoId) {
          $('loginBtn').textContent = (saved.nickname || '카카오 계정') + '으로 오운완 연결';
          $('message').textContent = '클라우드 동기화 계정(' + (saved.nickname || saved.kakaoId) + ')으로 오운완 연결을 확인해 주세요.';
        } else {
          $('loginBtn').textContent = '카카오 로그인 확인';
          $('message').textContent = error.message;
        }
      }
    }
  }

  async function finishLogin(token) {
    if (!token) throw new Error('앱을 업데이트한 뒤 보드 로그인을 확인해 주세요.');
    const session = await GymAuth.ensure(token);
    const saved = GymAuth.savedUser();
    const updated = {
      kakaoId: session.kakaoId,
      nickname: saved?.nickname || '카카오 사용자',
      email: saved?.email || null,
      profileImage: saved?.profileImage || null,
      accessToken: token
    };
    localStorage.setItem('fit_tracker_kakao_user', JSON.stringify(updated));
    await boot();
  }

  window.onKakaoNativeLoginSuccess = data => {
    if (typeof data === 'string') {
      try { data = JSON.parse(data); } catch (_) {}
    }
    if (data && data.kakaoId) {
      const kakaoUser = {
        kakaoId: String(data.kakaoId),
        nickname: data.nickname || '카카오 사용자',
        email: data.email || null,
        profileImage: data.profileImage || null,
        accessToken: data.accessToken || null
      };
      localStorage.setItem('fit_tracker_kakao_user', JSON.stringify(kakaoUser));
    }
    busy($('loginBtn'), () => finishLogin(data?.accessToken));
  };
  window.onKakaoNativeLoginFailure = error => {
    $('message').textContent = error || '로그인이 취소되었습니다.';
  };

  $('loginBtn').onclick = () => {
    if (window.AndroidBridge?.loginWithKakao && !window.AndroidBridge.requestGymToken) {
      $('message').textContent = '오운완을 이용하려면 Android 앱을 업데이트해 주세요.';
      return;
    }
    busy($('loginBtn'), async () => {
      try {
        if (window.GymAuth?.login) {
          await window.GymAuth.login();
        } else if (window.signInWithKakao) {
          window.signInWithKakao();
        }
        await boot();
      } catch (err) {
        $('message').textContent = err.message || '로그인이 취소되었거나 실패했습니다.';
      }
    });
  };

  $('rerollBtn').onclick = event => busy(event.currentTarget, async () => {
    $('nickname').value = (await GymAuth.request('/community?view=nickname')).nickname;
  });

  $('profileBtn').onclick = event => busy(event.currentTarget, async () => {
    await post({ action: 'nickname', nickname: $('nickname').value });
    await boot();
  });

  function likeButton(button, id, liked, count, isOwn) {
    button.innerHTML = `${liked ? heartSvgFilled : heartSvgOutline} <span class="like-count">${count}</span>`;
    button.setAttribute('aria-label', `${liked ? '좋아요 취소' : '좋아요'} ${count}개`);
    button.setAttribute('aria-pressed', String(liked));
    button.disabled = isOwn;
    if (isOwn) button.title = '내 게시물에는 좋아요를 누를 수 없어요.';
    button.onclick = () => busy(button, async () => {
      const result = await post({ action: 'like', postId: id, liked: !liked });
      likeButton(button, id, result.liked, result.likeCount, false);
      const cached = feedCache.find(c => c.id === id);
      if (cached) { cached.liked = result.liked; cached.likeCount = result.likeCount; }
      const cardBtn = document.querySelector(`.workout-card[data-post-id="${id}"] .like-button`);
      if (cardBtn && cardBtn !== button) likeButton(cardBtn, id, result.liked, result.likeCount, isOwn);
      if (detail?.id === id) { detail.liked = result.liked; detail.likeCount = result.likeCount; }
    });
  }

  async function loadView(append = false) {
    const ticket = ++generation;
    $('feedPanel').hidden = tab !== 'feed';
    $('rankingPanel').hidden = tab === 'feed';

    if (tab !== 'feed') {
      if (!append) { rankPage = 0; $('rankingList').replaceChildren(); }
      const result = await GymAuth.request('/community?view=ranking&metric=' + tab + '&period=' + $('periodSelect').value + '&page=' + (append ? rankPage + 1 : 0));
      if (ticket !== generation || document.hidden) return;
      if (append) rankPage++;
      $('rankingTitle').textContent = tab === 'days' ? '🏆 오운왕' : '❤️ 좋아요왕';
      $('rankingDescription').textContent = tab === 'days'
        ? '공개한 오운완 날짜 수로 집계해요. 하루 최대 1점, 같은 점수는 공동 순위예요.'
        : '해당 기간 오운완이 받은 좋아요 합계예요. 취소·삭제·이용 제한을 반영합니다.';
      $('myRank').textContent = result.me
        ? `내 순위 ${result.me.rank}위 · ${result.me.score}${tab === 'days' ? '일' : '개'} · 총 중량 ${volume(result.me.totalWeight)}`
        : '아직 내 순위가 없어요. 첫 오운완부터 시작해 보세요!';

      result.items.forEach(item => {
        const row = document.createElement('article');
        row.className = 'rank-row' + (item.isOwn ? ' is-me' : '');
        row.innerHTML = `
          <strong class="rank-number">${item.rank}</strong>
          <span class="rank-avatar">${avatar(item.nickname)}</span>
          <div>
            <strong>${escape(item.nickname)}${item.isOwn ? ' · 나' : ''}</strong> ${levelBadge(item.fitnessLevel)}
            <small>오운완 ${item.days}일 · 좋아요 ${item.likes}개 · <span class="volume">총 중량 ${volume(item.totalWeight)}</span></small>
          </div>
          <strong class="rank-score"><span>${item.score}</span><small>${tab === 'days' ? '일' : '개'}</small></strong>
        `;
        $('rankingList').append(row);
      });
      if (!result.items.length && !append) $('rankingList').textContent = '아직 집계된 오운완이 없어요.';
      $('rankingMore').hidden = !result.hasMore;
      return;
    }

    const params = new URLSearchParams();
    if (append && cursor) params.set('cursor', cursor);
    if (!append) { $('feed').replaceChildren(); $('emptyFeed').hidden = true; feedCache = []; }

    const result = await GymAuth.request('/community?' + params);
    if (ticket !== generation || document.hidden || $('boardPanel').hidden) return;

    result.items.forEach(item => {
      feedCache.push(item);
      const card = document.createElement('article');
      card.className = 'workout-card';
      card.dataset.postId = item.id;
      card.innerHTML = `
        <div class="card-head">
          <strong>${avatar(item.nickname)} ${escape(item.nickname)}${item.isOwn ? ' · 나' : ''} ${levelBadge(item.fitnessLevel)}</strong>
          <time>${escape(item.date)}</time>
        </div>
        <div class="tags">오운완! · ${item.categories.map(escape).join(' · ')}</div>
        ${item.hasPhoto ? `<img class="post-photo" src="${GymAuth.photoUrl(item.id, item.photoVersion)}" alt="${escape(item.nickname)}님의 운동 사진" loading="lazy">` : ''}
        <div class="card-summary">${item.exerciseCount}<small>종목</small> / ${item.setCount}<small>완료 세트</small></div>
        <strong class="volume">총 중량 ${volume(item.totalWeight)}</strong>
        <p class="exercise-names">${item.exerciseNames.map(escape).join(' · ')}</p>
        <div class="card-actions">
          <button class="like-button"></button>
          <button class="detail-button">상세보기</button>
          <button class="code-button">코드 복사</button>
          <button class="instagram-button">인스타 공유</button>
        </div>
      `;
      likeButton(card.querySelector('.like-button'), item.id, item.liked, item.likeCount, item.isOwn);
      card.querySelector('.detail-button').onclick = e => busy(e.currentTarget, () => openDetail(item.id));
      card.querySelector('.code-button').onclick = e => busy(e.currentTarget, () => copyCode(item.id));
      card.querySelector('.instagram-button').onclick = e => busy(e.currentTarget, () => shareInstagram(item));
      $('feed').append(card);
    });

    cursor = result.nextCursor;
    $('moreBtn').hidden = !cursor;
    $('emptyFeed').hidden = $('feed').childElementCount > 0;
  }

  function exerciseVolume(ex) {
    if (!ex || ex.type === 'cardio' || ex.category === '유산소' || !Array.isArray(ex.sets)) return 0;
    return Math.round(ex.sets.reduce((sum, s) => sum + (Number(s.weight) || 0) * (Number(s.actualReps) || 0), 0) * 10) / 10;
  }

  // =========================================================================
  // 날짜 기반 운동 총 볼륨 성장 그래프 엔진 (Canvas 2D, 겹침 방지 x축 날짜)
  // =========================================================================
  function collectDateVolumePoints(detailData) {
    const pointsMap = new Map();

    if (detailData.isOwn) {
      try {
        const raw = localStorage.getItem('fit_tracker_workouts_v1');
        const workouts = raw ? JSON.parse(raw) : {};
        const dates = Object.keys(workouts).filter(d => core.validDate(d) && Array.isArray(workouts[d]) && workouts[d].length > 0).sort();
        dates.forEach(d => {
          const total = core.totalVolume(workouts[d]);
          if (total > 0) {
            pointsMap.set(d, total);
          }
        });
      } catch { /* fallback */ }
    } else {
      const matched = feedCache.filter(item => (item.publicId && item.publicId === detailData.publicId) || item.nickname === detailData.nickname);
      matched.forEach(item => {
        if (!pointsMap.has(item.date) || pointsMap.get(item.date) < item.totalWeight) {
          pointsMap.set(item.date, item.totalWeight);
        }
      });
    }

    // 현재 게시물의 날짜 볼륨 보장
    if (detailData.date && Number(detailData.totalWeight) > 0) {
      pointsMap.set(detailData.date, Number(detailData.totalWeight));
    }

    let sortedDates = Array.from(pointsMap.keys()).sort();

    // 단일 날짜일 경우 성장감을 표현할 베이스 포인트 추가
    if (sortedDates.length === 1) {
      const currDate = sortedDates[0];
      const prevDate = new Date(Date.parse(currDate) - 86400000 * 3).toISOString().slice(0, 10);
      return [
        { date: prevDate, label: formatDateLabel(prevDate), total: 0 },
        { date: currDate, label: formatDateLabel(currDate), total: pointsMap.get(currDate) }
      ];
    }

    // 최대 최근 6개 날짜 포인트로 제한하여 여유로운 간격 확보
    if (sortedDates.length > 6) {
      sortedDates = sortedDates.slice(-6);
    }

    return sortedDates.map(d => ({
      date: d,
      label: formatDateLabel(d),
      total: pointsMap.get(d) || 0
    }));
  }

  function renderDetailVolumeChart(detailData) {
    const canvas = $('detailVolumeCanvas');
    if (!canvas || !detailData) return;
    const ctx = canvas.getContext('2d');

    const points = collectDateVolumePoints(detailData);
    const finalVolume = detailData.totalWeight || (points[points.length - 1]?.total ?? 0);
    $('detailChartTotal').textContent = `총 볼륨 ${volume(finalVolume)}`;

    // 반응형 DPR 스케일링
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const cssWidth = Math.max(260, Math.floor(rect.width || canvas.parentElement?.clientWidth || 320));
    const cssHeight = 125;
    canvas.width = Math.floor(cssWidth * dpr);
    canvas.height = Math.floor(cssHeight * dpr);
    ctx.resetTransform?.() || ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);

    const pad = { top: 20, right: 18, bottom: 28, left: 44 };
    const plotW = cssWidth - pad.left - pad.right;
    const plotH = cssHeight - pad.top - pad.bottom;

    const maxVal = Math.max(...points.map(p => p.total), 100) * 1.15;

    // 좌표 계산
    const coords = points.map((pt, i) => {
      const x = pad.left + (points.length === 1 ? plotW / 2 : (i / (points.length - 1)) * plotW);
      const y = pad.top + (1 - pt.total / maxVal) * plotH;
      return { x, y, pt };
    });

    let hoverIndex = -1;

    function draw() {
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      // 3단계 수평 그리드선 (kg 단위)
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
      ctx.fillStyle = '#6f839d';
      ctx.font = '10px system-ui, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      const steps = [0, 0.5, 1];
      steps.forEach(ratio => {
        const val = Math.round(maxVal * ratio);
        const y = pad.top + (1 - ratio) * plotH;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(cssWidth - pad.right, y);
        ctx.stroke();

        const labelStr = val >= 1000 ? `${(val / 1000).toFixed(1)}t` : `${val}k`;
        ctx.fillText(labelStr, pad.left - 6, y);
      });

      ctx.setLineDash([]);

      if (coords.length > 1) {
        // 배경 그라데이션
        const gradient = ctx.createLinearGradient(0, pad.top, 0, pad.top + plotH);
        gradient.addColorStop(0, 'rgba(99, 235, 206, 0.30)');
        gradient.addColorStop(1, 'rgba(99, 235, 206, 0.01)');

        ctx.beginPath();
        ctx.moveTo(coords[0].x, pad.top + plotH);
        ctx.lineTo(coords[0].x, coords[0].y);

        for (let i = 0; i < coords.length - 1; i++) {
          const p0 = coords[i];
          const p1 = coords[i + 1];
          const cpX1 = p0.x + (p1.x - p0.x) * 0.45;
          const cpY1 = p0.y;
          const cpX2 = p1.x - (p1.x - p0.x) * 0.45;
          const cpY2 = p1.y;
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1.x, p1.y);
        }

        ctx.lineTo(coords[coords.length - 1].x, pad.top + plotH);
        ctx.closePath();
        ctx.fillStyle = gradient;
        ctx.fill();

        // 메인 곡선
        ctx.beginPath();
        ctx.moveTo(coords[0].x, coords[0].y);
        for (let i = 0; i < coords.length - 1; i++) {
          const p0 = coords[i];
          const p1 = coords[i + 1];
          const cpX1 = p0.x + (p1.x - p0.x) * 0.45;
          const cpY1 = p0.y;
          const cpX2 = p1.x - (p1.x - p0.x) * 0.45;
          const cpY2 = p1.y;
          ctx.bezierCurveTo(cpX1, cpY1, cpX2, cpY2, p1.x, p1.y);
        }
        ctx.strokeStyle = '#63ebce';
        ctx.lineWidth = 2.4;
        ctx.stroke();
      }

      // x축 날짜 라벨 렌더링 (겹침 방지 알고리즘 적용)
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';

      let lastRenderedX = -999;
      const minLabelSpacing = 36; // 최소 간격 (픽셀)

      coords.forEach((coord, i) => {
        const isHover = (i === hoverIndex);
        const isLast = (i === coords.length - 1);
        const isFirst = (i === 0);

        // x축 날짜 라벨 표시 여부 결정 (첫/마지막은 반드시 표시, 중간은 겹치지 않을 때만)
        const canShowLabel = isFirst || isLast || isHover || (coord.x - lastRenderedX >= minLabelSpacing && (coords[coords.length - 1].x - coord.x >= minLabelSpacing));

        if (canShowLabel) {
          ctx.fillStyle = isHover ? '#63ebce' : (isLast ? '#eef4ff' : '#889cb8');
          ctx.font = isHover ? 'bold 10.5px system-ui' : (isLast ? '600 10px system-ui' : '9.5px system-ui');
          ctx.fillText(coord.pt.label, coord.x, cssHeight - pad.bottom + 6);
          lastRenderedX = coord.x;
        }

        // 호버 수직 가이드라인
        if (isHover) {
          ctx.save();
          ctx.strokeStyle = 'rgba(99, 235, 206, 0.45)';
          ctx.lineWidth = 1.2;
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(coord.x, pad.top);
          ctx.lineTo(coord.x, pad.top + plotH);
          ctx.stroke();
          ctx.restore();
        }

        // 포인트 원
        ctx.beginPath();
        const r = isHover ? 6.5 : (isLast ? 5 : 3.5);
        ctx.arc(coord.x, coord.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isHover ? '#63ebce' : (isLast ? '#63ebce' : '#0c1421');
        ctx.fill();
        ctx.lineWidth = isHover ? 2.5 : 1.8;
        ctx.strokeStyle = isHover ? '#ffffff' : '#63ebce';
        ctx.stroke();
      });
    }

    draw();

    // 인터랙션 핸들러
    if (chartInteractionCleanup) chartInteractionCleanup();

    function handlePointer(clientX) {
      const rectNow = canvas.getBoundingClientRect();
      const x = clientX - rectNow.left;
      let closestIdx = 0;
      let minDist = Infinity;
      coords.forEach((c, i) => {
        const d = Math.abs(c.x - x);
        if (d < minDist) { minDist = d; closestIdx = i; }
      });
      if (closestIdx !== hoverIndex) {
        hoverIndex = closestIdx;
        draw();
        const pt = coords[closestIdx].pt;
        const hint = $('detailChartHint');
        hint.classList.add('highlighted');
        hint.textContent = `${pt.date || pt.label}: 총 볼륨 ${volume(pt.total)}`;
      }
    }

    function resetPointer() {
      if (hoverIndex !== -1) {
        hoverIndex = -1;
        draw();
        const hint = $('detailChartHint');
        hint.classList.remove('highlighted');
        hint.textContent = '날짜 포인트를 터치하면 볼륨을 확인할 수 있어요';
      }
    }

    const onMouseMove = e => handlePointer(e.clientX);
    const onMouseLeave = () => resetPointer();
    const onTouchMove = e => {
      if (e.touches.length) handlePointer(e.touches[0].clientX);
    };
    const onTouchEnd = () => setTimeout(resetPointer, 2000);

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('touchmove', onTouchMove, { passive: true });
    canvas.addEventListener('touchstart', onTouchMove, { passive: true });
    canvas.addEventListener('touchend', onTouchEnd, { passive: true });

    chartInteractionCleanup = () => {
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('mouseleave', onMouseLeave);
      canvas.removeEventListener('touchmove', onTouchMove);
      canvas.removeEventListener('touchstart', onTouchMove);
      canvas.removeEventListener('touchend', onTouchEnd);
    };
  }

  async function openDetail(id) {
    const ticket = generation;
    const result = await GymAuth.request('/community?id=' + encodeURIComponent(id));
    if (ticket !== generation || document.hidden) return;
    detail = result;

    $('detailTitle').textContent = avatar(detail.nickname) + ' ' + detail.nickname + '님의 오운완';
    $('detailMeta').textContent = detail.date + ' · ' + levelLabel(detail.fitnessLevel) + ' · ' + detail.exercises.length + '종목 · 총 중량 ' + volume(detail.totalWeight);

    $('detailPhoto').hidden = !detail.hasPhoto;
    if (detail.hasPhoto) $('detailPhoto').src = GymAuth.photoUrl(detail.id, detail.photoVersion);
    else $('detailPhoto').removeAttribute('src');

    // 운동 종목 요약 리스트
    $('detailExerciseCount').textContent = String(detail.exercises.length);
    $('detailExercises').innerHTML = detail.exercises.map((ex, index) => {
      const vol = exerciseVolume(ex);
      const volText = vol > 0 ? volume(vol) : (ex.type === 'cardio' ? '유산소' : '맨몸/스트레칭');
      return `
        <article class="exercise-row-card">
          <label class="exercise-check-label">
            <input type="checkbox" data-select="${index}" checked>
            <span class="exercise-name-text">${escape(ex.name)}</span>
          </label>
          <div class="exercise-info-badges">
            <span class="category-pill">${escape(ex.category)}</span>
            <span class="sets-pill">${ex.sets.length}세트</span>
            <strong class="volume-pill">${volText}</strong>
          </div>
        </article>
      `;
    }).join('');

    likeButton($('detailLike'), detail.id, detail.liked, detail.likeCount, detail.isOwn);
    $('reportBtn').hidden = detail.isOwn;
    $('deletePostBtn').hidden = !detail.isOwn;
    $('photoActions').hidden = !detail.isOwn;
    $('photoHelp').hidden = !detail.isOwn;
    $('removePhotoBtn').hidden = !detail.hasPhoto;
    $('importDate').value = core.today();
    $('detailMessage').textContent = '';

    if (!$('detailDialog').open) $('detailDialog').showModal();

    requestAnimationFrame(() => renderDetailVolumeChart(detail));
  }

  async function copyCode(id) {
    const result = await GymAuth.request('/community?id=' + encodeURIComponent(id));
    const code = generateExerciseRoutineCode(result.exercises, () => 90, true);
    try {
      await navigator.clipboard.writeText(code);
      $('message').textContent = '운동 코드를 복사했어요. 내 운동의 코드 불러오기에 붙여넣어 보세요.';
      $('detailMessage').textContent = '운동 코드를 복사했어요.';
    } catch {
      $('copyCodeText').value = code;
      $('codeDialog').showModal();
      $('copyCodeText').focus();
      $('copyCodeText').select();
    }
  }

  const blobToDataUrl = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('사진을 읽지 못했습니다.'));
    reader.readAsDataURL(blob);
  });

  async function shareCard(item) {
    if (item.hasPhoto) {
      const response = await fetch(GymAuth.photoUrl(item.id, item.photoVersion), { credentials: 'include', cache: 'no-store' });
      if (response.ok) return response.blob();
    }
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1350;
    const ctx = canvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 1080, 1350);
    gradient.addColorStop(0, '#07131d');
    gradient.addColorStop(1, '#123c35');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1350);

    ctx.fillStyle = '#63ebce';
    ctx.font = '700 42px system-ui';
    ctx.fillText('FITTRACKER · 오늘도 오운완!', 72, 115);

    ctx.fillStyle = '#eef4ff';
    ctx.font = '800 76px system-ui';
    ctx.fillText(`${avatar(item.nickname)} ${item.nickname}`, 72, 270);

    ctx.fillStyle = '#b8c5d8';
    ctx.font = '500 42px system-ui';
    ctx.fillText(`${item.date} · ${levelLabel(item.fitnessLevel)}`, 72, 350);

    ctx.fillStyle = '#63ebce';
    ctx.font = '800 96px system-ui';
    ctx.fillText(volume(item.totalWeight), 72, 555);

    ctx.fillStyle = '#eef4ff';
    ctx.font = '700 44px system-ui';
    ctx.fillText(`총 중량 · ${item.exerciseCount || item.exercises?.length || 0}종목`, 72, 625);

    const names = item.exerciseNames || item.exercises?.map(ex => ex.name) || [];
    ctx.fillStyle = '#b8c5d8';
    ctx.font = '500 38px system-ui';
    names.slice(0, 6).forEach((name, index) => ctx.fillText(`• ${name.slice(0, 22)}`, 84, 750 + index * 72));

    ctx.fillStyle = '#63ebce';
    ctx.font = '650 34px system-ui';
    ctx.fillText('gym.brightnetworks.kr', 72, 1260);
    return new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.9));
  }

  async function shareInstagram(item) {
    const blob = await shareCard(item);
    if (!blob) throw new Error('공유 이미지를 만들지 못했습니다.');
    const caption = `${item.nickname}님의 오운완 · ${item.date} · 총 중량 ${volume(item.totalWeight)} #오운완 #FitTracker`;
    if (window.AndroidBridge?.shareToInstagram) {
      window.AndroidBridge.shareToInstagram(await blobToDataUrl(blob), caption);
      return;
    }
    const file = new File([blob], `fittracker-${item.date}.jpg`, { type: 'image/jpeg' });
    if (navigator.canShare?.({ files: [file] }) && navigator.share) {
      await navigator.share({ title: '오늘도 오운완!', text: caption, files: [file] });
      return;
    }
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = file.name;
    link.click();
    setTimeout(() => URL.revokeObjectURL(link.href), 1000);
    throw new Error('공유 이미지를 저장했어요. Instagram에서 사진을 선택해 공유해 주세요.');
  }

  async function resizedPhoto(file) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 12 * 1024 * 1024) {
      throw new Error('JPG, PNG, WebP 사진을 12MB 이하로 선택해 주세요.');
    }
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close?.();
    const dataUrl = canvas.toDataURL('image/jpeg', 0.82);
    if (dataUrl.length > 2400000) throw new Error('사진 용량이 너무 큽니다. 다른 사진을 선택해 주세요.');
    return dataUrl;
  }

  $('detailCode').onclick = e => busy(e.currentTarget, () => copyCode(detail.id), 'detailMessage');
  $('detailInstagram').onclick = e => busy(e.currentTarget, () => shareInstagram({
    ...detail,
    exerciseCount: detail.exercises.length,
    exerciseNames: detail.exercises.map(ex => ex.name)
  }), 'detailMessage');

  $('photoInput').onchange = async event => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file || !detail) return;
    const label = event.target.closest('label');
    label.classList.add('disabled');
    $('detailMessage').textContent = '사진을 준비하고 있어요…';
    try {
      await post({ action: 'photo', postId: detail.id, dataUrl: await resizedPhoto(file) });
      await openDetail(detail.id);
      $('detailMessage').textContent = '사진을 첨부했어요.';
    } catch (error) {
      $('detailMessage').textContent = error.message || '사진을 첨부하지 못했습니다.';
    } finally {
      label.classList.remove('disabled');
    }
  };

  $('removePhotoBtn').onclick = e => busy(e.currentTarget, async () => {
    if (!detail || !confirm('첨부한 사진을 삭제할까요?')) return;
    await post({ action: 'photo', postId: detail.id, dataUrl: null });
    await openDetail(detail.id);
    $('detailMessage').textContent = '사진을 삭제했어요.';
  }, 'detailMessage');

  document.querySelectorAll('[data-tab]').forEach(button => button.onclick = () => {
    tab = button.dataset.tab;
    document.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-pressed', String(b === button)));
    busy(button, () => loadView());
  });

  $('periodSelect').onchange = () => busy($('periodSelect'), () => loadView());
  $('rankingMore').onclick = e => busy(e.currentTarget, () => loadView(true));
  $('moreBtn').onclick = e => busy(e.currentTarget, () => loadView(true));
  $('refreshBtn').onclick = e => busy(e.currentTarget, boot);

  $('settingsBtn').onclick = () => {
    $('settingsNickname').value = status.profile.nickname;
    $('fitnessLevel').value = status.profile.fitnessLevel || 'BEGINNER';
    $('autoShareSetting').checked = status.profile.autoShareEnabled;
    $('settingsMessage').textContent = '';
    $('settingsDialog').showModal();
  };

  $('saveNicknameBtn').onclick = e => busy(e.currentTarget, async () => {
    await post({ action: 'nickname', nickname: $('settingsNickname').value });
    changedSettings();
    await boot();
  }, 'settingsMessage');

  $('saveSettingsBtn').onclick = e => busy(e.currentTarget, async () => {
    await post({
      action: 'settings',
      fitnessLevel: $('fitnessLevel').value,
      autoShareEnabled: $('autoShareSetting').checked,
      consentVersion: core.consentVersion
    });
    changedSettings();
    await boot();
  }, 'settingsMessage');

  $('deletePostBtn').onclick = e => busy(e.currentTarget, async () => {
    if (!detail || !confirm('이 오운완 공유를 삭제할까요? 개인 운동 기록은 유지되며, 이 날짜는 자동으로 다시 공유하지 않습니다.')) return;
    await post({ action: 'delete', postId: detail.id });
    changedSettings();
    await boot();
    $('message').textContent = '오운완 공유를 삭제했습니다.';
  }, 'detailMessage');

  $('reportBtn').onclick = () => {
    $('reportMessage').textContent = '';
    $('reportDialog').showModal();
  };

  $('submitReportBtn').onclick = e => busy(e.currentTarget, async () => {
    await post({ action: 'report', postId: detail.id, reason: $('reportReason').value });
    $('reportDialog').close();
    $('detailDialog').close();
    detail = null;
    await loadView();
    $('message').textContent = '신고를 접수하고 내 피드에서 숨겼습니다.';
  }, 'reportMessage');

  $('importBtn').onclick = e => busy(e.currentTarget, async () => {
    if (!detail) return;
    const selected = detail;
    await GymAuth.request('/community?id=' + encodeURIComponent(selected.id));
    if (selected !== detail) return;
    const date = $('importDate').value;
    if (!core.validDate(date)) throw new Error('가져올 날짜를 선택해 주세요.');

    const exercises = selected.exercises.flatMap((ex, index) => {
      const checkbox = $('detailExercises').querySelector(`[data-select="${index}"]`);
      if (!checkbox?.checked) return [];
      const copy = structuredClone(ex);
      copy.sets.forEach(set => {
        set.weight = Number(set.weight) || 0;
        set.actualReps = Number(set.actualReps) || 0;
      });
      return [copy];
    });

    if (!exercises.length) throw new Error('운동을 하나 이상 선택해 주세요.');
    sessionStorage.setItem('fit_tracker_community_import', JSON.stringify({ accountId, date, exercises, createdAt: Date.now() }));
    location.assign('/?communityImport=1');
  }, 'detailMessage');

  document.querySelectorAll('[data-close]').forEach(button => button.onclick = () => $(button.dataset.close).close());

  window.addEventListener('resize', () => {
    if ($('detailDialog').open && detail) {
      renderDetailVolumeChart(detail);
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      bootGeneration++;
      clearBoard();
    } else {
      boot();
    }
  });

  window.addEventListener('pagehide', () => {
    bootGeneration++;
    clearBoard();
  });
  window.addEventListener('pageshow', e => { if (e.persisted) boot(); });
  window.addEventListener('storage', e => {
    if (['fit_tracker_kakao_user', 'fit_tracker_community_changed'].includes(e.key)) boot();
  });

  boot();
})();
