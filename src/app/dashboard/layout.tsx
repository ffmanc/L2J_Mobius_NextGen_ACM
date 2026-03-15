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

  // Check if user is admin (accesslevel > 0 in characters table, or via a special flag)
  // For now, let's assume accesslevel >= 1 is admin.
  const adminChar = await db.character.findFirst({
    where: { account_name: session.value, accesslevel: { gt: 0 } },
  });
  const isAdmin = !!adminChar;

  return (
    <div className="dashboard-layout">
      {/* Sidebar Component */}
      <Sidebar isAdmin={isAdmin} />

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
