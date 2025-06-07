import { useState, useEffect, useCallback } from 'react';
import { dataService } from '@/services/dataService';
import {
  Profile,
  BlogPost,
  BlogPostList,
  CV,
  CertificateList,
  BadgeList,
  AsyncState,
  ApiError
} from '@/types';

/**
 * Generic hook for async data fetching
 */
function useAsyncData<T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
): AsyncState<T> & { refetch: () => Promise<void> } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const fetchData = useCallback(async () => {
    setState(prev => ({ ...prev, loading: 'loading', error: null }));
    
    try {
      const data = await fetchFunction();
      setState({ data, loading: 'success', error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      
      setState(prev => ({ 
        ...prev, 
        loading: 'error', 
        error: errorMessage 
      }));
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
  };
}

/**
 * Hook for fetching profile data
 */
export function useProfile() {
  return useAsyncData(() => dataService.getProfile());
}

/**
 * Hook for fetching blog posts list
 */
export function useBlogPosts() {
  return useAsyncData(() => dataService.getBlogPosts());
}

/**
 * Hook for fetching a specific blog post
 */
export function useBlogPost(id: string) {
  return useAsyncData(
    () => dataService.getBlogPost(id),
    [id]
  );
}

/**
 * Hook for fetching recent blog posts
 */
export function useRecentBlogPosts(limit: number = 5) {
  return useAsyncData(
    () => dataService.getRecentBlogPosts(limit),
    [limit]
  );
}

/**
 * Hook for searching blog posts
 */
export function useSearchBlogPosts(query: string) {
  return useAsyncData(
    () => dataService.searchBlogPosts(query),
    [query]
  );
}



/**
 * Hook for fetching blog posts by category
 */
export function useBlogPostsByCategory(category: string) {
  return useAsyncData(
    () => dataService.getBlogPostsByCategory(category),
    [category]
  );
}

/**
 * Hook for fetching blog posts by tag
 */
export function useBlogPostsByTag(tag: string) {
  return useAsyncData(
    () => dataService.getBlogPostsByTag(tag),
    [tag]
  );
}

/**
 * Hook for fetching CV data
 */
export function useCV() {
  return useAsyncData(() => dataService.getCV());
}

/**
 * Hook for fetching certificates
 */
export function useCertificates() {
  return useAsyncData(() => dataService.getCertificates());
}

/**
 * Hook for fetching valid certificates only
 */
export function useValidCertificates() {
  return useAsyncData(() => dataService.getValidCertificates());
}

/**
 * Hook for fetching badges
 */
export function useBadges() {
  return useAsyncData(() => dataService.getBadges());
}

/**
 * Hook for fetching badges by category
 */
export function useBadgesByCategory(category: string) {
  return useAsyncData(
    () => dataService.getBadgesByCategory(category),
    [category]
  );
}

/**
 * Hook for data validation (useful in development)
 */
export function useDataValidation() {
  return useAsyncData(() => dataService.validateData());
}

/**
 * Hook for manual data fetching with loading state
 */
export function useManualFetch<T>() {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const execute = useCallback(async (fetchFunction: () => Promise<T>) => {
    setState(prev => ({ ...prev, loading: 'loading', error: null }));
    
    try {
      const data = await fetchFunction();
      setState({ data, loading: 'success', error: null });
      return data;
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      
      setState(prev => ({ 
        ...prev, 
        loading: 'error', 
        error: errorMessage 
      }));
      throw error;
    }
  }, []);

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: 'idle',
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

/**
 * Hook for caching data with expiration
 */
export function useCachedData<T>(
  key: string,
  fetchFunction: () => Promise<T>,
  expirationMinutes: number = 5
): AsyncState<T> & { refetch: () => Promise<void>; clearCache: () => void } {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: 'idle',
    error: null,
  });

  const getCacheKey = (key: string) => `cache_${key}`;
  const getExpirationKey = (key: string) => `cache_exp_${key}`;

  const isExpired = useCallback((key: string): boolean => {
    const expiration = localStorage.getItem(getExpirationKey(key));
    if (!expiration) return true;
    return Date.now() > parseInt(expiration);
  }, []);

  const getCachedData = useCallback((key: string): T | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      if (isExpired(key)) {
        localStorage.removeItem(getCacheKey(key));
        localStorage.removeItem(getExpirationKey(key));
        return null;
      }
      
      const cached = localStorage.getItem(getCacheKey(key));
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }, [isExpired]);

  const setCachedData = useCallback((key: string, data: T) => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(getCacheKey(key), JSON.stringify(data));
      localStorage.setItem(
        getExpirationKey(key), 
        (Date.now() + expirationMinutes * 60 * 1000).toString()
      );
    } catch {
      // Ignore localStorage errors
    }
  }, [expirationMinutes]);

  const clearCache = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem(getCacheKey(key));
    localStorage.removeItem(getExpirationKey(key));
  }, [key]);

  const fetchData = useCallback(async () => {
    // Check cache first
    const cachedData = getCachedData(key);
    if (cachedData) {
      setState({ data: cachedData, loading: 'success', error: null });
      return;
    }

    setState(prev => ({ ...prev, loading: 'loading', error: null }));
    
    try {
      const data = await fetchFunction();
      setCachedData(key, data);
      setState({ data, loading: 'success', error: null });
    } catch (error) {
      const errorMessage = error instanceof ApiError 
        ? error.message 
        : error instanceof Error 
        ? error.message 
        : 'An unknown error occurred';
      
      setState(prev => ({ 
        ...prev, 
        loading: 'error', 
        error: errorMessage 
      }));
    }
  }, [key, fetchFunction, getCachedData, setCachedData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch: fetchData,
    clearCache,
  };
} 