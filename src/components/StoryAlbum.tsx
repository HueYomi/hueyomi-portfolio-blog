'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  VStack,
  HStack,
  Text,
  Image,
  IconButton,
  Badge,
  useColorModeValue,
  Flex,
  Heading,
  Container,
  keyframes,
  usePrefersReducedMotion,
  Grid,
  GridItem
} from '@chakra-ui/react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { StoryChapter } from '@/types'

interface StoryAlbumProps {
  chapters: StoryChapter[]
}

// Animation keyframes
const gentleFloat = keyframes`
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-8px) scale(1.02); }
`

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0px); }
`

export default function StoryAlbum({ chapters }: StoryAlbumProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const [isFlipping, setIsFlipping] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [mounted, setMounted] = useState(false)
  const prefersReducedMotion = usePrefersReducedMotion()

  // Theme colors
  const bgColor = useColorModeValue('white', 'gray.800')
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const headingColor = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')
  const imageBgColor = useColorModeValue('gray.50', 'gray.800')
  const cardBgColor = useColorModeValue('white', 'gray.700')
  const navBgColor = useColorModeValue('white', 'gray.700')

  // Fix hydration by ensuring client-side rendering
  useEffect(() => {
    setMounted(true)
  }, [])

  // Emotion colors mapping
  const emotionColors: Record<string, string> = {
    'wonder': 'purple.400',
    'courage': 'red.400',
    'amazement': 'blue.400',
    'determination': 'green.400',
    'pride': 'yellow.400',
    'joy': 'pink.400',
    'hope': 'cyan.400'
  }

  // Film overlay function
  const getFilmOverlay = (emotion: string) => {
    const overlayMap: Record<string, string> = {
      'wonder': 'linear-gradient(45deg, rgba(147, 112, 219, 0.2), rgba(138, 43, 226, 0.1))',
      'courage': 'linear-gradient(45deg, rgba(255, 69, 0, 0.2), rgba(255, 140, 0, 0.1))',
      'amazement': 'linear-gradient(45deg, rgba(30, 144, 255, 0.2), rgba(135, 206, 235, 0.1))',
      'determination': 'linear-gradient(45deg, rgba(34, 139, 34, 0.2), rgba(50, 205, 50, 0.1))',
      'pride': 'linear-gradient(45deg, rgba(255, 215, 0, 0.2), rgba(255, 165, 0, 0.1))',
      'joy': 'linear-gradient(45deg, rgba(255, 105, 180, 0.2), rgba(255, 182, 193, 0.1))',
      'hope': 'linear-gradient(45deg, rgba(0, 255, 255, 0.2), rgba(135, 206, 250, 0.1))'
    }
    return overlayMap[emotion] || 'linear-gradient(45deg, rgba(128, 128, 128, 0.1), rgba(169, 169, 169, 0.05))'
  }

  const currentChapter = chapters[currentPage] || chapters[0]

  const nextPage = () => {
    if (currentPage < chapters.length - 1 && !isFlipping) {
      setDirection('next')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(currentPage + 1)
        setIsFlipping(false)
      }, prefersReducedMotion ? 0 : 600)
    }
  }

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setDirection('prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(currentPage - 1)
        setIsFlipping(false)
      }, prefersReducedMotion ? 0 : 600)
    }
  }

  const goToPage = (pageIndex: number) => {
    if (pageIndex !== currentPage && !isFlipping) {
      setDirection(pageIndex > currentPage ? 'next' : 'prev')
      setIsFlipping(true)
      setTimeout(() => {
        setCurrentPage(pageIndex)
        setIsFlipping(false)
      }, prefersReducedMotion ? 0 : 600)
    }
  }

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted || !chapters || chapters.length === 0) {
    return null
  }

  return (
    <Container maxW={{ base: "100%", md: "container.xl" }} py={{ base: 4, md: 8 }} px={{ base: 2, md: 4 }}>
      <VStack spacing={{ base: 6, md: 8 }} align="stretch">
        {/* Album Header */}
        <Box 
          textAlign="center"
          animation={!prefersReducedMotion ? `${fadeInUp} 0.8s ease-out` : undefined}
        >
          <Heading as="h2" size={{ base: "lg", md: "xl" }} color={headingColor} mb={4}>
            My Life Story Album 📖✨
          </Heading>
          <Text color={textColor} fontSize={{ base: "md", md: "lg" }}>
            A visual journey through the chapters of my life - like a personal anime story!
          </Text>
        </Box>

        {/* Story Book */}
        <Box
          bg={bgColor}
          borderRadius="3xl"
          p={{ base: 4, md: 8 }}
          shadow="2xl"
          border="1px solid"
          borderColor={borderColor}
          maxW="100%"
          w="full"
          mx="auto"
          position="relative"
          overflow="hidden"
          backdropFilter="blur(10px)"
          _before={{
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(135deg, ${emotionColors[currentChapter.emotion]}15, ${emotionColors[currentChapter.emotion]}05)`,
            pointerEvents: 'none',
          }}
        >
          {/* Main content */}
          <Grid
            templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
            gap={{ base: 6, md: 8 }}
            alignItems="center"
            minH={{ base: "auto", md: "500px" }}
          >
            {/* Image section */}
            <GridItem order={{ base: 1, lg: 1 }}>
              <Box
                position="relative"
                w="full"
                h={{ base: "250px", sm: "300px", md: "400px", lg: "500px" }}
                overflow="hidden"
                borderRadius="xl"
                transform={`perspective(1000px) rotateY(${isFlipping ? (direction === 'next' ? '-15deg' : '15deg') : '0deg'})`}
                transition="all 0.6s cubic-bezier(0.4, 0, 0.2, 1)"
                filter={isFlipping ? 'blur(2px)' : 'blur(0px)'}
                opacity={isFlipping ? 0.7 : 1}
                scale={isFlipping ? 0.95 : 1}
              >
                <Image
                  src={currentChapter.image}
                  alt={currentChapter.title}
                  w="full"
                  h="full"
                  objectFit="cover"
                  animation={!prefersReducedMotion ? `${gentleFloat} 4s ease-in-out infinite` : undefined}
                  fallbackSrc="https://via.placeholder.com/400x300?text=Story+Image"
                  transition="all 0.3s ease"
                  _hover={{
                    transform: 'scale(1.05)'
                  }}
                />
                {/* Film overlay */}
                <Box
                  position="absolute"
                  top="0"
                  left="0"
                  right="0"
                  bottom="0"
                  background={getFilmOverlay(currentChapter.emotion)}
                  opacity="0.2"
                  pointerEvents="none"
                  mixBlendMode="overlay"
                />
              </Box>
            </GridItem>

            {/* Content section */}
            <GridItem order={{ base: 2, lg: 2 }}>
              <VStack spacing={{ base: 4, md: 6 }} align="stretch" h="full" justify="center">


                {/* Title */}
                <Heading
                  size={{ base: "md", md: "lg" }}
                  color={headingColor}
                  fontWeight="800"
                  lineHeight="1.2"
                  textAlign={{ base: "center", lg: "left" }}
                >
                  {currentChapter.title}
                </Heading>

                {/* Year badge */}
                <Badge
                  colorScheme={emotionColors[currentChapter.emotion].replace('.', '')}
                  fontSize={{ base: "xs", md: "sm" }}
                  px={3}
                  py={1}
                  borderRadius="full"
                  alignSelf={{ base: "center", lg: "flex-start" }}
                >
                  {currentChapter.year}
                </Badge>

                {/* Story note */}
                <Box
                  bg={cardBgColor}
                  p={{ base: 4, md: 6 }}
                  borderRadius="2xl"
                  shadow="lg"
                  border="1px solid"
                  borderColor={borderColor}
                  position="relative"
                  _before={{
                    content: '""',
                    position: 'absolute',
                    top: '-8px',
                    left: { base: '50%', lg: '20px' },
                    transform: { base: 'translateX(-50%)', lg: 'none' },
                    width: 0,
                    height: 0,
                    borderLeft: '8px solid transparent',
                    borderRight: '8px solid transparent',
                    borderBottom: `8px solid ${cardBgColor}`,
                  }}
                >
                  <Text
                    fontSize={{ base: "sm", md: "md" }}
                    lineHeight="1.6"
                    color={textColor}
                    fontStyle="italic"
                    textAlign={{ base: "center", lg: "left" }}
                  >
                    {currentChapter.note}
                  </Text>
                </Box>
              </VStack>
            </GridItem>
          </Grid>

          {/* Navigation Controls */}
          <Flex 
            justify="space-between" 
            align="center" 
            mt={{ base: 6, md: 8 }}
            direction={{ base: "column", md: "row" }}
            gap={{ base: 4, md: 0 }}
          >
            {/* Previous/Next buttons */}
            <HStack spacing={4}>
              <IconButton
                aria-label="Previous chapter"
                icon={<FaChevronLeft />}
                onClick={prevPage}
                isDisabled={currentPage === 0 || isFlipping}
                size={{ base: "md", md: "lg" }}
                colorScheme="gray"
                variant="ghost"
                borderRadius="full"
                bg={navBgColor}
                shadow="md"
                backdropFilter="blur(10px)"
                _hover={{
                  transform: 'scale(1.1)',
                  shadow: 'lg'
                }}
                transition="all 0.2s ease"
              />
              
              <IconButton
                aria-label="Next chapter"
                icon={<FaChevronRight />}
                onClick={nextPage}
                isDisabled={currentPage === chapters.length - 1 || isFlipping}
                size={{ base: "md", md: "lg" }}
                colorScheme="gray"
                variant="ghost"
                borderRadius="full"
                bg={navBgColor}
                shadow="md"
                backdropFilter="blur(10px)"
                _hover={{
                  transform: 'scale(1.1)',
                  shadow: 'lg'
                }}
                transition="all 0.2s ease"
              />
            </HStack>

            {/* Page indicators */}
            <HStack spacing={2} justify="center" flexWrap="wrap">
              {chapters.map((_, index) => (
                <Box
                  key={index}
                  w={{ base: "8px", md: "10px" }}
                  h={{ base: "8px", md: "10px" }}
                  borderRadius="full"
                  bg={index === currentPage ? emotionColors[currentChapter.emotion] : mutedTextColor}
                  cursor="pointer"
                  onClick={() => goToPage(index)}
                  transition="all 0.2s ease"
                  _hover={{
                    transform: 'scale(1.2)',
                    bg: index === currentPage ? emotionColors[currentChapter.emotion] : textColor
                  }}
                />
              ))}
            </HStack>

            {/* Chapter counter */}
            <Text 
              fontSize={{ base: "sm", md: "md" }} 
              color={mutedTextColor}
              fontWeight="medium"
            >
              {currentPage + 1} / {chapters.length}
            </Text>
          </Flex>
        </Box>

        {/* Chapter navigation cards - Hidden on mobile for space */}
        <Box display={{ base: "none", lg: "block" }}>
          <Text fontSize="md" fontWeight="bold" color={headingColor} mb={3} textAlign="center">
            Timeline Journey
          </Text>
          <Box position="relative" maxW="800px" mx="auto">
            {/* Timeline Arrow */}
            <Box
              position="absolute"
              top="50%"
              left="20px"
              right="20px"
              h="3px"
              bg={`linear-gradient(to right, ${emotionColors['wonder']}, ${emotionColors['courage']}, ${emotionColors['determination']}, ${emotionColors['pride']}, ${emotionColors['hope']})`}
              transform="translateY(-50%)"
              zIndex="0"
              borderRadius="full"
              shadow="sm"
              _after={{
                content: '""',
                position: 'absolute',
                right: '-12px',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 0,
                height: 0,
                borderTop: '8px solid transparent',
                borderBottom: '8px solid transparent',
                borderLeft: `16px solid ${emotionColors['hope']}`,
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
              }}
            />

            
            <Flex wrap="wrap" justify="center" gap={3} position="relative" zIndex="1">
              {chapters.map((chapter, index) => (
                <Box
                  key={chapter.id}
                  p={3}
                  bg={index === currentPage ? emotionColors[chapter.emotion] : bgColor}
                  color={index === currentPage ? 'white' : textColor}
                  borderRadius="lg"
                  border="1px solid"
                  borderColor={index === currentPage ? emotionColors[chapter.emotion] : borderColor}
                  cursor="pointer"
                  onClick={() => goToPage(index)}
                  transition="all 0.2s ease"
                  minW="120px"
                  maxW="140px"
                  textAlign="center"
                  shadow="md"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  _hover={{
                    transform: 'translateY(-2px)',
                    shadow: 'lg',
                    bg: index === currentPage ? emotionColors[chapter.emotion] : cardBgColor,
                    borderColor: emotionColors[chapter.emotion]
                  }}
                >

                  <Text fontSize="xs" noOfLines={2} lineHeight="1.3">
                    {chapter.title}
                  </Text>
                </Box>
              ))}
            </Flex>
          </Box>
        </Box>
      </VStack>
    </Container>
  )
} 