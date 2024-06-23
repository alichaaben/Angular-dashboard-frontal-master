import { NgModule } from "@angular/core";
import { PointsVentesRoutingModule } from "./pointsVentes-routing.module";
import { AjouterPointsVenteComponent } from "./ajouter-points-vente/ajouter-points-vente.component";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
import { DetailPointVenteComponent } from "./detail-point-vente/detail-point-vente.component";
import { UpdatePointVenteComponent } from "./update-point-vente/update-point-vente.component";
import { FieldsetModule } from "primeng/fieldset";
import {
  NbButton,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbSelectModule,
  NbThemeModule,
} from "@nebular/theme";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastModule } from "primeng/toast";
import { LocalisationPointVentes } from "../maps/Maps-Poins-vente/Maps-Points-ventes";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ListPointsVenteComponent } from "./list-points-vente/list-points-vente.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "../../@core/mock/auth-interceptor.service";

@NgModule({
  declarations: [
    AjouterPointsVenteComponent,
    DetailPointVenteComponent,
    UpdatePointVenteComponent,
    LocalisationPointVentes,
    ListPointsVenteComponent,
  ],
  imports: [
    PointsVentesRoutingModule,
    TableModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    ReactiveFormsModule,
    TableModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    FormsModule,
    ToastModule,
    FieldsetModule,
    ConfirmDialogModule,
    NbSelectModule,
    NbButtonModule,
  ],
})
export class PointsventeModule {}
