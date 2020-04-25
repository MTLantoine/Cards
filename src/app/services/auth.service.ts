import { User } from "../models/User.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
  admin: User;
  isAuth = false;

  signIn(user: User) {
    return new Promise((resolve, reject) => {
      this.isAuth = true;
      this.admin = user;
      resolve(true);
    });
  }

  signOut() {
    this.isAuth = false;
  }
}
