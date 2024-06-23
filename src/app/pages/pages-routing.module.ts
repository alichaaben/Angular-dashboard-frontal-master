import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { ECommerceComponent } from "./e-commerce/e-commerce.component";
import { NotFoundComponent } from "./miscellaneous/not-found/not-found.component";
import { AuthorizeresponsableguardService } from "../@core/mock/authorizeresponsableguard.service";
import { AuthorizeGuardService } from "../@core/mock/authorize-guard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "../@core/mock/auth-interceptor.service";
import { DetailPointVenteComponent } from "./points-ventes/detail-point-vente/detail-point-vente.component";
import { UpdatePointVenteComponent } from "./points-ventes/update-point-vente/update-point-vente.component";

const routes: Routes = [
  {
    path: "",

    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: ECommerceComponent,
        canActivate: [AuthorizeresponsableguardService],
      },

      {
        path: "partenaires",
        loadChildren: () =>
          import("./partenaires/partenaires.module").then(
            (m) => m.PartenairesModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "abonnements",
        loadChildren: () =>
          import("./abonnements/abonnemnts.module").then(
            (m) => m.AbonnemntModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "ajout-partenaire",
        loadChildren: () =>
          import("./partenaires/partenaires.module").then(
            (m) => m.PartenairesModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "modifier-partenaire/:id",
        loadChildren: () =>
          import("./partenaires/partenaires.module").then(
            (m) => m.PartenairesModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "points-vente",
        loadChildren: () =>
          import("./points-ventes/PointsVente.module").then(
            (m) => m.PointsventeModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "points-vente/:idPartenaire",
        component: DetailPointVenteComponent,
        loadChildren: () =>
          import("./points-ventes/PointsVente.module").then(
            (m) => m.PointsventeModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "modifier-point-vente/:idPointVente",
        loadChildren: () =>
          import("./points-ventes/PointsVente.module").then(
            (m) => m.PointsventeModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "modifier-point-vente/:idPointVente",
        component: UpdatePointVenteComponent,
        canActivate: [AuthorizeresponsableguardService],
      },

      {
        path: "maps",
        loadChildren: () =>
          import("./maps/maps.module").then((m) => m.MapsModule),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "charts",
        loadChildren: () =>
          import("./charts/charts.module").then((m) => m.ChartsModule),
        canActivate: [AuthorizeGuardService],
      },
      {
        path: "facture",
        loadChildren: () =>
          import("./factures/factures.module").then((m) => m.FacturesModule),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "appversion",
        loadChildren: () =>
          import("./appversion-adcaisse/appversion-adcaisse.module").then(
            (m) => m.AppversionADcaisseModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },

      {
        path: "miscellaneous",
        loadChildren: () =>
          import("./miscellaneous/miscellaneous.module").then(
            (m) => m.MiscellaneousModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },
      {
        path: "centrale",
        loadChildren: () =>
          import("./centrale/centrale.module").then((m) => m.CentraleModule),
        canActivate: [AuthorizeresponsableguardService],
      },

      {
        path: "mode-reglement",
        loadChildren: () =>
          import("./mode-reglements/mode-reglement.module").then(
            (m) => m.ModeReglementModule
          ),
        canActivate: [AuthorizeresponsableguardService],
      },

      {
        path: "users",
        loadChildren: () =>
          import("./utilisateurs/utilisateurs.module").then(
            (m) => m.UtilisateursModule
          ),
      },
      {
        path: "auth",
        loadChildren: () =>
          import("./authentification/auth.module").then(
            (m) => m.AuthenticateModule
          ),
      },

      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
      },
      {
        path: "**",
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class PagesRoutingModule {}
