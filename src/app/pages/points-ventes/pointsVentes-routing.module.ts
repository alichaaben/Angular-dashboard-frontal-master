import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LocalisationPointVentes } from "../maps/Maps-Poins-vente/Maps-Points-ventes";
import { AjouterPointsVenteComponent } from "./ajouter-points-vente/ajouter-points-vente.component";
import { DetailPointVenteComponent } from "./detail-point-vente/detail-point-vente.component";
import { ListPointsVenteComponent } from "./list-points-vente/list-points-vente.component";
import { UpdatePointVenteComponent } from "./update-point-vente/update-point-vente.component";

const routes: Routes = [
  {
    path: "list-points-vente",
    component: ListPointsVenteComponent,
  },
  {
    path: "points-vente",
    component: ListPointsVenteComponent,
  },
  {
    path: "points-vente/:idPartenaire",
    component: DetailPointVenteComponent,
  },
  {
    path: "modifier-point-vente/:idPointVente",
    component: UpdatePointVenteComponent,
  },
  {
    path: "ajouter-point-vente/:idPartenaire",
    component: AjouterPointsVenteComponent,
  },
  {
    path: "localisation-point-vente/:idPartenaire",
    component: LocalisationPointVentes,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PointsVentesRoutingModule {}
