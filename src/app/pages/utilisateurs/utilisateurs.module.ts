import { NgModule } from "@angular/core";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { CommonModule } from "@angular/common";
import { DialogModule } from "primeng/dialog";
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
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ListUtilisateursComponent } from "./list-utilisateurs/list-utilisateurs.component";
import { UtilisateursRoutingModule } from "./utilsateurs-routing.module";

@NgModule({
  declarations: [ListUtilisateursComponent],
  imports: [
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
    ConfirmDialogModule,
    NbSelectModule,
    NbButtonModule,
    UtilisateursRoutingModule,
  ],
})
export class UtilisateursModule {}
