import React from "react";
import HashLoader from "react-spinners/HashLoader";

const SmallLoader = () => {
  return (
    <div className="absolute  text-white -top-[428%] -left-[8%]  bg-white/10 h-[399px]  w-[493px] flex items-center justify-center ">
      <div>
        <HashLoader size={60} color="#4DD0E1" speedMultiplier={1.1} />
      </div>
    </div>
  );
};

export default SmallLoader;
