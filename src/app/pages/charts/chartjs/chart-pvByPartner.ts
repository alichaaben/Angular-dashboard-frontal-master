import { AfterViewInit, Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { MessageService } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { ChartsService } from "../../../@core/mock/charts.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  selector: "ngx-chartjs-PV-stats",
  template: ` <style>
      #loading {
        position: absolute;
        left: 50%;
        top: 50%;
        z-index: 1;
        width: 150px;
        height: 150px;
        margin: -75px 0 0 -75px;
        border: 16px solid #f3f3f3;
        border-radius: 50%;
        border-top: 16px solid #3498db;
        width: 120px;
        height: 120px;
        animation: spin 2s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    </style>
    <p-toast></p-toast>
    <div *ngIf="waitData" style="marign-left:150px">
      <p-progressSpinner></p-progressSpinner>
      <h6>Veuillez patientez quelques secondes</h6>
    </div>
    <div *ngIf="!waitData">
      <div class="row" style="margin-bottom: 30px;">
        <div class="col-sm-6">
          <label class="label"
            >Partenaire<span style="color: red">*</span></label
          >
          <p-dropdown
            [options]="partenaires"
            optionLabel="raisonSociale"
            optionValue="idPartenaire"
            placeholder="&nbsp; Veuillez choisir un partenaire"
            autoWidth="false"
            [style]="{ width: '100%', 'font-weight': 'bold' }"
            [required]="true"
            [filter]="true"
            filterPlaceholder="&nbsp;Rechercher"
            (onChange)="onSelectPartenaire($event)"
          ></p-dropdown>
        </div>
        <div class="col-sm-6">
          <label class="label">Année<span style="color: red">*</span></label>
          <p-dropdown
            #year
            [options]="years"
            (onChange)="onSelectYear($event)"
            optionLabel="year"
            optionValue="year"
            placeholder="&nbsp; Veuillez choisir un année"
            autoWidth="false"
            [style]="{ width: '100%', 'font-weight': 'bold' }"
            [required]="true"
            [filter]="true"
          ></p-dropdown>
        </div>

        <button
          pButton
          label="confirmer"
          style="margin:auto;margin-top:30px"
          class="btn btn-success"
          (click)="getData()"
        ></button>
      </div>
    </div>
    <h6 style="text-align:center;">{{ monPartenaire?.raisonSociale }}</h6>

    <div *ngIf="!waitData">
      <div echarts [options]="optionsCA" id="CA" class="echart"></div>
      <div echarts [options]="options" id="Nbr" class="echart"></div>
    </div>`,
  providers: [MessageService],
})
export class PvStats implements AfterViewInit, OnInit {
  //chart nbr transactions
  labels: any[];
  data: any[];
  monPartenaire: PartenaireBprice;
  idPartenaire: string;
  partenaires: PartenaireBprice[];
  year: number = 2021;
  options: any = {};
  themeSubscription: any;
  waitData: boolean;
  pointVentes: PointVente[];
  pvNomsEtId: any[] = [];
  idEtNbrTransactions: any = [];

  years: any[] = [
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
    { year: 2025 },
  ];
  //chart CA transactions
  labelsCA: any[];
  dataCA: any[];
  optionsCA: any = {};
  themeSubscriptionCA: any;
  idEtCATransactions: any = [];

  constructor(
    private theme: NbThemeService,
    private messageService: MessageService,
    private servicePartenaire: PartenairesService,
    private chartService: ChartsService,
    private PVSerivce: PointventeService
  ) {}
  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
    });
  }
  ngAfterViewInit() {}
  onSelectPartenaire(event) {
    this.idPartenaire = event.value;
    console.log(this.idPartenaire);
    this.servicePartenaire
      .getOnePartenaireById(this.idPartenaire)
      .subscribe((res) => {
        this.monPartenaire = res["objectResponse"];
      });
  }
  onSelectYear(event) {
    if (this.idPartenaire == undefined) {
      this.messageService.add({
        severity: "warn",
        detail: "veuillez selectionner un partenaire",
        summary: "alert",
        icon: "pi pi-exclamation-triangle",
      });
    } else {
      this.year = event.value;
      console.log(this.year);
      console.log(this.idPartenaire);
    }
  }

  getData() {
    this.waitData = true;
    this.chartService
      .getTransactionAmmoutEachPointVenteByPartnerId(
        this.idPartenaire,
        this.year
      )
      .subscribe((res) => {
        this.idEtNbrTransactions = [];
        (this.data = []), (this.labels = []);
        Object.entries(res).forEach((element) => {
          this.idEtNbrTransactions.push({
            idPV: element[0],
            NbrTransaction: element[1],
          });
        });
        console.log(this.idEtNbrTransactions);
        this.PVSerivce.AllPointVentesByIdPartenaireBprice(
          this.idPartenaire
        ).subscribe((res) => {
          this.pointVentes = res;
          this.pointVentes.forEach((element) => {
            this.pvNomsEtId.push({
              id: element.idPointVente,
              nom: element.designation,
            });
          });
          let idToNumberOfItem = {};
          this.pvNomsEtId.forEach(
            ({ id, nom }) => (idToNumberOfItem[id] = nom)
          );

          this.idEtNbrTransactions.forEach(
            (item) => (item["nom"] = idToNumberOfItem[item.idPV])
          );
          console.log(this.idEtNbrTransactions);
          this.idEtNbrTransactions.forEach((element) => {
            this.labels.push(element.nom);
            this.data.push({
              value: element.NbrTransaction,
              name: element.nom,
            });
            this.waitData = false;
          });
          this.themeSubscription = this.theme
            .getJsTheme()
            .subscribe((config) => {
              const colors = config.variables;
              const echarts: any = config.variables.echarts;

              this.options = {
                backgroundColor: echarts.bg,
                color: [
                  colors.warningLight,
                  colors.infoLight,
                  colors.dangerLight,
                  colors.successLight,
                  colors.primaryLight,
                ],
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                  orient: "vertical",
                  left: "left",
                  data: this.labels,
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
                series: [
                  {
                    name: "Transactions",
                    type: "pie",
                    radius: "80%",
                    center: ["50%", "50%"],
                    data: this.data,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: echarts.itemHoverShadowColor,
                      },
                    },
                    label: {
                      normal: {
                        textStyle: {
                          color: echarts.textColor,
                        },
                      },
                    },
                    labelLine: {
                      normal: {
                        lineStyle: {
                          color: echarts.axisLineColor,
                        },
                      },
                    },
                  },
                ],
              };
            });
        });
      });

    this.chartService
      .getNbrTransactionseachPvByPartnerId(this.idPartenaire, this.year)
      .subscribe((res) => {
        this.idEtCATransactions = [];
        (this.dataCA = []), (this.labelsCA = []);
        Object.entries(res).forEach((element) => {
          this.idEtCATransactions.push({
            idPV: element[0],
            AmmountTransactions: element[1],
          });
        });
        console.log(this.idEtCATransactions);
        this.PVSerivce.AllPointVentesByIdPartenaireBprice(
          this.idPartenaire
        ).subscribe((res) => {
          this.pointVentes = res;
          //   console.log(res);
          //   console.log(this.pointVentes);
          this.pointVentes.forEach((element) => {
            this.pvNomsEtId.push({
              id: element.idPointVente,
              nom: element.designation,
            });
          });
          let idToNumberOfItem = {};
          this.pvNomsEtId.forEach(
            ({ id, nom }) => (idToNumberOfItem[id] = nom)
          );

          this.idEtCATransactions.forEach(
            (item) => (item["nom"] = idToNumberOfItem[item.idPV])
          );
          console.log(this.idEtCATransactions);
          this.idEtCATransactions.forEach((element) => {
            this.labelsCA.push(element.nom);
            this.dataCA.push({
              value: element.AmmountTransactions,
              name: element.nom,
            });
            this.waitData = false;
          });
          this.themeSubscriptionCA = this.theme
            .getJsTheme()
            .subscribe((config) => {
              const colors = config.variables;
              const echarts: any = config.variables.echarts;

              this.optionsCA = {
                backgroundColor: echarts.bg,
                color: [
                  colors.warningLight,
                  colors.infoLight,
                  colors.dangerLight,
                  colors.successLight,
                  colors.primaryLight,
                ],
                tooltip: {
                  trigger: "item",
                  formatter: "{a} <br/>{b} : {c} ({d}%)",
                },
                legend: {
                  orient: "vertical",
                  left: "left",
                  data: this.labelsCA,
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
                series: [
                  {
                    name: "Transactions DT",
                    type: "pie",
                    radius: "80%",
                    center: ["50%", "50%"],
                    data: this.dataCA,
                    itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: echarts.itemHoverShadowColor,
                      },
                    },
                    label: {
                      normal: {
                        textStyle: {
                          color: echarts.textColor,
                        },
                      },
                    },
                    labelLine: {
                      normal: {
                        lineStyle: {
                          color: echarts.axisLineColor,
                        },
                      },
                    },
                  },
                ],
              };
            });
        });
      });
  }
}
