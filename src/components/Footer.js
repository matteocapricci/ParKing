function Footer() {

    const footerStyle = {
        backgroundColor: '#add8e6',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
        fontSize: '15px',
        padding: '16px 0',
        marginTop: '5px',
        marginBottom: '5px',
    };

    const imageStyle = {
        width: '100px',
        height: '100px'
    };

    return (
        <div style={footerStyle}>
            <img src="/logos/parking_logo.png" alt="logo" style={imageStyle} />
            <br/>
            <b>ParKing</b>
            <br/>
        </div>
    );
}

export default Footer;