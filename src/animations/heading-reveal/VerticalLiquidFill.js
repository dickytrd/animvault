import { gsap } from '@/lib/gsap'

/**
 * VerticalLiquidFill — Flicker-Free Crossfade
 * Isolates rendering context + delays cleanup to next paint frame.
 */
export function VerticalLiquidFill({ element, splitRef, controls, onComplete }) {
  const { duration, ease, colorTop = '#a855f7', colorBottom = '#38bdf8' } = controls

  // 🔁 Cleanup
  gsap.killTweensOf(element)
  if (splitRef.current) {
    splitRef.current.revert()
    splitRef.current = null
  }

  // 🎨 Initial state + GPU isolation
  gsap.set(element, {
    transform: 'translateZ(0)', //  Forces new stacking context, prevents repaint leaks
    backgroundImage: `linear-gradient(to top, ${colorBottom}, ${colorTop})`,
    backgroundSize: '100% 0%',
    backgroundPosition: 'center bottom',
    backgroundClip: 'text',
    webkitBackgroundClip: 'text',
    color: 'transparent',
    webkitTextFillColor: 'transparent',
    willChange: 'transform, background-size, color',
  })

  const tl = gsap.timeline({ onComplete })

  // 1️⃣ Liquid rises (75% duration)
  tl.to(element, {
    backgroundSize: '100% 100%',
    duration: duration * 0.75,
    ease: ease || 'expo.out'
  })

  // 2️⃣ Solid color fades in (overlaps last 20% of rise)
  tl.to(element, {
    color: colorTop,
    webkitTextFillColor: colorTop,
    duration: duration * 0.4,
    ease: 'power2.inOut'
  }, '-=0.15')

  // 3️⃣ Safe cleanup: Wait for browser paint cycle before removing gradient
  tl.call(() => {
    requestAnimationFrame(() => {
      gsap.set(element, {
        backgroundImage: 'none',
        backgroundClip: 'border-box',
        webkitBackgroundClip: 'border-box',
        willChange: 'auto'
      })
    })
  })

  return tl
}