//라우팅 관련 컴포넌트 임포트
// import {BrowserRouter} from 'react-router-dom'
import {Routes, Route, Link} from 'react-router-dom';
//화면 이동을 위한 훅 임포트
import { useNavigate } from 'react-router-dom';
//스테이트를 사용을 위한 임포트
import { use, useState } from 'react';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

//작성일 생성을 위한 함수 정의
const nowDate = () =>{
  let dateObj = new Date();
  var year = dateObj.getFullYear()
  var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
  var day = ("0" + dateObj.getDate()).slice(-2);
  //0000-00-00 포맷의 날짜 생성ㅊㅇ
  return year + "-" + month + "-" + day;
}
function App() {
    //데이터로 사용할 객체형 배열 생성
    //작성을 위해 기존 배열을 state로 변경한다
    const [boardData, setBoardData] = useState([
      {no:1, title:'오늘은 React공부하는날', writer:'낙자쌤', date:'2023-01-01',
        contents:'React를 뽀개봅시당'},
      {no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03',
        contents:'Javascript는 할게 너무 많아요'},
      {no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05',
        contents:'Project는 뭘 만들어볼까?'}
    ]);
    //일련번호 부여를 위한 state 생성(시퀀스와 같은 용도)
    const [nextNo, setNextNo] = useState(4);
    //작성 완료 후 페이지 이동을 위한 훅 선언
    const navigate = useNavigate();

  return (
  /*
  라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서
  처리해도 된다. 하지만 주로 main.jsx에서 처리하는게 좋다.
  */ 
    <div className="App">
      <Routes>
        <Route path='/' element={<List boardData={boardData}></List>} />
        <Route path='/list' element={<List boardData={boardData}></List>} />
        <Route path='/view'>
          <Route path=':no' element={<View boardData={boardData}></View>} />
        </Route>
        {/* Write 컴포넌트로 글쓰기 처리를 위한 모든 스테이트오
        관련함수를 프롭스 시킨다. */}
        <Route path='/write' element={<Write
          boardData={boardData} setBoardData={setBoardData}
          nextNo={nextNo} setNextNo={setNextNo}
          navigate={navigate} nowDate={nowDate}
          />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
    );
}

export default App
