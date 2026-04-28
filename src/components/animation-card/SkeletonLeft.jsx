'use client'

/**
 * SkeletonLeft
 * ────────────
 * Visual curtain shown while GSAP DOM surgery happens (SplitText revert + re-split).
 * Mirrors the exact shape of the left preview panel content to prevent layout shift.
 *
 * DESIGN: Shape matches heading (3 lines) + subtext (2 lines) + button.
 * Height is fixed so the card never jumps.
 */
export function SkeletonLeft({ visible }) {
  return (
    <div
      aria-hidden
      style={{
        position:   'absolute',
        inset:      0,
        opacity:    visible ? 1 : 0,
        transition: visible
          ? 'opacity 0.15s ease'
          : 'opacity 0.2s ease 0.05s', // slight delay on fade-out for smoothness
        pointerEvents: 'none',
        zIndex: 10,
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        gap:            '24px',
        background:     'var(--bg)',
        padding:        '0',
      }}
    >
      {/* Heading skeleton — 3 lines mimicking a large heading */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <SkeletonBar width="88%" height="52px" />
        <SkeletonBar width="92%" height="52px" />
        <SkeletonBar width="68%" height="52px" />
      </div>

      {/* Subtext skeleton — 3 shorter lines */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
        <SkeletonBar width="95%" height="14px" />
        <SkeletonBar width="90%" height="14px" />
        <SkeletonBar width="72%" height="14px" />
      </div>

      {/* Button skeleton */}
      <SkeletonBar width="120px" height="40px" borderRadius="6px" />
    </div>
  )
}

function SkeletonBar({ width, height, borderRadius = '4px' }) {
  return (
    <div
      className="skeleton-shimmer"
      style={{
        width,
        height,
        borderRadius,
        flexShrink: 0,
      }}
    />
  )
}
