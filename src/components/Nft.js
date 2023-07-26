import React, { useState } from "react";

import { getNftMetadata } from "../services";
import Spinner from "./spinner";

const Nft = () => {
    const [nftMetadata, setNftMetadata] = useState();
    const [inputValues, setInputValues] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const handleChange = (e) => {
        setInputValues({ ...inputValues, [e.target.name]: e.target.value });
    };
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!inputValues.nftAddress || !inputValues.tokenId) {
            alert("Both fields are required ");
            return;
        }
        setIsLoading(true);
        const _nftMetadata = await getNftMetadata(
            inputValues.nftAddress.toString(),
            inputValues.tokenId.toString()
        );
        setNftMetadata(_nftMetadata);
        setIsLoading(false);
    };
    return (
        <div className="my-4">
            <div className="text-center font-bold text-xl border-2 py-[1%] rounded-xl shadow-2xl text-white bg-[#f87137]">Search Your NFTs</div>

            <form
                onSubmit={handleSearch}
                className="w-[50%] mx-auto my-12"
            >
                <input
                    type="text"
                    placeholder="Nft Address"
                    name="nftAddress"
                    onChange={handleChange}
                    className="border-2 h-10 rounded-xl px-2 mx-2 border-[#0c0b58] "

                />
                <input
                    type="text"
                    placeholder="Token Id"
                    name="tokenId"
                    onChange={handleChange}
                    className="border-2 h-10 rounded-xl px-2 mx-2 border-[#0c0b58] "


                />
                <input
                    type="submit"
                    value="Search"
                    className="border-2 h-10 rounded-xl px-4 mx-2 bg-[#0c0b58] text-white font-bold"
                />
            </form>
            <p className="text-center my-4">
                <span className="font-bold text-[#b5b4f7]">Note: </span>Only NFT listed on openSea is supported
            </p>
            
            {nftMetadata ? (
                <div
                    className="flex  justify-evenly"
                >
                    <img
                        className="w-[30%] border-2 rounded-2xl shadow-2xl "
                        src={nftMetadata.openSea.imageUrl}
                        alt="Nft"
                    />
                    <div className="w-[50%] shadow-2xl border-2 py-4 rounded-2xl">
                        <div className="w-full  flex ">
                            <div className="w-[50%] text-[#0c0b58] font-bold text-lg py-2 text-center">
                                NFT Address
                            </div>
                            <span className="w-[50%]  text-center py-2">
                                {nftMetadata.address.slice(0, 5)}...{nftMetadata.address.slice(-5)}
                            </span>
                        </div>
                        <div className="w-full flex">
                            <div className="w-[50%] text-[#0c0b58] font-bold text-lg py-2 text-center">
                                NFT Address
                            </div>
                            <span className="w-[50%]  text-center py-2" >
                                {nftMetadata.name}
                            </span>
                        </div>
                        <div className="w-full flex">
                            <div className="w-[50%] text-[#0c0b58] font-bold text-lg py-2 text-center">
                                Floor Price
                            </div>

                            <span className="w-[50%]  text-center py-2" >
                                {nftMetadata.openSea.floorPrice} ETH
                            </span>
                        </div>
                        <div className="w-full flex">
                            <div className="w-[50%] text-[#0c0b58] font-bold text-lg py-2 flex flex-col justify-center text-center">
                                Description
                            </div>
                            <span className="w-[50%]  py-2" >
                                {nftMetadata.openSea.description}
                            </span>
                        </div>
                    </div>

                </div>
            ) : isLoading ? (
                <div ><Spinner /></div>
            ) : null}
        </div>
    );
};

export default Nft;
