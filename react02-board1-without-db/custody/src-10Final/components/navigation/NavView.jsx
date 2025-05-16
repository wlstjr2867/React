function NavView(props) {
  return (
    <nav>
      <a href="#" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('list');
      }}>목록</a>{" "}
      <a href="#" onClick={function(event){
        event.preventDefault();
        props.onChangeMode('edit');
      }}>수정</a>{" "}
      <a href="/" onClick={function(event){
        event.preventDefault();
        /**
        HTML에서는 window객체를 생략하지만, JSX에서는 추가하는것이 좋다
         */
        if(window.confirm('삭제할까요?')){
          //state로 정의된 mode를 delete로 변경한다.
          props.onChangeMode('delete');
        }
      }}>삭제</a>
    </nav>
  ); 
}
  export default NavView; 