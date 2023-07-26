import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Route,
  Routes,
 
} from "react-router-dom";
import Nft from "./components/Nft";
import AccountTxs from "./components/accountTxs";
import Blocks from "./components/Blocks";
import Transactions from "./components/transactions";
import Navbar from "./components/Navbar";
import Transaction from "./components/transaction";
import Block from "./components/Block";
import AccountBalance from "./components/accountBalance";
function App() {
    return (
        <div className="p-4 bg-gradient-to-br  from-[#83c1f8] from-40%  to-[#f7b983] to-70% min-h-[100vh]">
            <Navbar/>
        
              <Routes>
              
                <Route path="/" element={<div className="w-full p-2 flex justify-evenly">
                  <Blocks/>
                  <Transactions/>
                </div> } />
                <Route path="/block/:blockNumber" element={<Block />} />
                <Route path="/transaction/:txHash" element={<Transaction />} />
                <Route path="/transactions/:address" element={<AccountTxs />} />
                <Route path="/account-balance" element={<AccountBalance />} />
                <Route path="/nft" element={<Nft />} />
              </Routes>
          
         
         
        </div>
    );
}

export default App;
