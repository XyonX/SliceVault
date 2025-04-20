"use client";
import { useAppContext } from "@/app/AppProvider";
import React, { useState } from "react";

const Header = () => {
  const { userId, setUserId } = useAppContext();
  const [showProfile, setShowProfile] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === "undefined") {
      alert("Please install MetaMask to connect your wallet.");
      return;
    }
    setShowProfile(!showProfile);

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const walletAddress = accounts[0];
      setUserId(walletAddress); // Store in context
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

  return (
    <>
      <header className=" rounded-md px-4 md:px-10 p-2 w-full max-w-[900px] h-[60px] bg-gray-100 flex items-center justify-between">
        <div className=" p-2 border  flex items-center rounded-sm">SLICE</div>
        <div className="relative">
          {/* 👈 anchor wrapper */}
          <button
            className="p-2 border flex items-center rounded-sm cursor-pointer"
            onClick={
              userId ? () => setShowProfile((prev) => !prev) : connectWallet
            }
          >
            {userId ? (
              <span className="text-xs">
                {userId.slice(0, 6)}...{userId.slice(-4)}
              </span>
            ) : (
              "Connect Wallet"
            )}
          </button>
          {showProfile && userId && (
            <div className="absolute left-0 top-full mt-2 bg-gray-900 text-white rounded shadow-lg z-50 p-4 w-[250px]">
              <h2 className="text-lg font-bold mb-2">Wallet Info</h2>
              <p className="text-sm break-words mb-4">{userId}</p>
              <button
                className="text-sm text-red-400 hover:text-red-600"
                onClick={() => setShowProfile(false)}
              >
                Close
              </button>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
