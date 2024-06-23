import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import {
  PrimeNGConfig,
  SortEvent,
  FilterMatchMode,
  ConfirmationService,
  MessageService,
} from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { Sms } from "../../../@core/data/Sms";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { SmsService } from "../../../@core/mock/sms.service";

@Component({
  selector: "ngx-list-partenaires",
  templateUrl: "./list-partenaires.component.html",
  styleUrls: ["./list-partenaires.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class ListPartenairesComponent implements OnInit {
  partenaires: PartenaireBprice[];
  first: number = 0;
  block: boolean = false;
  currentDate: Date = new Date();
  partenairesNonPaynts = [];
  smsToSend: Sms = new Sms();
  map: any[] = [];
  constructor(
    private servicePartenaire: PartenairesService,
    private config: PrimeNGConfig,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private smsService: SmsService
  ) {}

  ngOnInit(): void {
    localStorage.removeItem("imagePanoramique");
    localStorage.removeItem("logo");
    localStorage.removeItem("icon");
    this.servicePartenaire.getTheAllpartners().subscribe((data) => {
      this.partenaires = data;

      // this.partenaires.forEach((element) => {
      //   let emptyStr = "";
      //   emptyStr = element.matriculeFiscale.substring(0, 4);
      //   emptyStr += Array(element.matriculeFiscale.length - 4)
      //     .fill("*")
      //     .join("");
      //   element.matriculeFiscale = emptyStr;
      // });
      // console.log("list des partenaires", this.partenaires);
      this.servicePartenaire.getPointVentesByPartner().subscribe((res) => {
        var map = Object.entries(res);
        //console.log(this.map);
        map.forEach((element) => {
          this.map.push({
            idPartenaire: element[0],
            nbrePV: element[1].length,
          });
        });
        //   console.log(this.map);
        let idToNumberOfItem = {};
        this.map.forEach(
          ({ idPartenaire, nbrePV }) =>
            (idToNumberOfItem[idPartenaire] = nbrePV)
        );

        this.partenaires.forEach(
          (item) => (item["nbrePV"] = idToNumberOfItem[item.idPartenaire])
        );
        // console.log(this.partenaires);
      });
    });

    this.config.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_AFTER,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_IS_NOT,
      ],
    };
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
  ajouter() {
    this.route.navigate(["/pages/partenaires/ajout-partenaire"]);
  }
  blockPartenaire(idPartenaire: String) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de bloquer ce partenaire ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.servicePartenaire.blockPartner(idPartenaire).subscribe((data) =>
          this.servicePartenaire.getTheAllpartners().subscribe((res) => {
            this.partenaires = res;
            // console.log(idPartenaire);
            this.servicePartenaire
              .getPointVentesByPartner()
              .subscribe((res) => {
                var map = Object.entries(res);
                map.forEach((element) => {
                  this.map.push({
                    idPartenaire: element[0],
                    nbrePV: element[1].length,
                  });
                });
                let idToNumberOfItem = {};
                this.map.forEach(
                  ({ idPartenaire, nbrePV }) =>
                    (idToNumberOfItem[idPartenaire] = nbrePV)
                );

                this.partenaires.forEach(
                  (item) =>
                    (item["nbrePV"] = idToNumberOfItem[item.idPartenaire])
                );
                //   console.log(this.partenaires);
              });
          })
        );
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "Partenaire bloqué",
          life: 2000,
        });
      },
    });
  }

  delete(idPartenaire: string) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de supprimer ce partenaire ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.servicePartenaire.deletePartenaire(idPartenaire).subscribe(() => {
          this.servicePartenaire.getTheAllpartners().subscribe((data) => {
            this.partenaires = data;
          });
        });
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "Partenaire supprimé",
          life: 2000,
        });
      },
    });
  }

  toggle(idPartenaire: string) {
    this.block = !this.block;
    if (this.block == true) {
      this.blockPartenaire(idPartenaire);
    } else {
      this.deblockPartenaire(idPartenaire);
    }
  }

  deblockPartenaire(idPartenaire: String) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de débloquer ce partenaire ?",
      header: "confirmer",
      icon: "pi pi-exclamation triangle",
      accept: () => {
        this.servicePartenaire.unblockPartner(idPartenaire).subscribe((data) =>
          this.servicePartenaire.getTheAllpartners().subscribe((res) => {
            this.partenaires = res;
            // console.log(idPartenaire);
            this.servicePartenaire
              .getPointVentesByPartner()
              .subscribe((res) => {
                var map = Object.entries(res);
                //console.log(this.map);
                map.forEach((element) => {
                  this.map.push({
                    idPartenaire: element[0],
                    nbrePV: element[1].length,
                  });
                });
                //console.log(this.map);
                let idToNumberOfItem = {};
                this.map.forEach(
                  ({ idPartenaire, nbrePV }) =>
                    (idToNumberOfItem[idPartenaire] = nbrePV)
                );

                this.partenaires.forEach(
                  (item) =>
                    (item["nbrePV"] = idToNumberOfItem[item.idPartenaire])
                );
                console.log(this.partenaires);
              });
          })
        );
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "Partenaire débloqué",
          life: 2000,
        });
      },
    });
  }
  sendSms(idPartenaire: string) {
    this.smsService.createSms(this.smsToSend, idPartenaire).subscribe((res) => {
      console.log(res);
    });
  }
}
