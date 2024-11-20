import React from "react";

const Paginate = ({ page, totalPages, handlePageChange }) => {
  const pages = [];
  const maxPagesToShow = 5; // Number of visible page buttons

  // Generate page numbers with ellipses
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || // Always show the first page
      i === totalPages || // Always show the last page
      (i >= page - 2 && i <= page + 2) // Show pages around the current page
    ) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "…") {
      pages.push("…"); // Add ellipses if there's a gap
    }
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      {/* First Button */}
      <button
        onClick={() => handlePageChange(1)}
        disabled={page === 1}
        className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        First
      </button>

      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className={`px-3 py-1 border rounded ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        Previous
      </button>

      {/* Page Buttons */}
      {pages.map((pageNumber, index) =>
        pageNumber === "…" ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            {pageNumber}
          </span>
        ) : (
          <button
            key={pageNumber}
            onClick={() => handlePageChange(pageNumber)}
            className={`px-3 py-1 border rounded ${
              page === pageNumber
                ? "bg-blue-500 text-white font-bold"
                : "hover:bg-gray-100"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className={`px-3 py-1 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        Next
      </button>

      {/* Last Button */}
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={page === totalPages}
        className={`px-3 py-1 border rounded ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}`}
      >
        Last
      </button>
    </div>
  );
};

export default Paginate;
