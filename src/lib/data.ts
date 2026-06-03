import { UserProfile, Post, Comment, ChatRoom, ChatMessage, PostAction, PostCategory } from './types'

export const USERS: Record<string, UserProfile> = {
  '1': {
    id: '1',
    nickname: '미련왕',
    gender: '여성',
    age: 27,
    daysSinceBreakup: 13,
    status: '연락참기',
    chatStatus: '지금 대화 가능',
    bio: '오늘은 진짜 연락 안 하고 싶어요. 누가 좀 말려줘요.',
    showGender: true,
    showAge: true,
    allowMessages: true,
  },
  '2': {
    id: '2',
    nickname: '연락참는중',
    gender: '남성',
    age: 29,
    daysSinceBreakup: 8,
    status: '연락참기',
    chatStatus: '천천히 답장',
    bio: '하루하루가 너무 길어요. 그냥 지나가길 기다려요.',
    showGender: true,
    showAge: true,
    allowMessages: true,
  },
  '3': {
    id: '3',
    nickname: '잠못드는밤',
    gender: '여성',
    age: 24,
    daysSinceBreakup: 30,
    status: '위로받기',
    chatStatus: '지금 대화 가능',
    bio: '이제 좀 괜찮아질 수 있을까요. 이 감정이 언제 끝날지.',
    showGender: true,
    showAge: true,
    allowMessages: true,
  },
  '4': {
    id: '4',
    nickname: '새벽산책',
    gender: '여성',
    age: 25,
    daysSinceBreakup: 6,
    status: '대화친구',
    chatStatus: '지금 대화 가능',
    bio: '비슷한 상황인 사람 있으면 말 걸어줘요. 오늘 밤만 같이 버텨요.',
    showGender: true,
    showAge: true,
    allowMessages: true,
  },
  '5': {
    id: '5',
    nickname: '괜찮아질까',
    gender: '남성',
    age: 31,
    daysSinceBreakup: 42,
    status: '재회고민',
    chatStatus: '천천히 답장',
    bio: '마지막 말이 아직도 귓가에 맴돌아요.',
    showGender: true,
    showAge: true,
    allowMessages: false,
  },
}

export const POSTS: Post[] = [
  {
    id: '1',
    authorId: '1',
    category: '연락참기',
    title: '지금 연락할 뻔했다.. 말려줘',
    content: '새벽 2시가 되니까 갑자기 너무 보고 싶어서 카톡 입력창까지 열었어. 보내지 말라고 좀 말려줘...',
    timeAgo: '12분 전',
    location: '서울',
    showDaysSinceBreakup: true,
    allowMessages: true,
  },
  {
    id: '2',
    authorId: '3',
    category: '위로받기',
    title: '눈물이 멈추질 않아',
    content: '아무것도 하기 싫고 그냥 누워서 울기만 해. 이렇게 계속 울면 나아질까? 언제쯤 괜찮아질까...',
    timeAgo: '2시간 전',
    location: '대구',
    showDaysSinceBreakup: true,
    allowMessages: true,
  },
  {
    id: '3',
    authorId: '4',
    category: '대화친구',
    title: '오늘 밤 잠 안 오는 사람 있어요?',
    content: '그냥 서로 아무 말이나 하면서 오늘 밤만 버티고 싶어요. 비슷한 마음이면 말 걸어줘요.',
    timeAgo: '1시간 전',
    location: '부산',
    showDaysSinceBreakup: true,
    allowMessages: true,
  },
  {
    id: '4',
    authorId: '5',
    category: '재회고민',
    title: '다시 연락해도 될까',
    content: '헤어진 지 42일째인데 아직도 마지막 말이 마음에 걸려. 지금 연락하면 더 멀어질까? 아니면 마지막 기회일까.',
    timeAgo: '3시간 전',
    location: '인천',
    showDaysSinceBreakup: true,
    allowMessages: false,
  },
  {
    id: '5',
    authorId: '2',
    category: '이별했어요',
    title: '오늘 진짜 끝났어요',
    content: '마지막으로 얼굴 보고 왔는데 이제 정말 끝난 것 같아요. 머리로는 아는데 마음이 안 따라와요.',
    timeAgo: '5시간 전',
    location: '수원',
    showDaysSinceBreakup: true,
    allowMessages: true,
  },
  {
    id: '6',
    authorId: '1',
    category: '연락참기',
    title: '3년을 만났는데 아직도 믿기지가 않네',
    content: '3년을 만났는데 어제 그냥 끝이래. 이유는 "지금 나한테 집중하고 싶어서"라는 그 한마디였어. 그 말이 너무 아프다...',
    timeAgo: '6시간 전',
    location: '서울',
    showDaysSinceBreakup: true,
    allowMessages: true,
  },
]

export function getPostActions(category: PostCategory): PostAction[] {
  switch (category) {
    case '연락참기':
      return [
        { emoji: 'heart-handshake', label: '토닥여줘요', count: 89, type: 'empathy' },
        { emoji: 'message-circle', label: '조언해줘요', count: 71, type: 'comment' },
        { emoji: 'star', label: '응원할게요', count: 53, type: 'cheer' },
      ]
    case '위로받기':
      return [
        { emoji: 'heart', label: '안아줄게요', count: 45, type: 'empathy' },
        { emoji: 'message-circle', label: '함께 이야기해요', count: 21, type: 'comment' },
        { emoji: 'mail', label: '쪽지로 위로', count: 0, type: 'message' },
      ]
    case '대화친구':
      return [
        { emoji: 'message-circle-filled', label: '말 걸어보기', count: 0, type: 'primary' },
        { emoji: 'message-circle', label: '같이 얘기해요', count: 16, type: 'comment' },
        { emoji: 'star', label: '조용히 응원', count: 8, type: 'cheer' },
      ]
    case '재회고민':
      return [
        { emoji: 'heart', label: '공감해요', count: 28, type: 'empathy' },
        { emoji: 'message-circle', label: '함께 이야기해요', count: 12, type: 'comment' },
        { emoji: 'mail', label: '위로쪽지', count: 0, type: 'message' },
      ]
    case '이별했어요':
    default:
      return [
        { emoji: 'heart', label: '따뜻해요', count: 67, type: 'empathy' },
        { emoji: 'message-circle', label: '함께 이야기해요', count: 32, type: 'comment' },
        { emoji: 'bookmark', label: '기억하고 있어요', count: 45, type: 'cheer' },
      ]
  }
}

export const CATEGORY_COLORS: Record<string, string> = {
  '연락참기': 'bg-rose-50 text-rose-600',
  '위로받기': 'bg-orange-50 text-orange-600',
  '대화친구': 'bg-emerald-50 text-emerald-600',
  '재회고민': 'bg-purple-50 text-purple-600',
  '이별했어요': 'bg-blue-50 text-blue-600',
}

export const COMMENTS: Comment[] = [
  {
    id: '1',
    postId: '1',
    authorId: '4',
    content: '보내지마요. 나도 어제 참았어요. 같이 버텨요. 새벽은 원래 다 그래요.',
    timeAgo: '5분 전',
    reaction: '도움됐어요',
  },
  {
    id: '2',
    postId: '1',
    authorId: '3',
    content: '핸드폰 내려놓고 물 한 잔 마셔요. 이 새벽만 넘기면 괜찮아질 거예요.',
    timeAgo: '8분 전',
    reaction: '따뜻해요',
  },
  {
    id: '3',
    postId: '1',
    authorId: '5',
    content: '저도 이별 초반에 매일 그랬어요. 지금은 조금 나아졌어요. 참아요.',
    timeAgo: '10분 전',
    reaction: '도움됐어요',
  },
  {
    id: '4',
    postId: '2',
    authorId: '1',
    content: '울어도 괜찮아요. 울고 나면 조금 가벼워질 거예요. 여기 있을게요.',
    timeAgo: '30분 전',
    reaction: '따뜻해요',
  },
  {
    id: '5',
    postId: '2',
    authorId: '4',
    content: '30일이 지나도 아플 수 있어요. 그게 정상이에요. 조금씩 나아져요.',
    timeAgo: '1시간 전',
    reaction: '따뜻해요',
  },
  {
    id: '6',
    postId: '3',
    authorId: '2',
    content: '저도 잠 안 와요. 쪽지 드릴게요.',
    timeAgo: '20분 전',
  },
  {
    id: '7',
    postId: '4',
    authorId: '3',
    content: '42일이면 많이 참으신 거예요. 서두르지 않아도 될 것 같아요.',
    timeAgo: '1시간 전',
    reaction: '도움됐어요',
  },
  {
    id: '8',
    postId: '5',
    authorId: '4',
    content: '마음이 따라오는 데는 시간이 걸려요. 괜찮아요.',
    timeAgo: '2시간 전',
    reaction: '따뜻해요',
  },
  {
    id: '9',
    postId: '6',
    authorId: '2',
    content: '그 말 진짜 힘들었겠다. 말려줄게요. 오늘 밤만 버텨요.',
    timeAgo: '3시간 전',
    reaction: '도움됐어요',
  },
]

export const CHAT_ROOMS: ChatRoom[] = [
  {
    id: '4',
    participantId: '4',
    lastMessage: '오늘은 연락 안 하고 잘 넘겼어요?',
    lastMessageAt: '오후 11:32',
    unreadCount: 2,
  },
  {
    id: '3',
    participantId: '3',
    lastMessage: '감사해요. 덕분에 조금 나아졌어요 :)',
    lastMessageAt: '오후 9:14',
    unreadCount: 0,
  },
  {
    id: '1',
    participantId: '1',
    lastMessage: '맞아요 저도 그랬어요. 결국 참았어요.',
    lastMessageAt: '어제',
    unreadCount: 1,
  },
]

export const CHAT_MESSAGES: Record<string, ChatMessage[]> = {
  '4': [
    { id: '1', senderId: '4', content: '안녕하세요. 글 보고 연락드렸어요.', timeAgo: '어제 11:20' },
    { id: '2', senderId: 'me', content: '안녕하세요. 비슷한 상황인 것 같아서요.', timeAgo: '어제 11:22' },
    { id: '3', senderId: '4', content: '이별 며칠째예요?', timeAgo: '어제 11:24' },
    { id: '4', senderId: 'me', content: '저는 6일째예요. 너무 힘들어요.', timeAgo: '어제 11:25' },
    { id: '5', senderId: '4', content: '저도 비슷해요. 같이 버텨봐요.', timeAgo: '오후 10:15' },
    { id: '6', senderId: '4', content: '오늘은 연락 안 하고 잘 넘겼어요?', timeAgo: '오후 11:32' },
  ],
  '3': [
    { id: '1', senderId: 'me', content: '글 보고 마음이 너무 아파서요.', timeAgo: '어제 9:00' },
    { id: '2', senderId: '3', content: '따뜻하게 봐줘서 감사해요.', timeAgo: '어제 9:05' },
    { id: '3', senderId: 'me', content: '괜찮아질 거예요. 진짜로요.', timeAgo: '오후 9:10' },
    { id: '4', senderId: '3', content: '감사해요. 덕분에 조금 나아졌어요 :)', timeAgo: '오후 9:14' },
  ],
  '1': [
    { id: '1', senderId: '1', content: '쪽지 받아주셔서 감사해요.', timeAgo: '어제 8:00' },
    { id: '2', senderId: 'me', content: '힘들겠다 생각이 들어서요.', timeAgo: '어제 8:05' },
    { id: '3', senderId: '1', content: '맞아요 저도 그랬어요. 결국 참았어요.', timeAgo: '어제 8:10' },
  ],
}

export const CONSOLATION_POSTS = POSTS.filter(p => ['2', '3', '6'].includes(p.id))
