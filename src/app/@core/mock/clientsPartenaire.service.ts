import { Injectable } from "@angular/core";

import { Subject } from "rxjs";

@Injectable()
export class UserService {
  setGroupFilter$ = new Subject<any>();
  getGroupFilter = this.setGroupFilter$.asObservable();

  constructor() {}
}
