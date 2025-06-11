'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import UpdatePassword from '../ForgotPassword/UpdatePassword'
import supabase from '@/utils/supabase/client'

const VerifyToken = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const token = searchParams.get('token')
  const type = searchParams.get('type')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showResetForm, setShowResetForm] = useState(false)

  useEffect(() => {
    const handleToken = async () => {
      if (!token || !type) {
        setError('Missing token or type')
        setLoading(false)
        return}

      if (type === 'recovery') {
        setShowResetForm(true)
        setLoading(false)
      } else if (type === 'signup') {
        const { data, error } = await supabase.auth.verifyEmail(token)
        if (error) {
            router.push('/auth/signin?error=verification_failed')
          setError('Email verification failed')
        } else {
          router.push('/auth/signin?verified=true')
        }
        setLoading(false)
      }
    }

    handleToken()
  }, [token, type, router])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>
  if (showResetForm) return <UpdatePassword />

  return <div>Verifying...</div>
}

export default VerifyToken
