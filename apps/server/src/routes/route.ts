import { Hono } from "hono";
import { AuthController } from "../controller/auth.controller.js";


export const router = new Hono();



router.get("/auth/signin", async (c) => {
	await AuthController.signin(c);
});
router.get("/auth/signup", AuthController.signup);

// User Info
