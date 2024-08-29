// UserCard.jsx - JSX for rendering the UserCard in the "Find Your Friends" page
// - Deepesh Sharma
 
import React from 'react';
import Image from "next/image";

import Style from './UserCard.module.css';
import images from '../../assets';

// Create a UserCard component that takes in all the user data, a key, and an addFriends method
const UserCard = ( { el, i, addFriends } ) => {
    return (
        <div className={Style.UserCard}>
            <div className={Style.UserCard_box}>

                {/* renders a random image based on the media stored under /assets */}
                <Image className = {Style.UserCard_box_img} src={images[`image${i + 1}`]}
                alt="user" width = {100} height = {100} />

                {/* Displays the user card with the user name and address and an Add Friend button */}
                <div className={Style.UserCard_box_info}>
                    <h3>{el.username}</h3>
                    <p>{el.accountAddress.slice(0,25)}</p>
                    <button onClick={() => addFriends({name: el.username, accountAddress: el.accountAddress})}>Add Friend</button>
                </div>
            </div>

            {/* A small serial number to keep track of the number of users */}
            <small className={Style.number}>{i + 1}</small>
        </div>
    )
}

export default UserCard