'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, PenLine, Heart, MessageCircle, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/home', icon: Home, label: '홈' },
  { href: '/write', icon: PenLine, label: '글쓰기' },
  { href: '/consolation', icon: Heart, label: '위로상자' },
  { href: '/messages', icon: MessageCircle, label: '쪽지' },
  { href: '/my', icon: User, label: '마이' },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-24 overflow-y-auto">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white shadow-nav border-t border-[#F0F0F0] px-2 py-2 z-40">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || (item.href === '/home' && pathname === '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all ${
                  active ? 'text-warm-500' : 'text-[#BBB] hover:text-[#888]'
                }`}
              >
                <item.icon
                  size={22}
                  strokeWidth={active ? 2.5 : 1.8}
                  className={active ? 'text-warm-500' : ''}
                />
                <span className={`text-[10px] font-medium ${active ? 'text-warm-500' : 'text-[#BBB]'}`}>
                  {item.label}
                </span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
