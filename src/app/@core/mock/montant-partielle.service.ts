import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MontantPartielFacture} from '../data/MontantPartielleFacture';

@Injectable({
  providedIn: 'root'
})
export class MontantPartielleService {

ajouterMontantURL='http://localhost:6039/v1/createMontantPartiel'
getallMontantByidFactureURL='http://localhost:6039/v1/getMontantByIdFacture/'

archiverMontantPartielURL='http://localhost:6039/v1/ArchiverMontantPartiel/'



  constructor(private httpMontant : HttpClient) { }



  addMontantPartielle(montantpar: MontantPartielFacture, idfacture: String) {
    return this.httpMontant.post<MontantPartielFacture>(
      `${this.ajouterMontantURL}/${idfacture}`,
      montantpar,
      {}
    );
  }


  getMontantByIdFacture(idFacure: string) {
    return this.httpMontant.get<MontantPartielFacture[]>(
      this.getallMontantByidFactureURL + idFacure
    );
  }

  ArchiverMontant(idMontant: String) {
    return this.httpMontant.delete(this.archiverMontantPartielURL + idMontant);
  }


}
