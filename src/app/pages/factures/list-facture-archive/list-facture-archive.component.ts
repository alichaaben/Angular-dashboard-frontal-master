import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { DetailFactureAd } from '../../../@core/data/DetailFactureAd';
import { FactureAdcaisse } from '../../../@core/data/FactureAdcaisse';
import { PartenaireBprice } from '../../../@core/data/PartenaireBprice';
import { ProduitAdcaisse } from '../../../@core/data/ProduitAdcaisse';
import { StatusFacture } from '../../../@core/data/StatusFacture';
import { DetailFactureService } from '../../../@core/mock/detail-facture.service';
import { FactureService } from '../../../@core/mock/facture.service';
import { PartenairesService } from '../../../@core/mock/partenaires.service';
import { ProduitService } from '../../../@core/mock/produit.service';

@Component({
  selector: 'ngx-list-facture-archive',
  templateUrl: './list-facture-archive.component.html',
  styleUrls: ['./list-facture-archive.component.scss']
})
export class ListFactureArchiveComponent implements OnInit {
listpartenaireAbreviation :Object[]=[];
  listproduit: ProduitAdcaisse[];
  listfacture: FactureAdcaisse[];
  listdetailfacture: DetailFactureAd[];
  listPartenaires: PartenaireBprice[];
  Partenaire: PartenaireBprice;
  listfacture2=[]
  facture: FactureAdcaisse = new FactureAdcaisse();
  produit: ProduitAdcaisse = new ProduitAdcaisse();
  detailfacture: DetailFactureAd = new DetailFactureAd();
  detailfactureEmpty: DetailFactureAd = new DetailFactureAd();
  detailf: any[] = [];
  emptylist: DetailFactureAd[] = [];
  selectedPart: PartenaireBprice  = new PartenaireBprice();


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

  constructor(
    private factureservice: FactureService,
    private produitservice: ProduitService,
    private partenaireservice: PartenairesService,
    private detailservice: DetailFactureService,
    private primengConfig: PrimeNGConfig,
    private route: Router,

  ) { }

  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.factureservice.getAllFactureInArchive().subscribe((data) => {
      let x =[]
      this.listfacture = data;
     // console.log(this.listfacture);

      this.listfacture.forEach(element => {

        this.partenaireservice.getOnePartenaireById(element.idPartenaireBprice).subscribe(data=>{
          this.selectedPart = data["objectResponse"]
          console.log("Part:", this.selectedPart);
          // this.listpartenaireAbreviation.push({nom:data["objectResponse"]["abbreviation"]})
        })
        //x.push({id:element.idPartenaireBprice});



      });
      /*x.forEach(element => {
        this.partenaireservice.getOnePartner(element.id).subscribe(data=>{
          this.listpartenaireAbreviation.push({nom:data["objectResponse"]["abbreviation"]})
        })
      });*/
      // console.log (this.listpartenaireAbreviation)
      // console.log (Object.entries(this.listpartenaireAbreviation).length)


     // this.listfacture2=this.listfacture
      //console.log("eeee",this.listfacture2)

      for (let i=0; i<  this.listpartenaireAbreviation.length;i++){

        // console.log(this.listpartenaireAbreviation[i])
        this.listfacture2.push({nomPartenaire:FactureAdcaisse})


      }
      console.log("pppppppppppp",this.listfacture2)





    });




  }

}
