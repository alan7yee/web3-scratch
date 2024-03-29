const ethers = require("ethers")
// const solc = require("solc")
const fs = require("fs-extra")
require("dotenv").config()


async function main() {
  // Here we use the hardhat network.
  const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

  const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");
  const binary = fs.readFileSync(
    "./SimpleStorage_sol_SimpleStorage.bin",
    "utf-8",
  );
  const contractFactory = new ethers.ContractFactory(abi, binary, wallet);

  console.log("Deploy contract...");
  const contract = await contractFactory.deploy();

  await contract.waitForDeployment()
  // When a transaction happens, we need to wait for it
  await contract.deploymentTransaction()?.wait(1);

  console.log("Contract address: ", await contract.getAddress());

  // console.log("Transaction:\n", contract.deploymentTransaction());
  // const contractTransactionReceipt = await contract.deploymentTransaction().wait(1);
  // console.log("Receipt:\n" + JSON.stringify(contractTransactionReceipt.toJSON()));

  const currentNumber = await contract.retrieve();
  console.log("Initialized favorite number: ", currentNumber.toString());

  // store number
  // Wait for Previous Transactions to Confirm,
  // Otherwise, error: Nonce too low.
  const transaction = await contract.store("123");
  await transaction.wait(1);

  const latestNumber = await contract.retrieve();
  console.log(`Latest favorite number: ${latestNumber.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
