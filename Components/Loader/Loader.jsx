// Loader.jsx - The component for displaying the loading throbber
// - Deepesh Sharma

import React from 'react'
import Image from "next/image";

import Style from "./Loader.module.css";
import images from "../../assets";

// The component for the Loader, displays the loader GIF when rendered.
const Loader = () => {
    return (
        <div className={Style.Loader}>
            <div className={Style.Loader_box}>
                <Image src={images.loader} alt="loader" width={100} height={100} />
            </div>
        </div>
    );
};

export default Loader