import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getLastTenTxs } from "../services";
import { Utils } from "alchemy-sdk";
import Spinner from "./spinner";
const TransactionMinimal = ({ from, to, txhash, amount }) => {
    const navigate = useNavigate();
    const handleTransactionDetails = async (txHash) => {
        navigate(`/transaction/${txHash}`);
    };
    return (
        <div className="shadow-xl w-full h-16 rounded-xl my-2 flex justify-evenly py-2 border-b-4 ">
            <div className=" w-[20%]  flex flex-col justify-center text-center rounded-2xl   ">
                Tx Hash:{" "}
                <span
                    className="text-[#243776] cursor-pointer hover:font-bold"
                    onClick={() => handleTransactionDetails(txhash)}
                >
                    {txhash.slice(0, 5)}...{txhash.slice(-5)}
                </span>
            </div>{" "}
            <div className=" w-[20%]  flex flex-col justify-center text-center rounded-2xl   ">
                From:{" "}
                <span >
                    {from.slice(0, 5)}...{from.slice(-5)}
                </span>
            </div>
            <div className=" w-[20%]  flex flex-col justify-center text-center rounded-2xl   ">
                To:{" "}
                <span >
                    {to.slice(0, 5)}...{to.slice(-5)}
                </span>
            </div>
            <div className=" w-[20%]  flex flex-col  justify-center text-center rounded-2xl   ">
                Amount:{" "}
                <span  >{Utils.formatEther(amount).slice(0, 7)} ETH</span>
            </div>
        </div>
    );
};
const Transactions = () => {
    const [transactions, setTransactions] = useState([]);
    (async () => {
        const txs = await getLastTenTxs();
        setTransactions(txs);
    })();

    return (
        <div className="w-[40%] rounded-2xl shadow-2xl py-2 px-2">
            <div className="w-full border-2 border-white  bg-[#0c0b58] text-white h-10 px-[2%] py-[1%] font-bold text-xl rounded-xl shadow-xl">
                Latest Transactions
            </div>
            {transactions.length ? (
                transactions.map(({ hash, to, from, value }) => (
                    <TransactionMinimal
                        key={hash}
                        from={from}
                        to={to}
                        txhash={hash}
                        amount={value.toString()}
                    />
                ))
            ) : (
                <div><Spinner /></div>
            )}
        </div>
    );
};

export default Transactions;
