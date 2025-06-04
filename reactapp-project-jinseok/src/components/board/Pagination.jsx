function Pagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  // 전체 페이지 수를 계산. math.ceil은 소수점이 있으면 올림 처리

  return (<>
    <div>
      {/* totalpage수만큼 버튼을 만들기 위해 빈배열 생성 */}
      {[...Array(totalPages)].map((_, index) => {
        // 실제 페이지 번호 (index는 0부터 시작이므로 +1)
        const pageNum = index + 1;
        const isActive = pageNum === currentPage;
        //현재 페이지와 비교하여 활성화된 상태인지 확인

        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)} //클릭하면 현재페이지를 이 번호로 바꾼다.
            style={{
              margin: '0 5px',
              padding: '8px 12px',
              backgroundColor: isActive ? 'blue' : 'lightgray',
              color: isActive ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >{pageNum}</button> //버튼에 표시될 페이지 번호
        )
      })}
    </div>
  </>);
}

export default Pagination; 