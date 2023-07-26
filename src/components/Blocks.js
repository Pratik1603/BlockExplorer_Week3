import React from "react";
import { useState } from "react";
import { getLastTenBlocks } from "../services";
import { useNavigate } from "react-router-dom";
import Spinner from "./spinner";
const BlockMinimal = ({ blockNumber, txCount, validator }) => {
    const navigate = useNavigate();
    const handleBlockDetails = async (blockNumber) => {
        navigate(`/block/${blockNumber}`);
    };
    return (
        <div className="shadow-xl w-full h-16 rounded-xl my-2 flex justify-evenly py-2 border-b-4 ">
            <div className=" w-[30%]  flex flex-col justify-center text-center rounded-2xl">
                Block:{" "}
                <span
                    className="text-[#243776] cursor-pointer hover:font-bold"
                    onClick={() => handleBlockDetails(blockNumber)}
                >
                    {blockNumber}
                </span>
            </div>
            <div className=" w-[30%] flex flex-col justify-center text-center rounded-2xl ">
                No of Txs <span >{txCount}</span>
            </div>
            <div className=" w-[30%] flex flex-col justify-center text-center rounded-2xl">
                Validator :
                <span className="text-[#243776] cursor-pointer hover:font-bold"
                    onClick={() => navigate(`/transactions/${validator}`)}

                >
                    {validator.slice(0, 5)}...{validator.slice(-5)}
                </span>
            </div>
        </div>
    );
};
const Blocks = () => {
    const [blocks, setBlocks] = useState([]);
    (async () => {
        const _blocks = await getLastTenBlocks();
        setBlocks(_blocks);
    })();
    return (
        <div className="w-[40%] rounded-2xl shadow-2xl py-2 px-2">
            <div className="shadow-2xl w-full border-2 border-white h-10 bg-[#0c0b58] text-white px-[2%] py-[1%] font-bold text-xl rounded-xl ">
                Latest Blocks
            </div>

            {blocks.length ? (
                blocks.map(({ miner, number, transactions }) => (
                    <BlockMinimal
                        key={number}
                        blockNumber={number}
                        validator={miner}
                        txCount={transactions.length}
                    />
                ))
            ) : (
                <div><Spinner /></div>
            )}
        </div>
    );
};

export default Blocks;
