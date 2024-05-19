import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  useAccount,
  useTransactionReceipt,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import abi from "../../Contracts/abi/factory.json";
import ercabi from "../../Contracts/abi/ERC20.json";
import TokenForm from "./TokenForm";
import TokenMinting from "./TokenMinting";
import SaveToDB from "./SaveToDB";
import ERC20DB from "./ERC20DB";
// import { Link } from "react-router-dom";

const ERC20Token = () => {
  const { address } = useAccount(); 

  const {
    data: hashNext,
    writeContract: writeContractNext,
    isPending: isPendingNext,
  } = useWriteContract();

  const {
    data: hashSubmit,
    writeContract: writeContractSubmit,
    isPending: isPendingSubmit,
  } = useWriteContract();

  console.log(hashSubmit)

  const [tokenAdd, setTokenAdd] = useState("");
  const [decimal, setDecimal] = useState("");
  const [tokenName, setTokenName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [supply, setSupply] = useState("");
  const [minted, setMinted] = useState(false);
  const [response, setResponse] = useState(false);

  const handleDecimal = (e) => {
    setDecimal(e.target.value);
  };

  const handleTokenNameChange = (e) => {
    setTokenName(e.target.value);
  };

  const handleSymbolChange = (e) => {
    setSymbol(e.target.value);
  };

  const handleSupplyChange = (e) => {
    setSupply(e.target.value);
  };

  const handleSubmit_next = (e) => {
    e.preventDefault();
    try {
      writeContractNext({
        abi: ercabi,
        address: tokenAdd,
        functionName: "_mint",
        args: [address, parseVal()],
      });
    } catch (error) {
      console.error("An error occurred", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      writeContractSubmit({
        abi,
        address: "0x55a9d74D03C11dF60469e96abd2Aa4D56f26aDb5",
        functionName: "createToken",
        args: [tokenName, symbol, decimal, address]
      });
    } catch (error) {
      console.error("Error executing contract:", error);
    }
  };

  const handleSaveToDB = async () => {
    try {
      const response = await fetch("http://localhost:3000/erc20/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: tokenName,
          symbol: symbol,
          decimals: decimal,
          creator: address,
          tokenAddress: tokenAdd,
        }),
      });
      if (response) {
        setResponse(true);
        console.log("Token data saved to database");
      } else {
        console.error("Failed to save token data to database");
      }
    } catch (error) {
      console.error("Error saving token data:", error);
    }
  };

  const { isLoading: isConfirmingNext, isSuccess: isConfirmedNext } =
    useWaitForTransactionReceipt({
      confirmations: 2,
      hash: hashNext,
    });

  const { isLoading: isConfirmingSubmit, isSuccess: isConfirmedSubmit } =
    useWaitForTransactionReceipt({
      confirmations: 2,
      hash: hashSubmit,
    });

  const tokenData = useTransactionReceipt({ hash: hashSubmit });

  useEffect(() => {
    const fetchTokenAddress = async () => {
      if (hashSubmit && isConfirmedSubmit) {
        const token = tokenData.data.logs[0].data;
        const tokenAddress = "0x" + token.substring(26);
        console.log(tokenAddress);
        setTokenAdd(tokenAddress);
        setMinted(true);
      }
    };
    fetchTokenAddress();
  }, [hashSubmit, isConfirmedSubmit, tokenData]);

  const parseVal = () => {
    const num = ethers.utils.parseUnits(supply.toString(), decimal);
    return num;
  };

  return (
    <div className="h-screen w-[80%] relative bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className="flex justify-center items-center h-screen">
        {!isConfirmedSubmit && (
          <TokenForm
            handleSubmit={handleSubmit}
            handleTokenNameChange={handleTokenNameChange}
            handleSymbolChange={handleSymbolChange}
            handleDecimal={handleDecimal}
            tokenName={tokenName}
            symbol={symbol}
            decimal={decimal}
            isPendingSubmit={isPendingSubmit}
            isConfirmingSubmit={isConfirmingSubmit}
          />
        )}

        {isConfirmedSubmit && !response && (
          <TokenMinting
            hashSubmit={hashSubmit}
            handleSubmit_next={handleSubmit_next}
            handleSupplyChange={handleSupplyChange}
            supply={supply}
            isPendingNext={isPendingNext}
            isConfirmingNext={isConfirmingNext}
            isConfirmedNext={isConfirmedNext}
            tokenAdd={tokenAdd}
          />
        )}

        {response && <ERC20DB />}

        {minted && isConfirmedNext && (
          <SaveToDB
            handleSaveToDB={handleSaveToDB}
            tokenName={tokenName}
            symbol={symbol}
            decimal={decimal}
            supply={supply}
            minted={minted}
            isConfirmedNext={isConfirmedNext}
          />
        )}
      </div>
    </div>
  );
};

export default ERC20Token;
