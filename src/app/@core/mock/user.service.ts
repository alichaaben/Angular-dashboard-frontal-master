import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtResponse } from "../data/JwtResponse";
import { UserDto } from "../data/User";
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" }),
};
@Injectable({
  providedIn: "root",
})
export class UserService {
  private addUserURL = "http://localhost:6039/v1/signUp";
  constructor(private userhttp: HttpClient, private router: Router) {}
  addUser(user: UserDto) {
    return this.userhttp
      .post<JwtResponse>(this.addUserURL, user, httpOptions)
      .pipe((data) => {
        return data;
      });
  }
}
