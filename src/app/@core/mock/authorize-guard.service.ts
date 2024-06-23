import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { AuthenticationService } from "./authentication.service";

@Injectable({
  providedIn: "root",
})
export class AuthorizeGuardService implements CanActivate {
  constructor(
    private router: Router,
    public messageService: MessageService,
    private authservice: AuthenticationService
  ) {}

  canActivate() {
    if (
      localStorage.getItem("AuthAuthorities")?.includes(null) ||
      localStorage.getItem("AuthAuthorities") == undefined ||
      localStorage.getItem("AuthAuthorities")?.includes("RESPONSABLE")
    ) {
      this.messageService.add({
        severity: "error",
        summary: "Accés Refusé",
        life: 2000,
      });
      // this.router.navigate(["/auth"]);
      return false;
    }
    return true;
  }
}
