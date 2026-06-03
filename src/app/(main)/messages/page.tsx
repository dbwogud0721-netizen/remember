'use client'
import { useRouter } from 'next/navigation'
import { User } from 'lucide-react'
import { CHAT_ROOMS, USERS } from '@/lib/data'
import AvailableNowSection from '@/components/features/AvailableNowSection'

const CHAT_STATUS_DOT: Record<string, string> = {
  '지금 대화 가능': 'bg-emerald-400',
  '천천히 답장': 'bg-yellow-400',
  '쪽지 안 받아요': 'bg-gray-300',
}

export default function MessagesPage() {
  const router = useRouter()
  const totalUnread = CHAT_ROOMS.reduce((sum, r) => sum + r.unreadCount, 0)

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[#222]">위로쪽지</h1>
            <p className="text-xs text-[#AAA] mt-0.5">비슷한 마음의 사람들과의 대화</p>
          </div>
          {totalUnread > 0 && (
            <span className="px-3 py-1 rounded-full bg-warm-400 text-white text-xs font-semibold">
              {totalUnread}개 안읽음
            </span>
          )}
        </div>
      </div>

      {/* Available now section */}
      <div className="-mx-0 mb-2">
        <AvailableNowSection />
      </div>

      {/* Divider */}
      <div className="px-5 mb-4">
        <p className="text-sm font-bold text-[#222]">대화 중인 쪽지</p>
      </div>

      {/* Chat rooms */}
      <div className="px-4 space-y-2.5">
        {CHAT_ROOMS.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-full bg-warm-50 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✉️</span>
            </div>
            <p className="text-sm text-[#AAA]">아직 대화가 없어요</p>
            <p className="text-xs text-[#CCC] mt-1">글에서 "위로쪽지 보내기"를 눌러보세요</p>
          </div>
        ) : (
          CHAT_ROOMS.map(room => {
            const user = USERS[room.participantId]
            if (!user) return null
            return (
              <button
                key={room.id}
                onClick={() => router.push(`/chat/${user.id}`)}
                className="w-full bg-white rounded-3xl shadow-card px-5 py-4 text-left hover:shadow-card-hover transition"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-warm-50 flex items-center justify-center">
                      <User size={20} className="text-warm-300" />
                    </div>
                    <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${CHAT_STATUS_DOT[user.chatStatus]}`} />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-sm text-[#222]">{user.nickname}</span>
                        <span className="text-xs text-warm-400 font-medium">이별 {user.daysSinceBreakup}일째</span>
                      </div>
                      <span className="text-xs text-[#CCC] flex-shrink-0">{room.lastMessageAt}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-xs text-[#888] truncate flex-1">{room.lastMessage}</p>
                      {room.unreadCount > 0 && (
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-warm-400 text-white text-[10px] font-bold flex items-center justify-center">
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1">
                      {user.showGender && <span className="text-xs text-[#CCC]">{user.gender}</span>}
                      {user.showAge && user.age !== '비공개' && (
                        <>
                          <span className="text-xs text-[#CCC]">·</span>
                          <span className="text-xs text-[#CCC]">{user.age}세</span>
                        </>
                      )}
                      <span className="text-xs text-[#CCC]">·</span>
                      <span className="text-xs text-[#CCC]">{user.status}</span>
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
