import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { ModeReglement } from "../../../@core/data/ModeReglement";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { ModereglementService } from "../../../@core/mock/modereglement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  selector: "ngx-ajouter-points-vente",
  templateUrl: "./ajouter-points-vente.component.html",
  styleUrls: ["./ajouter-points-vente.component.scss"],
  providers: [MessageService],
})
export class AjouterPointsVenteComponent implements OnInit {
  monPartenaire: PartenaireBprice;
  response: any;
  idPV: string;
  modeReglement: ModeReglement;
  listModeReglement: any[] = [];
  display: boolean = false;
  map: any;
  submitted: any = false;
  pv: PointVente = new PointVente();
  idPartenaire: string;
  XY: any;
  pointDeVente: FormGroup = new FormGroup({
    designation: new FormControl("", [Validators.required]),
    differenceautorise: new FormControl(""),
    adresse: new FormControl("", [Validators.required]),
    piedTicket: new FormControl(""),
    chiffrevirgule: new FormControl(1, [Validators.required]),
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
  constructor(
    public pointVenteService: PointventeService,
    private prtenaireService: PartenairesService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private modeReglementService: ModereglementService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.idPartenaire = this.activatedRoute.snapshot.params.idPartenaire;
    console.log(this.idPartenaire);
    this.prtenaireService
      .getOnePartenaireById(this.idPartenaire)
      .subscribe((res) => {
        this.monPartenaire = res["objectResponse"];
      });
    this.map = new google.maps.Map(document.getElementById("googlemap"), {
      center: new google.maps.LatLng(37.084347366079, 9.53682647705076),
      zoom: 9,
      mapTypeId: "terrain",
    });
    var marker = new google.maps.Marker({
      position: {
        lat: 37.2856587222636,
        lng: 9.61373077392576,
      },
      map: this.map,
      draggable: true,
      label: {
        text: "Pointer le marker sur la géolocalisation",
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
      console.log("pushed localisation", localLatiLng);
      localStorage.setItem("LPV", JSON.stringify(localLatiLng));
    });
  }
  onsubmit() {
    this.submitted = true;
    if (this.pointDeVente.invalid) {
      return;
    }
    this.getLocalisationPV();
    if (this.pv.coordX == null || this.pv.coordY == null) {
      return;
    }
    if (this.listModeReglement.length == 0) {
      this.messageService.add({
        severity: "error",
        summary: "Mode de reglement",
        detail: "Ajouter au moins un mode de réglement ",
        life: 2000,
      });
    } else {
      this.mapFormValuesToPointDeVente();
      localStorage.clear();
      this.pointVenteService
        .createOnePointvente(this.pv, this.idPartenaire)
        .subscribe((result) => {
          console.log(result);
          this.response = result["objectResponse"];
          this.idPV = this.response["idPointVente"];
          console.log(this.idPV);
          this.listModeReglement.forEach((element) => {
            this.modeReglementService
              .addModeReglemenet(this.idPV, element)
              .subscribe((result) => {
                console.log(result);
              });
          });
        });
      this.messageService.add({
        severity: "success",
        summary: "successful",
        detail: "Point de vente ajouté ",
        life: 2000,
      });
      setTimeout(() => {
        this.route.navigate(["/pages/points-vente/points-vente"]);
      }, 2000);
    }
  }
  get f() {
    return this.pointDeVente.controls;
  }
  getLocalisationPV() {
    this.XY = JSON.parse(localStorage.getItem("LPV"));
    if (this.XY == undefined) {
      this.messageService.add({
        severity: "error",
        summary: "Localisation",
        detail: "Marquer la localisation du point de vente sur le map ",
        life: 2000,
      });
    } else {
      console.log("coordonnés X et y ", this.XY);
      this.pv.coordX = this.XY[0];
      this.pv.coordY = this.XY[1];
    }
  }
  mapFormValuesToPointDeVente() {
    this.pv.adresse = this.pointDeVente.value.adresse;
    this.pv.designation = this.pointDeVente.value.designation;
    this.pv.enteteTicket = this.pointDeVente.value.enteteTicket;
    this.pv.piedTicket = this.pointDeVente.value.piedTicket;
    this.pv.Chiffrevirgule = this.pointDeVente.value.chiffrevirgule;
    this.pv.fReservation = this.pointDeVente.value.fReservation;
    this.pv.typePv = this.pointDeVente.value.typePv;
    this.pv.fGestionTable = this.pointDeVente.value.fGestionTable;
    this.pv.fClavierVirtuel = this.pointDeVente.value.fClavierVirtuel;
    this.pv.fImprimCuisine = this.pointDeVente.value.fImprimCuisine;
    this.pv.fReImprim = this.pointDeVente.value.fReImprim;
    this.pv.fPartageAdition = this.pointDeVente.value.fPartageAdition;
    this.pv.fEntetePied = this.pointDeVente.value.fEntetePied;
    this.pv.fDetailMontant = this.pointDeVente.value.fDetailMontant;
    this.pv.fAffectEmployetoservice =
      this.pointDeVente.value.fAffectEmployetoservice;
    this.pv.fAutoriserRecharge = this.pointDeVente.value.fAutoriserRecharge;
    this.pv.farretVenteOnline = this.pointDeVente.value.farretVenteOnline;
    this.pv.fEcranCuisine = this.pointDeVente.value.fEcranCuisine;
    this.pv.fMobile = this.pointDeVente.value.fMobile;
    this.pv.fImpresCateg = this.pointDeVente.value.fImpresCateg;
    this.pv.fAutoriserRecharge = this.pointDeVente.value.fAutoriserRecharge;
    this.pv.fDispCA = this.pointDeVente.value.fDispCA;
    this.pv.fPhotoCateg = this.pointDeVente.value.fPhotoCateg;
    this.pv.faffectcollab = this.pointDeVente.value.faffectcollab;
    this.pv.fprixttc = this.pointDeVente.value.fprixttc;
    this.pv.fControlCaisse = this.pointDeVente.value.fControlCaisse;
    this.pv.fdetectPack = this.pointDeVente.value.fdetectPack;
    this.pv.fImprimeAvP = this.pointDeVente.value.fImprimeAvP;
    this.pv.differenceautorise = this.pointDeVente.value.differenceautorise;
    this.pv.fControlCaisse = this.pointDeVente.value.fControlCaisse;
    this.pv.modeReglements = this.listModeReglement;
  }
  annuler(id: string) {
    this.route.navigate(["pages/points-vente/" + id]);
  }

  showDialog() {
    this.display = true;
  }
  ajouterModeReglement() {
    this.modeReglement = new ModeReglement();
    this.mapModeReglementFormToObject();
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
}
