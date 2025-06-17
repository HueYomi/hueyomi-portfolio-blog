'use client'

import {
  Box,
  Container,
  Skeleton,
  SkeletonText,
  VStack,
  HStack,
  Card,
  CardBody,
  Grid,
  GridItem,
  SimpleGrid,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react'

export function AboutPageSkeleton() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('orange.100', 'gray.600')
  const skeletonStartColor = useColorModeValue('gray.100', 'gray.700')
  const skeletonEndColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        {/* Hero Section Skeleton */}
        <Card bg={cardBg} shadow="xl" borderRadius="2xl" border="2px solid" borderColor={borderColor}>
          <CardBody p={6}>
            <Flex direction={{ base: 'column', lg: 'row' }} gap={6} align="center" minH="300px">
              {/* Profile Image */}
              <Box>
                <Skeleton 
                  borderRadius="full" 
                  boxSize="200px" 
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
              </Box>
              
              {/* Profile Content */}
              <VStack align="start" spacing={4} flex="1">
                <Skeleton 
                  height="40px" 
                  width="300px" 
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton 
                  height="20px" 
                  width="200px" 
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <SkeletonText 
                  noOfLines={4} 
                  spacing={2} 
                  skeletonHeight={4}
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <HStack spacing={3}>
                  <Skeleton 
                    height="30px" 
                    width="80px" 
                    borderRadius="full"
                    startColor={skeletonStartColor}
                    endColor={skeletonEndColor}
                  />
                  <Skeleton 
                    height="30px" 
                    width="80px" 
                    borderRadius="full"
                    startColor={skeletonStartColor}
                    endColor={skeletonEndColor}
                  />
                  <Skeleton 
                    height="30px" 
                    width="80px" 
                    borderRadius="full"
                    startColor={skeletonStartColor}
                    endColor={skeletonEndColor}
                  />
                </HStack>
              </VStack>
            </Flex>
          </CardBody>
        </Card>

        {/* Skills Section Skeleton */}
        <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <CardBody p={6}>
            <VStack spacing={4}>
              <Skeleton 
                height="30px" 
                width="200px"
                startColor={skeletonStartColor}
                endColor={skeletonEndColor}
              />
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="full">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} bg={borderColor} borderRadius="lg">
                    <CardBody p={4}>
                      <VStack spacing={2}>
                        <Skeleton 
                          height="20px" 
                          width="100px"
                          startColor={skeletonStartColor}
                          endColor={skeletonEndColor}
                        />
                        <HStack wrap="wrap" spacing={2}>
                          <Skeleton 
                            height="20px" 
                            width="60px" 
                            borderRadius="md"
                            startColor={skeletonStartColor}
                            endColor={skeletonEndColor}
                          />
                          <Skeleton 
                            height="20px" 
                            width="80px" 
                            borderRadius="md"
                            startColor={skeletonStartColor}
                            endColor={skeletonEndColor}
                          />
                          <Skeleton 
                            height="20px" 
                            width="50px" 
                            borderRadius="md"
                            startColor={skeletonStartColor}
                            endColor={skeletonEndColor}
                          />
                        </HStack>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Tools Section Skeleton */}
        <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <CardBody p={6}>
            <VStack spacing={4}>
              <Skeleton 
                height="30px" 
                width="200px"
                startColor={skeletonStartColor}
                endColor={skeletonEndColor}
              />
              <SimpleGrid columns={{ base: 2, md: 4, lg: 6 }} spacing={4} w="full">
                {[...Array(12)].map((_, i) => (
                  <VStack key={i} spacing={2}>
                    <Skeleton 
                      boxSize="50px" 
                      borderRadius="lg"
                      startColor={skeletonStartColor}
                      endColor={skeletonEndColor}
                    />
                    <Skeleton 
                      height="16px" 
                      width="60px"
                      startColor={skeletonStartColor}
                      endColor={skeletonEndColor}
                    />
                  </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
}

export function CVPageSkeleton() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('orange.100', 'gray.600')
  const skeletonStartColor = useColorModeValue('gray.100', 'gray.700')
  const skeletonEndColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <Container maxW="container.lg" py={8}>
      <Flex gap={6} align="start">
        {/* Main CV Content */}
        <Box flex="1">
          <VStack spacing={5} align="stretch">
            {/* Hero Section */}
            <Card bg={cardBg} shadow="xl" borderRadius="2xl" border="2px solid" borderColor={borderColor}>
              <CardBody p={6}>
                <Flex direction={{ base: 'column', lg: 'row' }} minH="350px">
                  <Box flex="1" p={6} display="flex" alignItems="center" justifyContent="center">
                    <VStack spacing={6} textAlign="center">
                      <Skeleton 
                        borderRadius="full" 
                        boxSize="120px"
                        startColor={skeletonStartColor}
                        endColor={skeletonEndColor}
                      />
                      <VStack spacing={4}>
                        <Skeleton 
                          height="30px" 
                          width="200px"
                          startColor={skeletonStartColor}
                          endColor={skeletonEndColor}
                        />
                        <Skeleton 
                          height="20px" 
                          width="150px" 
                          borderRadius="full"
                          startColor={skeletonStartColor}
                          endColor={skeletonEndColor}
                        />
                      </VStack>
                    </VStack>
                  </Box>
                  <Box flex="1" p={6}>
                    <VStack align="stretch" spacing={4}>
                      <SkeletonText 
                        noOfLines={3} 
                        spacing={2}
                        startColor={skeletonStartColor}
                        endColor={skeletonEndColor}
                      />
                      <VStack align="start" spacing={2}>
                        {[...Array(4)].map((_, i) => (
                          <Skeleton 
                            key={i} 
                            height="16px" 
                            width="200px"
                            startColor={skeletonStartColor}
                            endColor={skeletonEndColor}
                          />
                        ))}
                      </VStack>
                    </VStack>
                  </Box>
                </Flex>
              </CardBody>
            </Card>

            {/* Work Experience */}
            <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor={borderColor}>
              <CardBody p={6}>
                <VStack spacing={4}>
                  <Skeleton 
                    height="30px" 
                    width="200px"
                    startColor={skeletonStartColor}
                    endColor={skeletonEndColor}
                  />
                  <VStack spacing={2} w="full">
                    {[...Array(3)].map((_, i) => (
                      <Card key={i} bg={borderColor} borderRadius="lg" w="full">
                        <CardBody p={4}>
                          <VStack spacing={3}>
                            <Flex justify="space-between" w="full">
                              <VStack align="start" spacing={1}>
                                <Skeleton 
                                  height="20px" 
                                  width="200px"
                                  startColor={skeletonStartColor}
                                  endColor={skeletonEndColor}
                                />
                                <Skeleton 
                                  height="16px" 
                                  width="150px"
                                  startColor={skeletonStartColor}
                                  endColor={skeletonEndColor}
                                />
                              </VStack>
                              <Skeleton 
                                height="16px" 
                                width="100px"
                                startColor={skeletonStartColor}
                                endColor={skeletonEndColor}
                              />
                            </Flex>
                            <SkeletonText 
                              noOfLines={2} 
                              spacing={2}
                              startColor={skeletonStartColor}
                              endColor={skeletonEndColor}
                            />
                            <HStack wrap="wrap" spacing={1}>
                              {[...Array(5)].map((_, j) => (
                                <Skeleton 
                                  key={j} 
                                  height="20px" 
                                  width="60px" 
                                  borderRadius="md"
                                  startColor={skeletonStartColor}
                                  endColor={skeletonEndColor}
                                />
                              ))}
                            </HStack>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>

            {/* Skills Grid */}
            <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor={borderColor}>
              <CardBody p={6}>
                <VStack spacing={4}>
                  <Skeleton 
                    height="30px" 
                    width="200px"
                    startColor={skeletonStartColor}
                    endColor={skeletonEndColor}
                  />
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2} w="full">
                    {[...Array(6)].map((_, i) => (
                      <Card key={i} bg={borderColor} borderRadius="lg">
                        <CardBody p={4}>
                          <VStack spacing={3}>
                            <Skeleton 
                              height="20px" 
                              width="120px"
                              startColor={skeletonStartColor}
                              endColor={skeletonEndColor}
                            />
                            <HStack wrap="wrap" spacing={1}>
                              {[...Array(4)].map((_, j) => (
                                <Skeleton 
                                  key={j} 
                                  height="18px" 
                                  width="50px" 
                                  borderRadius="md"
                                  startColor={skeletonStartColor}
                                  endColor={skeletonEndColor}
                                />
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
        </Box>

        {/* Sidebar */}
        <Box w="180px" display={{ base: 'none', lg: 'block' }}>
          <Card bg={cardBg} shadow="xl" borderRadius="xl" border="2px solid" borderColor={borderColor}>
            <CardBody p={5} textAlign="center">
              <VStack spacing={3}>
                <Skeleton 
                  borderRadius="full" 
                  boxSize="50px"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton 
                  height="20px" 
                  width="100px"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <SkeletonText 
                  noOfLines={2} 
                  spacing={1} 
                  textAlign="center"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <Skeleton 
                  height="32px" 
                  width="full" 
                  borderRadius="full"
                  startColor={skeletonStartColor}
                  endColor={skeletonEndColor}
                />
                <VStack spacing={1}>
                  {[...Array(3)].map((_, i) => (
                    <Skeleton 
                      key={i} 
                      height="16px" 
                      width="80px"
                      startColor={skeletonStartColor}
                      endColor={skeletonEndColor}
                    />
                  ))}
                </VStack>
              </VStack>
            </CardBody>
          </Card>
        </Box>
      </Flex>
    </Container>
  )
}

export function HomePageSkeleton() {
  const cardBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('orange.100', 'gray.600')
  const skeletonStartColor = useColorModeValue('gray.100', 'gray.700')
  const skeletonEndColor = useColorModeValue('gray.300', 'gray.600')

  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        {/* Hero Section */}
        <Box minH="400px" display="flex" alignItems="center" justifyContent="center">
          <VStack spacing={6} textAlign="center">
            <Skeleton 
              height="60px" 
              width="400px"
              startColor={skeletonStartColor}
              endColor={skeletonEndColor}
            />
            <Skeleton 
              height="30px" 
              width="300px"
              startColor={skeletonStartColor}
              endColor={skeletonEndColor}
            />
            <SkeletonText 
              noOfLines={3} 
              spacing={2} 
              textAlign="center"
              startColor={skeletonStartColor}
              endColor={skeletonEndColor}
            />
            <HStack spacing={4}>
              <Skeleton 
                height="40px" 
                width="120px" 
                borderRadius="full"
                startColor={skeletonStartColor}
                endColor={skeletonEndColor}
              />
              <Skeleton 
                height="40px" 
                width="120px" 
                borderRadius="full"
                startColor={skeletonStartColor}
                endColor={skeletonEndColor}
              />
            </HStack>
          </VStack>
        </Box>

        {/* Featured Projects */}
        <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <CardBody p={6}>
            <VStack spacing={6}>
              <Skeleton 
                height="30px" 
                width="200px"
                startColor={skeletonStartColor}
                endColor={skeletonEndColor}
              />
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
                {[...Array(6)].map((_, i) => (
                  <Card key={i} bg={borderColor} borderRadius="lg">
                    <CardBody p={0}>
                      <VStack spacing={0}>
                        <Skeleton 
                          height="200px" 
                          width="full" 
                          borderTopRadius="lg"
                          startColor={skeletonStartColor}
                          endColor={skeletonEndColor}
                        />
                        <Box p={4} w="full">
                          <VStack align="start" spacing={2}>
                            <Skeleton 
                              height="20px" 
                              width="150px"
                              startColor={skeletonStartColor}
                              endColor={skeletonEndColor}
                            />
                            <SkeletonText 
                              noOfLines={2} 
                              spacing={1}
                              startColor={skeletonStartColor}
                              endColor={skeletonEndColor}
                            />
                            <HStack spacing={2}>
                              <Skeleton 
                                height="16px" 
                                width="40px" 
                                borderRadius="md"
                                startColor={skeletonStartColor}
                                endColor={skeletonEndColor}
                              />
                              <Skeleton 
                                height="16px" 
                                width="50px" 
                                borderRadius="md"
                                startColor={skeletonStartColor}
                                endColor={skeletonEndColor}
                              />
                              <Skeleton 
                                height="16px" 
                                width="45px" 
                                borderRadius="md"
                                startColor={skeletonStartColor}
                                endColor={skeletonEndColor}
                              />
                            </HStack>
                          </VStack>
                        </Box>
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Latest Blog Posts */}
        <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor={borderColor}>
          <CardBody p={6}>
            <VStack spacing={6}>
              <Skeleton 
                height="30px" 
                width="200px"
                startColor={skeletonStartColor}
                endColor={skeletonEndColor}
              />
              <VStack spacing={4} w="full">
                {[...Array(3)].map((_, i) => (
                  <Card key={i} bg={borderColor} borderRadius="lg" w="full">
                    <CardBody p={4}>
                      <Flex gap={4}>
                        <Skeleton 
                          borderRadius="lg" 
                          boxSize="80px"
                          startColor={skeletonStartColor}
                          endColor={skeletonEndColor}
                        />
                        <VStack align="start" spacing={2} flex="1">
                          <Skeleton 
                            height="20px" 
                            width="300px"
                            startColor={skeletonStartColor}
                            endColor={skeletonEndColor}
                          />
                          <SkeletonText 
                            noOfLines={2} 
                            spacing={1}
                            startColor={skeletonStartColor}
                            endColor={skeletonEndColor}
                          />
                          <HStack spacing={2}>
                            <Skeleton 
                              height="16px" 
                              width="80px"
                              startColor={skeletonStartColor}
                              endColor={skeletonEndColor}
                            />
                            <Skeleton 
                              height="16px" 
                              width="60px"
                              startColor={skeletonStartColor}
                              endColor={skeletonEndColor}
                            />
                          </HStack>
                        </VStack>
                      </Flex>
                    </CardBody>
                  </Card>
                ))}
              </VStack>
            </VStack>
          </CardBody>
        </Card>
      </VStack>
    </Container>
  )
} 