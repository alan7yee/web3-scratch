const { ethers, deployments, getNamedAccounts, network } = require("hardhat");

module.exports = async () => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const chainId = network.config.chainId;
  if (chainId == 31337) {
    console.log("-----------------------------------------------------");
    console.log("-----------------------------------------------------");
    console.log("Start deploy the MockV3Aggregator contract.");
    const decimal = 8;
    const price = 2000 * 1e8;
    const { address } = await deploy("MockV3Aggregator", {
      from: deployer,
      args: [decimal, price],
      log: true,
    });

    const mockV3Aggregator = await ethers.getContractAt(
      "MockV3Aggregator",
      address
    );
    console.log(`Network ${network.name}`);

    //console.log("--------------------------------------------------")
    //console.log(mockV3Aggregator);
    // console.log(
    //   `MockV3Aggregator address: ${await mockV3Aggregator.getAddress()}`
    // );
    // const { answer } = await mockV3Aggregator.latestRoundData();
    // console.log(`Get price feed: ${answer}`);

    console.log("Finish deploy the MockV3Aggregator contract..");
    console.log("-----------------------------------------------------");
  }
};

module.exports.tags = ["All", "MockV3Aggregator"];
