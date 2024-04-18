import React from "react";
import ERC20Token from "./ERC20Token";

const ERC20TokenWrapper = () => {
  return (
    <div className="w-[80%] flex justify-center items-center h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <ERC20Token />
    </div>
  );
};

export default ERC20TokenWrapper;
