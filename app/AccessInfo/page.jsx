"use client";
import { Copy } from "lucide-react";
import { useAppContext } from "../AppProvider";
// import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const AccessInfo = () => {
  const { userId } = useAppContext();
  // const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  // Contract information (would come from your actual deployment)
  const contractDetails = {
    address: "0x1234567890123456789012345678901234567890", // Replace with your actual contract address
    network: "Holesky Testnet",
    explorer:
      "https://holesky.etherscan.io/address/0x1234567890123456789012345678901234567890",
    rpcUrl: "https://ethereum-holesky.publicnode.com",
  };

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text);
    // toast({
    //   title: "Copied to clipboard",
    //   description: `${label} has been copied to your clipboard.`
    // });
  };

  if (!userId) {
    return (
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold mb-2">Connect Your Wallet</h1>
          <p className="text-muted-foreground">
            Please connect your wallet to access this information
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Access Your Files Anywhere</h1>
        <p className="text-muted-foreground">
          Learn how to access your files directly from the blockchain, even if
          this website is unavailable
        </p>
      </div>

      <div className="border-box mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-4 py-2 ${
              activeTab === "overview"
                ? "bg-background border-b-2 border-primary"
                : ""
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("code")}
            className={`px-4 py-2 ${
              activeTab === "code"
                ? "bg-background border-b-2 border-primary"
                : ""
            }`}
          >
            Code Examples
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`px-4 py-2 ${
              activeTab === "tools"
                ? "bg-background border-b-2 border-primary"
                : ""
            }`}
          >
            Available Tools
          </button>
        </div>

        <div className="p-4">
          {activeTab === "overview" && (
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Why is this important?
              </h2>
              <p className="mb-4">
                Our file storage platform is fully decentralized, meaning your
                files are stored on IPFS and the file references are stored on
                the blockchain. This means you can always access your files,
                even if our website goes offline or disappears.
              </p>

              <h2 className="font-semibold text-lg mb-2">What you'll need</h2>
              <ul className="list-disc pl-5 mb-4 space-y-1">
                <li>
                  The smart contract address and ABI (Application Binary
                  Interface)
                </li>
                <li>
                  Your wallet address (the same one you used to upload files)
                </li>
                <li>A web3 provider (like MetaMask, Alchemy, or Infura)</li>
                <li>
                  Basic knowledge of blockchain interactions (or follow our code
                  examples)
                </li>
              </ul>

              <h2 className="font-semibold text-lg mb-2">
                Contract Information
              </h2>
              <div className="bg-secondary p-4 rounded-sm mb-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Contract Address:</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">
                      {contractDetails.address.slice(0, 8)}...
                      {contractDetails.address.slice(-6)}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(
                          contractDetails.address,
                          "Contract address"
                        )
                      }
                      className="p-1 hover:bg-background rounded-sm transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">Network:</span>
                  <span className="text-sm">{contractDetails.network}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">RPC URL:</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2 truncate max-w-[240px]">
                      {contractDetails.rpcUrl}
                    </span>
                    <button
                      onClick={() =>
                        copyToClipboard(contractDetails.rpcUrl, "RPC URL")
                      }
                      className="p-1 hover:bg-background rounded-sm transition-colors"
                    >
                      <Copy className="h-3 w-3" />
                    </button>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Contract Explorer:
                  </span>
                  <a
                    href={contractDetails.explorer}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    View on Etherscan
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div>
              <h2 className="font-semibold text-lg mb-2">Code Examples</h2>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Using Ethers.js</h3>
                <pre className="bg-secondary p-4 rounded-sm overflow-x-auto text-sm">
                  {`// Install ethers: npm install ethers

const { ethers } = require("ethers");

async function getMyFiles() {
  // Connect to blockchain
  const provider = new ethers.JsonRpcProvider("${contractDetails.rpcUrl}");
  
  // ABI (partial - only including the functions we need)
  const abi = [
    "function getFilesByUser(address user) view returns (tuple(string ipfsHash, string description, uint256 timestamp, address uploader, uint256 size, string tag)[])",
    "function getFileById(uint256 fileId) view returns (tuple(string ipfsHash, string description, uint256 timestamp, address uploader, uint256 size, string tag))"
  ];
  
  // Create contract instance
  const contract = new ethers.Contract("${contractDetails.address}", abi, provider);
  
  // Get files for your address
  const myAddress = "${userId}"; // Your wallet address
  const myFiles = await contract.getFilesByUser(myAddress);
  
  // Process the results
  return myFiles.map(file => ({
    ipfsHash: file.ipfsHash,
    description: file.description,
    timestamp: new Date(Number(file.timestamp) * 1000).toLocaleString(),
    size: ethers.formatUnits(file.size, 0),
    tag: file.tag
  }));
}

// Call the function
getMyFiles().then(files => console.log(files));`}
                </pre>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Using Web3.js</h3>
                <pre className="bg-secondary p-4 rounded-sm overflow-x-auto text-sm">
                  {`// Install web3: npm install web3

const Web3 = require('web3');

async function getMyFiles() {
  // Connect to blockchain
  const web3 = new Web3("${contractDetails.rpcUrl}");
  
  // ABI (partial - only including the functions we need)
  const abi = [
    {
      "inputs": [{"name": "user", "type": "address"}],
      "name": "getFilesByUser",
      "outputs": [{
        "components": [
          {"name": "ipfsHash", "type": "string"},
          {"name": "description", "type": "string"},
          {"name": "timestamp", "type": "uint256"},
          {"name": "uploader", "type": "address"},
          {"name": "size", "type": "uint256"},
          {"name": "tag", "type": "string"}
        ],
        "name": "files",
        "type": "tuple[]"
      }],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  
  // Create contract instance
  const contract = new web3.eth.Contract(abi, "${contractDetails.address}");
  
  // Get files for your address
  const myAddress = "${userId}"; // Your wallet address
  const myFiles = await contract.methods.getFilesByUser(myAddress).call();
  
  // Process the results
  return myFiles.map(file => ({
    ipfsHash: file.ipfsHash,
    description: file.description,
    timestamp: new Date(Number(file.timestamp) * 1000).toLocaleString(),
    size: file.size,
    tag: file.tag
  }));
}

// Call the function
getMyFiles().then(files => console.log(files));`}
                </pre>
              </div>

              <h3 className="font-medium mb-1">Accessing Files from IPFS</h3>
              <p className="mb-2">
                Once you have the IPFS hash, you can access the file from any
                IPFS gateway:
              </p>
              <pre className="bg-secondary p-4 rounded-sm overflow-x-auto text-sm">
                {`// Example IPFS hash
const ipfsHash = "QmX5NRuDXLbrGSBpFkGsULzQrFKGzL4WGmDVZvxcgqNgQN"; // Your file's IPFS hash

// Access through public gateways
const url1 = \`https://ipfs.io/ipfs/\${ipfsHash}\`;
const url2 = \`https://cloudflare-ipfs.com/ipfs/\${ipfsHash}\`;
const url3 = \`https://gateway.pinata.cloud/ipfs/\${ipfsHash}\`;

// You can also use a local IPFS node if you have one running
const localUrl = \`http://localhost:8080/ipfs/\${ipfsHash}\`;`}
              </pre>
            </div>
          )}

          {activeTab === "tools" && (
            <div>
              <h2 className="font-semibold text-lg mb-2">
                Useful Tools & Resources
              </h2>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Blockchain Explorers</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a
                      href="https://holesky.etherscan.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Holesky Etherscan
                    </a>{" "}
                    - View transactions, contract calls, and events
                  </li>
                  <li>
                    <a
                      href="https://etherscan.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ethereum Mainnet Etherscan
                    </a>{" "}
                    - For mainnet deployments
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-1">IPFS Tools</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a
                      href="https://ipfs.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      IPFS Website
                    </a>{" "}
                    - Learn about IPFS and how it works
                  </li>
                  <li>
                    <a
                      href="https://docs.ipfs.io/install/ipfs-desktop/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      IPFS Desktop
                    </a>{" "}
                    - Run your own local IPFS node
                  </li>
                  <li>
                    <a
                      href="https://pinata.cloud/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Pinata
                    </a>{" "}
                    - IPFS pinning service to ensure your files stay available
                  </li>
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-1">Development Tools</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <a
                      href="https://docs.ethers.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Ethers.js Documentation
                    </a>{" "}
                    - JavaScript library for interacting with Ethereum
                  </li>
                  <li>
                    <a
                      href="https://web3js.readthedocs.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Web3.js Documentation
                    </a>{" "}
                    - Alternative JavaScript library for Ethereum
                  </li>
                  <li>
                    <a
                      href="https://metamask.io/download/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      MetaMask
                    </a>{" "}
                    - Browser extension for Ethereum wallet
                  </li>
                </ul>
              </div>

              <div className="p-4 bg-secondary rounded-sm">
                <h3 className="font-medium mb-2">Need Help?</h3>
                <p>
                  If you're having trouble accessing your files or need
                  assistance with any of these tools, please visit our support
                  section or contact our community on Discord.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default AccessInfo;
