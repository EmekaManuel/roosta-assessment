"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { apiClient } from "@/shared/lib/api-client"
import { QUERY_KEYS } from "@/shared/lib/constants"
import { useBusinessStore } from "@/shared/store/business-store"
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
  const setBusiness = useBusinessStore((s) => s.setBusiness)
  const token = useAuthStore((s) => s.token)

  return useMutation({
    mutationFn: async (data: BusinessProfileFormData): Promise<AuthUser> => {
      await mockDelay(500)
      const isMock = token?.startsWith("mock-jwt-")
      const currentUser = useAuthStore.getState().user

      if (isMock && currentUser) {
        const businessId = `biz-${currentUser.id}`
        setBusiness(businessId, data)
        const updated: AuthUser = {
          ...currentUser,
          onboardingComplete: true,
          businessId,
        }
        setUser(updated)
        return updated
      }

      const res = await apiClient.post<AuthUser & { businessId?: string }>(
        "/businesses",
        data
      )
      const user = res as unknown as AuthUser & { businessId?: string }
      const businessId = user.businessId ?? `biz-${user.id}`
      setBusiness(businessId, data)
      return { ...user, onboardingComplete: true, businessId }
    },
    onSuccess: (user) => {
      setUser(user)
      queryClient.setQueryData([QUERY_KEYS.AUTH], user)
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.SETTINGS] })
      toast.success("Your business is set up!")
      router.push("/dashboard")
    },
    onError: () => {
      toast.error("Could not create business. Please try again.")
    },
  })
}
