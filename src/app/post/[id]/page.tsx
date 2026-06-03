'use client'
import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, User, MoreHorizontal, Send } from 'lucide-react'
import { POSTS, USERS, COMMENTS, CATEGORY_COLORS, getPostActions } from '@/lib/data'
import ProfileSheet from '@/components/features/ProfileSheet'

const CHAT_STATUS_DOT: Record<string, string> = {
  '지금 대화 가능': 'bg-emerald-400',
  '천천히 답장': 'bg-yellow-400',
  '쪽지 안 받아요': 'bg-gray-300',
}

export default function PostDetailPage() {
  const params = useParams()
  const router = useRouter()
  const postId = params.id as string
  const post = POSTS.find(p => p.id === postId)
  const author = post ? USERS[post.authorId] : null
  const comments = COMMENTS.filter(c => c.postId === postId)
  const actions = post ? getPostActions(post.category) : []

  const [comment, setComment] = useState('')
  const [profileOpen, setProfileOpen] = useState(false)
  const [empathyTapped, setEmpathyTapped] = useState(false)

  if (!post || !author) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <p className="text-[#AAA] text-sm">글을 찾을 수 없어요</p>
      </div>
    )
  }

  const handleSendComment = () => {
    if (!comment.trim()) return
    setComment('')
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
        <h1 className="font-bold text-sm text-[#222] flex-1 truncate">{post.category}</h1>
        <button className="w-9 h-9 flex items-center justify-center text-[#CCC]">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto pb-40">
        {/* Post */}
        <div className="mx-4 mb-4">
          <div className="bg-white rounded-3xl shadow-card px-5 py-5">
            {/* Author */}
            <button
              className="flex items-center gap-3 mb-4 w-full text-left"
              onClick={() => setProfileOpen(true)}
            >
              <div className="w-11 h-11 rounded-full bg-warm-50 flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-warm-300" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-[#222]">{author.nickname}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-warm-100 text-warm-500 font-medium">
                    이별 {author.daysSinceBreakup}일째
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  {post.location && <span className="text-xs text-[#AAA]">{post.location}</span>}
                  <span className="text-xs text-[#AAA]">·</span>
                  <span className="text-xs text-[#AAA]">{post.timeAgo}</span>
                  {author.chatStatus !== '쪽지 안 받아요' && (
                    <>
                      <span className="text-xs text-[#AAA]">·</span>
                      <span className={`w-1.5 h-1.5 rounded-full ${CHAT_STATUS_DOT[author.chatStatus]}`} />
                      <span className={`text-xs font-medium ${author.chatStatus === '지금 대화 가능' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                        {author.chatStatus}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </button>

            {/* Category */}
            <span className={`text-xs px-2.5 py-1 rounded-full font-medium inline-block mb-3 ${CATEGORY_COLORS[post.category] || 'bg-warm-100 text-warm-500'}`}>
              {post.category}
            </span>

            {/* Content */}
            <h2 className="font-bold text-[#222] text-lg mb-3 leading-snug">{post.title}</h2>
            <p className="text-[#555] text-sm leading-relaxed">{post.content}</p>

            {/* Divider */}
            <div className="h-px bg-[#F5F5F5] my-4" />

            {/* Actions */}
            <div className="flex items-center gap-0">
              {actions.map((action, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (action.type === 'message' || action.type === 'primary') {
                      router.push(`/chat/${author.id}`)
                    } else if (action.type === 'empathy') {
                      setEmpathyTapped(v => !v)
                    }
                  }}
                  className={`flex items-center gap-1.5 text-xs flex-1 justify-center py-2 rounded-xl transition ${
                    action.type === 'primary'
                      ? 'text-warm-500 font-semibold hover:bg-warm-50'
                      : action.type === 'message'
                      ? 'text-warm-400 font-medium hover:bg-warm-50'
                      : action.type === 'empathy' && empathyTapped
                      ? 'text-warm-500 font-semibold'
                      : 'text-[#888] hover:bg-gray-50'
                  }`}
                >
                  <span className="text-sm">{action.emoji}</span>
                  <span>{action.label}</span>
                  {action.count > 0 && (
                    <span className="text-[#AAA] font-medium">
                      {action.type === 'empathy' && empathyTapped ? action.count + 1 : action.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Comments section */}
        <div className="px-4 mb-4">
          <p className="text-sm font-semibold text-[#222] mb-3">
            댓글 {comments.length}개
          </p>

          {comments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-[#CCC] text-sm">아직 댓글이 없어요</p>
              <p className="text-[#DDD] text-xs mt-1">따뜻한 말을 남겨주세요</p>
            </div>
          ) : (
            <div className="space-y-3">
              {comments.map(c => {
                const commenter = USERS[c.authorId]
                if (!commenter) return null
                return (
                  <div key={c.id} className="bg-white rounded-3xl shadow-card px-5 py-4">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-warm-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User size={15} className="text-warm-300" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-semibold text-xs text-[#222]">{commenter.nickname}</span>
                          <span className="text-xs text-warm-400 font-medium">이별 {commenter.daysSinceBreakup}일째</span>
                          {c.reaction && (
                            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-warm-50 text-warm-500 font-medium">
                              {c.reaction}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-[#555] leading-relaxed">{c.content}</p>
                        <p className="text-xs text-[#CCC] mt-1.5">{c.timeAgo}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[390px] bg-white shadow-nav border-t border-[#F0F0F0] px-4 py-3 z-40">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setEmpathyTapped(v => !v)}
            className={`flex-1 py-2.5 rounded-full text-xs font-semibold border-2 transition ${
              empathyTapped
                ? 'bg-warm-400 border-warm-400 text-white'
                : 'border-warm-200 text-warm-500 hover:bg-warm-50'
            }`}
          >
            {empathyTapped ? '공감했어요 ✓' : '공감해요'}
          </button>
          {post.allowMessages && (
            <button
              onClick={() => router.push(`/chat/${author.id}`)}
              className="flex-1 py-2.5 rounded-full text-xs font-semibold bg-warm-500 text-white hover:bg-warm-600 transition"
            >
              위로쪽지 보내기
            </button>
          )}
        </div>

        {/* Comment input */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            placeholder="따뜻한 말을 남겨주세요"
            className="flex-1 bg-warm-50 rounded-full px-4 py-2.5 text-sm text-[#222] placeholder-[#CCC] outline-none"
            onKeyDown={e => { if (e.key === 'Enter') handleSendComment() }}
          />
          <button
            onClick={handleSendComment}
            disabled={!comment.trim()}
            className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition ${
              comment.trim() ? 'bg-warm-500 text-white' : 'bg-warm-100 text-warm-300'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>

      {/* Profile sheet */}
      <ProfileSheet
        userId={author.id}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  )
}
