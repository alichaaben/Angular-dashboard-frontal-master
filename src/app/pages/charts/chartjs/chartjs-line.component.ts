import { Component, OnInit } from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { MessageService } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { ChartsService } from "../../../@core/mock/charts.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";

@Component({
  selector: "ngx-chartjs-line",
  template: `
    <style>
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
      <p-progressSpinner
        [style]="{ width: '50px', height: '50px' }"
      ></p-progressSpinner>
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
          style="margin-left:250px;margin-top:30px"
          class="btn btn-success"
          [disabled]="year == undefind"
          (click)="submit()"
        ></button>
      </div>
    </div>
    <div style="text-align:center">
      <h5>
        {{ partenaireSelectionne?.raisonSociale }}
      </h5>
    </div>
    <chart type="line" [data]="data" [options]="options"></chart>
  `,
  providers: [MessageService],
})
export class ChartjsLineComponent implements OnInit {
  waitData: boolean;
  partenaires: PartenaireBprice[];
  idPartenaire: string;
  data: any;
  options: any;
  themeSubscription: any;
  months: any[] = [];
  response: any[] = [];
  CA: any[] = [];
  year: string;
  years: any[] = [
    { year: 2021 },
    { year: 2022 },
    { year: 2023 },
    { year: 2024 },
    { year: 2025 },
  ];
  partenaireSelectionne: PartenaireBprice;
  constructor(
    private theme: NbThemeService,
    private chartService: ChartsService,
    private servicePartenaire: PartenairesService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
      console.log(this.partenaires);
    });
  }

  onSelectPartenaire(event) {
    this.idPartenaire = event.value;
    console.log(this.idPartenaire);
    this.servicePartenaire
      .getOnePartenaireById(this.idPartenaire)
      .subscribe((res) => {
        console.log(res);
        this.partenaireSelectionne = res["objectResponse"];
      });
  }
  onSelectYear(event) {
    if (this.idPartenaire == undefined) {
      this.messageService.add({
        severity: "warn",
        detail: "Veuillez selectionner un partenaire",
        summary: "alert",
        icon: "pi pi-exclamation-triangle",
      });
    } else {
      this.year = event.value;
      console.log(this.year);
      console.log(this.idPartenaire);
    }
  }
  submit() {
    if (
      this.year == undefined ||
      this.idPartenaire == undefined ||
      this.idPartenaire == null ||
      this.year == null
    ) {
      this.messageService.add({
        severity: "warn",
        detail: "Veuillez choisir  partenaire et année ",
        summary: "alert",
        icon: "pi pi-exclamation-triangle",
      });
    } else {
      this.waitData = true;
      this.chartService
        .getEvoCApartnerPerYear(this.idPartenaire, this.year)
        .subscribe((res) => {
          this.months = [];
          this.CA = [];
          this.waitData = false;
          this.response = Object.entries(res);
          console.log(this.response);
          this.response.forEach((element) => {
            this.months.push(element[0]);
            this.CA.push(element[1]);
          });
          this.themeSubscription = this.theme
            .getJsTheme()
            .subscribe((config) => {
              const colors: any = config.variables;
              const chartjs: any = config.variables.chartjs;
              this.data = {
                labels: this.months,
                datasets: [
                  {
                    data: this.CA,
                    label: "CA par mois (Dinar tunisien)",
                    backgroundColor: NbColorHelper.hexToRgbA(
                      colors.danger,
                      0.3
                    ),
                    borderColor: colors.danger,
                  },
                ],
              };
              this.options = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        display: true,
                        color: chartjs.axisLineColor,
                      },
                      ticks: {
                        fontColor: chartjs.textColor,
                        stepValue: 10000,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      gridLines: {
                        display: true,
                        color: chartjs.axisLineColor,
                      },
                      ticks: {
                        fontColor: chartjs.textColor,
                      },
                    },
                  ],
                },
                legend: {
                  labels: {
                    fontColor: chartjs.textColor,
                  },
                },
              };
            });
        });
    }
    this.idPartenaire = null;
    this.year = null;
  }
}
