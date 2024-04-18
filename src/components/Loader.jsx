import React from "react";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";

const Loader = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center  bg-gradient-to-b from-black to  bg-slate-900 ">
      <ClimbingBoxLoader size={28} color="#4DD0E1" speedMultiplier={1.1} />
    </div>
  );
};

export default Loader;
