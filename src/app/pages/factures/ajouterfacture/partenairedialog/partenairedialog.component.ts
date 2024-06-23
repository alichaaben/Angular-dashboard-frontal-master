import { DatePipe } from '@angular/common';
import { Component, OnInit,Input,Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, FilterMatchMode, MessageService, PrimeNGConfig, SortEvent } from 'primeng/api';
import { PartenaireBprice } from '../../../../@core/data/PartenaireBprice';
import { FactureService } from '../../../../@core/mock/facture.service';
import { PartenairesService } from '../../../../@core/mock/partenaires.service';



@Component({
  selector: 'ngx-partenairedialog',
  templateUrl: './partenairedialog.component.html',
  styleUrls: ['./partenairedialog.component.scss'],
  providers: [ConfirmationService, MessageService ],


})
export class PartenairedialogComponent implements OnInit {



  partenaires: PartenaireBprice[];
  first: number = 0;
  block: boolean = false;
  currentDate: Date = new Date();
  partenairesNonPaynts = [];
  selectedpartnaire : any ;
  selectAll: boolean = false;
  totalRecords: number;
  idpar : string
  partnerName : string ;
  constructor(
     private servicePartenaire: PartenairesService,
     private config: PrimeNGConfig,
     private factureservice : FactureService,
     private messageService :MessageService
 ) { }

  ngOnInit(): void {


    this.servicePartenaire.getTheAllpartners().subscribe((data) => {
      this.partenaires = data;

      this.partenaires.forEach((element) => {
        let emptyStr = "";
        emptyStr = element.matriculeFiscale.substring(0, 4);
        emptyStr += Array(element.matriculeFiscale.length - 4)
          .fill("*")
          .join("");
        element.matriculeFiscale = emptyStr;
      });
      console.log("list des partenaires", this.partenaires);
    });

    this.config.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_AFTER,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_IS_NOT,
      ],
    };
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === "string" && typeof value2 === "string")
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }



  onSelectionChange(value ) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedpartnaire = value;

    console.log("getvalue",this.selectedpartnaire)

    this.idpar = this.selectedpartnaire.idPartenaire
    console.log("singleid",this.idpar)

    this.partnerName = this.selectedpartnaire.raisonSociale
    console.log("singleid",this.partnerName)


}



sendInfoPartenaire(){
console.log("idpartener",this.idpar)
  this.factureservice.envoyerIdPartnerdeDialogauForm(this.idpar)
  console.log("singleid",this.idpar)


  this.factureservice.envoyerNomdeDialogauForm(this.partnerName)
  console.log("singlename",this.partnerName)


  this.messageService.add({
    severity: "success",
    summary: "Success",
    detail: "Le partenaire"+"this.partnerName"+"est selectionné",
  });
}







}
