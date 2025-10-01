import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SearchResults from './SearchResults';

export default function SearchResultsModal({ open, onClose, results }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full mx-4 p-6 relative"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-[#DB3A06] text-2xl font-bold"
              aria-label="Close"
            >
              &times;
            </button>
            <h2 className="text-2xl font-bold text-[#DB3A06] mb-4 text-center">Search Results</h2>
            <SearchResults results={results} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
