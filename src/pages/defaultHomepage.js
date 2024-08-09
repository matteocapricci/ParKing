import Header from "../components/Header";
import Footer from "../components/Footer";
import DestinationForm from "../components/DestinationForm";

function DefaultHomepage() {

    const textStyle = {
        width: '290px',
        height: '120px'
    };

    const displayStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }

    return (
        <div>
            <Header page={"defaultHomepage"}/>
            <div>
                <div style={displayStyle}>
                    <img src="/logos/ParKing_Text.png" alt="ParKing" style={textStyle} />
                </div>
                <div style={displayStyle}>
                    <h3 align="center">
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