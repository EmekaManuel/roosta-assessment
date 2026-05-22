Roosta — Agent Instructions (AGENTS.md)
This file instructs AI coding agents (Antigravity, Codex, etc.) on how to work inside this codebase. 
Read this entire file before writing, editing, or suggesting any code.
⸻
What Is Roosta?
Roosta is a SaaS platform for micro service businesses in Nigeria (salons, clinics, restaurants, schools) to manage two things in one place:
1. Appointments — customers book services online, get WhatsApp/SMS reminders, owners see their daily schedule
2. Staff — clock-in/out tracking, attendance logs, automated monthly payroll calculation, payslips sent via WhatsApp

Target users: small business owners with 2–20 staff, active on Instagram, managing everything on WhatsApp today.
⸻
Tech Stack
Layer	Technology
Framework	Next.js 14 — App Router
Language	TypeScript (strict)
Styling	Tailwind CSS + Shadcn/UI
Forms	React Hook Form + Zod
Data Fetching	TanStack React Query v5
HTTP	Axios via shared api-client
Auth	NextAuth.js
Notifications	Sonner (toast)
Dates	date-fns
Payments	Paystack
⸻
Project Structure
src/
├── app/
│   ├── (site)/             # Landing page — static marketing, no auth
│   ├── (booking)/          # Public booking — no auth required
│   ├── (dashboard)/        # Owner dashboard — always auth-guarded
│   ├── layout.tsx          # Root layout with QueryClientProvider + Toaster
│   └── globals.css
│
├── features/               # All business logic lives here
│   ├── auth/
│   ├── bookings/
│   ├── staff/
│   ├── attendance/
│   ├── payroll/
│   └── business/
│
└── shared/                 # Cross-feature reusable code only
    ├── components/
    │   ├── ui/             # Shadcn auto-generated — DO NOT edit
    │   ├── layout/         # Sidebar, TopBar, PageHeader
    │   ├── feedback/       # EmptyState, LoadingSpinner
    │   └── data/           # DataTable, StatCard
    ├── hooks/              # useDebounce, useMediaQuery
    ├── lib/                # api-client, query-client, formatters, constants
    ├── schemas/            # Shared Zod schemas (phone, pagination, address)
    └── types/              # Global TypeScript types


Feature Folder Template
Every feature follows this exact structure — do not deviate:
features/<name>/
├── api/
│   ├── queries.ts          # All useQuery hooks for this feature
│   └── mutations.ts        # All useMutation hooks for this feature
├── components/             # UI components owned by this feature
├── schemas/
│   └── index.ts            # All Zod schemas + inferred types
├── types/
│   └── index.ts            # TypeScript interfaces for this feature
└── index.ts                # Barrel export — the ONLY public interface

⸻
Core Architectural Rules

Rule 1 — Pages Are Dumb
Pages in app/ contain ZERO business logic. They only import feature components and compose layouts.

// ✅ CORRECT
export default function PayrollPage() {
  return (
    <>
      <PageHeader title="Payroll" description="Review and run monthly payroll" />
      <PayrollTable />
    </>
  )
}

// ❌ WRONG — never fetch or process data in a page
export default function PayrollPage() {
  const { data } = useQuery({ queryKey: ["payroll"], queryFn: fetchPayroll })
  return <div>{data?.map(...)}</div>
}


Rule 2 — Features Export Through Barrel Only
Never import from inside a feature's internal files. Always import from the feature's index.ts.

// ✅ CORRECT
import { useStaffMembers, StaffCard, staffSchema } from "@/features/staff"

// ❌ WRONG
import { useStaffMembers } from "@/features/staff/api/queries"
import { StaffCard } from "@/features/staff/components/StaffCard"


Rule 3 — Features Never Import From Each Other
Features only share code via shared/. If two features need the same utility, it belongs in shared/.

// ❌ WRONG — payroll feature importing from staff feature directly
import { StaffMember } from "@/features/staff/types"

// ✅ CORRECT — shared type lives in shared/types
import { StaffMember } from "@/shared/types"


Rule 4 — Zod Is The Single Source of Truth
Never write a TypeScript type manually for any data that has a Zod schema. Always infer.

// ✅ CORRECT
export const bookingSchema = z.object({
  serviceId: z.string().min(1),
  customerName: z.string().min(2),
  customerPhone: z.string().regex(/^(\+234|0)[789]\d{9}$/, "Invalid Nigerian number"),
  date: z.string().min(1),
  time: z.string().min(1),
})
export type BookingFormData = z.infer<typeof bookingSchema>  // inferred, not written

// ❌ WRONG
type BookingFormData = {
  serviceId: string
  customerName: string
  customerPhone: string
}


Rule 5 — All HTTP Via api-client
Never use raw fetch or create standalone axios instances. All HTTP calls go through shared/lib/api-client.ts.

// ✅ CORRECT
import { apiClient } from "@/shared/lib/api-client"
const staff = await apiClient.get<StaffMember[]>("/staff")

// ❌ WRONG
const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/staff`)


Rule 6 — Query Keys From Constants
Never hardcode React Query key strings. Always use QUERY_KEYS from shared/lib/constants.ts.

// ✅ CORRECT
import { QUERY_KEYS } from "@/shared/lib/constants"
useQuery({ queryKey: [QUERY_KEYS.STAFF, businessId], ... })

// ❌ WRONG
useQuery({ queryKey: ["staff", businessId], ... })

⸻
Patterns To Always Follow

React Query — Query Hook Pattern
// features/attendance/api/queries.ts
import { useQuery } from "@tanstack/react-query"
import { apiClient } from "@/shared/lib/api-client"
import { QUERY_KEYS } from "@/shared/lib/constants"
import type { AttendanceLog } from "../types"

export function useAttendanceLogs(businessId: string) {
  return useQuery({
    queryKey: [QUERY_KEYS.ATTENDANCE, businessId],
    queryFn: () => apiClient.get<AttendanceLog[]>(`/attendance?businessId=${businessId}`),
    staleTime: 1000 * 60 * 2,
    enabled: !!businessId,
  })
}


React Query — Mutation Hook Pattern
// features/attendance/api/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { apiClient } from "@/shared/lib/api-client"
import { QUERY_KEYS } from "@/shared/lib/constants"

export function useClockIn() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (staffId: string) => apiClient.post("/attendance/clock-in", { staffId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.ATTENDANCE] })
      toast.success("Clocked in successfully!")
    },
    onError: () => {
      toast.error("Failed to clock in. Try again.")
    },
  })
}


Form Pattern — React Hook Form + Zod + Shadcn
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form, FormField, FormItem,
  FormLabel, FormControl, FormMessage
} from "@/shared/components/ui/form"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { staffSchema, type StaffFormData } from "../schemas"
import { useCreateStaff } from "../api/mutations"

export function StaffForm() {
  const form = useForm<StaffFormData>({
    resolver: zodResolver(staffSchema),
    defaultValues: { name: "", phone: "", payType: "fixed", payRate: 0 },
  })
  const { mutate: createStaff, isPending } = useCreateStaff()

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((data) => createStaff(data))} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Amaka Obi" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Add Staff Member"}
        </Button>
      </form>
    </Form>
  )
}


Component Pattern
// ✅ Correct component structure
interface StaffCardProps {
  staff: StaffMember
  onEdit: (id: string) => void
  onDeactivate: (id: string) => void
}

export function StaffCard({ staff, onEdit, onDeactivate }: StaffCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{staff.name}</CardTitle>
        <Badge>{staff.role}</Badge>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{staff.phone}</p>
        <p className="text-sm font-medium">{formatCurrency(staff.payRate)}</p>
      </CardContent>
    </Card>
  )
}

⸻
TypeScript Rules
- Strict mode always — zero any types. Use unknown + type guards if truly needed.
- Use interface for object shapes that may be extended.
- Use type for unions, intersections, and Zod-inferred types.
- Use import type for type-only imports.
- All API response shapes must use ApiResponse<T> or PaginatedResponse<T> from shared/types/api.ts.
⸻
Styling Rules
- Tailwind utility classes only — no inline styles, no CSS modules.
- Use cn() from shared/lib/utils.ts for conditional classes.
- Roosta brand tokens:
    - Primary: #1A6B45 (deep green) → configured as primary CSS variable
    - Accent: #F97316 (orange) → text-orange-500, bg-orange-500
    - Neutrals: Tailwind slate scale
- Mobile-first. Dashboard must be fully usable on mobile — owners check it on their phones.
- Dark mode supported via Shadcn CSS variables. Never hardcode light-only hex colors.
⸻
Nigerian Market Rules
- Phone validation: /^(\+234|0)[789]\d{9}$/ — always use this regex, never a generic phone validator
- Currency: Always format as NGN using formatCurrency() from shared/lib/formatters.ts
- Payments: Paystack only — NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY
- WhatsApp: First-class notification channel. Payslips, booking reminders, and receipts go via WhatsApp
- Date display: dd MMM yyyy format (e.g. "26 Feb 2026") via date-fns
⸻
File Naming
Type	Convention	Example
React components	PascalCase	PayrollTable.tsx
Hooks	camelCase, use prefix	usePayroll.ts
Schemas	camelCase, Schema suffix	payrollSchema
Types/Interfaces	PascalCase	PayrollRecord
Utility functions	camelCase	formatCurrency.ts
API files	lowercase	queries.ts, mutations.ts
Next.js files	lowercase	page.tsx, layout.tsx
⸻
Import Order
1. React / Next.js core
2. Third-party packages
3. @/shared/ imports
4. @/features/ imports
5. Relative imports
6. import type — always last
⸻
Environment Variables
NEXT_PUBLIC_API_URL                 # Express backend base URL
NEXT_PUBLIC_APP_URL                 # Frontend app URL
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY     # Paystack public key
NEXTAUTH_SECRET                     # NextAuth secret
NEXTAUTH_URL                        # NextAuth callback base URL

Never access process.env directly in components. Use typed constants from shared/lib/constants.ts.
⸻
Absolute Prohibitions
The agent must NEVER do any of the following:
#	Prohibition
1	Use any type anywhere
2	Write TypeScript types manually for data that has a Zod schema
3	Fetch data inside page files (app/**/page.tsx)
4	Import from inside a feature (bypass barrel export)
5	Import one feature directly into another feature
6	Edit files in shared/components/ui/ — Shadcn owns these
7	Hardcode React Query key strings — use QUERY_KEYS
8	Use raw fetch or create new axios instances
9	Add business logic inside shared/ components
10	Store auth tokens or sensitive data in localStorage — use NextAuth sessions
11	Skip loading states — always show <Skeleton /> or <LoadingSpinner />
12	Skip empty states — always show <EmptyState /> when lists have no data
13	Use React.FC — use plain function declarations with explicit prop types
14	Use inline styles — Tailwind only
15	Hardcode Nigerian phone regex — import from shared/schemas/phone.ts
⸻
When Adding a New Feature
Follow this exact sequence:

1. Create folder: src/features/<name>/
2. Add subfolders: api/, components/, schemas/, types/
3. Create schemas/index.ts — define Zod schemas first, infer types
4. Create types/index.ts — interfaces for non-form data shapes
5. Create api/queries.ts — React Query hooks using apiClient
6. Create api/mutations.ts — mutations with invalidation + toast
7. Create components in components/ — form, list, card, detail
8. Create index.ts — barrel export everything
9. Add the new query key to shared/lib/constants.ts QUERY_KEYS
10. Wire up in the relevant app/(dashboard)/ page — keep the page dumb
⸻
When Editing Existing Code
- Always check the feature's index.ts barrel before adding new exports.
- Always check QUERY_KEYS before creating a new query — avoid duplicates.
- Always check shared/schemas/ before writing a new Zod schema — it may already exist.
- When adding a new form field, update both the Zod schema AND the form component together.
- When adding a new API endpoint call, add it to the feature's queries.ts or mutations.ts — never inline.
