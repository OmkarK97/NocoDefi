import React from 'react';

const TokenForm = ({
    handleTokenAddress,
    selectedToken,
    handleTokenChange,
    allocation,
    handleAllocationChange,
    maxAllocation,
    handleClearTokensData,
    showSubmitButton,
    handleSubmitTransaction,
    totalAllocation,
    tokenNameMap,
    tokensData,
    handleSubmit,
    isConfirmingSubmit,
    isConfirmedSubmit
}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-36 px-10 w-[980px] h-[600px] -mt-12">
                <div className="outer-div flex items-center justify-center w-[440px] h-[400px] ml-10 ">
                    <div className=" flex flex-col justify-center gap-6 bg-gray-900 w-[430px] h-[390px]">
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
                            <option value="0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f">
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
                            <button className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  " type="button" onClick={handleSubmitTransaction}>
                                Submit
                                {isConfirmingSubmit && <p>Transaction pending...</p>}
                                {isConfirmedSubmit && <p>Transaction confirmed!</p>}
                            </button>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-white font-bold text-xl tracking-wider border-b-2 border-gray-500">
                        Selected Tokens :
                    </h2>
                    <ul className="text-white font-bold text-xl tracking-wider mt-2">
                        {tokensData.map((tokenData, index) => (
                            <li key={index}>
                                {tokenNameMap[tokenData.tokenName]}: {tokenData.allocation}%
                                {tokenData.swapFees && (
                                    <span> - Swap Fees: {tokenData.swapFees}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <p className="text-white font-bold text-xl mt-4 tracking-wider  border-b-2 border-gray-500">
                        Total Allocation : {totalAllocation}%
                    </p>
                </div>
            </div>
        </form>
    );
};

export default TokenForm;


