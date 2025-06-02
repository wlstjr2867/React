import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../Config/firestoreConfig";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const [userInfo, setUserInfo] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUserInfo = async () => {
      const snapshot = await getDocs(collection(firestore, "members"));
      const users = snapshot.docs.map(doc => doc.data());
      const foundUser = users.find(user => user.userId === userId);
      setUserInfo(foundUser);
    }
    fetchUserInfo();
  }, [userId]);

  const logout = () => {
    localStorage.removeItem('userId');
    navigate('/')
    window.location.reload();
  };

  if(!userInfo) return <p>불러오는중...</p>

  return (<>
  <div>
    <h2>{userInfo.name}님의 정보</h2>
    <p>이름 : {userInfo.name}</p>
    <p>이메일 : {userInfo.email}</p>
    <p>전화번호 : {userInfo.phone}</p>

    <button onClick={() => navigate("/profileEdit")}>회원정보 수정</button>
    &nbsp;&nbsp;
    <button onClick={logout}>로그아웃</button>
  </div>
  </>); 
}
export default MyPage; 
