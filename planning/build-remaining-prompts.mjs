import { readFileSync, writeFileSync } from 'node:fs';

const encCode = readFileSync('equipment-encyclopedia.js', 'utf8');
const window = {};
eval(encCode);
const catalog = window.EQUIPMENT_CATALOG;

// Precise biomechanical definitions for the 80 remaining exercises
const promptSpecs = {
  // ==========================================
  // 하체 (Legs - 26종)
  // ==========================================
  "squat": {
    title: "BARBELL BACK SQUAT",
    pose1: "Muscular athletic male standing tall in rack with Olympic barbell secured across upper trapezius, feet shoulder-width apart, chest proud, core braced.",
    pose2: "Deep parallel back squat with hips sank below knee crease, knees tracking outward over toes, flat neutral spine, eyes forward.",
    muscles: "Quadriceps, Gluteus Maximus, and Hamstrings glowing bright red-orange.",
    equipment: "Commercial power rack with barbell and Olympic bumper plates."
  },
  "front-squat": {
    title: "BARBELL FRONT SQUAT",
    pose1: "Muscular male standing with Olympic barbell resting across anterior deltoids and clavicles in clean front-rack grip, elbows pointing high and forward.",
    pose2: "Deep squat with completely upright vertical torso, hips deep between thighs, knees forward over toes, elbows kept elevated high.",
    muscles: "Quadriceps (Vastus Medialis/Lateralis) and Rectus Abdominis core glowing bright red-orange.",
    equipment: "Power rack with barbell in front rack position."
  },
  "wide-squat": {
    title: "WIDE-STANCE SUMO SQUAT",
    pose1: "Muscular male standing in wide sumo stance (1.5x shoulder width) with toes flared outward at 45 degrees, holding heavy dumbbell or barbell vertically.",
    pose2: "Deep wide squat sinking hips straight down, knees pushed forcefully wide outward over toes, deep groin and inner thigh adductor stretch.",
    muscles: "Adductor Magnus/Longus (Inner Thighs) and Gluteus Maximus glowing bright red-orange.",
    equipment: "Heavy dumbbell or Olympic barbell in wide sumo setup."
  },
  "goblet-squat": {
    title: "GOBLET SQUAT",
    pose1: "Muscular male standing tall holding a heavy dumbbell or kettlebell cupped in both hands vertically against upper chest under chin.",
    pose2: "Deep bottom squat sitting down between hips, elbows tracking cleanly inside knees, upright vertical spine, flat feet.",
    muscles: "Quadriceps and Gluteus Maximus glowing bright red-orange.",
    equipment: "Heavy dumbbell held vertically by top bell against sternum."
  },
  "sissy-squat": {
    title: "SISSY SQUAT",
    pose1: "Muscular male standing upright on sissy squat bench with calves firmly locked against padded back rollers and feet secured under toe bar.",
    pose2: "Leaning rigid torso and hips backward at 45 degrees while flexing knees forward to 90 degrees, extreme isolated stretch across front thighs.",
    muscles: "Rectus Femoris and Quadriceps glowing intense bright red-orange.",
    equipment: "Commercial sissy squat bench station with calf pads and footplate."
  },
  "smith-machine-squat": {
    title: "SMITH MACHINE SQUAT",
    pose1: "Muscular male standing with barbell of Smith machine across upper traps, feet placed slightly forward of bar plane for quad emphasis.",
    pose2: "Deep squat descending along fixed vertical guide rails, torso supported upright by track, hips sinking parallel to floor.",
    muscles: "Quadriceps and Gluteus Maximus glowing bright red-orange.",
    equipment: "Commercial Smith machine with vertical guide rails and safety catches."
  },
  "v-squat": {
    title: "V-SQUAT MACHINE",
    pose1: "Muscular male at bottom of curved V-squat movement, shoulders braced under padded bars, hips hinged deep into full squat with thighs parallel to platform.",
    pose2: "Pressing upward along curved natural arc through heels into tall standing lockout, glutes and quads fully engaged.",
    muscles: "Quadriceps, Gluteus Maximus, and Hamstrings glowing bright red-orange.",
    equipment: "Plate-loaded V-squat machine with curved pivot arm and heavy Olympic plates."
  },
  "pendulum-squat": {
    title: "PENDULUM SQUAT",
    pose1: "Muscular male standing locked on counterbalanced pendulum squat machine, shoulders braced under curved pads, feet on angled footplate.",
    pose2: "Sinking into deep full squat along pendulum swinging pivot arc, extreme knee flexion delivering maximum isolated tension directly into quadriceps.",
    muscles: "Vastus Lateralis, Vastus Medialis (Teardrop), and Rectus Femoris glowing bright red-orange.",
    equipment: "Commercial pendulum squat machine with counterweighted swing arm and Olympic plates."
  },
  "belt-squat": {
    title: "BELT SQUAT MACHINE",
    pose1: "Muscular male standing upright on split foot platforms with heavy duty dip belt slung around hips connected to lower pivot cable, zero spinal compression.",
    pose2: "Deep squat with vertical torso, hands holding front support rail, hips sinking low between platforms against pure lower-body resistance.",
    muscles: "Quadriceps and Gluteus Maximus glowing bright red-orange.",
    equipment: "Commercial belt squat platform machine with waist harness belt."
  },
  "horizontal-leg-press": {
    title: "SEATED HORIZONTAL PIN LEG PRESS",
    pose1: "Muscular male seated in horizontal carriage, knees bent at 90 degrees with feet flat against vertical footplate, selectorized pin weight stack.",
    pose2: "Forcefully pressing seat carriage horizontally backward away from footplate into full leg extension without hyperextending knees.",
    muscles: "Quadriceps and Gluteus Maximus glowing bright red-orange.",
    equipment: "Selectorized horizontal seated pin leg press machine with backrest."
  },
  "single-leg-press": {
    title: "SINGLE-LEG PRESS (UNILATERAL)",
    pose1: "Muscular male seated on 45-degree leg press with one foot centered on plate, knee bent deep towards shoulder at 90 degrees, opposite foot resting off sled.",
    pose2: "Pressing heavy sled upward unilaterally through heel into full single-leg extension, peak quad and glute stability.",
    muscles: "Quadriceps and Gluteus Medius/Maximus of working leg glowing bright red-orange.",
    equipment: "45-degree plate-loaded sled leg press."
  },
  "standing-leg-curl": {
    title: "STANDING SINGLE-LEG CURL",
    pose1: "Muscular male standing facing machine, chest against angled pad, working leg extended down with roller pad resting behind Achilles tendon.",
    pose2: "Curling working heel upward and backward toward glutes into peak hamstring contraction against lever resistance, hips pinned forward.",
    muscles: "Biceps Femoris and Semitendinosus (Hamstrings) glowing bright red-orange.",
    equipment: "Commercial selectorized standing single leg curl machine."
  },
  "glute-ham-raise": {
    title: "GLUTE HAM RAISE (GHR / GHD)",
    pose1: "Muscular male with thighs on rounded pad and feet locked between ankle rollers, torso hinged vertically down 90 degrees at hips.",
    pose2: "Pulling torso up horizontally in line with thighs and bending knees to pull whole body upright using pure hamstring and glute contraction.",
    muscles: "Hamstrings (full length), Gluteus Maximus, and Gastrocnemius glowing bright red-orange.",
    equipment: "Commercial GHD / Glute Ham Developer bench."
  },
  "hip-thrust": {
    title: "BARBELL HIP THRUST",
    pose1: "Muscular male with upper back rested against cross bench, hips dipped low toward floor with padded barbell resting across hip crease.",
    pose2: "Driving hips explosively upward into full horizontal tabletop extension, knees at 90 degrees, vertical shins, crushing glutes at lockout.",
    muscles: "Gluteus Maximus glowing intense bright red-orange.",
    equipment: "Hip thrust bench with barbell, thick foam barbell pad, and bumper plates."
  },
  "booty-builder-hip-thrust": {
    title: "BOOTY BUILDER / HIP THRUST MACHINE",
    pose1: "Muscular male seated in dedicated hip thrust machine with wide padded seatbelt strapped across pelvis, hips lowered in starting dip.",
    pose2: "Driving hips upward against padded seatbelt harness into full locked-out hip extension, upper torso stabilized on backrest.",
    muscles: "Gluteus Maximus and Upper Glutes glowing bright red-orange.",
    equipment: "Selectorized Booty Builder hip thrust machine with padded waist belt."
  },
  "glute-kickback-machine": {
    title: "GLUTE KICKBACK MACHINE",
    pose1: "Muscular male leaning forward with chest and forearms on padded supports, working knee flexed forward ready to push.",
    pose2: "Kicking working leg forcefully backward and upward against circular footpad until leg and hip reach full extension in peak glute squeeze.",
    muscles: "Gluteus Maximus glowing bright red-orange.",
    equipment: "Commercial selectorized rear glute kickback machine."
  },
  "cable-glute-kickback": {
    title: "CABLE GLUTE KICKBACK",
    pose1: "Muscular male facing low cable pulley with ankle strap attached, leaning slightly forward holding machine frame, working leg brought forward.",
    pose2: "Kicking working leg straight backward and slightly diagonally outward into full hip extension, squeezing glute hard at peak.",
    muscles: "Gluteus Maximus and Gluteus Medius glowing bright red-orange.",
    equipment: "Cable column station with ankle cuff attachment at lowest pulley."
  },
  "cable-hip-abduction": {
    title: "CABLE STANDING HIP ABDUCTION",
    pose1: "Muscular male standing sideways to low cable column, ankle cuff on outer leg with cable running in front of supporting leg, holding machine upright.",
    pose2: "Sweeping working leg laterally outward and upward away from body against cable resistance into wide abduction.",
    muscles: "Gluteus Medius and Tensor Fasciae Latae (TFL) glowing bright red-orange.",
    equipment: "Cable machine with low pulley and padded ankle strap."
  },
  "lunge": {
    title: "DUMBBELL WALKING / STATIC LUNGE",
    pose1: "Muscular male standing tall holding heavy pair of dumbbells at sides, initiating forward split stride.",
    pose2: "Deep lunging bottom position with front thigh parallel to floor (90° knee bend) and trailing knee hovering 2cm above floor, torso tall and upright.",
    muscles: "Quadriceps and Gluteus Maximus glowing bright red-orange.",
    equipment: "Pair of heavy hexagonal or round dumbbells."
  },
  "reverse-lunge": {
    title: "DUMBBELL REVERSE LUNGE",
    pose1: "Muscular male standing tall holding dumbbells at sides, feet hip-width apart.",
    pose2: "Stepping one leg backward into deep lunge, front knee bent at 90 degrees absorbing load through front heel, back knee hovering near floor, upright spine.",
    muscles: "Gluteus Maximus and Front Quadriceps glowing bright red-orange.",
    equipment: "Pair of dumbbells held at sides."
  },
  "bulgarian-split-squat": {
    title: "BULGARIAN SPLIT SQUAT (REAR-FOOT ELEVATED)",
    pose1: "Muscular male with rear foot laces resting on flat bench behind him, standing upright on forward working leg holding dumbbells.",
    pose2: "Sinking deeply down until front thigh is parallel to floor, front knee tracked over midfoot, back knee dipping toward ground in extreme single-leg load.",
    muscles: "Gluteus Maximus, Quadriceps, and Adductor Magnus glowing bright red-orange.",
    equipment: "Flat gym bench and pair of dumbbells."
  },
  "step-up": {
    title: "DUMBBELL BOX STEP-UP",
    pose1: "Muscular male standing before high wooden plyo box or flat bench, one foot planted firmly on top, holding dumbbells at sides.",
    pose2: "Driving forcefully through top foot and heel to stand atop box with full hip and knee lockout, trailing knee driven forward in athletic finish.",
    muscles: "Gluteus Maximus and Quadriceps glowing bright red-orange.",
    equipment: "Sturdy wooden plyo box (20-24 inch) and pair of dumbbells."
  },
  "calf-raise": {
    title: "STANDING CALF RAISE (BLOCK / LEG PRESS)",
    pose1: "Muscular male standing with balls of feet on edge of raised block, heels dropped low below platform level into deep Achilles and calf stretch.",
    pose2: "Exploding high onto tiptoes and balls of feet into full plantarflexion, peak contraction squeezing calves tight.",
    muscles: "Gastrocnemius (Medial & Lateral Heads) glowing bright red-orange.",
    equipment: "Raised calf block platform."
  },
  "standing-calf-raise": {
    title: "STANDING CALF RAISE MACHINE",
    pose1: "Muscular male standing on machine platform, shoulder pads resting on traps with full weight stack engaged, heels dropped deep below footplate.",
    pose2: "Pushing upward onto balls of feet into maximum calf lockout, knees kept straight with slight micro-bend.",
    muscles: "Gastrocnemius and Soleus glowing bright red-orange.",
    equipment: "Selectorized standing calf raise machine with shoulder pads."
  },
  "seated-calf-raise": {
    title: "SEATED CALF RAISE MACHINE",
    pose1: "Muscular male seated upright with knees bent at 90 degrees under padded thigh lever, balls of feet on block, heels dropped down in full stretch.",
    pose2: "Pressing balls of feet down to raise heels high against padded lever resistance in deep soleus contraction.",
    muscles: "Soleus (Deep Calf Muscle) glowing bright red-orange.",
    equipment: "Plate-loaded seated calf raise machine with knee pads."
  },
  "barbell-good-morning": {
    title: "BARBELL GOOD MORNING",
    pose1: "Muscular male standing tall with Olympic barbell resting across upper traps, feet hip-width, knees soft.",
    pose2: "Hinging hips deeply backward with flat neutral spine until torso reaches near-parallel to floor, deep hamstring and posterior chain stretch.",
    muscles: "Hamstrings, Gluteus Maximus, and Erector Spinae glowing bright red-orange.",
    equipment: "Olympic barbell across upper back."
  },

  // ==========================================
  // 어깨 (Shoulder - 20종)
  // ==========================================
  "smith-machine-shoulder-press": {
    title: "SMITH MACHINE SEATED SHOULDER PRESS",
    pose1: "Muscular male seated on 85-degree upright bench inside Smith machine, gripping bar at chin/collarbone level with forearms vertical.",
    pose2: "Pressing bar smoothly upward along fixed vertical track into full overhead lockout above head, shoulders fully engaged.",
    muscles: "Anterior Deltoid, Lateral Deltoid, and Triceps glowing bright red-orange.",
    equipment: "Smith machine with adjustable incline bench set to 85 degrees."
  },
  "behind-the-neck-press": {
    title: "BEHIND-THE-NECK BARBELL PRESS",
    pose1: "Muscular male seated upright with barbell lowered carefully behind head across upper neck/trapezius level, wide overhand grip.",
    pose2: "Pressing barbell vertically overhead until arms reach full extension directly over crown of head.",
    muscles: "Lateral Deltoid and Posterior Deltoid glowing bright red-orange.",
    equipment: "Barbell with Olympic plates and seated upright bench."
  },
  "dumbbell-shoulder-press": {
    title: "SEATED DUMBBELL SHOULDER PRESS",
    pose1: "Muscular male seated upright with back supported, dumbbells held at ear level with palms facing forward, elbows at 90 degrees.",
    pose2: "Pressing dumbbells overhead in gentle converging arc until weights nearly touch overhead at lockout, core braced.",
    muscles: "Anterior Deltoid and Lateral Deltoid glowing bright red-orange.",
    equipment: "Adjustable gym bench set to 85 degrees and heavy dumbbells."
  },
  "shoulder-press-machine": {
    title: "SEATED SHOULDER PRESS MACHINE",
    pose1: "Muscular male seated in selectorized shoulder press machine, hands gripping handles at shoulder level, chest proud against backrest.",
    pose2: "Pressing machine handles upward to full overhead extension in controlled arc, locking out shoulders at top.",
    muscles: "Anterior Deltoid and Lateral Deltoid glowing bright red-orange.",
    equipment: "Commercial selectorized seated shoulder press machine."
  },
  "hammer-shoulder-press": {
    title: "HAMMER STRENGTH ISO-LATERAL SHOULDER PRESS",
    pose1: "Muscular male seated on plate-loaded hammer machine, gripping independent converging handles at collarbone height.",
    pose2: "Pressing handles upward along natural converging arc overhead, peak shoulder contraction at lockout.",
    muscles: "Anterior Deltoid and Lateral Deltoid glowing bright red-orange.",
    equipment: "Hammer Strength plate-loaded ISO-lateral shoulder press machine."
  },
  "arnold-press": {
    title: "ARNOLD DUMBBELL PRESS",
    pose1: "Muscular male seated holding dumbbells in front of upper chest with palms facing body (supinated) and elbows tucked close.",
    pose2: "Rotating wrists outward 180 degrees while pressing dumbbells overhead in continuous motion, finishing with palms facing forward at lockout.",
    muscles: "Anterior, Lateral, and Posterior Deltoids glowing bright red-orange.",
    equipment: "Seated upright bench and pair of dumbbells."
  },
  "side-lateral-raise": {
    title: "DUMBBELL SIDE LATERAL RAISE",
    pose1: "Muscular male standing tall with dumbbells held at sides of thighs, palms facing inward, slight forward torso lean, elbows slightly bent.",
    pose2: "Raising dumbbells laterally outward and upward like wings until elbows and weights are level with shoulders parallel to floor.",
    muscles: "Lateral Deltoid (Middle Shoulder) glowing intense bright red-orange.",
    equipment: "Pair of dumbbells."
  },
  "lateral-raise-machine": {
    title: "SEATED LATERAL RAISE MACHINE",
    pose1: "Muscular male seated in machine with chest against chest pad, outer elbows resting against padded lever arms at sides.",
    pose2: "Raising padded lever arms laterally upward until upper arms reach horizontal parallel to floor, isolated side delt squeeze.",
    muscles: "Lateral Deltoid glowing bright red-orange.",
    equipment: "Commercial selectorized lateral raise machine with elbow pads."
  },
  "cable-side-lateral-raise": {
    title: "CABLE SIDE LATERAL RAISE",
    pose1: "Muscular male standing sideways to low cable column, gripping D-handle with outside hand, cable running behind or in front of hips.",
    pose2: "Raising cable handle laterally outward and upward to shoulder height, maintaining constant cable tension throughout arc.",
    muscles: "Lateral Deltoid glowing bright red-orange.",
    equipment: "Cable column with low pulley and single stirrup handle."
  },
  "cable-y-raise": {
    title: "CABLE DUAL Y-RAISE",
    pose1: "Muscular male standing in center of dual cable crossover with pulleys set at hip/knee height, cables crossed with hands holding opposite cables.",
    pose2: "Raising arms diagonally upward and outward into a wide overhead 'Y' shape, peak contraction across side and rear delts.",
    muscles: "Lateral Deltoid, Lower Trapezius, and Posterior Deltoid glowing bright red-orange.",
    equipment: "Dual cable crossover column with pulleys at mid-low height."
  },
  "front-raise": {
    title: "DUMBBELL / BARBELL FRONT RAISE",
    pose1: "Muscular male standing tall with dumbbells or barbell resting in front of thighs with overhand pronated grip, core braced.",
    pose2: "Lifting weight straight forward and upward with slight elbow micro-bend until arms are parallel to floor at eye level.",
    muscles: "Anterior Deltoid (Front Shoulder) glowing bright red-orange.",
    equipment: "Pair of dumbbells or straight barbell."
  },
  "plate-front-raise": {
    title: "WEIGHT PLATE FRONT RAISE",
    pose1: "Muscular male standing tall gripping Olympic 20kg weight plate at 9 o'clock and 3 o'clock positions in front of thighs.",
    pose2: "Raising weight plate straight forward and upward with locked arms until center hole of plate reaches eye level.",
    muscles: "Anterior Deltoid and Upper Chest glowing bright red-orange.",
    equipment: "Olympic 20kg cast iron or bumper plate."
  },
  "cable-front-raise": {
    title: "CABLE FRONT RAISE",
    pose1: "Muscular male straddling low cable pulley facing away from column, holding straight bar or rope attachment between legs with arms extended down.",
    pose2: "Raising cable attachment straight forward and upward to shoulder height against constant continuous cable resistance.",
    muscles: "Anterior Deltoid glowing bright red-orange.",
    equipment: "Low cable pulley with straight bar or rope attachment."
  },
  "face-pull": {
    title: "CABLE ROPE FACE PULL",
    pose1: "Muscular male standing facing high cable pulley holding rope attachment with thumbs pointing backward, arms fully extended forward.",
    pose2: "Pulling rope directly toward bridge of nose and forehead, flaring elbows wide and rotating shoulders back into double biceps external rotation.",
    muscles: "Posterior Deltoid, Infraspinatus, Rhomboids, and Upper Trapezius glowing bright red-orange.",
    equipment: "High cable pulley with long triceps rope attachment."
  },
  "bent-over-lateral-raise": {
    title: "BENT-OVER DUMBBELL REAR DELT RAISE",
    pose1: "Muscular male standing with hips hinged forward 60-70 degrees, flat neutral spine, dumbbells hanging straight down beneath chest.",
    pose2: "Raising dumbbells laterally outward and backward leading with elbows until weights reach shoulder level in rear delt squeeze.",
    muscles: "Posterior Deltoid (Rear Shoulder) and Rhomboids glowing bright red-orange.",
    equipment: "Pair of dumbbells."
  },
  "cable-rear-delt-fly": {
    title: "HIGH CABLE REVERSE CROSSOVER FLY",
    pose1: "Muscular male standing in center of dual cable crossover, pulleys at eye level without handles, holding opposite cable carabiners crossed in front of face.",
    pose2: "Pulling cables horizontally apart and backward in wide reverse fly arc until hands are back in line with torso.",
    muscles: "Posterior Deltoid and Middle Trapezius glowing bright red-orange.",
    equipment: "Dual cable column station at eye height."
  },
  "barbell-upright-row": {
    title: "BARBELL UPRIGHT ROW",
    pose1: "Muscular male standing tall holding Olympic barbell with shoulder-width overhand grip in front of thighs.",
    pose2: "Pulling barbell vertically straight up along torso, leading with high flared elbows until bar reaches mid-chest level.",
    muscles: "Lateral Deltoid and Upper Trapezius glowing bright red-orange.",
    equipment: "Olympic barbell with plates."
  },
  "dumbbell-upright-row": {
    title: "DUMBBELL UPRIGHT ROW",
    pose1: "Muscular male standing tall holding pair of dumbbells across front of thighs, palms facing backward.",
    pose2: "Pulling dumbbells vertically upward along torso line, elbows leading high and wide above hands at upper chest height.",
    muscles: "Lateral Deltoid and Upper Trapezius glowing bright red-orange.",
    equipment: "Pair of dumbbells."
  },
  "shrug": {
    title: "BARBELL / SMITH MACHINE SHRUG",
    pose1: "Muscular male standing upright holding heavy barbell in front of thighs with arms completely straight, shoulders relaxed and depressed.",
    pose2: "Elevating shoulders straight up toward ears in maximum vertical shrug contraction without rolling shoulders, pausing at top.",
    muscles: "Upper Trapezius glowing intense bright red-orange.",
    equipment: "Olympic barbell or Smith machine loaded with heavy plates."
  },
  "dumbbell-shrug": {
    title: "STANDING DUMBBELL SHRUG",
    pose1: "Muscular male standing tall holding heavy pair of dumbbells at sides of thighs, arms straight, shoulders hanging down.",
    pose2: "Shrugging shoulders straight upward toward ears in powerful vertical contraction, crushing upper traps at peak.",
    muscles: "Upper Trapezius glowing bright red-orange.",
    equipment: "Pair of heavy dumbbells."
  },

  // ==========================================
  // 복근/코어 (Abs/Core - 12종)
  // ==========================================
  "plank": {
    title: "STANDARD FOREARM PLANK",
    pose1: "Muscular male setting up in prone position on exercise mat, forearms on floor with elbows directly under shoulders, toes planted.",
    pose2: "Lifting body into rigid straight-line plank from head to heels, neutral neck, glutes squeezed, intense abdominal hollow bracing.",
    muscles: "Rectus Abdominis and Transverse Abdominis glowing bright red-orange.",
    equipment: "High-density exercise floor mat."
  },
  "side-plank": {
    title: "SIDE PLANK (OBLIQUE BRACE)",
    pose1: "Muscular male lying on side supported on single forearm with feet stacked, hips resting on mat.",
    pose2: "Lifting hips off floor until body forms rigid diagonal line from head to feet, top arm extended vertically upward.",
    muscles: "Internal and External Obliques and Quadratus Lumborum glowing bright red-orange.",
    equipment: "Exercise floor mat."
  },
  "crunch": {
    title: "ABDOMINAL FLOOR CRUNCH",
    pose1: "Muscular male lying supine on floor mat with knees bent at 90 degrees, feet flat, fingertips touching temples, lower back pressed down.",
    pose2: "Curling ribcage toward pelvis, lifting shoulder blades 3-4 inches off floor in tight abdominal contraction, lower back remaining flat on mat.",
    muscles: "Upper Rectus Abdominis glowing bright red-orange.",
    equipment: "Exercise floor mat."
  },
  "decline-sit-up": {
    title: "DECLINE BENCH SIT-UP",
    pose1: "Muscular male on 30-degree decline bench with shins locked under padded rollers, torso reclined along bench with hands at head.",
    pose2: "Flexing abs powerfully to sit all the way up until torso is perpendicular to floor in full abdominal squeeze.",
    muscles: "Rectus Abdominis and Iliopsoas glowing bright red-orange.",
    equipment: "Commercial decline sit-up bench with foot rollers."
  },
  "bench-leg-raise": {
    title: "FLAT BENCH LYING LEG RAISE",
    pose1: "Muscular male lying flat on gym bench gripping edge beside head, legs extended straight hovering horizontally off bench.",
    pose2: "Raising straight legs upward to 90-degree vertical angle and slightly tilting pelvis off bench in peak lower ab contraction.",
    muscles: "Lower Rectus Abdominis and Hip Flexors glowing bright red-orange.",
    equipment: "Flat gym bench."
  },
  "hanging-leg-raise": {
    title: "HANGING STRAIGHT LEG RAISE",
    pose1: "Muscular male hanging from pull-up bar with straight arms and overhead grip, body hanging still without swinging.",
    pose2: "Flexing core and hips to raise straight legs horizontally to 90 degrees (or toes to bar) with posterior pelvic tilt.",
    muscles: "Lower Rectus Abdominis and Hip Flexors glowing bright red-orange.",
    equipment: "Overhead pull-up bar."
  },
  "hanging-knee-raise": {
    title: "CAPTAIN'S CHAIR / HANGING KNEE RAISE",
    pose1: "Muscular male supported on forearms in captain's chair tower with back against pad, legs hanging down relaxed.",
    pose2: "Curling knees up toward chest, curling pelvis forward and rounding lower spine to intensely contract abdominal wall.",
    muscles: "Rectus Abdominis glowing bright red-orange.",
    equipment: "Captain's chair / Roman chair vertical knee raise station."
  },
  "cable-crunch": {
    title: "KNEELING CABLE ROPE CRUNCH",
    pose1: "Muscular male kneeling facing high cable pulley holding rope attachment handles at sides of ears, hips high and stationary.",
    pose2: "Curling thoracic spine downward bringing elbows down toward knees, rounding back into maximum abdominal crunch without moving hips.",
    muscles: "Rectus Abdominis glowing intense bright red-orange.",
    equipment: "High cable pulley with triceps rope attachment."
  },
  "cable-woodchopper": {
    title: "CABLE ROTATIONAL WOODCHOPPER",
    pose1: "Muscular male standing perpendicular to cable column, arms extended gripping single handle at high pulley position, hips pivoted.",
    pose2: "Rotating torso dynamically downward and across body past opposite knee in powerful diagonal woodchop sweep.",
    muscles: "External Obliques, Internal Obliques, and Transverse Abdominis glowing bright red-orange.",
    equipment: "Cable column with high-to-low pulley setup."
  },
  "torso-rotation-machine": {
    title: "TORSO ROTATION MACHINE",
    pose1: "Muscular male seated in rotary torso machine, thighs locked between pads, chest pressed against upper rotating lever pad rotated 45 degrees.",
    pose2: "Twisting torso forcefully across to opposite side against selectorized resistance, rotating purely through abdominal core.",
    muscles: "Internal and External Obliques glowing bright red-orange.",
    equipment: "Commercial selectorized rotary torso pin machine."
  },
  "roman-chair-side-bend": {
    title: "ROMAN CHAIR OBLIQUE SIDE BEND",
    pose1: "Muscular male with hips locked sideways on 45-degree hyperextension bench, upper body lowered laterally toward floor in deep side stretch.",
    pose2: "Flexing lateral waist to pull torso upward past neutral into tight oblique side crunch, hands behind head.",
    muscles: "External Obliques and Quadratus Lumborum glowing bright red-orange.",
    equipment: "45-degree hyperextension / Roman chair bench."
  },
  "ab-rollout": {
    title: "AB WHEEL ROLLOUT",
    pose1: "Muscular male kneeling on floor mat gripping dual handles of ab wheel directly beneath chest, core pre-braced.",
    pose2: "Rolling wheel straight forward extending body into long horizontal hollow plank hovering 5cm above floor, then pulling back through abs.",
    muscles: "Rectus Abdominis, Transverse Abdominis, and Latissimus Dorsi glowing bright red-orange.",
    equipment: "Dual-wheel ab roller and knee pad."
  },

  // ==========================================
  // 전신 (Full Body / Compounds - 12종)
  // ==========================================
  "deadlift": {
    title: "CONVENTIONAL BARBELL DEADLIFT",
    pose1: "Muscular male in starting deadlift stance: feet hip-width under bar, shins touching barbell, hips hinged back, flat spine, chest proud, double overhand grip.",
    pose2: "Standing tall at full lockout: driving through floor, hips fully extended, knees locked, shoulders pinned back, barbell resting against thighs.",
    muscles: "Gluteus Maximus, Hamstrings, Erector Spinae, and Trapezius glowing bright red-orange.",
    equipment: "Olympic barbell with heavy bumper plates on deadlift platform."
  },
  "romanian-deadlift": {
    title: "BARBELL ROMANIAN DEADLIFT (RDL)",
    pose1: "Muscular male standing tall holding barbell at hip crease with overhand grip, shoulders retracted, knees soft.",
    pose2: "Hinging hips deeply backward with flat neutral spine, sliding barbell down thighs to mid-shin level, intense hamstring and glute stretch.",
    muscles: "Hamstrings (full length) and Gluteus Maximus glowing bright red-orange.",
    equipment: "Olympic barbell with bumper plates."
  },
  "dumbbell-romanian-deadlift": {
    title: "DUMBBELL ROMANIAN DEADLIFT (DB RDL)",
    pose1: "Muscular male standing tall holding pair of heavy dumbbells in front of thighs, shoulders back, core braced.",
    pose2: "Pushing hips backward with slight knee bend, sliding dumbbells along shins to below knee level, maintaining flat back and loaded posterior chain.",
    muscles: "Hamstrings and Gluteus Maximus glowing bright red-orange.",
    equipment: "Pair of heavy dumbbells."
  },
  "sumo-deadlift": {
    title: "SUMO BARBELL DEADLIFT",
    pose1: "Muscular male in wide sumo stance near barbell plates with toes flared 45 degrees, upright torso, hands gripping bar inside knees.",
    pose2: "Driving floor away through heels, pushing knees out to lock out tall with hips driven fully forward against barbell.",
    muscles: "Adductors, Gluteus Maximus, and Quadriceps glowing bright red-orange.",
    equipment: "Olympic barbell with bumper plates in wide stance setup."
  },
  "trap-bar-deadlift": {
    title: "TRAP BAR (HEX BAR) DEADLIFT",
    pose1: "Muscular male standing inside hexagonal trap bar, gripping neutral handles, hips hinged down in balanced squat-deadlift posture with upright chest.",
    pose2: "Driving floor away to full standing lockout, shoulders back, neutral spine, weight centered over midfoot.",
    muscles: "Quadriceps, Gluteus Maximus, and Trapezius glowing bright red-orange.",
    equipment: "Olympic trap bar (hex bar) loaded with bumper plates."
  },
  "landmine-press": {
    title: "STANDING LANDMINE PRESS (UNILATERAL)",
    pose1: "Muscular male standing in athletic split stance holding end of landmine barbell at shoulder height with one hand, elbow tucked.",
    pose2: "Pressing barbell diagonally upward and forward along pivot arc to full overhead arm extension, core braced against rotation.",
    muscles: "Anterior Deltoid, Upper Pectoralis, and Core Obliques glowing bright red-orange.",
    equipment: "Barbell anchored in landmine floor swivel base."
  },
  "kettlebell-swing": {
    title: "RUSSIAN KETTLEBELL SWING",
    pose1: "Muscular male at bottom of hip hinge, hiking heavy cast-iron kettlebell back between thighs with flat spine and bent knees.",
    pose2: "Snapping hips explosively forward into full standing lockout, kettlebell floating weightlessly to chest/shoulder height.",
    muscles: "Gluteus Maximus, Hamstrings, and Core glowing bright red-orange.",
    equipment: "Heavy competition or cast-iron kettlebell."
  },
  "kettlebell-clean-and-press": {
    title: "KETTLEBELL CLEAN AND OVERHEAD PRESS",
    pose1: "Muscular male holding kettlebell in tight front rack position against chest and shoulder, elbow resting on ribcage.",
    pose2: "Pressing kettlebell overhead into full vertical lockout with straight wrist and bicep beside ear, core braced.",
    muscles: "Deltoids, Triceps, and Core Stabilizers glowing bright red-orange.",
    equipment: "Competition kettlebell."
  },
  "power-clean": {
    title: "BARBELL POWER CLEAN",
    pose1: "Muscular male in explosive second pull position extending hips, knees, and ankles with barbell accelerating past mid-thigh.",
    pose2: "Snapping elbows fast under bar to catch barbell across front deltoids in solid quarter-squat receiving position.",
    muscles: "Trapezius, Hamstrings, Gluteus Maximus, and Quadriceps glowing bright red-orange.",
    equipment: "Olympic barbell with bumper plates on lifting platform."
  },
  "thruster": {
    title: "SQUAT THRUSTER (BARBELL / DUMBBELL)",
    pose1: "Muscular male at bottom of deep front squat holding barbell across clavicles in front rack position, chest proud.",
    pose2: "Exploding upward out of squat in one continuous motion, launching barbell directly into locked-out overhead press.",
    muscles: "Quadriceps, Gluteus Maximus, Anterior Deltoids, and Triceps glowing bright red-orange.",
    equipment: "Olympic barbell with bumper plates."
  },
  "farmers-walk": {
    title: "FARMER'S WALK (HEAVY CARRY)",
    pose1: "Muscular male standing tall holding heavy dumbbells or farmer's carry handles at sides, chest proud, shoulders packed back.",
    pose2: "Taking controlled, powerful forward strides with heavy load, maintaining rock-solid upright posture and unyielding grip.",
    muscles: "Forearms (Grip), Trapezius, Core/Obliques, and Calves glowing bright red-orange.",
    equipment: "Pair of heavy farmer's walk handles or heavy dumbbells."
  },
  "battle-rope": {
    title: "BATTLE ROPE WAVES",
    pose1: "Muscular male in athletic half-squat stance holding thick battle ropes in each hand, arms lowered preparing to whip.",
    pose2: "Vigorously whipping ropes up and down creating powerful rhythmic undulating waves traveling to anchor point, core braced.",
    muscles: "Shoulders (Deltoids), Biceps, Core, and Cardiovascular System glowing bright red-orange.",
    equipment: "Heavy thick poly-dacron battle ropes anchored to floor bracket."
  },

  // ==========================================
  // 유산소 (Cardio - 10종)
  // ==========================================
  "curved-treadmill": {
    title: "CURVED MANUAL TREADMILL (NON-MOTORIZED)",
    pose1: "Muscular male runner striking front curved incline of manual slat treadmill with ball of foot, accelerating cadence.",
    pose2: "High-speed sprinting gait driving curved belt backward with hamstrings and glutes under pure self-powered human propulsion.",
    muscles: "Hamstrings, Gluteus Maximus, Quadriceps, and Calves glowing bright red-orange.",
    equipment: "Non-motorized curved manual treadmill (Woodway / AssaultRunner style)."
  },
  "recumbent-bike": {
    title: "SEATED RECUMBENT BIKE",
    pose1: "Muscular male seated in bucket seat with backrest, gripping side handlebars, one leg flexed at pedal ready to push.",
    pose2: "Driving alternate leg forward into full pedal stroke against magnetic flywheel resistance with steady cardio cadence.",
    muscles: "Quadriceps, Hamstrings, and Gluteus Maximus glowing bright red-orange.",
    equipment: "Commercial recumbent exercise bike with digital console."
  },
  "stairmaster": {
    title: "STAIRMASTER / REVOLVING STAIRMILL",
    pose1: "Muscular athletic male stepping up onto revolving staircase, driving through whole foot and heel with tall upright posture, light fingertip touch on rails.",
    pose2: "Dynamic continuous climbing stride driving through glutes and calves with rhythmic hip extension, chest lifted, steady cardio power.",
    muscles: "Gluteus Maximus, Quadriceps, Hamstrings, and Calves glowing bright red-orange.",
    equipment: "Commercial motorized revolving stairmill machine (StairMaster) with digital console."
  },
  "vertical-climber": {
    title: "VERTICAL CLIMBER (VERSACLIMBER)",
    pose1: "Muscular male standing on vertical climber pedals holding moving handles in cross-crawl start (right hand high, left foot low).",
    pose2: "Driving right arm down while driving left knee high in powerful vertical total-body climbing stroke with upright core.",
    muscles: "Latissimus Dorsi, Deltoids, Core, Quadriceps, and Calves glowing bright red-orange.",
    equipment: "Commercial 75-degree angled vertical climbing machine (VersaClimber)."
  },
  "arc-trainer": {
    title: "CYBEX ARC TRAINER",
    pose1: "Muscular male standing on curved arc footplates holding dual action handles, footplate gliding at top of gentle arc.",
    pose2: "Driving opposite footplate backward along reverse arc glide path while pushing alternate handle forward, zero knee impact.",
    muscles: "Quadriceps, Gluteus Maximus, and Hamstrings glowing bright red-orange.",
    equipment: "Commercial Cybex Arc Trainer with digital console."
  },
  "skierg": {
    title: "CONCEPT2 SKIERG (SKI ERGOMETER)",
    pose1: "Muscular male standing tall facing SkiErg with arms reaching high overhead gripping drive handles, heels slightly elevated.",
    pose2: "Driving handles powerfully downward and past hips while hinging hips and flexing core into deep ski-pole finish posture.",
    muscles: "Latissimus Dorsi, Triceps, Rectus Abdominis, and Hip Flexors glowing bright red-orange.",
    equipment: "Concept2 SkiErg wall-mounted machine with flywheel."
  },
  "airbike": {
    title: "ASSAULT AIRBIKE / FAN BIKE",
    pose1: "Muscular male seated on AirBike pushing right handlebar forward and driving right pedal down against air fan resistance.",
    pose2: "Explosive reciprocal push-pull of dual handles while furiously pedaling large front steel fan wheel in high-intensity sprint.",
    muscles: "Full Body (Chest, Upper Back, Shoulders, Quadriceps, Hamstrings) glowing bright red-orange.",
    equipment: "Assault AirBike / Rogue Echo Bike with large front fan wheel."
  },
  "elliptical": {
    title: "ELLIPTICAL CROSS TRAINER",
    pose1: "Muscular male standing on elliptical footplates holding moving hand levers, gliding into forward stride.",
    pose2: "Smooth continuous elliptical pedal stroke with alternate arm pushing handle forward, fluid low-impact cardio gait.",
    muscles: "Gluteus Maximus, Quadriceps, Hamstrings, and Upper Body glowing bright red-orange.",
    equipment: "Commercial elliptical cross trainer with console."
  },
  "rowing-machine": {
    title: "CONCEPT2 ROWING ERGOMETER",
    pose1: "Muscular male at 'Catch' position: shins vertical, knees flexed, arms extended forward holding handle, torso leaned forward 10 degrees.",
    pose2: "Muscular male at 'Finish' position: legs fully extended, hips hinged back 100 degrees, handle pulled smoothly into lower ribs.",
    muscles: "Latissimus Dorsi, Rhomboids, Quadriceps, Gluteus Maximus, and Biceps glowing bright red-orange.",
    equipment: "Concept2 indoor rower ergometer with PM5 monitor."
  },
  "box-jump": {
    title: "PLYOMETRIC BOX JUMP",
    pose1: "Muscular male standing before sturdy wooden plyo box in athletic quarter-squat loading posture, arms swung back ready to explode.",
    pose2: "Landing softly on top of plyometric box with both feet flat in athletic quarter-squat, chest proud, standing tall to full extension.",
    muscles: "Quadriceps, Gluteus Maximus, and Gastrocnemius (Calves) glowing bright red-orange.",
    equipment: "Heavy-duty 24-inch wooden plyometric jump box."
  }
};

const fullPromptCatalog = [];

for (const item of catalog) {
  if (item.imageUrl) continue; // Already completed
  const spec = promptSpecs[item.id];
  if (!spec) {
    console.error("Missing spec for ID:", item.id);
    continue;
  }

  const promptText = `Generate a 2-stage workout exercise illustration diagram:
- Title: '${spec.title}'
- Pose 1 (Left - Starting Position): ${spec.pose1}
- Pose 2 (Right - Finish Position): ${spec.pose2}
- Muscle Highlight: ${spec.muscles}
- Equipment: ${spec.equipment}
- Style: 3D anatomical fitness model, realistic physique, clean white minimalist background, scientific fitness guide, side-by-side comparison diagram.`;

  fullPromptCatalog.push({
    id: item.id,
    name: item.name,
    category: item.category,
    englishName: item.englishName || spec.title,
    equipCategory: item.equipCategory,
    equipmentType: item.equipmentType,
    targetMuscles: item.targetMuscles,
    tips: item.tips,
    ouwanRank: item.ouwanRank || null,
    ouwanCount: item.ouwanCount || null,
    spec: spec,
    prompt: promptText
  });
}

console.log(`Successfully compiled ${fullPromptCatalog.length} prompts!`);

// Write JSON
writeFileSync('planning/remaining-80-exercises-prompts.json', JSON.stringify(fullPromptCatalog, null, 2), 'utf8');

// Write Markdown Document
let md = `# FitTracker Pro - 미완성 운동 80종 2단계 해부학 가이드 프롬프트 정리서

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
`;

const byCat = {};
for (const item of fullPromptCatalog) {
  byCat[item.category] = byCat[item.category] || [];
  byCat[item.category].push(item);
}

for (const [catName, items] of Object.entries(byCat)) {
  md += `\n## 🏋️ ${catName} (${items.length}종)\n\n`;
  items.forEach((it, idx) => {
    md += `### ${idx + 1}. ${it.name} (${it.englishName}) ${it.ouwanRank ? `🔥 **오운완 ${it.ouwanRank}위**` : ''}\n`;
    md += `- **ID**: \`${it.id}\`\n`;
    md += `- **기구 분류**: ${it.equipCategory} (${it.equipmentType || '-'})\n`;
    md += `- **타겟 부위**: ${it.targetMuscles || '-'}\n`;
    md += `- **핵심 팁**: ${it.tips || '-'}\n\n`;
    md += `\`\`\`text\n${it.prompt}\n\`\`\`\n\n`;
  });
}

writeFileSync('planning/remaining-80-exercises-prompts.md', md, 'utf8');
console.log('Saved planning/remaining-80-exercises-prompts.json and planning/remaining-80-exercises-prompts.md!');
