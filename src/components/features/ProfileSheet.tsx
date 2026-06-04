'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { X, User } from 'lucide-react'
import { USERS } from '@/lib/data'

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
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative bg-white rounded-t-[28px] px-6 pt-3 pb-10 sheet-enter shadow-2xl">
        <div className="w-10 h-1 bg-charcoal-200 rounded-full mx-auto mb-5" />

        <button
          onClick={onClose}
          className="absolute right-5 top-5 w-8 h-8 flex items-center justify-center rounded-full bg-charcoal-100 text-charcoal-500"
        >
          <X size={16} />
        </button>

        <div className="flex items-start gap-4 mb-5">
          <div className="w-14 h-14 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0">
            <User size={24} className="text-charcoal-300" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h2 className="text-[17px] font-bold text-charcoal-800 font-serif">{user.nickname}</h2>
              {user.status && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-500 font-medium">
                  {user.status}
                </span>
              )}
            </div>
            <div className="flex items-center gap-1.5 text-[13px] text-charcoal-400">
              {user.showGender && <span>{user.gender}</span>}
              {user.showGender && user.showAge && <span>·</span>}
              {user.showAge && user.age !== '비공개' && <span>{user.age}세</span>}
              <span>·</span>
              <span className="text-charcoal-600 font-medium">이별 {user.daysSinceBreakup}일째</span>
            </div>
          </div>
        </div>

        {user.bio && (
          <div className="bg-charcoal-50 rounded-2xl px-4 py-3 mb-5">
            <p className="text-[13px] text-charcoal-500 leading-relaxed">"{user.bio}"</p>
          </div>
        )}

        <div className="h-px bg-charcoal-100 mb-5" />

        {user.allowMessages ? (
          <div className="space-y-2.5">
            <button
              onClick={handleMessage}
              className="w-full py-3.5 rounded-full bg-charcoal-800 text-white font-semibold text-[14px] hover:bg-charcoal-900 transition"
            >
              위로쪽지 보내기
            </button>
            <button
              onClick={onClose}
              className="w-full py-3.5 rounded-full border border-charcoal-200 text-charcoal-500 font-medium text-[14px] hover:bg-charcoal-50 transition"
            >
              응원 남기기
            </button>
          </div>
        ) : (
          <div className="text-center py-3">
            <p className="text-[13px] text-charcoal-300">지금은 쪽지를 받지 않아요</p>
          </div>
        )}
      </div>
    </div>
  )
}
