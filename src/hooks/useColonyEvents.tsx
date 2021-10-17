import { useState, useEffect } from "react";
import { useColonyClient } from "./useColony";
import { useWallet } from "./useWallet";
import { fetchColonyLogs, ColonyLog } from "../util";
// Type all the events
type ColonyEvents =
  | "PayoutClaimed"
  | "ColonyInitialised"
  | "ColonyRoleSet"
  | "DomainAdded";

// Get all the events passed sorted by time. We could make the sort configurable.
export function useColonyEvents(filters: ColonyEvents[]) {
  const colonyClient = useColonyClient();
  const { provider } = useWallet();
  const [eventLogs, setEventLogs] = useState<ColonyLog[]>([]);

  useEffect(() => {
    if (!colonyClient) {
      return;
    }
    async function getFilteredEvents() {
      const allFilteredEvents = filters.map((name) =>
        fetchColonyLogs(colonyClient, provider, colonyClient.filters[name]())
      );

      const logs = await Promise.all(allFilteredEvents);
      // Sort the events
      return logs.flat().sort((a, b) => {
        return b.loggedAt - a.loggedAt;
      });
    }
    getFilteredEvents().then((logs) => setEventLogs(logs));
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [colonyClient, provider, JSON.stringify(filters)]);

  return eventLogs;
}
