// 스테이트 사용을 위한 훅 임포트
import { useState } from "react";

// 모듈화 한 컴포넌트 임포트
import NavList from "./components/navigation/NavList";
import NavView from "./components/navigation/NavView";
import NavWrite from "./components/navigation/NavWrite";
import NavEdit from "./components/navigation/NavEdit";
import ArticleList from "./components/article/ArticleList";
import ArticleView from "./components/article/ArticleView";
import ArticleWrite from "./components/article/ArticleWrite";
import ArticleEdit from "./components/article/ArticleEdit";

// 페이지가 없을때 임시로 사용하기 위한 컴포넌트
function ReadyComp () {
 return(<>
   <h3>컴포넌트 준비중입니다.</h3>
   <a href="/">Home바로가기</a>
 </>); 
};
// 매개변수 props를 통해 전달된 값(타이틀)을 출력
// 헤더 컴포넌트는 모든 페이지에서 공통으로 사용된다.
function Header(props) {
  console.log('props', props.title);
  return (<>
    <header>
      <h2>{props.title}</h2>
    </header>
  </>); 
};

function App() {
  const [boardData, setBoardData] = useState([
    {no:1,title:'오늘은 React공부하는날', writer:'낙짜쌤', date:'2023-01-01',
      contents:'React를 뽀개봅시다'},
    {no:2,title:'어제는 Javascript공부함', writer:'유겸이', date:'2023-03-03',
      contents:'Javascript는 할게 너무 많아요'},
    {no:3,title:'내일은 Project해야지', writer:'길동이', date:'2023-05-05',
      contents:'Project는 뭘 만들어볼까?'}
  ]);

  const [mode, setMode] = useState('list');

  const [no, setNo] = useState(null);

  const [nextNo, setNextNo] = useState(4);

  let articleComp, navComp, titleVar, selectRow;

  if(mode==='list'){
    titleVar = '게시판-목록(props)';
    navComp = <NavList onChangeMode={()=>{
      setMode('write');
    }}></NavList>
    articleComp = <ArticleList boardData={boardData} onChangeMode={(no)=>{
      console.log('선택한 게시물 번호:'+no);
      setMode('view');
      setNo(no);
    }}></ArticleList>
  }
  else if(mode==='view'){
    titleVar = '게시판-읽기(props)';
    navComp = <NavView onChangeMode={(pmode)=>{
      setMode(pmode);
    }}></NavView>
    console.log('현재no:',no,typeof(no));
    // selectRow = boardData.reduce((pV, cV)=>{
    //   return (pV.no===cV.no) ? cV : pV;
    // }, no)
    for(let i=0 ; i<boardData.length; i++){
      if(no===boardData[i].no){
      selectRow = boardData[i];
      }
    }

    articleComp = <ArticleView selectRow={selectRow}></ArticleView>
  }
  else if(mode==='write'){
    titleVar = '게시판-쓰기(props)';
    navComp = <NavWrite onChangeMode={()=>{
      setMode('list');
    }}></NavWrite>

    articleComp = <ArticleWrite writeAction={(t,w,c)=>{
      console.log('App.js',t,w,c);

      if(t!=='' && w!=='' && c!==''){
        let dateObj = new Date();
        var year = dateObj.getFullYear();
        var month = ('0' + (1 + dateObj.getMonth())).slice(-2);
        var day = ('0' + dateObj.getDate()).slice(-2);
        let nowDate = year + '-' + month + '-' + day;
  
        let addBoardData = {no:nextNo, title:t,writer:w,contents:c,date:nowDate};
  
        let copyBoardData = [...boardData];
        copyBoardData.push(addBoardData);
        setBoardData(copyBoardData);
  
        setNextNo(nextNo+1);
        setMode('list');
      }
      else{
        alert('내용을 모두 작성해주세요');
      }
    }}></ArticleWrite>
  }

  else if(mode==='delete'){
    // 방법1
    // 새로운 빈 배열 생성
    let newBoardData = [];
    // 데어터의 개수만큼 반복
    for(let i=0; i<boardData.length; i++){
      // 삭제하려는 게시물이 아닌 것만 새로운 배열에 추가한다.
      if(no !== boardData[i].no){
        // 새로운 배열에는 삭제하려는 게시물이 추가되지 않는다.
        newBoardData.push(boardData[i]);
      }
    }
    // 새로운 배열을 통해 스테이트를 변경하면 리렌더링이 된다.
    setBoardData(newBoardData);

    // 방법2(비추천)
    // for(let i=0; i<boardData.length; i++){
    //   if(no !== boardData[i].no){
    //     boardData.splice(i, 1);
    //   }
    // }
    // setBoardData(newBoardData);

    // 삭제가 완료되면 리스트로 전환한다.
    setMode('list');
  }

  else if(mode==='edit'){
    titleVar = '게시판-수정(props)';

    navComp = <NavEdit onChangeMode={()=>{
      // 목록으로 전환하는 기능
      setMode('list');
    }}
    onBack={()=>{
      // 열람으로 전환하는 기능
      setMode('view');
      setNo(no);
    }}></NavEdit>

    // 데이터의 갯수만큼 반복해서 수정할 게시물 선택
    for(let i=0; i<boardData.length; i++){
      if(no===boardData[i].no){
        selectRow = boardData[i];
      }
    }
    // 수정할 게시물을 자식 컴포넌트로 전달
    articleComp = <ArticleEdit selectRow={selectRow}
      editAction={(t,w,c)=>{
        /**
         수정을 위한 객체를 생성. 단, 일련번호와 작성일은 기존의 값을 그대로 사용한다.
         */
        let editBoardData = {no:no, title:t,writer:w,contents:c,date:selectRow.date};
        console.log('수정내용', editBoardData);

        // 스프레드 연산자로 기존 배열데이터의 복사본을 생성한다.
        let copyBoardData = [...boardData];
        for(let i=0; i<copyBoardData.length; i++){
          // 수정할 객체를 찾는다.
          if(copyBoardData[i].no===no){
            // 수정된 내용의 객체로 변경한다.
            copyBoardData[i] = editBoardData;
            // 반복문 탈출
            break;
          }
        }
        // 복사본을 통해 스테이트를 변경한다.
        setBoardData(copyBoardData);
        // 수정된 내용 확인을 위해 '열람' 화면으로 전환한다.
        setMode('view');
      }}></ArticleEdit>
  }

  else{
    // mode의 값이 없는 경우 '준비중'을 화면에 표시한다.
    navComp = <ReadyComp></ReadyComp>
    articleComp = '';
  }

  return (<>
     <Header title={titleVar}></Header>
     {/* mode의 변화에 따라 다른 컴포넌트를 렌더링한다. */}
     {navComp}
     {articleComp}
  </>)
}
export default App