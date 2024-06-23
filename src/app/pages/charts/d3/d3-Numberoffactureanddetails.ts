import { Component, OnInit } from "@angular/core";
import {
  ConfirmationService,
  ConfirmEventType,
  MessageService,
} from "primeng/api";
import { ChartsService } from "../../../@core/mock/charts.service";
import { DetailFactureService } from "../../../@core/mock/detail-facture.service";
import { FactureService } from "../../../@core/mock/facture.service";

@Component({
  selector: "ngx-sumfacture-stats",
  template: `

<style>



.free{
    color:#14113B;
    display:block;
}
.amount{
    color:#352f7a;
    font-weight:700;
    font-size:45px;
}

.card1{
    background-image: linear-gradient(to right top, #18A4F7, #18A4F7,  #18A4F7,#18A4F7);
}
.amount1{
    color:#fff;
    font-weight:700;
    font-size:45px;
}
.plan1{
    color:#594a90;
}
    </style>
<div class="container mt-5 mb-5">
    <div class="row">


        <div class="col-md-4">
            <div class="card card1 p-3 mt-3">
                <div class="text-center">
                    <span class="free">Total des factures </span>

                    <span class="d-block mt-3 amount1">{{this.totalfactures}}</span>
                    <div class="mt-3">


                    </div>
                </div>
            </div>
        </div>

<div class="col-md-4">
            <div class="card card1 p-3 mt-3">
                <div class="text-center">
                    <span class="free">Total des Details facture </span>

                    <span class="d-block mt-3 amount1">{{this.totaldetail}}</span>
                    <div class="mt-3">


                    </div>
                </div>
            </div>
        </div>

    </div>
</div>



`,

})
export class D3NumberoffactureanddetailsConponent implements OnInit {








totalfactures : any ;
totaldetail : any ;



  constructor(
    private factureservice: FactureService,
    private detaiservice : DetailFactureService,

  ) {}
  ngOnInit(){

    this.factureservice.getNbrtotalFactures().subscribe((res) => {
      this.totalfactures = res;
      console.log("total facture",res);

    });

    this.detaiservice.getNbrtotaldetails().subscribe((res) => {
      this.totaldetail = res;
      console.log("totaldetail",res);


    });
  }

}

