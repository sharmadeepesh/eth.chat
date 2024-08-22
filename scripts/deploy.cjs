// deploy.js - A script to deploy the contract on the Ethereum blockchain
// - Deepesh Sharma

const hre = require("hardhat");

async function main() {

    // Get the ContractFactory instance for the ChatApp contract and deploy it
    const ChatApp = await hre.ethers.getContractFactory("ChatApp");
    const chatApp = await ChatApp.deploy();

    // Wait for the function to finish executing
    await chatApp.deployed();

    // Log the contract address in the blockchain (Copy this to the /Context/constants.js file)
    console.log(
        `Contract address ${await chatApp.address}`
    );
}

// If error found, log the error

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});