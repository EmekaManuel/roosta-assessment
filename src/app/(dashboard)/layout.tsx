import { Sidebar } from "@/shared/components/layout/Sidebar"
import { TopBar } from "@/shared/components/layout/TopBar"
import { AuthGuard } from "@/features/auth"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <div className="fixed inset-0 flex h-screen w-screen bg-background overflow-hidden">
                {/* Desktop sidebar */}
                <div className="hidden md:flex shrink-0">
                    <Sidebar />
                </div>

                {/* Main content area */}
                <div className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden">
                    <TopBar businessName="My Salon" />
                    <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-6">
                        {children}
                    </main>
                </div>
            </div>
        </AuthGuard>
    )
}
