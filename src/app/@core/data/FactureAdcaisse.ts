import { DetailFactureAd } from "./DetailFactureAd";
import { StatusFacture } from "./StatusFacture";
import { TypeReglement } from "./TypeReglement";

export class FactureAdcaisse {
  idFacture: string;
  idPartenaireBprice: string;
  name : string ;
  numFacture: String;
  dateCreation: Date;
  typeReglement: TypeReglement;
  statusFacture: StatusFacture;
  startDate :Date ;
  endDate : Date ;
  softdelete : Boolean ;
  totalprice : number ;
  totalpricetva : number ;
  termsandNotes : string ;

}
