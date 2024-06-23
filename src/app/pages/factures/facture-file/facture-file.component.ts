import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { FactureAdcaisse } from '../../../@core/data/FactureAdcaisse';
import { FacturefileDB } from '../../../@core/data/FacturefileDB';
import { PartenaireBprice } from '../../../@core/data/PartenaireBprice';
import { FactureFileUploadService } from '../../../@core/mock/facture-file-upload.service';
import { FactureService } from '../../../@core/mock/facture.service';
import { PartenairesService } from '../../../@core/mock/partenaires.service';

@Component({
  selector: 'ngx-facture-file',
  templateUrl: './facture-file.component.html',
  styleUrls: ['./facture-file.component.scss']
})
export class FactureFileComponent implements OnInit {


  selectedFacture: FactureAdcaisse = new FactureAdcaisse();
  selectedPart: PartenaireBprice  = new PartenaireBprice();

  fileFacture : FacturefileDB = new FacturefileDB();


  idfacture: string;

  idFacturefile:string

  value: number = 0;



  ngOnInit(): void {

    this.idfacture = this.activatedRoute.snapshot.params.idFacture;
console.log("ghassen",this.idfacture)

    this.servicefacture
      .getOneFactureById(this.activatedRoute.snapshot.params.idFacture)
      .subscribe((data) => {
      //  console.log("data", data);
        this.selectedFacture = data["objectResponse"];
        console.log(this.selectedFacture)
        this.servicepartenaie.getOnePartenaireById(this.selectedFacture.idPartenaireBprice)
    .subscribe((data) => {
    this.selectedPart = data["objectResponse"];
    console.log("partner is:",this.selectedPart)

  })
  });
  console.log("facture",this.idfacture)


    this.fileInfos = this.uploadService.getFilebyidfacture(this.idfacture);

    console.log("filelist :",this.fileInfos)


   


  }

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;
  constructor(private uploadService: FactureFileUploadService, private servicefacture : FactureService, private messageService: MessageService,    private servicepartenaie : PartenairesService,
    private activatedRoute: ActivatedRoute
    ) { }

  selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    this.progress = 0;
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);
      if (file) {
        this.currentFile = file;
        this.idFacturefile =this.selectedFacture.idFacture;
        console.log('ddddd',this.idFacturefile)

        this.uploadService.upload(this.currentFile,this.idFacturefile).subscribe(
          (event: any) => {
            
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.messageService.add({severity: 'info', summary: 'Success', detail: 'Process Completed'});

              this.message = event.body.message;
              this.fileInfos = this.uploadService.getFilebyidfacture(this.idfacture);
            }

          },
          (err: any) => {
            console.log(err);
            this.progress = 0;
            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Impossible de télécharger le fichier!';
            }
            this.currentFile = undefined;
          });
      }
      this.selectedFiles = undefined;
    }
  }




  }


