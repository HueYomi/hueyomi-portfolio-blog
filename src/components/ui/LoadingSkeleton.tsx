'use client';

import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle,
  SimpleGrid,
  Card,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';

// Basic skeleton loader
export const BasicSkeleton: React.FC<{
  lines?: number;
  height?: string;
  spacing?: number;
}> = ({ lines = 3, height = '20px', spacing = 3 }) => {
  return (
    <VStack spacing={spacing} align="stretch">
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton key={index} height={height} borderRadius="md" />
      ))}
    </VStack>
  );
};

// Profile skeleton for About page
export const ProfileSkeleton: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <VStack spacing={8} align="stretch">
      {/* Hero Section Skeleton */}
      <Card bg={cardBg} shadow="xl" borderRadius="2xl">
        <CardBody p={0}>
          <HStack spacing={0} align="stretch" minH="500px">
            {/* Profile Image Side */}
            <Box flex="1" bg="orange.400" p={8} display="flex" alignItems="center" justifyContent="center">
              <VStack spacing={6} textAlign="center">
                <SkeletonCircle size="150px" />
                <VStack spacing={4}>
                  <Skeleton height="40px" width="200px" />
                  <Skeleton height="24px" width="150px" />
                </VStack>
              </VStack>
            </Box>
            
            {/* Content Side */}
            <Box flex="1" p={8}>
              <VStack align="stretch" spacing={6} h="full" justify="center">
                <SkeletonText noOfLines={4} spacing={4} />
                <VStack align="start" spacing={3}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <HStack key={i} spacing={3}>
                      <SkeletonCircle size="20px" />
                      <Skeleton height="16px" width="150px" />
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </HStack>
        </CardBody>
      </Card>

      {/* Journey Section Skeleton */}
      <Card bg={cardBg} shadow="lg" borderRadius="xl">
        <CardBody p={8}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Skeleton height="40px" width="300px" mx="auto" mb={4} />
              <Skeleton height="20px" width="400px" mx="auto" />
            </Box>
            
            <VStack spacing={6} align="stretch">
              {[1, 2, 3, 4, 5].map((i) => (
                <Card key={i} borderRadius="lg">
                  <CardBody p={6}>
                    <HStack align="center" gap={4}>
                      <SkeletonCircle size="50px" />
                      <Box flex="1">
                        <Skeleton height="24px" width="200px" mb={2} />
                        <SkeletonText noOfLines={2} spacing={2} />
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Hobbies Section Skeleton */}
      <Card bg={cardBg} shadow="lg" borderRadius="xl">
        <CardBody p={8}>
          <VStack spacing={8} align="stretch">
            <Box textAlign="center">
              <Skeleton height="40px" width="350px" mx="auto" mb={4} />
              <Skeleton height="20px" width="450px" mx="auto" />
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} borderRadius="lg">
                  <CardBody p={6}>
                    <HStack align="start" spacing={4}>
                      <SkeletonCircle size="40px" />
                      <Box flex="1">
                        <Skeleton height="20px" width="120px" mb={2} />
                        <SkeletonText noOfLines={3} spacing={2} />
                      </Box>
                    </HStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

// CV skeleton for CV page
export const CVSkeleton: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <VStack spacing={5} align="stretch">
      {/* Hero Section Skeleton */}
      <Card bg={cardBg} shadow="xl" borderRadius="2xl">
        <CardBody p={0}>
          <HStack spacing={0} align="stretch" minH="350px">
            {/* Profile Side */}
            <Box flex="1" bg="orange.400" p={6} display="flex" alignItems="center" justifyContent="center">
              <VStack spacing={6} textAlign="center">
                <SkeletonCircle size="120px" />
                <VStack spacing={4}>
                  <Skeleton height="32px" width="180px" />
                  <Skeleton height="20px" width="120px" />
                </VStack>
              </VStack>
            </Box>
            
            {/* Content Side */}
            <Box flex="1" p={6}>
              <VStack align="stretch" spacing={4} h="full" justify="center">
                <SkeletonText noOfLines={3} spacing={3} />
                <VStack align="start" spacing={2}>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <HStack key={i} spacing={3}>
                      <SkeletonCircle size="16px" />
                      <Skeleton height="14px" width="140px" />
                    </HStack>
                  ))}
                </VStack>
              </VStack>
            </Box>
          </HStack>
        </CardBody>
      </Card>

      {/* Work Experience Skeleton */}
      <Card bg={cardBg} shadow="lg" borderRadius="xl">
        <CardBody p={6}>
          <VStack spacing={4} align="stretch">
            <Box textAlign="center">
              <Skeleton height="24px" width="200px" mx="auto" mb={2} />
              <Skeleton height="16px" width="300px" mx="auto" />
            </Box>
            
            <VStack spacing={2} align="stretch">
              {[1, 2, 3].map((i) => (
                <Card key={i} borderRadius="lg">
                  <CardBody p={4}>
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between" align="start">
                        <VStack align="start" spacing={1}>
                          <Skeleton height="20px" width="180px" />
                          <Skeleton height="16px" width="150px" />
                        </VStack>
                        <Skeleton height="12px" width="100px" />
                      </HStack>
                      
                      <SkeletonText noOfLines={2} spacing={2} />
                      
                      <Box>
                        <Skeleton height="16px" width="100px" mb={2} />
                        <HStack spacing={1} flexWrap="wrap">
                          {[1, 2, 3, 4, 5].map((j) => (
                            <Skeleton key={j} height="24px" width="60px" borderRadius="md" />
                          ))}
                        </HStack>
                      </Box>
                      
                      <Box>
                        <Skeleton height="16px" width="120px" mb={2} />
                        <VStack align="start" spacing={1}>
                          {[1, 2, 3].map((j) => (
                            <HStack key={j} spacing={2}>
                              <SkeletonCircle size="12px" />
                              <Skeleton height="14px" width="250px" />
                            </HStack>
                          ))}
                        </VStack>
                      </Box>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </VStack>
        </CardBody>
      </Card>

      {/* Skills Skeleton */}
      <Card bg={cardBg} shadow="lg" borderRadius="xl">
        <CardBody p={6}>
          <VStack spacing={4} align="stretch">
            <Box textAlign="center">
              <Skeleton height="24px" width="180px" mx="auto" mb={2} />
              <Skeleton height="16px" width="280px" mx="auto" />
            </Box>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} borderRadius="lg">
                  <CardBody p={4}>
                    <VStack align="stretch" spacing={3}>
                      <Skeleton height="18px" width="120px" />
                      <HStack spacing={1} flexWrap="wrap">
                        {[1, 2, 3, 4].map((j) => (
                          <Skeleton key={j} height="20px" width="80px" borderRadius="md" />
                        ))}
                      </HStack>
                    </VStack>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>
          </VStack>
        </CardBody>
      </Card>
    </VStack>
  );
};

// Blog post skeleton
export const BlogPostSkeleton: React.FC = () => {
  const cardBg = useColorModeValue('white', 'gray.700');
  
  return (
    <Card bg={cardBg} shadow="md" borderRadius="lg">
      <CardBody p={6}>
        <VStack spacing={4} align="stretch">
          <Skeleton height="200px" borderRadius="md" />
          <Skeleton height="24px" width="80%" />
          <Skeleton height="20px" width="60%" />
          <SkeletonText noOfLines={3} spacing={2} />
          <HStack align="center">
            <SkeletonCircle size="40px" />
            <VStack align="start" spacing={1}>
              <Skeleton height="16px" width="100px" />
              <Skeleton height="14px" width="120px" />
            </VStack>
          </HStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

// Home page hero skeleton
export const HeroSkeleton: React.FC = () => {
  return (
    <VStack spacing={8} align="center" textAlign="center" py={20}>
      <Skeleton height="132px" width="100%" maxW="600px" />
      <Skeleton height="20px" width="80%" maxW="500px" />
      <VStack spacing={3} align="center">
        <Skeleton height="48px" width="160px" borderRadius="full" />
        <Skeleton height="40px" width="120px" borderRadius="md" />
      </VStack>
    </VStack>
  );
};

export default BasicSkeleton; 