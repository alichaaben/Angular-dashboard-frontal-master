import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import { Router } from "@angular/router";
import "rxjs/add/observable/timer";
import {
  ConfirmationService,
  ConfirmEventType,
  MenuItem,
  MessageService,
  PrimeNGConfig,
} from "primeng/api";
import { observable, Observable } from "rxjs";
import { DetailFactureAd } from "../../../@core/data/DetailFactureAd";
import { FactureAdcaisse } from "../../../@core/data/FactureAdcaisse";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { ProduitAdcaisse } from "../../../@core/data/ProduitAdcaisse";
import { StatusFacture } from "../../../@core/data/StatusFacture";
import { DetailFactureService } from "../../../@core/mock/detail-facture.service";
import { FactureService } from "../../../@core/mock/facture.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { ProduitService } from "../../../@core/mock/produit.service";

import { PartenairedialogComponent } from "./partenairedialog/partenairedialog.component";
import { NbDialogService } from "@nebular/theme";

@Component({
  selector: "ngx-ajouterfacture",
  templateUrl: "./ajouterfacture.component.html",
  styleUrls: ["./ajouterfacture.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class AjouterfactureComponent implements OnInit {
  listproduit: ProduitAdcaisse[];
  listfacture: FactureAdcaisse[];
  listdetailfacture: DetailFactureAd[];
  listPartenaires: PartenaireBprice[];
  Partenaire: PartenaireBprice;
  facture: FactureAdcaisse = new FactureAdcaisse();
  produit: ProduitAdcaisse = new ProduitAdcaisse();
  detailfacture: DetailFactureAd = new DetailFactureAd();
  detailfactureEmpty: DetailFactureAd = new DetailFactureAd();
  detailf: any[] = [];
  emptylist: DetailFactureAd[] = [];
  idf: String;
  idpartenaireneeded: String;
  idprodneeded: String;

  display: boolean = false;
  demi: string;
  numberOffacture: string;
  //confirmation dialog

  position: string;
  public show: boolean = false;
  public buttonName: any = "Show";

  displaysaveDialog: boolean = false;


  // statType: Array<string> = Object.keys(StatusFacture).filter(key => isNaN(+key));

//pipeline of enum to a new strin (paiment type)

    States :StatusFacture[] ;

    
    statType = StatusFacture;
    Key(): Array<string> {
      var Key = Object.keys(this.statType);
      return Key;
    }

  selectedCountry: string;
  uniquekey: number = 0;
  dialogform: FormGroup;
  factform: FormGroup;
  datefin: any;
  datedebut: any;
  myDate = new Date(Date.now());

  // totalprice : number =0 ;
  newprice: number = 0;
  i: any;



  idpartnerstring: string;
  namepartnerstring: string;

  constructor(
    private factureservice: FactureService,
    private produitservice: ProduitService,
    private partenaireservice: PartenairesService,
    private detailservice: DetailFactureService,
    private primengConfig: PrimeNGConfig,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private route: Router,
    private formbuilder: FormBuilder,
    private nbdialogService: NbDialogService
  ) {
    (this.dialogform = formbuilder.group({
      remise:  new FormControl("", Validators.required),
      Prix: new FormControl("", Validators.required),
      Quantite: new FormControl("", Validators.required),
      tva: new FormControl("", Validators.required),
      produit: new FormControl("", Validators.required),
    })),
      (this.factform = formbuilder.group({
        idPartenaireBprice: new FormControl("", Validators.required),
        statusFacture: new FormControl("", Validators.required),
        endDate: new FormControl("", Validators.required),
        startDate: new FormControl("", Validators.required),
        termsandNotes: new FormControl("",Validators.required)
      }));
  }
  items: MenuItem[];
  ngOnInit(): void {
    //subjectbehaviorofpartner
    this.factureservice.notificationSubjectId.subscribe((d) => {
      this.idpartnerstring = d;
      console.log("idpartner", this.idpartnerstring);
    });
    this.factureservice.notificationSubjectname.subscribe((d) => {
      this.namepartnerstring = d;
      console.log("namepartner", this.namepartnerstring);
    });

    this.primengConfig.ripple = true;
    this.factureservice.getAllFacturebasic().subscribe((data) => {
      this.listfacture = data;
      console.log(this.listfacture);
      var numberOffacture = this.listfacture.length + 1;
      this.demi = "2022-F-";
      this.facture.numFacture = this.demi.concat(numberOffacture.toString());
      this.facture.softdelete = true;
      this.detailfacture.prix = this.produit.prixProduit;

      console.log("data is reaching to database", this.idpartnerstring);
    });

    this.partenaireservice.getTheAllpartners().subscribe((data) => {
      this.listPartenaires = data;

      console.log(this.listPartenaires);
    });

    this.produitservice.getAllActiveproducts().subscribe((data) => {
      this.listproduit = data;
      console.log(this.listproduit);
      this.listproduit.forEach(function (e) {
        if (typeof e === "object") {
          e["new column"] = "isSelected";
        }
      });

      console.log("new", this.listproduit);
    });
  }
  confirm1() {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir continuer avec ce partenaire?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmé",
          detail: "partenaire confirmé!!",
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Annulé",
              detail: "partenaire annulé!!",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Annulé",
              detail: "rien n a été sélectionné ",
            });
            break;
        }
      },
      key: "positionDialog",
    });
  }
  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }


  //Ajout de facture
  AjouterF() {
    this.confirmationService.confirm({
      message: "Êtes-vous sûr de vouloir continuer?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.facture.statusFacture = this.factform.value.statusFacture;
        this.facture.endDate = this.factform.value.endDate;
        this.facture.startDate = this.factform.value.startDate;
        this.facture.typeReglement = this.factform.value.TypeReglement;
        this.facture.idPartenaireBprice = this.idpartnerstring;
        this.facture.name = this.namepartnerstring;
        this.facture.termsandNotes= this.factform.value.termsandNotes ;
        this.facture.typeReglement= this.factform.value.TypeReglement ;


        this.factureservice.ajouterFacture(this.facture).subscribe((result) => {
          const reponse = result["objectResponse"];
          
          this.idf = reponse.idFacture;
          console.log("id of the new Invoice",this.idf);

          this.detailservice
            .AjouterFactureavecdet(this.detailf, this.idf)
            .subscribe((result) => {
              console.log(this.detailf);
            });
        });
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Une nouvelle facture est ajouter avec succès",
        });
        Observable.timer(4000).subscribe((i) => {
          this.route.navigate(["pages/facture/listfactures"]);
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled",
            });
            break;
        }
      },
    });
  }

  // Method 2: select partner

  onChangePartenaire(value) {
    this.facture.idPartenaireBprice = value;
    console.log("id seqrched", this.facture.idPartenaireBprice);
    this.partenaireservice
      .getOnePartner(this.facture.idPartenaireBprice.toString())
      .subscribe((data) => {
        this.Partenaire = data["objectResponse"];
        // console.log("mon partenaire", this.Partenaire);
        this.facture.name = this.Partenaire.raisonSociale;
      });
  }

  showsavedialog() {
    this.displaysaveDialog = true;
    this.dialogform.reset();


  }

  //ajout de detail facture
  ajouterDetail2(DetailFactureAd: DetailFactureAd) {
    this.detailfacture.codeProduit = this.dialogform.value.produit;
    this.detailfacture.remise = this.dialogform.value.remise;
    this.detailfacture.quantite = this.dialogform.value.Quantite;
    this.detailfacture.prix = this.dialogform.value.Prix;
    this.detailfacture.tva = this.dialogform.value.tva;
    this.detailfacture.totalprix = parseFloat(
      (
        this.dialogform.value.Prix *
        this.dialogform.value.Quantite *
        ((100 - this.dialogform.value.remise) / 100) *
        (1 + this.dialogform.value.tva / 100)
      ).toFixed(2)
    );
    let det = { ...DetailFactureAd };
    this.detailf.push(det);
    this.calc();
    this.calcTVA();
    console.log("list", this.detailf);
    this.displaysaveDialog = false;
    console.log(this.dialogform);
    this.dialogform.reset(),
      this.messageService.add({
        severity: "success",
        summary: "Success",
        detail: "le produit est ajouté avec succès !",
      });
  }

  Modifierprod(detailfacture: DetailFactureAd) {
    this.detailfacture = { ...detailfacture };
    this.displaysaveDialog = true;
  }


  // input controle personalisé
  alphaNumberOnly(e) {
    // Accept only numerics, not special characters
    var regex = new RegExp("[0-9]");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    if (regex.test(str)) {
      return true;
    }
    e.preventDefault();
    return false;
  }
  onPaste(e) {
    e.preventDefault();
    return false;
  }

  supprimerproduit(i: number) {
    this.confirmationService.confirm({
      message: "Vous souhaitez vraiment supprimer ce produit  ?",
      header: "Confirm",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.detailf.splice(i, 1);
        this.calc();
        this.messageService.add({
          severity: "info ",
          summary: "Info",
          detail: "le produit est supprimé avec succès !",
          life: 3000,
        });
      },
    });
  }

  confirmajoutfacture() {
    this.confirmationService.confirm({
      message: "Are you sure that you want to proceed?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity: "info",
          summary: "Confirmed",
          detail: "You have accepted",
        });
      },
      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Cancelled",
              detail: "You have cancelled",
            });
            break;
        }
      },
    });
  }

  //calcule de prix totale avec la remise
  calc() {
    this.facture.totalprice = 0;
    for (this.i = 0; this.i < this.detailf.length; this.i++) {
      this.facture.totalprice =
        this.facture.totalprice +
        this.detailf[this.i].prix *
          this.detailf[this.i].quantite *
          ((100 - this.detailf[this.i].remise) / 100);
    }
    console.log("totalprice", this.facture.totalprice);
  }
  //calcule de prix totale avec la remise et le tva

  calcTVA() {
    this.facture.totalpricetva = 0;
    for (this.i = 0; this.i < this.detailf.length; this.i++) {
      this.facture.totalpricetva = parseFloat(
        (
          (this.facture.totalpricetva +
            this.detailf[this.i].prix *
              this.detailf[this.i].quantite *
              ((100 - this.detailf[this.i].remise) / 100)) *
          (1 + this.detailf[this.i].tva / 100)
        ).toFixed(2)
      );
    }
    console.log("totalpriceTVA", this.facture.totalpricetva);
  }

  
  updatePrice(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.detailfacture.prix = 0;
    } else {
      this.detailfacture.prix =
        this.listproduit[ctrl.selectedIndex - 1].prixProduit;
    }
  }


  showpartnerDialog() {
    this.display = true;
  }

  openDialogpar() {
    let dialogRef = this.nbdialogService.open(PartenairedialogComponent, {});
  }
}
