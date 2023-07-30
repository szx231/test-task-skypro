import { FC, memo } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.css';
import { PaginationProps } from './types';

export const Pagination: FC<PaginationProps> = memo((props) => {
  const { handlePageClick, pageCount, currentPage } = props;

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      previousLabel="< previous"
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      previousLinkClassName={styles.pagination__link}
      nextLinkClassName={styles.pagination__link}
      disabledClassName={styles['pagination__link--disabled']}
      activeClassName={styles['pagination__link--active']}
      forcePage={currentPage - 1}
    />
  );
});
