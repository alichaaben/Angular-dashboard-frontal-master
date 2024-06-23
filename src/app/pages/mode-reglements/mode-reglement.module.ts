import { NgModule } from "@angular/core";
import { NbCardModule, NbInputModule } from "@nebular/theme";
import { ButtonModule } from "primeng/button";
import { ConfirmDialog, ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ModeReglementRoutingModule } from "./mode-reglement-routing";
import { ModeReglementComponent } from "./mode-reglement/mode-reglement.component";
import { ListModeReglementComponent } from "./list-mode-reglement/list-mode-reglement.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from "@angular/common";
import { UpdateModeReglementComponent } from "./update-mode-reglement/update-mode-reglement.component";

@NgModule({
  imports: [
    ModeReglementRoutingModule,
    CommonModule,
    NbCardModule,
    NbInputModule,
    ButtonModule,
    ToastModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    NbInputModule,
    ConfirmDialogModule,
  ],

  exports: [],
  declarations: [
    ModeReglementComponent,
    ListModeReglementComponent,
    UpdateModeReglementComponent,
  ],
  providers: [],
})
export class ModeReglementModule {}
