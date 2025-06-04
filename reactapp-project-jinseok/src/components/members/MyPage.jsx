import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../Config/firestoreConfig";
import { useNavigate } from "react-router-dom";

function MyPage() {
  //사용자 정보를 저장할 상태값 선언 처음에는 null 상태
  const [userInfo, setUserInfo] = useState(null);
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchUserInfo = async () => {
      const snapshot = await getDocs(collection(firestore, "members"));
      //members라는 컬렉션의 모든 문서로 가져옴
      const users = snapshot.docs.map(doc => doc.data());
      //실제 데이터만 추출해서 users 배열에 저장
      const foundUser = users.find(user => user.userId === userId);
      //현재 로그인한 사용자의 userid와 일치하는 유저 찾기
      setUserInfo(foundUser);
      //찾은 사용자 정보를 상태에 저장 => 자동으로 업데이트
    }
    //함수실행
    fetchUserInfo();
    //userid가 변경될때 마다 다시 실행
  }, [userId]);

  //로그아웃 처리 함수
  const logout = () => {
     if(!confirm("로그아웃하시겠습니까?")) return; //취소를 누르면 함수 종료

    localStorage.removeItem('userId');
    //localstorage에 저장된 userid를 제거하여 로그인 정보 삭제
    navigate('/')
    window.location.reload();
  };

  //사용자 정보를 아직 못가져오는경우
  if(!userInfo) return <p>불러오는중...</p>

  return (<>
  <div>
    <h2>{userInfo.name}님의 정보</h2>
    <p>이름 : {userInfo.name}</p>
    <p>이메일 : {userInfo.email}</p>
    <p>전화번호 : {userInfo.phone}</p>

    <button onClick={() => navigate("/profileEdit")}>회원정보 수정</button>
    &nbsp;&nbsp;
    {/* 로그아웃 함수 실행 */}
    <button onClick={logout}>로그아웃</button>
  </div>
  </>); 
}
export default MyPage; 
