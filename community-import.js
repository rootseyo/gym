// Import appends to the selected day, never replaces the user's existing workout.
window.consumeCommunityImport = async function (context) {
  const url = new URL(location.href);
  if (url.searchParams.get('communityImport') !== '1') return;
  const removeRequest = () => {
    sessionStorage.removeItem('fit_tracker_community_import');
    url.searchParams.delete('communityImport');
    history.replaceState({}, document.title, url);
  };
  try {
    const pending = JSON.parse(sessionStorage.getItem('fit_tracker_community_import') || 'null');
    if (!pending || !Number.isFinite(pending.createdAt) || Date.now() - pending.createdAt > 15 * 60000
      || pending.createdAt > Date.now() + 60000 || !Array.isArray(pending.exercises) || !pending.exercises.length
      || !/^\d{4}-\d{2}-\d{2}$/.test(pending.date) || !Number.isFinite(Date.parse(pending.date))
      || new Date(pending.date).toISOString().slice(0, 10) !== pending.date) {
      removeRequest(); throw new Error('가져오기 요청이 만료되었거나 올바르지 않습니다. 보드에서 다시 선택해 주세요.');
    }
    const user = window.GymAuth?.savedUser();
    if (!user?.kakaoId || String(user.kakaoId) !== pending.accountId) {
      removeRequest(); throw new Error('운동을 선택한 카카오 계정으로 로그인한 뒤 다시 가져와 주세요.');
    }
    await GymAuth.ensure(null, pending.accountId);
    if (!await window.pullWorkoutsFromAdminServer(user)) throw new Error('기존 기록을 동기화하지 못했습니다. 연결을 확인한 후 새로고침해 주세요.');
    const allowedCategories = ['가슴', '등', '하체', '어깨', '팔', '복근/코어', '유산소', '전신', '기타'];
    const exercises = pending.exercises.slice(0, 100).map(ex => {
      const name = String(ex.name || '').trim().slice(0, 100);
      if (!name || /[<>"'&\\]/.test(name) || !Array.isArray(ex.sets) || !ex.sets.length) throw new Error('가져올 운동 정보가 올바르지 않습니다.');
      const category = allowedCategories.includes(ex.category) ? ex.category : '기타';
      const sets = ex.sets.slice(0, 100).map((set, index) => {
        const weight = Number(set.weight), reps = Number(set.actualReps);
        if (!Number.isFinite(weight) || weight < 0 || weight > 10000 || !Number.isFinite(reps) || reps < 0 || reps > 10000) throw new Error('세트의 중량과 횟수를 확인해 주세요.');
        return { setNumber: index + 1, type: ['working', 'warmup', 'failure', 'drop'].includes(set.type) ? set.type : 'working', weight,
          targetReps: reps, actualReps: reps, completed: false };
      });
      const rest = Number(ex.restSeconds);
      return { id: 'ex_' + crypto.randomUUID(), name, category, type: ex.type === 'cardio' || category === '유산소' ? 'cardio' : 'strength',
        targetSets: sets.length, collapsed: true, restSeconds: Number.isFinite(rest) && rest > 0 && rest <= 3600 ? rest : context.defaultRest(name, category), sets };
    });
    const target = context.state.workouts[pending.date] || [];
    let added = 0;
    exercises.forEach(ex => {
      if (target.some(existing => existing.name.trim().toLocaleLowerCase() === ex.name.toLocaleLowerCase())) return;
      context.insert(target, ex); added++;
      if (!context.state.selectedExercisesForGraph.includes(ex.name)) context.state.selectedExercisesForGraph.push(ex.name);
    });
    context.state.workouts[pending.date] = target;
    context.state.currentDate = pending.date;
    context.save(); context.update();
    removeRequest();
    alert(`${pending.date}에 ${added}종목을 추가했습니다.${exercises.length > added ? ` 같은 이름의 ${exercises.length - added}종목은 건너뛰었습니다.` : ''} 휴식 시간은 유지하고 완료 상태는 초기화했습니다.`);
  } catch (error) { alert(error.message || '운동을 가져오지 못했습니다.'); }
};
