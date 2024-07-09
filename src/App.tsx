import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MoviesListPage from './components/pages/MoviesListPage';
import LoginPage from './components/pages/LoginPage';
import RegisterPage from './components/pages/RegisterPage';
import MoviesDetailPage from './components/pages/MoviesDetailPage';
import FavoritesPage from './components/pages/FavouritesPage';
import Navbar from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<MoviesListPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies/:id" element={<MoviesDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
    </div>
  );
};

export default App;