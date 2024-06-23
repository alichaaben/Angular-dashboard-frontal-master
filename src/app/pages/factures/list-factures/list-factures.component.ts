import { DatePipe } from "@angular/common";
import { Component, OnInit, Pipe } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MenuItem, PrimeNGConfig } from "primeng/api";
import { DetailFactureAd } from "../../../@core/data/DetailFactureAd";
import { FactureAdcaisse } from "../../../@core/data/FactureAdcaisse";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { ProduitAdcaisse } from "../../../@core/data/ProduitAdcaisse";
import { StatusFacture } from "../../../@core/data/StatusFacture";
import { DetailFactureService } from "../../../@core/mock/detail-facture.service";
import { FactureService } from "../../../@core/mock/facture.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { ProduitService } from "../../../@core/mock/produit.service";
import * as FileSaver from "file-saver";
import { Factureavecdetail_view } from "../../../@core/data/Factureavecdetail_view";
import { LazyLoadEvent } from 'primeng/api';
import {  PipeTransform } from '@angular/core';




@Component({
  selector: "ngx-list-factures",
  templateUrl: "./list-factures.component.html",
  styleUrls: ["./list-factures.component.scss"],
})

export class ListFacturesComponent implements OnInit {

  loading : boolean ;

  listfacturedetaiview: Factureavecdetail_view[];

  items: MenuItem[];

  listproduit: ProduitAdcaisse[];
  listfacture: FactureAdcaisse[];
  listdetailfacture: DetailFactureAd[];
  listPartenaires: PartenaireBprice[];
  Partenaire: PartenaireBprice= new PartenaireBprice();
  facture: FactureAdcaisse = new FactureAdcaisse();
  produit: ProduitAdcaisse = new ProduitAdcaisse();
  detailfacture: DetailFactureAd = new DetailFactureAd();
  detailfactureEmpty: DetailFactureAd = new DetailFactureAd();
  detailf: any[] = [];
  emptylist: DetailFactureAd[] = [];

  idpartenaireneeded: String;
  idprodneeded: String;
  totalRecords: number;

  demi: string;
  numberOffacture: string;
  //confirmation dialog

  position: string;
  public show: boolean = false;
  public buttonName: any = "Show";

  displaysaveDialog: boolean = false;

  statType = StatusFacture;
  Key(): Array<string> {
    var Key = Object.keys(this.statType);
    return Key;
  }

  uniquekey: number = 0;
  myform: FormGroup;

  name = new FormControl("");

  showfileicon : boolean =false;




  exportColumns: any[];
  constructor(
    private factureservice: FactureService,
    private produitservice: ProduitService,
    private partenaireservice: PartenairesService,
    private detailservice: DetailFactureService,
    private primengConfig: PrimeNGConfig,
    private rout :ActivatedRoute,
    private route :Router
  ) {}



  ngOnInit(): void {

  
    this.primengConfig.ripple = true;

    this.factureservice.getAllActiveFacture().subscribe((data) => {

      this.listfacture = data;

      console.log(this.listfacture);


  

    }),


        this.primengConfig.ripple = true;
    this.detailservice.getAllFactureDetailAdcaisseView().subscribe((data) => {
      this.listfacturedetaiview = data;
      console.log("it works?",this.listfacturedetaiview);
    }),



    this.partenaireservice
    .getOnePartenaireById(this.facture.idPartenaireBprice)
    .subscribe((data) => {
    //  console.log("data", data);
      this.Partenaire = data["objectResponse"];
      console.log("partnaire by ID",this.Partenaire);
    });



}




  toggle() {
    this.route.navigate(["pages/facture/Ajouterfacture"]);
  }



  exportExcel() {
    import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.listfacture);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ListeFactures");
    });
}

saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
        type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
}

// exportExcel() {
//   if (this.listfacturedetaiview.length > 0) {
//     import("xlsx").then(xlsx => {
//       const worksheet = xlsx.utils.json_to_sheet(this.listfacturedetaiview);
//       const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
//       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
//       this.saveAsExcelFile(excelBuffer, "Listes des facture");
//     });
//   }
// }
// saveAsExcelFile(buffer: any, fileName: string): void {
//   let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
//   let EXCEL_EXTENSION = '.xlsx';
//   const data: Blob = new Blob([buffer], {
//     type: EXCEL_TYPE
//   });
//   FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
// }




loadFacture() {
  this.loading = true;

  setTimeout(() => 1000)
  this.loading = false;


}

}
