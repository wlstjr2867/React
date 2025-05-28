import { NavLink } from "react-router-dom";

function TopNavi() {
  return (<>
    <nav>
      <NavLink to="/">Home</NavLink>&nbsp;&nbsp;
      <NavLink to="/regist">회원가입</NavLink>&nbsp;&nbsp;
    </nav>
  </>); 
}
export default TopNavi; 