import { configureChains, createConfig } from "wagmi";
import { mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { w3mProvider } from "@web3modal/ethereum";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";

const projectId = "YOUR_WALLETCONNECT_PROJECT_ID"; // Get from https://cloud.walletconnect.com

const chains = [mainnet];
const { publicClient } = configureChains(chains, [
  w3mProvider({ projectId }),
  publicProvider(),
]);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

export const ethereumClient = new EthereumClient(wagmiConfig, chains);
