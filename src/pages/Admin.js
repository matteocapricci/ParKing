import React from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import CommentModeration from '../components/CommentModeration.js';
import UserModeration from '../components/UserModeration.js';
import DashBoard from '../components/Dashboard.js';
import { Grid } from '@mui/material';



const Admin = () => {

    return (
        <>
            <Header page={"Admin"} />
            <CenterLogo />
            <PageContainer>
                <Grid container spacing={2} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '20px', padding:'15px'}}>
                    {/* First row */}
                    <Grid item xs={12} md={12}>
                        <DashBoard />
                    </Grid>
                    {/*Second row */}             
                    <Grid item xs={12} md={4}>
                        <CommentModeration></CommentModeration>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <UserModeration></UserModeration>
                    </Grid>

                </Grid>
            </PageContainer>
            <Footer />
        </>
    );
}

export default Admin;
