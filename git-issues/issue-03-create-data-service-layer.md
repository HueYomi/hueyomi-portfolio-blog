# Issue #3: Create Data Service Layer

**Priority: High | Estimated: 2-3 hours**

## Description
Create a centralized service for loading JSON data with error handling and caching.

## Tasks
- [ ] Create `services/dataService.ts`
- [ ] Implement async methods for each data type
- [ ] Add error handling for failed requests
- [ ] Add loading states management
- [ ] Implement basic caching mechanism
- [ ] Add environment variable support

## Files to Create/Modify
- `services/dataService.ts` (new)
- Add environment variables for data URLs

## Acceptance Criteria
- [ ] DataService class with all required methods
- [ ] Proper error handling for network failures
- [ ] Loading states for better UX
- [ ] Environment variable configuration
- [ ] TypeScript types for all methods

## Labels
- `Phase 1`
- `priority: high`
- `services`
- `data-loading` 