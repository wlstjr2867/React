function Pagination({ totalPosts, postsPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);

  return (<>
    <div>
      {[...Array(totalPages)].map((_, index) => {
        const pageNum = index + 1;
        const isActive = pageNum === currentPage;

        return (
          <button
            key={pageNum}
            onClick={() => setCurrentPage(pageNum)}
            style={{
              margin: '0 5px',
              padding: '8px 12px',
              backgroundColor: isActive ? 'blue' : 'lightgray',
              color: isActive ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >{pageNum}</button>
        )
      })}
    </div>
  </>);
}

export default Pagination; 