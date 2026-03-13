import db from "../src/db";
import { user } from "../src/db/auth-schema";

async function checkUser() {
  console.log('Checking user table...');
  try {
    const users = await db.select().from(user);
    console.log('Total users:', users.length);
    console.log('Users:', JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

checkUser();
