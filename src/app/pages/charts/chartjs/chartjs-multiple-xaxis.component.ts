import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbColorHelper, NbThemeService } from "@nebular/theme";
import { ChartsService } from "../../../@core/mock/charts.service";

@Component({
  selector: "ngx-chartjs-multiple-xaxis",
  template: `<chart type="bar" [data]="data2" [options]="options2"></chart>`,
})
export class ChartjsMultipleXaxisComponent implements OnInit {
  data2: any;
  options2: any;
  themeSubscriptionMonth: any;
  labelsMonth: any[] = [];
  myDataMonth: any[] = [];
  dataForeachMonth: any[] = [];
  myDataChartMonth: any;
  constructor(
    private theme: NbThemeService,
    private serviceChart: ChartsService
  ) {}
  ngOnInit(): void {
    this.serviceChart
      .getNbrPartenairesEachMonth()
      .subscribe((dataEachMonth) => {
        this.dataForeachMonth = Object.entries(dataEachMonth);
        this.dataForeachMonth.forEach((element) => {
          this.labelsMonth.push(element[0]);
          this.myDataMonth.push(element[1]);
        });
        this.myDataChartMonth = {
          labels: this.labelsMonth,
          datasets: [
            {
              data: this.myDataMonth,
              label: "Evolution partenaire chaque mois",
            },
          ],
        };
        console.log(this.myDataChartMonth);
      });

    this.themeSubscriptionMonth = this.theme
      .getJsTheme()
      .subscribe((config) => {
        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;

        this.data2 = {
          labels: this.labelsMonth,
          datasets: [
            {
              data: this.myDataMonth,
              label: "Evolution des partenaires par mois",
              backgroundColor: NbColorHelper.hexToRgbA(
                colors.primaryLight,
                0.8
              ),
            },
          ],
        };

        this.options2 = {
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
                },
              },
            ],
          },
        };
      });
  }
}
