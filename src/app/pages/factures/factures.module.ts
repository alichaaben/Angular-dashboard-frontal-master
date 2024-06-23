import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FacturesRoutingModule } from "./factures-routing.module";
import { facturecomponent } from "./facture.component";
import { PanelMenuModule } from "primeng/panelmenu";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ListFacturesComponent } from "./list-factures/list-factures.component";
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbLayoutModule,
  NbRadioModule,
  NbSelectModule,
  NbThemeModule,
  NbToggleModule,
  NbTreeGridModule,
  NbUserModule,
} from "@nebular/theme";
import { PanelModule } from "primeng/panel";
import { ToolbarModule } from "primeng/toolbar";
import { MessageService, PrimeIcons, SharedModule } from "primeng/api";
import { SplitButtonModule } from "primeng/splitbutton";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { FieldsetModule } from "primeng/fieldset";
import { ToastModule } from "primeng/toast";
import { ProduitsComponent } from "./produits/produits.component";
import { Menubar, MenubarModule } from "primeng/menubar";
import { DialogModule } from "primeng/dialog";
import { InputSwitchModule } from "primeng/inputswitch";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CheckboxModule } from "primeng/checkbox";
import { ToastrModule } from "ngx-toastr";
import { AjouterfactureComponent } from "./ajouterfacture/ajouterfacture.component";
import { ListFactureArchiveComponent } from "./list-facture-archive/list-facture-archive.component";
import { UpdateproduitComponent } from "./produits/updateproduit/updateproduit.component";
import { UpdatefactureComponent } from "./updatefacture/updatefacture.component";
import { ToggleButtonModule } from "primeng/togglebutton";
import { DropdownModule } from "primeng/dropdown";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { MenuModule } from "primeng/menu";
import { DetailFactureComponent } from "./detail-facture/detail-facture.component";
import jsPDF from "jspdf";
import { CalendarModule } from "primeng/calendar";
import { InputNumberModule } from "primeng/inputnumber";
import { InputTextareaModule } from "primeng/inputtextarea";
import { TabViewModule } from "primeng/tabview";
import { ListboxModule } from "primeng/listbox";
import { PartenairedialogComponent } from "./ajouterfacture/partenairedialog/partenairedialog.component";
import { FactureService } from "../../@core/mock/facture.service";
import { TimeLineFactureComponent } from './time-line-facture/time-line-facture.component';
import { TimelineModule } from "primeng/timeline";
import { CardModule } from "primeng/card";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HttpInterceptorInterceptor } from "../../@core/mock/http-interceptor.interceptor";
import { FactureFileComponent } from './facture-file/facture-file.component';
import {FileUploadModule} from 'primeng/fileupload';
import { AjouterPaymentTypeComponent } from './PaymentType/ajouter-payment-type/ajouter-payment-type.component';
import { ListPaymentTypeComponent } from './PaymentType/list-payment-type/list-payment-type.component';


import {KeyFilterModule} from 'primeng/keyfilter';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputMaskModule} from 'primeng/inputmask';




@NgModule({
  declarations: [
    facturecomponent,
    ListFacturesComponent,
    ProduitsComponent,
    AjouterfactureComponent,
    ListFactureArchiveComponent,
    UpdateproduitComponent,
    UpdatefactureComponent,
    DetailFactureComponent,
    PartenairedialogComponent,
    TimeLineFactureComponent,
    FactureFileComponent,
    AjouterPaymentTypeComponent,
    ListPaymentTypeComponent,
  ],
  imports: [
    CommonModule,
    FacturesRoutingModule,
    TableModule,
    PanelMenuModule,
    ButtonModule,
    NbInputModule,
    NbSelectModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbThemeModule.forRoot({ name: "default" }),
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbTreeGridModule,
    NbCheckboxModule,
    NbRadioModule,
    NbIconModule,
    NbToggleModule,
    NbDatepickerModule,
    PanelModule,
    ToolbarModule,
    SharedModule,
    SplitButtonModule,
    ConfirmDialogModule,
    FieldsetModule,
    ToastModule,
    MenubarModule,
    DialogModule,
    FormsModule,
    ReactiveFormsModule,
    CheckboxModule,
    ToastrModule.forRoot(),
    InputSwitchModule,
    BreadcrumbModule,
    ToggleButtonModule,
    DropdownModule,
    MenuModule,
    CalendarModule,
    InputNumberModule,
    InputTextareaModule,
    TabViewModule,
    DropdownModule,
    ListboxModule,
    TimelineModule,
    CardModule,
    FileUploadModule,
    KeyFilterModule,
    MessageModule,
    MessagesModule,
    InputMaskModule,
    


  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorInterceptor,
      multi: true
    }],

  entryComponents: [PartenairedialogComponent, FactureService],
})
export class FacturesModule {}
