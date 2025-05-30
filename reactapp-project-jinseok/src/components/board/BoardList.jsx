import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import dummyPosts from './dummyPosts';
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDocs } from 'firebase/firestore';

function BoardList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  const currentPosts = dummyPosts.slice(indexOfFirst, indexOfLast);

  function formetDate(isoString) {
    const created = new Date(isoString);
    const now = new Date();

    const isToday =
      created.getFullYear() === now.getFullYear() &&
      created.getMonth() === now.getMonth() &&
      created.getDate() === now.getDate();

    if (isToday) {
      const hours = String(created.getHours()).padStart(2, '0');
      const minutes = String(created.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`;
    }
    else {
      const year = created.getFullYear();
      const month = String(created.getMonth() + 1).padStart(2, '0');
      const day = String(created.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
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
      <h2>자유게시판</h2>

      <button style={{ marginBottom: '10px' }} onClick={(e) => { navigate('/board/write') }}>[글쓰기] 버튼</button>

      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post, index) => (
            <tr key={post.id}>
              <td>{dummyPosts.length - indexOfFirst - index}</td>
              <td><Link to={`/board/${post.id}`}>{post.title}</Link></td>
              <td>{post.author}</td>
              <td>{formetDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={dummyPosts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  </>);
}
export default BoardList; 