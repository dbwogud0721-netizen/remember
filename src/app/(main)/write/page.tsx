'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ToggleLeft, ToggleRight } from 'lucide-react'
import { WriteIntent, PostCategory } from '@/lib/types'

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

  const handleSubmit = () => {
    if (!intent || !title.trim() || !content.trim()) return
    setSubmitted(true)
    setTimeout(() => router.push('/home'), 1500)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
        <div className="text-center fade-in">
          <div className="w-16 h-16 rounded-full bg-warm-100 flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">✉️</span>
          </div>
          <h2 className="text-lg font-bold text-[#222] mb-2">이야기가 올라갔어요</h2>
          <p className="text-sm text-[#888]">누군가가 곧 따뜻한 말을 남겨줄 거예요</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-ivory flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-ivory sticky top-0 z-10">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-[#888]"
        >
          <ChevronLeft size={18} />
        </button>
        <h1 className="font-bold text-base text-[#222] flex-1">이야기 올리기</h1>
        <button
          onClick={handleSubmit}
          disabled={!intent || !title.trim() || !content.trim()}
          className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
            intent && title.trim() && content.trim()
              ? 'bg-warm-500 text-white'
              : 'bg-warm-100 text-warm-300'
          }`}
        >
          올리기
        </button>
      </div>

      <div className="px-5 pb-8 space-y-5 overflow-y-auto">
        {/* Intent selection */}
        <div>
          <p className="text-sm font-semibold text-[#222] mb-3">어떤 마음으로 글을 쓰나요?</p>
          <div className="flex gap-2 flex-wrap">
            {INTENTS.map(opt => (
              <button
                key={opt.value}
                onClick={() => setIntent(opt.value)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 text-sm font-medium transition ${
                  intent === opt.value
                    ? 'bg-warm-500 border-warm-500 text-white'
                    : 'bg-white border-warm-100 text-[#666] hover:border-warm-300'
                }`}
              >
                <span>{opt.emoji}</span>
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
          {selectedIntent && (
            <div className="mt-2 flex items-center gap-2">
              <span className="text-xs text-[#AAA]">카테고리:</span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-500 font-medium">
                {selectedIntent.category}
              </span>
            </div>
          )}
        </div>

        {/* Title */}
        <div>
          <input
            type="text"
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="제목을 입력해요"
            maxLength={50}
            className="w-full bg-white rounded-2xl px-5 py-4 text-[#222] placeholder-[#CCC] text-base font-semibold border-2 border-warm-100 focus:border-warm-400 focus:outline-none transition"
          />
        </div>

        {/* Content */}
        <div>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            placeholder="지금 느끼는 것들을 자유롭게 써도 괜찮아요. 여기서는 판단하지 않아요."
            rows={8}
            className="w-full bg-white rounded-2xl px-5 py-4 text-[#222] placeholder-[#CCC] text-sm leading-relaxed border-2 border-warm-100 focus:border-warm-400 focus:outline-none transition resize-none"
          />
          <p className="text-right text-xs text-[#CCC] mt-1">{content.length}자</p>
        </div>

        {/* Options */}
        <div className="bg-white rounded-3xl shadow-card px-5 py-4 space-y-4">
          <p className="text-sm font-semibold text-[#222] mb-1">옵션</p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#444]">위로쪽지 받기</p>
              <p className="text-xs text-[#AAA]">다른 사람이 쪽지를 보낼 수 있어요</p>
            </div>
            <button onClick={() => setAllowMessages(v => !v)} className="text-warm-400">
              {allowMessages ? <ToggleRight size={28} /> : <ToggleLeft size={28} className="text-[#DDD]" />}
            </button>
          </div>

          <div className="h-px bg-[#F5F5F5]" />

          <p className="text-xs text-[#AAA] font-medium">내 프로필 정보 표시</p>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#444]">이별 며칠째 표시</p>
            <button onClick={() => setShowDays(v => !v)} className="text-warm-400">
              {showDays ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDD]" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#444]">성별 표시</p>
            <button onClick={() => setShowGender(v => !v)} className="text-warm-400">
              {showGender ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDD]" />}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-[#444]">나이 표시</p>
            <button onClick={() => setShowAge(v => !v)} className="text-warm-400">
              {showAge ? <ToggleRight size={24} /> : <ToggleLeft size={24} className="text-[#DDD]" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
