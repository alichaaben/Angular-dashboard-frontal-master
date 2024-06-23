import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  selector: "ngx-update-point-vente",
  templateUrl: "./update-point-vente.component.html",
  styleUrls: ["./update-point-vente.component.scss"],
  providers: [MessageService],
})
export class UpdatePointVenteComponent implements OnInit {
  id: string;
  selectedPointVente: PointVente;
  pointVente: PointVente = new PointVente();
  step: any = 1;
  monPartenaire: PartenaireBprice;
  submitted: any = false;
  editPointVente = new FormGroup({
    p1: new FormGroup({
      designation: new FormControl("", [Validators.required]),
      adresse: new FormControl("", [Validators.required]),
      enteteTicket: new FormControl("", [Validators.required]),
      piedTicket: new FormControl("", Validators.required),
      chiffrevirgule: new FormControl("", [Validators.required]),
      fReservation: new FormControl("", Validators.required),
      typePv: new FormControl("", Validators.required),
    }),
    p2: new FormGroup({
      fGestionTable: new FormControl("", [Validators.required]),
      fPhotoCateg: new FormControl("", [Validators.required]),
      fClavierVirtuel: new FormControl("", [Validators.required]),
    }),
    p3: new FormGroup({
      fImprimCuisine: new FormControl("", Validators.required),
      fReImprim: new FormControl("", Validators.required),
      fPartageAdition: new FormControl("", Validators.required),
      fEntetePied: new FormControl("", Validators.required),
      fDetailMontant: new FormControl("", Validators.required),
      fMobile: new FormControl("", Validators.required),
    }),
    p4: new FormGroup({
      fAffectEmployetoservice: new FormControl("", Validators.required),
      fAutoriserRecharge: new FormControl("", Validators.required),
      farretVenteOnline: new FormControl("", Validators.required),
      fEcranCuisine: new FormControl("", Validators.required),
      fImpresCateg: new FormControl("", Validators.required),
      fDispCA: new FormControl("", Validators.required),
    }),
    p5: new FormGroup({
      fImprimeAvP: new FormControl("", [Validators.required]),
      fControlCaisse: new FormControl("", [Validators.required]),
      differenceautorise: new FormControl("", [Validators.required]),
      fprixttc: new FormControl("", [Validators.required]),
      faffectcollab: new FormControl("", [Validators.required]),
      fdetectPack: new FormControl("", [Validators.required]),
    }),
  });
  constructor(
    private activatedRoute: ActivatedRoute,
    private route: Router,
    private servicePointVente: PointventeService,
    private cd: ChangeDetectorRef,
    private messageService: MessageService,
    private servicePartenaire: PartenairesService
  ) {}

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idPointVente;
    console.log(
      "Id POintVente from route",
      this.activatedRoute.snapshot.params.idPointVente
    );

    this.servicePointVente
      .getOnePointVenteById(this.activatedRoute.snapshot.params.idPointVente)
      .subscribe((data) => {
        console.log("data", data);
        this.selectedPointVente = data["objectResponse"];
        console.log("pointVente a modifier", this.selectedPointVente);
        this.servicePartenaire
          .getOnePartenaireById(this.selectedPointVente.idPartenaire)
          .subscribe((res) => {
            this.monPartenaire = res["objectResponse"];
          });
        this.editPointVente = new FormGroup({
          p1: new FormGroup({
            designation: new FormControl(this.selectedPointVente.designation, [
              Validators.required,
            ]),
            adresse: new FormControl(this.selectedPointVente.adresse, [
              Validators.required,
            ]),
            enteteTicket: new FormControl(
              this.selectedPointVente.enteteTicket,
              [Validators.required]
            ),
            piedTicket: new FormControl(
              this.selectedPointVente.piedTicket,
              Validators.required
            ),
            chiffrevirgule: new FormControl(
              this.selectedPointVente.Chiffrevirgule,
              [Validators.required]
            ),
            fReservation: new FormControl(
              this.selectedPointVente.fReservation,
              Validators.required
            ),
            typePv: new FormControl(
              this.selectedPointVente.typePv,
              Validators.required
            ),
          }),
          p2: new FormGroup({
            fGestionTable: new FormControl(
              this.selectedPointVente.fGestionTable,
              [Validators.required]
            ),
            fPhotoCateg: new FormControl(this.selectedPointVente.fPhotoCateg, [
              Validators.required,
            ]),
            fClavierVirtuel: new FormControl(
              this.selectedPointVente.fClavierVirtuel,
              [Validators.required]
            ),
          }),
          p3: new FormGroup({
            fImprimCuisine: new FormControl(
              this.selectedPointVente.fImprimCuisine,
              Validators.required
            ),
            fReImprim: new FormControl(
              this.selectedPointVente.fReImprim,
              Validators.required
            ),
            fPartageAdition: new FormControl(
              this.selectedPointVente.fPartageAdition,
              Validators.required
            ),
            fEntetePied: new FormControl(
              this.selectedPointVente.fEntetePied,
              Validators.required
            ),
            fDetailMontant: new FormControl(
              this.selectedPointVente.fDetailMontant,
              Validators.required
            ),
            fMobile: new FormControl(
              this.selectedPointVente.fMobile,
              Validators.required
            ),
          }),
          p4: new FormGroup({
            fAffectEmployetoservice: new FormControl(
              this.selectedPointVente.fAffectEmployetoservice,
              Validators.required
            ),
            fAutoriserRecharge: new FormControl(
              this.selectedPointVente.fAutoriserRecharge,
              Validators.required
            ),
            farretVenteOnline: new FormControl(
              this.selectedPointVente.farretVenteOnline,
              Validators.required
            ),
            fEcranCuisine: new FormControl(
              this.selectedPointVente.fEcranCuisine,
              Validators.required
            ),

            fImpresCateg: new FormControl(
              this.selectedPointVente.fImpresCateg,
              Validators.required
            ),
            fDispCA: new FormControl(
              this.selectedPointVente.fDispCA,
              Validators.required
            ),
          }),
          p5: new FormGroup({
            fImprimeAvP: new FormControl(
              this.selectedPointVente.fImprimeAvP,
              Validators.required
            ),
            fControlCaisse: new FormControl(
              this.selectedPointVente.fControlCaisse,
              Validators.required
            ),

            differenceautorise: new FormControl(
              this.selectedPointVente.differenceautorise,
              Validators.required
            ),

            fprixttc: new FormControl(
              this.selectedPointVente.fprixttc,
              Validators.required
            ),
            faffectcollab: new FormControl(
              this.selectedPointVente.faffectcollab,
              Validators.required
            ),
            fdetectPack: new FormControl(
              this.selectedPointVente.fdetectPack,
              Validators.required
            ),
          }),
        });
      });
  }
  suivant() {
    if (this.editPointVente.controls.p1.invalid && this.step == 1) {
      return;
    }
    if (this.editPointVente.controls.p2.invalid && this.step == 2) {
      return;
    }
    if (this.editPointVente.controls.p3.invalid && this.step == 3) {
      return;
    }
    if (this.editPointVente.controls.p4.invalid && this.step == 4) {
      return;
    } else {
      this.step = this.step + 1;
    }
  }
  submit() {
    this.submitted = true;

    this.cd.detectChanges();
    if (this.step == 5) {
      this.mapFormValuesToPointDeVente();
      console.log(this.pointVente);
      this.servicePointVente
        .updatePointvente(
          this.activatedRoute.snapshot.params.idPointVente,
          this.pointVente
        )
        .subscribe((res) => {
          console.log(res);
        });
      this.messageService.add({
        severity: "success",
        summary: "successful",
        detail: "Point de vente modifié ",
        life: 2000,
      });
      setTimeout(() => {
        this.route.navigate(["/pages/points-vente/points-vente"]);
      }, 2000);
    }
  }

  get p1() {
    return this.editPointVente.controls["p1"]["controls"];
  }

  get p2() {
    return this.editPointVente.controls["p2"]["controls"];
  }
  get p3() {
    return this.editPointVente.controls["p3"]["controls"];
  }
  get p4() {
    return this.editPointVente.controls["p4"]["controls"];
  }
  get p5() {
    return this.editPointVente.controls["p5"]["controls"];
  }
  previous() {
    this.step = this.step - 1;
  }
  mapFormValuesToPointDeVente() {
    this.pointVente.adresse = this.editPointVente.value.p1.adresse;
    this.pointVente.designation = this.editPointVente.value.p1.designation;
    this.pointVente.enteteTicket = this.editPointVente.value.p1.enteteTicket;
    this.pointVente.piedTicket = this.editPointVente.value.p1.piedTicket;
    this.pointVente.Chiffrevirgule =
      this.editPointVente.value.p1.chiffrevirgule;
    this.pointVente.fReservation = this.editPointVente.value.p1.fReservation;
    this.pointVente.typePv = this.editPointVente.value.p1.typePv;
    this.pointVente.fGestionTable = this.editPointVente.value.p2.fGestionTable;
    this.pointVente.fClavierVirtuel =
      this.editPointVente.value.p2.fClavierVirtuel;
    this.pointVente.fImprimCuisine =
      this.editPointVente.value.p3.fImprimCuisine;
    this.pointVente.fReImprim = this.editPointVente.value.p3.fReImprim;
    this.pointVente.fPartageAdition =
      this.editPointVente.value.p3.fPartageAdition;
    this.pointVente.fEntetePied = this.editPointVente.value.p3.fEntetePied;
    this.pointVente.fDetailMontant =
      this.editPointVente.value.p3.fDetailMontant;
    this.pointVente.fAffectEmployetoservice =
      this.editPointVente.value.p4.fAffectEmployetoservice;
    this.pointVente.fAutoriserRecharge =
      this.editPointVente.value.p4.fAutoriserRecharge;
    this.pointVente.farretVenteOnline =
      this.editPointVente.value.p4.farretVenteOnline;
    this.pointVente.fEcranCuisine = this.editPointVente.value.p4.fEcranCuisine;
    this.pointVente.fMobile = this.editPointVente.value.p3.fMobile;
    this.pointVente.fImpresCateg = this.editPointVente.value.p4.fImpresCateg;
    this.pointVente.fAutoriserRecharge =
      this.editPointVente.value.p4.fAutoriserRecharge;
    this.pointVente.fDispCA = this.editPointVente.value.p4.fDispCA;
    this.pointVente.fPhotoCateg = this.editPointVente.value.p2.fPhotoCateg;
    this.pointVente.faffectcollab = this.editPointVente.value.p5.faffectcollab;
    this.pointVente.fprixttc = this.editPointVente.value.p5.fprixttc;
    this.pointVente.fControlCaisse =
      this.editPointVente.value.p5.fControlCaisse;
    this.pointVente.fdetectPack = this.editPointVente.value.p5.fdetectPack;
    this.pointVente.fImprimeAvP = this.editPointVente.value.p5.fImprimeAvP;
    this.pointVente.differenceautorise;
    this.editPointVente.value.p5.differenceautorise;
    this.pointVente.fControlCaisse =
      this.editPointVente.value.p5.fControlCaisse;
  }
}
