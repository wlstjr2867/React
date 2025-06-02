import { useNavigate, useParams } from "react-router-dom";
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDoc, doc, deleteDoc, getDocs} from 'firebase/firestore';
import { useEffect, useState } from "react";

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);
  const [post, setPost] = useState(null);

  useEffect(()=>{
    const getPost = async () => {
      const docRef = doc(firestore, "posts", id);
      const docSnap = await getDoc(docRef);

      if(docSnap.exists()){
        setPost(docSnap.data());
      }
      else{
        alert("존재하지 않는 게시글입니다.")
        navigate('/board');
      }
    }
    getPost();
  }, [id, navigate])
  
  const deleted = async () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?")
    if (!confirmDelete) return;

    await deleteDoc(doc(firestore, 'posts', id));
        alert("삭제되었습니다.");
        navigate('/board');
  };

  if (!post) {
    return <div>존재하지 않는 게시글입니다.</div>
  }

  const created = new Date(post.createdAt);
  const now = new Date();
  const isToday = created.toDateString() === now.toDateString();

  const timeOrDate = isToday
    ? `${String(created.getHours()).padStart(2, '0')}:${String(created.getMinutes()).padStart(2, '0')}`
    : `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;

  return (<>
    <div>
      <h2>{post.title}</h2>
      <div>{timeOrDate}</div>
      <p>{post.content}</p>
      <button onClick={() => navigate(-1)}>←뒤로가기</button>
      <button onClick={deleted}>삭제</button>
      <button onClick={() => navigate('/board/edit/' + id)}>수정</button>
    </div>
  </>);
}

export default BoardDetail;