import React from 'react';

interface PaginationProps {
  currentPage: number;
  setCurrentPage: React.Dispatch<number>;
  numberOfRows: number;
  pageSize?: number;
  maxPagesToShow?: number;
}

/*
  @param {number} currentPage - Current page number
  @param {React.Dispatch<number>} setCurrentPage - Function to set the current page
  @param {number} numberOfRows - Total number of rows
  @param {number} pageSize - Number of rows per page
  @param {number} maxPagesToShow - Maximum number of pages to show
  @returns {ReactElement} - Returns a pagination component
*/
const Pagination: React.FC<PaginationProps> = ({ currentPage, setCurrentPage, numberOfRows, pageSize = 5, maxPagesToShow = 5 }) => {
  const totalPages = Math.ceil(numberOfRows / pageSize);

  const renderPageNumbers = () => {
    const pages = [];
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button key={i} className={`join-item btn ${i === currentPage ? 'btn-active' : ''}`}>
            {i}
          </button>
        );
      }
    } else {
      let startPage = 1;
      let endPage = totalPages;

      if (totalPages > maxPagesToShow) {
        if (currentPage <= halfMaxPages) {
          endPage = maxPagesToShow;
        } else if (currentPage + halfMaxPages >= totalPages) {
          startPage = totalPages - maxPagesToShow + 1;
        } else {
          startPage = currentPage - halfMaxPages;
          endPage = currentPage + halfMaxPages;
        }
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(
          <button key={i} className={`join-item btn ${i === currentPage ? 'btn-active' : ''}`}>
            {i}
          </button>
        );
      }

      if (startPage > 1) {
        pages.unshift(<button key="ellipsis1" className="join-item btn btn-disabled">...</button>);
        pages.unshift(<button key={1} className="join-item btn">1</button>);
      }

      if (endPage < totalPages) {
        pages.push(<button key="ellipsis2" className="join-item btn btn-disabled">...</button>);
        pages.push(<button key={totalPages} className="join-item btn">{totalPages}</button>);
      }
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="join">
      {renderPageNumbers().map((pageButton) =>
        React.cloneElement(pageButton, {
          onClick: () => handlePageChange(parseInt(pageButton.key as string)),
        })
      )}
    </div>
  );
}

export default Pagination;
