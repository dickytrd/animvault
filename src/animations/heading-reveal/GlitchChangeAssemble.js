// /animations/heading-reveal/GlitchChangeAssemble.js
import { gsap, SplitText } from '@/lib/gsap'

/**
 * GlitchChangeAssemble
 * ─────────────────────
 * Heading starts visible, scatters out, then reassembles.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls
 * @param {function}    onComplete
 */
export function GlitchChangeAssemble({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yRange = 150, rotationRange = 60, ease } = controls

  // 🔁 Cleanup previous
  if (splitRef.current) {
    // Kill all tweens on inner elements
    const oldInners = element.querySelectorAll('.char-mask-inner')
    gsap.killTweensOf(oldInners)
    
    // Clear and revert
    gsap.set(splitRef.current.chars, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  // ✂️ Split into characters
  splitRef.current = new SplitText(element, { type: 'chars' })
  const originalChars = splitRef.current.chars

  // 🎭 Build mask structure
  const charData = originalChars.map((char, i) => {
    const text = char.textContent.trim()
    const isSpace = !text

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
      return { container: maskContainer, inner: null, targets: null }
    }

    const inner = document.createElement('span')
    inner.className = 'char-mask-inner'
    inner.textContent = text
    inner.style.display = 'inline-block'
    inner.style.whiteSpace = 'nowrap'
    inner.style.willChange = 'transform, opacity'
    inner.style.backfaceVisibility = 'hidden'

    maskContainer.appendChild(inner)
    char.parentNode.replaceChild(maskContainer, char)

    // Pre-calculate random targets
    const dir = Math.random() > 0.5 ? 1 : -1
    const targets = {
      y: dir * (yRange * (0.5 + Math.random() * 0.5)),
      rotation: (Math.random() - 0.5) * rotationRange,
      scale: 0.3 + Math.random() * 0.5,
    }

    return { container: maskContainer, inner, targets }
  })

  // Get all inners (filter out nulls for spaces)
  const inners = charData.map((c) => c.inner).filter(Boolean)

  // ✅ Set initial state: VISIBLE
  gsap.set(inners, { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    rotation: 0,
    transformOrigin: 'center center'
  })

  // 🚀 Create timeline
  const tl = gsap.timeline({ onComplete })

  // Phase 1: Scatter OUT (fast)
  charData.forEach((data, i) => {
    if (!data.inner || !data.targets) return
    
    tl.to(data.inner, {
      y: data.targets.y,
      opacity: 1,
      scale: 1,
      rotation: data.targets.rotation,
      duration: duration * 0.3,
      ease: 'power2.in',
    }, i * stagger)
  })

  // Phase 2: Reassemble IN (slower)
  charData.forEach((data, i) => {
    if (!data.inner) return
    
    tl.to(data.inner, {
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: duration * 0.7,
      ease: ease,
    }, '<+=' + (stagger * 0.5)) // Start before previous completes for overlap
  })

  return tl
}