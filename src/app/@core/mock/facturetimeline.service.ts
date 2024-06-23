import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StatusTimeline } from '../data/StatusTimeline';

@Injectable({
  providedIn: 'root'
})
export class FacturetimelineService {

  gettallTimelineByIdFactureURL='http://localhost:6039/v1/getTimelineByIdFacture/'

  constructor(private timelinehttp: HttpClient) {

  }

  getAllTimelineByIdFacture(idFacure: string) {
    return this.timelinehttp.get<StatusTimeline>(
      this.gettallTimelineByIdFactureURL + idFacure
    );
  }
}
