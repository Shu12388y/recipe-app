import { Context } from "hono";
import jwt from "jsonwebtoken";

export class JWTService {
  payload: string | any;

  constructor(payload: string | any) {
    this.payload = payload;
  }

  public generateToken(c: Context) {
    const token = jwt.sign(this.payload, c.env.JWTSECRET,{
      expiresIn:'5hr'
    });
    if(!token){
      return "Failed to generate token"
    }
    return token
  }
}
