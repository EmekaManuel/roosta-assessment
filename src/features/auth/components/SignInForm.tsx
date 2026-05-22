"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { DEMO_SIGN_IN_HINT } from "../lib/demo-credentials"
import { signInSchema, type SignInFormData } from "../schemas"
import { useSignIn } from "../api/mutations"
import { cn } from "@/shared/lib/utils"

export function SignInForm() {
  const { mutate: signIn, isPending } = useSignIn()

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => signIn(data))}
        className="space-y-4"
      >
    
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-v3-secondary/90">Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className={cn(
                    "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                    "placeholder:text-v3-secondary/40 focus-visible:ring-v3-secondary/50"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-v3-secondary/80" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between">
                <FormLabel className="text-v3-secondary/90">Password</FormLabel>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-v3-secondary/70 hover:text-v3-secondary"
                >
                  Forgot?
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className={cn(
                    "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                    "placeholder:text-v3-secondary/40 focus-visible:ring-v3-secondary/50"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-v3-secondary/80" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "h-11 w-full rounded-[8px] font-ibm-plex-sans text-sm font-medium",
            "bg-v3-secondary text-v3-primary hover:bg-v3-secondary/90"
          )}
        >
          {isPending ? "Signing in…" : "Sign in"}
        </Button>
        <p className="text-center font-ibm-plex-sans text-sm text-v3-secondary/70">
          Don’t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-v3-secondary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </Form>
  )
}
