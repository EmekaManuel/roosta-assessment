"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { apiClient } from "@/shared/lib/api-client"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { useAuthStore } from "../store/auth-store"
import type { AuthUser } from "../types"
import type { SignInFormData, SignUpFormData } from "../schemas"
import type { BusinessProfileFormData } from "@/shared/schemas/businessProfile"

interface SignInResponse {
  user: AuthUser
  token: string
}

interface SignUpResponse {
  user: AuthUser
  token: string
}

function mockDelay(ms = 400): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

function mockSignIn(data: SignInFormData): Promise<SignInResponse> {
  return mockDelay().then(() => ({
    user: {
      id: "user-mock-1",
      name: data.email.split("@")[0],
      email: data.email,
      onboardingComplete: false,
    },
    token: `mock-jwt-${Date.now()}-${data.email}`,
  }))
}

function mockSignUp(data: SignUpFormData): Promise<SignUpResponse> {
  return mockDelay().then(() => ({
    user: {
      id: `user-mock-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone && data.phone.trim() !== "" ? data.phone : null,
      onboardingComplete: false,
    },
    token: `mock-jwt-${Date.now()}-${data.email}`,
  }))
}

export function useSignIn() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setSession = useAuthStore((s) => s.setSession)

  return useMutation({
    mutationFn: mockSignIn,
    onSuccess: (data) => {
      setSession(data.token, data.user)
      queryClient.setQueryData([QUERY_KEYS.AUTH], data.user)
      toast.success("Welcome back!")
      router.push(data.user.onboardingComplete !== false ? "/dashboard" : "/onboarding")
    },
    onError: () => {
      toast.error("Invalid email or password. Please try again.")
    },
  })
}

export function useSignUp() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setSession = useAuthStore((s) => s.setSession)

  return useMutation({
    mutationFn: mockSignUp,
    onSuccess: (data) => {
      setSession(data.token, data.user)
      queryClient.setQueryData([QUERY_KEYS.AUTH], data.user)
      toast.success("Account created!")
      router.push("/onboarding")
    },
    onError: () => {
      toast.error("Sign up failed. Please try again.")
    },
  })
}

export function useSignOut() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const logout = useAuthStore((s) => s.logout)

  return useMutation({
    mutationFn: async () => {
      logout()
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.AUTH] })
      router.push("/login")
      toast.success("Signed out")
    },
  })
}

export function useCompleteOnboarding() {
  const queryClient = useQueryClient()
  const router = useRouter()
  const setUser = useAuthStore((s) => s.setUser)
  const token = useAuthStore((s) => s.token)

  return useMutation({
    mutationFn: async (data: BusinessProfileFormData): Promise<AuthUser> => {
      await mockDelay(500)
      const isMock = token?.startsWith("mock-jwt-")
      const currentUser = useAuthStore.getState().user

      if (isMock && currentUser) {
        const updated: AuthUser = {
          ...currentUser,
          onboardingComplete: true,
          businessId: "biz-mock-1",
        }
        setUser(updated)
        return updated
      }

      const res = await apiClient.post<AuthUser>("/businesses", data)
      return res as unknown as AuthUser
    },
    onSuccess: (user) => {
      setUser(user)
      queryClient.setQueryData([QUERY_KEYS.AUTH], user)
      toast.success("Your business is set up!")
      router.push("/dashboard")
    },
    onError: () => {
      toast.error("Could not create business. Please try again.")
    },
  })
}
