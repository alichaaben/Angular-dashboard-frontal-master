import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  NbMediaBreakpointsService,
  NbMenuService,
  NbSidebarService,
  NbThemeService,
} from "@nebular/theme";

import { UserData } from "../../../@core/data/users";
import { LayoutService } from "../../../@core/utils";
import { filter, map, takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { MessageService } from "primeng/api";
import { NotificationService } from "../../../@core/mock/notification.service";
import { NotificationAbonnement } from "../../../@core/data/NotificationAbonnement";
import { DialogService } from "primeng/dynamicdialog";
import { NotifciationsPartenaire } from "./NotifciationsPartenaire";
import { ClickService } from "../../../@core/mock/click.service";
import { NotificationFactureService } from "../../../@core/mock/notification-facture.service";
import { NotificationFacture } from "../../../@core/data/NotificationFacure";
import { Router } from "@angular/router";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
  providers: [DialogService, ClickService],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: string = localStorage.getItem("AuthUsername");
  NotConnected: boolean = true;
  Responsable!: boolean;
  Admin!: boolean;
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly: boolean = false;
  partenaires: PartenaireBprice[];
  currentDate: Date = new Date();
  partenairesNonPaynts: PartenaireBprice[];
  displayBasic: boolean;
  notifications: NotificationAbonnement[];
  notification: NotificationAbonnement = new NotificationAbonnement();
  finalListNotifications: any[];
  date: Date = new Date();
  tag = "logOut";
  //Notificationfacture
  NotifFcturedialog: boolean = false;
  notificationFacture: NotificationFacture = new NotificationFacture();
  FacureNotifications: NotificationFacture[];

  themes = [
    {
      value: "default",
      name: "Light",
    },
    {
      value: "dark",
      name: "Dark",
    },
    {
      value: "cosmic",
      name: "Cosmic",
    },
    {
      value: "corporate",
      name: "Corporate",
    },
  ];

  currentTheme = "default";

  userMenu = [{ title: "Déconnexion" }];
  // userMenu = [{ title: "Profile" }, { title: "Déconnexion" }];

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private themeService: NbThemeService,
    private userService: UserData,
    private layoutService: LayoutService,
    private breakpointService: NbMediaBreakpointsService,
    private servicePartenaire: PartenairesService,
    private messageService: MessageService,
    private serviceNotification: NotificationService,
    private dialogService: DialogService,
    public clickCome: ClickService,
    private factureNotification: NotificationFactureService,
    private route: Router
  ) {}

  ngOnInit() {
    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === "Déconnexion") {
        console.log(".....=> logout");
        this.doLogOut();
      }
    });
    //   console.log("date now", this.date.getHours());
    // if (localStorage.getItem("AuthAuthorities")?.includes("ADMINISTRATOR")) {
    //   this.Admin = true;
    //   this.Responsable = false;
    //   this.NotConnected = false;
    // }
    // if (localStorage.getItem("AuthAuthorities")?.includes("RESPONSABLE")) {
    //   this.Responsable = true;
    //   this.Admin = false;
    //   this.NotConnected = false;
    // }
    // if (localStorage.getItem("AuthAuthorities")?.includes(null)) {
    //   this.Responsable = false;
    //   this.Admin = false;
    //   this.NotConnected = true;
    // }
    this.clickCome.aClickedEvent.subscribe(() => {
      //  console.log("click event detected ");
      this.serviceNotification.getAllNotification().subscribe((res) => {
        //    console.log("notifications", res);
        this.notifications = res;
        // console.log(res);
        this.servicePartenaire.getTheAllpartners().subscribe((res) => {
          this.partenaires = res;
          //  console.log("partenaires", res);
          let idToNumberOfItem = {};
          this.partenaires.forEach(
            ({ idPartenaire, raisonSociale }) =>
              (idToNumberOfItem[idPartenaire] = raisonSociale)
          );

          this.notifications.forEach(
            (item) =>
              (item["raisonSociale"] = idToNumberOfItem[item.idPartenaire])
          );
          this.notifications = this.notifications.filter(function (not) {
            return not.isActif == 1;
          });
          //  console.log("combined and filtred", this.notifications);
        });
      });
    });
    this.serviceNotification.getAllNotification().subscribe((res) => {
      // console.log("notifications", res);
      this.notifications = res;
      // console.log(res);
      this.servicePartenaire.getTheAllpartners().subscribe((res) => {
        this.partenaires = res;
        //console.log("partenaires", res);
        let idToNumberOfItem = {};
        this.partenaires.forEach(
          ({ idPartenaire, raisonSociale }) =>
            (idToNumberOfItem[idPartenaire] = raisonSociale)
        );

        this.notifications.forEach(
          (item) =>
            (item["raisonSociale"] = idToNumberOfItem[item.idPartenaire])
        );
        this.notifications = this.notifications.filter(function (not) {
          return not.isActif == 1;
        });
        // console.log("combined and filtred", this.notifications);
      });
    });

    //NotifFacture
    this.factureNotification.getAllNotificationFacture().subscribe((res) => {
      this.FacureNotifications = res;
      console.log("facturenotif", this.FacureNotifications);
    });

    this.factureNotification.initListNotifcation().subscribe((res) => {
      console.log("notif facture", res);
    });
  }

  navigatefacturedetail(id: string) {
    this.route.navigate(["/pages/facture/listfactures/detailFacture/" + id]);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeTheme(themeName: string) {
    this.themeService.changeTheme(themeName);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, "menu-sidebar");
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  showNotifications() {
    this.displayBasic = true;
    if (this.notifications.length == 0) {
      this.messageService.add({
        severity: "info",
        summary: "Notifcations",
        detail: "Pas de nouveau notifcation",
        life: 2000,
      });
    }
  }

  disbaleNotif(idNotification: string) {
    this.serviceNotification
      .disableNotification(idNotification)
      .subscribe((res) => {
        this.serviceNotification.getAllNotification().subscribe((data) => {
          this.notifications = this.notifications.filter(function (not) {
            return not.isActif == 1;
          });
          this.ngOnInit();
        });
      });
  }
  afficherToutesNotifications() {
    this.displayBasic = false;
    const ref = this.dialogService.open(NotifciationsPartenaire, {
      header: "Toutes les notifications",
      width: "70%",
    });
  }

  showNotificationsFacture() {
    this.NotifFcturedialog = true;
  }
  doLogOut() {
    localStorage.clear();
    this.route.navigate(["/auth"]);
  }
}
