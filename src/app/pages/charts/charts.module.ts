import { NgModule } from "@angular/core";
import { NgxEchartsModule } from "ngx-echarts";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { ChartModule } from "angular2-chartjs";
import { NbCalendarModule, NbCardModule, NbSelectModule } from "@nebular/theme";
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsRoutingModule, routedComponents } from "./charts-routing.module";
import { ChartjsBarComponent } from "./chartjs/chartjs-bar.component";
import { ChartjsLineComponent } from "./chartjs/chartjs-line.component";
import { ChartjsPieComponent } from "./chartjs/chartjs-pie.component";
import { ChartjsMultipleXaxisComponent } from "./chartjs/chartjs-multiple-xaxis.component";
import { ChartjsBarHorizontalComponent } from "./chartjs/chartjs-bar-horizontal.component";
import { ChartjsRadarComponent } from "./chartjs/chartjs-radar.component";
import { D3BarComponent } from "./d3/d3-bar.component";
import { D3LineComponent } from "./d3/d3-line.component";
import { D3PieComponent } from "./d3/d3-pie.component";
import { D3AreaStackComponent } from "./d3/d3-area-stack.component";
import { D3PolarComponent } from "./d3/d3-polar.component";
import { D3AdvancedPieComponent } from "./d3/d3-advanced-pie.component";
import { EchartsLineComponent } from "./echarts/echarts-line.component";
import { EchartsPieComponent } from "./echarts/echarts-pie.component";
import { EchartsBarComponent } from "./echarts/echarts-bar.component";
import { EchartsMultipleXaxisComponent } from "./echarts/echarts-multiple-xaxis.component";
import { EchartsAreaStackComponent } from "./echarts/echarts-area-stack.component";
import { EchartsBarAnimationComponent } from "./echarts/echarts-bar-animation.component";
import { EchartsRadarComponent } from "./echarts/echarts-radar.component";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { ButtonModule } from "primeng/button";
import { ProgressSpinnerModule } from "primeng/progressspinner";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CalendarModule } from "primeng/calendar";
import { CascadeSelectModule } from "primeng/cascadeselect";
import { MyStats } from "./chartjs/chart-my-stats.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { PvStats } from "./chartjs/chart-pvByPartner";
import { D3Barhorizontcomponents } from "./d3/d3-barhorizont.component";
import { D3NumberoffactureanddetailsConponent } from "./d3/d3-Numberoffactureanddetails";

const components = [
  ChartjsBarComponent,
  ChartjsLineComponent,
  ChartjsPieComponent,
  ChartjsMultipleXaxisComponent,
  ChartjsBarHorizontalComponent,
  ChartjsRadarComponent,
  MyStats,
  PvStats,
  D3BarComponent,
  D3LineComponent,
  D3PieComponent,
  D3AreaStackComponent,
  D3PolarComponent,
  D3Barhorizontcomponents,
  D3NumberoffactureanddetailsConponent,
  D3AdvancedPieComponent,
  EchartsLineComponent,
  EchartsPieComponent,
  EchartsBarComponent,
  EchartsMultipleXaxisComponent,
  EchartsAreaStackComponent,
  EchartsBarAnimationComponent,
  EchartsRadarComponent,
  

];

@NgModule({
  imports: [
    ThemeModule,
    ChartsRoutingModule,
    NgxEchartsModule,
    NgxChartsModule,
    ChartModule,
    NbCardModule,
    NbSelectModule,
    ToastModule,
    DropdownModule,
    NbCalendarModule,
    ToastModule,
    ButtonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    CalendarModule,
    CascadeSelectModule,
    FormsModule,
    ConfirmDialogModule,
  ],
  declarations: [...routedComponents, ...components],
})
export class ChartsModule {}
