'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Edit3 } from 'lucide-react'
import { UserProfile, ChatStatus, UserStatus } from '@/lib/types'

const CHAT_STATUS_OPTS: ChatStatus[] = ['지금 대화 가능', '천천히 답장', '쪽지 안 받아요']
const STATUS_OPTS: UserStatus[] = ['이별했어요', '연락참기', '재회고민', '위로받기', '대화친구']

const CHAT_STATUS_DOT: Record<string, string> = {
  '지금 대화 가능': 'bg-emerald-400',
  '천천히 답장': 'bg-yellow-400',
  '쪽지 안 받아요': 'bg-gray-300',
}

export default function MyPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [editing, setEditing] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('wecando_profile')
    if (stored) {
      setProfile(JSON.parse(stored))
    }
  }, [])

  const updateProfile = (updates: Partial<UserProfile>) => {
    if (!profile) return
    const updated = { ...profile, ...updates }
    localStorage.setItem('wecando_profile', JSON.stringify(updated))
    setProfile(updated)
    setEditing(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('wecando_profile')
    router.replace('/onboarding')
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-[#AAA] text-sm">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-xl font-bold text-[#222]">마이</h1>
      </div>

      {/* Profile card */}
      <div className="mx-4 mb-5">
        <div className="bg-white rounded-3xl shadow-card px-6 py-6">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center text-2xl">
              🌸
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-[#222]">{profile.nickname}</h2>
                <button
                  onClick={() => setEditing('nickname')}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-warm-50 text-warm-400"
                >
                  <Edit3 size={12} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {profile.showGender && <span className="text-sm text-[#888]">{profile.gender}</span>}
                {profile.showAge && profile.age !== '비공개' && (
                  <>
                    <span className="text-[#DDD]">·</span>
                    <span className="text-sm text-[#888]">{profile.age}세</span>
                  </>
                )}
                <span className="text-[#DDD]">·</span>
                <span className="text-sm text-warm-500 font-medium">이별 {profile.daysSinceBreakup}일째</span>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center justify-between py-3 border-t border-[#F5F5F5]">
            <span className="text-sm text-[#666]">현재 상태</span>
            <span className="text-sm font-semibold text-warm-500">{profile.status}</span>
          </div>

          {/* Chat status */}
          <div className="flex items-center justify-between py-3 border-t border-[#F5F5F5]">
            <span className="text-sm text-[#666]">대화 가능 여부</span>
            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${CHAT_STATUS_DOT[profile.chatStatus]}`} />
              <span className="text-sm font-medium text-[#444]">{profile.chatStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Edit sections */}
      <div className="mx-4 space-y-3 mb-5">
        {/* Nickname edit */}
        {editing === 'nickname' && (
          <div className="bg-white rounded-3xl shadow-card px-5 py-4">
            <p className="text-sm font-semibold text-[#222] mb-3">닉네임 변경</p>
            <input
              type="text"
              defaultValue={profile.nickname}
              maxLength={12}
              className="w-full border-2 border-warm-100 focus:border-warm-400 rounded-2xl px-4 py-3 text-sm outline-none transition"
              onKeyDown={e => {
                if (e.key === 'Enter') updateProfile({ nickname: (e.target as HTMLInputElement).value })
              }}
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button onClick={() => setEditing(null)} className="flex-1 py-2 rounded-full border border-[#EEE] text-sm text-[#888]">취소</button>
              <button
                onClick={e => {
                  const inp = (e.currentTarget.closest('.bg-white') as HTMLElement)?.querySelector('input') as HTMLInputElement
                  if (inp) updateProfile({ nickname: inp.value })
                }}
                className="flex-1 py-2 rounded-full bg-warm-500 text-white text-sm font-medium"
              >저장</button>
            </div>
          </div>
        )}

        {/* Status change */}
        <div className="bg-white rounded-3xl shadow-card px-5 py-4">
          <p className="text-sm font-semibold text-[#222] mb-3">현재 상태 변경</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTS.map(s => (
              <button
                key={s}
                onClick={() => updateProfile({ status: s })}
                className={`px-3 py-1.5 rounded-full border text-xs font-medium transition ${
                  profile.status === s
                    ? 'bg-warm-500 border-warm-500 text-white'
                    : 'bg-white border-warm-100 text-[#666] hover:border-warm-300'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Chat status change */}
        <div className="bg-white rounded-3xl shadow-card px-5 py-4">
          <p className="text-sm font-semibold text-[#222] mb-3">대화 가능 여부</p>
          <div className="space-y-2">
            {CHAT_STATUS_OPTS.map(s => (
              <button
                key={s}
                onClick={() => updateProfile({ chatStatus: s, allowMessages: s !== '쪽지 안 받아요' })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl border-2 text-left transition ${
                  profile.chatStatus === s
                    ? 'border-warm-400 bg-warm-50'
                    : 'border-warm-100 bg-white hover:border-warm-200'
                }`}
              >
                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${CHAT_STATUS_DOT[s]}`} />
                <span className={`text-sm font-medium ${profile.chatStatus === s ? 'text-warm-600' : 'text-[#555]'}`}>{s}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Privacy */}
        <div className="bg-white rounded-3xl shadow-card px-5 py-4">
          <p className="text-sm font-semibold text-[#222] mb-3">공개 설정</p>
          <div className="space-y-3">
            {[
              { label: '성별 공개', key: 'showGender' as keyof UserProfile },
              { label: '나이 공개', key: 'showAge' as keyof UserProfile },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm text-[#555]">{item.label}</span>
                <button
                  onClick={() => updateProfile({ [item.key]: !profile[item.key] } as Partial<UserProfile>)}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    profile[item.key] ? 'bg-warm-400' : 'bg-[#DDD]'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    profile[item.key] ? 'left-7' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mx-4 space-y-2 mb-8">
        <button
          onClick={() => setEditing(editing === 'nickname' ? null : 'nickname')}
          className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-card text-sm text-[#444]"
        >
          <span>닉네임 수정</span>
          <ChevronRight size={16} className="text-[#CCC]" />
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-card text-sm text-rose-400"
        >
          <span>처음으로 돌아가기</span>
          <ChevronRight size={16} className="text-rose-300" />
        </button>
      </div>
    </div>
  )
}
