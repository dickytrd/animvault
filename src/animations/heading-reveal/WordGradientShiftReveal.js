import { gsap, SplitText } from '@/lib/gsap'

/**
 * WordGradientShiftReveal
 * ───────────────────────
 * Words reveal with cinematic depth (Y + Scale + Blur).
 * Features a dynamically shifting gradient during the reveal,
 * then smoothly resolves into a solid final color.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, blurAmount, colorStart, colorEnd, finalColor, ease }
 * @param {function}    onComplete
 */
export function WordGradientShiftReveal({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, blurAmount = 10, colorStart = '#38bdf8', colorEnd = '#f472b6', finalColor = '#ffffff', ease } = controls

  //  Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.words)
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into words
  splitRef.current = new SplitText(element, { type: 'words' })
  const words = splitRef.current.words

  // 🎨 Setup dynamic gradient & GPU isolation per word
  words.forEach((word) => {
    const text = word.textContent.trim()
    if (!text) {
      word.style.display = 'inline-block'
      word.style.width = '0.5em'
      return
    }

    word.style.display = 'inline-block'
    // 200% width allows smooth horizontal shifting
    word.style.backgroundImage = `linear-gradient(90deg, ${colorStart}, ${colorEnd}, ${colorStart})`
    word.style.backgroundSize = '200% 100%'
    word.style.backgroundPosition = '0% 0%'
    word.style.backgroundClip = 'text'
    word.style.webkitBackgroundClip = 'text'
    word.style.color = 'transparent'
    word.style.webkitTextFillColor = 'transparent'
    word.style.transform = 'translateZ(0)'
    word.style.willChange = 'transform, filter, opacity, background-position'
  })

  // 🎬 Timeline
  const tl = gsap.timeline({ onComplete })

  // Phase 1: Cinematic reveal + gradient shift
  tl.fromTo(words, {
    y: 40,
    scale: 0.92,
    opacity: 0,
    filter: `blur(${blurAmount}px)`,
    backgroundPosition: '0% 0%'
  }, {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)',
    backgroundPosition: '100% 0%', // Gradient flows horizontally during reveal
    duration: duration * 0.75,
    stagger: { each: stagger, from: 'start' },
    ease: ease || 'power3.out'
  })

  // Phase 2: Resolve to solid color (overlaps last 25% of reveal)
  tl.to(words, {
    color: finalColor,
    webkitTextFillColor: finalColor,
    duration: duration * 0.4,
    ease: 'power2.inOut'
  }, '-=0.2')

  // Phase 3: Safe cleanup (anti-flicker)
  tl.call(() => {
    requestAnimationFrame(() => {
      words.forEach(w => {
        w.style.backgroundImage = 'none'
        w.style.backgroundClip = 'border-box'
        w.style.webkitBackgroundClip = 'border-box'
        w.style.willChange = 'auto'
      })
    })
  })

  return tl
}