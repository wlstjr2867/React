//라우팅 관련 컴포넌트 임포트
import {BrowserRouter} from 'react-router-dom'
import {Routes, Route, Link} from 'react-router-dom';

import List from './components/board/List';
import Write from './components/board/Write';
import View from './components/board/View';
import NotFound from './components/common/NotFound';

function App() {
  return (
  /*
  라우팅 처리를 위해 App컴포넌트를 감싸야 하므로 이와같이 App.jsx에서
  처리해도 된다. 하지만 주로 main.jsx에서 처리하는게 좋다.
  */ 
  <BrowserRouter>
    <div className="App">
      <Routes>
        {/* 첫 실행시에는 목록이 렌더링 된다. */}
        <Route path='/' element={<List></List>} />
        <Route path='/list' element={<List></List>} />
        <Route path='/view' element={<View></View>} />
        <Route path='/write' element={<Write></Write>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  </BrowserRouter>
    );
}

export default App
