// Friend.jsx - The parent component to display the conversation window,
//              the list of friends, and other Friend details.
// Has two child components- Card and Chat.
// - Deepesh Sharma

import React, { useContext } from 'react';

// importing the Child components - Card and Chat
import Style from './Friend.module.css';
import Card from "./Card/Card";
import Chat from "./Chat/Chat";

// Import functions and state variables from ChatAppContext.
import { ChatAppContext } from '@/Context/ChatAppContext';

// Create the functional component for Friend
const Friend = () => {

    // Use the listed functions and data variables from the imported context
    const { sendMessage, account, friendLists, friendMsg, readMessage, userName, decMsg, encKey, currentEncKey, loading, currentUserName, currentUserAddress, readUser } = useContext(ChatAppContext);

    return (
        <div className={Style.Friend}>
            <div className={Style.Friend_box}>

                {/* Iterate over the friendLists variable and pass the user data, a key,
                the readUser and readMessage functions to the Card component. 
                
                For more details, check the Card component to see how these are rendered.*/}
                <div className={Style.Friend_box_left}>
                    {friendLists.map((el, i) => (
                        <Card key={i + 1} el = {el} i = {i}
                        readMessage={readMessage}
                        readUser = {readUser} />
                    ))}
                </div>

                {/* Does the same thing essentially. Pass the parameters to render the
                Chat component properly. Contains methods to send and read messages,
                the friendMsg variable, account, username, the loader throbber,
                friend useraddress and username, and then the readUser function.
                
                For more details, check the Chat component on how these are rendered.*/}
                <div className={Style.Friend_box_right}>
                    <Chat functionName = {sendMessage}
                    readMessage = {readMessage}
                    friendMsg = { friendMsg}
                    encKey = { encKey }
                    currentEncKey = { currentEncKey } 
                    account = { account }
                    userName = { userName }
                    loading = { loading }
                    currentUserAddress = { currentUserAddress}
                    currentUserName = { currentUserName }
                    readUser={ readUser } 
                    decMsg = { decMsg } />
                </div>
            </div>
        </div>
    )
}

export default Friend