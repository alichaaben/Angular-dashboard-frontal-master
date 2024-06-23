import { EventEmitter, Injectable, Output } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ClickService {
  @Output() aClickedEvent = new EventEmitter();

  AClicked() {
    this.aClickedEvent.emit();
  }
  constructor() {}
}
