import { ethers } from "./ethers.min.js";
import { fundMeAddress, fundMeAbi } from "./constants.js";

// get button
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const balanceButton = document.getElementById("balanceButton");
const withdrawButton = document.getElementById("withdrawButton");

// set button click events
connectButton.onclick = connect;
fundButton.onclick = fund;
balanceButton.onclick = balance;
withdrawButton.onclick = withdraw;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    connectButton.innerHTML = "Connected.";
  } else {
    connectButton.innerHTML = "No metamask installed.";
  }
}

async function fund() {
  const ethAmount = document.getElementById("ethAmount").value;
  console.log(`Fund with ${ethAmount} ETH.`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const fundMe = new ethers.Contract(fundMeAddress, fundMeAbi, signer);

    try {
      const transcationResponse = await fundMe.fund({
        value: ethers.parseEther(ethAmount),
      });
      await listenForTransactionMine(transcationResponse, provider);
      console.log(
        `Account ${signer.address} fund success with ${ethAmount} ETH.`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

async function withdraw() {
  console.log(`Withdraw all balance.`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const balance = await provider.getBalance(fundMeAddress);

    const fundMe = new ethers.Contract(fundMeAddress, fundMeAbi, signer);

    try {
      const transcationResponse = await fundMe.withdraw();
      await listenForTransactionMine(transcationResponse, provider);

      console.log(
        `Account ${signer.address} withdraw success with ${balance} ETH.`,
      );
    } catch (error) {
      console.log(error);
    }
  }
}

async function balance() {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.BrowserProvider(window.ethereum);
    console.log(
      `Contract balance: ${ethers.formatEther(await provider.getBalance(fundMeAddress))}`,
    );
  }
}

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, async (transactionReceipt) => {
        console.log(
          `Completed with ${await transactionReceipt.confirmations()} confirmations. `,
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
