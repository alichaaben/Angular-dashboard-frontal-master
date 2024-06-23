import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfirmationService } from "primeng/api";
import { MessageService } from "primeng/api";
import { DialogService } from "primeng/dynamicdialog";
import { ModeReglement } from "../../../@core/data/ModeReglement";
import { ModereglementService } from "../../../@core/mock/modereglement.service";
import { ModeReglementComponent } from "../mode-reglement/mode-reglement.component";

@Component({
  selector: "ngx-list-mode-reglement",
  templateUrl: "./list-mode-reglement.component.html",
  styleUrls: ["./list-mode-reglement.component.scss"],
  providers: [ConfirmationService, MessageService, DialogService],
})
export class ListModeReglementComponent implements OnInit {
  listModeReglement: ModeReglement[];
  first: number = 0;
  constructor(
    private route: Router,
    private dialogService: DialogService,
    private modeReglementService: ModereglementService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.modeReglementService.getAllModeReglement().subscribe((res) => {
      console.log(res);
      this.listModeReglement = res;
    });
  }
  navigateAddModeReglement() {
    this.dialogService.open(ModeReglementComponent, {
      header: "Ajouter un nouveau mode de réglement",
      width: "70%",
    });
  }
  deleteModeReglement(idModeReglement) {
    this.confirmationService.confirm({
      message: "Etes vous sûr de supprimer ce mode de réglement  ?",
      header: "confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.modeReglementService
          .deleteModeReglement(idModeReglement)
          .subscribe((res) => {
            this.modeReglementService.getAllModeReglement().subscribe((res) => {
              this.listModeReglement = res;
              this.messageService.add({
                severity: "success",
                summary: "succés",
                detail: "Mode de réglement supprimé",
                life: 2000,
              });
            });
          });
      },
    });
  }
  updateModeReglement(idModeReglement: string) {
    this.route.navigate([
      "/pages/mode-reglement/update-mode-reglement/" + idModeReglement,
    ]);
  }
}
