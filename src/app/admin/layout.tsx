import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { RBAC } from "@/lib/rbac";
import { PERMISSIONS } from "@/lib/permissions";

/**
 * Admin Layout
 * Wraps all administrative pages and enforces RBAC at the layout level.
 */
export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("l2j_session");

  if (!session?.value) {
    redirect("/login");
  }

  // Enforce base admin permission
  const hasAccess = await RBAC.hasPermission(session.value, PERMISSIONS.ADMIN_ACCESS);
  if (!hasAccess) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
