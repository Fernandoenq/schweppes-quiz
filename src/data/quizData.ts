export const items = [
    { src: '../../public/ingredients/Campari 900ml.png', label: '50ML CAMPARI' },
    { src: '../../public/ingredients/Schweppes Tonica SA Lata 350ml.png', label: '150ML SCHWEPPES TONICA' },
  
    { src: '../../public/ingredients/Schweppes Tonica SA Lata 350ml.png', label: '100ML SCHWEPPES TONICA' },
    { src: '../../public/ingredients/SCHTonicLimaoc-Sal.png', label: '100ML SCHWEPPES TONICA LIMÃO' },
    { src: '../../public/ingredients/Tônica Rosé 220ml.png', label: '100ML SCHWEPPES TONICA ROSE' },
  
    { src: '../../public/ingredients/Skyy Tradicional 980ml.png', label: '50ML VODKA SKYY' },
    { src: '../../public/ingredients/Gingerale 220ml.png', label: '100ML SCHWEPPES TONICA GINGER' },
    { src: '../../public/ingredients/Brazil_Monster Energy_Green_269ml_Can_HRO2_0624.png', label: '50ML MONSTER GREEN' },
  
    { src: '../../public/ingredients/Jim_BEAM_Frente.png', label: '50ML JIM BEAM' },
    { src: '../../public/ingredients/Citrus Lata 350ml.png', label: '150ML SCHWEPPES TONICA CITRUS' },
  
    { src: '../../public/ingredients/Gin Bulldog.png', label: '50ML GIN BULLDOG' },
    { src: '../../public/ingredients/MLoco_Brazil_269ml_nobugs.png', label: '50ML MONSTER MANGO LOCO' },
  
    { src: '../../public/ingredients/Riccadonna-prosecco-doc-Bottle-75cl-basic.png', label: '60ML PROSECCO' },
    { src: '../../public/ingredients/vino spumante dry.png', label: '60ML VINO SPUMANTE DRY' },
    { src: '../../public/ingredients/Aperol GAR VD 750ml.png', label: '60ML APEROL' },
    { src: '../../public/ingredients/aguagas.png', label: '20ML ÁGUA COM GÁS' },
  ];
  
  export const recipes: Record<string, string[]> = {
    'CAMPARI TONIC': ['50ML CAMPARI', '150ML SCHWEPPES TONICA'],
    'GIN TÔNICA': ['50ML GIN BULLDOG', '100ML SCHWEPPES TONICA', '100ML SCHWEPPES TONICA LIMÃO', '100ML SCHWEPPES TONICA ROSE'],
    'SKYY MOSCOW MULLE': ['50ML VODKA SKYY', '100ML SCHWEPPES TONICA GINGER', '50ML MONSTER GREEN'],
    'JB CITRUS': ['50ML JIM BEAM', '150ML SCHWEPPES TONICA CITRUS'],
    'MONSTER GIN': ['50ML GIN BULLDOG', '50ML MONSTER MANGO LOCO'],
    'APEROL': ['60ML APEROL', '60ML PROSECCO', '20ML ÁGUA COM GÁS', '60ML VINO SPUMANTE DRY'],
  };
  
  export const resultado = {
    'CAMPARI TONIC': '../../public/ingredients/CAMPARI TONIC kit.png',
    'GIN TÔNICA': '../../public/ingredients/GIN TONICA kit.png',
    'SKYY MOSCOW MULLE': '../../public/ingredients/SKYY MOSCOW MULLE kit.png',
    'JB CITRUS': '../../public/ingredients/JB CITRUS kit.png',
    'MONSTER GIN': '../../public/ingredients/MONSTER GIN kit.png',
    'APEROL': '../../public/ingredients/APEROL kit.png',
  };

  export const drinks = {
    'CAMPARI TONIC': '../../public/ingredients/CAMPARI TONIC.png',
    'GIN TÔNICA': '../../public/ingredients/GIN TONICA.png',
    'SKYY MOSCOW MULLE': '../../public/ingredients/SKYY MOSCOW MULLE.png',
    'JB CITRUS': '../../public/ingredients/JB CITRUS.png',
    'MONSTER GIN': '../../public/ingredients/MONSTER GIN.png',
    'APEROL': '../../public/ingredients/APEROL.png',
  };
  
  export const recipesList: Array<keyof typeof resultado> = [
    'CAMPARI TONIC',
    'GIN TÔNICA',
    'SKYY MOSCOW MULLE',
    'JB CITRUS',
    'MONSTER GIN',
    'APEROL',
  ];
  