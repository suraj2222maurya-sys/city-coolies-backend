import "dotenv/config";

import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";

import { adaptWebRoute } from "./framework/express-adapter";
import { POST as createBooking } from "./routes/bookings/route";
import { POST as applyForCareer } from "./routes/careers/apply/route";
import { GET as getGoogleRating } from "./routes/google-rating/route";
import { POST as createPackersMoversBooking } from "./routes/packers-movers/bookings/route";
import { POST as createPackersMoversOrder } from "./routes/packers-movers/payments/create-order/route";
import { POST as createPaymentOrder } from "./routes/payments/create-order/route";
import { POST as verifyPayment } from "./routes/payments/verify/route";
import { POST as createQuoteRequest } from "./routes/quote-requests/route";
import { POST as claimHomeServicesOffer } from "./routes/service-offers/home-services/route";
import { POST as createVendorMembershipOrder } from "./routes/vendor-membership/payment/create-order/route";
import { POST as verifyVendorMembershipPayment } from "./routes/vendor-membership/payment/verify/route";

const app = express();
const port = Number.parseInt(process.env.PORT || "4000", 10);
const origins = (process.env.FRONTEND_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(cors({ origin: origins, credentials: true }));
app.use(
  express.raw({
    type: () => true,
    limit: process.env.REQUEST_BODY_LIMIT || "10mb",
  }),
);

app.get("/health", (_request, response) => {
  response.json({
    ok: true,
    service: "city-coolies-backend",
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/bookings", adaptWebRoute(createBooking));
app.post("/api/careers/apply", adaptWebRoute(applyForCareer));
app.get("/api/google-rating", adaptWebRoute(getGoogleRating));
app.post("/api/packers-movers/bookings", adaptWebRoute(createPackersMoversBooking));
app.post("/api/packers-movers/payments/create-order", adaptWebRoute(createPackersMoversOrder));
app.post("/api/payments/create-order", adaptWebRoute(createPaymentOrder));
app.post("/api/payments/verify", adaptWebRoute(verifyPayment));
app.post("/api/quote-requests", adaptWebRoute(createQuoteRequest));
app.post("/api/service-offers/home-services", adaptWebRoute(claimHomeServicesOffer));
app.post("/api/vendor-membership/payment/create-order", adaptWebRoute(createVendorMembershipOrder));
app.post("/api/vendor-membership/payment/verify", adaptWebRoute(verifyVendorMembershipPayment));

app.use((_request: Request, response: Response) => {
  response.status(404).json({ error: "API route not found." });
});

app.use((error: unknown, _request: Request, response: Response, _next: NextFunction) => {
  console.error(error);
  response.status(500).json({ error: "Internal server error." });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`City Coolies backend running at http://localhost:${port}`);
});
