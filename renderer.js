// renderer.js

// Import the ethers library and the contract ABI
import { ethers } from 'ethers';
import contractABI from './contractABI.json'; // Import your ABI

// Bytecode of the contract
const bytecode = "6080604052348015600e575f80fd5b506103028061001c5f395ff3fe608060405234801561000f575f80fd5b506004361061004a575f3560e01c80630121b93f1461004e57806384aff31414610063578063f3628b111461007d578063f9cfa06f14610085575b5f80fd5b61006161005c366004610275565b61008f565b005b61006b60c881565b60405190815260200160405180910390f35b61006b610233565b61006b6201518081565b5f81116100f55760405162461bcd60e51b815260206004820152602960248201527f4e756d626572206f6620766f746573206d7573742062652067726561746572206044820152687468616e207a65726f60b81b60648201526084015b60405180910390fd5b60c88111156101545760405162461bcd60e51b815260206004820152602560248201527f43616e6e6f7420766f7465206d6f7265207468616e20746865206461696c79206044820152641b1a5b5a5d60da1b60648201526084016100ec565b335f90815260208190526040902060018101546101759062015180906102a0565b4210610185575f81554260018201555b805460c8906101959084906102a0565b11156101e35760405162461bcd60e51b815260206004820152601a60248201527f45786365656473206461696c7920766f74696e67206c696d697400000000000060448201526064016100ec565b81815f015f8282546101f591906102a0565b909155505060405182815233907f4d99b957a2bc29a30ebd96a7be8e68fe50a3c701db28a91436490b7d53870ca49060200160405180910390a25050565b335f90815260208190526040812060018101546102549062015180906102a0565b42106102625760c891505090565b805461026f9060c86102b9565b91505090565b5f60208284031215610285575f80fd5b5035919050565b634e487b7160e01b5f52601160045260245ffd5b808201808211156102b3576102b361028c565b92915050565b818103818111156102b3576102b361028c56fea2646970667358221220e0b3c8326a952d48dd5d282708baebb1320479643d01ef0436a143fc398e6e3c64736f6c634300081a0033";

// Set up the event listener for the Start Bot button
document.getElementById('startBot').addEventListener('click', async () => {
    // Retrieve user input values from the form
    const privateKey = document.getElementById('privateKey').value;
    const rpcUrl = document.getElementById('rpcUrl').value || "https://rpc.mainnet.taiko.xyz";
    const numVotes = parseInt(document.getElementById('numVotes').value, 10);

    // Validate inputs
    if (!privateKey) {
        document.getElementById('status').textContent = "Please provide your wallet private key.";
        return;
    }

    // Start the voting process
    try {
        const provider = new ethers.JsonRpcProvider(rpcUrl);
        const wallet = new ethers.Wallet(privateKey, provider);

        // Deploy the contract
        const factory = new ethers.ContractFactory(contractABI, bytecode, wallet);
        const contract = await factory.deploy();

        console.log('Contract deployed at address:', contract.address);
        document.getElementById('status').textContent = `Contract deployed at address: ${contract.address}`;

        // Call the vote method
        const result = await contract.vote(numVotes); // Call the vote method with the number of votes
        console.log('Transaction result:', result);
        document.getElementById('status').textContent = 'Voting process started successfully!';
    } catch (error) {
        // Handle errors and display messages
        document.getElementById('status').textContent = `Failed to start voting process: ${error.message}`;
    }
});
