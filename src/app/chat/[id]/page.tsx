'use client'
import { useState, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ChevronLeft, Send, User, MoreHorizontal } from 'lucide-react'
import { USERS, CHAT_MESSAGES } from '@/lib/data'
import { ChatMessage } from '@/lib/types'

const QUICK_REPLIES = [
  '괜찮아요?',
  '저도 비슷해요',
  '오늘 많이 힘들었죠?',
  '같이 참아봐요',
]

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string
  const user = USERS[userId]

  const [messages, setMessages] = useState<ChatMessage[]>(CHAT_MESSAGES[userId] || [])
  const [input, setInput] = useState('')
  const [showQuickReplies, setShowQuickReplies] = useState(messages.length === 0)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9F9F9] flex items-center justify-center">
        <p className="text-charcoal-300 text-[13px]">사용자를 찾을 수 없어요</p>
      </div>
    )
  }

  const handleSend = (text: string = input) => {
    const trimmed = text.trim()
    if (!trimmed) return
    const newMsg: ChatMessage = {
      id: String(Date.now()),
      senderId: 'me',
      content: trimmed,
      timeAgo: '방금',
    }
    setMessages(prev => [...prev, newMsg])
    setInput('')
    setShowQuickReplies(false)

    setTimeout(() => {
      const replies = [
        '네, 저도 그런 날이 있어요.',
        '오늘 하루도 수고했어요.',
        '같이 버텨봐요. 괜찮아질 거예요.',
        '그 마음 충분히 이해해요.',
      ]
      const reply: ChatMessage = {
        id: String(Date.now() + 1),
        senderId: userId,
        content: replies[Math.floor(Math.random() * replies.length)],
        timeAgo: '방금',
      }
      setMessages(prev => [...prev, reply])
    }, 1500)
  }

  const groupedMessages = messages.reduce<{ date: string; msgs: ChatMessage[] }[]>((groups, msg) => {
    const date = msg.timeAgo.includes('어제') ? '어제' : '오늘'
    const last = groups[groups.length - 1]
    if (last && last.date === date) {
      last.msgs.push(msg)
    } else {
      groups.push({ date, msgs: [msg] })
    }
    return groups
  }, [])

  return (
    <div className="flex flex-col h-screen bg-[#F9F9F9]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 pt-14 pb-4 bg-white border-b border-charcoal-100 z-10 flex-shrink-0">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 flex items-center justify-center text-charcoal-600"
        >
          <ChevronLeft size={20} strokeWidth={2} />
        </button>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-charcoal-100 flex items-center justify-center">
            <User size={18} className="text-charcoal-300" />
          </div>
          {user.chatStatus === '지금 대화 가능' && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-charcoal-700 border-2 border-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold text-[14px] text-charcoal-800">{user.nickname}</p>
          <p className="text-[11px] text-charcoal-400">이별 {user.daysSinceBreakup}일째 · {user.status}</p>
        </div>
        <button className="w-9 h-9 flex items-center justify-center text-charcoal-300">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
        {messages.length === 0 && (
          <div className="text-center py-8">
            <p className="text-[13px] text-charcoal-400 font-medium">{user.nickname}님에게 첫 말을 건네보세요</p>
            <p className="text-[12px] text-charcoal-300 mt-1">조심스럽게, 천천히 괜찮아요</p>
          </div>
        )}

        {groupedMessages.map((group, gi) => (
          <div key={gi}>
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-charcoal-100" />
              <span className="text-[11px] text-charcoal-300">{group.date}</span>
              <div className="flex-1 h-px bg-charcoal-100" />
            </div>

            {group.msgs.map((msg, mi) => {
              const isMine = msg.senderId === 'me'
              const showAvatar = !isMine && (mi === 0 || group.msgs[mi - 1]?.senderId !== msg.senderId)
              return (
                <div key={msg.id} className={`flex items-end gap-2 mb-1 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!isMine && (
                    <div className={`w-7 h-7 rounded-full bg-charcoal-100 flex items-center justify-center flex-shrink-0 ${showAvatar ? 'opacity-100' : 'opacity-0'}`}>
                      <User size={12} className="text-charcoal-300" />
                    </div>
                  )}
                  <div className={`max-w-[70%] ${isMine ? 'items-end' : 'items-start'} flex flex-col`}>
                    <div className={`px-4 py-2.5 text-[13px] leading-relaxed ${
                      isMine
                        ? 'bg-charcoal-800 text-white bubble-mine'
                        : 'bg-white text-charcoal-700 border border-charcoal-100 bubble-other'
                    }`}>
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-charcoal-300 mt-1 px-1">{msg.timeAgo}</span>
                  </div>
                </div>
              )
            })}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick replies */}
      {showQuickReplies && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto scrollbar-hide flex-shrink-0">
          {QUICK_REPLIES.map(reply => (
            <button
              key={reply}
              onClick={() => handleSend(reply)}
              className="flex-shrink-0 px-3 py-1.5 rounded-full bg-white border border-charcoal-200 text-[12px] text-charcoal-500 font-medium hover:bg-charcoal-50 transition"
            >
              {reply}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-charcoal-100 flex-shrink-0">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="조심스럽게 말을 건네보세요"
            className="flex-1 bg-charcoal-50 rounded-full px-4 py-3 text-[13px] text-charcoal-800 placeholder-charcoal-300 outline-none"
            onKeyDown={e => { if (e.key === 'Enter') handleSend() }}
            onFocus={() => setShowQuickReplies(false)}
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition ${
              input.trim() ? 'bg-charcoal-800 text-white' : 'bg-charcoal-100 text-charcoal-300'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
