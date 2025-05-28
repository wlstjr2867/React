import { Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import TopNavi from './components/members/TopNavi';
import Regist from './components/members/regist';

function App() {

  return (<>
  <TopNavi />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/regist" element={<Regist />} />
      {/* 자유게시판 */}
      {/* FreeList FreeView FreeWrtie */}
      {/* QnA게시판 */}
      {/* QnaList QnaView QnaWrtie */}
    </Routes>
  </>)
}

export default App