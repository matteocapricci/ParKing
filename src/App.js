import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultHomepage from './pages/defaultHomepage';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<DefaultHomepage />}/>
          <Route path="/login" element={<Login/>} />
      </Routes>
  </BrowserRouter>
  );
}

export default App;
