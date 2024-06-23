import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailFactureAd } from '../data/DetailFactureAd';
import { Factureavecdetail_view } from '../data/Factureavecdetail_view';
import { produitvenducount_view } from '../data/produitvenducount_view';

@Injectable({
  providedIn: 'root'
})
export class DetailFactureService {

adddetailfactureUrl='http://localhost:6039/v1/ajouterfactureavecdet/'
getAlldetailFactureUrl='http://localhost:6039/v1/getAllDetailAdcaisse'
getAllDetailByidFactureURL='http://localhost:6039/v1/getAllDetailByIdfacture/'

getalldetailsForChartURL='http://localhost:6039/v1/getAllDetailAdcaisse'

getfacturewithdetailViewURL='http://localhost:6039/v1/getAllFactureDetailAdcaisseView'

getAllProduitAdcaisseVendubyRankURL='http://localhost:6039/v1/getAllProduitAdcaisseVendubyRank'


nembretotaldesdetaisURL='http://localhost:6039/v1/nombreTotaldesDetails'

  constructor(private detailhttp : HttpClient  ) { }



  AjouterFactureavecdet(detailfacture:DetailFactureAd[],idfacture : String){

    return this.detailhttp.post<DetailFactureAd[]>(this.adddetailfactureUrl+idfacture,detailfacture);
  }



getAllDetailByidFacture(idFacure: string) {
  return this.detailhttp.get<DetailFactureAd[]>(this.getAllDetailByidFactureURL + idFacure);
}




getAllDetails() {
  return this.detailhttp.get<DetailFactureAd[]>(this.getalldetailsForChartURL);
}

//charts
getAllFactureDetailAdcaisseView(){
  return this.detailhttp.get<Factureavecdetail_view[]>(this.getfacturewithdetailViewURL);


}

//charts
getAllProduitAdcaisseVendubyRank(){
  return this.detailhttp.get<produitvenducount_view[]>(this.getAllProduitAdcaisseVendubyRankURL);


}

//charts
getNbrtotaldetails() {
  return this.detailhttp.get(this.nembretotaldesdetaisURL);
}

}
