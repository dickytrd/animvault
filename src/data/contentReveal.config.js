export const contentRevealAnimations = [
  {
    id: 'cr-stagger-cards',
    label: 'Stagger Cards — Fade Up',
    description: 'Each card fades up independently with a time offset. The most versatile card reveal.',
    animationKey: 'StaggerCards',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.3, max: 2,    step: 0.05,  default: 0.7,  unit: 's'  },
      { id: 'stagger',  label: 'Stagger',  type: 'slider', min: 0.05,max: 0.5,  step: 0.025, default: 0.15, unit: 's'  },
      { id: 'yAmount',  label: 'Y Offset', type: 'slider', min: 10,  max: 100,  step: 5,     default: 40,   unit: 'px' },
      { id: 'ease', label: 'Ease', type: 'select', options: ['power2.out','expo.out','sine.out','back.out(1.7)'], default: 'power2.out' },
    ],
  },
  {
    id: 'cr-clip-slide-cards',
    label: 'Clip Slide Cards — Wipe',
    description: 'Each card wipes in left to right with a hard clipPath mask, staggered.',
    animationKey: 'ClipSlideCards',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.3, max: 2,   step: 0.05,  default: 0.8, unit: 's' },
      { id: 'stagger',  label: 'Stagger',  type: 'slider', min: 0.05,max: 0.5, step: 0.025, default: 0.2, unit: 's' },
      { id: 'ease', label: 'Ease', type: 'select', options: ['power3.out','expo.out','power2.inOut','sine.inOut'], default: 'power3.out' },
    ],
  },
  {
    id: 'cr-fade-up-batch',
    label: 'Fade Up — All at Once',
    description: 'All cards rise and fade in simultaneously as one unified motion.',
    animationKey: 'FadeUpBatch',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.3, max: 2.5, step: 0.1, default: 1.0, unit: 's'  },
      { id: 'yAmount',  label: 'Y Offset', type: 'slider', min: 10,  max: 80,  step: 5,   default: 30,  unit: 'px' },
      { id: 'ease', label: 'Ease', type: 'select', options: ['power2.out','expo.out','sine.out','power1.out'], default: 'power2.out' },
    ],
  },
  {
    id: 'cr-scale-reveal',
    label: 'Scale Reveal — Section',
    description: 'The entire card section scales up from slightly smaller while fading in.',
    animationKey: 'ScaleReveal',
    controls: [
      { id: 'duration',  label: 'Duration',   type: 'slider', min: 0.3, max: 2,    step: 0.05, default: 0.9,  unit: 's' },
      { id: 'scaleFrom', label: 'Scale From', type: 'slider', min: 0.7, max: 0.98, step: 0.02, default: 0.92, unit: '' },
      { id: 'ease', label: 'Ease', type: 'select', options: ['power2.out','expo.out','back.out(1.2)','sine.out'], default: 'power2.out' },
    ],
  },
  {
    id: 'cr-stagger-slide-left',
    label: 'Stagger Cards — Slide Left',
    description: 'Cards slide in from the left one after another with horizontal stagger.',
    animationKey: 'StaggerChildren',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.3, max: 2,   step: 0.05,  default: 0.7,  unit: 's'  },
      { id: 'stagger',  label: 'Stagger',  type: 'slider', min: 0.05,max: 0.4, step: 0.025, default: 0.15, unit: 's'  },
      { id: 'yAmount',  label: 'Y Offset', type: 'slider', min: 10,  max: 80,  step: 5,     default: 24,   unit: 'px' },
      { id: 'ease', label: 'Ease', type: 'select', options: ['power3.out','expo.out','power2.out'], default: 'expo.out' },
    ],
  },
]
