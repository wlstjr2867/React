function NavEdit(props) {
  return(<>
    <nav>
      {/* 수정은 '열람'에서 진입하므로 '뒤로'는 '열람'으로 전환한다. */}
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onBack();
      }}>뒤로</a>
      {" "}
      <a href="/" onClick={function(event){
        event.preventDefault();
        props.onChangeMode();
      }}>목록</a>
    </nav>
  </>);
};
export default NavEdit;