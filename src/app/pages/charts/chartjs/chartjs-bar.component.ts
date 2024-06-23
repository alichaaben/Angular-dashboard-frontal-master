import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbThemeService, NbColorHelper } from "@nebular/theme";
import { ChartsService } from "../../../@core/mock/charts.service";

@Component({
  selector: "ngx-chartjs-bar",
  template: `
    <chart type="bar" [data]="data" [options]="options"></chart>
    <br />
  `,
})
export class ChartjsBarComponent implements OnInit {
  data: any;
  data2: any;

  options: any;
  options2: any;
  themeSubscriptionYear: any;

  themeSubscriptionMonth: any;

  labelsYear: any[] = [];
  labelsMonth: any[] = [];
  myDataYear: any[] = [];
  dataForeachYear: any[] = [];
  myDataChartYear: any;
  myDataMonth: any[] = [];
  dataForeachMonth: any[] = [];
  myDataChartMonth: any;
  constructor(
    private theme: NbThemeService,
    private serviceChart: ChartsService
  ) {}
  ngOnInit(): void {
    this.serviceChart.getNbrPartenairesEachYear().subscribe((dataEachYear) => {
      this.dataForeachYear = Object.entries(dataEachYear);
      this.dataForeachYear.forEach((element) => {
        this.labelsYear.push(element[0]);
        this.myDataYear.push(element[1]);
      });
      this.myDataChartYear = {
        labels: this.labelsYear,
        datasets: [
          {
            data: this.myDataYear,
            label: "Evolution partenaire chaque année",
          },
        ],
      };
      console.log(this.myDataChartYear);
    });

    this.themeSubscriptionYear = this.theme.getJsTheme().subscribe((config) => {
      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.labelsYear,
        datasets: [
          {
            data: this.myDataYear,
            label: "Evolution des partenaires par année",
            backgroundColor: NbColorHelper.hexToRgbA(colors.primaryLight, 0.8),
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
}
