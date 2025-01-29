import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { drinks } from '../data/quizData';
import '../css/EscolherScreen.css';

const EscolherScreen: React.FC = () => {
  const [selectedDrink, setSelectedDrink] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSelect = (title: string) => {
    setSelectedDrink(title);
    localStorage.setItem('selectedDrink', title);
    console.log(`Salvo no cache: ${title}`); // Exibe no console o valor salvo no cache
  };

  const handleConfirm = () => {
    if (selectedDrink) {
      navigate('/quiz'); // Substitua "/nextPage" pela rota desejada
    } else {
      alert('Por favor, selecione uma receita antes de continuar.');
    }
  };

  return (
    <div className="escolher-container">
      <h1 className="escolher-title">Escolha sua Receita</h1>
      <div className="escolher-grid">
        {Object.entries(drinks).map(([title, src], index) => (
          <div
            key={index}
            className={`escolher-item ${selectedDrink === title ? 'selected' : ''}`}
            onClick={() => handleSelect(title)}
          >
            <img src={src} alt={title} className="escolher-img" />
            <p className="escolher-text">{title}</p>
          </div>
        ))}
      </div>
      <button 
        className="btn-confirmar" 
        onClick={handleConfirm} 
        disabled={!selectedDrink} // Desativa o botão se nenhuma receita for selecionada
      >
        CONFIRMAR
      </button>
    </div>
  );
};

export default EscolherScreen;
