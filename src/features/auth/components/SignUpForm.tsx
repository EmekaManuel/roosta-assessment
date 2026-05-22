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
import { signUpSchema, type SignUpFormData } from "../schemas"
import { useSignUp } from "../api/mutations"
import { cn } from "@/shared/lib/utils"

export function SignUpForm() {
  const { mutate: signUp, isPending } = useSignUp()

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  })

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => signUp(data))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-v3-secondary/90">Full name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Amaka Obi"
                  autoComplete="name"
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
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-v3-secondary/90">
                Phone <span className="text-v3-secondary/50">(optional)</span>
              </FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="08012345678"
                  autoComplete="tel"
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
              <FormLabel className="text-v3-secondary/90">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="At least 8 characters"
                  autoComplete="new-password"
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
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-v3-secondary/90">Confirm password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Repeat password"
                  autoComplete="new-password"
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
          {isPending ? "Creating account…" : "Create account"}
        </Button>
        <p className="text-center font-ibm-plex-sans text-sm text-v3-secondary/70">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-v3-secondary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </Form>
  )
}
