require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-solhint");
require("hardhat-deploy");
require("dotenv").config();

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;
const SEPOLIA_ACCOUNT_PRIVATE_KEY = process.env.SEPOLIA_ACCOUNT_PRIVATE_KEY;
const SEPOLIA_ETHERSCAN_API = process.env.SEPOLIA_ETHERSCAN_API;
const SEPOLIA_COINMARKET_API = process.env.SEPOLIA_COINMARKET_API;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
    },
    hardhat: {
      live: false,
      chainId: 31337,
    },
  },
  etherscan: {
    apiKey: SEPOLIA_ETHERSCAN_API,
  },
  gasReporter: {
    enabled: false,
    currency: "USD",
    coinmarketcap: SEPOLIA_COINMARKET_API,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
  },
};
