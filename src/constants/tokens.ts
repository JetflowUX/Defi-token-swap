export interface Token {
    symbol: string;
    name: string;
    decimals: number;
    mockUsdPrice: number;
    color: string; // Tailwind class or hex for icon background
}

export const TOKENS: Token[] = [
    {
        symbol: 'ETH',
        name: 'Ethereum',
        decimals: 18,
        mockUsdPrice: 2500,
        color: 'bg-blue-500',
    },
    {
        symbol: 'WBTC',
        name: 'Wrapped Bitcoin',
        decimals: 8,
        mockUsdPrice: 45000,
        color: 'bg-orange-500',
    },
    {
        symbol: 'USDC',
        name: 'USD Coin',
        decimals: 6,
        mockUsdPrice: 1,
        color: 'bg-blue-400',
    },
    {
        symbol: 'USDT',
        name: 'Tether USD',
        decimals: 6,
        mockUsdPrice: 1,
        color: 'bg-teal-500',
    },
    {
        symbol: 'DAI',
        name: 'Dai Stablecoin',
        decimals: 18,
        mockUsdPrice: 1,
        color: 'bg-yellow-500',
    },
];

export const getTokenBySymbol = (symbol: string): Token | undefined => {
    return TOKENS.find((t) => t.symbol === symbol);
};
