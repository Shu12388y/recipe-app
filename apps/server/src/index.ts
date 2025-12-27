import { Hono } from "hono";
import { router } from "./routes/route.js";

const app = new Hono();

app.get("/health", (c) => {
  return c.json({ message: "Healthy" });
});

app.route("/api/v1/", router);

export default app;
