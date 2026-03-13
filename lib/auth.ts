import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../src/db";
import * as schema from "../src/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true
    },
    advanced: {
        disableCSRFCheck: true // Suggested for easier manual testing in Postman
    }
})