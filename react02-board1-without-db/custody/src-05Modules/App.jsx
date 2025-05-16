import { useState } from "react";

//모듈화 한 컴포넌트 임포트
import NavView from "./components/navigation/NavView";
import NavWrite from "./components/navigation/NavWrite";
import NavList from "./components/navigation/NavList";
import ArticleList from "./components/article/ArticleList";
import ArticleView from "./components/article/ArticleView";
import ArticleWrite from "./components/article/ArticleWrite";

function ReadyComp() {
  return (<>
    <h3>컴포넌트 준비중입니다^^*</h3>
    <a href="/">Home바로가기</a>
  </>); 
}

/**
매개변수 props를 통해 전달된 값(타이틀)을 출력
헤더 컴포넌트는 모든 페이지에서 공통으로 사용된다
 */
function Header(props) {
  console.log('props', props.title);
  return (<>
    <header>
      <h2>{props.title}</h2>
    </header>
  </>); 
}

  function App() {
    const boardData = [
      {no:1, title:'오늘은 React공부하는날', writer:'낙자쌤', date:'2023-01-01',
        contents:'React를 뽀개봅시당'},
      {no:2, title:'어제는 Javascript공부해씸', writer:'유겸이', date:'2023-03-03',
        contents:'Javascript는 할게 너무 많아요'},
      {no:3, title:'내일은 Project해야징', writer:'개똥이', date:'2023-05-05',
        contents:'Project는 뭘 만들어볼까?'}
    ];
    
    const [mode, setMode] = useState('list');
    
    //컴포넌트와 타이틀을 저장할 변수 생성
    let articleComp, navComp, titleVar;

    //mode의 값에 따라 각 화면을 전환하기 위해 분기한다.
    if(mode==='list'){
      titleVar = '게시판-목록(props)';
      navComp = <NavList onChangeMode={()=>{
        setMode('write');
      }}></NavList>
      articleComp = <ArticleList boardData={boardData}
        onChangeMode={(no)=>{
          console.log('선택한 게시물 번호:', no);
          setMode('view');
        }
      }></ArticleList>
    }
    else if(mode==='view'){
      titleVar = '게시판-읽기(props)';
      navComp = <NavView onChangeMode={(pmode)=>{
        setMode(pmode);
      }}></NavView>
      articleComp = <ArticleView></ArticleView>
    }
    else if(mode==='write'){
      titleVar = '게시판-쓰기(props)';
      navComp = <NavWrite onChangeMode={()=>{
        setMode('list');
      }}></NavWrite>
      articleComp = <ArticleWrite></ArticleWrite>
    }
    else{
      //mode의 값이 없는 경우 '준비중'을 화면에 표시한다.
      navComp = <ReadyComp></ReadyComp>;
      articleComp = '';
    }

  return(
    <div className="App">
      <Header title={titleVar}></Header>
      {/* mode의 변화에 따라 다른 컴포넌트를 렌더링한다. */}
      {navComp}
      {articleComp}
    </div>
  );
}
export default App