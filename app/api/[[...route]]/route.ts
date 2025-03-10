import { Hono } from "hono";
import { handle } from "hono/vercel";
import { HTTPException } from "hono/http-exception";

import accounts from "./accounts";
import categories from "./categories";
import transactions from "./transactions";
import summary from "./summary";
// Switching from edge to nodejs runtime for better database connection stability
export const runtime = "nodejs";

const app = new Hono().basePath("/api").use(async (c, next) => {
  const allowedOrigin = "https://next-finance-mocha.vercel.app/";
  c.header("Access-Control-Allow-Origin", allowedOrigin);
  c.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,PATCH,OPTIONS");
  c.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  c.header("Access-Control-Allow-Credentials", "true");
  await next();
});

app.onError((err, c) => {
  if (err instanceof HTTPException) {
    return err.getResponse();
  }

  return c.json({ message: "Internal Server Error" }, 500);
});

const routes = app
  .route("/summary", summary)
  .route("/accounts", accounts)
  .route("/categories", categories)
  .route("/transactions", transactions);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
