import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function List(props){
  //API 데이터는 배열이므로 초깃값은 빈배열로 설정
  let [boardDate, setBoardData] = useState([]);

  useEffect(function(){
    //게시판 목록 요청
    fetch("http://nakja.co.kr/APIs/php7/boardListJSON.php?tname=nboard_news&apikey=e139a2ed6236d15a1440e5a26d7e4cd9")
      .then((result)=>{
        return result.json();
      })
      .then((json)=>{
        console.log(json);
        //인출한 JSON데이터로 state 변경
        setBoardData(json);
      });
    return ()=>{
      console.log('useEffect실행===>컴포넌트 언마운트');
    }
  }, []);

  let lists = [];
  //데이터의 갯수만큼 반복해서 tr태그 생성
  for(let row of boardDate){
    //작성일과 제목은 적당한 길이로 잘라서 출력한다.
    // console.log(row);
    let date = row.regdate.substring(0,10);
    let subject = row.subject.substring(0,20);
    lists.push(
      //tr태그에는 중복되지 않는 key prop 추가
      <tr key={row.idx}>
        <td className="cen">{row.idx}</td>
        {/* 열람에서는 중첩된 라우팅을 통해 게시물의 일련번호를 추출 */}
        <td><Link to={"/view/"+row.idx}>{subject}</Link></td>
        <td className="cen">{row.name}</td>
        <td className="cen">{date}</td>
      </tr>
    )
  }

  return(<>
    <header>
      <h2> 게시판-목록 </h2>
   </header>
   <nav>
      <Link to="/write">글쓰기</Link>
   </nav>
   <article>
      <table id="boardTable">
        <thead>
          <tr>
            <th>No</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        {/* 앞에서 만든 tr태그를 여기서 출력 */}
        <tbody>
          {lists}
        </tbody>
      </table>
   </article>
  </>)
}

export default List