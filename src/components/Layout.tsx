import { Box, Container, Flex, Heading, Link, HStack, Text } from '@chakra-ui/react'
import { LayoutProps } from '@/types'

export default function Layout({ children }: LayoutProps) {
  return (
    <Box minH="100vh" display="flex" flexDirection="column">
      {/* Header */}
      <Box as="header" bg="white" borderBottom="1px" borderColor="gray.200" py={4}>
        <Container maxW="container.xl">
          <Flex justify="space-between" align="center">
            <Heading as="h1" size="lg" color="brand.700">
              Hueyomi
            </Heading>
            <HStack spacing={6}>
              <Link href="/" _hover={{ color: 'brand.500' }}>
                Home
              </Link>
              <Link href="/about" _hover={{ color: 'brand.500' }}>
                About
              </Link>
              <Link href="/blog" _hover={{ color: 'brand.500' }}>
                Blog
              </Link>
              <Link href="/projects" _hover={{ color: 'brand.500' }}>
                Projects
              </Link>
              <Link href="/contact" _hover={{ color: 'brand.500' }}>
                Contact
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>

      {/* Main Content */}
      <Box as="main" flex="1">
        {children}
      </Box>

      {/* Footer */}
      <Box as="footer" bg="gray.50" py={8} mt="auto">
        <Container maxW="container.xl">
          <Text textAlign="center" color="gray.600">
            © 2024 Hueyomi Portfolio Blog. Built with Next.js and Chakra UI.
          </Text>
        </Container>
      </Box>
    </Box>
  )
} 