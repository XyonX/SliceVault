"use client";
import { useAppContext } from "@/app/AppProvider";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Copy, Link as LinkIcon } from "lucide-react";

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

  const disconnectWallet = () => {
    // Clear user address from context or state
    setUserId(null);
    // Optionally hide profile or update UI
    setShowProfile(false);
    console.log("Wallet disconnected.");
  };

  const isActivePath = (path) => {
    const pathname = usePathname();
    return pathname === path;
  };

  const copyAddress = () => {
    if (userId) {
      navigator.clipboard.writeText(userId);
      // toast({
      //   title: "Address Copied",
      //   description: "Wallet address copied to clipboard",
      // });
    }
  };

  return (
    <header className=" w-full px-4 py-3 border-b border-border flex items-center justify-between bg-background">
      <div className="flex items-center gap-8">
        <Link
          href="/"
          className="text-xl font-semibold p-2 border border-border rounded-sm"
        >
          SLICE<span className="text-xs ml-1 text-muted-foreground">vault</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {/* Always show Access Info link */}
          <Link
            href="/accessinfo"
            className={`text-sm hover:text-primary transition-colors flex items-center gap-1 ${
              isActivePath("/accessinfo")
                ? "text-primary font-medium"
                : "text-muted-foreground"
            }`}
          >
            <LinkIcon className="h-4 w-4" />
            Access Guide
          </Link>

          {userId && (
            <>
              <Link
                href="/dashboard"
                className={`text-sm hover:text-primary transition-colors ${
                  isActivePath("/dashboard")
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/shared"
                className={`text-sm hover:text-primary transition-colors ${
                  isActivePath("/shared")
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Shared Files
              </Link>
              <Link
                href="/settings"
                className={`text-sm hover:text-primary transition-colors ${
                  isActivePath("/settings")
                    ? "text-primary font-medium"
                    : "text-muted-foreground"
                }`}
              >
                Settings
              </Link>
            </>
          )}
        </nav>
      </div>

      <div className="relative">
        <button
          className="py-2 px-4 border border-border flex items-center rounded-sm hover-border"
          onClick={
            userId ? () => setShowProfile((prev) => !prev) : connectWallet
          }
        >
          {userId ? (
            <span className="text-sm">
              {userId.slice(0, 6)}...{userId.slice(-4)}
            </span>
          ) : (
            "Connect Wallet"
          )}
        </button>

        {showProfile && userId && (
          <div className="absolute right-0 top-full mt-2 bg-background border border-border rounded-sm shadow-lg z-50 p-4 w-[250px] animate-fade-in">
            <h2 className="text-lg font-semibold mb-2">Wallet Info</h2>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm truncate mr-2">{userId}</p>
              <button
                onClick={copyAddress}
                className="p-1 hover:bg-secondary rounded-sm"
                title="Copy address"
              >
                <Copy size={14} />
              </button>
            </div>
            <button
              className="w-full btn-outline text-sm"
              onClick={disconnectWallet}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
