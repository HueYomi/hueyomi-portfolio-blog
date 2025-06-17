import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { dataService } from '@/services/dataService';
import {
  Profile,
  BlogPost,
  BlogPostList,
  CV,
  CertificateList,
  BadgeList,
  LoadingState,
  AsyncState,
  ApiError
} from '@/types';

// Cache configuration
const CACHE_TTL = {
  profile: 10 * 60 * 1000, // 10 minutes
  cv: 10 * 60 * 1000, // 10 minutes
  blog: 5 * 60 * 1000, // 5 minutes
  search: 2 * 60 * 1000, // 2 minutes
};

interface UseAsyncDataOptions<T> {
  cacheKey: string;
  cacheTTL: number;
  fetchFunction: () => Promise<T>;
}

/**
 * Generic hook for async data fetching with caching
 */
function useAsyncData<T>({ cacheKey, cacheTTL, fetchFunction }: UseAsyncDataOptions<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<LoadingState>('idle');
  const [error, setError] = useState<string | null>(null);

  // Stabilize fetchFunction with useRef to prevent infinite loops
  const fetchFunctionRef = useRef(fetchFunction);
  fetchFunctionRef.current = fetchFunction;

  const fetchData = useCallback(async () => {
    // Check cache first
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        try {
          const { data: cachedData, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < cacheTTL) {
            setData(cachedData);
            setLoading('success');
            return;
          }
        } catch (e) {
          // Invalid cache, continue with fetch
        }
      }
    }

    setLoading('loading');
    setError(null);

    try {
      const result = await fetchFunctionRef.current();
      setData(result);
      setLoading('success');

      // Cache the result
      if (typeof window !== 'undefined') {
        localStorage.setItem(cacheKey, JSON.stringify({
          data: result,
          timestamp: Date.now()
        }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setLoading('error');
    }
  }, [cacheKey, cacheTTL]);

  const refetch = useCallback(() => {
    // Clear cache and refetch
    if (typeof window !== 'undefined') {
      localStorage.removeItem(cacheKey);
    }
    fetchData();
  }, [cacheKey, fetchData]);

  // Auto-fetch on mount - only once
  useEffect(() => {
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array - only run once

  return { data, loading, error, refetch };
}

/**
 * Hook for fetching profile data with caching
 */
export function useProfile() {
  return useAsyncData({
    cacheKey: 'profile-data',
    cacheTTL: CACHE_TTL.profile,
    fetchFunction: () => dataService.getProfile()
  });
}

/**
 * Hook for fetching blog posts list with caching
 */
export function useBlogPosts() {
  return useAsyncData({
    cacheKey: 'blog-posts',
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: () => dataService.getBlogPosts()
  });
}

/**
 * Hook for fetching a specific blog post with caching
 */
export function useBlogPost(id: string) {
  const cacheKey = useMemo(() => `blog-post-${id}`, [id]);
  
  return useAsyncData({
    cacheKey,
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: useCallback(() => dataService.getBlogPost(id), [id])
  });
}

/**
 * Hook for fetching recent blog posts with caching
 */
export function useRecentBlogPosts(limit: number = 5) {
  const cacheKey = useMemo(() => `recent-blog-posts-${limit}`, [limit]);
  
  return useAsyncData({
    cacheKey,
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: useCallback(() => dataService.getRecentBlogPosts(limit), [limit])
  });
}

/**
 * Hook for searching blog posts
 */
export function useSearchBlogPosts(query: string) {
  const cacheKey = useMemo(() => `search-${query}`, [query]);
  
  return useAsyncData({
    cacheKey,
    cacheTTL: CACHE_TTL.search,
    fetchFunction: useCallback(() => dataService.searchBlogPosts(query), [query])
  });
}

/**
 * Hook for fetching blog posts by category
 */
export function useBlogPostsByCategory(category: string) {
  const cacheKey = useMemo(() => `category-${category}`, [category]);
  
  return useAsyncData({
    cacheKey,
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: useCallback(() => dataService.getBlogPostsByCategory(category), [category])
  });
}

/**
 * Hook for fetching blog posts by tag
 */
export function useBlogPostsByTag(tag: string) {
  const cacheKey = useMemo(() => `tag-${tag}`, [tag]);
  
  return useAsyncData({
    cacheKey,
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: useCallback(() => dataService.getBlogPostsByTag(tag), [tag])
  });
}

/**
 * Hook for fetching CV data with caching
 */
export function useCV() {
  return useAsyncData({
    cacheKey: 'cv-data',
    cacheTTL: CACHE_TTL.cv,
    fetchFunction: () => dataService.getCV()
  });
}

/**
 * Hook for fetching certificates with caching
 */
export function useCertificates() {
  return useAsyncData({
    cacheKey: 'certificates',
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: () => dataService.getCertificates()
  });
}

/**
 * Hook for fetching valid certificates only
 */
export function useValidCertificates() {
  return useAsyncData({
    cacheKey: 'valid-certificates',
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: () => dataService.getValidCertificates()
  });
}

/**
 * Hook for fetching badges with caching
 */
export function useBadges() {
  return useAsyncData({
    cacheKey: 'badges',
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: () => dataService.getBadges()
  });
}

/**
 * Hook for fetching badges by category
 */
export function useBadgesByCategory(category: string) {
  const cacheKey = useMemo(() => `badges-${category}`, [category]);
  
  return useAsyncData({
    cacheKey,
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: useCallback(() => dataService.getBadgesByCategory(category), [category])
  });
}

/**
 * Hook for data validation (useful in development)
 */
export function useDataValidation() {
  return useAsyncData({
    cacheKey: 'data-validation',
    cacheTTL: CACHE_TTL.blog,
    fetchFunction: () => dataService.validateData()
  });
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
  }, [key, expirationMinutes]);

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
      throw error;
    }
  }, [getCachedData, setCachedData, fetchFunction]);

  const refetch = useCallback(async () => {
    clearCache();
    await fetchData();
  }, [clearCache, fetchData]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
    clearCache,
  };
} 