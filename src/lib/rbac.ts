import { db } from "./db";
import { PermissionNode } from "./permissions";

/**
 * RBAC Utility
 * Core logic for granular permission checks.
 */
export class RBAC {
  /**
   * Checks if a user has a specific permission.
   * Checks user's assigned role and any specific permission overrides.
   */
  static async hasPermission(userLogin: string, permissionNode: PermissionNode): Promise<boolean> {
    try {
      // 1. Fetch user's role and its permissions
      const userWithRole = await db.account.findUnique({
        where: { login: userLogin },
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

      if (!userWithRole?.panelRole?.role) {
        return false;
      }

      // 2. Check if any of the role's permissions match the requested node
      const hasRolePermission = userWithRole.panelRole.role.permissions.some(
        (rp) => rp.permission.node === permissionNode
      );

      return hasRolePermission;
    } catch (error) {
      console.error(`RBAC check failed for ${userLogin}:`, error);
      return false;
    }
  }

  /**
   * Assigns a role to a user.
   */
  static async assignRole(userLogin: string, roleName: string): Promise<boolean> {
    try {
      const role = await db.panelRole.findUnique({ where: { name: roleName } });
      if (!role) return false;

      await db.panelUserRole.upsert({
        where: { userLogin },
        update: { roleId: role.id },
        create: { userLogin, roleId: role.id }
      });
      return true;
    } catch (error) {
      console.error(`Failed to assign role ${roleName} to ${userLogin}:`, error);
      return false;
    }
  }
}
