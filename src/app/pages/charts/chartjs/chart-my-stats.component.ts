import { Component, OnInit } from "@angular/core";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { ChartsService } from "../../../@core/mock/charts.service";

@Component({
  selector: "ngx-chartjs-my-stats",
  template: `
    <style>
      .ui-button.stat-button {
        margin-top: 30px;
        margin: auto;
      }

      body {
        background-color: #f2f3fa;
      }
      .stats {
        margin: 5px;
      }
      .stats .col {
        //border: 1px solid red;
        margin: 0;
        padding: 3;
      }
      .statContainer {
        margin: 5px;
        width: 100%;
        font-size: 13px;
        border-radius: 3px;
        background-color: #fff;
        padding: 0;
        overflow: hidden;
      }
      .statContainer .title {
        padding: 5px 10px;
        color: #fff;
      }
      .statContainer.blue .title {
        background-color: #2d72c0;
      }
      .statContainer.blue .status {
        color: #2d72c0;
      }

      .statContainer.yellow .title {
        background-color: #f3a254;
      }
      .statContainer.yellow .status {
        color: #f3a254;
      }

      .statContainer.fountainBlue .title {
        background-color: #6abebf;
      }
      .statContainer.fountainBlue .status {
        color: #6abebf;
      }

      .statContainer.lightBlue .title {
        background-color: #52a1e5;
      }
      .statContainer.lightBlue .status {
        color: #52a1e5;
      }

      .statContainer.purple .title {
        background-color: #916df6;
      }
      .statContainer.purple .status {
        color: #916df6;
      }

      .statContainer.pink .title {
        background-color: #ef6e85;
      }
      .statContainer.pink .status {
        color: #ef6e85;
      }

      .statContainer.orange .title {
        background-color: #ff7043;
      }
      .statContainer.orange .status {
        color: #ff7043;
      }
      @media (max-width: 1200px) {
        .stats .col {
          min-width: 20% !important;
        }
      }

      @media (max-width: 887px) {
        .stats .col {
          min-width: 25% !important;
        }
      }
      @media (max-width: 768px) {
        .stats .col {
          min-width: 50% !important;
        }
      }
      @media (max-width: 525px) {
        .stats .col {
          min-width: 100% !important;
        }
      }
      .Center {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100px;
      }
    </style>
    <p-toast></p-toast>
    <p-confirmDialog></p-confirmDialog>
    <div class="row stats">
      <div class="col">
        <div class="statContainer blue shadow-sm">
          <div class="title text-center">Partenaires</div>
          <div class="d-flex">
            <div class="p-2 flex-fill text-center">
              TOTAL
              <h5 class="font-weight-bold">{{ nbrPartenaires }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="statContainer purple shadow-sm">
          <div class="title text-center">Points de vente</div>
          <div class="d-flex">
            <div class="p-2 flex-fill text-center">
              TOTAL
              <h5 class="font-weight-bold">{{ NbrPointVentes }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="statContainer pink shadow-sm">
          <div class="title text-center">Transactions</div>
          <div class="d-flex">
            <div class="p-2 flex-fill text-center">
              TOTAL
              <h5 class="font-weight-bold">{{ nbrTransactions }}</h5>
            </div>
          </div>
        </div>
      </div>

      <div class="col">
        <div class="statContainer pink shadow-sm">
          <div class="title text-center" (click)="getAllTransactionsAmmount()">
            Transactions (DT)
          </div>
          <div class="d-flex">
            <div class="p-2 flex-fill text-center">
              <h5 class="font-weight-bold">{{ ammountTransactions }}</h5>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div *ngIf="waitData" class="Center">
      <p-progressSpinner></p-progressSpinner>
    </div>
    <div *ngIf="!waitData" class="Center" style="text-align:center"></div>
  `,
  providers: [MessageService, ConfirmationService],
})
export class MyStats implements OnInit {
  waitData: boolean = false;
  nbrPartenaires: any;
  nbrTransactions: any;
  ammountTransactions: any;
  NbrPointVentes: number;
  constructor(
    private chartService: ChartsService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.getNbrPointVentes();
    this.getNbrPartenaires();
    this.getNbrAllTransactions();
  }

  getNbrPointVentes() {
    this.chartService.getNbrPointVentes().subscribe((res) => {
      console.log(res);
      this.NbrPointVentes = res;
    });
  }
  getNbrPartenaires() {
    this.chartService.getNbrPartenaires().subscribe((res) => {
      console.log(res);
      this.nbrPartenaires = res;
    });
  }
  getNbrAllTransactions() {
    this.chartService.getNbrTotalTransactions().subscribe((res) => {
      console.log(res);
      this.nbrTransactions = res;
    });
  }
  getAllTransactionsAmmount() {
    this.confirmationService.confirm({
      message: "Cette action peut prendre quelques secondes",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.waitData = true;
        this.chartService.getAllTransactionsAmmount().subscribe((res) => {
          console.log(res);
          this.ammountTransactions = res;
          this.waitData = false;
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "warn",
              summary: "Annulation",
              detail: "Vous avez annulé  action",
            });
            break;
        }
      },
    });
  }
}
