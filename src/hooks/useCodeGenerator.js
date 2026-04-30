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

// ─── 16. Slice Glitch — Assemble ─────────────────────────
'slice-glitch': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Each character splits into horizontal slices that scatter then converge.
// Creates a chaotic-but-smooth "shatter/assemble" editorial effect.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char) => {
  const text = char.textContent.trim()
  if (!text) return
  
  char.style.display = 'inline-block'
  char.style.overflow = 'hidden'
  char.style.position = 'relative'
  char.innerHTML = ''
  
  for (let i = 0; i < ${c.slices}; i++) {
    const slice = document.createElement('div')
    slice.className = 'glitch-slice'
    slice.style.cssText = \`position:absolute;top:\${i * (100 / ${c.slices})}%;left:0;width:100%;height:\${100 / ${c.slices}}%;overflow:hidden;\`
    
    const inner = document.createElement('span')
    inner.textContent = text
    inner.style.cssText = \`display:block;position:absolute;top:-\${i * (100 / (${c.slices} - 1))}%;left:0;width:100%;\`
    
    slice.appendChild(inner)
    char.appendChild(slice)
    
    // Random scatter start
    const rx = (Math.random() - 0.5) * ${c.glitchRange} * 2
    const ry = (Math.random() - 0.5) * ${c.glitchRange} * 2
    gsap.set(slice, { x: rx, y: ry, opacity: 0 })
  }
})

const allSlices = element.querySelectorAll('.glitch-slice')
gsap.to(allSlices, {
  x: 0, y: 0, opacity: 1,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}'
})`,

// ─── 17. Char Assemble — Glitch ──────────────────────────
'char-assemble-glitch': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Characters appear left-to-right. Each starts scattered randomly,
// then snaps into place with a staggered cascade.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char) => {
  const randX = (Math.random() - 0.5) * ${c.intensity}
  const randY = (Math.random() - 0.5) * ${c.intensity}
  const randRot = (Math.random() - 0.5) * 60
  const randScale = 0.3 + Math.random() * 0.5
  
  gsap.set(char, {
    x: randX, y: randY, rotation: randRot, scale: randScale,
    opacity: 0, transformOrigin: 'center center'
  })
})

gsap.to(split.chars, {
  x: 0, y: 0, rotation: 0, scale: 1, opacity: 1,
  duration: ${c.duration},
  stagger: { each: ${c.stagger}, from: 'start' },
  ease: '${c.ease}'
})`,

// ─── 18. Random Mask — Assemble ──────────────────────────
'random-mask-assemble': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Characters appear in random order with random Y directions.
// Each char is masked and reveals as it slides into place.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char) => {
  const text = char.textContent.trim()
  if (!text) { char.innerHTML = '&nbsp;'; return }
  
  char.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:1;'
  char.innerHTML = \`<span class="char-inner">\${text}</span>\`
  
  const inner = char.querySelector('.char-inner')
  inner.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden;'
  
  const randY = (Math.random() > 0.5 ? 1 : -1) * (${c.yRange} * (0.5 + Math.random() * 0.5))
  const randRot = (Math.random() - 0.5) * ${c.rotationRange}
  
  gsap.set(inner, { y: randY, rotation: randRot, scale: 0.4 + Math.random() * 0.4, opacity: 0 })
})

const inners = element.querySelectorAll('.char-inner')
gsap.to(inners, {
  y: 0, rotation: 0, scale: 1, opacity: 1,
  duration: ${c.duration},
  stagger: { each: ${c.stagger}, from: 'random' },
  ease: '${c.ease}'
})`,

// ─── 19. Bottom Mask — Assemble ──────────────────────────
'bottom-mask-assemble': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// All characters rise from below with random stagger order.
// Masked reveal creates a clean, upward-flowing editorial effect.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char) => {
  const text = char.textContent.trim()
  if (!text) { char.innerHTML = '&nbsp;'; return }
  
  char.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:1;'
  char.innerHTML = \`<span class="char-inner">\${text}</span>\`
  
  const inner = char.querySelector('.char-inner')
  inner.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden;'
  
  const randY = ${c.yRange} * (0.5 + Math.random() * 0.5) // Always positive (from below)
  const randRot = (Math.random() - 0.5) * ${c.rotationRange}
  
  gsap.set(inner, { y: randY, rotation: randRot, scale: 0.4 + Math.random() * 0.4, opacity: 0 })
})

const inners = element.querySelectorAll('.char-inner')
gsap.to(inners, {
  y: 0, rotation: 0, scale: 1, opacity: 1,
  duration: ${c.duration},
  stagger: { each: ${c.stagger}, from: 'random' },
  ease: '${c.ease}'
})`,

// ─── 20. Glitch Change — Assemble ────────────────────────
'glitch-change-assemble': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Visible heading scatters out then reassembles.
// Perfect for "change/refresh" effects without reveal-from-zero.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

const charData = split.chars.map((char) => {
  const text = char.textContent.trim()
  if (!text) return null
  
  char.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:1;'
  char.innerHTML = \`<span class="char-inner">\${text}</span>\`
  
  const inner = char.querySelector('.char-inner')
  inner.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden;'
  
  const dir = Math.random() > 0.5 ? 1 : -1
  return {
    inner,
    targets: {
      y: dir * (${c.yRange} * (0.5 + Math.random() * 0.5)),
      rotation: (Math.random() - 0.5) * ${c.rotationRange},
      scale: 0.3 + Math.random() * 0.5
    }
  }
}).filter(Boolean)

const inners = charData.map(d => d.inner)
gsap.set(inners, { y: 0, opacity: 1, scale: 1, rotation: 0 })

const tl = gsap.timeline()

// Phase 1: Scatter out (fast)
charData.forEach((data, i) => {
  tl.to(data.inner, {
    y: data.targets.y, opacity: 0, scale: data.targets.scale, rotation: data.targets.rotation,
    duration: ${c.duration} * 0.3, ease: 'power2.in'
  }, i * ${c.stagger})
})

// Phase 2: Reassemble in (smooth)
tl.to(inners, {
  y: 0, opacity: 1, scale: 1, rotation: 0,
  duration: ${c.duration} * 0.7, stagger: ${c.stagger}, ease: '${c.ease}'
}, '<+=0.05')`,

// ─── 21. Slice Mask — Glitch ─────────────────────────────
'slice-mask-glitch': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Visible text instantly swaps to scattered Y positions (mask glitch),
// then smoothly snaps back. No fade, pure transform cascade.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char, i) => {
  const text = char.textContent.trim()
  if (!text) { char.style.display = 'inline-block'; char.style.width = '0.3em'; return }
  
  char.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:1;'
  char.innerHTML = \`<span class="char-inner">\${text}</span>\`
  
  const inner = char.querySelector('.char-inner')
  inner.style.cssText = 'display:inline-block;will-change:transform;backface-visibility:hidden;'
  
  // Pre-calculate random Y for this char
  const randY = (Math.random() > 0.5 ? 1 : -1) * ${c.yRange}
  char._randomY = randY
  gsap.set(inner, { y: 0, opacity: 1 })
})

const inners = element.querySelectorAll('.char-inner')
const tl = gsap.timeline()

// Instant swap to scattered state
tl.set(inners, { y: (i) => element.querySelectorAll('.char-inner')[i].parentNode._randomY })

// Smooth snap back
tl.to(inners, {
  y: 0,
  duration: ${c.duration},
  stagger: { each: ${c.stagger}, from: 'random' },
  ease: '${c.ease}'
}, '+=0.05')`,

// ─── 22. Alternating Y — Zigzag ──────────────────────────
'alternating-y-reveal': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Characters reveal from alternating top/bottom directions
// with left-to-right stagger. Clean zigzag editorial cascade.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char, i) => {
  const text = char.textContent.trim()
  if (!text) { char.style.display = 'inline-block'; char.style.width = '0.3em'; return }
  
  char.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:1;'
  char.innerHTML = \`<span class="char-inner">\${text}</span>\`
  
  const inner = char.querySelector('.char-inner')
  inner.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden;'
  
  // Zigzag: even=bottom (+), odd=top (-)
  const startY = i % 2 === 0 ? ${c.yRange} : -${c.yRange}
  gsap.set(inner, { y: startY, opacity: 0 })
})

const inners = element.querySelectorAll('.char-inner')
gsap.to(inners, {
  y: 0, opacity: 1,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}'
})`,

// ─── 23. Floating Zigzag — Diagonal (With Mask) ──────────
'floating-zigzag-reveal': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Characters float in from the right with alternating Y & subtle rotation.
// Masked version for precise clipping during animation.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char, i) => {
  const text = char.textContent.trim()
  if (!text) { char.style.display = 'inline-block'; char.style.width = '0.3em'; return }
  
  char.style.cssText = 'display:inline-block;overflow:hidden;position:relative;vertical-align:top;line-height:1;'
  char.innerHTML = \`<span class="char-inner">\${text}</span>\`
  
  const inner = char.querySelector('.char-inner')
  inner.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden;'
  
  // Zigzag Y + Float from Right + Alternating Rotation
  const startY = i % 2 === 0 ? ${c.yRange} : -${c.yRange}
  const startRot = (i % 2 === 0 ? 1 : -1) * ${c.rotationRange}
  
  gsap.set(inner, {
    x: ${c.xRange}, y: startY, rotation: startRot,
    opacity: 0, transformOrigin: 'center center'
  })
})

const inners = element.querySelectorAll('.char-inner')
gsap.to(inners, {
  x: 0, y: 0, rotation: 0, opacity: 1,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}'
})`,

// ─── 24. Floating Zigzag — No Mask ───────────────────────
'floating-zigzag-nomask': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Characters float in from the right with zigzag Y & rotation.
// No clipping — pure transform cascade on SplitText chars.

const element = document.querySelector('.heading')
const split = new SplitText(element, { type: 'chars' })

split.chars.forEach((char, i) => {
  const text = char.textContent.trim()
  if (!text) { char.style.display = 'inline-block'; char.style.width = '0.3em'; return }
  
  char.style.cssText = 'display:inline-block;will-change:transform,opacity;backface-visibility:hidden;'
  
  // Zigzag Y + Float from Right + Alternating Rotation
  const startY = i % 2 === 0 ? ${c.yRange} : -${c.yRange}
  const startRot = (i % 2 === 0 ? 1 : -1) * ${c.rotationRange}
  
  gsap.set(char, {
    x: ${c.xRange}, y: startY, rotation: startRot,
    opacity: 0, transformOrigin: 'center center'
  })
})

gsap.to(split.chars, {
  x: 0, y: 0, rotation: 0, opacity: 1,
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}'
})`,

// ─── 25. Cinematic Depth — Z-Blur ────────────────────────
'cinematic-depth': (c) =>
`import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

// Cinematic reveal: chars fly in from depth with scale, blur & fade.
// Premium editorial feel with subtle Z-axis simulation.

const element = document.querySelector('.heading')

// Set perspective for subtle 3D depth
gsap.set(element, { perspective: 800, transformStyle: 'preserve-3d' })

const split = new SplitText(element, { type: 'chars' })

// Initial state: scaled down, blurred, displaced Y, invisible
gsap.set(split.chars, {
  scale: ${c.scaleFrom},
  y: ${c.depthY},
  opacity: 0,
  filter: 'blur(${c.blurAmount}px)',
  transformOrigin: 'center center',
})

// Animate to sharp focus & final position
gsap.to(split.chars, {
  scale: 1,
  y: 0,
  opacity: 1,
  filter: 'blur(0px)',
  duration: ${c.duration},
  stagger: ${c.stagger},
  ease: '${c.ease}',
})`,
}

export function useCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const template = templates[animationId]
    if (!template) return '// Template not found'
    return template(controls)
  }, [animationId, controls])
}