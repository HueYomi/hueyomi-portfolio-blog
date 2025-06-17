'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Box } from '@chakra-ui/react'
import { AboutPageSkeleton, CVPageSkeleton, HomePageSkeleton } from '@/components/ui/InstantSkeleton'

interface NavigationContextType {
  isNavigating: boolean
  targetPath: string | null
  startNavigation: (path: string) => void
  finishNavigation: () => void
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined)

export function useNavigationContext() {
  const context = useContext(NavigationContext)
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider')
  }
  return context
}

interface NavigationProviderProps {
  children: React.ReactNode
}

export function NavigationProvider({ children }: NavigationProviderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [isNavigating, setIsNavigating] = useState(false)
  const [targetPath, setTargetPath] = useState<string | null>(null)
  const [showSkeleton, setShowSkeleton] = useState(false)

  const startNavigation = useCallback((path: string) => {
    if (path === pathname) return // Don't show loading for same page
    
    setIsNavigating(true)
    setTargetPath(path)
    
    // Only show skeleton after a short delay (for slow navigation)
    const skeletonTimer = setTimeout(() => {
      setShowSkeleton(true)
    }, 500) // Show skeleton only if navigation takes longer than 200ms
    
    // Store timer to clear it if navigation completes quickly
    ;(window as any).__navigationSkeletonTimer = skeletonTimer
    
    router.push(path)
  }, [router, pathname])

  const finishNavigation = useCallback(() => {
    // Clear skeleton timer if navigation was fast
    if ((window as any).__navigationSkeletonTimer) {
      clearTimeout((window as any).__navigationSkeletonTimer)
      delete (window as any).__navigationSkeletonTimer
    }
    
    setIsNavigating(false)
    setTargetPath(null)
    setShowSkeleton(false)
  }, [])

  // Auto-finish navigation when pathname changes
  useEffect(() => {
    if (isNavigating && targetPath && pathname === targetPath) {
      // Small delay to let the page start rendering
      const timer = setTimeout(() => {
        setIsNavigating(false)
        setTargetPath(null)
        setShowSkeleton(false)
      }, 100) // Reduced delay for faster cleanup
      return () => clearTimeout(timer)
    }
  }, [pathname, targetPath, isNavigating])

  // Get appropriate skeleton based on target path
  const getSkeletonForPath = (path: string) => {
    switch (path) {
      case '/':
        return <HomePageSkeleton />
      case '/about':
        return <AboutPageSkeleton />
      case '/cv':
        return <CVPageSkeleton />
      default:
        return <HomePageSkeleton />
    }
  }

  return (
    <NavigationContext.Provider value={{
      isNavigating,
      targetPath,
      startNavigation,
      finishNavigation
    }}>
      {children}
      
      {/* Navigation Loading Overlay with Page-specific Skeleton - Only for slow navigation */}
      {isNavigating && targetPath && showSkeleton && (
        <Box
          position="fixed"
          top="60px" // Below header
          left={0}
          right={0}
          bottom={0}
          bg="rgba(255, 255, 255, 0.98)"
          _dark={{ bg: 'rgba(26, 32, 44, 0.98)' }}
          backdropFilter="blur(4px)"
          zIndex={9998}
          overflowY="auto"
        >
          {getSkeletonForPath(targetPath)}
        </Box>
      )}
    </NavigationContext.Provider>
  )
} 