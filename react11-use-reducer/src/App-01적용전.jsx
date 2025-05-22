import { useState } from "react"

function App() {
  //state생성
  const [count, setCount] = useState(0); 
  /*
  setCount : 기억된 값을 변경할 때 사용하는 함수
  useState(0): count의 초기값이 '0'
  */ 

  //감소, 증가, 리셋을 위한 함수 생성
  const down = () => {
    setCount(count - 1);
  }
  
  const up = () => {
    setCount(count + 1);
  }


  const reset = () => {
    setCount(0);
  }

  return (
    <div className="App">
      <h2> useReducer 훅 사용하기</h2>
      <div>
        <input type="button" value="-" onClick={down}/>
        <input type="button" value="0" onClick={reset}/>
        <input type="button" value="+" onClick={up}/>
        <span>{count}</span>
      </div>
    </div>
  )
}

/*
useState(0)을 사용해 count를 상태값으로 만들고, 이 상태를 변경하는 함수 setCount를
사용함. -, 0, + 버튼을 클릭하면 각각 count를 감소 초기화 증가 하도록 하고, 이 값을
span을 통해 화면에 보여준다.
*/ 
export default App
