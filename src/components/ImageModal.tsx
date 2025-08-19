import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface ImageModalProps {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, imageUrl, onClose }) => {
  if (!isOpen) return null;

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle escape key to close and prevent body scroll
  useEffect(() => {
    const handleEscKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Save the original overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    window.addEventListener('keydown', handleEscKey);
    
    // Restore scrolling when modal is closed or component unmounts
    return () => {
      document.body.style.overflow = originalStyle;
      window.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-80 overflow-y-auto py-8"
          onClick={handleBackdropClick}
        >
          <div className="relative max-w-[90vw] max-h-[90vh] my-auto">
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              src={imageUrl}
              alt="Full size image"
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
            />
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all duration-200"
              onClick={onClose}
            >
              <Icon icon="mdi:close" className="w-6 h-6" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default ImageModal;