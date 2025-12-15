import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getOptimizedImageUrl(url: string, width: number = 800) {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  // Check if it already has transformations
  if (url.includes('/upload/w_')) return url;

  // Insert transformations after /upload/
  // w_<width>: Resize to width
  // q_auto: Automatic quality
  // f_auto: Automatic format (WebP/AVIF)
  return url.replace('/upload/', `/upload/w_${width},q_auto,f_auto/`);
}