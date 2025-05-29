import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from '../../Config/firestoreConfig';
import { useNavigate } from "react-router-dom";

function Login() {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
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
    const savedId = localStorage.getItem('userId');
    if (savedId) {
      setIsLoggedIn(true);
    }
    getCollection();
  }, [])


  const loginForm = (e) => {
    e.preventDefault();
    console.log(memberId);
    for (let i = 0; i < memberId.length; i++) {
      if (userId === memberId[i].id && password === memberId[i].password) {
        localStorage.setItem('userId', userId)
        setIsLoggedIn(true);
        alert('로그인 성공');
        navigate('/');
        return;
      }
    }
    alert('아이디 비밀번호가 틀렸습니다.');
  };

  const logout = () => {
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setUserId('');
    setPassword('');
  }

  

  return (
    <>
      {isLoggedIn ? (
        <div>
          <h2>{localStorage.getItem('userId')}님, 환영합니다!</h2>
          <button onClick={logout}>로그아웃</button>
        </div>
      ) : (
        <form onSubmit={loginForm}>
          <h2>로그인</h2>
          <label htmlFor="userId">아이디</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">로그인</button>
        </form>
      )}
    </>
  );
}

export default Login;