import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProduitAdcaisse } from '../../../../@core/data/ProduitAdcaisse';
import { TypeAbonnement } from '../../../../@core/data/TypeAbonnement';
import { ProduitService } from '../../../../@core/mock/produit.service';

@Component({
  selector: 'ngx-updateproduit',
  templateUrl: './updateproduit.component.html',
  styleUrls: ['./updateproduit.component.scss'],
  providers: [ConfirmationService, MessageService]
})
export class UpdateproduitComponent implements OnInit {
  submitted: any = false;
  id: string;
  updateform: FormGroup;
  selectedProduit: ProduitAdcaisse;
  produit: ProduitAdcaisse = new ProduitAdcaisse();
  AbnType = TypeAbonnement;
  Key(): Array<string> {
    var Key = Object.keys(this.AbnType);
    return Key;
  }
  constructor( private activatedRoute: ActivatedRoute,
    private route: Router,
     private serviceproduit : ProduitService,
     private formbuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private messageService: MessageService) {

        (this.updateform = formbuilder.group({
      nomProduit: new FormControl("", Validators.required),
      descriptionProduit: new FormControl("", Validators.required),
      typeAbonnement: new FormControl("", Validators.required),
      prixProduit :   new FormControl("", Validators.required),
      codeProduitRef :   new FormControl("", Validators.required)


    }));}

  ngOnInit(): void {



    this.id = this.activatedRoute.snapshot.params.idProduit;
    console.log(
      "IdProduit en route",
      this.activatedRoute.snapshot.params.idProduit
    );
    this.serviceproduit
      .getOneProduitById(this.activatedRoute.snapshot.params.idProduit)
      .subscribe((data) => {
        console.log("data", data);
        this.selectedProduit = data["objectResponse"];
        console.log("produitAD a modifier", this.selectedProduit);
        this.updateform = this.formbuilder.group({
          nomProduit: new FormControl(this.selectedProduit.nomProduit, Validators.required),
          descriptionProduit: new FormControl(this.selectedProduit.descriptionProduit, Validators.required),
          typeAbonnement: new FormControl(this.selectedProduit.typeAbonnement, Validators.required),
          prixProduit : new FormControl(this.selectedProduit.prixProduit, Validators.required),
          codeProduitRef : new FormControl(this.selectedProduit.codeProduitRef, Validators.required)

        });

  });


}


submit() {
  this.submitted = true;

  this.cd.detectChanges();
  this.mapFormValuesToproduit();
    this.serviceproduit
      .updateproduit(
        this.activatedRoute.snapshot.params.idProduit,
        this.produit
      )
      .subscribe((res) => {
        console.log(res);
      });
    this.messageService.add({
      severity: "success",
      summary: "successful",
      detail: "Produit ADcaisse modifié ",
      life: 2000,
    });
    setTimeout(() => {
      this.route.navigate(["pages/facture/Produits"]);
    }, 2000);
  }


  mapFormValuesToproduit() {
    this.produit.nomProduit = this.updateform.value.nomProduit;
    this.produit.descriptionProduit = this.updateform.value.descriptionProduit;
    this.produit.typeAbonnement = this.updateform.value.typeAbonnement;
    this.produit.prixProduit = this.updateform.value.prixProduit;
    this.produit.codeProduitRef=this.updateform.value.codeProduitRef;



}

}
