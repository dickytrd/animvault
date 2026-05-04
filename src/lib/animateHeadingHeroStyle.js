// @/lib/animateHeadingHeroStyle.js
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

/**
 * animateHeadingHeroStyle
 * ───────────────────────
 * Matches Hero heading animation exactly:
 * blur(20px) + yPercent:110 + opacity:0 → blur(0) + yPercent:0 + opacity:1
 * Triggered via ScrollTrigger for section headings
 *
 * @param {HTMLElement} headingEl - h1/h2 element to animate
 * @param {object} options - { start, duration, stagger, ease, once }
 * @returns {Function} cleanup function
 */
export function animateHeadingHeroStyle(headingEl, options = {}) {
  if (!headingEl) return () => {}

  const {
    start = 'top 75%',
    duration = 0.7,
    stagger = 0.03,
    ease = 'power3.out',
    once = true,
  } = options

  // Check reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    gsap.set(headingEl, { opacity: 1, filter: 'none', yPercent: 0 })
    return () => {}
  }

  // Cleanup previous
  gsap.killTweensOf(headingEl)
  const existingSplit = headingEl._splitTextInstance
  if (existingSplit) {
    existingSplit.revert()
    delete headingEl._splitTextInstance
  }

  // Split text
  const split = new SplitText(headingEl, { type: 'chars,words' })
  headingEl._splitTextInstance = split

  // Set initial state (EXACTLY like Hero)
  gsap.set(split.chars, {
    filter: 'blur(20px)',
    yPercent: 25,
    opacity: 0,
  })

  // Animate on scroll
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: headingEl,
      start,
      toggleActions: 'play none none none',
      once,
    },
  })

  tl.to(split.chars, {
    filter: 'blur(0px)',
    yPercent: 0,
    opacity: 1,
    duration,
    stagger,
    ease,
  })

  // Cleanup
  return () => {
    tl.kill()
    if (headingEl._splitTextInstance) {
      headingEl._splitTextInstance.revert()
      delete headingEl._splitTextInstance
    }
  }
}