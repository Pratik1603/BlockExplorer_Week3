import React from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIndividualBlock } from "../services";
import { Utils } from "alchemy-sdk";
import Spinner from "./spinner";
const Block = () => {
    const navigate = useNavigate();
    const { blockNumber } = useParams();
    const [blockData, setBlockData] = useState();
    (async () => {
        const data = await getIndividualBlock(blockNumber);
        setBlockData(data);
    })();
    const [open, setOpen] = useState(false);


    return (
        <div className="w-full shadow-2xl border-2 rounded-2xl p-4 my-4">
            <div className="w-full h-full border-black font-bold text-[#0c0b58] rounded-xl text-4xl mb-12">Block Details <span className="font-thin text-lg">#{blockNumber}</span></div>
            <div
                className="w-full h-full rounded-xl  shadow-2xl flex p-[2%] flex-col gap-4 border-2"
            >
                {!blockData ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="w-full flex rounded-xl border-2 py-[1%]"  >
                            <div className="w-[50%] text-center  font-bold text-lg">Base Fee :{" "}</div>


                            <span className="w-[50%]  text-center">
                                {" "}
                                {Utils.formatEther(blockData.baseFeePerGas.toString() || "")
                                }{" "}
                                ETH
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg">Gas Limit:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {" "}
                                {Utils.formatEther(blockData.gasLimit.toString() || "")
                                }{" "}
                                ETH

                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg"> Gas Used:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {" "}
                                {Utils.formatEther(blockData.gasUsed.toString() || "")
                                }{" "}
                                ETH

                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg">Block Hash:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {" "}
                                {blockData.hash.slice(0, 5)}...{blockData.hash.slice(-5)}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg">Validator:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {" "}
                                {blockData.miner.slice(0, 5)}...{blockData.miner.slice(-5)}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg">Parent Hash:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {" "}
                                {blockData.parentHash.slice(0, 5)}...{blockData.parentHash.slice(-5)}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]"  >

                            <div className="w-[50%] text-center  font-bold text-lg"> Timestamp:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {" "}
                                {blockData.timestamp || ""}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg"> Transactions Count:{" "}</div>

                            <span className="w-[50%]  text-center">
                                {blockData.transactions.length}{" "}
                            </span>
                        </div>
                        <div className="w-full rounded-xl  py-[1%]" >

                            <div className="w-[80%] bg-[#0c0b58] text-white  mx-auto text-center flex flex-col justify-center border-2 cursor-pointer  rounded-2xl shadow-xl py-[1%] font-bold text-xl ease-in-out" onClick={() => setOpen((open) => !open)}>{open ? "Close" : "Transactions"}</div>
                            {open ? <div className="w-[80%] mx-auto ease-in-out text-center">
                                {blockData.transactions.map((tx) => (
                                    <ul >
                                        <li

                                            onClick={() =>
                                                navigate(`/transaction/${tx}`)
                                            }
                                            className="text-[#243776] cursor-pointer hover:font-bold border-2 p-[1%] rounded-xl my-[1%] "
                                        >
                                            {tx}
                                        </li>
                                    </ul>
                                ))}
                            </div> : ""}

                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Block;
