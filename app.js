// ============================================================================
// Kasher Frigo — logique de l'application
// ============================================================================

const pantry = new Set();      // clés d'ingrédients possédés
let selectedType = "tous";     // "viande" (bessari) | "lait" (halavi) | "parve" | "tous"

// --- Langue de l'interface (français / hébreu), sauvegardée sur l'appareil ---
// Seule l'interface est traduite : les recettes (noms, notes, étapes) restent
// en français quelle que soit la langue choisie (voir data/i18n.js).
let currentLang = "fr";
try {
  currentLang = localStorage.getItem(LANG_STORAGE_KEY) || "fr";
} catch (e) {
  currentLang = "fr";
}

// --- Historique "dernière fois préparée" (sauvegardé sur l'appareil, localStorage) ---
const LAST_MADE_STORAGE_KEY = "kasherFrigo.lastMade";
let lastMadeMap = {};
try {
  lastMadeMap = JSON.parse(localStorage.getItem(LAST_MADE_STORAGE_KEY)) || {};
} catch (e) {
  lastMadeMap = {};
}

function saveLastMade() {
  try { localStorage.setItem(LAST_MADE_STORAGE_KEY, JSON.stringify(lastMadeMap)); } catch (e) { /* stockage indisponible, tant pis */ }
}

function markRecipeMade(recipeId) {
  lastMadeMap[recipeId] = new Date().toISOString();
  saveLastMade();
}

function formatDate(iso) {
  const d = new Date(iso);
  const locale = currentLang === "he" ? "he-IL" : "fr-FR";
  return d.toLocaleDateString(locale, { day: "2-digit", month: "2-digit", year: "numeric" });
}

// Libellés des badges bessari/halavi/parve, traduits selon la langue courante.
// Fonction (et non objet figé) car currentLang peut changer à l'exécution.
function getTypeLabels() {
  return {
    viande: { name: `${t("typeViandeName")} ${t("typeViandeSub")}`, emoji: "🥩", cls: "badge-viande" },
    lait:   { name: `${t("typeLaitName")} ${t("typeLaitSub")}`,      emoji: "🥛", cls: "badge-lait" },
    parve:  { name: t("typeParveName"),                              emoji: "🌿", cls: "badge-parve" }
  };
}

// Le \p{L}/\p{N} (plutôt que a-z0-9) permet à normalize() de fonctionner aussi
// bien avec des lettres hébraïques qu'avec des lettres latines accentuées, pour
// que la recherche d'ingrédients fonctionne quelle que soit la langue affichée.
function normalize(str) {
  return str
    .normalize("NFD").replace(/[̀-ͯ]/g, "") // enlève les accents latins
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Retourne le label d'un ingrédient selon la langue courante (FR/HE).
// `ing` peut être l'objet ingrédient complet ou juste un objet avec une clé `label`.
function ingredientLabel(ing) {
  if (!ing) return "";
  const translated = getIngredientLabel(ing.key, currentLang);
  return translated || ing.label || "";
}

// Retourne le label d'une catégorie selon la langue courante.
function categoryLabel(cat) {
  if (!cat) return "";
  const lang = currentLang === "he" ? "he" : "fr";
  if (INGREDIENT_CATEGORY_LABELS && INGREDIENT_CATEGORY_LABELS[lang] && INGREDIENT_CATEGORY_LABELS[lang][cat.key]) {
    return INGREDIENT_CATEGORY_LABELS[lang][cat.key];
  }
  return cat.label || "";
}

// Retourne le label d'un pseudo-ingrédient (ex: "legume_libre") selon la langue.
function pseudoIngredientLabel(key) {
  if (key === "legume_libre") {
    return currentLang === "he"
      ? "ירק בחירה חופשית (עגבנייה, פלפל, חציל, קישוא...)"
      : "Un légume au choix (tomate, poivron, champignon, courgette...)";
  }
  return key;
}

// ---------------------------------------------------------------------------
// ÉTAPE 1a : Cochage manuel des ingrédients
// ---------------------------------------------------------------------------

function buildIngredientChecklist(filterText = "") {
  const container = document.getElementById("ingredient-groups");
  container.innerHTML = "";
  const norm = normalize(filterText);

  const locale = currentLang === "he" ? "he" : "fr";
  INGREDIENT_CATEGORIES.forEach(cat => {
    const items = INGREDIENTS
      .filter(i => i.cat === cat.key && (!norm || normalize(ingredientLabel(i)).includes(norm)))
      .sort((a, b) => ingredientLabel(a).localeCompare(ingredientLabel(b), locale, { sensitivity: "base" }));
    if (items.length === 0) return;

    const group = document.createElement("div");
    group.className = "ingredient-group";
    group.innerHTML = `<h3>${cat.icon} ${categoryLabel(cat)}</h3>`;

    const grid = document.createElement("div");
    grid.className = "chip-grid";

    items.forEach(ing => {
      const chip = document.createElement("button");
      chip.type = "button";
      chip.className = "chip" + (pantry.has(ing.key) ? " selected" : "");
      chip.textContent = ingredientLabel(ing);
      chip.dataset.key = ing.key;
      chip.addEventListener("click", () => toggleIngredient(ing.key, chip));
      grid.appendChild(chip);
    });

    group.appendChild(grid);
    container.appendChild(group);
  });
}

// ---------------------------------------------------------------------------
// Garde-fou cacherout : impossible de sélectionner en même temps un ingrédient
// viande et un ingrédient laitier (les oeufs sont parve, ils ne comptent pas
// comme laitier même s'ils sont rangés au rayon "Produits laitiers & oeufs").
// ---------------------------------------------------------------------------

const MEAT_KEYS = new Set(INGREDIENTS.filter(i => i.cat === "viande").map(i => i.key));
const DAIRY_KEYS = new Set(INGREDIENTS.filter(i => i.cat === "laitier" && i.key !== "oeufs").map(i => i.key));

function pantryHasMeat(pantrySet) {
  for (const k of pantrySet) if (MEAT_KEYS.has(k)) return true;
  return false;
}
function pantryHasDairy(pantrySet) {
  for (const k of pantrySet) if (DAIRY_KEYS.has(k)) return true;
  return false;
}

// Renvoie un message d'erreur si l'ajout de `key` créerait un mélange viande/lait
// dans le garde-manger, ou null si l'ajout est permis.
function kashrutConflictFor(key) {
  if (MEAT_KEYS.has(key) && pantryHasDairy(pantry)) {
    return t("kashrutBlockedMeat", { label: ingredientLabel(INGREDIENTS_BY_KEY[key]) });
  }
  if (DAIRY_KEYS.has(key) && pantryHasMeat(pantry)) {
    return t("kashrutBlockedDairy", { label: ingredientLabel(INGREDIENTS_BY_KEY[key]) });
  }
  return null;
}

let kashrutWarningTimeout = null;
function showKashrutWarning(message) {
  const el = document.getElementById("kashrut-warning");
  el.textContent = message;
  el.classList.remove("hidden");
  clearTimeout(kashrutWarningTimeout);
  kashrutWarningTimeout = setTimeout(() => el.classList.add("hidden"), 6000);
}

function toggleIngredient(key, chipEl) {
  if (pantry.has(key)) {
    pantry.delete(key);
    if (chipEl) chipEl.classList.remove("selected");
  } else {
    const conflict = kashrutConflictFor(key);
    if (conflict) {
      showKashrutWarning(conflict);
      return;
    }
    pantry.add(key);
    if (chipEl) chipEl.classList.add("selected");
  }
  updatePantryCount();
  renderResults();
}

function updatePantryCount() {
  const el = document.getElementById("pantry-count");
  const n = pantry.size;
  el.textContent = n === 0 ? t("pantryCountZero") : n === 1 ? t("pantryCountOne") : t("pantryCountMany", { n });
  // Rafraîchir l'état visuel des chips (utile après ajout via texte/photo)
  document.querySelectorAll(".chip").forEach(chip => {
    chip.classList.toggle("selected", pantry.has(chip.dataset.key));
  });
}

document.getElementById("clear-pantry").addEventListener("click", () => {
  pantry.clear();
  updatePantryCount();
  renderResults();
});

document.getElementById("ingredient-search").addEventListener("input", (e) => {
  buildIngredientChecklist(e.target.value);
  renderRecipeSearchResults(e.target.value);
});

// Recherche par nom de recette (ex : "couscous", "pkaila", "tfina") directement
// dans la même barre de recherche que les ingrédients.
function renderRecipeSearchResults(query) {
  const container = document.getElementById("recipe-search-results");
  const norm = normalize(query);
  if (!norm) { container.innerHTML = ""; return; }

  const matches = RECIPES.filter(r => normalize(r.name).includes(norm)).slice(0, 8);
  if (matches.length === 0) { container.innerHTML = ""; return; }

  const typeLabels = getTypeLabels();
  const type = (r) => typeLabels[r.category];
  container.innerHTML = `<p class="recipe-search-hint">${matches.length > 1 ? t("recipeSearchHintMany") : t("recipeSearchHintOne")}</p>` +
    matches.map(r => `
      <div class="recipe-search-card" data-id="${r.id}">
        <span class="rs-name">${type(r).emoji} ${r.name}</span>
        <span class="rs-meta">${type(r).name} · ⏱ ${r.time} min</span>
      </div>
    `).join("");

  container.querySelectorAll(".recipe-search-card").forEach(card => {
    card.addEventListener("click", () => {
      const recipe = RECIPES.find(r => r.id === card.dataset.id);
      if (recipe) openRecipeModal(recipe, [], true);
    });
  });
}

// ---------------------------------------------------------------------------
// Onglets (Cocher / Liste texte / Photo)
// ---------------------------------------------------------------------------

document.querySelectorAll(".tab-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-panel").forEach(p => p.classList.add("hidden"));
    btn.classList.add("active");
    document.getElementById("panel-" + btn.dataset.tab).classList.remove("hidden");

    // Changer d'onglet réinitialise les ingrédients sélectionnés, pour repartir
    // sur une liste propre plutôt que de mélanger plusieurs méthodes de saisie.
    pantry.clear();
    updatePantryCount();
    buildIngredientChecklist();
    document.getElementById("ingredient-search").value = "";
    document.getElementById("recipe-search-results").innerHTML = "";

    document.getElementById("text-list-input").value = "";
    document.getElementById("text-parse-result").innerHTML = "";

    document.getElementById("photo-input").value = "";
    document.getElementById("photo-preview").innerHTML = "";
    document.getElementById("photo-status").textContent = "";
    document.getElementById("photo-result").innerHTML = "";

    renderResults();
  });
});

// ---------------------------------------------------------------------------
// ÉTAPE 1b : Liste texte (reconnaissance libre, avec ou sans virgules)
// ---------------------------------------------------------------------------

// Index de tous les alias connus, découpés en mots et triés du plus long au
// plus court (en nombre de mots). Ça permet de reconnaître des ingrédients
// composés de plusieurs mots ("petits pois", "pomme de terre") en priorité,
// avant de tester les alias d'un seul mot — indépendamment de la ponctuation.
function buildAliasIndex() {
  const index = [];
  INGREDIENTS.forEach(ing => {
    ing.aliases.forEach(alias => {
      const words = normalize(alias).split(" ").filter(Boolean);
      if (words.length) index.push({ words, key: ing.key });
    });
  });
  index.sort((a, b) => b.words.length - a.words.length);
  return index;
}
const ALIAS_INDEX = buildAliasIndex();

// Alias d'un seul mot, utilisés pour la correspondance approximative (fautes
// de frappe, lettres doublées comme "pattes" pour "pâtes", accents oubliés...).
// Les accents sont déjà neutralisés par normalize() ; ceci gère en plus les
// petites fautes d'orthographe via une distance de Levenshtein.
const SINGLE_WORD_ALIASES = ALIAS_INDEX.filter(e => e.words.length === 1).map(e => ({ word: e.words[0], key: e.key }));

// Mots français courants à ignorer pour éviter de les faire "matcher" par erreur
// avec un ingrédient à cause de la tolérance aux fautes de frappe.
const STOPWORDS = new Set([
  "de", "du", "des", "le", "la", "les", "un", "une", "et", "ou", "en", "au", "aux",
  "avec", "sans", "pour", "dans", "chez", "sur", "sous", "mais", "donc", "car",
  "ai", "as", "il", "on", "je", "tu", "vous", "nous", "ils", "elles", "elle",
  "ce", "ces", "cet", "cette", "mon", "ma", "mes", "ton", "ta", "tes", "son", "sa", "ses",
  "tout", "tous", "toute", "toutes", "plus", "peu", "bien", "aussi", "reste", "restant",
  "faire", "fait", "faites", "cuisiner", "preparer", "voudrais", "voulez", "veux", "veut",
  "manger", "avoir", "ont", "plat", "recette", "envie", "besoin", "quelque", "quelques"
]);

function levenshteinDistance(a, b) {
  const m = a.length, n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] = a[i - 1] === b[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return dp[m][n];
}

// Tolérance aux fautes proportionnelle à la longueur du mot : plus le mot est
// long, plus on autorise d'écarts (sans quoi les mots courts matcheraient trop
// facilement n'importe quoi).
function fuzzyThreshold(len) {
  if (len <= 5) return 1;
  if (len <= 9) return 2;
  return 3;
}

// Analyse un texte libre (avec ou sans virgules, retours à la ligne, fautes de
// frappe ou accents manquants) et retourne les ingrédients reconnus, en
// consommant les mots au fur et à mesure pour éviter les doubles comptages.
function extractIngredientsFromText(rawText) {
  const words = normalize(rawText).split(/\s+/).filter(Boolean);
  const used = new Array(words.length).fill(false);
  const matchedKeys = [];

  // 1) Correspondance exacte, en priorité sur les expressions les plus longues.
  ALIAS_INDEX.forEach(entry => {
    const n = entry.words.length;
    for (let i = 0; i <= words.length - n; i++) {
      if (used[i]) continue;
      let match = true;
      for (let j = 0; j < n; j++) {
        if (used[i + j] || words[i + j] !== entry.words[j]) { match = false; break; }
      }
      if (match) {
        for (let j = 0; j < n; j++) used[i + j] = true;
        matchedKeys.push(entry.key);
      }
    }
  });

  // 2) Correspondance approximative sur les mots restants (fautes de frappe,
  // lettres doublées, etc.) — on ignore les mots trop courts ou les mots vides usuels.
  words.forEach((word, i) => {
    if (used[i] || word.length < 3 || STOPWORDS.has(word)) return;
    let bestKey = null;
    let bestDist = Infinity;
    let bestThreshold = 0;
    SINGLE_WORD_ALIASES.forEach(({ word: aliasWord, key }) => {
      // Le seuil dépend du plus court des deux mots : un mot cible court (ex. "foie")
      // doit rester strict, sans quoi trop de mots non liés matcheraient par erreur.
      const threshold = fuzzyThreshold(Math.min(word.length, aliasWord.length));
      if (Math.abs(aliasWord.length - word.length) > threshold) return;
      const dist = levenshteinDistance(word, aliasWord);
      if (dist < bestDist) { bestDist = dist; bestKey = key; bestThreshold = threshold; }
    });
    if (bestKey !== null && bestDist <= bestThreshold) {
      used[i] = true;
      matchedKeys.push(bestKey);
    }
  });

  const unmatchedText = words.filter((w, i) => !used[i]).join(" ");
  return { matchedKeys: [...new Set(matchedKeys)], unmatchedText };
}

document.getElementById("parse-text-btn").addEventListener("click", () => {
  const raw = document.getElementById("text-list-input").value;
  const resultEl = document.getElementById("text-parse-result");

  if (!raw.trim()) {
    resultEl.innerHTML = `<p class="parse-warn">${t("parseWriteAtLeastOne")}</p>`;
    return;
  }

  const { matchedKeys, unmatchedText } = extractIngredientsFromText(raw);
  const addedLabels = [];
  const blockedLabels = [];
  matchedKeys.forEach(k => {
    const conflict = kashrutConflictFor(k);
    if (conflict) {
      blockedLabels.push(ingredientLabel(INGREDIENTS_BY_KEY[k]));
    } else {
      pantry.add(k);
      addedLabels.push(ingredientLabel(INGREDIENTS_BY_KEY[k]));
    }
  });

  updatePantryCount();
  buildIngredientChecklist(document.getElementById("ingredient-search").value);
  renderResults();

  let html = "";
  if (addedLabels.length) {
    html += `<p class="parse-ok">${t("parseRecognized", { n: addedLabels.length, labels: addedLabels.join(", ") })}</p>`;
  }
  if (blockedLabels.length) {
    html += `<p class="parse-warn">${t("parseBlocked", { labels: blockedLabels.join(", ") })}</p>`;
  }
  if (unmatchedText) {
    html += `<p class="parse-warn">${t("parseUnrecognized", { text: unmatchedText })}</p>`;
  }
  if (!addedLabels.length && !blockedLabels.length && !unmatchedText) {
    html = `<p class="parse-warn">${t("parseNoneRecognized")}</p>`;
  }
  resultEl.innerHTML = html;
});

// ---------------------------------------------------------------------------
// ÉTAPE 1c : Reconnaissance photo (TensorFlow.js + MobileNet, 100% côté client)
// ---------------------------------------------------------------------------

let mobilenetModelPromise = null;

function loadMobilenet() {
  if (mobilenetModelPromise) return mobilenetModelPromise;

  mobilenetModelPromise = new Promise((resolve, reject) => {
    const tfScript = document.createElement("script");
    tfScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.20.0/dist/tf.min.js";
    tfScript.onload = () => {
      const mnScript = document.createElement("script");
      mnScript.src = "https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js";
      mnScript.onload = () => {
        mobilenet.load().then(resolve).catch(reject);
      };
      mnScript.onerror = () => reject(new Error("mobilenet_load_failed"));
      document.head.appendChild(mnScript);
    };
    tfScript.onerror = () => reject(new Error("tfjs_load_failed"));
    document.head.appendChild(tfScript);
  });

  return mobilenetModelPromise;
}

document.getElementById("photo-input").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const previewEl = document.getElementById("photo-preview");
  const statusEl = document.getElementById("photo-status");
  const resultEl = document.getElementById("photo-result");
  resultEl.innerHTML = "";

  const imgUrl = URL.createObjectURL(file);
  previewEl.innerHTML = `<img src="${imgUrl}" alt="${t("photoAlt")}" class="photo-thumb">`;
  const imgEl = previewEl.querySelector("img");

  statusEl.textContent = t("photoLoadingModel");

  try {
    const model = await loadMobilenet();
    statusEl.textContent = t("photoAnalyzing");

    await new Promise(res => { if (imgEl.complete) res(); else imgEl.onload = res; });

    const predictions = await model.classify(imgEl, 10);
    statusEl.textContent = "";

    const detected = [];
    predictions.forEach(pred => {
      if (pred.probability < IMAGE_RECOGNITION_THRESHOLD) return;
      const classNames = pred.className.split(",").map(s => s.trim());
      for (const cname of classNames) {
        const key = IMAGENET_TO_INGREDIENT[cname] || IMAGENET_TO_INGREDIENT[pred.className];
        if (key && !detected.some(d => d.key === key)) {
          detected.push({ key, prob: pred.probability, label: ingredientLabel(INGREDIENTS_BY_KEY[key]) });
          break;
        }
      }
    });

    if (detected.length === 0) {
      resultEl.innerHTML = `<p class="parse-warn">${t("photoNoneDetected")}</p>`;
      return;
    }

    const addedDetected = [];
    const blockedDetected = [];
    detected.forEach(d => {
      const conflict = kashrutConflictFor(d.key);
      if (conflict) blockedDetected.push(d);
      else { pantry.add(d.key); addedDetected.push(d); }
    });
    updatePantryCount();
    buildIngredientChecklist(document.getElementById("ingredient-search").value);
    renderResults();

    let html = "";
    if (addedDetected.length) {
      html += `<p class="parse-ok">${t("photoDetected", { items: addedDetected.map(d => `${d.label} (${Math.round(d.prob * 100)}%)`).join(", ") })}</p>`;
    }
    if (blockedDetected.length) {
      html += `<p class="parse-warn">${t("photoBlocked", { labels: blockedDetected.map(d => d.label).join(", ") })}</p>`;
    }
    resultEl.innerHTML = html;
  } catch (err) {
    statusEl.textContent = "";
    resultEl.innerHTML = `<p class="parse-warn">${t("photoLoadError")}</p>`;
  }
});

// ---------------------------------------------------------------------------
// ÉTAPE 2 : Type de plat (bessari / halavi / parve / tous)
// ---------------------------------------------------------------------------

document.querySelectorAll(".type-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".type-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    selectedType = btn.dataset.type;
    renderResults();
  });
});

// ---------------------------------------------------------------------------
// ÉTAPE 3 : Résultats
// ---------------------------------------------------------------------------

// Rafraîchit à la fois les recettes classiques ET les suggestions rapides générées.
function renderResults() {
  renderCuratedResults();
  renderGeneratedIdeas();
}

function renderCuratedResults() {
  const listEl = document.getElementById("results-list");
  const emptyEl = document.getElementById("results-empty");
  listEl.innerHTML = "";

  if (pantry.size === 0) {
    emptyEl.textContent = t("resultsEmptyDefault");
    emptyEl.classList.remove("hidden");
    return;
  }

  const wantedType = selectedType === "tous" ? null : selectedType;
  const scored = RECIPES
    .filter(r => !wantedType || r.category === wantedType)
    .map(r => {
      const required = r.ingredients.filter(i => !BASIC_INGREDIENTS.includes(i));
      const missing = required.filter(i => !pantryCovers(pantry, i));
      const have = required.length - missing.length;
      return { r, required, missing, have };
    })
    // On ne garde QUE les recettes réalisables avec uniquement les ingrédients
    // déjà cochés (aucun ingrédient manquant) — pas de correspondance partielle.
    .filter(x => x.missing.length === 0)
    .sort((a, b) => a.required.length - b.required.length || a.r.time - b.r.time);

  if (scored.length === 0) {
    emptyEl.textContent = t("resultsEmptyNoMatch");
    emptyEl.classList.remove("hidden");
    return;
  }

  emptyEl.classList.add("hidden");
  const typeLabels = getTypeLabels();

  scored.forEach(({ r, missing, have }) => {
    const type = typeLabels[r.category];
    const card = document.createElement("div");
    card.className = "recipe-card";
    const readyBadge = `<span class="tag tag-ready">${t("badgeReady")}</span>`;
    const lastMadeIso = lastMadeMap[r.id];
    const lastMadeBadge = lastMadeIso ? `<span class="tag tag-lastmade">${t("lastMadeBadge", { date: formatDate(lastMadeIso) })}</span>` : "";

    card.innerHTML = `
      <div class="recipe-card-header">
        <span class="badge ${type.cls}">${type.emoji} ${type.name}</span>
        <span class="recipe-time">⏱ ${r.time} min · 🔥 ${r.calories} kcal</span>
      </div>
      <h3 class="fr-text">${r.name}</h3>
      ${readyBadge} ${lastMadeBadge}
    `;
    card.addEventListener("click", () => openRecipeModal(r, missing));
    listEl.appendChild(card);
  });
}

// ---------------------------------------------------------------------------
// Générateur de "suggestions rapides" : combine librement ce qui est coché
// (une protéine seule, protéine + 1 légume, protéine + tous les légumes,
// légumes seuls ou en duo, fromage + légumes, oeufs + légumes...) plutôt que
// de dépendre uniquement des recettes rédigées à la main.
// ---------------------------------------------------------------------------

function formatList(labels) {
  if (labels.length === 0) return "";
  if (labels.length === 1) return labels[0];
  return labels.slice(0, -1).join(", ") + " et " + labels[labels.length - 1];
}

// Renvoie : chaque élément seul, chaque paire (si pas trop d'éléments), et
// l'ensemble complet — sans jamais dépasser un nombre raisonnable de combinaisons.
function combosSinglesPairsFull(arr) {
  const combos = [];
  const seen = new Set();
  const add = (c) => {
    const key = [...c].slice().sort().join("|");
    if (!seen.has(key)) { seen.add(key); combos.push(c); }
  };
  arr.forEach(a => add([a]));
  if (arr.length <= 6) {
    for (let i = 0; i < arr.length; i++) {
      for (let j = i + 1; j < arr.length; j++) add([arr[i], arr[j]]);
    }
  }
  if (arr.length > 2) add(arr.slice());
  return combos;
}

// Version allégée : chaque élément seul + l'ensemble complet (sans les paires
// intermédiaires). Utilisée pour les archétypes qui génèrent déjà beaucoup de
// variantes (pizza/tarte, gratin) afin d'éviter une liste trop répétitive.
function combosSinglesAndFull(arr) {
  const combos = arr.map(a => [a]);
  if (arr.length > 1) combos.push(arr.slice());
  return combos;
}

function generateQuickIdeas(pantrySet, wantedType) {
  const ideas = [];
  const companionsPresent = COMPANION_KEYS.filter(k => pantrySet.has(k));
  const companionCombos = combosSinglesPairsFull(companionsPresent);

  // --- Protéine seule, ou protéine + légume(s)/féculent(s) ---
  PROTEIN_DEFS.forEach(protein => {
    if (wantedType && wantedType !== protein.category) return;
    const ownedKey = protein.group.find(k => pantrySet.has(k));
    if (!ownedKey) return;

    const variants = [[]].concat(companionCombos);
    variants.forEach(companions => {
      const companionLabels = companions.map(k => INGREDIENTS_BY_KEY[k].label);
      const name = companions.length === 0
        ? `${protein.label} nature`
        : formatList([protein.label, ...companionLabels]);
      const calories = protein.baseKcal + companions.reduce((s, k) => s + companionKcal(k), 0);
      const steps = [
        "Faire chauffer un peu d'huile d'olive dans une poêle.",
        `Faire cuire ${protein.label.toLowerCase()} à feu moyen jusqu'à ce que ce soit bien doré (ajuster le temps selon l'épaisseur et le type de viande).`
      ];
      if (companions.length) {
        steps.push(`Ajouter ${formatList(companionLabels)} coupé(s) en morceaux, couvrir et poursuivre la cuisson 8 à 10 min.`);
      }
      steps.push("Saler, poivrer et servir chaud.");

      ideas.push({
        id: `gen_${protein.key}_${companions.slice().sort().join("-") || "seul"}`,
        name,
        category: protein.category,
        time: protein.time,
        servings: 4,
        calories,
        ingredients: [ownedKey, ...companions, "huile_olive", "sel", "poivre"],
        steps,
        note: protein.note,
        generated: true
      });
    });

    // --- Compositions simples à la sauce (moutarde, ketchup, mayonnaise, harissa, tahin) ---
    // Ces condiments sont toujours disponibles (BASIC_INGREDIENTS), mais on ne les propose
    // que pour les protéines avec lesquelles ils forment une association culinaire cohérente
    // (cf. protein.sauces) : pas de "merguez au ketchup" ni de "foie de veau à la mayonnaise".
    SAUCE_DEFS.filter(sauce => (protein.sauces || []).includes(sauce.key)).forEach(sauce => {
      ideas.push({
        id: `gen_${protein.key}_sauce_${sauce.key}`,
        name: `${protein.label} ${sauce.prep} ${sauce.label.toLowerCase()}`,
        category: protein.category,
        time: protein.time,
        servings: 4,
        calories: protein.baseKcal + 40,
        ingredients: [ownedKey, sauce.key, "huile_olive", "sel", "poivre"],
        note: protein.note,
        steps: [
          "Faire chauffer un peu d'huile d'olive dans une poêle.",
          `Faire cuire ${protein.label.toLowerCase()} à feu moyen jusqu'à ce que ce soit bien doré.`,
          `Servir accompagné de ${sauce.label.toLowerCase()}, à badigeonner pendant la cuisson ou à côté à table.`
        ],
        generated: true
      });
    });
  });

  // --- Fromage/laitage + légume(s) (halavi) ---
  // Une seule idée par fromage, utilisant TOUS les légumes cochés : la recette
  // reste flexible (utilisez-en un, plusieurs, ou tous), plutôt que de générer
  // une carte séparée pour chaque sous-combinaison possible.
  if (!wantedType || wantedType === "lait") {
    DAIRY_STAR_DEFS.forEach(dairy => {
      if (!pantrySet.has(dairy.key)) return;
      const companions = companionsPresent;
      const companionLabels = companions.map(k => INGREDIENTS_BY_KEY[k].label);
      const calories = dairy.baseKcal + companions.reduce((s, k) => s + companionKcal(k), 0);
      const flexNote = companions.length > 1
        ? `Utilisez un, plusieurs ou la totalité des légumes que vous avez : ${formatList(companionLabels).toLowerCase()}.`
        : undefined;
      ideas.push({
        id: `gen_${dairy.key}_${companions.slice().sort().join("-") || "seul"}`,
        name: companions.length
          ? `Gratin de ${formatList(companionLabels)} ${dairy.prep}${dairy.label.toLowerCase()}`
          : `Gratin de légumes ${dairy.prep}${dairy.label.toLowerCase()}`,
        category: "lait",
        time: 25,
        servings: 4,
        calories,
        ingredients: [dairy.key, ...companions, "huile_olive", "sel", "poivre"],
        note: flexNote,
        steps: [
          companions.length
            ? `Couper ${formatList(companionLabels)} en morceaux et disposer dans un plat huilé (utilisez un ou plusieurs de ces légumes, selon vos envies).`
            : "Couper les légumes de votre choix en morceaux et les disposer dans un plat huilé.",
          `Ajouter ${dairy.art}${dairy.label.toLowerCase()} par-dessus.`,
          "Enfourner 20 min à 190°C jusqu'à coloration."
        ],
        generated: true
      });
    });
  }

  // --- Oeufs seuls ou avec légume(s) (parve) ---
  if ((!wantedType || wantedType === "parve") && pantrySet.has("oeufs")) {
    [[]].concat(companionCombos).forEach(companions => {
      const companionLabels = companions.map(k => INGREDIENTS_BY_KEY[k].label);
      const calories = 160 + companions.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_oeufs_${companions.slice().sort().join("-") || "seul"}`,
        name: companions.length === 0 ? "Omelette nature" : `Omelette aux ${formatList(companionLabels)}`,
        category: "parve",
        time: 10,
        servings: 2,
        calories,
        ingredients: ["oeufs", ...companions, "huile_olive", "sel", "poivre"],
        steps: [
          companions.length
            ? `Faire revenir ${formatList(companionLabels)} coupé(s) en morceaux dans un peu d'huile.`
            : "Faire chauffer un peu d'huile dans une poêle.",
          "Battre les oeufs avec sel et poivre, verser dans la poêle.",
          "Cuire à feu doux jusqu'à ce que l'omelette soit prise."
        ],
        generated: true
      });
    });
  }

  // --- Pizza / tarte maison (une base + garnitures, avec ou sans fromage) ---
  // Comme pour le gratin : une seule idée par fromage disponible, avec TOUS les
  // légumes cochés proposés comme garniture au choix (pas une carte par sous-combinaison).
  const pizzaBaseKey = PIZZA_BASE_KEYS.find(k => pantryCovers(pantrySet, k));
  if (pizzaBaseKey) {
    const toppingKeys = companionsPresent.filter(k => !STARCH_KEYS.includes(k));
    const baseLabel = INGREDIENTS_BY_KEY[pizzaBaseKey] ? INGREDIENTS_BY_KEY[pizzaBaseKey].label : "pâte";
    const doughNote = pizzaBaseKey === "farine" ? "Avec de la farine, préparez une pâte rapide (farine, eau, huile, une pincée de sel) à défaut de pâte toute faite. " : "";
    const toppingLabels = toppingKeys.map(k => INGREDIENTS_BY_KEY[k].label);

    if (!wantedType || wantedType === "lait") {
      DAIRY_STAR_DEFS.filter(d => PIZZA_CHEESE_KEYS.includes(d.key)).forEach(dairy => {
        if (!pantrySet.has(dairy.key)) return;
        const calories = 220 + dairy.baseKcal + toppingKeys.reduce((s, k) => s + companionKcal(k), 0);
        ideas.push({
          id: `gen_pizza_${dairy.key}_${toppingKeys.slice().sort().join("-") || "seul"}`,
          name: toppingKeys.length
            ? `Pizza maison ${dairy.prep}${dairy.label.toLowerCase()} (${formatList(toppingLabels).toLowerCase()})`
            : `Pizza maison ${dairy.prep}${dairy.label.toLowerCase()}`,
          category: "lait",
          time: 30,
          servings: 4,
          calories,
          ingredients: [pizzaBaseKey, dairy.key, ...toppingKeys, "huile_olive", "sel"],
          note: (doughNote + (toppingKeys.length > 1 ? "Vous pouvez aussi n'utiliser qu'une partie de ces garnitures si vous préférez." : "")).trim() || undefined,
          steps: [
            `Étaler la pâte (${baseLabel.toLowerCase()}) dans un plat huilé.`,
            toppingKeys.length
              ? `Répartir ${formatList(toppingLabels).toLowerCase()} coupé(s) en morceaux sur la pâte.`
              : "La pâte peut rester nature ou être garnie selon vos envies.",
            `Ajouter ${dairy.art}${dairy.label.toLowerCase()} par-dessus.`,
            "Enfourner 15 à 20 min à 200°C jusqu'à ce que ce soit doré."
          ],
          generated: true
        });
      });
    }

    if ((!wantedType || wantedType === "parve") && toppingKeys.length) {
      const calories = 200 + toppingKeys.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_tarteparve_${toppingKeys.slice().sort().join("-")}`,
        name: `Tarte fine aux légumes (${formatList(toppingLabels).toLowerCase()})`,
        category: "parve",
        time: 25,
        servings: 4,
        calories,
        ingredients: [pizzaBaseKey, ...toppingKeys, "huile_olive", "sel"],
        note: (doughNote + (toppingKeys.length > 1 ? "Vous pouvez aussi n'utiliser qu'une partie de ces légumes si vous préférez." : "")).trim() || undefined,
        steps: [
          `Étaler la pâte (${baseLabel.toLowerCase()}) dans un plat huilé.`,
          `Répartir ${formatList(toppingLabels).toLowerCase()} coupé(s) en fines tranches par-dessus.`,
          "Arroser d'un filet d'huile d'olive, saler.",
          "Enfourner 20 min à 200°C."
        ],
        generated: true
      });
    }
  }

  // --- Soupe (bouillon de poulet ou de légumes) ---
  const soupCompanions = companionsPresent.filter(k => !STARCH_KEYS.includes(k));
  const soupCompanionLabels = soupCompanions.map(k => INGREDIENTS_BY_KEY[k].label);
  if (pantrySet.has("bouillon_poulet") && (!wantedType || wantedType === "viande")) {
    PROTEIN_DEFS.filter(p => p.category === "viande").forEach(protein => {
      const ownedKey = protein.group.find(k => pantrySet.has(k));
      if (!ownedKey) return;
      const calories = protein.baseKcal - 40 + soupCompanions.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_soupe_${protein.key}`,
        name: soupCompanions.length
          ? `Soupe ${protein.deprep}${protein.label.toLowerCase()} aux légumes (${formatList(soupCompanionLabels).toLowerCase()})`
          : `Soupe ${protein.deprep}${protein.label.toLowerCase()}`,
        category: "viande",
        time: 35,
        servings: 4,
        calories,
        ingredients: [ownedKey, "bouillon_poulet", ...soupCompanions, "huile_olive", "sel", "poivre"],
        note: soupCompanions.length > 1
          ? `Utilisez un, plusieurs ou la totalité de ces légumes : ${formatList(soupCompanionLabels).toLowerCase()}.`
          : protein.note,
        steps: [
          `Faire revenir ${protein.label.toLowerCase()} coupé(s) en morceaux avec un peu d'huile.`,
          `Ajouter le bouillon de poulet${soupCompanions.length ? ` et ${formatList(soupCompanionLabels).toLowerCase()}` : ", couvrir d'eau"}.`,
          "Laisser mijoter 25 à 30 min à feu doux.",
          "Rectifier l'assaisonnement et servir chaud."
        ],
        generated: true
      });
    });
  }
  if (pantrySet.has("bouillon_legumes") && (!wantedType || wantedType === "parve") && soupCompanions.length) {
    const calories = soupCompanions.reduce((s, k) => s + companionKcal(k), 0) + 30;
    ideas.push({
      id: "gen_soupe_legumes",
      name: `Soupe de légumes (${formatList(soupCompanionLabels).toLowerCase()})`,
      category: "parve",
      time: 30,
      servings: 4,
      calories,
      ingredients: ["bouillon_legumes", ...soupCompanions, "huile_olive", "sel", "poivre"],
      note: soupCompanions.length > 1 ? "Utilisez un, plusieurs ou la totalité de ces légumes." : undefined,
      steps: [
        `Couper ${formatList(soupCompanionLabels).toLowerCase()} en morceaux.`,
        "Faire revenir 2 min dans l'huile, ajouter le bouillon de légumes et couvrir d'eau si besoin.",
        "Laisser mijoter 20 à 25 min, mixer ou laisser en morceaux selon vos goûts.",
        "Saler, poivrer et servir."
      ],
      generated: true
    });
  }

  // --- Curry au lait de coco (protéine ou légumes seuls) ---
  if (pantrySet.has("lait_coco")) {
    const curryCompanions = companionsPresent.filter(k => !STARCH_KEYS.includes(k));
    const curryCompanionLabels = curryCompanions.map(k => INGREDIENTS_BY_KEY[k].label);
    PROTEIN_DEFS.forEach(protein => {
      if (wantedType && wantedType !== protein.category) return;
      const ownedKey = protein.group.find(k => pantrySet.has(k));
      if (!ownedKey) return;
      const calories = protein.baseKcal + 180 + curryCompanions.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_curry_${protein.key}`,
        name: curryCompanions.length
          ? `Curry ${protein.deprep}${protein.label.toLowerCase()} au lait de coco (${formatList(curryCompanionLabels).toLowerCase()})`
          : `Curry ${protein.deprep}${protein.label.toLowerCase()} au lait de coco`,
        category: protein.category,
        time: 30,
        servings: 4,
        calories,
        ingredients: [ownedKey, "lait_coco", "curcuma", ...curryCompanions, "huile_olive", "sel"],
        note: protein.note,
        steps: [
          `Faire dorer ${protein.label.toLowerCase()} dans l'huile avec le curcuma.`,
          curryCompanions.length
            ? `Ajouter ${formatList(curryCompanionLabels).toLowerCase()} coupé(s) en morceaux.`
            : "Ajouter les légumes de votre choix coupés en morceaux.",
          "Verser le lait de coco, couvrir et laisser mijoter 15 à 20 min.",
          "Servir avec du riz si vous en avez."
        ],
        generated: true
      });
    });
    if ((!wantedType || wantedType === "parve") && curryCompanions.length) {
      const calories = 180 + curryCompanions.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: "gen_curry_legumes",
        name: `Curry de légumes au lait de coco (${formatList(curryCompanionLabels).toLowerCase()})`,
        category: "parve",
        time: 25,
        servings: 4,
        calories,
        ingredients: ["lait_coco", "curcuma", ...curryCompanions, "huile_olive", "sel"],
        note: curryCompanions.length > 1 ? "Utilisez un, plusieurs ou la totalité de ces légumes." : undefined,
        steps: [
          `Faire revenir ${formatList(curryCompanionLabels).toLowerCase()} coupé(s) en morceaux dans l'huile avec le curcuma.`,
          "Verser le lait de coco, couvrir et laisser mijoter 15 min.",
          "Saler et servir, avec du riz si possible."
        ],
        generated: true
      });
    }
  }

  // --- Riz sauté (façon riz cantonais) ---
  if (pantrySet.has("riz")) {
    const friedRiceExtras = companionsPresent.filter(k => !STARCH_KEYS.includes(k));
    const extraLabels = friedRiceExtras.map(k => INGREDIENTS_BY_KEY[k].label);
    const hasSoy = pantrySet.has("sauce_soja");
    PROTEIN_DEFS.forEach(protein => {
      if (wantedType && wantedType !== protein.category) return;
      const ownedKey = protein.group.find(k => pantrySet.has(k));
      if (!ownedKey) return;
      const calories = protein.baseKcal + 150 + friedRiceExtras.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_rizsaute_${protein.key}`,
        name: `Riz sauté ${protein.prep}${protein.label.toLowerCase()}${friedRiceExtras.length ? ` (${formatList(extraLabels).toLowerCase()})` : ""}`,
        category: protein.category,
        time: 20,
        servings: 4,
        calories,
        ingredients: [ownedKey, "riz", ...friedRiceExtras, ...(hasSoy ? ["sauce_soja"] : []), "huile_olive", "sel"],
        note: protein.note,
        steps: [
          "Faire cuire le riz puis le laisser refroidir (idéalement du riz de la veille).",
          `Faire revenir ${protein.label.toLowerCase()} coupé en dés dans l'huile jusqu'à ce que ce soit doré.`,
          friedRiceExtras.length
            ? `Ajouter ${formatList(extraLabels).toLowerCase()} et faire sauter 3 à 4 min.`
            : "Ajouter les légumes de votre choix et faire sauter quelques minutes.",
          `Ajouter le riz, ${hasSoy ? "arroser de sauce soja" : "saler"} et bien mélanger à feu vif.`
        ],
        generated: true
      });
    });
    if ((!wantedType || wantedType === "parve") && friedRiceExtras.length) {
      const calories = 250 + friedRiceExtras.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: "gen_rizsaute_legumes",
        name: `Riz sauté aux légumes (${formatList(extraLabels).toLowerCase()})`,
        category: "parve",
        time: 15,
        servings: 4,
        calories,
        ingredients: ["riz", ...friedRiceExtras, ...(hasSoy ? ["sauce_soja"] : []), "huile_olive", "sel"],
        note: friedRiceExtras.length > 1 ? "Utilisez un, plusieurs ou la totalité de ces légumes." : undefined,
        steps: [
          "Faire cuire le riz puis le laisser refroidir.",
          `Faire sauter ${formatList(extraLabels).toLowerCase()} coupé(s) en morceaux dans l'huile.`,
          `Ajouter le riz, ${hasSoy ? "arroser de sauce soja" : "saler"} et bien mélanger à feu vif.`
        ],
        generated: true
      });
    }
  }

  // --- Pâtes (protéine, fromage, ou légumes seuls) ---
  if (pantrySet.has("pates")) {
    const pastaExtras = companionsPresent.filter(k => !STARCH_KEYS.includes(k));
    const pastaExtraLabels = pastaExtras.map(k => INGREDIENTS_BY_KEY[k].label);
    PROTEIN_DEFS.forEach(protein => {
      if (wantedType && wantedType !== protein.category) return;
      const ownedKey = protein.group.find(k => pantrySet.has(k));
      if (!ownedKey) return;
      const calories = protein.baseKcal + 200 + pastaExtras.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_pates_${protein.key}`,
        name: `Pâtes ${protein.prep}${protein.label.toLowerCase()}${pastaExtras.length ? ` et ${formatList(pastaExtraLabels).toLowerCase()}` : ""}`,
        category: protein.category,
        time: 25,
        servings: 4,
        calories,
        ingredients: [ownedKey, "pates", ...pastaExtras, "huile_olive", "sel", "poivre"],
        note: protein.note,
        steps: [
          "Faire cuire les pâtes dans l'eau bouillante salée.",
          `Pendant ce temps, faire revenir ${protein.label.toLowerCase()} dans l'huile.`,
          pastaExtras.length
            ? `Ajouter ${formatList(pastaExtraLabels).toLowerCase()} et poursuivre la cuisson quelques minutes.`
            : "Ajouter les légumes de votre choix.",
          "Égoutter les pâtes, mélanger le tout et servir chaud."
        ],
        generated: true
      });
    });
    if (!wantedType || wantedType === "lait") {
      DAIRY_STAR_DEFS.forEach(dairy => {
        if (!pantrySet.has(dairy.key)) return;
        const calories = 220 + dairy.baseKcal + pastaExtras.reduce((s, k) => s + companionKcal(k), 0);
        ideas.push({
          id: `gen_pates_${dairy.key}`,
          name: `Pâtes ${dairy.prep}${dairy.label.toLowerCase()}${pastaExtras.length ? ` et ${formatList(pastaExtraLabels).toLowerCase()}` : ""}`,
          category: "lait",
          time: 20,
          servings: 4,
          calories,
          ingredients: ["pates", dairy.key, ...pastaExtras, "huile_olive", "sel", "poivre"],
          note: pastaExtras.length > 1 ? "Utilisez un, plusieurs ou la totalité de ces légumes." : undefined,
          steps: [
            "Faire cuire les pâtes dans l'eau bouillante salée.",
            pastaExtras.length
              ? `Faire revenir ${formatList(pastaExtraLabels).toLowerCase()} dans un peu d'huile.`
              : "Faire chauffer un peu d'huile.",
            `Égoutter les pâtes, mélanger avec ${dairy.art}${dairy.label.toLowerCase()} et les légumes.`,
            "Servir chaud, éventuellement avec du fromage râpé en plus."
          ],
          generated: true
        });
      });
    }
    if ((!wantedType || wantedType === "parve") && pastaExtras.length) {
      const calories = 280 + pastaExtras.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: "gen_pates_legumes",
        name: `Pâtes aux légumes (${formatList(pastaExtraLabels).toLowerCase()})`,
        category: "parve",
        time: 20,
        servings: 4,
        calories,
        ingredients: ["pates", ...pastaExtras, "huile_olive", "sel", "poivre"],
        note: pastaExtras.length > 1 ? "Utilisez un, plusieurs ou la totalité de ces légumes." : undefined,
        steps: [
          "Faire cuire les pâtes dans l'eau bouillante salée.",
          `Faire revenir ${formatList(pastaExtraLabels).toLowerCase()} dans l'huile d'olive.`,
          "Égoutter les pâtes, mélanger le tout, saler et poivrer."
        ],
        generated: true
      });
    }
  }

  // --- Brochettes marinées au citron (viande) ---
  if (pantrySet.has("citron") && (!wantedType || wantedType === "viande")) {
    const skewerVeg = companionsPresent.filter(k => ["poivron", "courgette", "oignon", "champignon", "tomate"].includes(k));
    const skewerLabels = skewerVeg.map(k => INGREDIENTS_BY_KEY[k].label);
    PROTEIN_DEFS.filter(p => p.category === "viande").forEach(protein => {
      const ownedKey = protein.group.find(k => pantrySet.has(k));
      if (!ownedKey) return;
      const calories = protein.baseKcal + 30 + skewerVeg.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_brochette_${protein.key}`,
        name: skewerVeg.length
          ? `Brochettes ${protein.deprep}${protein.label.toLowerCase()} marinées au citron (${formatList(skewerLabels).toLowerCase()})`
          : `Brochettes ${protein.deprep}${protein.label.toLowerCase()} marinées au citron`,
        category: "viande",
        time: 25,
        servings: 4,
        calories,
        ingredients: [ownedKey, "citron", ...skewerVeg, "huile_olive", "ail", "sel", "poivre"],
        note: protein.note,
        steps: [
          `Couper ${protein.label.toLowerCase()} en cubes et mariner 30 min avec le jus de citron, l'huile d'olive, l'ail écrasé, sel et poivre.`,
          skewerVeg.length
            ? `Enfiler la viande sur des brochettes en alternant avec ${formatList(skewerLabels).toLowerCase()} coupé(s) en morceaux.`
            : "Enfiler la viande sur des brochettes.",
          "Faire griller 10 à 15 min en retournant régulièrement, au four ou à la poêle."
        ],
        generated: true
      });
    });
  }

  // --- Wrap / sandwich (viande) ---
  const wrapBreadKey = WRAP_BREAD_KEYS.find(k => pantrySet.has(k));
  if (wrapBreadKey && (!wantedType || wantedType === "viande")) {
    const breadLabel = INGREDIENTS_BY_KEY[wrapBreadKey].label;
    const wrapVeg = companionsPresent.filter(k => FRESH_SALAD_KEYS.includes(k));
    const wrapVegLabels = wrapVeg.map(k => INGREDIENTS_BY_KEY[k].label);
    PROTEIN_DEFS.filter(p => p.category === "viande").forEach(protein => {
      const ownedKey = protein.group.find(k => pantrySet.has(k));
      if (!ownedKey) return;
      const calories = protein.baseKcal + 180 + wrapVeg.reduce((s, k) => s + companionKcal(k), 0);
      ideas.push({
        id: `gen_wrap_${protein.key}`,
        name: wrapVeg.length
          ? `Wrap ${protein.prep}${protein.label.toLowerCase()} (${formatList(wrapVegLabels).toLowerCase()})`
          : `Wrap ${protein.prep}${protein.label.toLowerCase()}`,
        category: "viande",
        time: 15,
        servings: 2,
        calories,
        ingredients: [ownedKey, wrapBreadKey, ...wrapVeg, "mayonnaise", "huile_olive", "sel"],
        note: protein.note,
        steps: [
          `Faire cuire ${protein.label.toLowerCase()} coupé en lamelles dans l'huile.`,
          `Réchauffer légèrement le ${breadLabel.toLowerCase()}.`,
          wrapVeg.length
            ? `Garnir avec ${formatList(wrapVegLabels).toLowerCase()}, un peu de mayonnaise et la viande.`
            : "Garnir avec un peu de mayonnaise et la viande.",
          "Refermer et servir aussitôt."
        ],
        generated: true
      });
    });
  }

  // --- Salade fraîche (fromage + légumes crus, sans cuisson) ---
  // Une seule idée par fromage, avec tous les légumes "à cru" cochés proposés au choix.
  if (!wantedType || wantedType === "lait") {
    const rawVegPresent = companionsPresent.filter(k => FRESH_SALAD_KEYS.includes(k));
    if (rawVegPresent.length) {
      const vegLabels = rawVegPresent.map(k => INGREDIENTS_BY_KEY[k].label);
      const vegFlexNote = rawVegPresent.length > 1
        ? `Utilisez un, plusieurs ou la totalité de ces légumes : ${formatList(vegLabels).toLowerCase()}.`
        : undefined;
      DAIRY_STAR_DEFS.filter(d => ["mozzarella", "feta", "fromage_chevre", "fromage_blanc"].includes(d.key)).forEach(dairy => {
        if (!pantrySet.has(dairy.key)) return;
        const calories = dairy.baseKcal + rawVegPresent.reduce((s, k) => s + companionKcal(k), 0) + 60;
        ideas.push({
          id: `gen_salade_${dairy.key}_${rawVegPresent.slice().sort().join("-")}`,
          name: `Salade fraîche de ${formatList(vegLabels)} ${dairy.prep}${dairy.label.toLowerCase()}`,
          category: "lait",
          time: 10,
          servings: 4,
          calories,
          ingredients: [dairy.key, ...rawVegPresent, "huile_olive", "sel", "poivre"],
          note: vegFlexNote,
          steps: [
            `Couper la garniture de votre choix (${formatList(vegLabels).toLowerCase()}) en morceaux ou en tranches.`,
            `Ajouter ${dairy.art}${dairy.label.toLowerCase()} coupé(e) en dés ou émietté(e).`,
            "Arroser d'huile d'olive, saler et poivrer."
          ],
          generated: true
        });
      });
    }
  }

  // --- Légumes/féculents seuls, sans protéine (parve) ---
  if (!wantedType || wantedType === "parve") {
    companionCombos.forEach(companions => {
      if (companions.length === 0) return;
      const companionLabels = companions.map(k => INGREDIENTS_BY_KEY[k].label);
      const calories = companions.reduce((s, k) => s + companionKcal(k), 0) + 40;
      ideas.push({
        id: `gen_veg_${companions.slice().sort().join("-")}`,
        name: `Poêlée de ${formatList(companionLabels)}`,
        category: "parve",
        time: 15,
        servings: 4,
        calories,
        ingredients: [...companions, "huile_olive", "sel", "poivre"],
        steps: [
          `Couper ${formatList(companionLabels)} en morceaux.`,
          "Faire revenir à feu vif dans l'huile d'olive pendant 8 à 10 min.",
          "Saler, poivrer et servir."
        ],
        generated: true
      });
    });
  }

  // Les idées qui utilisent le plus d'ingrédients cochés en premier (l'idée
  // "tout utiliser" remonte donc naturellement en haut de chaque groupe).
  ideas.sort((a, b) => b.ingredients.length - a.ingredients.length);
  return ideas;
}

function renderGeneratedIdeas() {
  const listEl = document.getElementById("generated-list");
  const emptyEl = document.getElementById("generated-empty");
  listEl.innerHTML = "";

  if (pantry.size === 0) {
    emptyEl.textContent = t("generatedEmptyDefault");
    emptyEl.classList.remove("hidden");
    return;
  }

  const wantedType = selectedType === "tous" ? null : selectedType;
  const ideas = generateQuickIdeas(pantry, wantedType).slice(0, 24);

  if (ideas.length === 0) {
    emptyEl.textContent = t("generatedEmptyNoMatch");
    emptyEl.classList.remove("hidden");
    return;
  }
  emptyEl.classList.add("hidden");
  const typeLabels = getTypeLabels();

  ideas.forEach(idea => {
    const type = typeLabels[idea.category];
    const card = document.createElement("div");
    card.className = "recipe-card";
    const lastMadeIso = lastMadeMap[idea.id];
    const lastMadeBadge = lastMadeIso ? `<span class="tag tag-lastmade">${t("lastMadeBadge", { date: formatDate(lastMadeIso) })}</span>` : "";
    card.innerHTML = `
      <div class="recipe-card-header">
        <span class="badge ${type.cls}">${type.emoji} ${type.name}</span>
        <span class="recipe-time">⏱ ${idea.time} min · 🔥 ${idea.calories} kcal</span>
      </div>
      <h3 class="fr-text">${idea.name}</h3>
      <span class="tag tag-generated">${t("tagGenerated")}</span> ${lastMadeBadge}
    `;
    card.addEventListener("click", () => openRecipeModal(idea, []));
    listEl.appendChild(card);
  });
}

// `plainMode` : quand la recette est ouverte depuis la recherche par nom (et non
// depuis une correspondance avec le garde-manger), on affiche une simple liste
// d'ingrédients sans les icônes "possédé / à acheter", qui n'ont pas de sens ici.
function openRecipeModal(recipe, missing, plainMode = false) {
  const modal = document.getElementById("recipe-modal");
  const body = document.getElementById("modal-body");
  const type = getTypeLabels()[recipe.category];

  const ingredientsHtml = recipe.ingredients.map(key => {
    const ing = INGREDIENTS_BY_KEY[key];
    const label = ing ? ingredientLabel(ing) : pseudoIngredientLabel(key);
    if (plainMode) {
      return `<li>• ${label}</li>`;
    }
    const isBasic = BASIC_INGREDIENTS.includes(key);
    const owned = isBasic || pantryCovers(pantry, key);
    return `<li class="${owned ? "have" : "missing"}">${owned ? "✅" : "🛒"} ${label}</li>`;
  }).join("");

  const stepsHtml = recipe.steps.map(s => `<li>${s}</li>`).join("");
  const noteHtml = recipe.note ? `<p class="recipe-note fr-text">📝 ${recipe.note}</p>` : "";

  const lastMadeIso = lastMadeMap[recipe.id];
  const lastMadeText = lastMadeIso
    ? t("modalLastMadeText", { date: `<strong>${formatDate(lastMadeIso)}</strong>` })
    : t("modalNeverMade");

  body.innerHTML = `
    <span class="badge ${type.cls}">${type.emoji} ${type.name}</span>
    <h2 class="fr-text">${recipe.name}</h2>
    <p class="recipe-meta">${t("modalMeta", { time: recipe.time, servings: recipe.servings, calories: recipe.calories })}</p>
    ${noteHtml}
    <div class="last-made-box">
      <p class="last-made-text">${lastMadeText}</p>
      <button id="mark-made-btn" class="btn btn-secondary" type="button">${t("modalMarkMadeBtn")}</button>
    </div>
    <h4>${t("modalIngredientsTitle")}</h4>
    <ul class="ingredient-list">${ingredientsHtml}</ul>
    <h4>${t("modalStepsTitle")}</h4>
    <ol class="steps-list fr-text">${stepsHtml}</ol>
  `;

  body.querySelector("#mark-made-btn").addEventListener("click", () => {
    markRecipeMade(recipe.id);
    openRecipeModal(recipe, missing, plainMode);
    renderResults();
  });

  modal.classList.remove("hidden");
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("recipe-modal").classList.add("hidden");
});
document.getElementById("recipe-modal").addEventListener("click", (e) => {
  if (e.target.id === "recipe-modal") e.currentTarget.classList.add("hidden");
});

// Cliquer sur le logo/titre recharge la page (retour à l'état initial).
document.getElementById("app-logo").addEventListener("click", () => {
  location.reload();
});

// ---------------------------------------------------------------------------
// Langue de l'interface (français / hébreu) + bascule RTL
// ---------------------------------------------------------------------------

// Met à jour tous les éléments statiques marqués data-i18n / data-i18n-placeholder
// avec le texte de la langue actuelle.
function applyStaticTranslations() {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
    el.placeholder = t(el.dataset.i18nPlaceholder);
  });
}

// Change la langue de l'interface, sauvegarde le choix, bascule la direction
// RTL/LTR de la page, et rafraîchit tout l'affichage dynamique (ingrédients,
// résultats, idées, compteur...). Les recettes elles-mêmes restent en français.
function setLanguage(lang) {
  currentLang = lang === "he" ? "he" : "fr";
  try { localStorage.setItem(LANG_STORAGE_KEY, currentLang); } catch (e) { /* stockage indisponible, tant pis */ }

  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "he" ? "rtl" : "ltr";

  const langBtn = document.getElementById("lang-toggle");
  // Le drapeau affiché est celui de la langue vers laquelle on va basculer.
  langBtn.textContent = currentLang === "he" ? "🇫🇷" : "🇮🇱";
  langBtn.setAttribute("aria-label", t("langToggleLabel"));
  langBtn.title = t("langToggleLabel");

  applyStaticTranslations();
  buildIngredientChecklist(document.getElementById("ingredient-search").value);
  updatePantryCount();
  renderRecipeSearchResults(document.getElementById("ingredient-search").value);
  renderResults();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  setLanguage(currentLang === "he" ? "fr" : "he");
});

// ---------------------------------------------------------------------------
// Initialisation
// ---------------------------------------------------------------------------

setLanguage(currentLang);
buildIngredientChecklist();
updatePantryCount();
renderResults();

// Enregistrement du service worker (PWA) — ne fonctionne que si l'app est servie en http(s).
if ("serviceWorker" in navigator && (location.protocol === "http:" || location.protocol === "https:")) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("service-worker.js").catch(() => {
      // Silencieux : l'app fonctionne très bien sans service worker.
    });
  });
}
