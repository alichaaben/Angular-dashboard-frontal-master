import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthorizeresponsableguardService } from "../../@core/mock/authorizeresponsableguard.service";
import { AjoutAbonnementComponent } from "./ajout-abonnement/ajout-abonnement.component";
import { DetailsAbonnementsComponent } from "./details-abonnements/details-abonnements.component";
import { ListAbonnementsComponent } from "./list-abonnements/list-abonnements.component";
import { ModifierAbonnementComponent } from "./modifier-abonnement/modifier-abonnement.component";

const routes: Routes = [
  {
    path: "list-abonnements",
    component: ListAbonnementsComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
  {
    path: "ajout-abonnement",
    component: AjoutAbonnementComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
  {
    path: "modifier-abonnement/:idAbonnement",
    component: ModifierAbonnementComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
  {
    path: "details-abonnements/:idPartenaire",
    component: DetailsAbonnementsComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbonnementRoutingModule {}
