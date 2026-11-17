# FitTracker Pro - 미완성 운동 80종 2단계 해부학 가이드 프롬프트 정리서

- **전체 운동 도감**: 168종
- **기존 배포 완료**: 88종 (52.4%)
- **이번 정리 대상**: **80종 (47.6%)**
- **문서 목적**: 이미지 생성 모델의 슬라이딩 윈도우 회복 시 즉각 호출할 수 있도록 2단계(신장 ➔ 수축, 주동근 주황/빨강 발광) 표준 프롬프트를 전수 구조화.

---

## 📊 카테고리별 요약

| 카테고리 | 미완성 종목 수 | 주요 특징 |
|:---|:---:|:---|
| **하체 (Legs)** | 26종 | 스쿼트 계열(프론트, 와이드, 고블릿, 스미스, V, 펜듈럼, 벨트), 힙쓰러스트, 런지, 카프레이즈 |
| **어깨 (Shoulder)** | 20종 | 덤벨 숄더프레스, 머신 숄더프레스, 사레레, 페이스풀, 후면 삼각근, 슈러그 |
| **복근/코어 (Abs/Core)** | 12종 | 플랭크, 사이드플랭크, 행잉 레그레이즈, 케이블 크런치, 우드촙, 롤아웃 |
| **전신 (Compounds)** | 12종 | 컨벤셔널/루마니안/스모/트랩바 데드리프트, 케틀벨 스윙, 파워클린, 쓰러스터 |
| **유산소 (Cardio)** | 10종 | 천국의 계단(스텝밀), 무동력 트레드밀, 스키에르그, 에어바이크, 로잉머신 |
| **합계** | **80종** | 전 종목 100% 프롬프트 표준화 완료 |

---

## 🏋️ 하체 (26종)

### 1. 스쿼트 (Barbell Back Squat) 
- **ID**: `squat`
- **기구 분류**: barbell (파워 랙 & 바벨)
- **타겟 부위**: 대퇴사두근, 대둔근, 햄스트링, 코어
- **핵심 팁**: 발끝과 무릎 방향을 일치시키고 고관절을 먼저 접으며 깊게 앉습니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL BACK SQUAT'
- Pose 1 (Left - Starting Position): Muscular athletic male standing tall in rack with Olympic barbell secured across upper trapezius, feet shoulder-width apart, chest proud, core braced.
- Pose 2 (Right - Finish Position): Deep parallel back squat with hips sank below knee crease, knees tracking outward over toes, flat neutral spine, eyes forward.
- Muscle Highlight: Quadriceps, Gluteus Maximus, and Hamstrings glowing bright red-orange.
- Equipment: Commercial power rack with barbell and Olympic bumper plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 2. 프론트 스쿼트 (Barbell Front Squat) 
- **ID**: `front-squat`
- **기구 분류**: barbell (파워 랙 & 바벨)
- **타겟 부위**: 대퇴사두근 집중, 상체 직립 코어
- **핵심 팁**: 팔꿈치를 높이 들어 바벨을 쇄골에 안정적으로 얹고 상체를 세워 앉습니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL FRONT SQUAT'
- Pose 1 (Left - Starting Position): Muscular male standing with Olympic barbell resting across anterior deltoids and clavicles in clean front-rack grip, elbows pointing high and forward.
- Pose 2 (Right - Finish Position): Deep squat with completely upright vertical torso, hips deep between thighs, knees forward over toes, elbows kept elevated high.
- Muscle Highlight: Quadriceps (Vastus Medialis/Lateralis) and Rectus Abdominis core glowing bright red-orange.
- Equipment: Power rack with barbell in front rack position.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 3. 와이드 스쿼트 (스모 스쿼트) (Wide-Stance Sumo Squat) 
- **ID**: `wide-squat`
- **기구 분류**: dumbbell (바벨 / 덤벨 / 케틀벨)
- **타겟 부위**: 내전근(허벅지 안쪽), 대둔근, 대퇴사두근
- **핵심 팁**: 다리를 어깨너비 1.5배 이상 벌리고 발끝을 45도 바깥으로 향해 내전근과 둔근을 늘립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'WIDE-STANCE SUMO SQUAT'
- Pose 1 (Left - Starting Position): Muscular male standing in wide sumo stance (1.5x shoulder width) with toes flared outward at 45 degrees, holding heavy dumbbell or barbell vertically.
- Pose 2 (Right - Finish Position): Deep wide squat sinking hips straight down, knees pushed forcefully wide outward over toes, deep groin and inner thigh adductor stretch.
- Muscle Highlight: Adductor Magnus/Longus (Inner Thighs) and Gluteus Maximus glowing bright red-orange.
- Equipment: Heavy dumbbell or Olympic barbell in wide sumo setup.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 4. 고블릿 스쿼트 (Dumbbell / Kettlebell Goblet Squat) 
- **ID**: `goblet-squat`
- **기구 분류**: dumbbell (덤벨 / 케틀벨)
- **타겟 부위**: 대퇴사두근, 대둔근, 코어 안정성
- **핵심 팁**: 덤벨이나 케틀벨을 가슴 앞에 바짝 안고 상체를 세워 깊숙이 앉습니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'GOBLET SQUAT'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding a heavy dumbbell or kettlebell cupped in both hands vertically against upper chest under chin.
- Pose 2 (Right - Finish Position): Deep bottom squat sitting down between hips, elbows tracking cleanly inside knees, upright vertical spine, flat feet.
- Muscle Highlight: Quadriceps and Gluteus Maximus glowing bright red-orange.
- Equipment: Heavy dumbbell held vertically by top bell against sternum.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 5. 씨씨 스쿼트 (Sissy Squat Bench) 
- **ID**: `sissy-squat`
- **기구 분류**: bodyweight (씨씨 스쿼트 머신 (발목 고정 벤치))
- **타겟 부위**: 대퇴사두근 하부 및 전체 극한 고립
- **핵심 팁**: 발목과 종아리를 패드에 고정하고 무릎을 구부리며 허벅지 앞쪽 힘으로 올라옵니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SISSY SQUAT'
- Pose 1 (Left - Starting Position): Muscular male standing upright on sissy squat bench with calves firmly locked against padded back rollers and feet secured under toe bar.
- Pose 2 (Right - Finish Position): Leaning rigid torso and hips backward at 45 degrees while flexing knees forward to 90 degrees, extreme isolated stretch across front thighs.
- Muscle Highlight: Rectus Femoris and Quadriceps glowing intense bright red-orange.
- Equipment: Commercial sissy squat bench station with calf pads and footplate.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 6. 스미스머신 스쿼트 (Smith Machine Squat) 
- **ID**: `smith-machine-squat`
- **기구 분류**: barbell (스미스 머신)
- **타겟 부위**: 대퇴사두근 및 둔근 타겟팅
- **핵심 팁**: 발을 바벨보다 약간 앞에 두면 허리 부담을 줄이고 허벅지와 엉덩이에 집중 가능.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SMITH MACHINE SQUAT'
- Pose 1 (Left - Starting Position): Muscular male standing with barbell of Smith machine across upper traps, feet placed slightly forward of bar plane for quad emphasis.
- Pose 2 (Right - Finish Position): Deep squat descending along fixed vertical guide rails, torso supported upright by track, hips sinking parallel to floor.
- Muscle Highlight: Quadriceps and Gluteus Maximus glowing bright red-orange.
- Equipment: Commercial Smith machine with vertical guide rails and safety catches.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 7. V-스쿼트 (V-Squat Machine) 🔥 **오운완 15위**
- **ID**: `v-squat`
- **기구 분류**: plate_loaded (V스쿼트 플레이트 머신)
- **타겟 부위**: 정방향: 대퇴사두 / 리버스: 둔근, 햄스트링
- **핵심 팁**: 역방향(리버스)으로 서서 힙힌지를 걸면 엉덩이와 햄스트링에 강력한 자극.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'V-SQUAT MACHINE'
- Pose 1 (Left - Starting Position): Muscular male at bottom of curved V-squat movement, shoulders braced under padded bars, hips hinged deep into full squat with thighs parallel to platform.
- Pose 2 (Right - Finish Position): Pressing upward along curved natural arc through heels into tall standing lockout, glutes and quads fully engaged.
- Muscle Highlight: Quadriceps, Gluteus Maximus, and Hamstrings glowing bright red-orange.
- Equipment: Plate-loaded V-squat machine with curved pivot arm and heavy Olympic plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 8. 펜듈럼 스쿼트 (Pendulum Squat Machine) 
- **ID**: `pendulum-squat`
- **기구 분류**: plate_loaded (펜듈럼 진자 스쿼트 머신)
- **타겟 부위**: 대퇴사두근 최대 고립 & 깊은 풀가동범위
- **핵심 팁**: 진자 궤적으로 허리와 무릎 부담 없이 하체 앞쪽을 극한으로 태웁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'PENDULUM SQUAT'
- Pose 1 (Left - Starting Position): Muscular male standing locked on counterbalanced pendulum squat machine, shoulders braced under curved pads, feet on angled footplate.
- Pose 2 (Right - Finish Position): Sinking into deep full squat along pendulum swinging pivot arc, extreme knee flexion delivering maximum isolated tension directly into quadriceps.
- Muscle Highlight: Vastus Lateralis, Vastus Medialis (Teardrop), and Rectus Femoris glowing bright red-orange.
- Equipment: Commercial pendulum squat machine with counterweighted swing arm and Olympic plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 9. 벨트 스쿼트 (Belt Squat Machine) 
- **ID**: `belt-squat`
- **기구 분류**: plate_loaded (벨트 스쿼트 플레이트 머신)
- **타겟 부위**: 척추 무부하 하체 전반 & 둔근
- **핵심 팁**: 골반에 벨트를 차고 수행하여 척추 압박 없이 순수 다리 힘으로만 중량을 듭니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BELT SQUAT MACHINE'
- Pose 1 (Left - Starting Position): Muscular male standing upright on split foot platforms with heavy duty dip belt slung around hips connected to lower pivot cable, zero spinal compression.
- Pose 2 (Right - Finish Position): Deep squat with vertical torso, hands holding front support rail, hips sinking low between platforms against pure lower-body resistance.
- Muscle Highlight: Quadriceps and Gluteus Maximus glowing bright red-orange.
- Equipment: Commercial belt squat platform machine with waist harness belt.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 10. 수평 레그프레스 머신 (Seated Horizontal Pin Leg Press) 
- **ID**: `horizontal-leg-press`
- **기구 분류**: pin_machine (시티드 레그프레스 핀 머신)
- **타겟 부위**: 대퇴사두근, 대둔근 (허리 안전)
- **핵심 팁**: 원판을 끼울 필요 없이 핀으로 빠르게 무게를 조절하며 초보자에게도 안전합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SEATED HORIZONTAL PIN LEG PRESS'
- Pose 1 (Left - Starting Position): Muscular male seated in horizontal carriage, knees bent at 90 degrees with feet flat against vertical footplate, selectorized pin weight stack.
- Pose 2 (Right - Finish Position): Forcefully pressing seat carriage horizontally backward away from footplate into full leg extension without hyperextending knees.
- Muscle Highlight: Quadriceps and Gluteus Maximus glowing bright red-orange.
- Equipment: Selectorized horizontal seated pin leg press machine with backrest.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 11. 원레그 레그프레스 (Single-Leg Press) 
- **ID**: `single-leg-press`
- **기구 분류**: plate_loaded (레그프레스 머신 (한 발))
- **타겟 부위**: 대퇴사두근 및 대둔근 좌우 비대칭 교정
- **핵심 팁**: 한쪽 다리씩 깊게 밀어내며 골반이 틀어지지 않도록 코어를 고정하세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SINGLE-LEG PRESS (UNILATERAL)'
- Pose 1 (Left - Starting Position): Muscular male seated on 45-degree leg press with one foot centered on plate, knee bent deep towards shoulder at 90 degrees, opposite foot resting off sled.
- Pose 2 (Right - Finish Position): Pressing heavy sled upward unilaterally through heel into full single-leg extension, peak quad and glute stability.
- Muscle Highlight: Quadriceps and Gluteus Medius/Maximus of working leg glowing bright red-orange.
- Equipment: 45-degree plate-loaded sled leg press.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 12. 스탠딩 레그컬 (Standing Single-Leg Curl Machine) 
- **ID**: `standing-leg-curl`
- **기구 분류**: pin_machine (스탠딩 원레그 컬 머신)
- **타겟 부위**: 햄스트링 편측 집중 고립
- **핵심 팁**: 한 다리씩 번갈아 수행하여 양쪽 햄스트링의 근력 불균형을 완벽히 잡아줍니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STANDING SINGLE-LEG CURL'
- Pose 1 (Left - Starting Position): Muscular male standing facing machine, chest against angled pad, working leg extended down with roller pad resting behind Achilles tendon.
- Pose 2 (Right - Finish Position): Curling working heel upward and backward toward glutes into peak hamstring contraction against lever resistance, hips pinned forward.
- Muscle Highlight: Biceps Femoris and Semitendinosus (Hamstrings) glowing bright red-orange.
- Equipment: Commercial selectorized standing single leg curl machine.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 13. 글루트 햄 레이즈 (GHR) (Glute Ham Raise (GHD)) 
- **ID**: `glute-ham-raise`
- **기구 분류**: bodyweight (GHR 벤치 (글루트 햄 디벨로퍼))
- **타겟 부위**: 햄스트링, 대둔근, 종아리, 척추기립근
- **핵심 팁**: 무릎과 발목을 고정하고 햄스트링의 힘으로 몸을 지탱하며 올라옵니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'GLUTE HAM RAISE (GHR / GHD)'
- Pose 1 (Left - Starting Position): Muscular male with thighs on rounded pad and feet locked between ankle rollers, torso hinged vertically down 90 degrees at hips.
- Pose 2 (Right - Finish Position): Pulling torso up horizontally in line with thighs and bending knees to pull whole body upright using pure hamstring and glute contraction.
- Muscle Highlight: Hamstrings (full length), Gluteus Maximus, and Gastrocnemius glowing bright red-orange.
- Equipment: Commercial GHD / Glute Ham Developer bench.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 14. 힙 쓰러스터 (Barbell Hip Thrust) 
- **ID**: `hip-thrust`
- **기구 분류**: barbell (힙 쓰러스트 벤치 & 바벨)
- **타겟 부위**: 대둔근 (엉덩이 볼륨 집중 고립)
- **핵심 팁**: 정점에서 골반을 말아올려 엉덩이를 최대로 수축하고 턱은 당기세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL HIP THRUST'
- Pose 1 (Left - Starting Position): Muscular male with upper back rested against cross bench, hips dipped low toward floor with padded barbell resting across hip crease.
- Pose 2 (Right - Finish Position): Driving hips explosively upward into full horizontal tabletop extension, knees at 90 degrees, vertical shins, crushing glutes at lockout.
- Muscle Highlight: Gluteus Maximus glowing intense bright red-orange.
- Equipment: Hip thrust bench with barbell, thick foam barbell pad, and bumper plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 15. 부티빌더 힙 쓰러스트 머신 (Booty Builder /Hip Thrust Machine) 
- **ID**: `booty-builder-hip-thrust`
- **기구 분류**: plate_loaded (전용 힙 쓰러스트 머신 (벨트형))
- **타겟 부위**: 대둔근 전체 및 상부 힙업
- **핵심 팁**: 바벨 세팅의 번거로움과 골반 통증 없이 패드 벨트를 채워 안전하게 고중량 힙업을 수행합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BOOTY BUILDER / HIP THRUST MACHINE'
- Pose 1 (Left - Starting Position): Muscular male seated in dedicated hip thrust machine with wide padded seatbelt strapped across pelvis, hips lowered in starting dip.
- Pose 2 (Right - Finish Position): Driving hips upward against padded seatbelt harness into full locked-out hip extension, upper torso stabilized on backrest.
- Muscle Highlight: Gluteus Maximus and Upper Glutes glowing bright red-orange.
- Equipment: Selectorized Booty Builder hip thrust machine with padded waist belt.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 16. 글루트 킥백 머신 (Glute Kickback Machine) 
- **ID**: `glute-kickback-machine`
- **기구 분류**: pin_machine (글루트 킥백 핀/플레이트 머신)
- **타겟 부위**: 대둔근 상부, 힙업
- **핵심 팁**: 허리를 꺾지 않고 다리를 뒤쪽 대각선 위로 힘차게 밀어 엉덩이를 쥡니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'GLUTE KICKBACK MACHINE'
- Pose 1 (Left - Starting Position): Muscular male leaning forward with chest and forearms on padded supports, working knee flexed forward ready to push.
- Pose 2 (Right - Finish Position): Kicking working leg forcefully backward and upward against circular footpad until leg and hip reach full extension in peak glute squeeze.
- Muscle Highlight: Gluteus Maximus glowing bright red-orange.
- Equipment: Commercial selectorized rear glute kickback machine.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 17. 케이블 글루트 킥백 (Cable Ankle-Strap Glute Kickback) 
- **ID**: `cable-glute-kickback`
- **기구 분류**: cable (하단 케이블 & 발목 스트랩)
- **타겟 부위**: 대둔근 및 중둔근 상부 라인
- **핵심 팁**: 발목 스트랩을 걸고 골반을 고정한 채 다리를 뒤쪽 대각선 30도로 차올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE GLUTE KICKBACK'
- Pose 1 (Left - Starting Position): Muscular male facing low cable pulley with ankle strap attached, leaning slightly forward holding machine frame, working leg brought forward.
- Pose 2 (Right - Finish Position): Kicking working leg straight backward and slightly diagonally outward into full hip extension, squeezing glute hard at peak.
- Muscle Highlight: Gluteus Maximus and Gluteus Medius glowing bright red-orange.
- Equipment: Cable column station with ankle cuff attachment at lowest pulley.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 18. 케이블 힙 어브덕션 (Cable Hip Abduction) 
- **ID**: `cable-hip-abduction`
- **기구 분류**: cable (하단 케이블 & 발목 스트랩)
- **타겟 부위**: 중둔근, 소둔근 (골반 힙딥 채움)
- **핵심 팁**: 상체를 가볍게 지지하고 발목 스트랩을 바깥쪽으로 밀어내며 중둔근 상단을 강하게 수축합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE STANDING HIP ABDUCTION'
- Pose 1 (Left - Starting Position): Muscular male standing sideways to low cable column, ankle cuff on outer leg with cable running in front of supporting leg, holding machine upright.
- Pose 2 (Right - Finish Position): Sweeping working leg laterally outward and upward away from body against cable resistance into wide abduction.
- Muscle Highlight: Gluteus Medius and Tensor Fasciae Latae (TFL) glowing bright red-orange.
- Equipment: Cable machine with low pulley and padded ankle strap.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 19. 런지 (Dumbbell Walking / Static Lunge) 
- **ID**: `lunge`
- **기구 분류**: dumbbell (덤벨 / 바벨)
- **타겟 부위**: 대둔근, 대퇴사두근, 햄스트링
- **핵심 팁**: 앞 무릎이 발끝을 과하게 넘지 않게 90도로 직각 하강합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL WALKING / STATIC LUNGE'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding heavy pair of dumbbells at sides, initiating forward split stride.
- Pose 2 (Right - Finish Position): Deep lunging bottom position with front thigh parallel to floor (90° knee bend) and trailing knee hovering 2cm above floor, torso tall and upright.
- Muscle Highlight: Quadriceps and Gluteus Maximus glowing bright red-orange.
- Equipment: Pair of heavy hexagonal or round dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 20. 리버스 런지 (Reverse / Back Lunge) 
- **ID**: `reverse-lunge`
- **기구 분류**: dumbbell (덤벨 / 바벨 / 스미스머신)
- **타겟 부위**: 대둔근 집중, 무릎 관절 보호
- **핵심 팁**: 발을 뒤로 빼며 앉아 무릎 부담은 줄이고 앞다리 엉덩이 자극을 극대화합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL REVERSE LUNGE'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding dumbbells at sides, feet hip-width apart.
- Pose 2 (Right - Finish Position): Stepping one leg backward into deep lunge, front knee bent at 90 degrees absorbing load through front heel, back knee hovering near floor, upright spine.
- Muscle Highlight: Gluteus Maximus and Front Quadriceps glowing bright red-orange.
- Equipment: Pair of dumbbells held at sides.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 21. 불가리안 스플릿 스쿼트 (Bulgarian Split Squat) 
- **ID**: `bulgarian-split-squat`
- **기구 분류**: dumbbell (스플릿 스쿼트 스탠드 & 덤벨)
- **타겟 부위**: 대둔근, 대퇴사두근 편측 균형
- **핵심 팁**: 뒷발을 롤러에 얹고 상체를 살짝 숙여 앞다리 엉덩이로 지면을 밀어 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BULGARIAN SPLIT SQUAT (REAR-FOOT ELEVATED)'
- Pose 1 (Left - Starting Position): Muscular male with rear foot laces resting on flat bench behind him, standing upright on forward working leg holding dumbbells.
- Pose 2 (Right - Finish Position): Sinking deeply down until front thigh is parallel to floor, front knee tracked over midfoot, back knee dipping toward ground in extreme single-leg load.
- Muscle Highlight: Gluteus Maximus, Quadriceps, and Adductor Magnus glowing bright red-orange.
- Equipment: Flat gym bench and pair of dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 22. 스텝업 (Dumbbell Box Step-Up) 
- **ID**: `step-up`
- **기구 분류**: dumbbell (플라이오 박스 / 벤치 & 덤벨)
- **타겟 부위**: 대둔근, 대퇴사두근, 고관절 안정성
- **핵심 팁**: 뒷다리 반동을 쓰지 말고 박스 위에 올린 앞다리 뒤꿈치 힘으로만 몸을 끌어올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL BOX STEP-UP'
- Pose 1 (Left - Starting Position): Muscular male standing before high wooden plyo box or flat bench, one foot planted firmly on top, holding dumbbells at sides.
- Pose 2 (Right - Finish Position): Driving forcefully through top foot and heel to stand atop box with full hip and knee lockout, trailing knee driven forward in athletic finish.
- Muscle Highlight: Gluteus Maximus and Quadriceps glowing bright red-orange.
- Equipment: Sturdy wooden plyo box (20-24 inch) and pair of dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 23. 카프 레이즈 (Standing / Leg-Press Calf Raise) 
- **ID**: `calf-raise`
- **기구 분류**: pin_machine (카프 레이즈 머신 / 스텝 블록)
- **타겟 부위**: 비복근, 가자미근 (종아리 전체)
- **핵심 팁**: 뒤꿈치를 최대한 깊게 내렸다가 엄지발가락으로 지면을 강하게 누릅니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STANDING CALF RAISE (BLOCK / LEG PRESS)'
- Pose 1 (Left - Starting Position): Muscular male standing with balls of feet on edge of raised block, heels dropped low below platform level into deep Achilles and calf stretch.
- Pose 2 (Right - Finish Position): Exploding high onto tiptoes and balls of feet into full plantarflexion, peak contraction squeezing calves tight.
- Muscle Highlight: Gastrocnemius (Medial & Lateral Heads) glowing bright red-orange.
- Equipment: Raised calf block platform.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 24. 스탠딩 카프 레이즈 (Standing Calf Raise Machine) 
- **ID**: `standing-calf-raise`
- **기구 분류**: pin_machine (스탠딩 카프 레이즈 핀 머신)
- **타겟 부위**: 비복근 (종아리 알통 볼륨)
- **핵심 팁**: 무릎을 편 상태에서 발목을 최대로 꺾어 이완한 뒤 정점에서 1초간 수축합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STANDING CALF RAISE MACHINE'
- Pose 1 (Left - Starting Position): Muscular male standing on machine platform, shoulder pads resting on traps with full weight stack engaged, heels dropped deep below footplate.
- Pose 2 (Right - Finish Position): Pushing upward onto balls of feet into maximum calf lockout, knees kept straight with slight micro-bend.
- Muscle Highlight: Gastrocnemius and Soleus glowing bright red-orange.
- Equipment: Selectorized standing calf raise machine with shoulder pads.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 25. 시티드 카프 레이즈 (Seated Calf Raise Machine) 
- **ID**: `seated-calf-raise`
- **기구 분류**: plate_loaded (시티드 카프 레이즈 플레이트 머신)
- **타겟 부위**: 가자미근 (종아리 바깥/하단 라인)
- **핵심 팁**: 무릎이 90도로 굽혀진 상태에서는 가자미근이 집중적으로 타격되어 발목 라인을 다듬어줍니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SEATED CALF RAISE MACHINE'
- Pose 1 (Left - Starting Position): Muscular male seated upright with knees bent at 90 degrees under padded thigh lever, balls of feet on block, heels dropped down in full stretch.
- Pose 2 (Right - Finish Position): Pressing balls of feet down to raise heels high against padded lever resistance in deep soleus contraction.
- Muscle Highlight: Soleus (Deep Calf Muscle) glowing bright red-orange.
- Equipment: Plate-loaded seated calf raise machine with knee pads.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 26. 바벨 굿모닝 (Barbell Good Morning) 
- **ID**: `barbell-good-morning`
- **기구 분류**: barbell (파워 랙 & 바벨)
- **타겟 부위**: 햄스트링, 대둔근, 척추기립근 (후면 사슬)
- **핵심 팁**: 승모근에 바벨을 얹고 무릎을 살짝 굽힌 채 인사하듯 엉덩이를 뒤로 쭉 밀어냅니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL GOOD MORNING'
- Pose 1 (Left - Starting Position): Muscular male standing tall with Olympic barbell resting across upper traps, feet hip-width, knees soft.
- Pose 2 (Right - Finish Position): Hinging hips deeply backward with flat neutral spine until torso reaches near-parallel to floor, deep hamstring and posterior chain stretch.
- Muscle Highlight: Hamstrings, Gluteus Maximus, and Erector Spinae glowing bright red-orange.
- Equipment: Olympic barbell across upper back.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```


## 🏋️ 어깨 (20종)

### 1. 스미스머신 숄더프레스 (Seated Smith Machine Shoulder Press) 
- **ID**: `smith-machine-shoulder-press`
- **기구 분류**: barbell (스미스 머신 & 80도 벤치)
- **타겟 부위**: 전면/측면 삼각근 고중량 고립
- **핵심 팁**: 벤치 등받이를 75~85도로 세우고 코끝이나 턱선 높이까지 안전하게 내려 밀어 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SMITH MACHINE SEATED SHOULDER PRESS'
- Pose 1 (Left - Starting Position): Muscular male seated on 85-degree upright bench inside Smith machine, gripping bar at chin/collarbone level with forearms vertical.
- Pose 2 (Right - Finish Position): Pressing bar smoothly upward along fixed vertical track into full overhead lockout above head, shoulders fully engaged.
- Muscle Highlight: Anterior Deltoid, Lateral Deltoid, and Triceps glowing bright red-orange.
- Equipment: Smith machine with adjustable incline bench set to 85 degrees.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 2. 비하인드 넥 프레스 (Behind-the-Neck Barbell/Smith Press) 
- **ID**: `behind-the-neck-press`
- **기구 분류**: barbell (스미스 머신 / 바벨 & 벤치)
- **타겟 부위**: 측면 삼각근 및 전면 삼각근
- **핵심 팁**: 무리하게 목 뒤 깊숙이 내리지 말고 귀 높이까지만 내려 어깨 충돌을 예방하세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BEHIND-THE-NECK BARBELL PRESS'
- Pose 1 (Left - Starting Position): Muscular male seated upright with barbell lowered carefully behind head across upper neck/trapezius level, wide overhand grip.
- Pose 2 (Right - Finish Position): Pressing barbell vertically overhead until arms reach full extension directly over crown of head.
- Muscle Highlight: Lateral Deltoid and Posterior Deltoid glowing bright red-orange.
- Equipment: Barbell with Olympic plates and seated upright bench.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 3. 덤벨 숄더프레스 (Seated Dumbbell Shoulder Press) 🔥 **오운완 26위**
- **ID**: `dumbbell-shoulder-press`
- **기구 분류**: dumbbell (덤벨 & 90도 벤치)
- **타겟 부위**: 전면/측면 삼각근, 삼두근
- **핵심 팁**: 팔꿈치가 어깨선보다 약간 앞으로 오게 각도를 두고 귀 옆에서 머리 위로 밉니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SEATED DUMBBELL SHOULDER PRESS'
- Pose 1 (Left - Starting Position): Muscular male seated upright with back supported, dumbbells held at ear level with palms facing forward, elbows at 90 degrees.
- Pose 2 (Right - Finish Position): Pressing dumbbells overhead in gentle converging arc until weights nearly touch overhead at lockout, core braced.
- Muscle Highlight: Anterior Deltoid and Lateral Deltoid glowing bright red-orange.
- Equipment: Adjustable gym bench set to 85 degrees and heavy dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 4. 숄더프레스 머신 (Seated Shoulder Press Machine) 🔥 **오운완 30위**
- **ID**: `shoulder-press-machine`
- **기구 분류**: pin_machine (숄더프레스 핀 머신)
- **타겟 부위**: 전면/측면 삼각근 고립
- **핵심 팁**: 손잡이를 잡고 팔꿈치가 뒤로 빠지지 않도록 유의하며 밀어 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SEATED SHOULDER PRESS MACHINE'
- Pose 1 (Left - Starting Position): Muscular male seated in selectorized shoulder press machine, hands gripping handles at shoulder level, chest proud against backrest.
- Pose 2 (Right - Finish Position): Pressing machine handles upward to full overhead extension in controlled arc, locking out shoulders at top.
- Muscle Highlight: Anterior Deltoid and Lateral Deltoid glowing bright red-orange.
- Equipment: Commercial selectorized seated shoulder press machine.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 5. 해머 숄더프레스 머신 (Hammer Strength ISO-Lateral Shoulder Press) 
- **ID**: `hammer-shoulder-press`
- **기구 분류**: plate_loaded (해머스트렝스 플레이트 숄더 머신)
- **타겟 부위**: 전면 및 측면 삼각근 고중량 프레스
- **핵심 팁**: 자연스러운 아치 궤적으로 어깨 관절에 부담 없이 고중량 훈련이 가능합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'HAMMER STRENGTH ISO-LATERAL SHOULDER PRESS'
- Pose 1 (Left - Starting Position): Muscular male seated on plate-loaded hammer machine, gripping independent converging handles at collarbone height.
- Pose 2 (Right - Finish Position): Pressing handles upward along natural converging arc overhead, peak shoulder contraction at lockout.
- Muscle Highlight: Anterior Deltoid and Lateral Deltoid glowing bright red-orange.
- Equipment: Hammer Strength plate-loaded ISO-lateral shoulder press machine.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 6. 아놀드 프레스 (Arnold Dumbbell Press) 
- **ID**: `arnold-press`
- **기구 분류**: dumbbell (덤벨 & 벤치)
- **타겟 부위**: 전면, 측면, 후면 삼각근 복합
- **핵심 팁**: 손바닥이 몸을 보게 시작하여 밀어 올리면서 바깥쪽으로 회전시킵니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'ARNOLD DUMBBELL PRESS'
- Pose 1 (Left - Starting Position): Muscular male seated holding dumbbells in front of upper chest with palms facing body (supinated) and elbows tucked close.
- Pose 2 (Right - Finish Position): Rotating wrists outward 180 degrees while pressing dumbbells overhead in continuous motion, finishing with palms facing forward at lockout.
- Muscle Highlight: Anterior, Lateral, and Posterior Deltoids glowing bright red-orange.
- Equipment: Seated upright bench and pair of dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 7. 사이드 레터럴 레이즈 (Dumbbell Side Lateral Raise) 
- **ID**: `side-lateral-raise`
- **기구 분류**: dumbbell (덤벨)
- **타겟 부위**: 측면 삼각근 (어깨 뽕 볼륨)
- **핵심 팁**: 승모근 개입을 줄이고 팔꿈치를 옆으로 멀리 던져 올린다는 느낌으로 수행하세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL SIDE LATERAL RAISE'
- Pose 1 (Left - Starting Position): Muscular male standing tall with dumbbells held at sides of thighs, palms facing inward, slight forward torso lean, elbows slightly bent.
- Pose 2 (Right - Finish Position): Raising dumbbells laterally outward and upward like wings until elbows and weights are level with shoulders parallel to floor.
- Muscle Highlight: Lateral Deltoid (Middle Shoulder) glowing intense bright red-orange.
- Equipment: Pair of dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 8. 사이드 레터럴 레이즈 머신 (Seated Lateral Raise Machine) 
- **ID**: `lateral-raise-machine`
- **기구 분류**: pin_machine (델토이드 레이즈 핀 머신)
- **타겟 부위**: 측면 삼각근 순수 고립
- **핵심 팁**: 팔꿈치 패드를 어깨 높이까지 밀어 올려 승모근 개입 없이 측면 삼각근을 고립합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SEATED LATERAL RAISE MACHINE'
- Pose 1 (Left - Starting Position): Muscular male seated in machine with chest against chest pad, outer elbows resting against padded lever arms at sides.
- Pose 2 (Right - Finish Position): Raising padded lever arms laterally upward until upper arms reach horizontal parallel to floor, isolated side delt squeeze.
- Muscle Highlight: Lateral Deltoid glowing bright red-orange.
- Equipment: Commercial selectorized lateral raise machine with elbow pads.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 9. 케이블 사이드 레터럴 레이즈 (Cable Side Lateral Raise) 
- **ID**: `cable-side-lateral-raise`
- **기구 분류**: cable (케이블 싱글 핸들)
- **타겟 부위**: 측면 삼각근 (전 구간 일정한 장력)
- **핵심 팁**: 케이블을 다리 뒤나 앞으로 빼서 잡고 측면으로 부드럽게 끌어올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE SIDE LATERAL RAISE'
- Pose 1 (Left - Starting Position): Muscular male standing sideways to low cable column, gripping D-handle with outside hand, cable running behind or in front of hips.
- Pose 2 (Right - Finish Position): Raising cable handle laterally outward and upward to shoulder height, maintaining constant cable tension throughout arc.
- Muscle Highlight: Lateral Deltoid glowing bright red-orange.
- Equipment: Cable column with low pulley and single stirrup handle.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 10. 케이블 Y-레이즈 (Cable Dual Y-Raise) 
- **ID**: `cable-y-raise`
- **기구 분류**: cable (듀얼 케이블 타워)
- **타겟 부위**: 측면 삼각근, 하부 승모근
- **핵심 팁**: 양손에 케이블을 교차해 잡고 대각선 위 Y자 모양으로 뻗어 측면 어깨를 쥐어짭니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE DUAL Y-RAISE'
- Pose 1 (Left - Starting Position): Muscular male standing in center of dual cable crossover with pulleys set at hip/knee height, cables crossed with hands holding opposite cables.
- Pose 2 (Right - Finish Position): Raising arms diagonally upward and outward into a wide overhead 'Y' shape, peak contraction across side and rear delts.
- Muscle Highlight: Lateral Deltoid, Lower Trapezius, and Posterior Deltoid glowing bright red-orange.
- Equipment: Dual cable crossover column with pulleys at mid-low height.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 11. 프론트 레이즈 (Dumbbell / Barbell Front Raise) 
- **ID**: `front-raise`
- **기구 분류**: dumbbell (덤벨 / 바벨)
- **타겟 부위**: 전면 삼각근, 윗가슴 연결부
- **핵심 팁**: 반동 없이 눈높이까지 천천히 들어 올리고 버티면서 내립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL / BARBELL FRONT RAISE'
- Pose 1 (Left - Starting Position): Muscular male standing tall with dumbbells or barbell resting in front of thighs with overhand pronated grip, core braced.
- Pose 2 (Right - Finish Position): Lifting weight straight forward and upward with slight elbow micro-bend until arms are parallel to floor at eye level.
- Muscle Highlight: Anterior Deltoid (Front Shoulder) glowing bright red-orange.
- Equipment: Pair of dumbbells or straight barbell.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 12. 원판 프론트 레이즈 (Weight Plate Front Raise) 
- **ID**: `plate-front-raise`
- **기구 분류**: barbell (원판 (플레이트))
- **타겟 부위**: 전면 삼각근
- **핵심 팁**: 원판의 3시·9시 방향을 잡고 눈높이까지 들어 올려 정점에서 1초간 버팁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'WEIGHT PLATE FRONT RAISE'
- Pose 1 (Left - Starting Position): Muscular male standing tall gripping Olympic 20kg weight plate at 9 o'clock and 3 o'clock positions in front of thighs.
- Pose 2 (Right - Finish Position): Raising weight plate straight forward and upward with locked arms until center hole of plate reaches eye level.
- Muscle Highlight: Anterior Deltoid and Upper Chest glowing bright red-orange.
- Equipment: Olympic 20kg cast iron or bumper plate.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 13. 케이블 프론트 레이즈 (Cable Rope / Bar Front Raise) 
- **ID**: `cable-front-raise`
- **기구 분류**: cable (하단 케이블 & 로프/일자바)
- **타겟 부위**: 전면 삼각근 지속 긴장
- **핵심 팁**: 다리 사이로 케이블을 통과시켜 잡고 어깨 높이까지 앞으로 들어 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE FRONT RAISE'
- Pose 1 (Left - Starting Position): Muscular male straddling low cable pulley facing away from column, holding straight bar or rope attachment between legs with arms extended down.
- Pose 2 (Right - Finish Position): Raising cable attachment straight forward and upward to shoulder height against constant continuous cable resistance.
- Muscle Highlight: Anterior Deltoid glowing bright red-orange.
- Equipment: Low cable pulley with straight bar or rope attachment.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 14. 페이스 풀 (Cable Rope Face Pull) 
- **ID**: `face-pull`
- **기구 분류**: cable (케이블 로프)
- **타겟 부위**: 후면 삼각근, 회전근개, 승모근 중하부
- **핵심 팁**: 로프를 이마 방향으로 당기며 양손을 귀 옆으로 벌려 어깨 외회전을 함께 걸어줍니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE ROPE FACE PULL'
- Pose 1 (Left - Starting Position): Muscular male standing facing high cable pulley holding rope attachment with thumbs pointing backward, arms fully extended forward.
- Pose 2 (Right - Finish Position): Pulling rope directly toward bridge of nose and forehead, flaring elbows wide and rotating shoulders back into double biceps external rotation.
- Muscle Highlight: Posterior Deltoid, Infraspinatus, Rhomboids, and Upper Trapezius glowing bright red-orange.
- Equipment: High cable pulley with long triceps rope attachment.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 15. 벤트오버 덤벨 레터럴 레이즈 (Bent-Over Dumbbell Rear Delt Raise) 
- **ID**: `bent-over-lateral-raise`
- **기구 분류**: dumbbell (덤벨 & 벤치)
- **타겟 부위**: 후면 삼각근
- **핵심 팁**: 상체를 숙이거나 인클라인 벤치에 이마를 대고 팔꿈치를 옆으로 벌려 후면 삼각근만 타격합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BENT-OVER DUMBBELL REAR DELT RAISE'
- Pose 1 (Left - Starting Position): Muscular male standing with hips hinged forward 60-70 degrees, flat neutral spine, dumbbells hanging straight down beneath chest.
- Pose 2 (Right - Finish Position): Raising dumbbells laterally outward and backward leading with elbows until weights reach shoulder level in rear delt squeeze.
- Muscle Highlight: Posterior Deltoid (Rear Shoulder) and Rhomboids glowing bright red-orange.
- Equipment: Pair of dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 16. 케이블 리어 델트 플라이 (High Cable Reverse Crossover Fly) 
- **ID**: `cable-rear-delt-fly`
- **기구 분류**: cable (듀얼 케이블 타워)
- **타겟 부위**: 후면 삼각근, 능형근
- **핵심 팁**: 눈높이 케이블을 양손 교차로 잡고 대각선 뒤로 팔을 활짝 펼쳐 후면 어깨를 조입니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'HIGH CABLE REVERSE CROSSOVER FLY'
- Pose 1 (Left - Starting Position): Muscular male standing in center of dual cable crossover, pulleys at eye level without handles, holding opposite cable carabiners crossed in front of face.
- Pose 2 (Right - Finish Position): Pulling cables horizontally apart and backward in wide reverse fly arc until hands are back in line with torso.
- Muscle Highlight: Posterior Deltoid and Middle Trapezius glowing bright red-orange.
- Equipment: Dual cable column station at eye height.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 17. 바벨 업라이트 로우 (Barbell / EZ-Bar Upright Row) 
- **ID**: `barbell-upright-row`
- **기구 분류**: barbell (EZ 바 / 바벨)
- **타겟 부위**: 측면 삼각근, 상부 승모근
- **핵심 팁**: 어깨너비로 바를 잡고 팔꿈치가 손목보다 높게 올라오도록 가슴 상단까지 끌어올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL UPRIGHT ROW'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding Olympic barbell with shoulder-width overhand grip in front of thighs.
- Pose 2 (Right - Finish Position): Pulling barbell vertically straight up along torso, leading with high flared elbows until bar reaches mid-chest level.
- Muscle Highlight: Lateral Deltoid and Upper Trapezius glowing bright red-orange.
- Equipment: Olympic barbell with plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 18. 덤벨 업라이트 로우 (Dumbbell Upright Row) 
- **ID**: `dumbbell-upright-row`
- **기구 분류**: dumbbell (덤벨)
- **타겟 부위**: 측면 삼각근, 승모근 (손목/어깨 관절 보호)
- **핵심 팁**: 바벨보다 손목과 어깨 회전이 자유로워 통증 없이 측면 삼각근을 강하게 끌어올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL UPRIGHT ROW'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding pair of dumbbells across front of thighs, palms facing backward.
- Pose 2 (Right - Finish Position): Pulling dumbbells vertically upward along torso line, elbows leading high and wide above hands at upper chest height.
- Muscle Highlight: Lateral Deltoid and Upper Trapezius glowing bright red-orange.
- Equipment: Pair of dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 19. 슈러그 (Barbell / Smith Machine Shrug) 
- **ID**: `shrug`
- **기구 분류**: barbell (바벨 / 스미스머신 / 트랩바)
- **타겟 부위**: 상부 승모근
- **핵심 팁**: 어깨를 귀에 닿게 한다는 느낌으로 수직으로 으쓱 올리고 정점에서 1초간 멈춥니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL / SMITH MACHINE SHRUG'
- Pose 1 (Left - Starting Position): Muscular male standing upright holding heavy barbell in front of thighs with arms completely straight, shoulders relaxed and depressed.
- Pose 2 (Right - Finish Position): Elevating shoulders straight up toward ears in maximum vertical shrug contraction without rolling shoulders, pausing at top.
- Muscle Highlight: Upper Trapezius glowing intense bright red-orange.
- Equipment: Olympic barbell or Smith machine loaded with heavy plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 20. 덤벨 슈러그 (Standing Dumbbell Shrug) 
- **ID**: `dumbbell-shrug`
- **기구 분류**: dumbbell (덤벨)
- **타겟 부위**: 상부 승모근 좌우 대칭 발달
- **핵심 팁**: 몸통 옆에 덤벨을 들고 날개뼈를 살짝 모으며 귀 뒤쪽 방향으로 으쓱 들어 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STANDING DUMBBELL SHRUG'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding heavy pair of dumbbells at sides of thighs, arms straight, shoulders hanging down.
- Pose 2 (Right - Finish Position): Shrugging shoulders straight upward toward ears in powerful vertical contraction, crushing upper traps at peak.
- Muscle Highlight: Upper Trapezius glowing bright red-orange.
- Equipment: Pair of heavy dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```


## 🏋️ 복근/코어 (12종)

### 1. 플랭크 (Standard Core Plank) 
- **ID**: `plank`
- **기구 분류**: bodyweight (피트니스 매트)
- **타겟 부위**: 복직근, 복횡근, 코어 안정성
- **핵심 팁**: 복근과 둔근에 힘을 주어 허리가 아래로 꺾이지 않는 일직선을 유지합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STANDARD FOREARM PLANK'
- Pose 1 (Left - Starting Position): Muscular male setting up in prone position on exercise mat, forearms on floor with elbows directly under shoulders, toes planted.
- Pose 2 (Right - Finish Position): Lifting body into rigid straight-line plank from head to heels, neutral neck, glutes squeezed, intense abdominal hollow bracing.
- Muscle Highlight: Rectus Abdominis and Transverse Abdominis glowing bright red-orange.
- Equipment: High-density exercise floor mat.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 2. 사이드 플랭크 (Side Oblique Plank) 
- **ID**: `side-plank`
- **기구 분류**: bodyweight (피트니스 매트)
- **타겟 부위**: 외복사근, 내복사근, 중둔근 코어
- **핵심 팁**: 한쪽 팔꿈치로 지탱하며 골반이 바닥으로 처지지 않게 옆구리 힘으로 버팁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SIDE PLANK (OBLIQUE BRACE)'
- Pose 1 (Left - Starting Position): Muscular male lying on side supported on single forearm with feet stacked, hips resting on mat.
- Pose 2 (Right - Finish Position): Lifting hips off floor until body forms rigid diagonal line from head to feet, top arm extended vertically upward.
- Muscle Highlight: Internal and External Obliques and Quadratus Lumborum glowing bright red-orange.
- Equipment: Exercise floor mat.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 3. 크런치 (Abdominal Crunch) 
- **ID**: `crunch`
- **기구 분류**: bodyweight (매트 / 애브매트)
- **타겟 부위**: 상복부 (복직근 상단)
- **핵심 팁**: 허리를 바닥에 붙인 채로 갈비뼈를 골반 쪽으로 말아 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'ABDOMINAL FLOOR CRUNCH'
- Pose 1 (Left - Starting Position): Muscular male lying supine on floor mat with knees bent at 90 degrees, feet flat, fingertips touching temples, lower back pressed down.
- Pose 2 (Right - Finish Position): Curling ribcage toward pelvis, lifting shoulder blades 3-4 inches off floor in tight abdominal contraction, lower back remaining flat on mat.
- Muscle Highlight: Upper Rectus Abdominis glowing bright red-orange.
- Equipment: Exercise floor mat.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 4. 디클라인 싯업 (Decline Bench Sit-Up) 
- **ID**: `decline-sit-up`
- **기구 분류**: bodyweight (디클라인 복근 벤치)
- **타겟 부위**: 복직근 전체, 장요근
- **핵심 팁**: 발목을 패드에 걸고 등을 둥글게 말아 복근의 긴장이 풀리지 않는 각도까지 내려갑니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DECLINE BENCH SIT-UP'
- Pose 1 (Left - Starting Position): Muscular male on 30-degree decline bench with shins locked under padded rollers, torso reclined along bench with hands at head.
- Pose 2 (Right - Finish Position): Flexing abs powerfully to sit all the way up until torso is perpendicular to floor in full abdominal squeeze.
- Muscle Highlight: Rectus Abdominis and Iliopsoas glowing bright red-orange.
- Equipment: Commercial decline sit-up bench with foot rollers.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 5. 레그레이즈 (플랫 벤치) (Lying Flat Bench Leg Raise) 
- **ID**: `bench-leg-raise`
- **기구 분류**: bodyweight (플랫 벤치 / 매트)
- **타겟 부위**: 하복부 (복직근 하단)
- **핵심 팁**: 다리를 내릴 때 허리가 뜨지 않도록 복부를 바닥 쪽으로 강하게 누르며 버팁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'FLAT BENCH LYING LEG RAISE'
- Pose 1 (Left - Starting Position): Muscular male lying flat on gym bench gripping edge beside head, legs extended straight hovering horizontally off bench.
- Pose 2 (Right - Finish Position): Raising straight legs upward to 90-degree vertical angle and slightly tilting pelvis off bench in peak lower ab contraction.
- Muscle Highlight: Lower Rectus Abdominis and Hip Flexors glowing bright red-orange.
- Equipment: Flat gym bench.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 6. 행잉 레그레이즈 (Hanging / Captains Chair Leg Raise) 
- **ID**: `hanging-leg-raise`
- **기구 분류**: bodyweight (풀업 바 / 캡틴스 체어)
- **타겟 부위**: 하복부, 복직근 전체, 장요근
- **핵심 팁**: 다리만 들지 말고 골반 자체를 명치 쪽으로 말아 올린다는 느낌으로 진행하세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'HANGING STRAIGHT LEG RAISE'
- Pose 1 (Left - Starting Position): Muscular male hanging from pull-up bar with straight arms and overhead grip, body hanging still without swinging.
- Pose 2 (Right - Finish Position): Flexing core and hips to raise straight legs horizontally to 90 degrees (or toes to bar) with posterior pelvic tilt.
- Muscle Highlight: Lower Rectus Abdominis and Hip Flexors glowing bright red-orange.
- Equipment: Overhead pull-up bar.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 7. 행잉 니레이즈 (Captains Chair / Hanging Knee Raise) 
- **ID**: `hanging-knee-raise`
- **기구 분류**: bodyweight (캡틴스 체어 / 치닝디핑)
- **타겟 부위**: 하복부 집중 (허리 부담 최소화)
- **핵심 팁**: 무릎을 굽혀 가슴 쪽으로 당기면서 골반을 말아 올려 초보자도 쉽게 하복부를 자극합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CAPTAIN'S CHAIR / HANGING KNEE RAISE'
- Pose 1 (Left - Starting Position): Muscular male supported on forearms in captain's chair tower with back against pad, legs hanging down relaxed.
- Pose 2 (Right - Finish Position): Curling knees up toward chest, curling pelvis forward and rounding lower spine to intensely contract abdominal wall.
- Muscle Highlight: Rectus Abdominis glowing bright red-orange.
- Equipment: Captain's chair / Roman chair vertical knee raise station.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 8. 케이블 크런치 (Kneeling Cable Rope Crunch) 
- **ID**: `cable-crunch`
- **기구 분류**: cable (상단 케이블 & 로프)
- **타겟 부위**: 상중 복직근 고중량 강화
- **핵심 팁**: 무릎을 꿇고 엉덩이를 고정한 채 등을 새우처럼 둥글게 말아 복근으로만 당깁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'KNEELING CABLE ROPE CRUNCH'
- Pose 1 (Left - Starting Position): Muscular male kneeling facing high cable pulley holding rope attachment handles at sides of ears, hips high and stationary.
- Pose 2 (Right - Finish Position): Curling thoracic spine downward bringing elbows down toward knees, rounding back into maximum abdominal crunch without moving hips.
- Muscle Highlight: Rectus Abdominis glowing intense bright red-orange.
- Equipment: High cable pulley with triceps rope attachment.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 9. 케이블 우드촙 (Cable Rotational Woodchopper) 
- **ID**: `cable-woodchopper`
- **기구 분류**: cable (케이블 싱글 핸들)
- **타겟 부위**: 외복사근, 내복사근, 회전 코어 파워
- **핵심 팁**: 도끼질하듯 상단에서 대각선 아래로 코어 회전을 이용해 케이블을 당깁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CABLE ROTATIONAL WOODCHOPPER'
- Pose 1 (Left - Starting Position): Muscular male standing perpendicular to cable column, arms extended gripping single handle at high pulley position, hips pivoted.
- Pose 2 (Right - Finish Position): Rotating torso dynamically downward and across body past opposite knee in powerful diagonal woodchop sweep.
- Muscle Highlight: External Obliques, Internal Obliques, and Transverse Abdominis glowing bright red-orange.
- Equipment: Cable column with high-to-low pulley setup.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 10. 토르소 로테이션 머신 (Torso Rotation Machine) 
- **ID**: `torso-rotation-machine`
- **기구 분류**: pin_machine (로테이션 핀 머신)
- **타겟 부위**: 외복사근, 내복사근 (옆구리/허리 라인)
- **핵심 팁**: 상체를 고정하고 하체와 골반을 복사근 힘으로 회전시켜 옆구리 라인을 다듬습니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'TORSO ROTATION MACHINE'
- Pose 1 (Left - Starting Position): Muscular male seated in rotary torso machine, thighs locked between pads, chest pressed against upper rotating lever pad rotated 45 degrees.
- Pose 2 (Right - Finish Position): Twisting torso forcefully across to opposite side against selectorized resistance, rotating purely through abdominal core.
- Muscle Highlight: Internal and External Obliques glowing bright red-orange.
- Equipment: Commercial selectorized rotary torso pin machine.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 11. 로만체어 사이드 벤드 (Roman Chair Oblique Side Bend) 
- **ID**: `roman-chair-side-bend`
- **기구 분류**: bodyweight (45도 로만체어 (백익스텐션 벤치))
- **타겟 부위**: 외복사근, 요방형근 (옆구리 코어)
- **핵심 팁**: 옆으로 기대어 상체를 아래로 늘렸다가 옆구리 근육의 힘으로 일직선까지 올라옵니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'ROMAN CHAIR OBLIQUE SIDE BEND'
- Pose 1 (Left - Starting Position): Muscular male with hips locked sideways on 45-degree hyperextension bench, upper body lowered laterally toward floor in deep side stretch.
- Pose 2 (Right - Finish Position): Flexing lateral waist to pull torso upward past neutral into tight oblique side crunch, hands behind head.
- Muscle Highlight: External Obliques and Quadratus Lumborum glowing bright red-orange.
- Equipment: 45-degree hyperextension / Roman chair bench.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 12. 복근 롤아웃 (애브 슬라이더) (Ab Wheel Rollout) 
- **ID**: `ab-rollout`
- **기구 분류**: bodyweight (애브 휠 (복근 롤러))
- **타겟 부위**: 복직근 전체, 코어 신전 저항, 전거근
- **핵심 팁**: 허리가 꺾이지 않게 배를 둥글게 말아 힘을 준 상태로 굴려 나갔다 복근으로 당겨옵니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'AB WHEEL ROLLOUT'
- Pose 1 (Left - Starting Position): Muscular male kneeling on floor mat gripping dual handles of ab wheel directly beneath chest, core pre-braced.
- Pose 2 (Right - Finish Position): Rolling wheel straight forward extending body into long horizontal hollow plank hovering 5cm above floor, then pulling back through abs.
- Muscle Highlight: Rectus Abdominis, Transverse Abdominis, and Latissimus Dorsi glowing bright red-orange.
- Equipment: Dual-wheel ab roller and knee pad.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```


## 🏋️ 전신 (12종)

### 1. 데드리프트 (Conventional Barbell Deadlift) 
- **ID**: `deadlift`
- **기구 분류**: barbell (바벨 & 데드리프트 플랫폼)
- **타겟 부위**: 둔근, 햄스트링, 척추기립근, 등 전체
- **핵심 팁**: 바벨을 정강이에 밀착시키고 복압을 가득 채운 뒤 지면을 발바닥으로 밀어내며 일어섭니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CONVENTIONAL BARBELL DEADLIFT'
- Pose 1 (Left - Starting Position): Muscular male in starting deadlift stance: feet hip-width under bar, shins touching barbell, hips hinged back, flat spine, chest proud, double overhand grip.
- Pose 2 (Right - Finish Position): Standing tall at full lockout: driving through floor, hips fully extended, knees locked, shoulders pinned back, barbell resting against thighs.
- Muscle Highlight: Gluteus Maximus, Hamstrings, Erector Spinae, and Trapezius glowing bright red-orange.
- Equipment: Olympic barbell with heavy bumper plates on deadlift platform.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 2. 루마니안 데드리프트 (Barbell Romanian Deadlift (RDL)) 
- **ID**: `romanian-deadlift`
- **기구 분류**: barbell (바벨 & 파워 랙)
- **타겟 부위**: 햄스트링, 대둔근, 척추기립근
- **핵심 팁**: 무릎을 살짝만 굽히고 엉덩이를 뒤로 쭉 밀어 정강이 중간까지 내려가며 햄스트링을 늘립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL ROMANIAN DEADLIFT (RDL)'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding barbell at hip crease with overhand grip, shoulders retracted, knees soft.
- Pose 2 (Right - Finish Position): Hinging hips deeply backward with flat neutral spine, sliding barbell down thighs to mid-shin level, intense hamstring and glute stretch.
- Muscle Highlight: Hamstrings (full length) and Gluteus Maximus glowing bright red-orange.
- Equipment: Olympic barbell with bumper plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 3. 덤벨 루마니안 데드리프트 (Dumbbell Romanian Deadlift) 
- **ID**: `dumbbell-romanian-deadlift`
- **기구 분류**: dumbbell (덤벨)
- **타겟 부위**: 대둔근, 햄스트링 (고관절 힌지 집중)
- **핵심 팁**: 덤벨을 허벅지 앞면을 스치듯 내리며 엉덩이 아래쪽이 팽팽하게 늘어나는 자극에 집중하세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'DUMBBELL ROMANIAN DEADLIFT (DB RDL)'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding pair of heavy dumbbells in front of thighs, shoulders back, core braced.
- Pose 2 (Right - Finish Position): Pushing hips backward with slight knee bend, sliding dumbbells along shins to below knee level, maintaining flat back and loaded posterior chain.
- Muscle Highlight: Hamstrings and Gluteus Maximus glowing bright red-orange.
- Equipment: Pair of heavy dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 4. 스모 데드리프트 (Sumo Barbell Deadlift) 
- **ID**: `sumo-deadlift`
- **기구 분류**: barbell (바벨 & 플랫폼)
- **타겟 부위**: 내전근, 대둔근, 대퇴사두근, 척추기립근
- **핵심 팁**: 넓은 보폭과 고관절 외회전으로 상체를 세우고 바벨을 수직으로 뽑아 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SUMO BARBELL DEADLIFT'
- Pose 1 (Left - Starting Position): Muscular male in wide sumo stance near barbell plates with toes flared 45 degrees, upright torso, hands gripping bar inside knees.
- Pose 2 (Right - Finish Position): Driving floor away through heels, pushing knees out to lock out tall with hips driven fully forward against barbell.
- Muscle Highlight: Adductors, Gluteus Maximus, and Quadriceps glowing bright red-orange.
- Equipment: Olympic barbell with bumper plates in wide stance setup.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 5. 트랩바 데드리프트 (Trap Bar / Hex Bar Deadlift) 
- **ID**: `trap-bar-deadlift`
- **기구 분류**: barbell (헥스 바 (트랩바) & 원판)
- **타겟 부위**: 하체 전반, 둔근, 등 전체 (허리 부담 감소)
- **핵심 팁**: 무게중심이 몸 한가운데 위치해 허리 부상 위험 없이 안전하게 고중량을 뽑을 수 있습니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'TRAP BAR (HEX BAR) DEADLIFT'
- Pose 1 (Left - Starting Position): Muscular male standing inside hexagonal trap bar, gripping neutral handles, hips hinged down in balanced squat-deadlift posture with upright chest.
- Pose 2 (Right - Finish Position): Driving floor away to full standing lockout, shoulders back, neutral spine, weight centered over midfoot.
- Muscle Highlight: Quadriceps, Gluteus Maximus, and Trapezius glowing bright red-orange.
- Equipment: Olympic trap bar (hex bar) loaded with bumper plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 6. 랜드마인 프레스 (Standing Landmine Press) 
- **ID**: `landmine-press`
- **기구 분류**: barbell (바벨 랜드마인 스테이션)
- **타겟 부위**: 전면 삼각근, 윗가슴, 전거근, 코어
- **핵심 팁**: 사선 궤적으로 밀어 올려 어깨 충돌 없이 코어와 상체 협응력을 함께 기릅니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STANDING LANDMINE PRESS (UNILATERAL)'
- Pose 1 (Left - Starting Position): Muscular male standing in athletic split stance holding end of landmine barbell at shoulder height with one hand, elbow tucked.
- Pose 2 (Right - Finish Position): Pressing barbell diagonally upward and forward along pivot arc to full overhead arm extension, core braced against rotation.
- Muscle Highlight: Anterior Deltoid, Upper Pectoralis, and Core Obliques glowing bright red-orange.
- Equipment: Barbell anchored in landmine floor swivel base.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 7. 케틀벨 스윙 (Kettlebell Russian Swing) 
- **ID**: `kettlebell-swing`
- **기구 분류**: bodyweight (케틀벨)
- **타겟 부위**: 둔근 힌지 파워, 햄스트링, 코어, 심폐 지구력
- **핵심 팁**: 팔로 들지 말고 고관절을 접었다가 폭발적으로 펴는 엉덩이 탄력으로 케틀벨을 띄웁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'RUSSIAN KETTLEBELL SWING'
- Pose 1 (Left - Starting Position): Muscular male at bottom of hip hinge, hiking heavy cast-iron kettlebell back between thighs with flat spine and bent knees.
- Pose 2 (Right - Finish Position): Snapping hips explosively forward into full standing lockout, kettlebell floating weightlessly to chest/shoulder height.
- Muscle Highlight: Gluteus Maximus, Hamstrings, and Core glowing bright red-orange.
- Equipment: Heavy competition or cast-iron kettlebell.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 8. 케틀벨 고블릿 클린 앤 프레스 (Kettlebell Clean & Overhead Press) 
- **ID**: `kettlebell-clean-and-press`
- **기구 분류**: bodyweight (케틀벨)
- **타겟 부위**: 둔근, 어깨, 코어, 전신 협응력
- **핵심 팁**: 고관절 힘으로 케틀벨을 가슴 앞으로 감아올린(Clean) 뒤 머리 위로 힘차게 뻗습니다(Press).

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'KETTLEBELL CLEAN AND OVERHEAD PRESS'
- Pose 1 (Left - Starting Position): Muscular male holding kettlebell in tight front rack position against chest and shoulder, elbow resting on ribcage.
- Pose 2 (Right - Finish Position): Pressing kettlebell overhead into full vertical lockout with straight wrist and bicep beside ear, core braced.
- Muscle Highlight: Deltoids, Triceps, and Core Stabilizers glowing bright red-orange.
- Equipment: Competition kettlebell.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 9. 파워 클린 (Barbell Power Clean) 
- **ID**: `power-clean`
- **기구 분류**: barbell (바벨 & 범퍼 플레이트)
- **타겟 부위**: 순발력(파워), 둔근, 승모근, 전신 협응력
- **핵심 팁**: 발목·무릎·고관절의 삼중 신전(Triple Extension)으로 바벨을 띄워 쇄골 위에 빠르게 받아냅니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BARBELL POWER CLEAN'
- Pose 1 (Left - Starting Position): Muscular male in explosive second pull position extending hips, knees, and ankles with barbell accelerating past mid-thigh.
- Pose 2 (Right - Finish Position): Snapping elbows fast under bar to catch barbell across front deltoids in solid quarter-squat receiving position.
- Muscle Highlight: Trapezius, Hamstrings, Gluteus Maximus, and Quadriceps glowing bright red-orange.
- Equipment: Olympic barbell with bumper plates on lifting platform.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 10. 쓰러스터 (바벨/덤벨) (Barbell / Dumbbell Squat Thruster) 
- **ID**: `thruster`
- **기구 분류**: barbell (바벨 / 덤벨)
- **타겟 부위**: 대퇴사두근, 둔근, 삼각근, 극한의 심폐 지구력
- **핵심 팁**: 프론트 스쿼트로 앉았다가 일어나는 탄력을 그대로 이어 머리 위로 바벨/덤벨을 밀어 올립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SQUAT THRUSTER (BARBELL / DUMBBELL)'
- Pose 1 (Left - Starting Position): Muscular male at bottom of deep front squat holding barbell across clavicles in front rack position, chest proud.
- Pose 2 (Right - Finish Position): Exploding upward out of squat in one continuous motion, launching barbell directly into locked-out overhead press.
- Muscle Highlight: Quadriceps, Gluteus Maximus, Anterior Deltoids, and Triceps glowing bright red-orange.
- Equipment: Olympic barbell with bumper plates.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 11. 파머스 워크 (Farmers Walk / Heavy Carry) 
- **ID**: `farmers-walk`
- **기구 분류**: dumbbell (고중량 덤벨 / 케틀벨 / 트랩바)
- **타겟 부위**: 전완근(악력), 승모근, 코어 전체 안정성
- **핵심 팁**: 가슴을 펴고 어깨가 처지지 않게 고정한 채 무거운 덤벨을 들고 흔들림 없이 걸어갑니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'FARMER'S WALK (HEAVY CARRY)'
- Pose 1 (Left - Starting Position): Muscular male standing tall holding heavy dumbbells or farmer's carry handles at sides, chest proud, shoulders packed back.
- Pose 2 (Right - Finish Position): Taking controlled, powerful forward strides with heavy load, maintaining rock-solid upright posture and unyielding grip.
- Muscle Highlight: Forearms (Grip), Trapezius, Core/Obliques, and Calves glowing bright red-orange.
- Equipment: Pair of heavy farmer's walk handles or heavy dumbbells.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 12. 배틀 로프 (Battle Rope Waves) 
- **ID**: `battle-rope`
- **기구 분류**: bodyweight (배틀 로프 (헤비 로프))
- **타겟 부위**: 어깨, 코어, 전신 고강도 인터벌(HIIT)
- **핵심 팁**: 무릎을 살짝 굽힌 기마 자세에서 코어를 단단히 잡고 양팔로 로프 파동을 끝까지 보냅니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'BATTLE ROPE WAVES'
- Pose 1 (Left - Starting Position): Muscular male in athletic half-squat stance holding thick battle ropes in each hand, arms lowered preparing to whip.
- Pose 2 (Right - Finish Position): Vigorously whipping ropes up and down creating powerful rhythmic undulating waves traveling to anchor point, core braced.
- Muscle Highlight: Shoulders (Deltoids), Biceps, Core, and Cardiovascular System glowing bright red-orange.
- Equipment: Heavy thick poly-dacron battle ropes anchored to floor bracket.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```


## 🏋️ 유산소 (10종)

### 1. 무동력 트레드밀 (커브드 러닝) (Non-Motorized Curved Treadmill) 
- **ID**: `curved-treadmill`
- **기구 분류**: cardio (무동력 곡선형 트레드밀)
- **타겟 부위**: 햄스트링, 둔근 추진력, 고강도 스프린트
- **핵심 팁**: 일반 런닝머신 대비 칼로리 소모가 30% 높으며 앞꿈치로 트랙을 긁어내듯 달립니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CURVED MANUAL TREADMILL (NON-MOTORIZED)'
- Pose 1 (Left - Starting Position): Muscular male runner striking front curved incline of manual slat treadmill with ball of foot, accelerating cadence.
- Pose 2 (Right - Finish Position): High-speed sprinting gait driving curved belt backward with hamstrings and glutes under pure self-powered human propulsion.
- Muscle Highlight: Hamstrings, Gluteus Maximus, Quadriceps, and Calves glowing bright red-orange.
- Equipment: Non-motorized curved manual treadmill (Woodway / AssaultRunner style).
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 2. 리컴번트 바이크 (좌식 사이클) (Recumbent Seated Bike) 
- **ID**: `recumbent-bike`
- **기구 분류**: cardio (등받이 좌식 사이클 머신)
- **타겟 부위**: 허리/무릎 관절 무부하 하체 유산소
- **핵심 팁**: 넓은 등받이에 허리를 편안히 기대고 무릎과 척추 부담 없이 장시간 유산소를 수행합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'SEATED RECUMBENT BIKE'
- Pose 1 (Left - Starting Position): Muscular male seated in bucket seat with backrest, gripping side handlebars, one leg flexed at pedal ready to push.
- Pose 2 (Right - Finish Position): Driving alternate leg forward into full pedal stroke against magnetic flywheel resistance with steady cardio cadence.
- Muscle Highlight: Quadriceps, Hamstrings, and Gluteus Maximus glowing bright red-orange.
- Equipment: Commercial recumbent exercise bike with digital console.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 3. 천국의 계단 (스텝밀) (StairMaster / StepMill) 🔥 **오운완 14위**
- **ID**: `stairmaster`
- **기구 분류**: cardio (스텝밀 계단 머신)
- **타겟 부위**: 둔근, 햄스트링, 종아리, 심폐 강화
- **핵심 팁**: 손잡이에 상체 체중을 기대지 말고 발바닥 전체와 뒤꿈치로 계단을 밀어 올리며 힙을 자극하세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'STAIRMASTER / REVOLVING STAIRMILL'
- Pose 1 (Left - Starting Position): Muscular athletic male stepping up onto revolving staircase, driving through whole foot and heel with tall upright posture, light fingertip touch on rails.
- Pose 2 (Right - Finish Position): Dynamic continuous climbing stride driving through glutes and calves with rhythmic hip extension, chest lifted, steady cardio power.
- Muscle Highlight: Gluteus Maximus, Quadriceps, Hamstrings, and Calves glowing bright red-orange.
- Equipment: Commercial motorized revolving stairmill machine (StairMaster) with digital console.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 4. 버티컬 클라이머 (Vertical Climber / VersaClimber) 
- **ID**: `vertical-climber`
- **기구 분류**: cardio (수직 클라이밍 머신)
- **타겟 부위**: 전신 고강도 칼로리 연소, 코어, 하체
- **핵심 팁**: 암벽 등반하듯 팔과 다리를 교차로 뻗으며 짧은 시간 안에 최대 심박수에 도달합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'VERTICAL CLIMBER (VERSACLIMBER)'
- Pose 1 (Left - Starting Position): Muscular male standing on vertical climber pedals holding moving handles in cross-crawl start (right hand high, left foot low).
- Pose 2 (Right - Finish Position): Driving right arm down while driving left knee high in powerful vertical total-body climbing stroke with upright core.
- Muscle Highlight: Latissimus Dorsi, Deltoids, Core, Quadriceps, and Calves glowing bright red-orange.
- Equipment: Commercial 75-degree angled vertical climbing machine (VersaClimber).
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 5. 아크 트레이너 (Cybex Arc Trainer) 
- **ID**: `arc-trainer`
- **기구 분류**: cardio (아크 트레이너 머신)
- **타겟 부위**: 관절 무부하 힙업 & 폭발적 칼로리 연소
- **핵심 팁**: 발을 아치 형태로 굴려 무릎 통증 없이 엉덩이와 허벅지를 집중적으로 태웁니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CYBEX ARC TRAINER'
- Pose 1 (Left - Starting Position): Muscular male standing on curved arc footplates holding dual action handles, footplate gliding at top of gentle arc.
- Pose 2 (Right - Finish Position): Driving opposite footplate backward along reverse arc glide path while pushing alternate handle forward, zero knee impact.
- Muscle Highlight: Quadriceps, Gluteus Maximus, and Hamstrings glowing bright red-orange.
- Equipment: Commercial Cybex Arc Trainer with digital console.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 6. 스키에르그 (Concept2 SkiErg) 
- **ID**: `skierg`
- **기구 분류**: cardio (스키에르그 에어 머신)
- **타겟 부위**: 광배근, 삼두근, 복근 코어, 전신 인터벌
- **핵심 팁**: 크로스컨트리 스키를 타듯 복근과 광배근을 접으며 핸들을 아래로 강하게 찍어 누릅니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CONCEPT2 SKIERG (SKI ERGOMETER)'
- Pose 1 (Left - Starting Position): Muscular male standing tall facing SkiErg with arms reaching high overhead gripping drive handles, heels slightly elevated.
- Pose 2 (Right - Finish Position): Driving handles powerfully downward and past hips while hinging hips and flexing core into deep ski-pole finish posture.
- Muscle Highlight: Latissimus Dorsi, Triceps, Rectus Abdominis, and Hip Flexors glowing bright red-orange.
- Equipment: Concept2 SkiErg wall-mounted machine with flywheel.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 7. 에어바이크 (Assault / Rogue AirBike) 
- **ID**: `airbike`
- **기구 분류**: cardio (에어바이크 팬 머신)
- **타겟 부위**: 상하체 복합 극한의 타바타/인터벌 유산소
- **핵심 팁**: 페달을 강하게 밟을수록 팬 공기 저항이 기하급수적으로 커지는 하이록스/크로스핏 필수 머신입니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'ASSAULT AIRBIKE / FAN BIKE'
- Pose 1 (Left - Starting Position): Muscular male seated on AirBike pushing right handlebar forward and driving right pedal down against air fan resistance.
- Pose 2 (Right - Finish Position): Explosive reciprocal push-pull of dual handles while furiously pedaling large front steel fan wheel in high-intensity sprint.
- Muscle Highlight: Full Body (Chest, Upper Back, Shoulders, Quadriceps, Hamstrings) glowing bright red-orange.
- Equipment: Assault AirBike / Rogue Echo Bike with large front fan wheel.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 8. 일립티컬 (Elliptical Cross Trainer) 
- **ID**: `elliptical`
- **기구 분류**: cardio (일립티컬 크로스 트레이너)
- **타겟 부위**: 무릎 관절 무부하 전신 유산소
- **핵심 팁**: 뒤꿈치를 페달에 붙이고 상하체 핸들을 함께 밀고 당기며 리드미컬하게 수행합니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'ELLIPTICAL CROSS TRAINER'
- Pose 1 (Left - Starting Position): Muscular male standing on elliptical footplates holding moving hand levers, gliding into forward stride.
- Pose 2 (Right - Finish Position): Smooth continuous elliptical pedal stroke with alternate arm pushing handle forward, fluid low-impact cardio gait.
- Muscle Highlight: Gluteus Maximus, Quadriceps, Hamstrings, and Upper Body glowing bright red-orange.
- Equipment: Commercial elliptical cross trainer with console.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 9. 로잉머신 (Concept2 Rowing Machine) 
- **ID**: `rowing-machine`
- **기구 분류**: cardio (로잉 머신 (조정 에르고미터))
- **타겟 부위**: 전신 유산소 (하체 60%, 등/코어 40%)
- **핵심 팁**: 다리로 먼저 밀고, 상체를 살짝 뒤로 젖힌 후, 마지막에 명치로 핸들을 당기는 순서를 지키세요.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'CONCEPT2 ROWING ERGOMETER'
- Pose 1 (Left - Starting Position): Muscular male at 'Catch' position: shins vertical, knees flexed, arms extended forward holding handle, torso leaned forward 10 degrees.
- Pose 2 (Right - Finish Position): Muscular male at 'Finish' position: legs fully extended, hips hinged back 100 degrees, handle pulled smoothly into lower ribs.
- Muscle Highlight: Latissimus Dorsi, Rhomboids, Quadriceps, Gluteus Maximus, and Biceps glowing bright red-orange.
- Equipment: Concept2 indoor rower ergometer with PM5 monitor.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

### 10. 박스 점프 (플라이오 박스) (Plyometric Box Jump) 
- **ID**: `box-jump`
- **기구 분류**: bodyweight (플라이오메트릭 점프 박스)
- **타겟 부위**: 하체 순발력, 둔근, 심폐 민첩성
- **핵심 팁**: 팔 스윙과 고관절 반동을 이용해 박스 중앙에 사뿐히 착지한 뒤 무릎을 펴고 일어섭니다.

```text
Generate a 2-stage workout exercise illustration diagram:
- Title: 'PLYOMETRIC BOX JUMP'
- Pose 1 (Left - Starting Position): Muscular male standing before sturdy wooden plyo box in athletic quarter-squat loading posture, arms swung back ready to explode.
- Pose 2 (Right - Finish Position): Landing softly on top of plyometric box with both feet flat in athletic quarter-squat, chest proud, standing tall to full extension.
- Muscle Highlight: Quadriceps, Gluteus Maximus, and Gastrocnemius (Calves) glowing bright red-orange.
- Equipment: Heavy-duty 24-inch wooden plyometric jump box.
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.
```

