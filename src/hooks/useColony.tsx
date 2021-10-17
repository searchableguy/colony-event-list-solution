import {
  createContext,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";

import { useWallet } from "./useWallet";

import {
  MAINNET_BETACOLONY_ADDRESS,
  MAINNET_NETWORK_ADDRESS,
} from "../config/constants";

import {
  getColonyNetworkClient,
  Network,
  ColonyClient,
} from "@colony/colony-js";

const colonyClientContext = createContext<ColonyClient | undefined>(undefined);

interface Props {
  children: ReactNode;
}

// This could be made configurable in future.
export function ColonyClientProvider({ children }: Props) {
  const [colonyClient, setColonyClient] = useState(undefined);
  const { wallet, provider } = useWallet();
  useEffect(() => {
    async function createColonyClient() {
      const connectedWallet = wallet.connect(provider);
      const networkClient = getColonyNetworkClient(
        Network.Mainnet,
        connectedWallet,
        {
          networkAddress: MAINNET_NETWORK_ADDRESS,
        }
      );
      const client = await networkClient.getColonyClient(
        MAINNET_BETACOLONY_ADDRESS
      );
      return client;
    }
    createColonyClient().then((client) => setColonyClient(client));
  }, [wallet, provider]);

  return (
    <colonyClientContext.Provider value={colonyClient}>
      {children}
    </colonyClientContext.Provider>
  );
}

export function useColonyClient() {
  const colonyClient = useContext(colonyClientContext);
  return colonyClient;
}
