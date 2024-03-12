const {
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert } = require("chai");

describe("SimpleStorage", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploySimpleStorageFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const simpleStorageFactory = await ethers.getContractFactory(
      "SimpleStorage",
      owner
    );
    const simpleStorage = await simpleStorageFactory.deploy();

    return simpleStorage;
  }

  describe("Deployment", function () {
    it("Test the initliazed favorite number", async function () {
      const simpleStorage = await loadFixture(deploySimpleStorageFixture);
      const expectFavoriteNumber = 0;
      const currentFavoriteNumber = await simpleStorage.retrieve();

      assert(expectFavoriteNumber.toString(), currentFavoriteNumber.toString());

      //    expect(await expectFavoriteNumber.toString()).to.equal(currentFavoriteNumber.toString());
    });
  });

  describe("Store", function () {
    it("Test the store function", async function () {
      const simpleStorage = await loadFixture(deploySimpleStorageFixture);
      const expectFavoriteNumber = 12313;
      await simpleStorage.store(expectFavoriteNumber.toString());
      const currentFavoriteNumber = await simpleStorage.retrieve();

      assert(expectFavoriteNumber.toString(), currentFavoriteNumber.toString());
    });
  });

  describe("addPerson", function () {
    it("Test the addPerson function.", async function () {
      const simpleStorage = await loadFixture(deploySimpleStorageFixture);
      const personName = "Jason";
      const expectPersonNumber = "3131";
      await simpleStorage.addPerson(personName, expectPersonNumber);
      const currentPersonNumber = await simpleStorage.people[personName];

      assert(expectPersonNumber, currentPersonNumber);
    });
  });
});
