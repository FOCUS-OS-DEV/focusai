import { Suspense } from 'react'
import LoginClient from './LoginClient'

export const dynamic = 'force-dynamic'

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse text-purple-600">טוען...</div>
      </div>
    }>
      <LoginClient />
    </Suspense>
  )
}
