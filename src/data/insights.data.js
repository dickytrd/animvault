/**
 * Insights Data
 * ─────────────
 * 🎨 CUSTOMIZE: Edit/add entries here.
 * `category` must match one of INSIGHTS_FILTERS values.
 * `image`    — URL or local path '/insights/cover.jpg'
 */

export const INSIGHTS_FILTERS = ['All', 'Tutorial', 'News', 'Inspiration', 'Deep Dive', 'Guide']

export const INSIGHTS_INITIAL_SHOW = 9

export const INSIGHTS = [
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '8 min',
    source:   'gsap.com/blog',
    url:      'https://gsap.com/blog/',
    title:    'ScrollTrigger: From Zero to Cinematic',
    desc:     'A deep-dive into pin, scrub, parallax, and snap — the complete ScrollTrigger playbook for modern websites.',
    image:    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  },
  {
    tag:      'News',
    category: 'News',
    readTime: '4 min',
    source:   'gsap.com',
    url:      'https://gsap.com/blog/',
    title:    'SplitText is Now Free',
    desc:     "Everything you can do with GSAP's most-used plugin, now free for commercial projects.",
    image:    'https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=800&q=80',
  },
  {
    tag:      'Inspiration',
    category: 'Inspiration',
    readTime: '5 min',
    source:   'tympanus.net',
    url:      'https://tympanus.net/codrops/',
    title:    '5 Creative Demos: Free GSAP Plugins',
    desc:     'MorphSVG, SplitText, DrawSVG in action — real demos showing what is now possible for free.',
    image:    'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80',
  },
  {
    tag:      'Deep Dive',
    category: 'Deep Dive',
    readTime: '6 min',
    source:   'css-tricks.com',
    url:      'https://css-tricks.com',
    title:    'GSAP Timeline: Orchestrating Complex Sequences',
    desc:     'How to chain, nest, and label timelines to build cinematic page animations with full control.',
    image:    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
  },
  {
    tag:      'Guide',
    category: 'Guide',
    readTime: '7 min',
    source:   'smashingmagazine.com',
    url:      'https://smashingmagazine.com',
    title:    'Easing in GSAP: The Visual Guide',
    desc:     'Power, expo, back, elastic — a complete visual breakdown of every ease in the GSAP ecosystem.',
    image:    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '10 min',
    source:   'gsap.com',
    url:      'https://gsap.com/docs/v3/Plugins/SplitText/',
    title:    'SplitText Complete Guide',
    desc:     'Every option, method, and pattern for SplitText — chars, words, lines, and advanced mask techniques.',
    image:    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
  },
  {
    tag:      'Inspiration',
    category: 'Inspiration',
    readTime: '4 min',
    source:   'awwwards.com',
    url:      'https://awwwards.com',
    title:    'Award-Winning Animation in 2024',
    desc:     'The best animated sites of the year — what made them win and what you can learn from each.',
    image:    'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&q=80',
  },
  {
    tag:      'Deep Dive',
    category: 'Deep Dive',
    readTime: '8 min',
    source:   'css-tricks.com',
    url:      'https://css-tricks.com',
    title:    'GSAP + React: The Right Way',
    desc:     'useGSAP, gsap.context(), cleanup patterns, and avoiding the most common memory leak mistakes.',
    image:    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
  },
  {
    tag:      'Guide',
    category: 'Guide',
    readTime: '5 min',
    source:   'gsap.com',
    url:      'https://gsap.com/docs/',
    title:    'GSAP 3: What Changed From GSAP 2',
    desc:     'The full migration guide — new API, new plugins, new defaults, and what to watch out for.',
    image:    'https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=800&q=80',
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '12 min',
    source:   'tympanus.net',
    url:      'https://tympanus.net/codrops/',
    title:    'Page Transitions with GSAP + Next.js',
    desc:     'Build silky route transitions with clip-path, curtain wipe, and scale effects in Next.js App Router.',
    image:    'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80',
  },
  {
    tag:      'News',
    category: 'News',
    readTime: '3 min',
    source:   'gsap.com',
    url:      'https://gsap.com/blog/',
    title:    'GSAP 3.13 — All Plugins Free',
    desc:     'The announcement that changed everything. Every plugin, including MorphSVG, DrawSVG, and ScrambleText — now free.',
    image:    'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80',
  },
  {
    tag:      'Inspiration',
    category: 'Inspiration',
    readTime: '6 min',
    source:   'codrops',
    url:      'https://tympanus.net/codrops/',
    title:    'Text Animations That Feel Premium',
    desc:     'Mask reveals, scrambles, per-line staggers — a curated breakdown of the most cinematic heading animations.',
    image:    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  },
]