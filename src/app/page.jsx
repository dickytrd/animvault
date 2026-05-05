'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

// ── Separate content files ─────────────────────────────────
import { WORKS }                                from '@/data/works.data'
import { INSIGHTS, INSIGHTS_FILTERS, INSIGHTS_INITIAL_SHOW } from '@/data/insights.data'
import { INSPIRATION, INSP_FILTERS, INSP_INITIAL_SHOW }      from '@/data/inspiration.data'
import { AnimationPlayground } from '@/components/playground/AnimationPlayground'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─────────────────────────────────────────────
// BOTTOM MASK ASSEMBLE — heading reveal hook
// Same concept as BottomMaskAssemble.js animation
// ─────────────────────────────────────────────
function useBottomMaskReveal(ref, options = {}) {
  const {
    duration      = 0.3,
    stagger       = 0.1,
    yRange        = 220,
    rotationRange = 0,
    ease          = 'power3.out',
    start         = 'top 75%',
    delay         = 0,
  } = options

  useGSAP(() => {
    if (!ref.current) return
    const el = ref.current

    // Split into chars
    const splitInstance = new SplitText(el, { type: 'chars' })
    const originalChars = splitInstance.chars

    // Build mask containers — same pattern as BottomMaskAssemble.js
    const inners = []
    originalChars.forEach((char) => {
      const text    = char.textContent.trim()
      const isSpace = !text

      const mask = document.createElement('span')
      mask.className           = 'char-mask-container'
      mask.style.display       = 'inline-block'
      mask.style.overflow      = 'hidden'
      mask.style.position      = 'relative'
      mask.style.verticalAlign = 'top'
      mask.style.lineHeight    = '0.8'

      if (isSpace) {
        mask.innerHTML  = '&nbsp;'
        mask.style.width = '0.28em'
        char.parentNode.replaceChild(mask, char)
        return
      }

      const inner = document.createElement('span')
      inner.className              = 'char-mask-inner'
      inner.textContent            = text
      inner.style.display          = 'inline-block'
      inner.style.whiteSpace       = 'nowrap'
      inner.style.willChange       = 'transform, opacity'
      inner.style.backfaceVisibility = 'hidden'
      mask.appendChild(inner)
      char.parentNode.replaceChild(mask, char)

      // Random from-below starting values
      const randY   = yRange * (0.5 + Math.random() * 0.5)
      const randRot = (Math.random() - 0.5) * rotationRange
      const randScl = 0.3 + Math.random() * 0.5

      gsap.set(inner, { y: randY, rotation: randRot, scale: 1, opacity: 1, transformOrigin: 'center center' })
      inners.push(inner)
    })

    // Animate all inners on scroll
    gsap.to(inners, {
      y: 0, rotation: 0, scale: 1, opacity: 1,
      duration,
      delay,
      stagger: { each: stagger, from: 'random' },
      ease,
      scrollTrigger: { trigger: el, start },
    })

    // Cleanup on unmount
    return () => { splitInstance.revert() }
  }, { scope: ref })
}

// ─────────────────────────────────────────────
// STATIC DATA (non-content)
// ─────────────────────────────────────────────
const COLLECTION = [
  { id:'01', title:'Heading Reveal',   desc:'Split text, scramble, masks, 3D flips, waves.',   tags:['SplitText','ScrambleText'], count:15, href:'/heading-reveal', status:'live',    preview:'Aa' },
  { id:'02', title:'Content Reveal',   desc:'Cards that stagger, wipe, scale, and fade in.',   tags:['Stagger','ClipPath'],       count:5,  href:'/content-reveal', status:'live',    preview:'▦'  },
  { id:'03', title:'Loaders',          desc:'Spinners, dots, progress bars, and pulse rings.', tags:['Timeline','Repeat'],        count:5,  href:'/loaders',        status:'live',    preview:'◌'  },
  { id:'04', title:'Buttons',          desc:'Hover fills, ripple clicks, scale pops, shakes.', tags:['Hover','Click'],            count:5,  href:'/buttons',        status:'live',    preview:'⊡'  },
  { id:'05', title:'Scroll Effects',   desc:'Parallax, pin, scrub, velocity skew.',            tags:['ScrollTrigger','Parallax'], count:0,  href:'#',               status:'soon',    preview:'↕'  },
  { id:'06', title:'Page Transitions', desc:'Curtain wipe, clip-path, overlay reveals.',       tags:['FLIP','Curtain'],           count:0,  href:'#',               status:'soon',    preview:'⇄'  },
  { id:'07', title:'Cursor FX',        desc:'Custom cursor, trails, magnetic hover.',          tags:['Observer','Magnetic'],      count:0,  href:'#',               status:'soon',    preview:'⊹'  },
  { id:'08', title:'SVG Animations',   desc:'DrawSVG paths, MorphSVG, logo reveals.',          tags:['DrawSVG','MorphSVG'],       count:0,  href:'#',               status:'planned', preview:'◎'  },
  { id:'09', title:'Cards & UI',       desc:'Hover tilt, 3D perspective, bento reveals.',      tags:['3D','Tilt'],                count:0,  href:'#',               status:'planned', preview:'◱'  },
  { id:'10', title:'Sliders',          desc:'Infinite loop, card stack, draggable carousel.',  tags:['Draggable','Inertia'],      count:0,  href:'#',               status:'planned', preview:'⇌'  },
  { id:'11', title:'Counters & Stats', desc:'Number count-up, odometer roll, fill bars.',      tags:['Counter','Tween'],          count:0,  href:'#',               status:'planned', preview:'99' },
  { id:'12', title:'Navigation',       desc:'Menu morphs, dropdown stagger, mobile nav.',      tags:['Timeline','Stagger'],       count:0,  href:'#',               status:'planned', preview:'≡'  },
]

// const GALLERY_ITEMS = [
//   { label:'Mask Reveal',   tag:'Heading', col:'span 2' },
//   { label:'Scramble Text', tag:'Heading', col:'span 1' },
//   { label:'Card Stagger',  tag:'Content', col:'span 1' },
//   { label:'Loader Ring',   tag:'Loader',  col:'span 1' },
//   { label:'Ripple Click',  tag:'Button',  col:'span 1', row:'span 2' },
//   { label:'Wave Chars',    tag:'Heading', col:'span 2', row:'span 2' },
//   { label:'Pulse Dots',    tag:'Loader',  col:'span 1' },
// ]

const STATUS_BADGE = {
  live:    { label:'live',    bg:'rgba(34,197,94,0.1)',    color:'#4ade80' },
  soon:    { label:'soon',    bg:'rgba(251,146,60,0.1)',   color:'#fb923c' },
  planned: { label:'planned', bg:'rgba(148,163,184,0.08)', color:'var(--text-subtle)' },
}

const SectionLabel = ({ children }) => (
  <p style={{ fontSize:'11px', fontWeight:'500', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'12px' }}>{children}</p>
)

// ─────────────────────────────────────────────
// HERO
// ─────────────────────────────────────────────
function Hero() {
  const containerRef = useRef(null)
  const headlineRef  = useRef(null)
  const subRef       = useRef(null)
  const ctaRef       = useRef(null)
  const statsRef     = useRef(null)

  useGSAP(() => {
    const tl = gsap.timeline({ delay: 0.10 })
    if (headlineRef.current) {
      const el       = headlineRef.current
      const split    = new SplitText(el, { type: 'chars' })
      const inners   = []

      split.chars.forEach((char) => {
        const text    = char.textContent.trim()
        const isSpace = !text
        const mask    = document.createElement('span')
        mask.style.display       = 'inline-block'
        mask.style.overflow      = 'hidden'
        mask.style.verticalAlign = 'top'
        mask.style.lineHeight    = '1.1'
        if (isSpace) { mask.innerHTML = '&nbsp;'; mask.style.width = '0.28em'; char.parentNode.replaceChild(mask, char); return }
        const inner = document.createElement('span')
        inner.textContent = text
        inner.style.display = 'inline-block'
        inner.style.willChange = 'transform, opacity'
        mask.appendChild(inner)
        char.parentNode.replaceChild(mask, char)
        const randY   = 80 + Math.random() * 60
        const randRot = (Math.random() - 0.5) * 25
        const randScl = 0.4 + Math.random() * 0.4
        gsap.set(inner, { y: randY, rotation: 0, scale: 1, opacity: 1, filter: 'blur(4px)', transformOrigin: 'center center' })
        inners.push(inner)
      })

      tl.to(inners, { y:0, rotation:0, scale:1, opacity:1, filter:'blur(0px)', duration:0.9, stagger:{ each:0.03, from:'random' }, ease:'power3.out' })
    }
    tl.from(subRef.current,   { filter:'blur(10px)', y:16, opacity:0, duration:0.6, ease:'power2.out' }, '-=0.4')
    tl.from(ctaRef.current,   { filter:'blur(8px)',  y:12, opacity:0, duration:0.5, ease:'power2.out' }, '-=0.35')
    tl.from(statsRef.current, { filter:'blur(6px)',  y:12, opacity:0, duration:0.5, ease:'power2.out' }, '-=0.25')
  }, { scope: containerRef })

  return (
    <section ref={containerRef} style={{ minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'120px 48px 80px', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-dim) 0%, transparent 70%)', pointerEvents:'none' }} />
      <div style={{ fontSize:'11px', fontWeight:'500', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'28px', padding:'4px 14px', border:'1px solid var(--border)', borderRadius:'20px', display:'inline-block' }}>Animation Collection — GSAP</div>
      <h1 ref={headlineRef} className="h1" style={{ maxWidth:'1000px', marginBottom:'24px', overflow:'hidden' }}>Make Your Site<br /> Come To Life.</h1>
      <p ref={subRef} style={{ fontSize:'17px', color:'var(--text-muted)', maxWidth:'500px', lineHeight:'1.65', marginBottom:'40px' }}>Explore ready-to-use interactions, study how they work,
and discover the best animated websites on the internet.</p>
      <div ref={ctaRef} style={{ display:'flex', gap:'12px', alignItems:'center', marginBottom:'72px' }}>
        <a href="#collection" style={{ fontSize:'14px', fontWeight:'500', color:'#fff', background:'var(--accent)', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', transition:'background 0.2s, transform 0.2s' }}
          onMouseEnter={(e)=>{e.currentTarget.style.background='#1d4ed8';e.currentTarget.style.transform='translateY(-1px)'}}
          onMouseLeave={(e)=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.transform='translateY(0)'}}>Explore Animation</a>
        <a href="#inspiration" style={{ fontSize:'14px', color:'var(--text-muted)', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', border:'1px solid var(--border)', transition:'all 0.2s' }}
          onMouseEnter={(e)=>{e.currentTarget.style.color='var(--text)';e.currentTarget.style.borderColor='var(--border-hover)'}}
          onMouseLeave={(e)=>{e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.borderColor='var(--border)'}}>Browse Inspiration</a>
      </div>
      <div ref={statsRef} style={{ display:'flex', borderRadius:'10px', overflow:'hidden', border:'1px solid var(--border)' }}>
        {[{n:'30+',l:'Animations'},{n:'GSAP',l:'Engine'},{n:'Free',l:'All Plugins'},{n:'4→12',l:'Categories'}].map((s,i)=>(
          <div key={i} style={{ padding:'14px 28px', background:'var(--surface)', borderRight:i<3?'1px solid var(--border)':'none', textAlign:'center' }}>
            <div style={{ fontSize:'18px', fontWeight:'700', color:'var(--text)', letterSpacing:'-0.02em' }}>{s.n}</div>
            <div style={{ fontSize:'11px', color:'var(--text-subtle)', marginTop:'2px' }}>{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// VIDEO SECTION
// ─────────────────────────────────────────────
function VideoSection() {
  const wrapperRef = useRef(null)
  const videoRef   = useRef(null)
  // const cursorRef  = useRef(null)
  const isInside   = useRef(false)
  const [loaded, setLoaded] = useState(false)

  useGSAP(() => {
    gsap.fromTo(videoRef.current,
      { scale:0.65, borderRadius:'20px' },
      { scale:1, borderRadius:'0px', ease:'none', scrollTrigger:{ trigger:wrapperRef.current, start:'top bottom', end:'top top', scrub:true } }
    )
  }, { scope:wrapperRef })

  // useEffect(() => {
  //   const el  = videoRef.current
  //   // const dot = cursorRef.current
  //   if (!el || !dot) return
  //   const xTo = gsap.quickTo(dot, 'x', { duration:0.45, ease:'power3.out' })
  //   const yTo = gsap.quickTo(dot, 'y', { duration:0.45, ease:'power3.out' })
  //   const onMove  = (e) => { if (!isInside.current) return; const r = el.getBoundingClientRect(); xTo(e.clientX - r.left); yTo(e.clientY - r.top) }
  //   const onEnter = () => { isInside.current = true;  gsap.to(dot, { scale:1, opacity:1, duration:0.35, ease:'back.out(2)' }) }
  //   const onLeave = () => { isInside.current = false; gsap.to(dot, { scale:0, opacity:0, duration:0.25, ease:'power2.in'  }) }
  //   window.addEventListener('mousemove', onMove)
  //   el.addEventListener('mouseenter', onEnter)
  //   el.addEventListener('mouseleave', onLeave)
  //   return () => { window.removeEventListener('mousemove', onMove); el.removeEventListener('mouseenter', onEnter); el.removeEventListener('mouseleave', onLeave) }
  // }, [])

  return (
    <div ref={wrapperRef} style={{ marginTop:'-10vh', position:'relative', zIndex:1 }}>
      <div ref={videoRef} style={{ width:'100%', aspectRatio:'16/9', background:'var(--surface)', overflow:'hidden', position:'relative', cursor:'visinle', transformOrigin:'center top' }}>
        <video autoPlay loop muted playsInline preload="auto"
          style={{ position:'absolute', inset:0, width:'100%', height:'100%', objectFit:'cover', display:'block' }}
          src="https://player.vimeo.com/progressive_redirect/playback/1069025739/rendition/720p/file.mp4?loc=external&signature=5228e9b27a0a8a481be5e694143d350db4102f9b2d390efbee5d6e69c16aa277"
          onLoadedData={() => setLoaded(true)} />
        {!loaded && (
          <div style={{ position:'absolute', inset:0, background:'var(--surface)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:5 }}>
            <div style={{ width:'36px', height:'36px', border:'2px solid var(--border)', borderTopColor:'var(--accent)', borderRadius:'50%', animation:'spin 1s linear infinite' }} />
          </div>
        )}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, transparent 70%, rgba(10,10,10,0.5))', pointerEvents:'none', zIndex:1 }} />
        {/* <div ref={cursorRef} style={{ position:'absolute', top:0, left:0, width:'76px', height:'76px', borderRadius:'50%', background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center', pointerEvents:'none', transform:'translate(-50%,-50%) scale(0)', opacity:0, zIndex:10, boxShadow:'0 8px 32px rgba(0,0,0,0.4)' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div> */}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

// ─────────────────────────────────────────────
// INTRODUCTION — Swiss Timeline
// ─────────────────────────────────────────────
function Introduction() {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const lineRef    = useRef(null)
  useBottomMaskReveal(titleRef, { yRange:100, rotationRange:0, stagger:0.01, start:'top 90%' })

  const steps = [
    { num:'01', icon:'🔍', title:'Discover',       desc:'Browse 30+ production-ready animations across 12 categories — from simple fades to physics-based interactions. Every pattern is handpicked for real-world use.' },
    { num:'02', icon:'📖', title:'Learn the Code', desc:'Each animation comes with clean, commented GSAP code. Read how it works, understand the timing, easing, and stagger values behind each effect.' },
    { num:'03', icon:'⚙️', title:'Customize Live', desc:'Tweak duration, easing, stagger, and blur directly in the browser. The preview updates in real time so you can dial in the perfect feel before copying.' },
    { num:'04', icon:'🔁', title:'Copy & Ship',    desc:'One click copies production-ready GSAP code. Drop it into your project and it works — no abstractions, no wrappers, no extra dependencies.' },
  ]

  useGSAP(() => {
    gsap.from(lineRef.current, { scaleY:0, transformOrigin:'top center', ease:'none', scrollTrigger:{ trigger:sectionRef.current, start:'top 60%', end:'bottom 80%', scrub:1 } })
    gsap.utils.toArray('.timeline-card').forEach((card) => {
      const dot     = card.querySelector('.timeline-dot')
      const content = card.querySelector('.timeline-content')
      gsap.fromTo(dot, { scale:0, opacity:0 }, { scale:1, opacity:1, duration:0.4, ease:'back.out(2)', scrollTrigger:{ trigger:card, start:'top 76%' } })
      gsap.fromTo(content, { x:-20, opacity:0, filter:'blur(6px)' }, { x:0, opacity:1, filter:'blur(0px)', duration:0.6, ease:'power3.out', delay:0.1, scrollTrigger:{ trigger:card, start:'top 76%' } })
    })
  }, { scope:sectionRef })

  const StepCard = ({ step, side }) => (
    <div className="timeline-card" style={{ display:'flex', flexDirection:'column', alignItems:side==='left'?'flex-end':'flex-start', textAlign:side==='left'?'right':'left', paddingBottom:'0', position:'relative' }}>
      <div className="timeline-dot" style={{ position:'absolute', [side==='left'?'right':'left']:'-55px', top:'8px', width:'12px', height:'12px', borderRadius:'50%', background:'var(--accent)', border:'3px solid var(--bg)', boxShadow:'0 0 0 4px var(--accent-dim)', zIndex:2 }} />
      <div className="timeline-content">
        <div style={{ display:'flex', alignItems:'center', gap:'10px', justifyContent:side==='left'?'flex-end':'flex-start', marginBottom:'16px' }}>
          <span style={{ fontSize:'10px', fontWeight:'700', color:'var(--accent)', letterSpacing:'0.1em' }}>{step.num}</span>
          <span style={{ fontSize:'22px' }}>{step.icon}</span>
        </div>
        <h3 className="h3" style={{ marginBottom:'14px' }}>{step.title}</h3>
        <p style={{ fontSize:'14px', color:'var(--text-muted)', lineHeight:'1.75', maxWidth:'300px' }}>{step.desc}</p>
      </div>
    </div>
  )

  return (
    <section ref={sectionRef} style={{ padding:'128px 48px', maxWidth:'1200px', margin:'0 auto', }}>
      <div style={{ display:'flex', flexDirection:'column', alignItems:'center', marginBottom:'96px' }}>
        <SectionLabel>What is AnimVault?</SectionLabel>
        <h2 ref={titleRef} className="h2-lg" style={{ textAlign:'center', maxWidth:'1000px', overflow:'hidden' }}>From Idea to <br />Implementation</h2>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2px 1fr', gap:'0 48px' }}>
        <div style={{ display:'flex', flexDirection:'column', gap:'200px' }}>
          {steps.filter((_,i)=>i%2===0).map(s=><StepCard key={s.num} step={s} side="left"/>)}
        </div>
        <div style={{ position:'relative' }}>
          <div style={{ height:'600px', position:'absolute', top:'20px', width:'4px', background:'var(--border)', left:'-1px' }} />
          <div ref={lineRef} style={{ height:'600px', position:'absolute', top:'20px', left:'-1px', width:'4px', background:'var(--accent)', transformOrigin:'top center' }} />
        </div>
        <div style={{ display:'flex', flexDirection:'column', paddingTop:'200px', gap:'200px' }}>
          {steps.filter((_,i)=>i%2===1).map(s=><StepCard key={s.num} step={s} side="right"/>)}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// MARQUEE — scroll velocity reactive
// ─────────────────────────────────────────────
function Marquee() {
  const trackRef  = useRef(null)
  const xPos      = useRef(0)
  const rafRef    = useRef(null)
  const baseSpeed = 1
  const words = ['GSAP','SplitText','ScrollTrigger','Animation','Motion','Heading Reveal','Loaders','Buttons','AnimVault','Open Source','Customize','Copy & Ship','WebGL','Creative Dev','Production Ready']
  const items = [...words,...words,...words]

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const totalW = track.scrollWidth / 3
    const tick = () => {
      const velocity   = window.__lenis ? window.__lenis.velocity : 0
      const speedMult  = 1 + Math.abs(velocity) * 0.08
      const dir        = velocity < -0.5 ? -1 : 1
      xPos.current    -= baseSpeed * speedMult * dir
      if (Math.abs(xPos.current) >= totalW) xPos.current = 0
      gsap.set(track, { x: xPos.current })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  return (
    <section style={{ height: '40svh', padding:'128px 0', overflow:'hidden', background:'var(--bg)' }}>
      <div className="marquee-track" ref={trackRef} style={{ display:'flex', alignItems:'center', willChange:'transform' }}>
        {items.map((word,i)=>(
          <span key={i} style={{ display:'inline-flex', alignItems:'center', flexShrink:0 }}>
            <span style={{ fontSize:'32px', fontWeight:'500', letterSpacing:'0.08em', textTransform:'uppercase', color:'var(--text-subtle)', whiteSpace:'nowrap', padding:'0 20px' }}>{word}</span>
            <span style={{ color:'var(--border-hover)', fontSize:'8px', flexShrink:0 }}>✦</span>
          </span>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// COLLECTION CARDS
// ─────────────────────────────────────────────
function CollectionCards() {
  const ref      = useRef(null)
  const titleRef = useRef(null)
  useBottomMaskReveal(titleRef, { yRange:100, rotationRange:0, stagger:0.01, start:'top 100%' })

  useGSAP(() => {
    gsap.from('.coll-card', { y:40, opacity:0, filter:'blur(4px)', duration:0.6, stagger:0.05, ease:'power3.out', scrollTrigger:{ trigger:ref.current, start:'top 70%' } })
    gsap.utils.toArray('.coll-card.live').forEach(card => {
      card.addEventListener('mouseenter', ()=>gsap.to(card,{y:-4,duration:0.25,ease:'power2.out'}))
      card.addEventListener('mouseleave', ()=>gsap.to(card,{y:0, duration:0.25,ease:'power2.out'}))
    })
  }, { scope:ref })

  return (
    <section id="collection" ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ marginBottom:'48px' }}>
        <SectionLabel>04 — Collection</SectionLabel>
        <h2 ref={titleRef} className="h2" style={{ marginBottom:'8px', overflow:'hidden' }}>Browse by Interaction Type</h2>
        <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>Find the exact animation you need — from subtle micro-interactions
to complex motion systems.</p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {COLLECTION.map((cat)=>{
          const badge=STATUS_BADGE[cat.status]; const isLive=cat.status==='live'; const Tag=isLive?Link:'div'; const extra=isLive?{href:cat.href}:{}
          return (
            <Tag key={cat.id} {...extra} className={`coll-card ${isLive?'live':''}`} style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px', padding:'20px', textDecoration:'none', display:'block', cursor:isLive?'pointer':'default', opacity:isLive?1:0.6 }}>
              <div style={{ fontSize:'26px', color:isLive?'var(--accent)':'var(--text-subtle)', marginBottom:'14px', fontFamily:'monospace' }}>{cat.preview}</div>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'8px', marginBottom:'8px' }}>
                <span style={{ fontSize:'13px', fontWeight:'600', color:isLive?'var(--text)':'var(--text-muted)', lineHeight:'1.3' }}>{cat.title}</span>
                <span style={{ fontSize:'9px', fontWeight:'600', padding:'2px 7px', borderRadius:'10px', flexShrink:0, background:badge.bg, color:badge.color }}>{badge.label}</span>
              </div>
              <p style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.55', marginBottom:'12px' }}>{cat.desc}</p>
              <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center' }}>
                {cat.tags.map(t=>(<span key={t} style={{ fontSize:'10px', color:'var(--text-subtle)', background:'var(--surface-2)', border:'1px solid var(--border)', padding:'2px 8px', borderRadius:'6px' }}>{t}</span>))}
                {cat.count>0&&<span style={{ fontSize:'10px', color:'var(--accent)', marginLeft:'auto' }}>{cat.count} anims →</span>}
              </div>
            </Tag>
          )
        })}
      </div>
    </section>
  )
}

// // ─────────────────────────────────────────────
// // GALLERY
// // ─────────────────────────────────────────────
// function Gallery() {
//   const ref=useRef(null); const titleRef=useRef(null)
//   useBottomMaskReveal(titleRef,{yRange:100,rotationRange:0,stagger:0.01,start:'top 90%'})
//   useGSAP(()=>{ gsap.from('.gallery-item',{scale:0.94,opacity:0,filter:'blur(4px)',duration:0.6,stagger:0.07,ease:'power3.out',scrollTrigger:{trigger:ref.current,start:'top 70%'}}) },{scope:ref})
//   return (
//     <section id="gallery" ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto' }}>
//       <div style={{ marginBottom:'40px' }}>
//         <SectionLabel>05 — Gallery</SectionLabel>
//         <h2 ref={titleRef} className="h2" style={{ marginBottom:'8px', overflow:'hidden' }}>Try the Animations</h2>
//         <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>Hover, click, and explore interactions in real-time.
// See how they behave before using them.</p>
//       </div>
//       <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gridAutoRows:'240px', gap:'10px' }}>
//         {GALLERY_ITEMS.map((item,i)=>(
//           <div key={i} className="gallery-item" style={{ gridColumn:item.col||'span 1', gridRow:item.row||'span 1', background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'14px 16px', position:'relative', overflow:'hidden', cursor:'pointer', transition:'border-color 0.2s' }}
//             onMouseEnter={(e)=>e.currentTarget.style.borderColor='var(--border-hover)'}
//             onMouseLeave={(e)=>e.currentTarget.style.borderColor='var(--border)'}>
//             <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-60%)', width:'40px', height:'40px', borderRadius:'50%', background:'var(--accent-dim)', border:'1px solid rgba(37,99,255,0.2)' }} />
//             <div style={{ position:'relative', zIndex:1 }}>
//               <div style={{ fontSize:'10px', color:'var(--accent)', marginBottom:'3px', fontWeight:'500' }}>{item.tag}</div>
//               <div style={{ fontSize:'12px', color:'var(--text-muted)', fontWeight:'500' }}>{item.label}</div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }

// ─────────────────────────────────────────────
// WORKS — 3D Card Stack + Interactive Tilt (BALANCED SIZE)
// ─────────────────────────────────────────────
function Works() {
  const ref = useRef(null)
  const titleRef = useRef(null)
  const swiperRef = useRef(null)
  
  useBottomMaskReveal(titleRef, { yRange: 100, rotationRange: 0, stagger: 0.01, start: 'top 90%' })
  
  useGSAP(() => {
    gsap.from('.works-header', { 
      y: 24, opacity: 0, duration: 0.7, ease: 'power3.out',
      scrollTrigger: { trigger: ref.current, start: 'top 80%' }
    })
  }, { scope: ref })

  // 3D Tilt effect for active card
  const handleCardMouseMove = (e, card) => {
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    
    gsap.to(card, {
      rotationX: rotateX,
      rotationY: rotateY,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
      transformPerspective: 1000,
      transformOrigin: 'center center'
    })
  }

  const handleCardMouseLeave = (card) => {
    if (!card) return
    gsap.to(card, {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    })
  }

  return (
    <section ref={ref} style={{ padding: '128px 0', overflow: 'hidden' }}>
      <div className="works-header" style={{ 
        display: 'flex', flexDirection: 'column', 
        justifyContent: 'center', alignItems: 'center', 
        padding: '0 48px', maxWidth: '1200px', margin: '0 auto 64px' 
      }}>
        <SectionLabel>Built With AnimVault</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <h2 ref={titleRef} className="h2" style={{ overflow: 'hidden' }}>Built with These Animations</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-subtle)' }}>
            Real projects using similar interaction patterns.
          </p>
        </div>
      </div>

      {/* Container: relative untuk nav buttons */}
      <div style={{ position: 'relative', maxWidth: '1400px', margin: '0 auto', padding: '0 100px' }}>
        
        {/* ← Navigation Button */}
        <button className="swiper-btn-prev" style={{
          position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
          width: '48px', height: '48px', borderRadius: '50%',
          border: '1px solid var(--border)', background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(8px)', color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease', zIndex: 50, fontSize: '18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        >←</button>

        {/* → Navigation Button */}
        <button className="swiper-btn-next" style={{
          position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
          width: '48px', height: '48px', borderRadius: '50%',
          border: '1px solid var(--border)', background: 'rgba(10,10,10,0.85)',
          backdropFilter: 'blur(8px)', color: 'var(--text-muted)', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.2s ease', zIndex: 50, fontSize: '18px',
          boxShadow: '0 4px 24px rgba(0,0,0,0.4)'
        }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)'
            e.currentTarget.style.color = 'var(--text)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border)'
            e.currentTarget.style.color = 'var(--text-muted)'
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        >→</button>

        {/* 🔧 CLIPPING WRAPPER + PERSPECTIVE */}
        <div style={{ 
          overflow: 'visible',
          borderRadius: '24px',
          padding: '60px 0 80px',
          maxWidth: '100%',
          position: 'relative',
        }}>
          <div style={{ perspective: '2800px', perspectiveOrigin: 'center center' }}>
            <Swiper 
              ref={swiperRef}
              className="works-swiper" 
              modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
              effect="coverflow" 
              centeredSlides 
              grabCursor
              
              // 🔧 KUNCI: slidesPerView="auto" agar width dari slide style dipakai
              slidesPerView="auto"
              
              // 🔧 Breakpoints dengan slidesPerView: 'auto'
              breakpoints={{ 
                768: { slidesPerView: 'auto', spaceBetween: -100 }, 
                1100: { slidesPerView: 'auto', spaceBetween: -120 } 
              }}
              
              spaceBetween={-120}
              coverflowEffect={{ 
                rotate: 0, 
                stretch: 0,
                depth: 320, 
                modifier: 2.8, 
                slideShadows: false 
              }}
              autoplay={{ 
                delay: 4000, 
                disableOnInteraction: false, 
                pauseOnMouseEnter: true, 
                waitForTransition: true 
              }}
              loop
              observer={true}
              observeParents={true}
              navigation={{ prevEl: '.swiper-btn-prev', nextEl: '.swiper-btn-next' }}
              pagination={{ clickable: true, el: '.works-pagination', type: 'bullets' }}
              onSlideChange={(swiper) => {
                const slides = document.querySelectorAll('.works-swiper .swiper-slide')
                slides.forEach((slide, i) => {
                  const distance = Math.abs(i - swiper.activeIndex)
                  const card = slide.querySelector('.work-card-inner')
                  if (!card) return

                  // 🔧 HIDE CARD DILUAR 5 VIEWPORT (distance > 2)
                  if (distance > 2) {
                    gsap.set(card, { 
                      opacity: 0, 
                      scale: 0.8, 
                      filter: 'blur(4px)', 
                      visibility: 'hidden',
                      zIndex: 0 
                    })
                    return
                  }

                  // 🔧 SCALE SETTINGS
                  const ACTIVE_SCALE = 1.02
                  const INACTIVE_SCALE_DROP = 0.02
                  const BLUR_PX_PER_STEP = 1.5
                  const opacity = 1
                  const scale = distance === 0 ? ACTIVE_SCALE : 1 - (distance * INACTIVE_SCALE_DROP)
                  const blur = distance * BLUR_PX_PER_STEP
                  const zIndex = 10 - distance

                  gsap.to(card, { 
                    opacity, 
                    scale, 
                    filter: `blur(${blur}px)`, 
                    visibility: 'visible',
                    zIndex,
                    duration: 0.4, 
                    ease: 'power2.out' 
                  })
                })
              }}
              style={{ padding: '20px 0 16px', overflow: 'visible' }}
            >
              {WORKS.map((w, i) => (
                <SwiperSlide 
                  key={i} 
                  style={{ 
                    height: 'auto', 
                    display: 'flex', 
                    justifyContent: 'center',
                    // 🔧 WIDTH CARD: Lebih moderate untuk 1920px
                    width: 'clamp(320px, 24vw, 600px)', // Main Control Card Size
                    maxWidth: '600px', // BATAS MAKSIMAL LEBAR CARD
                    flexShrink: 0
                  }}
                >
                  {({ isActive }) => (
                    <div 
                      className="work-card-inner"
                      onMouseMove={(e) => isActive && handleCardMouseMove(e, e.currentTarget)}
                      onMouseLeave={(e) => isActive && handleCardMouseLeave(e.currentTarget)}
                      style={{ 
                        width: '100%',
                        // 🔧 ASPECT RATIO: Lebih balanced (tidak terlalu tinggi)
                        aspectRatio: '3/4', // Ubah dari 2.5/3.7 (~0.68) ke 3/4 (0.75)
                        borderRadius: '18px', 
                        overflow: 'hidden', 
                        background: 'var(--surface)', 
                        border: isActive ? '2px solid var(--accent)' : '1px solid var(--border)',
                        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                        transformStyle: 'preserve-3d',
                        willChange: 'transform, filter, opacity',
                        boxShadow: isActive 
                          ? '0 20px 60px rgba(37, 99, 235, 0.35), 0 0 0 1px rgba(37, 99, 235, 0.2)' 
                          : '0 12px 40px rgba(0, 0, 0, 0.3)',
                        cursor: isActive ? 'default' : 'grab',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '760px',
                      }}
                    >
                      {/* 🔧 IMAGE SECTION - 60% tinggi card */}
                      <div style={{ 
                        position: 'relative', 
                        overflow: 'hidden', 
                        background: 'var(--surface-2)',
                        transform: isActive ? 'translateZ(30px)' : 'translateZ(18px)',
                        height: 'auto',
                        flex: '0 0 75%',
                      }}>
                        <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                          {w.video ? (
                            <video autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} src={w.video} />
                          ) : (
                            <img src={w.image} alt={w.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease', transform: isActive ? 'scale(1.08)' : 'scale(1)' }} />
                          )}
                        </div>
                        {isActive && (
                          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(37,99,235,0.18) 100%)', pointerEvents: 'none' }} />
                        )}
                      </div>

                      {/* 🔧 CONTENT SECTION - 40% sisa */}
                      <div style={{ 
                        padding: '16px 18px',
                        transform: isActive ? 'translateZ(40px)' : 'translateZ(24px)',
                        background: 'linear-gradient(to bottom, var(--surface) 0%, var(--surface-2) 100%)',
                        flex: '1 1 auto',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                      }}>
                        <span style={{ fontSize: '9px', color: 'var(--accent)', background: 'var(--accent-dim)', padding: '3px 10px', borderRadius: '8px', fontWeight: '600', display: 'inline-block', marginBottom: '8px' }}>
                          {w.tag}
                        </span>
                        <h3 className="h4" style={{ marginBottom: '6px', color: isActive ? 'var(--text)' : 'var(--text-muted)', fontSize: '15px', lineHeight: '1.3' }}>
                          {w.title}
                        </h3>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.5', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {w.desc}
                        </p>
                      </div>

                      <div style={{ position: 'absolute', inset: 0, borderRadius: '18px', boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.09), inset 0 -1px 0 rgba(0,0,0,0.25)', pointerEvents: 'none' }} />
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="works-pagination" style={{ display: 'flex', justifyContent: 'center', gap: '6px', alignItems: 'center', marginTop: '24px' }} />
      </div>

      <style>{`
        .works-swiper .swiper-slide {
          transition: filter 0.5s ease, opacity 0.5s ease, transform 0.5s ease !important;
          display: flex !important; justify-content: center !important;
        }
        .works-swiper .swiper-slide-active { z-index: 10 !important; }
        
        .works-pagination .swiper-pagination-bullet {
          width: 8px; height: 8px; border-radius: 50%;
          background: var(--border-hover); opacity: 0.4;
          cursor: pointer; transition: all 0.3s ease; margin: 0 4px;
        }
        .works-pagination .swiper-pagination-bullet-active {
          background: var(--accent); width: 28px; border-radius: 4px; opacity: 1;
        }
        
        .work-card-inner {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>
    </section>
  )
}

// ─────────────────────────────────────────────
// SHARED CARD + GRID SECTION — reused by both
// Inspiration and Insights
// ─────────────────────────────────────────────
function CardGridSection({ sectionId, sectionNum, label, titleText, subtitleText, filters, initialShow, items, searchPlaceholder }) {
  const ref       = useRef(null)
  const titleRef  = useRef(null)
  const [active,   setActive]   = useState(filters[0])
  const [query,    setQuery]    = useState('')
  const [expanded, setExpanded] = useState(false)
  useBottomMaskReveal(titleRef, { yRange:100, rotationRange:0, stagger:0.01, start:'top 90%' })

  const filtered = useMemo(() => {
    let list = active === filters[0] ? items : items.filter(s => s.category === active)
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(s => (s.name||s.title||'').toLowerCase().includes(q) || (s.type||s.tag||'').toLowerCase().includes(q) || s.desc.toLowerCase().includes(q))
    }
    return list
  }, [active, query, items, filters])

  const visible = expanded ? filtered : filtered.slice(0, initialShow)
  const hasMore = filtered.length > initialShow

  useGSAP(() => {
    gsap.fromTo('.section-card-item', { y:20, opacity:0, filter:'blur(4px)' }, { y:0, opacity:1, filter:'blur(0px)', duration:0.45, stagger:0.04, ease:'power3.out' })
  }, { dependencies:[active, query, expanded], scope:ref })

  useGSAP(() => {
    gsap.fromTo('.section-card-grid', { y:28, opacity:0 }, { y:0, opacity:1, duration:0.7, ease:'power3.out', scrollTrigger:{ trigger:ref.current, start:'top 72%' } })
    gsap.utils.toArray('.section-card-item').forEach(card=>{
      card.addEventListener('mouseenter', ()=>gsap.to(card,{y:0,duration:0.25,ease:'power2.out'}))
      card.addEventListener('mouseleave', ()=>gsap.to(card,{y:0, duration:0.25,ease:'power2.out'}))
    })
  }, { scope:ref })

  // Render card based on data shape (Inspiration vs Insights)
  const renderCard = (item) => {
    const isInsight = 'readTime' in item
    const name      = item.name || item.title
    const tagLabel  = item.type || item.tag
    const imgSrc    = item.image
    const href      = item.url || '#'

    return (
      <a key={name} href={href} target="_blank" rel="noreferrer" className="section-card-item"
        style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px', overflow:'hidden', textDecoration:'none', display:'block', transition:'border-color 0.2s' }}
        onMouseEnter={(e)=>e.currentTarget.style.borderColor='var(--border-hover)'}
        onMouseLeave={(e)=>e.currentTarget.style.borderColor='var(--border)'}>
        <div style={{ width:'100%', height:'150px', overflow:'hidden', background:'var(--surface-2)' }}>
          <img src={imgSrc} alt={name} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block', transition:'transform 0.4s ease' }}
            onMouseEnter={(e)=>e.currentTarget.style.transform='scale(1.05)'}
            onMouseLeave={(e)=>e.currentTarget.style.transform='scale(1)'}
            onError={(e)=>{e.currentTarget.style.display='none'}} />
        </div>
        <div style={{ padding:'14px 16px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px', gap:'8px' }}>
            <span style={{ fontSize:'13px', fontWeight:'600', color:'var(--text)', lineHeight:'1.3' }}>{name}</span>
            <span style={{ fontSize:'10px', color:'var(--accent)', background:'var(--accent-dim)', padding:'2px 8px', borderRadius:'6px', flexShrink:0, whiteSpace:'nowrap' }}>{tagLabel}</span>
          </div>
          {isInsight && (
            <div style={{ display:'flex', gap:'8px', marginBottom:'6px', alignItems:'center' }}>
              <span style={{ fontSize:'10px', color:'var(--text-subtle)' }}>{item.readTime} read</span>
              <span style={{ fontSize:'10px', color:'var(--text-subtle)' }}>· via {item.source}</span>
            </div>
          )}
          <p style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.55' }}>{item.desc}</p>
        </div>
      </a>
    )
  }

  return (
    <section id={sectionId} ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto' }}>
      <div style={{ marginBottom:'28px' }}>
        <SectionLabel>{sectionNum}</SectionLabel>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', gap:'16px', flexWrap:'wrap' }}>
          <h2 ref={titleRef} className="h2" style={{ marginBottom:'8px', overflow:'hidden' }}>{titleText}</h2>
          <p style={{ fontSize:'13px', color:'var(--text-subtle)', marginBottom:'8px' }}>{filtered.length} items · showing {visible.length}</p>
        </div>
        <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>{subtitleText}</p>
      </div>

      {/* Search */}
      <div style={{ position:'relative', marginBottom:'16px', maxWidth:'480px' }}>
        <svg style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', pointerEvents:'none' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-subtle)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input className="search-input" type="text" placeholder={searchPlaceholder} value={query}
          onChange={(e)=>{ setQuery(e.target.value); setExpanded(false) }} suppressHydrationWarning />
      </div>

      {/* Filter tabs */}
      <div style={{ display:'flex', gap:'6px', marginBottom:'28px', flexWrap:'wrap' }}>
        {filters.map(f=>{
          const isAct = f===active
          const count = f===filters[0] ? items.length : items.filter(s=>s.category===f).length
          return (
            <button key={f} onClick={()=>{ setActive(f); setExpanded(false) }} style={{ fontSize:'12px', padding:'5px 14px', borderRadius:'20px', border:'1px solid', borderColor:isAct?'var(--accent)':'var(--border)', background:isAct?'var(--accent-dim)':'transparent', color:isAct?'var(--accent)':'var(--text-muted)', cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:'5px' }}>
              {f} <span style={{ fontSize:'10px', opacity:0.6 }}>({count})</span>
            </button>
          )
        })}
      </div>

      {/* No results */}
      {filtered.length===0 && (
        <div style={{ textAlign:'center', padding:'60px 0', color:'var(--text-subtle)', fontSize:'14px' }}>No results for "<strong style={{ color:'var(--text-muted)' }}>{query}</strong>"</div>
      )}

      {/* Grid */}
      <div className="section-card-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:'12px' }}>
        {visible.map(item=>renderCard(item))}
      </div>

      {/* Show more */}
      {hasMore && (
        <div style={{ textAlign:'center', marginTop:'32px' }}>
          <button onClick={()=>setExpanded(e=>!e)} style={{ fontSize:'13px', fontWeight:'500', color:'var(--text-muted)', background:'var(--surface)', border:'1px solid var(--border)', padding:'10px 28px', borderRadius:'8px', cursor:'pointer', fontFamily:'inherit', transition:'all 0.2s', display:'inline-flex', alignItems:'center', gap:'8px' }}
            onMouseEnter={(e)=>{e.currentTarget.style.borderColor='var(--border-hover)';e.currentTarget.style.color='var(--text)'}}
            onMouseLeave={(e)=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.color='var(--text-muted)'}}>
            {expanded ? '▲ Show Less' : `▼ Show ${filtered.length - initialShow} More`}
          </button>
        </div>
      )}
    </section>
  )
}

// ─────────────────────────────────────────────
// CTA
// ─────────────────────────────────────────────
function CTA() {
  const ref=useRef(null); const titleRef=useRef(null); const subRef=useRef(null); const btnRef=useRef(null)
  useBottomMaskReveal(titleRef,{yRange:100,rotationRange:0,stagger:0.01,start:'top 90%'})
  useGSAP(()=>{
    gsap.from(subRef.current,{y:16,opacity:0,filter:'blur(6px)',duration:0.7,ease:'power3.out',scrollTrigger:{trigger:ref.current,start:'top 78%'}})
    gsap.from(btnRef.current,{y:12,opacity:0,duration:0.6,delay:0.15,ease:'power2.out',scrollTrigger:{trigger:ref.current,start:'top 78%'}})
  },{scope:ref})
  return (
    <section ref={ref} style={{ padding:'128px 48px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative', overflow:'hidden' }}>
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 60% 60% at 50% 50%, var(--accent-dim) 0%, transparent 70%)', pointerEvents:'none' }} />
      <SectionLabel>Start Building</SectionLabel>
      <h2 ref={titleRef} className="h2-cta" style={{ maxWidth:'1000px', overflow:'hidden', marginBottom:'24px' }}>Start Exploring <br />Animations</h2>
      <p ref={subRef} style={{ fontSize:'17px', color:'var(--text-muted)', maxWidth:'440px', lineHeight:'1.7', marginBottom:'40px' }}>Build better interactions. Design with intention.<br />Ship with confidence.</p>
      <div ref={btnRef} style={{ display:'flex', gap:'12px' }}>
        <a href="#collection" style={{ fontSize:'14px', fontWeight:'600', color:'#fff', background:'var(--accent)', padding:'14px 28px', borderRadius:'8px', textDecoration:'none', transition:'background 0.2s, transform 0.2s' }}
          onMouseEnter={(e)=>{e.currentTarget.style.background='#1d4ed8';e.currentTarget.style.transform='translateY(-2px)'}}
          onMouseLeave={(e)=>{e.currentTarget.style.background='var(--accent)';e.currentTarget.style.transform='translateY(0)'}}>Browse Animations →</a>
        {/* <a href="https://github.com/dickytrd/animvault" target="_blank" rel="noreferrer" style={{ fontSize:'14px', fontWeight:'500', color:'var(--text-muted)', padding:'14px 28px', borderRadius:'8px', textDecoration:'none', border:'1px solid var(--border)', transition:'all 0.2s' }}
          onMouseEnter={(e)=>{e.currentTarget.style.color='var(--text)';e.currentTarget.style.borderColor='var(--border-hover)'}}
          onMouseLeave={(e)=>{e.currentTarget.style.color='var(--text-muted)';e.currentTarget.style.borderColor='var(--border)'}}>View on GitHub</a> */}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main style={{ overflowX:'hidden' }}>
        <Hero />
        <VideoSection />
        <Introduction />
        <Marquee />
        <CollectionCards />
        {/* <Gallery /> */}
        <AnimationPlayground />
        <Works />

        {/* 06 — Inspiration */}
        <CardGridSection
          sectionId="inspiration"
          sectionNum="06 — Inspiration"
          titleText="Curated Sites & Projects"
          subtitleText="A selection of beautifully crafted websites with standout animations, interaction design, and motion systems."
          filters={INSP_FILTERS}
          initialShow={INSP_INITIAL_SHOW}
          items={INSPIRATION}
          searchPlaceholder="Search by name, type, or description…"
        />

        {/* 07 — Insights */}
        <CardGridSection
          sectionId="insights"
          sectionNum="07 — Insights"
          titleText="Learning Path"
          subtitleText="Understand the principles behind the animations. From GSAP basics to advanced interaction techniques."
          filters={INSIGHTS_FILTERS}
          initialShow={INSIGHTS_INITIAL_SHOW}
          items={INSIGHTS}
          searchPlaceholder="Search articles…"
        />

        <CTA />
        <Footer />
      </main>
    </>
  )
}