'use client'
import { useState } from 'react'
import Link from 'next/link'
import { Search, Bell, PenLine } from 'lucide-react'
import { Category } from '@/lib/types'
import { POSTS, USERS } from '@/lib/data'
import PostCard from '@/components/features/PostCard'
import ProfileSheet from '@/components/features/ProfileSheet'

const CATEGORIES: Category[] = ['전체', '이별했어요', '연락참기', '재회고민', '위로받기', '대화친구']

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('전체')
  const [profileUserId, setProfileUserId] = useState<string | null>(null)
  const [profileOpen, setProfileOpen] = useState(false)

  const filteredPosts = activeCategory === '전체'
    ? POSTS
    : POSTS.filter(p => p.category === activeCategory)

  const handleAuthorClick = (userId: string) => {
    setProfileUserId(userId)
    setProfileOpen(true)
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="px-5 pt-14 pb-4 bg-ivory sticky top-0 z-30">
        <div className="flex items-start justify-between mb-1">
          <div>
            <h1 className="text-xl font-bold text-[#222] leading-tight">우리, 괜찮아질 거야</h1>
            <p className="text-xs text-[#AAA] mt-0.5">혼자 견디지 않아도 되는 곳</p>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-[#888] hover:bg-warm-50 transition">
              <Search size={17} />
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-full bg-white shadow-sm text-[#888] hover:bg-warm-50 transition relative">
              <Bell size={17} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-400 border border-white" />
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide mt-4 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-medium transition ${
                activeCategory === cat
                  ? 'bg-[#222] text-white'
                  : 'bg-white text-[#888] border border-[#EEE] hover:border-warm-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="px-4">
        {/* Write prompt card */}
        <div className="bg-white rounded-3xl shadow-card px-5 py-4 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-warm-100 flex items-center justify-center">
              <PenLine size={18} className="text-warm-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#222]">오늘, 당신의 마음을 들려주세요</p>
              <p className="text-xs text-[#AAA] mt-0.5">누군가가 당신의 이야기를 기다리고 있어요</p>
            </div>
          </div>
          <Link
            href="/write"
            className="flex-shrink-0 px-4 py-2 rounded-full bg-warm-50 text-warm-500 text-xs font-semibold hover:bg-warm-100 transition"
          >
            글쓰기
          </Link>
        </div>

        {/* Posts */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[#CCC] text-sm">아직 글이 없어요</p>
            <p className="text-[#DDD] text-xs mt-1">첫 번째로 이야기를 남겨보세요</p>
          </div>
        ) : (
          filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              author={USERS[post.authorId]}
              onAuthorClick={handleAuthorClick}
            />
          ))
        )}
      </div>

      {/* Profile sheet */}
      <ProfileSheet
        userId={profileUserId}
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
      />
    </div>
  )
}
