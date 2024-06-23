import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MenuItem, MessageService, ConfirmationService } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Localisation } from "../../../@core/data/Localisation";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { FileUploadService } from "../../../@core/mock/file-upload.service";
import { ModereglementService } from "../../../@core/mock/modereglement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";
import { SharedService } from "../../../@core/mock/shared.service";
import { sharedLocal } from "../../../@core/mock/sharedLocal.service";
import { LocalisationParetnaire } from "./mapsPartenaire";
import { PointVenteDemo } from "./pointVenteDemo";

@Component({
  selector: "ngx-ajouter-partenaire",
  templateUrl: "./ajouter-partenaire.component.html",
  styleUrls: ["./ajouter-partenaire.component.scss"],
  providers: [
    DialogService,
    MessageService,
    SharedService,
    sharedLocal,
    ConfirmationService,
  ],
})
export class AjouterPartenaireComponent implements OnInit {
  @ViewChild("fileUploadLogo", { static: false }) fileUploadLogo: ElementRef;
  @ViewChild("fileUploadIcon", { static: false }) fileUploadIcon: ElementRef;
  @ViewChild("fileUploadImagePanoramique", { static: false })
  fileUploadImagePanoramique: ElementRef;
  files: File;
  selectedImageLogo = null;
  selectedImageIcon = null;
  selectedImageImagePanoramique = null;
  addedPV: PointVente;
  idPartenaire: string;
  patternNumtel = "[0-9]+";
  map: any;
  logo: string;
  iconApp: string;
  imagePanoramic: string;
  pointvente: PointVente = new PointVente();
  LatLang: any[];
  pointsDeVentesFinales: PointVente[] = [];
  listPartenaire: PartenaireBprice[];
  pointsVentes: PointVente[] = [];
  localSLocalisation: any;
  @ViewChild("map") mapElement: any;
  ref: DynamicDialogRef;
  partenaires: PartenaireBprice[];
  pvFalse: boolean;
  step: any = 1;
  submitted: any = false;
  partenaire: PartenaireBprice = new PartenaireBprice();
  multistep = new FormGroup({
    p1: new FormGroup({
      raisonSociale: new FormControl("", [Validators.required]),
      abbreviation: new FormControl("", [Validators.required]),
      adresse: new FormControl("", Validators.required),
      nTel: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.patternNumtel),
      ]),
      matriculeFiscale: new FormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
      siteWeb: new FormControl("", Validators.required),
      logo: new FormControl("", Validators.required),
    }),
    p2: new FormGroup({
      nomResponsable: new FormControl("", Validators.required),
      prenomResponsable: new FormControl("", Validators.required),
      telResponsable: new FormControl("", [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(this.patternNumtel),
      ]),
      emailResponsable: new FormControl("", [
        Validators.required,
        Validators.email,
      ]),
    }),
    p5: new FormGroup({
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
    p4: new FormGroup({
      pointsVente: new FormControl(),
    }),
  });
  fileName: string;
  get p1() {
    return this.multistep.controls["p1"]["controls"];
  }
  get p2() {
    return this.multistep.controls["p2"]["controls"];
  }
  get p3() {
    return this.multistep.controls["p3"]["controls"];
  }

  constructor(
    private cd: ChangeDetectorRef,
    private dialogService: DialogService,
    private messageService: MessageService,
    private partenaireService: PartenairesService,
    private sharedService: SharedService,
    private shareLocalisation: sharedLocal,
    private pointVenteService: PointventeService,
    private route: Router,
    private modeReglemenetService: ModereglementService,
    private confirmationService: ConfirmationService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    this.partenaireService.getTheAllpartners().subscribe((data) => {
      this.listPartenaire = data;
      console.log(this.listPartenaire);
      this.sharedService.sharePointVente$.subscribe((data: PointVente[]) => {
        this.pointsVentes = data;
        console.log("pointsVente[] from pointVenteDemo", this.pointsVentes);

        this.pointsVentes.forEach((element) => {
          this.pointsDeVentesFinales.push(element);
        });
        console.log("Finalement", this.pointsDeVentesFinales);
      });
    });
    this.shareLocalisation.customChangeDetector$.subscribe(
      (data: Localisation[]) => {
        this.LatLang = data;
        console.log("Data LocalisationShared service", data);
      }
    );
  }

  previous() {
    this.step = this.step - 1;
  }

  suivant() {
    // if (this.multistep.controls.p1.invalid && this.step == 1) {
    //   return;
    // }
    // if (this.multistep.controls.p2.invalid && this.step == 2) {
    //   return;
    // }
    // if (this.multistep.controls.p3.invalid && this.step == 3) {
    //   return;
    // }
    // if (this.step == 4 && this.pointsDeVentesFinales.length == 0) {
    //   this.messageService.add({
    //     severity: "error",
    //     summary: "Pas des points de vente",
    //     detail: "ajouter au minimum 1 point de vente ",
    //     life: 2000,
    //   });
    // } else {
    this.step = this.step + 1;
    // }
  }
  submit() {
    this.submitted = true;
    this.cd.detectChanges();

    if (this.step == 5) {
      this.confirmationService.confirm({
        message: "Etes vous sûr d'ajouter ce nouveau partenaire ?",
        header: "confirmer",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.uploadFileIcon();
          this.uploadFileLogo();
          this.uploadFileImagePanoramique();
          this.mapFormValuesToPartner();
          this.partenaire.logo = localStorage.getItem("logo").slice(1, -1);
          this.partenaire.iconApp = localStorage.getItem("icon").slice(1, -1);
          this.partenaire.imagePanormaic = localStorage
            .getItem("imagePanoramique")
            .slice(1, -1);
          localStorage.removeItem("localisationPartenaire");

          console.log(this.partenaire);
          this.partenaireService.createPartenaire(this.partenaire).subscribe(
            (data) => {
              console.log(data);
              const response = data["objectResponse"];
              this.idPartenaire = response.idPartenaire;
              console.log("id needed", this.idPartenaire);
              this.pointVenteService
                .createPointsVentes(
                  this.pointsDeVentesFinales,
                  this.idPartenaire
                )
                .subscribe((data) => {
                  //console.log(data);
                  console.log("PointsVentes", this.pointsDeVentesFinales);
                });
              // this.pointsDeVentesFinales.forEach((pv) => {
              //   this.pointVenteService
              //     .createOnePointvente(pv, this.idPartenaire)
              //     .subscribe((res) => {
              //       this.addedPV = res["objectResponse"];
              //       console.log(this.addedPV);
              //       this.modeReglemenetService
              //         .addListModereglement(
              //           this.addedPV.modeReglements,
              //           this.addedPV.idPointVente
              //         )
              //         .subscribe((res) => {
              //           console.log(res);
              //         });
              //     });
              // });
            },
            (error) => {
              console.log("Error", error);
            }
          );

          this.messageService.add({
            severity: "success",
            summary: "successful",
            detail: "Partenaire ajouté ",
            life: 2000,
          });
          setTimeout(() => {
            this.route.navigate(["/pages/partenaires/list-partenaires"]);
          }, 2000);
        },
      });
    }
  }

  show() {
    this.ref = this.dialogService.open(LocalisationParetnaire, {
      header: "Localisation",
      width: "70%",
      contentStyle: { "max-height": "800px", overflow: "auto" },
      baseZIndex: 10000,
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
  showPointVentes() {
    this.ref = this.dialogService.open(PointVenteDemo, {
      header: "Ajouter un point de vente",
      width: "80%",
      contentStyle: { "max-height": "800px", overflow: "auto" },
      baseZIndex: 10000,
    });
  }

  mapFormValuesToPartner() {
    this.partenaire.raisonSociale = this.multistep.value.p1.raisonSociale;
    this.partenaire.matriculeFiscale = this.multistep.value.p1.matriculeFiscale;
    this.partenaire.adresse = this.multistep.value.p1.adresse;
    this.partenaire.nTel = this.multistep.value.p1.nTel;
    this.partenaire.abbreviation = this.multistep.value.p1.abbreviation;
    this.partenaire.siteWeb = this.multistep.value.p1.siteWeb;
    this.partenaire.nomResponsable = this.multistep.value.p2.nomResponsable;
    this.partenaire.prenomResponsable =
      this.multistep.value.p2.prenomResponsable;
    this.partenaire.emailResponsable = this.multistep.value.p2.emailResponsable;
    this.partenaire.telResponsable = this.multistep.value.p2.telResponsable;
    this.partenaire.devise = this.multistep.value.p3.devise;
    this.partenaire.senderKey = this.multistep.value.p3.senderKey;
    this.partenaire.couleur1 = this.multistep.value.p3.couleur1;
    this.partenaire.couleur2 = this.multistep.value.p3.couleur2;
    this.partenaire.linkAppAndroid = this.multistep.value.p3.linkAppAndroid;
    this.partenaire.linkAppiOs = this.multistep.value.p3.linkAppiOs;
    this.partenaire.lat = this.LatLang[0];
    this.partenaire.lng = this.LatLang[1];
  }
  removeOnePointVente(pointVente: PointVente) {
    this.confirmationService.confirm({
      message: "Etes vous sûr sur de supprimer ce point de vente",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        const index: number = this.pointsDeVentesFinales.indexOf(pointVente);
        if (index !== -1) {
          this.pointsDeVentesFinales.splice(index, 1);
        }
        this.messageService.add({
          severity: "error",
          summary: "supprimé",
          detail: "Point de vente supprimé ",
          life: 2000,
        });
      },
    });
  }
  step1() {
    this.step = 1;
    console.log(this.step);
  }
  step2() {
    if (this.step == 1 && this.multistep.controls.p1.valid) {
      this.step = 2;
    }
  }
  step3() {
    this.step = 3;
  }

  annuler() {
    this.route.navigate(["/pages/partenaires/list-partenaires"]);
  }

  uploadFileLogo() {
    const formData = new FormData();
    formData.append(
      "file",
      this.selectedImageLogo,
      this.selectedImageLogo.name
    );
    this.fileUploadService.uploadFile(formData).subscribe(
      (rsp: string) => {
        localStorage.setItem("logo", JSON.stringify(rsp));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  uploadFileIcon() {
    const formData = new FormData();
    formData.append(
      "file",
      this.selectedImageIcon,
      this.selectedImageIcon.name
    );
    this.fileUploadService.uploadFile(formData).subscribe(
      (rsp: string) => {
        localStorage.setItem("icon", JSON.stringify(rsp));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  uploadFileImagePanoramique() {
    const formData = new FormData();
    formData.append(
      "file",
      this.selectedImageImagePanoramique,
      this.selectedImageImagePanoramique.name
    );
    this.fileUploadService.uploadFile(formData).subscribe(
      (rsp: string) => {
        localStorage.setItem("imagePanoramique", JSON.stringify(rsp));
      },
      (error) => {
        console.log(error);
      }
    );
  }
  onFileSelectedLogo(event) {
    if (event.target.files[0].size > 500000) {
      this.messageService.add({
        severity: "error",
        summary: "Taille du fichier est volumineux",
        detail: "Veuillez diminuer la resolution  ",
        life: 2000,
      });
    } else this.selectedImageLogo = event.target.files[0];
  }
  onFileSelectedIcon(event) {
    if (event.target.files[0].size > 500000) {
      this.messageService.add({
        severity: "error",
        summary: "Taille du fichier est volumineux",
        detail: "Veuillez diminuer la resolution  ",
        life: 2000,
      });
      return;
    } else this.selectedImageIcon = event.target.files[0];
  }
  onFileSelectedImagePanoramique(event) {
    if (event.target.files[0].size > 500000) {
      this.messageService.add({
        severity: "error",
        summary: "Taille du fichier est volumineux",
        detail: "Veuillez diminuer la resolution  ",
        life: 2000,
      });
      return;
    } else this.selectedImageImagePanoramique = event.target.files[0];
  }
}
