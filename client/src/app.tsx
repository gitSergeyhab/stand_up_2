import { useState } from 'react';
import { Test } from './components/test/test';

export function App() {
  const [count, setCount] = useState(0);

  const handleCountClick = () => setCount((val) => val + 1);
  return (
    <div>
      <h1>REACT 12 3123d dd</h1>
      <button type="button" onClick={handleCountClick}>
        {' '}
        Click Me {count}{' '}
      </button>
      <Test />
    </div>
  );
}
