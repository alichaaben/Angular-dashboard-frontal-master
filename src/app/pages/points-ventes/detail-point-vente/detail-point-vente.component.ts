import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ConfirmationService, MessageService, SortEvent } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  selector: "ngx-detail-point-vente",
  templateUrl: "./detail-point-vente.component.html",
  styleUrls: ["./detail-point-vente.component.scss"],
  providers: [MessageService, ConfirmationService],
})
export class DetailPointVenteComponent implements OnInit {
  first: number = 0;
  idPartenaire: string;
  listPointventes: PointVente[];
  monPartenaire: PartenaireBprice;
  constructor(
    private activatedRoute: ActivatedRoute,
    private servicePointVente: PointventeService,
    private servicePartenaire: PartenairesService,
    private route: Router,
    private messageService: MessageService,
    private confirmService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.snapshot.params.idPartenaire;
    this.idPartenaire = this.activatedRoute.snapshot.params.idPartenaire;
    console.log(this.idPartenaire);
    this.servicePartenaire
      .getOnePartenaireById(this.idPartenaire)
      .subscribe((result) => {
        this.monPartenaire = result["objectResponse"];
        console.log(this.monPartenaire);
      });
    console.log("Id Partner from route", this.idPartenaire);
    this.servicePointVente
      .AllPointVentesByIdPartenaireBprice(
        this.activatedRoute.snapshot.params.idPartenaire
      )
      .subscribe((result) => {
        console.log("res", result);
        this.listPointventes = result;
      });
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === "string" && typeof value2 === "string")
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
  deletePointVente(idPointVente: string) {
    this.confirmService.confirm({
      message: "Etes vous sûr de supprimer cette point de vente ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.servicePointVente.deleteById(idPointVente).subscribe((data) => {
          console.log(data);
        });
        this.messageService.add({
          severity: "success",
          summary: "supprimé",
          detail: "Point de vente supprimé ",
          life: 1000,
        });
        setTimeout(() => {
          this.route.navigate(["/pages/points-vente/points-vente"]);
        }, 1500);
      },
    });
  }

  blockPointVente(idPointVente: string) {
    this.confirmService.confirm({
      message: "Etes vous sûrde bloquer cette point de vente ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.servicePointVente
          .blockPointVente(idPointVente)
          .subscribe((data) => {
            console.log(data);
          });
        this.messageService.add({
          severity: "success",
          summary: "Bloqué",
          detail: "Point de vente bloqué ",
          life: 2000,
        });
        setTimeout(() => {
          this.route
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => {
              this.route.navigate([
                `/pages/points-vente/points-vente/${this.idPartenaire}`,
              ]);
            });
        }, 1000);
      },
    });
  }
  ajouterPointVenteView() {
    this.route.navigate(["/pages/points-vente/ajouter-point-vente"]);
  }
  deblockPointVente(idPointVente: string) {
    this.confirmService.confirm({
      message: "Etes vous sûr de debloquer cette point de vente ?",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.servicePointVente
          .deblockPointVente(idPointVente)
          .subscribe((data) => {
            console.log(data);
          });
        this.messageService.add({
          severity: "success",
          summary: "Déloqué",
          detail: "Point de vente Débloqué ",
          life: 1000,
        });
        setTimeout(() => {
          this.route
            .navigateByUrl("/", { skipLocationChange: true })
            .then(() => {
              this.route.navigate([
                `/pages/points-vente/points-vente/${this.idPartenaire}`,
              ]);
            });
        }, 1000);
      },
    });
  }
}
