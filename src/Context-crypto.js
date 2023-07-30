import React, { createContext, useContext, useEffect, useState } from 'react';

const Coins = createContext();

const ContextCrypto = ({ children }) => {
    const [currency,setCurrency]=useState("INR");
    const [symbol,setSymbol]=useState("₹");

    useEffect(()=>{
        if(currency === "INR"){
           setSymbol("₹");
        }
        else if(currency === "USD"){
           setSymbol("$");
        }
    },[currency])
  return (
    <>
      <Coins.Provider  value={{currency,symbol,setCurrency}}>
        {children}
      </Coins.Provider>
    </>
  );
};

export default ContextCrypto;

export const useCoinState = () => {
  return useContext(Coins);
};
