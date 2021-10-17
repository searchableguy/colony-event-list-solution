import { Props as EventItemProps, EventItem } from "./Item";

export interface EventListProps {
  items: EventItemProps[];
}

export function EventList({ items }: EventListProps) {
  return (
    <div>
      {items.map((item, index) => (
        <EventItem key={index} {...item} />
      ))}
    </div>
  );
}
