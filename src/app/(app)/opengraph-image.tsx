import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

// Image metadata
export const alt = 'About Gabsii'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

// TODO: adjust for other pages
export default async function Image() {
  const piazzollaReg = await readFile(
    join(process.cwd(), 'fonts/Piazzolla/Piazzolla-Regular.ttf')
  )
  const suisseIntlReg = await readFile(
    join(process.cwd(), 'fonts/SuisseIntl/SuisseIntl-Regular.ttf')
  )

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          background: '#fffbee',
          color: '#242424',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ display: 'flex', fontFamily: 'SuisseIntl', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: 32 }}>
            <svg width="128" height="128" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="128" cy="128" r="128" fill="#242424" />
              <path d="M136.564 81.5973L136.564 82.8359C136.564 88.4614 136.048 93.803 135.016 98.8608C133.932 103.97 132.022 108.692 129.287 113.028C126.552 117.415 122.655 121.285 117.597 124.64C111.662 128.562 107.353 132.794 104.669 137.336C101.934 141.929 100.566 147.503 100.566 154.058C100.566 159.064 101.727 163.296 104.05 166.754C106.321 170.211 109.288 172.818 112.952 174.572C116.565 176.327 120.41 177.205 124.487 177.205C128.461 177.205 132.255 176.379 135.867 174.727C139.48 173.076 142.473 170.495 144.847 166.986C147.221 163.528 148.589 159.064 148.95 153.593L172.484 153.593C172.123 162.883 169.775 170.728 165.44 177.127C161.053 183.578 155.298 188.455 148.176 191.759C141.054 195.062 133.158 196.713 124.487 196.713C114.991 196.713 106.682 194.881 99.5597 191.217C92.4375 187.604 86.9153 182.572 82.9929 176.121C79.019 169.721 77.032 162.367 77.032 154.058C77.032 144.768 79.3544 136.665 83.9993 129.749C88.6442 122.885 94.4503 117.26 101.418 112.873C106.785 109.467 110.733 106.447 113.262 103.815C115.739 101.183 117.365 98.2673 118.139 95.0675C118.862 91.9193 119.223 87.8421 119.223 82.8359L119.223 81.5973L136.564 81.5973ZM136.564 81.5973L140.28 149.955L120.152 149.955L122.165 81.5973L136.564 81.5973ZM128.126 34.5291C132.358 34.5291 135.996 36.0258 139.041 39.0192C142.086 42.0642 143.609 45.7285 143.609 50.0121C143.609 54.2441 142.086 57.8568 139.041 60.8501C135.996 63.8951 132.358 65.4176 128.126 65.4176C123.945 65.4176 120.333 63.8951 117.288 60.8501C114.191 57.8568 112.643 54.2441 112.643 50.0121C112.643 47.1735 113.365 44.5672 114.81 42.1932C116.204 39.8707 118.062 38.0128 120.384 36.6193C122.707 35.2258 125.287 34.5291 128.126 34.5291Z" fill="white" />
            </svg>
          </div>
          Gabsii
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontFamily: 'Piazzolla' }}>
          Digital Innovation & Web Solutions
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: 'Piazzolla',
          data: piazzollaReg,
          style: 'normal',
          weight: 400,
        },
        {
          name: 'SuisseIntl',
          data: suisseIntlReg,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  )
}
