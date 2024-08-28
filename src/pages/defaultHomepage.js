import Header from "../components/Header";
import Footer from "../components/Footer";
import DestinationForm from "../components/DestinationForm";
import theme from "../style/palette";
import {
    displayStyle,
    titleStyle,
    subtitleStyle,
} from '../style/styles.js';
import CenterLogo from "../components/CenterLogo.js";
import PageContainer from '../components/PageContainer.js';

function DefaultHomepage() {

    const displayStyle = {
        textAlign: 'center',
        padding: '20px', 
        backgroundColor: '#f8f8f8',
    };

    return (
        <div>
            <Header page={"defaultHomepage"}/>
            <CenterLogo></CenterLogo>

            <PageContainer>
                <DestinationForm />
            </PageContainer>
            <Footer />
        </div>
    );

}

export default DefaultHomepage;