import React, { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useTransactionReceipt } from "wagmi";
import abi from '../../Contracts/abi/IndexStrat/index.json';

const TokenFormWithContractLogic = ({
    tokenAddress,
    tokenArr,
    AllocationArr,
    SwapFees,
    tokenNameMap,
    handleTokenAddress,
    maxAllocation,
    handleClearTokensData,
}) => {
    const [selectedToken, setSelectedToken] = useState("");
    const [allocation, setAllocation] = useState("");
    const [tokensData, setTokensData] = useState([]);
    const [totalAllocation, setTotalAllocation] = useState(0);
    const [showSubmitButton, setShowSubmitButton] = useState(false);
    const [isConfirmingSubmit, setIsConfirmingSubmit] = useState(false);
    const [isConfirmedSubmit, setIsConfirmedSubmit] = useState(false);
    const [errorSubmit, setErrorSubmit] = useState(null);

    const { data: hashSubmit, writeContract: writeContractSubmit, error: errorSubmitHook } = useWriteContract();
    const { isLoading, isSuccess } = useWaitForTransactionReceipt({ hash: hashSubmit });

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
                    fees = SwapFees[pair] || 0;
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
            setIsConfirmingSubmit(true);
        } catch (error) {
            console.error("An error occurred:", error);
            setErrorSubmit(error);
        }
    }



    return (
        <div className="outer-div flex items-center justify-center w-[440px] h-[400px] ml-10">
            <div className="flex flex-col justify-center gap-6 bg-gray-900 w-[430px] h-[390px]">
                <select
                    className="select mx-5 py-2 px-2 cursor-pointer font-semibold  border-none relative "
                    onChange={handleTokenAddress}
                >
                    <option value="">Deposit Token Address</option>
                    <option value="0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8">
                        USDC
                    </option>
                    <option value="0x82aF49447D8a07e3bd95BD0d56f35241523fBab1">
                        ETH
                    </option>
                </select>
                <select
                    className="select mx-5 py-2 px-2 cursor-pointer  border-none font-semibold"
                    value={selectedToken}
                    onChange={handleTokenChange}
                >
                    <option value="">Select a token</option>
                    <option value="0x82af49447d8a07e3bd95bd0d56f35241523fbab1">
                        WBTC
                    </option>
                    <option value="0x3082CC23568eA640225c2467653dB90e9250AaA0">
                        RDNT
                    </option>
                    <option value="0x912CE59144191C1204E64559FE8253a0e49E6548">
                        ARB
                    </option>
                    <option value="0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a">
                        GMX
                    </option>
                    <option value="0x3d9907F9a368ad0a51Be60f7Da3b97cf940982D8">
                        GRAIL
                    </option>
                </select>
                <input
                    className="select mx-5 py-2 px-2 font-semibold border-none"
                    type="number"
                    value={allocation}
                    onChange={handleAllocationChange}
                    placeholder="Allocation (%)"
                    min="0"
                    max={maxAllocation}
                />
                <button
                    className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  "
                    type="submit"
                    onClick={handleSubmit}
                >
                    Add Token
                </button>
                <button
                    className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  "
                    type="button"
                    onClick={handleClearTokensData}
                >
                    Clear Tokens
                </button>
                {showSubmitButton && (
                    <button
                        className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  "
                        type="button"
                        onClick={handleSubmitTransaction}
                    >
                        Submit
                    </button>
                )}
                {isConfirmingSubmit && <p>Transaction pending...</p>}
                {isConfirmedSubmit && <p>Transaction confirmed!</p>}
                {errorSubmit && (
                    <div>
                        Error ||
                        {errorSubmit.message}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TokenFormWithContractLogic;
