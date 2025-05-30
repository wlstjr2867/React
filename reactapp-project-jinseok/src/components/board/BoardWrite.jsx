import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyPosts from "./dummyPosts";
import { firestore } from '../../Config/firestoreConfig';
import { doc, setDoc } from 'firebase/firestore';

function BoardWrite() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  const submit = (e) => {
    e.preventDefault();

    const newPost = {
      id: dummyPosts.length + 1,
      title, content, author, createdAt: new Date().toISOString(),
    };

    dummyPosts.unshift(newPost);
    navigate("/board");
  }

  const nowDate = () => {
    let dateObj = new Date();
    var year = dateObj.getFullYear();
    var month = ("0" + (1 + dateObj.getMonth())).slice(-2);
    var day = ("0" + dateObj.getDate()).slice(-2);
    return year + "-" + month + "-" + day;
  }

  const memberWrite = async (newMem) => {
    //doc으로 입력을 위한 컬렉션과 도큐먼트를 만든 후 JS객체로 정보 추가
    await setDoc(doc(firestore, 'members', newMem.userId), { ...newMem, date: nowDate() });
    console.log('입력성공');
  }

  useEffect(() => {
    getCollection();
  }, []);

  return (<>
    <div>
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
        <button type="submit" onClick={() => navigate("/board")}>취소</button>
      </form>
    </div>
  </>);
}
export default BoardWrite; 