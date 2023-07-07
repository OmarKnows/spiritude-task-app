import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalEntries: number
  onPageChange: (pageNumber: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1,
  )

  return (
    <div className="flex justify-center items-center mt-4">
      <nav className="flex items-center">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        {pageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`mx-1 px-2 py-1 rounded-md ${
              pageNumber === currentPage
                ? "bg-green-400 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {pageNumber}
          </button>
        ))}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-2 py-1 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </nav>
    </div>
  )
}

export default Pagination
