import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/JogarScreen.css'

const JogarScreen: React.FC = () => {

    const navigate = useNavigate();
    
    // Função para redirecionar à página de descanso ao clicar no botão
    const handleGoPlayQuiz = () => {
        navigate('/escolher');
    };

  return (
    <div
      className="div-geral"
      style={{
        backgroundImage: "url('../../public/restscreen1.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '9 / 16',
        paddingBottom: '45%', // Ajusta a posição do texto mais para baixo
      }}
      >
        <button
        className="btn-jogar"
        onClick={handleGoPlayQuiz}
      >
        JOGAR
      </button>
    </div>
  );
};

export default JogarScreen;
