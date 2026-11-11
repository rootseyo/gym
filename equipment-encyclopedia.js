/**
 * FitTracker Pro - Illustrated Equipment & Exercise Encyclopedia Module (Phase 1 Enhanced)
 * Complete Master Catalog of 168 Gym Equipment, Free Weights, Plate-Loaded/Pin Machines & Cardio.
 * Features 105 custom SVG vector illustrations, 6+1 equipment taxonomy, synonyms & alternatives.
 */

// SVG Vector Icon Path Library (ViewBox 0 0 64 64, Stroke-based, Neon accentable)
const EQUIPMENT_SVGS = {
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

  'hyperextension': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56l24-24" stroke="var(--text-muted)" stroke-width="3" stroke-linecap="round" />
      <rect x="36" y="26" width="12" height="8" rx="2" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <circle cx="20" cy="50" r="4" fill="var(--accent-orange)" stroke="none" />
      <path d="M26 46l8 10" stroke="var(--border-color)" />
    </svg>
  `,

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

  'hack-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56l30-36" stroke="var(--text-muted)" stroke-width="3" stroke-linecap="round" />
      <rect x="30" y="24" width="16" height="12" rx="2" transform="rotate(40 38 30)" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M42 22l6-4M46 26l4-3" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <rect x="12" y="48" width="12" height="6" rx="1" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
    </svg>
  `,

  'v-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 56l18-38 18 38" stroke="var(--text-muted)" stroke-width="2.5" />
      <rect x="22" y="24" width="20" height="10" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M22 20h20" stroke="var(--accent-orange)" stroke-width="3.5" stroke-linecap="round" />
      <rect x="12" y="50" width="40" height="6" rx="1" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
    </svg>
  `,

  'pendulum-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="20" cy="18" r="4" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <path d="M20 18l24 30" stroke="var(--accent-cyan)" stroke-width="3.5" stroke-linecap="round" />
      <rect x="36" y="38" width="16" height="12" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="14" y="48" width="14" height="6" rx="1" fill="var(--accent-emerald)" stroke="none" />
    </svg>
  `,

  'belt-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="18" y="50" width="28" height="6" rx="1" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M32 50V30" stroke="var(--accent-orange)" stroke-width="3" stroke-dasharray="2 1" />
      <rect x="26" y="24" width="12" height="6" rx="3" fill="var(--accent-orange)" stroke="none" />
      <path d="M48 56V18h-8" stroke="var(--text-muted)" stroke-width="2" />
    </svg>
  `,

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

  'glute-kickback': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="16" y="28" width="16" height="18" rx="2" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M24 46v10M16 28l-4-6" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M32 38l16-4" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <rect x="46" y="30" width="6" height="12" rx="2" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

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

  'lateral-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="26" y="40" width="12" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="29" y="20" width="6" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M20 30l-8-6M44 30l8-6" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="12" cy="24" r="3.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="52" cy="24" r="3.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

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

  'landmine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="14" cy="54" r="5" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2" />
      <path d="M14 54L48 18" stroke="var(--text-main)" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="42" cy="24" r="7" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
      <circle cx="48" cy="18" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'trap-bar': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <polygon points="32,20 44,28 44,40 32,48 20,40 20,28" fill="var(--bg-input)" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <path d="M4 34h16M44 34h16" stroke="var(--text-main)" stroke-width="3" />
      <rect x="6" y="24" width="4" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <rect x="54" y="24" width="4" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <circle cx="20" cy="34" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="44" cy="34" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

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

  'kettlebell': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="32" cy="38" r="15" fill="var(--bg-input)" stroke="var(--accent-orange)" stroke-width="2.5" />
      <path d="M22 28V16c0-4 4-6 10-6s10 2 10 6v12" stroke="var(--text-main)" stroke-width="3.5" stroke-linecap="round" />
      <circle cx="32" cy="38" r="5" fill="var(--bg-dark)" stroke="none" />
      <text x="32" y="41" font-size="8" font-weight="900" text-anchor="middle" fill="var(--accent-cyan)" stroke="none">16</text>
    </svg>
  `,

  'ab-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="22" y="42" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M28 42V20" stroke="var(--text-muted)" stroke-width="3" />
      <path d="M28 22l14 8" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <circle cx="42" cy="30" r="4" fill="var(--accent-orange)" stroke="none" />
      <rect x="42" y="26" width="10" height="24" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
    </svg>
  `,

  'captains-chair': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V16M46 56V16" stroke="var(--text-muted)" stroke-width="2.2" />
      <rect x="26" y="22" width="12" height="18" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M18 34h10M46 34H36" stroke="var(--accent-orange)" stroke-width="3.5" stroke-linecap="round" />
      <path d="M24 34v-8M40 34v-8" stroke="var(--accent-cyan)" stroke-width="2.5" />
    </svg>
  `,

  'mat-core': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 48c0-4 4-7 10-7h32c4 0 6 3 6 7s-2 7-6 7H20c-6 0-10-3-10-7z" fill="var(--bg-input)" stroke="var(--accent-emerald)" stroke-width="2" />
      <ellipse cx="18" cy="48" rx="4" ry="7" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2" />
      <path d="M28 28c4-6 12-6 16 0" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" />
      <circle cx="36" cy="32" r="3" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

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

  'stairmaster': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 52h8v-8h8v-8h8v-8h8v24" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M20 44l16-16v-8" stroke="var(--accent-emerald)" stroke-width="2.2" stroke-linecap="round" />
      <path d="M36 20h8" stroke="var(--accent-emerald)" stroke-width="3" stroke-linecap="round" />
      <rect x="42" y="12" width="10" height="8" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  'arc-trainer': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 48c8-16 24-16 32 0" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="20" cy="46" r="3" fill="var(--accent-orange)" stroke="none" />
      <circle cx="44" cy="46" r="3" fill="var(--accent-orange)" stroke="none" />
      <path d="M32 38l6-22" stroke="var(--text-muted)" stroke-width="2.5" />
      <path d="M34 18h12" stroke="var(--accent-emerald)" stroke-width="3" stroke-linecap="round" />
      <rect x="40" y="12" width="10" height="7" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  'skierg': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="2" />
      <rect x="28" y="10" width="8" height="46" rx="2" fill="var(--bg-input)" stroke="var(--text-muted)" />
      <circle cx="32" cy="16" r="3" fill="var(--accent-cyan)" stroke="none" />
      <path d="M32 16L18 36M32 16l14 20" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 1" />
      <circle cx="18" cy="36" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="46" cy="36" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="32" cy="44" r="6" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2" />
    </svg>
  `,

  'airbike': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="44" cy="38" r="12" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <path d="M44 26v24M32 38h24M36 29l16 18M36 47l16-18" stroke="var(--accent-cyan)" stroke-width="1.2" />
      <path d="M22 52l12-16" stroke="var(--text-muted)" stroke-width="2.5" />
      <path d="M38 34l-8-22" stroke="var(--accent-orange)" stroke-width="3" stroke-linecap="round" />
      <circle cx="30" cy="12" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

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

  'rowing-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 54h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 48h36" stroke="var(--text-muted)" stroke-width="3" />
      <circle cx="48" cy="40" r="9" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.5" />
      <rect x="24" y="42" width="10" height="6" rx="2" fill="var(--accent-emerald)" stroke="none" />
      <path d="M40 38l-8-4" stroke="var(--accent-orange)" stroke-width="2" />
      <circle cx="31" cy="34" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'dumbbell-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="40" width="36" height="6" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M20 46v10M44 46v10" stroke="var(--border-color)" />
      <path d="M14 22h12M38 22h12" stroke="var(--text-main)" stroke-width="3" />
      <rect x="12" y="17" width="3" height="10" rx="1" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="25" y="17" width="3" height="10" rx="1" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="36" y="17" width="3" height="10" rx="1" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="49" y="17" width="3" height="10" rx="1" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M20 34V26M44 34V26" stroke="var(--accent-orange)" stroke-width="1.8" stroke-dasharray="2 2" />
    </svg>
  `,

  'dumbbell-incline-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="46" width="14" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M24 46l18-22" stroke="var(--accent-cyan)" stroke-width="5" stroke-linecap="round" />
      <path d="M20 51v5M38 34l8 22" stroke="var(--border-color)" />
      <path d="M14 18h10M30 14h10" stroke="var(--text-main)" stroke-width="3" />
      <rect x="12" y="14" width="3" height="8" rx="1" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <rect x="23" y="14" width="3" height="8" rx="1" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <rect x="28" y="10" width="3" height="8" rx="1" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <rect x="39" y="10" width="3" height="8" rx="1" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
    </svg>
  `,

  'dumbbell-fly': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="18" y="42" width="28" height="5" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M24 47v9M40 47v9" stroke="var(--border-color)" />
      <path d="M10 34c4-14 14-20 20-20M54 34c-4-14-14-20-20-20" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 2" />
      <rect x="6" y="30" width="8" height="5" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="50" y="30" width="8" height="5" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="32" cy="14" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'incline-hammer-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M20 56l8-42h8l8 42" stroke="var(--text-muted)" stroke-width="2.2" />
      <path d="M22 44l10-18" stroke="var(--accent-cyan)" stroke-width="4.5" stroke-linecap="round" />
      <rect x="16" y="44" width="12" height="4" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M34 16l14 16" stroke="var(--text-main)" stroke-width="3" />
      <circle cx="44" cy="28" r="7" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <circle cx="44" cy="28" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'wide-hammer-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V14h32v42" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="26" y="24" width="12" height="18" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M16 20l-6 14M48 20l6 14" stroke="var(--text-main)" stroke-width="2.8" />
      <circle cx="12" cy="32" r="6" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2" />
      <circle cx="52" cy="32" r="6" fill="var(--bg-dark)" stroke="var(--accent-emerald)" stroke-width="2" />
      <circle cx="12" cy="32" r="2" fill="var(--accent-orange)" stroke="none" />
      <circle cx="52" cy="32" r="2" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'decline-hammer-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V14h24l8 42" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M22 26l6 20" stroke="var(--accent-cyan)" stroke-width="4.5" stroke-linecap="round" />
      <path d="M34 18l14 22" stroke="var(--text-main)" stroke-width="2.8" />
      <circle cx="46" cy="36" r="7" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.2" />
      <circle cx="46" cy="36" r="2" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'pec-deck-fly': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M20 12h24M32 12v44" stroke="var(--text-muted)" stroke-width="2.2" />
      <rect x="26" y="42" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="28" y="24" width="8" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M20 12l-6 12v10M44 12l6 12v10" stroke="var(--accent-cyan)" stroke-width="2.6" />
      <rect x="11" y="24" width="5" height="12" rx="1.5" fill="var(--accent-orange)" stroke="none" />
      <rect x="48" y="24" width="5" height="12" rx="1.5" fill="var(--accent-orange)" stroke="none" />
      <path d="M20 30h4M44 30h-4" stroke="var(--accent-cyan)" stroke-width="2" />
    </svg>
  `,

  'seated-dip-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="20" width="8" height="36" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <path d="M12 28h8M12 36h8M12 44h8" stroke="var(--accent-cyan)" stroke-width="1.2" />
      <rect x="28" y="42" width="14" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="26" y="24" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M24 32h24" stroke="var(--accent-orange)" stroke-width="3.2" stroke-linecap="round" />
      <path d="M46 32v10" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="2 1" />
      <circle cx="48" cy="32" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'assisted-dip-pullup': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="14" width="8" height="42" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <path d="M38 56V12" stroke="var(--text-muted)" stroke-width="2.4" />
      <path d="M28 14h22" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <path d="M32 30h14" stroke="var(--accent-orange)" stroke-width="2.8" />
      <rect x="30" y="40" width="14" height="5" rx="2" fill="var(--bg-input)" stroke="var(--accent-emerald)" stroke-width="2.2" />
      <path d="M37 45v7" stroke="var(--accent-emerald)" stroke-width="1.8" stroke-dasharray="2 1" />
    </svg>
  `,

  'pushup-bars': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M6 52h52" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M12 52l4-12h12l4 12" stroke="var(--text-main)" stroke-width="2.6" />
      <rect x="17" y="38" width="10" height="4" rx="2" fill="var(--accent-cyan)" stroke="none" />
      <path d="M34 52l4-12h12l4 12" stroke="var(--text-main)" stroke-width="2.6" />
      <rect x="39" y="38" width="10" height="4" rx="2" fill="var(--accent-cyan)" stroke="none" />
      <path d="M22 28v-8M44 28v-8" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 2" />
    </svg>
  `,

  'pullover-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="22" width="8" height="34" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <rect x="28" y="42" width="14" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="28" y="24" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M30 14c12 0 20 8 20 18" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="50" cy="32" r="3.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'barbell-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M6 40h52" stroke="var(--text-main)" stroke-width="2.8" />
      <rect x="10" y="28" width="5" height="24" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <rect x="49" y="28" width="5" height="24" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <path d="M26 36l6-16M38 36l-6-16" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
      <circle cx="32" cy="18" r="3" fill="var(--accent-orange)" stroke="none" />
      <path d="M24 26h16" stroke="var(--accent-emerald)" stroke-width="2.5" />
    </svg>
  `,

  'dumbbell-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="38" width="24" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M16 43v13M32 43v13" stroke="var(--border-color)" />
      <path d="M40 42h14" stroke="var(--text-main)" stroke-width="3" />
      <rect x="38" y="37" width="4" height="10" rx="1" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="52" y="37" width="4" height="10" rx="1" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M47 34V22" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
      <circle cx="47" cy="20" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'chest-supported-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 56l26-30" stroke="var(--text-muted)" stroke-width="2.5" />
      <path d="M24 42l16-18" stroke="var(--accent-emerald)" stroke-width="5" stroke-linecap="round" />
      <path d="M36 32l12 14" stroke="var(--text-main)" stroke-width="2.8" />
      <circle cx="48" cy="46" r="7" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <circle cx="48" cy="46" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'iso-low-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M20 56V16h24v40" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="16" y="42" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="26" y="26" width="5" height="16" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M44 46l-10-14" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="44" cy="44" r="7" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.2" />
    </svg>
  `,

  'iso-high-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M22 56V12h20l6 44" stroke="var(--text-muted)" stroke-width="2.2" />
      <rect x="16" y="42" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="26" y="26" width="5" height="16" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M36 14l-10 18" stroke="var(--accent-cyan)" stroke-width="3.2" stroke-linecap="round" />
      <circle cx="44" cy="24" r="7" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <circle cx="44" cy="24" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'one-arm-pulldown': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="12" width="8" height="44" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <path d="M22 14h20" stroke="var(--text-muted)" stroke-width="2.2" />
      <circle cx="42" cy="14" r="2.5" fill="var(--accent-cyan)" stroke="none" />
      <path d="M42 17v12" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="2 1" />
      <path d="M37 29h10l-2 6h-6z" fill="var(--bg-input)" stroke="var(--accent-orange)" stroke-width="2" />
      <rect x="34" y="44" width="14" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
    </svg>
  `,

  'straight-arm-pulldown': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="12" width="8" height="44" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <circle cx="26" cy="16" r="3" fill="var(--accent-cyan)" stroke="none" />
      <path d="M26 16l22 12" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <path d="M48 28c0 10-6 18-16 20" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
      <circle cx="48" cy="28" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'front-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56V12M48 56V12" stroke="var(--text-muted)" stroke-width="2" />
      <path d="M6 26h52" stroke="var(--text-main)" stroke-width="2.8" />
      <rect x="10" y="16" width="4" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="50" y="16" width="4" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M24 26l4-6M40 26l-4-6" stroke="var(--accent-orange)" stroke-width="2.5" />
      <circle cx="32" cy="26" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'goblet-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="26" y="14" width="12" height="6" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M32 20v16" stroke="var(--text-main)" stroke-width="4" />
      <rect x="26" y="36" width="12" height="6" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M18 46l8-10M46 46l-8-10" stroke="var(--accent-orange)" stroke-width="2.5" />
    </svg>
  `,

  'sissy-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 54h48" stroke="var(--text-dim)" stroke-width="2" />
      <rect x="14" y="48" width="36" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--border-color)" />
      <rect x="22" y="32" width="6" height="16" rx="2" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <circle cx="34" cy="38" r="4" fill="var(--accent-orange)" stroke="none" />
      <circle cx="34" cy="46" r="4" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'seated-leg-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="16" y="38" width="16" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <rect x="14" y="20" width="5" height="18" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <circle cx="32" cy="34" r="3.5" fill="var(--accent-cyan)" stroke="none" />
      <path d="M34 38l12 2" stroke="var(--accent-cyan)" stroke-width="2.6" />
      <circle cx="46" cy="40" r="4" fill="var(--accent-orange)" stroke="none" />
      <path d="M44 46c-4 4-10 6-14 4" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 2" />
    </svg>
  `,

  'lying-leg-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M12 42l20-6 20 6" stroke="var(--accent-emerald)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M18 42v14M46 42v14" stroke="var(--border-color)" stroke-width="2" />
      <path d="M52 42l-10-16" stroke="var(--accent-cyan)" stroke-width="2.8" />
      <circle cx="42" cy="26" r="4" fill="var(--accent-orange)" stroke="none" />
      <path d="M52 30c-2-6-6-8-10-8" stroke="var(--accent-orange)" stroke-width="1.8" stroke-dasharray="2 2" />
    </svg>
  `,

  'standing-leg-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="16" y="16" width="8" height="40" rx="1.5" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <rect x="28" y="24" width="8" height="14" rx="2" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M34 48l12-10" stroke="var(--accent-cyan)" stroke-width="2.8" />
      <circle cx="46" cy="38" r="4" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'hip-adduction': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="24" y="40" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <rect x="28" y="20" width="8" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M14 48l10-10M50 48L40 38" stroke="var(--accent-cyan)" stroke-width="3" />
      <path d="M18 44h8M46 44h-8" stroke="var(--accent-orange)" stroke-width="2.5" />
      <circle cx="26" cy="44" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="38" cy="44" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'hip-abduction': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="24" y="40" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <rect x="28" y="20" width="8" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M24 38l-10 10M40 38l10 10" stroke="var(--accent-cyan)" stroke-width="3" />
      <path d="M22 44h-8M42 44h8" stroke="var(--accent-orange)" stroke-width="2.5" />
      <circle cx="12" cy="44" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="52" cy="44" r="2.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'booty-builder': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="34" width="14" height="10" rx="3" fill="var(--bg-input)" stroke="var(--accent-pink)" />
      <path d="M40 52l14-8v12H40z" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
      <path d="M24 44l18-12" stroke="var(--accent-cyan)" stroke-width="3.2" />
      <circle cx="34" cy="36" r="5" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.2" />
    </svg>
  `,

  'dumbbell-lunge': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V40h14l10 12h10" stroke="var(--accent-emerald)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="26" y="22" width="12" height="6" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="24" cy="25" r="3" fill="var(--accent-orange)" stroke="none" />
      <circle cx="40" cy="25" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'bulgarian-split-squat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M44 56V34" stroke="var(--text-muted)" stroke-width="2.5" />
      <circle cx="44" cy="34" r="5" fill="var(--bg-input)" stroke="var(--accent-pink)" stroke-width="2.5" />
      <rect x="16" y="24" width="14" height="6" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M23 34v14" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 2" />
    </svg>
  `,

  'standing-calf-raise': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="16" y="12" width="8" height="44" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <path d="M24 20h18" stroke="var(--accent-cyan)" stroke-width="4" stroke-linecap="round" />
      <rect x="28" y="50" width="14" height="6" rx="1" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M35 44V30" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
    </svg>
  `,

  'seated-calf-raise': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="38" width="14" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-emerald)" />
      <path d="M20 43v13M42 36v20" stroke="var(--border-color)" />
      <rect x="34" y="32" width="10" height="5" rx="2" fill="var(--accent-cyan)" stroke="none" />
      <circle cx="48" cy="28" r="6" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.2" />
    </svg>
  `,

  'glute-ham-raise': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 56V32h28v24" stroke="var(--text-muted)" stroke-width="2.2" />
      <path d="M14 32a8 8 0 0 1 16 0z" fill="var(--bg-input)" stroke="var(--accent-pink)" stroke-width="2.2" />
      <circle cx="46" cy="28" r="3.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="46" cy="36" r="3.5" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'standing-ohp': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M6 18h52" stroke="var(--text-main)" stroke-width="2.8" />
      <rect x="10" y="10" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <rect x="50" y="10" width="4" height="16" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <path d="M24 38V24M40 38V24" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
      <circle cx="32" cy="18" r="2.5" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'dumbbell-shoulder-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="26" y="44" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="30" y="24" width="4" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="10" y="16" width="12" height="5" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="42" y="16" width="12" height="5" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  'iso-shoulder-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M20 56V14h24v42" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="26" y="42" width="12" height="5" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M16 26l10-10M48 26L38 16" stroke="var(--accent-cyan)" stroke-width="3" />
      <circle cx="14" cy="28" r="6" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2" />
      <circle cx="50" cy="28" r="6" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2" />
    </svg>
  `,

  'arnold-press': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="20" width="12" height="6" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <rect x="40" y="20" width="12" height="6" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <path d="M18 38c-4-4-4-10 0-12M46 38c4-4 4-10 0-12" stroke="var(--accent-orange)" stroke-width="2.2" />
      <circle cx="32" cy="34" r="3" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'dumbbell-lateral-raise': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M24 46c-10-4-14-12-14-22M40 46c10-4 14-12 14-22" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 2" />
      <rect x="6" y="20" width="10" height="5" rx="1.5" transform="rotate(-15 11 22)" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <rect x="48" y="20" width="10" height="5" rx="1.5" transform="rotate(15 53 22)" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <circle cx="32" cy="24" r="4" fill="var(--bg-input)" stroke="var(--accent-violet)" />
    </svg>
  `,

  'cable-lateral-raise': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="14" width="8" height="42" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <circle cx="20" cy="48" r="2.5" fill="var(--accent-cyan)" stroke="none" />
      <path d="M20 48L48 24" stroke="var(--accent-cyan)" stroke-width="2.2" stroke-dasharray="2 1" />
      <circle cx="48" cy="24" r="3.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'dumbbell-front-raise': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="32" cy="26" r="10" fill="var(--bg-dark)" stroke="var(--accent-violet)" stroke-width="2.5" />
      <circle cx="32" cy="26" r="3" fill="var(--accent-orange)" stroke="none" />
      <path d="M32 48V38" stroke="var(--accent-cyan)" stroke-width="2.2" stroke-dasharray="2 2" />
    </svg>
  `,

  'face-pull': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="12" width="8" height="44" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <circle cx="22" cy="22" r="2.5" fill="var(--accent-cyan)" stroke="none" />
      <path d="M22 22h16l10-8M38 22l10 8" stroke="var(--accent-cyan)" stroke-width="2.4" />
      <circle cx="48" cy="14" r="3" fill="var(--accent-orange)" stroke="none" />
      <circle cx="48" cy="30" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'reverse-pec-deck': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M18 14h28M32 14v42" stroke="var(--text-muted)" stroke-width="2" />
      <rect x="28" y="24" width="8" height="16" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M24 22L10 30M40 22l14 8" stroke="var(--accent-cyan)" stroke-width="2.8" />
      <circle cx="10" cy="30" r="3" fill="var(--accent-orange)" stroke="none" />
      <circle cx="54" cy="30" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'shrug-barbell': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M6 38h52" stroke="var(--text-main)" stroke-width="2.8" />
      <rect x="10" y="28" width="5" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <rect x="49" y="28" width="5" height="20" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <path d="M22 30V18M42 30V18" stroke="var(--accent-orange)" stroke-width="2.6" />
      <path d="M19 21l3-3 3 3M39 21l3-3 3 3" stroke="var(--accent-orange)" stroke-width="2.2" />
    </svg>
  `,

  'upright-row': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M10 28h12l4 3h12l4-3h12" stroke="var(--text-main)" stroke-width="2.6" />
      <rect x="12" y="20" width="4" height="16" rx="1" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <rect x="48" y="20" width="4" height="16" rx="1" fill="var(--bg-dark)" stroke="var(--accent-violet)" />
      <path d="M32 46V34" stroke="var(--accent-orange)" stroke-width="2.4" stroke-dasharray="2 2" />
    </svg>
  `,

  'dumbbell-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M16 26h24" stroke="var(--text-main)" stroke-width="3.2" />
      <rect x="12" y="16" width="5" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="39" y="16" width="5" height="20" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M48 48c6-8 6-20-2-28" stroke="var(--accent-orange)" stroke-width="2.4" stroke-dasharray="2 2" />
      <circle cx="46" cy="20" r="2.5" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'hammer-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M22 20v24M42 20v24" stroke="var(--text-main)" stroke-width="3.2" />
      <rect x="14" y="12" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="14" y="44" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <rect x="34" y="12" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <rect x="34" y="44" width="16" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-violet)" />
    </svg>
  `,

  'incline-dumbbell-curl': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 48L36 20" stroke="var(--accent-violet)" stroke-width="5" stroke-linecap="round" />
      <path d="M20 48v8M34 24v32" stroke="var(--border-color)" />
      <path d="M40 44c8-2 12-10 10-18" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
      <rect x="44" y="22" width="10" height="5" rx="1.5" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  'biceps-curl-machine': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="18" width="8" height="38" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <path d="M28 28l12 10" stroke="var(--accent-violet)" stroke-width="5" stroke-linecap="round" />
      <path d="M40 38l10-12" stroke="var(--accent-cyan)" stroke-width="2.8" />
      <circle cx="50" cy="26" r="3" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'triceps-pushdown': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="12" width="8" height="44" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <path d="M22 14h18" stroke="var(--text-muted)" stroke-width="2.2" />
      <path d="M40 14v14" stroke="var(--accent-cyan)" stroke-width="2" />
      <path d="M32 34l8-6 8 6" stroke="var(--accent-orange)" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M40 38v12" stroke="var(--accent-cyan)" stroke-width="2" stroke-dasharray="2 2" />
    </svg>
  `,

  'skull-crusher': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="40" width="36" height="5" rx="2" fill="var(--bg-input)" stroke="var(--accent-violet)" />
      <path d="M20 45v11M44 45v11" stroke="var(--border-color)" />
      <path d="M22 34l10-16" stroke="var(--accent-cyan)" stroke-width="2.8" />
      <circle cx="32" cy="18" r="5" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.2" />
      <path d="M18 28c2-8 8-12 14-10" stroke="var(--accent-orange)" stroke-width="1.8" stroke-dasharray="2 2" />
    </svg>
  `,

  'overhead-triceps-ext': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="14" width="8" height="42" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <path d="M22 44l18-28" stroke="var(--accent-cyan)" stroke-width="2.2" stroke-dasharray="2 1" />
      <circle cx="40" cy="16" r="4" fill="var(--accent-orange)" stroke="none" />
      <path d="M40 16l10 6" stroke="var(--accent-violet)" stroke-width="3" />
    </svg>
  `,

  'wrist-roller': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 32h44" stroke="var(--text-main)" stroke-width="3.5" />
      <rect x="26" y="28" width="12" height="8" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <path d="M32 36v14" stroke="var(--accent-orange)" stroke-width="2" />
      <rect x="27" y="50" width="10" height="6" rx="1" fill="var(--bg-dark)" stroke="var(--accent-emerald)" />
    </svg>
  `,

  'crunch-mat': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 52h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M14 52c6-8 18-8 24 0h12" stroke="var(--accent-emerald)" stroke-width="4" stroke-linecap="round" />
      <path d="M20 36c6-8 14-8 20-2" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
      <circle cx="40" cy="34" r="3" fill="var(--accent-cyan)" stroke="none" />
    </svg>
  `,

  'cable-crunch': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="14" y="12" width="8" height="44" rx="1.5" fill="var(--bg-dark)" stroke="var(--text-muted)" />
      <circle cx="24" cy="16" r="2.5" fill="var(--accent-cyan)" stroke="none" />
      <path d="M24 16l16 14" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <path d="M40 30c2 8-2 16-8 20" stroke="var(--accent-orange)" stroke-width="2.5" stroke-dasharray="2 2" />
      <circle cx="40" cy="30" r="3.5" fill="var(--accent-orange)" stroke="none" />
    </svg>
  `,

  'torso-rotation': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M10 56h44" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="12" y="18" width="8" height="38" rx="1" fill="var(--bg-dark)" stroke="var(--border-color)" />
      <circle cx="38" cy="44" r="9" fill="var(--bg-input)" stroke="var(--accent-emerald)" stroke-width="2.2" />
      <path d="M28 28c6-6 14-6 20 0" stroke="var(--accent-orange)" stroke-width="2.5" />
      <path d="M46 25l3 3-3 3" stroke="var(--accent-orange)" stroke-width="2" />
    </svg>
  `,

  'ab-roller': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 52h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="32" cy="34" r="14" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="3" />
      <circle cx="32" cy="34" r="5" fill="var(--bg-input)" stroke="var(--accent-orange)" stroke-width="2" />
      <path d="M12 34h40" stroke="var(--text-main)" stroke-width="3.5" />
    </svg>
  `,

  'roman-chair': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M16 56l22-26" stroke="var(--text-muted)" stroke-width="2.8" />
      <rect x="34" y="24" width="12" height="7" rx="2" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
      <circle cx="18" cy="48" r="3.5" fill="var(--accent-orange)" stroke="none" />
      <path d="M42 18c6 2 8 8 6 14" stroke="var(--accent-orange)" stroke-width="2" stroke-dasharray="2 2" />
    </svg>
  `,

  'romanian-deadlift': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M6 36h52" stroke="var(--text-main)" stroke-width="2.8" />
      <circle cx="14" cy="36" r="9" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.4" />
      <circle cx="50" cy="36" r="9" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.4" />
      <path d="M32 24V48" stroke="var(--accent-orange)" stroke-width="2.2" stroke-dasharray="2 2" />
    </svg>
  `,

  'sumo-deadlift': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M6 54h52" stroke="var(--text-dim)" stroke-width="2" />
      <path d="M4 42h56" stroke="var(--text-main)" stroke-width="2.8" />
      <circle cx="12" cy="42" r="10" fill="var(--bg-dark)" stroke="var(--accent-pink)" stroke-width="2.4" />
      <circle cx="52" cy="42" r="10" fill="var(--bg-dark)" stroke="var(--accent-pink)" stroke-width="2.4" />
      <path d="M22 52l6-14M42 52l-6-14" stroke="var(--accent-orange)" stroke-width="2.5" />
    </svg>
  `,

  'power-clean': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M6 56h52" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M6 24h52" stroke="var(--text-main)" stroke-width="2.8" />
      <circle cx="14" cy="24" r="9" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.4" />
      <circle cx="50" cy="24" r="9" fill="var(--bg-dark)" stroke="var(--accent-orange)" stroke-width="2.4" />
      <path d="M32 50V30" stroke="var(--accent-cyan)" stroke-width="2.5" stroke-dasharray="2 2" />
    </svg>
  `,

  'curved-treadmill': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M12 44c10 8 28 8 38-2" stroke="var(--accent-emerald)" stroke-width="5" stroke-linecap="round" />
      <path d="M44 44l4-26h-8" stroke="var(--text-muted)" stroke-width="2.5" />
      <rect x="42" y="12" width="10" height="6" rx="1.5" fill="var(--bg-input)" stroke="var(--accent-cyan)" />
    </svg>
  `,

  'vertical-climber': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M12 56h40" stroke="var(--text-dim)" stroke-width="1.8" />
      <path d="M32 56L26 10" stroke="var(--text-muted)" stroke-width="3" />
      <path d="M20 22h14M22 38h16" stroke="var(--accent-cyan)" stroke-width="3" stroke-linecap="round" />
      <circle cx="20" cy="22" r="2.5" fill="var(--accent-orange)" stroke="none" />
      <circle cx="38" cy="38" r="2.5" fill="var(--accent-emerald)" stroke="none" />
    </svg>
  `,

  'battle-rope': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <circle cx="12" cy="40" r="4" fill="var(--bg-dark)" stroke="var(--accent-orange)" />
      <path d="M16 38c6-10 12 10 18 0s12 10 20-2" stroke="var(--accent-cyan)" stroke-width="2.8" />
      <path d="M16 42c6 10 12-10 18 0s12-10 20 2" stroke="var(--accent-emerald)" stroke-width="2.4" />
    </svg>
  `,

  'plyo-box': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <polygon points="18,28 46,28 52,56 12,56" fill="var(--bg-input)" stroke="var(--accent-emerald)" stroke-width="2.4" />
      <rect x="26" y="34" width="12" height="4" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" />
      <path d="M32 22V12M28 16l4-4 4 4" stroke="var(--accent-orange)" stroke-width="2.2" />
    </svg>
  `,

  'farmers-walk': `
    <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" class="equip-svg">
      <path d="M8 56h48" stroke="var(--text-dim)" stroke-width="1.8" />
      <rect x="10" y="32" width="18" height="12" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <path d="M15 32v-6h8v6" stroke="var(--accent-orange)" stroke-width="2.5" />
      <rect x="36" y="32" width="18" height="12" rx="2" fill="var(--bg-dark)" stroke="var(--accent-cyan)" stroke-width="2.2" />
      <path d="M41 32v-6h8v6" stroke="var(--accent-orange)" stroke-width="2.5" />
    </svg>
  `
};

// Equipment Type Taxonomy (6+1 Categories)
const EQUIPMENT_CATEGORIES = [
  {
    "id": "all",
    "label": "전체 기구",
    "shortLabel": "전체"
  },
  {
    "id": "barbell",
    "label": "바벨 / 랙 / 스미스",
    "shortLabel": "바벨·스미스"
  },
  {
    "id": "dumbbell",
    "label": "덤벨 / 프리웨이트",
    "shortLabel": "덤벨"
  },
  {
    "id": "pin_machine",
    "label": "웨이트 핀 머신",
    "shortLabel": "핀 머신"
  },
  {
    "id": "plate_loaded",
    "label": "해머 / 플레이트 머신",
    "shortLabel": "해머·플레이트"
  },
  {
    "id": "cable",
    "label": "케이블 머신",
    "shortLabel": "케이블"
  },
  {
    "id": "bodyweight",
    "label": "맨몸 / 소도구",
    "shortLabel": "맨몸·소도구"
  },
  {
    "id": "cardio",
    "label": "유산소 기구",
    "shortLabel": "유산소 기구"
  }
];

// Korean Gym Slang & Shorthand Dictionary
const EXERCISE_SYNONYMS = {
  "사레레": "사이드 레터럴 레이즈",
  "프레레": "프론트 레이즈",
  "후레레": "리어 델토이드",
  "랫풀": "렛풀다운",
  "렛풀": "렛풀다운",
  "롱풀": "시티드 케이블 로우",
  "벤치": "벤치프레스",
  "덤프": "덤벨 벤치프레스",
  "인클덤프": "인클라인 덤벨프레스",
  "밀프": "오버헤드 프레스 (OHP)",
  "숄프": "숄더프레스",
  "스퀏": "스쿼트",
  "레프": "레그프레스",
  "레익": "레그 익스텐션",
  "이너": "이너싸이 (어덕션)",
  "아웃": "아웃싸이 (어브덕션)",
  "천계": "천국의 계단 (스텝밀)",
  "천국의계단": "천국의 계단 (스텝밀)",
  "턱걸이": "풀업 (턱걸이)",
  "라트익": "스컬 크러셔 (라잉 익스텐션)",
  "행레": "행잉 레그레이즈",
  "데드": "데드리프트",
  "루마데드": "루마니안 데드리프트",
  "케오익": "케이블 오버헤드 익스텐션",
  "케이블오버헤드": "케이블 오버헤드 익스텐션",
  "베이지안": "케이블 원 암 바이셉스 컬",
  "베이지안컬": "케이블 원 암 바이셉스 컬",
  "원암케이블컬": "케이블 원 암 바이셉스 컬"
};

// Master Encyclopedia of 168 Gym Exercises & Equipment
const EQUIPMENT_CATALOG = [
  {
    "id": "bench-press",
    "name": "벤치프레스",
    "category": "가슴",
    "englishName": "Barbell Flat Bench Press",
    "iconType": "bench-press",
    "equipmentType": "바벨 & 플랫 랙",
    "equipCategory": "barbell",
    "targetMuscles": "대흉근 전체, 삼두근, 전면 삼각근",
    "defaultWeight": 60,
    "defaultReps": 12,
    "restSeconds": 150,
    "imageUrl": "assets/exercises/bench-press.webp",
    "tips": "견갑을 후하방으로 단단히 고정하고 바를 젖꼭지 라인으로 수직 하강하세요.",
    "aliases": [
      "벤치",
      "플랫벤치",
      "바벨벤치",
      "bp",
      "대흉근"
    ],
    "alternatives": [
      "덤벨 벤치프레스",
      "체스트 프레스 머신",
      "스미스머신 벤치프레스",
      "해머 플랫 체스트 프레스"
    ]
  },
  {
    "id": "incline-bench-press",
    "name": "인클라인 벤치프레스",
    "category": "가슴",
    "englishName": "Incline Barbell Bench Press",
    "iconType": "incline-bench",
    "equipmentType": "각도조절 벤치 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "대흉근 상부 (쇄골두), 전면 삼각근",
    "defaultWeight": 50,
    "defaultReps": 12,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/incline-bench-press.webp",
    "tips": "벤치 각도는 30~45도가 적당하며, 쇄골 바로 아래로 바벨을 내립니다.",
    "aliases": [
      "인클벤치",
      "인클라인바벨",
      "윗가슴"
    ],
    "alternatives": [
      "인클라인 덤벨프레스",
      "인클라인 체스트프레스 머신",
      "해머 인클라인 프레스",
      "스미스머신 인클라인 프레스"
    ]
  },
  {
    "id": "decline-bench-press",
    "name": "디클라인 벤치프레스",
    "category": "가슴",
    "englishName": "Decline Barbell Bench Press",
    "iconType": "decline-bench",
    "equipmentType": "디클라인 벤치 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "대흉근 하부 (복근두), 삼두근",
    "defaultWeight": 55,
    "defaultReps": 12,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/decline-bench-press.webp",
    "tips": "아랫가슴 라인을 선명하게 분리하며 어깨 부담이 비교적 적습니다.",
    "aliases": [
      "디클벤치",
      "아랫가슴"
    ],
    "alternatives": [
      "해머 디클라인 프레스",
      "딥스",
      "시티드 딥스 머신",
      "케이블 하이 투 로우 크로스오버"
    ]
  },
  {
    "id": "dumbbell-bench-press",
    "name": "덤벨 벤치프레스",
    "category": "가슴",
    "englishName": "Dumbbell Flat Bench Press",
    "iconType": "dumbbell-press",
    "equipmentType": "덤벨 & 플랫 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "대흉근 안쪽/외측 가동범위",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 90,
    "imageUrl": "assets/exercises/dumbbell-bench-press.webp",
    "tips": "바벨보다 더 깊은 가동범위로 가슴 근육을 강하게 이완/수축할 수 있습니다.",
    "aliases": [
      "덤프",
      "플랫덤프",
      "덤벨벤치"
    ],
    "alternatives": [
      "벤치프레스",
      "체스트 프레스 머신",
      "와이드 체스트 프레스 머신"
    ]
  },
  {
    "id": "incline-dumbbell-press",
    "name": "인클라인 덤벨프레스",
    "category": "가슴",
    "englishName": "Incline Dumbbell Press",
    "iconType": "dumbbell-incline-press",
    "equipmentType": "각도조절 벤치 & 덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대흉근 상부, 전면 삼각근",
    "defaultWeight": 18,
    "defaultReps": 12,
    "restSeconds": 90,
    "imageUrl": "assets/exercises/incline-dumbbell-press.webp",
    "tips": "정점에서 덤벨을 부딪치지 말고 윗가슴의 수축감을 유지하세요.",
    "aliases": [
      "인클덤프",
      "인클덤벨",
      "윗가슴덤벨"
    ],
    "alternatives": [
      "인클라인 벤치프레스",
      "인클라인 체스트프레스 머신",
      "해머 인클라인 프레스"
    ]
  },
  {
    "id": "dumbbell-fly",
    "name": "덤벨 플라이",
    "category": "가슴",
    "englishName": "Flat Dumbbell Fly",
    "iconType": "dumbbell-fly",
    "equipmentType": "덤벨 & 플랫 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "대흉근 외측 최대 신장",
    "defaultWeight": 12,
    "defaultReps": 12,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/dumbbell-fly.webp",
    "tips": "팔꿈치를 살짝 구부린 상태를 유지하며 큰 나무를 안듯 가슴을 벌립니다.",
    "aliases": [
      "덤벨플라이",
      "가슴플라이"
    ],
    "alternatives": [
      "펙덱 플라이",
      "케이블 크로스오버",
      "인클라인 덤벨 플라이"
    ]
  },
  {
    "id": "incline-dumbbell-fly",
    "name": "인클라인 덤벨 플라이",
    "category": "가슴",
    "englishName": "Incline Dumbbell Fly",
    "iconType": "dumbbell-fly",
    "equipmentType": "인클라인 벤치 & 덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대흉근 상부 외측 신장",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/incline-dumbbell-fly.webp",
    "tips": "윗가슴을 열어주며 어깨가 들리지 않도록 견갑을 밀착합니다.",
    "aliases": [
      "인클플라이",
      "윗가슴플라이"
    ],
    "alternatives": [
      "케이블 로우 투 하이 플라이",
      "펙덱 플라이",
      "덤벨 플라이"
    ]
  },
  {
    "id": "chest-press-machine",
    "name": "체스트 프레스 머신",
    "category": "가슴",
    "englishName": "Seated Chest Press Machine",
    "iconType": "chest-machine",
    "equipmentType": "웨이트 스택 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대흉근 중앙, 삼두근",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "imageUrl": "assets/exercises/chest-press-machine.webp",
    "tips": "의자 높이를 조절하여 손잡이가 가슴 중앙 높이에 오도록 맞추세요.",
    "aliases": [
      "체프",
      "체스트프레스",
      "가슴머신"
    ],
    "alternatives": [
      "벤치프레스",
      "덤벨 벤치프레스",
      "해머 플랫 체스트 프레스",
      "와이드 체스트 프레스 머신"
    ]
  },
  {
    "id": "incline-chest-press-machine",
    "name": "인클라인 체스트프레스 머신",
    "category": "가슴",
    "englishName": "Incline Chest Press Machine",
    "iconType": "incline-hammer-press",
    "equipmentType": "인클라인 핀/플레이트 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대흉근 상부 고립",
    "defaultWeight": 35,
    "defaultReps": 12,
    "restSeconds": 90,
    "imageUrl": "assets/exercises/incline-chest-press-machine.webp",
    "tips": "궤적이 고정되어 어깨 부상 위험 없이 윗가슴에 고중량을 실을 수 있습니다.",
    "aliases": [
      "인클체프",
      "인클라인머신"
    ],
    "alternatives": [
      "해머 인클라인 프레스",
      "인클라인 덤벨프레스",
      "인클라인 벤치프레스"
    ]
  },
  {
    "id": "wide-chest-press-machine",
    "name": "와이드 체스트 프레스 머신",
    "category": "가슴",
    "englishName": "Wide Grip Chest Press",
    "iconType": "wide-hammer-press",
    "equipmentType": "플레이트 로디드 와이드 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대흉근 외측 및 전체 프레임",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "imageUrl": "assets/exercises/wide-chest-press-machine.webp",
    "tips": "넓은 그립으로 가슴 바깥쪽을 강하게 늘려 프레임을 넓힙니다.",
    "aliases": [
      "와이드체프",
      "와이드프레스"
    ],
    "alternatives": [
      "체스트 프레스 머신",
      "해머 플랫 체스트 프레스",
      "덤벨 벤치프레스"
    ]
  },
  {
    "id": "hammer-incline-press",
    "name": "해머 인클라인 프레스",
    "category": "가슴",
    "englishName": "Hammer Strength ISO-Lateral Incline Press",
    "iconType": "incline-hammer-press",
    "equipmentType": "해머스트렝스 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대흉근 상부 (좌우 독립 수축)",
    "defaultWeight": 40,
    "defaultReps": 10,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/hammer-incline-press.webp",
    "tips": "안장 높이를 조절해 밀어낸 정점에서 손잡이가 쇄골 앞에 모이도록 세팅하세요.",
    "aliases": [
      "해머인클라인",
      "플레이트인클라인",
      "아이소인클라인"
    ],
    "alternatives": [
      "인클라인 체스트프레스 머신",
      "인클라인 덤벨프레스",
      "인클라인 벤치프레스"
    ]
  },
  {
    "id": "hammer-flat-chest-press",
    "name": "해머 플랫 체스트 프레스",
    "category": "가슴",
    "englishName": "Hammer Strength ISO-Lateral Bench Press",
    "iconType": "wide-hammer-press",
    "equipmentType": "해머스트렝스 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대흉근 중부 두께감, 삼두근",
    "defaultWeight": 50,
    "defaultReps": 10,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/hammer-flat-chest-press.webp",
    "tips": "좌우 팔이 독립적으로 움직여 짝가슴 교정과 고중량 프레스에 탁월합니다.",
    "aliases": [
      "해머벤치",
      "해머플랫",
      "아이소체프"
    ],
    "alternatives": [
      "벤치프레스",
      "체스트 프레스 머신",
      "와이드 체스트 프레스 머신"
    ]
  },
  {
    "id": "hammer-decline-press",
    "name": "해머 디클라인 프레스",
    "category": "가슴",
    "englishName": "Hammer Strength ISO-Lateral Decline Press",
    "iconType": "decline-hammer-press",
    "equipmentType": "해머스트렝스 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대흉근 하부 및 외측 하단 라인",
    "defaultWeight": 50,
    "defaultReps": 12,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/hammer-decline-press.webp",
    "tips": "손잡이를 아랫가슴 방향으로 비스듬히 밀어 하부 라인을 깊게 타격합니다.",
    "aliases": [
      "해머디클라인",
      "디클라인머신"
    ],
    "alternatives": [
      "디클라인 벤치프레스",
      "시티드 딥스 머신",
      "딥스"
    ]
  },
  {
    "id": "pec-deck-fly",
    "name": "펙덱 플라이",
    "category": "가슴",
    "englishName": "Pec Deck / Butterfly Machine",
    "iconType": "pec-deck-fly",
    "equipmentType": "펙덱 플라이 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대흉근 안쪽 모음, 가슴 분리도",
    "defaultWeight": 30,
    "defaultReps": 12,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/pec-deck-fly.webp",
    "tips": "팔꿈치를 살짝 굽힌 상태를 유지하며 가슴 안쪽을 쥐어짜듯 모아줍니다.",
    "aliases": [
      "펙덱",
      "버터플라이",
      "머신플라이"
    ],
    "alternatives": [
      "케이블 크로스오버",
      "덤벨 플라이",
      "케이블 하이 투 로우 크로스오버"
    ]
  },
  {
    "id": "cable-crossover",
    "name": "케이블 크로스오버",
    "category": "가슴",
    "englishName": "Cable Crossover Fly",
    "iconType": "cable-cross",
    "equipmentType": "듀얼 케이블 타워",
    "equipCategory": "cable",
    "targetMuscles": "대흉근 하부/내측, 지속 장력",
    "defaultWeight": 15,
    "defaultReps": 15,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/cable-crossover.webp",
    "tips": "케이블의 지속적인 텐션을 활용해 정점에서 손잡이를 교차하듯 쥐어짭니다.",
    "aliases": [
      "케이블플라이",
      "크로스오버"
    ],
    "alternatives": [
      "펙덱 플라이",
      "케이블 하이 투 로우 크로스오버",
      "덤벨 플라이"
    ]
  },
  {
    "id": "cable-high-to-low-crossover",
    "name": "케이블 하이 투 로우 크로스오버",
    "category": "가슴",
    "englishName": "High-to-Low Cable Fly",
    "iconType": "cable-cross",
    "equipmentType": "듀얼 케이블 타워 (상단)",
    "equipCategory": "cable",
    "targetMuscles": "대흉근 하부 및 외측 테두리",
    "defaultWeight": 15,
    "defaultReps": 15,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/cable-high-to-low-crossover.webp",
    "tips": "상단 도르래에서 골반 앞쪽으로 찍어 누르듯 모아 아랫가슴을 조입니다.",
    "aliases": [
      "하이투로우",
      "하부케이블플라이"
    ],
    "alternatives": [
      "케이블 크로스오버",
      "딥스",
      "시티드 딥스 머신"
    ]
  },
  {
    "id": "cable-low-to-high-fly",
    "name": "케이블 로우 투 하이 플라이",
    "category": "가슴",
    "englishName": "Low-to-High Cable Fly",
    "iconType": "cable-cross",
    "equipmentType": "듀얼 케이블 타워 (하단)",
    "equipCategory": "cable",
    "targetMuscles": "대흉근 상부 안쪽 골",
    "defaultWeight": 10,
    "defaultReps": 15,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/cable-low-to-high-fly.webp",
    "tips": "하단 도르래에서 쇄골 앞쪽으로 퍼올리듯 모아 윗가슴 안쪽을 채웁니다.",
    "aliases": [
      "로우투하이",
      "상부케이블플라이"
    ],
    "alternatives": [
      "인클라인 덤벨 플라이",
      "펙덱 플라이",
      "케이블 크로스오버"
    ]
  },
  {
    "id": "smith-machine-bench-press",
    "name": "스미스머신 벤치프레스",
    "category": "가슴",
    "englishName": "Smith Machine Bench Press",
    "iconType": "smith-machine",
    "equipmentType": "스미스 머신 & 벤치",
    "equipCategory": "barbell",
    "targetMuscles": "대흉근 전체 (안전 궤적)",
    "defaultWeight": 50,
    "defaultReps": 12,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/smith-machine-bench-press.webp",
    "tips": "바의 수직 궤적에 맞춰 벤치 위치를 정밀하게 세팅하세요.",
    "aliases": [
      "스미스벤치",
      "스미스가슴"
    ],
    "alternatives": [
      "벤치프레스",
      "체스트 프레스 머신",
      "덤벨 벤치프레스"
    ]
  },
  {
    "id": "smith-machine-incline-press",
    "name": "스미스머신 인클라인 프레스",
    "category": "가슴",
    "englishName": "Smith Machine Incline Press",
    "iconType": "smith-machine",
    "equipmentType": "스미스 머신 & 인클라인 벤치",
    "equipCategory": "barbell",
    "targetMuscles": "대흉근 상부 집중 고립",
    "defaultWeight": 45,
    "defaultReps": 12,
    "restSeconds": 120,
    "imageUrl": "assets/exercises/smith-machine-incline-press.webp",
    "tips": "균형 잡는 에너지를 아껴 오직 윗가슴 수축과 이완에만 집중할 수 있습니다.",
    "aliases": [
      "스미스인클",
      "스미스윗가슴"
    ],
    "alternatives": [
      "인클라인 벤치프레스",
      "해머 인클라인 프레스",
      "인클라인 체스트프레스 머신"
    ]
  },
  {
    "id": "seated-dip-machine",
    "name": "시티드 딥스 머신",
    "category": "가슴",
    "imageUrl": "assets/exercises/seated-dip-machine.webp",
    "englishName": "Seated Dip Machine",
    "iconType": "seated-dip-machine",
    "equipmentType": "시티드 딥스 핀/레버 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대흉근 하부, 삼두근",
    "defaultWeight": 45,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "앉아서 손잡이를 아래로 밀어내며 아랫가슴을 강력하게 수축합니다.",
    "aliases": [
      "딥스머신",
      "시티드딥스"
    ],
    "alternatives": [
      "딥스",
      "어시스트 딥스 머신",
      "해머 디클라인 프레스"
    ]
  },
  {
    "id": "assisted-dip-machine",
    "name": "어시스트 딥스 머신",
    "category": "가슴",
    "imageUrl": "assets/exercises/assisted-dip-machine.webp",
    "englishName": "Assisted Dip Machine",
    "iconType": "assisted-dip-pullup",
    "equipmentType": "체중 보조 어시스트 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대흉근 하부, 삼두근",
    "defaultWeight": 25,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "무릎 패드의 보조 중량을 활용해 바른 자세로 아랫가슴을 충분히 늘려줍니다.",
    "aliases": [
      "어시스트딥스",
      "보조딥스"
    ],
    "alternatives": [
      "딥스",
      "시티드 딥스 머신",
      "푸쉬업"
    ]
  },
  {
    "id": "dips",
    "name": "딥스",
    "category": "가슴",
    "imageUrl": "assets/exercises/dips.webp",
    "englishName": "Parallel Bar Dips",
    "iconType": "dips-pullup",
    "equipmentType": "딥스 바 / 파워타워",
    "equipCategory": "bodyweight",
    "targetMuscles": "대흉근 하부, 삼두근",
    "defaultWeight": 0,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "상체를 앞으로 30도 숙여 진행하면 아랫가슴에 강한 자극이 전달됩니다.",
    "aliases": [
      "평행봉",
      "맨몸딥스",
      "중량딥스"
    ],
    "alternatives": [
      "어시스트 딥스 머신",
      "시티드 딥스 머신",
      "디클라인 벤치프레스"
    ]
  },
  {
    "id": "push-up",
    "name": "푸쉬업",
    "category": "가슴",
    "imageUrl": "assets/exercises/push-up.webp",
    "englishName": "Standard Push-Up",
    "iconType": "pushup-bars",
    "equipmentType": "맨몸 / 푸쉬업 바",
    "equipCategory": "bodyweight",
    "targetMuscles": "대흉근, 전면삼각근, 코어",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "복근과 둔근을 조여 몸을 일직선으로 유지하며 가슴이 바닥에 닿을 때까지 하강.",
    "aliases": [
      "팔굽혀펴기",
      "푸시업",
      "푸쉬업바"
    ],
    "alternatives": [
      "체스트 프레스 머신",
      "벤치프레스",
      "딥스"
    ]
  },
  {
    "id": "dumbbell-pullover",
    "name": "덤벨 풀오버",
    "category": "가슴",
    "imageUrl": "assets/exercises/dumbbell-pullover.webp",
    "englishName": "Dumbbell Pullover",
    "iconType": "pullover-machine",
    "equipmentType": "덤벨 & 플랫 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "대흉근 상부/늑골 확장, 전거근, 광배근",
    "defaultWeight": 16,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "벤치에 윗등만 기대고 덤벨을 머리 뒤로 넘겼다가 가슴 위로 끌어당깁니다.",
    "aliases": [
      "풀오버",
      "가슴풀오버"
    ],
    "alternatives": [
      "머신 풀오버",
      "암 풀다운",
      "인클라인 덤벨 플라이"
    ]
  },
  {
    "id": "dumbbell-squeeze-press",
    "name": "덤벨 스퀴즈 프레스",
    "category": "가슴",
    "imageUrl": "assets/exercises/dumbbell-squeeze-press.webp",
    "englishName": "Dumbbell Squeeze / Hex Press",
    "iconType": "dumbbell-press",
    "equipmentType": "덤벨 & 플랫 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "대흉근 내측(가슴 안쪽 라인), 삼두근",
    "defaultWeight": 14,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "두 덤벨을 서로 강하게 밀착시켜 누르며 가슴 안쪽 수축을 끝까지 유지합니다.",
    "aliases": [
      "스퀴즈프레스",
      "헥스프레스",
      "안쪽가슴"
    ],
    "alternatives": [
      "펙덱 플라이",
      "덤벨 벤치프레스",
      "케이블 크로스오버"
    ]
  },
  {
    "id": "lat-pulldown",
    "name": "렛풀다운",
    "category": "등",
    "englishName": "Lat Pulldown Machine",
    "iconType": "lat-pulldown",
    "equipmentType": "케이블 풀다운 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "광배근 외측, 대원근, 이두근",
    "defaultWeight": 45,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "허리를 과하게 꺾지 말고, 팔꿈치를 옆구리 쪽으로 내린다는 느낌으로 당기세요.",
    "aliases": [
      "랫풀",
      "랫풀다운",
      "렛풀",
      "광배"
    ],
    "alternatives": [
      "맥그립 렛풀다운",
      "풀업 (턱걸이)",
      "어시스트 풀업",
      "하이 로우 머신"
    ]
  },
  {
    "id": "mag-grip-lat-pulldown",
    "name": "맥그립 렛풀다운",
    "category": "등",
    "englishName": "MAG Grip Neutral Lat Pulldown",
    "iconType": "lat-pulldown",
    "equipmentType": "케이블 풀다운 & 맥그립",
    "equipCategory": "pin_machine",
    "targetMuscles": "광배근 중하부 및 대원근 집중",
    "defaultWeight": 45,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "손목과 전완근 개입을 최소화하여 광배근 전체를 깊숙이 수축시킵니다.",
    "aliases": [
      "맥그립",
      "맥그립랫풀",
      "패러럴그립"
    ],
    "alternatives": [
      "렛풀다운",
      "언더그립 렛풀다운",
      "해머 프론트 렛풀다운"
    ]
  },
  {
    "id": "underhand-lat-pulldown",
    "name": "언더그립 렛풀다운",
    "category": "등",
    "englishName": "Reverse-Grip / Underhand Lat Pulldown",
    "iconType": "lat-pulldown",
    "equipmentType": "케이블 풀다운 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "광배근 하부, 상완이두근",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "손바닥이 얼굴을 향하게 좁게 잡고 팔꿈치를 옆구리에 스치듯 당겨 내립니다.",
    "aliases": [
      "리버스랫풀",
      "언더랫풀"
    ],
    "alternatives": [
      "친업",
      "맥그립 렛풀다운",
      "렛풀다운"
    ]
  },
  {
    "id": "seated-cable-row",
    "name": "시티드 케이블 로우",
    "category": "등",
    "englishName": "Seated Cable Row (Long Pull)",
    "iconType": "cable-row",
    "equipmentType": "롱풀 케이블 핀 머신",
    "equipCategory": "cable",
    "targetMuscles": "광배근 하부, 능형근, 승모근 중하부",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "상체를 꼿꼿이 세우고 견갑골을 뒤로 모아주며 배꼽 방향으로 당깁니다.",
    "aliases": [
      "롱풀",
      "케이블로우",
      "시티드로우"
    ],
    "alternatives": [
      "로우 로우 머신",
      "해머 DY 로우",
      "바벨 로우",
      "티바 로우"
    ]
  },
  {
    "id": "one-arm-seated-cable-row",
    "name": "케이블 시티드 원암 로우",
    "category": "등",
    "englishName": "Single-Arm Seated Cable Row",
    "iconType": "cable-row",
    "equipmentType": "롱풀 머신 & 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "광배근 하부 편측 최대 가동범위",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "한 손씩 당기며 몸통을 살짝 회전시켜 광배근 하부를 끝까지 쥐어짭니다.",
    "aliases": [
      "원암케이블로우",
      "원암롱풀"
    ],
    "alternatives": [
      "원암 덤벨 로우",
      "로우 로우 머신",
      "시티드 케이블 로우"
    ]
  },
  {
    "id": "pull-up",
    "name": "풀업 (턱걸이)",
    "category": "등",
    "englishName": "Pull Up (Overhand Grip)",
    "iconType": "dips-pullup",
    "equipmentType": "풀업 바 / 친닝디핑",
    "equipCategory": "bodyweight",
    "targetMuscles": "광배근, 대원근, 전완근",
    "defaultWeight": 0,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "숄더팩킹을 먼저 걸고 가슴을 바에 닿게 한다는 느낌으로 당겨 올립니다.",
    "aliases": [
      "턱걸이",
      "풀업",
      "친닝"
    ],
    "alternatives": [
      "어시스트 풀업",
      "렛풀다운",
      "친업"
    ]
  },
  {
    "id": "chin-up",
    "name": "친업",
    "category": "등",
    "englishName": "Chin Up (Underhand Grip)",
    "iconType": "dips-pullup",
    "equipmentType": "풀업 바",
    "equipCategory": "bodyweight",
    "targetMuscles": "광배근 하부, 상완이두근",
    "defaultWeight": 0,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "손바닥이 얼굴을 향하게 잡고 이두와 광배근 하부를 함께 동원합니다.",
    "aliases": [
      "언더턱걸이",
      "역수턱걸이"
    ],
    "alternatives": [
      "풀업 (턱걸이)",
      "어시스트 풀업",
      "언더그립 렛풀다운"
    ]
  },
  {
    "id": "assisted-pull-up",
    "name": "어시스트 풀업",
    "category": "등",
    "englishName": "Assisted Pull-Up Machine",
    "iconType": "assisted-dip-pullup",
    "equipmentType": "체중 보조 어시스트 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "광배근, 등 전체",
    "defaultWeight": 30,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "초보자도 정확한 광배근 자극 궤적을 익히기에 가장 이상적입니다.",
    "aliases": [
      "보조턱걸이",
      "어시스트턱걸이",
      "그라비톤"
    ],
    "alternatives": [
      "풀업 (턱걸이)",
      "렛풀다운",
      "맥그립 렛풀다운"
    ]
  },
  {
    "id": "barbell-row",
    "name": "바벨 로우",
    "category": "등",
    "englishName": "Bent-Over Barbell Row",
    "iconType": "barbell-row",
    "equipmentType": "프리웨이트 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "광배근 두께, 승모근, 척추기립근",
    "defaultWeight": 50,
    "defaultReps": 12,
    "restSeconds": 120,
    "tips": "상체를 45도 숙이고 코어를 잠근 상태에서 바벨을 허벅지 라인을 따라 당기세요.",
    "aliases": [
      "바벨로우",
      "벤트오버로우",
      "등바벨"
    ],
    "alternatives": [
      "펜들레이 로우",
      "티바 로우",
      "시티드 케이블 로우",
      "원암 덤벨 로우"
    ]
  },
  {
    "id": "pendlay-row",
    "name": "펜들레이 로우",
    "category": "등",
    "englishName": "Pendlay Barbell Row",
    "iconType": "barbell-row",
    "equipmentType": "바벨 & 플랫폼",
    "equipCategory": "barbell",
    "targetMuscles": "광배근 폭발적 수축, 등 상부 두께",
    "defaultWeight": 50,
    "defaultReps": 8,
    "restSeconds": 120,
    "tips": "상체를 바닥과 거의 평행하게 숙이고 매 반복마다 바벨을 바닥에 내려놓았다가 폭발적으로 당깁니다.",
    "aliases": [
      "펜들레이",
      "데드로우"
    ],
    "alternatives": [
      "바벨 로우",
      "티바 로우",
      "체스트 서포티드 티바 로우"
    ]
  },
  {
    "id": "one-arm-dumbbell-row",
    "name": "원암 덤벨 로우",
    "category": "등",
    "englishName": "One-Arm Dumbbell Row",
    "iconType": "dumbbell-row",
    "equipmentType": "덤벨 & 플랫 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "광배근 편측 고립, 대원근",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "골반을 수평으로 유지하고 팔꿈치를 골반 쪽으로 끌어올립니다.",
    "aliases": [
      "원암로우",
      "덤벨로우",
      "한팔로우"
    ],
    "alternatives": [
      "케이블 시티드 원암 로우",
      "해머 DY 로우",
      "바벨 로우"
    ]
  },
  {
    "id": "incline-dumbbell-row",
    "name": "인클라인 덤벨 로우",
    "category": "등",
    "englishName": "Chest-Supported Incline Dumbbell Row",
    "iconType": "dumbbell-incline-press",
    "equipmentType": "인클라인 벤치 & 덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "능형근, 중하부 승모근, 광배근 상부",
    "defaultWeight": 16,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "인클라인 벤치에 가슴을 대고 엎드려 허리 개입 없이 순수 등 힘으로만 덤벨을 당깁니다.",
    "aliases": [
      "인클덤벨로우",
      "체스트서포티드덤벨로우"
    ],
    "alternatives": [
      "체스트 서포티드 로우",
      "체스트 서포티드 티바 로우",
      "원암 덤벨 로우"
    ]
  },
  {
    "id": "t-bar-row",
    "name": "티바 로우",
    "category": "등",
    "englishName": "T-Bar Row Machine / Landmine",
    "iconType": "t-bar-row",
    "equipmentType": "T바 로우 머신 / 랜드마인",
    "equipCategory": "plate_loaded",
    "targetMuscles": "등 중앙 두께, 승모근 중부, 광배근",
    "defaultWeight": 35,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "코어를 단단히 고정하고 팔꿈치를 몸통 가까이 붙여 등 중앙을 깊게 접어줍니다.",
    "aliases": [
      "티바로우",
      "t바로우"
    ],
    "alternatives": [
      "체스트 서포티드 티바 로우",
      "바벨 로우",
      "시티드 케이블 로우"
    ]
  },
  {
    "id": "chest-supported-t-bar-row",
    "name": "체스트 서포티드 티바 로우",
    "category": "등",
    "englishName": "Chest-Supported T-Bar Row Machine",
    "iconType": "chest-supported-row",
    "equipmentType": "가슴 패드형 T바 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "등 상중부 두께, 능형근, 광배근",
    "defaultWeight": 30,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "가슴 패드에 체중을 맡기고 견갑골을 최대로 뽑았다가 강하게 모아줍니다.",
    "aliases": [
      "패드티바로우",
      "체스트티바"
    ],
    "alternatives": [
      "티바 로우",
      "체스트 서포티드 로우",
      "인클라인 덤벨 로우"
    ]
  },
  {
    "id": "chest-supported-row",
    "name": "체스트 서포티드 로우",
    "category": "등",
    "englishName": "Chest-Supported Machine Row",
    "iconType": "chest-supported-row",
    "equipmentType": "시티드 체스트 패드 로우 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "등 중상부 순수 고립 (기립근 개입 0%)",
    "defaultWeight": 35,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "패드에 가슴을 밀착하고 어깨가 으쓱거리지 않게 누른 상태에서 당기세요.",
    "aliases": [
      "시티드머신로우",
      "체스트서포티드"
    ],
    "alternatives": [
      "체스트 서포티드 티바 로우",
      "시티드 케이블 로우",
      "로우 로우 머신"
    ]
  },
  {
    "id": "low-row-machine",
    "name": "로우 로우 머신",
    "category": "등",
    "englishName": "ISO-Lateral Low Row Machine",
    "iconType": "iso-low-row",
    "equipmentType": "해머스트렝스 로우 로우",
    "equipCategory": "plate_loaded",
    "targetMuscles": "광배근 하부, 광배근 기시부",
    "defaultWeight": 35,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "아래에서 배꼽 쪽으로 당기며 광배근 하부를 두껍게 채웁니다.",
    "aliases": [
      "로우로우",
      "언더로우머신"
    ],
    "alternatives": [
      "해머 DY 로우",
      "시티드 케이블 로우",
      "원암 덤벨 로우"
    ]
  },
  {
    "id": "hammer-dy-row",
    "name": "해머 DY 로우",
    "category": "등",
    "englishName": "Hammer Strength ISO-Lateral DY Row",
    "iconType": "iso-high-row",
    "equipmentType": "해머스트렝스 DY 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "광배근 하부 및 등 전체 두께감",
    "defaultWeight": 40,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "도리안 예이츠가 설계한 궤적으로 팔꿈치를 골반 뒤쪽까지 깊숙이 당겨 광배 하부를 수축합니다.",
    "aliases": [
      "dy로우",
      "디와이로우",
      "해머로우"
    ],
    "alternatives": [
      "로우 로우 머신",
      "하이 로우 머신",
      "원암 덤벨 로우"
    ]
  },
  {
    "id": "high-row-machine",
    "name": "하이 로우 머신",
    "category": "등",
    "englishName": "ISO-Lateral High Row Machine",
    "iconType": "iso-high-row",
    "equipmentType": "해머스트렝스 하이 로우",
    "equipCategory": "plate_loaded",
    "targetMuscles": "광배근 상부, 대원근, 승모근 하부",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "위에서 대각선 아래로 당겨 광배근 상중부를 강력하게 타격합니다.",
    "aliases": [
      "하이로우",
      "해머하이로우"
    ],
    "alternatives": [
      "해머 프론트 렛풀다운",
      "렛풀다운",
      "로우 로우 머신"
    ]
  },
  {
    "id": "hammer-front-lat-pulldown",
    "name": "해머 프론트 렛풀다운",
    "category": "등",
    "englishName": "Hammer Strength ISO-Lateral Front Lat Pulldown",
    "iconType": "iso-high-row",
    "equipmentType": "해머스트렝스 프론트 풀다운 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "광배근 상하부, 대원근 (편측 독립 궤적)",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "한 팔씩 또는 양팔로 호를 그리며 당겨 광배근 하부까지 강하게 조여줍니다.",
    "aliases": [
      "프론트랫풀",
      "해머랫풀",
      "플레이트랫풀"
    ],
    "alternatives": [
      "렛풀다운",
      "하이 로우 머신",
      "맥그립 렛풀다운"
    ]
  },
  {
    "id": "one-arm-lat-pulldown",
    "name": "원암 렛풀다운",
    "category": "등",
    "englishName": "One-Arm Cable Pulldown",
    "iconType": "one-arm-pulldown",
    "equipmentType": "케이블 머신 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "광배근 편측 최대 수축",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "몸을 살짝 기울여 팔꿈치를 옆구리 안쪽으로 깊게 꽂아 넣습니다.",
    "aliases": [
      "원암랫풀",
      "싱글랫풀"
    ],
    "alternatives": [
      "해머 프론트 렛풀다운",
      "렛풀다운",
      "케이블 시티드 원암 로우"
    ]
  },
  {
    "id": "straight-arm-pulldown",
    "name": "암 풀다운",
    "category": "등",
    "englishName": "Straight-Arm Cable Pulldown",
    "iconType": "straight-arm-pulldown",
    "equipmentType": "케이블 로프 / 스트레이트 바",
    "equipCategory": "cable",
    "targetMuscles": "광배근 외측 순수 고립, 대원근",
    "defaultWeight": 25,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "팔꿈치를 펴고 반원을 그리며 허벅지 쪽으로 바를 누릅니다.",
    "aliases": [
      "암풀다운",
      "스트레이트암풀다운",
      "케이블풀오버"
    ],
    "alternatives": [
      "머신 풀오버",
      "덤벨 풀오버",
      "렛풀다운"
    ]
  },
  {
    "id": "machine-pullover",
    "name": "머신 풀오버",
    "category": "등",
    "englishName": "Lat Pullover Machine",
    "iconType": "pullover-machine",
    "equipmentType": "풀오버 핀/플레이트 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "광배근 전체 신장 및 수축 (이두 개입 0%)",
    "defaultWeight": 35,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "손이 아닌 팔꿈치 패드로 아치를 그리며 골반까지 눌러 광배근만 고립시킵니다.",
    "aliases": [
      "풀오버머신",
      "노틸러스풀오버"
    ],
    "alternatives": [
      "암 풀다운",
      "덤벨 풀오버",
      "렛풀다운"
    ]
  },
  {
    "id": "meadows-row",
    "name": "메도우스 로우",
    "category": "등",
    "englishName": "Landmine Meadows Row",
    "iconType": "landmine",
    "equipmentType": "랜드마인 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "광배근 상부, 대원근, 후면 삼각근",
    "defaultWeight": 25,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "랜드마인 바벨 끝을 오버그립으로 잡고 측면에서 당겨 등 상부를 넓힙니다.",
    "aliases": [
      "랜드마인로우",
      "메도우로우"
    ],
    "alternatives": [
      "원암 덤벨 로우",
      "티바 로우",
      "바벨 로우"
    ]
  },
  {
    "id": "inverted-row",
    "name": "인버티드 로우",
    "category": "등",
    "englishName": "Inverted Bodyweight Row",
    "iconType": "smith-machine",
    "equipmentType": "스미스 머신 / 낮은 바벨 랙",
    "equipCategory": "bodyweight",
    "targetMuscles": "승모근 중부, 능형근, 광배근, 코어",
    "defaultWeight": 0,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "낮은 바에 매달려 몸을 일직선으로 유지한 채 가슴을 바에 붙이듯 당깁니다.",
    "aliases": [
      "누워서턱걸이",
      "호리존탈풀업"
    ],
    "alternatives": [
      "풀업 (턱걸이)",
      "어시스트 풀업",
      "시티드 케이블 로우"
    ]
  },
  {
    "id": "rack-pull",
    "name": "랙 풀",
    "category": "등",
    "englishName": "Barbell Rack Pull",
    "iconType": "squat-rack",
    "equipmentType": "파워 랙 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "척추기립근, 승모근 전체, 등 두께감",
    "defaultWeight": 100,
    "defaultReps": 8,
    "restSeconds": 150,
    "tips": "무릎 높이 세이프티 바에서 시작하여 상부 등 전체로 고중량을 버텨냅니다.",
    "aliases": [
      "랙풀",
      "하프데드"
    ],
    "alternatives": [
      "데드리프트",
      "바벨 로우",
      "백 익스텐션"
    ]
  },
  {
    "id": "back-extension",
    "name": "백 익스텐션",
    "category": "등",
    "englishName": "Hyperextension / Back Extension",
    "iconType": "hyperextension",
    "equipmentType": "45도 하이퍼 벤치",
    "equipCategory": "bodyweight",
    "targetMuscles": "척추기립근, 대둔근, 햄스트링",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "허리를 과신전하지 말고 기립근과 엉덩이의 힘으로 일직선까지 수축합니다.",
    "aliases": [
      "하이퍼익스텐션",
      "기립근운동",
      "허리운동"
    ],
    "alternatives": [
      "루마니안 데드리프트",
      "바벨 굿모닝",
      "글루트 햄 레이즈 (GHR)"
    ]
  },
  {
    "id": "squat",
    "name": "스쿼트",
    "category": "하체",
    "englishName": "Barbell Back Squat",
    "iconType": "squat-rack",
    "equipmentType": "파워 랙 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "대퇴사두근, 대둔근, 햄스트링, 코어",
    "defaultWeight": 80,
    "defaultReps": 12,
    "restSeconds": 180,
    "tips": "발끝과 무릎 방향을 일치시키고 고관절을 먼저 접으며 깊게 앉습니다.",
    "aliases": [
      "백스쿼트",
      "바벨스쿼트",
      "스퀏"
    ],
    "alternatives": [
      "스미스머신 스쿼트",
      "핵스쿼트",
      "V-스쿼트",
      "레그프레스"
    ]
  },
  {
    "id": "front-squat",
    "name": "프론트 스쿼트",
    "category": "하체",
    "englishName": "Barbell Front Squat",
    "iconType": "front-squat",
    "equipmentType": "파워 랙 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "대퇴사두근 집중, 상체 직립 코어",
    "defaultWeight": 60,
    "defaultReps": 10,
    "restSeconds": 150,
    "tips": "팔꿈치를 높이 들어 바벨을 쇄골에 안정적으로 얹고 상체를 세워 앉습니다.",
    "aliases": [
      "프론트스퀏",
      "앞스쿼트"
    ],
    "alternatives": [
      "핵스쿼트",
      "펜듈럼 스쿼트",
      "고블릿 스쿼트",
      "스쿼트"
    ]
  },
  {
    "id": "wide-squat",
    "name": "와이드 스쿼트 (스모 스쿼트)",
    "category": "하체",
    "englishName": "Wide-Stance Sumo Squat",
    "iconType": "goblet-squat",
    "equipmentType": "바벨 / 덤벨 / 케틀벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "내전근(허벅지 안쪽), 대둔근, 대퇴사두근",
    "defaultWeight": 20,
    "defaultReps": 15,
    "restSeconds": 90,
    "tips": "다리를 어깨너비 1.5배 이상 벌리고 발끝을 45도 바깥으로 향해 내전근과 둔근을 늘립니다.",
    "aliases": [
      "와이드스쿼트",
      "스모스쿼트"
    ],
    "alternatives": [
      "이너싸이 (어덕션)",
      "고블릿 스쿼트",
      "벨트 스쿼트"
    ]
  },
  {
    "id": "goblet-squat",
    "name": "고블릿 스쿼트",
    "category": "하체",
    "englishName": "Dumbbell / Kettlebell Goblet Squat",
    "iconType": "goblet-squat",
    "equipmentType": "덤벨 / 케틀벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대퇴사두근, 대둔근, 코어 안정성",
    "defaultWeight": 16,
    "defaultReps": 15,
    "restSeconds": 90,
    "tips": "덤벨이나 케틀벨을 가슴 앞에 바짝 안고 상체를 세워 깊숙이 앉습니다.",
    "aliases": [
      "고블릿",
      "덤벨스쿼트"
    ],
    "alternatives": [
      "프론트 스쿼트",
      "스쿼트",
      "레그프레스"
    ]
  },
  {
    "id": "sissy-squat",
    "name": "씨씨 스쿼트",
    "category": "하체",
    "englishName": "Sissy Squat Bench",
    "iconType": "sissy-squat",
    "equipmentType": "씨씨 스쿼트 머신 (발목 고정 벤치)",
    "equipCategory": "bodyweight",
    "targetMuscles": "대퇴사두근 하부 및 전체 극한 고립",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 90,
    "tips": "발목과 종아리를 패드에 고정하고 무릎을 구부리며 허벅지 앞쪽 힘으로 올라옵니다.",
    "aliases": [
      "씨씨스퀏",
      "시시스쿼트"
    ],
    "alternatives": [
      "레그 익스텐션",
      "펜듈럼 스쿼트",
      "핵스쿼트"
    ]
  },
  {
    "id": "smith-machine-squat",
    "name": "스미스머신 스쿼트",
    "category": "하체",
    "englishName": "Smith Machine Squat",
    "iconType": "smith-machine",
    "equipmentType": "스미스 머신",
    "equipCategory": "barbell",
    "targetMuscles": "대퇴사두근 및 둔근 타겟팅",
    "defaultWeight": 70,
    "defaultReps": 12,
    "restSeconds": 150,
    "tips": "발을 바벨보다 약간 앞에 두면 허리 부담을 줄이고 허벅지와 엉덩이에 집중 가능.",
    "aliases": [
      "스미스스쿼트",
      "스미스스퀏"
    ],
    "alternatives": [
      "핵스쿼트",
      "스쿼트",
      "V-스쿼트"
    ]
  },
  {
    "id": "hack-squat",
    "name": "핵스쿼트",
    "category": "하체",
    "englishName": "Linear Hack Squat Machine",
    "iconType": "hack-squat",
    "equipmentType": "핵스쿼트 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대퇴사두근 (대퇴직근/외측광근)",
    "defaultWeight": 60,
    "defaultReps": 12,
    "restSeconds": 150,
    "tips": "상체가 패드에 밀착되어 코어 부담 없이 대퇴사두를 한계까지 몰아붙입니다.",
    "aliases": [
      "핵스퀏",
      "핵머신"
    ],
    "alternatives": [
      "펜듈럼 스쿼트",
      "V-스쿼트",
      "레그프레스",
      "스미스머신 스쿼트"
    ]
  },
  {
    "id": "v-squat",
    "name": "V-스쿼트",
    "category": "하체",
    "englishName": "V-Squat Machine",
    "iconType": "v-squat",
    "equipmentType": "V스쿼트 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "정방향: 대퇴사두 / 리버스: 둔근, 햄스트링",
    "defaultWeight": 60,
    "defaultReps": 12,
    "restSeconds": 150,
    "tips": "역방향(리버스)으로 서서 힙힌지를 걸면 엉덩이와 햄스트링에 강력한 자극.",
    "aliases": [
      "브이스쿼트",
      "v스쿼트",
      "리버스브이스쿼트"
    ],
    "alternatives": [
      "핵스쿼트",
      "펜듈럼 스쿼트",
      "레그프레스"
    ]
  },
  {
    "id": "pendulum-squat",
    "name": "펜듈럼 스쿼트",
    "category": "하체",
    "englishName": "Pendulum Squat Machine",
    "iconType": "pendulum-squat",
    "equipmentType": "펜듈럼 진자 스쿼트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대퇴사두근 최대 고립 & 깊은 풀가동범위",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 150,
    "tips": "진자 궤적으로 허리와 무릎 부담 없이 하체 앞쪽을 극한으로 태웁니다.",
    "aliases": [
      "펜듈럼",
      "진자스쿼트"
    ],
    "alternatives": [
      "핵스쿼트",
      "V-스쿼트",
      "레그프레스"
    ]
  },
  {
    "id": "belt-squat",
    "name": "벨트 스쿼트",
    "category": "하체",
    "englishName": "Belt Squat Machine",
    "iconType": "belt-squat",
    "equipmentType": "벨트 스쿼트 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "척추 무부하 하체 전반 & 둔근",
    "defaultWeight": 60,
    "defaultReps": 12,
    "restSeconds": 120,
    "tips": "골반에 벨트를 차고 수행하여 척추 압박 없이 순수 다리 힘으로만 중량을 듭니다.",
    "aliases": [
      "벨트스퀏"
    ],
    "alternatives": [
      "V-스쿼트",
      "레그프레스",
      "와이드 스쿼트 (스모 스쿼트)"
    ]
  },
  {
    "id": "leg-press",
    "name": "레그프레스",
    "category": "하체",
    "englishName": "45° Incline Leg Press",
    "iconType": "leg-press",
    "equipmentType": "45도 파워 레그프레스 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대퇴사두근, 둔근 (발 위치에 따라 가변)",
    "defaultWeight": 100,
    "defaultReps": 12,
    "restSeconds": 120,
    "tips": "무릎을 완전히 펴서 락아웃(Lock-out)하지 말고 지속적인 긴장을 유지하세요.",
    "aliases": [
      "레프",
      "파워레그프레스",
      "45도레그프레스"
    ],
    "alternatives": [
      "수평 레그프레스 머신",
      "핵스쿼트",
      "V-스쿼트"
    ]
  },
  {
    "id": "horizontal-leg-press",
    "name": "수평 레그프레스 머신",
    "category": "하체",
    "englishName": "Seated Horizontal Pin Leg Press",
    "iconType": "leg-press",
    "equipmentType": "시티드 레그프레스 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대퇴사두근, 대둔근 (허리 안전)",
    "defaultWeight": 70,
    "defaultReps": 15,
    "restSeconds": 90,
    "tips": "원판을 끼울 필요 없이 핀으로 빠르게 무게를 조절하며 초보자에게도 안전합니다.",
    "aliases": [
      "핀레그프레스",
      "시티드레그프레스"
    ],
    "alternatives": [
      "레그프레스",
      "핵스쿼트",
      "원레그 레그프레스"
    ]
  },
  {
    "id": "single-leg-press",
    "name": "원레그 레그프레스",
    "category": "하체",
    "englishName": "Single-Leg Press",
    "iconType": "leg-press",
    "equipmentType": "레그프레스 머신 (한 발)",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대퇴사두근 및 대둔근 좌우 비대칭 교정",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "한쪽 다리씩 깊게 밀어내며 골반이 틀어지지 않도록 코어를 고정하세요.",
    "aliases": [
      "원레그프레스",
      "한발레그프레스"
    ],
    "alternatives": [
      "불가리안 스플릿 스쿼트",
      "레그프레스",
      "런지"
    ]
  },
  {
    "id": "leg-extension",
    "name": "레그 익스텐션",
    "category": "하체",
    "englishName": "Seated Leg Extension",
    "iconType": "leg-extension",
    "equipmentType": "레그 익스텐션 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대퇴사두근 (허벅지 앞쪽 고립)",
    "defaultWeight": 35,
    "defaultReps": 15,
    "restSeconds": 90,
    "tips": "발목 패드가 정강이 하단에 오게 세팅하고 정점에서 1초간 쥐어짜듯 멈춥니다.",
    "aliases": [
      "레익",
      "익스텐션",
      "앞벅지"
    ],
    "alternatives": [
      "씨씨 스쿼트",
      "레그프레스",
      "핵스쿼트"
    ]
  },
  {
    "id": "seated-leg-curl",
    "name": "레그컬",
    "category": "하체",
    "englishName": "Seated Leg Curl",
    "iconType": "seated-leg-curl",
    "equipmentType": "시티드 레그컬 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "햄스트링 (허벅지 뒤쪽 전체)",
    "defaultWeight": 30,
    "defaultReps": 15,
    "restSeconds": 90,
    "tips": "허벅지 위쪽 고정 패드를 단단히 누르고 뒤꿈치를 엉덩이 아래로 깊게 감아 당깁니다.",
    "aliases": [
      "시티드레그컬",
      "앉아서레그컬",
      "뒷벅지"
    ],
    "alternatives": [
      "라잉 레그컬",
      "스탠딩 레그컬",
      "루마니안 데드리프트"
    ]
  },
  {
    "id": "lying-leg-curl",
    "name": "라잉 레그컬",
    "category": "하체",
    "englishName": "Prone Lying Leg Curl",
    "iconType": "lying-leg-curl",
    "equipmentType": "라잉 레그컬 핀 머신 (엎드림)",
    "equipCategory": "pin_machine",
    "targetMuscles": "햄스트링 단두 및 하부 고립",
    "defaultWeight": 30,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "골반이 패드에서 뜨지 않게 누르면서 발목 패드를 엉덩이 쪽으로 말아 올립니다.",
    "aliases": [
      "엎드려레그컬",
      "프론레그컬"
    ],
    "alternatives": [
      "레그컬",
      "스탠딩 레그컬",
      "글루트 햄 레이즈 (GHR)"
    ]
  },
  {
    "id": "standing-leg-curl",
    "name": "스탠딩 레그컬",
    "category": "하체",
    "englishName": "Standing Single-Leg Curl Machine",
    "iconType": "standing-leg-curl",
    "equipmentType": "스탠딩 원레그 컬 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "햄스트링 편측 집중 고립",
    "defaultWeight": 15,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "한 다리씩 번갈아 수행하여 양쪽 햄스트링의 근력 불균형을 완벽히 잡아줍니다.",
    "aliases": [
      "원레그컬",
      "서서레그컬"
    ],
    "alternatives": [
      "라잉 레그컬",
      "레그컬"
    ]
  },
  {
    "id": "glute-ham-raise",
    "name": "글루트 햄 레이즈 (GHR)",
    "category": "하체",
    "englishName": "Glute Ham Raise (GHD)",
    "iconType": "glute-ham-raise",
    "equipmentType": "GHR 벤치 (글루트 햄 디벨로퍼)",
    "equipCategory": "bodyweight",
    "targetMuscles": "햄스트링, 대둔근, 종아리, 척추기립근",
    "defaultWeight": 0,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "무릎과 발목을 고정하고 햄스트링의 힘으로 몸을 지탱하며 올라옵니다.",
    "aliases": [
      "ghr",
      "노르딕컬",
      "글루트햄"
    ],
    "alternatives": [
      "라잉 레그컬",
      "백 익스텐션",
      "루마니안 데드리프트"
    ]
  },
  {
    "id": "hip-adduction",
    "name": "이너싸이 (어덕션)",
    "category": "하체",
    "englishName": "Seated Hip Adduction",
    "iconType": "hip-adduction",
    "equipmentType": "이너싸이 (어덕션) 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "내전근 (허벅지 안쪽 라인)",
    "defaultWeight": 30,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "허벅지 안쪽 힘으로 패드를 끝까지 모아 1초간 정지 후 천천히 벌립니다.",
    "aliases": [
      "이너싸이",
      "어덕션",
      "허벅지안쪽"
    ],
    "alternatives": [
      "와이드 스쿼트 (스모 스쿼트)",
      "스모 데드리프트"
    ]
  },
  {
    "id": "hip-abduction",
    "name": "아웃싸이 (어브덕션)",
    "category": "하체",
    "englishName": "Seated Hip Abduction",
    "iconType": "hip-abduction",
    "equipmentType": "아웃싸이 (어브덕션) 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "중둔근, 소둔근 (골반 힙딥 라인)",
    "defaultWeight": 35,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "상체를 살짝 앞으로 숙이면 엉덩이 상부 및 중둔근 자극이 극대화됩니다.",
    "aliases": [
      "아웃싸이",
      "어브덕션",
      "중둔근",
      "힙어브덕션"
    ],
    "alternatives": [
      "글루트 킥백 머신",
      "케이블 글루트 킥백",
      "힙 쓰러스터"
    ]
  },
  {
    "id": "hip-thrust",
    "name": "힙 쓰러스터",
    "category": "하체",
    "englishName": "Barbell Hip Thrust",
    "iconType": "hip-thrust",
    "equipmentType": "힙 쓰러스트 벤치 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "대둔근 (엉덩이 볼륨 집중 고립)",
    "defaultWeight": 60,
    "defaultReps": 12,
    "restSeconds": 120,
    "tips": "정점에서 골반을 말아올려 엉덩이를 최대로 수축하고 턱은 당기세요.",
    "aliases": [
      "힙쓰러스트",
      "바벨힙쓰러스트",
      "엉덩이"
    ],
    "alternatives": [
      "부티빌더 힙 쓰러스트 머신",
      "글루트 킥백 머신",
      "루마니안 데드리프트"
    ]
  },
  {
    "id": "booty-builder-hip-thrust",
    "name": "부티빌더 힙 쓰러스트 머신",
    "category": "하체",
    "englishName": "Booty Builder /Hip Thrust Machine",
    "iconType": "booty-builder",
    "equipmentType": "전용 힙 쓰러스트 머신 (벨트형)",
    "equipCategory": "plate_loaded",
    "targetMuscles": "대둔근 전체 및 상부 힙업",
    "defaultWeight": 50,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "바벨 세팅의 번거로움과 골반 통증 없이 패드 벨트를 채워 안전하게 고중량 힙업을 수행합니다.",
    "aliases": [
      "부티빌더",
      "힙쓰러스트머신",
      "글루트드라이브"
    ],
    "alternatives": [
      "힙 쓰러스터",
      "글루트 킥백 머신",
      "아웃싸이 (어브덕션)"
    ]
  },
  {
    "id": "glute-kickback-machine",
    "name": "글루트 킥백 머신",
    "category": "하체",
    "englishName": "Glute Kickback Machine",
    "iconType": "glute-kickback",
    "equipmentType": "글루트 킥백 핀/플레이트 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "대둔근 상부, 힙업",
    "defaultWeight": 25,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "허리를 꺾지 않고 다리를 뒤쪽 대각선 위로 힘차게 밀어 엉덩이를 쥡니다.",
    "aliases": [
      "킥백머신",
      "리어킥",
      "글루트머신"
    ],
    "alternatives": [
      "케이블 글루트 킥백",
      "힙 쓰러스터",
      "아웃싸이 (어브덕션)"
    ]
  },
  {
    "id": "cable-glute-kickback",
    "name": "케이블 글루트 킥백",
    "category": "하체",
    "englishName": "Cable Ankle-Strap Glute Kickback",
    "iconType": "glute-kickback",
    "equipmentType": "하단 케이블 & 발목 스트랩",
    "equipCategory": "cable",
    "targetMuscles": "대둔근 및 중둔근 상부 라인",
    "defaultWeight": 15,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "발목 스트랩을 걸고 골반을 고정한 채 다리를 뒤쪽 대각선 30도로 차올립니다.",
    "aliases": [
      "케이블킥백",
      "발목스트랩킥백"
    ],
    "alternatives": [
      "글루트 킥백 머신",
      "아웃싸이 (어브덕션)",
      "불가리안 스플릿 스쿼트"
    ]
  },
  {
    "id": "cable-hip-abduction",
    "name": "케이블 힙 어브덕션",
    "category": "하체",
    "englishName": "Cable Hip Abduction",
    "iconType": "outer-thigh",
    "equipmentType": "하단 케이블 & 발목 스트랩",
    "equipCategory": "cable",
    "targetMuscles": "중둔근, 소둔근 (골반 힙딥 채움)",
    "defaultWeight": 5,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "상체를 가볍게 지지하고 발목 스트랩을 바깥쪽으로 밀어내며 중둔근 상단을 강하게 수축합니다.",
    "aliases": [
      "케이블어브덕션",
      "케이블중둔근",
      "케이블외전",
      "중둔근케이블"
    ],
    "alternatives": [
      "아웃싸이 (어브덕션)",
      "머신 힙 어브덕션",
      "케이블 글루트 킥백"
    ]
  },
  {
    "id": "lunge",
    "name": "런지",
    "category": "하체",
    "englishName": "Dumbbell Walking / Static Lunge",
    "iconType": "dumbbell-lunge",
    "equipmentType": "덤벨 / 바벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대둔근, 대퇴사두근, 햄스트링",
    "defaultWeight": 12,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "앞 무릎이 발끝을 과하게 넘지 않게 90도로 직각 하강합니다.",
    "aliases": [
      "워킹런지",
      "덤벨런지"
    ],
    "alternatives": [
      "리버스 런지",
      "불가리안 스플릿 스쿼트",
      "스텝업"
    ]
  },
  {
    "id": "reverse-lunge",
    "name": "리버스 런지",
    "category": "하체",
    "englishName": "Reverse / Back Lunge",
    "iconType": "dumbbell-lunge",
    "equipmentType": "덤벨 / 바벨 / 스미스머신",
    "equipCategory": "dumbbell",
    "targetMuscles": "대둔근 집중, 무릎 관절 보호",
    "defaultWeight": 12,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "발을 뒤로 빼며 앉아 무릎 부담은 줄이고 앞다리 엉덩이 자극을 극대화합니다.",
    "aliases": [
      "백런지",
      "리버스런지"
    ],
    "alternatives": [
      "런지",
      "불가리안 스플릿 스쿼트",
      "원레그 레그프레스"
    ]
  },
  {
    "id": "bulgarian-split-squat",
    "name": "불가리안 스플릿 스쿼트",
    "category": "하체",
    "englishName": "Bulgarian Split Squat",
    "iconType": "bulgarian-split-squat",
    "equipmentType": "스플릿 스쿼트 스탠드 & 덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대둔근, 대퇴사두근 편측 균형",
    "defaultWeight": 10,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "뒷발을 롤러에 얹고 상체를 살짝 숙여 앞다리 엉덩이로 지면을 밀어 올립니다.",
    "aliases": [
      "불가리안",
      "스플릿스쿼트",
      "한발스쿼트"
    ],
    "alternatives": [
      "런지",
      "리버스 런지",
      "원레그 레그프레스"
    ]
  },
  {
    "id": "step-up",
    "name": "스텝업",
    "category": "하체",
    "englishName": "Dumbbell Box Step-Up",
    "iconType": "plyo-box",
    "equipmentType": "플라이오 박스 / 벤치 & 덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대둔근, 대퇴사두근, 고관절 안정성",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "뒷다리 반동을 쓰지 말고 박스 위에 올린 앞다리 뒤꿈치 힘으로만 몸을 끌어올립니다.",
    "aliases": [
      "박스스텝업",
      "덤벨스텝업"
    ],
    "alternatives": [
      "불가리안 스플릿 스쿼트",
      "런지",
      "천국의 계단 (스텝밀)"
    ]
  },
  {
    "id": "calf-raise",
    "name": "카프 레이즈",
    "category": "하체",
    "englishName": "Standing / Leg-Press Calf Raise",
    "iconType": "standing-calf-raise",
    "equipmentType": "카프 레이즈 머신 / 스텝 블록",
    "equipCategory": "pin_machine",
    "targetMuscles": "비복근, 가자미근 (종아리 전체)",
    "defaultWeight": 40,
    "defaultReps": 20,
    "restSeconds": 60,
    "tips": "뒤꿈치를 최대한 깊게 내렸다가 엄지발가락으로 지면을 강하게 누릅니다.",
    "aliases": [
      "종아리",
      "카프레이즈"
    ],
    "alternatives": [
      "스탠딩 카프 레이즈",
      "시티드 카프 레이즈",
      "레그프레스"
    ]
  },
  {
    "id": "standing-calf-raise",
    "name": "스탠딩 카프 레이즈",
    "category": "하체",
    "englishName": "Standing Calf Raise Machine",
    "iconType": "standing-calf-raise",
    "equipmentType": "스탠딩 카프 레이즈 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "비복근 (종아리 알통 볼륨)",
    "defaultWeight": 50,
    "defaultReps": 18,
    "restSeconds": 60,
    "tips": "무릎을 편 상태에서 발목을 최대로 꺾어 이완한 뒤 정점에서 1초간 수축합니다.",
    "aliases": [
      "서서카프레이즈",
      "스탠딩종아리"
    ],
    "alternatives": [
      "카프 레이즈",
      "시티드 카프 레이즈"
    ]
  },
  {
    "id": "seated-calf-raise",
    "name": "시티드 카프 레이즈",
    "category": "하체",
    "englishName": "Seated Calf Raise Machine",
    "iconType": "seated-calf-raise",
    "equipmentType": "시티드 카프 레이즈 플레이트 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "가자미근 (종아리 바깥/하단 라인)",
    "defaultWeight": 30,
    "defaultReps": 20,
    "restSeconds": 60,
    "tips": "무릎이 90도로 굽혀진 상태에서는 가자미근이 집중적으로 타격되어 발목 라인을 다듬어줍니다.",
    "aliases": [
      "앉아서카프레이즈",
      "가자미근"
    ],
    "alternatives": [
      "스탠딩 카프 레이즈",
      "카프 레이즈"
    ]
  },
  {
    "id": "barbell-good-morning",
    "name": "바벨 굿모닝",
    "category": "하체",
    "englishName": "Barbell Good Morning",
    "iconType": "squat-rack",
    "equipmentType": "파워 랙 & 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "햄스트링, 대둔근, 척추기립근 (후면 사슬)",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "승모근에 바벨을 얹고 무릎을 살짝 굽힌 채 인사하듯 엉덩이를 뒤로 쭉 밀어냅니다.",
    "aliases": [
      "굿모닝",
      "후면사슬"
    ],
    "alternatives": [
      "루마니안 데드리프트",
      "백 익스텐션",
      "글루트 햄 레이즈 (GHR)"
    ]
  },
  {
    "id": "overhead-press",
    "name": "오버헤드 프레스 (OHP)",
    "category": "어깨",
    "englishName": "Overhead Barbell Press",
    "iconType": "standing-ohp",
    "equipmentType": "스탠딩 바벨 / 파워 랙",
    "equipCategory": "barbell",
    "targetMuscles": "전면/측면 삼각근, 상부 승모근, 코어",
    "defaultWeight": 40,
    "defaultReps": 10,
    "restSeconds": 150,
    "tips": "엉덩이와 복근을 강하게 조여 허리가 꺾이지 않도록 수직으로 밀어 올립니다.",
    "aliases": [
      "밀프",
      "밀리터리프레스",
      "ohp",
      "오버헤드프레스",
      "바벨숄더프레스"
    ],
    "alternatives": [
      "덤벨 숄더프레스",
      "숄더프레스 머신",
      "해머 숄더프레스 머신",
      "스미스머신 숄더프레스"
    ]
  },
  {
    "id": "smith-machine-shoulder-press",
    "name": "스미스머신 숄더프레스",
    "category": "어깨",
    "englishName": "Seated Smith Machine Shoulder Press",
    "iconType": "smith-machine",
    "equipmentType": "스미스 머신 & 80도 벤치",
    "equipCategory": "barbell",
    "targetMuscles": "전면/측면 삼각근 고중량 고립",
    "defaultWeight": 40,
    "defaultReps": 12,
    "restSeconds": 120,
    "tips": "벤치 등받이를 75~85도로 세우고 코끝이나 턱선 높이까지 안전하게 내려 밀어 올립니다.",
    "aliases": [
      "스미스밀프",
      "스미스숄더프레스"
    ],
    "alternatives": [
      "오버헤드 프레스 (OHP)",
      "해머 숄더프레스 머신",
      "숄더프레스 머신"
    ]
  },
  {
    "id": "behind-the-neck-press",
    "name": "비하인드 넥 프레스",
    "category": "어깨",
    "englishName": "Behind-the-Neck Barbell/Smith Press",
    "iconType": "shoulder-press",
    "equipmentType": "스미스 머신 / 바벨 & 벤치",
    "equipCategory": "barbell",
    "targetMuscles": "측면 삼각근 및 전면 삼각근",
    "defaultWeight": 30,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "무리하게 목 뒤 깊숙이 내리지 말고 귀 높이까지만 내려 어깨 충돌을 예방하세요.",
    "aliases": [
      "비하인드넥",
      "목뒤프레스"
    ],
    "alternatives": [
      "숄더프레스 머신",
      "덤벨 숄더프레스",
      "스미스머신 숄더프레스"
    ]
  },
  {
    "id": "dumbbell-shoulder-press",
    "name": "덤벨 숄더프레스",
    "category": "어깨",
    "englishName": "Seated Dumbbell Shoulder Press",
    "iconType": "dumbbell-shoulder-press",
    "equipmentType": "덤벨 & 90도 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "전면/측면 삼각근, 삼두근",
    "defaultWeight": 16,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "팔꿈치가 어깨선보다 약간 앞으로 오게 각도를 두고 귀 옆에서 머리 위로 밉니다.",
    "aliases": [
      "덤숄",
      "덤벨숄프",
      "숄프"
    ],
    "alternatives": [
      "아놀드 프레스",
      "숄더프레스 머신",
      "오버헤드 프레스 (OHP)"
    ]
  },
  {
    "id": "shoulder-press-machine",
    "name": "숄더프레스 머신",
    "category": "어깨",
    "englishName": "Seated Shoulder Press Machine",
    "iconType": "shoulder-press",
    "equipmentType": "숄더프레스 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "전면/측면 삼각근 고립",
    "defaultWeight": 30,
    "defaultReps": 12,
    "restSeconds": 120,
    "tips": "손잡이를 잡고 팔꿈치가 뒤로 빠지지 않도록 유의하며 밀어 올립니다.",
    "aliases": [
      "머신숄프",
      "숄더머신"
    ],
    "alternatives": [
      "해머 숄더프레스 머신",
      "덤벨 숄더프레스",
      "스미스머신 숄더프레스"
    ]
  },
  {
    "id": "hammer-shoulder-press",
    "name": "해머 숄더프레스 머신",
    "category": "어깨",
    "englishName": "Hammer Strength ISO-Lateral Shoulder Press",
    "iconType": "iso-shoulder-press",
    "equipmentType": "해머스트렝스 플레이트 숄더 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "전면 및 측면 삼각근 고중량 프레스",
    "defaultWeight": 35,
    "defaultReps": 10,
    "restSeconds": 120,
    "tips": "자연스러운 아치 궤적으로 어깨 관절에 부담 없이 고중량 훈련이 가능합니다.",
    "aliases": [
      "해머숄프",
      "플레이트숄더프레스"
    ],
    "alternatives": [
      "숄더프레스 머신",
      "스미스머신 숄더프레스",
      "덤벨 숄더프레스"
    ]
  },
  {
    "id": "arnold-press",
    "name": "아놀드 프레스",
    "category": "어깨",
    "englishName": "Arnold Dumbbell Press",
    "iconType": "arnold-press",
    "equipmentType": "덤벨 & 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "전면, 측면, 후면 삼각근 복합",
    "defaultWeight": 14,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "손바닥이 몸을 보게 시작하여 밀어 올리면서 바깥쪽으로 회전시킵니다.",
    "aliases": [
      "아놀드",
      "아놀드숄프"
    ],
    "alternatives": [
      "덤벨 숄더프레스",
      "숄더프레스 머신"
    ]
  },
  {
    "id": "side-lateral-raise",
    "name": "사이드 레터럴 레이즈",
    "category": "어깨",
    "englishName": "Dumbbell Side Lateral Raise",
    "iconType": "dumbbell-lateral-raise",
    "equipmentType": "덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "측면 삼각근 (어깨 뽕 볼륨)",
    "defaultWeight": 8,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "승모근 개입을 줄이고 팔꿈치를 옆으로 멀리 던져 올린다는 느낌으로 수행하세요.",
    "aliases": [
      "사레레",
      "레터럴레이즈",
      "측면어깨",
      "어깨뽕"
    ],
    "alternatives": [
      "사이드 레터럴 레이즈 머신",
      "케이블 사이드 레터럴 레이즈",
      "케이블 Y-레이즈"
    ]
  },
  {
    "id": "lateral-raise-machine",
    "name": "사이드 레터럴 레이즈 머신",
    "category": "어깨",
    "englishName": "Seated Lateral Raise Machine",
    "iconType": "lateral-machine",
    "equipmentType": "델토이드 레이즈 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "측면 삼각근 순수 고립",
    "defaultWeight": 20,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "팔꿈치 패드를 어깨 높이까지 밀어 올려 승모근 개입 없이 측면 삼각근을 고립합니다.",
    "aliases": [
      "머신사레레",
      "사레레머신",
      "레터럴머신"
    ],
    "alternatives": [
      "사이드 레터럴 레이즈",
      "케이블 사이드 레터럴 레이즈"
    ]
  },
  {
    "id": "cable-side-lateral-raise",
    "name": "케이블 사이드 레터럴 레이즈",
    "category": "어깨",
    "englishName": "Cable Side Lateral Raise",
    "iconType": "cable-lateral-raise",
    "equipmentType": "케이블 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "측면 삼각근 (전 구간 일정한 장력)",
    "defaultWeight": 7.5,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "케이블을 다리 뒤나 앞으로 빼서 잡고 측면으로 부드럽게 끌어올립니다.",
    "aliases": [
      "케이블사레레",
      "케사레"
    ],
    "alternatives": [
      "사이드 레터럴 레이즈",
      "사이드 레터럴 레이즈 머신",
      "케이블 Y-레이즈"
    ]
  },
  {
    "id": "cable-y-raise",
    "name": "케이블 Y-레이즈",
    "category": "어깨",
    "englishName": "Cable Dual Y-Raise",
    "iconType": "cable-cross",
    "equipmentType": "듀얼 케이블 타워",
    "equipCategory": "cable",
    "targetMuscles": "측면 삼각근, 하부 승모근",
    "defaultWeight": 5,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "양손에 케이블을 교차해 잡고 대각선 위 Y자 모양으로 뻗어 측면 어깨를 쥐어짭니다.",
    "aliases": [
      "와이레이즈",
      "y레이즈"
    ],
    "alternatives": [
      "케이블 사이드 레터럴 레이즈",
      "사이드 레터럴 레이즈"
    ]
  },
  {
    "id": "front-raise",
    "name": "프론트 레이즈",
    "category": "어깨",
    "englishName": "Dumbbell / Barbell Front Raise",
    "iconType": "dumbbell-front-raise",
    "equipmentType": "덤벨 / 바벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "전면 삼각근, 윗가슴 연결부",
    "defaultWeight": 8,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "반동 없이 눈높이까지 천천히 들어 올리고 버티면서 내립니다.",
    "aliases": [
      "프레레",
      "프론트레이즈",
      "전면어깨"
    ],
    "alternatives": [
      "원판 프론트 레이즈",
      "케이블 프론트 레이즈",
      "덤벨 숄더프레스"
    ]
  },
  {
    "id": "plate-front-raise",
    "name": "원판 프론트 레이즈",
    "category": "어깨",
    "englishName": "Weight Plate Front Raise",
    "iconType": "dumbbell-front-raise",
    "equipmentType": "원판 (플레이트)",
    "equipCategory": "barbell",
    "targetMuscles": "전면 삼각근",
    "defaultWeight": 10,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "원판의 3시·9시 방향을 잡고 눈높이까지 들어 올려 정점에서 1초간 버팁니다.",
    "aliases": [
      "플레이트프론트레이즈",
      "원판레이즈"
    ],
    "alternatives": [
      "프론트 레이즈",
      "케이블 프론트 레이즈"
    ]
  },
  {
    "id": "cable-front-raise",
    "name": "케이블 프론트 레이즈",
    "category": "어깨",
    "englishName": "Cable Rope / Bar Front Raise",
    "iconType": "cable-lateral-raise",
    "equipmentType": "하단 케이블 & 로프/일자바",
    "equipCategory": "cable",
    "targetMuscles": "전면 삼각근 지속 긴장",
    "defaultWeight": 10,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "다리 사이로 케이블을 통과시켜 잡고 어깨 높이까지 앞으로 들어 올립니다.",
    "aliases": [
      "케이블프레레"
    ],
    "alternatives": [
      "프론트 레이즈",
      "원판 프론트 레이즈"
    ]
  },
  {
    "id": "face-pull",
    "name": "페이스 풀",
    "category": "어깨",
    "englishName": "Cable Rope Face Pull",
    "iconType": "face-pull",
    "equipmentType": "케이블 로프",
    "equipCategory": "cable",
    "targetMuscles": "후면 삼각근, 회전근개, 승모근 중하부",
    "defaultWeight": 20,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "로프를 이마 방향으로 당기며 양손을 귀 옆으로 벌려 어깨 외회전을 함께 걸어줍니다.",
    "aliases": [
      "페이스풀",
      "케이블페이스풀",
      "후면어깨"
    ],
    "alternatives": [
      "리어 델토이드 머신",
      "케이블 리어 델트 플라이",
      "벤트오버 덤벨 레터럴 레이즈"
    ]
  },
  {
    "id": "rear-deltoid-machine",
    "name": "리어 델토이드 머신",
    "category": "어깨",
    "englishName": "Reverse Pec Deck / Rear Delt Machine",
    "iconType": "reverse-pec-deck",
    "equipmentType": "리버스 펙덱 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "후면 삼각근 고립",
    "defaultWeight": 25,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "가슴 패드에 가슴을 대고 날개뼈는 고정한 채 팔을 뒤로 넓게 벌려 후면 어깨를 수축합니다.",
    "aliases": [
      "리버스펙덱",
      "후레레머신",
      "리어델트머신",
      "후면삼각근머신"
    ],
    "alternatives": [
      "페이스 풀",
      "벤트오버 덤벨 레터럴 레이즈",
      "케이블 리어 델트 플라이"
    ]
  },
  {
    "id": "bent-over-lateral-raise",
    "name": "벤트오버 덤벨 레터럴 레이즈",
    "category": "어깨",
    "englishName": "Bent-Over Dumbbell Rear Delt Raise",
    "iconType": "dumbbell-lateral-raise",
    "equipmentType": "덤벨 & 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "후면 삼각근",
    "defaultWeight": 6,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "상체를 숙이거나 인클라인 벤치에 이마를 대고 팔꿈치를 옆으로 벌려 후면 삼각근만 타격합니다.",
    "aliases": [
      "후레레",
      "벤트오버레이즈",
      "덤벨후레레"
    ],
    "alternatives": [
      "리어 델토이드 머신",
      "페이스 풀",
      "케이블 리어 델트 플라이"
    ]
  },
  {
    "id": "cable-rear-delt-fly",
    "name": "케이블 리어 델트 플라이",
    "category": "어깨",
    "englishName": "High Cable Reverse Crossover Fly",
    "iconType": "cable-cross",
    "equipmentType": "듀얼 케이블 타워",
    "equipCategory": "cable",
    "targetMuscles": "후면 삼각근, 능형근",
    "defaultWeight": 7.5,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "눈높이 케이블을 양손 교차로 잡고 대각선 뒤로 팔을 활짝 펼쳐 후면 어깨를 조입니다.",
    "aliases": [
      "케이블후레레",
      "리버스크로스오버"
    ],
    "alternatives": [
      "리어 델토이드 머신",
      "페이스 풀",
      "벤트오버 덤벨 레터럴 레이즈"
    ]
  },
  {
    "id": "barbell-upright-row",
    "name": "바벨 업라이트 로우",
    "category": "어깨",
    "englishName": "Barbell / EZ-Bar Upright Row",
    "iconType": "upright-row",
    "equipmentType": "EZ 바 / 바벨",
    "equipCategory": "barbell",
    "targetMuscles": "측면 삼각근, 상부 승모근",
    "defaultWeight": 25,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "어깨너비로 바를 잡고 팔꿈치가 손목보다 높게 올라오도록 가슴 상단까지 끌어올립니다.",
    "aliases": [
      "업라이트로우",
      "이지바업라이트로우"
    ],
    "alternatives": [
      "덤벨 업라이트 로우",
      "사이드 레터럴 레이즈",
      "슈러그"
    ]
  },
  {
    "id": "dumbbell-upright-row",
    "name": "덤벨 업라이트 로우",
    "category": "어깨",
    "englishName": "Dumbbell Upright Row",
    "iconType": "upright-row",
    "equipmentType": "덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "측면 삼각근, 승모근 (손목/어깨 관절 보호)",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "바벨보다 손목과 어깨 회전이 자유로워 통증 없이 측면 삼각근을 강하게 끌어올립니다.",
    "aliases": [
      "덤벨업라이트"
    ],
    "alternatives": [
      "바벨 업라이트 로우",
      "사이드 레터럴 레이즈"
    ]
  },
  {
    "id": "shrug",
    "name": "슈러그",
    "category": "어깨",
    "englishName": "Barbell / Smith Machine Shrug",
    "iconType": "shrug-barbell",
    "equipmentType": "바벨 / 스미스머신 / 트랩바",
    "equipCategory": "barbell",
    "targetMuscles": "상부 승모근",
    "defaultWeight": 60,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "어깨를 귀에 닿게 한다는 느낌으로 수직으로 으쓱 올리고 정점에서 1초간 멈춥니다.",
    "aliases": [
      "바벨슈러그",
      "승모근운동"
    ],
    "alternatives": [
      "덤벨 슈러그",
      "바벨 업라이트 로우",
      "랙 풀"
    ]
  },
  {
    "id": "dumbbell-shrug",
    "name": "덤벨 슈러그",
    "category": "어깨",
    "englishName": "Standing Dumbbell Shrug",
    "iconType": "shrug-barbell",
    "equipmentType": "덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "상부 승모근 좌우 대칭 발달",
    "defaultWeight": 24,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "몸통 옆에 덤벨을 들고 날개뼈를 살짝 모으며 귀 뒤쪽 방향으로 으쓱 들어 올립니다.",
    "aliases": [
      "덤벨승모근"
    ],
    "alternatives": [
      "슈러그",
      "파머스 워크"
    ]
  },
  {
    "id": "barbell-curl",
    "name": "바벨 컬",
    "category": "팔",
    "imageUrl": "assets/exercises/barbell-curl.webp",
    "englishName": "Standing Barbell Biceps Curl",
    "iconType": "barbell-curl",
    "equipmentType": "스트레이트 바벨 / EZ 바",
    "equipCategory": "barbell",
    "targetMuscles": "상완이두근 전체 (단두/장두)",
    "defaultWeight": 25,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "팔꿈치를 옆구리에 고정하고 반동 없이 이두근의 힘만으로 감아올립니다.",
    "aliases": [
      "바벨컬",
      "이두컬",
      "알통"
    ],
    "alternatives": [
      "이지바 컬",
      "덤벨 컬",
      "케이블 컬",
      "바이셉스 컬 머신"
    ]
  },
  {
    "id": "ez-bar-curl",
    "name": "이지바 컬",
    "category": "팔",
    "englishName": "EZ-Bar Biceps Curl",
    "iconType": "barbell-curl",
    "equipmentType": "EZ 컬 바 (곡선 바벨)",
    "equipCategory": "barbell",
    "targetMuscles": "상완이두근 장두 및 상완근 (손목 부담 감소)",
    "defaultWeight": 25,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "꺾인 그립이 손목 염좌를 막아주며 좁게 잡으면 바깥쪽(장두), 넓게 잡으면 안쪽(단두)이 타격됩니다.",
    "aliases": [
      "이지바컬",
      "ez바컬"
    ],
    "alternatives": [
      "바벨 컬",
      "프리처 컬",
      "덤벨 컬"
    ]
  },
  {
    "id": "dumbbell-curl",
    "name": "덤벨 컬",
    "category": "팔",
    "englishName": "Alternating Dumbbell Biceps Curl",
    "iconType": "dumbbell-curl",
    "equipmentType": "덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완이두근 (회외전 피크 수축)",
    "defaultWeight": 12,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "올리면서 새끼손가락을 바깥쪽으로 비틀어주면(외번) 이두근 봉우리가 더욱 높아집니다.",
    "aliases": [
      "덤벨컬",
      "얼터네이트덤벨컬"
    ],
    "alternatives": [
      "인클라인 덤벨 컬",
      "해머 컬",
      "바벨 컬"
    ]
  },
  {
    "id": "concentration-curl",
    "name": "컨센트레이션 컬",
    "category": "팔",
    "englishName": "Seated Concentration Dumbbell Curl",
    "iconType": "dumbbell-curl",
    "equipmentType": "덤벨 & 플랫 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완이두근 단두 (이두 봉우리 피크)",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "벤치에 앉아 팔꿈치를 허벅지 안쪽에 고정하고 이두근만 집중 수축합니다.",
    "aliases": [
      "컨센트레이션",
      "집중컬"
    ],
    "alternatives": [
      "프리처 컬",
      "스파이더 컬",
      "바이셉스 컬 머신"
    ]
  },
  {
    "id": "hammer-curl",
    "name": "해머 컬",
    "category": "팔",
    "englishName": "Dumbbell Hammer Curl",
    "iconType": "hammer-curl",
    "equipmentType": "덤벨 / 로프",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완근, 상완요골근 (팔 측면 두께 & 전완근)",
    "defaultWeight": 12,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "손바닥이 마주보게 잡고 망치질하듯 들어 올려 팔의 입체감과 전완근을 키웁니다.",
    "aliases": [
      "해머컬",
      "망치컬"
    ],
    "alternatives": [
      "리버스 컬",
      "덤벨 컬",
      "케이블 컬"
    ]
  },
  {
    "id": "incline-dumbbell-curl",
    "name": "인클라인 덤벨 컬",
    "category": "팔",
    "englishName": "Incline Dumbbell Biceps Curl",
    "iconType": "incline-dumbbell-curl",
    "equipmentType": "인클라인 벤치 & 덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완이두근 장두 (이두 바깥쪽 최대 신장)",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "인클라인 벤치에 기대어 팔을 수직으로 늘어뜨린 후 최대 이완 상태에서 이두를 감아올립니다.",
    "aliases": [
      "인클덤벨컬",
      "인클컬"
    ],
    "alternatives": [
      "덤벨 컬",
      "스파이더 컬",
      "케이블 컬"
    ]
  },
  {
    "id": "spider-curl",
    "name": "스파이더 컬",
    "category": "팔",
    "englishName": "Spider Incline Bench Curl",
    "iconType": "incline-dumbbell-curl",
    "equipmentType": "인클라인 벤치 & EZ바/덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완이두근 단두 및 정점 수축",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "인클라인 벤치에 가슴을 대고 엎드려 팔을 아래로 늘어뜨린 채 반동 없이 이두만 쥐어짭니다.",
    "aliases": [
      "스파이더컬",
      "엎드려컬"
    ],
    "alternatives": [
      "프리처 컬",
      "컨센트레이션 컬",
      "바이셉스 컬 머신"
    ]
  },
  {
    "id": "reverse-curl",
    "name": "리버스 컬",
    "category": "팔",
    "englishName": "Reverse-Grip Barbell / EZ-Bar Curl",
    "iconType": "barbell-curl",
    "equipmentType": "EZ 바 / 바벨 / 케이블",
    "equipCategory": "barbell",
    "targetMuscles": "상완요골근, 전완근 신전근군, 상완근",
    "defaultWeight": 15,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "오버핸드 그립(손등이 위를 향하게)으로 바를 쥐고 들어 올려 전완근과 팔 바깥쪽을 단련합니다.",
    "aliases": [
      "리버스컬",
      "오버그립컬",
      "전완근컬"
    ],
    "alternatives": [
      "해머 컬",
      "리스트 컬",
      "이지바 컬"
    ]
  },
  {
    "id": "biceps-curl-machine",
    "name": "바이셉스 컬 머신",
    "category": "팔",
    "englishName": "Seated Biceps Curl Machine",
    "iconType": "biceps-curl-machine",
    "equipmentType": "암 컬 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "상완이두근 순수 고립",
    "defaultWeight": 25,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "겨드랑이를 패드에 빈틈없이 밀착하고 손잡이를 끝까지 감아올립니다.",
    "aliases": [
      "암컬머신",
      "이두머신"
    ],
    "alternatives": [
      "프리처 컬 머신",
      "프리처 컬",
      "케이블 컬"
    ]
  },
  {
    "id": "preacher-curl",
    "name": "프리처 컬",
    "category": "팔",
    "englishName": "Preacher Curl Bench & EZ-Bar",
    "iconType": "preacher-curl",
    "equipmentType": "프리처 벤치 & EZ바/덤벨",
    "equipCategory": "barbell",
    "targetMuscles": "상완이두근 하부 및 단두 고립",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "삼두 전체를 경사 패드에 완전히 밀착시켜 어깨 반동을 원천 차단합니다.",
    "aliases": [
      "프리처컬",
      "스콧컬"
    ],
    "alternatives": [
      "프리처 컬 머신",
      "바이셉스 컬 머신",
      "이지바 컬"
    ]
  },
  {
    "id": "preacher-curl-machine",
    "name": "프리처 컬 머신",
    "category": "팔",
    "englishName": "Plate-Loaded / Pin Preacher Curl Machine",
    "iconType": "biceps-curl-machine",
    "equipmentType": "프리처 컬 전용 머신",
    "equipCategory": "plate_loaded",
    "targetMuscles": "상완이두근 전체 (전 구간 저항 유지)",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "프리웨이트 프리처 컬과 달리 상단 수축 지점에서도 장력이 풀리지 않아 펌핑에 최고입니다.",
    "aliases": [
      "머신프리처컬"
    ],
    "alternatives": [
      "프리처 컬",
      "바이셉스 컬 머신"
    ]
  },
  {
    "id": "cable-curl",
    "name": "케이블 컬",
    "category": "팔",
    "englishName": "Standing Low-Pulley Cable Biceps Curl",
    "iconType": "triceps-pushdown",
    "equipmentType": "하단 케이블 & 일자바/로프",
    "equipCategory": "cable",
    "targetMuscles": "상완이두근 지속 장력 펌핑",
    "defaultWeight": 20,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "케이블의 일정한 장력 덕분에 내리는 네거티브 구간에서도 이두근을 강하게 자극합니다.",
    "aliases": [
      "케이블이두컬",
      "케이블바벨컬"
    ],
    "alternatives": [
      "바벨 컬",
      "바이셉스 컬 머신",
      "덤벨 컬"
    ]
  },
  {
    "id": "cable-one-arm-biceps-curl",
    "name": "케이블 원 암 바이셉스 컬",
    "category": "팔",
    "englishName": "Cable One-Arm Biceps Curl (Bayesian Curl)",
    "iconType": "triceps-pushdown",
    "equipmentType": "케이블 머신 & 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "상완이두근 장두/단두 (최대 신장 및 지속 장력)",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "imageUrl": "assets/exercises/cable-one-arm-biceps-curl.webp",
    "tips": "도르래를 등지고 서서 팔을 뒤로 보낸 신장 포지션(베이지안 컬)에서 컬을 진행하면 이두근에 강력한 긴장감이 지속됩니다.",
    "aliases": [
      "원암케이블컬",
      "원암바이셉스컬",
      "베이지안컬",
      "케이블원암컬",
      "원암이두컬",
      "bayesian",
      "베이지안"
    ],
    "alternatives": [
      "케이블 컬",
      "인클라인 덤벨 컬",
      "덤벨 컬",
      "컨센트레이션 컬"
    ]
  },
  {
    "id": "cable-rope-hammer-curl",
    "name": "케이블 로프 해머 컬",
    "category": "팔",
    "englishName": "Cable Rope Hammer Curl",
    "iconType": "triceps-pushdown",
    "equipmentType": "하단 케이블 & 로프",
    "equipCategory": "cable",
    "targetMuscles": "상완근, 상완요골근, 이두근 외측",
    "defaultWeight": 15,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "손바닥이 서로 마주보는 뉴트럴 그립으로 컬을 수행하며 정점에서 로프를 양옆으로 살짝 벌려줍니다.",
    "aliases": [
      "케이블해머컬",
      "로프해머컬",
      "케이블로프컬",
      "로프컬"
    ],
    "alternatives": [
      "해머 컬",
      "케이블 컬",
      "덤벨 컬"
    ]
  },
  {
    "id": "high-cable-biceps-curl",
    "name": "하이 케이블 바이셉스 컬",
    "category": "팔",
    "englishName": "High Cable Dual Biceps Curl",
    "iconType": "triceps-pushdown",
    "equipmentType": "듀얼 케이블 타워 (상단 도르래)",
    "equipCategory": "cable",
    "targetMuscles": "상완이두근 단두 및 피크",
    "defaultWeight": 10,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "케이블 타워 중앙에 서서 양팔을 어깨 높이로 든 채 머리 쪽으로 컬하여 이두근 피크를 극대화합니다.",
    "aliases": [
      "하이케이블컬",
      "프론트더블바이셉스",
      "더블케이블컬"
    ],
    "alternatives": [
      "케이블 컬",
      "프리처 컬",
      "바벨 컬"
    ]
  },
  {
    "id": "triceps-pushdown",
    "name": "트라이셉스 푸쉬다운",
    "category": "팔",
    "imageUrl": "assets/exercises/triceps-pushdown.webp",
    "englishName": "Triceps Cable Bar Pushdown",
    "iconType": "triceps-pushdown",
    "equipmentType": "케이블 스트레이트 바 / V바",
    "equipCategory": "cable",
    "targetMuscles": "상완삼두근 외측두 및 내측두",
    "defaultWeight": 25,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "팔꿈치를 옆구리에 쐐기처럼 고정하고 아래로 강하게 밀어 삼두를 쥐어짭니다.",
    "aliases": [
      "케이블푸쉬다운",
      "삼두푸쉬다운",
      "푸시다운"
    ],
    "alternatives": [
      "케이블 로프 푸쉬다운",
      "원암 케이블 푸쉬다운",
      "시티드 딥스 머신"
    ]
  },
  {
    "id": "cable-rope-pushdown",
    "name": "케이블 로프 푸쉬다운",
    "category": "팔",
    "imageUrl": "assets/exercises/cable-rope-pushdown.webp",
    "englishName": "Triceps Rope Pushdown",
    "iconType": "triceps-pushdown",
    "equipmentType": "상단 케이블 & 로프",
    "equipCategory": "cable",
    "targetMuscles": "상완삼두근 외측두 (말발굽 라인)",
    "defaultWeight": 20,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "하단 지점에서 로프 끝을 양옆으로 찢어내듯 벌리며 삼두근 바깥쪽을 극한으로 수축합니다.",
    "aliases": [
      "로프푸쉬다운",
      "로프삼두"
    ],
    "alternatives": [
      "트라이셉스 푸쉬다운",
      "원암 케이블 푸쉬다운",
      "덤벨 킥백"
    ]
  },
  {
    "id": "one-arm-cable-pushdown",
    "name": "원암 케이블 푸쉬다운",
    "category": "팔",
    "englishName": "Single-Arm Cable Triceps Pushdown",
    "iconType": "one-arm-pulldown",
    "equipmentType": "상단 케이블 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "상완삼두근 편측 정밀 고립",
    "defaultWeight": 10,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "한 팔씩 언더그립이나 오버그립으로 당겨 내리며 삼두근 하부까지 섬세하게 조입니다.",
    "aliases": [
      "원암푸쉬다운",
      "한팔삼두"
    ],
    "alternatives": [
      "케이블 로프 푸쉬다운",
      "덤벨 킥백",
      "트라이셉스 푸쉬다운"
    ]
  },
  {
    "id": "skull-crusher",
    "name": "스컬 크러셔 (라잉 익스텐션)",
    "category": "팔",
    "englishName": "Lying EZ-Bar Triceps Extension",
    "iconType": "skull-crusher",
    "equipmentType": "EZ 바 & 플랫 벤치",
    "equipCategory": "barbell",
    "targetMuscles": "상완삼두근 장두 (팔 뒷면 전체 매스)",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "팔꿈치가 벌어지지 않게 모으고 이마나 정수리 뒤쪽으로 바를 내려 삼두를 깊게 늘립니다.",
    "aliases": [
      "라잉트라이셉스익스텐션",
      "라트익",
      "스컬크러셔"
    ],
    "alternatives": [
      "오버헤드 트라이셉스 익스텐션",
      "덤벨 오버헤드 트라이셉스 익스텐션",
      "클로즈그립 벤치프레스"
    ]
  },
  {
    "id": "overhead-triceps-extension",
    "name": "케이블 오버헤드 익스텐션",
    "category": "팔",
    "imageUrl": "assets/exercises/overhead-triceps-extension.webp",
    "englishName": "Overhead Cable Rope Triceps Extension",
    "iconType": "overhead-triceps-ext",
    "equipmentType": "케이블 로프 / EZ바",
    "equipCategory": "cable",
    "targetMuscles": "상완삼두근 장두 최대 신장 및 수축",
    "defaultWeight": 20,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "케이블을 등지고 서서 팔꿈치를 머리 위로 고정한 채 앞쪽 대각선으로 힘껏 밀어 장두를 쥐어짭니다.",
    "aliases": [
      "오버헤드 트라이셉스 익스텐션",
      "오버헤드익스텐션",
      "케이블오버헤드",
      "케오익",
      "케이블오버헤드익스텐션",
      "케이블삼두",
      "오버헤드트라이셉스"
    ],
    "alternatives": [
      "덤벨 오버헤드 트라이셉스 익스텐션",
      "스컬 크러셔 (라잉 익스텐션)",
      "케이블 로프 푸쉬다운",
      "케이블 원 암 오버헤드 익스텐션"
    ]
  },
  {
    "id": "cable-single-arm-overhead-extension",
    "name": "케이블 원 암 오버헤드 익스텐션",
    "category": "팔",
    "englishName": "Cable Single-Arm Overhead Triceps Extension",
    "iconType": "overhead-triceps-ext",
    "equipmentType": "케이블 머신 & 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "상완삼두근 장두 (한 팔 집중 고립)",
    "defaultWeight": 7.5,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "한 팔씩 진행하여 팔꿈치 흔들림 없이 삼두근 장두를 정밀하게 스트레칭하고 수축합니다.",
    "aliases": [
      "원암오버헤드",
      "케이블원암오버헤드",
      "원암케이블익스텐션",
      "원암삼두익스텐션"
    ],
    "alternatives": [
      "케이블 오버헤드 익스텐션",
      "원암 케이블 푸쉬다운",
      "덤벨 오버헤드 트라이셉스 익스텐션"
    ]
  },
  {
    "id": "dumbbell-overhead-triceps-extension",
    "name": "덤벨 오버헤드 트라이셉스 익스텐션",
    "category": "팔",
    "englishName": "Seated Two-Arm Dumbbell Overhead Extension",
    "iconType": "overhead-triceps-ext",
    "equipmentType": "덤벨 & 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완삼두근 장두 볼륨",
    "defaultWeight": 16,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "양손으로 덤벨 원판을 받쳐 머리 뒤로 깊숙이 내렸다가 천장을 향해 수직으로 뻗습니다.",
    "aliases": [
      "덤벨오버헤드",
      "양손덤벨삼두"
    ],
    "alternatives": [
      "오버헤드 트라이셉스 익스텐션",
      "스컬 크러셔 (라잉 익스텐션)"
    ]
  },
  {
    "id": "dumbbell-kickback",
    "name": "덤벨 킥백",
    "category": "팔",
    "englishName": "Dumbbell Triceps Kickback",
    "iconType": "dumbbell-row",
    "equipmentType": "덤벨 & 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "상완삼두근 외측두/장두 최고 수축",
    "defaultWeight": 6,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "상체를 숙이고 윗팔을 지면과 수평으로 고정한 채 팔꿈치만 펴서 정점에서 1초 멈춥니다.",
    "aliases": [
      "삼두킥백",
      "트라이셉스킥백"
    ],
    "alternatives": [
      "케이블 로프 푸쉬다운",
      "원암 케이블 푸쉬다운"
    ]
  },
  {
    "id": "close-grip-bench-press",
    "name": "클로즈그립 벤치프레스",
    "category": "팔",
    "englishName": "Close-Grip Barbell Bench Press",
    "iconType": "bench-press",
    "equipmentType": "바벨 & 플랫 벤치 / 스미스머신",
    "equipCategory": "barbell",
    "targetMuscles": "상완삼두근 전체 매스, 대흉근 내측",
    "defaultWeight": 45,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "어깨너비보다 약간 좁게 바를 잡고 팔꿈치를 몸통에 붙여서 내려 삼두근으로 밀어 올립니다.",
    "aliases": [
      "라구벤치",
      "클로즈그립",
      "내로우벤치"
    ],
    "alternatives": [
      "시티드 딥스 머신",
      "딥스",
      "스컬 크러셔 (라잉 익스텐션)"
    ]
  },
  {
    "id": "wrist-curl",
    "name": "리스트 컬",
    "category": "팔",
    "englishName": "Barbell / Dumbbell Forearm Wrist Curl",
    "iconType": "wrist-roller",
    "equipmentType": "덤벨 / 바벨 & 벤치",
    "equipCategory": "dumbbell",
    "targetMuscles": "전완근 굴곡근군 (악력 및 팔뚝 두께)",
    "defaultWeight": 10,
    "defaultReps": 20,
    "restSeconds": 45,
    "tips": "전완을 벤치 끝에 올려 손목만 까딱이며 손끝까지 풀어주었다가 강하게 말아 올립니다.",
    "aliases": [
      "전완근",
      "손목운동",
      "리스트컬"
    ],
    "alternatives": [
      "리버스 컬",
      "해머 컬",
      "파머스 워크"
    ]
  },
  {
    "id": "plank",
    "name": "플랭크",
    "category": "복근/코어",
    "englishName": "Standard Core Plank",
    "iconType": "mat-core",
    "equipmentType": "피트니스 매트",
    "equipCategory": "bodyweight",
    "targetMuscles": "복직근, 복횡근, 코어 안정성",
    "defaultWeight": 0,
    "defaultReps": 60,
    "restSeconds": 45,
    "tips": "복근과 둔근에 힘을 주어 허리가 아래로 꺾이지 않는 일직선을 유지합니다.",
    "aliases": [
      "플랭크",
      "코어운동"
    ],
    "alternatives": [
      "사이드 플랭크",
      "복근 롤아웃 (애브 슬라이더)",
      "크런치"
    ]
  },
  {
    "id": "side-plank",
    "name": "사이드 플랭크",
    "category": "복근/코어",
    "englishName": "Side Oblique Plank",
    "iconType": "mat-core",
    "equipmentType": "피트니스 매트",
    "equipCategory": "bodyweight",
    "targetMuscles": "외복사근, 내복사근, 중둔근 코어",
    "defaultWeight": 0,
    "defaultReps": 45,
    "restSeconds": 45,
    "tips": "한쪽 팔꿈치로 지탱하며 골반이 바닥으로 처지지 않게 옆구리 힘으로 버팁니다.",
    "aliases": [
      "옆구리플랭크"
    ],
    "alternatives": [
      "플랭크",
      "로만체어 사이드 벤드",
      "토르소 로테이션 머신"
    ]
  },
  {
    "id": "crunch",
    "name": "크런치",
    "category": "복근/코어",
    "englishName": "Abdominal Crunch",
    "iconType": "crunch-mat",
    "equipmentType": "매트 / 애브매트",
    "equipCategory": "bodyweight",
    "targetMuscles": "상복부 (복직근 상단)",
    "defaultWeight": 0,
    "defaultReps": 20,
    "restSeconds": 45,
    "tips": "허리를 바닥에 붙인 채로 갈비뼈를 골반 쪽으로 말아 올립니다.",
    "aliases": [
      "복근크런치",
      "윗몸일으키기"
    ],
    "alternatives": [
      "앱도미널 머신",
      "디클라인 싯업",
      "케이블 크런치"
    ]
  },
  {
    "id": "decline-sit-up",
    "name": "디클라인 싯업",
    "category": "복근/코어",
    "englishName": "Decline Bench Sit-Up",
    "iconType": "decline-bench",
    "equipmentType": "디클라인 복근 벤치",
    "equipCategory": "bodyweight",
    "targetMuscles": "복직근 전체, 장요근",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "발목을 패드에 걸고 등을 둥글게 말아 복근의 긴장이 풀리지 않는 각도까지 내려갑니다.",
    "aliases": [
      "싯업",
      "윗몸일으키기벤치",
      "디클라인복근"
    ],
    "alternatives": [
      "크런치",
      "앱도미널 머신",
      "레그레이즈 (플랫 벤치)"
    ]
  },
  {
    "id": "bench-leg-raise",
    "name": "레그레이즈 (플랫 벤치)",
    "category": "복근/코어",
    "englishName": "Lying Flat Bench Leg Raise",
    "iconType": "crunch-mat",
    "equipmentType": "플랫 벤치 / 매트",
    "equipCategory": "bodyweight",
    "targetMuscles": "하복부 (복직근 하단)",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "다리를 내릴 때 허리가 뜨지 않도록 복부를 바닥 쪽으로 강하게 누르며 버팁니다.",
    "aliases": [
      "레그레이즈",
      "라잉레그레이즈",
      "아랫배"
    ],
    "alternatives": [
      "행잉 레그레이즈",
      "행잉 니레이즈",
      "크런치"
    ]
  },
  {
    "id": "abdominal-machine",
    "name": "앱도미널 머신",
    "category": "복근/코어",
    "englishName": "Abdominal Crunch Machine",
    "iconType": "ab-machine",
    "equipmentType": "앱도미널 크런치 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "복직근 전체 중량 강화 (식스팩 볼륨)",
    "defaultWeight": 35,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "팔로 당기지 말고 명치를 배꼽 쪽으로 둥글게 말아 내리며 복근을 수축합니다.",
    "aliases": [
      "복근머신",
      "크런치머신"
    ],
    "alternatives": [
      "케이블 크런치",
      "크런치",
      "디클라인 싯업"
    ]
  },
  {
    "id": "hanging-leg-raise",
    "name": "행잉 레그레이즈",
    "category": "복근/코어",
    "englishName": "Hanging / Captains Chair Leg Raise",
    "iconType": "captains-chair",
    "equipmentType": "풀업 바 / 캡틴스 체어",
    "equipCategory": "bodyweight",
    "targetMuscles": "하복부, 복직근 전체, 장요근",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "다리만 들지 말고 골반 자체를 명치 쪽으로 말아 올린다는 느낌으로 진행하세요.",
    "aliases": [
      "행레",
      "캡틴스체어",
      "매달려다리들기"
    ],
    "alternatives": [
      "행잉 니레이즈",
      "레그레이즈 (플랫 벤치)",
      "앱도미널 머신"
    ]
  },
  {
    "id": "hanging-knee-raise",
    "name": "행잉 니레이즈",
    "category": "복근/코어",
    "englishName": "Captains Chair / Hanging Knee Raise",
    "iconType": "captains-chair",
    "equipmentType": "캡틴스 체어 / 치닝디핑",
    "equipCategory": "bodyweight",
    "targetMuscles": "하복부 집중 (허리 부담 최소화)",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "무릎을 굽혀 가슴 쪽으로 당기면서 골반을 말아 올려 초보자도 쉽게 하복부를 자극합니다.",
    "aliases": [
      "니레이즈",
      "무릎들기"
    ],
    "alternatives": [
      "행잉 레그레이즈",
      "레그레이즈 (플랫 벤치)"
    ]
  },
  {
    "id": "cable-crunch",
    "name": "케이블 크런치",
    "category": "복근/코어",
    "englishName": "Kneeling Cable Rope Crunch",
    "iconType": "cable-crunch",
    "equipmentType": "상단 케이블 & 로프",
    "equipCategory": "cable",
    "targetMuscles": "상중 복직근 고중량 강화",
    "defaultWeight": 30,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "무릎을 꿇고 엉덩이를 고정한 채 등을 새우처럼 둥글게 말아 복근으로만 당깁니다.",
    "aliases": [
      "로프크런치"
    ],
    "alternatives": [
      "앱도미널 머신",
      "크런치",
      "디클라인 싯업"
    ]
  },
  {
    "id": "cable-woodchopper",
    "name": "케이블 우드촙",
    "category": "복근/코어",
    "englishName": "Cable Rotational Woodchopper",
    "iconType": "cable-crunch",
    "equipmentType": "케이블 싱글 핸들",
    "equipCategory": "cable",
    "targetMuscles": "외복사근, 내복사근, 회전 코어 파워",
    "defaultWeight": 15,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "도끼질하듯 상단에서 대각선 아래로 코어 회전을 이용해 케이블을 당깁니다.",
    "aliases": [
      "우드촙",
      "케이블트위스트",
      "골프코어"
    ],
    "alternatives": [
      "토르소 로테이션 머신",
      "로만체어 사이드 벤드"
    ]
  },
  {
    "id": "torso-rotation-machine",
    "name": "토르소 로테이션 머신",
    "category": "복근/코어",
    "englishName": "Torso Rotation Machine",
    "iconType": "torso-rotation",
    "equipmentType": "로테이션 핀 머신",
    "equipCategory": "pin_machine",
    "targetMuscles": "외복사근, 내복사근 (옆구리/허리 라인)",
    "defaultWeight": 25,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "상체를 고정하고 하체와 골반을 복사근 힘으로 회전시켜 옆구리 라인을 다듬습니다.",
    "aliases": [
      "토르소",
      "옆구리머신",
      "로테이션머신"
    ],
    "alternatives": [
      "케이블 우드촙",
      "로만체어 사이드 벤드",
      "사이드 플랭크"
    ]
  },
  {
    "id": "roman-chair-side-bend",
    "name": "로만체어 사이드 벤드",
    "category": "복근/코어",
    "englishName": "Roman Chair Oblique Side Bend",
    "iconType": "roman-chair",
    "equipmentType": "45도 로만체어 (백익스텐션 벤치)",
    "equipCategory": "bodyweight",
    "targetMuscles": "외복사근, 요방형근 (옆구리 코어)",
    "defaultWeight": 0,
    "defaultReps": 15,
    "restSeconds": 45,
    "tips": "옆으로 기대어 상체를 아래로 늘렸다가 옆구리 근육의 힘으로 일직선까지 올라옵니다.",
    "aliases": [
      "사이드벤드",
      "옆구리운동"
    ],
    "alternatives": [
      "토르소 로테이션 머신",
      "사이드 플랭크",
      "케이블 우드촙"
    ]
  },
  {
    "id": "ab-rollout",
    "name": "복근 롤아웃 (애브 슬라이더)",
    "category": "복근/코어",
    "englishName": "Ab Wheel Rollout",
    "iconType": "ab-roller",
    "equipmentType": "애브 휠 (복근 롤러)",
    "equipCategory": "bodyweight",
    "targetMuscles": "복직근 전체, 코어 신전 저항, 전거근",
    "defaultWeight": 0,
    "defaultReps": 12,
    "restSeconds": 60,
    "tips": "허리가 꺾이지 않게 배를 둥글게 말아 힘을 준 상태로 굴려 나갔다 복근으로 당겨옵니다.",
    "aliases": [
      "애브롤러",
      "애브슬라이드",
      "ab롤아웃"
    ],
    "alternatives": [
      "플랭크",
      "케이블 크런치",
      "행잉 레그레이즈"
    ]
  },
  {
    "id": "deadlift",
    "name": "데드리프트",
    "category": "전신",
    "englishName": "Conventional Barbell Deadlift",
    "iconType": "deadlift",
    "equipmentType": "바벨 & 데드리프트 플랫폼",
    "equipCategory": "barbell",
    "targetMuscles": "둔근, 햄스트링, 척추기립근, 등 전체",
    "defaultWeight": 100,
    "defaultReps": 8,
    "restSeconds": 180,
    "tips": "바벨을 정강이에 밀착시키고 복압을 가득 채운 뒤 지면을 발바닥으로 밀어내며 일어섭니다.",
    "aliases": [
      "컨벤셔널데드",
      "컨벤데드",
      "데드"
    ],
    "alternatives": [
      "트랩바 데드리프트",
      "스모 데드리프트",
      "루마니안 데드리프트",
      "랙 풀"
    ]
  },
  {
    "id": "romanian-deadlift",
    "name": "루마니안 데드리프트",
    "category": "전신",
    "englishName": "Barbell Romanian Deadlift (RDL)",
    "iconType": "romanian-deadlift",
    "equipmentType": "바벨 & 파워 랙",
    "equipCategory": "barbell",
    "targetMuscles": "햄스트링, 대둔근, 척추기립근",
    "defaultWeight": 80,
    "defaultReps": 10,
    "restSeconds": 120,
    "tips": "무릎을 살짝만 굽히고 엉덩이를 뒤로 쭉 밀어 정강이 중간까지 내려가며 햄스트링을 늘립니다.",
    "aliases": [
      "루마데드",
      "rdl",
      "루마니안"
    ],
    "alternatives": [
      "덤벨 루마니안 데드리프트",
      "데드리프트",
      "바벨 굿모닝"
    ]
  },
  {
    "id": "dumbbell-romanian-deadlift",
    "name": "덤벨 루마니안 데드리프트",
    "category": "전신",
    "englishName": "Dumbbell Romanian Deadlift",
    "iconType": "romanian-deadlift",
    "equipmentType": "덤벨",
    "equipCategory": "dumbbell",
    "targetMuscles": "대둔근, 햄스트링 (고관절 힌지 집중)",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "덤벨을 허벅지 앞면을 스치듯 내리며 엉덩이 아래쪽이 팽팽하게 늘어나는 자극에 집중하세요.",
    "aliases": [
      "덤벨루마데드",
      "덤벨rdl"
    ],
    "alternatives": [
      "루마니안 데드리프트",
      "힙 쓰러스터",
      "백 익스텐션"
    ]
  },
  {
    "id": "sumo-deadlift",
    "name": "스모 데드리프트",
    "category": "전신",
    "englishName": "Sumo Barbell Deadlift",
    "iconType": "sumo-deadlift",
    "equipmentType": "바벨 & 플랫폼",
    "equipCategory": "barbell",
    "targetMuscles": "내전근, 대둔근, 대퇴사두근, 척추기립근",
    "defaultWeight": 100,
    "defaultReps": 8,
    "restSeconds": 180,
    "tips": "넓은 보폭과 고관절 외회전으로 상체를 세우고 바벨을 수직으로 뽑아 올립니다.",
    "aliases": [
      "스모데드"
    ],
    "alternatives": [
      "데드리프트",
      "트랩바 데드리프트",
      "와이드 스쿼트 (스모 스쿼트)"
    ]
  },
  {
    "id": "trap-bar-deadlift",
    "name": "트랩바 데드리프트",
    "category": "전신",
    "englishName": "Trap Bar / Hex Bar Deadlift",
    "iconType": "trap-bar",
    "equipmentType": "헥스 바 (트랩바) & 원판",
    "equipCategory": "barbell",
    "targetMuscles": "하체 전반, 둔근, 등 전체 (허리 부담 감소)",
    "defaultWeight": 100,
    "defaultReps": 8,
    "restSeconds": 180,
    "tips": "무게중심이 몸 한가운데 위치해 허리 부상 위험 없이 안전하게 고중량을 뽑을 수 있습니다.",
    "aliases": [
      "헥스바데드",
      "트랩바데드"
    ],
    "alternatives": [
      "데드리프트",
      "스쿼트",
      "벨트 스쿼트"
    ]
  },
  {
    "id": "landmine-press",
    "name": "랜드마인 프레스",
    "category": "전신",
    "englishName": "Standing Landmine Press",
    "iconType": "landmine",
    "equipmentType": "바벨 랜드마인 스테이션",
    "equipCategory": "barbell",
    "targetMuscles": "전면 삼각근, 윗가슴, 전거근, 코어",
    "defaultWeight": 20,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "사선 궤적으로 밀어 올려 어깨 충돌 없이 코어와 상체 협응력을 함께 기릅니다.",
    "aliases": [
      "랜드마인"
    ],
    "alternatives": [
      "오버헤드 프레스 (OHP)",
      "인클라인 덤벨프레스"
    ]
  },
  {
    "id": "kettlebell-swing",
    "name": "케틀벨 스윙",
    "category": "전신",
    "englishName": "Kettlebell Russian Swing",
    "iconType": "kettlebell",
    "equipmentType": "케틀벨",
    "equipCategory": "bodyweight",
    "targetMuscles": "둔근 힌지 파워, 햄스트링, 코어, 심폐 지구력",
    "defaultWeight": 16,
    "defaultReps": 20,
    "restSeconds": 60,
    "tips": "팔로 들지 말고 고관절을 접었다가 폭발적으로 펴는 엉덩이 탄력으로 케틀벨을 띄웁니다.",
    "aliases": [
      "케틀벨",
      "스윙"
    ],
    "alternatives": [
      "케틀벨 고블릿 클린 앤 프레스",
      "루마니안 데드리프트",
      "배틀 로프"
    ]
  },
  {
    "id": "kettlebell-clean-and-press",
    "name": "케틀벨 고블릿 클린 앤 프레스",
    "category": "전신",
    "englishName": "Kettlebell Clean & Overhead Press",
    "iconType": "kettlebell",
    "equipmentType": "케틀벨",
    "equipCategory": "bodyweight",
    "targetMuscles": "둔근, 어깨, 코어, 전신 협응력",
    "defaultWeight": 12,
    "defaultReps": 10,
    "restSeconds": 90,
    "tips": "고관절 힘으로 케틀벨을 가슴 앞으로 감아올린(Clean) 뒤 머리 위로 힘차게 뻗습니다(Press).",
    "aliases": [
      "케틀벨클린앤프레스",
      "케틀벨프레스"
    ],
    "alternatives": [
      "케틀벨 스윙",
      "쓰러스터 (바벨/덤벨)",
      "파워 클린"
    ]
  },
  {
    "id": "power-clean",
    "name": "파워 클린",
    "category": "전신",
    "englishName": "Barbell Power Clean",
    "iconType": "power-clean",
    "equipmentType": "바벨 & 범퍼 플레이트",
    "equipCategory": "barbell",
    "targetMuscles": "순발력(파워), 둔근, 승모근, 전신 협응력",
    "defaultWeight": 50,
    "defaultReps": 5,
    "restSeconds": 180,
    "tips": "발목·무릎·고관절의 삼중 신전(Triple Extension)으로 바벨을 띄워 쇄골 위에 빠르게 받아냅니다.",
    "aliases": [
      "역도클린",
      "하이클린"
    ],
    "alternatives": [
      "트랩바 데드리프트",
      "케틀벨 고블릿 클린 앤 프레스",
      "데드리프트"
    ]
  },
  {
    "id": "thruster",
    "name": "쓰러스터 (바벨/덤벨)",
    "category": "전신",
    "englishName": "Barbell / Dumbbell Squat Thruster",
    "iconType": "front-squat",
    "equipmentType": "바벨 / 덤벨",
    "equipCategory": "barbell",
    "targetMuscles": "대퇴사두근, 둔근, 삼각근, 극한의 심폐 지구력",
    "defaultWeight": 30,
    "defaultReps": 12,
    "restSeconds": 90,
    "tips": "프론트 스쿼트로 앉았다가 일어나는 탄력을 그대로 이어 머리 위로 바벨/덤벨을 밀어 올립니다.",
    "aliases": [
      "바벨쓰러스터",
      "덤벨쓰러스터",
      "크로스핏쓰러스터"
    ],
    "alternatives": [
      "프론트 스쿼트",
      "오버헤드 프레스 (OHP)",
      "케틀벨 고블릿 클린 앤 프레스"
    ]
  },
  {
    "id": "farmers-walk",
    "name": "파머스 워크",
    "category": "전신",
    "englishName": "Farmers Walk / Heavy Carry",
    "iconType": "farmers-walk",
    "equipmentType": "고중량 덤벨 / 케틀벨 / 트랩바",
    "equipCategory": "dumbbell",
    "targetMuscles": "전완근(악력), 승모근, 코어 전체 안정성",
    "defaultWeight": 24,
    "defaultReps": 30,
    "restSeconds": 90,
    "tips": "가슴을 펴고 어깨가 처지지 않게 고정한 채 무거운 덤벨을 들고 흔들림 없이 걸어갑니다.",
    "aliases": [
      "파머스캐리",
      "악력운동"
    ],
    "alternatives": [
      "덤벨 슈러그",
      "트랩바 데드리프트",
      "리스트 컬"
    ]
  },
  {
    "id": "battle-rope",
    "name": "배틀 로프",
    "category": "전신",
    "englishName": "Battle Rope Waves",
    "iconType": "battle-rope",
    "equipmentType": "배틀 로프 (헤비 로프)",
    "equipCategory": "bodyweight",
    "targetMuscles": "어깨, 코어, 전신 고강도 인터벌(HIIT)",
    "defaultWeight": 0,
    "defaultReps": 30,
    "restSeconds": 60,
    "tips": "무릎을 살짝 굽힌 기마 자세에서 코어를 단단히 잡고 양팔로 로프 파동을 끝까지 보냅니다.",
    "aliases": [
      "로프웨이브",
      "줄털기"
    ],
    "alternatives": [
      "케틀벨 스윙",
      "스키에르그",
      "에어바이크"
    ]
  },
  {
    "id": "treadmill",
    "name": "런닝머신",
    "category": "유산소",
    "englishName": "Motorized Treadmill Running",
    "iconType": "treadmill",
    "equipmentType": "트레드밀 머신",
    "equipCategory": "cardio",
    "targetMuscles": "심폐 지구력, 하체 전반, 체지방 연소",
    "defaultWeight": 8.5,
    "defaultReps": 20,
    "restSeconds": 30,
    "tips": "경사도(인클라인) 1~2%를 설정하면 야외 러닝과 유사한 무릎 보호 및 칼로리 소모를 얻습니다.",
    "aliases": [
      "러닝",
      "러닝머신",
      "트레드밀",
      "인클라인워킹"
    ],
    "alternatives": [
      "무동력 트레드밀 (커브드 러닝)",
      "일립티컬",
      "천국의 계단 (스텝밀)"
    ]
  },
  {
    "id": "curved-treadmill",
    "name": "무동력 트레드밀 (커브드 러닝)",
    "category": "유산소",
    "englishName": "Non-Motorized Curved Treadmill",
    "iconType": "curved-treadmill",
    "equipmentType": "무동력 곡선형 트레드밀",
    "equipCategory": "cardio",
    "targetMuscles": "햄스트링, 둔근 추진력, 고강도 스프린트",
    "defaultWeight": 10,
    "defaultReps": 15,
    "restSeconds": 30,
    "tips": "일반 런닝머신 대비 칼로리 소모가 30% 높으며 앞꿈치로 트랙을 긁어내듯 달립니다.",
    "aliases": [
      "무동력런닝머신",
      "어썰트러너",
      "커브드트레드밀"
    ],
    "alternatives": [
      "런닝머신",
      "천국의 계단 (스텝밀)",
      "에어바이크"
    ]
  },
  {
    "id": "stationary-bike",
    "name": "사이클",
    "category": "유산소",
    "englishName": "Stationary Spin / Upright Bike",
    "iconType": "stationary-bike",
    "equipmentType": "실내 스핀/입식 바이크",
    "equipCategory": "cardio",
    "targetMuscles": "대퇴사두근, 둔근, 심폐 지구력",
    "defaultWeight": 15,
    "defaultReps": 30,
    "restSeconds": 30,
    "tips": "안장 높이를 골반 뼈 위치에 맞추어 페달 하단에서 무릎이 살짝만 굽혀지도록 세팅하세요.",
    "aliases": [
      "자전거",
      "스핀바이크",
      "실내자전거"
    ],
    "alternatives": [
      "리컴번트 바이크 (좌식 사이클)",
      "에어바이크",
      "일립티컬"
    ]
  },
  {
    "id": "recumbent-bike",
    "name": "리컴번트 바이크 (좌식 사이클)",
    "category": "유산소",
    "englishName": "Recumbent Seated Bike",
    "iconType": "stationary-bike",
    "equipmentType": "등받이 좌식 사이클 머신",
    "equipCategory": "cardio",
    "targetMuscles": "허리/무릎 관절 무부하 하체 유산소",
    "defaultWeight": 14,
    "defaultReps": 30,
    "restSeconds": 30,
    "tips": "넓은 등받이에 허리를 편안히 기대고 무릎과 척추 부담 없이 장시간 유산소를 수행합니다.",
    "aliases": [
      "좌식사이클",
      "등받이자전거"
    ],
    "alternatives": [
      "사이클",
      "일립티컬",
      "아크 트레이너"
    ]
  },
  {
    "id": "stairmaster",
    "name": "천국의 계단 (스텝밀)",
    "category": "유산소",
    "englishName": "StairMaster / StepMill",
    "iconType": "stairmaster",
    "equipmentType": "스텝밀 계단 머신",
    "equipCategory": "cardio",
    "targetMuscles": "둔근, 햄스트링, 종아리, 심폐 강화",
    "defaultWeight": 8,
    "defaultReps": 20,
    "restSeconds": 30,
    "tips": "손잡이에 상체 체중을 기대지 말고 발바닥 전체와 뒤꿈치로 계단을 밀어 올리며 힙을 자극하세요.",
    "aliases": [
      "천계",
      "천국의계단",
      "스텝밀",
      "마이마운틴"
    ],
    "alternatives": [
      "버티컬 클라이머",
      "아크 트레이너",
      "런닝머신"
    ]
  },
  {
    "id": "vertical-climber",
    "name": "버티컬 클라이머",
    "category": "유산소",
    "englishName": "Vertical Climber / VersaClimber",
    "iconType": "vertical-climber",
    "equipmentType": "수직 클라이밍 머신",
    "equipCategory": "cardio",
    "targetMuscles": "전신 고강도 칼로리 연소, 코어, 하체",
    "defaultWeight": 8,
    "defaultReps": 15,
    "restSeconds": 30,
    "tips": "암벽 등반하듯 팔과 다리를 교차로 뻗으며 짧은 시간 안에 최대 심박수에 도달합니다.",
    "aliases": [
      "클라이머",
      "버사클라이머",
      "등반머신"
    ],
    "alternatives": [
      "천국의 계단 (스텝밀)",
      "스키에르그",
      "에어바이크"
    ]
  },
  {
    "id": "arc-trainer",
    "name": "아크 트레이너",
    "category": "유산소",
    "englishName": "Cybex Arc Trainer",
    "iconType": "arc-trainer",
    "equipmentType": "아크 트레이너 머신",
    "equipCategory": "cardio",
    "targetMuscles": "관절 무부하 힙업 & 폭발적 칼로리 연소",
    "defaultWeight": 15,
    "defaultReps": 20,
    "restSeconds": 30,
    "tips": "발을 아치 형태로 굴려 무릎 통증 없이 엉덩이와 허벅지를 집중적으로 태웁니다.",
    "aliases": [
      "아크",
      "싸이벡스아크"
    ],
    "alternatives": [
      "일립티컬",
      "천국의 계단 (스텝밀)",
      "사이클"
    ]
  },
  {
    "id": "skierg",
    "name": "스키에르그",
    "category": "유산소",
    "englishName": "Concept2 SkiErg",
    "iconType": "skierg",
    "equipmentType": "스키에르그 에어 머신",
    "equipCategory": "cardio",
    "targetMuscles": "광배근, 삼두근, 복근 코어, 전신 인터벌",
    "defaultWeight": 6,
    "defaultReps": 15,
    "restSeconds": 30,
    "tips": "크로스컨트리 스키를 타듯 복근과 광배근을 접으며 핸들을 아래로 강하게 찍어 누릅니다.",
    "aliases": [
      "스키머신",
      "컨셉2스키"
    ],
    "alternatives": [
      "로잉머신",
      "에어바이크",
      "배틀 로프"
    ]
  },
  {
    "id": "airbike",
    "name": "에어바이크",
    "category": "유산소",
    "englishName": "Assault / Rogue AirBike",
    "iconType": "airbike",
    "equipmentType": "에어바이크 팬 머신",
    "equipCategory": "cardio",
    "targetMuscles": "상하체 복합 극한의 타바타/인터벌 유산소",
    "defaultWeight": 10,
    "defaultReps": 15,
    "restSeconds": 30,
    "tips": "페달을 강하게 밟을수록 팬 공기 저항이 기하급수적으로 커지는 하이록스/크로스핏 필수 머신입니다.",
    "aliases": [
      "어썰트바이크",
      "에코바이크",
      "팬바이크"
    ],
    "alternatives": [
      "로잉머신",
      "스키에르그",
      "사이클"
    ]
  },
  {
    "id": "elliptical",
    "name": "일립티컬",
    "category": "유산소",
    "englishName": "Elliptical Cross Trainer",
    "iconType": "elliptical",
    "equipmentType": "일립티컬 크로스 트레이너",
    "equipCategory": "cardio",
    "targetMuscles": "무릎 관절 무부하 전신 유산소",
    "defaultWeight": 10,
    "defaultReps": 20,
    "restSeconds": 30,
    "tips": "뒤꿈치를 페달에 붙이고 상하체 핸들을 함께 밀고 당기며 리드미컬하게 수행합니다.",
    "aliases": [
      "일립티컬",
      "크로스트레이너"
    ],
    "alternatives": [
      "아크 트레이너",
      "사이클",
      "런닝머신"
    ]
  },
  {
    "id": "rowing-machine",
    "name": "로잉머신",
    "category": "유산소",
    "englishName": "Concept2 Rowing Machine",
    "iconType": "rowing-machine",
    "equipmentType": "로잉 머신 (조정 에르고미터)",
    "equipCategory": "cardio",
    "targetMuscles": "전신 유산소 (하체 60%, 등/코어 40%)",
    "defaultWeight": 2,
    "defaultReps": 15,
    "restSeconds": 30,
    "tips": "다리로 먼저 밀고, 상체를 살짝 뒤로 젖힌 후, 마지막에 명치로 핸들을 당기는 순서를 지키세요.",
    "aliases": [
      "로잉",
      "컨셉2로잉",
      "노젓기"
    ],
    "alternatives": [
      "스키에르그",
      "에어바이크",
      "버티컬 클라이머"
    ]
  },
  {
    "id": "box-jump",
    "name": "박스 점프 (플라이오 박스)",
    "category": "유산소",
    "englishName": "Plyometric Box Jump",
    "iconType": "plyo-box",
    "equipmentType": "플라이오메트릭 점프 박스",
    "equipCategory": "bodyweight",
    "targetMuscles": "하체 순발력, 둔근, 심폐 민첩성",
    "defaultWeight": 6,
    "defaultReps": 15,
    "restSeconds": 60,
    "tips": "팔 스윙과 고관절 반동을 이용해 박스 중앙에 사뿐히 착지한 뒤 무릎을 펴고 일어섭니다.",
    "aliases": [
      "박스점프",
      "플라이오박스"
    ],
    "alternatives": [
      "스텝업",
      "케틀벨 스윙",
      "버티컬 클라이머"
    ]
  }
];

// Helper to get SVG icon for any exercise name (1:1 exact match, alias match, or smart keyword fallback)
function getExerciseSvgIcon(exerciseName, category = '') {
  const raw = (exerciseName || '').trim();
  const lower = raw.toLowerCase();
  const cleanLower = lower.replace(/\s+/g, '');

  if (lower) {
    // 1. Exact or whitespace-insensitive name match
    const exactMatch = EQUIPMENT_CATALOG.find(item =>
      item.name.toLowerCase() === lower ||
      item.name.toLowerCase().replace(/\s+/g, '') === cleanLower ||
      (item.id && item.id.toLowerCase() === lower)
    );
    if (exactMatch && EQUIPMENT_SVGS[exactMatch.iconType]) {
      return EQUIPMENT_SVGS[exactMatch.iconType];
    }

    // 2. Alias match
    const aliasMatch = EQUIPMENT_CATALOG.find(item =>
      Array.isArray(item.aliases) &&
      item.aliases.some(a => a.toLowerCase() === lower || a.toLowerCase().replace(/\s+/g, '') === cleanLower)
    );
    if (aliasMatch && EQUIPMENT_SVGS[aliasMatch.iconType]) {
      return EQUIPMENT_SVGS[aliasMatch.iconType];
    }
  }

  // 3. Detailed keyword fallback across all 105 specialized SVGs
  if (lower.includes('스미스')) return EQUIPMENT_SVGS['smith-machine'];
  if (lower.includes('핵스쿼트') || lower.includes('핵 스쿼트')) return EQUIPMENT_SVGS['hack-squat'];
  if (lower.includes('v-스쿼트') || lower.includes('브이스쿼트') || lower.includes('v스쿼트')) return EQUIPMENT_SVGS['v-squat'];
  if (lower.includes('펜듈럼')) return EQUIPMENT_SVGS['pendulum-squat'];
  if (lower.includes('벨트 스쿼트') || lower.includes('벨트스쿼트')) return EQUIPMENT_SVGS['belt-squat'];
  if (lower.includes('씨씨') || lower.includes('시시')) return EQUIPMENT_SVGS['sissy-squat'];
  if (lower.includes('고블릿')) return EQUIPMENT_SVGS['goblet-squat'];
  if (lower.includes('프론트 스쿼트') || lower.includes('프론트스쿼트') || lower.includes('쓰러스터')) return EQUIPMENT_SVGS['front-squat'];
  if (lower.includes('불가리안') || lower.includes('스플릿 스쿼트')) return EQUIPMENT_SVGS['bulgarian-split-squat'];
  if (lower.includes('런지')) return EQUIPMENT_SVGS['dumbbell-lunge'];
  if (lower.includes('부티빌더') || (lower.includes('힙') && lower.includes('머신'))) return EQUIPMENT_SVGS['booty-builder'];
  if (lower.includes('힙') && lower.includes('쓰러스트')) return EQUIPMENT_SVGS['hip-thrust'];
  if (lower.includes('킥백') && category === '팔') return EQUIPMENT_SVGS['dumbbell-row'];
  if (lower.includes('킥백')) return EQUIPMENT_SVGS['glute-kickback'];
  if (lower.includes('이너') || lower.includes('어덕션')) return EQUIPMENT_SVGS['hip-adduction'];
  if (lower.includes('아웃') || lower.includes('어브덕션') || lower.includes('싸이')) return EQUIPMENT_SVGS['hip-abduction'];
  if (lower.includes('라잉') && lower.includes('컬')) return EQUIPMENT_SVGS['lying-leg-curl'];
  if (lower.includes('스탠딩') && lower.includes('레그컬')) return EQUIPMENT_SVGS['standing-leg-curl'];
  if (lower.includes('레그컬') || (lower.includes('컬') && category === '하체')) return EQUIPMENT_SVGS['seated-leg-curl'];
  if (lower.includes('ghr') || lower.includes('글루트 햄')) return EQUIPMENT_SVGS['glute-ham-raise'];
  if (lower.includes('시티드') && lower.includes('카프')) return EQUIPMENT_SVGS['seated-calf-raise'];
  if (lower.includes('카프') || lower.includes('종아리')) return EQUIPMENT_SVGS['standing-calf-raise'];
  if (lower.includes('레그프레스') || lower.includes('레그 프레스')) return EQUIPMENT_SVGS['leg-press'];
  if (lower.includes('익스텐션') && (category === '등' || lower.includes('백') || lower.includes('하이퍼'))) return EQUIPMENT_SVGS['hyperextension'];
  if (lower.includes('익스텐션') && category === '하체') return EQUIPMENT_SVGS['leg-extension'];
  if (lower.includes('스쿼트')) return EQUIPMENT_SVGS['squat-rack'];

  // Back & Chest & Shoulders & Arms
  if (lower.includes('트랩바') || lower.includes('헥스바')) return EQUIPMENT_SVGS['trap-bar'];
  if (lower.includes('랜드마인') || lower.includes('메도우스')) return EQUIPMENT_SVGS['landmine'];
  if (lower.includes('체스트 서포티드') || lower.includes('체스트서포티드')) return EQUIPMENT_SVGS['chest-supported-row'];
  if (lower.includes('티바')) return EQUIPMENT_SVGS['t-bar-row'];
  if (lower.includes('로우 로우') || lower.includes('로우로우')) return EQUIPMENT_SVGS['iso-low-row'];
  if (lower.includes('하이 로우') || lower.includes('하이로우') || lower.includes('dy 로우') || lower.includes('프론트 렛풀')) return EQUIPMENT_SVGS['iso-high-row'];
  if (lower.includes('바벨 로우') || lower.includes('바벨로우') || lower.includes('펜들레이')) return EQUIPMENT_SVGS['barbell-row'];
  if (lower.includes('덤벨 로우') || lower.includes('덤벨로우')) return EQUIPMENT_SVGS['dumbbell-row'];
  if (lower.includes('암 풀다운') || lower.includes('암풀다운')) return EQUIPMENT_SVGS['straight-arm-pulldown'];
  if (lower.includes('원암') && lower.includes('풀다운')) return EQUIPMENT_SVGS['one-arm-pulldown'];
  if (lower.includes('풀오버')) return EQUIPMENT_SVGS['pullover-machine'];
  if (lower.includes('어시스트')) return EQUIPMENT_SVGS['assisted-dip-pullup'];
  if (lower.includes('시티드 딥스') || lower.includes('딥스 머신')) return EQUIPMENT_SVGS['seated-dip-machine'];
  if (lower.includes('풀업') || lower.includes('친업') || lower.includes('턱걸이') || lower.includes('딥스')) return EQUIPMENT_SVGS['dips-pullup'];
  if (lower.includes('풀다운') || lower.includes('렛풀') || lower.includes('랫풀')) return EQUIPMENT_SVGS['lat-pulldown'];
  if (lower.includes('로우') && lower.includes('케이블')) return EQUIPMENT_SVGS['cable-row'];
  if (lower.includes('펙덱') || lower.includes('버터플라이')) return EQUIPMENT_SVGS['pec-deck-fly'];
  if (lower.includes('리어 델트') || lower.includes('리어델트') || lower.includes('리어 델토이드') || lower.includes('리버스 펙덱')) return EQUIPMENT_SVGS['reverse-pec-deck'];
  if (lower.includes('플라이') && lower.includes('덤벨')) return EQUIPMENT_SVGS['dumbbell-fly'];
  if (lower.includes('인클라인') && lower.includes('덤벨') && lower.includes('컬')) return EQUIPMENT_SVGS['incline-dumbbell-curl'];
  if (lower.includes('인클라인') && lower.includes('덤벨')) return EQUIPMENT_SVGS['dumbbell-incline-press'];
  if (lower.includes('덤벨') && lower.includes('벤치')) return EQUIPMENT_SVGS['dumbbell-press'];
  if (lower.includes('해머') && lower.includes('인클라인')) return EQUIPMENT_SVGS['incline-hammer-press'];
  if (lower.includes('해머') && lower.includes('디클라인')) return EQUIPMENT_SVGS['decline-hammer-press'];
  if (lower.includes('와이드') && lower.includes('체스트')) return EQUIPMENT_SVGS['wide-hammer-press'];
  if (lower.includes('인클라인') && lower.includes('머신')) return EQUIPMENT_SVGS['incline-hammer-press'];
  if (lower.includes('인클라인')) return EQUIPMENT_SVGS['incline-bench'];
  if (lower.includes('디클라인')) return EQUIPMENT_SVGS['decline-bench'];
  if (lower.includes('푸쉬업') || lower.includes('푸시업') || lower.includes('팔굽혀펴기')) return EQUIPMENT_SVGS['pushup-bars'];
  if (lower.includes('벤치')) return EQUIPMENT_SVGS['bench-press'];
  if (lower.includes('체스트')) return EQUIPMENT_SVGS['chest-machine'];

  // Shoulders & Arms
  if (lower.includes('슈러그') || lower.includes('승모')) return EQUIPMENT_SVGS['shrug-barbell'];
  if (lower.includes('업라이트')) return EQUIPMENT_SVGS['upright-row'];
  if (lower.includes('페이스 풀') || lower.includes('페이스풀')) return EQUIPMENT_SVGS['face-pull'];
  if (lower.includes('아놀드')) return EQUIPMENT_SVGS['arnold-press'];
  if (lower.includes('해머') && lower.includes('숄더')) return EQUIPMENT_SVGS['iso-shoulder-press'];
  if (lower.includes('덤벨') && lower.includes('숄더')) return EQUIPMENT_SVGS['dumbbell-shoulder-press'];
  if (lower.includes('오버헤드 프레스') || lower.includes('ohp') || lower.includes('밀프')) return EQUIPMENT_SVGS['standing-ohp'];
  if (lower.includes('숄더') && lower.includes('프레스')) return EQUIPMENT_SVGS['shoulder-press'];
  if (lower.includes('레터럴') && lower.includes('머신')) return EQUIPMENT_SVGS['lateral-machine'];
  if (lower.includes('레터럴') && lower.includes('케이블')) return EQUIPMENT_SVGS['cable-lateral-raise'];
  if (lower.includes('레터럴') || lower.includes('사레레')) return EQUIPMENT_SVGS['dumbbell-lateral-raise'];
  if (lower.includes('프론트 레이즈') || lower.includes('프레레')) return EQUIPMENT_SVGS['dumbbell-front-raise'];
  if (lower.includes('스컬 크러셔') || lower.includes('스컬크러셔') || lower.includes('라잉 익스텐션')) return EQUIPMENT_SVGS['skull-crusher'];
  if (lower.includes('오버헤드') && lower.includes('익스텐션')) return EQUIPMENT_SVGS['overhead-triceps-ext'];
  if (lower.includes('푸쉬다운') || lower.includes('푸시다운')) return EQUIPMENT_SVGS['triceps-pushdown'];
  if (lower.includes('바이셉스') && lower.includes('머신')) return EQUIPMENT_SVGS['biceps-curl-machine'];
  if (lower.includes('프리처')) return EQUIPMENT_SVGS['preacher-curl'];
  if (lower.includes('해머 컬') || lower.includes('해머컬')) return EQUIPMENT_SVGS['hammer-curl'];
  if (lower.includes('리스트') || lower.includes('전완')) return EQUIPMENT_SVGS['wrist-roller'];
  if (lower.includes('덤벨 컬') || lower.includes('덤벨컬') || lower.includes('컨센트레이션')) return EQUIPMENT_SVGS['dumbbell-curl'];
  if ((lower.includes('바벨') || lower.includes('이지바') || lower.includes('리버스')) && lower.includes('컬')) return EQUIPMENT_SVGS['barbell-curl'];
  if (lower.includes('케이블')) return EQUIPMENT_SVGS['cable-cross'];

  // Core, Full-body & Cardio
  if (lower.includes('롤아웃') || lower.includes('슬라이더') || lower.includes('애브')) return EQUIPMENT_SVGS['ab-roller'];
  if (lower.includes('로테이션') || lower.includes('토르소')) return EQUIPMENT_SVGS['torso-rotation'];
  if (lower.includes('앱도미널')) return EQUIPMENT_SVGS['ab-machine'];
  if (lower.includes('행잉') || lower.includes('캡틴')) return EQUIPMENT_SVGS['captains-chair'];
  if (lower.includes('사이드 벤드') || lower.includes('로만')) return EQUIPMENT_SVGS['roman-chair'];
  if (lower.includes('크런치') || lower.includes('싯업') || lower.includes('레그레이즈')) return EQUIPMENT_SVGS['crunch-mat'];
  if (lower.includes('플랭크') || category === '복근/코어') return EQUIPMENT_SVGS['mat-core'];
  if (lower.includes('스모') && lower.includes('데드')) return EQUIPMENT_SVGS['sumo-deadlift'];
  if (lower.includes('루마니안') || lower.includes('rdl')) return EQUIPMENT_SVGS['romanian-deadlift'];
  if (lower.includes('클린')) return EQUIPMENT_SVGS['power-clean'];
  if (lower.includes('파머스')) return EQUIPMENT_SVGS['farmers-walk'];
  if (lower.includes('배틀 로프') || lower.includes('배틀로프')) return EQUIPMENT_SVGS['battle-rope'];
  if (lower.includes('박스') || lower.includes('스텝업')) return EQUIPMENT_SVGS['plyo-box'];
  if (lower.includes('데드리프트')) return EQUIPMENT_SVGS['deadlift'];
  if (lower.includes('케틀벨')) return EQUIPMENT_SVGS['kettlebell'];
  if (lower.includes('무동력') || lower.includes('커브드')) return EQUIPMENT_SVGS['curved-treadmill'];
  if (lower.includes('클라이머')) return EQUIPMENT_SVGS['vertical-climber'];
  if (lower.includes('아크')) return EQUIPMENT_SVGS['arc-trainer'];
  if (lower.includes('스키')) return EQUIPMENT_SVGS['skierg'];
  if (lower.includes('에어바이크') || lower.includes('어썰트')) return EQUIPMENT_SVGS['airbike'];
  if (lower.includes('계단') || lower.includes('스텝밀') || lower.includes('천계')) return EQUIPMENT_SVGS['stairmaster'];
  if (lower.includes('일립티컬')) return EQUIPMENT_SVGS['elliptical'];
  if (lower.includes('사이클') || lower.includes('바이크')) return EQUIPMENT_SVGS['stationary-bike'];
  if (lower.includes('로잉')) return EQUIPMENT_SVGS['rowing-machine'];
  if (lower.includes('러닝') || lower.includes('런닝') || category === '유산소') return EQUIPMENT_SVGS['treadmill'];
  if (lower.includes('덤벨')) return EQUIPMENT_SVGS['dumbbell'];

  return EQUIPMENT_SVGS['dumbbell'];
}

// Helper to get recommended alternative exercises for a given exercise
function getExerciseAlternatives(exerciseName, category = '') {
  const lower = (exerciseName || '').trim().toLowerCase();
  const match = EQUIPMENT_CATALOG.find(item => item.name.toLowerCase() === lower);
  if (match && Array.isArray(match.alternatives) && match.alternatives.length > 0) {
    return match.alternatives
      .map(altName => EQUIPMENT_CATALOG.find(item => item.name === altName))
      .filter(Boolean);
  }
  const targetCat = match?.category || category || '가슴';
  return EQUIPMENT_CATALOG
    .filter(item => item.category === targetCat && item.name.toLowerCase() !== lower)
    .slice(0, 4);
}

// Global expose
window.EQUIPMENT_SVGS = EQUIPMENT_SVGS;
window.EQUIPMENT_CATEGORIES = EQUIPMENT_CATEGORIES;
window.EXERCISE_SYNONYMS = EXERCISE_SYNONYMS;
window.EQUIPMENT_CATALOG = EQUIPMENT_CATALOG;
window.getExerciseSvgIcon = getExerciseSvgIcon;
window.getExerciseAlternatives = getExerciseAlternatives;
