import { db } from "../src/lib/db";
import { PERMISSIONS, DEFAULT_ROLES } from "../src/lib/permissions";

/**
 * RBAC Seeding Script
 * Initializes the database with atomic permissions and default roles.
 */
async function seed() {
  console.log("🌱 Seeding RBAC...");

  try {
    // 1. Create all atomic permissions
    const permissionMap = new Map();
    for (const node of Object.values(PERMISSIONS)) {
      const p = await db.panelPermission.upsert({
        where: { node },
        update: {},
        create: { node, description: `Permission for ${node}` },
      });
      permissionMap.set(node, p.id);
    }
    console.log(`✅ Created ${permissionMap.size} permissions.`);

    // 2. Create Default Roles and assign permissions
    for (const [roleName, permissionNodes] of Object.entries(DEFAULT_ROLES)) {
      const role = await db.panelRole.upsert({
        where: { name: roleName },
        update: {},
        create: { name: roleName, description: `${roleName} default role` },
      });

      // Assign permissions to role
      for (const node of permissionNodes) {
        const permissionId = permissionMap.get(node);
        if (permissionId) {
          await db.panelRolePermission.upsert({
            where: {
              roleId_permissionId: {
                roleId: role.id,
                permissionId,
              },
            },
            update: {},
            create: { roleId: role.id, permissionId },
          });
        }
      }
      console.log(`✅ Configured role: ${roleName}`);
    }

    console.log("✨ RBAC Seeding complete!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  } finally {
    process.exit();
  }
}

seed();
