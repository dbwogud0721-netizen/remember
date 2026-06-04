'use client'
import { useRouter } from 'next/navigation'
import { User, MessageCircle, Heart, Send, Bookmark } from 'lucide-react'
import { Post, UserProfile } from '@/lib/types'
import { CATEGORY_COLORS } from '@/lib/data'

interface Props {
  post: Post
  author: UserProfile
  onAuthorClick: (userId: string) => void
}

export default function PostCard({ post, author, onAuthorClick }: Props) {
  const router = useRouter()

  return (
    <div className="bg-white border-b border-[#F0F0F0] px-0 py-4 mb-0">
      {/* Author row */}
      <div className="flex items-start gap-3 mb-2">
        <button
          className="flex-shrink-0 mt-0.5"
          onClick={(e) => { e.stopPropagation(); onAuthorClick(author.id) }}
        >
          <div className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center">
            <User size={18} className="text-[#AAA]" />
          </div>
        </button>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <button
              className="text-left"
              onClick={(e) => { e.stopPropagation(); onAuthorClick(author.id) }}
            >
              <span className="font-bold text-[14px] text-[#111]">{author.nickname}</span>
              <div className="flex items-center gap-1 mt-0.5 flex-wrap">
                {post.location && (
                  <span className="text-[12px] text-[#999]">{post.location}</span>
                )}
                {post.location && <span className="text-[12px] text-[#CCC]">·</span>}
                <span className="text-[12px] text-[#999]">{author.status}</span>
                <span className="text-[12px] text-[#CCC]">·</span>
                <span className="text-[12px] text-[#999]">이별 {author.daysSinceBreakup}일차</span>
              </div>
            </button>
            <span className="text-[12px] text-[#BBB] flex-shrink-0 ml-2 mt-0.5">{post.timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <button
        className="w-full text-left mb-3"
        onClick={() => router.push(`/post/${post.id}`)}
      >
        <h3 className="font-bold text-[#111] text-[15px] leading-snug mb-1.5 font-serif">{post.title}</h3>
        <p className="text-[#777] text-[13px] leading-relaxed line-clamp-2">{post.content}</p>
      </button>

      {/* Action bar */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push(`/post/${post.id}`)}
          className="flex items-center gap-1 text-[#AAA] hover:text-[#777] transition"
        >
          <MessageCircle size={15} strokeWidth={1.8} />
          <span className="text-[13px]">{post.commentCount}</span>
        </button>
        <button className="flex items-center gap-1 text-[#AAA] hover:text-rose-400 transition">
          <Heart size={15} strokeWidth={1.8} />
          <span className="text-[13px]">{post.likeCount}</span>
        </button>
        <button className="flex items-center gap-1 text-[#AAA] hover:text-[#777] transition">
          <Send size={15} strokeWidth={1.8} />
          <span className="text-[13px]">{post.shareCount}</span>
        </button>
        <button className="ml-auto text-[#CCC] hover:text-[#AAA] transition">
          <Bookmark size={15} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  )
}
