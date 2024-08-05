// modal.js - Component for displaying the modal window (containing registration form)
// - Deepesh Sharma

import React, {useState, useContext} from 'react'
import Image from "next/image";

import Style from "./Model.module.css";
import images from "../../assets";
import { ChatAppContext } from '../../Context/ChatAppContext';
import {Loader} from "../../Components/index";

// the functional component for the modal
const Model = ( {openBox, title, head, info, smallInfo, image, functionName, address}) => {
    
    // declaring the state variables for the name and address, used for registration
    const [name, setName] = useState("");
    const [accountAddress, setAccountAddress] = useState("");

    // used for display the loading throbber
    const { loading } = useContext(ChatAppContext);
    
    return (
        <div className={Style.Model}>
            <div className={Style.Model_box}>

                {/* display the hero image on the left side */}
                <div className={Style.Model_box_left}>
                    <Image src={image} alt="buddy" width={700} height={700} />
                </div>

                {/* Some headings, app name, and the registration form on the right side 
                Most of the JSX is rendering the form, so almost self explanatory.*/}
                <div className={Style.Model_box_right}>
                    <h1>
                        {title} <span>{head}</span>
                    </h1>
                    <p>{info}</p>
                    <small>{smallInfo}</small>

                    {
                        loading == true ? (
                            <Loader/>
                        ) : (
                            <div className={Style.Model_box_right_name}>
                        <div className={Style.Model_box_right_name_info}>
                            <Image src={images.username} alt="user" width={30} height={30} />
                            <input type="text" placeholder="your name" onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className={Style.Model_box_right_name_info}>
                            <Image src={images.account} alt="account" width={30} height={30} />
                            <input type="text" placeholder={address || "Enter address"} onChange={(e) => setAccountAddress(e.target.value)} />
                        </div>

                        <div className={Style.Model_box_right_name_btn}>
                            <button onClick={() => functionName({name, accountAddress})}>
                                {""}
                                <Image src={images.send} alt="send" width= {30} height={30}/>
                                {""}
                                Submit
                            </button>

                            <button onClick={() => openBox(false)}>
                                {""}
                                <Image src={images.close} alt="close" width= {30} height={30}/>
                                {""}
                                Cancel
                            </button>
                        </div>
                    </div>
                        )
                    }

                </div>
            </div>
        </div>
    );
;}

export default Model