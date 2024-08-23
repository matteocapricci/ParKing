import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultHomepage from './pages/DefaultHomepage';
import Login from './pages/Login';
import theme from "./style/palette";
import {ThemeProvider} from "@emotion/react";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<DefaultHomepage />}/>
            <Route path="/login" element={<Login/>} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
