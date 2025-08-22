import React, { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  onLoad?: () => void;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  priority = false,
  onLoad,
}) => {
  const [loaded, setLoaded] = useState(false);
  
  // Generate srcSet for responsive images
  const smallSrc = src.replace(/\.(jpg|jpeg|png|gif)/, '_small.$1');
  const srcSet = `${smallSrc} 400w, ${src} 800w`;
  
  return (
    <div className="relative flex items-center justify-center content-center">
      <img
        src={src}
        srcSet={srcSet}
        sizes="(max-width: 768px) 100vw, 800px"
        alt={alt}
        className={`${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={() => {
          setLoaded(true);
          if (onLoad) onLoad();
        }}
        width={width}
        height={height}
      />
    </div>
  );
};

export default OptimizedImage;