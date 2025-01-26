import React, { useState } from "react";
import * as ethers from "ethers";

const BridgeForm = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const bridgeTokens = async (source) => {
    try {
      if (source === "Ethereum") {
        setMessage("Tokens burned on Ethereum and minted on Sui");
      } else {
        setMessage("Tokens burned on Sui and minted on Ethereum");
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="bridge-form">
      <input
        type="number"
        placeholder="Enter amount to bridge"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={() => bridgeTokens("Ethereum")}>Bridge to Sui</button>
      <button onClick={() => bridgeTokens("Sui")}>Bridge to Ethereum</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BridgeForm;