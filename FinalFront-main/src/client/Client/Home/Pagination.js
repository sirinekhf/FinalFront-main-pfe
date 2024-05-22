import React, { useState, useRef } from "react";

const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const maxPages = 8; // Maximum number of pages to display

  const totalPages = Math.ceil(totalPosts / postsPerPage);

  const [isScrollable, setIsScrollable] = useState(totalPages > maxPages);
  const paginationRef = useRef(null);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    //scrollToTop();
  };

  const scrollToTop = () => {
    if (paginationRef.current) {
      paginationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  let startPage, endPage;

  // Calculate the start and end page based on the current page and maximum pages
  if (totalPages <= maxPages) {
    // If the total number of pages is less than or equal to the maximum, display all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // If the total number of pages is greater than the maximum
    const maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    const maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;

    if (currentPage <= maxPagesBeforeCurrentPage) {
      // If the current page is near the start, display the first maxPages pages
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // If the current page is near the end, display the last maxPages pages
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // Display pages around the current page
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <div className="pagination" ref={paginationRef}>
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageClick(page)}
          className={currentPage === page ? "active" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
