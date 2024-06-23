import { Component, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PointventeService } from "../../../@core/mock/pointvente.service";

@Component({
  template: `
    <nb-card>
      <nb-card-header>
        <h5>Localisation des points de vente</h5>
        <h6>{{ partenaire.raisonSociale }}</h6></nb-card-header
      >

      <nb-card-body>
        <div
          id="googlemap"
          style="width: auto; height: 550px; position: relative; overflow: hidden;"
        ></div></nb-card-body
    ></nb-card>
  `,
})
export class LocalisationPointVentes {
  map: any;
  @ViewChild("map") mapElement: any;
  latitude: number;
  langitude: number;
  idPartenaire: string;
  markers: any[] = [];
  partenaire: PartenaireBprice = new PartenaireBprice();
  constructor(
    private activatedRoute: ActivatedRoute,
    private servicePointVente: PointventeService,
    private servicePartenaire: PartenairesService
  ) {}

  ngOnInit() {
    this.map = new google.maps.Map(document.getElementById("googlemap"), {
      center: new google.maps.LatLng(36.5, 9.53682647705076),
      zoom: 8.3,
      mapTypeId: "terrain",
    });
    this.idPartenaire = this.activatedRoute.snapshot.params.idPartenaire;
    console.log(this.idPartenaire);
    this.servicePartenaire
      .getOnePartenaireById(this.idPartenaire)
      .subscribe((res) => {
        this.partenaire = res["objectResponse"];
        console.log("mon partenaire", this.partenaire);
      });
    this.servicePointVente
      .AllPointVentesByIdPartenaireBprice(this.idPartenaire)
      .subscribe((data) => {
        console.log("List des points de ventes", data);
        data.forEach((element) => {
          this.markers.push({
            position: {
              lat: element.coordX,
              lng: element.coordY,
            },
            label: {
              text: element.designation,
            },
          });
        });
        console.log(this.markers);
        this.markers.forEach((element) => {
          var marker = new google.maps.Marker({
            position: {
              lat: element.position.lat,
              lng: element.position.lng,
            },
            map: this.map,
            draggable: false,
            label: {
              text: element.label.text,
            },
          });
        });
      });
  }
}
