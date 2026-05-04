import { useMemo } from 'react'

const templates = {
  'btn-fill-slide': (c) =>
`import gsap from 'gsap'

// Fill Slide — background slides in from left on hover
const btn  = document.querySelector('.btn')
const fill = btn.querySelector('.btn-fill') // overflow:hidden bg div

gsap.set(fill, { scaleX: 0, transformOrigin: 'left center' })

btn.addEventListener('mouseenter', () => {
  gsap.to(fill, { scaleX: 1, duration: ${c.duration}, ease: 'power3.out' })
})

btn.addEventListener('mouseleave', () => {
  gsap.to(fill, {
    scaleX: 0,
    duration: ${(c.duration * 0.8).toFixed(2)},
    ease: 'power3.in',
    transformOrigin: 'right center',
  })
    gsap.set(fill, { transformOrigin: 'left center', delay: c.duration * 0.8 })
})`,

  'btn-arrow-slide': (c) =>
`import gsap from 'gsap'

// Arrow Slide — label and arrow shift right on hover
const btn   = document.querySelector('.btn')
const label = btn.querySelector('.btn-label')
const arrow = btn.querySelector('.btn-arrow')

btn.addEventListener('mouseenter', () => {
  gsap.to(label, { x: 3,  duration: ${c.duration}, ease: 'power2.out' })
  // gsap.to(arrow, { x: 5,  duration: ${c.duration}, ease: 'power2.out' })
})

btn.addEventListener('mouseleave', () => {
  gsap.to(label, { x: 0, duration: ${c.duration}, ease: 'power2.inOut' })
  // gsap.to(arrow, { x: 0, duration: ${c.duration}, ease: 'power2.inOut' })
})`,

  'btn-ripple-click': (c) =>
`import gsap from 'gsap'

// Ripple Click — ripple expands from exact click position
const btn = document.querySelector('.btn')
// btn must have: position:relative; overflow:hidden

btn.addEventListener('click', (e) => {
  const rect   = btn.getBoundingClientRect()
  const x      = e.clientX - rect.left
  const y      = e.clientY - rect.top
  const size   = Math.max(rect.width, rect.height) * 2

  const ripple = document.createElement('div')

  Object.assign(ripple.style, {
    position:     'absolute',
    width:        size + 'px',
    height:       size + 'px',
    left:         (x - size / 2) + 'px',
    top:          (y - size / 2) + 'px',
    borderRadius: '50%',
    background:   'rgba(255, 255, 255, 0.25)',
    pointerEvents:'none',
  })

  btn.appendChild(ripple)

  gsap.fromTo(ripple,
    { scale: 0, opacity: 1 },
    {
      scale: 1,
      opacity: 0,
      duration: ${c.duration},
      ease: 'power2.out',
      onComplete: () => ripple.remove(),
    }
  )
})`,

  'btn-scale-pop': (c) =>
`import gsap from 'gsap'

// Scale Pop — hover scale + elastic spring on click
const btn = document.querySelector('.btn')

btn.addEventListener('mouseenter', () => {
  gsap.to(btn, { scale: ${c.scaleHover}, duration: ${c.duration}, ease: 'back.out(2)' })
})

btn.addEventListener('mouseleave', () => {
  gsap.to(btn, { scale: 1, duration: ${c.duration}, ease: 'power2.inOut' })
})

btn.addEventListener('mousedown', () => {
  gsap.to(btn, { scale: 0.93, duration: 0.08, ease: 'power2.in' })
})

btn.addEventListener('mouseup', () => {
  gsap.to(btn, { scale: ${c.scaleHover}, duration: 0.2, ease: 'back.out(3)' })
})`,

  'btn-shake-error': (c) =>
`import gsap from 'gsap'

// Shake Error — rapid x shake to signal rejection/error
const btn = document.querySelector('.btn')
let isAnimating = false

btn.addEventListener('click', () => {
  if (isAnimating) return
  isAnimating = true

  const tl = gsap.timeline({
    onComplete: () => { isAnimating = false }
  })

  // Flash red border
  gsap.to(btn, { borderColor: '#ef4444', duration: 0.1 })

  // Shake sequence
  tl.to(btn, { x: -${c.intensity},                    duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.out'   })
    .to(btn, { x:  ${c.intensity},                    duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.inOut' })
    .to(btn, { x: -${Math.round(c.intensity * 0.7)}, duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.inOut' })
    .to(btn, { x:  ${Math.round(c.intensity * 0.7)}, duration: ${(c.duration * 0.1).toFixed(2)}, ease: 'power2.inOut' })
    .to(btn, { x:  0, duration: ${(c.duration * 0.15).toFixed(2)}, ease: 'power2.out' })
    .to(btn, { borderColor: 'initial', duration: 0.3 }, '<')
})`,

// ─── 06. Magnetic Pull ───────────────────────────────────
  'btn-magnetic': (c) =>
`import gsap from 'gsap'

// Magnetic Pull — button follows cursor with magnetic attraction
const btn = document.querySelector('.btn')

btn.addEventListener('mousemove', (e) => {
  const rect = btn.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  
  // Calculate distance from center (-1 to 1)
  const deltaX = (e.clientX - centerX) / rect.width * 2
  const deltaY = (e.clientY - centerY) / rect.height * 2
  
  // Magnetic pull (capped at range)
  const targetX = deltaX * ${c.magneticRange}
  const targetY = deltaY * ${c.magneticRange}
  
  gsap.to(btn, {
    x: targetX,
    y: targetY,
    duration: ${c.duration},
    ease: 'power2.out',
  })
})

btn.addEventListener('mouseleave', () => {
  // Snap back with elastic ease
  gsap.to(btn, {
    x: 0,
    y: 0,
    duration: ${(c.duration * 0.8).toFixed(2)},
    ease: 'elastic.out(1, 0.3)',
  })
})`,

// ─── 07. 3D Flip Reveal ──────────────────────────────────
  'btn-3d-flip': (c) =>
`import gsap from 'gsap'

// 3D Flip Reveal — button flips to show secondary text
const btn = document.querySelector('.btn')
const front = btn.querySelector('.btn-front')
const back = btn.querySelector('.btn-back')

// Setup 3D context
gsap.set(btn, { perspective: 600 })
gsap.set([front, back], { 
  backfaceVisibility: 'hidden',
  transformStyle: 'preserve-3d'
})
gsap.set(back, { rotation${c.axis === 'Y' ? 'Y' : 'X'}: 180 })

btn.addEventListener('mouseenter', () => {
  const rotationProp = '${c.axis}' === 'Y' ? 'rotationY' : 'rotationX'
  
  gsap.to(back, {
    [rotationProp]: 180,
    duration: ${c.duration},
    ease: 'power2.inOut',
  })
  
  gsap.to(front, {
    [rotationProp]: -180,
    duration: ${c.duration},
    ease: 'power2.inOut',
  })
})

btn.addEventListener('mouseleave', () => {
  const rotationProp = '${c.axis}' === 'Y' ? 'rotationY' : 'rotationX'
  
  gsap.to(back, {
    [rotationProp]: 0,
    duration: ${c.duration},
    ease: 'power2.inOut',
  })
  
  gsap.to(front, {
    [rotationProp]: 0,
    duration: ${c.duration},
    ease: 'power2.inOut',
  })
})`,

  // ─── 08. Liquid Fill ─────────────────────────────────────
  'btn-liquid-fill': (c) =>
`import gsap from 'gsap'

// Liquid Fill — 3-state interactive button with auto-reverse
const btn   = document.querySelector('.btn')
const fill  = btn.querySelector('.btn-fill')
const wave  = btn.querySelector('.btn-wave')
const slider = btn.querySelector('.text-slider')

let isAnimating = false

// Initial state
gsap.set([fill, wave], { yPercent: 100, opacity: 0 })
gsap.set(slider, { yPercent: 0 })

btn.addEventListener('mouseenter', () => {
  if (isAnimating) return
  gsap.killTweensOf([btn, wave, slider])
  gsap.to(btn, { borderColor: 'var(--accent)', duration: 0.3 })
  gsap.to(slider, { yPercent: -33.33, duration: 0.3 })
  gsap.set(wave, { yPercent: 100, opacity: 1 })
  gsap.to(wave, { yPercent: 85, duration: 0.4, repeat: -1, yoyo: true, repeatDelay: 0.6 })
})

btn.addEventListener('mouseleave', () => {
  if (isAnimating) return
  gsap.killTweensOf([btn, wave, slider])
  gsap.to(btn, { borderColor: 'var(--border)', duration: 0.3 })
  gsap.to(slider, { yPercent: 0, duration: 0.3 })
  gsap.to(wave, { yPercent: 100, opacity: 0, duration: 0.3 })
})

btn.addEventListener('click', () => {
  if (isAnimating) return
  isAnimating = true
  gsap.killTweensOf([btn, wave, slider])

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.timeline()
        .to(slider, { yPercent: 0, duration: 0.4 })
        .to(fill, { yPercent: 100, opacity: 0, duration: 0.4 }, '<')
        .to(wave, { yPercent: 100, opacity: 0, duration: 0.4 }, '<')
        .to(btn, { borderColor: 'var(--border)', duration: 0.3 }, '-=0.3')
        .call(() => { isAnimating = false })
    }
  })

  gsap.set(wave, { yPercent: 85, opacity: 1 })
  
  tl.to(slider, { yPercent: -66.66, duration: 0.3 })
    .to(fill, { yPercent: 0, opacity: 1, duration: ${(c.duration * 0.6).toFixed(2)}, ease: 'power2.out' }, '<')
    .to(wave, { yPercent: 0, duration: ${(c.duration * 0.5).toFixed(2)}, ease: 'back.out(${c.bounce})' }, '<0.1')
    .to(btn, { scale: 1.05, duration: 0.12, yoyo: true, repeat: 1 }, '-=0.2')
    .to({}, { duration: 0.8 })
})`,

    // ─── 09. Morph Loader ────────────────────────────────────
  'btn-morph-loader': (c) =>
`import gsap from 'gsap'

// Morph Loader — shrinks to circle, spins, shows success, auto-resets
const btn = document.querySelector('.btn')
const text = btn.querySelector('.btn-text')
const spinner = btn.querySelector('.btn-spinner')
const check = btn.querySelector('.btn-check')

let isAnimating = false

gsap.set([spinner, check], { transformOrigin: 'center center', opacity: 0, scale: 0.3 })
gsap.set(spinner, { rotation: 0 })

btn.addEventListener('click', () => {
  if (isAnimating) return
  isAnimating = true
  gsap.killTweensOf([btn, text, spinner, check])

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.timeline({ onComplete: () => { isAnimating = false } })
        .to(check, { opacity: 0, scale: 0.3, duration: 0.2 })
        .to(spinner, { rotation: 0, duration: 0.2 }, '<')
        .to(btn, { backgroundColor: 'var(--accent)', borderRadius: '8px', scale: 1, duration: 0.35 }, '<0.1')
        .to(text, { opacity: 1, y: 0, duration: 0.25 }, '<0.1')
    }
  })

  tl.to(text, { opacity: 0, y: -10, duration: 0.2, ease: 'power2.in' })
    .to(btn, { borderRadius: '50%', scale: 0.85, duration: 0.35, ease: 'power2.inOut' }, '<0.1')
    .to(spinner, { opacity: 1, scale: 1, duration: 0.2, ease: 'back.out(1.7)' }, '-=0.1')
    .to(spinner, { rotation: 360, duration: ${c.loadingDuration}, ease: 'linear' })
    .to(spinner, { opacity: 0, scale: 0.5, duration: 0.15 })
    .to(btn, { backgroundColor: '#10b981', duration: 0.2 }, '<')
    .to(check, { opacity: 1, scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }, '<0.05')
    .to({}, { duration: ${c.successDuration} })
})`,

   // ─── 10. Glitch Text ──────────────────────────────────
  'btn-glitch-text': (c) =>
`import gsap from 'gsap'

// Glitch Text — scrambles to "Click Me!" on hover, back to "Hover Me!" on leave
const btn   = document.querySelector('.btn')
const text  = btn.querySelector('.btn-text')
const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~\`'

let scrambleInt, progress = 0
const TARGET_HOVER = 'Click Me!'
const TARGET_DEFAULT = 'Hover Me!'

const startScramble = (target) => {
  clearInterval(scrambleInt)
  progress = 0
  const totalTicks = (${c.duration} * 1000) / 30
  const increment = 1 / totalTicks

  scrambleInt = setInterval(() => {
    progress += increment
    if (progress >= 1) {
      text.textContent = target
      clearInterval(scrambleInt)
      return
    }
    let str = ''
    for (let i = 0; i < target.length; i++) {
      str += Math.random() < progress ? target[i] : chars[Math.floor(Math.random() * chars.length)]
    }
    text.textContent = str
  }, 30)
}

let pulseTl
const startPulse = () => {
  gsap.killTweensOf(btn)
  pulseTl = gsap.timeline({ repeat: -1 })
  pulseTl
    .to(btn, { borderColor: 'var(--accent)', duration: ${c.pulseSpeed / 2}, ease: 'power2.out' })
    .to(btn, { borderColor: 'var(--border)', duration: ${c.pulseSpeed / 2}, ease: 'power2.in' })
}

btn.addEventListener('mouseenter', () => {
  ${c.enableJitter ? `gsap.to(btn, {
    x: () => gsap.utils.random(-${c.intensity}, ${c.intensity}),
    y: () => gsap.utils.random(-${c.intensity}, ${c.intensity}),
    duration: 0.04, ease: 'none', repeat: -1, yoyo: true, repeatDelay: 0.02
  })` : ''}
  
  startPulse()
  startScramble(TARGET_HOVER)
})

btn.addEventListener('mouseleave', () => {
  gsap.killTweensOf(btn)
  gsap.to(btn, { x: 0, y: 0, borderColor: 'var(--border)', duration: 0.2, ease: 'power2.out' })
  if (pulseTl) pulseTl.kill()
  startScramble(TARGET_DEFAULT)
})`,

  // ─── 11. Press & Hold ──────────────────────────────────
  'btn-press-hold': (c) =>
`import gsap from 'gsap'

// Press & Hold — fills ring on hold, cancels on early release
const btn   = document.querySelector('.btn')
const ring  = btn.querySelector('.ring')
const text  = btn.querySelector('.btn-text')
const check = btn.querySelector('.btn-check')

const r = 46
const C = 2 * Math.PI * r
const proxy = { val: 0 }

gsap.set(ring, { strokeDasharray: C, strokeDashoffset: C })
gsap.set(check, { opacity: 0, scale: 0.5 })

const tl = gsap.to(proxy, {
  val: C,
  duration: ${c.holdDuration},
  ease: '${c.ease}',
  paused: true,
  onUpdate: function() {
    ring.style.strokeDashoffset = C - this.targets()[0].val
  },
  onComplete: () => {
    text.style.opacity = 0
    ${c.showSuccessCheck ? `gsap.to(check, { opacity: 1, scale: 1, duration: 0.35, ease: 'back.out(1.7)' })` : ''}
    btn.style.backgroundColor = '#10b981'
    btn.style.borderColor = '#10b981'
  }
})

btn.addEventListener('pointerdown', () => {
  if (tl.progress() === 1) {
    gsap.set([ring, proxy], { strokeDashoffset: C, val: 0 })
    gsap.set([text, check], { opacity: 1, scale: 1 })
    tl.restart().pause()
    return
  }
  gsap.to(btn, { scale: 0.96, duration: 0.12 })
  tl.play()
})

btn.addEventListener('pointerup', cancel)
btn.addEventListener('pointerleave', cancel)

function cancel() {
  if (tl.isActive() && tl.progress() < 1) {
    tl.pause()
    gsap.to(proxy, {
      val: 0, duration: 0.3, ease: 'power2.out', overwrite: true,
      onUpdate: () => ring.style.strokeDashoffset = C - proxy.val
    })
    gsap.to(btn, { scale: 1, duration: 0.2 })
  }
}`,

  // ─── 12. Quantum Flux ───────────────────────────────────
  'btn-quantum-flux': (c) =>
`import gsap from 'gsap'

// Quantum Flux — superposition blur collapses on hover, teleports on click
const btn = document.querySelector('.btn')
const main = btn.querySelector('.btn-main')
const g1 = btn.querySelector('.btn-ghost-1')
const g2 = btn.querySelector('.btn-ghost-2')
const trail = btn.querySelector('.btn-trail')

// Initial Superposition
gsap.set([g1, g2], { opacity: 0.5, filter: 'blur(${c.superpositionBlur}px)', x: gsap.utils.random(-12, 12), y: gsap.utils.random(-12, 12), color: 'var(--accent)' })
gsap.set(main, { opacity: 0.85, filter: 'blur(${c.superpositionBlur}px)' })

btn.addEventListener('mouseenter', () => {
  gsap.to([main, g1, g2], { opacity: 1, filter: 'blur(0px)', x: 0, y: 0, duration: ${c.collapseSpeed}, ease: 'power2.out', overwrite: true })
})

btn.addEventListener('mouseleave', () => {
  gsap.to([main, g1, g2], { opacity: 1, filter: 'blur(${c.superpositionBlur}px)', x: gsap.utils.random(-12, 12), y: gsap.utils.random(-12, 12), duration: ${c.collapseSpeed * 1.5}, ease: 'power2.inOut', overwrite: true })
})

btn.addEventListener('click', (e) => {
  e.preventDefault()
  gsap.killTweensOf([btn, main, g1, g2, trail])
  
  const shiftX = gsap.utils.random(-${c.teleportDistance}, ${c.teleportDistance})
  const shiftY = gsap.utils.random(-${c.teleportDistance}, ${c.teleportDistance})

  if (${c.showTrail}) {
    gsap.fromTo(trail, { opacity: 0.7, scale: 1 }, { opacity: 0, scale: 1.3, duration: 0.5, ease: 'power2.out' })
  }

  gsap.timeline()
    .to(btn, { scale: 0.85, duration: 0.12, ease: 'power2.in' })
    .to(btn, { x: shiftX, y: shiftY, duration: 0 })
    .to(btn, { scale: 1, duration: 0.35, ease: 'back.out(1.4)' })
    .to([main, g1, g2], { opacity: 1, filter: 'blur(0px)', x: 0, y: 0, duration: 0.4, ease: 'power2.out' }, '-=0.2')
})`,

  // ── 13. Holo Decode ───────────────────────────────────
  'btn-holo-decode': (c) =>
`import gsap from 'gsap'

// Holo Decode — decodes from noise to clear text on hover
const btn    = document.querySelector('.btn')
const text   = btn.querySelector('.btn-text')
const scan   = btn.querySelector('.btn-scanline')
const holo   = btn.querySelector('.btn-holo')

const NOISE = '01!@#$%^&*()_+-=[]{}|;:,.<>?/~░▒▓█'
const TARGET = text.textContent
let progress = 0, decodeInt

const startDecode = () => {
  clearInterval(decodeInt)
  progress = 0
  const duration = ${c.decodeSpeed} * 1000
  decodeInt = setInterval(() => {
    progress += 30 / duration
    if (progress >= 1) { text.textContent = TARGET; clearInterval(decodeInt); return }
    text.textContent = TARGET.split('').map(c => Math.random() < progress ? c : NOISE[Math.floor(Math.random() * NOISE.length)]).join('')
  }, 30)
}

const triggerScanline = () => {
  ${c.enableScanline ? `gsap.set(scan, { top: '-20%', opacity: 0 })
  gsap.timeline()
    .to(scan, { opacity: ${c.holoIntensity}, duration: ${c.scanlineSpeed * 0.2 }, ease: 'power2.out' })
    .to(scan, { top: '120%', duration: ${c.scanlineSpeed}, ease: 'power1.inOut' })
    .to(scan, { opacity: 0, duration: ${c.scanlineSpeed * 0.1} }, '<0.1')` : ''}
}

btn.addEventListener('mouseenter', () => {
  startDecode()
  triggerScanline()
  gsap.to(holo, { opacity: ${c.holoIntensity}, duration: 0.3 })
  gsap.to(btn, { borderColor: 'var(--accent)', boxShadow: '0 0 12px rgba(37,99,255,0.4)', duration: 0.3 })
})

btn.addEventListener('mouseleave', () => {
  clearInterval(decodeInt)
  text.textContent = TARGET
  gsap.to(holo, { opacity: 0, duration: 0.2 })
  gsap.to(btn, { borderColor: 'var(--border)', boxShadow: '0 0 0px rgba(0,0,0,0)', duration: 0.2 })
})`,

  // ─── 14. Data Stream ───────────────────────────────────
  'btn-data-stream': (c) =>
`import gsap from 'gsap'

// Data Stream — hex data converges on hover, bursts on click
const btn    = document.querySelector('.btn')
const stream = btn.querySelector('.stream')
const text   = btn.querySelector('.btn-text')
const HEX    = '0123456789ABCDEF'

// Build pool
for (let i = 0; i < ${c.density}; i++) {
  const span = document.createElement('span')
  span.textContent = HEX[Math.floor(Math.random() * HEX.length)]
  span.className = 'data-char'
  stream.appendChild(span)
  gsap.set(span, { x: gsap.utils.random(-60,60), y: gsap.utils.random(-40,40), scale: gsap.utils.random(0.4,1), opacity: ${c.streamOpacity} })
}

// Ambient drift
gsap.to('.data-char', {
  y: '+=20', duration: gsap.utils.random(2,3.5), ease: 'none', repeat: -1,
  stagger: { each: 0.15, from: 'random' },
  onRepeat: (self) => gsap.set(self.targets(), { y: -40 })
})

btn.addEventListener('mouseenter', () => {
  gsap.killTweensOf('.data-char')
  gsap.to('.data-char', {
    x:0, y:0, scale:0.5, opacity:0, duration: ${c.convergeSpeed}, ease:'power2.in',
    stagger: { each: 0.015, from: 'random' }
  })
  gsap.to(text, { opacity:1, scale:1, letterSpacing:'0.12em', duration: ${c.convergeSpeed * 0.8}, ease:'back.out(1.3)' })
})

btn.addEventListener('mouseleave', () => {
  gsap.killTweensOf('.data-char')
  gsap.to('.data-char', {
    x: () => gsap.utils.random(-60,60), y: () => gsap.utils.random(-40,40),
    scale: () => gsap.utils.random(0.4,1), opacity: ${c.streamOpacity},
    duration: ${c.convergeSpeed * 1.2}, ease:'power2.out', stagger: 0.01
  })
  gsap.to(text, { opacity:0.7, scale:0.97, letterSpacing:'0.08em', duration: ${c.convergeSpeed}, ease:'power2.out' })
})

btn.addEventListener('click', () => {
  const cx = btn.offsetWidth / 2, cy = btn.offsetHeight / 2
  for (let i = 0; i < 14; i++) {
    const angle = (i / 14) * Math.PI * 2
    const p = document.createElement('div')
    p.style.cssText = \`position:absolute; left:\${cx}px; top:\${cy}px; width:4px; height:4px; background:var(--accent); border-radius:50%; transform:translate(-50%,-50%); pointer-events:none;\`
    btn.appendChild(p)
    const dist = ${c.burstRadius} * gsap.utils.random(0.5, 1.1)
    gsap.to(p, {
      x: Math.cos(angle) * dist, y: Math.sin(angle) * dist,
      opacity: 0, scale: 0, duration: 0.45, ease: 'power2.out',
      onComplete: () => p.remove()
    })
  }
  gsap.to(btn, { scale: 0.94, duration: 0.08, yoyo: true, repeat: 1, ease: 'power2.in' })
})`,

   // ── 15. Cyber Slice ─────────────────────────────────────
  'btn-cyber-slice': (c) =>
`import gsap from 'gsap'

// Cyber Slice — Solid text splits mechanically on hover
const btn   = document.querySelector('.btn')
const top   = btn.querySelector('.slice-top')
const bot   = btn.querySelector('.slice-bot')
const core  = btn.querySelector('.slice-core')

// Initial: Text completely solid (inset 0), overlapping perfectly
gsap.set([top, bot], { clipPath: 'inset(0)', y: 0 })
gsap.set(core, { opacity: 0, scale: 0.8 })

btn.addEventListener('mouseenter', () => {
  // Split halves + move apart
  gsap.to(top, { clipPath: 'inset(0 0 50% 0)', y: -${c.gapSize}, duration: ${c.speed}, ease: 'power3.out' })
  gsap.to(bot, { clipPath: 'inset(50% 0 0 0)', y: ${c.gapSize}, duration: ${c.speed}, ease: 'power3.out' })

  // Reveal core
  gsap.to(core, { opacity: 1, scale: 1, duration: ${c.speed * 0.8}, ease: 'back.out(1.5)' })
  
  // Glow
  gsap.to(btn, { borderColor: '${c.innerColor}', boxShadow: '0 0 20px ${c.innerColor}33', duration: ${c.speed} })
})

btn.addEventListener('mouseleave', () => {
  // Reassemble to solid state
  gsap.to(top, { clipPath: 'inset(0)', y: 0, duration: ${c.speed}, ease: 'power3.inOut' })
  gsap.to(bot, { clipPath: 'inset(0)', y: 0, duration: ${c.speed}, ease: 'power3.inOut' })
  
  gsap.to(core, { opacity: 0, scale: 0.8, duration: ${c.speed * 0.6}, ease: 'power2.in' })
  gsap.to(btn, { borderColor: 'var(--border)', boxShadow: '0 0 0px transparent', duration: ${c.speed} })
})`,

}

export function useButtonCodeGenerator(animationId, controls) {
  return useMemo(() => {
    const t = templates[animationId]
    return t ? t(controls) : '// Template not found'
  }, [animationId, controls])
}
