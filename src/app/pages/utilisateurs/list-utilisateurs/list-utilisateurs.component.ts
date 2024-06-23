import { Component, OnInit } from "@angular/core";
import { SortEvent } from "primeng/api";
import { AuthenticationService } from "../../../@core/mock/authentication.service";

@Component({
  selector: "ngx-list-utilisateurs",
  templateUrl: "./list-utilisateurs.component.html",
  styleUrls: ["./list-utilisateurs.component.scss"],
})
export class ListUtilisateursComponent implements OnInit {
  users: any[];
  constructor(private authService: AuthenticationService) {}
  first: number = 0;
  ngOnInit(): void {
    this.authService.getListOfUsers().subscribe((res) => {
      console.log(res);
      this.users = res;
    });
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === "string" && typeof value2 === "string")
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
}
