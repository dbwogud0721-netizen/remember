'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, User } from 'lucide-react'
import { USERS } from '@/lib/data'

const CHAT_STATUS_DOT: Record<string, string> = {
  '지금 대화 가능': 'bg-emerald-400',
  '천천히 답장': 'bg-yellow-400',
  '쪽지 안 받아요': 'bg-gray-300',
}

const STATUS_BADGE: Record<string, string> = {
  '연락참기': 'bg-rose-50 text-rose-600',
  '위로받기': 'bg-orange-50 text-orange-600',
  '대화친구': 'bg-emerald-50 text-emerald-600',
  '재회고민': 'bg-purple-50 text-purple-600',
  '이별했어요': 'bg-blue-50 text-blue-600',
}

interface Props {
  userId: string | null
  isOpen: boolean
  onClose: () => void
}

export default function ProfileSheet({ userId, isOpen, onClose }: Props) {
  const router = useRouter()
  const user = userId ? USERS[userId] : null

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  if (!isOpen || !user) return null

  const handleMessage = () => {
    onClose()
    router.push(`/chat/${user.id}`)
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end" style={{ maxWidth: 390, margin: '0 auto' }}>
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative bg-white rounded-t-[32px] px-6 pt-3 pb-10 sheet-enter shadow-2xl">
        {/* Handle */}
        <div className="w-10 h-1 bg-[#E0E0E0] rounded-full mx-auto mb-5" />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 flex items-center justify-center rounded-full bg-warm-50 text-[#888]"
        >
          <X size={16} />
        </button>

        {/* User info */}
        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-warm-50 flex items-center justify-center flex-shrink-0">
            <User size={24} className="text-warm-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-lg font-bold text-[#222]">{user.nickname}</h2>
              {user.status && (
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${STATUS_BADGE[user.status] || 'bg-warm-100 text-warm-500'}`}>
                  {user.status}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-[#888]">
              {user.showGender && <span>{user.gender}</span>}
              {user.showGender && user.showAge && <span>·</span>}
              {user.showAge && user.age !== '비공개' && <span>{user.age}세</span>}
              <span>·</span>
              <span className="text-warm-500 font-medium">이별 {user.daysSinceBreakup}일째</span>
            </div>
          </div>
        </div>

        {/* Chat status */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`w-2 h-2 rounded-full ${CHAT_STATUS_DOT[user.chatStatus]}`} />
          <span className="text-sm text-[#666]">{user.chatStatus}</span>
        </div>

        {/* Bio */}
        {user.bio && (
          <div className="bg-warm-50 rounded-2xl px-4 py-3 mb-5">
            <p className="text-sm text-[#555] leading-relaxed">"{user.bio}"</p>
          </div>
        )}

        {/* Divider */}
        <div className="h-px bg-[#F0F0F0] mb-5" />

        {/* Actions */}
        {user.allowMessages ? (
          <div className="space-y-2.5">
            <button
              onClick={handleMessage}
              className="w-full py-3.5 rounded-full bg-warm-500 text-white font-semibold text-sm shadow-lg shadow-warm-200 hover:bg-warm-600 transition"
            >
              위로쪽지 보내기
            </button>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full border-2 border-warm-200 text-warm-500 font-semibold text-sm hover:bg-warm-50 transition"
            >
              응원 남기기
            </button>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-sm text-[#AAA]">지금은 쪽지를 받지 않아요</p>
          </div>
        )}
      </div>
    </div>
  )
}
