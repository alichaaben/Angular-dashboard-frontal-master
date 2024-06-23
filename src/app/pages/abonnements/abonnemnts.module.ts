import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NbCardModule, NbRadioModule, NbSelectModule } from "@nebular/theme";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { AbonnementRoutingModule } from "./abbonnements-routing.module";
import { AjoutAbonnementComponent } from "./ajout-abonnement/ajout-abonnement.component";
import { ListAbonnementsComponent } from "./list-abonnements/list-abonnements.component";
import { ModifierAbonnementComponent } from "./modifier-abonnement/modifier-abonnement.component";
import { ToastModule } from "primeng/toast";
import { DropdownModule } from "primeng/dropdown";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ToggleButtonModule } from "primeng/togglebutton";
import { DialogModule } from "primeng/dialog";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "../../@core/mock/auth-interceptor.service";
import { DynamicDialogModule } from "primeng/dynamicdialog";
import { DetailsAbonnementsComponent } from "./details-abonnements/details-abonnements.component";
import { BreadcrumbModule } from "primeng/breadcrumb";

@NgModule({
  declarations: [
    ListAbonnementsComponent,
    ModifierAbonnementComponent,
    AjoutAbonnementComponent,
    DetailsAbonnementsComponent,
  ],
  imports: [
    AbonnementRoutingModule,
    NbCardModule,
    TableModule,
    ButtonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NbRadioModule,
    NbSelectModule,
    ToastModule,
    DropdownModule,
    ConfirmDialogModule,
    ToggleButtonModule,
    DialogModule,
    DynamicDialogModule,
    BreadcrumbModule,
  ],
})
export class AbonnemntModule {}
