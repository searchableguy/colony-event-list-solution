import Blockies from "react-blockies";
import styles from "./styles.module.css";
import { EventDescription } from "./Description";
import { ColonyLog } from "../../util";

export interface Props extends ColonyLog {}

export function EventItem(props: Props) {
  const { loggedAt, raw, parsed } = props;
  const loggedDate = new Date(loggedAt).toLocaleDateString();
  return (
    <div className={styles.item}>
      <div>
        <Blockies
          className={styles.avatar}
          seed={parsed.values?.user ?? raw.blockHash}
          size={12}
        />
      </div>
      <div className={styles.text}>
        <EventDescription {...props} />
        <time dateTime={loggedDate}>{loggedDate}</time>
      </div>
    </div>
  );
}
