import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Authenticate } from "../../../@core/data/Authenticate";
import { EmailDetails } from "../../../@core/data/EmailDetails";
import { AuthenticationService } from "../../../@core/mock/authentication.service";
import { SendmailService } from "../../../@core/mock/sendmail.service";
import { TokenstorageService } from "../../../@core/mock/tokenstorage.service";

@Component({
  selector: "ngx-authenticate",
  templateUrl: "./authenticate.component.html",
  styleUrls: ["./authenticate.component.scss"],
  providers: [MessageService],
})
export class AuthenticateComponent implements OnInit {
  email: string = "";
  mailToSend: EmailDetails = new EmailDetails();
  display: boolean = false;
  form: any = {};
  msg = "";
  roles!: string[];
  emailForm: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
  });
  constructor(
    private authservice: AuthenticationService,
    private tokenstorage: TokenstorageService,
    private router: Router,
    private messageService: MessageService,
    private emailService: SendmailService
  ) {}

  ngOnInit(): void {}
  authenticat() {
    this.authservice
      .authenticate(new Authenticate(this.form.username, this.form.password))
      .subscribe(
        (data: any) => {
          this.tokenstorage.saveToken(data.jwttoken);
          localStorage.setItem("Type", data.type);
          this.tokenstorage.saveUsername(data.username);
          this.tokenstorage.saveAuthorities(data.authorities);
          this.router.navigate(["/pages/dashboard"]);
        },
        (error: any) => {
          if (error.status == 500) {
            this.messageService.add({
              severity: "error",
              detail: "Login ou mot de pass invalide !",
            });
          } else if (error.status == 200) {
            this.messageService.add({
              severity: "error",
              detail: "Ce compte est bloqué",
            });
          }
        }
      );
  }
  openDialogForgetPassword() {
    this.display = true;
  }
  envoyerNewPassword() {
    console.log(this.email);
    this.authservice.resetPassword(this.email).subscribe((res) => {
      console.log(this.email);
      console.log(res);
    });
  }
}
