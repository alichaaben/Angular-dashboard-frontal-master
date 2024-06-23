import { Component, OnInit } from "@angular/core";

@Component({
  selector: "ngx-all",
  templateUrl: "./all.component.html",
  styleUrls: ["./all.component.scss"],
})
export class AllComponent {
  searchText: string;
  filters: Object;

  constructor() {}

  updateSearchText(evt: string) {
    this.searchText = evt;
  }

  updateFilters(evt: Object) {
    this.filters = evt;
    console.log("Filters : ", evt);
  }
}
