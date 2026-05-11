export const galleryAnimations = [
  {
    id: 'split-fade',
    title: 'Split Fade',
    category: 'Heading Reveal',
    description: 'Each character fades in sequentially with pure opacity transition. Clean & minimal.',
    thumbnail: '/placeholders/split-fade.jpg', // Dummy image
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.1, max: 2, step: 0.05, default: 0.4, unit: 's' },
      { id: 'stagger', label: 'Stagger', type: 'slider', min: 0.01, max: 0.2, step: 0.01, default: 0.03, unit: 's' },
    ],
  },
  {
    id: 'blur-reveal',
    title: 'Blur Reveal',
    category: 'Heading Reveal',
    description: 'Text reveals from blur to sharp focus with scale animation.',
    thumbnail: '/placeholders/blur-reveal.jpg',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.2, max: 2, step: 0.05, default: 0.6, unit: 's' },
      { id: 'blurAmount', label: 'Blur Amount', type: 'slider', min: 5, max: 30, step: 1, default: 15, unit: 'px' },
    ],
  },
  {
    id: 'kinetic-snap',
    title: 'Kinetic Snap',
    category: 'Heading Reveal',
    description: 'Characters scatter randomly then snap back with elastic easing.',
    thumbnail: '/placeholders/kinetic-snap.jpg',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.3, max: 2, step: 0.05, default: 0.8, unit: 's' },
      { id: 'displacement', label: 'Displacement', type: 'slider', min: 50, max: 200, step: 10, default: 100, unit: 'px' },
    ],
  },
  {
    id: 'fill-slide',
    title: 'Fill Slide',
    category: 'Button Animation',
    description: 'Background slides in from the left on hover, revealing on enter.',
    thumbnail: '/placeholders/fill-slide.jpg',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.1, max: 1, step: 0.05, default: 0.4, unit: 's' },
    ],
  },
  {
    id: 'magnetic-pull',
    title: 'Magnetic Pull',
    category: 'Button Animation',
    description: 'Button follows cursor with magnetic attraction on hover.',
    thumbnail: '/placeholders/magnetic-pull.jpg',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.1, max: 1, step: 0.05, default: 0.4, unit: 's' },
      { id: 'magneticRange', label: 'Magnetic Range', type: 'slider', min: 10, max: 80, step: 5, default: 30, unit: 'px' },
    ],
  },
  {
    id: 'data-stream',
    title: 'Data Stream',
    category: 'Button Animation',
    description: 'Hex data flows in background. Hover converges data into label.',
    thumbnail: '/placeholders/data-stream.jpg',
    controls: [
      { id: 'density', label: 'Density', type: 'slider', min: 8, max: 40, step: 2, default: 20, unit: '' },
      { id: 'convergeSpeed', label: 'Speed', type: 'slider', min: 0.2, max: 0.8, step: 0.05, default: 0.5, unit: 's' },
    ],
  },
]