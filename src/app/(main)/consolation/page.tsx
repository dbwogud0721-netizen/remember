'use client'
import { useRouter } from 'next/navigation'
import { Heart, Bookmark, MessageCircle, ChevronRight } from 'lucide-react'
import { POSTS, USERS, COMMENTS, CATEGORY_COLORS } from '@/lib/data'

const RECEIVED_COMMENTS = COMMENTS.filter(c => ['1', '2', '5'].includes(c.id))

const TAB_ITEMS = [
  { id: 'received', label: '받은 위로', icon: Heart },
  { id: 'saved', label: '저장한 글', icon: Bookmark },
  { id: 'warmWords', label: '따뜻한 댓글', icon: MessageCircle },
]

export default function ConsolationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-xl font-bold text-[#222]">위로상자</h1>
        <p className="text-xs text-[#AAA] mt-0.5">나에게 온 따뜻한 것들을 모아요</p>
      </div>

      {/* Daily comfort */}
      <div className="mx-4 mb-5">
        <div className="bg-gradient-to-br from-warm-400 to-warm-500 rounded-3xl px-6 py-5 text-white shadow-lg">
          <p className="text-xs font-medium opacity-80 mb-2">오늘의 위로</p>
          <p className="text-base font-medium leading-relaxed">
            "울어도 괜찮아요. 힘들어도 괜찮아요.<br />
            지금 이 순간도 지나갈 거예요."
          </p>
          <p className="text-xs opacity-60 mt-3">— 같은 마음의 누군가로부터</p>
        </div>
      </div>

      {/* Received consolations */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#222] text-sm">받은 위로쪽지</h2>
          <button className="text-xs text-warm-400 flex items-center gap-0.5">
            전체보기 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2.5">
          {RECEIVED_COMMENTS.map(comment => {
            const author = USERS[comment.authorId]
            return (
              <div key={comment.id} className="bg-white rounded-3xl shadow-card px-5 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-warm-50 flex items-center justify-center">
                    <span className="text-xs">💌</span>
                  </div>
                  <span className="text-sm font-semibold text-[#222]">{author?.nickname || '익명'}</span>
                  <span className="text-xs text-[#AAA]">이별 {author?.daysSinceBreakup}일째</span>
                  {comment.reaction && (
                    <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-warm-50 text-warm-500">
                      {comment.reaction}
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#555] leading-relaxed">{comment.content}</p>
                <p className="text-xs text-[#CCC] mt-2">{comment.timeAgo}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Saved posts */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-[#222] text-sm">저장한 글</h2>
          <button className="text-xs text-warm-400 flex items-center gap-0.5">
            전체보기 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2.5">
          {[POSTS[1], POSTS[2]].map(post => {
            const author = USERS[post.authorId]
            return (
              <button
                key={post.id}
                onClick={() => router.push(`/post/${post.id}`)}
                className="w-full bg-white rounded-3xl shadow-card px-5 py-4 text-left hover:shadow-card-hover transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[post.category] || 'bg-warm-100 text-warm-500'}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[#AAA]">{author.nickname}</span>
                  <span className="text-xs text-warm-400 font-medium">이별 {author.daysSinceBreakup}일째</span>
                </div>
                <p className="font-semibold text-sm text-[#222] mb-1">{post.title}</p>
                <p className="text-xs text-[#888] line-clamp-2">{post.content}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mb-5">
        <div className="bg-white rounded-3xl shadow-card px-5 py-4">
          <p className="text-sm font-semibold text-[#222] mb-4">나의 기록</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-2xl font-bold text-warm-500">12</p>
              <p className="text-xs text-[#AAA] mt-0.5">공감 받음</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warm-500">5</p>
              <p className="text-xs text-[#AAA] mt-0.5">댓글 받음</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-warm-500">3</p>
              <p className="text-xs text-[#AAA] mt-0.5">위로쪽지</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
