import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthInterceptorService } from "../../@core/mock/auth-interceptor.service";
import { AuthorizeresponsableguardService } from "../../@core/mock/authorizeresponsableguard.service";
import { AjouterPartenaireComponent } from "./ajouter-partenaire/ajouter-partenaire.component";
import { ListPartenairesComponent } from "./list-partenaires/list-partenaires.component";
import { ModifierPartenaireComponent } from "./modifier-partenaire/modifier-partenaire.component";

const routes: Routes = [
  {
    path: "list-partenaires",
    component: ListPartenairesComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
  {
    path: "ajout-partenaire",
    component: AjouterPartenaireComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
  {
    path: "modifier-partenaire/:id",
    component: ModifierPartenaireComponent,
    canActivate: [AuthorizeresponsableguardService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PartenairesRoutingModule {}
