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
import { Draggable }         from 'gsap/Draggable'
import { InertiaPlugin }     from 'gsap/InertiaPlugin'
import { ScrollTrigger }     from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(SplitText, CustomEase, ScrambleTextPlugin, Draggable, InertiaPlugin, ScrollTrigger)
}
 
export { gsap, SplitText, CustomEase, ScrambleTextPlugin, Draggable, InertiaPlugin, ScrollTrigger }
 
