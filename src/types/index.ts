// Common types for the portfolio blog application

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  publishedAt: string
  updatedAt: string
  tags: string[]
  slug: string
  featured: boolean
}

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

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}

export interface SocialLink {
  platform: string
  url: string
  icon: string
}

export interface SEOData {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
} 