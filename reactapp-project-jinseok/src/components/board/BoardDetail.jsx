import { useNavigate, useParams } from "react-router-dom";
import dummyPosts from './dummyPosts';
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDocs} from 'firebase/firestore';
import { useEffect } from "react";

function BoardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const postId = parseInt(id);
  const post = dummyPosts.find(p => p.id === postId);

  if (!post) {
    return <div>존재하지 않는 게시글입니다.</div>
  }

  const created = new Date(post.createdAt);
  const now = new Date();
  const isToday = created.toDateString() === now.toDateString();

  const timeOrDate = isToday
    ? `${String(created.getHours()).padStart(2, '0')}:${String(created.getMinutes()).padStart(2, '0')}`
    : `${created.getFullYear()}-${String(created.getMonth() + 1).padStart(2, '0')}-${String(created.getDate()).padStart(2, '0')}`;

  const deleted = () => {
    const confirmDelete = window.confirm("정말 삭제하시겠습니까?")
    if (confirmDelete) {
      const index = dummyPosts.findIndex(p => p.id === postId);
      if (index !== -1) {
        dummyPosts.splice(index, 1);
        alert("삭제되었습니다.");
        navigate('/board');
      }
    }
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

  useEffect(() => {
    getCollection();
  }, []);

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