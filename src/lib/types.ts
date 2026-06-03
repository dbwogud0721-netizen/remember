export type Gender = '남성' | '여성' | '비공개'
export type ChatStatus = '지금 대화 가능' | '천천히 답장' | '쪽지 안 받아요'
export type UserStatus = '이별했어요' | '연락참기' | '재회고민' | '위로받기' | '대화친구'
export type Category = '전체' | '이별했어요' | '연락참기' | '재회고민' | '위로받기' | '대화친구'
export type PostCategory = Exclude<Category, '전체'>
export type WriteIntent = '그냥 털어놓기' | '연락 말려줘' | '재회 조언' | '위로받고 싶어요' | '대화친구 찾기'
export type ActionType = 'empathy' | 'comment' | 'message' | 'cheer' | 'primary'

export interface UserProfile {
  id: string
  nickname: string
  gender: Gender
  age: number | '비공개'
  daysSinceBreakup: number
  status: UserStatus
  chatStatus: ChatStatus
  bio?: string
  showGender: boolean
  showAge: boolean
  allowMessages: boolean
}

export interface PostAction {
  emoji: string
  label: string
  count: number
  type: ActionType
}

export interface Post {
  id: string
  authorId: string
  category: PostCategory
  title: string
  content: string
  timeAgo: string
  location?: string
  showDaysSinceBreakup: boolean
  allowMessages: boolean
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  timeAgo: string
  reaction?: string
}

export interface ChatMessage {
  id: string
  senderId: string
  content: string
  timeAgo: string
}

export interface ChatRoom {
  id: string
  participantId: string
  lastMessage: string
  lastMessageAt: string
  unreadCount: number
}
