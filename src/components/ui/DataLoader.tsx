'use client';

import React from 'react';
import { Box, Spinner, Alert, AlertIcon, Button, VStack, Text } from '@chakra-ui/react';
import { LoadingState } from '@/types';

interface DataLoaderProps {
  loading: LoadingState;
  error: string | null;
  children: React.ReactNode;
  onRetry?: () => void;
  loadingComponent?: React.ReactNode;
  errorComponent?: React.ReactNode;
  emptyComponent?: React.ReactNode;
  isEmpty?: boolean;
}

/**
 * Generic component for handling data loading states
 * Displays loading spinner, error messages, or children based on state
 */
export const DataLoader: React.FC<DataLoaderProps> = ({
  loading,
  error,
  children,
  onRetry,
  loadingComponent,
  errorComponent,
  emptyComponent,
  isEmpty = false,
}) => {
  // Loading state
  if (loading === 'loading') {
    if (loadingComponent) {
      return <>{loadingComponent}</>;
    }
    
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
        flexDirection="column"
        gap={4}
      >
        <Spinner size="lg" color="orange.500" thickness="4px" />
        <Text color="gray.600">Loading...</Text>
      </Box>
    );
  }

  // Error state
  if (loading === 'error' && error) {
    if (errorComponent) {
      return <>{errorComponent}</>;
    }
    
    return (
      <Alert status="error" borderRadius="md">
        <AlertIcon />
        <VStack align="start" spacing={2} flex={1}>
          <Text fontWeight="medium">Failed to load data</Text>
          <Text fontSize="sm" color="gray.600">{error}</Text>
          {onRetry && (
            <Button size="sm" colorScheme="red" variant="outline" onClick={onRetry}>
              Try Again
            </Button>
          )}
        </VStack>
      </Alert>
    );
  }

  // Empty state
  if (loading === 'success' && isEmpty) {
    if (emptyComponent) {
      return <>{emptyComponent}</>;
    }
    
    return (
      <Box 
        textAlign="center" 
        py={8}
        color="gray.500"
      >
        <Text fontSize="lg" fontWeight="medium">No data available</Text>
        <Text fontSize="sm">There's nothing to display at the moment.</Text>
      </Box>
    );
  }

  // Success state - render children
  if (loading === 'success') {
    return <>{children}</>;
  }

  // Idle state - render nothing or loading
  return null;
};

/**
 * Skeleton loader component for better UX
 */
export const SkeletonLoader: React.FC<{ 
  lines?: number; 
  height?: string;
  spacing?: number;
}> = ({ 
  lines = 3, 
  height = "20px",
  spacing = 3 
}) => {
  return (
    <VStack spacing={spacing} align="stretch">
      {Array.from({ length: lines }).map((_, index) => (
        <Box
          key={index}
          height={height}
          bg="gray.200"
          borderRadius="md"
          animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          sx={{
            '@keyframes pulse': {
              '0%, 100%': {
                opacity: 1,
              },
              '50%': {
                opacity: 0.5,
              },
            },
          }}
        />
      ))}
    </VStack>
  );
};

/**
 * Card skeleton for blog posts, certificates, etc.
 */
export const CardSkeleton: React.FC<{
  showImage?: boolean;
  imageHeight?: string;
}> = ({ 
  showImage = true, 
  imageHeight = "200px" 
}) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      shadow="sm"
    >
      {showImage && (
        <Box
          height={imageHeight}
          bg="gray.200"
          animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
        />
      )}
      <Box p={6}>
        <VStack spacing={3} align="stretch">
          <Box
            height="24px"
            bg="gray.200"
            borderRadius="md"
            animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          />
          <Box
            height="16px"
            bg="gray.200"
            borderRadius="md"
            width="60%"
            animation="pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
          />
          <SkeletonLoader lines={2} height="14px" />
        </VStack>
      </Box>
    </Box>
  );
};

/**
 * Grid of card skeletons
 */
export const CardSkeletonGrid: React.FC<{
  count?: number;
  columns?: number;
  showImage?: boolean;
}> = ({ 
  count = 6, 
  columns = 3,
  showImage = true 
}) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        base: "1fr",
        md: `repeat(${Math.min(columns, 2)}, 1fr)`,
        lg: `repeat(${columns}, 1fr)`,
      }}
      gap={6}
    >
      {Array.from({ length: count }).map((_, index) => (
        <CardSkeleton key={index} showImage={showImage} />
      ))}
    </Box>
  );
};

export default DataLoader; 