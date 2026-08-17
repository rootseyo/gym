/**
 * FitTracker - Illustrated Equipment & Exercise Encyclopedia Module
 * Features custom SVG vector illustrations for gym equipment, machines, and exercises.
 */

// SVG Vector Icon Path Library (ViewBox 0 0 64 64, Stroke-based, Neon accentable)
const EQUIPMENT_SVGS = {
  // 1. 벤치프레스 / 바벨 벤치 (Flat Bench & Barbell)
  'bench-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Base -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- Bench Frame & Cushion -->
      <rect x="14" y="36" width="36" height="6" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M18 42v14M46 42v14" stroke="var(--border-color)" />
      <path d="M22 56l-4-6M42 56l4-6" stroke="var(--border-color)" stroke-width="1.8" />
      <!-- Power Uprights / Rack -->
      <path d="M12 20v36M52 20v36" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M10 24h4M50 24h4" stroke="var(--accent-orange)" stroke-width="2.5" />
      <!-- Barbell on Rack -->
      <path d="M4 22h56" stroke="var(--text-main)" stroke-width="2.4" />
      <!-- Weight Plates -->
      <rect x="8" y="14" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="52" y="14" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="32" cy="22" r="2.5" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 2. 인클라인 벤치프레스 (Incline Bench)
  'incline-bench': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Base -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- Incline Backrest & Seat -->
      <path d="M18 52h10v4" stroke="var(--border-color)" />
      <rect x="16" y="46" width="14" height="6" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M24 46l18-22" stroke="var(--accent-cyan)" stroke-width="6" stroke-linecap="round" />
      <path d="M38 34l8 22" stroke="var(--border-color)" />
      <!-- Rack Posts -->
      <path d="M48 16v40" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M46 22h4" stroke="var(--accent-orange)" stroke-width="2.5" />
      <!-- Barbell -->
      <path d="M12 18l44-8" stroke="var(--text-main)" stroke-width="2.4" />
      <rect x="50" y="8" width="4" height="14" rx="1.5" transform="rotate(-10 52 15)" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  // 3. 덤벨 (Dumbbells)
  'dumbbell': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Dumbbell Handle -->
      <path d="M22 32h20" stroke="var(--text-main)" stroke-width="3.5" />
      <path d="M25 30v4M39 30v4" stroke="var(--accent-orange)" stroke-width="2" />
      <!-- Left Plates -->
      <rect x="16" y="20" width="6" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="10" y="24" width="6" height="16" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="6" y="29" width="4" height="6" rx="1" fill="var(--text-dim)" stroke="none" />
      <!-- Right Plates -->
      <rect x="42" y="20" width="6" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="48" y="24" width="6" height="16" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="54" y="29" width="4" height="6" rx="1" fill="var(--text-dim)" stroke="none" />
    </svg>
  `,

  // 4. 체스트 프레스 머신 / 펙덱 플라이 (Chest Machine)
  'chest-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Frame Base -->
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V16h24v40" stroke="var(--text-muted)" stroke-width="2" />
      <!-- Seat & Backrest -->
      <rect x="22" y="44" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="20" y="26" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <!-- Press Arms & Handles -->
      <path d="M38 22l10 8v12" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <circle cx="48" cy="42" r="3" fill="var(--accent-orange)" stroke="none" />
      <!-- Weight Stack -->
      <rect x="12" y="28" width="6" height="24" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <path d="M12 34h6M12 40h6M12 46h6" stroke="var(--accent-cyan)" stroke-width="1.2" />
    </svg>
  `,

  // 5. 딥스 & 풀업 스테이션 (Dips & Pull-up Tower)
  'dips-pullup': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Base & Uprights -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V12M48 56V12" stroke="var(--text-muted)" stroke-width="2.2" />
      <!-- Pull Up Top Bar -->
      <path d="M10 14h44" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <path d="M10 14l-4 4M54 14l4 4" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <!-- Dip Handles -->
      <path d="M16 36h12M48 36H36" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <circle cx="28" cy="36" r="2" fill="var(--accent-orange)" stroke="none" />
      <circle cx="36" cy="36" r="2" fill="var(--accent-orange)" stroke="none" />
      <!-- Armrest Cushions -->
      <rect x="14" y="32" width="6" height="4" rx="1" fill="var(--bg-input)" stroke="var(--border-color)" />
      <rect x="44" y="32" width="6" height="4" rx="1" fill="var(--bg-input)" stroke="var(--border-color)" />
    </svg>
  `,

  // 6. 렛풀다운 머신 (Lat Pulldown Machine)
  'lat-pulldown': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Main Tower -->
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V10h16l12 6" stroke="var(--text-muted)" stroke-width="2.2" />
      <!-- Top Pulley & Wide Bar -->
      <circle cx="44" cy="16" r="3" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M44 19v11" stroke="var(--border-color)" stroke-width="1.8" />
      <path d="M26 30h36" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <path d="M26 30l-4 3M62 30l4 3" stroke="var(--accent-cyan)" stroke-width="2.4" />
      <!-- Seat & Thigh Pad -->
      <rect x="36" y="44" width="16" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="38" y="38" width="10" height="4" rx="2" fill="var(--accent-orange)" stroke="none" />
      <path d="M44 49v7" stroke="var(--border-color)" />
      <!-- Weight Stack -->
      <rect x="12" y="24" width="6" height="28" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
    </svg>
  `,

  // 7. 시티드 케이블 로우 (Seated Cable Row / Long Pull)
  'cable-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Frame Base -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="20" width="8" height="36" rx="1.5" fill="var(--bg-input)" stroke="var(--text-muted)" stroke-width="2" />
      <!-- Seat Bench -->
      <rect x="28" y="44" width="24" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M34 49v7M46 49v7" stroke="var(--border-color)" />
      <!-- Foot Plate -->
      <path d="M24 40l-2 12" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <!-- Pulley & Cable Line -->
      <circle cx="20" cy="42" r="2.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M20 42h18" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="2 1" />
      <!-- V-Bar Handle -->
      <path d="M38 38v8l4-4z" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 8. 바벨 스쿼트 / 파워 랙 (Power Rack & Squat)
  'squat-rack': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Base -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- 4-Post Power Rack Box -->
      <rect x="14" y="12" width="36" height="44" rx="2" fill="none" stroke="var(--text-muted)" stroke-width="2" />
      <!-- Top Crossbar & Safety Spotter Bars -->
      <path d="M14 20h36M14 44h36" stroke="var(--border-color)" stroke-width="1.8" />
      <!-- J-Hooks & Barbell -->
      <path d="M12 28h4M48 28h4" stroke="var(--accent-orange)" stroke-width="3" />
      <path d="M4 28h56" stroke="var(--text-main)" stroke-width="2.6" />
      <!-- Big Bumper Plates -->
      <rect x="8" y="16" width="4" height="24" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <rect x="52" y="16" width="4" height="24" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <circle cx="32" cy="28" r="3" fill="var(--accent-emerald)" stroke="none" />
    </svg>
  `,

  // 9. 레그프레스 머신 (45-Degree Incline Leg Press)
  'leg-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Frame Base -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M12 56l36-36" stroke="var(--text-muted)" stroke-width="2.5" />
      <!-- Reclined Seat -->
      <path d="M16 52l12-8v-6" stroke="var(--accent-emerald)" stroke-width="4" stroke-linecap="round" />
      <path d="M22 56v-6" stroke="var(--border-color)" />
      <!-- Sled & Footplate -->
      <rect x="34" y="24" width="14" height="8" rx="2" transform="rotate(-45 41 28)" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M42 22l6-6" stroke="var(--accent-orange)" stroke-width="3.5" stroke-linecap="round" />
      <!-- Weight Plate on Sled -->
      <circle cx="38" cy="28" r="6" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
    </svg>
  `,

  // 10. 레그 익스텐션 & 레그컬 머신 (Leg Extension / Curl)
  'leg-extension': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Main Base & Seat -->
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="18" y="38" width="18" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="16" y="20" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M24 43v13M32 43v13" stroke="var(--border-color)" />
      <!-- Pivot Axis & Roller Pad -->
      <circle cx="36" cy="38" r="3.5" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <path d="M36 38l12 10" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <circle cx="48" cy="48" r="4.5" fill="var(--accent-orange)" stroke="none" />
      <!-- Weight Stack -->
      <rect x="44" y="18" width="8" height="30" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
    </svg>
  `,

  // 11. 힙 쓰러스터 (Hip Thrust Bench & Barbell)
  'hip-thrust': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Base -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- Thrust Bench Pad -->
      <rect x="14" y="36" width="16" height="14" rx="3" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M18 50v6M26 50v6" stroke="var(--border-color)" />
      <!-- Barbell & Plate -->
      <path d="M32 40h26" stroke="var(--text-main)" stroke-width="3" stroke-linecap="round" />
      <rect x="36" y="28" width="5" height="24" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
      <rect x="52" y="28" width="5" height="24" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
      <!-- Hip Cushion Pad -->
      <rect x="42" y="37" width="9" height="6" rx="3" fill="var(--accent-pink)" stroke="none" />
    </svg>
  `,

  // 12. 숄더프레스 머신 / OHP (Overhead Press)
  'shoulder-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Base & Upright Frame -->
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M22 56V14M42 56V14" stroke="var(--text-muted)" stroke-width="2" />
      <!-- Vertical Upright Seat -->
      <rect x="26" y="44" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="29" y="22" width="6" height="22" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <!-- Overhead Bar / Handles -->
      <path d="M12 18h40" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="20" cy="18" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="44" cy="18" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <path d="M20 18v8M44 18v8" stroke="var(--accent-orange)" stroke-width="2" />
    </svg>
  `,

  // 13. 케이블 크로스오버 / 푸쉬다운 (Cable Crossover Tower)
  'cable-cross': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Dual Cable Towers -->
      <path d="M6 56h52" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="10" y="12" width="8" height="44" rx="2" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <rect x="46" y="12" width="8" height="44" rx="2" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <!-- Overhead Connecting Arch -->
      <path d="M14 12h36" stroke="var(--border-color)" stroke-width="2" />
      <!-- Pulleys & Cable Lines -->
      <circle cx="18" cy="18" r="2.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="46" cy="18" r="2.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M18 18l12 14M46 18l-12 14" stroke="var(--accent-cyan)" stroke-width="1.8" stroke-dasharray="2 1" />
      <!-- Handles -->
      <circle cx="30" cy="32" r="3" fill="var(--accent-orange)" stroke="none" />
      <circle cx="34" cy="32" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 14. 바벨 컬 / 프리처 벤치 (Barbell Curl)
  'barbell-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- EZ-Curl Bar Shape -->
      <path d="M8 32h10l4-4h6l4 4h6l4-4h6l4 4h8" stroke="var(--text-main)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Left Weights -->
      <rect x="10" y="20" width="5" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="6" y="24" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <!-- Right Weights -->
      <rect x="49" y="20" width="5" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="54" y="24" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <!-- Bicep Grip Zones -->
      <circle cx="25" cy="30" r="2" fill="var(--accent-orange)" stroke="none" />
      <circle cx="39" cy="30" r="2" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 15. 데드리프트 (Deadlift Barbell)
  'deadlift': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Mat Platform -->
      <path d="M6 54h52" stroke="var(--text-dim)" stroke-width="2" />
      <rect x="10" y="52" width="44" height="4" rx="1" fill="var(--bg-input)" stroke="var(--border-color)" />
      <!-- Heavy Barbell on Floor -->
      <path d="M4 42h56" stroke="var(--text-main)" stroke-width="3" />
      <!-- Massive Bumper Plates -->
      <circle cx="14" cy="42" r="11" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <circle cx="14" cy="42" r="4" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <circle cx="50" cy="42" r="11" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <circle cx="50" cy="42" r="4" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <!-- Center Knurling Marker -->
      <path d="M30 40v4M34 40v4" stroke="var(--accent-cyan)" stroke-width="1.8" />
    </svg>
  `,

  // 16. 런닝머신 / 트레드밀 (Treadmill)
  'treadmill': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Line -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- Running Deck (Slanted) -->
      <path d="M12 52l32-6" stroke="var(--accent-emerald)" stroke-width="5" stroke-linecap="round" />
      <circle cx="13" cy="52" r="3" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <circle cx="43" cy="46" r="3" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <!-- Frame Posts & Handrails -->
      <path d="M40 46l6-24" stroke="var(--text-muted)" stroke-width="2.5" />
      <path d="M34 26h14" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <!-- Console Display Screen -->
      <rect x="42" y="16" width="10" height="7" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M44 20h6" stroke="var(--accent-emerald)" stroke-width="1.5" />
    </svg>
  `,

  // 17. 실내 사이클 / 스핀 바이크 (Stationary Bike)
  'stationary-bike': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Base -->
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- Front Flywheel -->
      <circle cx="44" cy="42" r="10" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <circle cx="44" cy="42" r="3" fill="var(--accent-cyan)" stroke="none" />
      <!-- Frame Triangles -->
      <path d="M22 52l10-18h12l-12 18z" stroke="var(--text-muted)" stroke-width="2" />
      <!-- Seat & Post -->
      <path d="M22 52l6-22" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M24 30h8" stroke="var(--bg-input)" stroke-width="4" stroke-linecap="round" />
      <!-- Handlebars -->
      <path d="M42 34l4-16h-6" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" />
      <!-- Pedals -->
      <circle cx="32" cy="52" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 18. 천국의 계단 / 스텝밀 (Stairmaster / StepMill)
  'stairmaster': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Base Line -->
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <!-- Escalating Stairs Shape -->
      <path d="M14 52h8v-8h8v-8h8v-8h8v24" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <!-- Handrails & Posts -->
      <path d="M20 44l16-16v-8" stroke="var(--accent-emerald)" stroke-width="2.2" stroke-linecap="round" />
      <path d="M36 20h8" stroke="var(--accent-emerald)" stroke-width="3" stroke-linecap="round" />
      <!-- Console Display -->
      <rect x="42" y="12" width="10" height="8" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  // 19. 로잉 머신 (Rowing Machine)
  'rowing-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Floor Base & Rail -->
      <path d="M8 54h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 48h36" stroke="var(--text-muted)" stroke-width="3" />
      <!-- Front Flywheel Housing -->
      <circle cx="48" cy="40" r="9" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <!-- Sliding Seat -->
      <rect x="24" y="42" width="10" height="6" rx="2" fill="var(--accent-emerald)" stroke="none" />
      <!-- Handle & Footrests -->
      <path d="M40 38l-8-4" stroke="var(--accent-orange)" stroke-width="2" />
      <circle cx="31" cy="34" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 20. 매트 & 코어 (Yoga / Fitness Mat & Core)
  'mat-core': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <!-- Rolled Fitness Mat -->
      <path d="M10 48c0-4 4-7 10-7h32c4 0 6 3 6 7s-2 7-6 7H20c-6 0-10-3-10-7z" fill="var(--bg-input)" stroke="var(--accent-emerald)" stroke-width="2" />
      <ellipse cx="18" cy="48" rx="4" ry="7" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2" />
      <!-- Core Energy Wave Rings -->
      <path d="M28 28c4-6 12-6 16 0" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" />
      <path d="M24 22c6-8 20-8 26 0" stroke="var(--accent-orange)" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2" />
      <circle cx="36" cy="32" r="3" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `
};

// Rich Encyclopedia Catalog Data for All Common Gym Exercises
const EQUIPMENT_CATALOG = [
  // 가슴 (Chest)
  {
    name: '벤치프레스',
    category: '가슴',
    englishName: 'Barbell Flat Bench Press',
    iconType: 'bench-press',
    equipmentType: '바벨 & 랙',
    targetMuscles: '대흉근 전체, 삼두근, 전면 삼각근',
    defaultWeight: 60,
    defaultReps: 12,
    restSeconds: 150,
    tips: '견갑을 후하방으로 단단히 고정하고 바를 젖꼭지 라인으로 수직 하강하세요.'
  },
  {
    name: '인클라인 벤치프레스',
    category: '가슴',
    englishName: 'Incline Barbell Bench Press',
    iconType: 'incline-bench',
    equipmentType: '각도조절 벤치 & 바벨',
    targetMuscles: '대흉근 상부 (쇄골두), 전면 삼각근',
    defaultWeight: 50,
    defaultReps: 12,
    restSeconds: 120,
    tips: '벤치 각도는 30~45도가 적당하며, 쇄골 바로 아래로 바벨을 내립니다.'
  },
  {
    name: '덤벨 벤치프레스',
    category: '가슴',
    englishName: 'Dumbbell Bench Press',
    iconType: 'dumbbell',
    equipmentType: '덤벨 & 플랫 벤치',
    targetMuscles: '대흉근 안쪽/외측, 전면 삼각근',
    defaultWeight: 20,
    defaultReps: 12,
    restSeconds: 90,
    tips: '바벨보다 더 깊은 가동범위로 가슴 근육을 강하게 이완/수축할 수 있습니다.'
  },
  {
    name: '체스트 프레스 머신',
    category: '가슴',
    englishName: 'Seated Chest Press Machine',
    iconType: 'chest-machine',
    equipmentType: '고립 핀/플레이트 머신',
    targetMuscles: '대흉근 중앙, 삼두근',
    defaultWeight: 40,
    defaultReps: 12,
    restSeconds: 90,
    tips: '의자 높이를 조절하여 손잡이가 가슴 중앙 높이에 오도록 맞추세요.'
  },
  {
    name: '펙덱 플라이',
    category: '가슴',
    englishName: 'Pec Deck / Butterfly Machine',
    iconType: 'chest-machine',
    equipmentType: '펙덱 플라이 머신',
    targetMuscles: '대흉근 안쪽 모음, 가슴 분리도',
    defaultWeight: 30,
    defaultReps: 12,
    restSeconds: 60,
    tips: '팔꿈치를 살짝 굽힌 상태를 유지하며 가슴 안쪽을 강하게 쥐어짜듯 모아줍니다.'
  },
  {
    name: '딥스',
    category: '가슴',
    englishName: 'Parallel Bar Dips',
    iconType: 'dips-pullup',
    equipmentType: '딥스 바 / 파워타워',
    targetMuscles: '대흉근 하부, 삼두근',
    defaultWeight: 0,
    defaultReps: 12,
    restSeconds: 90,
    tips: '상체를 앞으로 30도 숙여 진행하면 아랫가슴(대흉근 하부)에 강한 자극이 전달됩니다.'
  },

  // 등 (Back)
  {
    name: '렛풀다운',
    category: '등',
    englishName: 'Lat Pulldown Machine',
    iconType: 'lat-pulldown',
    equipmentType: '케이블 풀다운 머신',
    targetMuscles: '광배근 외측, 대원근, 이두근',
    defaultWeight: 45,
    defaultReps: 12,
    restSeconds: 90,
    tips: '허리를 과하게 꺾지 말고, 팔꿈치를 옆구리 쪽으로 내린다는 느낌으로 당기세요.'
  },
  {
    name: '시티드 케이블 로우',
    category: '등',
    englishName: 'Seated Cable Row',
    iconType: 'cable-row',
    equipmentType: '롱풀 케이블 머신',
    targetMuscles: '광배근 하부, 능형근, 승모근 중하부',
    defaultWeight: 40,
    defaultReps: 12,
    restSeconds: 90,
    tips: '상체를 꼿꼿이 세우고 견갑골을 뒤로 모아주며 배꼽 방향으로 당깁니다.'
  },
  {
    name: '풀업 (턱걸이)',
    category: '등',
    englishName: 'Pull Up / Chin Up',
    iconType: 'dips-pullup',
    equipmentType: '풀업 바 / 친닝디핑',
    targetMuscles: '광배근, 대원근, 전완근',
    defaultWeight: 0,
    defaultReps: 10,
    restSeconds: 90,
    tips: '숄더팩킹을 먼저 걸고 가슴을 바에 닿게 한다는 느낌으로 당겨 올립니다.'
  },
  {
    name: '바벨 로우',
    category: '등',
    englishName: 'Bent-Over Barbell Row',
    iconType: 'bench-press',
    equipmentType: '프리웨이트 바벨',
    targetMuscles: '광배근 두께, 승모근, 척추기립근',
    defaultWeight: 50,
    defaultReps: 12,
    restSeconds: 120,
    tips: '상체를 45도 숙이고 코어를 잠근 상태에서 바벨을 허벅지 라인을 따라 당기세요.'
  },

  // 하체 (Legs)
  {
    name: '스쿼트',
    category: '하체',
    englishName: 'Barbell Back Squat',
    iconType: 'squat-rack',
    equipmentType: '파워 랙 & 바벨',
    targetMuscles: '대퇴사두근, 대둔근, 햄스트링, 코어',
    defaultWeight: 80,
    defaultReps: 12,
    restSeconds: 180,
    tips: '발끝과 무릎 방향을 일치시키고 고관절을 먼저 접으며 깊게 앉습니다.'
  },
  {
    name: '레그프레스',
    category: '하체',
    englishName: '45° Incline Leg Press',
    iconType: 'leg-press',
    equipmentType: '인클라인 레그프레스 머신',
    targetMuscles: '대퇴사두근, 둔근 (발 위치에 따라 가변)',
    defaultWeight: 100,
    defaultReps: 12,
    restSeconds: 120,
    tips: '무릎을 완전히 펴서 락아웃(Lock-out)하지 말고 지속적인 긴장을 유지하세요.'
  },
  {
    name: '레그 익스텐션',
    category: '하체',
    englishName: 'Seated Leg Extension',
    iconType: 'leg-extension',
    equipmentType: '레그 익스텐션 머신',
    targetMuscles: '대퇴사두근 (허벅지 앞쪽 고립)',
    defaultWeight: 35,
    defaultReps: 15,
    restSeconds: 90,
    tips: '발목 패드가 정강이 하단에 오게 세팅하고 정점에서 1초간 쥐어짜듯 멈춥니다.'
  },
  {
    name: '레그컬',
    category: '하체',
    englishName: 'Lying / Seated Leg Curl',
    iconType: 'leg-extension',
    equipmentType: '레그 컬 머신',
    targetMuscles: '햄스트링 (허벅지 뒤쪽)',
    defaultWeight: 30,
    defaultReps: 15,
    restSeconds: 90,
    tips: '골반이 들리지 않도록 손잡이를 단단히 잡고 엉덩이 쪽으로 뒤꿈치를 당깁니다.'
  },
  {
    name: '힙 쓰러스터',
    category: '하체',
    englishName: 'Hip Thrust Machine / Barbell',
    iconType: 'hip-thrust',
    equipmentType: '힙 쓰러스트 벤치 & 바벨',
    targetMuscles: '대둔근 (엉덩이 집중 고립)',
    defaultWeight: 60,
    defaultReps: 12,
    restSeconds: 120,
    tips: '정점에서 골반을 말아올려 엉덩이를 최대로 수축하고 턱은 당기세요.'
  },

  // 어깨 (Shoulders)
  {
    name: '오버헤드 프레스 (OHP)',
    category: '어깨',
    englishName: 'Overhead Barbell Press',
    iconType: 'shoulder-press',
    equipmentType: '스탠딩 바벨 / 파워 랙',
    targetMuscles: '전면/측면 삼각근, 상부 승모근, 코어',
    defaultWeight: 40,
    defaultReps: 10,
    restSeconds: 150,
    tips: '엉덩이와 복근을 강하게 조여 허리가 꺾이지 않도록 수직으로 밀어 올립니다.'
  },
  {
    name: '덤벨 숄더프레스',
    category: '어깨',
    englishName: 'Seated Dumbbell Shoulder Press',
    iconType: 'shoulder-press',
    equipmentType: '덤벨 & 90도 벤치',
    targetMuscles: '전면/측면 삼각근, 삼두근',
    defaultWeight: 16,
    defaultReps: 12,
    restSeconds: 90,
    tips: '팔꿈치가 어깨선보다 약간 앞으로 오게 각도를 두고 귀 옆에서 머리 위로 밉니다.'
  },
  {
    name: '사이드 레터럴 레이즈',
    category: '어깨',
    englishName: 'Side Lateral Raise',
    iconType: 'dumbbell',
    equipmentType: '덤벨 / 케이블',
    targetMuscles: '측면 삼각근 (어깨 뽕)',
    defaultWeight: 8,
    defaultReps: 15,
    restSeconds: 60,
    tips: '승모근 개입을 줄이고 주전자로 물을 따르듯 팔꿈치를 멀리 던져 올리세요.'
  },
  {
    name: '페이스 풀',
    category: '어깨',
    englishName: 'Cable Rope Face Pull',
    iconType: 'cable-cross',
    equipmentType: '케이블 로프',
    targetMuscles: '후면 삼각근, 회전근개, 승모근 중하부',
    defaultWeight: 20,
    defaultReps: 15,
    restSeconds: 60,
    tips: '로프를 눈높이 또는 이마 방향으로 당기며 어깨 외회전을 함께 걸어줍니다.'
  },

  // 팔 (Arms)
  {
    name: '바벨 컬',
    category: '팔',
    englishName: 'Barbell / EZ-Bar Biceps Curl',
    iconType: 'barbell-curl',
    equipmentType: 'EZ 바 / 스트레이트 바벨',
    targetMuscles: '상완이두근 (단두/장두)',
    defaultWeight: 25,
    defaultReps: 12,
    restSeconds: 60,
    tips: '팔꿈치를 옆구리에 고정하고 반동 없이 이두근의 힘만으로 감아올립니다.'
  },
  {
    name: '덤벨 컬',
    category: '팔',
    englishName: 'Dumbbell Curl / Hammer Curl',
    iconType: 'dumbbell',
    equipmentType: '덤벨',
    targetMuscles: '상완이두근, 상완근, 전완근',
    defaultWeight: 12,
    defaultReps: 12,
    restSeconds: 60,
    tips: '손목을 바깥쪽으로 돌려 올리면(외번) 이두근 피크에 더 강한 수축이 일어납니다.'
  },
  {
    name: '트라이셉스 푸쉬다운',
    category: '팔',
    englishName: 'Triceps Cable Pushdown',
    iconType: 'cable-cross',
    equipmentType: '케이블 바 / 로프',
    targetMuscles: '상완삼두근 (외측두/장두)',
    defaultWeight: 25,
    defaultReps: 15,
    restSeconds: 60,
    tips: '팔꿈치를 옆구리에 쐐기처럼 고정하고 아래로 강하게 밀어 삼두를 쥐어짭니다.'
  },

  // 전신 & 복근 (Full Body & Core)
  {
    name: '데드리프트',
    category: '전신',
    englishName: 'Conventional Deadlift',
    iconType: 'deadlift',
    equipmentType: '바벨 & 플랫폼',
    targetMuscles: '둔근, 햄스트링, 척추기립근, 등 전체',
    defaultWeight: 100,
    defaultReps: 8,
    restSeconds: 180,
    tips: '바벨을 정강이에 밀착시키고 지면을 발바닥으로 밀어내며 일어섭니다.'
  },
  {
    name: '플랭크',
    category: '복근/코어',
    englishName: 'Core Plank',
    iconType: 'mat-core',
    equipmentType: '피트니스 매트',
    targetMuscles: '복직근, 복횡근, 코어 안정성',
    defaultWeight: 0,
    defaultReps: 60,
    restSeconds: 45,
    tips: '복근과 둔근에 힘을 주어 허리가 아래로 꺾이지 않는 일직선을 유지합니다.'
  },

  // 유산소 (Cardio)
  {
    name: '런닝머신',
    category: '유산소',
    englishName: 'Treadmill Running',
    iconType: 'treadmill',
    equipmentType: '트레드밀 머신',
    targetMuscles: '심폐 지구력, 하체 전반, 체지방 연소',
    defaultWeight: 8.5,
    defaultReps: 20,
    restSeconds: 30,
    tips: '경사도 1~2%를 설정하면 야외 러닝과 유사한 무릎 부하와 칼로리 소모를 얻을 수 있습니다.'
  },
  {
    name: '사이클',
    category: '유산소',
    englishName: 'Stationary Spin Bike',
    iconType: 'stationary-bike',
    equipmentType: '실내 스핀 바이크',
    targetMuscles: '대퇴사두근, 둔근, 심폐 지구력',
    defaultWeight: 15.0,
    defaultReps: 30,
    restSeconds: 30,
    tips: '안장 높이를 골반 뼈 위치에 맞추어 무릎에 무리가 가지 않도록 하세요.'
  },
  {
    name: '천국의 계단 (스텝밀)',
    category: '유산소',
    englishName: 'StairMaster / StepMill',
    iconType: 'stairmaster',
    equipmentType: '스텝밀 머신',
    targetMuscles: '둔근, 햄스트링, 종아리, 심폐 강화',
    defaultWeight: 8.0,
    defaultReps: 15,
    restSeconds: 30,
    tips: '손잡이에 체중을 기대지 말고 뒤꿈치로 계단을 밀어내며 힙을 활성화하세요.'
  },
  {
    name: '로잉머신',
    category: '유산소',
    englishName: 'Concept2 Rowing Machine',
    iconType: 'rowing-machine',
    equipmentType: '로잉 머신',
    targetMuscles: '전신 유산소 (하체 60%, 등/코어 40%)',
    defaultWeight: 2.0,
    defaultReps: 15,
    restSeconds: 30,
    tips: '다리로 먼저 밀고, 상체를 뒤로 젖힌 후, 마지막에 팔로 당기는 순서를 지키세요.'
  }
];

// Helper to get SVG icon for any exercise name
function getExerciseSvgIcon(exerciseName, category = '') {
  const match = EQUIPMENT_CATALOG.find(item => item.name.toLowerCase() === (exerciseName || '').toLowerCase());
  if (match && EQUIPMENT_SVGS[match.iconType]) {
    return EQUIPMENT_SVGS[match.iconType];
  }

  // Fallback match by category or keywords
  const lower = (exerciseName || '').toLowerCase();
  if (category === '유산소' || lower.includes('러닝') || lower.includes('사이클') || lower.includes('런닝') || lower.includes('계단')) {
    return EQUIPMENT_SVGS['treadmill'];
  }
  if (category === '가슴' || lower.includes('벤치') || lower.includes('플라이') || lower.includes('체스트')) {
    return EQUIPMENT_SVGS['bench-press'];
  }
  if (category === '등' || lower.includes('풀다운') || lower.includes('로우') || lower.includes('풀업') || lower.includes('턱걸이')) {
    return EQUIPMENT_SVGS['lat-pulldown'];
  }
  if (category === '하체' || lower.includes('스쿼트') || lower.includes('레그') || lower.includes('런지')) {
    return EQUIPMENT_SVGS['squat-rack'];
  }
  if (category === '어깨' || lower.includes('프레스') || lower.includes('레이즈')) {
    return EQUIPMENT_SVGS['shoulder-press'];
  }
  if (category === '팔' || lower.includes('컬') || lower.includes('익스텐션') || lower.includes('푸쉬다운')) {
    return EQUIPMENT_SVGS['barbell-curl'];
  }
  if (category === '복근/코어' || lower.includes('플랭크') || lower.includes('크런치') || lower.includes('레그레이즈')) {
    return EQUIPMENT_SVGS['mat-core'];
  }
  if (category === '전신' || lower.includes('데드리프트')) {
    return EQUIPMENT_SVGS['deadlift'];
  }

  // Default Dumbbell
  return EQUIPMENT_SVGS['dumbbell'];
}

// Global expose
window.EQUIPMENT_SVGS = EQUIPMENT_SVGS;
window.EQUIPMENT_CATALOG = EQUIPMENT_CATALOG;
window.getExerciseSvgIcon = getExerciseSvgIcon;
