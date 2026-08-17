/**
 * FitTracker - Recommended Routine Packs Module
 * Curated workout routine sets for Beginner, Intermediate, and Expert levels.
 */

const RECOMMENDED_ROUTINES = [
  // ==========================================
  // 🟢 1. 비기너 (Beginner)
  // ==========================================
  {
    id: 'beg-full-body',
    level: 'beginner',
    levelLabel: '비기너 (초급)',
    badgeColor: 'emerald',
    title: '초보자 필수 전신 머신 입문',
    subtitle: '부상 위험 없이 기구 사용법과 기본 근력을 다지는 전신 5종 루틴',
    estimatedMinutes: 45,
    target: '전신 근력 & 기초 체력',
    exercises: [
      { name: '체스트 프레스 머신', category: '가슴', weight: 30, reps: 12, sets: 3, restSeconds: 90 },
      { name: '렛풀다운', category: '등', weight: 35, reps: 12, sets: 3, restSeconds: 90 },
      { name: '레그프레스', category: '하체', weight: 60, reps: 12, sets: 3, restSeconds: 90 },
      { name: '숄더프레스 머신', category: '어깨', weight: 20, reps: 12, sets: 3, restSeconds: 90 },
      { name: '크런치', category: '복근/코어', weight: 0, reps: 15, sets: 3, restSeconds: 45 }
    ]
  },
  {
    id: 'beg-upper',
    level: 'beginner',
    levelLabel: '비기너 (초급)',
    badgeColor: 'emerald',
    title: '초보자 상체 볼륨 머신 루틴',
    subtitle: '가슴과 등을 안전하고 정확하게 자극하는 상체 집중 4종',
    estimatedMinutes: 40,
    target: '상체 프레임 & 굽은 등 교정',
    exercises: [
      { name: '체스트 프레스 머신', category: '가슴', weight: 30, reps: 12, sets: 3, restSeconds: 90 },
      { name: '렛풀다운', category: '등', weight: 35, reps: 12, sets: 3, restSeconds: 90 },
      { name: '펙덱 플라이', category: '가슴', weight: 25, reps: 12, sets: 3, restSeconds: 60 },
      { name: '시티드 케이블 로우', category: '등', weight: 30, reps: 12, sets: 3, restSeconds: 90 }
    ]
  },
  {
    id: 'beg-lower',
    level: 'beginner',
    levelLabel: '비기너 (초급)',
    badgeColor: 'emerald',
    title: '초보자 하체 & 힙업 머신 루틴',
    subtitle: '무릎 관절 부담 없이 탄탄한 허벅지와 엉덩이를 만드는 하체 4종',
    estimatedMinutes: 40,
    target: '하체 라인 & 힙업',
    exercises: [
      { name: '레그프레스', category: '하체', weight: 60, reps: 12, sets: 3, restSeconds: 90 },
      { name: '레그 익스텐션', category: '하체', weight: 25, reps: 15, sets: 3, restSeconds: 60 },
      { name: '레그컬', category: '하체', weight: 20, reps: 15, sets: 3, restSeconds: 60 },
      { name: '아웃싸이 (어브덕션)', category: '하체', weight: 30, reps: 15, sets: 3, restSeconds: 60 }
    ]
  },
  {
    id: 'beg-fatburn',
    level: 'beginner',
    levelLabel: '비기너 (초급)',
    badgeColor: 'emerald',
    title: '체지방 컷팅 유산소 스타터',
    subtitle: '관절에 무리 없이 칼로리를 효과적으로 연소하는 심폐 지구력 3종',
    estimatedMinutes: 35,
    target: '체지방 감량 & 심폐 강화',
    exercises: [
      { name: '런닝머신', category: '유산소', weight: 6.5, reps: 20, sets: 1, restSeconds: 30 },
      { name: '사이클', category: '유산소', weight: 12.0, reps: 15, sets: 1, restSeconds: 30 },
      { name: '플랭크', category: '복근/코어', weight: 0, reps: 45, sets: 3, restSeconds: 45 }
    ]
  },

  // ==========================================
  // 🟡 2. 인터미디엇 (Intermediate)
  // ==========================================
  {
    id: 'int-push',
    level: 'intermediate',
    levelLabel: '인터미디엇 (중급)',
    badgeColor: 'cyan',
    title: '3분할 Push Day (가슴 / 어깨 / 삼두)',
    subtitle: '프리웨이트와 머신 콤비네이션으로 상체 전면 근비대 극대화',
    estimatedMinutes: 55,
    target: '대흉근 입체감 & 어깨 볼륨',
    exercises: [
      { name: '벤치프레스', category: '가슴', weight: 60, reps: 10, sets: 4, restSeconds: 120 },
      { name: '인클라인 덤벨프레스', category: '가슴', weight: 20, reps: 12, sets: 3, restSeconds: 90 },
      { name: '딥스', category: '가슴', weight: 0, reps: 12, sets: 3, restSeconds: 90 },
      { name: '사이드 레터럴 레이즈', category: '어깨', weight: 8, reps: 15, sets: 4, restSeconds: 60 },
      { name: '트라이셉스 푸쉬다운', category: '팔', weight: 25, reps: 12, sets: 3, restSeconds: 60 }
    ]
  },
  {
    id: 'int-pull',
    level: 'intermediate',
    levelLabel: '인터미디엇 (중급)',
    badgeColor: 'cyan',
    title: '3분할 Pull Day (등 / 후면 / 이두)',
    subtitle: '넓은 프레임과 두꺼운 등, 탄탄한 팔을 완성하는 당기기 루틴',
    estimatedMinutes: 55,
    target: 'V자 광배근 & 등 두께',
    exercises: [
      { name: '풀업 (턱걸이)', category: '등', weight: 0, reps: 8, sets: 4, restSeconds: 90 },
      { name: '바벨 로우', category: '등', weight: 50, reps: 10, sets: 4, restSeconds: 120 },
      { name: '시티드 케이블 로우', category: '등', weight: 45, reps: 12, sets: 3, restSeconds: 90 },
      { name: '페이스 풀', category: '어깨', weight: 20, reps: 15, sets: 3, restSeconds: 60 },
      { name: '바벨 컬', category: '팔', weight: 25, reps: 12, sets: 3, restSeconds: 60 }
    ]
  },
  {
    id: 'int-leg',
    level: 'intermediate',
    levelLabel: '인터미디엇 (중급)',
    badgeColor: 'cyan',
    title: '3분할 Leg Day (하체 & 둔근 완벽 타겟)',
    subtitle: '스쿼트 메인과 고립 머신으로 하체 전체를 자극하는 정석 루틴',
    estimatedMinutes: 60,
    target: '대퇴사두근 & 둔근 스트렝스',
    exercises: [
      { name: '스쿼트', category: '하체', weight: 80, reps: 10, sets: 4, restSeconds: 150 },
      { name: '레그프레스', category: '하체', weight: 120, reps: 12, sets: 3, restSeconds: 120 },
      { name: '레그 익스텐션', category: '하체', weight: 35, reps: 15, sets: 3, restSeconds: 60 },
      { name: '라잉 레그컬', category: '하체', weight: 30, reps: 12, sets: 3, restSeconds: 60 },
      { name: '힙 쓰러스터', category: '하체', weight: 60, reps: 12, sets: 3, restSeconds: 90 }
    ]
  },
  {
    id: 'int-upper-lower',
    level: 'intermediate',
    levelLabel: '인터미디엇 (중급)',
    badgeColor: 'cyan',
    title: '2분할 상체 파워 & 볼륨',
    subtitle: '바쁜 직장인/학생을 위한 주 4회 2분할 상체 핵심 세션',
    estimatedMinutes: 50,
    target: '상체 전반 근비대',
    exercises: [
      { name: '인클라인 벤치프레스', category: '가슴', weight: 50, reps: 10, sets: 4, restSeconds: 120 },
      { name: '렛풀다운', category: '등', weight: 50, reps: 12, sets: 4, restSeconds: 90 },
      { name: '덤벨 숄더프레스', category: '어깨', weight: 18, reps: 12, sets: 3, restSeconds: 90 },
      { name: '원암 덤벨 로우', category: '등', weight: 22, reps: 10, sets: 3, restSeconds: 90 },
      { name: '해머 컬', category: '팔', weight: 14, reps: 12, sets: 3, restSeconds: 60 }
    ]
  },

  // ==========================================
  // 🔴 3. 익스퍼트 (Expert)
  // ==========================================
  {
    id: 'exp-powerbuilding',
    level: 'expert',
    levelLabel: '익스퍼트 (고급)',
    badgeColor: 'orange',
    title: '파워빌딩 3대 스트렝스 & 파워',
    subtitle: '점진적 과부하와 5×5 고중량 복합 다관절 파워 리프팅',
    estimatedMinutes: 70,
    target: '1RM 중량 증량 & 신경계 파워',
    exercises: [
      { name: '스쿼트', category: '하체', weight: 110, reps: 5, sets: 5, restSeconds: 180 },
      { name: '벤치프레스', category: '가슴', weight: 85, reps: 5, sets: 5, restSeconds: 180 },
      { name: '데드리프트', category: '전신', weight: 130, reps: 5, sets: 3, restSeconds: 180 },
      { name: '오버헤드 프레스 (OHP)', category: '어깨', weight: 50, reps: 6, sets: 4, restSeconds: 150 }
    ]
  },
  {
    id: 'exp-heavy-quads',
    level: 'expert',
    levelLabel: '익스퍼트 (고급)',
    badgeColor: 'orange',
    title: '명품 머신 하체 폭격 (Quad & Glute Destruction)',
    subtitle: '펜듈럼, V-스쿼트, 벨트스쿼트 등 특수 머신으로 한계 도달',
    estimatedMinutes: 65,
    target: '대퇴사두 분리도 & 둔근 볼륨',
    exercises: [
      { name: '펜듈럼 스쿼트', category: '하체', weight: 50, reps: 10, sets: 4, restSeconds: 150 },
      { name: 'V-스쿼트', category: '하체', weight: 80, reps: 12, sets: 4, restSeconds: 120 },
      { name: '핵스쿼트', category: '하체', weight: 80, reps: 10, sets: 3, restSeconds: 120 },
      { name: '루마니안 데드리프트', category: '전신', weight: 90, reps: 10, sets: 4, restSeconds: 120 },
      { name: '불가리안 스플릿 스쿼트', category: '하체', weight: 16, reps: 10, sets: 3, restSeconds: 90 },
      { name: '카프 레이즈', category: '하체', weight: 50, reps: 20, sets: 4, restSeconds: 60 }
    ]
  },
  {
    id: 'exp-massive-torso',
    level: 'expert',
    levelLabel: '익스퍼트 (고급)',
    badgeColor: 'orange',
    title: '보디빌딩 챔피언 상체 고립 (Torso Master)',
    subtitle: '가슴/등의 모든 각도와 근섬유를 극한으로 공략하는 프로페셔널 세션',
    estimatedMinutes: 65,
    target: '상체 디테일 & 극대화된 펌핑',
    exercises: [
      { name: '인클라인 벤치프레스', category: '가슴', weight: 70, reps: 8, sets: 4, restSeconds: 120 },
      { name: '와이드 체스트 프레스 머신', category: '가슴', weight: 50, reps: 10, sets: 4, restSeconds: 90 },
      { name: '티바 로우', category: '등', weight: 50, reps: 10, sets: 4, restSeconds: 120 },
      { name: '체스트 서포티드 로우', category: '등', weight: 40, reps: 12, sets: 3, restSeconds: 90 },
      { name: '사이드 레터럴 레이즈 머신', category: '어깨', weight: 25, reps: 15, sets: 4, restSeconds: 60 },
      { name: '스컬 크러셔 (라잉 익스텐션)', category: '팔', weight: 30, reps: 10, sets: 3, restSeconds: 60 }
    ]
  },
  {
    id: 'exp-cross-athlete',
    level: 'expert',
    levelLabel: '익스퍼트 (고급)',
    badgeColor: 'orange',
    title: '크로스 애슬릿 컨디셔닝 (심폐 & 파워 복합)',
    subtitle: '스트렝스와 전신 산소 탱크를 동시에 극한까지 몰아붙이는 하이브리드 루틴',
    estimatedMinutes: 50,
    target: '전신 기능성 파워 & 지옥의 심폐',
    exercises: [
      { name: '트랩바 데드리프트', category: '전신', weight: 110, reps: 8, sets: 4, restSeconds: 120 },
      { name: '랜드마인 프레스', category: '전신', weight: 25, reps: 10, sets: 3, restSeconds: 90 },
      { name: '케틀벨 스윙', category: '전신', weight: 24, reps: 20, sets: 4, restSeconds: 60 },
      { name: '천국의 계단 (스텝밀)', category: '유산소', weight: 9.0, reps: 15, sets: 1, restSeconds: 30 }
    ]
  }
];

window.RECOMMENDED_ROUTINES = RECOMMENDED_ROUTINES;
