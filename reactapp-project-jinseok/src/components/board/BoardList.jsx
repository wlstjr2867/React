function BoardList() {
  const dummyPosts = [
    {
      id:1, title: '첫번째 글입니다.', author: 'user01', createdAt: '2025-05-28T14:30:00',
    },
    {
      id:2, title: '두번째 글입니다.', author: 'user02', createdAt: '2025-05-29T09:12:00',
    },
    {
      id:3, title: '오늘 작성한 글', author: 'user03', createdAt: new Date().toISOString(),
    },
  ];
  
  return (<>
  <div>
    <h2>자유게시판</h2>

    <button style={{marginBottom: '10px'}}>[글쓰기] 버튼</button>

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
        {dummyPosts.map((post, index)=>(
          <tr key={post.id}>
            <td>{post.id}</td>
            <td>{post.title}</td>
            <td>{post.author}</td>
            <td>{post.createAt}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <div>[페이지 번호들]</div>
  </div>
  </>); 
}
export default BoardList; 