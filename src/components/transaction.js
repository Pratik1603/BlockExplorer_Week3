import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Utils } from "alchemy-sdk";
import { getIndividualTransaction } from "../services";
import Spinner from "./spinner";
const Transaction = () => {
    const { txHash } = useParams();
    const [txData, setTxData] = useState();
    const navigate = useNavigate();
    (async () => {
        const data = await getIndividualTransaction(txHash);
        setTxData(data);
    })();
    return (
        <div className="w-full border-2 rounded-2xl p-4 my-8 shadow-2xl">
            <div className="w-full h-full border-black font-bold rounded-xl text-[#0c0b58] text-4xl mb-12">Transaction Details</div>

            <div className="w-full h-full rounded-xl  shadow-2xl flex p-[2%] flex-col gap-4 border-2">
                {!txData ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%] text-center  font-bold text-lg">
                                Block Hash:{" "}
                            </div>
                            <span className="w-[50%]  text-center">
                                {" "}
                                {txData.blockHash}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                Block Number:{" "}
                            </div>
                            <span className="w-[50%] text-center" >
                                {" "}
                                {txData.blockNumber}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                            <div className="w-[50%] text-center font-bold text-lg">
                                Nonce:{" "}
                            </div>
                            <span className="w-[50%]  text-center">
                                {" "}
                                {txData.nonce}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]" >
                            <div className="w-[50%]  text-center font-bold text-lg">
                                Transaction Hash:{" "}
                            </div>
                            <span className="w-[50%]  text-center">
                                {" "}
                                {txData.hash}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                From:{" "}
                            </div>
                            <span
                                onClick={() =>
                                    navigate(`/transactions/${txData.from}`)
                                }
                                className="w-[50%]  text-center text-[#243776] cursor-pointer hover:font-bold"
                            >
                                {" "}
                                {txData.from}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                            <div className="w-[50%] text-center font-bold text-lg">
                                To:{" "}
                            </div>
                            <span
                                onClick={() =>
                                    navigate(`/transactions/${txData.to}`)
                                }
                                className="w-[50%]  text-center text-[#243776] cursor-pointer hover:font-bold"
                            >
                                {" "}
                                {txData.to}{" "}
                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                Value:{" "}
                            </div>
                            <span className="w-[50%]  text-center" >
                                {" "}
                                {Utils.formatEther(txData.value.toString())} ETH

                            </span>
                        </div>
                        <div className="w-full rounded-xl border-2 flex py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                Gas Limit :{" "}
                            </div>
                            <span className="w-[50%]  text-center">
                                {" "}
                                {Utils.formatEther(txData.gasLimit.toString())} ETH

                            </span>
                        </div>
                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                         
                            <div className="w-[50%]  text-center font-bold text-lg">
                                Gas Price:{" "}
                            </div>
                            <span className="w-[50%]  text-center">
                                {" "}
                                {Utils.formatEther(txData.gasPrice.toString())} ETH

                            </span>
                        </div>

                        <div className="w-full flex rounded-xl border-2 py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                v:{" "}
                            </div>
                            <span className="w-[50%]  text-center">{txData.v} </span>
                        </div>
                        <div className="w-full rounded-xl border-2 flex py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                r:{" "}
                            </div>
                            <span className="w-[50%]  text-center">{txData.r} </span>
                        </div>
                        <div className="w-full rounded-xl border-2 flex py-[1%]">
                            <div className="w-[50%]  text-center font-bold text-lg">
                                s:{" "}
                            </div>
                            <span className="w-[50%]  text-center">
                                {txData.s}
                                {""}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default Transaction;
