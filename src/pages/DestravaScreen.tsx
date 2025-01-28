import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../css/DestravaScreen.css';


const DestravaScreen: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Estado para armazenar a receita selecionada
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null);
  const [unlocked, setUnlocked] = useState<boolean | null>(null);

  // Lista de imagens referentes às receitas
  const recipeImages: Record<string, string> = {
    'CAMPARI TONIC': '../../public/ingredients/CAMPARI TONIC kit.png',
    'GIN TÔNICA': '../../public/ingredients/GIN TONICA kit.png',
    'SKYY MOSCOW MULLE': '../../public/ingredients/SKYY MOSCOW MULLE kit.png',
    'JB CITRUS': '../../public/ingredients/JB CITRUS kit.png',
    'MONSTER GIN': '../../public/ingredients/MONSTER GIN kit.png',
    'APEROL': '../../public/ingredients/APEROL kit.png',
  };

  useEffect(() => {
    // Verifica se há valor vindo da navegação e salva no cache (localStorage)
    if (location.state?.unlocked !== undefined) {
      setUnlocked(location.state.unlocked);
      localStorage.setItem('unlocked', JSON.stringify(location.state.unlocked));
    } else {
      // Caso não tenha vindo da navegação, busca do localStorage
      const storedUnlocked = localStorage.getItem('unlocked');
      if (storedUnlocked !== null) {
        setUnlocked(JSON.parse(storedUnlocked));
      } else {
        setUnlocked(false); // Fallback padrão
      }
    }

    // Obtendo a receita selecionada do cache
    const storedRecipe = localStorage.getItem('selectedRecipe');
    if (storedRecipe) {
      setSelectedRecipe(JSON.parse(storedRecipe));
    } else {
      setSelectedRecipe(null);
    }
  }, [location.state]);

  // Função para redirecionar à página inicial ao clicar na tela
  const handleScreenClick = () => {
    navigate('/');
  };

  // Detecta a resolução da tela
  const isHighResolution = window.innerWidth >= 2160 && window.innerHeight >= 3840;

  return (
    <div
      className="div-main"
      onClick={handleScreenClick} // Detecta cliques na tela
    >
        <h3 className="h3-intern">
          {unlocked ? 'VOCÊ DESTRAVOU' : 'VOCÊ NÃO DESTRAVOU'}
        </h3>
        <h2 className="h2-intern">O DRINK PARA O <br /> HAPPY HOUR</h2>

        {selectedRecipe && recipeImages[selectedRecipe] ? (
          <img
            src={recipeImages[selectedRecipe]}
            alt={selectedRecipe}
            className="drink-image"
          />
        ) : (
          <h3 className="text-danger fw-bold">Imagem não encontrada</h3>
        )}
      </div>
  );
};

export default DestravaScreen;
