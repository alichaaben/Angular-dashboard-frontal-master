import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { NotificationAbonnement } from "../data/NotificationAbonnement";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  URLgetAllNotifications = "http://localhost:6039/v1/getAllNotifications";
  URLgetOneNotificationById = "http://localhost:6039/v1/getOneByIdNotif/";
  URLgetOneByIdPartenaireAndTitre =
    "http://localhost:6039/v1/getByIdPartenaireAndTitre/";
  URLCreateNotifications = "http://localhost:6039/v1/createNotifForAllPartners";
  URLDeleteNotification = "http://localhost:6039/v1/deleteNotification/";
  URLDisableNotification = "http://localhost:6039/v1/disableNotification/";
  URLEnableNotification = "http://localhost:6039/v1/enableNotification/";

  constructor(private httpNotification: HttpClient) {}

  getAllNotification() {
    return this.httpNotification.get<NotificationAbonnement[]>(
      this.URLgetAllNotifications
    );
  }
  getOneById(idNotification: string) {
    return this.httpNotification.get<NotificationAbonnement>(
      this.URLgetOneNotificationById + idNotification
    );
  }
  getOneNotificationByIdPartenaireAndTitre(
    idPartenaire: string,
    titre: string
  ) {
    return this.httpNotification.get<NotificationAbonnement>(
      this.URLgetOneByIdPartenaireAndTitre + idPartenaire + "/" + titre
    );
  }
  createNotifcation(notification: NotificationAbonnement) {
    return this.httpNotification.post<Notification>(
      this.URLCreateNotifications,
      notification
    );
  }
  deleteNotification(idNotif: string) {
    return this.httpNotification.delete(this.URLDeleteNotification + idNotif);
  }
  disableNotification(idNotification: string) {
    return this.httpNotification.delete(
      this.URLDisableNotification + idNotification
    );
  }
  enbleNotification(idNotification: string) {
    return this.httpNotification.delete(
      this.URLEnableNotification + idNotification
    );
  }
}
