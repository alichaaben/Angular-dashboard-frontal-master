import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { Localisation } from "../data/Localisation";

@Injectable()
export class sharedLocal {
  customChangeDetector = new Subject<Localisation[]>();
  customChangeDetector$ = this.customChangeDetector.asObservable();

  constructor() {}
}
