/**
 * Insights Data
 * ─────────────
 * 🎨 CUSTOMIZE: Edit/add entries here.
 * `category` must match one of INSIGHTS_FILTERS values.
 * `image`    — Fallback dummy image (used if ogImage fails to load)
 * `ogImage`  — Open Graph image from the actual website (primary image)
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
    ogImage:  'https://image.thum.io/get/https://gsap.com/blog/',
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
    ogImage:  'https://image.thum.io/get/https://gsap.com/blog/',
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
    ogImage:  'https://image.thum.io/get/https://tympanus.net/codrops/',
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
    ogImage:  'https://image.thum.io/get/https://css-tricks.com',
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
    ogImage:  'https://image.thum.io/get/https://smashingmagazine.com',
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
    ogImage:  'https://image.thum.io/get/https://gsap.com/docs/',
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
    ogImage:  'https://image.thum.io/get/https://awwwards.com',
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
    ogImage:  'https://image.thum.io/get/https://css-tricks.com',
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
    ogImage:  'https://image.thum.io/get/https://gsap.com/docs/',
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
    ogImage:  'https://image.thum.io/get/https://tympanus.net/codrops/',
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
    ogImage:  'https://image.thum.io/get/https://gsap.com/blog/',
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
    ogImage:  'https://image.thum.io/get/https://tympanus.net/codrops/',
  },
  // --- KATEGORI: CREATIVE DEVELOPMENT & AWARD STANDARDS ---
  {
    tag:      'Deep Dive',
    category: 'Deep Dive',
    readTime: '12 min',
    source:   'awwwards.com/academy',
    url:      'https://www.awwwards.com/academy/',
    title:    'The Secret Sauce of Award-Winning Sites',
    desc:     'Menganalisis elemen visual dan teknis yang memisahkan situs biasa dengan pemenang SOTD (Site of the Day).',
    image:    'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://www.awwwards.com/academy/'
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '15 min',
    source:   'frontend.horse',
    url:      'https://frontend.horse/',
    title:    'Creative Coding Patterns: Motion & Physics',
    desc:     'Panduan mendalam tentang penggunaan physics-based animation untuk membuat interaksi yang terasa lebih "hidup".',
    image:    'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://frontend.horse/'
  },
  {
    tag:      'Guide',
    category: 'Guide',
    readTime: '10 min',
    source:   'thefwa.com',
    url:      'https://thefwa.com/articles',
    title:    'FWA Insights: Cutting Edge Web Technology',
    desc:     'Wawancara dengan developer top dunia mengenai bagaimana mereka mengeksekusi ide kreatif yang kompleks.',
    image:    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://thefwa.com/articles'
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '20 min',
    source:   'threejs-journey.com',
    url:      'https://threejs-journey.com/',
    title:    'WebGL & Shaders: The Next Level of Web Design',
    desc:     'Menguasai GLSL dan Shaders untuk menciptakan efek visual yang tidak bisa dicapai dengan CSS biasa.',
    image:    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://threejs-journey.com/'
  },
  {
    tag:      'Deep Dive',
    category: 'Deep Dive',
    readTime: '8 min',
    source:   'blog.maximeheckel.com',
    url:      'https://blog.maximeheckel.com/',
    title:    'The Physics of Smooth Motion',
    desc:     'Bagaimana matematika di balik easing dan springs bekerja untuk menciptakan animasi UI yang prestisius.',
    image:    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://blog.maximeheckel.com/'
  },
  {
    tag:      'Inspiration',
    category: 'Inspiration',
    readTime: '5 min',
    source:   'css-design-awards.com',
    url:      'https://www.cssdesignawards.com/articles',
    title:    'UI/UX Trends That Win Awards in 2025',
    desc:     'Eksplorasi tren tipografi kinetik, mikro-interaksi, dan layout non-tradisional yang sedang populer.',
    image:    'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://www.cssdesignawards.com/articles'
  },
  {
    tag:      'Guide',
    category: 'Guide',
    readTime: '11 min',
    source:   'stutpak.com',
    url:      'https://stutpak.com/',
    title:    'Performance Tuning for High-End Motion',
    desc:     'Cara memastikan website dengan animasi berat tetap berjalan lancar di 60fps pada perangkat mobile.',
    image:    'https://images.unsplash.com/photo-1550439062-609e1531270e?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://stutpak.com/'
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '14 min',
    source:   'codrops',
    url:      'https://tympanus.net/codrops/category/tutorials/',
    title:    'Building Interactive WebGL Image Galleries',
    desc:     'Tutorial membuat galeri foto dengan distorsi WebGL saat scroll, standar situs portofolio agensi.',
    image:    'https://images.unsplash.com/photo-1517292987719-0369a794ec0f?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://tympanus.net/codrops/'
  },
  // --- KATEGORI: HIGH-END CREATIVE DIRECTION ---
  {
    tag:      'Deep Dive',
    category: 'Deep Dive',
    readTime: '15 min',
    source:   'active-theory.com',
    url:      'https://activetheory.com/blog',
    title:    'Building Large Scale Immersive Webs',
    desc:     'Insight dari agensi Active Theory tentang cara menggabungkan Dreamscape, WebGL, dan audio untuk pengalaman imersif.',
    image:    'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://activetheory.com/blog'
  },
  {
    tag:      'Guide',
    category: 'Guide',
    readTime: '9 min',
    source:   'siteinspire.com',
    url:      'https://www.siteinspire.com/',
    title:    'Curating Minimalist Award Standards',
    desc:     'Bagaimana memilih palet warna dan tipografi yang memberikan kesan "Luxury" dan "Premium" pada website agensi.',
    image:    'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://www.siteinspire.com/'
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '18 min',
    source:   'medium.com/clark-niklas',
    url:      'https://niklaskohl.medium.com/',
    title:    'Advanced GSAP: Smooth Scroll & WebGL Sync',
    desc:     'Teknik sinkronisasi antara Lenis smooth scroll dengan rendering Three.js untuk performa 60fps yang stabil.',
    image:    'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://lenis.darkroom.engineering/'
  },

  // --- KATEGORI: CREATIVE TOOLS & TECH ---
  {
    tag:      'News',
    category: 'News',
    readTime: '6 min',
    source:   'rive.app/blog',
    url:      'https://rive.app/blog',
    title:    'Why Rive is replacing Lottie for Awards',
    desc:     'Analisis mengapa interaktivitas State Machine di Rive menjadi standar baru di situs-situs inovatif tahun ini.',
    image:    'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://rive.app/blog'
  },
  {
    tag:      'Tutorial',
    category: 'Tutorial',
    readTime: '14 min',
    source:   'spline.design',
    url:      'https://spline.design/community',
    title:    '3D Web Design for Non-WebGL Developers',
    desc:     'Menggunakan Spline untuk membuat interaksi 3D yang kompleks tanpa harus menulis ribuan baris kode GLSL.',
    image:    'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://spline.design/'
  },

  // --- KATEGORI: UX PSYCHOLOGY & MOTION ---
  {
    tag:      'Deep Dive',
    category: 'Deep Dive',
    readTime: '10 min',
    source:   'nngroup.com',
    url:      'https://www.nngroup.com/articles/animation-purpose-ux/',
    title:    'The Psychology of Motion in UX',
    desc:     'Memahami kapan animasi membantu navigasi dan kapan animasi justru mengganggu user experience.',
    image:    'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://www.nngroup.com/'
  },
  {
    tag:      'Guide',
    category: 'Guide',
    readTime: '7 min',
    source:   'linear.app/readme',
    url:      'https://linear.app/readme/design-principles',
    title:    'Linear Design Principles: The Craft',
    desc:     'Belajar dari standar kualitas Linear: Bagaimana detail kecil menciptakan persepsi produk berkualitas tinggi.',
    image:    'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://linear.app/readme'
  },
  {
    tag:      'Inspiration',
    category: 'Inspiration',
    readTime: '5 min',
    source:   'godly.website',
    url:      'https://godly.website/',
    title:    'Godly: The Best of Web Design',
    desc:     'Kurasi harian situs-situs dengan interaksi paling halus yang sering luput dari radar Awwwards.',
    image:    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80',
    ogImage:  'https://image.thum.io/get/https://godly.website/'
  }
]