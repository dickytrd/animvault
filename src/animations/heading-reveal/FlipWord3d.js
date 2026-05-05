import { gsap, SplitText } from '@/lib/gsap'

/**
 * FlipWord3D
 * ──────────
 * Each word flips in on the Y axis — like a card turning face-forward.
 * `transformPerspective` creates the depth per word.
 *
 * @param {HTMLElement} element
 * @param {object}      splitRef
 * @param {object}      controls  - { duration, stagger, rotateAmount, perspective, ease }
 * @param {function}    onComplete
 */
export function FlipWord3d({ element, splitRef, controls, onComplete }) {
  const { duration, stagger, rotateAmount, perspective, ease } = controls

  if (splitRef.current) {
    gsap.set(splitRef.current.words, { clearProps: 'all' })
    splitRef.current.revert()
    splitRef.current = null
  }

  splitRef.current = new SplitText(element, { type: 'words' })
  const words = splitRef.current.words

  // inline-block required for 3D transform
  words.forEach((w) => (w.style.display = 'inline-block'))

  return gsap.from(words, {
    transformPerspective: perspective,
    rotateY: rotateAmount,
    opacity: 0,
    duration,
    stagger,
    ease,
    onComplete,
  })
}