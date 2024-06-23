import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PointVente } from "../data/PointVente";

@Injectable({
  providedIn: "root",
})
export class PointventeService {
  getPointVentsUrlByIdPartenaire =
    "http://localhost:6039/v1/AllPointVentesByIdPartenaire/ ";
  createDesPointsVentesUrl = "http://localhost:6039/v1/createDesPointsVentes/";
  getAllPVUrl = "http://localhost:6039/v1/getAllPointVentes";
  getPvByIdPartenaireUrl =
    "http://localhost:6039/v1/AllPointVentesByIdPartenaireBprice";
  blockPointventeUrl = "http://localhost:6039/v1/blockPointvente/";
  deblockPointventeUrl = "http://localhost:6039/v1/DeblockPointvente/";
  createOnlyOnePointventeUrl = "http://localhost:6039/v1/createPointVente";
  updatePointVenteUrl = "http://localhost:6039/v1/updatePointVente";
  getOnepointVenteByIdUrl = "http://localhost:6039/v1/getOnePointVente/";
  deletePointVenteUrl = "http://localhost:6039/v1/deletePointVente/";
  constructor(private httpPointvente: HttpClient) {}

  createPointsVentes(pointsventes: PointVente[], idPartenaire: string) {
    return this.httpPointvente.post<PointVente[]>(
      this.createDesPointsVentesUrl + idPartenaire,
      pointsventes
    );
  }
  getListPointsVenteByIdPartenaire(idPartenaire: string) {
    return this.httpPointvente.get(
      this.getPointVentsUrlByIdPartenaire + idPartenaire
    );
  }
  getAllPV() {
    return this.httpPointvente.get<PointVente[]>(this.getAllPVUrl);
  }
  AllPointVentesByIdPartenaireBprice(idPartenaire: string) {
    return this.httpPointvente.get<PointVente[]>(
      this.getPvByIdPartenaireUrl + "/" + idPartenaire
    );
  }
  blockPointVente(idPointvente: String) {
    return this.httpPointvente.delete(this.blockPointventeUrl + idPointvente);
  }

  deblockPointVente(idPointvente: String) {
    return this.httpPointvente.delete(this.deblockPointventeUrl + idPointvente);
  }

  createOnePointvente(pv: PointVente, idPartenaire: string) {
    return this.httpPointvente.post<PointVente>(
      this.createOnlyOnePointventeUrl + "/" + idPartenaire,
      pv
    );
  }
  updatePointvente(idPointVente: string, pointVente: PointVente) {
    return this.httpPointvente.put(
      this.updatePointVenteUrl + "/" + idPointVente,
      pointVente
    );
  }
  getOnePointVenteById(idPointVente: string) {
    return this.httpPointvente.get<PointVente>(
      this.getOnepointVenteByIdUrl + idPointVente
    );
  }
  deleteById(idPointVente: string) {
    return this.httpPointvente.delete(this.deletePointVenteUrl + idPointVente);
  }
}
