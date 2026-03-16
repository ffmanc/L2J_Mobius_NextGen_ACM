import { db } from "../src/lib/db";

async function init() {
  console.log("🛠️ Initializing RBAC Tables with utf8mb3 collation...");

  try {
    // 1. Panel Roles
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS panel_roles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(191) UNIQUE NOT NULL,
        description TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
    `);

    // 2. Panel Permissions
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS panel_permissions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        node VARCHAR(191) UNIQUE NOT NULL,
        description TEXT
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
    `);

    // 3. Role Permissions (Many-to-Many)
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS panel_role_permissions (
        roleId INT NOT NULL,
        permissionId INT NOT NULL,
        PRIMARY KEY (roleId, permissionId),
        CONSTRAINT fk_role FOREIGN KEY (roleId) REFERENCES panel_roles (id) ON DELETE CASCADE,
        CONSTRAINT fk_permission FOREIGN KEY (permissionId) REFERENCES panel_permissions (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
    `);

    // 4. User Roles (One-to-One / Mapping)
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS panel_user_roles (
        userLogin VARCHAR(45) PRIMARY KEY,
        roleId INT NOT NULL,
        CONSTRAINT fk_user_login FOREIGN KEY (userLogin) REFERENCES accounts (login) ON DELETE CASCADE,
        CONSTRAINT fk_user_role FOREIGN KEY (roleId) REFERENCES panel_roles (id) ON DELETE CASCADE
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
    `);

    console.log("✅ RBAC Tables created successfully!");
  } catch (error) {
    console.error("❌ Failed to initialize tables:", error);
  } finally {
    process.exit();
  }
}

init();
