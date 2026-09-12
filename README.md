# City Coolies Backend

This is the standalone Node.js + TypeScript backend extracted from the City Coolies Next.js project.

## Requirements

- Node.js 20 or newer
- Existing Razorpay, Gmail and Google credentials

## Start locally

```powershell
cd C:\Users\user\city-coolies\city-coolies-backend
Copy-Item .env.example .env
npm install
npm run check
npm run dev
```

Open `http://localhost:4000/health`. It should return JSON with `"ok": true`.

## Important safety rule

Do not delete `src/app/api` from the frontend yet. First configure credentials, test every endpoint on this backend, then switch the frontend to this server. Remove the old Next.js API routes only after the final parity test.

## Migrated endpoints

- `POST /api/bookings`
- `POST /api/careers/apply`
- `GET /api/google-rating`
- `POST /api/packers-movers/bookings`
- `POST /api/packers-movers/payments/create-order`
- `POST /api/payments/create-order`
- `POST /api/payments/verify`
- `POST /api/quote-requests`
- `POST /api/service-offers/home-services`
- `POST /api/vendor-membership/payment/create-order`
- `POST /api/vendor-membership/payment/verify`

The response formats and validation logic are preserved from the current Next.js API handlers.
