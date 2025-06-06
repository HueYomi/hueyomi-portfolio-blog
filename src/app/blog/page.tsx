'use client'

import { Container, Heading, Text, VStack, Box, SimpleGrid, Card, CardBody } from '@chakra-ui/react'

export default function Blog() {
  // Placeholder blog posts
  const posts = [
    {
      id: '1',
      title: 'Getting Started with Next.js',
      excerpt: 'Learn how to build modern web applications with Next.js and React.',
      publishedAt: '2024-01-15',
    },
    {
      id: '2',
      title: 'Building with Chakra UI',
      excerpt: 'A comprehensive guide to creating beautiful UIs with Chakra UI.',
      publishedAt: '2024-01-10',
    },
  ]

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8} align="start">
        <Box>
          <Heading as="h1" size="xl" mb={4}>
            Blog
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Thoughts, tutorials, and insights about web development.
          </Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="full">
          {posts.map((post) => (
            <Card key={post.id} variant="outline">
              <CardBody>
                <Heading as="h3" size="md" mb={2}>
                  {post.title}
                </Heading>
                <Text color="gray.600" mb={4}>
                  {post.excerpt}
                </Text>
                <Text fontSize="sm" color="gray.500">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  )
} 