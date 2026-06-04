'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function RootPage() {
  const router = useRouter()

  useEffect(() => {
    const profile = localStorage.getItem('wecando_profile')
    if (profile) {
      router.replace('/home')
    } else {
      router.replace('/onboarding')
    }
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-charcoal-400 text-sm animate-pulse font-serif">잠깐만요...</div>
    </div>
  )
}
