import { Component, OnInit, ViewChild } from "@angular/core";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { PartenairesService } from "../../../@core/mock/partenaires.service";

@Component({
  selector: "ngx-gmaps",
  styleUrls: ["./gmaps.component.scss"],
  templateUrl: "./gmaps.component.html",
})
export class GmapsComponent implements OnInit {
  map: any;
  localisation: any[];
  NosPartenaires: PartenaireBprice[];
  markers: any[] = [];
  @ViewChild("map") mapElement: any;

  constructor(private partenaireService: PartenairesService) {}
  ngOnInit(): void {
    this.map = new google.maps.Map(document.getElementById("googlemap"), {
      center: new google.maps.LatLng(36.5, 9.53682647705076),
      zoom: 7.5,
    });
    //Position du bureau
    var marker = new google.maps.Marker({
      position: {
        lat: 37.084347366079,
        lng: 9.53682647705076,
      },
      map: this.map,
      draggable: false,
      label: {
        text: "Twins Digital Labs",
      },
    });
    //Localistion de nos partenaires
    this.partenaireService.getTheAllpartners().subscribe((data) => {
      this.NosPartenaires = data;
      for (var partner of this.NosPartenaires) {
        this.markers.push({
          position: {
            lat: partner.lat,
            lng: partner.lng,
          },
          label: {
            text: partner.raisonSociale,
          },
        });
      }
      this.markers.forEach((location) => {
        var marker = new google.maps.Marker({
          position: {
            lat: location.position.lat,
            lng: location.position.lng,
          },
          map: this.map,
          draggable: false,
          label: {
            text: location.label.text,
          },
        });
      });
    });
  }
}
