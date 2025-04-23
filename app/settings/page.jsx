"use client";
import { useAppContext } from "../AppProvider";
import { Copy } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { userId } = useAppContext();
  //   const { toast } = useToast();

  const copyAddress = () => {
    if (userId) {
      navigator.clipboard.writeText(userId);
      //   toast({
      //     title: "Address Copied",
      //     description: "Wallet address copied to clipboard"
      //   });
    }
  };

  if (!userId) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Please connect your wallet to access settings
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid gap-6">
        <div className="border-box">
          <h2 className="text-lg font-semibold mb-4">Wallet Information</h2>
          <div className="flex items-center justify-between p-3 bg-secondary rounded-sm">
            <span className="text-sm font-medium">{userId}</span>
            <button
              onClick={copyAddress}
              className="p-2 hover:bg-background rounded-sm transition-colors"
            >
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="border-box">
          <h2 className="text-lg font-semibold mb-4">Storage Usage</h2>
          <div className="h-2 bg-secondary rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-primary"></div>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Using 2.5 GB of 10 GB
          </p>
        </div>
      </div>
    </main>
  );
};

export default Settings;
