import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "./spinner";
import { getAccountTxs } from "../services";
import { Utils } from "alchemy-sdk";
const Transaction = ({
    blockNumber,
    from,
    to,
    amount,
    txHash,
    timeStamp,
    nonce,
}) => {
    const navigate = useNavigate();
    return (
        <div
            className="border-2 w-full h-10  flex justify-evenly my-2 rounded-xl "
        >
            <div className="w-[13%] h-full  text-center text-[#243776] cursor-pointer hover:font-bold" onClick={() => navigate(`/transaction/${txHash}`)}>
                {txHash.slice(0, 5)}...{txHash.slice(-5)}{" "}

            </div>
            <div className="w-[13%] h-full text-center " >

                <span


                >
                    {" "}
                    {blockNumber}


                </span>
            </div>
            <div className="w-[13%] h-full  text-center " >

                <span


                >
                    {" "}
                    {timeStamp}


                </span>
            </div>
            <div className="w-[13%] h-full  text-center text-[#243776] cursor-pointer hover:font-bold">

                <span onClick={() => navigate(`/transactions/${from}`)}>
                    {" "}
                    {from.slice(0, 5)}...{from.slice(-5)}{" "}
                    {" "}

                </span>
            </div>
            <div className="w-[13%] h-full  text-center text-[#243776] cursor-pointer hover:font-bold ">

                <span


                    onClick={() => navigate(`/transactions/${to}`)}
                >

                    <span > {to.slice(0, 5)}...{to.slice(-5)}{" "} </span>
                </span>
            </div>
            <div className="w-[13%] h-full  text-center ">
                <span > {nonce}</span>
            </div>
            <div className="w-[13%] h-full  text-center " >
                <span>  {Utils.formatEther(amount.toString()).slice(0, 9)} ETH</span>
            </div>
        </div>
    );
};
const AccountTxs = () => {
    const { address } = useParams();
    const [accountTxs, setAccountTxs] = useState();
    (async () => {
        const data = await getAccountTxs(address);
        setAccountTxs(data);
    })();

    return (
        <div className="w-full border-2 rounded-2xl p-4">
            <div className="w-full h-full border-black font-bold rounded-xl text-4xl mb-12">Account Transactions {"  "} <span className="font-thin text-lg">{address}</span> </div>
            <div >
                <div className="border-2 w-full h-16  flex justify-evenly">
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        TransactionHash
                    </div>
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        Block No
                    </div>
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        Timestamp
                    </div>
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        From
                    </div>
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        To
                    </div>
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        Nonce
                    </div>
                    <div className="w-[13%] h-full flex flex-col justify-center text-center font-bold">
                        Amount
                    </div>
                </div>
                {!accountTxs
                    ? <Spinner />
                    : accountTxs?.map((tx) => {
                        return (
                            <Transaction
                                blockNumber={tx.blockNumber}
                                from={tx.from}
                                to={tx.to}
                                amount={tx.value}
                                txHash={tx.hash}
                                timeStamp={tx.timeStamp}
                                nonce={tx.nonce}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default AccountTxs;
