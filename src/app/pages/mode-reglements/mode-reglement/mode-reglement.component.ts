import { flatten } from "@angular/compiler";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Console } from "console";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ModeReglement } from "../../../@core/data/ModeReglement";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { ModereglementService } from "../../../@core/mock/modereglement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  selector: "ngx-mode-reglement",
  templateUrl: "./mode-reglement.component.html",
  styleUrls: ["./mode-reglement.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class ModeReglementComponent implements OnInit {
  submitted: boolean;
  modeReglement: ModeReglement = new ModeReglement();
  idPartenaireSelected: string;
  idPointVenteSelected: string;
  partenaires: PartenaireBprice[];
  pointsVente: PointVente[];
  display: boolean;
  ModeReglementForm: FormGroup = new FormGroup({
    pointVente: new FormControl("", Validators.required),
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
    private route: Router,
    private modeReglementService: ModereglementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private pointVenteService: PointventeService,
    private partenaireService: PartenairesService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.partenaireService.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
    });
    // this.pointVenteService.getAllPV().subscribe((res) => {
    //   this.pointsVente = res;
    // });
  }
  onSelectPointVente(event) {
    this.idPointVenteSelected = event.value;
  }
  onSelectPartenaire(event) {
    this.idPartenaireSelected = event.value;
    this.pointVenteService
      .AllPointVentesByIdPartenaireBprice(this.idPartenaireSelected)
      .subscribe((res) => {
        this.pointsVente = res;
      });
  }

  ajouterModeReglement() {
    this.submitted = true;
    if (this.ModeReglementForm.invalid) {
      return;
    } else {
      this.mapModeReglementFormToObject();
      this.confirmationService.confirm({
        message: "Etes vous sûr d'ajouter ce mode réglement ?",
        header: "confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.modeReglementService
            .addModeReglemenet(this.idPointVenteSelected, this.modeReglement)
            .subscribe((res) => {
              this.messageService.add({
                severity: "success",
                summary: "Mode de réglement ajouté",
                life: 2000,
              });

              setTimeout(() => {
                this.ref.close();
              }, 2000);
            });
        },
        reject: (type) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({
                severity: "warn",
                summary: "Annulation",
                detail: "Ajout annulé ",
              });
              break;
          }
        },
      });
    }
  }
  mapModeReglementFormToObject() {
    this.modeReglement.idPointVente = this.ModeReglementForm.value.pointVente;
    this.modeReglement.designation = this.ModeReglementForm.value.designationMR;
    this.modeReglement.code = this.ModeReglementForm.value.codeMR;
    this.modeReglement.couleur = this.ModeReglementForm.value.couleur;
    this.modeReglement.fnum = this.ModeReglementForm.value.FNum;
    this.modeReglement.fdate = this.ModeReglementForm.value.FDate;
    this.modeReglement.fvalidation = this.ModeReglementForm.value.FValidation;
    this.modeReglement.isactif = this.ModeReglementForm.value.isactif;
    this.modeReglement.fdefault = this.ModeReglementForm.value.fdefault;
    this.modeReglement.ffidelite = this.ModeReglementForm.value.FFidelite;
  }
  annuler() {
    this.ref.close();
  }
}
