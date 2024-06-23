import { ChangeDetectorRef, Component, Input, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NbSortDirection, NbSortRequest } from "@nebular/theme";
import { ConfirmationService, MessageService, SortEvent } from "primeng/api";
import { PartenaireBprice } from "../../../@core/data/PartenaireBprice";
import { Sms } from "../../../@core/data/Sms";
import { PartenairesService } from "../../../@core/mock/partenaires.service";
import { SmsService } from "../../../@core/mock/sms.service";

@Component({
  selector: "ngx-smsing",
  templateUrl: "./smsing.component.html",
  styleUrls: ["./smsing.component.scss"],
  providers: [ConfirmationService, MessageService],
})
export class SmsingComponent implements OnInit {
  selectedPartner: PartenaireBprice;
  display: boolean = false;
  idPartner: string;
  clientsToSendSMS: any[] = [];
  partenaire: PartenaireBprice = new PartenaireBprice();
  customColumn = "name";
  defaultColumns = ["nom", "prenom", "isconnected"];
  allColumns = [this.customColumn, ...this.defaultColumns];
  getShowOn(index: number) {
    const minWithForMultipleColumns = 400;
    const nextColumnStep = 100;
    return minWithForMultipleColumns + nextColumnStep * index;
  }
  sortColumn: string;
  sortDirection: NbSortDirection = NbSortDirection.NONE;
  updateSort(sortRequest: NbSortRequest): void {
    this.sortColumn = sortRequest.column;
    this.sortDirection = sortRequest.direction;
  }
  getSortDirection(column: string): NbSortDirection {
    if (this.sortColumn === column) {
      return this.sortDirection;
    }
    return NbSortDirection.NONE;
  }
  first: number = 0;
  clients: any[] = [];
  clientsInital: any[] = [];
  selectLogo: boolean = false;
  searchText: string;
  filters: Object;
  sms: Sms = new Sms();
  currentDate: Date = new Date();
  partenaires: PartenaireBprice[];
  smsToSendForm: FormGroup = new FormGroup({
    sender: new FormControl("", Validators.required),
    body: new FormControl("", Validators.required),
  });
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;

  users: any[] = [];
  filteredUsers: any[] = [];
  constructor(
    private partenaireService: PartenairesService,
    private serviceSMS: SmsService,
    private ref: ChangeDetectorRef,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.partenaireService.getTheAllpartners().subscribe((res) => {
      this.partenaires = res;
    });
    this.filteredUsers =
      this.filteredUsers.length > 0 ? this.filteredUsers : this.clients;
  }
  onSelectPartenaire(event) {
    this.partenaireService
      .getOnePartenaireById(event.value)
      .subscribe((res) => {
        console.log(res);
        this.partenaire = res["objectResponse"];
        this.selectLogo = true;
      });
    this.clients = [];
    this.serviceSMS.getAllClientByIdPartenaire(event.value).subscribe((res) => {
      console.log(res);
      console.log(res["objectResponse"]);
      this.clients = res["objectResponse"];

      this.clientsInital = res["objectResponse"];
      if (this.clients?.length == undefined) {
        this.messageService.add({
          severity: "warn",
          summary: "La liste des clients est vide",
        });
      }
    });
  }
  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === "string" && typeof value2 === "string")
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
  ngOnChanges(): void {
    if (this.groupFilters) this.filterUserList(this.groupFilters, this.clients);
  }
  filterUserList(filters: any, users: any): void {
    this.clients = this.clientsInital;
    this.filteredUsers = this.clients; //Reset User List

    const keys = Object.keys(filters);
    const filterUser = (client) =>
      keys.every((key) =>
        String(client[key])
          .toLowerCase()
          .includes(String(filters[key]).toLowerCase())
      );

    this.clients = this.clients.filter(filterUser);
  }

  envoyer() {
    if (
      this.clientsToSendSMS?.length == 0 ||
      this.clientsToSendSMS?.length == undefined
    ) {
      this.messageService.add({
        severity: "error",
        summary: "La liste des clients est vide",
        detail: "Veuillez sélectionner au moins 1 client",
      });
    } else {
      console.log(this.clientsToSendSMS?.length);
      this.display = true;
    }
  }
  annulerEnvoeySMS() {
    this.display = false;
  }
  EnvoyerClientsSMS() {
    this.confirmationService.confirm({
      message:
        "Etes vous sur d'envoyer un SMS à " +
        this.clientsToSendSMS?.length +
        " clients " +
        this.clientsToSendSMS?.length * 150 +
        "  millimes",
      header: "confirmer",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.clientsToSendSMS.forEach((element) => {
          this.sms.body = this.smsToSendForm.value.body;
          this.sms.sender = this.partenaire.raisonSociale;
          this.sms.receiver = element.nTel;
          this.serviceSMS
            .createSMSForClientsOfPartner(
              this.sms,
              this.partenaire.idPartenaire
            )
            .subscribe((res) => {
              console.log(res);
            });
        });
      },
    });
  }
  mapValuesToSMS() {}
}
