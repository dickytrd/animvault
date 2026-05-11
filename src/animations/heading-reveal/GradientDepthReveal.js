import { gsap, SplitText } from '@/lib/gsap'

/**
 * GradientDepthReveal
 * ───────────────────
 * Characters reveal from cinematic depth (scale + blur + Y).
 * Combined with Gradient Bloom: The blur makes the gradient 
 * look like glowing light before sharpening into crisp text.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, blurAmount, scaleFrom, depthY, colorStart, colorEnd }
 * @param {function}    onComplete
 */
export function GradientDepthReveal({ element, splitRef, controls, onComplete }) {
  const { 
    duration, 
    stagger, 
    blurAmount = 12, 
    scaleFrom = 0.6, 
    depthY = 50, 
    colorStart = '#38bdf8', 
    colorEnd = '#a855f7' 
  } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    gsap.killTweensOf(splitRef.current.chars)
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const chars = splitRef.current.chars

  // 🎨 Apply Gradient to EACH character immediately
  // This ensures GSAP only animates Transform/Filter (Stable!)
  chars.forEach((char) => {
    const text = char.textContent.trim()
    if (!text) {
      char.style.display = 'inline-block'
      char.style.width = '0.3em'
      return
    }

    // Force GPU + Gradient
    char.style.display = 'inline-block'
    char.style.color = 'transparent'
    char.style.webkitTextFillColor = 'transparent'
    char.style.backgroundImage = `linear-gradient(135deg, ${colorStart}, ${colorEnd})`
    char.style.backgroundClip = 'text'
    char.style.webkitBackgroundClip = 'text'
    char.style.transform = 'translate3d(0,0,0)' // GPU Force
    char.style.willChange = 'transform, filter, opacity'
  })

  // 🎬 Timeline: The "Bloom" Effect
  // Blur on a gradient makes it look like a glowing light!
  const tl = gsap.timeline({ onComplete })

  tl.fromTo(chars, {
    y: depthY,           // Come from below
    scale: scaleFrom,    // Start small (depth)
    opacity: 0,          // Fade in
    filter: `blur(${blurAmount}px)`, // Bloom/Glow state
    rotation: () => (Math.random() - 0.5) * 15 // Subtle chaotic rotation
  }, {
    y: 0,
    scale: 1,
    opacity: 1,
    filter: 'blur(0px)', // Snap to crisp focus
    rotation: 0,
    duration: duration * 0.8,
    stagger: { each: stagger, from: 'start' },
    ease: 'expo.out'     // Sharp deceleration for premium feel
  })

  return tl
}