import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import logo from "../assets/new.png";
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className="h-[70px] bg-gradient-to-b from-black to  bg-slate-900 flex items-center shadow-lg py-10 ">
      <div className="w-full px-12 flex justify-between items-center ">
        {/* <h2 className="text-gradient text-2xl flex items-center gap-5 text-white font-semibold cursor-pointer tracking-wider ">
        </h2> */}
        <Link to='/' className="text-gradient text-2xl flex items-center gap-5 text-white font-semibold cursor-pointer tracking-wider ">
          <img className="w-[310px] text-white" src={logo} alt="logo" />
        </Link>
        <div className="text-gray-400 text-2xl font-medium flex duration-75">
          <Link to="/" className="mr-16 anchor ">
            <h2>Home</h2>
          </Link>
          <a className="mr-16 anchor" href="">
            <h2>Our Team</h2>
          </a>
          <Link to="/dashboard" className="mr-16 anchor">
            <h2>My Dashboard</h2>
          </Link>
        </div>
        <div>
          <ConnectButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
