'use client'

import { useMemo } from 'react'
import { CopyButton } from '@/components/ui/CopyButton'

/**
 * CodeTab
 * ───────
 * Displays syntax-highlighted GSAP code.
 * Uses a lightweight custom highlighter — no external dependency.
 * Highlighting is optimized specifically for GSAP / JS patterns.
 */
export function CodeTab({ codeString }) {
  const highlighted = useMemo(() => highlight(codeString), [codeString])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Header bar */}
      <div style={{
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'space-between',
        padding:        '10px 14px',
        borderBottom:   '1px solid var(--border)',
        flexShrink:     0,
      }}>
        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            JavaScript
          </span>
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>·</span>
          <span style={{ fontSize: '11px', color: 'var(--text-subtle)' }}>GSAP</span>
        </div>
        <CopyButton text={codeString} />
      </div>

      {/* Code block */}
      <div style={{
        flex:       1,
        overflow:   'auto',
        padding:    '16px',
      }}>
        <pre style={{
          margin:     0,
          fontSize:   '12.5px',
          lineHeight: '1.75',
          fontFamily: '"SF Mono", "Fira Code", "Fira Mono", "Roboto Mono", Menlo, Monaco, monospace',
          color:      'var(--text)',
          whiteSpace: 'pre',
          tabSize:    2,
        }}>
          <code dangerouslySetInnerHTML={{ __html: highlighted }} />
        </pre>
      </div>
    </div>
  )
}

/* ─── Lightweight GSAP/JS Syntax Highlighter ──────────────── */

const GSAP_GLOBALS  = /\b(gsap|SplitText|ScrollTrigger|CustomEase)\b/g
const GSAP_METHODS  = /\.(from|to|fromTo|set|timeline|registerPlugin|killTweensOf|context|quickTo|revert)\b/g
const JS_KEYWORDS   = /\b(import|export|from|const|let|var|new|return|function|default|if|else|true|false|null|undefined|async|await|=>)\b/g
const STRINGS       = /('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/g
const NUMBERS       = /\b(\d+\.?\d*)\b/g
const LINE_COMMENTS = /(\/\/[^\n]*)/g
const BLOCK_COMMENT = /(\/\*[\s\S]*?\*\/)/g
const PUNCT         = /([{}[\]();,])/g

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function highlight(code) {
  // Multi-pass tokenizer using placeholder markers.
  //
  // BUG PREVENTION — placeholder format:
  // Using \x00T{id}T\x00 (letter-wrapped) so the NUMBERS regex
  // /\b\d+\b/ cannot match inside a placeholder.
  // Reason: 'T' is a word char (\w), so \b does NOT fire between T and a digit.
  // A plain \x00{id}\x00 would break because \x00 is non-word → \b fires → digit matched.

  const segments = []
  let remaining = escapeHtml(code)

  function tokenize(pattern, className) {
    remaining = remaining.replace(pattern, (match) => {
      const id = segments.length
      segments.push(`<span class="${className}">${match}</span>`)
      return `\x00T${id}T\x00` // letter-wrapped: NUMBERS regex safe
    })
  }

  // Order matters: most specific / greedy first
  tokenize(BLOCK_COMMENT, 'hl-comment')
  tokenize(LINE_COMMENTS, 'hl-comment')
  tokenize(STRINGS,       'hl-string')
  tokenize(GSAP_GLOBALS,  'hl-gsap')
  tokenize(GSAP_METHODS,  'hl-method')
  tokenize(JS_KEYWORDS,   'hl-keyword')
  tokenize(NUMBERS,       'hl-number')
  tokenize(PUNCT,         'hl-punct')

  // Restore — must match the exact placeholder format above
  return remaining.replace(/\x00T(\d+)T\x00/g, (_, id) => segments[parseInt(id)])
}
