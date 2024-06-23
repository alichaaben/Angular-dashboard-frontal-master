import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChartsComponent } from "./charts.component";
import { EchartsComponent } from "./echarts/echarts.component";
import { D3Component } from "./d3/d3.component";
import { ChartjsComponent } from "./chartjs/chartjs.component";
import { AuthorizeresponsableguardService } from "../../@core/mock/authorizeresponsableguard.service";

const routes: Routes = [
  {
    path: "",
    component: ChartsComponent,
    children: [
      {
        path: "echarts",
        component: EchartsComponent,
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "d3",
        component: D3Component,
      },
      {
        path: "chartjs",
        component: ChartjsComponent,
        canActivate: [AuthorizeresponsableguardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChartsRoutingModule {}

export const routedComponents = [
  ChartsComponent,
  EchartsComponent,
  D3Component,
  ChartjsComponent,
];
