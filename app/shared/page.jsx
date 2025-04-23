"use client";
import { useAppContext } from "../AppProvider";
import { File } from "lucide-react";

const SharedFiles = () => {
  const { userId } = useAppContext();

  if (!userId) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Please connect your wallet to view shared files
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Shared Files</h1>
        <p className="text-muted-foreground">Files shared with you by others</p>
      </div>

      <div className="border-box">
        <div className="flex items-center justify-center p-12">
          <div className="text-center">
            <div className="w-12 h-12 bg-secondary rounded-sm flex items-center justify-center mx-auto mb-4">
              <File className="h-6 w-6" />
            </div>
            <h2 className="text-lg font-semibold mb-2">No Shared Files Yet</h2>
            <p className="text-muted-foreground">
              Files shared with you will appear here
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SharedFiles;
