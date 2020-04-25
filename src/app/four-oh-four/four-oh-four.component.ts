import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-four-oh-four",
  templateUrl: "./four-oh-four.component.html",
  styleUrls: ["./four-oh-four.component.scss"]
})
export class FourOhFourComponent implements OnInit {
  fourohfour: number;

  constructor() {}

  ngOnInit() {
    this.onFourOhFour(404);
  }

  private onFourOhFour(max: number): void {
    for (let i = 0; i <= max; i++) {
      setTimeout(() => {
        this.fourohfour = i;
      }, 10 * (i / 3));
    }
  }
}
