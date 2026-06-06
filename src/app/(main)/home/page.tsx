'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Bell, PenLine } from 'lucide-react'
import { Category } from '@/lib/types'
import { getPosts, DbPost } from '@/lib/db'
import ProfileSheet from '@/components/features/ProfileSheet'

const CATEGORIES: Category[] = ['전체', '이별했어요', '연락참기', '재회고민', '위로받기', '대화친구']

const introLines = [
  { title: "내 세상은 너였어.", subtitle: "그래서 네가 떠난 뒤에도, 한동안은 아무것도 안 보였어." },
  { title: "너 잘못 아니야.", subtitle: "근데 나만 이렇게 아픈 건 조금 억울해." },
  { title: "다시 돌아와달란 말보다,", subtitle: "네가 없는 내가 괜찮아지는 게 더 어려웠어." },
  { title: "사랑이 끝난 건 알겠는데,", subtitle: "내 하루까지 같이 끝난 것 같아서 문제였어." },
  { title: "너는 지나갔는데,", subtitle: "나는 아직 그날 근처에 살아." },
  { title: "괜찮아졌다고 말하는 날에도,", subtitle: "사실은 그냥 들키기 싫었던 거야." },
  { title: "보고 싶다는 말이,", subtitle: "돌아오라는 뜻은 아니었어. 그냥 아직 아프다는 뜻이었어." },
  { title: "너를 잊고 싶은 게 아니라,", subtitle: "너 때문에 무너진 나를 그만 보고 싶은 거야." },
  { title: "내가 더 사랑한 게 죄라면,", subtitle: "나는 한동안 벌을 받는 중이었어." },
  { title: "끝난 줄 알면서도,", subtitle: "알림 하나에 심장이 먼저 반응했어." },
  { title: "나도 알아.", subtitle: "그 사람은 이제 내 사람이 아니라는 거." },
  { title: "근데 마음은 왜 항상,", subtitle: "이해보다 늦게 도착할까." },
  { title: "네가 없는 밤은,", subtitle: "생각보다 너무 조용해서 더 시끄러웠어." },
  { title: "사랑받던 기억이 남아서,", subtitle: "사랑받지 못하는 지금이 더 아팠어." },
  { title: "너 하나 빠졌을 뿐인데,", subtitle: "내가 나를 대하는 방식까지 달라졌어." },
  { title: "진짜 끝난 사람은,", subtitle: "돌아오지 않는다는 걸 알면서도 기다렸어." },
  { title: "미련한 게 아니라,", subtitle: "진심이 쉽게 정리되지 않았던 거야." },
  { title: "네가 나빴던 날보다,", subtitle: "좋았던 날들이 자꾸 나를 속였어." },
  { title: "나는 너를 잃은 게 아니라,", subtitle: "너를 사랑하던 나까지 잃어버린 줄 알았어." },
  { title: "헤어졌다는 말은 쉬웠는데,", subtitle: "안 보고 사는 건 매일 새로 배워야 했어." },
  { title: "너는 내 계절이었고,", subtitle: "나는 아직 옷을 갈아입지 못했어." },
  { title: "다 끝났다는 말 뒤에,", subtitle: "나는 혼자 너무 많은 문장을 삼켰어." },
  { title: "차라리 미웠으면 좋았을 텐데,", subtitle: "좋았던 기억이 너무 많아서 더 힘들었어." },
  { title: "이별은 한 번인데,", subtitle: "나는 매일 조금씩 다시 헤어졌어." },
  { title: "내가 붙잡고 싶었던 건 너였을까,", subtitle: "아니면 너와 있을 때의 나였을까." },
  { title: "너 없이도 살아지는 게,", subtitle: "처음엔 배신처럼 느껴졌어." },
  { title: "너를 잊는다는 건,", subtitle: "너를 미워하는 게 아니라 나를 살리는 일이었어." },
  { title: "안 괜찮은데 괜찮다 했고,", subtitle: "보고 싶은데 아무렇지 않은 척했어." },
  { title: "너는 내 일상이었고,", subtitle: "이별은 그 일상을 전부 다시 쓰게 만들었어." },
  { title: "내가 부족해서 끝난 거라고,", subtitle: "한참을 나만 미워했어." },
  { title: "근데 이제는 알아.", subtitle: "사랑이 끝난 게 내 가치가 끝난 건 아니라는 걸." },
  { title: "너를 사랑했던 시간이,", subtitle: "나를 망친 시간으로만 남지는 않았으면 해." },
  { title: "마지막 인사보다 아픈 건,", subtitle: "그 뒤에도 계속 이어지는 혼잣말이었어." },
  { title: "너는 돌아오지 않았고,", subtitle: "나는 나라도 데리러 가야 했어." },
  { title: "내가 기다린 건 네 답장이 아니라,", subtitle: "다시 괜찮아질 나였는지도 몰라." },
  { title: "사랑이 끝난 자리에는,", subtitle: "이상하게 내가 제일 늦게 도착했어." },
  { title: "너에게는 지나간 일이었고,", subtitle: "나에게는 아직 오늘 일이었어." },
  { title: "나는 아직도 가끔,", subtitle: "너 없는 내가 낯설어." },
  { title: "그래도 오늘은,", subtitle: "너 말고 나를 조금 더 생각해보려고." },
  { title: "너를 다시 만나고 싶은 날보다,", subtitle: "나를 다시 만나고 싶은 날이 많아졌으면 해." },
  { title: "내 마음은 아직 너에게 갔지만,", subtitle: "내 하루는 이제 나에게 돌아와야 해." },
  { title: "너는 내 전부였는데,", subtitle: "나는 내 전부를 다시 만들어야 했어." },
  { title: "돌아와달라는 말은 참았고,", subtitle: "대신 오늘도 무너지지 않기로 했어." },
  { title: "사랑은 끝났지만,", subtitle: "내가 사랑받을 이유까지 끝난 건 아니니까." },
  { title: "너를 잊는 속도가 느려도,", subtitle: "나는 매일 조금씩 나를 살리고 있어." },
  { title: "나는 버려진 게 아니라,", subtitle: "나에게 돌아가는 길을 잃었던 거야." },
  { title: "그 사람은 내 마음을 떠났고,", subtitle: "이제 나는 내 마음을 떠나지 않기로 했어." },
  { title: "한때는 네가 내 답이었는데,", subtitle: "이제는 내가 나한테 답이 되어야 해." },
  { title: "너 때문에 울던 밤도,", subtitle: "언젠가는 내가 살아남은 증거가 될 거야." },
  { title: "이별은 네가 떠난 사건이 아니라,", subtitle: "내가 나를 다시 배우는 시간이었어." },
]

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<Category>('전체')
  const [bannerIdx, setBannerIdx] = useState(0)
  const [posts, setPosts] = useState<DbPost[]>([])
  const [loading, setLoading] = useState(true)
  const [profileOpen, setProfileOpen] = useState(false)
  const [profileUserId, setProfileUserId] = useState<string | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIdx(prev => (prev + 1) % introLines.length)
    }, 10000)
    return () => clearInterval(interval)
  }, [])

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
          <h1 className="text-[22px] font-bold text-charcoal-800 tracking-tight font-serif">속마음 이야기</h1>
          <button className="w-9 h-9 flex items-center justify-center text-charcoal-500 relative">
            <Bell size={20} strokeWidth={1.8} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-400 border-2 border-white" />
          </button>
        </div>
        <p className="text-[12px] text-charcoal-400 mb-4 leading-snug">
          친구에게 차마 하지 못하는 말 여기서 해요
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
              {introLines[bannerIdx].title}
            </h2>
            <p className="relative text-white/50 text-[12px] leading-relaxed">{introLines[bannerIdx].subtitle}</p>
            <div className="relative flex items-center gap-2 mt-4">
              <div className="w-6 h-px bg-white/50" />
              <span className="text-white/40 text-[11px]">{bannerIdx + 1}/{introLines.length}</span>
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
