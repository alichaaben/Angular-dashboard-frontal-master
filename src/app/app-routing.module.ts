import { ExtraOptions, RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from "@nebular/auth";
import { AuthenticateComponent } from "./pages/authentification/authenticate/authenticate.component";
import { CreateAccountComponent } from "./pages/authentification/create-account/create-account.component";
import { AuthorizeresponsableguardService } from "./@core/mock/authorizeresponsableguard.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./@core/mock/auth-interceptor.service";

export const routes: Routes = [
  {
    path: "pages",
    loadChildren: () =>
      import("./pages/pages.module").then((m) => m.PagesModule),
    canActivate: [AuthorizeresponsableguardService],
  },

  {
    path: "auth",
    component: NbAuthComponent,
    children: [
      {
        path: "",
        component: AuthenticateComponent,
      },
      {
        path: "login",
        component: AuthenticateComponent,
      },
      {
        path: "register",
        component: CreateAccountComponent,
      },
    ],
  },
  { path: "", redirectTo: "pages", pathMatch: "full" },
  { path: "**", redirectTo: "pages" },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
})
export class AppRoutingModule {}
