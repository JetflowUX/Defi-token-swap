import { useState, useEffect } from 'react';
import { usePublicClient } from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

export enum TradeType {
    EXACT_INPUT,
    EXACT_OUTPUT,
}

interface UseTokenQuoteParams {
    tokenIn: string; // Address or symbol
    tokenOut: string; // Address or symbol
    amount: string; // User input string
    tradeType: TradeType;
}

export function useTokenQuote({ tokenIn, tokenOut, amount, tradeType }: UseTokenQuoteParams) {
    const [quoteAmount, setQuoteAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // For Real implementation, we would use the QuoterV2 contract
    // const client = usePublicClient();

    useEffect(() => {
        if (!amount || parseFloat(amount) === 0) {
            setQuoteAmount('');
            return;
        }

        const fetchQuote = async () => {
            setLoading(true);
            setError(null);

            try {
                // SIMULATION: Mocking an API call or Contract Read
                // In a real scenario, this would be:
                // const quote = await client.readContract({ ... })
                // or fetch('https://api.uniswap.org/v1/quote', ...)

                await new Promise((resolve) => setTimeout(resolve, 600)); // Simulate network latency

                // Mock Rate: 1 ETH = 2500 USDC
                // If selling ETH (tokenIn=ETH), buyAmount = amount * 2500
                // If selling USDC (tokenIn=USDC), buyAmount = amount / 2500

                let calculated = 0;
                const rate = 2500;

                if (tokenIn === 'ETH') {
                    calculated = parseFloat(amount) * rate;
                } else {
                    calculated = parseFloat(amount) / rate;
                }

                setQuoteAmount(calculated.toFixed(6));

            } catch (err) {
                console.error("Quote fetch error:", err);
                setError("Failed to fetch quote");
            } finally {
                setLoading(false);
            }
        };

        // Debounce to avoid too many requests
        const timer = setTimeout(() => {
            fetchQuote();
        }, 500);

        return () => clearTimeout(timer);

    }, [tokenIn, tokenOut, amount, tradeType]);

    return { quoteAmount, loading, error };
}
