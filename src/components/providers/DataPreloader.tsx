'use client';

import { useEffect } from 'react';
import { dataService } from '@/services/dataService';

/**
 * DataPreloader component that aggressively preloads critical data
 * This ensures instant access to profile, CV, and blog data
 */
export default function DataPreloader() {
  useEffect(() => {
    // Start preloading critical data immediately
    const preloadData = async () => {
      try {
        // Start all preloads in parallel without waiting
        const promises = [
          dataService.getProfile().catch(() => null),
          dataService.getCV().catch(() => null),
          dataService.getBlogPosts().catch(() => null),
        ];
        
        // Don't wait for completion, let it load in background
        Promise.all(promises);
      } catch (error) {
        // Silently fail - preloading is optional
        console.warn('DataPreloader error:', error);
      }
    };

    // Start immediately
    preloadData();
    
    // Also start on next tick for reliability
    setTimeout(preloadData, 0);
    
    // Start again after a short delay
    setTimeout(preloadData, 100);
  }, []);

  // This component doesn't render anything
  return null;
} 