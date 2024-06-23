import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ModeReglement } from "../data/ModeReglement";

@Injectable({
  providedIn: "root",
})
export class ModereglementService {
  private URLcreateModereglement =
    "http://localhost:6039/v1/addModeReglemenet/";
  private URLcreateListModereglement =
    "http://localhost:6039/v1/addListModeReglement/";
  private URLGetAllModeReglement =
    "http://localhost:6039/v1/getAllModeReglement";
  private URLDeleteModeReglemenet =
    "http://localhost:6039/v1/deleteModeReglement/";
  private URLUpdateModeReglement =
    "http://localhost:6039/v1/updateModeReglement/";
  private URLGetOneModeReglmentById =
    "http://localhost:6039/v1/getOneModeReglementById/";

  constructor(private httpModeReglemenet: HttpClient) {}
  addModeReglemenet(idPointVente: string, modeReglement: ModeReglement) {
    return this.httpModeReglemenet.post(
      this.URLcreateModereglement + idPointVente,
      modeReglement
    );
  }

  addListModereglement(
    listModeReglement: ModeReglement[],
    idPointVente: string
  ) {
    return this.httpModeReglemenet.post<ModeReglement[]>(
      this.URLcreateListModereglement + idPointVente,
      listModeReglement
    );
  }
  getAllModeReglement() {
    return this.httpModeReglemenet.get<ModeReglement[]>(
      this.URLGetAllModeReglement
    );
  }
  deleteModeReglement(idModeReglement: string) {
    return this.httpModeReglemenet.delete(
      this.URLDeleteModeReglemenet + idModeReglement
    );
  }
  updateModeReglemen(idModeReglement: string, modeReglement: ModeReglement) {
    return this.httpModeReglemenet.put(
      this.URLUpdateModeReglement + idModeReglement,
      modeReglement
    );
  }
  getOneModeReglementById(idModeReglement: string) {
    return this.httpModeReglemenet.get<ModeReglement>(
      this.URLGetOneModeReglmentById + idModeReglement
    );
  }
}
