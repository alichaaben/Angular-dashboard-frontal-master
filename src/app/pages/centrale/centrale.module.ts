import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import {
  NbAccordionModule,
  NbCardModule,
  NbCheckboxModule,
  NbTreeGridModule,
} from "@nebular/theme";
import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { CheckboxModule } from "primeng/checkbox";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { DialogModule } from "primeng/dialog";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { FilterPipe } from "../../@core/mock/filter.pipe";
import { CentraleMagasinComponent } from "./centrale-magasin/centrale-magasin.component";
import { CentraleRoutingModule } from "./centrale-routing.module";
import { SmsingComponent } from "./smsing/smsing.component";
import { SearchComponent } from "./search/search.component";
import { AllComponent } from "./all/all.component";
import { ListSmsComponent } from './list-sms/list-sms.component';

@NgModule({
  imports: [
    CentraleRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    NbCardModule,
    DropdownModule,
    ButtonModule,
    TableModule,
    CalendarModule,
    NbAccordionModule,
    ButtonModule,
    NbCheckboxModule,
    CheckboxModule,
    TableModule,
    ToastModule,
    ConfirmDialogModule,
    DialogModule,
    NbTreeGridModule,
  ],
  exports: [],
  declarations: [
    CentraleMagasinComponent,
    SmsingComponent,
    FilterPipe,
    SearchComponent,
    AllComponent,
    ListSmsComponent,
  ],
  providers: [],
})
export class CentraleModule {}
