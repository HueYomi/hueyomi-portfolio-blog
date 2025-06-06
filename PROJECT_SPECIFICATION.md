# My Portfolio & Blog - Project Specification

## Project Overview

A modern, responsive personal portfolio and blog website built with Next.js and completely client-side rendered. The application serves as a comprehensive platform for showcasing professional experience, skills, certifications, badges, and personal blog content using static JSON files for data management.

## Architecture

### System Architecture
```
┌─────────────────┐   HTTPS Requests   ┌─────────────────┐
│   Frontend      │ ◄─────────────────►│   Static Data   │
│  (Next.js CSR)  │                    │  (JSON Files)   │
│ S3 + CloudFront │                    │ S3 + CloudFront │
└─────────────────┘                    └─────────────────┘
```

### Technology Stack

#### Data Layer
- **Data Format**: Static JSON files
- **Data Storage**: S3 bucket (same as frontend)
- **Data Access**: Direct HTTP requests to JSON files
- **Content Management**: Direct JSON file editing
- **Version Control**: Git-based content management
- **No Database**: Serverless, cost-optimized approach

#### Frontend (Client)
- **Framework**: Next.js 15.2.4 (CSR - Client-Side Rendering)
- **Language**: TypeScript
- **UI Library**: Chakra UI 2.8.2
- **Styling**: Emotion (CSS-in-JS)
- **HTTP Client**: Axios 1.6.7 (for JSON file requests)
- **Icons**: React Icons 5.0.1 + Chakra UI Icons 2.1.1
- **Animations**: Framer Motion 11.0.5
- **Deployment**: AWS S3 + CloudFront CDN
- **Build Mode**: Static export (next export)
- **Region**: ap-northeast-1 (Tokyo) or Global (cost-optimized)

## Features & Functionality

### Core Features
1. **Responsive Design**: Mobile-first approach, works across all device sizes
2. **Modern UI/UX**: Clean, professional interface using Chakra UI components
3. **Dark/Light Mode**: System-aware theme switching
4. **Client-Side Rendering**: Next.js CSR with static export for CDN optimization
5. **Type Safety**: Full TypeScript implementation on frontend
6. **Global CDN**: CloudFront distribution for fast worldwide content delivery
7. **Static Data Management**: JSON files for easy content management
8. **Zero Server Cost**: Completely serverless architecture
9. **Git-based CMS**: Version-controlled content management

### Application Sections

#### 1. Home/Landing Page (`/`)
- Hero section with personal introduction
- TypeWriter effect for dynamic text display
- Navigation to main sections
- Professional overview

#### 2. About Page (`/about`)
- Personal introduction and background
- Skills and expertise showcase
- Professional summary

#### 3. CV/Resume Page (`/cv`)
- Comprehensive professional experience
- Education history
- Technical skills matrix
- Work experience timeline
- Downloadable CV functionality

#### 4. Blog System (`/blog`)
- Blog post listing and individual post pages
- Markdown support for content
- Dynamic routing for posts
- SEO-optimized blog structure

#### 5. Certificates Page (`/certificates`)
- Professional certification showcase
- Certificate details and verification
- Visual certificate display

#### 6. Badges Page (`/badges`)
- Achievement and skill badges
- Professional accomplishments
- Visual badge gallery

## Data Structure Specification

### JSON Files Location
```
Development: http://localhost:3000/data/
Production: https://your-cloudfront-domain.cloudfront.net/data/
```

### Data Files Structure

#### Profile Data
```
GET /data/profile.json
Response: User profile information including personal details and summary
```

#### Blog System
```
GET /data/blog/posts.json
Response: Array of all blog posts with metadata

GET /data/blog/post-{id}.json
Response: Specific blog post content and details
```

#### CV/Resume
```
GET /data/cv.json
Response: Complete CV data including experience, education, and skills

Static File: /assets/cv/resume.pdf
Response: Downloadable CV file
```

#### Certificates
```
GET /data/certificates.json
Response: Array of professional certificates with details and verification info
```

#### Badges
```
GET /data/badges.json
Response: Array of achievement badges and professional accomplishments
```

### File Organization
```
public/
├── data/
│   ├── profile.json
│   ├── cv.json
│   ├── certificates.json
│   ├── badges.json
│   └── blog/
│       ├── posts.json (list of all posts)
│       ├── post-1.json
│       ├── post-2.json
│       └── ...
├── assets/
│   ├── cv/
│   │   └── resume.pdf
│   ├── images/
│   │   ├── profile.jpg
│   │   ├── certificates/
│   │   └── blog/
│   └── icons/
└── ...
```

## JSON Data Models

### Profile Data (profile.json)
```json
{
  "name": "Your Name",
  "title": "Software Developer",
  "email": "your.email@example.com",
  "phone": "+81-xxx-xxxx-xxxx",
  "location": "Tokyo, Japan",
  "summary": "Passionate software developer with expertise in...",
  "website": "https://yourwebsite.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "profileImage": "/assets/images/profile.jpg",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### Blog Posts List (blog/posts.json)
```json
{
  "posts": [
    {
      "id": "1",
      "title": "Getting Started with Next.js",
      "summary": "A comprehensive guide to building modern web applications with Next.js",
      "author": "Your Name",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z",
      "tags": ["nextjs", "react", "javascript"],
      "published": true,
      "featured_image": "/assets/images/blog/nextjs-guide.jpg",
      "read_time": "5 min read"
    }
  ],
  "total": 1,
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### Individual Blog Post (blog/post-{id}.json)
```json
{
  "id": "1",
  "title": "Getting Started with Next.js",
  "content": "# Getting Started with Next.js\n\nNext.js is a powerful React framework...",
  "summary": "A comprehensive guide to building modern web applications with Next.js",
  "author": "Your Name",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z",
  "tags": ["nextjs", "react", "javascript"],
  "published": true,
  "featured_image": "/assets/images/blog/nextjs-guide.jpg",
  "read_time": "5 min read",
  "seo": {
    "meta_title": "Getting Started with Next.js - Complete Guide",
    "meta_description": "Learn how to build modern web applications with Next.js",
    "og_image": "/assets/images/blog/nextjs-guide-og.jpg"
  }
}
```

### CV Data (cv.json)
```json
{
  "personal_info": {
    "name": "Your Name",
    "title": "Software Developer",
    "email": "your.email@example.com",
    "phone": "+81-xxx-xxxx-xxxx",
    "location": "Tokyo, Japan",
    "summary": "Professional summary..."
  },
  "work_experience": [
    {
      "company": "Tech Company",
      "position": "Senior Developer",
      "start_date": "2022-01-01",
      "end_date": null,
      "current": true,
      "description": "Led development of...",
      "technologies": ["React", "Node.js", "AWS"],
      "achievements": ["Increased performance by 40%", "Led team of 5 developers"]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Bachelor of Computer Science",
      "start_date": "2018-04-01",
      "end_date": "2022-03-31",
      "gpa": "3.8/4.0",
      "honors": ["Dean's List", "Magna Cum Laude"]
    }
  ],
  "skills": [
    {
      "category": "Frontend",
      "items": [
        {"name": "React", "level": 90},
        {"name": "TypeScript", "level": 85},
        {"name": "Next.js", "level": 80}
      ]
    }
  ],
  "languages": [
    {"language": "English", "level": "Native"},
    {"language": "Japanese", "level": "Conversational"}
  ],
  "download_url": "/assets/cv/resume.pdf",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### Certificates Data (certificates.json)
```json
{
  "certificates": [
    {
      "id": "1",
      "name": "AWS Certified Solutions Architect",
      "issuer": "Amazon Web Services",
      "issue_date": "2023-06-15",
      "expiry_date": "2026-06-15",
      "credential_id": "AWS-SAA-123456",
      "credential_url": "https://aws.amazon.com/verification/123456",
      "description": "Validates expertise in designing distributed systems on AWS",
      "certificate_image": "/assets/images/certificates/aws-saa.jpg",
      "badge_image": "/assets/images/certificates/aws-saa-badge.png"
    }
  ],
  "total": 1,
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### Badges Data (badges.json)
```json
{
  "badges": [
    {
      "id": "1",
      "name": "JavaScript Expert",
      "description": "Demonstrated advanced proficiency in JavaScript programming",
      "issuer": "Professional Development Platform",
      "issue_date": "2023-12-01",
      "badge_url": "/assets/images/badges/js-expert.svg",
      "verify_url": "https://verify.example.com/badge/123456",
      "category": "Programming",
      "color": "#f7df1e"
    }
  ],
  "categories": ["Programming", "Cloud", "Design", "Leadership"],
  "total": 1,
  "updated_at": "2024-01-15T10:00:00Z"
}
```

## Frontend Component Architecture

### Data Service Layer
```typescript
// services/dataService.ts
export class DataService {
  private baseUrl = process.env.NEXT_PUBLIC_DATA_BASE_URL || '/data';
  
  async getProfile(): Promise<Profile> {
    const response = await fetch(`${this.baseUrl}/profile.json`);
    return response.json();
  }
  
  async getBlogPosts(): Promise<BlogPostList> {
    const response = await fetch(`${this.baseUrl}/blog/posts.json`);
    return response.json();
  }
  
  async getBlogPost(id: string): Promise<BlogPost> {
    const response = await fetch(`${this.baseUrl}/blog/post-${id}.json`);
    return response.json();
  }
  
  async getCV(): Promise<CV> {
    const response = await fetch(`${this.baseUrl}/cv.json`);
    return response.json();
  }
  
  async getCertificates(): Promise<CertificateList> {
    const response = await fetch(`${this.baseUrl}/certificates.json`);
    return response.json();
  }
  
  async getBadges(): Promise<BadgeList> {
    const response = await fetch(`${this.baseUrl}/badges.json`);
    return response.json();
  }
}
```

### TypeScript Interfaces
```typescript
// types/index.ts
export interface Profile {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  website: string;
  linkedin: string;
  github: string;
  profileImage: string;
  updated_at: string;
}

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
  seo: {
    meta_title: string;
    meta_description: string;
    og_image: string;
  };
}

export interface BlogPostList {
  posts: BlogPost[];
  total: number;
  updated_at: string;
}

// Other interfaces for CV, Certificates, Badges...
```

### Layout Components
- **Layout**: Main application wrapper with header, footer, and content area
- **Navbar**: Navigation header with responsive menu
- **Footer**: Site footer with contact information and links

### UI Components
- **Logo**: Custom logo component
- **ThemeToggle**: Dark/Light mode switcher
- **TypewriterText**: Animated text effect component
- **DataLoader**: Generic component for loading JSON data with error handling

### Page Components
- **Home**: Landing page with hero section (loads profile.json)
- **About**: Personal introduction and skills (loads profile.json)
- **CV**: Professional experience and resume (loads cv.json)
- **Blog**: Blog listing and individual post pages (loads blog/*.json)
- **Certificates**: Certificate showcase (loads certificates.json)
- **Badges**: Achievement badges display (loads badges.json)

## Styling & Theme

### Color Palette
- **Primary Brand**: Orange (`#ff9800` with variants)
- **Background**: Gray scale (50-900)
- **Text**: Contextual based on theme mode

### Typography
- **Font Family**: Inter (sans-serif)
- **Responsive**: Adapts to screen sizes
- **Hierarchy**: Consistent heading and body text scales

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## Development Setup

### Prerequisites
- Node.js 14 or higher
- npm or yarn package manager
- Git for version control

### Development Setup
```bash
cd client
npm install # or yarn install

# Development
npm run dev # or yarn dev

# Production build for S3 deployment
npm run build # or yarn build
npm run export # or yarn export (static files for S3)
```

### Data Management
```bash
# Create data files structure
mkdir -p public/data/blog
mkdir -p public/assets/{cv,images/{profile,certificates,badges,blog},icons}

# Example: Adding a new blog post
# 1. Create individual post file
echo '{"id": "2", "title": "New Post", ...}' > public/data/blog/post-2.json

# 2. Update posts list
# Edit public/data/blog/posts.json to include new post

# 3. Commit changes
git add . && git commit -m "Add new blog post"
```

## Security Considerations

### Data Validation
- JSON schema validation for data integrity
- TypeScript interfaces ensure type safety
- Client-side data validation before rendering
- Error handling for malformed JSON data

## Performance Optimizations

### Frontend
- **Next.js CSR**: Client-side rendering with static export
- **Code Splitting**: Automatic route-based code splitting
- **CDN Distribution**: CloudFront global edge locations
- **Tree Shaking**: Unused code elimination
- **Static Assets**: Optimized for S3 hosting
- **JSON Data Loading**: Direct HTTP requests to static JSON files

### Data Layer
- **Static JSON Files**: No database required
- **File-based Content Management**: Easy editing and version control
- **CDN Cached**: JSON files served through CloudFront
- **Git Version Control**: Track changes to content over time
- **Zero Maintenance**: No database administration needed

## SEO Features

- **Meta Tags**: Dynamic meta tags for each page using React Helmet
- **Client-Side SEO**: Optimized for search engine crawling
- **Structured URLs**: Clean, semantic URL structure with Next.js routing
- **Open Graph**: Social media sharing optimization
- **Static Export**: Pre-built HTML files for better search engine indexing
- **Fast Loading**: CloudFront CDN ensures fast global content delivery

## Future Enhancements

### Planned Features
1. **Enhanced CMS**: Web-based JSON file editor interface
2. **Advanced Search**: Client-side search functionality across all content
3. **Image Gallery**: Optimized image viewing and management
4. **Comments System**: Integration with third-party comment services (Disqus, etc.)
5. **Internationalization**: Multi-language support with JSON-based translations
6. **Analytics Integration**: Google Analytics, traffic and engagement tracking
7. **PWA Support**: Progressive Web App capabilities with offline caching
8. **Content Filtering**: Advanced filtering and categorization features

### Technical Improvements
- **GitHub Actions**: Automated deployment pipeline
- **JSON Schema Validation**: Ensure data integrity for JSON files
- **Content Optimization**: Image compression and optimization
- **Advanced Caching**: Sophisticated CloudFront cache strategies
- **Automated Testing**: JSON data validation and link checking
- **S3 Versioning**: Backup and rollback capabilities
- **Monitoring**: Enhanced CloudWatch metrics and alerts
- **Performance**: Lighthouse score optimization

## Deployment Architecture

### AWS Serverless Architecture (Global)
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   CloudFront    │    │   S3 Bucket     │    │   CloudWatch    │
│   Global CDN    │◄──►│ Static Website  │    │   Monitoring    │
│  Edge Locations │    │  + JSON Data    │    │   Logs & Alerts │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Users         │    │   Git Repo      │    │   AWS CLI       │
│ Worldwide       │    │ Version Control │    │   Deployment    │
│ Fast Access     │    │ Content Mgmt    │    │   Automation    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### AWS Services Configuration
- **Frontend + Data**: S3 Static Website Hosting
- **CDN**: CloudFront Global Distribution (Asia-Pacific optimized)
- **Edge Locations**: Coverage includes Vietnam, Japan, Singapore, South Korea, Australia
- **Monitoring**: CloudWatch (basic metrics)
- **Region**: Flexible (S3 + CloudFront global with Asia focus)
- **No Servers**: Zero EC2, Lambda, or database instances
- **No VPC**: Uses default AWS global infrastructure
- **Version Control**: Git-based content management

## Cost Optimization Strategy

### Estimated Monthly Costs (Global/Tokyo Region)
```
S3 Bucket (Static Website):
- Storage: ~$0.025/GB (minimal for static files + JSON data)
- PUT/COPY/POST/LIST: ~$0.0055 per 1000 requests
- GET/SELECT: ~$0.0004 per 1000 requests
- Estimated: $1-3/month

CloudFront CDN:
- Data Transfer Out: $0.114-0.170/GB (varies by region, Asia-Pacific slightly higher)
- HTTP/HTTPS Requests: $0.0075-0.0120 per 10,000 requests (Asia-Pacific)
- Origin requests (S3): Cached, minimal cost
- Estimated: $3-12/month

Total Estimated Cost: $4-15/month
(93% cost reduction from previous architecture!)
```

### Cost Optimization Features
- **No Server Costs**: Completely serverless, no EC2 instances
- **No Database Costs**: No DynamoDB, RDS, or any managed database
- **No Load Balancer**: No ALB costs ($22/month saved)
- **Free Tier Eligible**: S3 and CloudFront have generous free tiers
- **CDN Caching**: Reduces S3 requests through CloudFront caching
- **Static Files Only**: Ultra-low bandwidth and storage costs
- **Git-based Deployment**: No CI/CD pipeline costs needed
- **Asia-Pacific Optimized**: Fast content delivery to Vietnam, Japan, Singapore
- **Regional Performance**: Edge locations ensure low latency for Asian users

## AWS Deployment Configuration

### S3 Static Website Setup
```bash
# S3 Bucket Configuration
Bucket Name: your-portfolio-blog
Static Website Hosting: Enabled
Index Document: index.html
Error Document: 404.html
Bucket Policy: Public read access via CloudFront only

# Bucket structure
/
├── index.html
├── _next/ (Next.js static files)
├── data/
│   ├── profile.json
│   ├── cv.json
│   ├── certificates.json
│   ├── badges.json
│   └── blog/
│       ├── posts.json
│       └── post-*.json
└── assets/
    ├── images/
    ├── cv/resume.pdf
    └── icons/
```

### CloudFront Configuration
```yaml
Origin:
  DomainName: your-portfolio-blog.s3-website-ap-northeast-1.amazonaws.com
  OriginPath: ""
  CustomOriginConfig:
    HTTPPort: 80
    HTTPSPort: 443
    OriginProtocolPolicy: http-only

DefaultCacheBehavior:
  TargetOriginId: S3Origin
  ViewerProtocolPolicy: redirect-to-https
  CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6 # Managed-CachingOptimized
  Compress: true

CacheBehaviors:
  - PathPattern: "/data/*.json"
    CachePolicyId: 4135ea2d-6df8-44a3-9df3-4b5a84be39ad # Managed-CachingDisabled
    TTL: 0 # No caching for data files to ensure fresh content
  
  - PathPattern: "/assets/*"
    CachePolicyId: 658327ea-f89d-4fab-a63d-7e88639e58f6 # Managed-CachingOptimized
    TTL: 31536000 # 1 year for static assets

PriceClass: PriceClass_200 # Use US, Canada, Europe, Asia, Middle East, Africa
```

### Deployment Script
```bash
#!/bin/bash
# deploy.sh

# Build Next.js static files
cd client
npm run build
npm run export

# Sync to S3
aws s3 sync out/ s3://your-portfolio-blog/ --delete

# Invalidate CloudFront cache for data files
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/data/*" "/index.html"

echo "Deployment completed!"
```

### Environment Variables
```bash
# Frontend (.env.local)
NEXT_PUBLIC_SITE_URL=https://your-cloudfront-domain.cloudfront.net
NEXT_PUBLIC_DATA_BASE_URL=/data
NEXT_PUBLIC_ASSETS_BASE_URL=/assets
NEXT_PUBLIC_ENVIRONMENT=production

# Development (.env.development)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_DATA_BASE_URL=/data
NEXT_PUBLIC_ASSETS_BASE_URL=/assets
NEXT_PUBLIC_ENVIRONMENT=development
```

### Content Management Workflow
```bash
# 1. Edit JSON files locally
vim public/data/blog/post-3.json

# 2. Update posts list
vim public/data/blog/posts.json

# 3. Test locally
npm run dev

# 4. Deploy to production
./deploy.sh

# 5. Verify deployment
curl https://your-cloudfront-domain.cloudfront.net/data/blog/posts.json
```

## Monitoring & Analytics

### CloudWatch Monitoring
- **Website Performance**: Page load times, Core Web Vitals
- **CDN Metrics**: CloudFront cache hit ratio, data transfer
- **User Engagement**: Page views, session duration, bounce rate
- **Error Tracking**: Client-side error monitoring and alerts

### Performance Monitoring
- **Frontend Performance**: Lighthouse scores, Web Vitals tracking
- **CDN Performance**: CloudFront cache efficiency and response times
- **Content Delivery**: S3 access patterns and optimization opportunities
- **User Experience**: Real User Monitoring (RUM) metrics

### User Analytics
- **Traffic Analysis**: CloudFront access logs and user patterns
- **Content Analytics**: Most popular blog posts and pages
- **User Behavior**: Navigation patterns and engagement metrics
- **Conversion Tracking**: Goal completion and user journey analysis

### Cost Monitoring
- **AWS Cost Explorer**: Track S3 and CloudFront usage
- **Budget Alerts**: Automated notifications for cost overruns
- **Usage Reports**: Monthly breakdown of storage and bandwidth
- **Optimization Recommendations**: Cost-saving opportunities

This specification provides a comprehensive overview of the completely client-side rendered portfolio blog project, featuring a serverless architecture with maximum cost efficiency and easy content management through static JSON files. 