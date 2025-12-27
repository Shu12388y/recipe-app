import { Context } from "hono";
import { AuthService } from "../service/auth.service.js";
import { connectDB } from "../utils/db.js";
import { JWTService } from "../utils/jwt.js";
export class AuthController {
  static async signin(c: Context) {
    try {
      const body = (await c.req.json()) as { email: string; password: string };
      const email = body?.email;
      const password = body?.password;
      if (!email || !password) {
        c.status(402);
        return c.json({ message: "email and password is required" });
      }
      await connectDB(c.env.DBURI);
      const result = new AuthService(email, password);
      const info = await result.createUserSession();
      if (!info) {
        c.status(402);
        return c.json({ message: "Failed to generate user" });
      }
      const token = new JWTService(info).generateToken(c);
      c.status(201);
      return {
        message: "success",
        data: token,
      };
    } catch (error) {
      c.status(500);
      return c.json({ message: "Internal server Error" });
    }
  }
  static async signup(c: Context) {
    try {
      const body = (await c.req.json()) as { email: string; password: string };
      const { email, password } = body;
      if (!email || !password) {
        c.status(402);
        return c.json({ message: "Email and password is required" });
      }
      const info = await new AuthService(email, password).createNewUser();
      c.status(201);
      return c.json({
        message: "success",
        data: info,
      });
    } catch (error) {
      c.status(500);
      return c.json({ message: "Internal Server Error" });
    }
  }
}
