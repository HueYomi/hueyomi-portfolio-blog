// Common types for the portfolio blog application

// Profile Data Types
export interface SocialMediaLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ProfileSEO {
  meta_title: string;
  meta_description: string;
  keywords: string[];
  og_image: string;
}

export interface JourneyStep {
  year: string;
  title: string;
  description: string;
}

export interface Hobby {
  name: string;
  description: string;
  icon: string;
}

export interface TravelExperience {
  place: string;
  year: string;
  description: string;
  highlight: string;
}

export interface WishListCategory {
  category: string;
  items: string[];
}

export interface StoryChapter {
  id: number;
  title: string;
  image: string;
  note: string;
  year: string;
  emotion: string;
}

export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  about?: string; // Extended about section
  personalStory?: string; // Personal background story
  journey?: JourneyStep[]; // Career/life journey timeline
  hobbies?: Hobby[]; // Personal hobbies and interests
  travelExperiences?: TravelExperience[]; // Travel experiences
  wishList?: WishListCategory[]; // Future goals and dreams
  funFacts?: string[]; // Fun facts about the person
  values?: string[]; // Personal values and beliefs
  website: string;
  linkedin: string;
  github: string;
  twitter?: string;
  profileImage: string;
  galleryImages?: string[]; // Gallery of personal photos
  storyAlbum?: StoryChapter[]; // Interactive story album
  skills?: SkillCategory[]; // Skills with categories and levels
  socialMedia?: SocialMediaLink[]; // Social media links
  typewriterTexts?: string[]; // Optional field for typewriter effect
  seo?: ProfileSEO; // SEO metadata
  updated_at: string;
}

// Blog Data Types
export interface BlogPost {
  id: string;
  title: string;
  content: string;
  summary: string;
  author: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  published: boolean;
  featured_image: string;
  read_time: string;
  category?: string; // Optional category for organization
  seo: {
    meta_title: string;
    meta_description: string;
    og_image: string;
  };
}

export interface BlogPostSummary {
  id: string;
  title: string;
  summary: string;
  author: string;
  created_at: string;
  updated_at: string;
  tags: string[];
  published: boolean;
  featured_image: string;
  read_time: string;
  category?: string; // Optional category for organization
}

export interface BlogPostList {
  posts: BlogPostSummary[];
  total: number;
  categories?: string[]; // Optional list of available categories
  tags?: string[]; // Optional list of available tags
  updated_at: string;
}

// CV Data Types
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
}

export interface WorkExperience {
  company: string;
  position: string;
  start_date: string;
  end_date: string | null;
  current: boolean;
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  start_date: string;
  end_date: string;
  gpa: string;
  honors: string[];
  relevant_coursework?: string[]; // Optional list of relevant courses
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  category: string;
  items: SkillItem[];
}

export interface Language {
  language: string;
  level: string;
}

export interface CV {
  personal_info: PersonalInfo;
  work_experience: WorkExperience[];
  education: Education[];
  skills: SkillCategory[];
  languages: Language[];
  download_url: string;
  updated_at: string;
}

// Certificate Data Types
export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  issue_date: string;
  expiry_date: string | null;
  credential_id: string;
  credential_url: string;
  description: string;
  certificate_image: string;
  badge_image: string;
  skills?: string[]; // Optional list of skills gained from this certificate
}

export interface CertificateList {
  certificates: Certificate[];
  total: number;
  updated_at: string;
}

// Badge Data Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  issuer: string;
  issue_date: string;
  badge_url: string;
  verify_url: string;
  category: string;
  color: string;
}

export interface BadgeList {
  badges: Badge[];
  categories: string[];
  total: number;
  updated_at: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// Loading States
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface AsyncState<T> {
  data: T | null;
  loading: LoadingState;
  error: string | null;
}

// Component Props Types
export interface PageProps {
  params?: Record<string, string>;
  searchParams?: Record<string, string>;
}

export interface LayoutProps {
  children: React.ReactNode;
}

// Theme Types
export type ThemeMode = 'light' | 'dark' | 'system';

export interface ThemeConfig {
  mode: ThemeMode;
  primaryColor: string;
  fontFamily: string;
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  icon?: string;
  external?: boolean;
}

// SEO Types
export interface SEOData {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
}

// Form Types
export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  githubUrl?: string
  liveUrl?: string
  imageUrl?: string
  featured: boolean
  createdAt: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
} 