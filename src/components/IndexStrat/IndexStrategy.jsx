import React, { useState, useEffect } from "react";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { useWriteContract, useWaitForTransactionReceipt, useTransactionReceipt, useSendTransaction } from "wagmi";
import abi from '../../Contracts/abi/IndexStrat/index.json';
import erc20ABI from '../../Contracts/abi/ERC20.json';
import indexABI from '../../Contracts/abi/IndexStrat/IndexStrategy.json';
import TokenForm from "./TokenForm";
import DepositForm from "./DepositForm";

const IndexStrategy = () => {
  const [selectedToken, setSelectedToken] = useState("");
  const [allocation, setAllocation] = useState("");
  const [tokensData, setTokensData] = useState([]);
  const [totalAllocation, setTotalAllocation] = useState(0);
  const [showSubmitButton, setShowSubmitButton] = useState(false);
  const [tokenAddress, setTokenAddress] = useState("");
  const [swapFees, setSwapFees] = useState({});
  const [depositAmount, setDepositAmount] = useState('');
  const [finalAddress, setFinalAddress] = useState('');

  //Yeh hai TokenForm ke liye
  const { data: hashSubmit, writeContract: writeContractSubmit, error: errorSubmitHook } = useWriteContract();
  const { isLoading: isConfirmingSubmit, isSuccess: isConfirmedSubmit } = useWaitForTransactionReceipt({ hash: hashSubmit });
  const SubmitData = useTransactionReceipt({ hash: hashSubmit });

  //Approve wala hai jo deposit ke liye chahiye
  const { isPending, data: hashApprove, writeContract: writeContractApprove } = useWriteContract();
  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({ hash: hashApprove });
  const ApproveData = useTransactionReceipt({ hash: hashApprove });
  // console.log(ApproveData)

  //Yeh wala deposit ke liye jo approve ke baad hoga
  const { data: hashDeposit, writeContract: writeContractDeposit, error: errorDeposit } = useWriteContract();
  const { isLoading: isDepositing, isSuccess: isDeposited } = useWaitForTransactionReceipt({ hash: hashDeposit });
  const DepositData = useTransactionReceipt({ hash: hashDeposit });
  // console.log(DepositData)



  useEffect(() => {
    // Initialize swap fees
    setSwapFees({
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": 500,
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a": 3000,
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x3082CC23568eA640225c2467653dB90e9250AaA0": 3000,
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x912CE59144191C1204E64559FE8253a0e49E6548": 500,
      "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8": 10000,
    });
  }, []);

  const tokenNameMap = {
    "0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f": "WBTC",
    "0x3082CC23568eA640225c2467653dB90e9250AaA0": "RDNT",
    "0x912CE59144191C1204E64559FE8253a0e49E6548": "ARB",
    "0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a": "GMX",
    "0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8": "GRAIL",
  };


  const handleTokenChange = (e) => {
    setSelectedToken(e.target.value);
  };

  const handleAllocationChange = (e) => {
    setAllocation(e.target.value);
  };

  const handleDepositAmountChange = (e) => {
    setDepositAmount(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedToken &&
      allocation &&
      totalAllocation + parseInt(allocation) <= 100
    ) {
      const existingTokenIndex = tokensData.findIndex(
        (token) => token.tokenName === selectedToken
      );
      if (existingTokenIndex !== -1) {
        const updatedTokensData = [...tokensData];
        updatedTokensData[existingTokenIndex].allocation +=
          parseInt(allocation);
        setTokensData(updatedTokensData);
      } else {
        let fees = 0;
        if (tokenAddress === "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1") {
          const pair = `${tokenAddress}-${selectedToken}`;
          fees = swapFees[pair] || 0;
        }
        const newTokensData = [
          ...tokensData,
          {
            tokenName: selectedToken,
            allocation: parseInt(allocation),
            swapFees: fees
          },
        ];
        setTokensData(newTokensData);
      }
      setTotalAllocation(totalAllocation + parseInt(allocation));
      setSelectedToken("");
      setAllocation("");
      if (totalAllocation + parseInt(allocation) === 100) {
        setShowSubmitButton(true);
      }
    }
  };

  const handleClearTokensData = () => {
    setTokensData([]);
    setTotalAllocation(0);
  };

  const handleTokenAddress = (e) => {
    if (totalAllocation === 0) {
      setTokenAddress(e.target.value);
    } else {
      alert("Cannot set token address");
    }
  };

  const tokenArr = tokensData.map((tokenName) => tokenName.tokenName);
  const AllocationArr = tokensData.map((allocation) => allocation.allocation);
  const SwapFees = tokensData.map((fees) => fees.swapFees);

  const handleSubmitTransaction = (e) => {
    e.preventDefault();
    try {
      console.log("Submitting transaction...");
      console.log(tokenAddress)
      console.log(tokenArr)
      console.log(AllocationArr)
      console.log(SwapFees)
      writeContractSubmit({
        abi,
        address: '0x694B24efDa12cF04DEEBaC4bBcf6c3dfD7130726',
        functionName: "createVault",
        args: [tokenAddress, tokenArr, AllocationArr, SwapFees],
      });
    } catch (error) {
      console.log(errorSubmitHook.message)
      console.error("An error occurred:", error);
    }
  }


  const handleApproveTransaction = (e) => {
    e.preventDefault();
    try {
      // console.log("Submitting Approve transaction...");
      // console.log(tokenAddress)
      // console.log(finalAddress, 'Yeh wala final hai')
      writeContractApprove({
        abi: erc20ABI,
        address: tokenAddress,
        functionName: "approve",
        args: [finalAddress, parseVal()],
      });
    } catch (error) {
      console.error("An error occurred during deposit:", error);
    }
  }

  const parseVal = () => {
    const num = ethers.utils.parseUnits(depositAmount.toString(), 18);
    return num;
  };

  const handleDepositTransaction = (e) => {
    e.preventDefault();
    try {
      console.log("Submitting Deposit transaction...");
      writeContractDeposit({
        abi: indexABI,
        address: finalAddress,
        functionName: "deposit",
        args: [parseEther(depositAmount)],
      });
      // console.log(errorDeposit.message)
    } catch (error) {
      console.error("An error occurred during deposit:", error);
    }
  }
  console.log(parseEther(depositAmount))

  // const { sendTransaction } = useSendTransaction()
  // const handleDepositTransaction = (e) => {
  //   sendTransaction({
  //     to: finalAddress,
  //     value: parseEther(depositAmount)
  //   })
  // }

  // console.log(parseVal())

  useEffect(() => {
    const fetchTokenAddress = async () => {
      if (hashSubmit && isConfirmedSubmit && SubmitData && SubmitData.data) {
        const logs = SubmitData.data.logs;
        if (logs && logs.length > 0) {
          const token = logs[logs.length - 1].data;
          const finalAdd = "0x" + token.substring(26);
          console.log(finalAdd);
          setFinalAddress(finalAdd);
        } else {
          console.error("No logs found in SubmitData");
        }
      }
    };
    fetchTokenAddress();
  }, [hashSubmit, isConfirmedSubmit, SubmitData.data]);



  return (
    <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className="flex justify-center items-center h-screen ">
        {!isConfirmedSubmit && (
          <TokenForm
            handleSubmit={handleSubmit}
            handleTokenAddress={handleTokenAddress}
            selectedToken={selectedToken}
            handleTokenChange={handleTokenChange}
            allocation={allocation}
            handleAllocationChange={handleAllocationChange}
            maxAllocation={100 - totalAllocation}
            handleClearTokensData={handleClearTokensData}
            showSubmitButton={showSubmitButton}
            handleSubmitTransaction={handleSubmitTransaction}
            totalAllocation={totalAllocation}
            tokenNameMap={tokenNameMap}
            tokensData={tokensData}
            isConfirmingSubmit={isConfirmingSubmit}
            isConfirmedSubmit={isConfirmedSubmit}
          />
        )}

        {isConfirmedSubmit && (
          <DepositForm
            depositAmount={depositAmount}
            handleDepositAmountChange={handleDepositAmountChange}
            handleApproveTransaction={handleApproveTransaction}
            isApproving={isApproving}
            isApproved={isApproved}
            isDepositing={isDepositing}
            isDeposited={isDeposited}
            handleDepositTransaction={handleDepositTransaction}
            isPending={isPending}
            errorDeposit={errorDeposit}
          />
        )}

      </div>
    </div>
  )
}

export default IndexStrategy



