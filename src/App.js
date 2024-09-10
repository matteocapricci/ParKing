import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultHomepage from './pages/DefaultHomepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';
import ProfileProtectedRoute from './components/ProfileProtectedRoute'
import  AdminProtectedRoute from './components/AdminProtectedRoute'
import ShowParkingMapResult from './pages/ShowParkingMapResult';
import ShowParkingDetail from './pages/ShowParkingDetail'
import { Provider } from 'react-redux';
import store from "./store/App";
import theme from "./style/palette";
import {ThemeProvider} from "@emotion/react";
import { AuthProvider } from './contexts/authContext/index';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<DefaultHomepage />}/>
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/resultList" element={<ShowParkingMapResult/>} />
              <Route path="/profile" element={<ProfileProtectedRoute><Profile/></ProfileProtectedRoute>} />
              <Route path="/parkingDetail" element={<ShowParkingDetail/>} />
              <Route path="/admin" element={<AdminProtectedRoute><Admin/></AdminProtectedRoute>} />
              <Route path="*" element={<NotFound />} /> 
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </AuthProvider>
    </Provider>  
  );
}

export default App;
