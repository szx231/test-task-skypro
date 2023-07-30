export interface PaginationProps {
  handlePageClick: ({ selected }: { selected: number }) => void;
  pageCount: number;
  currentPage: number;
}
