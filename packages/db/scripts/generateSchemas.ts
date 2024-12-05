import { exec } from "node:child_process";
import { promisify } from "util";

const asyncExec = promisify(exec);

async function generateSchemas() {
  try {
    await asyncExec(`drizzle-kit generate`);
  } catch (err) {
    console.log(err);
  }
}

generateSchemas();
