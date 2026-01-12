import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUpDown, Settings } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { useTokenQuote, TradeType } from '../hooks/useTokenQuote';
import { TOKENS, Token, getTokenBySymbol } from '../constants/tokens';

export const SwapWidget = () => {
  const { isConnected } = useAccount();
  const [sellAmount, setSellAmount] = useState('');
  const [buyAmount, setBuyAmount] = useState('');

  // Placeholder for now
  const [sellToken, setSellToken] = useState('ETH');
  const [buyToken, setBuyToken] = useState('USDC');

  const switchTokens = () => {
    setSellToken(buyToken);
    setBuyToken(sellToken);
    setSellAmount(buyAmount);
    setBuyAmount('');
  };

  const { quoteAmount, loading, error } = useTokenQuote({
    tokenIn: sellToken,
    tokenOut: buyToken,
    amount: sellAmount,
    tradeType: TradeType.EXACT_INPUT,
  });

  useEffect(() => {
    if (quoteAmount) {
      setBuyAmount(quoteAmount);
    } else if (!sellAmount) {
      setBuyAmount('');
    }
  }, [quoteAmount, sellAmount]);

  const [selectingFor, setSelectingFor] = useState<'sell' | 'buy' | null>(null);

  const handleTokenSelect = (token: Token) => {
    if (selectingFor === 'sell') {
      if (token.symbol === buyToken) {
        setBuyToken(sellToken);
      }
      setSellToken(token.symbol);
    } else if (selectingFor === 'buy') {
      if (token.symbol === sellToken) {
        setSellToken(buyToken);
      }
      setBuyToken(token.symbol);
    }
    setSelectingFor(null);
  };

  const currentSellToken = getTokenBySymbol(sellToken);
  const currentBuyToken = getTokenBySymbol(buyToken);

  return (
    <div className="w-full max-w-[480px] mx-auto p-4 relative">
      {/* Widget Container */}
      <div className="bg-[#131B2E] border border-slate-800 rounded-3xl p-4 shadow-2xl relative overflow-hidden backdrop-blur-xl">

        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-2">
          <h2 className="text-white text-lg font-semibold">Swap</h2>
          <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
            <Settings size={20} />
          </button>
        </div>

        {/* Inputs Container */}
        <div className="space-y-1">

          {/* Pay Input */}
          <div className="bg-[#0F172A] rounded-2xl p-4 hover:border-slate-700 border border-transparent transition-all">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm font-medium">Pay</span>
              <span className="text-slate-400 text-sm">Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={sellAmount}
                onChange={(e) => setSellAmount(e.target.value)}
                placeholder="0"
                className="bg-transparent text-3xl text-white outline-none w-full font-medium placeholder-slate-600"
              />
              <button
                onClick={() => setSelectingFor('sell')}
                className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white px-3 py-1.5 rounded-full font-semibold transition-all shrink-0"
              >
                <span className={`w-6 h-6 rounded-full ${currentSellToken?.color}`}></span>
                {sellToken}
                <ArrowDown size={16} className="text-slate-400" />
              </button>
            </div>
            <div className="flex justify-between mt-2 h-4">
              <span className="text-slate-500 text-xs">$0.00</span>
            </div>
          </div>

          {/* Swap Indicator */}
          <div className="relative h-2 z-10">
            <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#131B2E] p-1.5 rounded-xl border-4 border-[#131B2E]">
              <div
                className="bg-[#1E293B] p-2 rounded-lg hover:bg-[#334155] cursor-pointer transition-colors border border-slate-800"
                onClick={switchTokens}
              >
                <ArrowUpDown size={16} className="text-blue-400" />
              </div>
            </div>
          </div>

          {/* Receive Input */}
          <div className="bg-[#0F172A] rounded-2xl p-4 hover:border-slate-700 border border-transparent transition-all">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm font-medium">Receive</span>
              <span className="text-slate-400 text-sm">Balance: 0.00</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <input
                type="text"
                value={buyAmount}
                readOnly
                placeholder="0"
                className="bg-transparent text-3xl text-white outline-none w-full font-medium placeholder-slate-600"
              />
              <button
                onClick={() => setSelectingFor('buy')}
                className="flex items-center gap-2 bg-[#1E293B] hover:bg-[#334155] text-white px-3 py-1.5 rounded-full font-semibold transition-all shrink-0"
              >
                <span className={`w-6 h-6 rounded-full ${currentBuyToken?.color}`}></span>
                {buyToken}
                <ArrowDown size={16} className="text-slate-400" />
              </button>
            </div>
            <div className="flex justify-between mt-2 h-4">
              <span className="text-slate-500 text-xs text-right w-full">
                {loading ? 'Fetching best price...' : error ? <span className="text-red-400">Error fetching price</span> : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-4">
          {!isConnected ? (
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                authenticationStatus,
                mounted,
              }) => {
                const ready = mounted && authenticationStatus !== 'loading';
                const connected =
                  ready &&
                  account &&
                  chain &&
                  (!authenticationStatus ||
                    authenticationStatus === 'authenticated');

                return (
                  <div
                    {...(!ready && {
                      'aria-hidden': true,
                      'style': {
                        opacity: 0,
                        pointerEvents: 'none',
                        userSelect: 'none',
                      },
                    })}
                  >
                    {(() => {
                      if (!connected) {
                        return (
                          <button onClick={openConnectModal} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                            Connect Wallet
                          </button>
                        );
                      }
                      if (chain.unsupported) {
                        return (
                          <button onClick={openChainModal} className="w-full bg-red-500 text-white font-bold py-4 rounded-2xl">
                            Wrong network
                          </button>
                        );
                      }
                      return (
                        <div style={{ display: 'flex', gap: 12 }}>
                          <button
                            onClick={openChainModal}
                            style={{ display: 'flex', alignItems: 'center' }}
                            type="button"
                            className="w-full bg-[#1E293B] text-white font-bold py-4 rounded-2xl"
                          >
                            {chain.hasIcon && (
                              <div
                                style={{
                                  background: chain.iconBackground,
                                  width: 12,
                                  height: 12,
                                  borderRadius: 999,
                                  overflow: 'hidden',
                                  marginRight: 4,
                                }}
                              >
                                {chain.iconUrl && (
                                  <img
                                    alt={chain.name ?? 'Chain icon'}
                                    src={chain.iconUrl}
                                    style={{ width: 12, height: 12 }}
                                  />
                                )}
                              </div>
                            )}
                            {chain.name}
                          </button>
                          <button onClick={openAccountModal} type="button" className="w-full bg-[#1E293B] text-white font-bold py-4 rounded-2xl">
                            {account.displayName}
                            {account.displayBalance
                              ? ` (${account.displayBalance})`
                              : ''}
                          </button>
                        </div>
                      );
                    })()}
                  </div>
                );
              }}
            </ConnectButton.Custom>
          ) : (
            <button className="w-full bg-[#1E293B] text-slate-500 font-bold py-4 rounded-2xl cursor-not-allowed">
              {loading ? 'Calculated...' : 'Swap'}
            </button>
          )}
        </div>
      </div>

      {/* Token Select Modal */}
      {selectingFor && (
        <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-3xl"
            onClick={() => setSelectingFor(null)}
          />

          {/* Modal Content */}
          <div className="bg-[#1E293B] w-full max-w-sm rounded-2xl border border-slate-700 shadow-2xl relative z-10 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="text-white font-semibold">Select Token</h3>
              <button
                onClick={() => setSelectingFor(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2">
              {TOKENS.map((token) => (
                <button
                  key={token.symbol}
                  onClick={() => handleTokenSelect(token)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-slate-700/50 rounded-xl transition-colors text-left group"
                >
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center ${token.color} text-white font-bold text-xs`}>
                    {token.symbol[0]}
                  </span>
                  <div>
                    <div className="text-white font-medium">{token.name}</div>
                    <div className="text-slate-400 text-xs">{token.symbol}</div>
                  </div>
                  {((selectingFor === 'sell' && sellToken === token.symbol) ||
                    (selectingFor === 'buy' && buyToken === token.symbol)) && (
                      <div className="ml-auto text-blue-400 text-sm">Selected</div>
                    )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};