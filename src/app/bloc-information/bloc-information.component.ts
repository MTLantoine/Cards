import { Component, OnInit } from "@angular/core";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-bloc-information",
  templateUrl: "./bloc-information.component.html",
  styleUrls: ["./bloc-information.component.scss"]
})
export class BlocInformationComponent implements OnInit {
  constructor(private userService: UserService) {}

  firstname: string;
  lastname: string;

  ngOnInit() {
    this.getUserInformations();
  }

  getUserInformations() {
    this.firstname = this.userService.getFirstname();
    this.lastname = this.userService.getLastname();
  }
}
