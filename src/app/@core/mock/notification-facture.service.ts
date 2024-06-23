import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotificationFacture } from '../data/NotificationFacure';

@Injectable({
  providedIn: 'root'
})
export class NotificationFactureService {

  initNotiffactureURL='http://localhost:6039/v1/createNotificationFacture'
  GetallNotifFactureURL ='http://localhost:6039/v1/getAllNotificationFacture'


  constructor(private httpnotiffacture : HttpClient ) { }


  initListNotifcation() {
    return this.httpnotiffacture.post( this.initNotiffactureURL ,null );
  }

  getAllNotificationFacture() {
    return this.httpnotiffacture.get<NotificationFacture[]>( this.GetallNotifFactureURL);
  }

}
