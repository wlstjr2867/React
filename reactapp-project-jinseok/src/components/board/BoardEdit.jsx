import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDocs, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import './board.css';

function BoardEdit() {
  const navigate = useNavigate();
  const { id } = useParams(); //URL에서 게시글 id를 받아옴

  //게시글 정보를 담을 상태값을 선언
  const [title, setTitle] = useState(""); //제목
  const [content, setContent] = useState(""); //내용
  const [author, setAuthor] = useState(""); // 작성자

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestore, 'posts', id); //posts 컬렉션에 id 문서 참조
      const docSnap = await getDoc(docRef); // 가져오기
      
      //존재하면 데이터를 상태에 저장
      if (docSnap.exists()) {
        const post = docSnap.data(); // 게시글 데이터 가져오기
        setTitle(post.title); //제목설정
        setAuthor(post.author || ""); //작성자 설정 (없으면 빈 문자열)
        setContent(post.content) //내용 설정
      }
      else {
        //없다면 경고 후 게시판 목록으로 이동
        alert("게시글을 찾을 수 없습니다.");
        navigate("/board");
      }
    };
    fetchPost();
  }, [id, navigate]); //바뀌면 useEffect 재실행

  const submit = async (e) => {
    e.preventDefault();

    try {
      const docRef = doc(firestore, 'posts', id);
      //updatedoc을 통해 수정된 데이터 저장
      await updateDoc(docRef, {title, author, content})

      alert("수정이 완료되었습니다.")
      navigate('/board');
    }
    catch(error) {
      alert('수정 중 문제가 발생했습니다.');
    }
  };

  return (<>
    <div className="write-container">
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