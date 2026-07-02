// Définitions utilisées par le générateur de "suggestions rapides" (app.js).
// Contrairement aux recettes de data/recipes.js (écrites à la main), ces suggestions
// sont composées automatiquement à partir de ce que l'utilisateur a coché : une
// protéine seule, une protéine + un légume, une protéine + tous les légumes cochés,
// des légumes seuls ou en duo, etc.

// "prep" : préposition grammaticalement correcte devant le nom de la protéine
// (ex : "au poulet", "à la dinde", "à l'agneau"), utilisée par les archétypes
// du type "Riz sauté au/à la...", "Pâtes au/à la...", "Wrap au/à la...".
// "deprep" : idem mais pour la forme "de/d'" (ex : "soupe de poulet", "soupe d'agneau").
// "sauces" : liste des clés de SAUCE_DEFS qui forment une association culinaire
// cohérente avec cette protéine. On ne propose PAS systématiquement les 5 sauces
// pour chaque protéine (ex : la merguez se mange avec la harissa, pas au ketchup
// ou à la mayonnaise ; le foie de veau ne se marie avec aucune de ces sauces).
const PROTEIN_DEFS = [
  { key: "poulet_entier", group: ["poulet_entier", "escalope_poulet", "cuisses_poulet"], label: "Poulet", category: "viande", baseKcal: 220, time: 25, prep: "au ", deprep: "de ", sauces: ["moutarde", "ketchup", "mayonnaise", "harissa", "tahin"] },
  { key: "boeuf_hache", group: ["boeuf_hache", "boeuf_ragout"], label: "Boeuf", category: "viande", baseKcal: 260, time: 30, prep: "au ", deprep: "de ", sauces: ["moutarde", "ketchup", "harissa"] },
  { key: "agneau", group: ["agneau"], label: "Agneau", category: "viande", baseKcal: 280, time: 30, prep: "à l'", deprep: "d'", sauces: ["moutarde", "harissa", "tahin"] },
  { key: "dinde", group: ["dinde"], label: "Dinde", category: "viande", baseKcal: 200, time: 25, prep: "à la ", deprep: "de ", sauces: ["moutarde", "ketchup", "mayonnaise"] },
  { key: "merguez", group: ["merguez"], label: "Merguez", category: "viande", baseKcal: 320, time: 20, prep: "à la ", deprep: "de ", sauces: ["harissa"] },
  {
    key: "foie_veau", group: ["foie_veau"], label: "Foie de veau", category: "viande", baseKcal: 200, time: 15, prep: "au ", deprep: "de ", sauces: [],
    note: "Le foie doit être cachérisé (grillé) selon les règles spécifiques avant toute cuisson — vérifiez qu'il provient d'une source cachère certifiée."
  },
  {
    key: "saumon", group: ["saumon", "thon", "cabillaud"], label: "Poisson (saumon / thon / cabillaud)", category: "parve", baseKcal: 210, time: 20, prep: "au ", deprep: "de ", sauces: ["moutarde", "mayonnaise", "harissa", "tahin"],
    note: "Poisson : selon la coutume, à consommer séparément de la viande."
  }
];

// "prep"/"art" : préposition et article grammaticalement corrects devant le nom
// du produit laitier (ex : "au fromage râpé" mais "à la feta"/"à la mozzarella").
const DAIRY_STAR_DEFS = [
  { key: "fromage_rape", label: "Fromage râpé", baseKcal: 160, prep: "au ", art: "le " },
  { key: "fromage_blanc", label: "Fromage blanc", baseKcal: 110, prep: "au ", art: "le " },
  { key: "fromage_chevre", label: "Fromage de chèvre", baseKcal: 180, prep: "au ", art: "le " },
  { key: "feta", label: "Feta", baseKcal: 170, prep: "à la ", art: "la " },
  { key: "parmesan", label: "Parmesan", baseKcal: 170, prep: "au ", art: "le " },
  { key: "mozzarella", label: "Mozzarella", baseKcal: 170, prep: "à la ", art: "la " },
  { key: "mascarpone", label: "Mascarpone", baseKcal: 220, prep: "au ", art: "le " },
  { key: "creme_fraiche", label: "Crème fraîche", baseKcal: 180, prep: "à la ", art: "la " },
  { key: "yaourt", label: "Yaourt", baseKcal: 90, prep: "au ", art: "le " }
];

// Compagnons possibles : les mêmes légumes que "legume_libre", plus les féculents.
const STARCH_KEYS = ["riz", "pates", "pomme_de_terre", "quinoa", "lentilles", "pois_chiches", "semoule", "gnocchis"];
const COMPANION_KEYS = [...VIRTUAL_INGREDIENT_GROUPS.legume_libre, ...STARCH_KEYS];

function companionKcal(key) {
  return STARCH_KEYS.includes(key) ? 90 : 35;
}

// Bases possibles pour une pizza/tarte maison (la pâte toute faite, ou de la
// farine pour préparer une pâte rapide soi-même).
const PIZZA_BASE_KEYS = ["pate_a_pizza", "pate_a_tarte", "farine"];

// Fromages qui font sens en garniture de pizza (fondants/tartinables). Le
// parmesan (plutôt un condiment saupoudré) et la crème fraîche/mascarpone
// (plutôt pour une tarte ou un dessert) en sont volontairement exclus pour
// éviter des suggestions de pizza incohérentes.
const PIZZA_CHEESE_KEYS = ["mozzarella", "feta", "fromage_chevre", "fromage_rape"];

// Légumes/ingrédients qui se mangent bien crus, pour des idées "salade fraîche"
// (par opposition aux idées "poêlée"/"gratin" qui supposent une cuisson).
const FRESH_SALAD_KEYS = ["tomate", "concombre", "poivron", "salade", "avocat", "olives", "carotte"];

// Sauces/condiments de base (toujours disponibles, cf. BASIC_INGREDIENTS) utilisés
// pour proposer plusieurs compositions simples d'une même protéine plutôt qu'une
// seule version "nature" : "à la moutarde", "au ketchup", "à la harissa"...
const SAUCE_DEFS = [
  { key: "moutarde", label: "Moutarde", prep: "à la" },
  { key: "ketchup", label: "Ketchup", prep: "au" },
  { key: "mayonnaise", label: "Mayonnaise", prep: "à la" },
  { key: "harissa", label: "Harissa", prep: "à la" },
  { key: "tahin", label: "Tehina", prep: "à la" }
];

// Pains utilisables pour un wrap/sandwich improvisé.
const WRAP_BREAD_KEYS = ["pain_pita", "pain_burger"];
