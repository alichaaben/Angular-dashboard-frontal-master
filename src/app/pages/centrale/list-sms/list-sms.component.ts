import { Component, OnInit } from "@angular/core";
import { SortEvent } from "primeng/api";
import { SmsService } from "../../../@core/mock/sms.service";

@Component({
  selector: "ngx-list-sms",
  templateUrl: "./list-sms.component.html",
  styleUrls: ["./list-sms.component.scss"],
})
export class ListSmsComponent implements OnInit {
  first: number = 0;
  smsPartenaires: any[] = [];
  constructor(private smsService: SmsService) {}

  ngOnInit(): void {
    this.smsService.getAllSMSByPartenaire().subscribe((res) => {
      console.log(Object.entries(res));
      Object.entries(res).forEach((element) => {
        this.smsPartenaires.push({
          partenaire: element[0],
          body: Object.entries(Object.entries(element[1])),
          nbr: element[1][1],
        });
      });
      console.log(this.smsPartenaires);
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
