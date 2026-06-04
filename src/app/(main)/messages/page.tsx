'use client'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { CHAT_ROOMS, USERS } from '@/lib/data'
import AvailableNowSection from '@/components/features/AvailableNowSection'

export default function MessagesPage() {
  const router = useRouter()
  const totalUnread = CHAT_ROOMS.reduce((sum, r) => sum + r.unreadCount, 0)

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="px-5 pt-14 pb-4 bg-[#F9F9F9]">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[20px] font-bold text-charcoal-800 font-serif">위로쪽지</h1>
            <p className="text-[12px] text-charcoal-300 mt-0.5">비슷한 마음의 사람들과의 대화</p>
          </div>
          {totalUnread > 0 && (
            <span className="px-3 py-1 rounded-full bg-charcoal-800 text-white text-[12px] font-semibold">
              {totalUnread}개 안읽음
            </span>
          )}
        </div>
      </div>

      <div className="mb-2">
        <AvailableNowSection />
      </div>

      <div className="px-5 mb-3">
        <p className="text-[14px] font-bold text-charcoal-700">대화 중인 쪽지</p>
      </div>

      <div className="px-4 space-y-2">
        {CHAT_ROOMS.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-[13px] text-charcoal-300">아직 대화가 없어요</p>
            <p className="text-[12px] text-charcoal-200 mt-1">글에서 쪽지 보내기를 눌러보세요</p>
          </div>
        ) : (
          CHAT_ROOMS.map(room => {
            const user = USERS[room.participantId]
            if (!user) return null
            return (
              <button
                key={room.id}
                onClick={() => router.push(`/chat/${user.id}`)}
                className="w-full bg-white rounded-2xl border border-charcoal-100 px-4 py-4 text-left hover:border-charcoal-200 transition"
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-11 h-11 rounded-full bg-charcoal-100 flex items-center justify-center">
                      <User size={18} className="text-charcoal-300" />
                    </div>
                    {user.chatStatus === '지금 대화 가능' && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-charcoal-700 border-2 border-white" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[14px] text-charcoal-800">{user.nickname}</span>
                        <span className="text-[11px] text-charcoal-400">이별 {user.daysSinceBreakup}일째</span>
                      </div>
                      <span className="text-[11px] text-charcoal-300 flex-shrink-0">{room.lastMessageAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-[12px] text-charcoal-400 truncate flex-1">{room.lastMessage}</p>
                      {room.unreadCount > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-charcoal-800 text-white text-[10px] font-bold flex items-center justify-center">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            )
          })
        )}
      </div>
    </div>
  )
}
