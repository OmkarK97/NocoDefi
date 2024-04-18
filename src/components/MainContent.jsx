import React from "react";
import Typewriter from "typewriter-effect";

const MainContent = () => {
  return (
    <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className="flex flex-col items-center justify-center m-16 ">
        <div className="flex items-center justify-center flex-col gap-28">
          <h2 className="text-gradient text-cyan-300  font-semibold text-7xl">
            Embark On Blockchain{" "}
          </h2>
          <div className="flex flex-col  gap-4  ">
            <h2 className="text-white  text-6xl tracking-wide">
              Begin Your Journey
            </h2>
            <h2 className="text-white  text-6xl ml-16">In Crafting Your</h2>
            <h2 className="text-white  text-6xl flex ">
              Own&nbsp; {""}
              <Typewriter
                options={{
                  strings: ["ERC20 Token", "NFT", "DAPP", "DEFI Platform"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h2 className="text-white  text-3xl font-medium mb-5">
              Click on Left To Continue
            </h2>
            <div className="arrows-body flex">
              <div className="arrow"></div>
              <div className="arrow"></div>
              <div className="arrow"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
