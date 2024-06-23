import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppversionADcaisseRoutingModule } from './appversion-adcaisse-routing.module';
import { appversionadcaissecomponent } from './appversionadcaisse.component';
import { AjouterappversionComponent } from './appversion/ajouterappversion/ajouterappversion.component';
import { TableModule } from 'primeng/table';
import { PanelMenuModule } from 'primeng/panelmenu';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbInputModule, NbLayoutModule, NbRadioModule, NbThemeModule, NbTreeGridModule, NbUserModule } from '@nebular/theme';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TabViewModule } from 'primeng/tabview';
import { DropdownModule } from 'primeng/dropdown';
import { ListboxModule } from 'primeng/listbox';
import { MatDialogModule } from '@angular/material/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [appversionadcaissecomponent, AjouterappversionComponent],
  imports: [
    CommonModule,
    AppversionADcaisseRoutingModule,
    TableModule,
    PanelMenuModule,
    NbButtonModule,
    NbInputModule,
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
    InputNumberModule,
    InputTextareaModule ,
    TabViewModule,
    DropdownModule,
    ListboxModule,
    MatDialogModule,
    FieldsetModule,
    CalendarModule,
    DropdownModule,

    InputNumberModule,


    InputTextareaModule,
    InputTextModule

  ]
})
export class AppversionADcaisseModule { }
