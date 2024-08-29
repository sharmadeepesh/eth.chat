// Navbar.jsx - Renders the navigation menu sitewide
// - Deepesh Sharma

import React, { useState, useContext } from 'react'
import Image from "next/image";
import Link from "next/link";

import Style from "./NavBar.module.css";
import { ChatAppContext } from '@/Context/ChatAppContext'; 
import { Model, Error } from '../index';

import images from "../../assets";

// The list of menu items to display. Add menu items here
const NavBar = () => {
    const menuItems = [
        {
            menu: "Find Friends",
            link: "/alluser",
        },
        {
            menu: "Chat",
            link: "/",
        },
    ]

    // Initialize state variables for active, open, and OpenModel states
    const [active, setActive] = useState(2);
    const [open, setOpen] = useState(false);
    const [openModel, setOpenModel] = useState(false);

    // Import session data state variables and methods from ChatAppContext
    const {account, userName, connectWallet, createAccount, error} = useContext(ChatAppContext);

    return (
        <div className={Style.NavBar}>
            <div className={Style.NavBar_box}>

                {/* Display the main logo of the webpage. Currently set to heading2 */}
                <div className={Style.NavBar_box_left}>
                    <h2>Eth.Chat</h2>
                </div>
                <div className={Style.NavBar_box_right}>

                    {/* The right menu contains the list of menu items declared above. Simply looping
                    through the list and rendering the items. Also, triggering the onClick functionality
                    when clicked. The active menu item has a different styling defined in the *.module.css file.*/}
                    <div className={Style.NavBar_box_right_menu}>
                        {menuItems.map((el, i) => (
                            <div onClick={() => setActive(i+1)} key={i+1} className={`${Style.NavBar_box_right_menu_items} 
                                ${active == i + 1 ? Style.active_btn : ""}`}>
                                    <Link className={Style.NavBar_box_right_menu_items_link} href={el.link}>
                                        {el.menu}
                                    </Link>
                            </div>
                        ))}
                    </div>

                    {/* A different menu for mobile devices that can be expanded and collapsed using a button.
                    We're essentially doing the same thing as above, looping through the items and rendering them.*/}
                    {open && (
                        <div className={Style.mobile_menu}>
                        {menuItems.map((el, i) => (
                            <div onClick={() => setActive(i+1)} key={i+1} className={`${Style.mobile_menu_items} 
                                ${active == i + 1 ? Style.active_btn : ""}`}>
                                    <Link className={Style.mobile_menu_items_link} href={el.link}>
                                        {el.menu}
                                    </Link>
                            </div>
                        ))}

                        {/* The menu button used to expand/collapse the mobile menu. On click, we're triggering the
                        setOpen() function and setting its value to false. Note that in the previous section, we're
                        checking if open is set to True, and only then rendering the menu.*/}

                        <p className={Style.mobile_menu_btn}>
                            <Image src={images.close} alt="close" width={50} height={50} onClick={() => setOpen(false)} />
                        </p>
                    </div>
                    )}

                    {/* On the extreme right, we have the Connect Wallet, Create Account, and username display button
                    Using dynamic elements to make sure we only display Connect Wallet when the account == ""
                    And then display Create Account if the userName state variable hasn't been set yet.*/}
                    <div className={Style.NavBar_box_right_connect}>
                        { account == "" ? (
                            <button onClick={() => connectWallet()}>
                                {""}
                                <span>Connect Wallet</span>
                            </button>
                        ) : (
                            <button onClick={() => setOpenModel(true)}>
                                {""}
                                <Image src={userName ? images.accountName : images.create2}
                                alt="Account image"
                                width= {20}
                                height={20} />
                                {""}
                                <small>{userName || "Create Account"}</small>
                            </button>
                        )}
                    </div>

                    {/* CANT COMMENT IN THE MIDDLE OF THE DYNAMIC ELEMENT RENDER.
                    Note in the above section that we're triggering the setOpenModel function when a user clicks on the Create account button.*/}


                    <div className={Style.NavBar_box_right_open}
                    onClick = {() => setOpen(true)}>
                        <Image src={images.open} alt="open" width={30} height={30} />
                    </div>
                </div>
            </div>
            

            {/* This is the openModel render that opens the Modal window used to specify details for account creation. */}
            { openModel && (
                <div className={Style.modelBox}>
                    <Model openBox={setOpenModel}
                        title = "Welcome to"
                        head="Eth.Chat"
                        info=""
                        smallInfo=""
                        image = {images.hero1}
                        functionName = {createAccount}
                        address = {account} />
                </div>
            )}
            {error == "" ? "" : <Error error={error} />}
        </div>
    );
};

export default NavBar