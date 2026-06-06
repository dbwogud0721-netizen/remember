'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, LayoutGrid, Moon, Mail, User } from 'lucide-react'

const NAV_ITEMS = [
  { href: '/home', icon: Home, label: '홈' },
  { href: '/category', icon: LayoutGrid, label: '카테고리' },
  { href: '/consolation', icon: Moon, label: '새벽게시판' },
  { href: '/messages', icon: Mail, label: '쪽지' },
  { href: '/my', icon: User, label: '마이페이지' },
]

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 pb-20 overflow-y-auto">
        {children}
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-[#F0F0F0] px-1 py-1 z-40">
        <div className="flex items-center justify-around">
          {NAV_ITEMS.map(item => {
            const active = pathname === item.href || (item.href === '/home' && pathname === '/')
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 transition-all ${
                  active ? 'text-[#111]' : 'text-[#CCC]'
                }`}
              >
                <item.icon
                  size={22}
                  strokeWidth={active ? 2.2 : 1.6}
                />
                <span className={`text-[10px] font-medium ${active ? 'text-[#111]' : 'text-[#CCC]'}`}>
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
