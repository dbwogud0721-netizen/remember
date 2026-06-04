'use client'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { POSTS } from '@/lib/data'
import { PostCategory } from '@/lib/types'

const CATEGORIES: { value: PostCategory; desc: string }[] = [
  {
    value: '이별했어요',
    desc: '방금 헤어졌거나 이별 이야기를 털어놓는 곳.',
  },
  {
    value: '연락참기',
    desc: '전 애인에게 연락하고 싶을 때 말려달라고 올리는 곳. 체류시간과 댓글 유도에 가장 좋음.',
  },
  {
    value: '재회고민',
    desc: '다시 만날 수 있을지, 연락해도 될지 고민하는 곳.',
  },
  {
    value: '위로받기',
    desc: '그냥 너무 힘들어서 누가 말해줬으면 할 때 쓰는 곳.',
  },
  {
    value: '대화친구',
    desc: '너무 노골적인 만남 느낌 없이, 비슷한 상황의 사람과 쪽지나 대화로 이어질 수 있는 곳.',
  },
]

export default function CategoryPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="px-5 pt-14 pb-5">
        <h1 className="text-[20px] font-bold text-charcoal-800 font-serif mb-1">카테고리</h1>
        <p className="text-[13px] text-charcoal-400">각 카테고리 느낌은 명확해.</p>
      </div>

      <div className="px-4 space-y-2">
        {CATEGORIES.map(cat => {
          const count = POSTS.filter(p => p.category === cat.value).length
          return (
            <button
              key={cat.value}
              onClick={() => router.push(`/home?category=${encodeURIComponent(cat.value)}`)}
              className="w-full bg-white rounded-2xl border border-charcoal-100 px-5 py-4 text-left hover:border-charcoal-300 transition group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="font-bold text-[15px] text-charcoal-800 font-serif mb-1">{cat.value}</p>
                  <p className="text-[13px] text-charcoal-400 leading-relaxed">{cat.desc}</p>
                </div>
                <div className="flex flex-col items-end gap-1 flex-shrink-0 mt-0.5">
                  <span className="text-[12px] text-charcoal-300">{count}개</span>
                  <ChevronRight size={15} className="text-charcoal-200 group-hover:text-charcoal-400 transition" />
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
