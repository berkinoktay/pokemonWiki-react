import { useState, useEffect } from 'react';
function Pagination({
  postPerPage,
  totalPosts,
  paginate,
  currentPage,
  setCurrentPage,
}) {
  useEffect(() => {
    setMinPageNumberLimit(0);
    setMaxPageNumberLimit(5);
  }, [totalPosts]);

  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const pageNumbers = [1];

  for (let i = 2; i <= Math.ceil(totalPosts / postPerPage); i++) {
    pageNumbers.push(i);
  }

  const returnNumberData = pageNumbers.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      console.log('number', number);
      return (
        <li
          key={number}
          onClick={() => paginate(number)}
          className={`numbers ${currentPage === number ? 'active' : ''}`}
        >
          {number}
        </li>
      );
    }
  });

  return (
    <nav>
      <ul className="pagination">
        <li>
          <button
            className={`btn ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => {
              setCurrentPage((prev) => (prev === 1 ? prev : prev - 1));
              if (currentPage - 1 === minPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
              }
            }}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>
        {returnNumberData}
        <li>
          <button
            className={`btn ${
              currentPage === pageNumbers.length ? 'disabled' : ''
            }`}
            onClick={() => {
              setCurrentPage((prev) =>
                prev === pageNumbers.length ? prev : prev + 1
              );
              if (currentPage + 1 > maxPageNumberLimit) {
                setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
                setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
              }
            }}
            disabled={currentPage === pageNumbers.length}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
