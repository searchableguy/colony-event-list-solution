import { ColonyClientProvider } from "./hooks/useColony";
import { IndexPage } from "./pages/index";
import { NotFoundPage } from "./pages/notFound";
import { Switch, Route } from "wouter";
import { WalletProvider } from "./hooks/useWallet";
import { WALLET, PROVIDER } from "./config/constants";
function App() {
  return (
    <WalletProvider wallet={WALLET} provider={PROVIDER}>
      <ColonyClientProvider>
        <Switch>
          <Route path="/" component={IndexPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </ColonyClientProvider>
    </WalletProvider>
  );
}

export default App;
