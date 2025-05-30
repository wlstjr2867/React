import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import dummyPosts from './dummyPosts';
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDocs, doc, setDoc } from 'firebase/firestore';

function BoardEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const post = dummyPosts.find((p) => p.id === parseInt(id));

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setAuthor(post.author)
      setContent(post.content)
    }
  }, [post]);

  const submit = (e) => {
    e.preventDefault();
    if (ind)
      console.log('수정된 글', { id, title, author, content });
    alert("수정이 완료되었습니다.")
    navigate('/board');
  }

  const getCollection = async () => {
    let trArray = [];
    const querySnapshot = await getDocs(collection(firestore, "members"));
    querySnapshot.forEach((doc) => {
      let memberInfo = doc.data();
      trArray.push(doc.id);
    });
    setMemberId(trArray);
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
      <h2>게시글 수정</h2>
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
        <button type="submit">수정완료</button>
        <button type="button" onClick={() => navigate("/board")}>취소</button>
      </form>
    </div>
  </>);
}
export default BoardEdit; 