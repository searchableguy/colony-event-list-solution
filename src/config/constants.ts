import { Wallet } from "ethers";
import { InfuraProvider } from "ethers/providers";

export const MAINNET_NETWORK_ADDRESS = `0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef`;
export const MAINNET_BETACOLONY_ADDRESS = `0x869814034d96544f3C62DE2aC22448ed79Ac8e70`;

export const WALLET = Wallet.createRandom();
export const PROVIDER = new InfuraProvider();