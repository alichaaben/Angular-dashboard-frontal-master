import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { FactureAdcaisseStatusStat_view } from '../../../@core/data/FactureAdcaisseStatusStat_view';
import { FactureService } from '../../../@core/mock/facture.service';

@Component({
  selector: 'ngx-d3-pie',
  template: `
    <chart type="pie" [data]="data" [options]="options"></chart>

  `,
})
export class D3PieComponent implements OnDestroy {
  data: any;
  options: any;
  themeSubscription: any;


  listStatFactures : FactureAdcaisseStatusStat_view[];
  facture :FactureAdcaisseStatusStat_view= new FactureAdcaisseStatusStat_view()
  countNumber_Y : any[]=[] ;
  Statutfacture_X : any[] ;




  constructor(private theme: NbThemeService ,private factureservice : FactureService) {


    this.factureservice.getAllFactureDetailAdcaisseView().subscribe((data) => {
      this.listStatFactures = data;
      console.log("les status des factures",this.listStatFactures);

      this.countNumber_Y = this.listStatFactures.map(x=>x.count) ;
      this.Statutfacture_X = this.listStatFactures.map(x=>x._id) ;

      console.log("les x",this.Statutfacture_X)
      console.log("les y",this.countNumber_Y)

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;

      this.data = {
        labels: this.Statutfacture_X,
        datasets: [{
          data: this.countNumber_Y,
          backgroundColor: [colors.primaryLight, colors.infoLight, colors.successLight],
        }],
      };

      this.options = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
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

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  ngOnInit(): void {

}
}
