# Migration status

## Completed in this package

- A standalone Node.js 20 + TypeScript + Express backend was created.
- All 11 active Next.js API handlers were moved into this backend.
- Existing validation, pricing calculations, payment verification, email handling and response bodies were preserved.
- The backend no longer depends on Next.js at runtime.
- The original frontend and its blog files were not changed or deleted.

## Deliberately not done yet

- The frontend still calls its current `/api/...` URLs.
- The old frontend `src/app/api` directory must remain until live endpoint tests pass.
- No database or admin panel was invented because the current project has no durable service/blog database to migrate.

## Safe cutover sequence

1. Copy this folder beside the frontend project.
2. Fill the backend `.env` with the existing credentials.
3. Run `npm run check` and `npm run dev`.
4. Verify `http://localhost:4000/health`.
5. Test contact, careers, Google reviews, orders, payments and bookings.
6. In a separate step, point frontend `/api` requests to this backend.
7. Only after parity testing, remove the old frontend API routes.

The next service-marketplace and admin work can be developed in this backend without placing server code inside the Next.js frontend.
