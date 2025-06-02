import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import TopNavi from './components/members/TopNavi';
import Regist from './components/members/Regist';
import Login from './components/members/Login';
import ProfileEdit from './components/members/ProfileEdit';
import BoardList from './components/board/BoardList';
import BoardDetail from './components/board/BoardDetail';
import BoardWrite from './components/board/BoardWrite';
import BoardEdit from './components/board/BoardEdit';
import MyPage from './components/members/MyPage';

function App() {

  return (<>
  <div className='top-wrapper'>
  <TopNavi />
  </div>
  <div className='content-wrapper'>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regist" element={<Regist />} />
      <Route path='/login' element={<Login />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/profileEdit' element={<ProfileEdit />} />
      <Route path='/board'>
        <Route index element={<BoardList />} />
        <Route path=':id' element={<BoardDetail />} />
      </Route>
      <Route path='/board/write' element={<BoardWrite />} />
      <Route path='/board/edit/:id' element={<BoardEdit />} />
      <Route path='' />

      {/* QnA게시판 */}
      {/* QnaList QnaView QnaWrtie */}
    </Routes>
  </div>
  </>)
}

export default App;