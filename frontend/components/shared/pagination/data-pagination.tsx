import { Input } from '@/components/ui/input';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import useMediaQuery from '@/hooks/use-media-query';
import { useState } from 'react';

export interface DataPaginationProps {
  pageSize: number;
  totalItems: number;
  currentPage: number;
  onPageChange?: (page: number) => void;
}

const DataPagination = (props: DataPaginationProps) => {
  const { pageSize, totalItems, currentPage, onPageChange } = props;

  // Ensure at least one page is shown, even when there are no items
  const totalPages = totalItems === 0 ? 1 : Math.ceil(totalItems / pageSize);
  const [inputPage, setInputPage] = useState(currentPage);
  const isMobile = useMediaQuery('(max-width: 768px)'); // Adjust as needed for mobile breakpoint

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 3) {
      // If we have 3 or fewer pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Display surrounding pages based on the current page
      if (currentPage === 1 || currentPage === 2) {
        pages.push(1, 2, 3);
      } else if (currentPage === totalPages || currentPage === totalPages - 1) {
        pages.push(totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(currentPage - 1, currentPage, currentPage + 1);
      }
    }
    return pages;
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
      setInputPage(page);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(event.target.value, 10);

    if (value > totalPages) {
      value = totalPages;
    }

    setInputPage(value);
  };

  const handleInputBlur = () => {
    if (inputPage >= 1 && inputPage <= totalPages) {
      handlePageChange(inputPage);
    } else {
      setInputPage(currentPage);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        {isMobile ? (
          <>
            <PaginationItem>
              <PaginationPrevious className="cursor-pointer" onClick={handlePrevious} />
            </PaginationItem>
            <PaginationItem>
              <Input
                type="number"
                min={1}
                max={totalPages}
                value={inputPage}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="w-16 text-center" // Adjust width as needed
              />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={handleNext} />
            </PaginationItem>
          </>
        ) : (
          <>
            <PaginationItem>
              <PaginationPrevious className="cursor-pointer" onClick={handlePrevious} />
            </PaginationItem>
            {currentPage > 2 && totalPages > 3 && (
              <>
                <PaginationItem>
                  <PaginationLink className="cursor-pointer" onClick={() => handlePageChange(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                {currentPage > 3 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
              </>
            )}

            {getPageNumbers().map((page) => (
              <PaginationItem key={page}>
                <PaginationLink className="cursor-pointer" onClick={() => handlePageChange(page)} isActive={page === currentPage}>
                  {page}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages - 1 && totalPages > 3 && (
              <>
                {currentPage < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationLink className="cursor-pointer" onClick={() => handlePageChange(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext className="cursor-pointer" onClick={handleNext} />
            </PaginationItem>
          </>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default DataPagination;
