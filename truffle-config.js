//const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = 'feed ketchup reveal anchor calm page lawsuit steak hospital notable corn enter'; // replace with your mnemonic phrase

module.exports = {
 networks: {
    development: {
        host: "127.0.0.1",
        port: 7545,
        network_id: "5777"
    },
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
   // mainnet: {
     //   provider: () => new HDWalletProvider(mnemonic, "HTTP://127.0.0.1:7545"), // replace with your node RPC endpoint and credentials
   //     network_id: 1, //Ethereum network ID. 1 for mainnet; 3 for Ropsten. 
     //   gas: 4500000,
   //     gasPrice: 10000000000
    //}
   }
};
