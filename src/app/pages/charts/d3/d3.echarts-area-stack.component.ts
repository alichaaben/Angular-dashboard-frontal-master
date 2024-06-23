import { getAllLifecycleHooks } from '@angular/compiler/src/lifecycle_reflector';
import { Component, OnDestroy, Pipe } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { FactureAdcaisse } from '../../../@core/data/FactureAdcaisse';
import { FactureService } from '../../../@core/mock/facture.service';



@Component({
  selector: 'ngx-d3-bar',
  template: `
    <chart echarts [options]="options" class="echart"></chart>

  `,
})
export class D3AreaStackComponent  implements OnDestroy {


  listfacture : FactureAdcaisse[];
  facture :FactureAdcaisse= new FactureAdcaisse()

  options: any = {};
  themeSubscription: any;

  totalpric_Y : any[]=[] ;
  totalpric_X : any ;

  constructor(private theme: NbThemeService , private  facttureservice : FactureService) {
  }

  ngAfterViewInit() {
//                                                                   worked !!!!!!!!!!!!!!!!
    this.facttureservice.getAllActiveFacture().subscribe((data) => {
      this.listfacture = data;
      console.log("les facture active",this.listfacture);

      this.totalpric_Y = this.listfacture.map(x=>x.totalprice) ;
      this.totalpric_X = this.listfacture.map(x=>x.name) ;

      console.log("les x",this.totalpric_X)
      console.log("les y",this.totalpric_Y)


      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {




        const colors: any = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [colors.primaryLight],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
            },
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true,
          },
          xAxis: [
            {
              name: 'Partenaire :',

              type: 'category',
              data:this.totalpric_X,
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
              type: 'value',
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
              name: 'Total(DT)',
              type: 'bar',
              barWidth: '60%',
              data: this.totalpric_Y,
            },
            console.log('whyyyyyyyyyyyyy',this.totalpric_Y)
          ],
        };
      });


    });
    console.log("les facture active",this.listfacture);








  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }




}
