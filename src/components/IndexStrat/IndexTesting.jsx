import React, { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt, useTransactionReceipt } from "wagmi";
import abi from '../../Contracts/abi/IndexStrat/index.json';
import TokenForm from "./TokenForm";

const IndexTesting = () => {
    const [selectedToken, setSelectedToken] = useState("");
    const [allocation, setAllocation] = useState("");
    const [tokensData, setTokensData] = useState([]);
    const [totalAllocation, setTotalAllocation] = useState(0);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [tokenAddress, setTokenAddress] = useState("");
    const [swapFees, setSwapFees] = useState({});
    const [isSubmitConfirmed, setIsSubmitConfirmed] = useState(false);
    const { data: hashSubmit, writeContract: writeContractSubmit, error: errorSubmitHook } = useWriteContract();
    const { isLoading: isConfirmingSubmit, isSuccess: isConfirmedSubmit } = useWaitForTransactionReceipt({ hash: hashSubmit });

    useEffect(() => {
        // Initialize swap fees
        setSwapFees({
            "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x82af49447d8a07e3bd95bd0d56f35241523fbab1": 500,
            "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a": 3000,
            "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x3082CC23568eA640225c2467653dB90e9250AaA0": 3000,
            "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x912CE59144191C1204E64559FE8253a0e49E6548": 500,
            "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1-0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8": 10000,
        });
    }, []);

    const tokenNameMap = {
        "0x82af49447d8a07e3bd95bd0d56f35241523fbab1": "WBTC",
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

    const handleIsSubmitConfirmed = (isConfirmed) => {
        setIsSubmitConfirmed(isConfirmed);
    };

    const tokenArr = tokensData.map((tokenName) => tokenName.tokenName);
    const AllocationArr = tokensData.map((allocation) => allocation.allocation);
    const SwapFees = tokensData.map((fees) => fees.swapFees);

    const handleSubmitTransaction = (e) => {
        e.preventDefault();
        try {
            console.log("Submitting transaction...");
            writeContractSubmit({
                abi,
                address: '0xa38e9508368a823249b7eF291156F93CDcB8E66E',
                functionName: "createVault",
                args: [tokenAddress, tokenArr, AllocationArr, SwapFees],
            });
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorSubmit(error);
        }
    }


    return (
        <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
            <div className="flex justify-center items-center h-screen ">
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
            </div>
        </div>
    )
}

export default IndexTesting