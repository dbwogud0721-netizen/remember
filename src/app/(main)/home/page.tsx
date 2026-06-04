'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Bell, PenLine } from 'lucide-react'
import { Category } from '@/lib/types'
import { getPosts, DbPost } from '@/lib/db'
import ProfileSheet from '@/components/features/ProfileSheet'

const CATEGORIES: Category[] = ['전체', '이별했어요', '연락참기', '재회고민', '위로받기', '대화친구']

const BANNERS = [
  { title: '끝난 사랑도,\n여전히 너의 이야기야.', sub: '친구한테는 그만 말하라는 이야기, 여기서는 계속 해도 됩니다.' },
  { title: '혼자 견디지 않아도\n되는 곳이 있어.', sub: '비슷한 상황의 사람들이 오늘도 여기에 있어요.' },
  { title: '연락하고 싶을 때\n먼저 여기 와.', sub: '충동적인 그 순간, 함께 버텨드릴게요.' },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('전체')
  const [bannerIdx, setBannerIdx] = useState(0)
  const [posts, setPosts] = useState<DbPost[]>([])
  const [loading, setLoading] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileUserId, setProfileUserId] = useState<string | null>(null)

  const fetchPosts = useCallback(async () => {
    setLoading(true)
    try {
      const data = await getPosts(activeCategory)
      setPosts(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [activeCategory])

  useEffect(() => { fetchPosts() }, [fetchPosts])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="px-5 pt-14 pb-3 bg-white sticky top-0 z-30">
        <div className="flex items-center justify-between mb-0.5">
          <h1 className="text-[22px] font-bold text-charcoal-800 tracking-tight font-serif">후폭풍</h1>
          <button className="w-9 h-9 flex items-center justify-center text-charcoal-500 relative">
            <Bell size={20} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-400 border-2 border-white" />
          </button>
        </div>
        <p className="text-[12px] text-charcoal-400 mb-4 leading-snug">
          친구한테는 그만 말하라는 이야기, 여기서는 계속 해도 됩니다.
        </p>
        <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[13px] font-medium transition ${
                activeCategory === cat ? 'bg-charcoal-800 text-white' : 'bg-charcoal-50 text-charcoal-400'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="px-4 pt-3">
        {/* Banner */}
        {activeCategory === '전체' && (
          <div
            className="relative rounded-3xl overflow-hidden h-[190px] flex flex-col justify-end px-6 pb-5 pt-8 mb-4"
            style={{ background: 'radial-gradient(ellipse at 70% 100%, #1c2d3a 0%, #0d1820 40%, #050d13 100%)' }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 80%, rgba(60,80,100,0.25) 0%, transparent 60%)' }} />
            <h2 className="relative text-white text-[22px] font-bold leading-tight whitespace-pre-line mb-2 font-serif">
              {BANNERS[bannerIdx].title}
            </h2>
            <p className="relative text-white/50 text-[12px] leading-relaxed">{BANNERS[bannerIdx].sub}</p>
            <div className="relative flex items-center gap-2 mt-4">
              <div className="w-6 h-px bg-white/50" />
              <span className="text-white/40 text-[11px]">{bannerIdx + 1}/3</span>
              <div className="ml-auto flex items-center gap-1.5">
                {BANNERS.map((_, i) => (
                  <button key={i} onClick={() => setBannerIdx(i)} className={`rounded-full transition-all ${i === bannerIdx ? 'w-4 h-1 bg-white' : 'w-1 h-1 bg-white/30'}`} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Posts */}
        {loading ? (
          <div className="py-16 text-center">
            <div className="w-6 h-6 border-2 border-charcoal-200 border-t-charcoal-600 rounded-full animate-spin mx-auto" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-charcoal-200 text-sm">아직 글이 없어요</p>
            <p className="text-charcoal-100 text-xs mt-1">첫 번째로 이야기를 남겨보세요</p>
          </div>
        ) : (
          posts.map(post => (
            <Link key={post.id} href={`/post/${post.id}`} className="block border-b border-charcoal-50 py-4">
              <div className="flex items-start gap-3 mb-2">
                <div className="w-9 h-9 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-[13px] text-charcoal-400">👤</span>
                </div>
                <div className="flex-1">
                  <p className="font-bold text-[14px] text-charcoal-800">{post.authorNickname}</p>
                  <p className="text-[12px] text-charcoal-400 mt-0.5">
                    {post.authorLocation && `${post.authorLocation} · `}{post.authorStatus} · 이별 {post.authorDays}일차
                  </p>
                </div>
                <span className="text-[12px] text-charcoal-300">{post.timeAgo}</span>
              </div>
              <h3 className="font-bold text-[15px] text-charcoal-800 leading-snug mb-1.5 font-serif">{post.title}</h3>
              <p className="text-[13px] text-charcoal-500 leading-relaxed line-clamp-2">{post.content}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className="flex items-center gap-1 text-[13px] text-charcoal-300">💬 {post.commentCount}</span>
                <span className="flex items-center gap-1 text-[13px] text-charcoal-300">♡ {post.likeCount}</span>
                <span className="flex items-center gap-1 text-[13px] text-charcoal-300">➤ {post.shareCount}</span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* FAB */}
      <Link href="/write" className="fixed bottom-24 right-5 w-12 h-12 bg-charcoal-800 rounded-full flex items-center justify-center shadow-lg z-30">
        <PenLine size={20} className="text-white" />
      </Link>

      <ProfileSheet userId={profileUserId} isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </div>
  )
}
