import { db } from "../src/lib/db";

async function check() {
  try {
    const result: any = await db.$queryRawUnsafe(`SHOW CREATE TABLE accounts`);
    console.log("TABLE DEFINITION:");
    console.log(result[0]['Create Table']);
  } catch (error) {
    console.error("Failed to check table:", error);
  } finally {
    process.exit();
  }
}

check();
