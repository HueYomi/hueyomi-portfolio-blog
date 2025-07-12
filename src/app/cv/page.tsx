'use client'

import { useEffect } from 'react'
import {
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Box,
  Button,
  SimpleGrid,
  Badge,
  Icon,
  Spinner,
  Alert,
  AlertIcon,
  Flex,
  List,
  ListItem,
  ListIcon,
  useToast,
  Grid,
  GridItem,
  Card,
  CardBody,
  useColorModeValue,
  Divider,
  Tooltip,
  Stack,
  Link,
  Avatar
} from '@chakra-ui/react'
import { 
  HiDownload,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiCheckCircle,
  HiBriefcase,
  HiCode,
  HiAcademicCap,
  HiCalendar,
  HiOfficeBuilding,
  HiCog,
  HiLightBulb,
  HiUsers,
  HiStar,
  HiBadgeCheck,
  HiTranslate,
  HiExternalLink,
  HiClock
} from 'react-icons/hi'
import { 
  RiLinkedinBoxFill,
  RiGithubFill,
  RiUserStarFill,
  RiMedalFill,
  RiTrophyFill,
  RiAwardFill,
  RiStarFill,
  RiCodeSSlashFill,
  RiTeamFill,
  RiLightbulbFlashFill,
  RiToolsFill,
  RiGraduationCapFill,
  RiBuilding2Fill,
  RiMapPin2Fill,
  RiPhoneFill,
  RiMailFill,
  RiDownloadCloud2Fill
} from 'react-icons/ri'
import { 
  SiTypescript,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiJest,
  SiCypress,
  SiSelenium
} from 'react-icons/si'
import { 
  FaRocket,
  FaGem,
  FaFire,
  FaHeart,
  FaMagic,
  FaShieldAlt,
  FaLaptopCode,
  FaDatabase,
  FaCloud,
  FaRobot
} from 'react-icons/fa'
import Head from 'next/head'
import { useCV } from '@/hooks/useData'
import { CVSkeleton } from '@/components/ui/LoadingSkeleton'

export default function CV() {
  const { data: cvData, loading, error } = useCV()
  const toast = useToast()

  // Theme colors - Dark mode compatible
  const bgColor = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)')
  const cardBg = useColorModeValue('rgba(255, 255, 255, 0.98)', 'rgba(45, 55, 72, 0.98)')
  const textColor = useColorModeValue('gray.600', 'gray.200')
  const headingColor = useColorModeValue('gray.800', 'white')
  const borderColor = useColorModeValue('orange.50', 'gray.600')
  const accentColor = useColorModeValue('orange.500', 'orange.400')
  const mutedTextColor = useColorModeValue('gray.500', 'gray.400')
  const profileBg = useColorModeValue('orange.400', 'orange.500')
  const profileCardBg = useColorModeValue('rgba(247, 250, 252, 0.95)', 'rgba(45, 55, 72, 0.95)')

  // Update document title when CV data loads
  useEffect(() => {
    if (cvData?.personal_info) {
      document.title = `${cvData.personal_info.name} - CV`
    }
  }, [cvData])

  const handleDownloadPDF = () => {
    // Download the PDF file directly
    const link = document.createElement('a')
    link.href = '/assets/cv/resume.pdf'
    link.download = 'Hue_Nguyen_Thi_CV.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast({
      title: 'CV Downloaded',
      description: 'Resume PDF has been downloaded successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  const formatDate = (dateString: string | null) => {
    if (dateString === 'Present' || dateString === null) return 'Present'
    
    try {
      const date = new Date(dateString)
      const year = date.getFullYear()
      const month = date.toLocaleDateString('en-US', { month: 'short' })
      return `${month} ${year}`
    } catch {
      return dateString
    }
  }

  const getYearFromDate = (dateString: string | null) => {
    if (dateString === 'Present' || dateString === null) return 'Present'
    
    try {
      return new Date(dateString).getFullYear().toString()
    } catch {
      return 'Present'
    }
  }

  const getLastUpdated = () => {
    if (!cvData) return 'Recently'
    
    try {
      return new Date(cvData.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return 'Recently'
    }
  }

  const getSkillIcon = (category: string) => {
    const iconMap = {
      'Testing Fundamentals': RiToolsFill,
      'Testing Tools': RiCodeSSlashFill,
      'Technical Skills': RiLightbulbFlashFill,
      'Soft Skills': RiTeamFill
    }
    return iconMap[category as keyof typeof iconMap] || RiCodeSSlashFill
  }

  const getTechIcon = (tech: string) => {
    const techIconMap: { [key: string]: any } = {
      'TypeScript': SiTypescript,
      'JavaScript': SiJavascript,
      'React': SiReact,
      'Node.js': SiNodedotjs,
      'Python': SiPython,
      'Docker': SiDocker,
      'Kubernetes': SiKubernetes,
      'AWS': SiAmazonaws,
      'Google Cloud': SiGooglecloud,
      'MongoDB': SiMongodb,
      'PostgreSQL': SiPostgresql,
      'Redis': SiRedis,
      'Jest': SiJest,
      'Cypress': SiCypress,
      'Selenium': SiSelenium
    }
    return techIconMap[tech] || HiCode
  }

  const getAchievementIcon = (title: string) => {
    if (title.toLowerCase().includes('award') || title.toLowerCase().includes('recognition')) return RiAwardFill
    if (title.toLowerCase().includes('certification') || title.toLowerCase().includes('certified')) return HiBadgeCheck
    if (title.toLowerCase().includes('project') || title.toLowerCase().includes('development')) return FaRocket
    if (title.toLowerCase().includes('team') || title.toLowerCase().includes('leadership')) return RiTeamFill
    if (title.toLowerCase().includes('performance') || title.toLowerCase().includes('improvement')) return FaFire
    return RiTrophyFill
  }

  if (loading === 'loading' || loading === 'idle') {
    return (
      <Container maxW="container.lg" py={8}>
        <CVSkeleton />
      </Container>
    )
  }

  if (loading === 'error' || !cvData) {
    return (
      <Container maxW="container.lg" py={12}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error || 'Failed to load CV data'}
        </Alert>
      </Container>
    )
  }

  return (
    <>
      <Head>
        <title>{cvData.personal_info.name} - CV</title>
        <meta name="description" content={`CV of ${cvData.personal_info.name} - ${cvData.personal_info.title}`} />
      </Head>

      <Box minH="100vh" position="relative">
        <Container maxW="container.lg" py={8} position="relative" zIndex={1}>
          <Flex gap={6} align="start">
            {/* Main CV Content */}
            <Box flex="1">
              <VStack spacing={5} align="stretch">
                {/* Hero Section */}
                <Card bg={cardBg} shadow="xl" borderRadius="2xl" overflow="hidden" border="2px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                  <CardBody p={0}>
                    <Flex
                      direction={{ base: 'column', lg: 'row' }}
                      align="stretch"
                      minH="350px"
                    >
                      {/* Profile Side */}
                      <Box 
                        flex="1" 
                        bg={profileBg}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        p={6}
                        position="relative"
                        _before={{
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          backgroundImage: `
                            radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 40%),
                            radial-gradient(circle at 70% 80%, rgba(255, 255, 255, 0.02) 0%, transparent 40%)
                          `,
                          pointerEvents: 'none'
                        }}
                      >
                        <VStack spacing={6} textAlign="center" position="relative" zIndex={1}>
                          <Avatar
                            size="2xl"
                            name={cvData.personal_info.name}
                            bg="rgba(255, 255, 255, 0.2)"
                            color="white"
                            border="4px solid white"
                            shadow="2xl"
                            icon={<Icon as={RiUserStarFill} boxSize="40px" />}
                          />
                          <VStack spacing={4} textAlign="center">
                            <Heading color="white" size="lg" textShadow="0 2px 4px rgba(0,0,0,0.3)" textAlign="center">
                              {cvData.personal_info.name}
                            </Heading>
                            <Badge 
                              bg="rgba(255, 255, 255, 0.95)" 
                              color="orange.600" 
                              fontSize="sm" 
                              px={3} 
                              py={1} 
                              borderRadius="full"
                              fontWeight="bold"
                              shadow="md"
                            >
                              {cvData.personal_info.title}
                            </Badge>
                          </VStack>
                        </VStack>
                      </Box>

                      {/* Content Side */}
                      <Box flex="1" p={6} bg={profileCardBg} backdropFilter="blur(10px)">
                        <VStack align="stretch" spacing={4} h="full" justify="center">
                          <Box>
                            <Text fontSize="md" color={textColor} lineHeight="tall">
                              {cvData.personal_info.summary}
                            </Text>
                          </Box>

                          {/* Contact Info with Social Links */}
                          <VStack align="start" spacing={2}>
                            <HStack spacing={3}>
                              <Icon as={RiMailFill} color={accentColor} />
                              <Link href={`mailto:${cvData.personal_info.email}`} color={accentColor} fontSize="sm" fontWeight="medium">
                                {cvData.personal_info.email}
                              </Link>
                            </HStack>
                            <HStack spacing={3}>
                              <Icon as={RiPhoneFill} color={accentColor} />
                              <Link href={`tel:${cvData.personal_info.phone}`} color={accentColor} fontSize="sm" fontWeight="medium">
                                {cvData.personal_info.phone}
                              </Link>
                            </HStack>
                            <HStack spacing={3}>
                              <Icon as={RiLinkedinBoxFill} color={accentColor} />
                              <Link href="https://linkedin.com/in/hue-nguyen" isExternal color={accentColor} fontSize="sm" fontWeight="medium">
                                linkedin.com/in/hue-nguyen
                              </Link>
                            </HStack>
                            <HStack spacing={3}>
                              <Icon as={RiGithubFill} color={accentColor} />
                              <Link href="https://github.com/hue-nguyen" isExternal color={accentColor} fontSize="sm" fontWeight="medium">
                                github.com/hue-nguyen
                              </Link>
                            </HStack>
                            <HStack spacing={3}>
                              <Icon as={RiMapPin2Fill} color={accentColor} />
                              <Text color={accentColor} fontSize="sm" fontWeight="medium">
                                {cvData.personal_info.location}
                              </Text>
                            </HStack>
                          </VStack>
                        </VStack>
                      </Box>
                    </Flex>
                  </CardBody>
                </Card>

                {/* Work Experience */}
                <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack align="stretch" spacing={4}>
                      <Box textAlign="center">
                        <HStack justify="center" spacing={2} mb={2}>
                          <Icon as={HiBriefcase} color={accentColor} boxSize={6} />
                          <Heading as="h2" size="md" color={headingColor}>
                            Work Experience
                          </Heading>
                        </HStack>
                        <Text color={textColor} fontSize="sm">
                          My professional journey and achievements
                        </Text>
                      </Box>
                      
                      <VStack spacing={2} align="stretch">
                        {cvData.work_experience.map((exp, index) => (
                          <Card key={index} bg={borderColor} borderRadius="lg" border="1px solid" borderColor="orange.200" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                            <CardBody p={4}>
                              <VStack align="stretch" spacing={3}>
                                {/* Header */}
                                <Flex justify="space-between" align="start" wrap="wrap">
                                  <VStack align="start" spacing={1}>
                                    <Heading as="h3" size="md" color={headingColor}>
                                      {exp.position}
                                    </Heading>
                                    <HStack spacing={2}>
                                      <Icon as={RiBuilding2Fill} color={accentColor} boxSize={4} />
                                      <Text color={accentColor} fontWeight="600" fontSize="sm">
                                        {exp.company}
                                      </Text>
                                    </HStack>
                                  </VStack>
                                  <Text color={mutedTextColor} fontSize="xs" textAlign="right">
                                    {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                                  </Text>
                                </Flex>
                                
                                {/* Description */}
                                <Text color={textColor} fontSize="sm" lineHeight="tall">
                                  {exp.description}
                                </Text>
                                
                                {/* Technologies */}
                                <Box>
                                  <HStack spacing={2} mb={2}>
                                    <Icon as={HiCode} color={accentColor} boxSize={4} />
                                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                                      Technologies
                                    </Text>
                                  </HStack>
                                  <Flex wrap="wrap" gap={1}>
                                    {exp.technologies.map((tech, techIndex) => (
                                      <Badge
                                        key={techIndex}
                                        bg="white"
                                        color="orange.600"
                                        fontSize="xs"
                                        px={2}
                                        py={1}
                                        borderRadius="md"
                                        border="1px solid"
                                        borderColor="orange.200"
                                      >
                                        {tech}
                                      </Badge>
                                    ))}
                                  </Flex>
                                </Box>
                                
                                {/* Key Achievements */}
                                <Box>
                                  <HStack spacing={2} mb={2}>
                                    <Icon as={RiTrophyFill} color={accentColor} boxSize={4} />
                                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                                      Key Achievements
                                    </Text>
                                  </HStack>
                                  <List spacing={1}>
                                    {exp.achievements.slice(0, 3).map((achievement, achIndex) => (
                                      <ListItem key={achIndex} color={textColor} fontSize="sm">
                                        <ListIcon as={HiCheckCircle} color="orange.400" />
                                        {achievement}
                                      </ListItem>
                                    ))}
                                  </List>
                                </Box>
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                      </VStack>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Skills */}
                <Card bg={cardBg} shadow="lg" borderRadius="xl" border="1px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                  <CardBody p={6}>
                    <VStack align="stretch" spacing={4}>
                      <Box textAlign="center">
                        <HStack justify="center" spacing={2} mb={2}>
                          <Icon as={FaGem} color={accentColor} boxSize={6} />
                          <Heading as="h2" size="md" color={headingColor}>
                            Skills & Expertise
                          </Heading>
                        </HStack>
                        <Text color={textColor} fontSize="sm">
                          Technical and professional competencies
                        </Text>
                      </Box>
                      
                      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={2}>
                        {cvData.skills.map((skillCategory, categoryIndex) => (
                          <Card key={categoryIndex} bg={borderColor} borderRadius="lg" border="1px solid" borderColor="orange.200" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                            <CardBody p={4}>
                              <VStack align="stretch" spacing={3}>
                                <HStack spacing={2}>
                                  <Icon as={getSkillIcon(skillCategory.category)} color={accentColor} boxSize={4} />
                                  <Heading size="sm" color={headingColor}>
                                    {skillCategory.category}
                                  </Heading>
                                </HStack>
                                <Flex wrap="wrap" gap={1}>
                                  {skillCategory.items.map((skill, skillIndex) => (
                                    <Badge
                                      key={skillIndex}
                                      bg="white"
                                      color="orange.600"
                                      fontSize="xs"
                                      px={2}
                                      py={1}
                                      borderRadius="md"
                                      border="1px solid"
                                      borderColor="orange.200"
                                    >
                                      {skill.name}
                                    </Badge>
                                  ))}
                                </Flex>
                              </VStack>
                            </CardBody>
                          </Card>
                        ))}
                      </SimpleGrid>
                    </VStack>
                  </CardBody>
                </Card>

                {/* Achievements and Certifications */}
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  {/* Key Achievements */}
                  <GridItem>
                    <Card bg={cardBg} shadow="lg" borderRadius="xl" h="full" border="1px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                      <CardBody p={5}>
                        <VStack align="stretch" spacing={4}>
                          <Box textAlign="center">
                            <HStack justify="center" spacing={2} mb={2}>
                              <Icon as={RiMedalFill} color={accentColor} boxSize={5} />
                              <Heading as="h2" size="md" color={headingColor}>
                                Key Achievements
                              </Heading>
                            </HStack>
                            <Text color={textColor} fontSize="sm">
                              Notable accomplishments
                            </Text>
                          </Box>
                          
                          <VStack spacing={2} align="stretch">
                            {cvData.key_achievements.map((achievement, index) => (
                              <Card key={index} bg={borderColor} borderRadius="lg" border="1px solid" borderColor="orange.200" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                                <CardBody p={3}>
                                  <VStack align="stretch" spacing={1}>
                                    <HStack justify="space-between">
                                      <Badge bg="white" color="orange.600" fontSize="xs" px={2} py={1} borderRadius="md">
                                        {achievement.year}
                                      </Badge>
                                      <Icon as={getAchievementIcon(achievement.title)} color={accentColor} boxSize={3} />
                                    </HStack>
                                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                                      {achievement.title}
                                    </Text>
                                    <Text color={textColor} fontSize="xs">
                                      {achievement.description}
                                    </Text>
                                  </VStack>
                                </CardBody>
                              </Card>
                            ))}
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  {/* Certifications */}
                  <GridItem>
                    <Card bg={cardBg} shadow="lg" borderRadius="xl" h="full" border="1px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                      <CardBody p={5}>
                        <VStack align="stretch" spacing={4}>
                          <Box textAlign="center">
                            <HStack justify="center" spacing={2} mb={2}>
                              <Icon as={HiBadgeCheck} color={accentColor} boxSize={5} />
                              <Heading as="h2" size="md" color={headingColor}>
                                Certifications
                              </Heading>
                            </HStack>
                            <Text color={textColor} fontSize="sm">
                              Professional credentials
                            </Text>
                          </Box>
                          
                          <VStack spacing={2} align="stretch">
                            {cvData.certifications.map((cert, index) => (
                              <Card key={index} bg={borderColor} borderRadius="lg" border="1px solid" borderColor="orange.200" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                                <CardBody p={3}>
                                  <VStack align="stretch" spacing={1}>
                                    <HStack justify="space-between">
                                      <Badge bg="white" color="orange.600" fontSize="xs" px={2} py={1} borderRadius="md">
                                        {formatDate(cert.date)}
                                      </Badge>
                                      <Icon as={FaShieldAlt} color={accentColor} boxSize={3} />
                                    </HStack>
                                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                                      {cert.name}
                                    </Text>
                                    <Text color={textColor} fontSize="xs">
                                      {cert.issuer}
                                    </Text>
                                  </VStack>
                                </CardBody>
                              </Card>
                            ))}
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>

                {/* Languages & Education */}
                <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
                  {/* Languages */}
                  <GridItem>
                    <Card bg={cardBg} shadow="lg" borderRadius="xl" h="full" border="1px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                      <CardBody p={5}>
                        <VStack align="stretch" spacing={4}>
                          <Box textAlign="center">
                            <HStack justify="center" spacing={2} mb={2}>
                              <Icon as={HiTranslate} color={accentColor} boxSize={5} />
                              <Heading as="h2" size="md" color={headingColor}>
                                Languages
                              </Heading>
                            </HStack>
                            <Text color={textColor} fontSize="sm">
                              Communication skills
                            </Text>
                          </Box>
                          
                          <VStack spacing={2} align="stretch">
                            {cvData.languages.map((lang, index) => (
                              <Card key={index} bg={borderColor} borderRadius="lg" border="1px solid" borderColor="orange.200" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                                <CardBody p={3}>
                                  <Flex justify="space-between" align="center">
                                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                                      {lang.language}
                                    </Text>
                                    <Badge bg="white" color="orange.600" fontSize="xs" px={2} py={1} borderRadius="md">
                                      {lang.level}
                                    </Badge>
                                  </Flex>
                                </CardBody>
                              </Card>
                            ))}
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>

                  {/* Education */}
                  <GridItem>
                    <Card bg={cardBg} shadow="lg" borderRadius="xl" h="full" border="1px solid" borderColor="orange.100" backdropFilter="blur(10px)">
                      <CardBody p={5}>
                        <VStack align="stretch" spacing={4}>
                          <Box textAlign="center">
                            <HStack justify="center" spacing={2} mb={2}>
                              <Icon as={RiGraduationCapFill} color={accentColor} boxSize={5} />
                              <Heading as="h2" size="md" color={headingColor}>
                                Education
                              </Heading>
                            </HStack>
                            <Text color={textColor} fontSize="sm">
                              Academic background
                            </Text>
                          </Box>
                          
                          <VStack spacing={2} align="stretch">
                            {cvData.education.map((edu, index) => (
                              <Card key={index} bg={borderColor} borderRadius="lg" border="1px solid" borderColor="orange.200" _hover={{ transform: 'translateY(-2px)', shadow: 'md' }} transition="all 0.2s">
                                <CardBody p={3}>
                                  <VStack align="stretch" spacing={1}>
                                    <Flex justify="space-between" align="center" mb={1}>
                                      <Text fontSize="xs" color={mutedTextColor}>
                                        {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                                      </Text>
                                    </Flex>
                                    <Text fontSize="sm" fontWeight="600" color={headingColor}>
                                      {edu.degree}
                                    </Text>
                                    <Text fontSize="xs" color={accentColor} fontWeight="500">
                                      {edu.institution}
                                    </Text>
                                    <Text fontSize="xs" color={textColor}>
                                      GPA: {edu.gpa}
                                    </Text>
                                  </VStack>
                                </CardBody>
                              </Card>
                            ))}
                          </VStack>
                        </VStack>
                      </CardBody>
                    </Card>
                  </GridItem>
                </Grid>

                {/* Footer */}
                <Box textAlign="center" py={3}>
                  <Text color={mutedTextColor} fontSize="xs">
                    Last updated: {getLastUpdated()}
                  </Text>
                </Box>
              </VStack>
            </Box>

            {/* Fixed Download Button - Right Side */}
            <Box
              position="sticky"
              top="80px"
              w="180px"
              display={{ base: 'none', lg: 'block' }}
            >
              <Card bg={cardBg} shadow="xl" borderRadius="xl" border="2px solid" borderColor="orange.200" backdropFilter="blur(10px)">
                <CardBody p={5} textAlign="center">
                  <VStack spacing={3}>
                    <Box
                      bg={profileBg}
                      borderRadius="full"
                      w="50px"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Icon as={RiDownloadCloud2Fill} boxSize="20px" color="white" />
                    </Box>
                    <Heading size="sm" color={headingColor}>
                      Download CV
                    </Heading>
                    <Text fontSize="xs" color={textColor} textAlign="center">
                      Download professional CV as PDF
                    </Text>
                    <Button
                      bg={profileBg}
                      color="white"
                      rounded="full"
                      px={4}
                      w="full"
                      size="sm"
                      _hover={{
                        transform: 'translateY(-2px)',
                        shadow: 'lg'
                      }}
                      transition="all 0.2s"
                      onClick={handleDownloadPDF}
                      leftIcon={<Icon as={HiDownload} />}
                    >
                      Download
                    </Button>
                    <Divider borderColor="orange.200" />
                    <VStack spacing={1} fontSize="xs" color={mutedTextColor}>
                      <HStack><Icon as={FaLaptopCode} /><Text>PDF Format</Text></HStack>
                      <HStack><Icon as={FaRocket} /><Text>Ready to Print</Text></HStack>
                      <HStack><Icon as={FaMagic} /><Text>Professional Layout</Text></HStack>
                    </VStack>
                  </VStack>
                </CardBody>
              </Card>
            </Box>

            {/* Mobile Download Button */}
            <Box
              position="fixed"
              bottom="20px"
              right="20px"
              display={{ base: 'block', lg: 'none' }}
              zIndex={1000}
            >
              <Tooltip label="Download CV PDF" placement="left">
                <Button
                  bg={profileBg}
                  color="white"
                  rounded="full"
                  size="lg"
                  shadow="xl"
                  _hover={{
                    transform: 'scale(1.1)',
                  }}
                  transition="all 0.2s"
                  onClick={handleDownloadPDF}
                >
                  <Icon as={HiDownload} />
                </Button>
              </Tooltip>
            </Box>
          </Flex>
        </Container>
      </Box>
    </>
  )
}