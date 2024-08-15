// constants.js - Some constants used throughout the project
// - Deepesh Sharma

// The chatApp.json file (the ABI for the contract.)
import chatAppJSON from '../artifacts/contracts/ChatApp.sol/ChatApp.json'

// The deployed contract's address on the blockchain.
export const ChatAppAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const ChatAppABI = chatAppJSON.abi;