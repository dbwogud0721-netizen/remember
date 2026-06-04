'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronRight, ChevronLeft } from 'lucide-react'
import { UserProfile, Gender, UserStatus, ChatStatus } from '@/lib/types'

const TOTAL_STEPS = 5

const STATUS_OPTIONS: { value: UserStatus; label: string; desc: string }[] = [
  { value: '차였음', label: '차였음', desc: '방금 차였거나, 이별 이야기를 털어놓고 싶어요' },
  { value: '이별함', label: '이별함', desc: '헤어진 지 얼마 됐고 감정 정리 중이에요' },
  { value: '연락참는중', label: '연락참는중', desc: '전 애인에게 연락하고 싶은데 참고 있어요' },
  { value: '재회기다림', label: '재회기다림', desc: '다시 만날 수 있을지, 연락해도 될지 고민돼요' },
  { value: '자유', label: '자유', desc: '이별 관련 뭐든 이야기하고 싶어요' },
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
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <div className="px-6 pt-14 pb-4">
        <div className="flex items-center gap-3 mb-6">
          {step > 1 && (
            <button
              onClick={() => setStep(s => s - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-charcoal-600 hover:bg-charcoal-50 transition"
            >
              <ChevronLeft size={18} />
            </button>
          )}
          <div className="flex-1 h-1 bg-charcoal-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-charcoal-800 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[12px] text-charcoal-400 font-medium">{step}/{TOTAL_STEPS}</span>
        </div>
      </div>

      <div className="flex-1 px-6 pb-8 fade-in" key={step}>
        {step === 1 && (
          <div>
            <p className="text-[11px] text-charcoal-400 font-medium mb-2 tracking-widest uppercase">Step 1</p>
            <h1 className="text-[24px] font-bold text-charcoal-800 mb-2 leading-tight font-serif">
              어떤 이름으로<br />불러드릴까요?
            </h1>
            <p className="text-charcoal-400 text-[13px] mb-8">여기서는 진짜 이름이 아니어도 괜찮아요.</p>
            <input
              type="text"
              value={form.nickname}
              onChange={e => setForm(f => ({ ...f, nickname: e.target.value }))}
              placeholder="예: 연락참는중, 미련왕, 잠못드는밤"
              className="w-full bg-white rounded-2xl px-5 py-4 text-charcoal-800 placeholder-charcoal-200 text-[15px] font-bold border border-charcoal-200 focus:border-charcoal-700 focus:outline-none transition"
              maxLength={12}
              autoFocus
            />
            <p className="text-[11px] text-charcoal-300 mt-3">최대 12자 · 언제든 바꿀 수 있어요</p>

          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-[11px] text-charcoal-400 font-medium mb-2 tracking-widest uppercase">Step 2</p>
            <h1 className="text-[24px] font-bold text-charcoal-800 mb-2 leading-tight font-serif">
              이별한 지<br />얼마나 됐나요?
            </h1>
            <p className="text-charcoal-400 text-[13px] mb-8">이별 {form.daysSinceBreakup ? `${form.daysSinceBreakup}일째` : 'N일째'}로 표시돼요.</p>

            <div className="flex items-center gap-3">
              <input
                type="number"
                value={form.daysSinceBreakup}
                onChange={e => setForm(f => ({ ...f, daysSinceBreakup: e.target.value }))}
                placeholder="0"
                min="0"
                max="9999"
                className="w-32 bg-white rounded-2xl px-5 py-4 text-charcoal-800 placeholder-charcoal-200 text-[24px] font-bold text-center border border-charcoal-200 focus:border-charcoal-700 focus:outline-none transition"
                autoFocus
              />
              <span className="text-[18px] font-medium text-charcoal-400">일째</span>
            </div>

            <div className="mt-8">
              <p className="text-[11px] text-charcoal-300 mb-3">오늘 이별했나요?</p>
              <div className="flex flex-wrap gap-2">
                {['1', '3', '7', '14', '30', '60', '100'].map(n => (
                  <button
                    key={n}
                    onClick={() => setForm(f => ({ ...f, daysSinceBreakup: n }))}
                    className={`px-4 py-2 rounded-full border text-[13px] font-medium transition ${
                      form.daysSinceBreakup === n
                        ? 'bg-charcoal-800 text-white border-charcoal-800'
                        : 'bg-white border-charcoal-200 text-charcoal-500 hover:border-charcoal-600'
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
            <p className="text-[11px] text-charcoal-400 font-medium mb-2 tracking-widest uppercase">Step 3</p>
            <h1 className="text-[24px] font-bold text-charcoal-800 mb-2 leading-tight font-serif">
              당신을 어떻게<br />보여줄까요?
            </h1>
            <p className="text-charcoal-400 text-[13px] mb-8">모두 비공개로 설정할 수 있어요.</p>

            <div className="space-y-4">
              <div>
                <p className="text-[13px] font-medium text-charcoal-600 mb-2">성별</p>
                <div className="flex gap-2">
                  {(['남성', '여성'] as Gender[]).map(g => (
                    <button
                      key={g}
                      onClick={() => setForm(f => ({ ...f, gender: g, showGender: true }))}
                      className={`flex-1 py-3 rounded-2xl border text-[13px] font-medium transition ${
                        form.gender === g
                          ? 'bg-charcoal-800 text-white border-charcoal-800'
                          : 'bg-white border-charcoal-200 text-charcoal-500 hover:border-charcoal-400'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="text-[13px] font-medium text-charcoal-600">나이</p>
                  <button
                    onClick={() => setForm(f => ({ ...f, showAge: !f.showAge, age: f.showAge ? '' : f.age }))}
                    className="text-[12px] text-charcoal-500 font-medium"
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
                    className="w-full bg-white rounded-2xl px-5 py-4 text-charcoal-800 placeholder-charcoal-200 text-[15px] border border-charcoal-200 focus:border-charcoal-700 focus:outline-none transition"
                  />
                ) : (
                  <div className="w-full bg-charcoal-50 rounded-2xl px-5 py-4 text-charcoal-300 text-[13px] border border-charcoal-100">
                    비공개
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <p className="text-[11px] text-charcoal-400 font-medium mb-2 tracking-widest uppercase">Step 4</p>
            <h1 className="text-[24px] font-bold text-charcoal-800 mb-2 leading-tight font-serif">
              지금 가장 가까운<br />마음은 무엇인가요?
            </h1>
            <p className="text-charcoal-400 text-[13px] mb-8">나중에 바꿀 수 있어요.</p>

            <div className="space-y-2.5">
              {STATUS_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, status: opt.value }))}
                  className={`w-full px-5 py-4 rounded-2xl border text-left transition ${
                    form.status === opt.value
                      ? 'bg-charcoal-800 border-charcoal-800 text-white'
                      : 'bg-white border-charcoal-100 hover:border-charcoal-300'
                  }`}
                >
                  <p className={`font-semibold text-[14px] ${form.status === opt.value ? 'text-white' : 'text-charcoal-800'}`}>
                    {opt.label}
                  </p>
                  <p className={`text-[12px] mt-0.5 ${form.status === opt.value ? 'text-white/70' : 'text-charcoal-400'}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <p className="text-[11px] text-charcoal-400 font-medium mb-2 tracking-widest uppercase">Step 5</p>
            <h1 className="text-[24px] font-bold text-charcoal-800 mb-2 leading-tight font-serif">
              지금 누군가와<br />이야기할 수 있나요?
            </h1>
            <p className="text-charcoal-400 text-[13px] mb-8">언제든 바꿀 수 있어요.</p>

            <div className="space-y-2.5">
              {CHAT_OPTIONS.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setForm(f => ({ ...f, chatStatus: opt.value }))}
                  className={`w-full px-5 py-4 rounded-2xl border text-left transition ${
                    form.chatStatus === opt.value
                      ? 'bg-charcoal-800 border-charcoal-800 text-white'
                      : 'bg-white border-charcoal-100 hover:border-charcoal-300'
                  }`}
                >
                  <p className={`font-semibold text-[14px] ${form.chatStatus === opt.value ? 'text-white' : 'text-charcoal-800'}`}>
                    {opt.label}
                  </p>
                  <p className={`text-[12px] mt-0.5 ${form.chatStatus === opt.value ? 'text-white/70' : 'text-charcoal-400'}`}>
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            {form.chatStatus && (
              <div className="mt-8 bg-charcoal-50 rounded-2xl px-5 py-4">
                <p className="text-[13px] text-charcoal-500 leading-relaxed">
                  괜찮아요. 여기서는 천천히 말해도 돼요.<br />
                  <span className="text-charcoal-700 font-medium">{form.nickname}</span>님의 이야기를 기다리고 있어요.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="px-6 pb-10 pt-4">
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className={`w-full py-4 rounded-full text-[15px] font-semibold transition flex items-center justify-center gap-2 ${
            canNext()
              ? 'bg-charcoal-800 text-white hover:bg-charcoal-900'
              : 'bg-charcoal-100 text-charcoal-300 cursor-not-allowed'
          }`}
        >
          {step === TOTAL_STEPS ? '시작하기' : '다음'}
          {step < TOTAL_STEPS && <ChevronRight size={18} />}
        </button>
      </div>
    </div>
  )
}
