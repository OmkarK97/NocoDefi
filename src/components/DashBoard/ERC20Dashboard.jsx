import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const ERC20Dashboard = () => {
  const { address } = useAccount();
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const checkData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/erc20/userActivity', {
          params: { address }
        });
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching user activity:', error);
      }
    };
    checkData();
  }, [address]);

  const handleCardClick = (tokenAddress) => {
    history.push(`/mint-token/${tokenAddress}`);
  };



  return (
    <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
      <div className="flex justify-center items-center h-screen ">
        {data.map((token, index) => (
          <div className=' max-w-md w-full rounded-lg overflow-hidden shadow-xl bg-gray-800 border border-gray-700 m-4' key={index}>
            <div className="cursor-pointer" onClick={() => handleCardClick(token.tokenAddress)}>
              <div className="px-6 py-4">
                <div className="text-white font-bold text-xl mb-2">{token.name}</div>
                <p className="text-gray-300 text-base">
                  <span className="font-semibold">Symbol:</span> {token.symbol}<br />
                  <span className="font-semibold">Decimals:</span> {token.decimals}<br />
                  <span className="font-semibold">Token Address:</span> {token.tokenAddress.slice(0, 5)}...{token.tokenAddress.slice(-5)}<br />
                  {/* <span className="font-semibold">Creator:</span> {token.creator.slice(0, 10)}...{token.creator.slice(-10)} */}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERC20Dashboard;
