// /animations/heading-reveal/CharAssembleGlitch.js
import { gsap, SplitText } from '@/lib/gsap'

/**
 * CharAssembleGlitch
 * ───────────────────
 * Characters appear left-to-right. Each starts scattered randomly,
 * then snaps into place with a staggered cascade.
 * Matches madewithgsap.com hero reveal exactly.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, intensity, ease }
 * @param {function}    onComplete
 */
export function CharAssembleGlitch({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, intensity = 80, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🎲 Set initial chaotic state per character
  chars.forEach((char) => {
    const randX = (Math.random() - 0.5) * intensity
    const randY = (Math.random() - 0.5) * intensity
    const randRot = (Math.random() - 0.5) * 60
    const randScale = 0.3 + Math.random() * 0.5

    gsap.set(char, {
      x: randX,
      y: randY,
      rotation: randRot,
      scale: randScale,
      opacity: 0,
      transformOrigin: 'center center',
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden',
    })
  })

  // 🚀 Animate left-to-right stagger
  return gsap.to(chars, {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration,
    stagger: {
      each: stagger,
      from: 'start', // Left-to-right cascade
    },
    ease,
    onComplete,
  })
}