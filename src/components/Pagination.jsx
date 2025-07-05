import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  itemsPerPage, 
  totalItems,
  className = "" 
}) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  const visiblePages = totalPages > 1 ? getVisiblePages() : [];

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
      {/* Items Info */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-sm text-neutral-600"
      >
        Showing <span className="font-semibold text-neutral-800">{startItem}</span> to{' '}
        <span className="font-semibold text-neutral-800">{endItem}</span> of{' '}
        <span className="font-semibold text-neutral-800">{totalItems}</span> results
      </motion.div>

      {/* Pagination Controls */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2"
      >
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            currentPage === 1
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              : 'bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 hover:border-primary shadow-sm hover:shadow-md'
          }`}
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Previous</span>
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {visiblePages.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <div className="flex items-center justify-center w-10 h-10 text-neutral-400">
                  <MoreHorizontal className="w-4 h-4" />
                </div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => onPageChange(page)}
                  className={`w-10 h-10 rounded-xl font-medium transition-all duration-300 ${
                    currentPage === page
                      ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-lg'
                      : 'bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 hover:border-primary'
                  }`}
                >
                  {page}
                </motion.button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
            currentPage === totalPages
              ? 'bg-neutral-100 text-neutral-400 cursor-not-allowed'
              : 'bg-white hover:bg-neutral-50 text-neutral-700 border border-neutral-200 hover:border-primary shadow-sm hover:shadow-md'
          }`}
        >
          <span className="hidden sm:inline">Next</span>
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Pagination;