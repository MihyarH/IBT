import * as ethers from "ethers";
import { useWallet } from "@mysten/wallet-adapter-react";


export const connectEthWallet = async () => {
  if (window.ethereum) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []);
    return provider.getSigner();
  }
  throw new Error('MetaMask not installed');
};

const connectSuiWallet = async () => {
  const { connect, wallet } = useWallet();

  if (wallet) {
    await connect();
    console.log("Connected to Sui Wallet:", wallet.name);
  } else {
    console.log("No Sui Wallet available");
  }
};

