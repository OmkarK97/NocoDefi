import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  base,
  mainnet,
  optimism,
  polygon,
  sepolia,
  zora,
} from 'wagmi/chains';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const Mumbai = {
  id: 80001,
  name: 'Mumbai',
  iconUrl: 'https://chainlist.org/unknown-logo.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Mumbai', symbol: 'Matic', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://polygon-mumbai-bor-rpc.publicnode.com'] },
  },
}

const Botanix = {
  id: 3636,
  name: 'Botanix',
  iconUrl: 'https://chainlist.org/unknown-logo.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://node.botanixlabs.dev'] },
  },
}

const Testing = {
  id: 42161,
  name: 'Testing',
  iconUrl: 'https://chainlist.org/unknown-logo.png',
  iconBackground: '#fff',
  nativeCurrency: { name: 'Ethereum', symbol: 'Eth', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://rpc.tenderly.co/fork/8a2e3afb-7bc7-4a8f-80b3-b1789eaf9d89'] },
  },
}

const config = getDefaultConfig({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    base,
    zora,
    sepolia,
    Mumbai,
    Botanix,
    Testing
  ],
  ssr: true,
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={client}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
)
