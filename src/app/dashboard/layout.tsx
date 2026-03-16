import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import { db } from "@/lib/db";
import { logout } from "@/app/actions/authActions";
import { PageTransition } from "@/components/layout/PageTransition";

/**
 * Dashboard Layout
 * Protected area wrapper. Checks for the session cookie before rendering the children.
 */
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("l2j_session");

  if (!session?.value) {
    redirect("/login");
  }

  // Fetch user with RBAC role and permissions
  const user = await db.account.findUnique({
    where: { login: session.value },
    include: {
      panelRole: {
        include: {
          role: {
            include: {
              permissions: {
                include: {
                  permission: true
                }
              }
            }
          }
        }
      }
    }
  });

  // Extract permission nodes
  // @ts-ignore - Prisma hydration may be delayed
  const permissions = (user as any)?.panelRole?.role?.permissions?.map((rp: any) => rp.permission.node) || [];

  return (
    <div className="dashboard-layout">
      {/* Sidebar Component with dynamic permissions */}
      <Sidebar userPermissions={permissions} />

      <div className="main-content-wrapper">
        {/* Top Navigation Bar Component */}
        <Topbar username={session.value} onLogout={logout} />

        {/* Main Page Area */}
        <main className="dashboard-content">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
