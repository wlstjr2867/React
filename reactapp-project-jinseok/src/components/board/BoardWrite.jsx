import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { firestore } from '../../Config/firestoreConfig';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import './board.css';

//현재 날짜와 시간을 원하는 형식으로 반환하는 함수
function nowDate() {
  const now = new Date(); // 현재 날짜와 시간 객체 생성
  //숫자를 두자리로 맟추는 함수
  const pad = (num) => String(num).padStart(2, '0');
  //날짜 구성 요소 추출
  const year = now.getFullYear();
  const month = pad(now.getMonth() + 1); // 0-based
  const day = pad(now.getDate());
  //시간 구성 요소 추출
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());
  const seconds = pad(now.getSeconds());

  //최종 문자열 형태로 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

function BoardWrite() {
  const navigate = useNavigate();
  //입력 폼의 상태를 저장하는 훅
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try{ //posts 컬렉션에 새 문서 추가
      await addDoc(collection(firestore, "posts"),{
      title, content, author, createdAt: nowDate(), // 작성시간
    });
    navigate("/board");
    }
    catch(error){
      console.error("게시글 저장 중 오류:", error);
      alert("게시글 저장에 실패했습니다.")
    }
  }
  
  return (<>
    <div className="write-container">
      <h2>자유게시판-글쓰기</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="제목:">제목</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="내용:">내용</label>
          <textarea rows="5" cols='40' value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <div>
          <label htmlFor="작성자">작성자</label>
          <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        </div>
        <button type="submit">등록</button>
        <button type="button" onClick={() => navigate("/board")}>취소</button>
      </form>
    </div>
  </>);
}
export default BoardWrite; 