import Header from "../components/Header.js";
import Footer from "../components/Footer.js";
import DestinationForm from "../components/DestinationForm.js";
import CenterLogo from "../components/CenterLogo.js";
import PageContainer from '../components/PageContainer.js';

function DefaultHomepage() {

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