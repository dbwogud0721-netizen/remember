'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, MoreHorizontal, User, Heart, Send } from 'lucide-react'
import { getPost, getComments, likePost, addComment, likeComment, DbPost, DbComment } from '@/lib/db'
import { getPostDetailActions } from '@/lib/data'

function timeAgoLabel(ts: any): string {
  if (!ts) return '방금 전'
  const diff = Date.now() - ts.toMillis()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '방금 전'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string

  const [post, setPost] = useState<DbPost | null>(null)
  const [comments, setComments] = useState<DbComment[]>([])
  const [loading, setLoading] = useState(true)
  const [comment, setComment] = useState('')
  const [tapped, setTapped] = useState<Record<number, boolean>>({})
  const [submitting, setSubmitting] = useState(false)

  const profile = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('wecando_profile') || 'null') : null

  useEffect(() => {
    Promise.all([getPost(postId), getComments(postId)]).then(([p, c]) => {
      setPost(p)
      setComments(c)
      setLoading(false)
    })
  }, [postId])

  const handleLike = async (i: number) => {
    if (tapped[i]) return
    setTapped(t => ({ ...t, [i]: true }))
    await likePost(postId)
    setPost(p => p ? { ...p, likeCount: p.likeCount + 1 } : p)
  }

  const handleComment = async () => {
    if (!comment.trim() || submitting || !profile) return
    setSubmitting(true)
    await addComment({
      postId,
      authorId: profile.id || 'anon',
      authorNickname: profile.nickname,
      authorLocation: '',
      authorDays: profile.daysSinceBreakup,
      content: comment.trim(),
    })
    const updated = await getComments(postId)
    setComments(updated)
    setPost(p => p ? { ...p, commentCount: p.commentCount + 1 } : p)
    setComment('')
    setSubmitting(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-charcoal-200 border-t-charcoal-600 rounded-full animate-spin" />
    </div>
  )

  if (!post) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <p className="text-charcoal-300 text-sm">글을 찾을 수 없어요</p>
    </div>
  )

  const actions = getPostDetailActions(post.category as any)

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex items-center justify-between px-4 pt-14 pb-3 bg-white sticky top-0 z-10 border-b border-charcoal-50">
        <button onClick={() => router.back()} className="w-9 h-9 flex items-center justify-center text-charcoal-700">
          <ChevronLeft size={22} strokeWidth={2} />
        </button>
        <button className="w-9 h-9 flex items-center justify-center text-charcoal-400">
          <MoreHorizontal size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-24">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-11 h-11 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0">
              <User size={20} className="text-charcoal-300" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[14px] text-charcoal-800">{post.authorNickname}</p>
              <p className="text-[12px] text-charcoal-400 mt-0.5">
                {post.authorLocation && `${post.authorLocation} · `}{post.authorStatus} · 이별 {post.authorDays}일차
              </p>
            </div>
            <span className="text-[12px] text-charcoal-300">{post.timeAgo}</span>
          </div>

          <h2 className="font-bold text-[20px] text-charcoal-800 leading-snug mb-3 font-serif">{post.title}</h2>
          <p className="text-[14px] text-charcoal-600 leading-relaxed whitespace-pre-line">{post.content}</p>

          <div className="flex gap-2 mt-5">
            {actions.map((action, i) => (
              <button
                key={i}
                onClick={() => handleLike(i)}
                className={`flex-1 flex flex-col items-center gap-0.5 py-3 rounded-2xl border transition ${
                  tapped[i] ? 'border-charcoal-800 bg-charcoal-800 text-white' : 'border-charcoal-100 bg-white text-charcoal-500 hover:border-charcoal-300'
                }`}
              >
                <span className={`text-[11px] font-medium ${tapped[i] ? 'text-white' : 'text-charcoal-400'}`}>{action.label}</span>
                <span className={`text-[16px] font-bold font-serif ${tapped[i] ? 'text-white' : 'text-charcoal-800'}`}>
                  {tapped[i] ? action.count + 1 : action.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-2 bg-charcoal-50" />

        <div className="px-5 pt-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[14px] font-bold text-charcoal-800">댓글 {post.commentCount}</span>
            <span className="text-[12px] text-charcoal-400">최신순 ▾</span>
          </div>

          {comments.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-charcoal-200 text-sm">아직 댓글이 없어요</p>
            </div>
          ) : (
            <div className="space-y-5">
              {comments.map((c: any) => (
                <div key={c.id} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <User size={15} className="text-charcoal-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="font-bold text-[13px] text-charcoal-800">{c.authorNickname}</span>
                      {c.authorLocation && <span className="text-[11px] text-charcoal-300">{c.authorLocation}</span>}
                      <span className="text-[11px] text-charcoal-300">이별 {c.authorDays}일차</span>
                      <span className="ml-auto text-[11px] text-charcoal-200">{timeAgoLabel(c.createdAt)}</span>
                    </div>
                    <p className="text-[13px] text-charcoal-600 leading-relaxed mb-2">{c.content}</p>
                    <div className="flex items-center gap-3 text-[12px] text-charcoal-300">
                      <button className="flex items-center gap-1 hover:text-rose-400 transition">
                        <Heart size={12} strokeWidth={1.8} /> {c.likeCount ?? 0}
                      </button>
                      <button>답글</button>
                      <button>신고</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white border-t border-charcoal-100 px-4 py-3 z-40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0">
            <User size={14} className="text-charcoal-300" />
          </div>
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="따뜻한 댓글을 남겨주세요..."
            className="flex-1 text-[13px] text-charcoal-800 placeholder-charcoal-200 outline-none"
            onKeyDown={e => { if (e.key === 'Enter') handleComment() }}
          />
          <button
            onClick={handleComment}
            disabled={!comment.trim() || submitting}
            className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition ${
              comment.trim() ? 'bg-charcoal-800 text-white' : 'bg-charcoal-100 text-charcoal-300'
            }`}
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  )
}
