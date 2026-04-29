export const loadersAnimations = [
  {
    id: 'ld-dots-wave', label: 'Dots — Wave',
    description: 'Three dots bounce in a wave pattern, offset by stagger.',
    animationKey: 'DotsWave',
    controls: [
      { id: 'speed', label: 'Speed', type: 'slider', min: 0.15, max: 1, step: 0.05, default: 0.4, unit: 's' },
      { id: 'size',  label: 'Dot Size', type: 'slider', min: 6, max: 20, step: 1, default: 12, unit: 'px' },
    ],
  },
  {
    id: 'ld-progress-bar', label: 'Progress Bar',
    description: 'A bar fills left to right then resets — looping infinitely.',
    animationKey: 'ProgressBar',
    controls: [
      { id: 'speed',  label: 'Speed',  type: 'slider', min: 0.5, max: 4, step: 0.25, default: 1.8, unit: 's' },
      { id: 'height', label: 'Height', type: 'slider', min: 2, max: 10, step: 1, default: 4, unit: 'px' },
    ],
  },
  {
    id: 'ld-pulse-ring', label: 'Pulse Ring',
    description: 'Two rings expand and fade out in alternating pulses.',
    animationKey: 'PulseRing',
    controls: [
      { id: 'speed',     label: 'Speed',     type: 'slider', min: 0.5, max: 3, step: 0.25, default: 1.4, unit: 's' },
      { id: 'size',      label: 'Size',      type: 'slider', min: 24, max: 80, step: 4, default: 48, unit: 'px' },
      { id: 'thickness', label: 'Thickness', type: 'slider', min: 1, max: 4, step: 0.5, default: 2, unit: 'px' },
    ],
  },
  {
    id: 'ld-spinner-arc', label: 'Spinner Arc',
    description: 'An SVG arc rotates continuously with a clean track.',
    animationKey: 'SpinnerArc',
    controls: [
      { id: 'speed',     label: 'Speed',     type: 'slider', min: 0.3, max: 2.5, step: 0.1, default: 1.0, unit: 's' },
      { id: 'size',      label: 'Size',      type: 'slider', min: 24, max: 80, step: 4, default: 48, unit: 'px' },
      { id: 'thickness', label: 'Thickness', type: 'slider', min: 2, max: 8, step: 1, default: 3, unit: 'px' },
    ],
  },
  {
    id: 'ld-bounce-dots', label: 'Bounce Dots',
    description: 'Three dots bounce up with elastic physics, one after another.',
    animationKey: 'BounceDots',
    controls: [
      { id: 'speed', label: 'Speed', type: 'slider', min: 0.2, max: 1.2, step: 0.05, default: 0.5, unit: 's' },
      { id: 'size',  label: 'Dot Size', type: 'slider', min: 6, max: 20, step: 1, default: 12, unit: 'px' },
    ],
  },
]
