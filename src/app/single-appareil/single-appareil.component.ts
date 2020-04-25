import { Component, OnInit } from "@angular/core";
import { AppareilService } from "../services/appareil.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-single-appareil",
  templateUrl: "./single-appareil.component.html",
  styleUrls: ["./single-appareil.component.scss"]
})
export class SingleAppareilComponent implements OnInit {
  name: string;
  status: string;
  thelength: number;

  constructor(
    private appareilService: AppareilService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params["id"];
    if (id >= this.appareilService.appareils.length) {
      this.router.navigate(["/not-found"]);
    } else {
      this.name = this.appareilService.getAppareilById(+id).name;
      this.status = this.appareilService.getAppareilById(+id).status;
    }
  }
}
