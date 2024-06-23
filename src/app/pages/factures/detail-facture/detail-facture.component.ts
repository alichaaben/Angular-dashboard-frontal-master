import { summaryFileName } from '@angular/compiler/src/aot/util';
import {  Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailFactureAd } from '../../../@core/data/DetailFactureAd';
import { FactureAdcaisse } from '../../../@core/data/FactureAdcaisse';
import { PartenaireBprice } from '../../../@core/data/PartenaireBprice';
import { DetailFactureService } from '../../../@core/mock/detail-facture.service';``
import { FactureService } from '../../../@core/mock/facture.service';
import { PartenairesService } from '../../../@core/mock/partenaires.service';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";

import { DatePipe } from '@angular/common';
import { SendmailService } from '../../../@core/mock/sendmail.service';
import { EmailDetails } from '../../../@core/data/EmailDetails';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SmsRequest } from '../../../@core/data/SmsRequest';
import { MontantPartielleService } from '../../../@core/mock/montant-partielle.service';
import { MontantPartielFacture } from '../../../@core/data/MontantPartielleFacture';

@Component({
  selector: 'ngx-detail-facture',
  templateUrl: './detail-facture.component.html',
  styleUrls: ['./detail-facture.component.scss'],
  providers :[ConfirmationService,MessageService]

})
export class DetailFactureComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  displaysaveDialog : boolean =false;

  displaysavesmsDialog : boolean =false;


  totalprice : number =0 ;
  puretva : number = 0 ;
  id: string;
  selectedFacture: FactureAdcaisse = new FactureAdcaisse();
  detailfacture: DetailFactureAd = new DetailFactureAd();
  selectedPart: PartenaireBprice  = new PartenaireBprice();
  selecteddetail : DetailFactureAd[];
  mail :  EmailDetails =new  EmailDetails() ;
  sms : SmsRequest=new SmsRequest();
  DetailByIdFacture : any[] = [];
  detail : DetailFactureAd []=[];
  show : boolean= false ;
    sum : any = 0 ;
    i : any ;

    datef : string ;
    findate: string ;

    error: string;
    loading: boolean;
    errorMessage;

    errorBlock: boolean ;
    errorText : string;


    Montantpartiel : MontantPartielFacture =new MontantPartielFacture();
    listmontants:MontantPartielFacture[];

    totalMont : number ;

  montantrest : number ;

  constructor(
    private activatedRoute: ActivatedRoute,
     private servicefacture : FactureService,
     private servicedetail :DetailFactureService,
     private servicepartenaie : PartenairesService,
     private servicemail : SendmailService,
     public datepipe: DatePipe,
     private confirmationService: ConfirmationService,
     private messageService: MessageService,
     private montantservice : MontantPartielleService

  ) {


  }

  ngOnInit(): void {

    this.mail.recipient =  this.selectedPart.emailResponsable



    this.id = this.activatedRoute.snapshot.params.idFacture;
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

  this.servicedetail
  .getAllDetailByidFacture(this.activatedRoute.snapshot.params.idFacture)
  .subscribe((data) => {
    this.selecteddetail = data;
    this.DetailByIdFacture = data;
    console.log("detaiiiiiiiil",this.DetailByIdFacture);
    this.formatFacture();

this.calc()
this. puretvaamount()


});



this.montantservice
.getMontantByIdFacture(this.activatedRoute.snapshot.params.idFacture)
.subscribe((data) => {

this.listmontants=data ;
  console.log("montants deja payé",data);
  this.totalMontant();


});


  }


  showmailingdialog(){
    this.displaysaveDialog=true ;
    this.mail.recipient =  this.selectedPart.emailResponsable
    this.mail.subject = 'Facture Adcaisse'
    this.mail.msgBody= 'Cher(e) client(e) \n votre facture '  + this.selectedFacture.numFacture + '  reste impayée. Veuillez de payer dans le plus brefs délais'
  this.mail.attachment= 'C:/factureadcaisse/'+'Facture_'+this.selectedPart.raisonSociale+'_'+this.datepipe.transform(this.selectedFacture.dateCreation , 'dd_MM_yyyy')+'.pdf'
      console.log("dddddd", this.mail.attachment)
      }


      showsmsDialog(){
        this.displaysavesmsDialog = true ;
        this.sms.phoneNumber=this.selectedPart.nTel
        this.sms.message= 'Cher(e) client(e) \n vote facture ' + this.selectedFacture.numFacture + '  reste impayée. Veuillez de payer dans le plus brefs délais'

      }

  calc(){
    for(this.i=0; this.i<this.selecteddetail.length; this.i++){
      this.totalprice= this.totalprice + this.selecteddetail[this.i].prix *this.selecteddetail[this.i].quantite*((100-this.selecteddetail[this.i].remise)/100)
    }
    console.log("totalprice",this.totalprice)
  }


  puretvaamount(){
      this.puretva =   parseFloat((this.selectedFacture.totalpricetva - this.totalprice).toFixed(2))
      console.log("tva please", this.puretva)
    }



  formatFacture() {

    this.DetailByIdFacture = this.DetailByIdFacture.map(a => {
      delete a.idDetail
      delete a.idFactureAdcaisse
     return  Object.values(a)
    })
    console.log("format:", this.DetailByIdFacture);
  }

   downloadInvoice(){
    const doc = new jsPDF();
    autoTable(doc, {
      body: [
        [
          {
            content: 'TWINS DIGITAL LABS',
            styles: {
              halign: 'left',
              fontSize: 20,
              textColor: '#ffffff'
            }
          },
          {
            content: 'Facture ' + this.selectedFacture.numFacture,
            styles: {
              halign: 'right',
              fontSize: 15,
              textColor: '#ffffff'
            }
          }
        ],
      ],
      theme: 'plain',
      styles: {
        fillColor: '#68a3d5'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content: "Créé le: " + this.datepipe.transform(this.selectedFacture.dateCreation , 'dd/MM/yyyy'),

            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: ''
            + '\n Facturé à:'
            + '\n Nom: ' + this.selectedPart.raisonSociale
            +'\n Adresse: '+ this.selectedPart.adresse
            +'\n E-mail: ' +this.selectedPart.emailResponsable
            +'\n Tel: ' + this.selectedPart.nTel

            ,
            styles: {
              halign: 'left'
            }
          },
          // {
          //   content: 'Shipping address:'
          //   +'\nJohn Doe'
          //   +'\nShipping Address line 1'
          //   +'\nShipping Address line 2'
          //   +'\nZip code - City'
          //   +'\nCountry',
          //   styles: {
          //     halign: 'left'
          //   }
          // },
          {
            content: ''

            +'\n Twin Digital Labs'
            +'\n Tunis: Immeuble Amel,'
            +'\n Cité Olympique'
            +'\n Email: '
            +'\n contact@twinsdigitallabs.com',
            styles: {
              halign: 'left',



            }
          }
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content:'' ,
            styles: {
              halign:'right',
              fontSize: 14
            }
          }
        ],
        [
          {
            // content: this.selectedFacture.totalpricetva + ' DT',
            content:'',
            styles: {
              halign:'right',
              fontSize: 20,
              textColor: '#4682B4'
            }
          }
        ],
        [
          {
            // content: 'Date d expiration: '+this.datepipe.transform(this.selectedFacture.endDate , 'dd/MM/yyyy'),
            content:'',
            styles: {
              halign:'right'
            }
          }
        ]
      ],
      theme: 'plain'
    });
    autoTable(doc, {
      body: [
        [
          {
            content: 'Produits & Services',
            styles: {
              halign:'left',
              fontSize: 14
            }
          }
        ]
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      head: [['Produit Adcaisse', 'Quantité', 'Remise','Tva', 'Prix']],
      body:this.DetailByIdFacture,
      theme: 'striped',
      headStyles:{
        fillColor: '#343a40'
      }
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Prix Total (HT):',
            styles:{
              halign:'right'
            }
          },
          {
            content:this.totalprice + ' DT',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Total TVA:',
            styles:{
              halign:'right'
            }
          },
          {
            content: this.puretva + ' DT',
            styles:{
              halign:'right'
            }
          },
        ],
        [
          {
            content: 'Prix Total (TTC):',
            styles:{
              halign:'right'
            }
          },
          {
            content: this.selectedFacture.totalpricetva + ' DT',
            styles:{
              halign:'right'
            }
          },
        ],
      ],
      theme: 'plain'
    });

    autoTable(doc, {
      body: [
        [
          {
            content: 'Termes et notes',
            styles: {
              halign: 'left',
              fontSize: 14
            }
          }
        ],
        [
          {
            content: this.selectedFacture.termsandNotes ,
            styles: {
              halign: 'left'
            }
          }
        ],
      ],
      theme: "plain"
    });



    autoTable(doc, {
      body: [
        [

          {
            content: ''

            +'\n Signature et cachet'
         ,

            styles: {
              halign: 'right',



            }
          }
        ],
      ],
      theme: 'plain'
    });


    autoTable(doc, {
      body: [
        [
          {
            content: "",
            styles: {
              halign: 'center'
            }
          }
        ]
      ],
      theme: "plain"





    });





    return doc.save("Facture_"+ this.selectedPart.raisonSociale+"_"+this.datepipe.transform(this.selectedFacture.dateCreation , 'dd/MM/yyyy'));

  }



    envmail(){
      this.loading = true;
      this.servicemail.sendmailsimple(this.mail).subscribe(res=>{
        console.log(res);
        console.log(this.mail);

        this.displaysaveDialog=false ;

        this.messageService.add({ severity: 'error', summary: "Heyyy ! ", detail: "Email envoyer," });



      },
      error => {
        // this.error =  "smtp client side probleme";
        this.errorBlock=true ;
        this.errorText=error.message;
        this.loading = false;
        console.log(this.error);




       this.messageService.add({ severity: 'info', summary: "Heyyy ! ", detail: "Email envoyer" });

      },
      );



    }


    // send an email
    envmailfull(){
      this.loading = true;

      this.servicemail.sendmailwithattach(this.mail).subscribe(res=>{
        console.log(res);
        console.log(this.mail);
        this.loading = false;

      },

      (error) => {
        this.error = error;
        this.loading = false;
        this.messageService.add({ severity: 'info', summary: "Heyyy ! ", detail: "Partenaire notifié!" });
        this.displaysaveDialog=false ;

      },


      );



    }


    //send an sms
    envSms(){
      this.loading = true;

this.servicefacture.sendSmS(this.sms).subscribe(res=>{

  console.log(res)
  this.messageService.add({ severity: 'info', summary: "Heyyy ! ", detail: "Email envoyer," });

},
error => {
  // this.error =  "smtp client side probleme";
  this.errorBlock=true ;
  this.errorText=error.message;
  this.loading = false;
  console.log(this.error);



  // this.displaysaveDialog=false ;

  this.messageService.add({ severity: 'error', summary: "Heyyy ! ", detail: "Email Non envoyer, Vérifiez votre connexion au serveur SMTP" });

},


);




    }

    totalMontant() {
      this.totalMont = 0;
      for (this.i = 0; this.i < this.listmontants.length; this.i++) {
        this.totalMont = this.totalMont + this.listmontants[this.i].montant
        this.montantrestant()

        console.log("totalmontant", this.totalMont);

      }
    }

    montantrestant(){

      this.montantrest = this.selectedFacture.totalpricetva - this.totalMont
      console.log("montant restant", this.montantrest);


    }


}

