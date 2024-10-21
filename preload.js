// preload.js
const { contextBridge } = require('electron');
const ethers = require('ethers'); // Make sure this line is present

// Expose ethers components to the renderer process
contextBridge.exposeInMainWorld('ethersAPI', {
    JsonRpcProvider: ethers.JsonRpcProvider,
    Wallet: ethers.Wallet,
    Contract: ethers.Contract,
    utils: ethers.utils,
});

// Log the ethers library to verify it's loaded
console.log('Ethers library loaded:', ethers);
