import { useCallback } from "react";
import { useState, useEffect } from "react";

//Box 컴포넌트 정의. 프롭스로 받은 스타일을 div에 적용한다.
const Box = ({createBoxStyle}) => {
  //state생성
  const [style, setStyle] = useState({});

  //props로 받은 createBoxStyle 함수가 변경될때마다 호출되도록 정의
  useEffect(()=>{
    console.log('박스 키우기');
    //함수의 반환값으로 state 변경
    setStyle(createBoxStyle());
  }, [createBoxStyle]);

  //div 박스를 렌더링한다.
  return <div style={style}></div>
}

function App() {
  //박스와 배경색 설정을 위한 state
  const [size, setSize] = useState(100);
  const [isDark, setIsDark] = useState(false);

  //스타일 반환을 위한 함수 선언
  /*
  Step1 : App 컴포넌트가 렌더링될때마다 새로운 참조값이 부여된다.
    따라서 테마변경을 눌러도 이와 상관없는 '박스키우기'가 출력된다.
  */
  // const createBoxStyle = () => {
  //   return {
  //     backgroundColor : 'pink',
  //     width : `${size}px`,
  //     height : `${size}px`,
  //   };
  // }

  /*
  
  */
  const createBoxStyle = useCallback(()=>{
    return {
      backgroundColor : 'pink',
      width : `${size}px`,
      height : `${size}px`,
    };
  }, [size]);

  return(
    //dive박스의 배경색이 isDdark에 따라 black/white로 변경된다.
    <div className="App" style={{
      background : isDark ? 'black' : 'white',
    }}>
      <h2>useCallback()</h2>
      {/* 스핀버튼으로 증감시킨 값이 size를 변경하고, 새롭게 렌더링한다. */}
      <input type='number' value={size} step={5}
        onChange={(e)=>setSize(e.target.value)}
      />
      {/* 버튼을 누를때마다 배경식이 변경된다. */}
      <button onClick={()=>setIsDark(!isDark)}>테마변경</button>
      {/* Style을 반환하는 함수를 props로 전달한다. */}
      <Box createBoxStyle={createBoxStyle} />
    </div>
  )
}
export default App; 