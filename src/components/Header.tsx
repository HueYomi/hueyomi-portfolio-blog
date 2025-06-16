'use client';

import React, { useState } from 'react';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Container,
  HStack,
  VStack,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useColorMode,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'About',
    href: '/about',
  },
  {
    label: 'CV',
    href: '/cv',
  },
  {
    label: 'Blog',
    href: '/blog',
  },
  {
    label: 'Projects',
    href: '/projects',
  },
];

export default function Header() {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('orange.200', 'orange.700');
  const textColor = useColorModeValue('orange.600', 'orange.200');
  const brandColor = useColorModeValue('orange.500', 'orange.300');

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={1000}
      bg={bg}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={borderColor}
      backdropFilter="blur(10px)"
      boxShadow="sm"
    >
      <Container maxW="container.xl">
        <Flex
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          align={'center'}
        >
          {/* Logo */}
          <Flex
            flex={{ base: 1, md: 'auto' }}
            ml={{ base: -2 }}
            display={{ base: 'flex', md: 'none' }}
          >
            <IconButton
              onClick={onToggle}
              icon={
                isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
              }
              variant={'ghost'}
              aria-label={'Toggle Navigation'}
            />
          </Flex>
          
          <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'center' }}>
            <Flex align="center" gap={10}>
              <NextLink href="/">
                <Text
                  fontFamily={'heading'}
                  fontSize={{ base: 'xl', md: '2xl' }}
                  fontWeight="bold"
                  color={brandColor}
                  cursor="pointer"
                  _hover={{
                    color: useColorModeValue('orange.600', 'orange.400'),
                  }}
                  transition="color 0.2s"
                >
                  Hue Yomi
                </Text>
              </NextLink>

              {/* Desktop Navigation */}
              <Flex display={{ base: 'none', md: 'flex' }}>
                <DesktopNav />
              </Flex>
            </Flex>
          </Flex>

          {/* CTA Button and Theme Toggle */}
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={4}
            align="center"
          >
            {/* Theme Toggle */}
            <IconButton
              aria-label="Toggle color mode"
              icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              onClick={toggleColorMode}
              variant="ghost"
              size="sm"
              color={textColor}
              _hover={{
                bg: useColorModeValue('orange.50', 'orange.900'),
                color: brandColor,
              }}
            />
            
            <Button
              as={NextLink}
              href="/contact"
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={brandColor}
              _hover={{
                bg: useColorModeValue('orange.600', 'orange.400'),
              }}
              size="sm"
            >
              Contact
            </Button>
          </Stack>
        </Flex>

        {/* Mobile Navigation */}
        <Collapse in={isOpen} animateOpacity>
          <MobileNav onClose={onClose} />
        </Collapse>
      </Container>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('orange.500', 'orange.300');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                as={NextLink}
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Link
      as={NextLink}
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('orange.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'orange.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'orange.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const MobileNav = ({ onClose }: { onClose: () => void }) => {
  const bg = useColorModeValue('white', 'gray.800');
  
  return (
    <Stack
      bg={bg}
      p={4}
      display={{ md: 'none' }}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('orange.200', 'orange.700')}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} onClose={onClose} />
      ))}
      
      {/* Mobile CTA Buttons */}
      <VStack spacing={3} pt={4} borderTop={1} borderColor={useColorModeValue('orange.200', 'orange.700')}>
        <Button
          as={NextLink}
          href="/contact"
          colorScheme="orange"
          size="sm"
          w="full"
          onClick={onClose}
        >
          Contact Me
        </Button>
      </VStack>
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href, onClose }: NavItem & { onClose: () => void }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={NextLink}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}
        onClick={!children ? onClose : undefined}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('orange.600', 'orange.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('orange.200', 'orange.700')}
          align={'start'}
        >
          {children &&
            children.map((child) => (
              <Link
                key={child.label}
                as={NextLink}
                py={2}
                href={child.href}
                onClick={onClose}
              >
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}; 