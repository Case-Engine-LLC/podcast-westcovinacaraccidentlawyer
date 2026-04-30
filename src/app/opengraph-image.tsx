import { ImageResponse } from 'next/og'
import { attorney, authorProfiles, contact, siteConfig } from '@/data/siteData'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const hostProfile = Object.values(authorProfiles)[0]
const HOST_NAME = hostProfile?.name || attorney.name
const HOST_TITLE = hostProfile?.title || attorney.title
const FIRM_NAME = attorney.firm

export const alt = `${siteConfig.podcastName} — hosted by ${HOST_NAME}, ${HOST_TITLE} at ${FIRM_NAME}`

function podcastDomain(): string {
  const url = siteConfig.podcastUrl || contact.website || ''
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

// Per California RPC 7.1, numeric rating claims require substantiation. The
// Bible flags the firm's marketing stats as needing third-party verification
// (Google Business Profile) before publication, so the OG card uses neutral
// geographic + cadence copy instead of a star/review row until those numbers
// are re-pointed to verified counts.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#161E4C',
          color: '#ffffff',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: 500,
            height: 500,
            background:
              'radial-gradient(circle at 70% 30%, rgba(0,191,228,0.32) 0%, rgba(22,30,76,0) 60%)',
            display: 'flex',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            marginBottom: 56,
          }}
        >
          <div
            style={{
              width: 48,
              height: 2,
              background: '#00BFE4',
              display: 'flex',
            }}
          />
          <div
            style={{
              fontSize: 22,
              letterSpacing: '0.24em',
              textTransform: 'uppercase',
              color: '#00BFE4',
              fontWeight: 600,
              display: 'flex',
            }}
          >
            LEM GARCIA LAW
          </div>
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.035em',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex' }}>{HOST_NAME}</div>
        </div>

        <div
          style={{
            fontSize: 30,
            color: 'rgba(255,255,255,0.78)',
            lineHeight: 1.35,
            maxWidth: 980,
            display: 'flex',
            marginBottom: 48,
          }}
        >
          California personal injury attorney covering car, truck, motorcycle, and rideshare accidents across the San Gabriel Valley and North County San Diego.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 64,
            left: 80,
            right: 80,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 32,
            borderTop: '1px solid rgba(255,255,255,0.18)',
            fontSize: 22,
            color: 'rgba(255,255,255,0.7)',
          }}
        >
          <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
            <span style={{ display: 'flex' }}>West Covina, CA</span>
            <span style={{ display: 'flex', color: '#00BFE4' }}>·</span>
            <span style={{ display: 'flex' }}>San Gabriel Valley · North County San Diego</span>
            <span style={{ display: 'flex', color: '#00BFE4' }}>·</span>
            <span style={{ display: 'flex' }}>Weekly podcast</span>
          </div>
          <div style={{ display: 'flex', color: '#00BFE4', fontWeight: 600 }}>
            {podcastDomain()}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
