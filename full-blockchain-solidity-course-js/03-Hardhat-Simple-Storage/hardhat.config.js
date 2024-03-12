require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("@nomiclabs/hardhat-solhint");
require("hardhat-gas-reporter");
require("dotenv").config();

// tast
require("./tasks/user");

const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL || "";
const SEPOLIA_ACCOUNT_PRIVATE_KEY =
  process.env.SEPOLIA_ACCOUNT_PRIVATE_KEY || "";
const SEPOLIA_ETHERSCAN_API = process.env.SEPOLIA_ETHERSCAN_API || "";
const SEPOLIA_COINMARKET_API = process.SEPOLIA_COINMARKET_API || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  defaultNetwork: "hardhat",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545/",
      chainId: 33171,
    },
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [SEPOLIA_ACCOUNT_PRIVATE_KEY],
      chainId: 11155111,
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: SEPOLIA_ETHERSCAN_API,
  },
  sourcify: {
    // Disabled by default
    // Doesn't need an API key
    enabled: false,
  },
  gasReporter: {
    enabled: true,
    currency: "USD",
    coinmarketcap: SEPOLIA_COINMARKET_API,
  },
};
