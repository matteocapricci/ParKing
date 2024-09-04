import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultHomepage from './pages/DefaultHomepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import ShowParkingMapResult from './pages/ShowParkingMapResult';
import { Provider } from 'react-redux';
import store from "./store/App";
import theme from "./style/palette";
import {ThemeProvider} from "@emotion/react";

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<DefaultHomepage />}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/resultList" element={<ShowParkingMapResult/>} />
            <Route path="/profile" element={<Profile/>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>  
  );
}

export default App;
