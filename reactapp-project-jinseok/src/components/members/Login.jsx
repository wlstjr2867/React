import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from '../../Config/firestoreConfig';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  //현재 로그인 상태인지 여부를 저장하는 state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [memberId, setMemberId] = useState([]);

  const navigate = useNavigate();

  const getCollection = async () => {
    let trArray = [];
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      let memberInfo = doc.data();
      trArray.push({ id: doc.id, password: memberInfo.password });
    });
    setMemberId(trArray);
  }

  useEffect(() => {
    const savedId = localStorage.getItem('userId');//브라우저에 저장된 userId가 있으면
    if (savedId) {
      setIsLoggedIn(true); // 로그인 상태로 전환
    }
    getCollection(); // 정보 불러오기
  }, [])

  //로그인 버튼을 눌렀을 때 실행되는 함수
  const loginForm = (e) => {
    e.preventDefault();
    console.log(memberId);
    for (let i = 0; i < memberId.length; i++) {
      //firestore에서 가져온 회원 배열을 반복
      if (userId === memberId[i].id && password === memberId[i].password) {
        //입력한 id와 비밀번호가 회원 정보와 일치하는 경우
        localStorage.setItem('userId', userId)
        //브라우저에 로그인한 사용자 id 저장
        setIsLoggedIn(true);
        //로그인 상태로 전환
        alert('로그인 성공');
        navigate('/');
        window.location.reload();
        //새로고침하여 상태 적용
        return;
      }
    }
    alert('아이디 비밀번호가 틀렸습니다.');
  };

  const logout = () => {
    localStorage.removeItem('userId');
    //브라우저에 저장된 로그인 정보 삭제
    setIsLoggedIn(false);
    //로그인 상태 해제
    setUserId('');
    setPassword('');
  }

  

  return (
    <>
    {/* 로그인 상태일 경우 */}
      {isLoggedIn ? (
        <div>
          <h2>{localStorage.getItem('userId')}님, 환영합니다!</h2>
          <button onClick={()=>logout()}>로그아웃</button>
        </div>
        // 로그인 안 된 상태일 경우
      ) : (
        <div className="login-wrapper">
        <form onSubmit={loginForm} className="login-form">
          <h2>로그인</h2>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="아이디"
            required
          />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            required
          />
          <button type="submit">로그인</button>
        </form>
      </div>
      )}
    </>
  );
}

export default Login;