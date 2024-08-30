import React, { useState, useContext } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import theme from '../style/palette';
import CustomButton from '../components/CustomButton';
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import { AuthContext } from '../contexts/authContext/index.jsx';
import { useNavigate } from "react-router-dom";

const Profile = () => {

    return(
        <>
        <Header page={"profile"}/>
        <CenterLogo/>
        <PageContainer>

        </PageContainer>
        <Footer/>
        </>
    )

}

export default Profile;