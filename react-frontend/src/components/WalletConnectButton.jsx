import React, { useState } from "react";
import { useWallet } from "@mysten/wallet-adapter-react";
import { ethers } from "ethers";

const WalletConnectButton = () => {
  const { connect, disconnect, wallet } = useWallet();
  const [connectedWallet, setConnectedWallet] = useState(null);

  const handleMetaMaskConnect = async () => {
    if (!window.ethereum) {
      alert("MetaMask is not installed in your browser!");
      return;
    }

    try {
      // Request wallet connection
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Use ethers.BrowserProvider for MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setConnectedWallet({ name: "MetaMask", address });
      console.log("Connected to MetaMask:", address);
    } catch (error) {
      console.error("Failed to connect to MetaMask:", error);
      alert("Failed to connect to MetaMask. Check console for details.");
    }
  };

  const handleWalletConnect = async () => {
    if (!wallet) {
      alert("No wallet found for Sui!");
      return;
    }

    try {
      await connect();
      setConnectedWallet({ name: wallet.name });
      console.log(`Connected to ${wallet.name}`);
    } catch (error) {
      console.error("Failed to connect to Sui Wallet:", error);
    }
  };

  const handleDisconnect = () => {
    disconnect();
    setConnectedWallet(null);
    console.log("Disconnected from wallet");
  };

  return (
    <div className="wallet-buttons">
      {!connectedWallet ? (
        <>
          <button onClick={handleWalletConnect}>Connect Sui Wallet</button>
          <button onClick={handleMetaMaskConnect}>Connect MetaMask</button>
        </>
      ) : (
        <div>
          <p>Connected to {connectedWallet.name}</p>
          {connectedWallet.address && <p>Address: {connectedWallet.address}</p>}
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </div>
  );
};

export default WalletConnectButton;
