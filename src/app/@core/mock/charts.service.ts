import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ClientDto } from "../data/ClientDto";

@Injectable({
  providedIn: "root",
})
export class ChartsService {
  private URLnbrPartenaires = "http://localhost:6039/v1/nbrPartenaires";
  private URLnbrPartenaiersEachYear =
    "http://localhost:6039/v1/nbrPartenairesEachYear";
  private UrlnbrPartenairesEachMonth =
    "http://localhost:6039/v1/nbrPartenairesEachMonth";
  private UrlnbrPartenairesPerYear =
    "http://localhost:6039/v1/nbrPartenairesPerYear/";
  private UrlgetEvoCApartnerPerYear =
    "http://localhost:6039/v1/getEvolCaAllMonthsForAPartnerForOneYear/";
  private UrlNbrClientsMobile =
    "http://localhost:6039/v1/evoLutionNbrClientMobileByMonth";
  private UrlEvoNbrTransactions =
    "http://localhost:6039/v1/getAllTransactions/";
  private URLGetNbrAllTransactions =
    "http://localhost:6039/v1/getNbrAllTransactions";
  private URLAllTransactionsAmmount =
    "http://localhost:6039/v1/getTransactionsAmmout";
  private URLgetNbrTransactionEachPointVenteByPartnerId =
    "http://localhost:6039/v1/getNbrTransactionsForEachPointVentePerYear";
  private URLgetCaEachPointVenteByPartnerIdPerYear =
    "http://localhost:6039/v1/GetTotalCAByPointVentePerYear";

  private URLNbrPointVentes = "http://localhost:6039/v1/nbrPointVentes";
  constructor(private httpChart: HttpClient) {}
  getNbrPartenaires() {
    return this.httpChart.get(this.URLnbrPartenaires);
  }
  getNbrPartenairesEachYear() {
    return this.httpChart.get<any[]>(this.URLnbrPartenaiersEachYear);
  }
  getNbrPartenairesEachMonth() {
    return this.httpChart.get<any[]>(this.UrlnbrPartenairesEachMonth);
  }
  getNbrPartenairesPerMonthsOfYear(year: number) {
    return this.httpChart.get<any[]>(this.UrlnbrPartenairesPerYear + year);
  }
  getEvoCApartnerPerYear(idPartneaire: string, year: string) {
    return this.httpChart.post(
      this.UrlgetEvoCApartnerPerYear + idPartneaire + "/" + year,
      null
    );
  }
  getNbrClientAppMobile() {
    return this.httpChart.get(this.UrlNbrClientsMobile);
  }
  getEvolutionNbrTransactions(idPartenaire: string, annee: number) {
    return this.httpChart.get(
      this.UrlEvoNbrTransactions + idPartenaire + "/" + annee
    );
  }
  getNbrTotalTransactions() {
    return this.httpChart.get(this.URLGetNbrAllTransactions);
  }
  getAllTransactionsAmmount() {
    return this.httpChart.get(this.URLAllTransactionsAmmount);
  }
  getTransactionAmmoutEachPointVenteByPartnerId(
    idPartenaire: string,
    year: number
  ) {
    return this.httpChart.get(
      this.URLgetNbrTransactionEachPointVenteByPartnerId +
        "/" +
        idPartenaire +
        "/" +
        year
    );
  }
  getNbrTransactionseachPvByPartnerId(idPartenaire: string, year: number) {
    return this.httpChart.get(
      this.URLgetCaEachPointVenteByPartnerIdPerYear +
        "/" +
        idPartenaire +
        "/" +
        year
    );
  }
  getNbrPointVentes() {
    return this.httpChart.get<number>(this.URLNbrPointVentes);
  }
}
