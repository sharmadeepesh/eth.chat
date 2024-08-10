// Filter.jsx - A React component to filter the list of usernames (non functional ATM; IGNORE)
// - Deepesh Sharma

import React, { useState, useContext } from 'react';
import Image from "next/image";

import Style from './Filter.module.css';
import images from '../../assets';
import {ChatAppContext} from '../../Context/ChatAppContext';
import {Model } from '../index';

const Filter = () => {
    const { account, addFriends } = useContext(ChatAppContext);

    const [isAddFriend, setIsAddFriend] = useState(false);

    return (
        <div className={Style.Filter}>
            <div className={Style.Filter_box}>
                <div className={Style.Filter_box_left}>
                    <div className={Style.Filter_box_left_search}>
                        <Image src={images.search} alt="image" width={20} height={20} />
                        <input type="text" placeholder="Search..."/>
                    </div>
                </div>
                <div className={Style.Filter_box_right}>
                    <button>
                        <Image src={images.clear}
                        alt="clear"
                        width={20} height={20} />
                        Clear Chat
                    </button>

                    <button onClick={() => setIsAddFriend(true)}>
                        <Image src={images.user}
                        alt="clear"
                        width={20} height={20} />
                        Add Friend
                    </button>

                </div>
            </div>

            {isAddFriend && (
                <div className={Style.Filter_model}>
                    <Model openBox={setIsAddFriend}
                    title="Welcome to"
                    head="Eth.Chat"
                    info="Please enter your friend's username and account address to continue..."
                    smallInfo="Kindly select your friend name and address."
                    image={images.hero}
                    functionName={addFriends}
                    isAddFriend={isAddFriend} />
                </div>
            )}
        </div>
    )
}

export default Filter