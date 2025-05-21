import React, {useState} from "react";
import { Link, useParams } from "react-router-dom";

function Edit(props) { // props로 데이터를 받아오는 edit 컴포넌트
  const boardData = props.boardData; //게시글 목록상태
  const setBoardData = props.setBoardData; //상태를 변경하는 함수
  const navigate = props.navigate; //페이지 이동을 위한 함수
  const nowDate = props.nowDate;  //현재 날짜를 반환하는 함수

  var params = useParams(); //게시글 번호를 받아옴 
  let pno= Number(params.no) //문자열을 숫자로 변환

  //게시글 배열 중 수정하려는 번호와 일치하는 객체를 찾아서 vi에 저장
  let vi = boardData.reduce((prev, curr)=>{ //reduce(누적값, 현재값)
    if(curr.no===pno){ //2개가 완전히 같을경우
      prev = curr; //prev에 curr을 저장
    }
    return prev //return 누적값;
  }, {}); // {} -> 초깃값 (처음 prev 값이 {})

  /*
  입력양식에 들어갈 초깃값 설정
  현재 값이 들어가 있어야 하기 때문에 필요
  */
  const [title, setTitle] = useState(vi.title); //제목
  const [writer, setWriter] = useState(vi.writer); //작성자
  const [contents, setContents] = useState(vi. contents); //내용

  return(<>
    <header>
      <h2>게시판-작성</h2>
    </header>

    {/* 목록으로 돌아가는 링크 */}
    <nav>
      <Link to="/list">목록</Link>
    </nav>

    {/* 게시글 수정 폼 */}
    <article>
    {/* submit 버튼을 누를때 실행되는 이벤트함수 */}
    <form onSubmit={(event)=>{
      event.preventDefault();

      let w = event.target.writer.value;
      let t = event.target.title.value;     
      let c = event.target.contents.value;

      let editBoardDate = {no:pno, writer:w, title:t,
        contents:c, date:nowDate()};
      

      let CopyBoardData = [...boardData];
      for(let i=0; i<copyBoardData.length; i++){
        if(copyBoardData[i].no===pno){
          copyBoardData[i] = editBoardDate;
          break;
        }
      }

      setBoardData(copyBoardData);
      navigate("/list");
    }
  }>
    <table id="boardTable">
      <tbody>
            <tr>
              <th>작성자</th>
              <td><input type="text" name="writer" value={writer}
                    onChange={(event)=>{
                      setWriter(event.target.value);
                    }}/></td>
            </tr>
            <tr>
              <th>제목</th>
              <td><input type="text" name="title" value={title}
                    onChange={(event)=>{
                      setTitle(event.target.value);
                     }} /></td>
            </tr>
            <tr>
              <th>내용</th>
              <td><textarea name="contents" rows="3" value={contents}
                    onChange={(event)=>{
                      setContents(event.target.value);
                    }}></textarea></td>
            </tr>
          </tbody>
    </table>
    <input type="submit" value="전송" />
    </form>
    </article>
  </>);
}

export default Edit