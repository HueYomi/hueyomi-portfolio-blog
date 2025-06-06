# Issue #0: Initialize Next.js Source Code

**Priority: High | Estimated: 2-3 hours**

## Description
Initialize the Next.js project structure and set up the basic foundation for the portfolio blog application. This is the foundational step that must be completed before all other issues.

## Tasks
- [ ] Initialize Next.js project with TypeScript
- [ ] Set up project directory structure
- [ ] Install required dependencies (Chakra UI, React Icons, Framer Motion, etc.)
- [ ] Configure initial TypeScript configuration
- [ ] Set up basic layout components
- [ ] Create initial pages structure
- [ ] Configure ESLint and Prettier
- [ ] Set up basic routing structure
- [ ] Create initial components directory
- [ ] Set up styles and theme configuration

## Files to Create
- `package.json` with all required dependencies
- `tsconfig.json` for TypeScript configuration
- `next.config.js` for Next.js configuration
- `pages/_app.tsx` - App wrapper
- `pages/_document.tsx` - Document configuration
- `pages/index.tsx` - Homepage
- `components/Layout.tsx` - Main layout
- `styles/` directory for styling
- `public/` directory for static assets
- `types/` directory for TypeScript types

## Dependencies to Install
```json
{
  "dependencies": {
    "next": "15.2.4",
    "@chakra-ui/react": "2.8.2",
    "@chakra-ui/icons": "2.1.1",
    "@emotion/react": "^11",
    "@emotion/styled": "^11",
    "framer-motion": "11.0.5",
    "react": "^18",
    "react-dom": "^18",
    "react-icons": "5.0.1",
    "axios": "1.6.7"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.2.4"
  }
}
```

## Acceptance Criteria
- [ ] Next.js project initialized successfully
- [ ] TypeScript configuration working
- [ ] All required dependencies installed
- [ ] Basic project structure created
- [ ] Development server runs without errors
- [ ] Basic layout and routing working
- [ ] Code quality tools (ESLint) configured
- [ ] Project ready for feature development

## Labels
- `Phase 0`
- `priority: high`
- `nextjs`
- `setup`
- `initialization`
- `typescript`
- `configuration`
- `enhancement`
- `roadmap` 