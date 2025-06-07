'use client';

import React from 'react';
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  useColorModeValue,
  SimpleGrid,
  Heading,
  VStack,
  HStack,
  Icon,
  Divider,
  Button,
  Flex,
} from '@chakra-ui/react';
import { FiGithub, FiLinkedin, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import NextLink from 'next/link';
import { useProfile } from '@/hooks/useData';

const Footer = () => {
  const { data: profile } = useProfile();
  
  const bg = useColorModeValue('gray.50', 'gray.900');
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const headingColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const brandColor = useColorModeValue('orange.500', 'orange.300');

  const currentYear = new Date().getFullYear();

  return (
    <Box bg={bg} color={textColor}>
      <Container as={Stack} maxW={'6xl'} py={10}>
        <SimpleGrid
          templateColumns={{ sm: '1fr 1fr', md: '2fr 1fr 1fr 1fr' }}
          spacing={8}
        >
          {/* Brand Section */}
          <Stack spacing={6}>
            <Box>
              <Text
                fontSize="2xl"
                fontWeight="bold"
                color={brandColor}
                mb={2}
              >
                Hue Yomi
              </Text>
              <Text fontSize={'sm'} maxW="300px">
                {profile?.summary || 'Passionate about quality assurance and software testing. Building reliable applications through comprehensive testing methodologies.'}
              </Text>
            </Box>
            
            {/* Social Links */}
            <Stack direction={'row'} spacing={6}>
              {profile?.github && (
                <Link
                  href={profile.github}
                  isExternal
                  _hover={{
                    color: brandColor,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={FiGithub} w={5} h={5} />
                </Link>
              )}
              {profile?.linkedin && (
                <Link
                  href={profile.linkedin}
                  isExternal
                  _hover={{
                    color: brandColor,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={FiLinkedin} w={5} h={5} />
                </Link>
              )}
              {profile?.email && (
                <Link
                  href={`mailto:${profile.email}`}
                  _hover={{
                    color: brandColor,
                    transform: 'translateY(-2px)',
                  }}
                  transition="all 0.2s"
                >
                  <Icon as={FiMail} w={5} h={5} />
                </Link>
              )}
            </Stack>
          </Stack>

          {/* Quick Links */}
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>
              Quick Links
            </Text>
            <Link as={NextLink} href={'/'} _hover={{ color: brandColor }}>
              Home
            </Link>
            <Link as={NextLink} href={'/about'} _hover={{ color: brandColor }}>
              About
            </Link>
            <Link as={NextLink} href={'/blog'} _hover={{ color: brandColor }}>
              Blog
            </Link>
            <Link as={NextLink} href={'/projects'} _hover={{ color: brandColor }}>
              Projects
            </Link>
          </Stack>

          {/* Resources */}
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>
              Resources
            </Text>
            <Link href={'#'} _hover={{ color: brandColor }}>
              Testing Guides
            </Link>
            <Link href={'#'} _hover={{ color: brandColor }}>
              QA Best Practices
            </Link>
            <Link href={'#'} _hover={{ color: brandColor }}>
              Tools & Templates
            </Link>
            <Link href={'#'} _hover={{ color: brandColor }}>
              Case Studies
            </Link>
          </Stack>

          {/* Contact Info */}
          <Stack align={'flex-start'}>
            <Text fontWeight={'500'} fontSize={'lg'} mb={2} color={headingColor}>
              Contact
            </Text>
            
            {profile?.email && (
              <HStack spacing={2}>
                <Icon as={FiMail} w={4} h={4} />
                <Link
                  href={`mailto:${profile.email}`}
                  fontSize="sm"
                  _hover={{ color: brandColor }}
                >
                  {profile.email}
                </Link>
              </HStack>
            )}
            
            {profile?.phone && (
              <HStack spacing={2}>
                <Icon as={FiPhone} w={4} h={4} />
                <Text fontSize="sm">{profile.phone}</Text>
              </HStack>
            )}
            
            {profile?.location && (
              <HStack spacing={2}>
                <Icon as={FiMapPin} w={4} h={4} />
                <Text fontSize="sm">{profile.location}</Text>
              </HStack>
            )}

            <Button
              as={NextLink}
              href="/contact"
              size="sm"
              colorScheme="orange"
              variant="outline"
              mt={4}
              _hover={{
                transform: 'translateY(-2px)',
              }}
              transition="all 0.2s"
            >
              Get In Touch
            </Button>
          </Stack>
        </SimpleGrid>
      </Container>

      <Divider borderColor={borderColor} />

      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text fontSize="sm">
          © {currentYear} {profile?.name || 'Hue Yomi'}. All rights reserved.
        </Text>
        
        <Stack direction={'row'} spacing={6}>
          <Link
            href={'#'}
            fontSize="sm"
            _hover={{ color: brandColor }}
          >
            Privacy Policy
          </Link>
          <Link
            href={'#'}
            fontSize="sm"
            _hover={{ color: brandColor }}
          >
            Terms of Service
          </Link>
        </Stack>
      </Container>

      {/* Back to Top Button */}
      <Box position="relative">
        <Button
          position="absolute"
          bottom={4}
          right={4}
          size="sm"
          colorScheme="orange"
          variant="solid"
          borderRadius="full"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          _hover={{
            transform: 'translateY(-2px)',
          }}
          transition="all 0.2s"
          display={{ base: 'none', md: 'flex' }}
        >
          ↑
        </Button>
      </Box>
    </Box>
  );
};

export default Footer; 