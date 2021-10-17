import { CenteredColumn } from "../components/Layouts";
import { EventList } from "../components/Events";
import { useColonyEvents } from "../hooks/useColonyEvents";
import styles from "./index.module.css";

export function IndexPage() {
  const events = useColonyEvents([
    "ColonyInitialised",
    "PayoutClaimed",
    "ColonyRoleSet",
    "DomainAdded",
  ]);

  return (
    <div>
      <div className={styles.background}></div>
      <CenteredColumn>
        {!events.length ? (
          <div>
            Fetching events from colony. This might take a few seconds...
          </div>
        ) : (
          <EventList items={events} />
        )}
      </CenteredColumn>
    </div>
  );
}
