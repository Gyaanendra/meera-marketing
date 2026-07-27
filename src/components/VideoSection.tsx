'use client'

import { useRef, useState, useCallback } from 'react'
import ScrollExpandMedia from '@/components/ScrollExpandMedia'
import AmbientShapes from '@/components/AmbientShapes'

const VIDEO_URL = 'https://pub-17068ad71c094e8f94ecef34af72715d.r2.dev/product_video.mp4'

export default function VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [muted, setMuted] = useState(true)

  const toggle = useCallback(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <AmbientShapes density="medium" />
      <ScrollExpandMedia
      id="product-video"
      startWidthVW="40vw"
      aspectRatio="16 / 9"
      caption={
        <div>
          <div className="eyebrow" style={{ marginBottom: '0.5rem' }}>
            02 / see meera in action
          </div>
          <h2 className="text-h2">Watch it work.</h2>
        </div>
      }
    >
      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <video
          ref={videoRef}
          src={VIDEO_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <button
          onClick={toggle}
          aria-label={muted ? 'Unmute' : 'Mute'}
          style={{
            position: 'absolute', bottom: '0.75rem', right: '0.75rem',
            width: '2.25rem', height: '2.25rem', borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.25)',
            background: 'rgba(0,0,0,0.45)',
            color: '#fff', fontSize: '1rem', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)', transition: 'background 0.15s',
            lineHeight: 1,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.65)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.45)')}
        >
          {muted ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      </div>
    </ScrollExpandMedia>
    </div>
  )
}
