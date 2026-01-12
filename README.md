# DeFi Token Swap Widget

A modern, responsive React-based token swap widget designed for DeFi applications. This project demonstrates a clean UI for swapping tokens, integrated with Web3 wallets via RainbowKit and Wagmi.

> [!NOTE]
> **Simulation Mode**: The current implementation simulates token price quotes (fixed 1 ETH = 2500 USDC) and does not execute real transactions on the blockchain. It serves as a UI/UX demonstration and frontend template.

## Features

- **Wallet Connection**: Integrated with [RainbowKit](https://www.rainbowkit.com/) for seamless wallet connection (MetaMask, WalletConnect, etc.).
- **Token Swap UI**: Intuitive interface for inputting "Pay" and "Receive" amounts.
- **Real-time Simulation**: specific hooks simulate network calls to fetch token quotes.
- **Responsive Design**: Built with Tailwind CSS for a fully responsive experience on desktop and mobile.
- **Ambient Styling**: Features a sleek dark mode with ambient background effects.

## Tech Stack

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Web3 Integration**:
  - [Wagmi](https://wagmi.sh/): React Hooks for Ethereum.
  - [Viem](https://viem.sh/): TypeScript Interface for Ethereum.
  - [RainbowKit](https://www.rainbowkit.com/): Wallet connection UI.
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React `useState` & `useEffect`.

## Project Structure

```
src/
├── components/
│   └── SwapWidget.tsx    # Main widget component handling UI and swap logic
├── hooks/
│   └── useTokenQuote.ts  # Custom hook for fetching (simulated) token quotes
├── App.tsx               # Main application layout with ambient background
├── Providers.tsx         # Web3 and Query providers setup
└── main.tsx             # Entry point
```

## Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Start Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```
