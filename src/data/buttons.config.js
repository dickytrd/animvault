export const buttonsAnimations = [
  {
    id: 'btn-fill-slide', label: 'Fill Slide',
    description: 'Background slides in from the left on hover, revealing on enter and retracting on leave.',
    animationKey: 'FillSlideBtn',
    label_button: 'Hover me',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.1, max: 1, step: 0.05, default: 0.4, unit: 's' },
    ],
  },
  {
    id: 'btn-arrow-slide', label: 'Arrow Slide',
    description: 'The label and arrow icon shift right on hover, creating a directional pull effect.',
    animationKey: 'ArrowSlideBtn',
    label_button: 'Get Started',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.1, max: 0.8, step: 0.05, default: 0.3, unit: 's' },
    ],
  },
  {
    id: 'btn-ripple-click', label: 'Ripple Click',
    description: 'A ripple wave expands outward from the exact click position.',
    animationKey: 'RippleClickBtn',
    label_button: 'Click me',
    controls: [
      { id: 'duration', label: 'Duration', type: 'slider', min: 0.2, max: 1.5, step: 0.1, default: 0.6, unit: 's' },
    ],
  },
  {
    id: 'btn-scale-pop', label: 'Scale Pop',
    description: 'Button scales up on hover and springs with elastic energy on click.',
    animationKey: 'ScalePopBtn',
    label_button: 'Click & hover',
    controls: [
      { id: 'duration',   label: 'Duration',    type: 'slider', min: 0.1, max: 0.6, step: 0.05, default: 0.25, unit: 's' },
      { id: 'scaleHover', label: 'Hover Scale', type: 'slider', min: 1.01, max: 1.12, step: 0.01, default: 1.06, unit: '' },
    ],
  },
  {
    id: 'btn-shake-error', label: 'Shake Error',
    description: 'Click to trigger a rapid shake — communicates an error or rejection state.',
    animationKey: 'ShakeErrorBtn',
    label_button: 'Submit',
    controls: [
      { id: 'intensity', label: 'Intensity', type: 'slider', min: 2, max: 14, step: 1, default: 6, unit: 'px' },
      { id: 'duration',  label: 'Duration',  type: 'slider', min: 0.3, max: 1.2, step: 0.1, default: 0.6, unit: 's' },
    ],
  },
]
