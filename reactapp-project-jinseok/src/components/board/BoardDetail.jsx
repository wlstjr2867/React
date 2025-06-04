import { useNavigate, useParams } from "react-router-dom";
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDoc, doc, deleteDoc, getDocs} from 'firebase/firestore';
import { useEffect, useState } from "react";
import './board.css';

function BoardDetail() {
  const { id } = useParams(); //URL에서 게시글의 ID값을 가져옴
  const navigate = useNavigate();
  const postId = parseInt(id);
  const [post, setPost] = useState(null); //게시글 데이터를 저장할 상태 (처음:null값)

  useEffect(()=>{
    //비동기 함수로 데이터 가져오기
    const getPost = async () => {
      const docRef = doc(firestore, "posts", id); //firestore에서 posts컬렉션의 해당 id 문서 참조
      const docSnap = await getDoc(docRef); //문서 가져오기

      //문서가 존재하면 상태에 저장
      if(docSnap.exists()){
        setPost(docSnap.data());
      }
      else{
        //존재하지않으면 경고 후 목록 페이지 이동
        alert("존재하지 않는 게시글입니다.")
        navigate('/board');
      }
    }
    getPost(); //함수 실행
  }, [id, navigate]) //id나navigate가 바뀔때마다 실행
  
  const deleted = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?")
    if (!confirmDelete) return; //취소하면 아무  작업도 하지않음

    await deleteDoc(doc(firestore, 'posts', id));// 해당 문서 삭제
        alert("삭제되었습니다.");
        navigate('/board');
  };

   // 게시글 데이터가 아직 로딩되지 않았거나 존재하지 않으면 이 메시지 표시
  if (!post) {
    return <div>존재하지 않는 게시글입니다.</div>
  }

  const created = new Date(post.createdAt);// firstore에서 가져온 날짜 데이터를 datd 객체로 변환
  const now = new Date(); //현재 날짜 가져오기
  const isToday = created.toDateString() === now.toDateString();//날짜가 오늘인지 확인

  //오늘 작성된 글이면 시간(시:분)만 표시(true), 그렇지 않으면 날짜(yyyy-mm-dd) 표시(false)
  const timeOrDate = isToday //const timeOrDate = isToday ? A : B  (ture:false)-> 삼항 연산자 구조
    ? `${String(created.getHours()).padStart(2, '0')}:${String(created.getMinutes()).padStart(2, '0')}`
    : `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;

  return (<>
    <div className="detail-container">
      <h2 className="detail-title">제목 :{post.title}</h2>
      <div className="detail-meta">
        <span className="detail-author">작성자: {post.author}</span>
        <span className="detail-date">시간 :{timeOrDate}</span>
      </div>
      
      <div className="detail-content">
        내용: {post.content}
      </div>
      
      <div className="detail-buttons">
      <button onClick={() => navigate(-1)}>←뒤로가기</button>
      <button onClick={deleted}>삭제</button>
      <button onClick={() => navigate('/board/edit/' + id)}>수정</button>
      </div>
    </div>
  </>);
}

export default BoardDetail;