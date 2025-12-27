import { Hono } from "hono";
import { AuthController } from "../controller/auth.controller.js";

export const router = new Hono();

router.post("/auth/signin", async (c) => {
  await AuthController.signin(c);
});
router.post("/auth/signup", AuthController.signup);

// User Info
