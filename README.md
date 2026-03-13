<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Auth POC - Authentication System

A progressive authentication system Proof of Concept (POC) built with [NestJS](https://nestjs.com) and [Better Auth](https://better-auth.com).

## 🚀 Core Architecture
- **Framework**: NestJS
- **Auth Engine**: [Better Auth](https://better-auth.com)
- **Database ORM**: Drizzle ORM
- **Database Provider**: MySQL (via `mysql2`)

---

## 🔐 Authentication System Documentation

### Supported Features
- [x] **Email & Password**: Standard credentials-based sign-in.
- [x] **Email Verification**: Required for all accounts (`requireEmailVerification: true`).
- [x] **OTP Verification**: Supporting 6-digit codes for mobile-friendly flows.
- [x] **Link Verification**: Standard click-to-verify URLs.
- [x] **Bearer Authentication**: Support for mobile and cross-origin apps.

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

---

## 📱 Multi-App Authentication Guide

### 1. Multi-Server Deployment
When deploying the backend across multiple servers:
- **`BETTER_AUTH_SECRET`**: Use the EXACT same secret on all servers.
- **Shared Database**: All servers must connect to the same database (MySQL).
- **Session Persistence**: Sessions are automatically shared via the database.

### 2. Using Tokens (Bearer Authentication)
For Mobile Apps or Cross-Origin APIs where cookies are not supported:
1.  **Sign-in**: Use `/api/auth/sign-in/email`.
2.  **Extract Token**: On success, Better Auth returns a `token` in the JSON response.
3.  **Authorized Requests**: Include the token in the `Authorization` header:
    ```http
    Authorization: Bearer <your_session_token>
    ```

### 3. Cross-Origin Applications (CORS)
- **Backend CORS (NestJS)**: Configured in `main.ts` with `credentials: true`.
- **Better Auth `trustedOrigins`**: Configured in `lib/auth.ts` to allow specific app domains.

| Feature | Web App (Same Domain) | Web App (Cross-Origin) | Mobile App (Native) |
| :--- | :--- | :--- | :--- |
| **Session Type** | Cookies | Cookies or Bearer | Bearer Token |
| **Header** | Default | Default or `Authorization` | `Authorization: Bearer` |
| **CORS** | Not needed | Required | Not needed |

---

## 🛠 Project setup

```bash
$ npm install
```

### Compile and run
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

### Run tests
```bash
# unit tests
$ npm run test
# e2e tests
$ npm run test:e2e
```

---

## 🏗 Upcoming Implementation Stages
- [ ] Refactor mock email to use Resend/Nodemailer.
- [ ] Add OAuth Providers (Google, GitHub).
- [ ] Implement SSO.
- [ ] Add Organization/RBAC support.
