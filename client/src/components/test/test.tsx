import { useState } from 'react';
import CAT from './img/cat.jpeg';
import TREE from './img/tree.svg';
import Logo1 from './img/logo1.svg';
import Logo2 from './img/logo2.svg';
import './test.style.css';

export function Test() {
  const [count, setCount] = useState(0);

  const handleBtnClick = () => setCount((val) => val + 1);
  return (
    <div>
      <h2>Test 12</h2>
      <img src={CAT} width={300} height={200} alt="" />
      <img src={TREE} width={300} alt="" />

      <button onClick={handleBtnClick} type="button">
        PLUS {count}
      </button>
      <hr />
      <img src={Logo1} width={100} alt="" />
      <hr />
      <img src={Logo2} width={100} alt="" />
    </div>
  );
}
