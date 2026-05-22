"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { businessProfileSchema, type BusinessProfileFormData } from "@/shared/schemas/businessProfile"
import { getAppUrl } from "@/shared/lib/constants"
import { useCompleteOnboarding } from "../api/mutations"
import { cn } from "@/shared/lib/utils"

const CATEGORIES = [
  "Salon & Beauty",
  "Barbershop",
  "Clinic",
  "Restaurant",
  "Fitness",
  "Photography",
  "School",
  "Other",
]

const DAYS_OPTIONS = [
  { value: "1,2,3,4,5", label: "Mon–Fri" },
  { value: "1,2,3,4,5,6", label: "Mon–Sat" },
  { value: "0,1,2,3,4,5,6", label: "Every day" },
  { value: "0", label: "Sunday only" },
  { value: "1", label: "Monday only" },
  { value: "2", label: "Tuesday only" },
  { value: "3", label: "Wednesday only" },
  { value: "4", label: "Thursday only" },
  { value: "5", label: "Friday only" },
  { value: "6", label: "Saturday only" },
]

export function OnboardingWizard() {
  const [step, setStep] = useState<"welcome" | "details" | "done">("welcome")
  const { mutate: completeOnboarding, isPending } = useCompleteOnboarding()

  const form = useForm<BusinessProfileFormData>({
    resolver: zodResolver(businessProfileSchema),
    defaultValues: {
      name: "",
      slug: "",
      tagline: "",
      location: "",
      phone: "",
      category: "",
      openTime: "09:00",
      closeTime: "18:00",
      openDays: [1, 2, 3, 4, 5],
    },
  })

  const slug = form.watch("slug")
  const baseUrl = getAppUrl()

  const onSubmit = (data: BusinessProfileFormData) => completeOnboarding(data)

  if (step === "welcome") {
    return (
      <Form {...form}>
        <div className="w-full max-w-[520px] mx-auto">
          <div className="mb-10">
            <p className="font-ibm-plex-sans text-xs font-medium tracking-[0.14em] uppercase text-v3-secondary/60 mb-2">
              Step 1 of 2
            </p>
            <h1 className="font-ibm-plex-serif text-2xl sm:text-3xl font-normal text-v3-secondary mb-2">
              Set up your company
            </h1>
            <p className="font-ibm-plex-sans text-sm leading-relaxed text-v3-secondary/70">
              Tell us about your business so we can set up your booking page and dashboard.
            </p>
          </div>

          <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-v3-secondary/90">Business name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Glam Beauty Salon"
                    className={cn(
                      "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                      "placeholder:text-v3-secondary/40"
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-v3-secondary/90">Booking page URL</FormLabel>
                <FormControl>
                  <Input
                    placeholder="glam-salon"
                    className={cn(
                      "h-11 rounded-[8px] font-mono border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                      "placeholder:text-v3-secondary/40"
                    )}
                    {...field}
                  />
                </FormControl>
                {baseUrl && (
                  <p className="text-xs text-v3-secondary/50">
                    {baseUrl}/book/{slug || "your-slug"}
                  </p>
                )}
                <FormMessage className="text-v3-secondary/80" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-v3-secondary/90">Category</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary"
                      )}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {CATEGORIES.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-v3-secondary/80" />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="button"
          onClick={() =>
            form.trigger(["name", "slug", "category"]).then((ok) => ok && setStep("details"))
          }
          className={cn(
            "mt-8 h-11 w-full rounded-[8px] font-ibm-plex-sans text-sm font-medium",
            "bg-v3-secondary text-v3-primary hover:bg-v3-secondary/90"
          )}
        >
          Continue
        </Button>
      </div>
      </Form>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[520px] mx-auto">
        <div className="mb-10">
          <p className="font-ibm-plex-sans text-xs font-medium tracking-[0.14em] uppercase text-v3-secondary/60 mb-2">
            Step 2 of 2
          </p>
          <h1 className="font-ibm-plex-serif text-2xl sm:text-3xl font-normal text-v3-secondary mb-2">
            Contact & opening hours
          </h1>
          <p className="font-ibm-plex-sans text-sm leading-relaxed text-v3-secondary/70">
            Customers will use this to reach you. You can change it later in settings.
          </p>
        </div>

        <div className="space-y-4">
          <FormField
            control={form.control}
            name="tagline"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-v3-secondary/90">Tagline (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Premium hair & beauty in Lagos"
                    className={cn(
                      "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                      "placeholder:text-v3-secondary/40"
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
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-v3-secondary/90">Address (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="23 Allen Avenue, Ikeja"
                    className={cn(
                      "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                      "placeholder:text-v3-secondary/40"
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
                <FormLabel className="text-v3-secondary/90">Contact phone / WhatsApp</FormLabel>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="09012345678"
                    className={cn(
                      "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary",
                      "placeholder:text-v3-secondary/40"
                    )}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-v3-secondary/80" />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="openTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-v3-secondary/90">Opening time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className={cn(
                        "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary"
                      )}
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-v3-secondary/80" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="closeTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-v3-secondary/90">Closing time</FormLabel>
                  <FormControl>
                    <Input
                      type="time"
                      className={cn(
                        "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary"
                      )}
                      {...field}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage className="text-v3-secondary/80" />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="openDays"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-v3-secondary/90">Open days</FormLabel>
                <Select
                  onValueChange={(v) => field.onChange(v.split(",").map(Number))}
                  value={[...(field.value ?? [])].sort((a, b) => a - b).join(",")}
                >
                  <FormControl>
                    <SelectTrigger
                      className={cn(
                        "h-11 rounded-[8px] border-v3-secondary/30 bg-v3-primary text-v3-secondary"
                      )}
                    >
                      <SelectValue placeholder="Select days" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DAYS_OPTIONS.map((opt) => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-v3-secondary/80" />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-8 flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setStep("welcome")}
            className={cn(
              "h-11 rounded-[8px] font-ibm-plex-sans text-sm border-v3-secondary/30 text-v3-secondary"
            )}
          >
            Back
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className={cn(
              "h-11 flex-1 rounded-[8px] font-ibm-plex-sans text-sm font-medium",
              "bg-v3-secondary text-v3-primary hover:bg-v3-secondary/90"
            )}
          >
            {isPending ? "Setting up…" : "Finish setup"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
