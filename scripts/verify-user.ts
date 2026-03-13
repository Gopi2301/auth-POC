import db from "../src/db";
import { user } from "../src/db/auth-schema";
import { eq } from "drizzle-orm";

async function verifyUser() {
  const email = process.argv[2];
  if (!email) {
    console.error('Please provide an email');
    process.exit(1);
  }

  console.log(`Verifying user ${email}...`);
  try {
    const result = await db.update(user)
      .set({ emailVerified: true })
      .where(eq(user.email, email));
    
    console.log('Verification successful!');
  } catch (error) {
    console.error('Error verifying user:', error);
  }
}

verifyUser();
