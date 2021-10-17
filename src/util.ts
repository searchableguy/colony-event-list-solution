import { ColonyClient, getLogs, getBlockTime } from "@colony/colony-js";
import { utils } from "ethers";
import { Provider, Log } from "ethers/providers";

export interface ColonyLog {
  parsed: any;
  raw: Log;
  loggedAt: number;
}
export async function fetchColonyLogs(
  colonyClient: ColonyClient,
  provider: Provider,
  filter: any
) {
  const rawLogs = await getLogs(colonyClient, filter);
  const logs = await Promise.all(
    rawLogs.map(async (rawLog) => {
      const parsedLog = colonyClient.interface.parseLog(rawLog);
      const loggedTime = await getBlockTime(provider, parsedLog.blockHash);
      return {
        raw: rawLog,
        parsed: parsedLog,
        loggedAt: loggedTime,
      };
    })
  );
  return logs;
}

export async function getUserAddress(
  colonyClient: ColonyClient,
  fundingPotId: string
) {
  const humanReadableFundingPotId = new utils.BigNumber(
    fundingPotId
  ).toString();

  const { associatedTypeId } = await colonyClient.getFundingPot(
    humanReadableFundingPotId
  );

  const { recipient: userAddress } = await colonyClient.getPayment(
    associatedTypeId
  );

  return userAddress;
}

export function getAmount(amount: number, decimal: number = 18) {
  const humanReadableAmount = new utils.BigNumber(amount);
  const wei = new utils.BigNumber(10);
  const convertedAmount = humanReadableAmount.div(wei.pow(decimal));
  return convertedAmount;
}

export async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}
