import Header from "../components/Header";
import Footer from "../components/Footer";
import DestinationForm from "../components/DestinationForm";

function DefaultHomepage() {

    const textStyle = {
        width: '520px',
        height: '170px'
    };

    const displayStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }

    return (
        <div>
            <Header page={"defaultHomepage"}/>
            <div class="app-container">
                <div style={displayStyle}>
                    <img src="/logos/ParKing_Text.png" alt="ParKing" style={textStyle} />
                </div>
                <div style={displayStyle}>
                    <h3 align="center" style={{ color: "#304269"}}>
                        Scopri il potere di ParKing: l'app che trasforma la ricerca del parcheggio in un gioco da ragazzi, ovunque tu vada.
                        <br />
                        Libera la tua strada un TAP alla volta!!
                    </h3>
                </div>
                <DestinationForm />
            </div>
            <Footer />
        </div>
    );

}

export default DefaultHomepage;