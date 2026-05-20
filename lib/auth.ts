// Authentication utilities
export const AUTH_KEY = "isLoggedIn"
export const USERNAME_KEY = "username"

export const getAuthStatus = (): boolean => {
  if (typeof window === "undefined") return false
  return localStorage.getItem(AUTH_KEY) === "true"
}

export const getUsername = (): string | null => {
  if (typeof window === "undefined") return null
  return localStorage.getItem(USERNAME_KEY)
}

export const setAuthStatus = (isLoggedIn: boolean, username: string) => {
  localStorage.setItem(AUTH_KEY, isLoggedIn ? "true" : "false")
  if (isLoggedIn) {
    localStorage.setItem(USERNAME_KEY, username)
  } else {
    localStorage.removeItem(USERNAME_KEY)
  }
}

export const clearAuth = () => {
  localStorage.clear()
  sessionStorage.clear()
}
