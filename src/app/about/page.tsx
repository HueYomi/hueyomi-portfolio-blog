'use client'

import { Container, Heading, Text, VStack, Box } from '@chakra-ui/react'

export default function About() {
  return (
    <Container maxW="container.md" py={12}>
      <VStack spacing={8} align="start">
        <Box>
          <Heading as="h1" size="xl" mb={4}>
            About Me
          </Heading>
          <Text fontSize="lg" color="gray.600" lineHeight="tall">
            Welcome to my portfolio blog! This is where I share my journey as a developer,
            showcase my projects, and write about technology and programming.
          </Text>
        </Box>
        
        <Box>
          <Heading as="h2" size="lg" mb={4}>
            What I Do
          </Heading>
          <Text color="gray.600" lineHeight="tall">
            I'm passionate about creating web applications and sharing knowledge through
            writing. This blog serves as both a portfolio of my work and a platform
            for technical articles and tutorials.
          </Text>
        </Box>
      </VStack>
    </Container>
  )
} 