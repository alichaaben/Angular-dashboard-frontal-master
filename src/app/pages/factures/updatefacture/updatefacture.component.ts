import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, ConfirmEventType, MenuItem, Message, MessageService } from 'primeng/api';
import { FactureAdcaisse } from '../../../@core/data/FactureAdcaisse';
import { FactureTypePayment } from '../../../@core/data/FactureTypePayment';
import { MontantPartielFacture } from '../../../@core/data/MontantPartielleFacture';
import { StatusFacture } from '../../../@core/data/StatusFacture';
import { TypeReglement } from '../../../@core/data/TypeReglement';
import { FacturePaymentTypeService } from '../../../@core/mock/facture-payment-type.service';
import { FactureService } from '../../../@core/mock/facture.service';
import { MontantPartielleService } from '../../../@core/mock/montant-partielle.service';
import {trigger,state,style,transition,animate} from '@angular/animations';


@Component({
  selector: 'ngx-updatefacture',
  templateUrl: './updatefacture.component.html',
  styleUrls: ['./updatefacture.component.scss'],
  providers: [ConfirmationService, MessageService]
})



export class UpdatefactureComponent implements OnInit {
    
          msgs1: Message[];

  cc: string; 


  items: MenuItem[];
  home: MenuItem;



  statType = StatusFacture;
  Key(): Array<string> {
    var Key = Object.keys(this.statType);
    return Key;
  }

  RegType = TypeReglement;
  Key2(): Array<string> {
    var Key2 = Object.keys(this.RegType);
    return Key2;
  }

  stype : string ;
  paytype: string ;
  showTyperReglement : boolean =false;
  showpaymentType : boolean =false ;
  showMontant : boolean=false ;
  displaysaveDialog : boolean =false;


  submitted: any = false;
  id: string;
  updatefactform: FormGroup;
  montantform: FormGroup ;
  selectedFacture: FactureAdcaisse;
  Facture: FactureAdcaisse = new FactureAdcaisse();
  Montantpartiel : MontantPartielFacture =new MontantPartielFacture();
  selMontantpartiel : MontantPartielFacture ;
  listmontants:MontantPartielFacture[];
  listtypepayment : FactureTypePayment[];
montantdouble : number ;

totalPartiel:number ;

i: any;

totalMont : number ;

Montrestant : number ;


  constructor( private activatedRoute: ActivatedRoute,
    private route: Router,
     private servicefacture : FactureService,
     private formbuilder: FormBuilder,
     private cd: ChangeDetectorRef,
     private messageService: MessageService,
     private montantservice : MontantPartielleService,
     private confirmationservice :ConfirmationService,
     private FacturePaymentTypeService :FacturePaymentTypeService) {

      (this.updatefactform = formbuilder.group({
        numFacture: new FormControl("", Validators.required),
        softdelete: new FormControl("", Validators.required),
        statusFacture: new FormControl("", Validators.required),
        typeReglement: new FormControl("", Validators.required),
        termsandNotes: new FormControl("", Validators.required),
      })),

      (this.montantform=formbuilder.group({
        Montant: new FormControl("", Validators.required),
        dateCreation : new FormControl("", Validators.required),
        paymentT : new FormControl("", Validators.required),
        chequenumb :new FormControl("", [Validators.pattern( /^-?(0|[1-9]\d*)?$/)])
      }))
     }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.params.idFacture;
    console.log(
      "IdFacture en route",
      this.activatedRoute.snapshot.params.idFacture
    );
    this.servicefacture
      .getOneFactureById(this.activatedRoute.snapshot.params.idFacture)
      .subscribe((data) => {
        console.log("data", data);
        this.selectedFacture = data["objectResponse"];
        console.log("Facture  a modifier", this.selectedFacture);
        this.updatefactform = this.formbuilder.group({
          numFacture: new FormControl(this.selectedFacture.numFacture, Validators.required),
          softdelete: new FormControl(this.selectedFacture.softdelete, Validators.required),
          statusFacture: new FormControl(this.selectedFacture.statusFacture, Validators.required),
          typeReglement: new FormControl(this.selectedFacture.typeReglement, Validators.required),
          termsandNotes: new FormControl(this.selectedFacture.termsandNotes, Validators.required)


        });

  }),



this.montantservice
  .getMontantByIdFacture(this.activatedRoute.snapshot.params.idFacture)
  .subscribe((data) => {

this.listmontants=data ;
    console.log("montants deja payé",data);
    this.totalMontant();
    this. monantrestant();

    

  });

  this.FacturePaymentTypeService.getAllpaymentType().subscribe((data) => {
this.listtypepayment=data ;
    console.log("payment type facture:",data);
   
  });
  // this.Montrestant = parseFloat((this.selectedFacture.totalpricetva -  this.totalMont).toFixed(2) )

  // if(this.Montrestant==0){
  //   this.messageService.add({
  //     severity: "success",
  //     summary: "succés",
  //     detail: "cette facture est totalement payée ",
  //     life: 100000,
  //   });

  // }

  }

  Updatefacture() {

    this.confirmationservice.confirm({
      message: "Êtes-vous sûr de vouloir continuer?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.submitMontantpartiel() ;

    this.submitted = true;
    this.cd.detectChanges();
    this.mapFormValuesToFacure();
      this.servicefacture
        .updateFacture(
          this.activatedRoute.snapshot.params.idFacture,
          this.Facture)
        .subscribe((res) => {
          console.log(res);
        });
      this.messageService.add({
        severity: "success",
        summary: "successful",
        detail: "Facture ADcaisse modifiée ",
      });
      setTimeout(() => {
        this.route.navigate(["/pages/facture/listfactures"]);
      }, 3000);
    },

      reject: (type) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.messageService.add({
              severity: "error",
              summary: "Rejected",
              detail: "You have rejected",
            });
            break;
          case ConfirmEventType.CANCEL:
            this.messageService.add({
              severity: "warn",
              summary: "Annulé",
              detail: "Vous avez annulé",
            });
            break;
        }
      },


  });


    }

    mapFormValuesToFacure() {
      this.Facture.softdelete = this.updatefactform.value.softdelete;
      this.Facture.statusFacture = this.updatefactform.value.statusFacture;
      this.Facture.typeReglement = this.updatefactform.value.typeReglement;
      this.Facture.termsandNotes =this.updatefactform.value.termsandNotes  ;

  }


  
  onChangeToPay(value){

    this.stype = value ;
    console.log("statusType",this.stype)
    if(this.stype === "Paye"){

      console.log("wi")
      this.showTyperReglement=true ;
      this.Facture.typeReglement = this.updatefactform.value.typeReglement;
      this.showMontant=false;
    }
    else if(this.stype === "Partiellement_Paye"){
this.showMontant=true;
this.showTyperReglement=false ;
    }
    else{

      this.showTyperReglement=false ;
      this.showMontant=false;
    }
  }

  showsavedialog(){
this.displaysaveDialog=true ;
  }

  showsavediag2(){
    this.displaysaveDialog=true ;
  }


  submitMontantpartiel(){
    this.Montantpartiel.montant = this.montantform.value.Montant;
    this.Montantpartiel.dateCreation=this.montantform.value.dateCreation;
    this.Montantpartiel.paymentType=this.montantform.value.paymentT;
    this.Montantpartiel.checkNumber=this.montantform.value.chequenumb;
    // this.cd.detectChanges();
    console.log("paymentType works ?",     this.Montantpartiel.paymentType)

    console.log("montepar", this.Montantpartiel.montant)
    this.montantservice.addMontantPartielle(this.Montantpartiel,
        this.activatedRoute.snapshot.params.idFacture
       )
      .subscribe((res) => {console.log(res); });
  }

  closedialog(){

    this.displaysaveDialog=false ;
    this.messageService.add({
      severity: "success",
      summary: "successful",
      detail: "Montant ajouté ! confirmer le process avec le bouton modifer svp. ",
      life: 3000,
    });
    this.msgs1 = [
      {severity:'info', summary:'Info', detail:'Montant ajouté ! confirmer le process avec le bouton modifer svp.'},
  ];
  }


  // calc() {
  //   this.totalPartiel = 0;
  //   for (this.i = 0; this.i < this.listmontants.length; this.i++) {
  //     this.totalPartiel =
  //       this.totalPartiel +
  //       this.Montantpartiel[this.i].montant
  //   }
  //   console.log("totalprice", this.totalPartiel);
  // }


  ArchiverMontant(idMontant: String) {
    this.confirmationservice.confirm({
      message: "vous êtes sur d'archiver ce Montant",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.montantservice.ArchiverMontant(idMontant).subscribe((data) =>
          this.montantservice.getMontantByIdFacture(this.activatedRoute.snapshot.params.idFacture).subscribe((res) => {
            this.listmontants = res;

          })
        );
        this.messageService.add({
          severity: "success",
          summary: "succés",
          detail: "Montant archiver",
          life: 2000,
        });
      },
    });




  }




  totalMontant() {
    this.totalMont = 0;
    for (this.i = 0; this.i < this.listmontants.length; this.i++) {
      this.totalMont = this.totalMont + this.listmontants[this.i].montant
      console.log("totalmontant", this.totalMont);
    }
  }

  monantrestant(){
this.Montrestant = parseFloat((this.selectedFacture.totalpricetva -  this.totalMont).toFixed(2) )
  }

onChangepaimentType(value){
  this.paytype = value ;
  console.log("statusType",this.paytype)
  if(this.paytype === "chéque"){
    console.log("wi")
    this.showpaymentType=true ;
    this.Montantpartiel.paymentType =this.montantform.value.
    this.Montantpartiel.checkNumber = this.montantform.value.chequenumb;
  }
  else if(this.stype === "Partiellement_Paye"){
this.showpaymentType=false ;
  }
  else{
    this.showpaymentType=false ;
  }
}
  }

