# JSON Data Structure Documentation

This document describes the JSON data structure used in the portfolio blog application.

## Overview

The application uses static JSON files to store all content data, eliminating the need for a backend database. This approach provides:

- **Zero server costs** - No database hosting required
- **Fast performance** - Direct file access via CDN
- **Easy content management** - Edit JSON files directly
- **Version control** - Track content changes with Git
- **Deployment simplicity** - Static files only

## Directory Structure

```
public/
├── data/
│   ├── profile.json          # Personal profile information
│   ├── cv.json              # CV/Resume data
│   ├── certificates.json    # Professional certificates
│   ├── badges.json          # Achievement badges
│   └── blog/
│       ├── posts.json       # Blog posts list
│       ├── post-1.json      # Individual blog posts
│       ├── post-2.json
│       └── ...
├── assets/
│   ├── cv/
│   │   └── resume.pdf       # Downloadable CV
│   ├── images/
│   │   ├── profile.jpg      # Profile image
│   │   ├── certificates/    # Certificate images
│   │   ├── badges/          # Badge images
│   │   └── blog/            # Blog post images
│   └── icons/               # Application icons
```

## Data Files

### 1. Profile Data (`profile.json`)

Contains personal information and profile details.

```json
{
  "name": "Your Name",
  "title": "Your Job Title",
  "email": "your.email@example.com",
  "phone": "+81-xxx-xxxx-xxxx",
  "location": "Tokyo, Japan",
  "summary": "Professional summary...",
  "website": "https://yourwebsite.com",
  "linkedin": "https://linkedin.com/in/yourprofile",
  "github": "https://github.com/yourusername",
  "profileImage": "/assets/images/profile.jpg",
  "typewriterTexts": [
    "Full Stack Developer",
    "React Specialist",
    "Cloud Architect"
  ],
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### 2. CV Data (`cv.json`)

Comprehensive resume/CV information.

```json
{
  "personal_info": {
    "name": "Your Name",
    "title": "Your Job Title",
    "email": "your.email@example.com",
    "phone": "+81-xxx-xxxx-xxxx",
    "location": "Tokyo, Japan",
    "summary": "Professional summary..."
  },
  "work_experience": [
    {
      "company": "Company Name",
      "position": "Job Title",
      "start_date": "2022-01-01",
      "end_date": null,
      "current": true,
      "description": "Job description...",
      "technologies": ["React", "Node.js", "AWS"],
      "achievements": [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ],
  "education": [
    {
      "institution": "University Name",
      "degree": "Degree Name",
      "start_date": "2018-04-01",
      "end_date": "2022-03-31",
      "gpa": "3.8/4.0",
      "honors": ["Dean's List"],
      "relevant_coursework": ["Course 1", "Course 2"]
    }
  ],
  "skills": [
    {
      "category": "Frontend",
      "items": [
        {"name": "React", "level": 95},
        {"name": "TypeScript", "level": 90}
      ]
    }
  ],
  "languages": [
    {"language": "English", "level": "Fluent"},
    {"language": "Japanese", "level": "Conversational"}
  ],
  "download_url": "/assets/cv/resume.pdf",
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### 3. Blog Posts (`blog/posts.json`)

List of all blog posts with metadata.

```json
{
  "posts": [
    {
      "id": "1",
      "title": "Blog Post Title",
      "summary": "Brief description...",
      "author": "Your Name",
      "created_at": "2024-01-15T10:00:00Z",
      "updated_at": "2024-01-15T10:00:00Z",
      "tags": ["tag1", "tag2"],
      "published": true,
      "featured_image": "/assets/images/blog/post-image.jpg",
      "read_time": "5 min read",
      "category": "Tutorial"
    }
  ],
  "total": 1,
  "categories": ["Tutorial", "Development"],
  "tags": ["react", "javascript", "typescript"],
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### 4. Individual Blog Post (`blog/post-{id}.json`)

Full blog post content with SEO metadata.

```json
{
  "id": "1",
  "title": "Blog Post Title",
  "content": "# Blog Post Title\n\nFull markdown content...",
  "summary": "Brief description...",
  "author": "Your Name",
  "created_at": "2024-01-15T10:00:00Z",
  "updated_at": "2024-01-15T10:00:00Z",
  "tags": ["tag1", "tag2"],
  "published": true,
  "featured_image": "/assets/images/blog/post-image.jpg",
  "read_time": "5 min read",
  "category": "Tutorial",
  "seo": {
    "meta_title": "SEO optimized title",
    "meta_description": "SEO description",
    "og_image": "/assets/images/blog/post-og-image.jpg"
  }
}
```

### 5. Certificates (`certificates.json`)

Professional certifications and credentials.

```json
{
  "certificates": [
    {
      "id": "1",
      "name": "Certificate Name",
      "issuer": "Issuing Organization",
      "issue_date": "2023-06-15",
      "expiry_date": "2026-06-15",
      "credential_id": "CERT-123456",
      "credential_url": "https://verify.example.com/123456",
      "description": "Certificate description...",
      "certificate_image": "/assets/images/certificates/cert.jpg",
      "badge_image": "/assets/images/certificates/badge.png",
      "skills": ["Skill 1", "Skill 2"]
    }
  ],
  "total": 1,
  "updated_at": "2024-01-15T10:00:00Z"
}
```

### 6. Badges (`badges.json`)

Achievement badges and professional accomplishments.

```json
{
  "badges": [
    {
      "id": "1",
      "name": "Badge Name",
      "description": "Badge description...",
      "issuer": "Issuing Platform",
      "issue_date": "2023-12-01",
      "badge_url": "/assets/images/badges/badge.svg",
      "verify_url": "https://verify.example.com/badge/123456",
      "category": "Programming",
      "color": "#f7df1e"
    }
  ],
  "categories": ["Programming", "Cloud", "Design"],
  "total": 1,
  "updated_at": "2024-01-15T10:00:00Z"
}
```

## Usage with TypeScript

The application includes comprehensive TypeScript interfaces for all data types:

```typescript
import { dataService } from '@/services/dataService';
import { useProfile, useBlogPosts } from '@/hooks/useData';

// Using the data service directly
const profile = await dataService.getProfile();
const blogPosts = await dataService.getBlogPosts();

// Using React hooks
function MyComponent() {
  const { data: profile, loading, error } = useProfile();
  const { data: posts } = useBlogPosts();
  
  // Component logic...
}
```

## Content Management

### Adding a New Blog Post

1. **Create the post file**: `public/data/blog/post-{id}.json`
2. **Update the posts list**: Add entry to `public/data/blog/posts.json`
3. **Add images**: Place images in `public/assets/images/blog/`
4. **Commit changes**: Use Git to track content changes

### Updating Profile Information

1. **Edit profile data**: Modify `public/data/profile.json`
2. **Update images**: Replace files in `public/assets/images/`
3. **Update timestamp**: Set `updated_at` to current date

### Managing Certificates and Badges

1. **Add new entries**: Append to respective JSON arrays
2. **Upload images**: Add certificate/badge images to assets
3. **Update totals**: Increment the `total` count
4. **Set expiration**: Use `null` for non-expiring certificates

## Best Practices

### Data Validation

- Use the `dataService.validateData()` method to check data integrity
- Ensure all referenced image files exist
- Validate JSON syntax before deployment

### Performance Optimization

- Keep individual JSON files under 1MB
- Optimize images (WebP format recommended)
- Use appropriate cache headers for production

### SEO Optimization

- Include complete SEO metadata for blog posts
- Use descriptive file names for images
- Maintain consistent URL structure

### Content Organization

- Use consistent date formats (ISO 8601)
- Maintain alphabetical order in arrays where applicable
- Include all required fields as per TypeScript interfaces

## Deployment

The JSON files are served as static assets and cached by CDN:

```bash
# Build and deploy
npm run build
npm run export

# Upload to S3 or hosting provider
aws s3 sync ./out s3://your-bucket-name
```

## Environment Variables

Configure the data source URL:

```env
# Development (default: /data)
NEXT_PUBLIC_DATA_BASE_URL=/data

# Production (CDN URL)
NEXT_PUBLIC_DATA_BASE_URL=https://your-cdn.cloudfront.net/data
```

This data structure provides a flexible, maintainable, and cost-effective solution for content management in the portfolio blog application. 