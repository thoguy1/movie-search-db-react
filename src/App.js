import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage';
import CastPage from './pages/CastPage';
import './app.css';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MoviePage />} />
        <Route path="/cast/:id/:movieID" element={<CastPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
