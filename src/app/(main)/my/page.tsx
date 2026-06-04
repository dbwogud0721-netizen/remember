'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, Edit3 } from 'lucide-react'
import { UserProfile, ChatStatus, UserStatus } from '@/lib/types'

const CHAT_STATUS_OPTS: ChatStatus[] = ['지금 대화 가능', '천천히 답장', '쪽지 안 받아요']
const STATUS_OPTS: UserStatus[] = ['차였음', '이별함', '연락참는중', '재회기다림', '환승함', '자유']

export default function MyPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [editing, setEditing] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('wecando_profile')
    if (stored) setProfile(JSON.parse(stored))
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
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <p className="text-charcoal-300 text-[13px]">불러오는 중...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="px-5 pt-14 pb-6">
        <h1 className="text-[20px] font-bold text-charcoal-800 font-serif">마이페이지</h1>
      </div>

      {/* Profile card */}
      <div className="mx-4 mb-4">
        <div className="bg-white rounded-2xl border border-charcoal-100 px-6 py-5">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 rounded-full bg-charcoal-100 flex items-center justify-center text-xl">
              🌙
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h2 className="text-[17px] font-bold text-charcoal-800 font-serif">{profile.nickname}</h2>
                <button
                  onClick={() => setEditing('nickname')}
                  className="w-6 h-6 flex items-center justify-center rounded-full bg-charcoal-100 text-charcoal-400"
                >
                  <Edit3 size={11} />
                </button>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {profile.showGender && <span className="text-[12px] text-charcoal-400">{profile.gender}</span>}
                {profile.showAge && profile.age !== '비공개' && (
                  <>
                    <span className="text-charcoal-200">·</span>
                    <span className="text-[12px] text-charcoal-400">{profile.age}세</span>
                  </>
                )}
                <span className="text-charcoal-200">·</span>
                <span className="text-[12px] text-charcoal-600 font-medium">이별 {profile.daysSinceBreakup}일째</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-charcoal-50">
            <span className="text-[13px] text-charcoal-400">현재 상태</span>
            <span className="text-[13px] font-semibold text-charcoal-700">{profile.status}</span>
          </div>

          <div className="flex items-center justify-between py-3 border-t border-charcoal-50">
            <span className="text-[13px] text-charcoal-400">대화 가능 여부</span>
            <span className="text-[13px] font-medium text-charcoal-600">{profile.chatStatus}</span>
          </div>
        </div>
      </div>

      <div className="mx-4 space-y-3 mb-5">
        {editing === 'nickname' && (
          <div className="bg-white rounded-2xl border border-charcoal-100 px-5 py-4">
            <p className="text-[13px] font-semibold text-charcoal-700 mb-3">닉네임 변경</p>
            <input
              type="text"
              defaultValue={profile.nickname}
              maxLength={12}
              className="w-full border border-charcoal-200 focus:border-charcoal-500 rounded-xl px-4 py-3 text-[13px] text-charcoal-800 outline-none transition"
              autoFocus
            />
            <div className="flex gap-2 mt-3">
              <button onClick={() => setEditing(null)} className="flex-1 py-2 rounded-full border border-charcoal-200 text-[13px] text-charcoal-400">취소</button>
              <button
                onClick={e => {
                  const inp = (e.currentTarget.closest('.bg-white') as HTMLElement)?.querySelector('input') as HTMLInputElement
                  if (inp) updateProfile({ nickname: inp.value })
                }}
                className="flex-1 py-2 rounded-full bg-charcoal-800 text-white text-[13px] font-medium"
              >저장</button>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-charcoal-100 px-5 py-4">
          <p className="text-[13px] font-semibold text-charcoal-700 mb-3">현재 상태</p>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTS.map(s => (
              <button
                key={s}
                onClick={() => updateProfile({ status: s })}
                className={`px-3 py-1.5 rounded-full border text-[12px] font-medium transition ${
                  profile.status === s
                    ? 'bg-charcoal-800 border-charcoal-800 text-white'
                    : 'bg-white border-charcoal-200 text-charcoal-500 hover:border-charcoal-400'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 px-5 py-4">
          <p className="text-[13px] font-semibold text-charcoal-700 mb-3">대화 가능 여부</p>
          <div className="space-y-2">
            {CHAT_STATUS_OPTS.map(s => (
              <button
                key={s}
                onClick={() => updateProfile({ chatStatus: s, allowMessages: s !== '쪽지 안 받아요' })}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition ${
                  profile.chatStatus === s
                    ? 'border-charcoal-700 bg-charcoal-800 text-white'
                    : 'border-charcoal-100 bg-white hover:border-charcoal-300 text-charcoal-600'
                }`}
              >
                <span className={`w-2 h-2 rounded-full flex-shrink-0 ${
                  s === '지금 대화 가능' ? 'bg-charcoal-400' :
                  s === '천천히 답장' ? 'bg-charcoal-300' : 'bg-charcoal-200'
                } ${profile.chatStatus === s ? 'bg-white' : ''}`} />
                <span className="text-[13px] font-medium">{s}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 px-5 py-4">
          <p className="text-[13px] font-semibold text-charcoal-700 mb-3">공개 설정</p>
          <div className="space-y-3">
            {[
              { label: '성별 공개', key: 'showGender' as keyof UserProfile },
              { label: '나이 공개', key: 'showAge' as keyof UserProfile },
            ].map(item => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-[13px] text-charcoal-500">{item.label}</span>
                <button
                  onClick={() => updateProfile({ [item.key]: !profile[item.key] } as Partial<UserProfile>)}
                  className={`w-11 h-6 rounded-full transition-colors relative ${
                    profile[item.key] ? 'bg-charcoal-800' : 'bg-charcoal-200'
                  }`}
                >
                  <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    profile[item.key] ? 'left-6' : 'left-1'
                  }`} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mx-4 space-y-2 mb-8">
        <button
          onClick={() => setEditing(editing === 'nickname' ? null : 'nickname')}
          className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-charcoal-100 text-[13px] text-charcoal-600"
        >
          <span>닉네임 수정</span>
          <ChevronRight size={15} className="text-charcoal-300" />
        </button>
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-5 py-4 bg-white rounded-2xl border border-charcoal-100 text-[13px] text-charcoal-400"
        >
          <span>처음으로 돌아가기</span>
          <ChevronRight size={15} className="text-charcoal-200" />
        </button>
      </div>
    </div>
  )
}
