# WebTutor_BE

Backend foundation for the rebuild project. The current milestone intentionally
contains only the registration and email OTP flow.

## Included scope

- Express application foundation.
- MongoDB/Mongoose configuration.
- Common response and error handling.
- Input sanitization, security headers, CORS and OTP rate limiting.
- `POST /api/auth/register`.
- `POST /api/auth/verify-otp`.
- `POST /api/auth/resend-otp`.
- Temporary registration and OTP persistence models.
- Password hashing and HMAC-based OTP verification.
- Console OTP mode for local development.

Login, profile, tutor, class, chat, payment and admin modules will be added in
later rebuild milestones.

## Local setup

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Set `MONGODB_URI` to a running MongoDB instance. Use `EMAIL_MODE=console` to
print the OTP in the backend terminal instead of requiring Gmail credentials.

## Tests

```powershell
npm test
```

The register tests use in-memory mocks and do not require MongoDB. Running the
full application flow requires MongoDB.
