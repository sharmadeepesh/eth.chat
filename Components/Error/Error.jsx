// Error.jsx - react component to display errors in a user friendly way
// - Deepesh Sharma

import React from 'react'

import Style from "./Error.module.css";

// The component takes in an error as an argument and simply displays
// it on the screen.
const Error = ( {error} ) => {
    return (
        <div className={Style.Error}>
            <div className = {Style.Error_box}>
                <h1>Please fix the error and reload your browser tab</h1>
                {error}
            </div>
        </div>
    );
};

export default Error