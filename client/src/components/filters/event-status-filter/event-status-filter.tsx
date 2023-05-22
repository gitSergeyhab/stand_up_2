import { ChangeEventHandler } from 'react';
import { EventStatus, FilterName } from '../../../const/const';
import { EventStatusFieldSet } from './event-status-filter-style';
import { FilterPropsType } from '../../../types/firler-type';

const EventName: { [key: string]: string } = {
  [EventStatus.All]: 'Любые',
  [EventStatus.Canceled]: 'Отмененные',
  [EventStatus.Ended]: 'Прошедшие',
  [EventStatus.Planned]: 'Планируемые',
};

type OnChange = ChangeEventHandler<HTMLInputElement>;

type OneEventTypeProps = {
  value: string;
  currentValue: string;
  onChange: OnChange;
};

function OneEventType(props: OneEventTypeProps) {
  const { value, currentValue, onChange } = props;

  return (
    <label>
      <input
        onChange={onChange}
        name="event-type"
        type="radio"
        value={value}
        defaultChecked={value === currentValue}
      />
      <span>{EventName[value]}</span>
    </label>
  );
}

type EventStatusFilterProps = {
  currentEventType: string;
  setEventType: (type: string) => void;
  filters: FilterPropsType[]

};

export function EventStatusFilter({ currentEventType, setEventType, filters }: EventStatusFilterProps) {

  const filterIndex = filters.findIndex((item) => item.name === FilterName.EventStatus)
  console.log({filters, filterIndex})

  if (filterIndex === -1) {
    return null;
  }
  const handleChangeEventType: OnChange = (evt) => setEventType(evt.currentTarget.value);

  const eventTypeElements = Object.values(EventStatus).map((item) => (
    <OneEventType
      key={item}
      value={item}
      onChange={handleChangeEventType}
      currentValue={currentEventType}
    />
  ));

  return <EventStatusFieldSet>{eventTypeElements}</EventStatusFieldSet>;
}
