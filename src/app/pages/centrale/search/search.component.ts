import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { FormBuilder, FormControl, FormGroup } from "@angular/forms";

@Component({
  selector: "ngx-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
})
export class SearchComponent implements OnInit {
  form: FormGroup;

  @Output() autoSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();
  searchText: string;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      nom: new FormControl(""),
      genre: new FormControl(""),
      isconnected: new FormControl(""),
      isActive: new FormControl(""),
    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === "" ? delete filters[key] : key
    );
    this.groupFilters.emit(filters);
  }
}
