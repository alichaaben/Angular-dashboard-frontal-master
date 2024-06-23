import { Component, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { ModeReglement } from "../../../@core/data/ModeReglement";
import { PointVente } from "../../../@core/data/PointVente";
import { ModereglementService } from "../../../@core/mock/modereglement.service";
import { SharedService } from "../../../@core/mock/shared.service";

@Component({
  providers: [MessageService],
  template: ` <style>
      fieldset {
        background-color: #faf9f9;
        width: 470px;
        margin-bottom: 2cm;
      }

      .form-inline {
        display: flex;
        flex-flow: row wrap;
        align-items: center;
      }
      .test {
        display: inline-block;
        width: 500px;
        margin: 30px;
        height: 50px;
      }
      // .test input {
      //   height: 30px;
      //   width: 300px;
      // }
      #alert alert-danger {
        margin-top: 50px;
      }
      input[type="radio"] {
        font-size: 20px;
      }
      legend {
        font-size: 18px;
        font-weight: bold;
      }
    </style>
    <p-toast></p-toast>
    <div class="">
      <br />

      <form [formGroup]="pointDeVente" (ngSubmit)="onsubmit()">
        <div class="test">
          <div class="form-group">
            <label>Désignation<span style="color: red">*</span></label>
            <input
              nbInput
              fullWidth
              class="form-control"
              type="text"
              name="designation"
              formControlName="designation"
              [ngClass]="{
                'is-invalid':
                  submitted && pointDeVente.get('designation').errors
              }"
            />
            <div
              id="ngIf"
              *ngIf="submitted && pointDeVente.get('designation').errors"
              class="invalid-feedback"
            >
              <div *ngIf="pointDeVente.get('designation').errors.required">
                Désignation est obligatoire !
              </div>
            </div>
          </div>
        </div>

        <div class="test">
          <div class="form-group">
            <label>Adresse<span style="color: red">*</span></label>
            <input
              nbInput
              fullWidth
              class="form-control"
              type="text"
              name="adresse"
              formControlName="adresse"
              [ngClass]="{
                'is-invalid': submitted && pointDeVente.get('adresse').errors
              }"
            />
            <div
              *ngIf="submitted && pointDeVente.get('adresse').errors"
              class="invalid-feedback"
            >
              <div *ngIf="pointDeVente.get('adresse').errors['required']">
                Adresse est obligatoire !
              </div>
            </div>
          </div>
        </div>

        <div class="test">
          <div class="form-group">
            <label>Reservation<span style="color: red">*</span></label>
            <input
              nbInput
              fullWidth
              class="form-control"
              type="text"
              name="fReservation"
              formControlName="fReservation"
              [ngClass]="{
                'is-invalid':
                  submitted && pointDeVente.get('fReservation').errors
              }"
            />
            <div
              *ngIf="submitted && pointDeVente.get('fReservation').errors"
              class="invalid-feedback"
            >
              <div *ngIf="pointDeVente.get('fReservation').errors['required']">
                reservation est obligatoire !
              </div>
            </div>
          </div>
        </div>

        <div class="test">
          <div class="form-group">
            <label>Entête ticket<span style="color: red"></span></label>
            <input
              nbInput
              fullWidth
              class="form-control"
              type="text"
              name="enteteTicket"
              formControlName="enteteTicket"
              [ngClass]="{
                'is-invalid':
                  submitted && pointDeVente.get('enteteTicket').errors
              }"
            />
            <div
              *ngIf="submitted && pointDeVente.get('enteteTicket').errors"
              class="invalid-feedback"
            >
              <div *ngIf="pointDeVente.get('enteteTicket').errors['required']">
                Entête ticket est obligatoire !
              </div>
            </div>
          </div>
        </div>

        <div class="test">
          <div class="form-group">
            <label>Pied ticket<span style="color: red"></span></label>
            <input
              nbInput
              fullWidth
              class="form-control"
              type="text"
              name="piedTicket"
              formControlName="piedTicket"
              [ngClass]="{
                'is-invalid': submitted && pointDeVente.get('piedTicket').errors
              }"
            />
            <div
              *ngIf="submitted && pointDeVente.get('piedTicket').errors"
              class="invalid-feedback"
            >
              <div *ngIf="pointDeVente.get('piedTicket').errors['required']">
                Pied de Ticket est obligatoire !
              </div>
            </div>
          </div>
        </div>

        <div class="test">
          <div class="form-group">
            <label>Difference autorisé<span style="color: red"></span></label>
            <input
              nbInput
              fullWidth
              class="form-control"
              type="text"
              name="differenceautorise"
              formControlName="differenceautorise"
              [ngClass]="{
                'is-invalid':
                  submitted && pointDeVente.get('differenceautorise').errors
              }"
            />
            <div
              *ngIf="submitted && pointDeVente.get('differenceautorise').errors"
              class="invalid-feedback"
            >
              <div
                *ngIf="pointDeVente.get('differenceautorise').errors.required"
              >
                Difference autorise est obligatoire !
              </div>
            </div>
          </div>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Type de point vente <span style="color: red">*</span>
            </legend>

            <div>
              <input
                type="radio"
                name="typePv"
                formControlName="typePv"
                value="Stock central"
                checked="Stock central"
              /><label>Stock central</label>
            </div>
            <div>
              <input
                type="radio"
                name="typePv"
                formControlName="typePv"
                value="Point de vente"
              /><label>Point de vente</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Chiffres aprés virgule<span style="color: red">*</span>
            </legend>
            <div>
              <input
                type="radio"
                name="Chiffrevirgule"
                formControlName="Chiffrevirgule"
                [value]="1"
              />
              <label>1</label>
            </div>

            <div>
              <input
                type="radio"
                name="Chiffrevirgule"
                formControlName="Chiffrevirgule"
                [value]="2"
              />
              <label>2</label>
            </div>
            <div>
              <input
                type="radio"
                name="Chiffrevirgule"
                formControlName="Chiffrevirgule"
                [value]="3"
              />
              <label>3</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Imprimante cuisine<span style="color: red">*</span></legend>

            <div>
              <input
                type="radio"
                name="fImprimCuisine"
                formControlName="fImprimCuisine"
                [value]="1"
              /><label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fImprimCuisine"
                formControlName="fImprimCuisine"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Reimpression ticket<span style="color: red">*</span>
            </legend>
            <div>
              <input
                type="radio"
                name="fReImprim"
                formControlName="fReImprim"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fReImprim"
                formControlName="fReImprim"
                [value]="0"
              /><label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Partage addition<span style="color: red">*</span></legend>

            <div>
              <input
                type="radio"
                name="fPartageAdition"
                formControlName="fPartageAdition"
                [value]="1"
              /><label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fPartageAdition"
                formControlName="fPartageAdition"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Detail montant<span style="color: red">*</span></legend>

            <div>
              <input
                type="radio"
                name="fDetailMontant"
                formControlName="fDetailMontant"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fDetailMontant"
                formControlName="fDetailMontant"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Affecter employé au service<span style="color: red">*</span>
            </legend>

            <div>
              <input
                type="radio"
                name="fAffectEmployetoservice"
                formControlName="fAffectEmployetoservice"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fAffectEmployetoservice"
                formControlName="fAffectEmployetoservice"
                [value]="0"
              /><label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Recharge abonnement<span style="color: red">*</span>
            </legend>

            <div>
              <input
                type="radio"
                name="fAutoriserRecharge"
                formControlName="fAutoriserRecharge"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fAutoriserRecharge"
                formControlName="fAutoriserRecharge"
                [value]="0"
              /><label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Suspendre vente on ligne <span style="color: red">*</span>
            </legend>
            <div>
              <input
                type="radio"
                name="farretVenteOnline"
                formControlName="farretVenteOnline"
                [value]="1"
              /><label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="farretVenteOnline"
                formControlName="farretVenteOnline"
                [value]="0"
              /><label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Ecran cuisine<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fEcranCuisine"
                formControlName="fEcranCuisine"
                [value]="1"
              /><label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fEcranCuisine"
                formControlName="fEcranCuisine"
                [value]="0"
              /><label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Application mobile<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fMobile"
                formControlName="fMobile"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fMobile"
                formControlName="fMobile"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Impression catégorie<span style="color: red">*</span>
            </legend>
            <div>
              <input
                type="radio"
                name="fImpresCateg"
                formControlName="fImpresCateg"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fImpresCateg"
                formControlName="fImpresCateg"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Affichage chiffre d'affaires caisse<span style="color: red"
                >*</span
              >
            </legend>
            <div>
              <input
                type="radio"
                name="fDispCA"
                formControlName="fDispCA"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fDispCA"
                formControlName="fDispCA"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Gestion des tables<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fGestionTable"
                formControlName="fGestionTable"
                [value]="0"
              />
              <label>Sans table</label>
            </div>

            <div>
              <input
                type="radio"
                name="fGestionTable"
                formControlName="fGestionTable"
                [value]="1"
              />
              <label>Avec table</label>
            </div>
            <div>
              <input
                type="radio"
                name="fGestionTable"
                formControlName="fGestionTable"
                [value]="2"
              />
              <label>Bippeur</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Photo catégorie<span style="color: red">*</span></legend>

            <div>
              <input
                type="radio"
                name="fPhotoCateg"
                formControlName="fPhotoCateg"
                [value]="1"
              />
              <label>oui</label>
            </div>

            <div>
              <input
                type="radio"
                name="fPhotoCateg"
                formControlName="fPhotoCateg"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Clavier virtuel<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fClavierVirtuel"
                formControlName="fClavierVirtuel"
                [value]="0"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fClavierVirtuel"
                formControlName="fClavierVirtuel"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Entête Ticket<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fEntetePied"
                formControlName="fEntetePied"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fEntetePied"
                formControlName="fEntetePied"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Imprimer avant paiement<span style="color: red">*</span>
            </legend>
            <div>
              <input
                type="radio"
                name="fImprimeAvP"
                formControlName="fImprimeAvP"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fImprimeAvP"
                formControlName="fImprimeAvP"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Contrôle caisse<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fControlCaisse"
                formControlName="fControlCaisse"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fControlCaisse"
                formControlName="fControlCaisse"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Prix TTC<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fprixttc"
                formControlName="fprixttc"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fprixttc"
                formControlName="fprixttc"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>Detecter pack<span style="color: red">*</span></legend>
            <div>
              <input
                type="radio"
                name="fdetectPack"
                formControlName="fdetectPack"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="fdetectPack"
                formControlName="fdetectPack"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div class="test">
          <fieldset>
            <legend>
              Affecter collaborateur<span style="color: red">*</span>
            </legend>
            <div>
              <input
                type="radio"
                name="faffectcollab"
                formControlName="faffectcollab"
                [value]="1"
              />
              <label>oui</label>
            </div>
            <div>
              <input
                type="radio"
                name="faffectcollab"
                formControlName="faffectcollab"
                [value]="0"
              />
              <label>non</label>
            </div>
          </fieldset>
        </div>

        <div style="margin-top: 50px">
          <br />
          <div
            id="googlemap"
            style="
            width: auto;
            height: 550px;
            position: relative;
            overflow: hidden;
          "
          ></div>
        </div>
        <div>
          <button
            nbButton
            style="float: left; border-color: white; margin-top: 15px"
            type="submit"
            status="danger"
            class="btn btn-danger mx-2"
            (click)="annuler()"
          >
            Annuler
          </button>
          <button
            nbButton
            style="
            float: right;
            border-color: white;
            margin-top: 15px;
            background: #79008e;
          "
            class="btn btn-primary mx-2"
          >
            Enregistrer
          </button>
        </div>

        <br />
      </form>
    </div>`,
})
export class PointVenteDemo implements OnInit {
  modeReglement: ModeReglement;
  display: boolean;
  map: any;
  submitted: boolean;
  XY: any;
  @ViewChild("map") mapElement: any;
  latitude: number;
  langitude: number;
  pointsDeVentes: PointVente[] = [];
  pointvente = new PointVente();
  displayMaximizable: boolean;
  showMap: boolean;
  listModeReglement: any[] = [];
  checked: boolean = true;
  localLatiLng = [];
  pointDeVente: FormGroup = new FormGroup({
    designation: new FormControl("", [Validators.required]),
    differenceautorise: new FormControl(""),
    adresse: new FormControl("", [Validators.required]),
    piedTicket: new FormControl(""),
    Chiffrevirgule: new FormControl(1, [Validators.required]),
    fReservation: new FormControl("", [Validators.required]),
    typePv: new FormControl("Stock central", [Validators.required]),
    fImprimCuisine: new FormControl(0, [Validators.required]),
    fReImprim: new FormControl(0, [Validators.required]),
    fPartageAdition: new FormControl(0, [Validators.required]),
    fEntetePied: new FormControl(0, [Validators.required]),
    fDetailMontant: new FormControl(0, [Validators.required]),
    fAffectEmployetoservice: new FormControl(0, [Validators.required]),
    fAutoriserRecharge: new FormControl(0, [Validators.required]),
    farretVenteOnline: new FormControl(0, [Validators.required]),
    fEcranCuisine: new FormControl(0, [Validators.required]),
    fMobile: new FormControl(0, [Validators.required]),
    fImpresCateg: new FormControl(0, [Validators.required]),
    fDispCA: new FormControl(0, [Validators.required]),
    fPhotoCateg: new FormControl(0, [Validators.required]),
    fGestionTable: new FormControl(0, [Validators.required]),
    fClavierVirtuel: new FormControl(0, [Validators.required]),
    enteteTicket: new FormControl(""),
    fImprimeAvP: new FormControl(0, [Validators.required]),
    fControlCaisse: new FormControl(0, [Validators.required]),
    fprixttc: new FormControl(0, [Validators.required]),
    fdetectPack: new FormControl(0, [Validators.required]),
    faffectcollab: new FormControl(0, [Validators.required]),
  });
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private sharedService: SharedService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    // window.location.hash = "#myDiv";

    this.map = new google.maps.Map(
      document.getElementById("googlemap") as HTMLElement,
      {
        center: new google.maps.LatLng(37.084347366079, 9.53682647705076),
        zoom: 9,
        mapTypeId: "terrain",
      }
    );

    var marker = new google.maps.Marker({
      position: {
        lat: 37.2856587222636,
        lng: 9.61373077392576,
      },
      map: this.map,
      draggable: true,
      label: {
        text: "Pointer le marker sur localisation",
        color: "black",
        fontSize: "20px",
      },
      animation: google.maps.Animation.BOUNCE,
    });
    google.maps.event.addListener(marker, "dragend", function () {
      this.lat = this.getPosition().lat();
      this.lng = this.getPosition().lng();
      let localLatiLng = [];
      localLatiLng.push(this.lat, this.lng);
      this.localLatiLng = localLatiLng;
      console.log("localisation a envoyer", this.localLatiLng);
      localStorage.setItem("l", JSON.stringify(this.localLatiLng));

      this.XY = JSON.parse(localStorage.getItem("l"));
    });
    this.pointvente = new PointVente();

    this.pointsDeVentes.push(this.pointvente);
  }

  addForm() {
    this.pointvente = new PointVente();
    this.pointsDeVentes.push(this.pointvente);
  }

  removeForm(index) {
    this.pointsDeVentes.splice(index);
  }

  onsubmit() {
    this.submitted = true;
    this.mapFormToPointDeVente();
    this.getLocalisationFormLs();
    if (this.pointDeVente.invalid) {
      this.messageService.add({
        severity: "warn",
        summary: "champs manquants ",
        detail: "remplir les champs obligatoires ",
        life: 2000,
      });
    } else if (
      this.pointvente.coordX == null ||
      this.pointvente.coordY == null
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Pas de localisation ",
        detail: "draguer le marquer sur la localisation sur le map ",
        life: 2000,
      });
    } else {
      this.sharedService.sharePointVente.next(this.pointsDeVentes);
      setTimeout(() => {
        this.ref.close();
      }, 1000);
      localStorage.removeItem("l");
    }
  }
  showMaximizableDialog() {
    this.displayMaximizable = true;
    this.showMap = true;
  }

  getLocalisationFormLs() {
    this.XY = JSON.parse(localStorage.getItem("l"));
    if (this.XY == undefined) {
      return;
    } else {
      console.log(this.XY);
      this.pointvente.coordX = this.XY[0];
      this.pointvente.coordY = this.XY[1];
    }
  }
  ModeReglementForm: FormGroup = new FormGroup({
    designationMR: new FormControl("", Validators.required),
    couleur: new FormControl("", Validators.required),
    codeMR: new FormControl("", Validators.required),
    FNum: new FormControl(0, Validators.required),
    FFidelite: new FormControl(0, Validators.required),
    FDate: new FormControl(0, Validators.required),
    FValidation: new FormControl(0, Validators.required),
    isactif: new FormControl(0, Validators.required),
    fdefault: new FormControl(0, Validators.required),
  });
  showDialog() {
    this.display = true;
  }
  ajouterModeReglement() {
    this.modeReglement = new ModeReglement();
    this.mapModeReglementFormToObject();
    this.pointvente.modeReglements = this.listModeReglement;
    this.listModeReglement.push(this.modeReglement);
    this.display = false;
    console.log(this.listModeReglement);
  }
  mapModeReglementFormToObject() {
    this.modeReglement.designation = this.ModeReglementForm.value.designationMR;
    this.modeReglement.code = this.ModeReglementForm.value.codeMR;
    this.modeReglement.couleur = this.ModeReglementForm.value.couleur;
    this.modeReglement.fnum = this.ModeReglementForm.value.FNum;
    this.modeReglement.fdate = this.ModeReglementForm.value.FDate;
    this.modeReglement.fvalidation = this.ModeReglementForm.value.FValidation;
    this.modeReglement.isactif = this.ModeReglementForm.value.isactif;
    this.modeReglement.fdefault = this.ModeReglementForm.value.fdefault;
  }
  supprimerOneModeReglemenet(modeReglement: ModeReglement) {
    const index: number = this.listModeReglement.indexOf(modeReglement);
    if (index !== -1) {
      this.listModeReglement.splice(index, 1);
    }
  }
  anuulerAjoutModeReglement() {
    this.display = false;
  }
  annuler() {
    localStorage.removeItem("l");
    this.ref.close();
  }
  mapFormToPointDeVente() {
    this.pointvente.designation = this.pointDeVente.value.designation;
    this.pointvente.adresse = this.pointDeVente.value.adresse;
    this.pointvente.enteteTicket = this.pointDeVente.value.enteteTicket;
    this.pointvente.piedTicket = this.pointDeVente.value.piedTicket;
    this.pointvente.Chiffrevirgule = this.pointDeVente.value.chiffrevirgule;
    this.pointvente.fReservation = this.pointDeVente.value.fReservation;
    this.pointvente.typePv = this.pointDeVente.value.typePv;
    this.pointvente.fGestionTable = this.pointDeVente.value.fGestionTable;
    this.pointvente.fClavierVirtuel = this.pointDeVente.value.fClavierVirtuel;
    this.pointvente.fImprimCuisine = this.pointDeVente.value.fImprimCuisine;
    this.pointvente.fReImprim = this.pointDeVente.value.fReImprim;
    this.pointvente.fPartageAdition = this.pointDeVente.value.fPartageAdition;
    this.pointvente.fEntetePied = this.pointDeVente.value.fEntetePied;
    this.pointvente.fDetailMontant = this.pointDeVente.value.fDetailMontant;
    this.pointvente.fAffectEmployetoservice =
      this.pointDeVente.value.fAffectEmployetoservice;
    this.pointvente.fAutoriserRecharge =
      this.pointDeVente.value.fAutoriserRecharge;
    this.pointvente.farretVenteOnline =
      this.pointDeVente.value.farretVenteOnline;
    this.pointvente.fEcranCuisine = this.pointDeVente.value.fEcranCuisine;
    this.pointvente.fMobile = this.pointDeVente.value.fMobile;
    this.pointvente.fImpresCateg = this.pointDeVente.value.fImpresCateg;
    this.pointvente.fAutoriserRecharge =
      this.pointDeVente.value.fAutoriserRecharge;
    this.pointvente.fDispCA = this.pointDeVente.value.fDispCA;
    this.pointvente.fPhotoCateg = this.pointDeVente.value.fPhotoCateg;
    this.pointvente.faffectcollab = this.pointDeVente.value.faffectcollab;
    this.pointvente.fprixttc = this.pointDeVente.value.fprixttc;
    this.pointvente.fControlCaisse = this.pointDeVente.value.fControlCaisse;
    this.pointvente.fdetectPack = this.pointDeVente.value.fdetectPack;
    this.pointvente.fImprimeAvP = this.pointDeVente.value.fImprimeAvP;
    this.pointvente.differenceautorise =
      this.pointDeVente.value.differenceautorise;
    this.pointvente.fControlCaisse = this.pointDeVente.value.fControlCaisse;
  }
}

// console.log(this.pointvente);
// const inputFeilds = document.querySelectorAll("input");

// const validInputs = Array.from(inputFeilds).filter(
//   (input) => input.value !== ""
// );
// console.log(validInputs);
// this.messageService.add({
//   severity: "error",
//   summary: "champs obligatoires manquantes",
//   detail: "Remplir tous les champs",
//   life: 2000,
// });
// <p-dialog
// header="Title"
// [(visible)]="display"
// [closable]="false"
// [style]="{ width: '70vw' }"
// [modal]="true"
// >
// <form [formGroup]="ModeReglementForm" style="margin-bottom: 30px">
//   <div class="row">
//     <div class="col-sm-6">
//       <label class="label"
//         >Désignation <span style="color: red">*</span></label
//       >
//       <input
//         type="text"
//         nbInput
//         fullWidth
//         placeholder="Désignation"
//         class="form-control"
//         formControlName="designationMR"
//       />
//     </div>
//     <div class="col-sm-6">
//       <label class="label">Code <span style="color: red">*</span></label>
//       <input
//         type="text"
//         nbInput
//         fullWidth
//         placeholder="code"
//         class="form-control"
//         formControlName="codeMR"
//       />
//     </div>
//     <div class="col-sm-6">
//       <label class="label"
//         >Couleur <span style="color: red">*</span></label
//       >
//       <input
//         type="color"
//         nbInput
//         fullWidth
//         placeholder="couleur"
//         class="form-control"
//         formControlName="couleur"
//       />
//     </div>
//     <br />
//     <br />
//     <div>
//       <div class="test">
//         <fieldset>
//           <legend>FNum<span style="color: red">*</span></legend>

//           <div>
//             <input
//               type="radio"
//               name="FNum"
//               formControlName="FNum"
//               [value]="1"
//             /><label>oui</label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               name="FNum"
//               formControlName="FNum"
//               [value]="0"
//             />
//             <label>non</label>
//           </div>
//         </fieldset>
//       </div>
//       <div class="test">
//         <fieldset>
//           <legend>FFidelite<span style="color: red">*</span></legend>

//           <div>
//             <input
//               type="radio"
//               name="FFidelite"
//               formControlName="FFidelite"
//               [value]="1"
//             /><label>oui</label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               name="FFidelite"
//               formControlName="FFidelite"
//               [value]="0"
//             />
//             <label>non</label>
//           </div>
//         </fieldset>
//       </div>
//       <div class="test">
//         <fieldset>
//           <legend>FDate<span style="color: red">*</span></legend>

//           <div>
//             <input
//               type="radio"
//               name="FDate"
//               formControlName="FDate"
//               [value]="1"
//             /><label>oui</label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               name="FDate"
//               formControlName="FDate"
//               [value]="0"
//             />
//             <label>non</label>
//           </div>
//         </fieldset>
//       </div>
//       <div class="test">
//         <fieldset>
//           <legend>Activé<span style="color: red">*</span></legend>

//           <div>
//             <input
//               type="radio"
//               name="isactif"
//               formControlName="isactif"
//               [value]="1"
//             /><label>oui</label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               name="isactif"
//               formControlName="isactif"
//               [value]="0"
//             />
//             <label>non</label>
//           </div>
//         </fieldset>
//       </div>
//       <div class="test">
//         <fieldset>
//           <legend>Fdefault<span style="color: red">*</span></legend>

//           <div>
//             <input
//               type="radio"
//               name="fdefault"
//               formControlName="fdefault"
//               [value]="1"
//             /><label>oui</label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               name="fdefault"
//               formControlName="fdefault"
//               [value]="0"
//             />
//             <label>non</label>
//           </div>
//         </fieldset>
//       </div>
//       <div class="test">
//         <fieldset>
//           <legend>Validation<span style="color: red">*</span></legend>

//           <div>
//             <input
//               type="radio"
//               name="FValidation"
//               formControlName="FValidation"
//               [value]="1"
//             /><label>oui</label>
//           </div>

//           <div>
//             <input
//               type="radio"
//               name="FValidation"
//               formControlName="FValidation"
//               [value]="0"
//             />
//             <label>non</label>
//           </div>
//         </fieldset>
//       </div>
//     </div>
//   </div>
// </form>
// <button
//   nbButton
//   style="float: left; border-color: white; margin-top: 15px"
//   type="submit"
//   status="danger"
//   class="btn btn-danger mx-2"
//   (click)="anuulerAjoutModeReglement()"
// >
//   annuler
// </button>
// <button
//   nbButton
//   style="
// float: right;
// border-color: white;
// margin-top: 15px;
// background: #79008e;
// "
//   class="btn btn-primary mx-2"
//   (click)="ajouterModeReglement()"
// >
//   ajouter
// </button>
// </p-dialog>

// <div class="col-sm-6">
// <fieldset>
//   <legend>Mode de règlement</legend>
//   <button
//     pButton
//     label="ajouter"
//     id="ajouter Mode Reglement"
//     class="btn btn-success"
//     (click)="showDialog()"
//     style="float: right"
//   ></button>
// </fieldset>
// </div>
// <table class="table" style="width: 50%;">
// <thead>
//   <tr>
//     <th scope="col">Désination</th>
//     <th scope="col">code</th>
//     <th scope="col">couleur</th>
//     <th scope="col">Actions</th>
//   </tr>
// </thead>
// <tbody>
//   <tr *ngFor="let m of listModeReglement">
//     <td>{{ m.designation }}</td>
//     <td>{{ m.code }}</td>
//     <td>{{ m.couleur }}</td>
//     <td>
//       <button
//         class="btn btn-danger"
//         (click)="supprimerOneModeReglemenet(m)"
//       >
//         supprimer
//       </button>
//     </td>
//   </tr>
// </tbody>
// </table>
