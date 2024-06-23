import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Abonnement } from "../../../@core/data/Abonnement";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { AbonnementService } from "../../../@core/mock/abonnement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { ProduitService } from "../../../@core/mock/produit.service";

@Component({
  selector: "ngx-ajout-abonnement",
  templateUrl: "./ajout-abonnement.component.html",
  styleUrls: ["./ajout-abonnement.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class AjoutAbonnementComponent implements OnInit {
  produitsAbonnements: any[];
  dateFin: Date = new Date();
  submitted: boolean;
  display: boolean;
  abn: Abonnement = new Abonnement();
  partenaires: PartenaireBprice[];
  partenaireSelectionnee: PartenaireBprice = new PartenaireBprice();
  checkedTypeAbonnement = 1;
  origMenaces = [];
  checked: boolean;
  dispP: boolean = false;
  abonnementProduits: any[];
  abonnement: FormGroup = new FormGroup({
    partenaire: new FormControl("", [Validators.required]),
    dateDebut: new FormControl("", Validators.required),
    dateFin: new FormControl(""),
    status: new FormControl(1, Validators.required),
    typeAbonnement: new FormControl(1, Validators.required),
    produit: new FormControl("", [Validators.required]),
  });
  constructor(
    private servicePartenaire: PartenairesService,
    private serviceAbonnement: AbonnementService,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
    });
    this.serviceAbonnement
      .getProduitAdcaisseContainsAbonnements()
      .subscribe((result) => {
        this.abonnementProduits = result;
        console.log(this.abonnementProduits);
      });
  }
  options = [
    { value: 1, label: "Trimestriel", checked: true },
    { value: 2, label: "Semestrriel" },
    { value: 3, label: "Annuel" },
  ];
  options2 = [
    { value: 1, label: "Payé", checked: true },
    { value: 0, label: "Non payé" },
  ];
  submit() {
    this.submitted = true;
    if (this.abonnement.invalid) {
      return;
    } else {
      this.abn.idPartenaire = this.abonnement.value.partenaire;
      this.abn.dateDebut = this.abonnement.value.dateDebut;
      this.abn.dateFin = this.dateFin;
      this.abn.typeAbonnement = this.abonnement.value.typeAbonnement;
      this.abn.status = this.abonnement.value.status;
      this.abn.idProduitAdcaisse = this.abonnement.value.produit;

      this.confirmationService.confirm({
        message:
          "vous êtes sur d'ajouter un nouveau  abonnement  pour ce partenaire  <br> <h6>" +
          this.partenaireSelectionnee?.raisonSociale +
          "</h6>",
        header: "confirmer",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.serviceAbonnement
            .createAbonnement(this.abn, this.abn.idPartenaire)
            .subscribe((res) => {
              console.log(res);
            });
          this.messageService.add({
            severity: "success",
            summary: "succés",
            detail: "Abonnement ajouté ",
            life: 2000,
          });
          setTimeout(() => {
            this.route.navigate(["/pages/abonnements/list-abonnements"]);
          }, 2000);
        },
      });
    }
  }

  onSelectPartenaire(event) {
    this.display = true;
    this.abn.idPartenaire = event.value;
    console.log("l'id du partenaire selectionné", this.abn.idPartenaire);
    this.servicePartenaire
      .getOnePartner(this.abn.idPartenaire.toString())
      .subscribe((data) => {
        this.partenaireSelectionnee = data["objectResponse"];
        console.log("partenaire sélectionné", this.partenaireSelectionnee);
      });
  }
  onSelectDate(value) {
    if (
      this.abonnement.value.typeAbonnement == null ||
      this.abonnement.value.partenaire == null ||
      this.abonnement.value.status == null
    ) {
      this.messageService.add({
        severity: "warn",
        summary: "warning",
        detail: "veuillez remplir champs manquants",
        life: 2000,
      });
    } else {
      this.abn.dateDebut = this.abonnement.value.dateDebut;
      this.checked = true;

      if (this.abonnement.value.typeAbonnement == 1) {
        this.dateFin = new Date(this.abonnement.value.dateDebut);
        this.dateFin.setDate(this.dateFin.getDate() + 90);
      }
      if (this.abonnement.value.typeAbonnement == 2) {
        this.dateFin = new Date(this.abonnement.value.dateDebut);
        this.dateFin.setDate(this.dateFin.getDate() + 182);
        // console.log(new Date(x * 1000));
      }
      if (this.abonnement.value.typeAbonnement == 3) {
        this.dateFin = new Date(this.abonnement.value.dateDebut);
        this.dateFin.setDate(
          new Date(this.abonnement.value.dateDebut).getDate() + 365
        );
      }
    }
  }

  // onSelectTypeAbonnement(value) {
  //   this.abonnement.value.dateDebut = this.dateFin;
  //   this.abn.dateDebut = this.abonnement.value.dateDebut;
  //   console.log("test");
  //   if (this.abonnement.value.typeAbonnement == 1) {
  //     this.dateFin = new Date(this.abonnement.value.dateDebut);
  //     this.dateFin.setDate(
  //       new Date(this.abonnement.value.dateDebut).getDate() + 90
  //     );
  //   }
  //   if (this.abonnement.value.typeAbonnement == 2) {
  //     this.dateFin = new Date(this.abonnement.value.dateDebut);
  //     this.dateFin.setDate(
  //       new Date(this.abonnement.value.dateDebut).getDate() + 180
  //     );
  //   }
  //   if (this.abonnement.value.typeAbonnement == 1) {
  //     this.dateFin = new Date(this.abonnement.value.dateDebut);
  //     this.dateFin.setDate(
  //       new Date(this.abonnement.value.dateDebut).getDate() + 365
  //     );
  //   }
  //   console.log(value);
  // }
  onSelectTypeAbonnement() {
    this.abonnement.patchValue({
      dateDebut: "",
      dateFin: "",
    });
  }
  annuler() {
    this.route.navigate(["/pages/abonnements/list-abonnements"]);
  }
  refresh() {
    this.checked = false;
    this.abonnement.patchValue({
      dateDebut: "",
      dateFin: "",
    });
  }
  annulerPartenaire() {
    this.display = false;
    this.abonnement.patchValue({
      partenaire: "",
      produit: "",
    });
  }
  validerPartenaire() {
    this.display = false;
  }
  onSelectProduitAbonement(event) {
    this.abn.idProduitAdcaisse = event.value;
    console.log(this.abn.idProduitAdcaisse);
  }
}
