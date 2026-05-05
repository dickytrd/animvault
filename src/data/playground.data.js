/**
 * Animation Playground Data
 * ─────────────────────────
 * Updated dengan semua 30 heading reveals dan 14 button animations
 */

export const PLAYGROUND_HEADING = 'Animation That Moves'
export const PLAYGROUND_SUBTEXT = 'A concise subtitle that supports the main message and adds context.'

// ── Heading Reveal (30 animations) ────────────────────────────
export const HEADING_ANIMS = [
  { key:'SplitFadeOpacity',    num:'01', label:'Split Fade — Opacity',       controls:{ duration:0.8,  stagger:0.035, ease:'power2.out' } },
  { key:'SplitFadeBlur',       num:'02', label:'Split Fade — Blur',          controls:{ duration:1.0,  stagger:0.04,  blurAmount:10, ease:'power2.out' } },
  { key:'SplitMaskChar',       num:'03', label:'Split Mask — Per Char',      controls:{ duration:0.7,  stagger:0.03,  yOffset:110, ease:'power3.out' } },
  { key:'SplitMaskWord',       num:'04', label:'Split Mask — Per Word',      controls:{ duration:0.8,  stagger:0.1,   yOffset:110, ease:'expo.out' } },
  { key:'SplitSkewFade',       num:'05', label:'Split Skew — Fade',          controls:{ duration:0.6,  stagger:0.08,  skewAmount:8, yAmount:20, ease:'power2.out' } },
  { key:'ScrambleReveal',      num:'06', label:'Scramble Reveal',            controls:{ duration:2.5,  chars:'upperCase', speed:0.4, revealDelay:0.3 } },
  { key:'RotateIn3D',          num:'07', label:'Rotate 3D — X Axis',         controls:{ duration:0.7,  stagger:0.03,  rotateAmount:-90, perspective:400, ease:'power3.out' } },
  { key:'FlipWord3D',          num:'08', label:'Flip Word — Y Axis',         controls:{ duration:0.7,  stagger:0.1,   rotateAmount:90, perspective:500, ease:'expo.out' } },
  { key:'WaveChar',            num:'09', label:'Wave — Per Character',       controls:{ duration:0.8,  stagger:0.035, amplitude:40, frequency:0.8, ease:'power2.out' } },
  { key:'LineByLine',          num:'10', label:'Line by Line — Masked',      controls:{ duration:0.8,  stagger:0.2,   yAmount:100, ease:'power3.out' } },
  { key:'ScaleFade',           num:'11', label:'Scale Fade — Per Word',      controls:{ duration:0.7,  stagger:0.1,   scaleFrom:0.5, ease:'back.out(1.7)' } },
  { key:'Typewriter',          num:'12', label:'Typewriter',                 controls:{ speed:0.06 } },
  { key:'LetterCollapse',      num:'13', label:'Letter Collapse',            controls:{ duration:0.9,  spread:10, ease:'expo.out' } },
  { key:'SlideFromLeft',       num:'14', label:'Slide From Left',            controls:{ duration:0.7,  stagger:0.1, xAmount:50, ease:'power3.out' } },
  { key:'FadeSubtle',          num:'15', label:'Fade Subtle — Minimal',      controls:{ duration:1.2,  stagger:0.2, yAmount:16, ease:'sine.out' } },
  { key:'BottomMaskAssemble',  num:'16', label:'Bottom Mask Assemble',       controls:{ duration:0.8,  stagger:0.04, yRange:120, rotationRange:45, ease:'power3.out' } },
  { key:'AlternatingYReveal',  num:'17', label:'Alternating Y Reveal',       controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'CharAssembleGlitch',  num:'18', label:'Char Assemble Glitch',       controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'CinematicDepthReveal',num:'19', label:'Cinematic Depth Reveal',     controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'FloatingZigzagNoMask',num:'20', label:'Floating Zigzag No Mask',    controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'FloatingZigzagReveal',num:'21', label:'Floating Zigzag Reveal',     controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'GlitchChangeAssemble',num:'22', label:'Glitch Change Assemble',     controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'RandomMaskAssemble',  num:'23', label:'Random Mask Assemble',       controls:{ duration:0.8,  stagger:0.04, yRange:100, rotationRange:30, ease:'power3.out' } },
  { key:'SliceGlitchReveal',   num:'24', label:'Slice Glitch Reveal',        controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'SliceMaskGlitch',     num:'25', label:'Slice Mask Glitch',          controls:{ duration:0.8,  stagger:0.04, ease:'power3.out' } },
  { key:'KineticSnapReveal',   num:'26', label:'Kinetic Snap — Elastic',     controls:{ duration:1.0,  stagger:0.03, displacement:80, scaleFrom:0.7, ease:'elastic.out(1, 0.6)' } },
  { key:'TrackingReveal',      num:'27', label:'Tracking — Editorial',       controls:{ duration:1.2,  stagger:0.04, trackingFrom:200, yFrom:30, ease:'power3.out' } },
  { key:'RadialBurstReveal',   num:'28', label:'Radial Burst — Explosive',   controls:{ duration:1.0,  stagger:0.03, burstRange:150, scaleFrom:0.5, rotationRange:180, ease:'power3.out' } },
  { key:'CenterOutCascade',    num:'29', label:'Center Out — Cascade',       controls:{ duration:1.1,  stagger:0.035, yFrom:40, scaleFrom:0.9, ease:'power3.out' } },
  { key:'ElasticOvershoot',    num:'30', label:'Elastic Overshoot — Bounce', controls:{ duration:1.1,  stagger:0.04, yFrom:-100, rotationRange:15, ease:'elastic.out(1, 0.6)' } },
]

// ── Content Reveal (5 animations) ─────────────────────────────
export const CONTENT_ANIMS = [
  { key:'StaggerCards',    num:'01', label:'Stagger Cards — Fade Up',    controls:{ duration:0.7, stagger:0.15, yAmount:40, ease:'power2.out' } },
  { key:'ClipSlideCards',  num:'02', label:'Clip Slide Cards — Wipe',    controls:{ duration:0.8, stagger:0.2, ease:'power3.out' } },
  { key:'FadeUpBatch',     num:'03', label:'Fade Up — All at Once',      controls:{ duration:1.0, yAmount:30, ease:'power2.out' } },
  { key:'ScaleReveal',     num:'04', label:'Scale Reveal — Section',     controls:{ duration:0.9, scaleFrom:0.92, ease:'power2.out' } },
  { key:'StaggerChildren', num:'05', label:'Stagger Children',           controls:{ duration:0.7, stagger:0.15, yAmount:24, ease:'expo.out' } },
]

// ── Button Hover (14 animations) ──────────────────────────────
export const BUTTON_ANIMS = [
  { key:'FillSlideBtn',   num:'01', label:'Fill Slide',     hint:'Hover the button',  hintType:'hover', btnLabel:'Hover me',          duration:0.4 },
  { key:'ArrowSlideBtn',  num:'02', label:'Arrow Slide',    hint:'Hover the button',  hintType:'hover', btnLabel:'Get Started',       duration:0.3 },
  { key:'RippleClickBtn', num:'03', label:'Ripple Click',   hint:'Click the button',  hintType:'click', btnLabel:'Click me',          duration:0.6 },
  { key:'ScalePopBtn',    num:'04', label:'Scale Pop',      hint:'Hover & click',     hintType:'both',  btnLabel:'Click & hover',     duration:0.25, scaleHover:1.06 },
  { key:'ShakeErrorBtn',  num:'05', label:'Shake Error',    hint:'Click the button',  hintType:'click', btnLabel:'Submit',            intensity:6,   duration:0.6 },
  { key:'MagneticBtn',    num:'06', label:'Magnetic Pull',  hint:'Hover & move',      hintType:'hover', btnLabel:'Hover me',          duration:0.4, magneticRange:30 },
  { key:'ThreeDFlipBtn',  num:'07', label:'3D Flip Reveal', hint:'Hover to flip',     hintType:'hover', btnLabel:'Hover me',          duration:0.4, axis:'Y', secondary:'Learn more', thickness:6 },
  { key:'LiquidFillBtn',  num:'08', label:'Liquid Fill',    hint:'Click to fill',     hintType:'click', btnLabel:'Click me',          duration:0.6, bounce:1.8 },
  { key:'PressHoldBtn',   num:'09', label:'Press & Hold',   hint:'Hold to complete',  hintType:'hold',  btnLabel:'Hold me',           holdDuration:1.5, ringThickness:4, ease:'none', showSuccessCheck:true },
  { key:'GlitchTextBtn',  num:'10', label:'Glitch Text',    hint:'Hover to glitch',   hintType:'hover', btnLabel:'Hover Me!',         duration:0.4, intensity:6, enableJitter:true, pulseSpeed:0.6 },
  { key:'QuantumFluxBtn',  num:'11', label:'Quantum Flux',   hint:'Hover to collapse', hintType:'hover', btnLabel:'Flux State',        superpositionBlur:4, collapseSpeed:0.4, teleportDistance:30, showTrail:true },
  { key:'HoloDecodeBtn',  num:'12', label:'Holo Decode',    hint:'Hover to decode',   hintType:'hover', btnLabel:'SYSTEM READY',      decodeSpeed:0.6, scanlineSpeed:0.4, holoIntensity:0.5, enableScanline:true },
  { key:'DataStreamBtn',  num:'13', label:'Data Stream',    hint:'Hover to converge', hintType:'hover', btnLabel:'EXECUTE',           density:24, convergeSpeed:0.4, burstRadius:60, streamOpacity:0.4 },
  { key:'CyberSliceBtn',  num:'14', label:'Cyber Slice',    hint:'Hover to slice',    hintType:'hover', btnLabel:'ACCESS GRANTED',    gapSize:12, speed:0.4, innerColor:'var(--accent)' },
]