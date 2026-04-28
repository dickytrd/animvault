import { useMemo } from 'react'

/**
 * useCodeGenerator
 * ────────────────
 * Derives a copyable GSAP code string from the current animation ID + controls.
 * This is a pure derived value (useMemo) — it CANNOT get out of sync with controls.
 *
 * Add a new template key matching the animation `id` from headingReveal.config.js.
 */

const templates = {

  // ─── 1. Split Fade — Opacity ──────────────────────────────────
  'split-fade-opacity': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'chars',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.chars, {
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 2. Split Fade — Blur ─────────────────────────────────────
  'split-fade-blur': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'chars',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.chars, {
      opacity: 0,
      filter: 'blur(${c.blurAmount}px)',
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 3. Split Mask — Per Character ───────────────────────────
  'split-mask-char': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Each word becomes overflow:hidden — acting as the clip mask
SplitText.create('.heading', {
  type: 'chars,words',
  autoSplit: true,
  onSplit(self) {
    // Apply mask to each word container
    self.words.forEach((word) => {
      gsap.set(word, {
        display: 'inline-block',
        overflow: 'hidden',
        verticalAlign: 'top',
        paddingBottom: '0.05em',
      })
    })

    return gsap.from(self.chars, {
      yPercent: ${c.yOffset},
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 4. Split Mask — Per Word ─────────────────────────────────
  'split-mask-word': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Each line becomes overflow:hidden — acting as the clip mask
SplitText.create('.heading', {
  type: 'words,lines',
  autoSplit: true,
  onSplit(self) {
    // Apply mask to each line container
    self.lines.forEach((line) => {
      gsap.set(line, {
        display: 'block',
        overflow: 'hidden',
        paddingBottom: '0.08em',
      })
    })

    return gsap.from(self.words, {
      yPercent: ${c.yOffset},
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 5. Split Skew — Fade ─────────────────────────────────────
  'split-skew-fade': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'words',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.words, {
      opacity: 0,
      skewX: ${c.skewAmount},
      y: ${c.yAmount},
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 6. Scramble Reveal ────────────────────────────────────
  'scramble-reveal': (c) =>
`import gsap from 'gsap'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

gsap.registerPlugin(ScrambleTextPlugin)

// Element must have the text content already set in the DOM
const heading = document.querySelector('.heading')

gsap.to(heading, {
  duration: ${c.duration},
  scrambleText: {
    text: '{original}',  // reveals the existing text content
    chars: '${c.chars}',
    speed: ${c.speed},
    revealDelay: ${c.revealDelay},
    tweenLength: false,
  },
  ease: 'none',
})`,

  // ─── 7. Rotate In 3D — X Axis ─────────────────────────────
  'rotate-in-3d': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'chars,words',
  autoSplit: true,
  onSplit(self) {
    // Words need inline-block for 3D transforms to work correctly
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block', verticalAlign: 'top' })
    })

    return gsap.from(self.chars, {
      transformPerspective: ${c.perspective},
      rotateX: ${c.rotateAmount},
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 8. Flip Word — 3D Y Axis ─────────────────────────────
  'flip-word-3d': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'words',
  autoSplit: true,
  onSplit(self) {
    // inline-block required for 3D transforms on inline elements
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block' })
    })

    return gsap.from(self.words, {
      transformPerspective: ${c.perspective},
      rotateY: ${c.rotateAmount},
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 9. Wave — Per Character ──────────────────────────────
  'wave-char': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'chars,words',
  autoSplit: true,
  onSplit(self) {
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block', verticalAlign: 'top' })
    })

    return gsap.from(self.chars, {
      // Function-based value: each char starts at a sine-wave Y offset
      y: (i) => Math.sin(i * ${c.frequency}) * ${c.amplitude},
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 10. Line by Line — Masked ────────────────────────────
  'line-by-line': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'lines',
  autoSplit: true,
  onSplit(self) {
    // Wrap each line in overflow:hidden — this creates the hard mask
    self.lines.forEach((line) => {
      const wrapper = document.createElement('div')
      wrapper.style.overflow = 'hidden'
      wrapper.style.display = 'block'
      wrapper.style.paddingBottom = '0.06em'
      wrapper.style.marginBottom = '-0.06em'
      line.parentNode.insertBefore(wrapper, line)
      wrapper.appendChild(line)
    })

    return gsap.from(self.lines, {
      yPercent: ${c.yAmount},
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 11. Scale Fade — Per Word ────────────────────────────
  'scale-fade': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'words',
  autoSplit: true,
  onSplit(self) {
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block' })
    })

    return gsap.from(self.words, {
      scale: ${c.scaleFrom},
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 12. Typewriter ───────────────────────────────────────
  'typewriter': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'chars,words',
  autoSplit: true,
  onSplit(self) {
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block', verticalAlign: 'top' })
    })

    // Set all chars invisible first
    gsap.set(self.chars, { opacity: 0 })

    // Reveal one at a time — effect is driven entirely by stagger
    return gsap.to(self.chars, {
      opacity: 1,
      duration: 0.01,       // near-instant per char
      stagger: ${c.speed},  // time between each character appearing
      ease: 'none',
    })
  },
})`,

  // ─── 13. Letter Collapse ──────────────────────────────────
  'letter-collapse': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'chars,words',
  autoSplit: true,
  onSplit(self) {
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block', verticalAlign: 'top' })
    })

    const total = self.chars.length
    const center = (total - 1) / 2

    return gsap.from(self.chars, {
      // Each char offset proportional to its distance from center
      x: (i) => (i - center) * ${c.spread},
      opacity: 0,
      duration: ${c.duration},
      stagger: 0, // all arrive simultaneously — key to the collapse feel
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 14. Slide From Left — Per Word ───────────────────────
  'slide-from-left': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

SplitText.create('.heading', {
  type: 'words',
  autoSplit: true,
  onSplit(self) {
    self.words.forEach((word) => {
      gsap.set(word, { display: 'inline-block' })
    })

    return gsap.from(self.words, {
      x: -${c.xAmount},
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,

  // ─── 15. Fade Subtle — Minimal ────────────────────────────
  'fade-subtle': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// The most minimal animation — per-line fade with tiny y offset.
// Designed for refined, editorial contexts where less is more.
SplitText.create('.heading', {
  type: 'lines',
  autoSplit: true,
  onSplit(self) {
    return gsap.from(self.lines, {
      y: ${c.yAmount},
      opacity: 0,
      duration: ${c.duration},
      stagger: ${c.stagger},
      ease: '${c.ease}',
    })
  },
})`,
}

export function useCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const template = templates[animationId]
    if (!template) return '// Template not found'
    return template(controls)
  }, [animationId, controls])
}