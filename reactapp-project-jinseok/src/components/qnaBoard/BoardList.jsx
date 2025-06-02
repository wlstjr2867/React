import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { firestore } from '../../Config/firestoreConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

function BoardList() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);//현재 페이지 번호 상태 (초기값 : 1)
  const postsPerPage = 5; // 한 페이지에 보여줄 게시글 수
  const [posts, setPosts] = useState([]); //firestore에서 가져올 데이터.

  const indexOfLast = currentPage * postsPerPage;  // 현재페이지에서의 마지막 게시글 인덱스 
  const indexOfFirst = indexOfLast - postsPerPage; // 현재페이지에서의 첫 게시글 인덱스
  const currentPosts = posts.slice(indexOfFirst, indexOfLast);
  //전체 게시글에서 현재 페이지에 해당하는 글만 잘라냄(slice)

  function formetDate(isoString) {
    const created = new Date(isoString);//ISO 문자열을 Date 객체로 변환
    const now = new Date();//현재 시간

    const isToday =
      created.getFullYear() === now.getFullYear() && //연도
      created.getMonth() === now.getMonth() &&  //월
      created.getDate() === now.getDate();  //일
      //3개가 모두 같으면, 오늘 작성된 글

    if (isToday) {
      const hours = String(created.getHours()).padStart(2, '0');
      //시(hours) = padStart (2, 0) => 두자리로 맞춰주는코드
      const minutes = String(created.getMinutes()).padStart(2, '0');
      return `${hours}:${minutes}`; // 시:분
    }
    else {
      const year = created.getFullYear(); //연도
      const month = String(created.getMonth() + 1).padStart(2, '0');
      //getMonth()은 0부터 시작하기때문에 +1를 해줘야함
      const day = String(created.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
  }
  
  //Firestore에서 게시글을 가져오는 비동기 함수
  const getPosts = async () => {
    let trArray = []; //게시글을 임시로 저장할 배열
    const querySnapshot = await getDocs(query(collection(firestore, "posts"), orderBy("createdAt", "desc")));
    querySnapshot.forEach((doc) => {
      let memberInfo = doc.data();
      trArray.push({id: doc.id, ...doc.data()});
    });
    setPosts(trArray);
  }
  useEffect(() => {
    getPosts();
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
              <td>{posts.length - indexOfFirst - index}</td>
              <td><Link to={`/board/${post.id}`}>{post.title}</Link></td>
              <td>{post.author}</td>
              <td>{formetDate(post.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalPosts={posts.length}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  </>);
}
export default BoardList;