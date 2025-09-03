import { useState } from "react";
import ReactPaginate from "react-paginate";
import "./paginate.css";

export default function PaginatedItems({ itemsPerPage, setPage ,total}) {
  const pageCount = Math.ceil( total / itemsPerPage);

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
        containerClassName="custom-paginate d-flex alig-items-center justify-content-end mx-2"
        pageLinkClassName="pagination-tag-anchor mx-2 text-black-50  rounded-circle"
        activeLinkClassName="bg-primary text-white"
      />
    </>
  );
}
