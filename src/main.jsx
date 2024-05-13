/* eslint-disable react-refresh/only-export-components */
import React from 'react'
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { bscTestnet  } from 'wagmi/chains'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// const Erc20Token = {
//   id: 97,
//   name: 'BNB',
//   iconUrl: 'https://chainlist.org/unknown-logo.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'TBNB', symbol: 'tBNB', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://endpoints.omniatech.io/v1/bsc/testnet/public'] },
//   },
// }

// const Botanix = {
//   id: 3636,
//   name: 'Botanix',
//   iconUrl: 'https://chainlist.org/unknown-logo.png',
//   iconBackground: '#fff',
//   nativeCurrency: { name: 'Bitcoin', symbol: 'BTC', decimals: 18 },
//   rpcUrls: {
//     default: { http: ['https://node.botanixlabs.dev'] },
//   },
// }

const IndexStrategy = {
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
    bscTestnet,
    IndexStrategy
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
