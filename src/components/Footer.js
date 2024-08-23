import {
    footerStyle,
    imageStyle,
} from '../style/styles.js';

function Footer() {

    return (
        <div style={footerStyle}>
            <img src="/logos/parking_logo.png" alt="logo" style={imageStyle} />
            <br/>
            <b style={{ color: "#FFAF1F"}}>ParKing</b>
            <br/>
        </div>
    );
}

export default Footer;