import { Component, ViewChild } from "@angular/core";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { DynamicDialogConfig } from "primeng/dynamicdialog";
import { sharedLocal } from "../../../@core/mock/sharedLocal.service";

@Component({
  template: `
    <nb-card>
      <nb-card-header> Localisation de partenaire</nb-card-header>
      <nb-card-body>
        <div
          id="googlemap"
          style="width: auto; height: 450px; position: relative; overflow: hidden;"
        ></div>
        <br />
        <button
          nbButton
          style="float: right;
      border-color: white;
      margin-top: 15px;
      background: #79008e;"
          status="success"
          class="btn btn-primary mx-2"
          (click)="submit()"
        >
          Valider
        </button>
      </nb-card-body>
    </nb-card>
  `,
})
export class LocalisationParetnaire {
  map: any;
  LocalisationTosend: any[] = [];
  @ViewChild("map") mapElement: any;
  latitude: number;
  langitude: number;
  localSLocalisation: any;
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public sharedLocal: sharedLocal
  ) {}

  ngOnInit() {
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
      localStorage.setItem(
        "localisationPartenaire",
        JSON.stringify(localLatiLng)
      );
      //console.log(window.localStorage.getItem("localisationPartenaire"));
    });
  }
  submit() {
    //console.log(window.localStorage.getItem("localisationPartenaire"));
    this.localSLocalisation = JSON.parse(
      localStorage.getItem("localisationPartenaire")
    );
    // console.log("Data from Local Storgae", this.localSLocalisation);
    this.LocalisationTosend.push(
      this.localSLocalisation[0],
      this.localSLocalisation[1]
    );
    console.log("finally", this.LocalisationTosend);

    this.sharedLocal.customChangeDetector.next(this.LocalisationTosend);
  }
}
