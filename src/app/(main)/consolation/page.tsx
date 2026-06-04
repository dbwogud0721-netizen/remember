'use client'
import { useRouter } from 'next/navigation'
import { ChevronRight } from 'lucide-react'
import { POSTS, USERS, COMMENTS, CATEGORY_COLORS } from '@/lib/data'

const RECEIVED_COMMENTS = COMMENTS.filter(c => ['1', '2', '5'].includes(c.id))

export default function ConsolationPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-[#F9F9F9]">
      <div className="px-5 pt-14 pb-4">
        <h1 className="text-[20px] font-bold text-charcoal-800 font-serif">새벽게시판</h1>
        <p className="text-[12px] text-charcoal-300 mt-0.5">밤에 혼자 버티는 사람들이 모이는 곳</p>
      </div>

      {/* Daily comfort card */}
      <div className="mx-4 mb-5">
        <div
          className="relative rounded-2xl overflow-hidden px-6 py-6"
          style={{ background: 'linear-gradient(135deg, #111 0%, #2a2a2a 100%)' }}
        >
          <p className="text-[11px] text-white/50 font-medium mb-2 tracking-widest uppercase">오늘의 위로</p>
          <p className="text-white text-[16px] font-serif font-bold leading-relaxed mb-3">
            "울어도 괜찮아요. 힘들어도 괜찮아요.<br />
            지금 이 순간도 지나갈 거예요."
          </p>
          <p className="text-white/40 text-[12px]">— 같은 마음의 누군가로부터</p>
        </div>
      </div>

      {/* Received comments */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-charcoal-700 text-[14px]">받은 위로쪽지</h2>
          <button className="text-[12px] text-charcoal-400 flex items-center gap-0.5">
            전체보기 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {RECEIVED_COMMENTS.map(comment => {
            const author = USERS[comment.authorId]
            return (
              <div key={comment.id} className="bg-white rounded-2xl border border-charcoal-100 px-4 py-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[13px] font-bold text-charcoal-700">{author?.nickname || '익명'}</span>
                  <span className="text-[11px] text-charcoal-300">이별 {author?.daysSinceBreakup}일째</span>
                  {comment.likeCount != null && comment.likeCount > 0 && (
                    <span className="ml-auto text-[11px] text-charcoal-400">좋아요 {comment.likeCount}</span>
                  )}
                </div>
                <p className="text-[13px] text-charcoal-500 leading-relaxed">{comment.content}</p>
                <p className="text-[11px] text-charcoal-200 mt-2">{comment.timeAgo}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Saved posts */}
      <div className="px-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-charcoal-700 text-[14px]">저장한 글</h2>
          <button className="text-[12px] text-charcoal-400 flex items-center gap-0.5">
            전체보기 <ChevronRight size={12} />
          </button>
        </div>
        <div className="space-y-2">
          {[POSTS[1], POSTS[2]].map(post => {
            const author = USERS[post.authorId]
            return (
              <button
                key={post.id}
                onClick={() => router.push(`/post/${post.id}`)}
                className="w-full bg-white rounded-2xl border border-charcoal-100 px-4 py-4 text-left hover:border-charcoal-200 transition"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[11px] px-2 py-0.5 rounded-full font-medium ${CATEGORY_COLORS[post.category] || 'bg-charcoal-100 text-charcoal-500'}`}>
                    {post.category}
                  </span>
                  <span className="text-[11px] text-charcoal-400">{author.nickname} · 이별 {author.daysSinceBreakup}일째</span>
                </div>
                <p className="font-bold text-[13px] text-charcoal-800 mb-1">{post.title}</p>
                <p className="text-[12px] text-charcoal-400 line-clamp-2">{post.content}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Stats */}
      <div className="mx-4 mb-5">
        <div className="bg-white rounded-2xl border border-charcoal-100 px-5 py-4">
          <p className="text-[14px] font-bold text-charcoal-700 mb-4">나의 기록</p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <p className="text-[22px] font-bold text-charcoal-800 font-serif">12</p>
              <p className="text-[11px] text-charcoal-300 mt-0.5">공감 받음</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-charcoal-800 font-serif">5</p>
              <p className="text-[11px] text-charcoal-300 mt-0.5">댓글 받음</p>
            </div>
            <div>
              <p className="text-[22px] font-bold text-charcoal-800 font-serif">3</p>
              <p className="text-[11px] text-charcoal-300 mt-0.5">위로쪽지</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
