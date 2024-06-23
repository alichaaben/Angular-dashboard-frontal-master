import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FactureTypePayment } from '../data/FactureTypePayment';

@Injectable({
  providedIn: 'root'
})
export class FacturePaymentTypeService {



  GetallPaymentTypeURL='http://localhost:6039/v1/getAllPaymentTypeeActive'


  constructor(private facturehttp: HttpClient) { }






   //all Active Factures
   getAllpaymentType() {
    return this.facturehttp.get<FactureTypePayment[]>(this.GetallPaymentTypeURL);
  }
}
