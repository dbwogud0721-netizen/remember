'use client'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { USERS } from '@/lib/data'

const STATUS_COLORS: Record<string, string> = {
  '연락참기': 'text-rose-500',
  '위로받기': 'text-orange-500',
  '대화친구': 'text-emerald-500',
  '재회고민': 'text-purple-500',
  '이별했어요': 'text-blue-500',
}

export default function AvailableNowSection() {
  const router = useRouter()
  const available = Object.values(USERS).filter(u => u.chatStatus === '지금 대화 가능')

  return (
    <div className="mb-5">
      <div className="flex items-center justify-between px-5 mb-3">
        <div>
          <h2 className="font-bold text-[#222] text-base">지금 같이 버틸 사람</h2>
          <p className="text-xs text-[#AAA] mt-0.5">비슷한 마음인 사람들이 있어요</p>
        </div>
        <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          {available.length}명 대화 가능
        </span>
      </div>

      <div className="flex gap-3 px-5 overflow-x-auto scrollbar-hide pb-1">
        {available.map(user => (
          <div
            key={user.id}
            className="flex-shrink-0 w-48 bg-white rounded-3xl shadow-card p-4"
          >
            {/* Avatar + status */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-warm-50 flex items-center justify-center">
                  <User size={18} className="text-warm-300" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-white" />
              </div>
              <div>
                <p className="font-semibold text-sm text-[#222] leading-tight">{user.nickname}</p>
                <p className="text-xs text-[#AAA] mt-0.5">
                  {user.showGender ? user.gender : ''}
                  {user.showGender && user.showAge && user.age !== '비공개' ? ` · ${user.age}세` : ''}
                </p>
              </div>
            </div>

            {/* Days + status */}
            <div className="mb-3">
              <span className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-500 font-medium">
                이별 {user.daysSinceBreakup}일째
              </span>
              <p className={`text-xs font-medium mt-1.5 ${STATUS_COLORS[user.status] || 'text-[#888]'}`}>
                {user.status} 중
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => router.push(`/chat/${user.id}`)}
              className="w-full py-2 rounded-full bg-warm-400 text-white text-xs font-semibold hover:bg-warm-500 transition"
            >
              말 걸어보기
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
