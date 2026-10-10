# WebTutor_BE

Backend foundation for week 1 of WebTutorCenter.

## Included

- Express HTTP server.
- `GET /health`.
- MongoDB connection module.
- Environment template.
- Standard success/error response shapes.
- Centralized 404 and system error handling.
- Foundation tests.

## Run

```powershell
Copy-Item .env.example .env
# Set MONGODB_URI in .env
npm install
npm run dev
```

The server connects to MongoDB before listening. This prevents the application from appearing healthy when its database dependency is unavailable.
