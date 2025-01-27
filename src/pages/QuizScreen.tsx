import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/QuizScreen.css'

const QuizScreen: React.FC = () => {
  
  const items = [
    //CAMPARI TONIC
    { src: '../../public/ingredients/Campari 900ml.png', label: '50ML CAMPARI' },
    { src: '../../public/ingredients/Schweppes Tonica SA Lata 350ml.png', label: '150ML SCHWEPPES TONICA' },

    //GIN TÔNICA
    //{ src: '../../public/ingredients/Gin Bulldog.png', label: '50ML GIN BULLDOG' },
    { src: '../../public/ingredients/Schweppes Tonica SA Lata 350ml.png', label: '100ML SCHWEPPES TONICA' },
    { src: '../../public/ingredients/SCHTonicLimaoc-Sal.png', label: '100ML SCHWEPPES TONICA LIMÃO' },
    { src: '../../public/ingredients/Tônica Rosé 220ml.png', label: '100ML SCHWEPPES TONICA ROSE' },

    //SKYY MOSCOW MULLE
    { src: '../../public/ingredients/Skyy Tradicional 980ml.png', label: '50ML VODKA SKYY' },
    { src: '../../public/ingredients/Gingerale 220ml.png', label: '100ML SCHWEPPES TONICA GINGER' },
    { src: '../../public/ingredients/Brazil_Monster Energy_Green_269ml_Can_HRO2_0624.png', label: '50ML MONSTER GREEN' },

    //JB CITRUS
    { src: '../../public/ingredients/Jim_BEAM_Frente.png', label: '50ML JIM BEAM' },
    { src: '../../public/ingredients/Citrus Lata 350ml.png', label: '150ML SCHWEPPES TONICA CITRUS' },

    //MONSTER GIN
    { src: '../../public/ingredients/Gin Bulldog.png', label: '50ML GIN BULLDOG' },
    { src: '../../public/ingredients/MLoco_Brazil_269ml_nobugs.png', label: '50ML MONSTER MANGO LOCO' },

    //APEROL
    { src: '../../public/ingredients/Riccadonna-prosecco-doc-Bottle-75cl-basic.png', label: '60ML PROSECCO' },
    { src: '../../public/ingredients/vino spumante dry.png', label: '60ML VINO SPUMANTE DRY' },
    { src: '../../public/ingredients/Aperol GAR VD 750ml.png', label: '60ML APEROL' },
    { src: '../../public/ingredients/aguagas.png', label: '20ML ÁGUA COM GÁS' },
  ];

  const recipes: Record<string, string[]> = {
    'CAMPARI TONIC': ['50ML CAMPARI', '150ML SCHWEPPES TONICA'],
    'GIN TÔNICA': ['50ML GIN BULLDOG', '100ML SCHWEPPES TONICA', '100ML SCHWEPPES TONICA LIMÃO', '100ML SCHWEPPES TONICA ROSE'],
    'SKYY MOSCOW MULLE': ['50ML VODKA SKYY', '100ML SCHWEPPES TONICA GINGER', '50ML MONSTER GREEN'],
    'JB CITRUS': ['50ML JIM BEAM', '150ML SCHWEPPES TONICA CITRUS'],
    'MONSTER GIN': ['50ML GIN BULLDOG', '50ML MONSTER MANGO LOCO'],
    'APEROL': ['60ML APEROL', '60ML PROSECCO', '20ML ÁGUA COM GÁS', '60ML VINO SPUMANTE DRY'],
  };

  const resultado = {
    'CAMPARI TONIC': '../../public/ingredients/CAMPARI TONIC kit.png',
    'GIN TÔNICA': '../../public/ingredients/GIN TONICA kit.png',
    'SKYY MOSCOW MULLE': '../../public/ingredients/SKYY MOSCOW MULLE kit.png',
    'JB CITRUS': '../../public/ingredients/JB CITRUS kit.png',
    'MONSTER GIN': '../../public/ingredients/MONSTER GIN kit.png',
    'APEROL': '../../public/ingredients/APEROL kit.png', 
  };

  const recipesList: Array<keyof typeof resultado> = [
    'CAMPARI TONIC',
    'GIN TÔNICA',
    'SKYY MOSCOW MULLE',
    'JB CITRUS',
    'MONSTER GIN',
    'APEROL',
  ];

  const getRandomRecipe = () => {
    const storedRecipe = localStorage.getItem('selectedRecipe');
    let previousRecipe = storedRecipe ? JSON.parse(storedRecipe) : null;
  
    let newRecipe;
    do {
      const randomIndex = Math.floor(Math.random() * recipesList.length);
      newRecipe = recipesList[randomIndex];
    } while (newRecipe === previousRecipe && recipesList.length > 1);
  
    return newRecipe;
  };
  

  const [selectedRecipe, setSelectedRecipe] = useState<keyof typeof resultado>(getRandomRecipe());
const [correctAnswers, setCorrectAnswers] = useState<string[]>(recipes[selectedRecipe] || []);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [validated, setValidated] = useState<boolean | null>(null);
  const [showResultImage, setShowResultImage] = useState<boolean>(false);

  useEffect(() => {
    setSelectedRecipe(getRandomRecipe());
  }, []);
  useEffect(() => {
    setCorrectAnswers(recipes[selectedRecipe] || []);
  }, [selectedRecipe]);
  
  
  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const filteredItems = React.useMemo(() => {
    const selected = items
      .filter(item => correctAnswers.includes(item.label))
      .concat(items.filter(item => !correctAnswers.includes(item.label)).slice(0, 12 - correctAnswers.length));
    return shuffleArray(selected);
  }, [correctAnswers]);

  const handleImageClick = (label: string) => {
    setSelectedItems((prev) => {
      let updatedItems;
      if (prev.includes(label)) {
        updatedItems = prev.filter((item) => item !== label);
      } else {
        updatedItems = [...prev, label];
      }
      return updatedItems;
    });
  };

  const validateSelection = () => {
    const isCorrect = correctAnswers.length === selectedItems.length && correctAnswers.every(item => selectedItems.includes(item));
    setValidated(isCorrect);    
    setTimeout(() => {
      setShowResultImage(true);
    }, 3000);
    
  };

 

  const navigate = useNavigate();
  useEffect(() => {
    if (showResultImage) {
      
      const timeout = setTimeout(() => {
        localStorage.setItem('unlocked', JSON.stringify(validated));
        localStorage.setItem('selectedRecipe', JSON.stringify(selectedRecipe));
        navigate('/destrava', { state: { unlocked: validated } });
      }, 5000);
      
      return () => clearTimeout(timeout); 
    }
  }, [showResultImage, navigate]);

  return (
    
    <div
      className="d-flex div-geral">
      <h1 className="h1-selectedRecipe">
        {selectedRecipe}
      </h1>

      <div className="container-opcoes mt-5">
        <div className="row row-cols-4 g-3">
          {filteredItems.map((item, index) => (
            <div key={index} className="col">
              <img
                src={item.src}
                alt={item.label}
                className="img-fluid"
                style={{
                  cursor: 'pointer',
                  backgroundColor: selectedItems.includes(item.label) ? (validated === null ? 'white' : validated ? 'yellow' : 'red') : 'transparent',
                  borderRadius: '10px',
                }}
                onClick={() => handleImageClick(item.label)}
              />
              <p className="p-itens">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      {validated === null ? (
        
        <p
        className="text-warning p-validateSelection"
        onClick={validateSelection}>
        VALIDAR
      </p>

      ) : (
        <h2 className="text-warning h2-certa-errada-resposta">
          {validated ? 'CERTA RESPOSTA!' : 'RESPOSTA INCORRETA!'}
        </h2>

      )}

{showResultImage && (
  <div
    className="div-results"
    //onClick={() => setShowResultImage(false)}
  >
    <h1 className="h1-results">
      {validated ? 'RESPOSTA CORRETA' : 'RESPOSTA CORRETA SERIA'}
    </h1>
    
    <img
      src={resultado[selectedRecipe as keyof typeof resultado]}
      alt="Resultado"
      className="img-fluid"
      style={{ maxWidth: '60%', maxHeight: '60%' }}
    />

    <div className="div-igredientes" style={{ maxWidth: '80%' }}>
      <p className="p-igredientes">
        {selectedRecipe === 'CAMPARI TONIC' && (
          <>
            50ML CAMPARI <br />
            150ML SCHWEPPES TÔNICA (original/sem açúcar) <br />
            FINALIZAÇÃO COM RODELA DE LARANJA
          </>
        )}
        {selectedRecipe === 'GIN TÔNICA' && (
          <>
            50ML GIN BULLDOG <br />
            100ML SCHWEPPES TÔNICA ORIGINAL<br />
            100ML SCHWEPPES TÔNICA LIMÃO <br />
            100ML SCHWEPPES TÔNICA ROSÉ <br />
            FINALIZAÇÃO COM RODELA DE LIMÃO OU FATIA DE LIMÃO
          </>
        )}
        {selectedRecipe === 'SKYY MOSCOW MULLE' && (
          <>
            50ML VODKA SKYY <br />
            100ML SCHWEPPES TÔNICA GINGER <br />
            50ML MONSTER GREEN <br />
            FINALIZAÇÃO COM ESPUMA DE GENGIBRE
          </>
        )}
        {selectedRecipe === 'JB CITRUS' && (
          <>
            50ML JIM BEAM <br />
            150ML SCHWEPPES TÔNICA CITRUS
          </>
        )}
        {selectedRecipe === 'MONSTER GIN' && (
          <>
            50ML GIN BULLDOG <br />
            50ML MONSTER MANGO LOCO <br />
            FINALIZAÇÃO FATIA DE MELANCIA EM CUBO OU LASCA DE MANGA
          </>
        )}
        {selectedRecipe === 'APEROL' && (
          <>
            60ML APEROL <br />
            60ML VINO SPUMANTE DRY OU PROSECCO <br />
            20ML ÁGUA COM GÁS <br />
            FINALIZAÇÃO COM RODELA DE LARANJA
          </>
        )}
      </p>
    </div>
  </div>
)}

    </div>
  );
};

export default QuizScreen;