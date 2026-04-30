// /animations/heading-reveal/RandomMaskAssemble.js
import { gsap, SplitText } from '@/lib/gsap'

/**
 * RandomMaskAssemble
 * ────────────────────
 * Characters appear in random order with random Y directions.
 * Each char has a mask container that clips the animation.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yRange, rotationRange, ease }
 * @param {function}    onComplete
 */
export function RandomMaskAssemble({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yRange = 120, rotationRange = 45, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars.flatMap((c) => c.querySelectorAll('.char-mask-inner')))
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const originalChars = splitRef.current.chars

  // 🎭 Wrap each char in mask container
  const chars = originalChars.map((char, i) => {
    const text = char.textContent.trim()
    const isSpace = !text

    // Create mask container
    const maskContainer = document.createElement('span')
    maskContainer.className = 'char-mask-container'
    maskContainer.style.display = 'inline-block'
    maskContainer.style.overflow = 'hidden'
    maskContainer.style.position = 'relative'
    maskContainer.style.verticalAlign = 'top'
    maskContainer.style.lineHeight = '1'
    
    if (isSpace) {
      maskContainer.innerHTML = '&nbsp;'
      maskContainer.style.width = '0.3em'
      char.parentNode.replaceChild(maskContainer, char)
      return maskContainer
    }

    // Create inner element that will be animated
    const inner = document.createElement('span')
    inner.className = 'char-mask-inner'
    inner.textContent = text
    inner.style.display = 'inline-block'
    inner.style.whiteSpace = 'nowrap'
    inner.style.willChange = 'transform, opacity'
    inner.style.backfaceVisibility = 'hidden'

    maskContainer.appendChild(inner)
    
    // Replace original char with mask container
    char.parentNode.replaceChild(maskContainer, char)

    // 🎲 Random Y direction (atas atau bawah)
    const direction = Math.random() > 0.5 ? 1 : -1
    const randY = direction * (yRange * (0.5 + Math.random() * 0.5))
    const randRot = (Math.random() - 0.5) * rotationRange
    const randScale = 0.3 + Math.random() * 0.5

    gsap.set(inner, {
      y: randY,
      rotation: randRot,
      scale: randScale,
      opacity: 0,
      transformOrigin: 'center center',
    })

    return maskContainer
  })

  // 🚀 Get all inner elements for animation
  const inners = chars.flatMap((c) => c.querySelectorAll('.char-mask-inner'))

  // Animate dengan random stagger
  return gsap.to(inners, {
    y: 0,
    rotation: 0,
    scale: 1,
    opacity: 1,
    duration,
    stagger: {
      each: stagger,
      from: 'random', // Random order
    },
    ease,
    onComplete,
  })
}