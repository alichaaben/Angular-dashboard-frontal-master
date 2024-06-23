import { Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-d3-polar',
  template: `
    <ngx-charts-polar-chart
      [scheme]="colorScheme"
      [results]="multi"
      [xAxis]="showXAxis"
      [yAxis]="showYAxis"
      [legend]="showLegend"
      [showXAxisLabel]="showXAxisLabel"
      [showYAxisLabel]="showYAxisLabel"
      [xAxisLabel]="xAxisLabel"
      [yAxisLabel]="yAxisLabel"
      [autoScale]="autoScale">
    </ngx-charts-polar-chart>
  `,
})
export class D3PolarComponent implements OnDestroy {
  multi = [
    {
      name: 'Android',
      series: [
        {
          name: '',
          value: 11,
        },
        {
          name: '',
          value: 2,
        },
        {
          name: '',
          value: 6,
        },
      ],
    },
    {
      name: 'USA',
      series: [
        {
          name: '1990',
          value: 15,
        },
        {
          name: '2000',
          value: 16,
        },
        {
          name: '2010',
          value: 15,
        },
        {
          name: '2014',
          value: 17,
        },
      ],
    },
    {
      name: 'France',
      series: [
        {
          name: '',
          value: 2,
        },
        {
          name: '',
          value: 3,
        },
        {
          name: '',
          value: 8,
        },
      ],
    },
  ];
  showLegend = true;  //right side
  autoScale = true;
  showXAxis = true;
  showYAxis = true;  // left side numbers
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = 'Country';
  yAxisLabel = 'Population';
  colorScheme: any;
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.infoLight, colors.successLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
