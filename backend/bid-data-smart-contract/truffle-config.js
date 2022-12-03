require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');
module.exports = {
  networks: {
    goerli: {
      provider: () => {
        return new HDWalletProvider(process.env.MNEMONIC, 'https://goerli.infura.io/v3/' + process.env.INFURA_API_KEY)
      },
      network_id: '5', // eslint-disable-line camelcase
      gas: 4465030,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "0.8.10",
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}