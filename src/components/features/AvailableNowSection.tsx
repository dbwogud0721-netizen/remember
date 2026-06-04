'use client'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { USERS } from '@/lib/data'

export default function AvailableNowSection() {
  const router = useRouter()
  const available = Object.values(USERS).filter(u => u.chatStatus === '지금 대화 가능')

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between px-5 mb-3">
        <div>
          <h2 className="font-bold text-charcoal-800 text-[15px]">지금 같이 버틸 사람</h2>
          <p className="text-[12px] text-charcoal-300 mt-0.5">비슷한 마음인 사람들이 있어요</p>
        </div>
        <span className="flex items-center gap-1 text-[12px] text-charcoal-500 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-charcoal-400 animate-pulse" />
          {available.length}명 대화 가능
        </span>
      </div>

      <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide pb-1">
        {available.map(user => (
          <div
            key={user.id}
            className="flex-shrink-0 w-44 bg-white rounded-2xl border border-charcoal-100 p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-charcoal-100 flex items-center justify-center">
                  <User size={18} className="text-charcoal-300" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-charcoal-700 border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold text-[13px] text-charcoal-800 leading-tight">{user.nickname}</p>
                <p className="text-[11px] text-charcoal-300 mt-0.5">이별 {user.daysSinceBreakup}일째</p>
              </div>
            </div>
            <p className="text-[12px] text-charcoal-500 font-medium mb-3">{user.status}</p>
            <button
              onClick={() => router.push(`/chat/${user.id}`)}
              className="w-full py-2 rounded-full bg-charcoal-800 text-white text-[12px] font-medium hover:bg-charcoal-900 transition"
            >
              말 걸어보기
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
