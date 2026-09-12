import type { NextFunction, Request as ExpressRequest, Response as ExpressResponse } from "express";

export type WebRouteHandler = (request: Request) => Promise<Response> | Response;

function requestUrl(request: ExpressRequest): string {
  const forwardedProtocol = request.header("x-forwarded-proto")?.split(",")[0]?.trim();
  const protocol = forwardedProtocol || request.protocol || "http";
  const host = request.header("host") || "localhost";
  return `${protocol}://${host}${request.originalUrl}`;
}

function requestHeaders(request: ExpressRequest): Headers {
  const headers = new Headers();

  for (const [name, value] of Object.entries(request.headers)) {
    if (Array.isArray(value)) {
      value.forEach((item) => headers.append(name, item));
    } else if (value !== undefined) {
      headers.set(name, value);
    }
  }

  return headers;
}

export function adaptWebRoute(handler: WebRouteHandler) {
  return async (
    request: ExpressRequest,
    response: ExpressResponse,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const method = request.method.toUpperCase();
      const mayHaveBody = method !== "GET" && method !== "HEAD";
      const rawBody = Buffer.isBuffer(request.body)
        ? Uint8Array.from(request.body)
        : undefined;

      const webRequest = new Request(requestUrl(request), {
        method,
        headers: requestHeaders(request),
        body: mayHaveBody && rawBody?.byteLength ? rawBody : undefined,
      });

      const webResponse = await handler(webRequest);

      response.status(webResponse.status);
      webResponse.headers.forEach((value, name) => {
        response.setHeader(name, value);
      });

      const body = Buffer.from(await webResponse.arrayBuffer());
      response.send(body);
    } catch (error) {
      next(error);
    }
  };
}
