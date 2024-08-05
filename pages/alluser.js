// alluser.js - The "Find Your Friends" page on the website
// - Deepesh Sharma

import React, { useContext } from "react";

import { UserCard } from '../Components/index';
import Style from '../styles/alluser.module.css';
import { ChatAppContext } from "@/Context/ChatAppContext";

// The functional component for rendering all the users registered on the website
const alluser = () => {

    // Use the userLists and addFriends function from ChatAppContext
    const { userLists, addFriends } = useContext(ChatAppContext);
    return (
        <div>

            <div className={Style.alluser_info}>
                <h3>Find Your Friends</h3>
            </div>

            <div className={Style.alluser}>

                {/* Iterate over the list of users and send the key, data, and 
                i variable (and the addFriends function) to the UserCard component.
                Renders the User Cards found in the All Users page. */}

                {userLists.map((el, i) => (
                    <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
                ))}
            </div>
        </div>
    );
};

export default alluser;