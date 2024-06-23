import { Component, OnInit } from "@angular/core";
import { NbColorHelper, NbThemeService } from "@nebular/theme";
import { MessageService } from "primeng/api";
import { ChartsService } from "../../../@core/mock/charts.service";

@Component({
  selector: "ngx-chartjs-pie",
  template: `
    <p-toast></p-toast>
    <div style="margin-bottom:30px">
      <label class="label">Année<span style="color: red">*</span></label>
      <br />
      <nb-select
        fullWidth
        (selectedChange)="onSelectYear($event)"
        name="year"
        name="year"
        placeholder="veuillez choisir un année"
      >
        <nb-option [value]="2010">2010</nb-option>
        <nb-option [value]="2015">2015</nb-option>
        <nb-option [value]="2019">2019</nb-option>
        <nb-option [value]="2021">2021</nb-option>
        <nb-option [value]="2022">2022</nb-option>
      </nb-select>
    </div>

    <chart type="bar" [data]="data" [options]="options"></chart>
  `,
  providers: [MessageService],
})
export class ChartjsPieComponent implements OnInit {
  event: any;
  selected: any;
  data: any;
  options: any;
  themeSubscriptionYear: any;
  labelsPerYear: any[] = [];
  myDataYear: any[] = [];
  dataForeachYear: any[] = [];
  myDataChartYear: any;

  constructor(
    private theme: NbThemeService,
    private serviceChart: ChartsService,
    private messageService: MessageService
  ) {}
  ngOnInit(): void {}
  onSelectYear(event) {
    this.selected = event;
    console.log(this.selected);
    this.serviceChart
      .getNbrPartenairesPerMonthsOfYear(this.selected)
      .subscribe((res) => {
        console.log(event);
        this.dataForeachYear = [];
        this.labelsPerYear = [];
        this.myDataChartYear = [];
        this.dataForeachYear = Object.entries(res);
        console.log("test", this.dataForeachYear.length);
        if (this.dataForeachYear.length == 0) {
          this.messageService.add({
            severity: "warn",
            detail: "Pas de nouveau partenaire pour cette année",
            life: 2000,
            closable: true,
            summary: " Info",
          });
        } else {
          this.dataForeachYear.forEach((element) => {
            this.labelsPerYear.push(element[0]);
            this.myDataYear.push(element[1]);
          });
          this.myDataChartYear = {
            labels: this.labelsPerYear,
            datasets: [
              {
                data: this.myDataYear,
                label: "Evolution partenaire pour année",
              },
            ],
          };
          console.log(this.myDataChartYear);
          this.themeSubscriptionYear = this.theme
            .getJsTheme()
            .subscribe((config) => {
              const colors: any = config.variables;
              const chartjs: any = config.variables.chartjs;
              this.data = {
                labels: this.labelsPerYear,
                datasets: [
                  {
                    data: this.myDataYear,
                    label: "Evolution des partenaires par année",
                    backgroundColor: NbColorHelper.hexToRgbA(
                      colors.primaryLight,
                      0.8
                    ),
                  },
                ],
              };
              this.options = {
                maintainAspectRatio: false,
                responsive: true,
                legend: {
                  labels: {
                    fontColor: chartjs.textColor,
                  },
                },
                scales: {
                  xAxes: [
                    {
                      gridLines: {
                        display: false,
                        color: chartjs.axisLineColor,
                      },
                      ticks: {
                        fontColor: chartjs.textColor,
                        beginAtZero: true,
                        fontStyle: "bold",
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
                        beginAtZero: true,
                        stepSize: 1,
                      },
                    },
                  ],
                },
              };
            });
        }
      });
  }
}
