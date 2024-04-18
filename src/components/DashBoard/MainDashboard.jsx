import React from 'react'
import { Link } from 'react-router-dom'

const MainDashboard = () => {
    return (
        <div className="w-[80%] h-screen bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] bg-slate-950 ">
            <div className="flex justify-center items-center h-screen">
                <Link to='/erc20tokendashboard'>
                    <button className="submit-btn tracking-wide text-xl mb-8  text-white font-bold py-2 px-4 transition duration-500  ">
                        ERC20 Dashboard
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default MainDashboard