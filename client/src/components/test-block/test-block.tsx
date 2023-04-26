import { useState, useEffect } from 'react';
// import { arraysSort } from '../../utils/test-utils';

import './test.css';

// type MapType = <T, R>(array: T[], func: (item: T, idx: number, array: T[]) => R): R[];
function map<T, R>(
  array: T[],
  func: (x: T, idx?: number, array?: T[]) => R,
): R[] {
  return array.map(func);
}

const geTimes = (ms: number) => {
  const sec = Math.floor(ms / 1000);
  const minInSec = 60;
  const hourInSec = minInSec * 60;
  const dayInSec = hourInSec * 24;
  const days = Math.floor(sec / dayInSec);
  const hours = Math.floor((sec - dayInSec * days) / hourInSec);
  const minutes = Math.floor(
    (sec - hourInSec * hours - dayInSec * days) / minInSec,
  );
  const seconds = sec - days * dayInSec - hours * hourInSec - minutes * minInSec;

  return `${days}:${hours}:${minutes}:${seconds}`;
};

// const getMinutes = (date: number, now: number) => Math.round ((date - now ) / 1000 / 60);

const date = Date.parse('2023-01-15');
const xz = map<string, number>(['1', '2', ''], (x) => +x);

export function Test() {
  const [count, setCount] = useState(0);
  const [stop, setStop] = useState(true);
  const [nowDate, setNowDate] = useState(Date.now());

  // setInterval(() => setCount((i) => i + 1), 1000);
  useEffect(() => {
    const interval = setInterval(() => setCount((i) => i + 1), 1000);
    if (stop) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [stop]);

  useEffect(() => {
    const interval = setInterval(() => setNowDate(Date.now()), 1000);

    return () => clearInterval(interval);
  });

  const handleClick = () => setStop((item) => !item);
  return (
    <>
      <button type="button" onClick={handleClick}>
        {stop ? 'start' : 'stop'}
        {xz} xz {geTimes(date - nowDate)}
      </button>
      /
      <br />
      {count}
      <div>
        <input id="input" type="checkbox" className="input" />
        <label htmlFor="input" className="label">
          Check Me
        </label>
      </div>
    </>
  );
}
