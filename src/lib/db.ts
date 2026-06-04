import {
  collection, doc, addDoc, getDoc, getDocs,
  updateDoc, increment, orderBy, query, where,
  serverTimestamp, Timestamp, limit
} from 'firebase/firestore'
import { db } from './firebase'

export interface DbPost {
  id?: string
  authorId: string
  authorNickname: string
  authorLocation: string
  authorStatus: string
  authorDays: number
  category: string
  title: string
  content: string
  createdAt?: Timestamp
  commentCount: number
  likeCount: number
  shareCount: number
  allowMessages: boolean
  timeAgo?: string
}

export interface DbComment {
  id?: string
  postId: string
  authorId: string
  authorNickname: string
  authorLocation: string
  authorDays: number
  content: string
  createdAt?: Timestamp
  likeCount: number
}

function timeAgo(ts: Timestamp | undefined): string {
  if (!ts) return '방금 전'
  const diff = Date.now() - ts.toMillis()
  const m = Math.floor(diff / 60000)
  if (m < 1) return '방금 전'
  if (m < 60) return `${m}분 전`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}시간 전`
  return `${Math.floor(h / 24)}일 전`
}

export async function getPosts(category?: string): Promise<DbPost[]> {
  const ref = collection(db, 'posts')
  const q = category && category !== '전체'
    ? query(ref, where('category', '==', category), orderBy('createdAt', 'desc'), limit(50))
    : query(ref, orderBy('createdAt', 'desc'), limit(50))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data(), timeAgo: timeAgo((d.data() as any).createdAt) } as DbPost))
}

export async function getPost(id: string): Promise<DbPost | null> {
  const snap = await getDoc(doc(db, 'posts', id))
  if (!snap.exists()) return null
  return { id: snap.id, ...snap.data(), timeAgo: timeAgo((snap.data() as any).createdAt) } as DbPost
}

export async function createPost(data: Omit<DbPost, 'id' | 'createdAt' | 'commentCount' | 'likeCount' | 'shareCount'>): Promise<string> {
  const ref = await addDoc(collection(db, 'posts'), {
    ...data,
    commentCount: 0,
    likeCount: 0,
    shareCount: 0,
    createdAt: serverTimestamp(),
  })
  return ref.id
}

export async function likePost(postId: string) {
  await updateDoc(doc(db, 'posts', postId), { likeCount: increment(1) })
}

export async function getComments(postId: string): Promise<DbComment[]> {
  const q = query(collection(db, 'comments'), where('postId', '==', postId), orderBy('createdAt', 'desc'))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data(), timeAgo: timeAgo((d.data() as any).createdAt) } as any))
}

export async function addComment(data: Omit<DbComment, 'id' | 'createdAt' | 'likeCount'>) {
  await addDoc(collection(db, 'comments'), {
    ...data,
    likeCount: 0,
    createdAt: serverTimestamp(),
  })
  await updateDoc(doc(db, 'posts', data.postId), { commentCount: increment(1) })
}

export async function likeComment(commentId: string) {
  await updateDoc(doc(db, 'comments', commentId), { likeCount: increment(1) })
}
