import React from 'react';
import { useNavigate } from 'react-router-dom';


const RestScreen: React.FC = () => {

    const navigate = useNavigate();
    
    // Função para redirecionar à página "Jogar" ao clicar em qualquer lugar
    const handleScreenClick = () => {
        navigate('/jogar');
    };


  return (
    <div
    className="vh-100 vw-100 d-flex flex-column align-items-center justify-content-end text-center bg-dark"
    style={{
        backgroundImage: "url('../../public/restscreen.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        aspectRatio: '9 / 16',
        paddingBottom: '45%', // Ajusta a posição do texto mais para baixo
      }}
      onClick={handleScreenClick} // Detecta cliques na tela
      >
        
    </div>
  );
};

export default RestScreen;
