// Correspondance entre les classes reconnues par le modèle d'image MobileNet (ImageNet)
// et les ingrédients de notre catalogue. La reconnaissance photo fonctionne surtout bien
// pour les fruits et légumes "reconnaissables" ; le modèle est plus limité sur les produits
// transformés ou emballés (dans ce cas, mieux vaut utiliser la liste texte ou le cochage manuel).
const IMAGENET_TO_INGREDIENT = {
  "banana": "banane",
  "avocado": "avocat",
  "lemon": "citron",
  "orange": "citron", // pas d'orange dans le catalogue, on associe au rayon agrumes le plus proche
  "strawberry": "pomme", // fallback grossier si aucune classe fruit exacte
  "pineapple, ananas": "banane",
  "fig": "dattes",
  "pomegranate": "dattes",
  "broccoli": "brocoli",
  "cauliflower": "chou",
  "head cabbage": "chou",
  "cucumber, cuke": "concombre",
  "zucchini, courgette": "courgette",
  "artichoke, globe artichoke": "aubergine",
  "bell pepper": "poivron",
  "acorn squash": "potiron",
  "butternut squash": "potiron",
  "spaghetti squash": "potiron",
  "mushroom": "champignon",
  "corn": "mais",
  "carbonara": "pates",
  "cardoon": "epinard",
  "bell pepper, sweet pepper": "poivron"
};

// Seuil minimal de confiance (0 à 1) pour accepter une détection automatique.
const IMAGE_RECOGNITION_THRESHOLD = 0.12;
