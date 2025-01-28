import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RestScreen from './pages/RestScreen';
import JogarScreen from './pages/JogarScreen';
import QuizScreen from './pages/QuizScreen';
import DestravaScreen from './pages/DestravaScreen';
import EscolherScreen from './pages/EscolherScreen';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RestScreen />} />
        <Route path="/jogar" element={<JogarScreen />} />
        <Route path="/escolher" element={<EscolherScreen />} />
        <Route path="/quiz" element={<QuizScreen />} />
        <Route path="/destrava" element={<DestravaScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
