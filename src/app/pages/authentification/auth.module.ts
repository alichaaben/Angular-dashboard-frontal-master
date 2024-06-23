import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NbCardModule, NbInputModule } from "@nebular/theme";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { AuthenticateRoutingModule } from "./auth-routing.module";
import { AuthenticateComponent } from "./authenticate/authenticate.component";
import { CreateAccountComponent } from "./create-account/create-account.component";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticateRoutingModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    NbCardModule,
    NbInputModule,
    DialogModule,
  ],
  exports: [],
  declarations: [AuthenticateComponent, CreateAccountComponent],
  providers: [],
})
export class AuthenticateModule {}
