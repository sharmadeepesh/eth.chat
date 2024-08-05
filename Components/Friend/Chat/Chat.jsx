// Chat.jsx - React component to display the Chat conversation window between two users.
// - Deepesh Sharma

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';

// Import the required CSS, media, and Loader function
import Style from "./Chat.module.css";
import images from '../../../assets';
import { converTime } from "../../../Utils/apiFeature";
import {Loader} from "../../index";

// Create a Chat component and defined the props it takes
const Chat = ( {functionName, readMessage, friendMsg, account, userName, loading, currentUserName, currentUserAddress, readUser }) => {
    
    // Declare the state variables that contain the user data (chatData) and message.
    const [message, setMessage] = useState('');
    const [chatData, setChatData] = useState ({
        name: "",
        address: "",
    });

    const router = useRouter();

    // Use this secondary effect when router.isReady() is triggered.
    // This sets the default conversation window that should be opened
    // when the component is loaded for the first time.
    useEffect(() => {
        if (!router.isReady) return;
        setChatData(router.query);
    }, [router.isReady]);

    // Use this secondary effect at other times, whenever a change is made or a button is clicked.
    // We're checking that if the wallet address for the other user exists (after an onClick function,
    // for instance), call the readMessage and readUser function so that the window can be rendered
    // accordingly. Basically, it'll open the user's conversation window when you click on their name.
    useEffect(() => {
        if (chatData.address) {
            readMessage(router.query.address);
            readUser(router.query.address);
        }
    }, []);
    

    return (
        <div className={Style.Chat}>

            {/* If the state variable for the friend's data are available, render their entry in the 
            left-side list of conversations. 
            Otherwise, display nothing. add dynamic spacing instead*/}
            { currentUserName && currentUserAddress ? (
                <div className={Style.Chat_user_info}>
                    <Image src={images.accountName} 
                    alt="image"
                    width={70}
                    height={70} />
                    <div className={Style.Chat_user_info_box}>
                        <h4>{currentUserName}</h4>
                        <p className={Style.show}>{currentUserAddress}</p>
                    </div>
                </div>
                ) : (
                    ""
                )}

                {/* On the right side section, display the conversation window with messages.  */}
                <div className={Style.Chat_box_box}>
                    <div className={Style.Chat_box}>

                        {/* Loop over the friendMsg variable, and display the messages.   */}
                        <div className={Style.Chat_box_left}>
                            {
                                friendMsg.map((el, i) => (
                                    <div>

                                        {/* If the msg sender is the other user (i.e. friend), display
                                        their account name in the sender name field. */}
                                        {el.sender == chatData.address ? (
                                            <div className={Style.Chat_box_left_title}>
                                                <Image src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50} />

                                                <span>{chatData.name} {""} 
                                                    {/* <small>Time: {converTime(el.timestamp)}</small> */}
                                                </span>
                                            </div>
                                        ) :
                                        (
                                            <div className={Style.Chat_box_left_title}>
                                                {/* If the msg sender is you, display your username in the
                                                sender name field. */}
                                                <Image src={images.accountName}
                                                alt="image"
                                                width={50}
                                                height={50} />

                                                <span>{userName} {""} 
                                                    {/* <small>Time: {converTime(el.timestamp)}</small> */}
                                                </span>
                                            </div>
                                        )}

                                        {/* add dynamic spacing after every message so they're rendered properly  */}
                                        <p key={i + 1}>{el.msg}
                                            {""}
                                            {""}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>

                    {/* If the state variable for the friend's data are available (after you've clicked on their name) 
                    display the options to type in and send a message. Display an icon for selecting emojis, a field to type
                    in the message, and a send button to send the message.
                    
                    Also, a loader will be rendered when the Metamask confirmation window pops up.*/}
                    {currentUserName && currentUserAddress ? (
                        <div className={Style.Chat_box_send}>
                            <div className={Style.Chat_box_send_img}>
                                <Image src={images.smile} alt="smile"
                                width={50} height={50}/>
                                <input type="text" placeholder="Start typing..."
                                onChange={ (e) => setMessage(e.target.value)} />
                                <Image src={images.file}
                                alt="file"
                                width={50}
                                height={50} />
                                
                                {
                                    loading == true ? (
                                        <Loader/>
                                    ) : (
                                        <Image src={images.send}
                                        alt="file"
                                        width={50}
                                        height={50} 
                                        onClick={() => functionName({msg: message, address: chatData.address })}/>
                                    )
                                }
                            </div>    
                        </div>
                    ) : "" }
                </div>
        </div>
    );
};

export default Chat;