import { DatePipe, Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { Abonnement } from "../../../@core/data/Abonnement";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { AbonnementService } from "../../../@core/mock/abonnement.service";
import { PartenairesService } from "../../../@core/mock/partenaires.service";

@Component({
  selector: "ngx-modifier-abonnement",
  templateUrl: "./modifier-abonnement.component.html",
  styleUrls: ["./modifier-abonnement.component.scss"],
  providers: [ConfirmationService, MessageService, DatePipe],
})
export class ModifierAbonnementComponent implements OnInit {
  abnPartenaire: PartenaireBprice;
  idSelectionnée: string;
  dateFiin: Date = new Date();
  dateDebut;
  submitted: boolean;
  abn: Abonnement = new Abonnement();
  partenaireSelectionn: PartenaireBprice;
  partenaires: PartenaireBprice[];
  abonnement: FormGroup = new FormGroup({
    partenaire: new FormControl("", [Validators.required]),
    dateDebut: new FormControl("", Validators.required),
    dateFin: new FormControl(""),
    status: new FormControl(1, Validators.required),
    typeAbonnement: new FormControl(1, Validators.required),
  });
  constructor(
    private servicePartenaire: PartenairesService,
    private serviceAbonnement: AbonnementService,
    private route: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe // public location: Location
  ) {}

  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
    });

    this.idSelectionnée = this.activatedRoute.snapshot.params.idAbonnement;
    this.serviceAbonnement
      .getOneAbonnement(this.idSelectionnée)
      .subscribe((res) => {
        this.abn = res;
        this.abonnement = new FormGroup({
          partenaire: new FormControl(this.abn.idPartenaire, [
            Validators.required,
          ]),
          dateDebut: new FormControl(this.abn.dateDebut, Validators.required),
          dateFin: new FormControl(this.abn.dateFin, Validators.required),
          typeAbonnement: new FormControl(
            this.abn.typeAbonnement,
            Validators.required
          ),
          status: new FormControl(this.abn.status, Validators.required),
        });
      });
  }
  options = [
    { value: 1, label: "Trimestriel", checked: true },
    { value: 2, label: "Semestriel" },
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
    }
    this.abn.idPartenaire = this.abonnement.value.partenaire;
    this.abn.dateDebut = this.abonnement.value.dateDebut;
    this.abn.typeAbonnement = this.abonnement.value.typeAbonnement;
    this.abn.status = this.abonnement.value.status;

    this.confirmationService.confirm({
      message:
        "Etes vous sûr de modifier l'abonnement  pour ce partenaire  " +
        this.partenaireSelectionn?.raisonSociale +
        "</h6>",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.serviceAbonnement
          .updateAbonnement(this.idSelectionnée, this.abn)
          .subscribe((res) => {
            console.log(res["responseObject"]);
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

  onSelectPartenaire(event) {
    this.abn.idPartenaire = event.value;
    console.log("l'id du partenaire selectionné", this.abn.idPartenaire);
    this.servicePartenaire
      .getOnePartner(this.abn.idPartenaire.toString())
      .subscribe((data) => {
        this.partenaireSelectionn = data["objectResponse"];
        console.log("partenaire sélectionné", this.partenaireSelectionn);
      });
  }
  onSelectDate(value) {
    this.abn.dateDebut = this.abonnement.value.dateDebut;
    if (this.abonnement.value.typeAbonnement == 1) {
      this.abn.dateFin = new Date(this.abonnement.value.dateDebut);
      this.abn.dateFin.setDate(this.dateFiin.getDate() + 90);
    }
    if (this.abonnement.value.typeAbonnement == 2) {
      this.abn.dateFin = new Date(this.abonnement.value.dateDebut);
      this.abn.dateFin.setDate(this.dateFiin.getDate() + 180);
      // console.log(new Date(x * 1000));
    }
    if (this.abonnement.value.typeAbonnement == 3) {
      this.abn.dateFin = new Date(this.abonnement.value.dateDebut);
      this.abn.dateFin.setDate(
        new Date(this.abonnement.value.dateDebut).getDate() + 365
      );
    }
  }

  onSelectTypeAbonnement(value) {
    this.abonnement.patchValue({
      dateDebut: "",
      dateFin: "",
    });
    this.abonnement.value.typeAbonnement = value;
    console.log(value);
  }
  annuler() {
    this.route.navigate(["/pages/abonnements/list-abonnements"]);
  }
}
