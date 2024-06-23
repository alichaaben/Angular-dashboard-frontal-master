import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AjouterfactureComponent } from "./ajouterfacture/ajouterfacture.component";
import { PartenairedialogComponent } from "./ajouterfacture/partenairedialog/partenairedialog.component";
import { DetailFactureComponent } from "./detail-facture/detail-facture.component";
import { FactureFileComponent } from "./facture-file/facture-file.component";
import { facturecomponent } from "./facture.component";
import { ListFactureArchiveComponent } from "./list-facture-archive/list-facture-archive.component";
import { ListFacturesComponent } from "./list-factures/list-factures.component";
import { ProduitsComponent } from "./produits/produits.component";
import { UpdateproduitComponent } from "./produits/updateproduit/updateproduit.component";
import { TimeLineFactureComponent } from "./time-line-facture/time-line-facture.component";
import { UpdatefactureComponent } from "./updatefacture/updatefacture.component";

const routes: Routes = [
  {
    path: "",
    component: facturecomponent,
    children: [
      {
        path: "listfactures",
        component: ListFacturesComponent,
      },
      {
        path: "Produits",
        component: ProduitsComponent,
      },
      {
        path: "Ajouterfacture",
        component: AjouterfactureComponent,
      },
      {
        path: "Modifierproduit/:idProduit",
        component : UpdateproduitComponent
      },
      {
        path: "ModifierFacture/:idFacture",
        component :UpdatefactureComponent
      },
      {
        path: "listfacturesinarchive",
        component: ListFactureArchiveComponent,
      },
      {
        path: "listfactures/detailFacture/:idFacture",
        component: DetailFactureComponent,
      },
      {
        path: "partnerdialog",
        component: PartenairedialogComponent,
      },
      {
        path: "listfactures/timelinefacture/:idFacture",
        component: TimeLineFactureComponent,
      },

      {
        path: "listfactures/facturefile/:idFacture",
        component: FactureFileComponent,
      },


    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturesRoutingModule {}
