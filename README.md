# A Decentralized Peer-to-Peer Messaging System on the Ethereum Blockchain
Eth.chat is a decentralized messaging application built on top of the Ethereum blockchain. It leverages Solidity smart contracts for message storage and retrieval, ensuring users can send and receive messages directly through the application without the need for any centralized web server.

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
1. To run the application locally, first, clone the repository using Git or download the ZIP file from GitHub: \
```git clone https://github.com/sharmadeepesh/eth.chat```
2. Navigate to the cloned/downloaded project folder and run: \
```npm install```
3. Once the packages are downloaded, run the Hardhat node with: \
```npx hardhat node``` \
The output will return 20 test accounts and their wallet address, we'll come back to this in later steps.
5. Then, deploy the ChatApp.sol smart contract on the local chain with: \
```npx hardhat run scripts/deploy.js --network localhost```
6. Note down the returned contract address. Open the /Context/constants.js file, and assign the returned contract address value to the ChatAppAddress variable. \
```export const ChatAppAddress = "Paste the address here"```
7. This will generate a new ChatApp.json file in the /artifacts/contracts/ChatApp.sol/ directory. Move the ChatApp.json file to the /Context/ folder (the same directory in which you modified the constants.js file in the previous step).
8. Next, start the development environment by running:
```npm run dev```
9. The web app will run on localhost:3000.

## Usage
1. You'll need to install and set up a MetaMask wallet to use the web app. https://www.techopedia.com/how-to/how-to-set-up-a-metamask-wallet
2. Then, add the local blockchain to the list of MetaMask networks by following this guide: https://support.chainstack.com/hc/en-us/articles/4408642503449-Using-MetaMask-with-a-Hardhat-node
3. Once connected to the network, you must import the test Hardhat accounts to MetaMask. Copy one of the 20 test account addresses from the Hardhat node output.
4. Click on the MetaMask extension icon from the top-right corner > the Account X dropdown > **Add Account or Hardware Wallet** > paste the address > click **Import**. You'll see that now you have 10000 ETH for development purposes. You can transfer these funds to any of your other accounts (your main MetaMask wallet).
5. Now, access localhost:3000 using a web browser and you'll notice the MetaMask window automatically pop up. Select the account you want to use for the app and click **Connect**.
6. Click on **Create Account** and enter a name that you want to use to chat. The wallet address field is prepopulated so you can leave that as is. Enter all the required details and click **Create account**.
7. A transaction window will pop up, so make sure you check everything before you Confirm it.
8. The page will reload and you'll notice that the **Create Account** button in the top-right corner now displays your name.

To test the messaging features, you need to create a second account.
1. Click on MetaMask, switch to a different account by selecting it from the list and clicking **Connect**. You must perform steps 5 and 6 again to create a second account. 
2. Now, go to the **All Users** screen and you'll notice that the two users will be listed. Click on **Add Friends** to add the other user as a friend. Click **Confirm** on the transaction window to confirm the action.

Switch to the **Chat** section, select the user from the list, and send a message. Again, the transaction confirmation window will pop up; click **Confirm** to send the message. The page will automatically reload and the message appears in the conversation window. You can even log into the other account and check that the message was delivered successfully.

## Project Structure
The project is structured like any other React or Next.js app. The following directories are of most importance:

1. **artifacts/** (Stores compiled outputs like the ABI for the contract and other generated artifacts from the build process)
2. **assets/** (Contains static files like images, fonts, and other media assets used in the project)
3. Components (Houses reusable UI components used across different parts of the application)
4. **Context/** (Contains the copied contract ABI, a file for storing constant variables, and functions to interact with the deployed smart contract)
5. **contracts/** (Includes smart contracts and other blockchain-related configurations and data)
6. **pages/** (Contains the Next.js pages which correspond to different routes of the application)
7. **scripts/** (Holds utility scripts for automating contract deployment on the blockchain)
8. **styles/** (Includes global styles, CSS, SCSS, and styled components for theming and design)
9. **Utils/** (Includes functions and modules to connect the smart contract with the off-chain backend)

The Components directory further contains sub-directories that hold other components:
1. **Error** (React component to display errors in a user-friendly way)
2. **Filter** (A React component to filter the list of usernames)
3. **Friend** (The parent component to display the conversation window, the list of friends, and other Friend details.)  -----> Has two child components, **Card** and **Chat**.
4. **Loader** (The component for displaying the loading throbber)
5. **Modal** (Component for displaying the modal window (containing registration form))
6. **NavBar** (Renders the navigation menu sitewide)
7. **UserCard** (JSX for rendering the UserCard in the "Find Your Friends" page)
    
