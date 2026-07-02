// Base de recettes 100% kasher.
// category : "viande" (contient de la viande, ne pas consommer avec du lait),
//            "lait" (contient des produits laitiers, ne pas consommer avec de la viande),
//            "parve" (ni viande ni lait, se marie avec les deux — inclut le poisson).
// note : rappel de cacherout spécifique à la recette, le cas échéant.
const RECIPES = [
  // ---------------- VIANDE ----------------
  {
    id: "v1", name: "Poulet rôti au citron et thym", category: "viande", time: 70, servings: 4, calories: 420,
    ingredients: ["poulet_entier", "citron", "ail", "thym", "huile_olive", "sel", "poivre"],
    steps: [
      "Préchauffer le four à 200°C.",
      "Frotter le poulet avec l'huile, l'ail écrasé, le sel, le poivre et le thym.",
      "Glisser un citron coupé en deux à l'intérieur du poulet.",
      "Enfourner 1h à 1h10 en arrosant régulièrement avec le jus de cuisson."
    ]
  },
  {
    id: "v2", name: "Escalopes de poulet à la moutarde", category: "viande", time: 25, servings: 4, calories: 320,
    ingredients: ["escalope_poulet", "moutarde", "oignon", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon émincé dans l'huile.",
      "Ajouter les escalopes et les dorer 4 min de chaque côté.",
      "Badigeonner de moutarde, ajouter un fond d'eau et laisser mijoter 5 min."
    ]
  },
  {
    id: "v3", name: "Boulettes de boeuf sauce tomate", category: "viande", time: 40, servings: 4, calories: 450,
    ingredients: ["boeuf_hache", "oeufs", "chapelure", "ail", "tomates_concassees", "oignon", "persil", "sel", "poivre"],
    steps: [
      "Mélanger le boeuf haché, l'oeuf, la chapelure, l'ail et le persil hachés.",
      "Former des boulettes et les dorer à la poêle.",
      "Ajouter l'oignon émincé et les tomates concassées, laisser mijoter 20 min."
    ]
  },
  {
    id: "v4", name: "Poulet au curry et lait de coco", category: "viande", time: 35, servings: 4, calories: 550,
    ingredients: ["cuisses_poulet", "lait_coco", "oignon", "ail", "curcuma", "riz", "sel", "poivre"],
    note: "Le lait de coco est parve (végétal) : cette recette reste bien dans la catégorie viande.",
    steps: [
      "Faire dorer les cuisses de poulet avec l'oignon et l'ail.",
      "Ajouter le curcuma et le lait de coco, couvrir et laisser mijoter 25 min.",
      "Servir avec du riz."
    ]
  },
  {
    id: "v5", name: "Ragoût de boeuf aux carottes et pommes de terre", category: "viande", time: 90, servings: 4, calories: 480,
    ingredients: ["boeuf_ragout", "carotte", "pomme_de_terre", "oignon", "bouillon_poulet", "sel", "poivre"],
    steps: [
      "Faire revenir la viande avec l'oignon.",
      "Ajouter les carottes, les pommes de terre et le bouillon.",
      "Laisser mijoter à couvert 1h30 à feu doux."
    ]
  },
  {
    id: "v33", name: "Daube de boeuf aux carottes", category: "viande", time: 150, servings: 4, calories: 470,
    note: "Grand classique mijoté français. Le vin rouge est ce qui fait la vraie \"daube\" (sans lui, c'est un simple ragoût).",
    ingredients: ["boeuf_ragout", "carotte", "oignon", "vin_rouge", "ail", "thym", "sel", "poivre"],
    steps: [
      "Faire dorer la viande de tous les côtés dans une cocotte.",
      "Ajouter l'oignon et l'ail, puis les carottes coupées en rondelles.",
      "Verser le vin rouge (il doit presque recouvrir la viande), ajouter le thym.",
      "Couvrir et laisser mijoter à feu très doux au moins 2h30, jusqu'à ce que la viande soit fondante."
    ]
  },
  {
    id: "v6", name: "Cuisses de poulet au miel et paprika", category: "viande", time: 45, servings: 4, calories: 400,
    ingredients: ["cuisses_poulet", "miel", "paprika", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Préchauffer le four à 200°C.",
      "Mélanger miel, paprika, ail écrasé et huile ; en badigeonner les cuisses.",
      "Enfourner 40 min en retournant à mi-cuisson."
    ]
  },
  {
    id: "v7", name: "Chili con carne", category: "viande", time: 45, servings: 4, calories: 430,
    ingredients: ["boeuf_hache", "pois_chiches", "tomates_concassees", "oignon", "poivron", "cumin", "paprika", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et le boeuf haché.",
      "Ajouter le poivron, les tomates, les pois chiches, le cumin et le paprika.",
      "Laisser mijoter 30 min à feu doux."
    ]
  },
  {
    id: "v8", name: "Brochettes d'agneau aux épices", category: "viande", time: 25, servings: 4, calories: 380,
    ingredients: ["agneau", "cumin", "paprika", "ail", "citron", "huile_olive", "sel", "poivre"],
    steps: [
      "Couper l'agneau en cubes et le mariner avec les épices, l'ail, le citron et l'huile.",
      "Enfiler sur des piques et griller 3-4 min de chaque côté."
    ]
  },
  {
    id: "v9", name: "Tajine de poulet aux olives et citron confit", category: "viande", time: 60, servings: 4, calories: 420,
    ingredients: ["cuisses_poulet", "olives", "citron_confit", "oignon", "ail", "curcuma", "sel", "poivre"],
    steps: [
      "Faire dorer le poulet avec l'oignon, l'ail et le curcuma.",
      "Ajouter un fond d'eau, couvrir et laisser mijoter 40 min.",
      "Ajouter les olives et le citron confit en fin de cuisson."
    ]
  },
  {
    id: "v10", name: "Poivrons farcis au boeuf et riz", category: "viande", time: 55, servings: 4, calories: 380,
    ingredients: ["poivron", "boeuf_hache", "riz", "oignon", "concentre_tomate", "sel", "poivre"],
    steps: [
      "Couper le chapeau des poivrons et les vider.",
      "Mélanger le boeuf haché, le riz cuit, l'oignon et le concentré de tomate.",
      "Farcir les poivrons et cuire au four 30 min à 190°C."
    ]
  },
  {
    id: "v11", name: "Soupe de poulet aux vermicelles", category: "viande", time: 45, servings: 4, calories: 250,
    ingredients: ["cuisses_poulet", "carotte", "oignon", "vermicelles", "bouillon_poulet", "sel", "poivre"],
    steps: [
      "Faire cuire le poulet avec l'oignon et la carotte dans le bouillon 30 min.",
      "Ajouter les vermicelles et cuire encore 8 min.",
      "Rectifier l'assaisonnement avant de servir."
    ]
  },
  {
    id: "v12", name: "Dinde aux champignons et vin blanc", category: "viande", time: 35, servings: 4, calories: 320,
    ingredients: ["dinde", "champignon", "oignon", "vin_blanc", "sel", "poivre"],
    steps: [
      "Faire dorer les escalopes de dinde puis réserver.",
      "Faire revenir l'oignon et les champignons, déglacer au vin blanc.",
      "Remettre la dinde et laisser mijoter 10 min."
    ]
  },
  {
    id: "v13", name: "Foie de veau à l'oignon", category: "viande", time: 20, servings: 4, calories: 350,
    ingredients: ["foie_veau", "oignon", "farine", "sel", "poivre"],
    note: "Le foie doit être cachérisé (grillé) selon les règles spécifiques avant toute cuisson — vérifiez qu'il provient d'une source cachère certifiée.",
    steps: [
      "Fariner légèrement les tranches de foie.",
      "Faire revenir les oignons émincés jusqu'à coloration.",
      "Saisir le foie 2 min de chaque côté et servir avec les oignons."
    ]
  },
  {
    id: "v14", name: "Merguez grillées aux poivrons", category: "viande", time: 20, servings: 4, calories: 480,
    ingredients: ["merguez", "poivron", "oignon", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir poivrons et oignons émincés dans l'huile.",
      "Griller les merguez à la poêle ou au four 12-15 min.",
      "Servir ensemble."
    ]
  },

  // ---------------- LAIT ----------------
  {
    id: "l1", name: "Pâtes à la crème et champignons", category: "lait", time: 25, servings: 4, calories: 520,
    ingredients: ["pates", "champignon", "creme_fraiche", "ail", "parmesan", "sel", "poivre"],
    steps: [
      "Cuire les pâtes al dente.",
      "Faire revenir les champignons et l'ail, ajouter la crème fraîche.",
      "Mélanger avec les pâtes et parsemer de parmesan."
    ]
  },
  {
    id: "l2", name: "Gratin de pommes de terre au fromage", category: "lait", time: 60, servings: 4, calories: 450,
    ingredients: ["pomme_de_terre", "creme_fraiche", "lait", "fromage_rape", "ail", "sel", "poivre"],
    steps: [
      "Couper les pommes de terre en fines rondelles.",
      "Disposer en couches avec la crème, le lait et l'ail dans un plat.",
      "Couvrir de fromage râpé et enfourner 45 min à 180°C."
    ]
  },
  {
    id: "l3", name: "Omelette aux légumes et fromage", category: "lait", time: 15, servings: 2, calories: 320,
    ingredients: ["oeufs", "poivron", "oignon", "fromage_rape", "sel", "poivre"],
    steps: [
      "Battre les oeufs avec le sel et le poivre.",
      "Faire revenir l'oignon et le poivron.",
      "Verser les oeufs, ajouter le fromage et cuire à feu doux."
    ]
  },
  {
    id: "l4", name: "Risotto aux champignons et parmesan", category: "lait", time: 35, servings: 4, calories: 480,
    ingredients: ["riz", "champignon", "oignon", "beurre", "parmesan", "bouillon_legumes", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon dans le beurre, ajouter le riz.",
      "Ajouter le bouillon louche par louche en remuant.",
      "En fin de cuisson, incorporer les champignons poêlés et le parmesan."
    ]
  },
  {
    id: "l5", name: "Quiche aux épinards et fromage de chèvre", category: "lait", time: 50, servings: 4, calories: 430,
    ingredients: ["pate_a_tarte", "epinard", "oeufs", "creme_fraiche", "fromage_chevre", "sel", "poivre"],
    steps: [
      "Étaler la pâte dans un moule.",
      "Mélanger oeufs, crème, épinards et sel, poivre.",
      "Verser sur la pâte, ajouter le fromage de chèvre et enfourner 35 min à 180°C."
    ]
  },
  {
    id: "l6", name: "Soupe à l'oignon gratinée", category: "lait", time: 50, servings: 4, calories: 350,
    ingredients: ["oignon", "beurre", "farine", "bouillon_legumes", "fromage_rape", "sel", "poivre"],
    steps: [
      "Faire caraméliser les oignons émincés dans le beurre 20 min.",
      "Saupoudrer de farine, ajouter le bouillon et laisser mijoter 15 min.",
      "Verser dans des bols, couvrir de fromage et passer sous le gril."
    ]
  },
  {
    id: "l7", name: "Salade de pâtes au fromage et tomates", category: "lait", time: 20, servings: 4, calories: 420,
    ingredients: ["pates", "tomate", "mozzarella", "huile_olive", "sel", "poivre"],
    steps: [
      "Cuire les pâtes et les refroidir.",
      "Couper les tomates et la mozzarella en dés.",
      "Mélanger le tout avec l'huile d'olive, saler et poivrer."
    ]
  },
  {
    id: "l8", name: "Crêpes salées au fromage", category: "lait", time: 25, servings: 4, calories: 380,
    ingredients: ["farine", "oeufs", "lait", "fromage_rape", "beurre", "sel"],
    steps: [
      "Mélanger la farine, les oeufs et le lait pour obtenir une pâte lisse.",
      "Cuire les crêpes dans le beurre.",
      "Garnir de fromage râpé, replier et faire fondre 1 min."
    ]
  },
  {
    id: "l9", name: "Gnocchis sauce tomate et mozzarella", category: "lait", time: 20, servings: 4, calories: 450,
    ingredients: ["gnocchis", "tomates_concassees", "ail", "mozzarella", "sel", "poivre"],
    steps: [
      "Cuire les gnocchis dans l'eau bouillante.",
      "Préparer une sauce avec les tomates et l'ail.",
      "Mélanger, ajouter la mozzarella et gratiner quelques minutes."
    ]
  },
  {
    id: "l10", name: "Shakshuka à la feta", category: "lait", time: 30, servings: 4, calories: 320,
    ingredients: ["oeufs", "tomates_concassees", "poivron", "oignon", "feta", "cumin", "paprika", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et le poivron, ajouter les tomates, cumin et paprika.",
      "Laisser mijoter 10 min puis creuser des puits pour casser les oeufs dedans.",
      "Couvrir et cuire jusqu'à ce que les blancs soient pris. Parsemer de feta."
    ]
  },
  {
    id: "l11", name: "Tarte aux légumes et fromage", category: "lait", time: 45, servings: 4, calories: 400,
    ingredients: ["pate_a_tarte", "courgette", "poivron", "oeufs", "creme_fraiche", "fromage_rape", "sel", "poivre"],
    steps: [
      "Étaler la pâte, disposer les légumes coupés en rondelles.",
      "Mélanger oeufs, crème et fromage, verser sur les légumes.",
      "Enfourner 35 min à 180°C."
    ]
  },
  {
    id: "l12", name: "Riz au lait à la cannelle", category: "lait", time: 40, servings: 4, calories: 280,
    ingredients: ["riz", "lait", "sucre", "cannelle"],
    steps: [
      "Faire chauffer le lait avec le sucre.",
      "Ajouter le riz et cuire à feu doux 30 min en remuant.",
      "Servir tiède ou froid saupoudré de cannelle."
    ]
  },

  // ---------------- PARVE (dont poisson) ----------------
  {
    id: "p1", name: "Houmous maison", category: "parve", time: 10, servings: 4, calories: 220,
    ingredients: ["pois_chiches", "tahin", "citron", "ail", "huile_olive", "cumin", "sel"],
    steps: [
      "Mixer les pois chiches avec la tehina, le jus de citron et l'ail.",
      "Ajouter l'huile d'olive et le cumin jusqu'à obtenir une texture lisse.",
      "Rectifier l'assaisonnement en sel."
    ]
  },
  {
    id: "p2", name: "Salade de lentilles au cumin", category: "parve", time: 30, servings: 4, calories: 280,
    ingredients: ["lentilles", "oignon", "carotte", "cumin", "huile_olive", "citron", "sel", "poivre"],
    steps: [
      "Cuire les lentilles avec la carotte 20 min.",
      "Égoutter, ajouter l'oignon émincé, le cumin, le jus de citron et l'huile.",
      "Servir tiède ou froid."
    ]
  },
  {
    id: "p3", name: "Falafels", category: "parve", time: 40, servings: 4, calories: 350,
    ingredients: ["pois_chiches", "ail", "oignon", "coriandre", "cumin", "farine", "huile_olive", "sel", "poivre"],
    steps: [
      "Mixer les pois chiches trempés avec l'ail, l'oignon, la coriandre et le cumin.",
      "Ajouter un peu de farine pour lier, former des boulettes.",
      "Frire dans l'huile chaude jusqu'à coloration dorée."
    ]
  },
  {
    id: "p4", name: "Riz pilaf aux amandes et raisins secs", category: "parve", time: 25, servings: 4, calories: 380,
    ingredients: ["riz", "amandes", "raisins_secs", "oignon", "bouillon_legumes", "huile_olive", "sel"],
    steps: [
      "Faire revenir l'oignon puis le riz dans l'huile.",
      "Ajouter le bouillon et cuire à couvert 15 min.",
      "Incorporer amandes et raisins secs avant de servir."
    ]
  },
  {
    id: "p5", name: "Ratatouille", category: "parve", time: 45, servings: 4, calories: 220,
    ingredients: ["aubergine", "courgette", "poivron", "tomate", "oignon", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Couper tous les légumes en dés.",
      "Faire revenir l'oignon et l'ail, puis ajouter les autres légumes.",
      "Laisser mijoter à couvert 30 min en remuant de temps en temps."
    ]
  },
  {
    id: "p6", name: "Soupe de légumes maison", category: "parve", time: 35, servings: 4, calories: 150,
    ingredients: ["carotte", "pomme_de_terre", "poireau", "oignon", "bouillon_legumes", "sel", "poivre"],
    steps: [
      "Couper les légumes en morceaux.",
      "Cuire dans le bouillon 25 min jusqu'à tendreté.",
      "Mixer si désiré et rectifier l'assaisonnement."
    ]
  },
  {
    id: "p7", name: "Couscous aux légumes", category: "parve", time: 45, servings: 4, calories: 420,
    ingredients: ["semoule", "carotte", "courgette", "pois_chiches", "oignon", "curcuma", "bouillon_legumes", "sel", "poivre"],
    steps: [
      "Cuire les légumes et les pois chiches dans le bouillon avec le curcuma.",
      "Préparer la semoule selon les instructions avec un filet d'huile.",
      "Servir la semoule avec les légumes et leur bouillon."
    ]
  },
  {
    id: "p8", name: "Salade de pois chiches et concombre", category: "parve", time: 15, servings: 4, calories: 250,
    ingredients: ["pois_chiches", "concombre", "tomate", "citron", "huile_olive", "persil", "sel", "poivre"],
    steps: [
      "Mélanger pois chiches, concombre et tomate coupés en dés.",
      "Assaisonner avec le citron, l'huile d'olive, le persil, sel et poivre."
    ]
  },
  {
    id: "p9", name: "Poivrons farcis au riz et légumes (version parve)", category: "parve", time: 50, servings: 4, calories: 300,
    ingredients: ["poivron", "riz", "carotte", "oignon", "concentre_tomate", "huile_olive", "sel", "poivre"],
    steps: [
      "Vider les poivrons.",
      "Mélanger le riz, la carotte râpée, l'oignon et le concentré de tomate.",
      "Farcir et cuire au four 30 min à 190°C."
    ]
  },
  {
    id: "p10", name: "Saumon grillé au citron et herbes", category: "parve", time: 20, servings: 4, calories: 320,
    note: "Poisson : selon la coutume, à consommer séparément de la viande (mais compatible avec les repas lactés).",
    ingredients: ["saumon", "citron", "persil", "huile_olive", "sel", "poivre"],
    steps: [
      "Assaisonner le saumon avec citron, sel et poivre.",
      "Griller 4 min de chaque côté à la poêle ou au four.",
      "Parsemer de persil avant de servir."
    ]
  },
  {
    id: "p11", name: "Thon aux tomates et olives", category: "parve", time: 20, servings: 4, calories: 280,
    note: "Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["thon", "tomates_concassees", "olives", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'ail dans l'huile.",
      "Ajouter les tomates et les olives, laisser mijoter 10 min.",
      "Ajouter le thon et cuire encore 5 min."
    ]
  },
  {
    id: "p12", name: "Cabillaud à la provençale", category: "parve", time: 30, servings: 4, calories: 250,
    note: "Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["cabillaud", "tomate", "ail", "olives", "huile_olive", "persil", "sel", "poivre"],
    steps: [
      "Disposer le cabillaud dans un plat avec tomates, ail et olives.",
      "Arroser d'huile d'olive, saler et poivrer.",
      "Cuire au four 20 min à 190°C, parsemer de persil."
    ]
  },
  {
    id: "p13", name: "Pâtes aglio e olio (ail et huile d'olive)", category: "parve", time: 15, servings: 4, calories: 420,
    ingredients: ["pates", "ail", "huile_olive", "persil", "sel", "poivre"],
    steps: [
      "Cuire les pâtes al dente.",
      "Faire dorer l'ail dans l'huile d'olive à feu doux.",
      "Mélanger avec les pâtes et le persil."
    ]
  },
  {
    id: "p14", name: "Purée de patate douce", category: "parve", time: 30, servings: 4, calories: 220,
    ingredients: ["patate_douce", "huile_olive", "cannelle", "sel", "poivre"],
    steps: [
      "Cuire les patates douces à l'eau ou au four jusqu'à tendreté.",
      "Écraser en purée avec l'huile d'olive.",
      "Assaisonner d'une pointe de cannelle, sel et poivre."
    ]
  },
  {
    id: "p15", name: "Salade de carottes râpées au cumin et citron", category: "parve", time: 10, servings: 4, calories: 150,
    ingredients: ["carotte", "citron", "cumin", "huile_olive", "raisins_secs", "sel"],
    steps: [
      "Râper les carottes.",
      "Assaisonner avec le citron, le cumin et l'huile d'olive.",
      "Ajouter les raisins secs et mélanger."
    ]
  },
  {
    id: "p16", name: "Dattes farcies aux amandes", category: "parve", time: 10, servings: 4, calories: 200,
    ingredients: ["dattes", "amandes"],
    steps: [
      "Dénoyauter les dattes.",
      "Insérer une amande dans chaque datte.",
      "Servir tel quel en dessert ou avec le thé."
    ]
  },

  // ---------------- Recettes inspirées de cuisines du monde ----------------
  // (aucune n'a besoin d'un tampon "kasher" officiel : il suffit que chaque
  // ingrédient soit permis et qu'il n'y ait pas de mélange viande-lait)
  {
    id: "v15", name: "Tacos de boeuf épicés", category: "viande", time: 25, servings: 4, calories: 420,
    ingredients: ["boeuf_hache", "pain_pita", "oignon", "tomate", "salade", "cumin", "paprika", "sel", "poivre"],
    steps: [
      "Faire revenir le boeuf haché avec l'oignon, le cumin et le paprika.",
      "Réchauffer les pains pita.",
      "Garnir de viande, tomate et salade."
    ]
  },
  {
    id: "v16", name: "Lasagnes à la viande (sans fromage)", category: "viande", time: 60, servings: 4, calories: 480,
    note: "Sans fromage ni béchamel au lait, pour rester compatible avec un plat de viande (bessari).",
    ingredients: ["pates", "boeuf_hache", "tomates_concassees", "oignon", "ail", "sel", "poivre"],
    steps: [
      "Préparer une sauce bolognaise avec le boeuf, l'oignon, l'ail et les tomates.",
      "Alterner les feuilles de pâtes à lasagne et la sauce dans un plat.",
      "Enfourner 35 min à 190°C."
    ]
  },
  {
    id: "v17", name: "Riz sauté au poulet et légumes", category: "viande", time: 20, servings: 4, calories: 430,
    ingredients: ["escalope_poulet", "riz", "oeufs", "carotte", "petits_pois", "sauce_soja", "sel", "poivre"],
    steps: [
      "Faire sauter le poulet coupé en dés.",
      "Ajouter le riz cuit froid, la carotte et les petits pois.",
      "Pousser sur le côté, casser les oeufs, brouiller puis mélanger le tout avec la sauce soja."
    ]
  },
  {
    id: "v18", name: "Curry d'agneau aux lentilles et lait de coco", category: "viande", time: 50, servings: 4, calories: 520,
    ingredients: ["agneau", "lentilles", "lait_coco", "curcuma", "oignon", "ail", "sel", "poivre"],
    steps: [
      "Faire dorer l'agneau avec l'oignon et l'ail.",
      "Ajouter le curcuma, les lentilles et le lait de coco.",
      "Laisser mijoter 35 min à couvert."
    ]
  },
  {
    id: "v19", name: "Burger de boeuf maison", category: "viande", time: 20, servings: 4, calories: 550,
    ingredients: ["boeuf_hache", "pain_burger", "oignon", "tomate", "salade", "moutarde", "sel", "poivre"],
    steps: [
      "Former des steaks hachés et les cuire à la poêle.",
      "Toaster légèrement les pains.",
      "Garnir avec moutarde, salade, tomate et oignon."
    ]
  },
  {
    id: "v20", name: "Poulet façon teriyaki", category: "viande", time: 30, servings: 4, calories: 480,
    ingredients: ["cuisses_poulet", "miel", "sauce_soja", "ail", "riz", "sel", "poivre"],
    steps: [
      "Faire mariner le poulet avec la sauce soja, le miel et l'ail.",
      "Cuire à la poêle jusqu'à ce que la sauce caramélise.",
      "Servir avec du riz."
    ]
  },
  {
    id: "l13", name: "Pizza margherita", category: "lait", time: 30, servings: 4, calories: 380,
    ingredients: ["pate_a_pizza", "tomates_concassees", "mozzarella", "huile_olive", "sel"],
    steps: [
      "Étaler la pâte à pizza.",
      "Garnir de tomates concassées, mozzarella et un filet d'huile.",
      "Enfourner 12-15 min à 220°C."
    ]
  },
  {
    id: "l14", name: "Minestrone au parmesan", category: "lait", time: 40, servings: 4, calories: 280,
    ingredients: ["carotte", "pomme_de_terre", "haricots_verts", "pates", "tomates_concassees", "bouillon_legumes", "parmesan", "sel", "poivre"],
    steps: [
      "Cuire tous les légumes coupés en dés dans le bouillon 20 min.",
      "Ajouter les pâtes et cuire encore 10 min.",
      "Servir saupoudré de parmesan."
    ]
  },
  {
    id: "l15", name: "Pancakes maison", category: "lait", time: 20, servings: 4, calories: 350,
    ingredients: ["farine", "oeufs", "lait", "beurre", "sucre", "levure_chimique"],
    steps: [
      "Mélanger la farine, la levure et le sucre.",
      "Ajouter les oeufs, le lait et le beurre fondu, bien mélanger.",
      "Cuire de petites louches de pâte à la poêle beurrée."
    ]
  },
  {
    id: "l16", name: "Cheesecake sans cuisson", category: "lait", time: 30, servings: 6, calories: 380,
    ingredients: ["fromage_blanc", "biscuits_sec", "beurre", "sucre", "citron"],
    steps: [
      "Mixer les biscuits avec le beurre fondu et tasser au fond d'un moule.",
      "Mélanger le fromage blanc, le sucre et le jus de citron.",
      "Verser sur les biscuits et réfrigérer au moins 3h."
    ]
  },
  {
    id: "p17", name: "Curry de légumes et pois chiches", category: "parve", time: 35, servings: 4, calories: 350,
    ingredients: ["pois_chiches", "lait_coco", "curcuma", "oignon", "ail", "carotte", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et l'ail avec le curcuma.",
      "Ajouter la carotte, les pois chiches et le lait de coco.",
      "Laisser mijoter 20 min."
    ]
  },
  {
    id: "p18", name: "Nouilles sautées aux légumes", category: "parve", time: 20, servings: 4, calories: 380,
    ingredients: ["pates", "sauce_soja", "carotte", "poivron", "champignon", "ail", "sel", "poivre"],
    steps: [
      "Cuire les nouilles/pâtes et réserver.",
      "Faire sauter les légumes et l'ail à feu vif.",
      "Ajouter les nouilles et la sauce soja, mélanger 2 min."
    ]
  },
  {
    id: "p19", name: "Guacamole", category: "parve", time: 10, servings: 4, calories: 200,
    ingredients: ["avocat", "citron", "oignon", "coriandre", "sel"],
    steps: [
      "Écraser la chair des avocats à la fourchette.",
      "Ajouter le jus de citron, l'oignon finement haché et la coriandre.",
      "Assaisonner et mélanger."
    ]
  },
  {
    id: "p20", name: "Minestrone parve", category: "parve", time: 40, servings: 4, calories: 250,
    ingredients: ["carotte", "pomme_de_terre", "haricots_verts", "pates", "tomates_concassees", "bouillon_legumes", "sel", "poivre"],
    steps: [
      "Cuire tous les légumes coupés en dés dans le bouillon 20 min.",
      "Ajouter les pâtes et cuire encore 10 min.",
      "Servir bien chaud."
    ]
  },
  {
    id: "p21", name: "Riz cantonais parve", category: "parve", time: 20, servings: 4, calories: 380,
    ingredients: ["riz", "petits_pois", "carotte", "oeufs", "sauce_soja", "sel"],
    steps: [
      "Faire cuire les oeufs brouillés et réserver.",
      "Faire sauter le riz froid avec la carotte et les petits pois.",
      "Ajouter les oeufs et la sauce soja, mélanger."
    ]
  },
  {
    id: "p22", name: "Salade de quinoa aux légumes et citron", category: "parve", time: 20, servings: 4, calories: 280,
    ingredients: ["quinoa", "concombre", "tomate", "citron", "huile_olive", "persil", "sel"],
    steps: [
      "Cuire le quinoa puis le laisser refroidir.",
      "Ajouter le concombre et la tomate coupés en dés.",
      "Assaisonner avec citron, huile d'olive, persil et sel."
    ]
  },

  // ---------------- Recettes simples du quotidien (peu d'ingrédients) ----------------
  {
    id: "v21", name: "Sauté de poulet à l'oignon, tomate et carotte", category: "viande", time: 25, servings: 4, calories: 350,
    ingredients: ["cuisses_poulet", "oignon", "tomate", "carotte", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et la carotte coupés en morceaux dans un peu d'huile.",
      "Ajouter le poulet et le faire dorer sur toutes les faces.",
      "Ajouter la tomate coupée en dés, couvrir et laisser mijoter 15 min."
    ]
  },
  {
    id: "v22", name: "Poulet froid, concombre et tomate", category: "viande", time: 20, servings: 4, calories: 320,
    ingredients: ["escalope_poulet", "concombre", "tomate", "oignon", "huile_olive", "sel", "poivre"],
    steps: [
      "Cuire les escalopes de poulet à la poêle puis les couper en tranches.",
      "Couper le concombre, la tomate et l'oignon en dés.",
      "Mélanger le tout avec l'huile d'olive, le sel et le poivre."
    ]
  },
  {
    id: "p23", name: "Omelette nature aux oignons", category: "parve", time: 10, servings: 2, calories: 220,
    ingredients: ["oeufs", "oignon", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon émincé dans un peu d'huile.",
      "Battre les oeufs avec sel et poivre, verser dans la poêle.",
      "Cuire à feu doux jusqu'à ce que l'omelette soit prise."
    ]
  },
  {
    id: "p24", name: "Salade de concombre et tomate", category: "parve", time: 10, servings: 4, calories: 120,
    ingredients: ["concombre", "tomate", "oignon", "huile_olive", "sel"],
    steps: [
      "Couper le concombre, la tomate et l'oignon en dés ou en rondelles.",
      "Assaisonner avec l'huile d'olive et le sel."
    ]
  },
  {
    id: "p25", name: "Poêlée simple de légumes", category: "parve", time: 20, servings: 4, calories: 150,
    ingredients: ["carotte", "oignon", "tomate", "sel", "poivre"],
    steps: [
      "Couper tous les légumes en morceaux.",
      "Faire revenir l'oignon et la carotte 5 min dans un peu d'huile.",
      "Ajouter la tomate et laisser mijoter 10 min à couvert."
    ]
  },
  {
    id: "l17", name: "Concombre au fromage blanc", category: "lait", time: 10, servings: 4, calories: 140,
    ingredients: ["concombre", "fromage_blanc", "sel"],
    steps: [
      "Couper ou râper le concombre.",
      "Mélanger avec le fromage blanc.",
      "Saler et servir frais."
    ]
  },
  {
    id: "v23", name: "Poulet mijoté à la tomate et à l'ail", category: "viande", time: 35, servings: 4, calories: 340,
    ingredients: ["cuisses_poulet", "tomate", "ail", "oignon", "sel", "poivre", "huile_olive"],
    steps: [
      "Faire dorer le poulet dans l'huile avec l'oignon et l'ail émincés.",
      "Ajouter les tomates coupées en dés.",
      "Couvrir et laisser mijoter 25 min à feu doux, en écrasant un peu les tomates."
    ]
  },
  {
    id: "p26", name: "Sauce tomate maison à l'ail", category: "parve", time: 20, servings: 4, calories: 90,
    ingredients: ["tomate", "ail", "oignon", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et l'ail dans l'huile d'olive.",
      "Ajouter les tomates coupées en dés et laisser mijoter 15 min à feu doux.",
      "Utiliser avec des pâtes, du riz ou en accompagnement."
    ]
  },
  {
    id: "p27", name: "Thon à la tomate et à l'ail", category: "parve", time: 15, servings: 4, calories: 220,
    note: "Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["thon", "tomate", "ail", "oignon", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et l'ail dans l'huile.",
      "Ajouter la tomate coupée en dés, laisser mijoter 10 min.",
      "Ajouter le thon égoutté et réchauffer 5 min."
    ]
  },

  // ---------------- Recettes "génériques" (protéine + n'importe quel légume) ----------------
  // Ces recettes utilisent "legume_libre" : elles se déclenchent dès que vous avez
  // la protéine ET au moins un légume, quel qu'il soit (tomate, poivron, champignon...).
  {
    id: "v24", name: "Dinde sautée aux légumes", category: "viande", time: 25, servings: 4, calories: 320,
    ingredients: ["dinde", "legume_libre", "oignon", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Couper la dinde en lanières ou en dés.",
      "Faire revenir l'oignon et l'ail, ajouter la dinde et la faire dorer.",
      "Ajouter le ou les légumes coupés en morceaux et cuire 10-15 min en remuant."
    ]
  },
  {
    id: "v25", name: "Agneau sauté aux légumes", category: "viande", time: 30, servings: 4, calories: 400,
    ingredients: ["agneau", "legume_libre", "oignon", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Couper l'agneau en morceaux.",
      "Faire dorer l'agneau avec l'oignon et l'ail.",
      "Ajouter le ou les légumes et laisser mijoter 15-20 min à couvert."
    ]
  },
  {
    id: "v26", name: "Merguez et légumes poêlés", category: "viande", time: 20, servings: 4, calories: 430,
    ingredients: ["merguez", "legume_libre", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire cuire les merguez à la poêle 10-12 min.",
      "Dans une autre poêle, faire sauter le ou les légumes dans l'huile.",
      "Servir ensemble."
    ]
  },
  {
    id: "v27", name: "Boeuf sauté aux légumes", category: "viande", time: 25, servings: 4, calories: 380,
    ingredients: ["boeuf_hache", "legume_libre", "oignon", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et l'ail, ajouter le boeuf et le faire bien dorer.",
      "Ajouter le ou les légumes coupés en morceaux.",
      "Cuire encore 10 min en remuant."
    ]
  },
  {
    id: "p28", name: "Poisson poêlé aux légumes", category: "parve", time: 20, servings: 4, calories: 300,
    note: "Cabillaud, saumon ou thon conviennent tous pour cette recette. Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["cabillaud", "legume_libre", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire cuire le poisson à la poêle 3-4 min de chaque côté.",
      "Faire sauter le ou les légumes dans un peu d'huile.",
      "Servir le poisson accompagné des légumes."
    ]
  },
  {
    id: "p29", name: "Légumes sautés maison", category: "parve", time: 15, servings: 4, calories: 130,
    ingredients: ["legume_libre", "huile_olive", "sel", "poivre"],
    steps: [
      "Couper le ou les légumes en morceaux.",
      "Faire sauter à feu vif dans l'huile d'olive 8-10 min.",
      "Saler et poivrer avant de servir."
    ]
  },
  {
    id: "l18", name: "Gratin de légumes au fromage", category: "lait", time: 30, servings: 4, calories: 280,
    ingredients: ["legume_libre", "fromage_rape", "huile_olive", "sel", "poivre"],
    steps: [
      "Couper le ou les légumes et les disposer dans un plat huilé.",
      "Couvrir de fromage râpé.",
      "Enfourner 20 min à 190°C jusqu'à ce que le fromage soit doré."
    ]
  },

  // ---------------- Recettes inspirées de blogs de cuisine juive/kasher ----------------
  {
    id: "l19", name: "Salade fraîche de courgette et pois chiches au yaourt", category: "lait", time: 10, servings: 4, calories: 190,
    note: "Recette inspirée du blog de cuisine juive Juliette Rivkah.",
    ingredients: ["courgette", "pois_chiches", "menthe", "citron", "yaourt", "huile_olive", "sel", "poivre"],
    steps: [
      "Laver les courgettes et les couper en petits dés : elles se mangent crues et restent bien croquantes.",
      "Égoutter les pois chiches et les ajouter aux courgettes.",
      "Ciseler la menthe fraîche et l'incorporer, puis presser le jus d'un citron sur la préparation.",
      "Ajouter le yaourt, l'huile d'olive, le sel et le poivre. Mélanger et réserver au frais avant de servir."
    ]
  },
  {
    id: "l20", name: "Tarte salée au chèvre et aux épinards", category: "lait", time: 45, servings: 4, calories: 380,
    note: "Astuce pour une version parve : remplacer la crème par de la crème de soja et le chèvre par des noix ou pignons de pin. Recette inspirée du blog de cuisine juive Juliette Rivkah.",
    ingredients: ["pate_a_tarte", "fromage_chevre", "epinard", "creme_fraiche", "oeufs", "sel", "poivre"],
    steps: [
      "Faire décongeler les épinards à la casserole avec un peu d'eau pendant une dizaine de minutes.",
      "Préchauffer le four à 200°C. Étaler la pâte dans un moule à tarte et la piquer à la fourchette.",
      "Battre l'oeuf avec la crème fraîche, le sel et le poivre.",
      "Répartir les épinards égouttés sur la pâte, puis verser la préparation aux oeufs et à la crème.",
      "Disposer des rondelles de chèvre sur le dessus et enfourner 30 min, jusqu'à ce que le fromage soit doré."
    ]
  },
  {
    id: "p30", name: "Salade d'été aux aubergines et pommes de terre", category: "parve", time: 45, servings: 4, calories: 260,
    note: "Recette inspirée du blog de cuisine juive Juliette Rivkah.",
    ingredients: ["pomme_de_terre", "aubergine", "oignon", "pois_chiches", "huile_olive", "vinaigre", "moutarde", "origan", "sel", "poivre"],
    steps: [
      "Éplucher et cuire les pommes de terre coupées en gros morceaux à l'eau bouillante environ 30 min.",
      "Pendant ce temps, couper les aubergines en dés et les faire revenir à feu vif dans l'huile jusqu'à ce qu'elles ramollissent.",
      "Faire revenir l'oignon émincé séparément.",
      "Égoutter les pommes de terre, les mélanger aux aubergines et à l'oignon.",
      "Préparer une vinaigrette avec la moutarde, l'huile d'olive, le vinaigre, le sel et le poivre.",
      "Mélanger le tout avec les pois chiches et l'origan. Laisser refroidir avant de servir (encore meilleure préparée la veille)."
    ]
  },

  // ---------------- Spécialités juives : tunisiennes d'abord, puis d'autres traditions ----------------
  {
    id: "v28", name: "Couscous tunisien à la viande", category: "viande", time: 90, servings: 4, calories: 520,
    note: "Spécialité juive tunisienne, souvent servie à Chabbat et lors des fêtes, généreusement relevée à la harissa.",
    ingredients: ["semoule", "agneau", "pois_chiches", "carotte", "courgette", "harissa", "curcuma", "concentre_tomate", "oignon", "ail", "sel", "poivre"],
    steps: [
      "Faire dorer la viande avec l'oignon, l'ail, le curcuma et le concentré de tomate.",
      "Ajouter un fond d'eau, les carottes et les pois chiches, laisser mijoter 45 min.",
      "Ajouter les courgettes et poursuivre la cuisson 15 min.",
      "Ajouter une cuillère de harissa selon le goût (à ajuster, c'est traditionnellement bien relevé).",
      "Préparer la semoule selon les instructions et servir avec la viande, les légumes et leur bouillon."
    ]
  },
  {
    id: "v29", name: "Pkaila tunisienne", category: "viande", time: 150, servings: 4, calories: 480,
    note: "Grand classique de la cuisine juive tunisienne, traditionnellement préparé pour Roch Hachana. Les épinards longuement cuits prennent une couleur presque noire.",
    ingredients: ["boeuf_ragout", "epinard", "haricots_blancs", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir la viande avec l'ail dans l'huile jusqu'à coloration.",
      "Ajouter les épinards (frais ou surgelés) et un fond d'eau.",
      "Laisser mijoter à feu doux au moins 2h, en remuant de temps en temps, jusqu'à ce que les épinards foncent.",
      "Ajouter les haricots blancs égouttés et poursuivre la cuisson 20 min. Servir avec du pain ou de la semoule."
    ]
  },
  {
    id: "v30", name: "Loubia tunisienne (haricots blancs à la viande)", category: "viande", time: 70, servings: 4, calories: 430,
    note: "Ragoût de haricots blancs à la viande, typique de la cuisine juive tunisienne.",
    ingredients: ["boeuf_ragout", "haricots_blancs", "tomates_concassees", "ail", "cumin", "oignon", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire dorer la viande avec l'oignon et l'ail.",
      "Ajouter les tomates concassées et le cumin, laisser mijoter 15 min.",
      "Ajouter les haricots blancs et un fond d'eau.",
      "Laisser mijoter à couvert 40 min, jusqu'à ce que la sauce épaississe. Servir avec du pain ou de la semoule."
    ]
  },
  {
    id: "v31", name: "Tfina tunisienne (plat de Chabbat)", category: "viande", time: 180, servings: 4, calories: 460,
    note: "Plat mijoté du vendredi, laissé sur feu très doux jusqu'au repas de Chabbat du lendemain midi. Variante tunisienne du hamin/dafina séfarade.",
    ingredients: ["boeuf_ragout", "pomme_de_terre", "pois_chiches", "oeufs", "ail", "huile_olive", "sel", "poivre"],
    steps: [
      "Dans une grande cocotte, disposer la viande, les pommes de terre entières, les pois chiches et les oeufs dans leur coquille.",
      "Ajouter l'ail, l'huile, le sel et le poivre, puis couvrir largement d'eau.",
      "Porter à ébullition puis couvrir et laisser mijoter à feu très doux pendant plusieurs heures (traditionnellement toute la nuit).",
      "Écaler les oeufs (devenus marbrés) avant de servir avec la viande et les légumes."
    ]
  },
  {
    id: "l21", name: "Kugel de nouilles sucré", category: "lait", time: 60, servings: 6, calories: 380,
    note: "Gratin de nouilles sucré, classique de la cuisine juive ashkénaze, souvent servi à Chabbat ou aux fêtes.",
    ingredients: ["pates", "oeufs", "lait", "sucre", "beurre", "raisins_secs", "cannelle"],
    steps: [
      "Cuire les pâtes (type nouilles larges) al dente et égoutter.",
      "Battre les oeufs avec le lait, le sucre et la cannelle.",
      "Mélanger avec les pâtes, le beurre fondu et les raisins secs.",
      "Verser dans un plat beurré et enfourner 40 min à 180°C jusqu'à ce que le dessus soit doré."
    ]
  },
  {
    id: "v32", name: "Couscous royal (agneau, merguez et poulet)", category: "viande", time: 100, servings: 6, calories: 560,
    note: "Version festive du couscous tunisien, avec trois viandes, souvent servie lors des grandes occasions.",
    ingredients: ["semoule", "agneau", "merguez", "cuisses_poulet", "pois_chiches", "carotte", "courgette", "harissa", "curcuma", "concentre_tomate", "oignon", "ail", "sel", "poivre"],
    steps: [
      "Faire dorer l'agneau et le poulet avec l'oignon, l'ail, le curcuma et le concentré de tomate.",
      "Ajouter un fond d'eau, les carottes et les pois chiches, laisser mijoter 40 min.",
      "Ajouter les courgettes et les merguez, poursuivre la cuisson 20 min.",
      "Préparer la semoule selon les instructions et servir le tout avec la harissa à côté."
    ]
  },
  {
    id: "p32", name: "Couscous au poisson", category: "parve", time: 50, servings: 4, calories: 380,
    note: "Variante côtière tunisienne du couscous, au poisson plutôt qu'à la viande. Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["semoule", "cabillaud", "carotte", "courgette", "harissa", "curcuma", "ail", "oignon", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon et l'ail avec le curcuma.",
      "Ajouter un fond d'eau, les carottes, et laisser mijoter 20 min.",
      "Ajouter les courgettes et le poisson, poursuivre la cuisson 10-12 min à couvert sans faire bouillir fort.",
      "Préparer la semoule et servir avec le poisson, les légumes et la harissa à côté."
    ]
  },
  {
    id: "p31", name: "Boulettes de poisson façon \"gefilte fish\"", category: "parve", time: 60, servings: 4, calories: 220,
    note: "Boulettes de poisson pochées, plat traditionnel de la cuisine juive ashkénaze pour Chabbat et les fêtes.",
    ingredients: ["cabillaud", "oeufs", "oignon", "carotte", "farine", "sel", "poivre"],
    steps: [
      "Mixer le poisson avec l'oignon, l'oeuf, la farine, le sel et le poivre jusqu'à obtenir une pâte homogène.",
      "Former des boulettes ovales avec les mains humides.",
      "Pocher les boulettes 30 min dans un bouillon avec des rondelles de carotte.",
      "Laisser refroidir dans le bouillon avant de servir, avec les rondelles de carotte."
    ]
  },

  // --- Cuisines du monde (kasher par les ingrédients, sans mélange viande/lait) ---
  {
    id: "v34", name: "Poulet basquaise", category: "viande", time: 45, servings: 4, calories: 320,
    note: "Grand classique du Sud-Ouest de la France, kasher dès lors que le poulet est cachérisé.",
    ingredients: ["cuisses_poulet", "poivron", "tomate", "oignon", "ail", "paprika", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire dorer les morceaux de poulet dans l'huile d'olive, réserver.",
      "Faire revenir l'oignon, l'ail et les poivrons coupés en lanières.",
      "Ajouter les tomates concassées, le paprika et remettre le poulet.",
      "Couvrir et laisser mijoter 30 min à feu doux."
    ]
  },
  {
    id: "v35", name: "Boeuf sauté au brocoli, sauce soja", category: "viande", time: 20, servings: 4, calories: 340,
    note: "Recette d'inspiration asiatique, rapide et sans produit laitier.",
    ingredients: ["boeuf_hache", "brocoli", "sauce_soja", "ail", "riz", "huile_olive"],
    steps: [
      "Faire chauffer l'huile à feu vif et saisir le boeuf coupé en fines lanières 2-3 min.",
      "Ajouter l'ail et les fleurettes de brocoli, faire sauter 5 min.",
      "Arroser de sauce soja, mélanger et cuire encore 2 min.",
      "Servir aussitôt avec du riz."
    ]
  },
  {
    id: "v36", name: "Fajitas de poulet", category: "viande", time: 25, servings: 4, calories: 380,
    note: "Version simplifiée des fajitas tex-mex, avec du pain pita à la place de la tortilla.",
    ingredients: ["escalope_poulet", "poivron", "oignon", "cumin", "paprika", "pain_pita", "huile_olive", "sel"],
    steps: [
      "Couper le poulet, les poivrons et l'oignon en lanières.",
      "Faire revenir le poulet avec le cumin et le paprika jusqu'à ce qu'il soit doré.",
      "Ajouter les poivrons et l'oignon, poursuivre la cuisson 8 min.",
      "Servir chaud, roulé dans le pain pita tiédi."
    ]
  },
  {
    id: "v37", name: "Curry vert de poulet", category: "viande", time: 30, servings: 4, calories: 420,
    note: "Curry d'inspiration thaïlandaise, sans produit laitier grâce au lait de coco.",
    ingredients: ["cuisses_poulet", "lait_coco", "courgette", "curcuma", "coriandre", "citron", "huile_olive", "sel"],
    steps: [
      "Faire dorer le poulet dans l'huile avec le curcuma.",
      "Ajouter la courgette coupée en rondelles et faire revenir 3 min.",
      "Verser le lait de coco, couvrir et laisser mijoter 20 min.",
      "Ajouter un filet de citron et parsemer de coriandre fraîche avant de servir."
    ]
  },
  {
    id: "v38", name: "Empanadas de boeuf", category: "viande", time: 50, servings: 4, calories: 360,
    note: "Chaussons feuilletés d'origine sud-américaine, garnis de viande.",
    ingredients: ["pate_a_tarte", "boeuf_hache", "oignon", "cumin", "paprika", "oeufs", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon puis le boeuf haché avec le cumin et le paprika.",
      "Saler, poivrer et laisser refroidir légèrement.",
      "Découper des cercles de pâte, garnir d'une cuillère de farce et refermer en chausson.",
      "Dorer au jaune d'oeuf et enfourner 20-25 min à 200°C jusqu'à ce que ce soit doré."
    ]
  },
  {
    id: "v39", name: "Bo bun de boeuf", category: "viande", time: 30, servings: 4, calories: 400,
    note: "Salade de vermicelles vietnamienne, sans produit laitier.",
    ingredients: ["boeuf_ragout", "vermicelles", "carotte", "menthe", "coriandre", "sauce_soja", "citron", "huile_olive"],
    steps: [
      "Faire cuire les vermicelles selon les instructions, égoutter et laisser refroidir.",
      "Faire mariner puis saisir le boeuf coupé en fines lamelles à la poêle.",
      "Râper la carotte, ciseler la menthe et la coriandre.",
      "Dresser les vermicelles, ajouter le boeuf, les légumes et les herbes, arroser de sauce soja et de citron."
    ]
  },
  {
    id: "p33", name: "Poke bowl au saumon", category: "parve", time: 20, servings: 2, calories: 420,
    note: "Bol composé d'inspiration hawaïenne. Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["riz", "saumon", "concombre", "avocat", "sauce_soja", "citron"],
    steps: [
      "Faire cuire le riz et le laisser tiédir.",
      "Couper le saumon, le concombre et l'avocat en dés.",
      "Dresser le riz dans un bol, disposer le saumon et les légumes par-dessus.",
      "Arroser de sauce soja et d'un filet de citron avant de servir."
    ]
  },
  {
    id: "p34", name: "Buddha bowl pois chiches et avocat", category: "parve", time: 20, servings: 2, calories: 380,
    ingredients: ["quinoa", "pois_chiches", "avocat", "concombre", "citron", "huile_olive", "sel"],
    steps: [
      "Faire cuire le quinoa selon les instructions.",
      "Égoutter et rincer les pois chiches.",
      "Couper l'avocat et le concombre en morceaux.",
      "Dresser tous les éléments dans un bol, arroser d'huile d'olive et de citron, saler."
    ]
  },
  {
    id: "p35", name: "Curry de pois chiches et épinards", category: "parve", time: 25, servings: 4, calories: 320,
    note: "Inspiré du chana masala indien, sans produit laitier grâce au lait de coco.",
    ingredients: ["pois_chiches", "epinard", "lait_coco", "curcuma", "ail", "oignon", "huile_olive", "sel"],
    steps: [
      "Faire revenir l'oignon et l'ail avec le curcuma dans l'huile.",
      "Ajouter les pois chiches égouttés et le lait de coco, laisser mijoter 10 min.",
      "Ajouter les épinards et cuire encore 5 min jusqu'à ce qu'ils soient fondus.",
      "Saler et servir, avec du riz si vous en avez."
    ]
  },
  {
    id: "p36", name: "Tortilla espagnole (omelette aux pommes de terre)", category: "parve", time: 35, servings: 4, calories: 300,
    ingredients: ["oeufs", "pomme_de_terre", "oignon", "huile_olive", "sel"],
    steps: [
      "Faire cuire les pommes de terre et l'oignon coupés en fines tranches dans l'huile à feu doux 20 min.",
      "Battre les oeufs avec du sel, ajouter les pommes de terre et l'oignon.",
      "Verser le tout dans la poêle et cuire à feu doux 8-10 min.",
      "Retourner à l'aide d'une assiette et cuire l'autre face 5 min."
    ]
  },
  {
    id: "p37", name: "Saumon teriyaki", category: "parve", time: 20, servings: 4, calories: 340,
    note: "Poisson : selon la coutume, à consommer séparément de la viande.",
    ingredients: ["saumon", "sauce_soja", "miel", "ail", "huile_olive"],
    steps: [
      "Mélanger la sauce soja, le miel et l'ail écrasé pour la marinade.",
      "Faire mariner le saumon 10 min, puis le saisir à la poêle 3-4 min de chaque côté.",
      "Verser le reste de marinade dans la poêle et laisser réduire 1-2 min.",
      "Servir avec du riz si vous en avez."
    ]
  },
  {
    id: "p38", name: "Riz cantonais aux légumes et oeufs", category: "parve", time: 20, servings: 4, calories: 340,
    ingredients: ["riz", "oeufs", "petits_pois", "carotte", "sauce_soja", "huile_olive", "sel"],
    steps: [
      "Faire cuire le riz puis le laisser refroidir (idéalement du riz de la veille).",
      "Battre les oeufs et les cuire en fine omelette, puis couper en lanières.",
      "Faire sauter les petits pois et la carotte dans l'huile, ajouter le riz.",
      "Ajouter l'omelette en lanières et la sauce soja, bien mélanger à feu vif."
    ]
  },
  {
    id: "l22", name: "Croque fromage doré", category: "lait", time: 10, servings: 2, calories: 380,
    ingredients: ["pain_burger", "fromage_rape", "beurre", "sel"],
    steps: [
      "Beurrer légèrement l'extérieur des pains.",
      "Garnir de fromage râpé et refermer.",
      "Faire dorer à la poêle 3-4 min de chaque côté jusqu'à ce que le fromage soit fondu."
    ]
  },
  {
    id: "l23", name: "Risotto au potiron", category: "lait", time: 35, servings: 4, calories: 420,
    ingredients: ["riz", "potiron", "parmesan", "oignon", "bouillon_legumes", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon dans l'huile, ajouter le riz et nacrer 2 min.",
      "Ajouter le potiron coupé en petits dés.",
      "Verser le bouillon louche par louche en remuant, jusqu'à absorption complète (environ 20 min).",
      "Ajouter le parmesan râpé hors du feu, saler, poivrer et servir aussitôt."
    ]
  },
  {
    id: "v40", name: "Pâtes à la bolognaise", category: "viande", time: 40, servings: 4, calories: 480,
    note: "Version kasher du grand classique italien : pas de parmesan (à base de lait) puisque c'est un plat de viande.",
    ingredients: ["pates", "boeuf_hache", "tomates_concassees", "carotte", "oignon", "ail", "vin_rouge", "origan", "huile_olive", "sel", "poivre"],
    steps: [
      "Faire revenir l'oignon, l'ail et la carotte coupés finement dans l'huile d'olive.",
      "Ajouter le boeuf haché et faire bien dorer en émiettant à la fourchette.",
      "Ajouter les tomates concassées, un peu de vin rouge et l'origan, saler, poivrer.",
      "Laisser mijoter à feu doux 25 à 30 min en remuant de temps en temps.",
      "Faire cuire les pâtes, égoutter et servir avec la sauce bolognaise par-dessus."
    ]
  }
];
