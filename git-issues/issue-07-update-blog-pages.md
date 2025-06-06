# Issue #7: Update Blog Pages

**Priority: High | Estimated: 4-6 hours**

## Description
Refactor blog listing and individual post pages to use JSON data with markdown support.

## Tasks
- [ ] Update blog listing page to load from `blog/posts.json`
- [ ] Create dynamic route for individual posts
- [ ] Implement markdown rendering for post content
- [ ] Add blog post filtering by tags
- [ ] Implement search functionality
- [ ] Add pagination support
- [ ] Update SEO for individual posts

## Files to Modify
- `pages/blog/index.tsx` (if exists)
- `pages/blog/[id].tsx` (create dynamic route)
- Add markdown rendering library

## Acceptance Criteria
- [ ] Blog listing shows all published posts
- [ ] Individual post pages load correctly
- [ ] Markdown content renders properly
- [ ] Tag filtering works
- [ ] Search functionality implemented
- [ ] SEO optimized for each post

## Labels
- `Phase 2`
- `priority: high`
- `components`
- `blog` 