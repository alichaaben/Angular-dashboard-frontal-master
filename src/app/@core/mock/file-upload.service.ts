import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class FileUploadService {
  private URLuploadFile = "http://localhost:6039/v1/upload";
  constructor(private httpUploadFile: HttpClient) {}
  uploadFile(formData) {
    return this.httpUploadFile.post(this.URLuploadFile, formData);
  }
}
