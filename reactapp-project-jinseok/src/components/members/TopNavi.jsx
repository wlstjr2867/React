import { NavLink } from "react-router-dom";

function TopNavi() {
  return (<>
    <nav>
      <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
      <NavLink to="/regist">회원가입</NavLink>&nbsp;&nbsp;
      <NavLink to="/login">Login</NavLink>&nbsp;&nbsp;
      <NavLink to="/board">게시판</NavLink>
    </nav>
  </>); 
}
export default TopNavi; 