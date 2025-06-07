'use client'

import { Box, Container, Heading, Text, Button, VStack } from '@chakra-ui/react'
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Home() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="center" minH="80vh" justify="center">
        <Box textAlign="center">
          <Heading as="h1" size="2xl" mb={4}>
            Welcome to Hue Yomi Portfolio Blog
          </Heading>
          <Text fontSize="xl" color="gray.600" mb={8}>
            Personal portfolio and blog website built with Next.js and Chakra UI
          </Text>
        </Box>
        
        <VStack spacing={4}>
          <Button leftIcon={<FaGithub />} colorScheme="gray" variant="outline">
            GitHub
          </Button>
          <Button leftIcon={<FaLinkedin />} colorScheme="linkedin" variant="outline">
            LinkedIn
          </Button>
          <Button leftIcon={<FaEnvelope />} colorScheme="teal" variant="outline">
            Contact
          </Button>
        </VStack>
      </VStack>
    </Container>
  )
} 