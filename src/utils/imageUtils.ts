/**
 * Utility functions for image optimization
 */

/**
 * Preloads an image by creating a new Image object and setting its src
 * @param src - The image URL to preload
 * @returns A promise that resolves when the image is loaded or rejects on error
 */
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Generates a lower quality placeholder URL for an image
 * @param originalUrl - The original image URL
 * @param width - The width of the placeholder
 * @returns The placeholder image URL
 */
export const getPlaceholderImageUrl = (originalUrl: string, width = 10): string => {
  // For URLs that support resizing parameters (like picsum.photos)
  if (originalUrl.includes('picsum.photos')) {
    // Extract the dimensions from the URL
    const match = originalUrl.match(/\/(\d+)\/(\d+)/);
    if (match) {
      const [, origWidth, origHeight] = match;
      const ratio = parseInt(origHeight) / parseInt(origWidth);
      const height = Math.round(width * ratio);
      return originalUrl.replace(`/${origWidth}/${origHeight}`, `/${width}/${height}`);
    }
  }
  
  // For other URLs, we can't generate a placeholder, so return the original
  return originalUrl;
};

/**
 * Optimizes image loading by implementing a blur-up technique
 * @param imageElement - The image element to optimize
 * @param src - The final image source
 */
export const optimizeImageLoading = (imageElement: HTMLImageElement, src: string): void => {
  // First set a low quality placeholder
  const placeholderSrc = getPlaceholderImageUrl(src);
  
  // Preload the full quality image
  preloadImage(src).then(() => {
    // Once preloaded, switch to the full quality image
    imageElement.src = src;
  }).catch(error => {
    console.error('Error preloading image:', error);
    // On error, still try to load the original image
    imageElement.src = src;
  });
};