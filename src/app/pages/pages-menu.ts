import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Dashboard",
    icon: "shopping-cart-outline",
    link: "/pages/dashboard",
    home: true,
  },
  {
    title: "Partenaires",
    icon: "person-outline",
    link: "/pages/partenaires/list-partenaires",
  },
  {
    title: "Points de vente",
    icon: "shopping-cart-outline",
    link: "/pages/points-vente/list-points-vente",
  },
  {
    title: "Abonnements",
    icon: "archive-outline",
    link: "/pages/abonnements/list-abonnements",
  },

  {
    title: "Modes de règlement",
    icon: "activity-outline",
    link: "/pages/mode-reglement/list-mode-reglement",
  },
  {
    title: "Facture",
    icon: "book-open-outline",
    link: "/pages/facture/listfactures",
  },

  {
    title: "Produit",
    icon: "shopping-bag-outline",
    link: "/pages/facture/Produits",
  },
  {
    title: "Version Update",
    icon: "cloud-upload-outline",
    link: "/pages/appversion/Ajouterappversion",
  },

  {
    title: "Localisation des partenaires",
    icon: "map-outline",
    link: "/pages/maps/gmaps",
  },
  {
    title: "Sms et push notifications",
    icon: "email-outline",
    link: "/pages/centrale/smsing",
  },
  {
    title: "Gestion des utilisateurs",
    icon: "person-add-outline",
    link: "/pages/users/list-utilisateurs",
  },
  {
    title: "Analytique ADcaisse",
    icon: "pie-chart-outline",
    children: [
      {
        title: "Analytique partenaires",
        link: "/pages/charts/chartjs",
      },
      {
        title: "Analytique factures",
        link: "/pages/charts/d3",
      },
    ],
  },
];
