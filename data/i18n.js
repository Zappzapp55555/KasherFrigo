// Traductions de l'interface (français / hébreu).
// IMPORTANT : seule l'INTERFACE (menus, boutons, libellés, ingrédients) est
// traduite. Les recettes elles-mêmes (noms, notes, étapes de préparation)
// restent en français quelle que soit la langue choisie — les traduire toutes
// (100+ recettes) est un chantier séparé, bien plus lourd.
const LANG_STORAGE_KEY = "kasherFrigo.lang";

const UI_STRINGS = {
  fr: {
    headerSubtitle: "Des recettes 100% kasher avec ce qu'il vous reste sous la main",
    langToggleLabel: "Passer en hébreu",
    sectionIngredientsTitle: "1. Vos ingrédients",
    tabChecklist: "☑️ Cocher",
    tabTextlist: "📝 Liste texte",
    tabPhoto: "📷 Photo",
    searchPlaceholder: "Rechercher un ingrédient... ou le nom d'une recette (couscous, pkaila...)",
    textlistHint: "Collez ou tapez votre liste : un ingrédient par ligne, ou séparés par des virgules.",
    textlistPlaceholder: "ex : poulet, oignons, riz, tomates, citron...",
    addToIngredientsBtn: "Ajouter à mes ingrédients",
    photoHint: "Prenez une photo ou choisissez une image de vos aliments. La reconnaissance se fait directement sur votre téléphone, aucune photo n'est envoyée sur internet.",
    choosePhotoBtn: "📷 Choisir une photo",
    basicsHint: "💡 Sel, poivre, huile d'olive, oignon, ail, épices sèches courantes (cumin, paprika, curcuma, cannelle, thym, origan) et condiments de base (moutarde, vinaigre, sucre, miel) sont supposés toujours disponibles : inutile de les cocher, ils ne comptent jamais comme ingrédients manquants.",
    clearAllBtn: "Tout effacer",
    sectionTypeTitle: "2. Quel type de plat ?",
    typeHint: "Choisissez la catégorie de cacherout avant de voir les recettes possibles.",
    typeViandeName: "Bessari", typeViandeSub: "(viande)",
    typeLaitName: "Halavi", typeLaitSub: "(lait)",
    typeParveName: "Parve", typeParveSub: "(neutre)",
    typeTousName: "Tous", typeTousSub: "les types",
    sectionResultsTitle: "3. Recettes classiques",
    resultsHint: "Recettes rédigées, réalisables avec uniquement les ingrédients que vous avez cochés (aucun ingrédient manquant).",
    resultsEmptyDefault: "Sélectionnez vos ingrédients ci-dessus pour découvrir vos recettes.",
    resultsEmptyNoMatch: "Aucune recette ne peut être réalisée uniquement avec les ingrédients cochés pour ce type de plat. Ajoutez d'autres ingrédients, ou changez de type.",
    sectionGeneratedTitle: "4. 💡 Idées rapides avec vos ingrédients",
    generatedHint: "Combinaisons générées à partir de ce que vous avez coché : une protéine seule, une protéine avec un ou plusieurs légumes, des légumes seuls ou en duo, etc. Recettes simples, à ajuster selon votre goût.",
    generatedEmptyDefault: "Cochez des ingrédients pour voir apparaître des idées.",
    generatedEmptyNoMatch: "Aucune suggestion pour ce type de plat avec vos ingrédients actuels.",
    footerText: "Application 100% locale : vos ingrédients et vos photos restent sur votre téléphone.",
    recipeContentNotice: "(recette en français)",

    pantryCountZero: "0 ingrédient sélectionné",
    pantryCountOne: "1 ingrédient sélectionné",
    pantryCountMany: "{{n}} ingrédients sélectionnés",

    kashrutBlockedMeat: "🚫 \"{{label}}\" n'a pas été ajouté : impossible de mélanger viande et lait (interdit en cacherout). Retirez d'abord vos produits laitiers.",
    kashrutBlockedDairy: "🚫 \"{{label}}\" n'a pas été ajouté : impossible de mélanger viande et lait (interdit en cacherout). Retirez d'abord votre viande.",

    recipeSearchHintOne: "🔎 Recette trouvée :",
    recipeSearchHintMany: "🔎 Recettes trouvées :",

    parseWriteAtLeastOne: "Écrivez au moins un ingrédient.",
    parseRecognized: "✅ Reconnus ({{n}}) : {{labels}}",
    parseBlocked: "🚫 Non ajoutés (mélange viande/lait interdit en cacherout) : {{labels}}",
    parseUnrecognized: "⚠️ Non reconnu : \"{{text}}\". Ajoutez-le manuellement dans l'onglet « Cocher » si besoin.",
    parseNoneRecognized: "Aucun ingrédient reconnu dans ce texte.",

    photoLoadingModel: "⏳ Chargement du modèle de reconnaissance (nécessite internet la première fois)...",
    photoAnalyzing: "🔍 Analyse de la photo en cours...",
    photoNoneDetected: "Aucun ingrédient reconnu avec certitude sur cette photo. La reconnaissance fonctionne mieux avec des fruits et légumes bien visibles. Essayez une autre photo, ou utilisez la liste texte / le cochage manuel.",
    photoDetected: "✅ Détecté : {{items}}. Vérifiez et ajustez si besoin dans l'onglet « Cocher ».",
    photoBlocked: "🚫 Non ajoutés (mélange viande/lait interdit en cacherout) : {{labels}}",
    photoLoadError: "⚠️ Impossible de charger la reconnaissance d'image (connexion internet requise la première fois). Utilisez plutôt la liste texte ou le cochage manuel.",
    photoAlt: "Photo des aliments",

    badgeReady: "✅ Vous avez tout !",
    tagGenerated: "💡 Suggestion rapide",
    lastMadeBadge: "🕒 Faite le {{date}}",

    modalIngredientsTitle: "Ingrédients",
    modalStepsTitle: "Préparation",
    modalMeta: "⏱ {{time}} min · 🍽 {{servings}} personnes · 🔥 {{calories}} kcal/portion (estimation)",
    modalLastMadeText: "Dernière fois préparée : {{date}}",
    modalNeverMade: "Vous n'avez pas encore indiqué avoir préparé cette recette.",
    modalMarkMadeBtn: "✅ Je viens de la faire"
  },

  he: {
    headerSubtitle: "מתכונים כשרים ב-100% עם מה שנשאר לכם בבית",
    langToggleLabel: "עבור לצרפתית",
    sectionIngredientsTitle: "1. המצרכים שלכם",
    tabChecklist: "☑️ סימון",
    tabTextlist: "📝 רשימת טקסט",
    tabPhoto: "📷 תמונה",
    searchPlaceholder: "חיפוש מצרך... או שם מתכון (קוסקוס, פקיילה...)",
    textlistHint: "הדביקו או הקלידו רשימה: מצרך אחד בכל שורה, או מופרדים בפסיקים.",
    textlistPlaceholder: "לדוגמה: עוף, בצל, אורז, עגבניות, לימון...",
    addToIngredientsBtn: "הוספה למצרכים שלי",
    photoHint: "צלמו תמונה או בחרו תמונה של המצרכים שלכם. הזיהוי מתבצע ישירות בטלפון שלכם, שום תמונה לא נשלחת לאינטרנט.",
    choosePhotoBtn: "📷 בחירת תמונה",
    basicsHint: "💡 מלח, פלפל שחור, שמן זית, בצל, שום, תבלינים יבשים נפוצים (כמון, פפריקה, כורכום, קינמון, טימין, אורגנו) ותוספות בסיסיות (חרדל, חומץ, סוכר, דבש) נחשבים תמיד זמינים: אין צורך לסמן אותם, הם לעולם לא נחשבים מצרכים חסרים.",
    clearAllBtn: "ניקוי הכל",
    sectionTypeTitle: "2. איזה סוג מנה?",
    typeHint: "בחרו את קטגוריית הכשרות לפני הצגת המתכונים האפשריים.",
    typeViandeName: "בשרי", typeViandeSub: "(בשר)",
    typeLaitName: "חלבי", typeLaitSub: "(חלב)",
    typeParveName: "פרווה", typeParveSub: "(נייטרלי)",
    typeTousName: "הכל", typeTousSub: "כל הסוגים",
    sectionResultsTitle: "3. מתכונים קלאסיים",
    resultsHint: "מתכונים כתובים, ניתנים להכנה רק עם המצרכים שסימנתם (ללא שום מצרך חסר).",
    resultsEmptyDefault: "בחרו את המצרכים שלכם למעלה כדי לגלות את המתכונים שלכם.",
    resultsEmptyNoMatch: "אין מתכון שניתן להכין רק עם המצרכים שסומנו עבור סוג המנה הזה. הוסיפו מצרכים נוספים, או שנו את הסוג.",
    sectionGeneratedTitle: "4. 💡 רעיונות מהירים עם המצרכים שלכם",
    generatedHint: "שילובים שנוצרים אוטומטית ממה שסימנתם: חלבון לבד, חלבון עם ירק אחד או יותר, ירקות לבד או בזוגות וכו׳. מתכונים פשוטים, להתאים לטעמכם.",
    generatedEmptyDefault: "סמנו מצרכים כדי לראות רעיונות.",
    generatedEmptyNoMatch: "אין הצעה לסוג המנה הזה עם המצרכים הנוכחיים שלכם.",
    footerText: "אפליקציה מקומית ב-100%: המצרכים והתמונות שלכם נשארים בטלפון שלכם.",
    recipeContentNotice: "(המתכון בצרפתית)",

    pantryCountZero: "0 מצרכים נבחרו",
    pantryCountOne: "מצרך אחד נבחר",
    pantryCountMany: "{{n}} מצרכים נבחרו",

    kashrutBlockedMeat: "🚫 \"{{label}}\" לא נוסף: אי אפשר לערבב בשר וחלב (אסור על פי כשרות). הסירו קודם את מוצרי החלב.",
    kashrutBlockedDairy: "🚫 \"{{label}}\" לא נוסף: אי אפשר לערבב בשר וחלב (אסור על פי כשרות). הסירו קודם את הבשר.",

    recipeSearchHintOne: "🔎 מתכון נמצא:",
    recipeSearchHintMany: "🔎 מתכונים נמצאו:",

    parseWriteAtLeastOne: "כתבו לפחות מצרך אחד.",
    parseRecognized: "✅ זוהו ({{n}}): {{labels}}",
    parseBlocked: "🚫 לא נוספו (ערבוב בשר/חלב אסור על פי כשרות): {{labels}}",
    parseUnrecognized: "⚠️ לא זוהה: \"{{text}}\". הוסיפו זאת ידנית בלשונית « סימון » במידת הצורך.",
    parseNoneRecognized: "לא זוהה אף מצרך בטקסט הזה.",

    photoLoadingModel: "⏳ טוען את מודל הזיהוי (דורש אינטרנט בפעם הראשונה)...",
    photoAnalyzing: "🔍 מנתח את התמונה...",
    photoNoneDetected: "לא זוהה אף מצרך בוודאות בתמונה הזו. הזיהוי עובד טוב יותר עם פירות וירקות גלויים לעין. נסו תמונה אחרת, או השתמשו ברשימת טקסט / בסימון ידני.",
    photoDetected: "✅ זוהו: {{items}}. בדקו והתאימו במידת הצורך בלשונית « סימון ».",
    photoBlocked: "🚫 לא נוספו (ערבוב בשר/חלב אסור על פי כשרות): {{labels}}",
    photoLoadError: "⚠️ לא ניתן לטעון את זיהוי התמונה (נדרש חיבור אינטרנט בפעם הראשונה). השתמשו ברשימת טקסט או בסימון ידני במקום זאת.",
    photoAlt: "תמונת המצרכים",

    badgeReady: "✅ יש לכם הכל!",
    tagGenerated: "💡 הצעה מהירה",
    lastMadeBadge: "🕒 הוכן בתאריך {{date}}",

    modalIngredientsTitle: "מצרכים",
    modalStepsTitle: "הכנה",
    modalMeta: "⏱ {{time}} דק׳ · 🍽 {{servings}} מנות · 🔥 {{calories}} קלוריות למנה (הערכה)",
    modalLastMadeText: "הוכן לאחרונה בתאריך: {{date}}",
    modalNeverMade: "עדיין לא ציינתם שהכנתם את המתכון הזה.",
    modalMarkMadeBtn: "✅ הכנתי את זה עכשיו"
  }
};

// Traductions des catégories d'ingrédients
const INGREDIENT_CATEGORY_LABELS = {
  fr: {
    viande: "Viandes & volailles",
    poisson: "Poissons",
    laitier: "Produits laitiers & oeufs",
    legume: "Légumes",
    feculent: "Féculents & légumineuses",
    fruit: "Fruits & fruits secs",
    epicerie: "Épicerie & condiments"
  },
  he: {
    viande: "בשר ועוף",
    poisson: "דגים",
    laitier: "מוצרי חלב וביצים",
    legume: "ירקות",
    feculent: "עמילנים וקטניות",
    fruit: "פירות ופירות יבשים",
    epicerie: "מכולת ותבלינים"
  }
};

// Traductions des noms d'ingrédients (clés vers labels en deux langues)
const INGREDIENT_LABELS = {
  poulet_entier: { fr: "Poulet entier", he: "עוף שלם" },
  escalope_poulet: { fr: "Escalopes de poulet", he: "קציצות עוף" },
  cuisses_poulet: { fr: "Cuisses de poulet", he: "ירכיים של עוף" },
  boeuf_hache: { fr: "Boeuf haché", he: "בשר בקר טחון" },
  boeuf_ragout: { fr: "Boeuf à ragoût", he: "בשר בקר לעיבוי" },
  agneau: { fr: "Agneau", he: "כבש" },
  dinde: { fr: "Dinde", he: "הודו" },
  foie_veau: { fr: "Foie de veau", he: "כבד עגל" },
  merguez: { fr: "Merguez", he: "מרגז" },
  saumon: { fr: "Saumon", he: "סלמון" },
  thon: { fr: "Thon", he: "טונה" },
  cabillaud: { fr: "Cabillaud", he: "קוד" },
  oeufs: { fr: "Oeufs", he: "ביצים" },
  lait: { fr: "Lait", he: "חלב" },
  beurre: { fr: "Beurre", he: "חמאה" },
  creme_fraiche: { fr: "Crème fraîche", he: "קרם חמוץ" },
  fromage_rape: { fr: "Fromage râpé", he: "גבינה קצוצה" },
  fromage_blanc: { fr: "Fromage blanc", he: "גבינה לבנה" },
  yaourt: { fr: "Yaourt", he: "יוגורט" },
  fromage_chevre: { fr: "Fromage de chèvre", he: "גבינת עיזים" },
  feta: { fr: "Feta", he: "פטה" },
  parmesan: { fr: "Parmesan", he: "פרמזן" },
  mozzarella: { fr: "Mozzarella", he: "מוצרלה" },
  mascarpone: { fr: "Mascarpone", he: "מסקרפונה" },
  oignon: { fr: "Oignon", he: "בצל" },
  ail: { fr: "Ail", he: "שום" },
  tomate: { fr: "Tomate", he: "עגבנייה" },
  poivron: { fr: "Poivron", he: "פלפל" },
  courgette: { fr: "Courgette", he: "קישוא" },
  aubergine: { fr: "Aubergine", he: "חציל" },
  pomme_de_terre: { fr: "Pomme de terre", he: "תפוח אדמה" },
  carotte: { fr: "Carotte", he: "גזר" },
  champignon: { fr: "Champignons", he: "פטריה" },
  epinard: { fr: "Épinards", he: "תרד" },
  brocoli: { fr: "Brocoli", he: "ברוקולי" },
  chou: { fr: "Chou", he: "כרוב" },
  poireau: { fr: "Poireau", he: "פרוק" },
  potiron: { fr: "Potiron / Courge", he: "דלעת" },
  patate_douce: { fr: "Patate douce", he: "בטטה" },
  concombre: { fr: "Concombre", he: "מלפפון" },
  salade: { fr: "Salade verte", he: "עלים ירוקים" },
  petits_pois: { fr: "Petits pois", he: "אפונה" },
  haricots_verts: { fr: "Haricots verts", he: "שעועית ירוקה" },
  mais: { fr: "Maïs", he: "תירס" },
  persil: { fr: "Persil", he: "פטרוזיליה" },
  coriandre: { fr: "Coriandre fraîche", he: "כוסברה" },
  menthe: { fr: "Menthe fraîche", he: "מנטה" },
  olives: { fr: "Olives", he: "זיתים" },
  citron_confit: { fr: "Citron confit", he: "לימון כבוש" },
  avocat: { fr: "Avocat", he: "אבוקדו" },
  riz: { fr: "Riz", he: "אורז" },
  pates: { fr: "Pâtes", he: "פסטה" },
  semoule: { fr: "Semoule (couscous)", he: "סמולינה" },
  pois_chiches: { fr: "Pois chiches", he: "חומוס" },
  haricots_blancs: { fr: "Haricots blancs", he: "שעועית לבנה" },
  lentilles: { fr: "Lentilles", he: "עדשות" },
  gnocchis: { fr: "Gnocchis", he: "ניוקי" },
  vermicelles: { fr: "Vermicelles", he: "פסתות" },
  pate_a_tarte: { fr: "Pâte à tarte", he: "בצק לכיש" },
  pate_a_pizza: { fr: "Pâte à pizza", he: "בצק פיצה" },
  pain_pita: { fr: "Pain pita", he: "לחם פיתה" },
  pain_burger: { fr: "Pain à burger", he: "בול המבורגר" },
  quinoa: { fr: "Quinoa", he: "קינואה" },
  citron: { fr: "Citron", he: "לימון" },
  pomme: { fr: "Pomme", he: "תפוח" },
  banane: { fr: "Banane", he: "בננה" },
  raisins_secs: { fr: "Raisins secs", he: "צימוקים" },
  amandes: { fr: "Amandes", he: "שקדים" },
  dattes: { fr: "Dattes", he: "תמרים" },
  pignons: { fr: "Pignons de pin", he: "אריסה" },
  huile_olive: { fr: "Huile d'olive", he: "שמן זית" },
  sel: { fr: "Sel", he: "מלח" },
  poivre: { fr: "Poivre", he: "פלפל שחור" },
  cumin: { fr: "Cumin", he: "כמון" },
  paprika: { fr: "Paprika", he: "פפריקה" },
  curcuma: { fr: "Curcuma", he: "כורכום" },
  cannelle: { fr: "Cannelle", he: "קינמון" },
  miel: { fr: "Miel", he: "דבש" },
  sucre: { fr: "Sucre", he: "סוכר" },
  farine: { fr: "Farine", he: "קמח" },
  levure_chimique: { fr: "Levure chimique", he: "אבקת האפייה" },
  bouillon_legumes: { fr: "Bouillon de légumes", he: "מרקמה של ירקות" },
  bouillon_poulet: { fr: "Bouillon de poulet (kasher)", he: "מרקמה של עוף" },
  vinaigre: { fr: "Vinaigre", he: "חומץ" },
  moutarde: { fr: "Moutarde", he: "חרדל" },
  ketchup: { fr: "Ketchup", he: "קטשופ" },
  mayonnaise: { fr: "Mayonnaise", he: "מייונז" },
  tahin: { fr: "Tehina", he: "טחינה" },
  harissa: { fr: "Harissa", he: "הריסה" },
  za_atar: { fr: "Za'atar", he: "זעתר" },
  vin_blanc: { fr: "Vin blanc (kasher)", he: "יין לבן" },
  vin_rouge: { fr: "Vin rouge (kasher)", he: "יין אדום" },
  lait_coco: { fr: "Lait de coco", he: "חלב קוקוס" },
  concentre_tomate: { fr: "Concentré de tomate", he: "ריכוז עגבניות" },
  tomates_concassees: { fr: "Tomates concassées (boîte)", he: "עגבניות קצוצות" },
  chapelure: { fr: "Chapelure", he: "פירורי לחם" },
  thym: { fr: "Thym", he: "זעתר" },
  origan: { fr: "Origan", he: "אורגנו" },
  chocolat: { fr: "Chocolat", he: "שוקולד" },
  sauce_soja: { fr: "Sauce soja", he: "סויה" },
  biscuits_sec: { fr: "Biscuits secs", he: "ביסקוויטים" },
  cafe: { fr: "Café", he: "קפה" },
  cacao: { fr: "Cacao en poudre", he: "קקאו" }
};

function getIngredientLabel(key, lang) {
  if (INGREDIENT_LABELS[key] && INGREDIENT_LABELS[key][lang]) {
    return INGREDIENT_LABELS[key][lang];
  }
  return key;
}

// t(key, vars) : renvoie la chaîne traduite pour la langue actuelle (currentLang,
// défini dans app.js), avec substitution des {{variables}}. Retombe sur le
// français si la clé manque dans la langue courante.
function t(key, vars) {
  const lang = (typeof currentLang !== "undefined" && UI_STRINGS[currentLang]) ? currentLang : "fr";
  let str = UI_STRINGS[lang][key] !== undefined ? UI_STRINGS[lang][key] : UI_STRINGS.fr[key];
  if (str === undefined) return key;
  if (vars) {
    Object.keys(vars).forEach(k => {
      str = str.replace(new RegExp("\\{\\{" + k + "\\}\\}", "g"), vars[k]);
    });
  }
  return str;
}
