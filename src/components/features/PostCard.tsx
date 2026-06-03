'use client'
import { useRouter } from 'next/navigation'
import { MoreHorizontal, User, Heart, MessageCircle, Bookmark, Star, Mail, HeartHandshake } from 'lucide-react'
import { Post, UserProfile, PostAction } from '@/lib/types'
import { getPostActions, CATEGORY_COLORS } from '@/lib/data'

function getBadgeLabel(author: UserProfile) {
  if (author.status === '연락참기') return `연락 ${author.daysSinceBreakup}일째`
  return `이별 ${author.daysSinceBreakup}일째`
}

function ActionIcon({ emoji }: { emoji: string; type: PostAction['type'] }) {
  const base = 16

  if (emoji === 'heart-handshake') {
    return <HeartHandshake size={base} className="text-rose-400" />
  }
  if (emoji === 'heart') {
    return <Heart size={base} className="text-rose-400" fill="currentColor" />
  }
  if (emoji === 'message-circle-filled') {
    return <MessageCircle size={base} className="text-warm-500" fill="currentColor" />
  }
  if (emoji === 'message-circle') {
    return <MessageCircle size={base} className="text-[#BBBBBB]" />
  }
  if (emoji === 'bookmark') {
    return <Bookmark size={base} className="text-[#BBBBBB]" />
  }
  if (emoji === 'star') {
    return <Star size={base} className="text-amber-400" fill="currentColor" />
  }
  if (emoji === 'mail') {
    return <Mail size={base} className="text-warm-400" />
  }
  return <Heart size={base} className="text-rose-400" fill="currentColor" />
}

interface Props {
  post: Post
  author: UserProfile
  onAuthorClick: (userId: string) => void
}

export default function PostCard({ post, author, onAuthorClick }: Props) {
  const router = useRouter()
  const actions = getPostActions(post.category)

  return (
    <div className="bg-white rounded-3xl shadow-card px-5 py-5 mb-3">
      {/* Author row */}
      <div className="flex items-center justify-between mb-3.5">
        <button
          className="flex items-center gap-3 flex-1 min-w-0"
          onClick={(e) => { e.stopPropagation(); onAuthorClick(author.id) }}
        >
          <div className="w-10 h-10 rounded-full bg-warm-50 flex items-center justify-center flex-shrink-0">
            <User size={18} className="text-warm-300" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-sm text-[#222]">{author.nickname}</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-warm-100 text-warm-600 font-medium flex-shrink-0">
                {getBadgeLabel(author)}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              {post.location && (
                <span className="text-[11px] text-[#BBBBBB]">{post.location}</span>
              )}
              {post.location && <span className="text-[11px] text-[#CCCCCC]">·</span>}
              <span className="text-[11px] text-[#BBBBBB]">{post.timeAgo}</span>
              {author.chatStatus === '지금 대화 가능' && post.allowMessages && (
                <>
                  <span className="text-[11px] text-[#CCCCCC]">·</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 flex-shrink-0" />
                  <span className="text-[11px] text-emerald-500 font-medium">대화 가능</span>
                </>
              )}
            </div>
          </div>
        </button>
        <button className="w-8 h-8 flex items-center justify-center text-[#DDDDDD] flex-shrink-0 ml-2">
          <MoreHorizontal size={17} />
        </button>
      </div>

      {/* Category badge */}
      <div className="mb-2.5">
        <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${CATEGORY_COLORS[post.category] || 'bg-warm-100 text-warm-500'}`}>
          {post.category}
        </span>
      </div>

      {/* Content */}
      <button
        className="w-full text-left mb-4"
        onClick={() => router.push(`/post/${post.id}`)}
      >
        <h3 className="font-bold text-[#1A1A1A] text-[15px] leading-snug mb-1.5">{post.title}</h3>
        <p className="text-[#777777] text-[13px] leading-relaxed line-clamp-2">{post.content}</p>
      </button>

      {/* Divider */}
      <div className="h-px bg-[#F2F2F2] mb-3.5" />

      {/* Action buttons */}
      <div className="flex items-center">
        {actions.map((action, i) => (
          <button
            key={i}
            onClick={(e) => {
              e.stopPropagation()
              if (action.type === 'message' || action.type === 'primary') {
                router.push(`/chat/${author.id}`)
              }
            }}
            className="flex items-center gap-1.5 flex-1 justify-center py-1 rounded-xl hover:bg-gray-50 transition active:scale-95"
          >
            <ActionIcon emoji={action.emoji} type={action.type} />
            <span className={`text-[12px] font-medium ${
              action.type === 'primary' ? 'text-warm-500' :
              action.type === 'message' ? 'text-warm-400' :
              'text-[#999999]'
            }`}>
              {action.label}
            </span>
            {action.count > 0 && (
              <span className="text-[11px] text-[#CCCCCC] font-medium">{action.count}</span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}
