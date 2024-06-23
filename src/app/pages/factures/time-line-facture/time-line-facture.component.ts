import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatusTimeline } from '../../../@core/data/StatusTimeline';
import { FactureService } from '../../../@core/mock/facture.service';
import { FacturetimelineService } from '../../../@core/mock/facturetimeline.service';

@Component({
  selector: 'ngx-time-line-facture',
  templateUrl: './time-line-facture.component.html',
  styleUrls: ['./time-line-facture.component.scss']
})
export class TimeLineFactureComponent implements OnInit {

  ListTimeline : StatusTimeline[];
  Timeline: StatusTimeline = new StatusTimeline();

  timelinebyidfacture:any[];
  id :string ;
  elements: any[] = [];




  constructor(private timelineservice : FacturetimelineService,
    Factureservice : FactureService,
    private activatedRoute: ActivatedRoute,

    ) { }

  ngOnInit(): void {


    this.id = this.activatedRoute.snapshot.params.idFacture;
    console.log("ddid",this.id)

    this.timelineservice.getAllTimelineByIdFacture(this.activatedRoute.snapshot.params.idFacture)
    .subscribe((data:any) => {
      this.ListTimeline = data
      this.timelinebyidfacture=data
      console.log("detaiiiiiiiil",this.ListTimeline);
      console.log("detaiiiiiiiil",this.timelinebyidfacture);




    });

}


}
