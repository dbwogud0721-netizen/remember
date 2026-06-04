'use client'
export const dynamic = 'force-dynamic'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ToggleLeft, ToggleRight } from 'lucide-react'
import { WriteIntent, PostCategory } from '@/lib/types'
import { createPost } from '@/lib/db'

const INTENTS: { value: WriteIntent; label: string; emoji: string; category: PostCategory }[] = [
  { value: '그냥 털어놓기', label: '그냥 털어놓기', emoji: '💭', category: '이별했어요' },
  { value: '연락 말려줘', label: '연락 말려줘', emoji: '✋', category: '연락참기' },
  { value: '재회 조언', label: '재회 조언', emoji: '🤔', category: '재회고민' },
  { value: '위로받고 싶어요', label: '위로받고 싶어요', emoji: '🤗', category: '위로받기' },
  { value: '대화친구 찾기', label: '대화친구 찾기', emoji: '💬', category: '대화친구' },
]

export default function WritePage() {
  const router = useRouter()
  const [intent, setIntent] = useState<WriteIntent | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [allowMessages, setAllowMessages] = useState(true)
  const [showDays, setShowDays] = useState(true)
  const [showGender, setShowGender] = useState(true)
  const [showAge, setShowAge] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const selectedIntent = INTENTS.find(i => i.value === intent)

  const handleSubmit = async () => {
    if (!intent || !title.trim() || !content.trim()) return
    const profile = JSON.parse(localStorage.getItem('wecando_profile') || '{}')
    setSubmitted(true)
    try {
      await createPost({
        authorId: profile.id || 'anon',
        authorNickname: profile.nickname || '익명',
        authorLocation: '',
        authorStatus: profile.status || '',
        authorDays: profile.daysSinceBreakup || 0,
        category: selectedIntent?.category || '이별했어요',
        title: title.trim(),
        content: content.trim(),
        allowMessages,
      })
    } catch (e) { console.error(e) }
    setTimeout(() => router.push('/home'), 1200)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center px-6">
        <div className="text-center fade-in">
          <div className="w-16 h-16 rounded-full bg-charcoal-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-[17px] font-bold text-charcoal-800 font-serif mb-2">이야기가 올라갔어요</h2>
          <p className="text-[13px] text-charcoal-400">누군가가 곧 따뜻한 말을 남겨줄 거예요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9F9F9] flex flex-col">
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-[#F9F9F9] sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center text-charcoal-600"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <h1 className="font-bold text-[15px] text-charcoal-800 flex-1">이야기 올리기</h1>
        <button
          onClick={handleSubmit}
          disabled={!intent || !title.trim() || !content.trim()}
          className={`px-4 py-1.5 rounded-full text-[13px] font-semibold transition ${
            intent && title.trim() && content.trim()
              ? 'bg-charcoal-800 text-white'
              : 'bg-charcoal-100 text-charcoal-300'
          }`}
        >
          올리기
        </button>
      </div>

      <div className="px-5 pb-8 space-y-5 overflow-y-auto">
        <div>
          <div className="flex gap-2 flex-wrap">
            {INTENTS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setIntent(opt.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-[13px] font-medium transition ${
                  intent === opt.value
                    ? 'bg-charcoal-800 border-charcoal-800 text-white'
                    : 'bg-white border-charcoal-200 text-charcoal-500 hover:border-charcoal-400'
                }`}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedIntent && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[11px] text-charcoal-300">카테고리:</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-charcoal-100 text-charcoal-500 font-medium">
                {selectedIntent.category}
              </span>
            </div>
          )}
        </div>

        <div>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해요"
            maxLength={50}
            className="w-full bg-white rounded-2xl px-5 py-4 text-charcoal-800 placeholder-charcoal-200 text-[15px] font-bold border border-charcoal-100 focus:border-charcoal-400 focus:outline-none transition"
          />
        </div>

        <div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="지금 느끼는 것들을 자유롭게 써도 괜찮아요. 여기서는 판단하지 않아요."
            rows={8}
            className="w-full bg-white rounded-2xl px-5 py-4 text-charcoal-700 placeholder-charcoal-200 text-[14px] leading-relaxed border border-charcoal-100 focus:border-charcoal-400 focus:outline-none transition resize-none"
          />
          <p className="text-right text-[11px] text-charcoal-300 mt-1">{content.length}자</p>
        </div>

        <div className="bg-white rounded-2xl border border-charcoal-100 px-5 py-4 space-y-4">
          <p className="text-[13px] font-semibold text-charcoal-700 mb-1">옵션</p>

          {[
            { label: '위로쪽지 받기', desc: '다른 사람이 쪽지를 보낼 수 있어요', val: allowMessages, set: setAllowMessages },
            { label: '이별 며칠째 표시', desc: '', val: showDays, set: setShowDays },
            { label: '성별 표시', desc: '', val: showGender, set: setShowGender },
            { label: '나이 표시', desc: '', val: showAge, set: setShowAge },
          ].map(({ label, desc, val, set }) => (
            <div key={label} className="flex items-center justify-between">
              <div>
                <p className="text-[13px] text-charcoal-600">{label}</p>
                {desc && <p className="text-[11px] text-charcoal-300">{desc}</p>}
              </div>
              <button onClick={() => set(v => !v)} className={val ? 'text-charcoal-700' : 'text-charcoal-200'}>
                {val ? <ToggleRight size={26} /> : <ToggleLeft size={26} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
