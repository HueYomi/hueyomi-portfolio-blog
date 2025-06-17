import { useRouter } from 'next/navigation'
import { useState, useCallback } from 'react'

interface NavigationState {
  isNavigating: boolean
  targetPath: string | null
}

export function useNavigation() {
  const router = useRouter()
  const [navigationState, setNavigationState] = useState<NavigationState>({
    isNavigating: false,
    targetPath: null
  })

  const navigateTo = useCallback((path: string) => {
    // Set loading state immediately
    setNavigationState({
      isNavigating: true,
      targetPath: path
    })

    // Navigate to the page
    router.push(path)

    // Clear loading state after a short delay to allow page to start loading
    setTimeout(() => {
      setNavigationState({
        isNavigating: false,
        targetPath: null
      })
    }, 100)
  }, [router])

  const navigateWithLoading = useCallback((path: string, onStart?: () => void) => {
    onStart?.()
    navigateTo(path)
  }, [navigateTo])

  return {
    ...navigationState,
    navigateTo,
    navigateWithLoading
  }
} 