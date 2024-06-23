import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService, FilterMatchMode, MenuItem,  MessageService,  PrimeNGConfig, SelectItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ProduitAdcaisse } from '../../../@core/data/ProduitAdcaisse';
import { TypeAbonnement } from '../../../@core/data/TypeAbonnement';
import { ProduitService } from '../../../@core/mock/produit.service';

@Component({
  selector: 'ngx-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.scss'],providers :[ConfirmationService,MessageService]
})
export class ProduitsComponent implements OnInit {


  product: ProduitAdcaisse = new ProduitAdcaisse();
  listproduits : ProduitAdcaisse[] ;


  displaysaveDialog : boolean =false;

  statuses: SelectItem[];
  totalRecords: number;

  prodtoupdate : any ;


  AbnType = TypeAbonnement;
  Key(): Array<string> {
    var Key = Object.keys(this.AbnType);
    return Key;
  }
  items: MenuItem[];

  productform: FormGroup;



  constructor(private productservice : ProduitService, private router: Router, private config: PrimeNGConfig,
    private messageService: MessageService,
    private formbuilder: FormBuilder,
    private confirmationService: ConfirmationService,
    )
     {this.productform = formbuilder.group({
      descriptionProduit: new FormControl("", Validators.required),
      prixProduit: new FormControl("", Validators.required),
      typeAbonnement: new FormControl("", Validators.required),
      codeProduitRef: new FormControl("", Validators.required),
      nomProduit:  new FormControl("", Validators.required)
    }) }

  ngOnInit(): void {
    this.productservice.getAllActiveproducts().subscribe((data) => {
      this.listproduits = data;
      console.log(this.listproduits);

    });

    this.items = [

      {
        label: "Modifier",
        icon: "pi pi-fw pi-pencil",
        command: () => this.showsavedialog(true)
      },
      {
        label: "Supprimer",
        icon: "pi pi-fw pi-times",
        // command: () => this.delete()
      }
    ];




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
      date: [],
    };






}

ajouterProduit(){
  this.product.nomProduit = this.productform.value.nomProduit;
  this.product.descriptionProduit = this.productform.value.descriptionProduit;
  this.product.prixProduit = this.productform.value.prixProduit;


  this.product.typeAbonnement = this.productform.value.typeAbonnement;

  this.product.codeProduitRef = this.productform.value.codeProduitRef;







  this.productservice.save(this.product).subscribe(res=>{
    console.log("did it work",res);
    console.log(this.product);
  }),

  this.productservice.getAllActiveproducts().subscribe((data) => {
    this.listproduits = data;
    console.log(this.listproduits);

  }),
  this.messageService.add({ severity: 'success', summary: "Heyyy ! ", detail: "Votre Produit Adcaisse est ajouter correctement " });
  this.displaysaveDialog = false;
}


showsavedialog(editar:boolean){

  this.displaysaveDialog=true ;
  this.productform.reset();


    }

    reload() {
      window.location.reload();
    }




    updateproduit(id: string){
      this.router.navigate(['Modifierproduit', id]);
    }


    ArchiverProduitAcaisse(idProduit: String) {
      this.confirmationService.confirm({
        message: "vous etes sur d'archiver ce produit ?",
        header: "confirmer",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.productservice.ArchiverProduit(idProduit).subscribe((data) =>
            this.productservice.getAllActiveproducts().subscribe((res) => {
              this.listproduits = res;

            })
          );
          this.messageService.add({
            severity: "success",
            summary: "succés",
            detail: "Produit Adcaisse archiver",
            life: 2000,
          });
        },
      });
    }


}

