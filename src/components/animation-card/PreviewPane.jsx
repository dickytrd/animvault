'use client'

import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { SkeletonLeft } from './SkeletonLeft'

// Animation function registry — maps animationKey to the actual function
// All imports are dynamic-safe (client-only via 'use client' on this file)
import { SplitFadeOpacity } from '@/animations/heading-reveal/SplitFadeOpacity'
import { SplitFadeBlur }    from '@/animations/heading-reveal/SplitFadeBlur'
import { SplitMaskChar }    from '@/animations/heading-reveal/SplitMaskChar'
import { SplitMaskWord }    from '@/animations/heading-reveal/SplitMaskWord'
import { SplitSkewFade }    from '@/animations/heading-reveal/SplitSkewFade'
import { ScrambleReveal }   from '@/animations/heading-reveal/ScrambleReveal'
import { RotateIn3D }       from '@/animations/heading-reveal/RotateIn3d'
import { FlipWord3D }       from '@/animations/heading-reveal/FlipWord3d'
import { WaveChar }         from '@/animations/heading-reveal/WaveChar'
import { LineByLine }       from '@/animations/heading-reveal/LineByLine'
import { ScaleFade }        from '@/animations/heading-reveal/ScaleFade'
import { Typewriter }       from '@/animations/heading-reveal/Typewriter'
import { LetterCollapse }   from '@/animations/heading-reveal/LetterCollapse'
import { SlideFromLeft }    from '@/animations/heading-reveal/SlideFromLeft'
import { FadeSubtle }       from '@/animations/heading-reveal/FadeSubtle'
import { SliceGlitchReveal } from '@/animations/heading-reveal/SliceGlitchReveal'
import { CharAssembleGlitch } from '@/animations/heading-reveal/CharAssembleGlitch'
import { RandomMaskAssemble } from '@/animations/heading-reveal/RandomMaskAssemble'
import { BottomMaskAssemble } from '@/animations/heading-reveal/BottomMaskAssemble'
import { GlitchChangeAssemble } from '@/animations/heading-reveal/GlitchChangeAssemble'
import { SliceMaskGlitch } from '@/animations/heading-reveal/SliceMaskGlitch'
import { AlternatingYReveal } from '@/animations/heading-reveal/AlternatingYReveal'
import { FloatingZigzagReveal } from '@/animations/heading-reveal/FloatingZigzagReveal'
import { FloatingZigzagNoMask } from '@/animations/heading-reveal/FloatingZigzagNoMask'
import { CinematicDepthReveal } from '@/animations/heading-reveal/CinematicDepthReveal'
import { KineticSnapReveal } from '@/animations/heading-reveal/KineticSnapReveal'
import { TrackingReveal } from '@/animations/heading-reveal/TrackingReveal'
import { RadialBurstReveal } from '@/animations/heading-reveal/RadialBurstReveal'
import { CenterOutCascade } from '@/animations/heading-reveal/CenterOutCascade'
import { ElasticOvershoot } from '@/animations/heading-reveal/ElasticOvershoot'









const ANIMATION_REGISTRY = {
  SplitFadeOpacity,
  SplitFadeBlur,
  SplitMaskChar,
  SplitMaskWord,
  SplitSkewFade,
  ScrambleReveal,
  RotateIn3D,
  FlipWord3D,
  WaveChar,
  LineByLine,
  ScaleFade,
  Typewriter,
  LetterCollapse,
  SlideFromLeft,
  FadeSubtle,
  SliceGlitchReveal,
  CharAssembleGlitch,
  RandomMaskAssemble,
  BottomMaskAssemble,
  GlitchChangeAssemble,
  SliceMaskGlitch,
  AlternatingYReveal,
  FloatingZigzagReveal,
  FloatingZigzagNoMask,
  CinematicDepthReveal,
  KineticSnapReveal,
  TrackingReveal,
  RadialBurstReveal,
  CenterOutCascade,
  ElasticOvershoot,
}

/**
 * PreviewPane
 * ───────────
 * Left panel. Owns the GSAP animation lifecycle:
 *   1. Shows skeleton while GSAP DOM surgery happens
 *   2. Runs the animation function from registry
 *   3. Shows replay button when complete
 *
 * State machine: IDLE → LOADING → ANIMATING → COMPLETE
 * (managed by parent AnimationCard via `state` + `onStateChange` props)
 *
 * @param {string}   animationKey   - maps to ANIMATION_REGISTRY
 * @param {object}   controls       - current control values
 * @param {string}   text           - heading text
 * @param {string}   subtext        - body text
 * @param {string}   state          - 'idle' | 'loading' | 'animating' | 'complete'
 * @param {function} onStateChange  - (newState) => void
 */
export function PreviewPane({
  animationKey,
  controls,
  text,
  subtext,
  state,
  onStateChange,
}) {
  const containerRef = useRef(null)
  const headingRef   = useRef(null)
  const splitRef     = useRef(null)   // stores SplitText instance
  const tweenRef     = useRef(null)   // stores active GSAP tween for cleanup
  const gsapCtxRef   = useRef(null)   // stores gsap.context() for cleanup

  const runAnimation = useCallback(() => {
    const el = headingRef.current
    if (!el) return

    const animFn = ANIMATION_REGISTRY[animationKey]
    if (!animFn) {
      console.warn(`[PreviewPane] No animation found for key: ${animationKey}`)
      return
    }

    // Kill any active tween before starting new one
    if (tweenRef.current) {
      tweenRef.current.kill()
      tweenRef.current = null
    }

    // Clean up previous gsap context
    if (gsapCtxRef.current) {
      gsapCtxRef.current.revert()
      gsapCtxRef.current = null
    }

    // Run inside gsap.context for proper cleanup on unmount
    gsapCtxRef.current = gsap.context(() => {
      tweenRef.current = animFn({
        element: el,
        splitRef,
        controls,
        onComplete: () => onStateChange('complete'),
      })
    }, containerRef)
  }, [animationKey, controls, onStateChange])

  // React to state changes from parent
  useEffect(() => {
    if (state === 'animating') {
      // Small delay: let skeleton be visible for at least 1 frame
      // so React can paint skeleton before we do DOM surgery
      const raf = requestAnimationFrame(() => {
        runAnimation()
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [state, runAnimation])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      tweenRef.current?.kill()
      gsapCtxRef.current?.revert()
      if (splitRef.current) {
        splitRef.current.revert()
        splitRef.current = null
      }
    }
  }, [])

  const isLoading  = state === 'loading'
  const isComplete = state === 'complete'
  const isIdle     = state === 'idle'

  return (
    <div
      ref={containerRef}
      style={{
        position:       'relative',
        flex:           1,
        minHeight:      '320px',
        display:        'flex',
        flexDirection:  'column',
        justifyContent: 'center',
        padding:        '48px 52px 48px 0',
        // Clip so skeleton doesn't overflow
        overflow:       'hidden',
      }}
    >
      {/* ── Skeleton overlay ── */}
      <SkeletonLeft visible={isLoading} />

      {/* ── Actual content ── */}
      <div style={{
        opacity:    isLoading ? 0 : 1,
        transition: 'opacity 0.15s ease',
      }}>
        {/* Heading — the animated target */}
        <h2
          ref={headingRef}
          style={{
            fontSize:   'clamp(32px, 3.5vw, 52px)',
            fontWeight: '700',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
            color:      'var(--text)',
            marginBottom: '20px',
            // Prevent layout thrash during split
            wordBreak:  'break-word',
          }}
        >
          {text}
        </h2>

        {/* Subtext */}
        <p style={{
          fontSize:   '14px',
          lineHeight: '1.65',
          color:      'var(--text-muted)',
          maxWidth:   '380px',
          marginBottom: '28px',
        }}>
          {subtext}
        </p>

        {/* Button */}
        <button
          onClick={() => {
            if (state === 'animating') return
            onStateChange('loading')
          }}
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '6px',
            padding:         '10px 20px',
            background:      isComplete ? 'var(--accent)' : 'var(--surface-2)',
            color:           'var(--text)',
            border:          `1px solid ${isComplete ? 'transparent' : 'var(--border)'}`,
            borderRadius:    '6px',
            fontSize:        '13px',
            fontWeight:      '500',
            fontFamily:      'inherit',
            cursor:          state === 'animating' ? 'not-allowed' : 'pointer',
            transition:      'all 0.2s ease',
            opacity:         state === 'animating' ? 0.5 : 1,
            letterSpacing:   '0.01em',
          }}
          onMouseEnter={(e) => {
            if (state !== 'animating') {
              e.currentTarget.style.background = isComplete ? '#1d4ed8' : 'var(--surface)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = isComplete ? 'var(--accent)' : 'var(--surface-2)'
          }}
        >
          {isComplete || isIdle ? (
            <>
              <ReplayIcon />
              {isIdle ? 'Play' : 'Replay'}
            </>
          ) : state === 'animating' ? (
            'Playing…'
          ) : (
            'Loading…'
          )}
        </button>
      </div>
    </div>
  )
}

function ReplayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1 4 1 10 7 10"/>
      <path d="M3.51 15a9 9 0 1 0 .49-5.87"/>
    </svg>
  )
}