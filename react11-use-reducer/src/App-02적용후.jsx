import { useReducer, useState } from "react";

/*
useReducer
: useState와 유사하게 상태를 관리한다. 
단 여러개의 하위값을 가진state를 관리할때 유용한다. 또한 컴포넌트에서 
상태를 업데이트 하는로직을 분리할 수 있다.
형식]
  Dispatch(Action) ==> Reducer(prevState, Action)
  디스패치를 통해 리듀서 함수를 실행하고, 파라미터로 전달된 액션을
  분석해서 state를 업데이트 한다.
*/

/*
Reducer 함수 : state를 업데이트 하는 역할의 함수로 Redux의 Store와
  유사하다. 매개변수의 첫번째는 현재상태, 두번째는 상태변경을 위한
  객체를 전달받는다.
*/
const countReducer = (prevCount, action) => {//prevCount : 현재값 , action -> dispatch로 넘겨준 값 ex)({ mode:'down', number:number})
  /*
  매개변수로 전달된 Action객체를 분석해서 state를 변경한 후 반환한다.
  반환 즉시 컴포넌트에 반영되어 리렌더링된다.
  */
  if(action.mode === 'up'){ 
    return prevCount + action.number; 
  }
  else if(action.mode === 'down'){
    return prevCount - action.number; 
  }
  else if(action.mode === 'reset'){
    return 0;
  }
  /*
  //action.mode는 dispatch로 넘겨준 값이랑 'up, down, 0'들이 같은지 확인
  // dispatch-> action 대입, input태그 안에있는 value값이 number 대입 (현재의 number 값)
  */ 
}

function App() {
  /*
  useReducer 훅 사용
  형식]
    [State변수명, Dispatch함수] = useReducer(Reducer함수명, 초깃값);
    디스패치 함수 호출을 통해 리듀서 함수를 실행한다..
    변수 count의 초깃값은 0으로 설정한다.
  */
 /* countDispatch({mode: 'up', number: 3})가 호출되면
 ex. countReducer(count, { mode: 'up', number: 3 }) */
  const [count, countDispatch] = useReducer(countReducer, 0); //useReducer(첫번째 인자는 dispatch로 실행시킬 함수, 초깃값)
  /**
  count의 초기값은 0이고 useReducer 카운터 변수를 관리하기위한 훅 ->countReducer 함수로 관리 -> 
  실현시킬려면 countDispatch를 실행
   */


  // 입력상자의 증가치 변경을 위한 state와 함수 정의
  const [number, setNumber] = useState(1); // useState(1)에 의해 초기값은 1이되고 값을 변경하는 함수로 setNumber로 값을 변경할수있다.
  // 입력상자의 onChange이벤트 리스너에서 호출
  const changeNumber = (event) => {
    setNumber(Number(event.target.value));
    /* 
    (방금일어난event)event.(Number(이벤트가일어난곳{태그})target.(number)value ->input 태그로 
     불러온 숫자로 바꾼다)태그로 문자열이 나왔으므로 Number로 숫자변환한다.) 
    */
  }

  /*
  각 버튼을 누르면 디스패치를 통해 리듀서 함수를 호출한다.
  인수로 전달되는 객체를 Action이라고하고, 이를 분석해서 증가,
  감소, 리셋 3가지로 state를 변경한다.
  */
  const down = () => {
    countDispatch({ mode:'down', number:number});
  }
  const up = () => {
    countDispatch({ mode:'up', number:number});
  }
  const reset = () => {
    countDispatch({ mode:'reset', number:number});
  }
  return (<>
    <div className="App">
      <h2>useReducer 훅 사용하기</h2>
      <div>
        <input type="button" value="-" onClick={down}/>
        <input type="button" value="0" onClick={reset}/>
        <input type="button" value="+" onClick={up}/>
        {/* 숫자 입력창이고, 그 안에표시되는 값은 number라는 상태값에 따라
        바뀌고, 사용자가 값을 바꾸면 changeNumber 함수가 실행돼서 그 숫자를
        상태에 저장한다. */}
        <input type="number" value={number} onChange={changeNumber}/>
        {/* 이벤트 (리스너 <-(이벤트를 기다리는)) onChange ...etc */}
        <span>{count}</span>
      </div>
    </div>
  </>);
}

/*

*/ 
export default App;
