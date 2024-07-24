import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";

import { checkIfWalletConnected, connectWallet, connectingWithContract } from "../Utils/apiFeature";
import ChatApp from '../pages';

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    const [currentUserName, setCurrentUsername] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    const fetchData = async() => {
        try {
            const contract = await connectingWithContract();

            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            console.log("1");

            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);

            console.log("2");

            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);

            console.log("3");

            const userList = await contract.getAllAppUser();
            setUserLists(userList);

            console.log("4");

        }
        catch (error) {
            setError("Please install and connect your wallet");
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const readMessage = async(friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);

        } catch (error) {
            setError("Currently you have no message")
        }
    };

    const createAccount = async({ name, accountAddress }) => {
        try {
            //if (name || accountAddress) return setError("Name and account cannot be empty.");

            const contract = await connectingWithContract();
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);
            await getCreatedUser.wait();
            console.log(getCreatedUser);
            setLoading(false);
            window.location.reload();
        }
        catch (error) {
            setError("Error while creating your account. Please reload your browser.");
        }
    };

    const addFriends = async() => {
        try{
            if (name || accountAddress) return setError("Please provide all details.");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriends(accountAddress, name);
            setLoading(true);
            await addMyFriend.wait();
            setLoading(false);
            router.push('/');
            window.location.reload();
        }
        catch(error) {
            setError("Something went wrong while adding friends.");
        }
    };

    const sendMessage = async({msg, address}) => {
        try {
            if (msg || address) return DynamicServerError("Please type your message.");

            const contract = await connectingWithContract();
            const addMessage = await contract.sendMessage(address, msg);
            setLoading(true);
            await addMessage.wait();
            setLoading(false);
            window.location.reload();

        } catch(error) {
            setError("Please reload and try again.");
        }
    };

    const readUser = async(userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUsername(userName);
        setCurrentUserAddress(userAddress);
    };

    return (
        <ChatAppContext.Provider value = {{ readMessage, createAccount,
            addFriends, sendMessage, readUser, checkIfWalletConnected,
            connectWallet,
            account, userName, friendLists, friendMsg,
            loading, userLists, error, currentUserName, currentUserAddress
         }}>
            { children }
        </ChatAppContext.Provider>
    );
};