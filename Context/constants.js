// constants.js - Some constants used throughout the project
// - Deepesh Sharma

// The chatApp.json file (the ABI for the contract.)
import chatAppJSON from '../artifacts/contracts/ChatApp.sol/ChatApp.json'

// The deployed contract's address on the blockchain.
export const ChatAppAddress = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0";

export const ChatAppABI = chatAppJSON.abi;