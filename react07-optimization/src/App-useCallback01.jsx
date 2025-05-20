import { useCallback } from "react";
import { useState, useEffect } from "react";

function App() {
  //state 생성
  const [countNumber, setConuntNumber] = useState(0);
  const [randomNumber, setRandomNumber] = useState(0);

  /*
  Step1 : 일반적인 화살표 함수 선언
    state 변경에 의해 App 컴포넌트가 새롭게 렌더링되면 이 함수는
    그때마다 새로운 참조값을 할당받게된다. 즉 참조값이 계속 바뀌므로
    useEffect가 지속적으로 실행된다. JavaScript에서 함수는 개체이기
    때문이다.
  // */
  // const somethingGood = () => {
  //   console.log(`somethingGood호출, ${countNumber}, ${randomNumber}`);
  //   return
  // }

  /*
  Step2 : 함수에 useCallback을 적용하여 렌더링 시 딱 한번만 함수를
    메모이제이션한다. 하지만 의존성배열에 빈 값을 주어 딱 한번만
    실행되므로 state의 변경을 감지하지 못한다. 최초 실행시의 
    초깃값 0만 출력된다.

  Step3 : countNumber가 변경될때마다 새롭게 메모이제이션 되므로 변경된
    state를 감지할 수 있다. 단 randomNumber의 변화는 감지하지 못하므로
    다른 값이 출력될 수 있다.
  */
  const somethingGood = useCallback(
  () => {
    console.log(`somethingGood호출, ${countNumber}, ${randomNumber}`);
    return;
  }
  // , []); //Step2
  , [ countNumber]); //Step3

  useEffect(()=>{
    console.log('somethingGood() or randomGood() 변경됨');
  }, [somethingGood]);

  return (
    <div className="App">
      <h2>useCallback()</h2>
      {/* 스핀버튼을 누를때마다 state가 변겅되어 리렌더링된다. */}
      <input type="number" value={countNumber}
        onChange={(e) => setConuntNumber(e.target.value)}
      />
      {/* 버ㅏ튼을 누를때마다 난수를 생성한 후 state를 변경한다. */}
      <button onClick={() =>{
        setRandomNumber(Math.random());
      }}>
        난수 : {randomNumber}
      </button>
      <br />
      {/* 버튼을 누를때마다 함수를 호출한다. */}
      <button onClick={somethingGood}>somethingGood호출</button>
    </div>  
  ); 
}
export default App; 