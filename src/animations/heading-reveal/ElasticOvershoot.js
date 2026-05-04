import { gsap, SplitText } from '@/lib/gsap'

/**
 * ElasticOvershoot
 * ───────────────
 * Characters fall from above and bounce (elastic overshoot) into place.
 * High energy, satisfying physics feel.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yFrom, rotationRange, elasticity, ease }
 * @param {function}    onComplete
 */
export function ElasticOvershoot({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yFrom = -100, rotationRange = 15, elasticity = 1, ease } = controls

  // 🔁 Cleanup
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🔑 Performance: GPU layer + setup
  chars.forEach((char) => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return
    }
    char.style.display = 'inline-block'
    char.style.willChange = 'transform, opacity'
    char.style.backfaceVisibility = 'hidden'
    char.style.transform = 'translate3d(0,0,0)'
    char.style.transformOrigin = 'center center'
  })

  // 🎲 Pre-calculate random rotations
  const rotations = chars.map(() => (Math.random() - 0.5) * rotationRange)

  // 🎬 Animate using gsap.from (Start state -> End state)
  // Using from: 0 to ensure clean start
  return gsap.from(chars, {
    y: yFrom,
    opacity: 0,
    scale: 0.8,
    rotation: (i) => rotations[i],
    duration: duration,
    stagger: stagger,
    ease: ease, // Usually elastic.out
    onComplete,
  })
}