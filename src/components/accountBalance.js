import React, { useState } from "react";
import { Utils } from "alchemy-sdk";
import { getAccountEthBalance } from "../services";
import Search from "./Search";
import Spinner from "./spinner";

const AccountBalance = () => {
    const [accountBalance, setAccountBalance] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
  

    const handleSearch = async (inputValues) => {
        if (!inputValues) {
            alert("Please enter an address");
            return;
        }
        setIsLoading(true);

        const balance = await getAccountEthBalance(inputValues);
        setAccountBalance(balance.toString());
        setIsLoading(false);
    };

    return (
        <div>
            <Search
                handleSearch={handleSearch}
                placeholder="Address"
                name="address"
            />
            {isLoading ? (
                <div ><Spinner /></div>
            ) : accountBalance === null ? (
                <div className="text-center w-full text-xl text-[#0c0b58] font-bold">
                    Please Search Balance for some Address{" "}
                </div>
            ) : (
                <div>
                    <div className="text-center w-[60%] mx-auto border-4 border-[#0c0b58] bg-[#f09c3d] rounded-2xl py-[2%]">
                        <div className="font-bold text-xl my-2 text-white">Your Account Balance:{" "}</div>
                        <span className="font-bold " >
                            {Utils.formatEther(accountBalance)} ETH
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AccountBalance;
