# SliceVault

SliceVault is a decentralized file storage and sharing application built on Web3 technologies. It leverages IPFS for file storage and Ethereum smart contracts to securely store file metadata on the blockchain, ensuring transparency, immutability, and user control over their data.

![SliceVault Top Section](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/slice/images/slice-top.jpeg)
_Header section of SliceVault, featuring wallet connection and navigation_

## Overview

SliceVault allows users to:

- Upload files to IPFS, a decentralized storage network.
- Store file metadata (e.g., IPFS content identifier (CID), file name, description, size, and uploader address) on an Ethereum smart contract.
- Retrieve files by querying the blockchain for metadata and fetching the file from IPFS.
- View and manage their uploaded files securely.

The application consists of a React-based frontend and a Node.js backend, hosted in separate repositories:

- **Frontend**: [https://github.com/XyonX/SliceVault.git](https://github.com/XyonX/SliceVault.git)
- **Backend**: [https://github.com/XyonX/slice-backend.git](https://github.com/XyonX/slice-backend.git)

Try it live at [SliceVault](https://slicevault.vercel.app/).

## Features

- **Decentralized Storage**: Files are stored on IPFS, ensuring no single point of failure.
- **Blockchain Security**: File metadata is stored on an Ethereum smart contract for immutability and transparency.
- **User-Friendly Interface**: A React frontend allows users to upload, view, and manage files with ease.
- **Wallet Integration**: Connects with Ethereum wallets (e.g., MetaMask) for user authentication and transaction signing.
- **File Metadata Management**: Store and retrieve file details like name, description, size, and tags.
- **Transaction Tracking**: Provides links to Etherscan for tracking blockchain transactions.

![SliceVault Mid Section](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/slice/images/slice-mid.png)
_File upload section of SliceVault, showcasing the intuitive UI_

## How It Works

1. **File Upload**:

   - Users select a file, add a description and tag, and connect their Ethereum wallet.
   - The file is uploaded to IPFS, generating a unique CID.
   - The backend prepares a transaction to store the file metadata (CID, name, description, size, uploader address, tag) on the Ethereum smart contract.
   - The transaction is executed, and the user receives a confirmation with the transaction hash and Etherscan link.

2. **File Retrieval**:

   - Users can query the blockchain to retrieve metadata for their files using their wallet address.
   - The metadata includes the IPFS CID, which is used to fetch the file from IPFS.
   - The file is then delivered to the user.

3. **Smart Contract**:
   - Stores file metadata in a structured format.
   - Emits a `FileUploaded` event for each upload, which includes details like file ID, CID, and uploader address.
   - Provides view functions to retrieve all files or files by a specific uploader.

![SliceVault Full View](https://raw.githubusercontent.com/XyonX/portfolio-content/refs/heads/main/Portfolios/slice/images/slice-full.jpeg)
_Full view of the SliceVault application interface_

## Technology Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express
- **Decentralized Storage**: IPFS
- **Blockchain**: Ethereum (Holesky testnet), Ethers.js
- **Smart Contract**: Solidity, Truffle
- **Wallet Integration**: MetaMask
- **Other Libraries**: Multer (file uploads), dotenv (environment variables)

## Installation

### Prerequisites

- Node.js (v16 or higher)
- MetaMask (or another Ethereum wallet)
- IPFS node (local or remote, e.g., Infura IPFS gateway)
- Ethereum Holesky testnet RPC URL
- Truffle (for smart contract deployment)

### Steps

1. **Clone the Repositories**:

   - Frontend:
     ```bash
     git clone https://github.com/XyonX/slice.git
     cd slice
     ```
   - Backend:
     ```bash
     git clone https://github.com/XyonX/slice-backend.git
     cd slice-backend
     ```

2. **Install Dependencies**:

   - For the frontend:
     ```bash
     cd slice
     npm install
     ```
   - For the backend:
     ```bash
     cd slice-backend
     npm install
     ```

3. **Set Up Environment Variables**:

   - Frontend: Create a `.env` file in the `slice` directory:
     ```env
     NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
     ```
   - Backend: Create a `.env` file in the `slice-backend` directory:
     ```env
     PRIVATE_KEY=your_ethereum_private_key
     ```

4. **Deploy Smart Contract**:

   - Ensure Truffle is installed (`npm install -g truffle`).
   - In the backend repository, navigate to the `truffle` directory:
     ```bash
     cd slice-backend/truffle
     truffle migrate --network holesky
     ```
   - Update `CONTRACT_ADDRESS` in the backend code (e.g., `controllers/uploadFile.js`) with the deployed contract address.

5. **Run IPFS**:

   - If using a local IPFS node:
     ```bash
     ipfs daemon
     ```
   - Alternatively, configure an IPFS gateway (e.g., Infura) in `slice-backend/lib/ipfsClient.js`.

6. **Start the Backend**:

   - In the backend repository:
     ```bash
     cd slice-backend
     npm run server
     ```

7. **Start the Frontend**:

   - In the frontend repository:
     ```bash
     cd slice
     npm run dev
     ```

8. **Access the App**:
   Open `http://localhost:3000` in a browser with MetaMask installed.

## Usage

1. **Connect Wallet**:

   - Click "Connect Wallet" to link your MetaMask wallet.
   - Ensure you're on the Holesky testnet.

2. **Upload a File**:

   - Select a file, add a description and tag, and click "Upload".
   - Confirm the transaction in MetaMask.
   - Wait for the file to be uploaded to IPFS and the metadata to be stored on the blockchain.

3. **View Files**:

   - Navigate to the "My Files" section to see your uploaded files.
   - Click a file to retrieve it from IPFS using the blockchain metadata.

4. **Track Transactions**:
   - Use the provided Etherscan link to view transaction details on the Holesky testnet.

## Smart Contract

The `FileStorage.sol` contract includes:

- **uploadFile**: Stores file metadata (IPFS CID, name, description, size, uploader, tag) and emits a `FileUploaded` event.
- **getFile**: Retrieves metadata for a specific file ID.
- **getAllFiles**: Returns metadata for all uploaded files.
- **getFilesByUploader**: Returns file IDs uploaded by a specific address.

Deployed on the Holesky testnet at `CONTRACT_ADDRESS`.

## Project Structure

### Frontend (`slice`)

```
slice/
├── components/           # React components (e.g., FileUploader)
├── pages/                # Next.js pages
├── styles/               # Tailwind CSS
├── .env                  # Environment variables
└── package.json          # Frontend dependencies
```

### Backend (`slice-backend`)

```
slice-backend/
├── controllers/          # API logic (e.g., uploadFile, getAllFiles)
├── lib/                  # IPFS client
├── Uploads/              # Temporary file storage
├── truffle/              # Smart contract code and deployment
│   ├── contracts/        # Solidity contracts (FileStorage.sol)
│   ├── migrations/       # Truffle migrations
│   └── build/            # Compiled contract artifacts
├── .env                  # Environment variables
└── package.json          # Backend dependencies
```

## Future Improvements

- Add file encryption for enhanced security.
- Implement file sharing with access control (e.g., allow specific addresses to access files).
- Support multiple blockchain networks (e.g., Polygon, Binance Smart Chain).
- Optimize gas costs for smart contract interactions.
- Add a search feature to filter files by tags or descriptions.

## Contributing

Contributions are welcome! Please:

1. Fork the relevant repository ([frontend](https://github.com/XyonX/slice.git) or [backend](https://github.com/XyonX/slice-backend.git)).
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

## License

This project is licensed under the MIT License.

## Contact

For questions or feedback, reach out via [LinkedIn](https://www.linkedin.com/in/your-profile) or open an issue on [GitHub](https://github.com/XyonX/slice.git) or [GitHub (Backend)](https://github.com/XyonX/slice-backend.git).
