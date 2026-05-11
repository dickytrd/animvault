'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from '@/lib/gsap'
import { FlipCard } from './FlipCard'
import { GalleryModal } from './GalleryModal'

export function GallerySwiper({ items }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [translateX, setTranslateX] = useState(0)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const autoSwipeRef = useRef(null)

  const CARD_WIDTH = 400 // Width of each card
  const GAP = 20 // Gap between cards
  const VISIBLE_CARDS = 3

  // Auto-swipe every 3s
  useEffect(() => {
    autoSwipeRef.current = setInterval(() => {
      if (!isDragging) {
        goToNext()
      }
    }, 3000)

    return () => {
      if (autoSwipeRef.current) clearInterval(autoSwipeRef.current)
    }
  }, [activeIndex, isDragging])

  const goToIndex = useCallback((index) => {
    setActiveIndex(index)
  }, [])

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length)
  }, [items.length])

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  // Drag handlers
  const handlePointerDown = (e) => {
    setIsDragging(true)
    setStartX(e.clientX || e.touches?.[0]?.clientX)
    setTranslateX(0)
    
    // Pause auto-swipe while dragging
    if (autoSwipeRef.current) clearInterval(autoSwipeRef.current)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return
    
    const currentX = e.clientX || e.touches?.[0]?.clientX
    const delta = currentX - startX
    setTranslateX(delta)
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)

    const threshold = 100 // Minimum drag distance to trigger swipe
    const delta = translateX

    if (Math.abs(delta) > threshold) {
      if (delta > 0) {
        goToPrev()
      } else {
        goToNext()
      }
    }

    setTranslateX(0)
    
    // Resume auto-swipe
    autoSwipeRef.current = setInterval(() => {
      if (!isDragging) goToNext()
    }, 3000)
  }

  const handleCardClick = (item, index) => {
    // Only trigger if not dragging
    if (Math.abs(translateX) < 5) {
      setSelectedItem(item)
      setIsModalOpen(true)
    }
  }

  // Calculate card positions
  const getCardStyle = (index) => {
    const diff = index - activeIndex
    const normalizedDiff = ((diff + items.length) % items.length)
    const actualDiff = normalizedDiff > items.length / 2 ? normalizedDiff - items.length : normalizedDiff

    const offset = actualDiff * (CARD_WIDTH + GAP) + translateX
    const scale = actualDiff === 0 ? 1 : 0.85
    const opacity = actualDiff === 0 ? 1 : 0.6
    const rotateY = actualDiff === 0 ? 0 : actualDiff > 0 ? -15 : 15
    const zIndex = actualDiff === 0 ? 10 : 5 - Math.abs(actualDiff)

    return {
      transform: `translateX(${offset}px) scale(${scale}) rotateY(${rotateY}deg)`,
      opacity,
      zIndex,
      width: `${CARD_WIDTH}px`,
      transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s',
    }
  }

  return (
    <>
      {/* Main Container */}
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          overflow: 'visible',
          background: 'var(--bg)',
          padding: '128px 0px',
          display: 'flex',
          justifyContent: 'center'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Floating "Drag" Indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 24px',
            background: 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(10px)',
            borderRadius: '50px',
            border: '1px solid rgba(255,255,255,0.1)',
            zIndex: 100,
            pointerEvents: 'none',
            opacity: isDragging ? 0 : 1,
            transition: 'opacity 0.3s',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
            DRAG TO EXPLORE
          </span>
        </div>

        {/* Cards Container */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-100%, -50%)',
            height: '600px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {items.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => (cardsRef.current[index] = el)}
              style={{
                position: 'absolute',
                ...getCardStyle(index),
                perspective: '1000px',
              }}
            >
              <FlipCard
                frontContent={
                  <div
                    style={{
                      width: '100%',
                      height: '600px',
                      background: 'var(--surface)',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--border)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Thumbnail */}
                    <div
                      style={{
                        width: '100%',
                        height: '70%',
                        background: 'var(--surface-2)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      }}
                    >
                      {item.thumbnail ? (
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>
                          Image Placeholder
                        </span>
                      )}
                    </div>

                    {/* Info */}
                    <div style={{ padding: '24px' }}>
                      <div
                        style={{
                          display: 'inline-block',
                          padding: '4px 12px',
                          background: 'var(--accent-dim)',
                          color: 'var(--accent)',
                          borderRadius: '20px',
                          fontSize: '10px',
                          fontWeight: '600',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '12px',
                        }}
                      >
                        {item.category}
                      </div>
                      <h3
                        style={{
                          fontSize: '20px',
                          fontWeight: '700',
                          color: 'var(--text)',
                          marginBottom: '8px',
                        }}
                      >
                        {item.title}
                      </h3>
                      <p style={{ fontSize: '11px', color: 'var(--text-subtle)', lineHeight: '1.6' }}>
                        Click to view details →
                      </p>
                    </div>
                  </div>
                }
                backContent={
                  <div
                    style={{
                      width: '100%',
                      height: '600px',
                      background: 'var(--surface)',
                      borderRadius: '16px',
                      padding: '32px',
                      border: '1px solid var(--border)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <h3
                      style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: 'var(--text)',
                        marginBottom: '8px',
                      }}
                    >
                      {item.title}
                    </h3>
                    <p
                      style={{
                        fontSize: '12px',
                        color: 'var(--text-muted)',
                        marginBottom: '24px',
                        lineHeight: '1.6',
                      }}
                    >
                      {item.description}
                    </p>

                    {/* Controls Preview */}
                    <div
                      style={{
                        flex: 1,
                        background: 'var(--bg)',
                        borderRadius: '8px',
                        padding: '16px',
                        marginBottom: '24px',
                      }}
                    >
                      <p
                        style={{
                          fontSize: '10px',
                          color: 'var(--text-subtle)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                          marginBottom: '12px',
                        }}
                      >
                        Controls
                      </p>
                      {item.controls.map((control) => (
                        <div key={control.id} style={{ marginBottom: '12px' }}>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              marginBottom: '4px',
                            }}
                          >
                            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                              {control.label}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--text)' }}>
                              {control.default}
                              {control.unit}
                            </span>
                          </div>
                          <div
                            style={{
                              height: '4px',
                              background: 'var(--border)',
                              borderRadius: '2px',
                            }}
                          >
                            <div
                              style={{
                                width: `${((control.default - control.min) / (control.max - control.min)) * 100}%`,
                                height: '100%',
                                background: 'var(--accent)',
                                borderRadius: '2px',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          setSelectedItem(item)
                          setIsModalOpen(true)
                        }}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'var(--accent)',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        Get Code
                      </button>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          flex: 1,
                          padding: '12px',
                          background: 'transparent',
                          color: 'var(--text)',
                          border: '1px solid var(--border)',
                          borderRadius: '6px',
                          fontSize: '12px',
                          fontWeight: '600',
                          cursor: 'pointer',
                        }}
                      >
                        View Demo
                      </button>
                    </div>
                  </div>
                }
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <GalleryModal
          item={selectedItem}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
