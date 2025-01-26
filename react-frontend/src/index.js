import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/App.css";
import { WalletProvider } from "@mysten/wallet-adapter-react";
import { StandardWalletAdapter } from "@mysten/sui.js";

const wallets = [
  new StandardWalletAdapter(), // Ensure compatibility with @mysten/sui.js@0.54.1
];

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider wallets={wallets} autoConnect>
      <App />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
