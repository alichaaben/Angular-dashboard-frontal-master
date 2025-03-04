import { ModeReglement } from "./ModeReglement";

export class PointVente {
  idPointVente: string;
  idPartenaire: string;
  designation: string;
  adresse: string;
  enteteTicket: string;
  piedTicket: string;
  Chiffrevirgule: string;
  fReservation: string;
  typePv: string;
  coordX: number;
  coordY: number;
  fActif: number;
  fGestionTable: number;
  fPhotoCateg: number;
  fClavierVirtuel: number;
  fImprimCuisine: number;
  fReImprim: number;
  fPartageAdition: number;
  fEntetePied: number;
  fDetailMontant: number;
  fAffectEmployetoservice: number;
  fAutoriserRecharge: number;
  farretVenteOnline: number;
  fEcranCuisine: number;
  fMobile: number;
  fImpresCateg: number;
  fDispCA: number;
  fImprimeAvP: number;
  fControlCaisse: number;
  modeReglements: ModeReglement[];
  defaultouverture: string;
  differenceautorise: string;
  fprixttc: number;
  faffectcollab: number;
  fdetectPack: number;
  dateMiseCirc: Date;
}
