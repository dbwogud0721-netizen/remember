import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '우리, 괜찮아질 거야',
  description: '혼자 견디지 않아도 되는 곳',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <div className="min-h-screen bg-ivory">
          <div className="mx-auto max-w-[390px] min-h-screen relative bg-ivory">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
