'use client'

import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'
import { Navbar } from '@/components/layout/Navbar'

gsap.registerPlugin(ScrollTrigger, SplitText)

// ─────────────────────────────────────────────
// DATA
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

const GALLERY_ITEMS = [
  { label:'Mask Reveal',   tag:'Heading', col:'span 2' },
  { label:'Scramble Text', tag:'Heading', col:'span 1' },
  { label:'Card Stagger',  tag:'Content', col:'span 1' },
  { label:'Loader Ring',   tag:'Loader',  col:'span 1' },
  { label:'Ripple Click',  tag:'Button',  col:'span 1', row:'span 2' },
  { label:'Wave Chars',    tag:'Heading', col:'span 2', row:'span 2' },
  { label:'Pulse Dots',    tag:'Loader',  col:'span 1' },
  // { label:'Hover Fill',    tag:'Button',  col:'span 1' },
]

const INSPIRATION = [
  { name:'Clerk.com',     type:'Scroll + Text',     url:'https://clerk.com',         desc:'Parallax hero + SplitText reveals' },
  { name:'Linear.app',    type:'Micro-interaction',  url:'https://linear.app',        desc:'Smooth UI transitions throughout' },
  { name:'Vercel.com',    type:'Hero + Scroll',      url:'https://vercel.com',        desc:'Cinematic hero scroll storytelling' },
  { name:'Awwwards',      type:'SVG + Cursor',       url:'https://awwwards.com',      desc:'Award-winning GSAP showcase site' },
  { name:'Active Theory', type:'3D + WebGL',         url:'https://activetheory.net',  desc:'Heavy WebGL + GSAP orchestration' },
  { name:'Locomotive',    type:'Scroll + FX',        url:'https://locomotivemtl.com', desc:'Smooth scroll agency showcase' },
]

const BLOG = [
  { featured:true,  title:'ScrollTrigger: From Zero to Cinematic', desc:'A deep-dive into pin, scrub, parallax, and snap — the complete ScrollTrigger playbook for modern websites.', tag:'Tutorial',    readTime:'8 min', source:'gsap.com/blog', url:'https://gsap.com/blog/' },
  { featured:false, title:'SplitText is Now Free',                 desc:"Everything you can do with GSAP's most-used plugin, now free for everyone.",                                  tag:'News',        readTime:'4 min', source:'gsap.com',      url:'https://gsap.com/blog/' },
  { featured:false, title:'5 Creative Demos: Free GSAP Plugins',   desc:'MorphSVG, SplitText, DrawSVG in action — real demos from Codrops.',                                           tag:'Inspiration', readTime:'5 min', source:'tympanus.net',  url:'https://tympanus.net/codrops/' },
]

const INSP_FILTERS = ['All','Scroll','Text','SVG','3D','Cursor','Micro']

// Uses global.css design tokens
const STATUS_BADGE = {
  live:    { label:'live',    bg:'rgba(34,197,94,0.1)',   color:'#4ade80' },
  soon:    { label:'soon',    bg:'rgba(251,146,60,0.1)',  color:'#fb923c' },
  planned: { label:'planned', bg:'rgba(148,163,184,0.08)',color:'var(--text-subtle)' },
}

const LABEL = (txt) => (
  <p style={{ fontSize:'11px', fontWeight:'500', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'12px' }}>
    {txt}
  </p>
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
    const tl = gsap.timeline({ delay:0.2 })
    if (headlineRef.current) {
      const split = new SplitText(headlineRef.current, { type:'chars,words' })
      gsap.set(split.chars, { filter:'blur(20px)', yPercent:110, opacity:0 })
      tl.to(split.chars, { filter:'blur(0px)', yPercent:0, opacity:1, duration:0.7, stagger:0.03, ease:'power3.out' })
    }
    tl.from(subRef.current,   { filter:'blur(10px)', y:16, opacity:0, duration:0.6, ease:'power2.out' }, '-=0.3')
    tl.from(ctaRef.current,   { filter:'blur(10px)', y:12, opacity:0, duration:0.5, ease:'power2.out' }, '-=0.3')
    tl.from(statsRef.current, { filter:'blur(10px)', y:12, opacity:0, duration:0.5, ease:'power2.out' }, '-=0.2')
  }, { scope:containerRef })

  return (
    <section ref={containerRef} style={{
      minHeight:'100vh', display:'flex', flexDirection:'column',
      alignItems:'center', justifyContent:'center', textAlign:'center',
      padding:'120px 48px 80px', position:'relative', overflow:'hidden',
    }}>
      {/* Accent glow */}
      <div style={{ position:'absolute', inset:0, background:'radial-gradient(ellipse 80% 50% at 50% 0%, var(--accent-dim) 0%, transparent 70%)', pointerEvents:'none' }} />

      {/* Label pill */}
      <div style={{ fontSize:'11px', fontWeight:'500', letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--text-subtle)', marginBottom:'28px', padding:'4px 14px', border:'1px solid var(--border)', borderRadius:'20px', display:'inline-block' }}>
        Animation Collection — GSAP
      </div>

      <h1 ref={headlineRef} style={{ fontSize:'clamp(48px, 7vw, 96px)', fontWeight:'700', lineHeight:'1.0', letterSpacing:'-0.03em', color:'var(--text)', maxWidth:'860px', marginBottom:'24px', overflow:'hidden' }}>
        Make Your Site Come To Life.
      </h1>

      <p ref={subRef} style={{ fontSize:'17px', color:'var(--text-muted)', maxWidth:'500px', lineHeight:'1.65', marginBottom:'40px' }}>
        A curated library of production-ready GSAP animations. Preview, customize values, and copy the code instantly.
      </p>

      <div ref={ctaRef} style={{ display:'flex', gap:'12px', alignItems:'center', marginBottom:'72px' }}>
        <a href="#collection" style={{ fontSize:'14px', fontWeight:'500', color:'#fff', background:'var(--accent)', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', transition:'background 0.2s, transform 0.2s' }}
          onMouseEnter={(e)=>{ e.currentTarget.style.background='#1d4ed8'; e.currentTarget.style.transform='translateY(-1px)' }}
          onMouseLeave={(e)=>{ e.currentTarget.style.background='var(--accent)'; e.currentTarget.style.transform='translateY(0)' }}>
          Explore Collection →
        </a>
        <a href="https://gsap.com" target="_blank" rel="noreferrer" style={{ fontSize:'14px', color:'var(--text-muted)', padding:'12px 24px', borderRadius:'8px', textDecoration:'none', border:'1px solid var(--border)', transition:'all 0.2s' }}
          onMouseEnter={(e)=>{ e.currentTarget.style.color='var(--text)'; e.currentTarget.style.borderColor='var(--border-hover)' }}
          onMouseLeave={(e)=>{ e.currentTarget.style.color='var(--text-muted)'; e.currentTarget.style.borderColor='var(--border)' }}>
          GSAP Docs ↗
        </a>
      </div>

      {/* Stats */}
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
// INTRODUCTION
// ─────────────────────────────────────────────

function Introduction() {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.from('.intro-card', { y:32, opacity:0, duration:0.7, stagger:0.15, ease:'power3.out', scrollTrigger:{ trigger:ref.current, start:'top 75%' } })
  }, { scope:ref })

  const pillars = [
    { icon:'🔍', title:'Discover', desc:'Browse 30+ production-ready animations across 12 categories — from simple fades to physics-based interactions.' },
    { icon:'📖', title:'Learn',    desc:'Each animation includes clean, commented GSAP code. Tweak duration, easing, and stagger live in the browser.' },
    { icon:'🔁', title:'Recreate', desc:'Copy the exact code, drop it into your project, and it works. No abstractions, no wrappers — pure GSAP.' },
  ]

  return (
    <section ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto', borderTop:'1px solid var(--border)' }}>
      <div style={{ textAlign:'center', marginBottom:'48px' }}>
        {LABEL('What is AnimVault?')}
        <p style={{ fontSize:'16px', color:'var(--text-muted)', maxWidth:'520px', margin:'0 auto', lineHeight:'1.7' }}>
          A motion library for developers and designers who want beautiful GSAP animations without starting from scratch.
        </p>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'16px' }}>
        {pillars.map((p)=>(
          <div key={p.title} className="intro-card" style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px', padding:'28px' }}>
            <div style={{ fontSize:'28px', marginBottom:'16px' }}>{p.icon}</div>
            <div style={{ fontSize:'15px', fontWeight:'600', color:'var(--text)', marginBottom:'10px' }}>{p.title}</div>
            <div style={{ fontSize:'13px', color:'var(--text-muted)', lineHeight:'1.7' }}>{p.desc}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// COLLECTION CARDS
// ─────────────────────────────────────────────

function CollectionCards() {
  const ref = useRef(null)

  useGSAP(() => {
    // animasi muncul saat scroll
    gsap.from('.coll-card', {
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.06,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 70%',
      }
    })

    // hover animasi hanya untuk card yang live
    const liveCards = gsap.utils.toArray('.coll-card.live')
    liveCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -4, borderColor: 'var(--accent)',  duration: 0.25, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, borderColor: 'var(--border)', duration: 0.25, ease: 'power2.in' })
      })
    })
  }, { scope: ref })

  return (
    <section id="collection" ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto', borderTop:'1px solid var(--border)' }}>
      <div style={{ marginBottom:'40px' }}>
        {LABEL('04 — Collection')}
        <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:'700', color:'var(--text)', letterSpacing:'-0.02em', marginBottom:'8px' }}>Animation Categories</h2>
        <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>12 categories · 4 live · 3 coming soon · 5 planned</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px' }}>
        {COLLECTION.map((cat)=>{
          const badge  = STATUS_BADGE[cat.status]
          const isLive = cat.status === 'live'
          const Tag    = isLive ? Link : 'div'
          const extra  = isLive ? { href:cat.href } : {}
          return (
            <Tag key={cat.id} {...extra} 
              className={`coll-card ${isLive ? 'live' : ''}`} 
              style={{
                background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px',
                padding:'20px', textDecoration:'none', display:'block',
                transition:'border-color 0.2s', // transform dihandle GSAP
                cursor:isLive?'pointer':'default', opacity:isLive?1:0.6,
              }}
            >
              <div style={{ fontSize:'26px', color:isLive?'var(--accent)':'var(--text-subtle)', marginBottom:'14px', fontFamily:'monospace', lineHeight:'1' }}>{cat.preview}</div>
              <div style={{ display:'flex', alignItems:'flex-start', justifyContent:'space-between', gap:'8px', marginBottom:'8px' }}>
                <div style={{ fontSize:'13px', fontWeight:'600', color:isLive?'var(--text)':'var(--text-muted)', lineHeight:'1.3' }}>{cat.title}</div>
                <span style={{ fontSize:'9px', fontWeight:'600', padding:'2px 7px', borderRadius:'10px', flexShrink:0, background:badge.bg, color:badge.color }}>{badge.label}</span>
              </div>
              <p style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.55', marginBottom:'12px' }}>{cat.desc}</p>
              <div style={{ display:'flex', gap:'5px', flexWrap:'wrap', alignItems:'center' }}>
                {cat.tags.map((t)=>(<span key={t} style={{ fontSize:'10px', color:'var(--text-subtle)', background:'var(--surface-2)', border:'1px solid var(--border)', padding:'2px 8px', borderRadius:'6px' }}>{t}</span>))}
                {cat.count>0 && <span style={{ fontSize:'10px', color:'var(--accent)', marginLeft:'auto' }}>{cat.count} anims →</span>}
              </div>
            </Tag>
          )
        })}
      </div>
    </section>
  )
}



// ─────────────────────────────────────────────
// GALLERY
// ─────────────────────────────────────────────

function Gallery() {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.from('.gallery-item', { scale:0.94, opacity:0, duration:0.6, stagger:0.07, ease:'power3.out', scrollTrigger:{ trigger:ref.current, start:'top 70%' } })
  }, { scope:ref })

  return (
    <section id="gallery" ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto', borderTop:'1px solid var(--border)' }}>
      <div style={{ marginBottom:'40px' }}>
        {LABEL('05 — Gallery')}
        <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:'700', color:'var(--text)', letterSpacing:'-0.02em', marginBottom:'8px' }}>Animation Previews</h2>
        <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>The most visually impressive patterns from the vault.</p>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(4, 1fr)', gridAutoRows:'240px', gap:'10px' }}>
 
          {GALLERY_ITEMS.map((item,i)=>(
            <div key={i} className="gallery-item" style={{
              gridColumn: item.col || "span 1",   // default 1 kolom
              gridRow: item.row || "span 1",      // default 1 baris
              background:'var(--surface)', border:'1px solid var(--border)',
              borderRadius:'10px', display:'flex', flexDirection:'column', justifyContent:'flex-end',
              padding:'14px 16px', position:'relative', overflow:'hidden',
              cursor:'pointer', transition:'border-color 0.2s',
            }}
            onMouseEnter={(e)=>(e.currentTarget.style.borderColor='var(--border-hover)')}
            onMouseLeave={(e)=>(e.currentTarget.style.borderColor='var(--border)')}
          >
            <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%, -60%)', width:'40px', height:'40px', borderRadius:'50%', background:'var(--accent-dim)', border:'1px solid rgba(37,99,255,0.2)' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'10px', color:'var(--accent)', marginBottom:'3px', fontWeight:'500' }}>{item.tag}</div>
              <div style={{ fontSize:'12px', color:'var(--text-muted)', fontWeight:'500' }}>{item.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* <div style={{ textAlign:'center', marginTop:'28px' }}>
        <a href="#collection" style={{ fontSize:'13px', color:'var(--text-muted)', textDecoration:'none', borderBottom:'1px solid var(--border)', paddingBottom:'2px', transition:'color 0.2s' }}
          onMouseEnter={(e)=>(e.currentTarget.style.color='var(--text)')}
          onMouseLeave={(e)=>(e.currentTarget.style.color='var(--text-muted)')}>
          View full collection →
        </a>
      </div> */}
    </section>
  )
}

// ─────────────────────────────────────────────
// INSPIRATION
// ─────────────────────────────────────────────

function InspirationSites() {
  const ref = useRef(null)

  useGSAP(() => {
    // animasi muncul saat scroll
    gsap.fromTo('.insp-card',
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 70%' }
      }
    )

    // hover animasi hanya untuk card yang live
    const liveCards = gsap.utils.toArray('.insp-card.live')
    liveCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, { y: -4, borderColor: 'var(--accent)', duration: 0.25, ease: 'power2.out' })
      })
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { y: 0, borderColor: 'var(--border)', duration: 0.25, ease: 'power2.in' })
      })
    })
  }, { scope: ref })

  return (
    <section id="inspiration" ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto', borderTop:'1px solid var(--border)' }}>
      <div style={{ marginBottom:'40px' }}>
        {LABEL('06 — Inspiration')}
        <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:'700', color:'var(--text)', letterSpacing:'-0.02em', marginBottom:'8px' }}>Powered by GSAP</h2>
        <p style={{ fontSize:'14px', color:'var(--text-muted)' }}>Real websites that showcase what GSAP can do.</p>
      </div>

      <div style={{ display:'flex', gap:'6px', marginBottom:'24px', flexWrap:'wrap' }}>
        {INSP_FILTERS.map((f,i)=>(
          <button key={f} style={{
            fontSize:'12px', padding:'5px 14px', borderRadius:'20px', border:'1px solid',
            borderColor:i===0?'var(--accent)':'var(--border)',
            background:i===0?'var(--accent-dim)':'transparent',
            color:i===0?'var(--accent)':'var(--text-muted)',
            cursor:'pointer', transition:'all 0.15s', fontFamily:'inherit',
          }}>{f}</button>
        ))}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'12px' }}>
        {INSPIRATION.map((site)=>(
          <a key={site.name} href={site.url} target="_blank" rel="noreferrer"
            className={`insp-card ${site.url ? 'live' : ''}`} // hanya yang punya url dianggap live
            style={{
              background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px',
              padding:'20px', textDecoration:'none', display:'block', transition:'border-color 0.2s',
              cursor:site.url?'pointer':'default', opacity:site.url?1:0.6,
            }}
          >
            <div style={{ height:'200px', background:'var(--surface-2)', borderRadius:'8px', marginBottom:'14px', border:'1px solid var(--border)' }} />
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'6px' }}>
              <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text)' }}>{site.name}</div>
              <span style={{ fontSize:'10px', color:'var(--accent)', background:'var(--accent-dim)', padding:'2px 8px', borderRadius:'6px' }}>{site.type}</span>
            </div>
            <div style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.55' }}>{site.desc}</div>
          </a>
        ))}
      </div>
    </section>
  )
}


// ─────────────────────────────────────────────
// BLOG
// ─────────────────────────────────────────────

function Blog() {
  const ref = useRef(null)
  useGSAP(() => {
    gsap.from('.blog-card', { y:28, opacity:0, duration:0.6, stagger:0.1, ease:'power3.out', scrollTrigger:{ trigger:ref.current, start:'top 70%' } })
  }, { scope:ref })

  return (
    <section id="blog" ref={ref} style={{ padding:'80px 48px', maxWidth:'1200px', margin:'0 auto', borderTop:'1px solid var(--border)' }}>
      <div style={{ marginBottom:'40px' }}>
        {LABEL('07 — Blog')}
        <h2 style={{ fontSize:'clamp(28px, 4vw, 42px)', fontWeight:'700', color:'var(--text)', letterSpacing:'-0.02em' }}>Learn GSAP</h2>
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:'12px' }}>
        {/* Featured */}
        {BLOG.filter((b)=>b.featured).map((b)=>(
          <a key={b.title} href={b.url} target="_blank" rel="noreferrer" className="blog-card" style={{
            background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px',
            padding:'28px', textDecoration:'none', display:'block', transition:'border-color 0.2s',
          }}
            onMouseEnter={(e)=>(e.currentTarget.style.borderColor='var(--border-hover)')}
            onMouseLeave={(e)=>(e.currentTarget.style.borderColor='var(--border)')}
          >
            <div style={{ height:'400px', background:'var(--accent-dim)', borderRadius:'8px', marginBottom:'20px', border:'1px solid rgba(37,99,255,0.15)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'32px' }}>📜</div>
            <div style={{ display:'flex', gap:'8px', marginBottom:'12px' }}>
              <span style={{ fontSize:'10px', fontWeight:'600', color:'var(--accent)', background:'var(--accent-dim)', padding:'2px 8px', borderRadius:'6px' }}>{b.tag}</span>
              <span style={{ fontSize:'10px', color:'var(--text-subtle)' }}>{b.readTime} read</span>
              <span style={{ fontSize:'10px', color:'var(--text-subtle)' }}>via {b.source}</span>
            </div>
            <div style={{ fontSize:'17px', fontWeight:'600', color:'var(--text)', marginBottom:'10px', lineHeight:'1.35', letterSpacing:'-0.01em' }}>{b.title}</div>
            <div style={{ fontSize:'13px', color:'var(--text-muted)', lineHeight:'1.65' }}>{b.desc}</div>
          </a>
        ))}

        {/* Smaller */}
        <div style={{ display:'flex', flexDirection:'column', gap:'12px' }}>
          {BLOG.filter((b)=>!b.featured).map((b)=>(
            <a key={b.title} href={b.url} target="_blank" rel="noreferrer" className="blog-card" style={{
              background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'12px',
              padding:'20px', textDecoration:'none', display:'flex', flexDirection:'column', justifyContent:'flex-end', flex:1, transition:'border-color 0.2s',
            }}
              onMouseEnter={(e)=>(e.currentTarget.style.borderColor='var(--border-hover)')}
              onMouseLeave={(e)=>(e.currentTarget.style.borderColor='var(--border)')}
            >
              <div style={{ display:'flex', gap:'8px', marginBottom:'10px' }}>
                <span style={{ fontSize:'10px', fontWeight:'600', color:'var(--accent)', background:'var(--accent-dim)', padding:'2px 8px', borderRadius:'6px' }}>{b.tag}</span>
                <span style={{ fontSize:'10px', color:'var(--text-subtle)' }}>{b.readTime} read</span>
              </div>
              <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text)', marginBottom:'8px', lineHeight:'1.4' }}>{b.title}</div>
              <div style={{ fontSize:'12px', color:'var(--text-muted)', lineHeight:'1.55' }}>{b.desc}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop:'1px solid var(--border)', padding:'40px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'16px', maxWidth:'1200px', margin:'0 auto' }}>
      <div>
        <div style={{ fontSize:'14px', fontWeight:'600', color:'var(--text)', marginBottom:'4px', letterSpacing:'-0.01em' }}>
          Motion<span style={{ color:'var(--accent)' }}>Lab</span>
        </div>
        <div style={{ fontSize:'12px', color:'var(--text-subtle)' }}>A curated GSAP animation library — Built with GSAP + Next.js</div>
      </div>
      <div style={{ display:'flex', gap:'20px', alignItems:'center' }}>
        {[
          { label:'GitHub', url:'https://github.com/dickytrd/animvault' },
          { label:'GSAP',   url:'https://gsap.com' },
        ].map((l)=>(
          <a key={l.label} href={l.url} target="_blank" rel="noreferrer" style={{ fontSize:'12px', color:'var(--text-muted)', textDecoration:'none', transition:'color 0.15s' }}
            onMouseEnter={(e)=>(e.currentTarget.style.color='var(--text)')}
            onMouseLeave={(e)=>(e.currentTarget.style.color='var(--text-muted)')}>
            {l.label}
          </a>
        ))}
        <span style={{ fontSize:'12px', color:'var(--text-subtle)' }}>AnimVault v1.0</span>
      </div>
    </footer>
  )
}

// ─────────────────────────────────────────────
// PAGE ROOT
// ─────────────────────────────────────────────

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Introduction />
        <CollectionCards />
        <Gallery />
        <InspirationSites />
        <Blog />
        <Footer />
      </main>
    </>
  )
}