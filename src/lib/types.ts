export type Gender = '남성' | '여성' | '비공개'
export type ChatStatus = '지금 대화 가능' | '천천히 답장' | '쪽지 안 받아요'
export type UserStatus = '차였음' | '이별함' | '연락참는중' | '재회기다림' | '환승함' | '자유'
export type Category = '전체' | '이별했어요' | '연락참기' | '재회고민' | '위로받기' | '대화친구'
export type PostCategory = Exclude<Category, '전체'>
export type WriteIntent = '그냥 털어놓기' | '연락 말려줘' | '재회 조언' | '위로받고 싶어요' | '대화친구 찾기'
export type ActionType = 'empathy' | 'noSend' | 'hug' | 'message' | 'cheer'

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
  type: ActionType
  label: string
  count: number
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
  commentCount: number
  likeCount: number
  shareCount: number
}

export interface Comment {
  id: string
  postId: string
  authorId: string
  content: string
  timeAgo: string
  likeCount?: number
  location?: string
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
