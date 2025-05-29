import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import TopNavi from './components/members/TopNavi';
import Regist from './components/members/regist';
import Login from './components/members/Login';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail';
import BoardWrite from './components/board/BoardWrite';

function App() {

  return (<>
  <TopNavi />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regist" element={<Regist />} />
      <Route path='/login' element={<Login />} />
      <Route path='/board' element={<BoardList />} />
      <Route path='/board/:id' element={<BoardDetail />} />
      <Route path='/board/write' element={<BoardWrite />} />
      <Route path='/board/edit/:id' element={<BoardWrite />} />

      {/* QnA게시판 */}
      {/* QnaList QnaView QnaWrtie */}
    </Routes>
  </>)
}

export default App 