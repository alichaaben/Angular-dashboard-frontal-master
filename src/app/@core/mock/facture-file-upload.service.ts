import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactureFileUploadService {
  

  constructor(private facturefilehttp: HttpClient) { }

  private baseUrl = 'http://localhost:6039/v1';

  private baseUrl2 = 'http://localhost:6039/v1/files/';

  getonefilebyidfacture='http://localhost:6039/v1/filesbyidFacture/'

  upload(file: File,idfacture :String): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    formData.append('file', file);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload/${idfacture}`, formData, {
      reportProgress: true,
      responseType: 'json'
      
    });
    return this.facturefilehttp.request(req);
  }
  getFiles(): Observable<any> {
    return this.facturefilehttp.get(`${this.baseUrl}/files`);
  }


//this one facture
  getFilebyidfacture(idFile: string): Observable<any>  {
    
    return this.facturefilehttp.get(this.getonefilebyidfacture + idFile);
  }


  getFilebyId(idfile: string): Observable<any> {
    return this.facturefilehttp.get(this.baseUrl2+idfile);
  }


  uploadFile(file,idfacture :String) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
     //append any other key here if required
    return this.facturefilehttp.post(`${this.baseUrl}/upload/${idfacture}`, formData);
  }
//delete file method

//Download file 
downloadFile = function (list, index) {
const body = { filename: list[index].uploadname };
const options = {
headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/pdf' }),
responseType: 'blob'
};
this.http.post(`<api URL>`, body, options).subscribe(data => {
this.saveFile(data, list[index].uploadname);
const blob = new Blob([data], { type: 'application/pdf' });
var filename =list[index].uploadname;
var result = filename.match('.pdf');
if (result) {
var blobURL = URL.createObjectURL(blob);
window.open(blobURL);
} else {

}
});
};
  


}
