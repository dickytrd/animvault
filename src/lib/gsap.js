'use client'

/**
 * GSAP Singleton
 * ──────────────
 * ALL components must import gsap + plugins from HERE.
 * Never import directly from 'gsap' or 'gsap/SplitText' elsewhere.
 * This guarantees plugins are registered exactly once and avoids
 * "Plugin not registered" errors in Next.js module system.
 */

import gsap from 'gsap'
import { SplitText }         from 'gsap/SplitText'
import { CustomEase }        from 'gsap/CustomEase'
import { ScrambleTextPlugin } from 'gsap/ScrambleTextPlugin'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, CustomEase, ScrambleTextPlugin)
}

export { gsap, SplitText, CustomEase, ScrambleTextPlugin }
