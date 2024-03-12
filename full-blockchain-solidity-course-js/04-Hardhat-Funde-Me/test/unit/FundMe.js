const { assert, expect } = require("chai");
const { ethers, deployments, getNamedAccounts, network } = require("hardhat");
const { developmentChains } = require("../../helper-hardhat-config");

const setup = deployments.createFixture(async () => {
  await deployments.fixture(["MockV3Aggregator", "FundMe"]);

  const { deployer } = await getNamedAccounts();
  const accounts = await getNamedAccounts();

  const { address } = await deployments.get("FundMe");
  const fundMe = await ethers.getContractAt("FundMe", address);
  const mockV3AggregatorAddress = (await deployments.get("MockV3Aggregator"))[
    "address"
  ];

  //console.log("safaaadsfasddfgdfg");

  //console.log(address);
  return {
    accounts,
    deployer,
    fundMe,
    mockV3AggregatorAddress,
  };
});

!developmentChains.includes(network.name)
  ? describe.skip
  : describe("FundMe", function () {
      describe("Constructor", function () {
        it("Should set the right owner", async function () {
          const { deployer, fundMe } = await setup();
          const currentOwner = await fundMe.getOwner();

          // console.log(`Contract owner address: ${currentOwner}`);
          // console.log(`Deployer address ${deployer}`);

          expect(currentOwner).to.equal(deployer);
        });

        it("Should set the right aggregator contract", async function () {
          const { fundMe, mockV3AggregatorAddress } = await setup();
          const currentMockV3AggregatorAddress = await fundMe.getPriceFeed();

          // console.log(
          //   `Expect mockV3AggregatorAddress: ${mockV3AggregatorAddress}`
          // );
          // console.log(
          //   `Current mockV3AggregatorAddress: ${currentMockV3AggregatorAddress}`
          // );

          assert(mockV3AggregatorAddress, currentMockV3AggregatorAddress);
        });
      });

      describe("Fund", function () {
        it("Fails if you don't send enough ETH", async () => {
          const { fundMe } = await setup();
          await expect(fundMe.fund()).to.be.revertedWith(
            "You need to spend more ETH!"
          );
        });
        it("Fund success.", async function () {
          const { deployer, fundMe } = await setup();
          const sendValue = ethers.parseEther("1");

          fundMe.fund({ value: sendValue });

          const addressFund = await fundMe.getAddressToAmountFunded(deployer);
          assert(sendValue.toString(), addressFund.toString);
        });
      });
    });
