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
import { useRouter, usePathname } from 'next/navigation';
import { useNavigationContext } from '@/components/providers/NavigationProvider';

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
  const pathname = usePathname();
  const { colorMode, toggleColorMode } = useColorMode();
  const { startNavigation } = useNavigationContext();

  const bg = useColorModeValue('rgba(255, 255, 255, 0.95)', 'rgba(26, 32, 44, 0.95)');
  const borderColor = useColorModeValue('orange.200', 'orange.700');
  const textColor = useColorModeValue('orange.600', 'orange.200');
  const brandColor = useColorModeValue('orange.500', 'orange.300');
  const logoInactiveColor = useColorModeValue('gray.600', 'gray.300');
  const themeToggleHoverBg = useColorModeValue('orange.50', 'orange.900');
  const contactButtonActiveBg = useColorModeValue('orange.600', 'orange.400');
  const contactButtonHoverBg = useColorModeValue('orange.600', 'orange.400');

  // Check if current path is active
  const isActivePath = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname.startsWith(href)) return true;
    return false;
  };

  // Handle navigation with loading
  const handleNavigation = (href: string) => {
    startNavigation(href);
  };

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
              <Text
                fontFamily={'heading'}
                fontSize={{ base: 'xl', md: '2xl' }}
                fontWeight="bold"
                color={isActivePath('/') ? brandColor : logoInactiveColor}
                cursor="pointer"
                onClick={() => handleNavigation('/')}
                _hover={{
                  color: brandColor,
                }}
                transition="color 0.2s"
                position="relative"
                _after={isActivePath('/') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '-4px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '2px',
                  bg: brandColor,
                  borderRadius: 'full',
                } : {}}
              >
                Hue Yomi
              </Text>

              {/* Desktop Navigation */}
              <Flex display={{ base: 'none', md: 'flex' }}>
                <DesktopNav pathname={pathname} isActivePath={isActivePath} onNavigate={handleNavigation} />
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
                bg: themeToggleHoverBg,
                color: brandColor,
              }}
            />
            
            <Button
              onClick={() => handleNavigation('/contact')}
              display={{ base: 'none', md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={isActivePath('/contact') ? contactButtonActiveBg : brandColor}
              _hover={{
                bg: contactButtonHoverBg,
              }}
              size="sm"
              position="relative"
              _after={isActivePath('/contact') ? {
                content: '""',
                position: 'absolute',
                bottom: '-4px',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '80%',
                height: '2px',
                bg: 'white',
                borderRadius: 'full',
              } : {}}
            >
              Contact
            </Button>
          </Stack>
        </Flex>
      </Container>

      {/* Mobile Navigation */}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav onClose={onClose} pathname={pathname} isActivePath={isActivePath} onNavigate={handleNavigation} />
      </Collapse>
    </Box>
  );
}

interface DesktopNavProps {
  pathname: string;
  isActivePath: (href: string) => boolean;
  onNavigate: (href: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ pathname, isActivePath, onNavigate }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('orange.500', 'orange.300');
  const activeLinkColor = useColorModeValue('orange.500', 'orange.300');
  const popoverBg = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={8} align="center">
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Text
                p={2}
                fontSize={'md'}
                fontWeight={500}
                color={isActivePath(navItem.href || '#') ? activeLinkColor : linkColor}
                cursor="pointer"
                onClick={() => navItem.href && onNavigate(navItem.href)}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                position="relative"
                _after={isActivePath(navItem.href || '#') ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '0px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '80%',
                  height: '2px',
                  bg: activeLinkColor,
                  borderRadius: 'full',
                } : {}}
                transition="all 0.2s"
              >
                {navItem.label}
              </Text>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverBg}
                p={4}
                rounded={'xl'}
                minW={'sm'}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} onNavigate={onNavigate} />
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

const DesktopSubNav = ({ label, href, subLabel, onNavigate }: NavItem & { onNavigate: (href: string) => void }) => {
  const linkColor = useColorModeValue('gray.900', 'gray.200');
  const linkHoverColor = useColorModeValue('orange.500', 'orange.300');
  const linkHoverBg = useColorModeValue('orange.50', 'orange.900');
  const subLabelColor = useColorModeValue('gray.500', 'gray.400');

  return (
    <Box
      onClick={() => href && onNavigate(href)}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      cursor="pointer"
      _hover={{ bg: linkHoverBg }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: linkHoverColor }}
            fontWeight={500}
            color={linkColor}
          >
            {label}
          </Text>
          {subLabel && (
            <Text fontSize={'sm'} color={subLabelColor}>
              {subLabel}
            </Text>
          )}
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
          <Icon color={linkHoverColor} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

interface MobileNavProps {
  onClose: () => void;
  pathname: string;
  isActivePath: (href: string) => boolean;
  onNavigate: (href: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ onClose, pathname, isActivePath, onNavigate }) => {
  const stackBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Stack
      bg={stackBg}
      p={4}
      display={{ md: 'none' }}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={borderColor}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem
          key={navItem.label}
          {...navItem}
          onClose={onClose}
          isActive={isActivePath(navItem.href || '#')}
          onNavigate={onNavigate}
        />
      ))}
    </Stack>
  );
};

interface MobileNavItemProps extends NavItem {
  onClose: () => void;
  isActive: boolean;
  onNavigate: (href: string) => void;
}

const MobileNavItem: React.FC<MobileNavItemProps> = ({ 
  label, 
  children, 
  href, 
  onClose, 
  isActive,
  onNavigate 
}) => {
  const { isOpen, onToggle } = useDisclosure();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const activeTextColor = useColorModeValue('orange.500', 'orange.300');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const handleClick = () => {
    if (href) {
      onNavigate(href);
      onClose();
    } else if (children) {
      onToggle();
    }
  };

  return (
    <Stack spacing={4}>
      <Flex
        py={2}
        onClick={handleClick}
        justify={'space-between'}
        align={'center'}
        _hover={{
          bg: hoverBg,
        }}
        cursor="pointer"
        p={2}
        rounded="md"
      >
        <Text
          fontWeight={600}
          color={isActive ? activeTextColor : textColor}
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
          borderColor={borderColor}
          align={'start'}
        >
          {children?.map((child) => (
            <Text
              key={child.label}
              py={2}
              cursor="pointer"
              onClick={() => {
                if (child.href) {
                  onNavigate(child.href);
                  onClose();
                }
              }}
              _hover={{
                color: activeTextColor,
              }}
            >
              {child.label}
            </Text>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}; 