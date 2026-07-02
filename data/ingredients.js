// Catalogue des ingrédients connus par l'application.
// Chaque ingrédient : key (identifiant interne), label (affiché en français), he (affiché en hébreu),
// cat (catégorie pour le classement visuel), aliases (mots utilisés pour la reconnaissance depuis
// une liste texte ou une photo — toujours en français, la saisie libre reste en français).
const INGREDIENT_CATEGORIES = [
  { key: "viande", label: "Viandes & volailles", he: "בשר ועוף", icon: "🍗" },
  { key: "poisson", label: "Poissons", he: "דגים", icon: "🐟" },
  { key: "laitier", label: "Produits laitiers & oeufs", he: "מוצרי חלב וביצים", icon: "🧀" },
  { key: "legume", label: "Légumes", he: "ירקות", icon: "🥕" },
  { key: "feculent", label: "Féculents & légumineuses", he: "פחמימות וקטניות", icon: "🍚" },
  { key: "fruit", label: "Fruits & fruits secs", he: "פירות ופירות יבשים", icon: "🍋" },
  { key: "epicerie", label: "Épicerie & condiments", he: "מצרכי מזווה ותבלינים", icon: "🧂" }
];

const INGREDIENTS = [
  // Viandes & volailles
  { key: "poulet_entier", label: "Poulet entier", he: "עוף שלם", cat: "viande", aliases: ["poulet", "poulet entier"] },
  { key: "escalope_poulet", label: "Escalopes de poulet", he: "אסקלופ עוף", cat: "viande", aliases: ["escalope de poulet", "escalopes de poulet", "blanc de poulet"] },
  { key: "cuisses_poulet", label: "Cuisses de poulet", he: "שוקי עוף", cat: "viande", aliases: ["cuisse de poulet", "cuisses de poulet", "pilons de poulet"] },
  { key: "boeuf_hache", label: "Boeuf haché", he: "בקר טחון", cat: "viande", aliases: ["boeuf hache", "viande hachee", "steak hache"] },
  { key: "boeuf_ragout", label: "Boeuf à ragoût", he: "בשר בקר לתבשיל", cat: "viande", aliases: ["boeuf", "boeuf a ragout", "morceaux de boeuf"] },
  { key: "agneau", label: "Agneau", he: "כבש", cat: "viande", aliases: ["agneau", "cotelettes d'agneau", "epaule d'agneau"] },
  { key: "dinde", label: "Dinde", he: "הודו", cat: "viande", aliases: ["dinde", "escalope de dinde", "filet de dinde"] },
  { key: "foie_veau", label: "Foie de veau", he: "כבד עגל", cat: "viande", aliases: ["foie de veau", "foie"] },
  { key: "merguez", label: "Merguez", he: "מרגז", cat: "viande", aliases: ["merguez", "saucisses merguez"] },

  // Poissons
  { key: "saumon", label: "Saumon", he: "סלמון", cat: "poisson", aliases: ["saumon", "pave de saumon", "filet de saumon"] },
  { key: "thon", label: "Thon", he: "טונה", cat: "poisson", aliases: ["thon", "thon en boite", "thon frais"] },
  { key: "cabillaud", label: "Cabillaud", he: "בקלה", cat: "poisson", aliases: ["cabillaud", "dos de cabillaud"] },

  // Laitiers & oeufs
  { key: "oeufs", label: "Oeufs", he: "ביצים", cat: "laitier", aliases: ["oeuf", "oeufs"] },
  { key: "lait", label: "Lait", he: "חלב", cat: "laitier", aliases: ["lait"] },
  { key: "beurre", label: "Beurre", he: "חמאה", cat: "laitier", aliases: ["beurre"] },
  { key: "creme_fraiche", label: "Crème fraîche", he: "שמנת חמוצה", cat: "laitier", aliases: ["creme fraiche", "creme"] },
  { key: "fromage_rape", label: "Fromage râpé", he: "גבינה מגוררת", cat: "laitier", aliases: ["fromage rape", "gruyere rape", "emmental rape"] },
  { key: "fromage_blanc", label: "Fromage blanc", he: "גבינה לבנה", cat: "laitier", aliases: ["fromage blanc"] },
  { key: "yaourt", label: "Yaourt", he: "יוגורט", cat: "laitier", aliases: ["yaourt", "yaourt nature"] },
  { key: "fromage_chevre", label: "Fromage de chèvre", he: "גבינת עיזים", cat: "laitier", aliases: ["fromage de chevre", "chevre"] },
  { key: "feta", label: "Feta", he: "פטה", cat: "laitier", aliases: ["feta"] },
  { key: "parmesan", label: "Parmesan", he: "פרמזן", cat: "laitier", aliases: ["parmesan"] },
  { key: "mozzarella", label: "Mozzarella", he: "מוצרלה", cat: "laitier", aliases: ["mozzarella"] },
  { key: "mascarpone", label: "Mascarpone", he: "מסקרפונה", cat: "laitier", aliases: ["mascarpone"] },

  // Légumes
  { key: "oignon", label: "Oignon", he: "בצל", cat: "legume", aliases: ["oignon", "oignons"] },
  { key: "ail", label: "Ail", he: "שום", cat: "legume", aliases: ["ail", "gousse d'ail"] },
  { key: "tomate", label: "Tomate", he: "עגבנייה", cat: "legume", aliases: ["tomate", "tomates"] },
  { key: "poivron", label: "Poivron", he: "פלפל", cat: "legume", aliases: ["poivron", "poivrons"] },
  { key: "courgette", label: "Courgette", he: "קישוא", cat: "legume", aliases: ["courgette", "courgettes"] },
  { key: "aubergine", label: "Aubergine", he: "חציל", cat: "legume", aliases: ["aubergine", "aubergines"] },
  { key: "pomme_de_terre", label: "Pomme de terre", he: "תפוח אדמה", cat: "legume", aliases: ["pomme de terre", "pommes de terre", "patate"] },
  { key: "carotte", label: "Carotte", he: "גזר", cat: "legume", aliases: ["carotte", "carottes"] },
  { key: "champignon", label: "Champignons", he: "פטריות", cat: "legume", aliases: ["champignon", "champignons", "champignon de paris"] },
  { key: "epinard", label: "Épinards", he: "תרד", cat: "legume", aliases: ["epinard", "epinards"] },
  { key: "brocoli", label: "Brocoli", he: "ברוקולי", cat: "legume", aliases: ["brocoli", "brocolis"] },
  { key: "chou", label: "Chou", he: "כרוב", cat: "legume", aliases: ["chou"] },
  { key: "poireau", label: "Poireau", he: "כרישה", cat: "legume", aliases: ["poireau", "poireaux"] },
  { key: "potiron", label: "Potiron / Courge", he: "דלעת", cat: "legume", aliases: ["potiron", "courge", "butternut"] },
  { key: "patate_douce", label: "Patate douce", he: "בטטה", cat: "legume", aliases: ["patate douce", "patates douces"] },
  { key: "concombre", label: "Concombre", he: "מלפפון", cat: "legume", aliases: ["concombre"] },
  { key: "salade", label: "Salade verte", he: "חסה", cat: "legume", aliases: ["salade", "laitue"] },
  { key: "petits_pois", label: "Petits pois", he: "אפונה", cat: "legume", aliases: ["petits pois", "petit pois"] },
  { key: "haricots_verts", label: "Haricots verts", he: "שעועית ירוקה", cat: "legume", aliases: ["haricots verts", "haricot vert"] },
  { key: "mais", label: "Maïs", he: "תירס", cat: "legume", aliases: ["mais", "maïs"] },
  { key: "persil", label: "Persil", he: "פטרוזיליה", cat: "legume", aliases: ["persil"] },
  { key: "coriandre", label: "Coriandre fraîche", he: "כוסברה", cat: "legume", aliases: ["coriandre"] },
  { key: "menthe", label: "Menthe fraîche", he: "נענע", cat: "legume", aliases: ["menthe"] },
  { key: "olives", label: "Olives", he: "זיתים", cat: "legume", aliases: ["olives", "olive"] },
  { key: "citron_confit", label: "Citron confit", he: "לימון כבוש", cat: "legume", aliases: ["citron confit"] },
  { key: "avocat", label: "Avocat", he: "אבוקדו", cat: "legume", aliases: ["avocat", "avocats"] },

  // Féculents & légumineuses
  { key: "riz", label: "Riz", he: "אורז", cat: "feculent", aliases: ["riz", "riz basmati"] },
  { key: "pates", label: "Pâtes", he: "פסטה", cat: "feculent", aliases: ["pates", "pâtes", "spaghetti", "penne"] },
  { key: "semoule", label: "Semoule (couscous)", he: "סולת (קוסקוס)", cat: "feculent", aliases: ["semoule", "couscous"] },
  { key: "pois_chiches", label: "Pois chiches", he: "גרגירי חומוס", cat: "feculent", aliases: ["pois chiches", "pois chiche"] },
  { key: "haricots_blancs", label: "Haricots blancs", he: "שעועית לבנה", cat: "feculent", aliases: ["haricots blancs", "haricot blanc"] },
  { key: "lentilles", label: "Lentilles", he: "עדשים", cat: "feculent", aliases: ["lentilles", "lentille"] },
  { key: "gnocchis", label: "Gnocchis", he: "ניוקי", cat: "feculent", aliases: ["gnocchis", "gnocchi"] },
  { key: "vermicelles", label: "Vermicelles", he: "אטריות דקות (וורמיצ'לי)", cat: "feculent", aliases: ["vermicelles", "vermicelle"] },
  { key: "pate_a_tarte", label: "Pâte à tarte", he: "בצק לפאי", cat: "feculent", aliases: ["pate a tarte", "pate brisee", "pate feuilletee"] },
  { key: "pate_a_pizza", label: "Pâte à pizza", he: "בצק לפיצה", cat: "feculent", aliases: ["pate a pizza", "pate pizza"] },
  { key: "pain_pita", label: "Pain pita", he: "פיתה", cat: "feculent", aliases: ["pain pita", "pita"] },
  { key: "pain_burger", label: "Pain à burger", he: "לחמנייה להמבורגר", cat: "feculent", aliases: ["pain a burger", "pain burger", "bun"] },
  { key: "quinoa", label: "Quinoa", he: "קינואה", cat: "feculent", aliases: ["quinoa"] },

  // Fruits & fruits secs
  { key: "citron", label: "Citron", he: "לימון", cat: "fruit", aliases: ["citron", "citrons"] },
  { key: "pomme", label: "Pomme", he: "תפוח עץ", cat: "fruit", aliases: ["pomme", "pommes"] },
  { key: "banane", label: "Banane", he: "בננה", cat: "fruit", aliases: ["banane", "bananes"] },
  { key: "raisins_secs", label: "Raisins secs", he: "צימוקים", cat: "fruit", aliases: ["raisins secs"] },
  { key: "amandes", label: "Amandes", he: "שקדים", cat: "fruit", aliases: ["amandes", "amande"] },
  { key: "dattes", label: "Dattes", he: "תמרים", cat: "fruit", aliases: ["dattes", "datte"] },
  { key: "pignons", label: "Pignons de pin", he: "צנוברים", cat: "fruit", aliases: ["pignons", "pignons de pin"] },

  // Épicerie & condiments
  { key: "huile_olive", label: "Huile d'olive", he: "שמן זית", cat: "epicerie", aliases: ["huile d'olive", "huile olive"] },
  { key: "sel", label: "Sel", he: "מלח", cat: "epicerie", aliases: ["sel"] },
  { key: "poivre", label: "Poivre", he: "פלפל שחור", cat: "epicerie", aliases: ["poivre"] },
  { key: "cumin", label: "Cumin", he: "כמון", cat: "epicerie", aliases: ["cumin"] },
  { key: "paprika", label: "Paprika", he: "פפריקה", cat: "epicerie", aliases: ["paprika"] },
  { key: "curcuma", label: "Curcuma", he: "כורכום", cat: "epicerie", aliases: ["curcuma"] },
  { key: "cannelle", label: "Cannelle", he: "קינמון", cat: "epicerie", aliases: ["cannelle"] },
  { key: "miel", label: "Miel", he: "דבש", cat: "epicerie", aliases: ["miel"] },
  { key: "sucre", label: "Sucre", he: "סוכר", cat: "epicerie", aliases: ["sucre"] },
  { key: "farine", label: "Farine", he: "קמח", cat: "epicerie", aliases: ["farine"] },
  { key: "levure_chimique", label: "Levure chimique", he: "אבקת אפייה", cat: "epicerie", aliases: ["levure chimique", "levure"] },
  { key: "bouillon_legumes", label: "Bouillon de légumes", he: "ציר ירקות", cat: "epicerie", aliases: ["bouillon de legumes", "bouillon legumes"] },
  { key: "bouillon_poulet", label: "Bouillon de poulet (kasher)", he: "ציר עוף (כשר)", cat: "epicerie", aliases: ["bouillon de poulet", "bouillon poulet"] },
  { key: "vinaigre", label: "Vinaigre", he: "חומץ", cat: "epicerie", aliases: ["vinaigre"] },
  { key: "moutarde", label: "Moutarde", he: "חרדל", cat: "epicerie", aliases: ["moutarde"] },
  { key: "ketchup", label: "Ketchup", he: "קטשופ", cat: "epicerie", aliases: ["ketchup"] },
  { key: "mayonnaise", label: "Mayonnaise", he: "מיונז", cat: "epicerie", aliases: ["mayonnaise", "mayo"] },
  { key: "tahin", label: "Tehina", he: "טחינה", cat: "epicerie", aliases: ["tehina", "techina", "tahin", "tahini"] },
  { key: "harissa", label: "Harissa", he: "הריסה", cat: "epicerie", aliases: ["harissa"] },
  { key: "za_atar", label: "Za'atar", he: "זעתר", cat: "epicerie", aliases: ["za'atar", "zaatar"] },
  { key: "vin_blanc", label: "Vin blanc (kasher)", he: "יין לבן (כשר)", cat: "epicerie", aliases: ["vin blanc"] },
  { key: "vin_rouge", label: "Vin rouge (kasher)", he: "יין אדום (כשר)", cat: "epicerie", aliases: ["vin rouge"] },
  { key: "lait_coco", label: "Lait de coco", he: "חלב קוקוס", cat: "epicerie", aliases: ["lait de coco"] },
  { key: "concentre_tomate", label: "Concentré de tomate", he: "רסק עגבניות", cat: "epicerie", aliases: ["concentre de tomate", "concentre tomate"] },
  { key: "tomates_concassees", label: "Tomates concassées (boîte)", he: "עגבניות מרוסקות (קופסה)", cat: "epicerie", aliases: ["tomates concassees", "tomates en boite", "tomates pelees"] },
  { key: "chapelure", label: "Chapelure", he: "פירורי לחם", cat: "epicerie", aliases: ["chapelure"] },
  { key: "thym", label: "Thym", he: "טימין", cat: "epicerie", aliases: ["thym"] },
  { key: "origan", label: "Origan", he: "אורגנו", cat: "epicerie", aliases: ["origan"] },
  { key: "chocolat", label: "Chocolat", he: "שוקולד", cat: "epicerie", aliases: ["chocolat"] },
  { key: "sauce_soja", label: "Sauce soja", he: "רוטב סויה", cat: "epicerie", aliases: ["sauce soja", "sauce soya"] },
  { key: "biscuits_sec", label: "Biscuits secs", he: "ביסקוויטים", cat: "epicerie", aliases: ["biscuits secs", "petits beurre", "biscuits"] },
  { key: "cafe", label: "Café", he: "קפה", cat: "epicerie", aliases: ["cafe", "café soluble"] },
  { key: "cacao", label: "Cacao en poudre", he: "אבקת קקאו", cat: "epicerie", aliases: ["cacao", "cacao en poudre"] }
];

// Ingrédients "de base" supposés toujours disponibles : ils ne comptent pas comme
// ingrédients manquants dans le calcul de correspondance, mais restent affichés dans la recette.
// (sel, poivre, huile d'olive, oignon, ail, épices sèches courantes et condiments de base
// sont des incontournables présents dans presque toutes les cuisines : les compter comme
// "manquants" génère trop de faux négatifs. Les ingrédients plus "structurants" d'une recette
// — farine, bouillon, vin, tahin, lait de coco, chocolat... — restent à cocher.)
const BASIC_INGREDIENTS = [
  "sel", "poivre", "huile_olive", "oignon", "ail",
  "cumin", "paprika", "curcuma", "cannelle", "thym", "origan",
  "moutarde", "vinaigre", "sucre", "miel",
  "ketchup", "mayonnaise", "harissa", "tahin"
];

// Table d'accès rapide
const INGREDIENTS_BY_KEY = Object.fromEntries(INGREDIENTS.map(i => [i.key, i]));

// Renvoie le libellé d'un ingrédient dans la langue actuellement sélectionnée
// (currentLang est défini dans app.js). Retombe sur le français si la traduction
// hébraïque manque pour une raison quelconque.
function ingredientLabel(ing) {
  if (!ing) return "";
  if (typeof currentLang !== "undefined" && currentLang === "he") return ing.he || ing.label;
  return ing.label;
}
function categoryLabel(cat) {
  if (!cat) return "";
  if (typeof currentLang !== "undefined" && currentLang === "he") return cat.he || cat.label;
  return cat.label;
}

// Groupes d'ingrédients interchangeables : si une recette demande l'un des
// éléments d'un groupe, avoir n'importe quel autre élément du même groupe
// suffit (ex : une recette demande des cuisses de poulet, un poulet entier
// convient tout aussi bien, seule la découpe change).
const INGREDIENT_EQUIVALENTS = [
  ["poulet_entier", "escalope_poulet", "cuisses_poulet"],
  ["boeuf_hache", "boeuf_ragout"],
  ["saumon", "thon", "cabillaud"]
];

const EQUIVALENTS_BY_KEY = {};
INGREDIENT_EQUIVALENTS.forEach(group => {
  group.forEach(key => { EQUIVALENTS_BY_KEY[key] = group; });
});

// Ingrédients "génériques" utilisés dans certaines recettes pour rester flexibles :
// une recette qui demande "legume_libre" est satisfaite par N'IMPORTE QUEL légume
// de la liste ci-dessous. Contrairement aux équivalences ci-dessus, ceci est à sens
// unique : avoir une tomate ne rend pas un poivron "possédé" pour une autre recette
// qui demande spécifiquement un poivron.
const VIRTUAL_INGREDIENT_GROUPS = {
  legume_libre: [
    "tomate", "poivron", "courgette", "aubergine", "carotte", "champignon",
    "epinard", "brocoli", "chou", "potiron", "patate_douce", "concombre",
    "haricots_verts", "petits_pois", "mais", "salade", "poireau", "olives"
  ]
};

// Libellés d'affichage pour les ingrédients génériques (ils n'apparaissent pas
// dans la liste à cocher, seulement dans le détail d'une recette).
const PSEUDO_INGREDIENT_LABELS = {
  legume_libre: "Un légume au choix (tomate, poivron, champignon, courgette...)"
};
const PSEUDO_INGREDIENT_LABELS_HE = {
  legume_libre: "ירק לבחירה (עגבנייה, פלפל, פטריות, קישוא...)"
};
function pseudoIngredientLabel(key) {
  if (typeof currentLang !== "undefined" && currentLang === "he") return PSEUDO_INGREDIENT_LABELS_HE[key] || PSEUDO_INGREDIENT_LABELS[key] || key;
  return PSEUDO_INGREDIENT_LABELS[key] || key;
}

// Substitutions "à sens unique" : avoir l'ingrédient de la liste suffit à
// couvrir la demande de la clé, mais pas l'inverse (ex : de la farine permet
// de préparer une pâte maison, donc elle couvre une demande de pâte à pizza —
// mais avoir de la pâte à pizza toute faite ne couvre pas une demande de farine).
const SUBSTITUTES_FOR = {
  pate_a_pizza: ["farine"],
  pate_a_tarte: ["farine"],
  tomates_concassees: ["tomate", "concentre_tomate"]
};

// Vérifie si un ingrédient requis est couvert par le garde-manger, en tenant
// compte des équivalences (ex : poulet_entier couvre une demande de cuisses_poulet),
// des ingrédients génériques (ex : "legume_libre" couvre n'importe quel légume),
// et des substitutions à sens unique (ex : farine couvre une demande de pâte à pizza).
function pantryCovers(pantrySet, requiredKey) {
  if (pantrySet.has(requiredKey)) return true;
  const group = EQUIVALENTS_BY_KEY[requiredKey];
  if (group && group.some(k => pantrySet.has(k))) return true;
  const virtualGroup = VIRTUAL_INGREDIENT_GROUPS[requiredKey];
  if (virtualGroup && virtualGroup.some(k => pantrySet.has(k))) return true;
  const subs = SUBSTITUTES_FOR[requiredKey];
  return !!subs && subs.some(k => pantrySet.has(k));
}
