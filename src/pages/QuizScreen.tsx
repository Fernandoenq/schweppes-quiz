import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/QuizScreen.css'
import { items, recipes, resultado, recipesList } from '../data/quizData';

const QuizScreen: React.FC = () => {

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
  
  const getStoredOrDefaultRecipe = (): keyof typeof resultado => {
    const storedDrink = localStorage.getItem('selectedDrink');
  
    // Verifica se o valor recuperado do localStorage é um dos valores válidos
    if (storedDrink && ["CAMPARI TONIC", "GIN TÔNICA", "SKYY MOSCOW MULLE", "JB CITRUS", "MONSTER GIN", "APEROL"].includes(storedDrink)) {
      return storedDrink as keyof typeof resultado;
    }
  
    // Retorna um valor padrão caso não encontre ou seja inválido
    return "CAMPARI TONIC";
  };
  

  const [selectedRecipe, setSelectedRecipe] = useState<keyof typeof resultado>(
    getStoredOrDefaultRecipe()
  );


  const [correctAnswers, setCorrectAnswers] = useState<string[]>(recipes[selectedRecipe] || []);

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [validated, setValidated] = useState<boolean | null>(null);
  const [showResultImage, setShowResultImage] = useState<boolean>(false);

  useEffect(() => {
    const storedDrink = getStoredOrDefaultRecipe();
    setSelectedRecipe(storedDrink);
  }, []);

  useEffect(() => {
    setCorrectAnswers(recipes[selectedRecipe] || []);
  }, [selectedRecipe]);
  
  
  const shuffleArray = (array: any[]) => array.sort(() => Math.random() - 0.5);

  const filteredItems = React.useMemo(() => {
    // Base para os itens que estão corretos
    let selected = items.filter((item) => correctAnswers.includes(item.label));
  
    // Lista de itens a serem excluídos
    const excludedLabels: string[] = []; 
  
    // Regras específicas para cada receita
    if (selectedRecipe === 'CAMPARI TONIC') {
      excludedLabels.push('100ML SCHWEPPES TONICA');
    } else if (selectedRecipe === 'GIN TÔNICA') {
      excludedLabels.push('150ML SCHWEPPES TONICA');
    } else if (['SKYY MOSCOW MULLE', 'JB CITRUS', 'MONSTER GIN', 'APEROL'].includes(selectedRecipe)) {
      // Excluir aleatoriamente um dos dois itens
      const randomChoice = Math.random() > 0.5 ? '150ML SCHWEPPES TONICA' : '100ML SCHWEPPES TONICA';
      excludedLabels.push(randomChoice);
    }
  
    // Filtra os itens corretos e exclui os itens na lista de exclusão
    const additionalItems = items.filter(
      (item) =>
        !correctAnswers.includes(item.label) && !excludedLabels.includes(item.label)
    );
  
    // Mistura os itens corretos com os adicionais para completar 12
    selected = selected.concat(additionalItems.slice(0, 12 - selected.length));
    return shuffleArray(selected);
  }, [correctAnswers, selectedRecipe]);
  

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
                  backgroundColor: selectedItems.includes(item.label)
                    ? correctAnswers.includes(item.label)
                      ? 'green'  // Verde para itens corretos
                      : 'red'    // Vermelho para itens errados
                    : 'transparent',
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
        
        <button
          className="btn-validateSelection"
          onClick={validateSelection}
        >
          VALIDAR
        </button>


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