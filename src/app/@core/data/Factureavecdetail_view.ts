import { StatusFacture } from "./StatusFacture";

export class Factureavecdetail_view {

  name : string ;
  numFacture: String;
  dateCreation: Date;
  statusFacture: StatusFacture;
  startDate :Date ;
  endDate : Date ;
  softdelete : Boolean ;
  totalprice : number ;
  totalpricetva : number ;

   detail : any[] ;


}
