import { RBAC } from "../src/lib/rbac";

async function promote() {
  const login = "ffmanc";
  const role = "MASTER";
  console.log(`🚀 Promoting ${login} to ${role}...`);
  
  const success = await RBAC.assignRole(login, role);
  if (success) {
    console.log("✅ Promotion successful!");
  } else {
    console.error("❌ Promotion failed.");
  }
  process.exit();
}

promote();
