import {
    textStyle,
    displayStyle,
} from '../style/styles.js';
function CenterLogo({name, size, variant, handleClick}) {
    return (
        <div> 
            <div style={displayStyle}>
                <img src="/logos/ParKing_Text.png" alt="ParKing" style={textStyle} />
            </div>
        </div>
    );
}

export default CenterLogo;