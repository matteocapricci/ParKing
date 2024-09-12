import {
    textStyle,
    displayStyle,
} from '../style/styles.js';
function CenterLogo() {
    return (
        <div> 
            <div style={displayStyle}>
                <img src="/logos/ParKing_Text.png" alt="ParKing" style={textStyle} />
            </div>
        </div>
    );
}

export default CenterLogo;