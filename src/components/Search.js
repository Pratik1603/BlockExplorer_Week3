import React, { useState } from "react";


const Search = ({ handleSearch, placeholder, name }) => {
    const [inputValue, setInputValue] = useState();
    const handleChange = (e) => {
        setInputValue(e.target.value);
    };
    return (
        <div className="text-center my-10 flex justify-center">
            <input
                type="text"
                className="border-2 border-[#0c0b58] w-[50%] h-16 rounded-xl px-[2%]"
                name={name}
                onChange={handleChange}
                placeholder={placeholder}
            />
            <button
                className="border-2 bg-[#0c0b58] text-white font-bold w-20 h-10 flex flex-col mx-2 my-[1%] justify-center px-4 rounded-xl"
                onClick={() => handleSearch(inputValue)}
            >
                Search
            </button>
        </div>
    );
};

export default Search;
