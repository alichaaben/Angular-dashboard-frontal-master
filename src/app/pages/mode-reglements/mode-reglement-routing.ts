import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListModeReglementComponent } from "./list-mode-reglement/list-mode-reglement.component";
import { UpdateModeReglementComponent } from "./update-mode-reglement/update-mode-reglement.component";

const routes: Routes = [
  { path: "list-mode-reglement", component: ListModeReglementComponent },
  {
    path: "update-mode-reglement/:idModeReglement",
    component: UpdateModeReglementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModeReglementRoutingModule {}
