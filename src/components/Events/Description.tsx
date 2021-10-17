import styles from "./styles.module.css";
import { ColonyLog, getAmount, fetcher, getUserAddress } from "../../util";
import { ColonyRole } from "@colony/colony-js";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { useColonyClient } from "../../hooks/useColony";

interface Props extends ColonyLog {}

function DomainAdded({ parsed }: Props) {
  const domainId = new utils.BigNumber(parsed.values.domainId).toString();
  return (
    <p>
      Domain <span className={styles.bold}> {domainId} </span> added.
    </p>
  );
}

function ColonyInitialised() {
  return <p> Congratulations! It's a beautiful baby colony! </p>;
}

function PayoutClaimed({ parsed }: Props) {
  const colonyClient = useColonyClient();
  const token = parsed.values.token;

  const fundingPotId = new utils.BigNumber(
    parsed.values.fundingPotId
  ).toString();
  const { data } = useSWR<{ name: string; decimal: string }>(
    `/api/token/${token}`,
    fetcher
  );
  const decimal = data?.decimal ? parseInt(data.decimal, 10) : 18;
  const amount = getAmount(parsed.values.amount, decimal).toString();
  const [user, setUser] = useState("anonymous");

  useEffect(() => {
    getUserAddress(colonyClient, fundingPotId).then((address) =>
      setUser(address)
    );
  }, [fundingPotId, colonyClient]);

  return (
    <p>
      User <span className={styles.bold}>{user}</span> claimed{" "}
      <span className={styles.bold}>
        {amount}
        {data && data.name}
      </span>{" "}
      payout from pot <span className={styles.bold}>{fundingPotId}</span>.
    </p>
  );
}

function ColonyRoleSet({ parsed }: Props) {
  const role = ColonyRole[parsed.values.role];
  const domainId = new utils.BigNumber(parsed.values.domainId).toString();
  return (
    <p>
      <span className={styles.bold}> {role} </span> role assigned to user
      <span className={styles.bold}> {parsed.values.user} </span> in domain{" "}
      <span className={styles.bold}> {domainId}</span>.
    </p>
  );
}

export const EVENT_DESCRIPTION_COMPONENT: Record<
  string,
  (props: any) => JSX.Element
> = {
  ColonyInitialised,
  DomainAdded,
  ColonyRoleSet,
  PayoutClaimed,
};

export function EventDescription(props: Props) {
  const type: string = props.parsed.name;
  const Component = EVENT_DESCRIPTION_COMPONENT[type];
  return Component ? (
    <Component {...props} />
  ) : (
    <p> No description about the event available. </p>
  );
}
