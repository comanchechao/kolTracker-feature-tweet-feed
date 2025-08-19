import React from 'react';

interface ImagePlaceholderProps {
  className?: string;
}

const ImagePlaceholder: React.FC<ImagePlaceholderProps> = ({ className = '' }) => {
  return (
    <div 
      className={`animate-pulse bg-gradient-to-r from-gray-800 to-gray-700 ${className}`}
      aria-hidden="true"
    />
  );
};

export default ImagePlaceholder;