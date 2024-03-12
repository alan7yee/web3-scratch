require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-solhint");
require("hardhat-deploy");
require("dotenv").config();

const MAINNET_RPC_URL =
  process.env.MAINNET_RPC_URL ||
  process.env.ALCHEMY_MAINNET_RPC_URL ||
  "https://eth-mainnet.alchemyapi.io/v2/your-api-key";
const SEPOLIA_RPC_URL =
  process.env.SEPOLIA_RPC_URL ||
  "https://eth-sepolia.g.alchemy.com/v2/YOUR-API-KEY";
const POLYGON_MAINNET_RPC_URL =
  process.env.POLYGON_MAINNET_RPC_URL ||
  "https://polygon-mainnet.alchemyapi.io/v2/your-api-key";
const SEPOLIA_ACCOUNT_PRIVATE_KEY =
  process.env.SEPOLIA_ACCOUNT_PRIVATE_KEY || "0x";
// optional
const MNEMONIC = process.env.MNEMONIC || "your mnemonic";
const SEPOLIA_COINMARKET_API = process.env.SEPOLIA_COINMARKET_API;

// Your API key for Etherscan, obtain one at https://etherscan.io/
const SEPOLIA_ETHERSCAN_API =
  process.env.SEPOLIA_ETHERSCAN_API || "Your etherscan API key";
const POLYGONSCAN_API_KEY =
  process.env.POLYGONSCAN_API_KEY || "Your polygonscan API key";
const REPORT_GAS = process.env.REPORT_GAS || false;

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
    player: {
      default: 1,
    },
  },
};
