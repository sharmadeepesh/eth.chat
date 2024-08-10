// ChatAppContext.js - Provides methods for interacting with the contract functions
// Contains most of the backend logic for the system
// - Deepesh Sharma

import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import CryptoJS from 'crypto-js';

// Import the contract methods from apiFeature.js
import { checkIfWalletConnected, connectWallet, connectingWithContract } from "../Utils/apiFeature";

// Create a context to store all the methods for later use
export const ChatAppContext = React.createContext();

// Initiate all the state variables for session data.
export const ChatAppProvider = ({children}) => {
    
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [encKey, setEncKey] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userLists, setUserLists] = useState([]);
    const [error, setError] = useState("");

    const [currentUserName, setCurrentUsername] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");
    const [currentEncKey, setCurrentEncKey] = useState("");
    const [decMsg, setDecMsg] = useState([]);

    const router = useRouter();

    // Fetches the user data on each reload. Maintains current session
    // by fetching the same address's data each time 
    const fetchData = async() => {
        try {

            // Connecting with the contract
            const contract = await connectingWithContract();

            // Connect with the first account.
            const connectAccount = await checkIfWalletConnected();
            if (connectAccount === "") {
                connectAccount = await connectWallet();
            }


            // Set the state variables.
            setAccount(connectAccount);

            const userName = await contract.getUsername(connectAccount);
            setUserName(userName);

            const friendLists = await contract.getMyFriendList();
            setFriendLists(friendLists);
               
            const userList = await contract.getAllAppUser();
            setUserLists(userList);

        }
        catch (error) {
            //setError("Please install and connect your wallet: ", error);
        console.log(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);


    // Connect with the contract and get the message array for the current conversation.
    const readMessage = async(friendAddress) => {
        try {

            const contract = await connectingWithContract();

            setCurrentEncKey(contract.getEncKey(friendAddress));

            
            let read = await contract.readMessage(friendAddress);
            
            let decMsg = [];

            read.map((item) => {
                decMsg.push(CryptoJS.AES.decrypt(item.msg, encKey).toString(CryptoJS.enc.Utf8));
            });

            setFriendMsg(read);
            setDecMsg(decMsg);

        } catch (error) {
            //setError("Currently you have no message")
        }
    };

    // Create an account by connecting with the contract, and calling the createAccount function.
    // Wait for the method to complete then reload the page.
    const createAccount = async({ name, accountAddress, encKey }) => {
        try {
            //if (name || accountAddress) return setError("Name and account cannot be empty.");

            const contract = await connectingWithContract();
            
            const getCreatedUser = await contract.createAccount(name, encKey);
            
            setLoading(true);
            await getCreatedUser.wait();
            
            setLoading(false);
            window.location.reload();
        }
        catch (error) {
            setError("Error while creating your account. Please reload your browser.", error);
        }
    };

    // Add two users as friends.
    // Check that the name and accountAddress are filled, then connect with contract,
    // call the addFriend function, await, then reload page when done.
    const addFriends = async({name, accountAddress}) => {
        try{
            if (!name || !accountAddress) return setError("Please provide all details.");

            const contract = await connectingWithContract();
            const addMyFriend = await contract.addFriend(accountAddress, name);
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

    // Send a message to another friend.
    // Connect with the contract, call the sendMessage function, await, and reload.
    const sendMessage = async({msg, address}) => {
        try {
            //if (msg || address) return setError("Please type your message.");

            const contract = await connectingWithContract();

            setEncKey(contract.getEncKey(address));
            const encMsg = CryptoJS.AES.encrypt(msg, encKey).toString();

            const addMessage = await contract.sendMessage(address, encMsg);

            setLoading(true);
            await addMessage.wait();

            setLoading(false);
            window.location.reload();

        } catch(error) {
            console.log(error);
            setError("Please reload and try again.");
        }
    };

    // Get the userName and userAddress of the selected user.
    // Connect contract > getUsername and address > set state variables.
    const readUser = async(userAddress) => {
        
        const contract = await connectingWithContract();
        const userName = await contract.getUsername(userAddress);
        setCurrentUsername(userName);
        setCurrentUserAddress(userAddress);
    };

    // Export all the methods and state variables for use in other files.
    return (
        <ChatAppContext.Provider value = {{ readMessage, createAccount,
            addFriends, sendMessage, readUser, checkIfWalletConnected,
            connectWallet,
            account, userName, friendLists, friendMsg,
            loading, userLists, error, currentUserName, currentUserAddress, encKey, decMsg, currentEncKey
         }}>
            { children }
        </ChatAppContext.Provider>
    );
};