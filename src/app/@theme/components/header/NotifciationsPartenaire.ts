import { Component, OnInit } from "@angular/core";
import { ConfirmationService, MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { ClickService } from "../../../@core/mock/click.service";
import { NotificationService } from "../../../@core/mock/notification.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { sharedLocal } from "../../../@core/mock/sharedLocal.service";

@Component({
  template: ` <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>

    <p-table
      #dt
      [value]="notifications"
      [paginator]="true"
      [rows]="5"
      [rowsPerPageOptions]="[5, 10, 15]"
      [totalRecords]="6"
      pageLinkSize="6"
      [globalFilterFields]="['dateCreation', 'body', 'titre', 'raisonSociale']"
    >
      <ng-template pTemplate="caption">
        <div class="my-right">
          <br />
          <span class="p-input-icon-left ml-auto">
            <input
              style="height:40px;"
              pInputText
              type="text"
              (input)="dt.filterGlobal($event.target.value, 'contains')"
              placeholder="  Rechercher  "
            />
          </span>
          <br />
          <br />
        </div>
      </ng-template>

      <ng-template pTemplate="header">
        <tr>
          <th>Partenaire</th>
          <th>Titre</th>
          <th>Type Notification</th>
          <th>Date</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-n>
        <tr>
          <td style="font-weight:bold;">{{ n.raisonSociale }}</td>
          <td>{{ n.titre }}</td>
          <td>
            {{ n.body }}
          </td>
          <td>
            {{ n.dateCreation | date: "dd-mm-yyyy" }}
          </td>
          <td>
            <div *ngIf="n.isActif">
              <button class="btn-actif">non lue</button>
            </div>
            <div *ngIf="n.isActif == 0">
              <button class="btn-inactif">lu</button>
            </div>
          </td>
          <td>
            <button
              title="supprimer"
              pButton
              pRipple
              icon="pi pi-trash"
              class="p-button-rounded p-button-danger"
              style="margin-right:2px"
              (click)="deleteNotification(n.idNotification)"
            ></button
            ><button
              title="marquer comme non lue"
              pButton
              pRipple
              icon="pi pi-refresh"
              class="p-button-rounded p-button-info"
              [hidden]="n.isActif != 0"
              (click)="enableNotification(n.idNotification)"
            ></button>
          </td>
        </tr>
      </ng-template>
    </p-table>`,
  styles: [
    `
      :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
        position: -webkit-sticky;
        position: sticky;
        top: 0px;
      }

      @media screen and (max-width: 64em) {
        :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
          top: 0px;
        }
      }
      .btn-inactif {
        width: 50px;
        height: 30px;
        background-color: rgb(77, 202, 5);
        border-radius: 30px;
        color: white;
      }
      .btn-actif {
        width: 60px;
        height: 30px;
        background-color: rgb(250, 58, 58);
        border-radius: 30px;
        color: white;
        font-size: 13px;
      }
      .my-right {
        text-align: right;
        width: 100%;
      }
    `,
  ],
  providers: [sharedLocal, MessageService, ConfirmationService],
})
export class NotifciationsPartenaire implements OnInit {
  notifications: any[] = [];
  partenaires: PartenaireBprice[];
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private notificationService: NotificationService,
    private servicePartenaire: PartenairesService,
    private detectClick: ClickService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.notificationService.getAllNotification().subscribe((result) => {
      this.notifications = result;
      //  console.log("Toutes les notifications", this.notifications);
    });
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
      //  console.log("partenaires", res);
      let idToNumberOfItem = {};
      this.partenaires.forEach(
        ({ idPartenaire, raisonSociale }) =>
          (idToNumberOfItem[idPartenaire] = raisonSociale)
      );

      this.notifications.forEach(
        (item) => (item["raisonSociale"] = idToNumberOfItem[item.idPartenaire])
      );
      this.notifications = this.notifications.sort(
        (a, b) => b.isActif - a.isActif
      );

      console.log("notification avec nom de partenaire", this.notifications);
    });
  }
  deleteNotification(idNotification: string) {
    console.log("delete");
    this.confirmationService.confirm({
      message: "Etes vous sûr de supprimer cette notification ?",
      header: "confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.notificationService
          .deleteNotification(idNotification)
          .subscribe((res) => {
            this.notificationService.getAllNotification().subscribe((res) => {
              this.notifications = res;
              this.servicePartenaire.getTheAllpartners().subscribe((res) => {
                this.partenaires = res;
                console.log("partenaires", res);
                let idToNumberOfItem = {};
                this.partenaires.forEach(
                  ({ idPartenaire, raisonSociale }) =>
                    (idToNumberOfItem[idPartenaire] = raisonSociale)
                );

                this.notifications.forEach(
                  (item) =>
                    (item["raisonSociale"] =
                      idToNumberOfItem[item.idPartenaire])
                );

                console.log(
                  "notification apres supression avec nom de partenaire",
                  this.notifications
                );
              });
            });
            this.messageService.add({
              severity: "success",
              summary: "succés",
              detail: "notification supprimé",
              life: 2000,
            });
          });
      },
    });
  }
  enableNotification(idNotification: string) {
    this.notificationService
      .enbleNotification(idNotification)
      .subscribe((res) => {
        this.ngOnInit();
        this.detectClick.AClicked();
      });
  }
  onClick() {
    this.detectClick.AClicked();
  }
}
