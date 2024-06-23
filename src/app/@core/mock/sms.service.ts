import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Sms } from "../data/Sms";

@Injectable({
  providedIn: "root",
})
export class SmsService {
  private URLCreateSms = "http://localhost:6039/v1/createSms/";
  private URLsendSmsForOnePartner =
    "http://localhost:6039/v1/sendSmsForOnePartner/";
  private URLgetAllClientByIdPartenaire =
    "http://localhost:6039/v1/getAllClientActifByIdPartenaire/";
  private URLsendOTPSMS = "http://localhost:6039/v1/SendOtpMsg/";
  private URLCreateSMSforClientPartenaire =
    "http://localhost:6039/v1/createSmsForClientsPartenaire/ ";
  private URLPartenaireSMS = "http://localhost:6039/v1/getAllSMSByKEys";

  constructor(private httpSms: HttpClient) {}

  createSms(smsToSend: Sms, idPartenaire: string) {
    return this.httpSms.post(
      this.URLsendSmsForOnePartner + idPartenaire,
      smsToSend
    );
  }
  sendSmsForOnePartner(idPartenaire: string, idAbonnement: string, sms: Sms) {
    return this.httpSms.post(
      this.URLsendSmsForOnePartner + idPartenaire + "/" + idAbonnement,
      sms
    );
  }
  getAllClientByIdPartenaire(idPartenaire: string) {
    return this.httpSms.get(this.URLgetAllClientByIdPartenaire + idPartenaire);
  }
  sendOptSMS(idPartenaire: string, destination: string, bodySMS: string) {
    return this.httpSms.get(
      this.URLsendOTPSMS + idPartenaire + "/" + destination + "/" + bodySMS
    );
  }
  createSMSForClientsOfPartner(sms: Sms, idPartenaire: string) {
    return this.httpSms.post(
      this.URLCreateSMSforClientPartenaire + idPartenaire,
      sms
    );
  }
  getAllSMSByPartenaire() {
    return this.httpSms.get(this.URLPartenaireSMS);
  }
}
