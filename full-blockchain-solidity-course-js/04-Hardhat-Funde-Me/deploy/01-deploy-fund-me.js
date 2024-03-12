const { deployments, getNamedAccounts, network, run } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
const { verifyHelper } = require("../utils/verify");
require("dotenv").config();

module.exports = async () => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();
  // console.log(`DeploFyer address: ${deployer}`);

  console.log("-----------------------------------------------------");
  console.log("Start deploy the FundMe contract.");

  let v3AggregatorAddress;

  if (developmentChains.includes(network.name)) {
    const mockV3AggregatorDeployment = await deployments.get(
      "MockV3Aggregator"
    );
    v3AggregatorAddress = mockV3AggregatorDeployment.address;
    console.log("In test blockchain.");
  } else {
    v3AggregatorAddress =
      networkConfig[network.config.chainId]["ethUsdPriceFeed"];
  }

  // const mockV3Aggregator = await ethers.getContractAt(
  //   "MockV3Aggregator",
  //   mockV3AggregatorDeployment.address
  // );

  // console.log(`MockV3Aggregator contract description: ${mockV3Aggregator.description()}`);

  // deploy function return a lot things, we need the contract address to get the contract.
  const { address } = await deploy("FundMe", {
    from: deployer,
    args: [v3AggregatorAddress],
    log: true,
  });

  // const fundme = await ethers.getContractAt("FundMe", address);
  // console.log(`Contract address ${fundme.target}`);
  // console.log(`Contract address ${await fundme.getAddress()}`);
  // console.log(`Owner address ${await fundme.getOwner()}`);
  // console.log(`Data Feed ${await fundme.getPriceFeed()}`);

  console.log(`Finish deploy FundMe contract at: ${address}`);
  console.log("-----------------------------------------------------");
  console.log("-----------------------------------------------------");

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    verifyHelper(address, { v3AggregatorAddress });
  }
};
module.exports.tags = ["All", "FundMe"];
