import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { PartenairesRoutingModule } from "./partenaires-routing.module";
import { ListPartenairesComponent } from "./list-partenaires/list-partenaires.component";
import { AjouterPartenaireComponent } from "./ajouter-partenaire/ajouter-partenaire.component";
import { FieldsetModule } from "primeng/fieldset";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";
import { StepsModule } from "primeng/steps";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { TableModule } from "primeng/table";
import { PointVenteDemo } from "./ajouter-partenaire/pointVenteDemo";
import {
  NbCardModule,
  NbInputModule,
  NbLayoutModule,
  NbThemeModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { ModifierPartenaireComponent } from "./modifier-partenaire/modifier-partenaire.component";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { LocalisationParetnaire } from "./ajouter-partenaire/mapsPartenaire";
import { BadgeModule } from "primeng/badge";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "../../@core/mock/auth-interceptor.service";

@NgModule({
  declarations: [
    ListPartenairesComponent,
    AjouterPartenaireComponent,
    PointVenteDemo,
    ModifierPartenaireComponent,
    LocalisationParetnaire,
  ],
  imports: [
    CommonModule,
    PartenairesRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FieldsetModule,
    InputTextModule,
    InputTextareaModule,
    StepsModule,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
    ToastModule,
    TableModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbTreeGridModule,
    ConfirmDialogModule,
    BadgeModule,
  ],
})
export class PartenairesModule {}
