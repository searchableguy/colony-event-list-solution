import { createContext, ReactNode, useContext } from "react";
import { Provider } from "ethers/providers";
import { Wallet } from "ethers";

interface WalletContext {
  provider: Provider;
  wallet: Wallet;
}

const walletContext = createContext<WalletContext | undefined>(undefined);

interface WalletProviderProps {
  provider: Provider;
  wallet: Wallet;
  children: ReactNode;
}

export function WalletProvider({
  children,
  provider,
  wallet,
}: WalletProviderProps) {
  return (
    <walletContext.Provider value={{ provider, wallet }}>
      {children}
    </walletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(walletContext);
  if (!context) {
    throw new Error("useWallet must be within WalletProvider");
  }
  return context;
}
