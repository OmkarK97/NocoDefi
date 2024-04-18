import React, { useState } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useTransactionReceipt } from "wagmi";
import abi from '../../Contracts/abi/IndexStrat/index.json';

const ContractLogic = ({ tokenAddress, tokenArr, AllocationArr, SwapFees }) => {
    const { data: hashSubmit, writeContract: writeContractSubmit, error: errorSubmit } = useWriteContract();
    const { isLoading: isConfirmingSubmit, isSuccess: isConfirmedSubmit } = useWaitForTransactionReceipt({ hash: hashSubmit });

    const SubmitData = useTransactionReceipt({ hash: hashSubmit });
    // console.log(SubmitData.data)
    // const address = SubmitData.data.logs[0].data;
    // const FinalAddress = "0x" + address.substring(26);
    // console.log(FinalAddress);
    // console.log(tokenAddress)

    const handleSubmit = (e) => {
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
        }
    }

    return (
        <div>
            <button onClick={handleSubmit}>Submit</button>
            <div>
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
    )
}

export default ContractLogic;
