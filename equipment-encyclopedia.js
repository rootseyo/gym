/**
 * FitTracker - Illustrated Equipment & Exercise Encyclopedia Module
 * Complete Catalog of 55+ Gym Equipment, Free Weights, Machines & Cardio.
 * Features custom SVG vector illustrations for every category.
 */

// SVG Vector Icon Path Library (ViewBox 0 0 64 64, Stroke-based, Neon accentable)
const EQUIPMENT_SVGS = {
  // 1. 벤치프레스 / 바벨 벤치 (Flat Bench & Barbell)
  'bench-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="36" width="36" height="6" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M18 42v14M46 42v14" stroke="var(--border-color)" />
      <path d="M22 56l-4-6M42 56l4-6" stroke="var(--border-color)" stroke-width="1.8" />
      <path d="M12 20v36M52 20v36" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M10 24h4M50 24h4" stroke="var(--accent-orange)" stroke-width="2.5" />
      <path d="M4 22h56" stroke="var(--text-main)" stroke-width="2.4" />
      <rect x="8" y="14" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="52" y="14" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="32" cy="22" r="2.5" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 2. 인클라인 벤치 (Incline Bench)
  'incline-bench': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 52h10v4" stroke="var(--border-color)" />
      <rect x="16" y="46" width="14" height="6" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M24 46l18-22" stroke="var(--accent-cyan)" stroke-width="6" stroke-linecap="round" />
      <path d="M38 34l8 22" stroke="var(--border-color)" />
      <path d="M48 16v40" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M46 22h4" stroke="var(--accent-orange)" stroke-width="2.5" />
      <path d="M12 18l44-8" stroke="var(--text-main)" stroke-width="2.4" />
      <rect x="50" y="8" width="4" height="14" rx="1.5" transform="rotate(-10 52 15)" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  // 3. 디클라인 벤치 (Decline Bench)
  'decline-bench': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 28l26 18" stroke="var(--accent-cyan)" stroke-width="6" stroke-linecap="round" />
      <path d="M18 30v26M40 48v8" stroke="var(--border-color)" />
      <circle cx="16" cy="24" r="3" fill="var(--accent-orange)" stroke="none" />
      <path d="M10 24h50" stroke="var(--text-main)" stroke-width="2.4" />
      <rect x="8" y="16" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="52" y="16" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  // 4. 덤벨 (Dumbbells)
  'dumbbell': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M22 32h20" stroke="var(--text-main)" stroke-width="3.5" />
      <path d="M25 30v4M39 30v4" stroke="var(--accent-orange)" stroke-width="2" />
      <rect x="16" y="20" width="6" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="10" y="24" width="6" height="16" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="6" y="29" width="4" height="6" rx="1" fill="var(--text-dim)" stroke="none" />
      <rect x="42" y="20" width="6" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="48" y="24" width="6" height="16" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="54" y="29" width="4" height="6" rx="1" fill="var(--text-dim)" stroke="none" />
    </svg>
  `,

  // 5. 체스트 프레스 머신 / 펙덱 플라이 (Chest Machine)
  'chest-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V16h24v40" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="22" y="44" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="20" y="26" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M38 22l10 8v12" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <circle cx="48" cy="42" r="3" fill="var(--accent-orange)" stroke="none" />
      <rect x="12" y="28" width="6" height="24" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <path d="M12 34h6M12 40h6M12 46h6" stroke="var(--accent-cyan)" stroke-width="1.2" />
    </svg>
  `,

  // 6. 스미스 머신 (Smith Machine)
  'smith-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V12M48 56V12" stroke="var(--text-muted)" stroke-width="3" />
      <path d="M16 12h32" stroke="var(--border-color)" stroke-width="2.5" />
      <path d="M8 30h48" stroke="var(--text-main)" stroke-width="2.6" />
      <rect x="13" y="26" width="6" height="8" rx="2" fill="var(--accent-orange)" stroke="none" />
      <rect x="45" y="26" width="6" height="8" rx="2" fill="var(--accent-orange)" stroke="none" />
      <rect x="6" y="20" width="4" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="54" y="20" width="4" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="32" cy="30" r="2.5" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 7. 딥스 & 풀업 스테이션 (Dips & Pull-up Tower)
  'dips-pullup': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V12M48 56V12" stroke="var(--text-muted)" stroke-width="2.2" />
      <path d="M10 14h44" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <path d="M10 14l-4 4M54 14l4 4" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <path d="M16 36h12M48 36H36" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <circle cx="28" cy="36" r="2" fill="var(--accent-orange)" stroke="none" />
      <circle cx="36" cy="36" r="2" fill="var(--accent-orange)" stroke="none" />
      <rect x="14" y="32" width="6" height="4" rx="1" fill="var(--bg-input)" stroke="var(--border-color)" />
      <rect x="44" y="32" width="6" height="4" rx="1" fill="var(--bg-input)" stroke="var(--border-color)" />
    </svg>
  `,

  // 8. 렛풀다운 머신 (Lat Pulldown Machine)
  'lat-pulldown': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V10h16l12 6" stroke="var(--text-muted)" stroke-width="2.2" />
      <circle cx="44" cy="16" r="3" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M44 19v11" stroke="var(--border-color)" stroke-width="1.8" />
      <path d="M26 30h36" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <path d="M26 30l-4 3M62 30l4 3" stroke="var(--accent-cyan)" stroke-width="2.4" />
      <rect x="36" y="44" width="16" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="38" y="38" width="10" height="4" rx="2" fill="var(--accent-orange)" stroke="none" />
      <path d="M44 49v7" stroke="var(--border-color)" />
      <rect x="12" y="24" width="6" height="28" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
    </svg>
  `,

  // 9. 시티드 케이블 로우 (Seated Cable Row / Long Pull)
  'cable-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="20" width="8" height="36" rx="1.5" fill="var(--bg-input)" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="28" y="44" width="24" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M34 49v7M46 49v7" stroke="var(--border-color)" />
      <path d="M24 40l-2 12" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <circle cx="20" cy="42" r="2.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M20 42h18" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="2 1" />
      <path d="M38 38v8l4-4z" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 10. T바 로우 (T-Bar Row)
  't-bar-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="16" cy="52" r="4" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <path d="M16 52l32-26" stroke="var(--text-main)" stroke-width="3" stroke-linecap="round" />
      <path d="M42 22l8 10M48 26l-8-10" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="44" cy="28" r="8" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.2" />
      <circle cx="44" cy="28" r="3" fill="var(--bg-input)" stroke="var(--border-color)" />
    </svg>
  `,

  // 11. 하이퍼 익스텐션 / 백 익스텐션 (Back Extension 45°)
  'hyperextension': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56l24-24" stroke="var(--text-muted)" stroke-width="3" stroke-linecap="round" />
      <rect x="36" y="26" width="12" height="8" rx="2" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <circle cx="20" cy="50" r="4" fill="var(--accent-orange)" stroke="none" />
      <path d="M26 46l8 10" stroke="var(--border-color)" />
    </svg>
  `,

  // 12. 바벨 스쿼트 / 파워 랙 (Power Rack & Squat)
  'squat-rack': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="12" width="36" height="44" rx="2" fill="none" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M14 20h36M14 44h36" stroke="var(--border-color)" stroke-width="1.8" />
      <path d="M12 28h4M48 28h4" stroke="var(--accent-orange)" stroke-width="3" />
      <path d="M4 28h56" stroke="var(--text-main)" stroke-width="2.6" />
      <rect x="8" y="16" width="4" height="24" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <rect x="52" y="16" width="4" height="24" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <circle cx="32" cy="28" r="3" fill="var(--accent-emerald)" stroke="none" />
    </svg>
  `,

  // 13. 핵스쿼트 머신 (Hack Squat Machine)
  'hack-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56l30-36" stroke="var(--text-muted)" stroke-width="3" stroke-linecap="round" />
      <rect x="30" y="24" width="16" height="12" rx="2" transform="rotate(40 38 30)" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M42 22l6-4M46 26l4-3" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <rect x="12" y="48" width="12" height="6" rx="1" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
    </svg>
  `,

  // 14. 레그프레스 머신 (45-Degree Incline Leg Press)
  'leg-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M12 56l36-36" stroke="var(--text-muted)" stroke-width="2.5" />
      <path d="M16 52l12-8v-6" stroke="var(--accent-emerald)" stroke-width="4" stroke-linecap="round" />
      <path d="M22 56v-6" stroke="var(--border-color)" />
      <rect x="34" y="24" width="14" height="8" rx="2" transform="rotate(-45 41 28)" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M42 22l6-6" stroke="var(--accent-orange)" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="38" cy="28" r="6" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
    </svg>
  `,

  // 15. 레그 익스텐션 & 레그컬 머신 (Leg Extension / Curl)
  'leg-extension': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="18" y="38" width="18" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="16" y="20" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M24 43v13M32 43v13" stroke="var(--border-color)" />
      <circle cx="36" cy="38" r="3.5" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <path d="M36 38l12 10" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <circle cx="48" cy="48" r="4.5" fill="var(--accent-orange)" stroke="none" />
      <rect x="44" y="18" width="8" height="30" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
    </svg>
  `,

  // 16. 이너싸이 / 아웃싸이 머신 (Adduction / Abduction)
  'inner-outer-thigh': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="24" y="42" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <rect x="28" y="22" width="8" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M22 38l-8 10M42 38l8 10" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="14" cy="48" r="4" fill="var(--accent-orange)" stroke="none" />
      <circle cx="50" cy="48" r="4" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 17. 힙 쓰러스터 (Hip Thrust Bench & Barbell)
  'hip-thrust': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="36" width="16" height="14" rx="3" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M18 50v6M26 50v6" stroke="var(--border-color)" />
      <path d="M32 40h26" stroke="var(--text-main)" stroke-width="3" stroke-linecap="round" />
      <rect x="36" y="28" width="5" height="24" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
      <rect x="52" y="28" width="5" height="24" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
      <rect x="42" y="37" width="9" height="6" rx="3" fill="var(--accent-pink)" stroke="none" />
    </svg>
  `,

  // 18. 숄더프레스 머신 / OHP (Overhead Press)
  'shoulder-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M22 56V14M42 56V14" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="26" y="44" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="29" y="22" width="6" height="22" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M12 18h40" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="20" cy="18" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="44" cy="18" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <path d="M20 18v8M44 18v8" stroke="var(--accent-orange)" stroke-width="2" />
    </svg>
  `,

  // 19. 케이블 크로스오버 / 푸쉬다운 (Cable Crossover Tower)
  'cable-cross': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M6 56h52" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="10" y="12" width="8" height="44" rx="2" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <rect x="46" y="12" width="8" height="44" rx="2" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <path d="M14 12h36" stroke="var(--border-color)" stroke-width="2" />
      <circle cx="18" cy="18" r="2.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="46" cy="18" r="2.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M18 18l12 14M46 18l-12 14" stroke="var(--accent-cyan)" stroke-width="1.8" stroke-dasharray="2 1" />
      <circle cx="30" cy="32" r="3" fill="var(--accent-orange)" stroke="none" />
      <circle cx="34" cy="32" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 20. 바벨 컬 / 프리처 벤치 (Barbell Curl)
  'barbell-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 32h10l4-4h6l4 4h6l4-4h6l4 4h8" stroke="var(--text-main)" stroke-width="2.8" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="10" y="20" width="5" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="6" y="24" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <rect x="49" y="20" width="5" height="24" rx="2" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="54" y="24" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <circle cx="25" cy="30" r="2" fill="var(--accent-orange)" stroke="none" />
      <circle cx="39" cy="30" r="2" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 21. 프리처 컬 벤치 / 머신 (Preacher Curl Station)
  'preacher-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="44" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M20 49v7M38 38v18" stroke="var(--border-color)" />
      <path d="M30 24l16 14" stroke="var(--accent-cyan)" stroke-width="6" stroke-linecap="round" />
      <circle cx="48" cy="32" r="3" fill="var(--accent-orange)" stroke="none" />
      <path d="M42 32h14" stroke="var(--text-main)" stroke-width="2.5" />
    </svg>
  `,

  // 22. 데드리프트 바벨 (Deadlift Platform)
  'deadlift': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M6 54h52" stroke="var(--text-dim)" stroke-width="2" />
      <rect x="10" y="52" width="44" height="4" rx="1" fill="var(--bg-input)" stroke="var(--border-color)" />
      <path d="M4 42h56" stroke="var(--text-main)" stroke-width="3" />
      <circle cx="14" cy="42" r="11" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <circle cx="14" cy="42" r="4" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <circle cx="50" cy="42" r="11" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <circle cx="50" cy="42" r="4" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <path d="M30 40v4M34 40v4" stroke="var(--accent-cyan)" stroke-width="1.8" />
    </svg>
  `,

  // 23. 케틀벨 (Kettlebell)
  'kettlebell': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="32" cy="38" r="15" fill="var(--bg-input)" stroke="var(--accent-orange)" stroke-width="2.5" />
      <path d="M22 28V16c0-4 4-6 10-6s10 2 10 6v12" stroke="var(--text-main)" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="32" cy="38" r="5" fill="var(--bg-dark)" stroke="none" />
      <text x="32" y="41" font-size="8" font-weight="900" text-anchor="middle" fill="var(--accent-cyan)" stroke="none">16</text>
    </svg>
  `,

  // 24. 앱도미널 / 캡틴스 체어 (Captain's Chair / Hanging Leg Raise)
  'captains-chair': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V16M46 56V16" stroke="var(--text-muted)" stroke-width="2.2" />
      <rect x="26" y="22" width="12" height="18" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M18 34h10M46 34H36" stroke="var(--accent-orange)" stroke-width="3.5" stroke-linecap="round" />
      <path d="M24 34v-8M40 34v-8" stroke="var(--accent-cyan)" stroke-width="2.5" />
    </svg>
  `,

  // 25. 매트 & 코어 (Yoga / Fitness Mat & Core)
  'mat-core': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 48c0-4 4-7 10-7h32c4 0 6 3 6 7s-2 7-6 7H20c-6 0-10-3-10-7z" fill="var(--bg-input)" stroke="var(--accent-emerald)" stroke-width="2" />
      <ellipse cx="18" cy="48" rx="4" ry="7" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2" />
      <path d="M28 28c4-6 12-6 16 0" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="36" cy="32" r="3" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 26. 런닝머신 / 트레드밀 (Treadmill)
  'treadmill': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M12 52l32-6" stroke="var(--accent-emerald)" stroke-width="5" stroke-linecap="round" />
      <circle cx="13" cy="52" r="3" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <circle cx="43" cy="46" r="3" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <path d="M40 46l6-24" stroke="var(--text-muted)" stroke-width="2.5" />
      <path d="M34 26h14" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <rect x="42" y="16" width="10" height="7" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  // 27. 실내 사이클 / 스핀 바이크 (Stationary Bike)
  'stationary-bike': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="44" cy="42" r="10" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2.5" />
      <circle cx="44" cy="42" r="3" fill="var(--accent-cyan)" stroke="none" />
      <path d="M22 52l10-18h12l-12 18z" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M22 52l6-22" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M24 30h8" stroke="var(--bg-input)" stroke-width="4" stroke-linecap="round" />
      <path d="M42 34l4-16h-6" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="32" cy="52" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  // 28. 천국의 계단 / 스텝밀 (Stairmaster / StepMill)
  'stairmaster': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 52h8v-8h8v-8h8v-8h8v24" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 44l16-16v-8" stroke="var(--accent-emerald)" stroke-width="2.2" stroke-linecap="round" />
      <path d="M36 20h8" stroke="var(--accent-emerald)" stroke-width="3" stroke-linecap="round" />
      <rect x="42" y="12" width="10" height="8" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  // 29. 일립티컬 머신 (Elliptical Cross Trainer)
  'elliptical': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="20" cy="46" r="8" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
      <path d="M20 46l24-6" stroke="var(--accent-emerald)" stroke-width="3" stroke-linecap="round" />
      <path d="M40 40l6-24" stroke="var(--text-muted)" stroke-width="2.2" />
      <path d="M42 16h6" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <rect x="36" y="44" width="12" height="4" rx="1" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  // 30. 로잉 머신 (Rowing Machine)
  'rowing-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 54h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 48h36" stroke="var(--text-muted)" stroke-width="3" />
      <circle cx="48" cy="40" r="9" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <rect x="24" y="42" width="10" height="6" rx="2" fill="var(--accent-emerald)" stroke="none" />
      <path d="M40 38l-8-4" stroke="var(--accent-orange)" stroke-width="2" />
      <circle cx="31" cy="34" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `
};

// Comprehensive Encyclopedia of 55+ Gym Exercises & Equipment
const EQUIPMENT_CATALOG = [
  // ==========================================
  // 1. 가슴 (Chest)
  // ==========================================
  {
    name: '벤치프레스',
    category: '가슴',
    englishName: 'Barbell Flat Bench Press',
    iconType: 'bench-press',
    equipmentType: '바벨 & 플랫 랙',
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
    name: '디클라인 벤치프레스',
    category: '가슴',
    englishName: 'Decline Barbell Bench Press',
    iconType: 'decline-bench',
    equipmentType: '디클라인 벤치 & 바벨',
    targetMuscles: '대흉근 하부 (복근두), 삼두근',
    defaultWeight: 55,
    defaultReps: 12,
    restSeconds: 120,
    tips: '아랫가슴 라인을 선명하게 분리하며 어깨 부담이 비교적 적습니다.'
  },
  {
    name: '덤벨 벤치프레스',
    category: '가슴',
    englishName: 'Dumbbell Flat Bench Press',
    iconType: 'dumbbell',
    equipmentType: '덤벨 & 플랫 벤치',
    targetMuscles: '대흉근 안쪽/외측, 전면 삼각근',
    defaultWeight: 20,
    defaultReps: 12,
    restSeconds: 90,
    tips: '바벨보다 더 깊은 가동범위로 가슴 근육을 강하게 이완/수축할 수 있습니다.'
  },
  {
    name: '인클라인 덤벨프레스',
    category: '가슴',
    englishName: 'Incline Dumbbell Press',
    iconType: 'dumbbell',
    equipmentType: '각도조절 벤치 & 덤벨',
    targetMuscles: '대흉근 상부, 전면 삼각근',
    defaultWeight: 18,
    defaultReps: 12,
    restSeconds: 90,
    tips: '정점에서 덤벨을 부딪치지 말고 윗가슴의 수축감을 유지하세요.'
  },
  {
    name: '덤벨 플라이',
    category: '가슴',
    englishName: 'Flat Dumbbell Fly',
    iconType: 'dumbbell',
    equipmentType: '덤벨 & 플랫 벤치',
    targetMuscles: '대흉근 외측 최대 신장',
    defaultWeight: 12,
    defaultReps: 12,
    restSeconds: 60,
    tips: '팔꿈치를 살짝 구부린 상태를 유지하며 큰 나무를 안듯 가슴을 벌립니다.'
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
    name: '인클라인 체스트프레스 머신',
    category: '가슴',
    englishName: 'Incline Chest Press Machine',
    iconType: 'chest-machine',
    equipmentType: '해머스트렝스 인클라인 머신',
    targetMuscles: '대흉근 상부 고립',
    defaultWeight: 35,
    defaultReps: 12,
    restSeconds: 90,
    tips: '궤적이 고정되어 어깨 부상 위험 없이 윗가슴에 고중량을 실을 수 있습니다.'
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
    tips: '팔꿈치를 살짝 굽힌 상태를 유지하며 가슴 안쪽을 쥐어짜듯 모아줍니다.'
  },
  {
    name: '케이블 크로스오버',
    category: '가슴',
    englishName: 'Cable Crossover Fly',
    iconType: 'cable-cross',
    equipmentType: '듀얼 케이블 타워',
    targetMuscles: '대흉근 하부/내측, 지속 장력',
    defaultWeight: 15,
    defaultReps: 15,
    restSeconds: 60,
    tips: '케이블의 지속적인 텐션을 활용해 정점에서 손잡이를 교차하듯 쥐어짭니다.'
  },
  {
    name: '스미스머신 벤치프레스',
    category: '가슴',
    englishName: 'Smith Machine Bench Press',
    iconType: 'smith-machine',
    equipmentType: '스미스 머신',
    targetMuscles: '대흉근 전체 (안전 궤적)',
    defaultWeight: 50,
    defaultReps: 12,
    restSeconds: 120,
    tips: '바의 수직 궤적에 맞춰 벤치 위치를 정밀하게 세팅하세요.'
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
    tips: '상체를 앞으로 30도 숙여 진행하면 아랫가슴에 강한 자극이 전달됩니다.'
  },
  {
    name: '푸쉬업',
    category: '가슴',
    englishName: 'Standard Push-Up',
    iconType: 'mat-core',
    equipmentType: '맨몸 / 푸쉬업 바',
    targetMuscles: '대흉근, 전면삼각근, 코어',
    defaultWeight: 0,
    defaultReps: 15,
    restSeconds: 60,
    tips: '복근과 둔근을 조여 몸을 일직선으로 유지하며 가슴이 바닥에 닿을 때까지 하강.'
  },

  // ==========================================
  // 2. 등 (Back)
  // ==========================================
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
    englishName: 'Seated Cable Row (Long Pull)',
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
    englishName: 'Pull Up (Overhand Grip)',
    iconType: 'dips-pullup',
    equipmentType: '풀업 바 / 친닝디핑',
    targetMuscles: '광배근, 대원근, 전완근',
    defaultWeight: 0,
    defaultReps: 10,
    restSeconds: 90,
    tips: '숄더팩킹을 먼저 걸고 가슴을 바에 닿게 한다는 느낌으로 당겨 올립니다.'
  },
  {
    name: '친업',
    category: '등',
    englishName: 'Chin Up (Underhand Grip)',
    iconType: 'dips-pullup',
    equipmentType: '풀업 바',
    targetMuscles: '광배근 하부, 상완이두근',
    defaultWeight: 0,
    defaultReps: 10,
    restSeconds: 90,
    tips: '손바닥이 얼굴을 향하게 잡고 이두와 광배근 하부를 함께 동원합니다.'
  },
  {
    name: '어시스트 풀업',
    category: '등',
    englishName: 'Assisted Pull-Up Machine',
    iconType: 'dips-pullup',
    equipmentType: '체중 보조 핀 머신',
    targetMuscles: '광배근, 등 전체',
    defaultWeight: 30,
    defaultReps: 10,
    restSeconds: 90,
    tips: '초보자도 정확한 광배근 자극 궤적을 익히기에 가장 이상적입니다.'
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
  {
    name: '원암 덤벨 로우',
    category: '등',
    englishName: 'One-Arm Dumbbell Row',
    iconType: 'dumbbell',
    equipmentType: '덤벨 & 플랫 벤치',
    targetMuscles: '광배근 편측 고립, 대원근',
    defaultWeight: 20,
    defaultReps: 12,
    restSeconds: 90,
    tips: '골반을 수평으로 유지하고 팔꿈치를 골반 쪽으로 끌어올립니다.'
  },
  {
    name: '티바 로우',
    category: '등',
    englishName: 'T-Bar Row Machine',
    iconType: 't-bar-row',
    equipmentType: 'T바 로우 머신 / 랜드마인',
    targetMuscles: '등 중앙 두께, 승모근 중부, 광배근',
    defaultWeight: 35,
    defaultReps: 12,
    restSeconds: 90,
    tips: '가슴 패드가 있는 머신은 허리 부담 없이 등 중앙에 고중량을 집중할 수 있습니다.'
  },
  {
    name: '암 풀다운',
    category: '등',
    englishName: 'Straight-Arm Cable Pulldown',
    iconType: 'lat-pulldown',
    equipmentType: '케이블 로프 / 스트레이트 바',
    targetMuscles: '광배근 외측 순수 고립, 대원근',
    defaultWeight: 25,
    defaultReps: 12,
    restSeconds: 60,
    tips: '팔꿈치를 펴고 반원을 그리며 허벅지 쪽으로 바를 누릅니다.'
  },
  {
    name: '하이 로우 머신',
    category: '등',
    englishName: 'ISO-Lateral High Row Machine',
    iconType: 'lat-pulldown',
    equipmentType: '해머스트렝스 하이 로우',
    targetMuscles: '광배근 상부, 승모근 하부',
    defaultWeight: 40,
    defaultReps: 12,
    restSeconds: 90,
    tips: '위에서 대각선 아래로 당겨 광배근 상중부를 강력하게 타격합니다.'
  },
  {
    name: '백 익스텐션',
    category: '등',
    englishName: 'Hyperextension / Back Extension',
    iconType: 'hyperextension',
    equipmentType: '45도 하이퍼 벤치',
    targetMuscles: '척추기립근, 대둔근, 햄스트링',
    defaultWeight: 0,
    defaultReps: 15,
    restSeconds: 60,
    tips: '허리를 과신전하지 말고 기립근과 엉덩이의 힘으로 일직선까지 수축합니다.'
  },

  // ==========================================
  // 3. 하체 (Legs & Glutes)
  // ==========================================
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
    name: '스미스머신 스쿼트',
    category: '하체',
    englishName: 'Smith Machine Squat',
    iconType: 'smith-machine',
    equipmentType: '스미스 머신',
    targetMuscles: '대퇴사두근 집중 타겟',
    defaultWeight: 70,
    defaultReps: 12,
    restSeconds: 150,
    tips: '발을 바벨보다 약간 앞에 두면 허리 부담을 줄이고 허벅지 앞쪽에 집중 가능.'
  },
  {
    name: '핵스쿼트',
    category: '하체',
    englishName: 'Linear Hack Squat Machine',
    iconType: 'hack-squat',
    equipmentType: '핵스쿼트 머신',
    targetMuscles: '대퇴사두근 (대퇴직근/외측광근)',
    defaultWeight: 60,
    defaultReps: 12,
    restSeconds: 150,
    tips: '상체가 패드에 밀착되어 코어 부담 없이 대퇴사두를 한계까지 몰아붙입니다.'
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
    name: '라잉 레그컬',
    category: '하체',
    englishName: 'Prone Lying Leg Curl',
    iconType: 'leg-extension',
    equipmentType: '라잉 레그컬 머신',
    targetMuscles: '햄스트링 상하부 전체',
    defaultWeight: 30,
    defaultReps: 12,
    restSeconds: 90,
    tips: '상체를 패드에 붙이고 발목 패드를 엉덩이에 닿을 때까지 말아 올립니다.'
  },
  {
    name: '이너싸이 (어덕션)',
    category: '하체',
    englishName: 'Seated Hip Adduction',
    iconType: 'inner-outer-thigh',
    equipmentType: '이너싸이 핀 머신',
    targetMuscles: '내전근 (허벅지 안쪽 라인)',
    defaultWeight: 30,
    defaultReps: 15,
    restSeconds: 60,
    tips: '허벅지 안쪽 힘으로 패드를 끝까지 모아 1초간 멈춥니다.'
  },
  {
    name: '아웃싸이 (어브덕션)',
    category: '하체',
    englishName: 'Seated Hip Abduction',
    iconType: 'inner-outer-thigh',
    equipmentType: '아웃싸이 핀 머신',
    targetMuscles: '중둔근, 소둔근 (골반 힙딥 라인)',
    defaultWeight: 35,
    defaultReps: 15,
    restSeconds: 60,
    tips: '상체를 살짝 앞으로 숙이면 엉덩이 상부 및 중둔근 자극이 극대화됩니다.'
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
  {
    name: '런지',
    category: '하체',
    englishName: 'Walking / Static Lunge',
    iconType: 'dumbbell',
    equipmentType: '덤벨 / 바벨',
    targetMuscles: '대둔근, 대퇴사두근, 햄스트링',
    defaultWeight: 12,
    defaultReps: 12,
    restSeconds: 90,
    tips: '앞 무릎이 발끝을 과하게 넘지 않게 90도로 직각 하강합니다.'
  },
  {
    name: '불가리안 스플릿 스쿼트',
    category: '하체',
    englishName: 'Bulgarian Split Squat',
    iconType: 'dumbbell',
    equipmentType: '덤벨 & 벤치',
    targetMuscles: '대둔근, 대퇴사두근 편측 균형',
    defaultWeight: 10,
    defaultReps: 10,
    restSeconds: 90,
    tips: '뒷발을 벤치에 얹고 앞다리 엉덩이로 지면을 밀어 올립니다.'
  },
  {
    name: '카프 레이즈',
    category: '하체',
    englishName: 'Standing / Seated Calf Raise',
    iconType: 'leg-extension',
    equipmentType: '카프 레이즈 머신 / 스텝',
    targetMuscles: '비복근, 가자미근 (종아리)',
    defaultWeight: 40,
    defaultReps: 20,
    restSeconds: 60,
    tips: '뒤꿈치를 최대한 깊게 내렸다가 엄지발가락으로 지면을 강하게 누릅니다.'
  },

  // ==========================================
  // 4. 어깨 (Shoulders)
  // ==========================================
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
    name: '숄더프레스 머신',
    category: '어깨',
    englishName: 'Seated Shoulder Press Machine',
    iconType: 'shoulder-press',
    equipmentType: '숄더프레스 핀 머신',
    targetMuscles: '전면/측면 삼각근 고립',
    defaultWeight: 30,
    defaultReps: 12,
    restSeconds: 120,
    tips: '손잡이를 잡고 팔꿈치가 뒤로 빠지지 않도록 유의하며 밀어 올립니다.'
  },
  {
    name: '아놀드 프레스',
    category: '어깨',
    englishName: 'Arnold Dumbbell Press',
    iconType: 'dumbbell',
    equipmentType: '덤벨 & 벤치',
    targetMuscles: '전면, 측면, 후면 삼각근 복합',
    defaultWeight: 14,
    defaultReps: 12,
    restSeconds: 90,
    tips: '손바닥이 몸을 보게 시작하여 밀어 올리면서 바깥쪽으로 회전시킵니다.'
  },
  {
    name: '사이드 레터럴 레이즈',
    category: '어깨',
    englishName: 'Side Lateral Raise',
    iconType: 'dumbbell',
    equipmentType: '덤벨 / 케이블',
    targetMuscles: '측면 삼각근 (어깨 뽕 볼륨)',
    defaultWeight: 8,
    defaultReps: 15,
    restSeconds: 60,
    tips: '승모근 개입을 줄이고 주전자로 물을 따르듯 팔꿈치를 멀리 던져 올리세요.'
  },
  {
    name: '케이블 사이드 레터럴 레이즈',
    category: '어깨',
    englishName: 'Cable Lateral Raise',
    iconType: 'cable-cross',
    equipmentType: '케이블 머신',
    targetMuscles: '측면 삼각근 (전 구간 장력)',
    defaultWeight: 7.5,
    defaultReps: 15,
    restSeconds: 60,
    tips: '케이블을 다리 뒤로 빼서 잡고 측면으로 부드럽게 끌어올립니다.'
  },
  {
    name: '프론트 레이즈',
    category: '어깨',
    englishName: 'Dumbbell / Barbell Front Raise',
    iconType: 'dumbbell',
    equipmentType: '덤벨 / 원판 / 바벨',
    targetMuscles: '전면 삼각근',
    defaultWeight: 7,
    defaultReps: 12,
    restSeconds: 60,
    tips: '반동 없이 눈높이까지 천천히 들어 올립니다.'
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
  {
    name: '리어 델토이드 머신',
    category: '어깨',
    englishName: 'Reverse Pec Deck / Rear Delt Machine',
    iconType: 'chest-machine',
    equipmentType: '리버스 펙덱 머신',
    targetMuscles: '후면 삼각근 고립',
    defaultWeight: 25,
    defaultReps: 15,
    restSeconds: 60,
    tips: '가슴 패드에 가슴을 대고 팔을 뒤로 넓게 벌리며 후면 어깨를 수축합니다.'
  },
  {
    name: '슈러그',
    category: '어깨',
    englishName: 'Barbell / Dumbbell Shrug',
    iconType: 'bench-press',
    equipmentType: '덤벨 / 바벨 / 스미스머신',
    targetMuscles: '상부 승모근',
    defaultWeight: 60,
    defaultReps: 15,
    restSeconds: 60,
    tips: '어깨를 귀에 닿게 한다는 느낌으로 수직으로 으쓱 올리고 1초간 정지.'
  },

  // ==========================================
  // 5. 팔 (Arms - Biceps & Triceps)
  // ==========================================
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
    englishName: 'Dumbbell Biceps Curl',
    iconType: 'dumbbell',
    equipmentType: '덤벨',
    targetMuscles: '상완이두근',
    defaultWeight: 12,
    defaultReps: 12,
    restSeconds: 60,
    tips: '손목을 바깥쪽으로 돌려 올리면(외번) 이두근 피크에 더 강한 수축이 일어납니다.'
  },
  {
    name: '해머 컬',
    category: '팔',
    englishName: 'Dumbbell Hammer Curl',
    iconType: 'dumbbell',
    equipmentType: '덤벨 / 케이블 로프',
    targetMuscles: '상완근, 상완요골근 (팔 두께)',
    defaultWeight: 12,
    defaultReps: 12,
    restSeconds: 60,
    tips: '손바닥이 마주보게 잡고 망치질하듯 들어 올려 팔의 입체감을 키웁니다.'
  },
  {
    name: '프리처 컬',
    category: '팔',
    englishName: 'Preacher Curl Machine / Bench',
    iconType: 'preacher-curl',
    equipmentType: '프리처 벤치 & EZ바/머신',
    targetMuscles: '상완이두근 하부 고립',
    defaultWeight: 20,
    defaultReps: 12,
    restSeconds: 60,
    tips: '팔을 패드에 완전히 밀착시켜 어깨 반동을 원천 차단합니다.'
  },
  {
    name: '트라이셉스 푸쉬다운',
    category: '팔',
    englishName: 'Triceps Cable Pushdown',
    iconType: 'cable-cross',
    equipmentType: '케이블 스트레이트 바 / V바',
    targetMuscles: '상완삼두근 (외측두/장두)',
    defaultWeight: 25,
    defaultReps: 15,
    restSeconds: 60,
    tips: '팔꿈치를 옆구리에 쐐기처럼 고정하고 아래로 강하게 밀어 삼두를 쥐어짭니다.'
  },
  {
    name: '스컬 크러셔 (라잉 익스텐션)',
    category: '팔',
    englishName: 'Lying Triceps Extension (Skull Crusher)',
    iconType: 'barbell-curl',
    equipmentType: 'EZ바 & 플랫 벤치',
    targetMuscles: '상완삼두근 장두 (두께감)',
    defaultWeight: 20,
    defaultReps: 12,
    restSeconds: 60,
    tips: '팔꿈치를 모으고 이마나 머리 뒤쪽으로 바를 내려 삼두를 늘립니다.'
  },
  {
    name: '오버헤드 트라이셉스 익스텐션',
    category: '팔',
    englishName: 'Overhead Cable/Dumbbell Extension',
    iconType: 'cable-cross',
    equipmentType: '케이블 로프 / 덤벨',
    targetMuscles: '상완삼두근 장두 최대 신장',
    defaultWeight: 15,
    defaultReps: 12,
    restSeconds: 60,
    tips: '머리 위로 팔을 들어 올려 삼두근 장두를 최대로 이완 후 밀어냅니다.'
  },

  // ==========================================
  // 6. 복근/코어 (Core & Abs)
  // ==========================================
  {
    name: '플랭크',
    category: '복근/코어',
    englishName: 'Standard Core Plank',
    iconType: 'mat-core',
    equipmentType: '피트니스 매트',
    targetMuscles: '복직근, 복횡근, 코어 안정성',
    defaultWeight: 0,
    defaultReps: 60,
    restSeconds: 45,
    tips: '복근과 둔근에 힘을 주어 허리가 아래로 꺾이지 않는 일직선을 유지합니다.'
  },
  {
    name: '크런치',
    category: '복근/코어',
    englishName: 'Abdominal Crunch',
    iconType: 'mat-core',
    equipmentType: '매트',
    targetMuscles: '상복부',
    defaultWeight: 0,
    defaultReps: 20,
    restSeconds: 45,
    tips: '허리를 바닥에 붙인 채로 갈비뼈를 골반 쪽으로 말아 올립니다.'
  },
  {
    name: '행잉 레그레이즈',
    category: '복근/코어',
    englishName: 'Hanging / Captains Chair Leg Raise',
    iconType: 'captains-chair',
    equipmentType: '풀업 바 / 캡틴스 체어',
    targetMuscles: '하복부, 장요근',
    defaultWeight: 0,
    defaultReps: 15,
    restSeconds: 45,
    tips: '다리만 들지 말고 골반을 둥글게 말아 올린다는 느낌으로 진행하세요.'
  },
  {
    name: '케이블 크런치',
    category: '복근/코어',
    englishName: 'Kneeling Cable Rope Crunch',
    iconType: 'cable-cross',
    equipmentType: '케이블 로프',
    targetMuscles: '상중 복직근 중량 강화',
    defaultWeight: 30,
    defaultReps: 15,
    restSeconds: 45,
    tips: '엉덩이를 고정하고 등을 둥글게 새우처럼 말아 복근을 수축합니다.'
  },

  // ==========================================
  // 7. 전신 (Full Body)
  // ==========================================
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
    name: '루마니안 데드리프트',
    category: '전신',
    englishName: 'Romanian Deadlift (RDL)',
    iconType: 'deadlift',
    equipmentType: '바벨 / 덤벨',
    targetMuscles: '햄스트링, 대둔근, 척추기립근',
    defaultWeight: 80,
    defaultReps: 10,
    restSeconds: 120,
    tips: '무릎을 살짝 굽히고 엉덩이를 뒤로 밀어 햄스트링 텐션을 유지합니다.'
  },
  {
    name: '스모 데드리프트',
    category: '전신',
    englishName: 'Sumo Deadlift',
    iconType: 'deadlift',
    equipmentType: '바벨 & 플랫폼',
    targetMuscles: '내전근, 대둔근, 대퇴사두근',
    defaultWeight: 100,
    defaultReps: 8,
    restSeconds: 180,
    tips: '넓은 보폭과 외회전으로 고관절을 바벨에 가깝게 붙여 수직으로 뽑습니다.'
  },
  {
    name: '케틀벨 스윙',
    category: '전신',
    englishName: 'Kettlebell Russian Swing',
    iconType: 'kettlebell',
    equipmentType: '케틀벨',
    targetMuscles: '둔근 파워, 햄스트링, 심폐 지구력',
    defaultWeight: 16,
    defaultReps: 20,
    restSeconds: 60,
    tips: '스쿼트가 아닌 힙힌지(Hip-Hinge) 폭발적인 엉덩이 튕김으로 케틀벨을 띄웁니다.'
  },

  // ==========================================
  // 8. 유산소 (Cardio)
  // ==========================================
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
    name: '일립티컬',
    category: '유산소',
    englishName: 'Elliptical Cross Trainer',
    iconType: 'elliptical',
    equipmentType: '일립티컬 머신',
    targetMuscles: '무릎 관절 무부하 전신 유산소',
    defaultWeight: 10.0,
    defaultReps: 20,
    restSeconds: 30,
    tips: '관절 충격 없이 상하체 핸들을 함께 밀고 당기며 유산소 운동을 수행합니다.'
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

  // Fallback match by keywords or category
  const lower = (exerciseName || '').toLowerCase();
  if (lower.includes('스미스')) return EQUIPMENT_SVGS['smith-machine'];
  if (lower.includes('핵스쿼트')) return EQUIPMENT_SVGS['hack-squat'];
  if (lower.includes('티바')) return EQUIPMENT_SVGS['t-bar-row'];
  if (lower.includes('힙') || lower.includes('쓰러스터')) return EQUIPMENT_SVGS['hip-thrust'];
  if (lower.includes('이너') || lower.includes('아웃') || lower.includes('싸이')) return EQUIPMENT_SVGS['inner-outer-thigh'];
  if (lower.includes('익스텐션') && (category === '등' || lower.includes('백'))) return EQUIPMENT_SVGS['hyperextension'];
  if (lower.includes('익스텐션') && category === '하체') return EQUIPMENT_SVGS['leg-extension'];
  if (lower.includes('레그컬') || lower.includes('컬') && category === '하체') return EQUIPMENT_SVGS['leg-extension'];
  if (lower.includes('레그프레스')) return EQUIPMENT_SVGS['leg-press'];
  if (lower.includes('스쿼트')) return EQUIPMENT_SVGS['squat-rack'];
  if (lower.includes('데드리프트')) return EQUIPMENT_SVGS['deadlift'];
  if (lower.includes('케틀벨')) return EQUIPMENT_SVGS['kettlebell'];
  if (lower.includes('풀업') || lower.includes('친업') || lower.includes('턱걸이') || lower.includes('딥스')) return EQUIPMENT_SVGS['dips-pullup'];
  if (lower.includes('풀다운') || lower.includes('렛풀')) return EQUIPMENT_SVGS['lat-pulldown'];
  if (lower.includes('로우') && lower.includes('케이블')) return EQUIPMENT_SVGS['cable-row'];
  if (lower.includes('인클라인') && lower.includes('벤치')) return EQUIPMENT_SVGS['incline-bench'];
  if (lower.includes('디클라인')) return EQUIPMENT_SVGS['decline-bench'];
  if (lower.includes('벤치') || lower.includes('체스트')) return EQUIPMENT_SVGS['bench-press'];
  if (lower.includes('계단') || lower.includes('스텝밀')) return EQUIPMENT_SVGS['stairmaster'];
  if (lower.includes('일립티컬')) return EQUIPMENT_SVGS['elliptical'];
  if (lower.includes('사이클') || lower.includes('바이크')) return EQUIPMENT_SVGS['stationary-bike'];
  if (lower.includes('로잉')) return EQUIPMENT_SVGS['rowing-machine'];
  if (lower.includes('러닝') || lower.includes('런닝') || category === '유산소') return EQUIPMENT_SVGS['treadmill'];
  if (lower.includes('프리처')) return EQUIPMENT_SVGS['preacher-curl'];
  if (lower.includes('바벨') && lower.includes('컬')) return EQUIPMENT_SVGS['barbell-curl'];
  if (lower.includes('케이블') || lower.includes('푸쉬다운') || lower.includes('페이스풀')) return EQUIPMENT_SVGS['cable-cross'];
  if (lower.includes('플랭크') || lower.includes('크런치') || category === '복근/코어') return EQUIPMENT_SVGS['mat-core'];
  if (lower.includes('덤벨')) return EQUIPMENT_SVGS['dumbbell'];

  // Default Dumbbell
  return EQUIPMENT_SVGS['dumbbell'];
}

// Global expose
window.EQUIPMENT_SVGS = EQUIPMENT_SVGS;
window.EQUIPMENT_CATALOG = EQUIPMENT_CATALOG;
window.getExerciseSvgIcon = getExerciseSvgIcon;
