import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { EmailDetails } from '../data/EmailDetails';

@Injectable({
  providedIn: 'root'
})
export class SendmailService {


  sendmailURL='http://localhost:6039/v1/sendMail'
  sendmalwithattach='http://localhost:6039/v1/sendMailWithAttachment'

  constructor(private mailhttp : HttpClient ) { }



  sendmailsimple(mail: EmailDetails): Observable<any>{
    return this.mailhttp.post<EmailDetails>(this.sendmailURL,mail).pipe(catchError(this.handleError))
  }

  sendmailwithattach(mail: EmailDetails): Observable<any>{
    return this.mailhttp.post<EmailDetails>(this.sendmalwithattach,mail);
  }


handleError(err){

  if(err instanceof HttpErrorResponse){


  }else{

  }
  return throwError(err)
;

}

}
