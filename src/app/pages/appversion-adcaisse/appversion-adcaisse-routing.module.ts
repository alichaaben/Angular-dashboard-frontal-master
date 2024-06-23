import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjouterappversionComponent } from './appversion/ajouterappversion/ajouterappversion.component';
import { appversionadcaissecomponent } from './appversionadcaisse.component';

const routes: Routes = [

  {
    path: "",
    component: appversionadcaissecomponent,
    children: [
      {
        path: "Ajouterappversion",
        component: AjouterappversionComponent,
      }
    ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppversionADcaisseRoutingModule {


 }
