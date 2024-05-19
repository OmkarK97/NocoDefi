/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Web3 from "web3";
import detectEthereumProvider from "@metamask/detect-provider"

const ABI = [
  {
    constant: true,
    inputs: [],
    name: "name",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [
      {
        name: "",
        type: "uint8",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "symbol",
    outputs: [
      {
        name: "",
        type: "string",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const TokenAdder = ({ address }) => {
  // get all the token info

  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const getToken = async () => {
    try {
      const web3 = new Web3("https://cloudflare-eth.com/");
      const contract = new web3.eth.Contract(ABI, address);
      const [name, symbol, decimals] = await Promise.all([
        contract.methods.name().call(),
        contract.methods.symbol().call(),
        contract.methods.decimals().call(),
      ]);
      setToken({ name, symbol, decimals });
    } catch {
      setToken(false);
    }
  };

  console.log(address)

  const addToken = async () => {
    setLoading(true);
    try {
      const provider = await detectEthereumProvider();
      if (!provider) {
        alert("Please install metamask to proceed");
      } else {
        await provider.request({
          method: "eth_requestAccounts",
        });
        await provider.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address,
              symbol: token.symbol,
              decimals: token.decimals,
            },
          },
        });
      }
    } catch {
      alert("Unable to add the token");
    }
    setLoading(false);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <div>
      <button disabled={loading}>
        <img src='https://chainlist.org/connectors/icn-metamask.svg' onClick={addToken} className="w-5 cursor-pointer" />
      </button>
    </div>
  );
};

export default TokenAdder;