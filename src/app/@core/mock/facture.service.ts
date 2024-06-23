import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Observable } from "rxjs";
import { DetailFactureAd } from "../data/DetailFactureAd";
import { FactureAdcaisse } from "../data/FactureAdcaisse";
import { FactureAdcaisseStatusStat_view } from "../data/FactureAdcaisseStatusStat_view";
import {Subject} from 'rxjs' ;
import { SmsRequest } from "../data/SmsRequest";

@Injectable({
  providedIn: "root",
})
export class FactureService {
  public formData: FormGroup;
  list: any = {};
  facture: FactureAdcaisse;

  public notificationSubjectId= new Subject<string>()

  public notificationSubjectname= new Subject<string>()


  addfactureUrl = "http://localhost:6039/v1/createFacture";
  getallfactureUrl = "http://localhost:6039/v1/getAllFactureAdcaisse";
  ajoutfactureUrl = "http://localhost:6039/v1/Factureavecdetail";
  getallfacturebasicurl = "http://localhost:6039/v1/getAllFactureAdcaissebasic";

  getAllActiveFactureURL='http://localhost:6039/v1/getAllActiveFacture'
  getAllFactureInArchiveURL='http://localhost:6039/v1/getAllArchiveFacture'
  updatefactureURL="http://localhost:6039/v1/updateFacture/"
  getfacturebyidURL="http://localhost:6039/v1/getFactureById/"


  GetAllFactureBystatusViewURL='http://localhost:6039/v1/GetGroupedByStatusFacture'

  SendSmsFactureURL='http://localhost:6039/v1/SendSmsForFacture'

  nembretotaldesfactureURL='http://localhost:6039/v1/nombreTotaldesFacture'

  constructor(private facturehttp: HttpClient) {}

  addFacture(facture: FactureAdcaisse, idd: String) {
    return this.facturehttp.post<FactureAdcaisse>(
      `${this.addfactureUrl}/${idd}`,
      facture,
      {}
    );
  }
  // used add method in the bill creation
  ajouterFacture(facture: FactureAdcaisse) {
    return this.facturehttp.post<FactureAdcaisse>(
      `${this.ajoutfactureUrl}`,
      facture
    );
  }

//all factures (archivé et non archivé)
  getAllFacturebasic() {
    return this.facturehttp.get<FactureAdcaisse[]>(this.getallfacturebasicurl);
  }

  //all Active Factures
  getAllActiveFacture() {
    return this.facturehttp.get<FactureAdcaisse[]>(this.getAllActiveFactureURL);
  }

  //all Factures in Archive
  getAllFactureInArchive() {
    return this.facturehttp.get<FactureAdcaisse[]>(this.getAllFactureInArchiveURL);
  }


  updateFacture(idFacture: string, FactureAdcaisse : FactureAdcaisse)  {
    return this.facturehttp.put(
      this.updatefactureURL + "/" + idFacture,FactureAdcaisse);
  }

  getOneFactureById(idFacure: string) {
    return this.facturehttp.get<FactureAdcaisse>(
      this.getfacturebyidURL + idFacure
    );
  }

  getOneFactureByIdd(idFacure: string) {
    return this.facturehttp.get<FactureAdcaisse>(
      this.getfacturebyidURL + idFacure
    );
  }

    //charts
getAllFactureDetailAdcaisseView(){
  return this.facturehttp.get<FactureAdcaisseStatusStat_view[]>(this.GetAllFactureBystatusViewURL);

}

  //subject behavior entre ajouterfacture et partenairedialog
  envoyerIdPartnerdeDialogauForm(data){
   this.notificationSubjectId.next(data);
  }
  //subject behavior entre ajouterfacture et partenairedialog

  envoyerNomdeDialogauForm(data){
    this.notificationSubjectname.next(data);


   }

//Send Sms Notification
sendSmS(sms: SmsRequest): Observable<any>{
  return this.facturehttp.post<SmsRequest>(this.SendSmsFactureURL,sms);
}

//charts
getNbrtotalFactures() {
  return this.facturehttp.get(this.nembretotaldesfactureURL);
}

}
