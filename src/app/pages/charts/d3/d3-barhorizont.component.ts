import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnDestroy, Pipe } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { FactureAdcaisse } from '../../../@core/data/FactureAdcaisse';
import { produitvenducount_view } from '../../../@core/data/produitvenducount_view';
import { DetailFactureService } from '../../../@core/mock/detail-facture.service';
import { FactureService } from '../../../@core/mock/facture.service';



@Component({
  selector: 'ngx-d3-advencebar',
  template: `
     <ngx-charts-bar-vertical
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel">
    </ngx-charts-bar-vertical>

  `,
})
export class D3Barhorizontcomponents implements OnDestroy {

  listStatproduitadcaisse: produitvenducount_view[];
  facture: produitvenducount_view = new produitvenducount_view();

  countsumproduit_Y: any[] = [];
  nomProduit_X: any[];


 constructor(private theme: NbThemeService , private Detailservice: DetailFactureService
  ) {



  }


  ngAfterViewInit() {


    this.Detailservice.getAllProduitAdcaisseVendubyRank().subscribe((data) => {
      this.listStatproduitadcaisse = data;
      console.log("produitadcaisssssse",this.listStatproduitadcaisse)
      this.countsumproduit_Y = this.listStatproduitadcaisse.map((x) => x._id);
      this.nomProduit_X = [];
      this.listStatproduitadcaisse.forEach((element) => {
        this.nomProduit_X.push({
          value: element.produitcount,
          name: element._id,
        });
      });


      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors: any = config.variables;
        this.colorScheme = {
          domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
        };
       
        this.results=this.nomProduit_X ;
      });

      
    });


  }



  results ;
  showLegend = true;
  showXAxis = true;
  showYAxis = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;



  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
