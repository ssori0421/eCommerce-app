import React, { useState } from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({
  currentPage,
  productsPerPage,
  setCurrentPage,
  totalProducts,
}) => {
  const pageNumbers = [];

  const [pageNumberLimit] = useState(3);
  // 화살표를 누르지 않았을 떄 보이는 페이지 숫자
  // < 1 2 3 >
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(3);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 오른쪽 화살표 클릭시
  // ex) maxPageNumberLimit이 3일 때
  const paginateNextPage = () => {
    // 1페이지에서) setCurrentPage(1 + 1) => setCurrentPage(2)
    // 2페이지에서) setCurrentPage(2 + 1) => setCurrentPage(3)
    setCurrentPage(currentPage + 1);
    // 3페이지에서) 3 + 1 > 3 임
    // setMaxPageNumberLimit(3 + 3) => setMaxPageNumberLimit(6)
    // setMinPageNumberLimit(0 + 3) => setMinPageNumberLimit(3)
    // < 4 5 6 >
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // 왼쪽 화살표 클릭시
  // ex) maxPageNumberLimit이 3일 때
  const paginatePrevPage = () => {
    // 6페이지에서) setCurrentPage(6 - 1) => setCurrentPage(5)
    // 5페이지에서) setCurrentPage(5 - 1) => setCurrentPage(4)
    setCurrentPage(currentPage - 1);
    // 4페이지에서) (4 - 1) / 3 의 나머지가 0임
    // setMaxPageNumberLimit(6 - 3) => setMaxPageNumberLimit(3)
    // setMinPageNumberLimit(3 - 3) => setMinPageNumberLimit(0)
    // < 1 2 3 >
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  // ex) 31/5 => 7
  // pageNumbers = [1, 2, 3, 4, 5, 6, 7]
  // < 1 2 3 >, < 4 5 6 >, < 7 >
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* 왼쪽 화살표 UI */}
      {/* 첫 번째 페이지의 경우 왼쪽 화살표 숨김 */}
      <li
        onClick={paginatePrevPage}
        className={currentPage === pageNumbers[0] ? `${styles.hidden}` : ''}
      >
        {'<'}
      </li>

      {/* 페이제네이션 숫자 UI */}
      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={currentPage === number ? `${styles.active}` : ''}
            >
              {number}
            </li>
          );
        }
      })}

      {/* 오른쪽 화살표 UI */}
      {/* 마지막 페이지의 경우 오른쪽 화살표 숨김 */}
      <li
        onClick={paginateNextPage}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `${styles.hidden}`
            : ''
        }
      >
        {'>'}
      </li>
    </div>
  );
};

export default Pagination;
