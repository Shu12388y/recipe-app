import { Auth } from "../models/auth.model.js";
import bcryptjs from "bcryptjs";

export class AuthService {
  email: string;
  password: string;
  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
  private async hashPassword() {
    const hashpassword = await bcryptjs.hash(this.password, 10);
    return hashpassword;
  }

  private async isPasswordCorrect(hashpassword: string) {
    const checkPassword = bcryptjs.compare(this.password, hashpassword);
    return checkPassword;
  }

  private async isUserExists() {
    try {
      const isuserexists = await Auth.findOne({
        email: this.email,
      });
      if (isuserexists) {
        return {
          message: "user exists",
          data: isuserexists,
        };
      }
      return {
        message: "user not exists",
        data: null,
      };
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async createNewUser() {
    try {
      const isuserexists = await this.isUserExists();
      if (isuserexists.data != null) {
        throw new Error(isuserexists.message)
      }
      const newuser = new Auth({
        email: this.password,
        password: await this.hashPassword(),
      });
      await newuser.save();
      return newuser._id;
    } catch (error) {
      throw new Error(error as string);
    }
  }

  public async createUserSession() {
    try {
      const isuserexists = await this.isUserExists();
      if (isuserexists.data == null) {
        throw new Error(isuserexists.message)
      }
      const checkpassword = this.isPasswordCorrect(isuserexists.data.password);
      if (!checkpassword) {
        throw new Error('Incorrect Password')
      }
      return isuserexists.data._id
    } catch (error) {
      throw new Error(error as string)
    }
  }
}
