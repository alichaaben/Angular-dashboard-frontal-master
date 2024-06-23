import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { ModeReglement } from "../../../@core/data/ModeReglement";
import { ModereglementService } from "../../../@core/mock/modereglement.service";

@Component({
  selector: "ngx-update-mode-reglement",
  templateUrl: "./update-mode-reglement.component.html",
  styleUrls: ["./update-mode-reglement.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class UpdateModeReglementComponent implements OnInit {
  modeReglement: ModeReglement;
  submitted: boolean;
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
    public activatedRoute: ActivatedRoute,
    private serviceModeRgelement: ModereglementService,
    private route: Router,
    private confirmationSevice: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.serviceModeRgelement
      .getOneModeReglementById(
        this.activatedRoute.snapshot.params.idModeReglement
      )
      .subscribe((res) => {
        this.modeReglement = res;
        console.log(this.modeReglement);
        this.ModeReglementForm = new FormGroup({
          designationMR: new FormControl(
            this.modeReglement.designation,
            Validators.required
          ),
          couleur: new FormControl(
            this.modeReglement.couleur,
            Validators.required
          ),
          codeMR: new FormControl(this.modeReglement.code, Validators.required),
          FNum: new FormControl(this.modeReglement.fnum, Validators.required),
          FFidelite: new FormControl(
            this.modeReglement.ffidelite,
            Validators.required
          ),
          FDate: new FormControl(this.modeReglement.fdate, Validators.required),
          FValidation: new FormControl(
            this.modeReglement.fvalidation,
            Validators.required
          ),
          isactif: new FormControl(
            this.modeReglement.isactif,
            Validators.required
          ),
          fdefault: new FormControl(
            this.modeReglement.fdefault,
            Validators.required
          ),
        });
      });
  }
  annuler() {
    this.route.navigate(["/pages/mode-reglement/list-mode-reglement"]);
  }
  mapFormToModeReglementObject() {
    this.modeReglement.designation = this.ModeReglementForm.value.designationMR;
    this.modeReglement.code = this.ModeReglementForm.value.codeMR;
    this.modeReglement.couleur = this.ModeReglementForm.value.couleur;
    this.modeReglement.ffidelite = this.ModeReglementForm.value.FFidelite;
    this.modeReglement.fvalidation = this.ModeReglementForm.value.FValidation;
    this.modeReglement.isactif = this.ModeReglementForm.value.isactif;
    this.modeReglement.fdefault = this.ModeReglementForm.value.fdefault;
    this.modeReglement.fnum = this.ModeReglementForm.value.FNum;
    this.modeReglement.fdate = this.ModeReglementForm.value.FDate;
  }
  enregistrer() {
    this.submitted = true;
    if (this.ModeReglementForm.invalid) {
      console.log("error");
      return;
    } else {
      this.mapFormToModeReglementObject();
      // this.serviceModeRgelement
      //   .updateModeReglemen(
      //     this.activatedRoute.snapshot.params.idModeReglement,
      //     this.modeReglement
      //   )
      //   .subscribe((res) => {
      //     console.log(res);
      //   });
      this.confirmationSevice.confirm({
        message: "Etes vous sûr d'enregistrer ces modifications ?",
        header: "confirmation",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.serviceModeRgelement
            .updateModeReglemen(
              this.activatedRoute.snapshot.params.idModeReglement,
              this.modeReglement
            )
            .subscribe((res) => {
              console.log(res);
            });
          this.messageService.add({
            severity: "success",
            summary: "Modification enregistré",
            life: 2000,
          });

          setTimeout(() => {
            this.route.navigate(["/pages/mode-reglement/list-mode-reglement"]);
          }, 2000);
        },
        reject: (type) => {
          switch (type) {
            case ConfirmEventType.REJECT:
              this.messageService.add({
                severity: "warn",
                summary: "Annulation",
                detail: "Modification annulé ",
              });
              break;
          }
        },
      });
    }
  }
}
