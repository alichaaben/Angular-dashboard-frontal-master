import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllComponent } from "./all/all.component";
import { CentraleMagasinComponent } from "./centrale-magasin/centrale-magasin.component";
import { SmsingComponent } from "./smsing/smsing.component";

export const routes: Routes = [
  { path: "centrale-magasin", component: CentraleMagasinComponent },
  { path: "smsing", component: AllComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CentraleRoutingModule {}
