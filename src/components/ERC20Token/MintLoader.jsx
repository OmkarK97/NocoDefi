import React from "react";
import HashLoader from "react-spinners/HashLoader";

const MintLoader = () => {
  return (
    <div className="absolute  text-white  bg-white/10 h-[260px]  w-[255px] flex items-center justify-center ">
      <div className="mb-6">
        <HashLoader size={50} color="#4DD0E1" speedMultiplier={1.1} />
      </div>
    </div>
  );
};

export default MintLoader;
