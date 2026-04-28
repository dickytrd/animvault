import { gsap, SplitText } from '@/lib/gsap'

/**
 * LineByLine
 * ──────────
 * Reveals entire text lines one by one — distinct from per-char and per-word.
 * The mask uses overflow:hidden + yPercent on each line span.
 *
 * Each line is wrapped in an auto-generated overflow:hidden div for masking.
 * Wrappers are stored in splitRef.current._wrappers for manual cleanup on revert.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, yAmount, ease }
 * @param {function}    onComplete
 */
export function LineByLine({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, yAmount, ease } = controls

  // Cleanup: remove previous split AND manually-created wrappers
  if (splitRef.current) {
    gsap.set(splitRef.current.lines, { clearProps: 'all' })
    // Remove wrapper divs added in previous run
    if (splitRef.current._wrappers) {
      splitRef.current._wrappers.forEach((wrapper) => {
        const line = wrapper.firstChild
        if (line) wrapper.parentNode?.insertBefore(line, wrapper)
        wrapper.parentNode?.removeChild(wrapper)
      })
    }
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'lines' })
  const lines = splitRef.current.lines
  const wrappers = []

  // Wrap each line in overflow:hidden div — this is the mask
  lines.forEach((line) => {
    const wrapper = document.createElement('div')
    wrapper.style.overflow = 'hidden'
    wrapper.style.display  = 'block'
    // slight extra padding so descenders aren't clipped
    wrapper.style.paddingBottom = '0.06em'
    wrapper.style.marginBottom  = '-0.06em'
    line.parentNode.insertBefore(wrapper, line)
    wrapper.appendChild(line)
    wrappers.push(wrapper)
  })

  // Store wrappers for cleanup on next run
  splitRef.current._wrappers = wrappers

  return gsap.from(lines, {
    yPercent: yAmount,
    duration,
    stagger,
    ease,
    onComplete,
  })
}