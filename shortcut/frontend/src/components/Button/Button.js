import React from 'react';
import './Button.css';


function Button({text, func, wid, col, lft, tp}) {
    return (
        <div>
            <button 
                class="btn" 
                style={{backgroundColor: col, width: wid, position: "fixed", left: lft, top: tp}}
                onClick = {func}
            >
                {text}
            </button>
        </div>
    );
}

export default Button;
