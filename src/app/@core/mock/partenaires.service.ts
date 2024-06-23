import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { PartenaireBprice } from "../data/PartenaireBprice";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PartenairesService {
  partners: PartenaireBprice[];

  UrlListpartenaires = "http://localhost:6039/v1/getAllByDateCreationDesc";
  UrlNbrePartenairesEachDate = "http://localhost:6039/v1/NbrPartnersByDate";
  UrlBlockpartner = "http://localhost:6039/v1/blockPartenaireBprice/";
  UrlUnblockpartner = "http://localhost:6039/v1/deblockPartenaireBprice/";
  addPartnerUrl = "http://localhost:6039/v1/createPartenaireBprice";
  UrlUpdatePartner = "http://localhost:6039/v1/updatePartenaireBprice/";
  getOnePartnerUrl = "http://localhost:6039/v1/getPartenaireById/";
  deleteOnePartnerUrl = "http://localhost:6039/v1/deletePartenaireBprice";
  URLgetPvForEachPartner = "http://localhost:6039/v1/NbrPointVenteByPartner";
  URLgetNbrAbonnementEachPartner =
    "http://localhost:6039/v1/getNbrAbonnementEachPartner";
  constructor(private httpPartenaire: HttpClient) {}

  getTheAllpartners() {
    return this.httpPartenaire.get<PartenaireBprice[]>(this.UrlListpartenaires);
  }
  createPartenaire(partner: PartenaireBprice) {
    return this.httpPartenaire
      .post<PartenaireBprice>(this.addPartnerUrl, partner)
      .pipe(catchError(this.handleError));
  }
  private handleError(httpError: HttpErrorResponse) {
    if (httpError.error instanceof ErrorEvent) {
      console.error("An error occurred:", httpError.error.message);
    } else {
      console.error(
        `Backend returned code ${httpError.status}, ` +
          `body was: ${httpError.error}`
      );
    }
    return throwError("Something bad happened; please try again later.");
  }

  getOnePartenaireById(idPartenaire: String) {
    return this.httpPartenaire.get(this.getOnePartnerUrl + "/" + idPartenaire);
  }
  blockPartner(idPartenaire: String) {
    return this.httpPartenaire.delete(this.UrlBlockpartner + idPartenaire);
  }

  unblockPartner(idPartenaire: String) {
    return this.httpPartenaire.delete(this.UrlUnblockpartner + idPartenaire);
  }
  updatePartenaire(idPartenaire: string, partenaire: PartenaireBprice) {
    return this.httpPartenaire.put(
      this.UrlUpdatePartner + idPartenaire,
      partenaire
    );
  }

  getOnePartner(idPartenaire: string) {
    return this.httpPartenaire.get<PartenaireBprice>(
      this.getOnePartnerUrl + idPartenaire
    );
  }
  deletePartenaire(idPartenaire: string) {
    return this.httpPartenaire.delete(
      this.deleteOnePartnerUrl + "/" + idPartenaire
    );
  }
  getPointVentesByPartner() {
    return this.httpPartenaire.get(this.URLgetPvForEachPartner);
  }
  getNbrAbonnementsByPartner() {
    return this.httpPartenaire.get<any[]>(this.URLgetNbrAbonnementEachPartner);
  }
}
