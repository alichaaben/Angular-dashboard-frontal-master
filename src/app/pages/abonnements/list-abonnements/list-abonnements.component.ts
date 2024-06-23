import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { resolveCname } from "dns";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
  SortEvent,
} from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { Abonnement } from "../../../@core/data/Abonnement";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { Sms } from "../../../@core/data/Sms";
import { AbonnementService } from "../../../@core/mock/abonnement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { SmsService } from "../../../@core/mock/sms.service";

@Component({
  selector: "ngx-list-abonnements",
  templateUrl: "./list-abonnements.component.html",
  styleUrls: ["./list-abonnements.component.scss"],
  providers: [MessageService, ConfirmationService, DialogService],
})
export class ListAbonnementsComponent implements OnInit {
  selectedPartner: PartenaireBprice;
  selectedAbonnement: Abonnement;
  sms: Sms = new Sms();
  display: boolean;
  first: number = 0;
  abonnements: Abonnement[];
  partenaires: PartenaireBprice[];
  smsForm: FormGroup = new FormGroup({});
  idsWithCount: any[] = [];
  displayDialogAbonnement: boolean;

  constructor(
    private route: Router,
    private abonnementService: AbonnementService,
    private servicePartenaire: PartenairesService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private smsService: SmsService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
      console.log("list partenaires", this.partenaires);
      this.servicePartenaire.getNbrAbonnementsByPartner().subscribe((res) => {
        Object.entries(res).forEach((element) => {
          this.idsWithCount.push({ idPartenaire: element[0], nbr: element[1] });
        });
        console.log("nbrAbonnements", this.idsWithCount);
        let idToNumberOfItem = {};
        this.idsWithCount.forEach(
          ({ idPartenaire, nbr }) => (idToNumberOfItem[idPartenaire] = nbr)
        );

        this.partenaires.forEach(
          (item) => (item["nbr"] = idToNumberOfItem[item.idPartenaire])
        );

        console.log(
          " les abonnements avec les noms de partenaire",
          this.partenaires
        );
      });
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
  ajouter() {
    this.route.navigate(["/pages/abonnements/ajout-abonnement"]);
  }
  modifier(id: string) {
    this.route.navigate(["/pages/abonnements/modifier-abonnement/" + id]);
  }

  changeEtatAbonnementToPaye(idAbonnement: string) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de marquer cet abonnement commme payé ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.abonnementService
          .changeStatusToPaye(idAbonnement)
          .subscribe((res) => {
            this.abonnementService.getAllAbonnement().subscribe((res) => {
              this.abonnements = res;
              this.servicePartenaire.getTheAllpartners().subscribe((res) => {
                this.partenaires = res;
                let idToNumberOfItem = {};
                this.partenaires.forEach(
                  ({ idPartenaire, raisonSociale }) =>
                    (idToNumberOfItem[idPartenaire] = raisonSociale)
                );

                this.abonnements.forEach(
                  (item) =>
                    (item["partenaire"] = idToNumberOfItem[item.idPartenaire])
                );
              });
            });
          });
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "abonnement est payé",
          life: 2000,
        });
      },
    });
  }

  changeEtatAbonnementToNonPaye(idAbonnement: string) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de marquer cet abonnement commme non payé ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.abonnementService
          .changeStatusToNonPaye(idAbonnement)
          .subscribe((res) => {
            console.log(res);

            this.abonnementService.getAllAbonnement().subscribe((res) => {
              this.abonnements = res;
              this.servicePartenaire.getTheAllpartners().subscribe((res) => {
                this.partenaires = res;
                let idToNumberOfItem = {};
                this.partenaires.forEach(
                  ({ idPartenaire, raisonSociale }) =>
                    (idToNumberOfItem[idPartenaire] = raisonSociale)
                );

                this.abonnements.forEach(
                  (item) =>
                    (item["partenaire"] = idToNumberOfItem[item.idPartenaire])
                );
              });
            });
          });
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "abonnement est non payé",
          life: 2000,
        });
      },
    });
  }
  openDialogSendSMS(idPartenaire: string, idAbonnement: string) {
    this.display = true;
    console.log(idAbonnement);
    console.log(idPartenaire);

    this.servicePartenaire
      .getOnePartenaireById(idPartenaire)
      .subscribe((res) => {
        console.log(res);
        this.selectedPartner = res["objectResponse"];
        this.abonnementService
          .getOneAbonnement(idAbonnement)
          .subscribe((res) => {
            this.selectedAbonnement = res;
            console.log(this.selectedAbonnement);
          });
      });
  }
  annuler() {
    this.display = false;
    this.messageService.add({
      severity: "warn",
      summary: "annulation",
      detail: "envoi sms  annulé ",
      icon: "pi pi-exclamation-triangle",
      life: 2000,
    });
  }
  valider(idPartenaire, idAbonnement) {
    this.confirmationService.confirm({
      message:
        "Etes vous sûr d'envoyer un sms de rappel pour " +
        "<h6>" +
        this.selectedPartner.raisonSociale +
        "</h6>",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.smsService
          .sendSmsForOnePartner(idPartenaire, idAbonnement, this.sms)
          .subscribe((res) => {
            console.log(res);
            this.display = false;
          });
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "SMS envoyé ",
          life: 2000,
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "warn",
              summary: "Annulation",
              detail: "envoi sms  annulé ",
            });
            break;
        }
      },
    });
  }
  getListAbonemnt(idPartenaire: string) {
    // const ref = this.dialogService.open(DetailsAbonnementsComponent, {
    //   header: "List des abonnements",
    //   width: "70%",
    //   data: idPartenaire,
    // });
    this.route.navigate([
      "/pages/abonnements/details-abonnements/" + idPartenaire,
    ]);
  }
  // navigateToListeAbonnement(idPartenaire: string) {
  //   this.route.navigate([
  //     "/pages/abonnements/details-abonnements/" + idPartenaire,
  //   ]);
  // }
}
