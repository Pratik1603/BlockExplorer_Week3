import React, { useContext, useEffect, useState } from "react";

import MenuIcon from '@mui/icons-material/Menu';

const Navbar = () => {



    const [state, setState] = React.useState(false);


    const navigation = [
        { title: "Home", path: "/" },
        { title: "Account", path: "/account-balance" },
        { title: "NFT", path: "/nft" },

    ];


    return (

        <nav className={`  md:text-sm  text-white ${state ? "shadow-lg rounded-xl mx-2  mt-2 md:shadow-none md:border:none md:mx-2 md:mt-0" : ""}`}>
            <div className="gap-x-16 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <div className="md:hidden">
                        <button className="menu-btn text-gray-500 hover:text-gray-800 cursor-pointer" onClick={() => setState(!state)
                        }>
                            <MenuIcon />
                        </button>
                    </div>
                </div>
                <div className={`flex-1 gap-x-8 items-center mt-8 p-2 md:mt-0 md:flex ${state ? "block" : "hidden"}`}>
                    <div className="text-3xl font-bold text-[#c34747]">
                        BlockExplorer
                    </div>
                    <ul className="justify-evenly w-full items-center space-y-6 md:flex md:space-x-6 md:space-y-0">

                        {navigation.map((item, idx) => {
                            return (
                                <li key={idx} className="text-black font-bold  hover:text-[#c34747] text-lg hover:font-bold hover:text-xl ease-in-out">
                                    <a style={{ textDecoration: "none" }} href={item.path} className="block" >{item.title}</a>
                                </li>
                            );
                        })}
                    </ul>


                </div>
            </div>
        </nav>
    )
}

export default Navbar;