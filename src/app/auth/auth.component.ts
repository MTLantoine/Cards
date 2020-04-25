import { Component, OnInit } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { UserService } from "../services/user.service";
import { User } from "../models/User.model";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.component.html",
  styleUrls: ["./auth.component.scss"]
})
export class AuthComponent implements OnInit {
  authStatus: boolean;
  passwordWrong: boolean = false;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authStatus = this.authService.isAuth;
    this.userService.getUsersFromServer();
  }

  onSubmit(form: NgForm) {
    const email = form.value["email"];
    const password = form.value["password"];
    const user = this.userService.getUser(email, password);
    if (user !== null) {
      this.onSignIn(user);
    } else {
      this.onWrongUser();
    }
  }

  onWrongUser() {
    this.passwordWrong = true;
    console.log(true);
    setTimeout(function() {
      this.passwordWrong = false;
      console.log(false);
    }, 500);
  }

  onSignIn(user: User) {
    this.authService.signIn(user).then(() => {
      this.authStatus = this.authService.isAuth;
      this.router.navigate(["appareils"]);
    });
  }

  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }
}
