import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListUtilisateursComponent } from "./list-utilisateurs/list-utilisateurs.component";

const routes: Routes = [
  { path: "list-utilisateurs", component: ListUtilisateursComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UtilisateursRoutingModule {}
