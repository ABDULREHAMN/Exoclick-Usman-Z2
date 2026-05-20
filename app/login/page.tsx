"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { setAuthStatus } from "@/lib/auth"

export default function LoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [usernameFocused, setUsernameFocused] = useState(false)
  const [passwordFocused, setPasswordFocused] = useState(false)
  const [isLocked, setIsLocked] = useState(false)
  const [lockTimeRemaining, setLockTimeRemaining] = useState(0)

  const CORRECT_USERNAME = "zahidg7899"
  const CORRECT_PASSWORD = "Zahid.567@"
  const MAX_ATTEMPTS = 3
  const LOCK_DURATION = 15 * 60 * 1000 // 15 minutes in milliseconds

  useEffect(() => {
    // Check if login is locked
    const lockData = localStorage.getItem("loginLock")
    if (lockData) {
      try {
        const { lockTime, attempts } = JSON.parse(lockData)
        const now = Date.now()
        const timeElapsed = now - lockTime
        const timeRemaining = LOCK_DURATION - timeElapsed

        if (timeRemaining > 0) {
          setIsLocked(true)
          setLockTimeRemaining(Math.ceil(timeRemaining / 1000))
        } else {
          // Lock expired, reset attempts
          localStorage.removeItem("loginLock")
          setIsLocked(false)
        }
      } catch (error) {
        // Invalid JSON in lockData, clear it
        localStorage.removeItem("loginLock")
        setIsLocked(false)
      }
    }
  }, [])

  // Update remaining time every second
  useEffect(() => {
    if (!isLocked) return

    const interval = setInterval(() => {
      const lockData = localStorage.getItem("loginLock")
      if (lockData) {
        const { lockTime } = JSON.parse(lockData)
        const now = Date.now()
        const timeElapsed = now - lockTime
        const timeRemaining = LOCK_DURATION - timeElapsed

        if (timeRemaining <= 0) {
          localStorage.removeItem("loginLock")
          setIsLocked(false)
          setError("")
        } else {
          setLockTimeRemaining(Math.ceil(timeRemaining / 1000))
        }
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [isLocked])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Check if account is locked
    if (isLocked) {
      setError(`Too many failed attempts. Please try again later.`)
      setIsLoading(false)
      return
    }

    if (username === CORRECT_USERNAME && password === CORRECT_PASSWORD) {
      // Success - clear any lock data and redirect to dashboard
      localStorage.removeItem("loginLock")
      setAuthStatus(true, username)
      setTimeout(() => {
        router.push("/dashboard")
      }, 500)
    } else {
      // Failed attempt - increment counter
      let loginAttempts = 1
      const lockData = localStorage.getItem("loginLock")

      if (lockData) {
        const data = JSON.parse(lockData)
        loginAttempts = data.attempts + 1
      }

      if (loginAttempts >= MAX_ATTEMPTS) {
        // Lock the account
        const lockInfo = {
          lockTime: Date.now(),
          attempts: loginAttempts,
        }
        localStorage.setItem("loginLock", JSON.stringify(lockInfo))
        setIsLocked(true)
        setLockTimeRemaining(Math.ceil(LOCK_DURATION / 1000))
        setError("Too many failed attempts. Please try again later.")
      } else {
        setError(`Invalid username or password (${MAX_ATTEMPTS - loginAttempts} attempt${MAX_ATTEMPTS - loginAttempts !== 1 ? "s" : ""} remaining)`)
        const lockInfo = {
          lockTime: Date.now(),
          attempts: loginAttempts,
        }
        localStorage.setItem("loginLock", JSON.stringify(lockInfo))
      }

      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-[560px]">
        <div className="text-center mb-12">
          <div className="inline-block">
            <img src="/exoclick-logo.jpg" alt="ExoClick" className="h-16 w-auto object-contain mx-auto" />
          </div>
        </div>

        <div className="w-full">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <div className="text-sm font-medium text-[#0088cc] mb-1">Username</div>
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onFocus={() => setUsernameFocused(true)}
                  onBlur={() => setUsernameFocused(false)}
                  disabled={isLocked}
                  className="w-full px-0 py-2 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0088cc] focus:outline-none text-gray-700 placeholder:text-gray-400 transition-all disabled:opacity-50"
                  style={{
                    placeholderOpacity: usernameFocused ? 0.2 : 1,
                  }}
                  required
                />
                <div
                  className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-opacity duration-150"
                  style={{
                    opacity: username || usernameFocused ? (usernameFocused ? 0.2 : 0) : 1,
                  }}
                >
                  Username
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm font-medium text-[#0088cc] mb-1">Password</div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  disabled={isLocked}
                  className="w-full px-0 py-2 pr-10 bg-transparent border-0 border-b-2 border-gray-300 focus:border-[#0088cc] focus:outline-none text-gray-700 placeholder:text-gray-400 transition-all disabled:opacity-50"
                  required
                />
                <div
                  className="absolute left-0 top-2 text-gray-400 pointer-events-none transition-opacity duration-150"
                  style={{
                    opacity: password || passwordFocused ? (passwordFocused ? 0.2 : 0) : 1,
                  }}
                >
                  Password
                </div>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLocked}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className={`flex items-center gap-2 text-sm ${isLocked ? "text-red-600" : "text-red-600"}`}>
                <span>⚠</span>
                <div>
                  {error}
                  {isLocked && lockTimeRemaining > 0 && (
                    <div className="mt-1">
                      {Math.floor(lockTimeRemaining / 60)}:{String(lockTimeRemaining % 60).padStart(2, "0")} remaining
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="flex justify-between text-sm">
              <Link href="/verify-email" className="text-[#0088cc] hover:underline">
                Verify your email
              </Link>
              <Link href="/forgot-password" className="text-[#0088cc] hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full bg-[#0088cc] hover:bg-[#0077b3] text-white font-bold py-3 rounded text-sm uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "LOGGING IN..." : isLocked ? "ACCOUNT LOCKED" : "LOG IN"}
            </Button>
          </form>

          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm mb-4">Create an Advertiser or Publisher account:</p>
            <Link href="/signup">
              <Button
                variant="outline"
                className="w-full border-2 border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc] hover:text-white font-bold py-3 rounded text-sm uppercase tracking-wide bg-transparent"
              >
                SIGN UP
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
