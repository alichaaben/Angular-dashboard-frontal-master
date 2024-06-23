import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizeresponsableguardService implements CanActivate {
  constructor(
    private authservice: AuthenticationService,
    private router: Router,
    public messageService: MessageService
  ) {}
  canActivate() {
    if (
      localStorage.getItem("AuthAuthorities")?.includes(null) ||
      localStorage.getItem("AuthAuthorities") == undefined
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Accés Refusé",
        life: 2000,
      });
      this.router.navigate(["/auth"]);
      return false;
    }
    return true;
  }
}
