function Footer() {

    const footerStyle = {
        backgroundColor: '#304269',
        width: '100%',
        textAlign: 'center',
        fontSize: '15px',
        padding: '16px 0',
        marginTop: '15px'
    };

    const imageStyle = {
        width: '100px',
        height: '100px'
    };

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