# Auth POC - System Documentation

This is a living document that tracks the implementation details of our Authentication system.

## 1. Core Architecture
- **Framework**: NestJS
- **Auth Engine**: [Better Auth](https://better-auth.com)
- **Database ORM**: Drizzle ORM
- **Database Provider**: MySQL (via `mysql2`)

## 2. Authentication Flow
Current implementation is centered around `lib/auth.ts` and the `AuthController`.

### Supported Features
- [x] **Email & Password**: Standard credentials-based sign-in.
- [x] **Email Verification**: Required for all accounts (`requireEmailVerification: true`).
- [x] **OTP Verification**: Supporting 6-digit codes for mobile-friendly flows.
- [x] **Link Verification**: Standard click-to-verify URLs.

### Security Implementation
- **Email Enumeration Protection**: Enabled. Signup attempts with existing emails return `200 OK` to prevent account discovery.
- **Account Linking**: Enabled. Automatically merges social logins with existing email/password accounts if the email matches.
- **CSRF Protection**: Currently disabled in development (`disableCSRFCheck: true`) for Postman testing.

### Recommended Signup UX Flow
To maintain security (Enumeration Protection) while providing great UX, we follow this logic:

1. **User Submits Signup Form**: Frontend sends `POST /api/auth/sign-up/email`.
2. **API Response**: Always returns `200 OK` (unless validation fails).
3. **Frontend Message**: *"If an account exists with this email, we've sent a verification link/code. Please check your inbox."*
4. **Internal Logic**:
    - **New User**: Created as `unverified` -> Verification email sent.
    - **Existing Unverified**: Account exists -> New verification email/OTP sent.
    - **Existing Verified**: Account exists -> A "Login Attempt" or "Login Link" email is sent to notify the user.

## 3. Infrastructure
- **Email Utility**: Located in `lib/email.ts`. Currently logic is a console-log mock for development.
- **Schema Management**: Auth tables are generated using `@better-auth/cli` and managed via Drizzle in `src/db/auth-schema.ts`.

## 4. How to Verify
| Method | Endpoint | Logic |
| :--- | :--- | :--- |
| **Link** | `GET /api/auth/verify-email?token=...` | Handled automatically by `AuthController`. |
| **OTP** | `POST /api/auth/email-otp/verify` | Request body: `{ email, otp }`. |
| **Sign Up** | `POST /api/auth/sign-up/email` | Triggers verification email/OTP. |

## 5. Upcoming Implementation Stages
- [ ] Refactor mock email to use Resend/Nodemailer.
- [ ] Add OAuth Providers (Google, GitHub).
- [ ] Implement SSO.
- [ ] Add Organization/RBAC support.
