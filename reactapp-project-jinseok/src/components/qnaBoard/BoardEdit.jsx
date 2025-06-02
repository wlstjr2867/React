import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

function BoardEdit() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestore, 'posts', id);
      const docSnap = await getDoc(docRef)
      
      if (docSnap.exists()) {
        const post = docSnap.data();
        setTitle(post.title);
        setAuthor(post.author || "");
        setContent(post.content)
      }
      else {
        alert("게시글을 찾을 수 없습니다.");
        navigate("/board");
      }
    };
    fetchPost();
  }, [id, navigate]);

  const submit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(firestore, 'posts', id);
      await updateDoc(docRef, {title, author, content})

      alert("수정이 완료되었습니다.")
      navigate('/board');
    }
    catch(error) {
      alert('수정 중 문제가 발생했습니다.');
    }
  };

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