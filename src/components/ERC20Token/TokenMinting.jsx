import { useEffect, useState } from "react";
import MintLoader from "./MintLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TokenAdder from "../TokenAdder";

const TokenMinting = ({
  handleSubmit_next,
  handleSupplyChange,
  supply,
  isPendingNext,
  isConfirmingNext,
  isConfirmedNext,
  hashSubmit,
  tokenAdd
}) => {
  const [minted, setminted] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setminted(false);
    }, 3500);
  }, []);

  const notify = () =>
    toast.success("Token Minted", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });

  return (
    <div>
      <div className="outer-div flex justify-center items-center  flex-col h-[270px] w-[260px]  gap-6">
        {!isConfirmedNext && (
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
              className="submit-btn tracking-wide text-xl mb-4   text-white font-bold py-2 px-4 transition duration-500 mx-3 mt-12  "
              type="submit"
            >
              {isPendingNext ? "Minting" : "Mint"}
            </button>

            <div className="flex justify-around">
            <a className="font-medium text-center text-blue-600 dark:text-blue-500 hover:underline" href={`https://testnet.bscscan.com/tx/${hashSubmit}`} target="_blank">
              View on BscScan
            </a>
            <TokenAdder address={tokenAdd}/> 
            </div>

            {isConfirmingNext && (
              <>
                <MintLoader />
                <div className="flex items-center justify-center text-gray-200 tracking-wider ">
                  Waiting for confirmation...
                </div>
              </>
            )}
            {isConfirmedNext && minted ? (
              <>
                {notify()}
                <ToastContainer
                  style={{ top: "90px", right: "10px" }}
                  position="top-right"
                  autoClose={2500}
                  limit={null}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />

                <div className="flex items-center justify-center text-gray-200 tracking-wider z-50 ">
                  Transaction confirmed.
                </div>
              </>
            ) : (
              ""
            )}
          </form>
        )}
      </div>
      {isConfirmedNext && minted ? (
        <>
          {notify()}
          <ToastContainer
            style={{ top: "90px", right: "10px" }}
            position="top-right"
            autoClose={2500}
            limit={null}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default TokenMinting;
