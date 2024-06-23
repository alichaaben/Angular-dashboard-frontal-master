import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Abonnement } from "../data/Abonnement";

@Injectable({
  providedIn: "root",
})
export class AbonnementService {
  abonnements: Abonnement[];
  private URLGetAllAbonnements = "http://localhost:6039/v1/AllAbonnements";
  private URLGetALLAbonnementsByIdPatenaire =
    "http://localhost:6039/v1/AllAbonnementsByIdPartenaire/";
  private URLCerateAbonnement = "http://localhost:6039/v1/createAbonnement/";
  private URLDeleteAbonnemen = "http://localhost:6039/v1/deleteAbonnement/";
  private URLChangeStatusToPaye = "http://localhost:6039/v1/changeToPaye/";
  private URLChangeStatusToNonPaye =
    "http://localhost:6039/v1/changeToNonPaye/";
  private URLGetOneAbonnement = "http://localhost:6039/v1/getOneAbonnement/";
  private URLupdateAbonnement = "http://localhost:6039/v1/updateAbonnement/";
  private URGetProduitAdcaisse =
    "http://localhost:6039/v1/getAbonnementProducts";

  constructor(private httpAbonnement: HttpClient) {}

  getAllAbonnement() {
    return this.httpAbonnement.get<Abonnement[]>(this.URLGetAllAbonnements);
  }
  getAllAbonnementsByIdPartenaire(idPartenaire: string) {
    return this.httpAbonnement.get<Abonnement[]>(
      this.URLGetALLAbonnementsByIdPatenaire + idPartenaire
    );
  }
  createAbonnement(abonnement: Abonnement, idPartenaire: string) {
    return this.httpAbonnement.post(
      this.URLCerateAbonnement + idPartenaire,
      abonnement
    );
  }
  deleteAbonnement(idAbonnement: string) {
    return this.httpAbonnement.delete(this.URLDeleteAbonnemen + idAbonnement);
  }

  changeStatusToPaye(idAbonnement: string) {
    return this.httpAbonnement.delete(
      this.URLChangeStatusToPaye + idAbonnement
    );
  }
  changeStatusToNonPaye(idAbonnement: string) {
    return this.httpAbonnement.delete(
      this.URLChangeStatusToNonPaye + idAbonnement
    );
  }
  getOneAbonnement(id: string) {
    return this.httpAbonnement.get<Abonnement>(this.URLGetOneAbonnement + id);
  }
  updateAbonnement(id: string, a: Abonnement) {
    return this.httpAbonnement.put(this.URLupdateAbonnement + id, a);
  }
  getProduitAdcaisseContainsAbonnements() {
    return this.httpAbonnement.get<any[]>(this.URGetProduitAdcaisse);
  }
}
