import {
  Profile,
  BlogPost,
  BlogPostList,
  CV,
  CertificateList,
  BadgeList,
  ApiError
} from '@/types';

/**
 * Data Service for handling all JSON data operations
 * Provides a centralized way to fetch data from static JSON files
 */
export class DataService {
  private baseUrl: string;

  constructor() {
    // Use environment variable or default to /data for local development
    this.baseUrl = process.env.NEXT_PUBLIC_DATA_BASE_URL || '/data';
  }

  /**
   * Generic fetch method with error handling
   */
  private async fetchJson<T>(url: string): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
        // Add cache control for production
        cache: process.env.NODE_ENV === 'production' ? 'force-cache' : 'no-store',
      });

      if (!response.ok) {
        throw new ApiError(
          `Failed to fetch data from ${url}`,
          response.status,
          'FETCH_ERROR'
        );
      }

      const data = await response.json();
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
   * Fetch user profile data
   */
  async getProfile(): Promise<Profile> {
    return this.fetchJson<Profile>(`${this.baseUrl}/profile.json`);
  }

  /**
   * Fetch all blog posts (summary list)
   */
  async getBlogPosts(): Promise<BlogPostList> {
    return this.fetchJson<BlogPostList>(`${this.baseUrl}/blog/posts.json`);
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
   * Fetch CV/Resume data
   */
  async getCV(): Promise<CV> {
    return this.fetchJson<CV>(`${this.baseUrl}/cv.json`);
  }

  /**
   * Fetch certificates data
   */
  async getCertificates(): Promise<CertificateList> {
    return this.fetchJson<CertificateList>(`${this.baseUrl}/certificates.json`);
  }

  /**
   * Fetch badges data
   */
  async getBadges(): Promise<BadgeList> {
    return this.fetchJson<BadgeList>(`${this.baseUrl}/badges.json`);
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
      post.category.toLowerCase().includes(searchTerm)
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
      post.category.toLowerCase() === category.toLowerCase()
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
   * Get certificates that are still valid (not expired)
   */
  async getValidCertificates(): Promise<CertificateList> {
    const allCertificates = await this.getCertificates();
    const now = new Date();
    
    const validCertificates = allCertificates.certificates.filter(cert => {
      if (!cert.expiry_date) return true; // No expiry date means it doesn't expire
      return new Date(cert.expiry_date) > now;
    });

    return {
      ...allCertificates,
      certificates: validCertificates,
      total: validCertificates.length
    };
  }

  /**
   * Validate data integrity (useful for development)
   */
  async validateData(): Promise<{ valid: boolean; errors: string[] }> {
    const errors: string[] = [];

    try {
      // Test all endpoints
      await this.getProfile();
      await this.getBlogPosts();
      await this.getCV();
      await this.getCertificates();
      await this.getBadges();

      // Test individual blog posts
      const blogPosts = await this.getBlogPosts();
      for (const post of blogPosts.posts.slice(0, 3)) { // Test first 3 posts
        try {
          await this.getBlogPost(post.id);
        } catch (error) {
          errors.push(`Blog post ${post.id} is invalid: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

    } catch (error) {
      errors.push(`Data validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}

// Create and export a singleton instance
export const dataService = new DataService();

// Export the class for testing or custom instances
export default DataService; 