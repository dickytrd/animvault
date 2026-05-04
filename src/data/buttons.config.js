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

// ─── 06 ───────────────────────────────────────────────────
  {
    id: 'btn-magnetic',
    label: 'Magnetic Pull',
    description: 'Button follows cursor with magnetic attraction on hover, then snaps back elastically.',
    animationKey: 'MagneticBtn',
    label_button: 'Hover me',
    controls: [
      {
        id: 'duration',
        label: 'Duration',
        type: 'slider',
        min: 0.1,
        max: 1.0,
        step: 0.05,
        default: 0.4,
        unit: 's',
      },
      {
        id: 'magneticRange',
        label: 'Magnetic Range',
        type: 'slider',
        min: 10,
        max: 80,
        step: 5,
        default: 30,
        unit: 'px',
      },
    ],
  },

// ─── 07 ───────────────────────────────────────────────────
  {
    id: 'btn-3d-flip',
    label: '3D Flip Reveal',
    description: 'Button flips in 3D space to reveal secondary text. Choose X or Y axis rotation.',
    animationKey: 'ThreeDFlipBtn',
    label_button: 'Hover me',
    controls: [
      {
        id: 'duration',
        label: 'Duration',
        type: 'slider',
        min: 0.2,
        max: 1.0,
        step: 0.05,
        default: 0.4,
        unit: 's',
      },
      {
        id: 'axis',
        label: 'Flip Axis',
        type: 'select',
        options: ['Y', 'X'],
        default: 'X',
      },
      {
        id: 'secondary',
        label: 'Secondary Text',
        type: 'text',
        default: 'Click Me!',
        placeholder: 'Text on back',
      },
    ],
  },

    // ─── 08 ──────────────────────────────────────────────────
  {
    id: 'btn-liquid-fill',
    label: 'Liquid Fill',
    description: 'Hover to pool liquid. Click to fill & reveal "Nice!". Auto-reverts smoothly.',
    animationKey: 'LiquidFillBtn',
    label_button: 'Hover Me!', // Default UI hint
    controls: [
      {
        id: 'duration',
        label: 'Fill Duration',
        type: 'slider',
        min: 0.3,
        max: 1.2,
        step: 0.05,
        default: 0.6,
        unit: 's',
      },
      {
        id: 'bounce',
        label: 'Wave Bounce',
        type: 'slider',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        default: 1.8,
        unit: '',
      },
    ],
  },

    // ─── 09 ──────────────────────────────────────────────────
  {
    id: 'btn-morph-loader',
    label: 'Morph Loader',
    description: 'Button morphs to circle on click, spins, resolves to success, then auto-resets.',
    animationKey: 'MorphLoaderBtn',
    label_button: 'Submit',
    controls: [
      {
        id: 'loadingDuration',
        label: 'Loading Time',
        type: 'slider',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        default: 1.5,
        unit: 's',
      },
      {
        id: 'successDuration',
        label: 'Success Hold',
        type: 'slider',
        min: 0.3,
        max: 2.0,
        step: 0.1,
        default: 0.8,
        unit: 's',
      },
    ],
  },

    // ─── 10 ─────────────────────────────────────────────────
  {
    id: 'btn-glitch-text',
    label: 'Glitch Text',
    description: 'Text scrambles to "Click Me!" on hover. Cyberpunk vibe with pulse & jitter.',
    animationKey: 'GlitchTextBtn',
    label_button: 'Hover Me!',
    controls: [
      {
        id: 'duration',
        label: 'Scramble Speed',
        type: 'slider',
        min: 0.2,
        max: 1.2,
        step: 0.05,
        default: 0.4,
        unit: 's',
      },
      {
        id: 'intensity',
        label: 'Jitter Range',
        type: 'slider',
        min: 2,
        max: 12,
        step: 1,
        default: 6,
        unit: 'px',
      },
      {
        id: 'pulseSpeed',
        label: 'Border Pulse Speed',
        type: 'slider',
        min: 0.2,
        max: 1.5,
        step: 0.1,
        default: 0.6,
        unit: 's',
      },
      {
        id: 'enableJitter',
        label: 'Enable Jitter',
        type: 'toggle',
        default: true,
      },
    ],
  },

  // ─── 11 ─────────────────────────────────────────────────
  {
    id: 'btn-press-hold',
    label: 'Press & Hold',
    description: 'Hold to fill progress ring. Release early to cancel. Prevents accidental triggers.',
    animationKey: 'PressHoldBtn',
    label_button: 'Hold me',
    controls: [
      {
        id: 'holdDuration',
        label: 'Hold Duration',
        type: 'slider',
        min: 0.5,
        max: 3.0,
        step: 0.1,
        default: 1.5,
        unit: 's',
      },
      {
        id: 'ringThickness',
        label: 'Ring Thickness',
        type: 'slider',
        min: 2,
        max: 8,
        step: 1,
        default: 4,
        unit: 'px',
      },
      {
        id: 'ease',
        label: 'Fill Ease',
        type: 'select',
        options: ['none', 'power2.in', 'sine.inOut', 'expo.in'],
        default: 'none',
      },
      {
        id: 'showSuccessCheck',
        label: 'Show Success Icon',
        type: 'toggle',
        default: true,
      },
    ],
  },

  // ─── 12 ─────────────────────────────────────────────────
  {
    id: 'btn-quantum-flux',
    label: 'Quantum Flux',
    description: 'Superposition blur collapses on hover. Click triggers quantum teleport with interference trail.',
    animationKey: 'QuantumFluxBtn',
    label_button: 'Flux State',
    controls: [
      { id: 'superpositionBlur', label: 'Blur Amount', type: 'slider', min: 2, max: 10, step: 1, default: 4, unit: 'px' },
      { id: 'collapseSpeed', label: 'Collapse Speed', type: 'slider', min: 0.2, max: 0.8, step: 0.05, default: 0.4, unit: 's' },
      { id: 'teleportDistance', label: 'Teleport Range', type: 'slider', min: 10, max: 60, step: 5, default: 30, unit: 'px' },
      { id: 'showTrail', label: 'Show Interference Trail', type: 'toggle', default: true }
    ],
  },

  // ─── 13 ─────────────────────────────────────────────────
  {
    id: 'btn-holo-decode',
    label: 'Holo Decode',
    description: 'Text decodes from cyberpunk noise on hover. Features scanline sweep & holographic border glow.',
    animationKey: 'HoloDecodeBtn',
    label_button: 'SYSTEM READY',
    controls: [
      {
        id: 'decodeSpeed',
        label: 'Decode Speed',
        type: 'slider',
        min: 0.2,
        max: 1.2,
        step: 0.05,
        default: 0.6,
        unit: 's',
      },
      {
        id: 'scanlineSpeed',
        label: 'Scanline Speed',
        type: 'slider',
        min: 0.1,
        max: 0.8,
        step: 0.05,
        default: 0.4,
        unit: 's',
      },
      {
        id: 'holoIntensity',
        label: 'Holo Intensity',
        type: 'slider',
        min: 0.2,
        max: 1.0,
        step: 0.05,
        default: 0.5,
        unit: '',
      },
      {
        id: 'enableScanline',
        label: 'Enable Scanline',
        type: 'toggle',
        default: true,
      },
    ],
  },

  // ─── 14 ─────────────────────────────────────────────────
  {
    id: 'btn-data-stream',
    label: 'Data Stream',
    description: 'Hex data flows in background. Hover converges data into label. Click triggers radial packet burst.',
    animationKey: 'DataStreamBtn',
    label_button: 'EXECUTE',
    controls: [
      { id: 'density', label: 'Stream Density', type: 'slider', min: 8, max: 40, step: 2, default: 20, unit: '' },
      { id: 'convergeSpeed', label: 'Converge Speed', type: 'slider', min: 0.2, max: 0.8, step: 0.05, default: 0.5, unit: 's' },
      { id: 'burstRadius', label: 'Burst Radius', type: 'slider', min: 30, max: 100, step: 5, default: 60, unit: 'px' },
      { id: 'streamOpacity', label: 'Stream Opacity', type: 'slider', min: 0.1, max: 0.6, step: 0.05, default: 0.3, unit: '' }
    ],
  },

  // ─── 15 ─────────────────────────────────────────────────
  {
    id: 'btn-cyber-slice',
    label: 'Cyber Slice',
    description: 'Mechanical button splits horizontally revealing an inner energy core.',
    animationKey: 'CyberSliceBtn',
    label_button: 'ACCESS GRANTED',
    controls: [
      {
        id: 'gapSize',
        label: 'Slice Gap',
        type: 'slider',
        min: 5,
        max: 30,
        step: 1,
        default: 12,
        unit: 'px',
      },
      {
        id: 'speed',
        label: 'Mech Speed',
        type: 'slider',
        min: 0.2,
        max: 0.8,
        step: 0.05,
        default: 0.4,
        unit: 's',
      },
      {
        id: 'innerColor',
        label: 'Core Color',
        type: 'select',
        options: ['var(--accent)', '#ef4444', '#10b981', '#f59e0b'],
        default: 'var(--accent)',
      },
    ],
  },

]
