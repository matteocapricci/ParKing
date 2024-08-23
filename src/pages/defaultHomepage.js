import Header from "../components/Header";
import Footer from "../components/Footer";
import DestinationForm from "../components/DestinationForm";
import theme from "../style/palette";
import {
    displayStyle,
} from '../style/styles.js';
import CenterLogo from "../components/CenterLogo.js";
import PageContainer from '../components/PageContainer.js';

function DefaultHomepage() {

    return (
        <div>
            <Header page={"defaultHomepage"}/>
            <CenterLogo></CenterLogo>
            <div style={displayStyle}>
                <h3 align="center" style={{ color: theme.palette.background.text }}>
                    Discover the magic of ParKing: the app that turns parking into a breeze, no matter where you are.
                    <br />
                    Clear your path, one TAP at a time!
                </h3>
            </div>

            <PageContainer>
                <DestinationForm />
            </PageContainer>
            <Footer />
        </div>
    );

}

export default DefaultHomepage;