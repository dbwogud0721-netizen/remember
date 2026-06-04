import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '후폭풍',
  description: '친구한테는 그만 말하라는 이야기, 여기서는 계속 해도 됩니다.',
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
        <div className="min-h-screen bg-[#F9F9F9]">
          <div className="mx-auto max-w-[390px] min-h-screen relative bg-[#F9F9F9]">
            {children}
          </div>
        </div>
      </body>
    </html>
  )
}
