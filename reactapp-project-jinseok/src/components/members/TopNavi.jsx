import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import '../../TopNavi.css';

function TopNavi() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('userId');
    if (savedId) {
      setIsLoggedIn(true);
    }
  }, [])

  return (<>
    <nav className="top-navi">
      <div className="navi-container">
        <div className="logo">MySite</div>
        <div className="menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/regist">회원가입</NavLink>
          {isLoggedIn ? (
            <NavLink to="/mypage">내정보</NavLink>
          ) : (
            <NavLink to='/login'>로그인</NavLink>
          )}
          <NavLink to="/board">게시판</NavLink>
          <NavLink to="/qnaBoard">Q&A게시판</NavLink>
        </div>
      </div>
    </nav>
  </>);
}
export default TopNavi; 