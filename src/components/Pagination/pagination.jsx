import ReactPaginate from "react-paginate";
import "./pagination.css";

export default function PaginatedItems({ itemsPerPage, total, setPage }) {
  const pageCount = Math.ceil(total / itemsPerPage);

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel=" >>"
        onPageChange={(e) => setPage(e.selected + 1)}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="<< "
        renderOnZeroPageCount={null}
        containerClassName="custom-pagination d-flex justify-content-end align-items-center  rounded mx-2"
        pageLinkClassName="pagination-tag-anchor text-black-50 rounded-circle"
        activeLinkClassName="bg-primary text-white"
        previousLinkClassName="text-decoration-none me-2"
        nextLinkClassName='text-decoration-none ms-2'
      />
    </>
  );
}
