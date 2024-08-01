# A Decentralized Peer-to-Peer Messaging System on the Ethereum Blockchain
Eth.chat is a decentralized messaging application built on top of the Ethereum blockchain. It leverages Solidity smart contracts for message storage and retrieval, ensuring users can send and receive messages directly through the application without the need of any centralized web server.

## Technologies Used
1. Ethereum
2. Solidity
3. JavaScript (Node.js)
4. React
5. Next.js
6. ethers.js

## Prerequisites for Installation
Make sure that you have the following software installed:
1. Node.js
2. Git
3. MetaMask

## Installation
To run the application locally, first, clone the repository using Git or download the ZIP file from GitHub:
```git clone https://github.com/sharmadeepesh/eth.chat```
Navigate to the cloned/downloaded project folder and run:
```npm install```
Once the packages are downloaded, run the Hardhat node with:
```npx hardhat node```
Then, deploy the ChatApp.sol smart contract on the local chain with:
```npx hardhat run scripts/deploy.js --network localhost```
Note down the returned contract address. Open the /Context/constants.js file, and assign the returned contract address value the ChatAppAddress variable.
```export const ChatAppAddress = "Paste the address here"```
This will generate a new ChatApp.json file in the /artifacts/contracts/ChatApp.sol/ directory. Move the ChatApp.json file to the /Context/ folder (the same directory in which you modified the ChatAppContext.js file in the previous step).
Next, start the development environment by running:
```npm run dev```
The web app will run on localhost:3000.

## Usage
    
