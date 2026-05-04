import { gsap, SplitText } from '@/lib/gsap'

/**
 * RadialBurstReveal — Fixed & Robust
 */
export function RadialBurstReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, burstRange = 150, scaleFrom = 0.5, rotationRange = 180, ease } = controls

  try {
    // 🔁 Cleanup
    if (splitRef.current) {
      gsap.killTweensOf(splitRef.current.chars)
      gsap.set(splitRef.current.chars, { clearProps: 'all' })
      splitRef.current.revert()
      splitRef.current = null
    }

    // ✂️ Split
    splitRef.current = new SplitText(element, { type: 'chars' })
    const chars = splitRef.current.chars.filter(char => char.textContent.trim())

    if (chars.length === 0) {
      console.warn('[RadialBurst] No characters found!')
      onComplete?.()
      return null
    }

    // 🔑 Setup GPU layer
    chars.forEach((char) => {
      char.style.display = 'inline-block'
      char.style.willChange = 'transform, opacity'
      char.style.backfaceVisibility = 'hidden'
      char.style.transformOrigin = 'center center'
    })

    // 📐 Calculate center of the element
    const elementRect = element.getBoundingClientRect()
    const centerX = elementRect.width / 2
    const centerY = elementRect.height / 2

    // 🎲 Pre-calculate positions
    const charData = chars.map((char, i) => {
      const charRect = char.getBoundingClientRect()
      const parentRect = char.offsetParent?.getBoundingClientRect() || elementRect
      
      // Calculate position relative to parent
      const charX = char.offsetLeft + char.offsetWidth / 2
      const charY = char.offsetTop + char.offsetHeight / 2
      
      // Calculate angle from center
      const dx = charX - centerX
      const dy = charY - centerY
      const angle = Math.atan2(dy, dx)
      
      // Random distance & rotation
      const distance = burstRange * (0.6 + Math.random() * 0.4)
      const rotation = (Math.random() - 0.5) * rotationRange
      
      return {
        char,
        startX: -Math.cos(angle) * distance,
        startY: -Math.sin(angle) * distance,
        rotation,
      }
    })

    // 🎬 Initial state: scattered
    gsap.set(charData.map(d => d.char), {
      x: (i) => charData[i].startX,
      y: (i) => charData[i].startY,
      scale: scaleFrom,
      rotation: (i) => charData[i].rotation,
      opacity: 0,
    })

    // 🚀 Animate converge
    return gsap.to(charData.map(d => d.char), {
      x: 0,
      y: 0,
      scale: 1,
      rotation: 0,
      opacity: 1,
      duration,
      stagger,
      ease,
      onComplete,
    })

  } catch (error) {
    console.error('[RadialBurstReveal] Error:', error)
    onComplete?.()
    return null
  }
}