import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProduitAdcaisse } from '../data/ProduitAdcaisse';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

getproductlistUrl='http://localhost:6039/v1/getAllProductsAdcaisseActive'
addNewProduit='http://localhost:6039/v1/createProductAdcaisse'
updateProduit='http://localhost:6039/v1/updateProduit'
getproduitbyidURL='http://localhost:6039/v1/getProduitById/'
ArchiveProduitURL='http://localhost:6039/v1/ArchiverProduit/'





constructor(private produithttp : HttpClient) { }


getAllActiveproducts(){

  return this.produithttp.get<ProduitAdcaisse[]>('http://localhost:6039/v1/getAllProductsAdcaisseActive');

}


save(Produit: ProduitAdcaisse): Observable<any>{
  return this.produithttp.post<ProduitAdcaisse>(this.addNewProduit,Produit);
}


updateproduit(idProduit: string, ProduitAdcaisse : ProduitAdcaisse)  {
  return this.produithttp.put(
    this.updateProduit + "/" + idProduit,ProduitAdcaisse);
}

ArchiverProduit(idProduit: String) {
  return this.produithttp.delete(this.ArchiveProduitURL + idProduit);
}


getOneProduitById(idProduit: string) {
  return this.produithttp.get<ProduitAdcaisse>(
    this.getproduitbyidURL + idProduit
  );
}



}
