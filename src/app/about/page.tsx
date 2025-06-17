'use client'

import { useEffect } from 'react'
import {
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Box,
  Image,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Link,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
  useColorModeValue,
  Flex,
  Divider,

  Wrap,
  WrapItem,
  List,
  ListItem,
  ListIcon,
  Avatar,
  AvatarGroup,
  Tooltip
} from '@chakra-ui/react'
import { 
  FaLinkedin, 
  FaGithub, 
  FaTwitter, 
  FaEnvelope, 
  FaMapMarkerAlt, 
  FaPhone,
  FaHeart,
  FaStar,
  FaCamera,
  FaPlane,
  FaMountain,
  FaBook,
  FaUtensils,
  FaLanguage
} from 'react-icons/fa'
import { MdCheckCircle } from 'react-icons/md'
import { useProfile } from '@/hooks/useData'
import { SocialMediaLink } from '@/types'
import StoryAlbum from '@/components/StoryAlbum'
import { ProfileSkeleton } from '@/components/ui/LoadingSkeleton'
import Head from 'next/head'

// Icon mapping for social media
const iconMap = {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaEnvelope,
}

// Icon mapping for hobbies
const hobbyIconMap = {
  '📸': FaCamera,
  '🍜': FaUtensils,
  '📚': FaBook,
  '🥾': FaMountain,
  '🗣️': FaLanguage,
}

export default function About() {
  const { data: profile, loading, error } = useProfile()
  
  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800')
  const cardBg = useColorModeValue('white', 'gray.700')
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const headingColor = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const accentColor = useColorModeValue('orange.500', 'orange.400')
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')

  // Update document title and meta tags when profile loads
  useEffect(() => {
    if (profile?.seo) {
      document.title = profile.seo.meta_title
      
      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]')
      if (metaDescription) {
        metaDescription.setAttribute('content', profile.seo.meta_description)
      } else {
        const meta = document.createElement('meta')
        meta.name = 'description'
        meta.content = profile.seo.meta_description
        document.head.appendChild(meta)
      }

      // Update keywords
      const metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute('content', profile.seo.keywords.join(', '))
      } else {
        const meta = document.createElement('meta')
        meta.name = 'keywords'
        meta.content = profile.seo.keywords.join(', ')
        document.head.appendChild(meta)
      }

      // Update Open Graph image
      const ogImage = document.querySelector('meta[property="og:image"]')
      if (ogImage) {
        ogImage.setAttribute('content', profile.seo.og_image)
      } else {
        const meta = document.createElement('meta')
        meta.setAttribute('property', 'og:image')
        meta.content = profile.seo.og_image
        document.head.appendChild(meta)
      }
    }
  }, [profile])

  if (loading === 'loading' || loading === 'idle') {
    return (
      <Container maxW="container.lg" py={12}>
        <ProfileSkeleton />
      </Container>
    )
  }

  if (loading === 'error' || !profile) {
    return (
      <Container maxW="container.lg" py={12}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error || 'Failed to load profile data'}
        </Alert>
      </Container>
    )
  }

  const renderSocialIcon = (socialLink: SocialMediaLink) => {
    const IconComponent = iconMap[socialLink.icon as keyof typeof iconMap]
    return IconComponent ? <Icon as={IconComponent} /> : null
  }

  const renderHobbyIcon = (iconEmoji: string) => {
    const IconComponent = hobbyIconMap[iconEmoji as keyof typeof hobbyIconMap]
    return IconComponent ? <Icon as={IconComponent} color={accentColor} /> : <Text>{iconEmoji}</Text>
  }

  return (
    <>
      <Head>
        <title>{profile.seo?.meta_title || `About ${profile.name}`}</title>
        <meta 
          name="description" 
          content={profile.seo?.meta_description || profile.summary} 
        />
        <meta 
          name="keywords" 
          content={profile.seo?.keywords?.join(', ') || 'about, profile'} 
        />
        <meta property="og:title" content={profile.seo?.meta_title || `About ${profile.name}`} />
        <meta 
          property="og:description" 
          content={profile.seo?.meta_description || profile.summary} 
        />
        <meta property="og:image" content={profile.seo?.og_image || profile.profileImage} />
        <meta property="og:type" content="profile" />
      </Head>

      <Container maxW="container.lg" py={12}>
        <VStack spacing={16} align="stretch">
          {/* Hero Section */}
          <Card bg={cardBg} shadow="xl" borderRadius="2xl" overflow="hidden">
            <CardBody p={0}>
              <Flex
                direction={{ base: 'column', lg: 'row' }}
                align="stretch"
                minH="500px"
              >
                {/* Profile Image Side */}
                <Box 
                  flex="1" 
                  bg="linear-gradient(135deg, #FF9800 0%, #FF5722 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  p={8}
                >
                  <VStack spacing={6}>
                    <Image
                      src={profile.profileImage}
                      alt={`${profile.name} profile picture`}
                      boxSize="200px"
                      borderRadius="full"
                      objectFit="cover"
                      border="6px solid white"
                      shadow="2xl"
                      fallbackSrc="https://via.placeholder.com/200x200?text=Profile"
                    />
                    <VStack spacing={2} textAlign="center">
                      <Heading color="white" size="xl">
                        {profile.name}
                      </Heading>
                      <Badge 
                        bg="rgba(255, 255, 255, 0.9)" 
                        color="gray.800" 
                        fontSize="md" 
                        px={4} 
                        py={2} 
                        borderRadius="full"
                        fontWeight="bold"
                      >
                        {profile.title}
                      </Badge>
                      <HStack color="white" opacity={0.9}>
                        <Icon as={FaMapMarkerAlt} />
                        <Text>{profile.location}</Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Box>

                {/* Content Side */}
                <Box flex="1" p={8}>
                  <VStack align="stretch" spacing={6} h="full" justify="center">
                    <Box>
                      <Heading as="h1" size="2xl" color={headingColor} mb={4}>
                        Hello, I'm Hue! 👋
                      </Heading>
                      <Text fontSize="lg" color={textColor} lineHeight="tall">
                        {profile.personalStory}
                      </Text>
                    </Box>

                    {/* Quick Facts */}
                    <Box>
                      <Heading as="h3" size="md" color={accentColor} mb={3}>
                        Quick Facts About Me
                      </Heading>
                      <SimpleGrid columns={2} spacing={3}>
                        <HStack>
                          <Icon as={FaHeart} color="red.400" />
                          <Text fontSize="sm" color={textColor} fontWeight="medium">Coffee Lover</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaCamera} color="blue.400" />
                          <Text fontSize="sm" color={textColor} fontWeight="medium">Photography</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaPlane} color="green.400" />
                          <Text fontSize="sm" color={textColor} fontWeight="medium">Travel Enthusiast</Text>
                        </HStack>
                        <HStack>
                          <Icon as={FaUtensils} color="purple.400" />
                          <Text fontSize="sm" color={textColor} fontWeight="medium">Cooking Explorer</Text>
                        </HStack>
                      </SimpleGrid>
                    </Box>

                    {/* Social Links */}
                    {profile.socialMedia && profile.socialMedia.length > 0 && (
                      <HStack spacing={4}>
                        {profile.socialMedia.map((social, index) => (
                          <Link
                            key={index}
                            href={social.url}
                            isExternal
                            color={accentColor}
                            fontSize="xl"
                            _hover={{ color: 'orange.600', transform: 'scale(1.1)' }}
                            transition="all 0.2s"
                          >
                            {renderSocialIcon(social)}
                          </Link>
                        ))}
                      </HStack>
                    )}
                  </VStack>
                </Box>
              </Flex>
            </CardBody>
          </Card>

          {/* My Journey Timeline */}
          {profile.journey && profile.journey.length > 0 && (
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="stretch" spacing={8}>
                  <Box textAlign="center">
                    <Heading as="h2" size="xl" color={headingColor} mb={4}>
                      My Journey 🛤️
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      Every step has led me to where I am today
                    </Text>
                  </Box>
                  
                  <VStack spacing={6} align="stretch">
                    {profile.journey.map((step, index) => (
                      <Card key={index} bg={borderColor} borderRadius="lg">
                        <CardBody p={6}>
                          <Flex align="center" gap={4}>
                            <Box
                              bg={accentColor}
                              color="white"
                              borderRadius="full"
                              w="50px"
                              h="50px"
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              fontWeight="bold"
                              flexShrink={0}
                            >
                              {step.year}
                            </Box>
                            <Box flex="1">
                              <Heading as="h3" size="md" color={headingColor} mb={2}>
                                {step.title}
                              </Heading>
                              <Text color={textColor}>
                                {step.description}
                              </Text>
                            </Box>
                          </Flex>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Hobbies & Interests */}
          {profile.hobbies && profile.hobbies.length > 0 && (
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="stretch" spacing={8}>
                  <Box textAlign="center">
                    <Heading as="h2" size="xl" color={headingColor} mb={4}>
                      What I Love Doing ❤️
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      Life is more than work - here's what fills my free time
                    </Text>
                  </Box>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                    {profile.hobbies.map((hobby, index) => (
                      <Card key={index} bg={borderColor} borderRadius="lg" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                        <CardBody p={6}>
                          <HStack align="start" spacing={4}>
                            <Box fontSize="2xl" flexShrink={0}>
                              {renderHobbyIcon(hobby.icon)}
                            </Box>
                            <Box>
                              <Heading as="h3" size="md" color={headingColor} mb={2}>
                                {hobby.name}
                              </Heading>
                              <Text color={textColor} fontSize="sm">
                                {hobby.description}
                              </Text>
                            </Box>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Interactive Story Album */}
          {profile.storyAlbum && profile.storyAlbum.length > 0 && (
            <StoryAlbum chapters={profile.storyAlbum} />
          )}

          {/* Travel Experiences */}
          {profile.travelExperiences && profile.travelExperiences.length > 0 && (
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="stretch" spacing={8}>
                  <Box textAlign="center">
                    <Heading as="h2" size="xl" color={headingColor} mb={4}>
                      Adventures & Memories 🌍
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      Places that have shaped my perspective
                    </Text>
                  </Box>
                  
                  <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {profile.travelExperiences.map((travel, index) => (
                      <Card key={index} bg={borderColor} borderRadius="lg" overflow="hidden">
                        <CardBody p={6}>
                          <VStack align="start" spacing={3}>
                            <HStack>
                              <Icon as={FaMapMarkerAlt} color={accentColor} />
                              <Heading as="h3" size="md" color={headingColor}>
                                {travel.place}
                              </Heading>
                              <Badge colorScheme="orange" variant="subtle">
                                {travel.year}
                              </Badge>
                            </HStack>
                            <Text color={textColor} fontSize="sm">
                              {travel.description}
                            </Text>
                            <Box bg={accentColor} color="white" px={3} py={1} borderRadius="md" fontSize="xs">
                              <Icon as={FaStar} mr={1} />
                              {travel.highlight}
                            </Box>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Fun Facts */}
          {profile.funFacts && profile.funFacts.length > 0 && (
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="stretch" spacing={6}>
                  <Box textAlign="center">
                    <Heading as="h2" size="xl" color={headingColor} mb={4}>
                      Fun Facts About Me 🎉
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      Random things that make me... me!
                    </Text>
                  </Box>
                  
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                    {profile.funFacts.map((fact, index) => (
                      <HStack key={index} align="start" spacing={3}>
                        <Icon as={MdCheckCircle} color={accentColor} mt={1} flexShrink={0} />
                        <Text color={textColor}>
                          {fact}
                        </Text>
                      </HStack>
                    ))}
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Wish List */}
          {profile.wishList && profile.wishList.length > 0 && (
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="stretch" spacing={8}>
                  <Box textAlign="center">
                    <Heading as="h2" size="xl" color={headingColor} mb={4}>
                      Dreams & Goals ✨
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      Things I'm excited to experience and achieve
                    </Text>
                  </Box>
                  
                  <SimpleGrid columns={{ base: 1, lg: 3 }} spacing={8}>
                    {profile.wishList.map((category, index) => (
                      <Card key={index} bg={borderColor} borderRadius="lg">
                        <CardBody p={6}>
                          <VStack align="stretch" spacing={4}>
                            <Heading as="h3" size="lg" color={accentColor} textAlign="center">
                              {category.category}
                            </Heading>
                            <List spacing={2}>
                              {category.items.map((item, itemIndex) => (
                                <ListItem key={itemIndex}>
                                  <ListIcon as={MdCheckCircle} color={accentColor} />
                                  <Text as="span" color={textColor} fontSize="sm">
                                    {item}
                                  </Text>
                                </ListItem>
                              ))}
                            </List>
                          </VStack>
                        </CardBody>
                      </Card>
                    ))}
                  </SimpleGrid>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Values */}
          {profile.values && profile.values.length > 0 && (
            <Card bg={cardBg} shadow="lg" borderRadius="xl">
              <CardBody p={8}>
                <VStack align="stretch" spacing={6}>
                  <Box textAlign="center">
                    <Heading as="h2" size="xl" color={headingColor} mb={4}>
                      What Drives Me 💪
                    </Heading>
                    <Text color={textColor} fontSize="lg">
                      The values that guide my decisions and actions
                    </Text>
                  </Box>
                  
                  <Wrap spacing={4} justify="center">
                    {profile.values.map((value, index) => (
                      <WrapItem key={index}>
                        <Card bg={accentColor} color="white" borderRadius="lg" size="sm">
                          <CardBody p={4} textAlign="center">
                            <Text fontWeight="medium" fontSize="sm">
                              {value}
                            </Text>
                          </CardBody>
                        </Card>
                      </WrapItem>
                    ))}
                  </Wrap>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Let's Connect */}
          <Card bg={cardBg} shadow="lg" borderRadius="xl">
            <CardBody p={8}>
              <VStack spacing={6} textAlign="center">
                <Heading as="h2" size="xl" color={headingColor}>
                  Let's Connect! 🤝
                </Heading>
                <Text color={textColor} fontSize="lg" maxW="600px">
                  I love meeting new people and sharing stories. Whether you want to chat about testing, 
                  share travel tips, or just say hello - I'd love to hear from you!
                </Text>
                <HStack spacing={6}>
                  <Link 
                    href={`mailto:${profile.email}`}
                    bg={accentColor}
                    color="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    fontWeight="medium"
                    _hover={{ bg: 'orange.600', transform: 'translateY(-2px)' }}
                    transition="all 0.2s"
                  >
                    <Icon as={FaEnvelope} mr={2} />
                    Say Hello
                  </Link>
                  {profile.website && (
                    <Link 
                      href={profile.website} 
                      isExternal
                      color={accentColor}
                      fontWeight="medium"
                      _hover={{ textDecoration: 'underline' }}
                    >
                      Visit My Website
                    </Link>
                  )}
                </HStack>
              </VStack>
            </CardBody>
          </Card>
        </VStack>
      </Container>
    </>
  )
} 