// Card.jsx - React component to display friends info on the conversation screen
// - Deepesh Sharma

import React from "react";
import Image from "next/image";
import Link from "next/link";

import Style from "./Card.module.css";
import images from '../../../assets';

const Card = ( {readMessage, el, i, readUser} ) => {
    return (
            <Link href={{pathname: '/', query: {name:`${el.username}`, address: `${el.publicKey}`} }}>
            {/* The Link tag above assigns a dynamic URL to every entry in the friend list. So, when you click on an entry,
            the data is actually taken from the URL and then rendered using the Chat component.  */}

                {/* Display a default profile picture for every user that's listed.  */}
                <div className={Style.Card} onClick = {() => (readMessage(el.publicKey), readUser(el.publicKey))}>
                    <div className = {Style.Card_box}>
                        <div className={Style.Card_box_left}>
                            <Image src={images.accountName}
                            alt="username"
                            width={50}
                            height={50}
                            className={Style.Card_box_left_img}/>
                        </div>


                        {/* Display the username for every user right next to the profile image.  */}
                        <div className={Style.Card_box_right}>
                            <div className={Style.Card_box_right_middle}>
                                <p>{el.username}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
    )
};

export default Card;