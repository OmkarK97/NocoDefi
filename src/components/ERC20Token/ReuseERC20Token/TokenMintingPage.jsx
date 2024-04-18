import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import {
    useAccount,
    useWaitForTransactionReceipt,
    useWriteContract,
} from "wagmi";
import ercabi from "../../../Contracts/abi/ERC20.json";
import { parseEther } from 'ethers/lib/utils';
import MintLoader from "../MintLoader";

const TokenMintingPage = () => {
    const [supply, setSupply] = useState("");
    const { address } = useAccount();
    const { tokenAddress } = useParams();

    const handleCopyClick = async () => {
        try {
            await navigator.clipboard.writeText(tokenAddress)
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };


    const handleSupplyChange = (e) => {
        setSupply(e.target.value);
    };

    const {
        data: hashNext,
        writeContract: writeContractNext,
        isPending: isPendingNext,
    } = useWriteContract();

    const handleSubmit_next = (e) => {
        e.preventDefault();
        try {
            writeContractNext({
                abi: ercabi,
                address: tokenAddress,
                functionName: "_mint",
                args: [address, parseEther(supply)],
            });
        } catch (error) {
            console.error("An error occurred", error);
        }
    };


    const { isLoading: isConfirmingNext, isSuccess: isConfirmedNext } =
        useWaitForTransactionReceipt({
            confirmations: 2,
            hash: hashNext,
        });

    useEffect(() => {
        if (isConfirmedNext) {
            setSupply(""); // Reset supply value
        }
    }, [isConfirmedNext]);

    return (
        <div className="h-screen w-[80%] relative bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
            <div className="flex justify-center items-center h-screen">
                <div className="outer-div flex justify-center items-center  flex-col h-[270px] w-[260px]  gap-6">
                    <form
                        className="flex flex-col gap-0  bg-slate-900 h-[260px] w-[250px] "
                        onSubmit={handleSubmit_next}
                    >
                        <div className="input-box relative w-full mt-12">
                            <input
                                required
                                className=" text-xl bg-gray-800  py-2 outline-none text-white mx-3 "
                                type="number"
                                onChange={handleSupplyChange}
                                value={supply}
                            />
                            <span className="mint tracking-wider">Supply</span>
                        </div>

                        <button
                            disabled={isPendingNext}
                            className="submit-btn tracking-wide text-xl mb-4 text-white font-bold py-2 px-4 transition duration-500 mx-3 mt-12  "
                            type="submit"
                        >
                            {isPendingNext ? "Minting" : "Mint"}
                        </button>

                        <a onClick={handleCopyClick} className="font-medium text-center text-blue-600 dark:text-blue-500 hover:underline">
                            Copy Token Address
                        </a>

                        {isConfirmingNext && (
                            <>
                                <MintLoader />
                                <div className="flex items-center justify-center text-gray-200 tracking-wider ">
                                    Waiting for confirmation...
                                </div>
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TokenMintingPage;
