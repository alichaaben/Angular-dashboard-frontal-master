import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
import { Observable } from "rxjs/internal/Observable";
import { Authenticate } from "../data/Authenticate";
import { JwtResponse } from "../data/JwtResponse";
import { TokenstorageService } from "./tokenstorage.service";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
const TOKEN_KEY = "AuthToken";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private authenticateURL = "http://localhost:6039/v1/authenticate";
  private URLResetPassword = "http://localhost:6039/v1/resetPassword/";
  private URLgetListUsers = "http://localhost:6039/v1/getAllUsers";
  constructor(
    private authhttp: HttpClient,
    private tokenstorage: TokenstorageService,
    private router: Router
  ) {
    //this.user = new User();
    this.currentUserSubject = new BehaviorSubject<any>(
      sessionStorage.getItem(TOKEN_KEY)
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  authenticate(authenticate: Authenticate) {
    return this.authhttp
      .post<JwtResponse>(this.authenticateURL, authenticate, httpOptions)

      .pipe((data) => {
        this.authenticate;
        return data;
      });
  }
  resetPassword(email: string) {
    return this.authhttp.get(this.URLResetPassword + email, {
      responseType: "text",
    });
  }
  getListOfUsers() {
    return this.authhttp.get<any[]>(this.URLgetListUsers);
  }
}
