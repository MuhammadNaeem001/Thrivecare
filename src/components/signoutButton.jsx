"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signOut } from "next-auth/react"
import { createClient } from "@/utils/supabase/client"


export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleLogout = async () => {
    setLoading(true)

    try {
      await supabase.auth.signOut()

      await signOut({ redirect: false })

      router.push("/signin")
      router.refresh()
    } catch (error) {
      console.error("Error signing out:", error)
    } finally {
      setLoading(false)
    }
  }


  
  return (
    <button onClick={handleLogout} variant="outline" disabled={loading}>
      {loading ? (
        <>
          Signing out...
        </>
      ) : (
        "Sign out"
      )}
    </button>
  )
}
