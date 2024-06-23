import { Component, OnDestroy } from "@angular/core";
import { NbThemeService } from "@nebular/theme";
import { FactureAdcaisseStatusStat_view } from "../../../@core/data/FactureAdcaisseStatusStat_view";
import { FactureService } from "../../../@core/mock/facture.service";
@Component({
  selector: "ngx-pie",
  template: ` <div echarts [options]="options" class="echart"></div> `,
})
//pie chart 2 : montant facture
export class D3LineComponent implements OnDestroy {
  options: any = {};
  themeSubscription: any;
  listStatFactures: FactureAdcaisseStatusStat_view[];
  facture: FactureAdcaisseStatusStat_view =
    new FactureAdcaisseStatusStat_view();
  countsumWithTva_Y: any[] = [];
  Statutfacture_X: any[];
  constructor(
    private theme: NbThemeService,
    private factureservice: FactureService
  ) {}
  ngAfterViewInit() {
    this.factureservice.getAllFactureDetailAdcaisseView().subscribe((data) => {
      this.listStatFactures = data;
      console.log("les status des factures", this.listStatFactures);
      this.countsumWithTva_Y = this.listStatFactures.map((x) => x._id);
      this.Statutfacture_X = [];
      this.listStatFactures.forEach((element) => {
        this.Statutfacture_X.push({
          value: element.sumWithoutTVA,
          name: element._id,
        });
      });
      console.log("les x s", this.Statutfacture_X);
      console.log("les y", this.countsumWithTva_Y);
      this.themeSubscription = this.theme.getJsTheme().subscribe((config) => {
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
            data: this.countsumWithTva_Y,
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: "Montant total",
              type: "pie",
              radius: "80%",
              center: ["50%", "50%"],
              data: this.Statutfacture_X,
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
  }
  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
