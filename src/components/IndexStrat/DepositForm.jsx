import React, { useState } from 'react';


const DepositForm = ({ depositAmount, handleDepositAmountChange, handleApproveTransaction, isApproving, isApproved, isDepositing, isDeposited, handleDepositTransaction, errorDeposit }) => {


    return (
        <div className="flex items-center gap-36 px-10 w-[980px] h-[600px]  -mt-12">
            <div className="outer-div flex items-center justify-center w-[440px] h-[400px] ml-10">
                <div className="flex flex-col justify-center gap-6 bg-gray-900 w-[430px] h-[390px]">
                    <input
                        className="select mx-5 py-2 px-2 font-semibold border-none"
                        type="number"
                        value={depositAmount}
                        onChange={handleDepositAmountChange}
                        placeholder="Enter deposit amount"
                    />
                    <button className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  " onClick={handleApproveTransaction}>
                        Approve
                        {isApproving && <p>Transaction pending...</p>}
                        {isApproved && <p>Transaction confirmed!</p>}
                    </button>
                    {isApproved && (
                        <button className="add-btn tracking-wide text-xl  text-white font-bold py-2 px-4 mx-5 transition duration-500  " onClick={handleDepositTransaction}>
                            Deposit
                            {isDepositing && <p>Transaction pending for deposit...</p>}
                            {isDeposited && <p>Transaction confirmed for deposit!</p>}
                        </button>
                    )}
                </div>
            </div>
        </div>

    )
}

export default DepositForm;
