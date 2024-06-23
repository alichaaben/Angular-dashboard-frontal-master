import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PartenairesService } from "../../../@core/mock/partenaires.service";

@Component({
  selector: "ngx-modifier-partenaire",
  templateUrl: "./modifier-partenaire.component.html",
  styleUrls: ["./modifier-partenaire.component.scss"],
  providers: [MessageService],
})
export class ModifierPartenaireComponent implements OnInit {
  id: number;
  selectedPartenaire: PartenaireBprice;
  partenaire: PartenaireBprice = new PartenaireBprice();
  step: any = 1;

  submitted: any = false;
  editPartenaire = new FormGroup({
    p1: new FormGroup({
      raisonSociale: new FormControl("", [Validators.required]),
      abbreviation: new FormControl("", [Validators.required]),
      adresse: new FormControl("", Validators.required),
      nTel: new FormControl("", [Validators.required, Validators.minLength(8)]),
      matriculeFiscale: new FormControl("", Validators.required),
      siteWeb: new FormControl("", Validators.required),
      logo: new FormControl("", Validators.required),
    }),
    p2: new FormGroup({
      nomResponsable: new FormControl("", Validators.required),
      prenomResponsable: new FormControl("", Validators.required),
      telResponsable: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
      ]),
      emailResponsable: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
    }),
    p4: new FormGroup({
      lat: new FormControl(""),
      lng: new FormControl(""),
    }),
    p3: new FormGroup({
      devise: new FormControl("", Validators.required),
      senderKey: new FormControl("", Validators.required),
      couleur1: new FormControl("", Validators.required),
      couleur2: new FormControl("", Validators.required),
      iconApp: new FormControl("", Validators.required),
      linkAppAndroid: new FormControl("", Validators.required),
      linkAppiOs: new FormControl("", Validators.required),
      imagePanormaic: new FormControl("", Validators.required),
    }),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private servicePartenaire: PartenairesService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    console.log(
      "Id Partner from route",
      this.activatedRoute.snapshot.params.id
    );

    this.servicePartenaire
      .getOnePartenaireById(this.activatedRoute.snapshot.params.id)
      .subscribe((data) => {
        this.selectedPartenaire = data["objectResponse"];
        console.log("partenaire a modifier", this.selectedPartenaire);
        this.editPartenaire = new FormGroup({
          p1: new FormGroup({
            raisonSociale: new FormControl(
              this.selectedPartenaire.raisonSociale,
              [Validators.required]
            ),
            abbreviation: new FormControl(
              this.selectedPartenaire.abbreviation,
              [Validators.required]
            ),
            adresse: new FormControl(
              this.selectedPartenaire.adresse,
              Validators.required
            ),
            nTel: new FormControl(this.selectedPartenaire.nTel, [
              Validators.required,
              Validators.minLength(8),
            ]),
            matriculeFiscale: new FormControl(
              this.selectedPartenaire.matriculeFiscale,
              Validators.required
            ),
            siteWeb: new FormControl(
              this.selectedPartenaire.siteWeb,
              Validators.required
            ),
            logo: new FormControl(
              this.selectedPartenaire.logo,
              Validators.required
            ),
          }),
          p2: new FormGroup({
            nomResponsable: new FormControl(
              this.selectedPartenaire.nomResponsable,
              Validators.required
            ),
            prenomResponsable: new FormControl(
              this.selectedPartenaire.prenomResponsable,
              Validators.required
            ),
            telResponsable: new FormControl(
              this.selectedPartenaire.telResponsable,
              [Validators.required, Validators.minLength(8)]
            ),
            emailResponsable: new FormControl(
              this.selectedPartenaire.emailResponsable,
              [Validators.required, Validators.email]
            ),
          }),
          p4: new FormGroup({
            lat: new FormControl(this.selectedPartenaire.lat),
            lng: new FormControl(this.selectedPartenaire.lng),
          }),
          p3: new FormGroup({
            devise: new FormControl(
              this.selectedPartenaire.devise,
              Validators.required
            ),
            senderKey: new FormControl(
              this.selectedPartenaire.senderKey,
              Validators.required
            ),
            couleur1: new FormControl(
              this.selectedPartenaire.couleur1,
              Validators.required
            ),
            couleur2: new FormControl(
              this.selectedPartenaire.couleur2,
              Validators.required
            ),
            iconApp: new FormControl(
              this.selectedPartenaire.iconApp,
              Validators.required
            ),
            linkAppAndroid: new FormControl(
              this.selectedPartenaire.linkAppAndroid,
              Validators.required
            ),
            linkAppiOs: new FormControl(
              this.selectedPartenaire.linkAppiOs,
              Validators.required
            ),
            imagePanormaic: new FormControl(
              this.selectedPartenaire.imagePanormaic,
              Validators.required
            ),
          }),
        });
      });
  }
  get p1() {
    return this.editPartenaire.controls["p1"]["controls"];
  }

  get p2() {
    return this.editPartenaire.controls["p2"]["controls"];
  }
  get p3() {
    return this.editPartenaire.controls["p3"]["controls"];
  }
  get p4() {
    return this.editPartenaire.controls["p4"]["controls"];
  }

  previous() {
    this.step = this.step - 1;
  }

  submit() {
    this.submitted = true;

    this.cd.detectChanges();
    if (this.step == 4) {
      this.mapFormValuesToPartner();
      this.servicePartenaire
        .updatePartenaire(
          this.activatedRoute.snapshot.params.id,
          this.partenaire
        )
        .subscribe((res) => {
          console.log("resUpdate", res);
        });
      this.messageService.add({
        severity: "success",
        summary: "successful",
        detail: "Partenaire modifié ",
        life: 2000,
      });
      setTimeout(() => {
        this.route.navigate(["/pages/partenaires/list-partenaires"]);
      }, 2000);
    }
  }

  suivant() {
    if (this.editPartenaire.controls.p1.invalid && this.step == 1) {
      return;
    }
    if (this.editPartenaire.controls.p2.invalid && this.step == 2) {
      return;
    }
    if (this.editPartenaire.controls.p3.invalid && this.step == 3) {
      return;
    } else {
      this.step = this.step + 1;
    }
  }

  mapFormValuesToPartner() {
    this.partenaire.raisonSociale = this.editPartenaire.value.p1.raisonSociale;
    this.partenaire.matriculeFiscale =
      this.editPartenaire.value.p1.matriculeFiscale;
    this.partenaire.adresse = this.editPartenaire.value.p1.adresse;
    this.partenaire.nTel = this.editPartenaire.value.p1.nTel;
    this.partenaire.abbreviation = this.editPartenaire.value.p1.abbreviation;
    this.partenaire.siteWeb = this.editPartenaire.value.p1.siteWeb;
    this.partenaire.logo = this.editPartenaire.value.p1.logo;
    this.partenaire.nomResponsable =
      this.editPartenaire.value.p2.nomResponsable;
    this.partenaire.prenomResponsable =
      this.editPartenaire.value.p2.prenomResponsable;
    this.partenaire.emailResponsable =
      this.editPartenaire.value.p2.emailResponsable;
    this.partenaire.telResponsable =
      this.editPartenaire.value.p2.telResponsable;
    this.partenaire.devise = this.editPartenaire.value.p3.devise;
    this.partenaire.senderKey = this.editPartenaire.value.p3.senderKey;
    this.partenaire.imagePanormaic =
      this.editPartenaire.value.p3.imagePanormaic;
    this.partenaire.couleur1 = this.editPartenaire.value.p3.couleur1;
    this.partenaire.couleur2 = this.editPartenaire.value.p3.couleur2;
    this.partenaire.iconApp = this.editPartenaire.value.p3.iconApp;
    this.partenaire.linkAppAndroid =
      this.editPartenaire.value.p3.linkAppAndroid;
    this.partenaire.linkAppiOs = this.editPartenaire.value.p3.linkAppiOs;
    // this.partenaire.lat = parseFloat(this.LatLang[0]);
    //this.partenaire.lng = parseFloat(this.LatLang[1]);
  }
}
