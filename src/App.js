import React from 'react';
import {  Route, Routes } from 'react-router-dom';

import StudentsPage from './components/pages/StudentsPage';
import LoginPage from './components/pages/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';


// Define or import the NotFoundPage component

function App() {
  return (
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    
  );
}

export default App;
