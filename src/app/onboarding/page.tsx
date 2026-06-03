'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { UserProfile, Gender, UserStatus, ChatStatus } from '@/lib/types'

const TOTAL_STEPS = 5

const STATUS_OPTIONS: { value: UserStatus; label: string; desc: string }[] = [
  { value: '이별했어요', label: '이별했어요', desc: '방금 헤어졌거나, 이별 이야기를 털어놓고 싶어요' },
  { value: '연락참기', label: '연락참기', desc: '전 애인에게 연락하고 싶은데 참고 있어요' },
  { value: '재회고민', label: '재회고민', desc: '다시 만날 수 있을지, 연락해도 될지 고민돼요' },
  { value: '위로받기', label: '위로받기', desc: '너무 힘들어서 누가 말해줬으면 해요' },
  { value: '대화친구', label: '대화친구', desc: '비슷한 상황의 사람과 대화하고 싶어요' },
]

const CHAT_OPTIONS: { value: ChatStatus; label: string; desc: string }[] = [
  { value: '지금 대화 가능', label: '지금 대화 가능', desc: '언제든 쪽지 보내도 괜찮아요' },
  { value: '천천히 답장', label: '천천히 답장', desc: '받긴 할게요, 답장은 조금 늦을 수 있어요' },
  { value: '쪽지 안 받아요', label: '쪽지 안 받아요', desc: '지금은 혼자 있고 싶어요' },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    nickname: '',
    daysSinceBreakup: '',
    gender: '' as Gender | '',
    age: '',
    showGender: true,
    showAge: true,
    status: '' as UserStatus | '',
    chatStatus: '' as ChatStatus | '',
  })

  const canNext = () => {
    if (step === 1) return form.nickname.trim().length > 0
    if (step === 2) return form.daysSinceBreakup.trim().length > 0
    if (step === 3) return form.gender !== ''
    if (step === 4) return form.status !== ''
    if (step === 5) return form.chatStatus !== ''
    return false
  }

  const handleNext = () => {
    if (step < TOTAL_STEPS) {
      setStep(s => s + 1)
    } else {
      const profile: UserProfile = {
        id: 'me',
        nickname: form.nickname,
        gender: form.gender as Gender,
        age: form.showAge && form.age ? parseInt(form.age) : '비공개',
        daysSinceBreakup: parseInt(form.daysSinceBreakup) || 1,
        status: form.status as UserStatus,
        chatStatus: form.chatStatus as ChatStatus,
        showGender: form.showGender,
        showAge: form.showAge,
        allowMessages: form.chatStatus !== '쪽지 안 받아요',
      }
      localStorage.setItem('wecando_profile', JSON.stringify(profile))
      router.replace('/home')
    }
  }

  const progress = (step / TOTAL_STEPS) * 100

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Header */}
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-6">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white shadow-sm text-[#888] hover:bg-warm-50 transition"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div className="flex-1 h-1.5 bg-warm-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-warm-400 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-xs text-[#888] font-medium">{step}/{TOTAL_STEPS}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-8 fade-in" key={step}>
        {step === 1 && (
          <div>
            <p className="text-xs text-warm-400 font-medium mb-2 tracking-wide uppercase">Step 1</p>
            <h1 className="text-2xl font-bold text-[#222] mb-2 leading-tight">
              어떤 이름으로<br />불러드릴까요?
            </h1>
            <p className="text-[#888] text-sm mb-8">여기서는 진짜 이름이 아니어도 괜찮아요.</p>
            <input
              type="text"
              value={form.nickname}
              onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))}
              placeholder="예: 연락참는중, 미련왕, 잠못드는밤"
              className="w-full bg-white rounded-2xl px-5 py-4 text-[#222] placeholder-[#CCC] text-base border-2 border-warm-100 focus:border-warm-400 focus:outline-none transition font-medium"
              maxLength={12}
              autoFocus
            />
            <p className="text-xs text-[#AAA] mt-3">최대 12자 · 언제든 바꿀 수 있어요</p>

            <div className="mt-8">
              <p className="text-xs text-[#AAA] mb-3">이런 닉네임은 어때요?</p>
              <div className="flex flex-wrap gap-2">
                {['새벽감성', '연락참는중', '미련왕', '잠못드는밤', '괜찮아질까', '새벽산책'].map(n => (
                  <button
                    key={n}
                    onClick={() => setForm(f => ({ ...f, nickname: n }))}
                    className="px-3 py-1.5 rounded-full bg-white border border-warm-100 text-sm text-[#888] hover:border-warm-400 hover:text-warm-500 transition"
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs text-warm-400 font-medium mb-2 tracking-wide uppercase">Step 2</p>
            <h1 className="text-2xl font-bold text-[#222] mb-2 leading-tight">
              이별한 지<br />얼마나 됐나요?
            </h1>
            <p className="text-[#888] text-sm mb-8">이별 {form.daysSinceBreakup ? `${form.daysSinceBreakup}일째` : 'N일째'}로 표시돼요.</p>

            <div className="flex items-center gap-3">
              <input
                type="number"
                value={form.daysSinceBreakup}
                onChange={e => setForm(f => ({ ...f, daysSinceBreakup: e.target.value }))}
                placeholder="0"
                min="0"
                max="9999"
                className="w-32 bg-white rounded-2xl px-5 py-4 text-[#222] placeholder-[#CCC] text-2xl font-bold text-center border-2 border-warm-100 focus:border-warm-400 focus:outline-none transition"
                autoFocus
              />
              <span className="text-xl font-medium text-[#888]">일째</span>
            </div>

            <div className="mt-8">
              <p className="text-xs text-[#AAA] mb-3">오늘 이별했나요?</p>
              <div className="flex flex-wrap gap-2">
                {['1', '3', '7', '14', '30', '60', '100'].map(n => (
                  <button
                    key={n}
                    onClick={() => setForm(f => ({ ...f, daysSinceBreakup: n }))}
                    className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                      form.daysSinceBreakup === n
                        ? 'bg-warm-400 text-white border-warm-400'
                        : 'bg-white border-warm-100 text-[#888] hover:border-warm-400'
                    }`}
                  >
                    {n}일
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <p className="text-xs text-warm-400 font-medium mb-2 tracking-wide uppercase">Step 3</p>
            <h1 className="text-2xl font-bold text-[#222] mb-2 leading-tight">
              당신을 어떻게<br />보여줄까요?
            </h1>
            <p className="text-[#888] text-sm mb-8">모두 비공개로 설정할 수 있어요.</p>

            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-[#555] mb-2">성별</p>
                <div className="flex gap-2">
                  {(['남성', '여성', '비공개'] as Gender[]).map(g => (
                    <button
                      key={g}
                      onClick={() => setForm(f => ({ ...f, gender: g, showGender: g !== '비공개' }))}
                      className={`flex-1 py-3 rounded-2xl border-2 text-sm font-medium transition ${
                        form.gender === g
                          ? 'bg-warm-400 text-white border-warm-400'
                          : 'bg-white border-warm-100 text-[#888] hover:border-warm-300'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-[#555]">나이</p>
                  <button
                    onClick={() => setForm(f => ({ ...f, showAge: !f.showAge, age: f.showAge ? '' : f.age }))}
                    className="text-xs text-warm-400 font-medium"
                  >
                    {form.showAge ? '비공개로 하기' : '공개하기'}
                  </button>
                </div>
                {form.showAge ? (
                  <input
                    type="number"
                    value={form.age}
                    onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                    placeholder="나이 입력"
                    min="18"
                    max="60"
                    className="w-full bg-white rounded-2xl px-5 py-4 text-[#222] placeholder-[#CCC] text-base border-2 border-warm-100 focus:border-warm-400 focus:outline-none transition"
                  />
                ) : (
                  <div className="w-full bg-warm-50 rounded-2xl px-5 py-4 text-[#AAA] text-sm border-2 border-warm-100">
                    비공개
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-xs text-warm-400 font-medium mb-2 tracking-wide uppercase">Step 4</p>
            <h1 className="text-2xl font-bold text-[#222] mb-2 leading-tight">
              지금 가장 가까운<br />마음은 무엇인가요?
            </h1>
            <p className="text-[#888] text-sm mb-8">나중에 바꿀 수 있어요.</p>

            <div className="space-y-2.5">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, status: opt.value }))}
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-left transition ${
                    form.status === opt.value
                      ? 'bg-warm-400 border-warm-400 text-white'
                      : 'bg-white border-warm-100 hover:border-warm-300'
                  }`}
                >
                  <p className={`font-semibold text-sm ${form.status === opt.value ? 'text-white' : 'text-[#222]'}`}>
                    {opt.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${form.status === opt.value ? 'text-white/80' : 'text-[#888]'}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="text-xs text-warm-400 font-medium mb-2 tracking-wide uppercase">Step 5</p>
            <h1 className="text-2xl font-bold text-[#222] mb-2 leading-tight">
              지금 누군가와<br />이야기할 수 있나요?
            </h1>
            <p className="text-[#888] text-sm mb-8">언제든 바꿀 수 있어요.</p>

            <div className="space-y-2.5">
              {CHAT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, chatStatus: opt.value }))}
                  className={`w-full px-5 py-4 rounded-2xl border-2 text-left transition ${
                    form.chatStatus === opt.value
                      ? 'bg-warm-400 border-warm-400 text-white'
                      : 'bg-white border-warm-100 hover:border-warm-300'
                  }`}
                >
                  <p className={`font-semibold text-sm ${form.chatStatus === opt.value ? 'text-white' : 'text-[#222]'}`}>
                    {opt.label}
                  </p>
                  <p className={`text-xs mt-0.5 ${form.chatStatus === opt.value ? 'text-white/80' : 'text-[#888]'}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {form.chatStatus && (
              <div className="mt-8 bg-warm-50 rounded-2xl px-5 py-4">
                <p className="text-sm text-[#888] leading-relaxed">
                  괜찮아요. 여기서는 천천히 말해도 돼요.<br />
                  <span className="text-warm-500 font-medium">{form.nickname}</span>님의 이야기를 기다리고 있어요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom button */}
      <div className="px-6 pb-10 pt-4">
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`w-full py-4 rounded-full text-base font-semibold transition flex items-center justify-center gap-2 ${
            canNext()
              ? 'bg-warm-500 text-white shadow-lg shadow-warm-200 hover:bg-warm-600'
              : 'bg-warm-100 text-warm-300 cursor-not-allowed'
          }`}
        >
          {step === TOTAL_STEPS ? '시작하기' : '다음'}
          {step < TOTAL_STEPS && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  )
}
