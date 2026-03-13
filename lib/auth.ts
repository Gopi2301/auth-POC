import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import db from "../src/db";
import * as schema from "../src/db/schema";
import { emailOTP } from "better-auth/plugins/email-otp";
import { sendEmail } from "./email";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "mysql",
        schema: schema,
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true, // Block sign-in until email is verified
    },
    account: {
        accountLinking: {
            enabled: true, // Automatically link accounts with the same email
        }
    },
    advanced: {
        disableCSRFCheck: true, // Suggested for easier manual testing in Postman
        emailEnumerationProtection: true, // Prevent attackers from identifying registered emails
    },
    emailVerification: {
        enabled: true,
        autoSendOnSignup: true,
        sendOnSignup: true,
        sendOnPasswordReset: true,
        sendOnEmailChange: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {
            await sendEmail({
                to: user.email,
                subject: "Verify your email address",
                text: `Click the link to verify your email: ${url}`,
            });
        },
    },
    plugins: [
        emailOTP({
            async sendVerificationOTP({ email, otp, type }) {
                let subject = "";
                let text = "";

                if (type === "email-verification") {
                    subject = "Verify your email with OTP";
                    text = `Your verification code is: ${otp}`;
                } else if (type === "forget-password") {
                    subject = "Reset your password with OTP";
                    text = `Your password reset code is: ${otp}`;
                } else if (type === "change-email") {
                    subject = "Change your email with OTP";
                    text = `Your email change verification code is: ${otp}`;
                }

                if (subject) {
                    await sendEmail({ to: email, subject, text });
                }
            }
        })
    ]
})