# Portfolio Blog - Design Specification for Figma

## Design Overview

This document outlines the complete design specification for the Portfolio Blog application, providing detailed guidelines for creating a modern, professional, and responsive design system in Figma.

## Design System

### Color Palette

#### Primary Brand Colors
```
Primary Orange:
- 50:  #fff8f0  (Lightest tint)
- 100: #ffe0b2  (Very light)
- 200: #ffcc80  (Light)
- 300: #ffb74d  (Medium light)
- 400: #ffa726  (Medium)
- 500: #ff9800  (Primary - Main brand color)
- 600: #fb8c00  (Medium dark)
- 700: #f57c00  (Dark)
- 800: #ef6c00  (Darker)
- 900: #e65100  (Darkest)
```

#### Neutral Colors
```
Gray Scale:
- 50:  #f9f9f9  (Background light)
- 100: #f0f0f0  (Very light gray)
- 200: #e0e0e0  (Light gray)
- 300: #c0c0c0  (Medium light gray)
- 400: #a0a0a0  (Medium gray)
- 500: #808080  (Medium)
- 600: #606060  (Medium dark)
- 700: #404040  (Dark gray)
- 800: #262626  (Very dark - Dark mode bg)
- 900: #1a1a1a  (Darkest)
```

#### Semantic Colors
```
Success: #22c55e (Green)
Warning: #f59e0b (Amber)
Error: #ef4444 (Red)
Info: #3b82f6 (Blue)
```

### Typography

#### Font Family
- **Primary**: Inter (sans-serif)
- **Fallback**: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

#### Font Weights
- Light: 300
- Regular: 400
- Medium: 500
- Semibold: 600
- Bold: 700

#### Typography Scale
```
Display Large: 48px / 52px (Mobile: 32px / 36px)
Display Medium: 40px / 44px (Mobile: 28px / 32px)
Heading 1: 32px / 36px (Mobile: 24px / 28px)
Heading 2: 28px / 32px (Mobile: 20px / 24px)
Heading 3: 24px / 28px (Mobile: 18px / 22px)
Heading 4: 20px / 24px (Mobile: 16px / 20px)
Body Large: 18px / 28px
Body Medium: 16px / 24px
Body Small: 14px / 20px
Caption: 12px / 16px
```

### Spacing System

#### Base Unit: 4px
```
4px  - xs (Extra small)
8px  - sm (Small)
12px - md (Medium)
16px - lg (Large)
24px - xl (Extra large)
32px - 2xl
48px - 3xl
64px - 4xl
96px - 5xl
128px - 6xl
```

### Border Radius
```
None: 0px
Small: 4px
Medium: 8px
Large: 12px
XLarge: 16px
Full: 9999px (Pills/Circles)
```

### Shadows
```
Small: 0 1px 2px rgba(0, 0, 0, 0.05)
Medium: 0 4px 6px rgba(0, 0, 0, 0.07)
Large: 0 10px 15px rgba(0, 0, 0, 0.1)
XLarge: 0 20px 25px rgba(0, 0, 0, 0.15)
```

## Layout Specifications

### Breakpoints
```
Mobile: 320px - 767px
Tablet: 768px - 1023px
Desktop: 1024px - 1439px
Large Desktop: 1440px+
```

### Container Widths
```
Mobile: 100% (16px padding)
Tablet: 100% (24px padding)
Desktop: 1200px (32px padding)
Large Desktop: 1400px (32px padding)
```

### Grid System
- **Desktop**: 12-column grid, 24px gutter
- **Tablet**: 8-column grid, 16px gutter
- **Mobile**: 4-column grid, 12px gutter

## Component Specifications

### Navigation Header
```
Height: 80px
Background: White (Light) / Gray 800 (Dark)
Shadow: Medium shadow
Sticky: Top position
```

**Elements:**
- Logo (Left): 40px height
- Navigation Menu (Center): Horizontal list
- Theme Toggle (Right): 32px icon button
- Mobile Menu Button (Right): 32px hamburger icon

### Hero Section
```
Height: 600px (Desktop) / 400px (Mobile)
Background: Gradient from Primary 500 to Primary 700
Text Color: White
```

**Elements:**
- Profile Image: 200px circle (Desktop) / 120px (Mobile)
- Name: Display Large
- Title: Heading 2
- Typewriter Text: Body Large
- CTA Button: Primary button, 48px height

### Content Cards
```
Background: White (Light) / Gray 700 (Dark)
Border Radius: Large (12px)
Shadow: Medium
Padding: 24px
Margin Bottom: 24px
```

**Variants:**
- Blog Post Card
- Certificate Card
- Badge Card
- Project Card

### Buttons

#### Primary Button
```
Background: Primary 500
Text: White
Height: 48px (Desktop) / 44px (Mobile)
Padding: 12px 24px
Border Radius: Medium (8px)
Font Weight: Medium
```

**States:**
- Hover: Primary 600
- Active: Primary 700
- Disabled: Gray 300

#### Secondary Button
```
Background: Transparent
Border: 2px solid Primary 500
Text: Primary 500
Height: 48px (Desktop) / 44px (Mobile)
Padding: 12px 24px
Border Radius: Medium (8px)
```

#### Ghost Button
```
Background: Transparent
Text: Primary 500
Height: 48px (Desktop) / 44px (Mobile)
Padding: 12px 24px
Border Radius: Medium (8px)
```

### Forms

#### Input Fields
```
Height: 48px
Border: 1px solid Gray 300
Border Radius: Medium (8px)
Padding: 12px 16px
Background: White (Light) / Gray 700 (Dark)
```

**States:**
- Focus: Border Primary 500, Shadow Primary 100
- Error: Border Error 500
- Disabled: Background Gray 100

### Footer
```
Background: Gray 800 (Light) / Gray 900 (Dark)
Text Color: Gray 300
Padding: 48px 0
```

**Elements:**
- Contact Information
- Social Media Links
- Copyright Notice

## Page Layouts

### Home Page Layout

#### Desktop Layout
```
1. Navigation Header (80px height)
2. Hero Section (600px height)
   - Profile image, name, title, typewriter text
   - CTA buttons
3. Features Section (400px height)
   - 3-column grid of feature cards
4. Recent Blog Posts (Variable height)
   - 2-column grid of blog post cards
5. Footer (200px height)
```

#### Mobile Layout
```
1. Navigation Header (80px height)
2. Hero Section (400px height)
   - Centered content, smaller image
3. Features Section (Variable height)
   - Single column stack
4. Recent Blog Posts (Variable height)
   - Single column stack
5. Footer (250px height)
```

### About Page Layout

#### Content Structure
```
1. Page Header
   - Page title (Heading 1)
   - Subtitle (Body Large)
2. Personal Introduction
   - Profile image (Left)
   - About text (Right)
3. Skills Section
   - Skill categories with progress bars
4. Experience Timeline
   - Vertical timeline with experience items
```

### CV Page Layout

#### Sections
```
1. Personal Information Card
2. Work Experience Section
   - Timeline layout
   - Job cards with details
3. Education Section
   - Educational institution cards
4. Skills Matrix
   - Categorized skill tags
5. Download CV Button
   - Prominent CTA button
```

### Blog Page Layout

#### Blog Listing
```
1. Page Header with title
2. Blog Post Grid
   - 2-column on desktop
   - 1-column on mobile
3. Pagination
4. Search/Filter (Future enhancement)
```

#### Individual Blog Post
```
1. Post Header
   - Title, date, author, tags
2. Featured Image
3. Post Content
   - Markdown formatted content
4. Navigation
   - Previous/Next post links
5. Comments Section (Future)
```

### Certificates Page Layout
```
1. Page Header
2. Certificate Grid
   - 3-column on desktop
   - 2-column on tablet
   - 1-column on mobile
3. Certificate Modal (on click)
   - Enlarged certificate view
   - Verification details
```

### Badges Page Layout
```
1. Page Header
2. Badge Grid
   - 4-column on desktop
   - 3-column on tablet
   - 2-column on mobile
3. Badge Categories Filter
4. Badge Detail Modal
```

## Responsive Design Guidelines

### Mobile-First Approach
1. Design for mobile screens first
2. Progressive enhancement for larger screens
3. Touch-friendly interface elements
4. Optimized content hierarchy

### Key Responsive Considerations
- Navigation converts to hamburger menu on mobile
- Hero section content stacks vertically on mobile
- Grid layouts collapse to single columns
- Typography scales down appropriately
- Touch targets minimum 44px
- Adequate spacing for thumb navigation

## Accessibility Guidelines

### Color Contrast
- AA Compliance: 4.5:1 for normal text
- AAA Compliance: 7:1 for normal text
- Large text: 3:1 minimum ratio

### Focus States
- Visible focus indicators for all interactive elements
- Focus trap for modals and dropdowns
- Logical tab order

### Semantic Structure
- Proper heading hierarchy (H1-H6)
- Alt text for all images
- ARIA labels for complex components
- Descriptive link text

## Animation Guidelines

### Micro-interactions
```
Hover Effects:
- Duration: 200ms
- Easing: ease-out
- Properties: background-color, transform, opacity

Page Transitions:
- Duration: 300ms
- Easing: ease-in-out
- Fade in/out effects

Loading States:
- Skeleton screens
- Progress indicators
- Spinner animations
```

### Typewriter Effect
```
- Character by character typing
- Cursor blinking animation
- Multiple text rotation
- Smooth transitions between texts
```

## Dark Mode Specifications

### Color Adaptations
```
Background: Gray 800 → Gray 900
Surface: White → Gray 700
Text Primary: Gray 900 → White
Text Secondary: Gray 600 → Gray 300
Border: Gray 300 → Gray 600
```

### Implementation
- System preference detection
- Manual toggle option
- Persistent user preference
- Smooth transition animations

## Figma File Structure

### Recommended Page Organization
```
1. 🎨 Design System
   - Colors
   - Typography
   - Components
   - Icons

2. 📱 Mobile Designs
   - Home
   - About
   - CV
   - Blog
   - Certificates
   - Badges

3. 💻 Desktop Designs
   - Home
   - About
   - CV
   - Blog
   - Certificates
   - Badges

4. 🌙 Dark Mode
   - Mobile variants
   - Desktop variants

5. 🔄 Interactive States
   - Hover states
   - Active states
   - Loading states
   - Error states
```

### Component Library Structure
```
Navigation/
├── Header
├── Mobile Menu
└── Footer

Cards/
├── Blog Post Card
├── Certificate Card
├── Badge Card
└── Project Card

Forms/
├── Input Fields
├── Buttons
├── Checkboxes
└── Radio Buttons

Feedback/
├── Alerts
├── Loading States
└── Error Messages
```

## Design Deliverables

### Phase 1: Core Design System
- [ ] Color palette definition
- [ ] Typography system
- [ ] Component library
- [ ] Icon set

### Phase 2: Page Designs
- [ ] Home page (Desktop + Mobile)
- [ ] About page (Desktop + Mobile)
- [ ] CV page (Desktop + Mobile)
- [ ] Blog pages (Desktop + Mobile)

### Phase 3: Enhanced Features
- [ ] Dark mode variants
- [ ] Interactive states
- [ ] Animation specifications
- [ ] Responsive breakpoints

### Phase 4: Handoff Assets
- [ ] Developer handoff specs
- [ ] Asset exports
- [ ] Prototype interactions
- [ ] Design documentation

This specification provides a comprehensive foundation for creating a professional, modern, and user-friendly portfolio blog design in Figma. 