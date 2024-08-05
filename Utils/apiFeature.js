// apiFeature.js - Methods to connect the smart contract with the off-chain backend
// - Deepesh Sharma

import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { ChatAppAddress, ChatAppABI } from '../Context/constants';

// Check if the Metamask wallet is connected with the website
export const checkIfWalletConnected = async () => {
    try {

        // Metamask injects a browser API at window.ethereum, so this is checking if
        // the API exists, which would mean that Metamask is also installed. 
        if(!window.ethereum) return console.log("Install MetaMask");

        // query for and return the first Metamask account from the list (the current)
        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

        const firstAccount = accounts[0];
        return firstAccount;
    } 
    
    catch (error) {
        console.log(error);
    }
};

// Connecting the Metamask wallet with the website (similar to checkIfWalletConnected())
export const connectWallet = async () => {
    try {

        // Check if Metamask is installed
        if(!window.ethereum) return console.log("Install MetaMask");

        // Query for and return the first account in Metamask
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

        const firstAccount = accounts[0];
        return firstAccount;
    }
    
    catch (error) {
        console.log(error);
    }
};

// Create an instance of the Contract to use in connectingWithContract() later
// Uses ChatAppAddress (the contract address on the blockchain) and ChatAppABI
// (the ChatApp.json file acting as the ABI for the contract)
const fetchContract = (signerOrProvider) => new ethers.Contract(ChatAppAddress, ChatAppABI, signerOrProvider);

// Connect with and return the contract to be used in the off-chain backend
export const connectingWithContract = async () => {
    try {

        // Create a web3modal instance to create a connection and provider
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        // Get the signer from the provider
        const signer = provider.getSigner();

        // Create the contract using the signer as the argument
        const contract = fetchContract(signer);

        return contract;
    }

    catch (error) {
        console.log(error);
    }
};

// Method to convert the time and date to a desired format (hh/mm/ss Date: dd/mm/yyyy)
export const converTime = (time) => {
    const newTime = new Date(time.toNumber());

    const realTime = newTime.getHours() + "/" + newTime.getMinutes() + "/" + newTime.getSeconds() + " Date: " + newTime.getDate() + "/" + (newTime.getMonth() + 1) + "/" + newTime.getFullYear();

    return realTime;
};