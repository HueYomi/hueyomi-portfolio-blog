import {
  Profile,
  BlogPost,
  BlogPostList,
  CV,
  CertificateList,
  BadgeList,
  ApiError
} from '@/types';

// Static data cache for immediate access
let staticDataCache: {
  profile?: Profile;
  cv?: CV;
  blogPosts?: BlogPostList;
  certificates?: CertificateList;
  badges?: BadgeList;
} = {};

// Preload promise to avoid multiple simultaneous requests
let preloadPromise: Promise<void> | null = null;

/**
 * Preload critical data (profile and CV) for instant access
 */
async function preloadCriticalData(): Promise<void> {
  if (preloadPromise) return preloadPromise;
  
  preloadPromise = (async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_DATA_BASE_URL || '/data';
      
      // Preload profile and CV data in parallel
      const [profileResponse, cvResponse, blogResponse] = await Promise.all([
        fetch(`${baseUrl}/profile.json`, {
          headers: { 'Content-Type': 'application/json' },
          cache: 'force-cache',
        }).catch(() => null),
        fetch(`${baseUrl}/cv.json`, {
          headers: { 'Content-Type': 'application/json' },
          cache: 'force-cache',
        }).catch(() => null),
        fetch(`${baseUrl}/blog/posts.json`, {
          headers: { 'Content-Type': 'application/json' },
          cache: 'force-cache',
        }).catch(() => null)
      ]);

      // Cache successful responses
      if (profileResponse?.ok) {
        staticDataCache.profile = await profileResponse.json();
      }
      
      if (cvResponse?.ok) {
        staticDataCache.cv = await cvResponse.json();
      }

      if (blogResponse?.ok) {
        staticDataCache.blogPosts = await blogResponse.json();
      }
    } catch (error) {
      console.warn('Failed to preload critical data:', error);
    }
  })();
  
  return preloadPromise;
}

// Start preloading immediately when module loads
if (typeof window !== 'undefined') {
  // Multiple preload attempts for reliability
  preloadCriticalData();
  
  // Preload on next tick
  setTimeout(() => preloadCriticalData(), 0);
  
  // Preload after DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => preloadCriticalData());
  } else {
    setTimeout(() => preloadCriticalData(), 100);
  }
  
  // Preload on window load as fallback
  window.addEventListener('load', () => preloadCriticalData());
}

/**
 * Data Service for handling all JSON data operations
 * Provides a centralized way to fetch data from static JSON files
 */
export class DataService {
  private baseUrl: string;

  constructor() {
    // Use environment variable or default to /data for local development
    this.baseUrl = process.env.NEXT_PUBLIC_DATA_BASE_URL || '/data';
    
    // Ensure preloading starts
    if (typeof window !== 'undefined') {
      preloadCriticalData();
    }
  }

  /**
   * Generic fetch method with error handling and caching
   */
  private async fetchJson<T>(url: string, cacheKey?: keyof typeof staticDataCache): Promise<T> {
    // Return cached data immediately if available
    if (cacheKey && staticDataCache[cacheKey]) {
      return staticDataCache[cacheKey] as T;
    }

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Aggressive caching for static data
        cache: 'force-cache',
      });

      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch data from ${url}`,
          response.status,
          'FETCH_ERROR'
        );
      }

      const data = await response.json();
      
      // Cache the data for future use
      if (cacheKey) {
        staticDataCache[cacheKey] = data;
      }
      
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      
      // Handle network errors, JSON parsing errors, etc.
      throw new ApiError(
        `Network error while fetching ${url}: ${error instanceof Error ? error.message : 'Unknown error'}`,
        0,
        'NETWORK_ERROR'
      );
    }
  }

  /**
   * Fetch user profile data with instant cache access
   */
  async getProfile(): Promise<Profile> {
    // Try cache first for instant access
    if (staticDataCache.profile) {
      return staticDataCache.profile;
    }
    
    // Wait for preload to complete
    await preloadCriticalData();
    
    // Check cache again after preload
    if (staticDataCache.profile) {
      return staticDataCache.profile;
    }
    
    // Fallback to regular fetch
    return this.fetchJson<Profile>(`${this.baseUrl}/profile.json`, 'profile');
  }

  /**
   * Fetch all blog posts (summary list) with caching
   */
  async getBlogPosts(): Promise<BlogPostList> {
    // Try cache first for instant access
    if (staticDataCache.blogPosts) {
      return staticDataCache.blogPosts;
    }
    
    // Wait for preload to complete
    await preloadCriticalData();
    
    // Check cache again after preload
    if (staticDataCache.blogPosts) {
      return staticDataCache.blogPosts;
    }
    
    // Fallback to regular fetch
    return this.fetchJson<BlogPostList>(`${this.baseUrl}/blog/posts.json`, 'blogPosts');
  }

  /**
   * Fetch individual blog post by ID
   */
  async getBlogPost(id: string): Promise<BlogPost> {
    if (!id) {
      throw new ApiError('Blog post ID is required', 400, 'INVALID_ID');
    }
    return this.fetchJson<BlogPost>(`${this.baseUrl}/blog/post-${id}.json`);
  }

  /**
   * Fetch CV/Resume data with instant cache access
   */
  async getCV(): Promise<CV> {
    // Try cache first for instant access
    if (staticDataCache.cv) {
      return staticDataCache.cv;
    }
    
    // Wait for preload to complete
    await preloadCriticalData();
    
    // Check cache again after preload
    if (staticDataCache.cv) {
      return staticDataCache.cv;
    }
    
    // Fallback to regular fetch
    return this.fetchJson<CV>(`${this.baseUrl}/cv.json`, 'cv');
  }

  /**
   * Fetch certificates data with caching
   */
  async getCertificates(): Promise<CertificateList> {
    return this.fetchJson<CertificateList>(`${this.baseUrl}/certificates.json`, 'certificates');
  }

  /**
   * Fetch badges data with caching
   */
  async getBadges(): Promise<BadgeList> {
    return this.fetchJson<BadgeList>(`${this.baseUrl}/badges.json`, 'badges');
  }

  /**
   * Search blog posts by query
   * This is a client-side search since we're using static JSON
   */
  async searchBlogPosts(query: string): Promise<BlogPostList> {
    const allPosts = await this.getBlogPosts();
    
    if (!query.trim()) {
      return allPosts;
    }

    const searchTerm = query.toLowerCase();
    const filteredPosts = allPosts.posts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) ||
      post.summary.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
      (post.category && post.category.toLowerCase().includes(searchTerm))
    );

    return {
      ...allPosts,
      posts: filteredPosts,
      total: filteredPosts.length
    };
  }

  /**
   * Filter blog posts by category
   */
  async getBlogPostsByCategory(category: string): Promise<BlogPostList> {
    const allPosts = await this.getBlogPosts();
    
    if (!category) {
      return allPosts;
    }

    const filteredPosts = allPosts.posts.filter(post => 
      post.category && post.category.toLowerCase() === category.toLowerCase()
    );

    return {
      ...allPosts,
      posts: filteredPosts,
      total: filteredPosts.length
    };
  }

  /**
   * Filter blog posts by tag
   */
  async getBlogPostsByTag(tag: string): Promise<BlogPostList> {
    const allPosts = await this.getBlogPosts();
    
    if (!tag) {
      return allPosts;
    }

    const filteredPosts = allPosts.posts.filter(post => 
      post.tags.some(postTag => postTag.toLowerCase() === tag.toLowerCase())
    );

    return {
      ...allPosts,
      posts: filteredPosts,
      total: filteredPosts.length
    };
  }

  /**
   * Get recent blog posts (limit number of posts)
   */
  async getRecentBlogPosts(limit: number = 5): Promise<BlogPostList> {
    const allPosts = await this.getBlogPosts();
    
    // Sort by created_at date (newest first) and limit
    const sortedPosts = [...allPosts.posts]
      .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
      .slice(0, limit);

    return {
      ...allPosts,
      posts: sortedPosts,
      total: sortedPosts.length
    };
  }

  /**
   * Filter badges by category
   */
  async getBadgesByCategory(category: string): Promise<BadgeList> {
    const allBadges = await this.getBadges();
    
    if (!category) {
      return allBadges;
    }

    const filteredBadges = allBadges.badges.filter(badge => 
      badge.category.toLowerCase() === category.toLowerCase()
    );

    return {
      ...allBadges,
      badges: filteredBadges,
      total: filteredBadges.length
    };
  }

  /**
   * Get only valid/active certificates (not expired)
   */
  async getValidCertificates(): Promise<CertificateList> {
    const allCertificates = await this.getCertificates();
    const now = new Date();
    
    const validCertificates = allCertificates.certificates.filter(cert => {
      // If no expiry date, consider it valid
      if (!cert.expiry_date) return true;
      // Check if not expired
      return new Date(cert.expiry_date) > now;
    });

    return {
      ...allCertificates,
      certificates: validCertificates,
      total: validCertificates.length
    };
  }

  /**
   * Validate all data sources
   */
  async validateData(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];
    
    try {
      await this.getProfile();
    } catch (error) {
      errors.push(`Profile data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    try {
      await this.getCV();
    } catch (error) {
      errors.push(`CV data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    try {
      await this.getBlogPosts();
    } catch (error) {
      errors.push(`Blog posts: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Export singleton instance
export const dataService = new DataService();

// Export the class for testing or custom instances
export default DataService; 