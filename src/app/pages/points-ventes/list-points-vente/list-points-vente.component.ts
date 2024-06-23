import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { SortEvent } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PointVente } from "../../../@core/data/PointVente";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  selector: "ngx-list-points-vente",
  templateUrl: "./list-points-vente.component.html",
  styleUrls: ["./list-points-vente.component.scss"],
})
export class ListPointsVenteComponent implements OnInit {
  display: boolean = false;
  first: number = 0;
  ListPartenaires: PartenaireBprice[];
  ListPointsVente: PointVente[];
  selectedPartenaire: PartenaireBprice;
  lesId: string[] = [];
  NbrPvForEachPartner: any[] = [];
  PartnerWithNbrPv: any[] = [];

  constructor(
    private route: Router,
    private servicePartenaire: PartenairesService,
    private servicePointVente: PointventeService
  ) {}

  ngOnInit(): void {
    this.servicePartenaire.getTheAllpartners().subscribe((result) => {
      console.log(result);
      this.ListPartenaires = result;
      //console.log("List partenaires", this.ListPartenaires);
      this.ListPartenaires.forEach((element) => {
        //console.log(element.idPartenaire);
        this.servicePointVente
          .AllPointVentesByIdPartenaireBprice(element.idPartenaire)
          .subscribe((res) => {
            // console.log(res);
            this.ListPointsVente = res;
            // console.log(this.ListPointsVente);
          });
      });
    });

    // this.servicePartenaire.getTheAllpartners().subscribe((result) => {
    //   this.ListPartenaires = result;
    //   this.PartnerWithNbrPv = this.ListPartenaires;
    //   this.PartnerWithNbrPv.forEach((element) => {
    //     this.lesId.push(element.idPartenaire);
    //   });

    //   for (var i = 0; i < this.lesId.length; i++) {
    //     this.servicePointVente
    //       .AllPointVentesByIdPartenaireBprice(this.lesId[i])
    //       .subscribe((res) => {
    //         this.ListPointsVente = res;
    //       });
    //   }

    //   // for (var j = 0; j < this.ListPartenaires.length; ++j) {
    //   //   this.PartnerWithNbrPv.forEach((element) => {
    //   //     console.log("awa(", [this.NbrPvForEachPartner][j]);
    //   //     element.nbrPV = this.NbrPvForEachPartner[j];
    //   //   });
    //   // }

    //   //console.log("les Ids", this.lesId);
    //   //console.log("NBR pv pour chaque partenaire", this.NbrPvForEachPartner);
    // });
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

  onSelect(partenaire: PartenaireBprice): void {
    this.selectedPartenaire = partenaire;
    this.route.navigate([
      `/pages/points-vente${partenaire.idPartenaire}`,
      partenaire,
    ]);
  }
}
