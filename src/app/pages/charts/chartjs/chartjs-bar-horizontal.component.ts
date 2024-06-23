import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbThemeService } from "@nebular/theme";
import { ClientDto } from "../../../@core/data/ClientDto";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { ChartsService } from "../../../@core/mock/charts.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";

@Component({
  selector: "ngx-chartjs-bar-horizontal",
  template: ` <div echarts [options]="options" class="echart"></div> `,
  providers: [DatePipe],
})
export class ChartjsBarHorizontalComponent implements OnInit {
  options: any = {};
  themeSubscription: any;
  months: any[];
  nbrClientsAppMobile: any[];
  response: any[];

  submitted: boolean;
  nbrClients: number;
  partenaires: PartenaireBprice[];
  client: ClientDto = new ClientDto();
  ClientForm: FormGroup = new FormGroup({
    partenaire: new FormControl("", Validators.required),
    startDate: new FormControl("", Validators.required),
    endDate: new FormControl("", Validators.required),
    src: new FormControl("", Validators.required),
  });
  optionsToSelect: any[] = [
    { type: "app-mobile", name: "Apllication mobile" },
    { type: "caisse", name: "caisse" },
  ];
  constructor(
    private chartService: ChartsService,
    private servicePartenaire: PartenairesService,
    private datePipe: DatePipe,
    private theme: NbThemeService
  ) {}
  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
    });
    this.submit();
  }
  submit() {
    this.submitted = true;
    this.chartService.getNbrClientAppMobile().subscribe((res) => {
      this.response = [];
      this.months = [];
      this.nbrClientsAppMobile = [];
      this.response = Object.entries(res);
      this.response.forEach((element) => {
        this.months.push(element[0]);
        this.nbrClientsAppMobile.push(element[1]);
      });
      console.log(this.months);
      console.log(this.nbrClientsAppMobile);
      this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: this.months,
              axisTick: {
                alignWithLabel: true,
              },
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              axisLine: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
              splitLine: {
                lineStyle: {
                  color: echarts.splitLineColor,
                },
              },
              axisLabel: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
          ],
          series: [
            {
              name: "clients App-mobile",
              type: "bar",
              barWidth: "60%",
              data: this.nbrClientsAppMobile,
            },
          ],
        };
      });
    });
  }
}
