// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  const simpleStorage = await simpleStorageFactory.deploy();

  await simpleStorage.waitForDeployment();

  console.log(
    `Deploying contracts with the address: ${await simpleStorage.target}`
  );

  // what happens when we deploy to our hardhat network?
  if (
    network.config.chainId === 11155111 &&
    process.env.SEPOLIA_ETHERSCAN_API
  ) {
    console.log("Waiting for block confirmations...");

    // Not functionable in version 6^ ethers ----->

    await simpleStorage.deploymentTransaction().wait(6);
    await verify(simpleStorage.target, []);
  }

  console.log(`Current favorite number: ${await simpleStorage.retrieve()}`);

  await simpleStorage.store("1231");
  await simpleStorage.deploymentTransaction().wait();
  console.log(`Updated favorite number: ${await simpleStorage.retrieve()}`);
}

// async function verify(contractAddress, args) {
const verify = async (contractAddress, args) => {
  console.log("Verifying contract...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already Verified!");
    } else {
      console.log(e);
    }
  }
};

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
