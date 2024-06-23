import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { PointVente } from "../data/PointVente";

@Injectable()
export class SharedService {
  sharePointVente = new Subject<PointVente[]>();
  sharePointVente$ = this.sharePointVente.asObservable();

  constructor() {}
}
