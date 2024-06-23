import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from "primeng/dynamicdialog";
import { Abonnement } from "../../../@core/data/Abonnement";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { Sms } from "../../../@core/data/Sms";
import { AbonnementService } from "../../../@core/mock/abonnement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { SmsService } from "../../../@core/mock/sms.service";

@Component({
  selector: "ngx-details-abonnements",
  templateUrl: "./details-abonnements.component.html",
  styleUrls: ["./details-abonnements.component.scss"],
  providers: [
    DialogService,
    ConfirmationService,
    MessageService,
    DynamicDialogRef,
  ],
})
export class DetailsAbonnementsComponent implements OnInit {
  abonnements: Abonnement[];
  selectedPartner: PartenaireBprice;
  selectedAbonnement: Abonnement;
  display: boolean = false;
  sms: Sms = new Sms();
  corpsSms: string;
  constructor(
    private abonnementService: AbonnementService,
    private route: Router,
    private servicePartenaire: PartenairesService,
    private confirmationService: ConfirmationService,
    private smsService: SmsService,
    private messageService: MessageService,
    public ref: DynamicDialogRef,
    public activateRoute: ActivatedRoute,
    public datepipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.abonnementService
      .getAllAbonnementsByIdPartenaire(
        this.activateRoute.snapshot.params.idPartenaire
      )
      .subscribe((res) => {
        console.log(res);
        this.abonnements = res;
      });
  }
  modifier(id: string) {
    this.route.navigate(["/pages/abonnements/modifier-abonnement/" + id]);
    this.ref.close();
  }

  changeEtatAbonnementToPaye(idAbonnement: string) {
    this.confirmationService.confirm({
      message: "vous etes sur de marquer cet abonnement commme payé ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.abonnementService
          .changeStatusToPaye(idAbonnement)
          .subscribe((res) => {
            this.abonnementService.getAllAbonnement().subscribe((res) => {
              this.abonnements = res;
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
            this.corpsSms =
              "Votre abonnement expirera le " +
              this.datepipe.transform(
                this.selectedAbonnement?.dateFin,
                "dd-MM-yyyy"
              ) +
              " Veuillez contacter notre service fincancier ";
            console.log(this.corpsSms);
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
        "Etes vous sur d'envoyer un sms de rappel pour " +
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
}
