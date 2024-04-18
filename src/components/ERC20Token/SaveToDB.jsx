import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SaveToDB = ({
  handleSaveToDB,
  tokenName,
  symbol,
  decimal,
  supply,
  minted,
  isConfirmedNext,
}) => {
  const notify = () =>
    toast.success("Data Saved", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

  return (
    <div className="absolute h-[260px] w-[245px] bg-slate-900 ">
      {minted && isConfirmedNext && (
        <div className="flex flex-col gap-1 items-center justify-center m-5 mt-5 ">
          <span className="text-lg text-white font-semibold  tracking-wider mt-1 ">
            Token Name : {tokenName}
          </span>
          <span className="text-lg text-white font-semibold tracking-wider ">
            Symbol : {symbol}
          </span>
          <span className="text-lg text-white font-semibold tracking-wider ">
            Decimals : {decimal}
          </span>
          <span className="text-lg text-white font-semibold tracking-wider ">
            Supply : {supply}
          </span>
        </div>
      )}
      <button
        onClick={() => {
          handleSaveToDB();
          notify();
        }}
        className="submit-btn tracking-wide text-xl mx-2  text-white font-bold mt-6 ml-3 transition duration-500  "
      >
        Save to Database
      </button>

      <ToastContainer
        style={{ top: "90px", right: "10px" }}
        position="top-right"
        autoClose={2500}
        limit={2}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default SaveToDB;
