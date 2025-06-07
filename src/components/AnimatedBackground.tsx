'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import styles from './AnimatedBackground.module.css';

const AnimatedBackground = () => {
  const [isMounted, setIsMounted] = useState(false);
  const iconColor = useColorModeValue('orange.200', 'orange.800');
  const hoverColor = useColorModeValue('orange.500', 'orange.400');

  // Only run on client side to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Generate evenly distributed positions for icons - memoized to prevent re-generation
  const icons = useMemo(() => {
    if (!isMounted) return [];
    
    const iconList = [];
    const iconCount = 20;
    const gridCols = 5;
    const gridRows = 4;
    
    // Create a grid-based distribution with some randomness
    for (let i = 0; i < iconCount; i++) {
      const row = Math.floor(i / gridCols);
      const col = i % gridCols;
      
      // Base position from grid
      const baseLeft = (col / (gridCols - 1)) * 80 + 10; // 10-90%
      const baseTop = (row / (gridRows - 1)) * 80 + 10;  // 10-90%
      
      // Add some randomness to avoid perfect grid
      const randomOffsetX = (Math.random() - 0.5) * 15; // ±7.5%
      const randomOffsetY = (Math.random() - 0.5) * 15; // ±7.5%
      
      const isStrawberry = Math.random() > 0.5;
      const icon = {
        id: i,
        type: isStrawberry ? 'strawberry' : 'bread',
        left: Math.max(5, Math.min(95, baseLeft + randomOffsetX)),
        top: Math.max(5, Math.min(95, baseTop + randomOffsetY)),
        size: Math.random() * 12 + 18, // 18-30px
        animationDelay: Math.random() * 10,
        animationDuration: Math.random() * 6 + 14, // 14-20s
        floatDistance: Math.random() * 25 + 20, // 20-45px
        rotateAmount: Math.random() * 20 - 10, // -10 to 10 degrees
      };
      iconList.push(icon);
    }
    return iconList;
  }, [isMounted]);

  // Don't render anything on server side
  if (!isMounted) {
    return null;
  }

  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      width="100vw"
      height="100vh"
      zIndex={-1}
      overflow="hidden"
      pointerEvents="none"
    >
      {icons.map((icon) => {
        // Choose animation type based on icon id
        const animationType = icon.id % 3 === 0 ? 'Gentle' : icon.id % 3 === 1 ? 'Medium' : 'Strong';
        const animationClass = styles[`icon${animationType}`];
        
        return (
                      <Box
              key={icon.id}
              position="absolute"
              left={`${icon.left}%`}
              top={`${icon.top}%`}
              fontSize={`${icon.size}px`}
              color={iconColor}
              opacity={0.6}
              pointerEvents="auto"
              cursor="pointer"
              transition="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)"
              className={`${styles.icon} ${animationClass}`}
              _hover={{
                color: hoverColor,
                opacity: 1,
                transform: 'scale(1.6) rotate(15deg)',
                filter: 'drop-shadow(0 6px 12px rgba(255, 165, 0, 0.3))',
              }}
              sx={{
                animationDuration: `${icon.animationDuration}s`,
                animationDelay: `${icon.animationDelay}s`,
              }}
            >
            {icon.type === 'strawberry' ? '🍓' : '🥖'}
          </Box>
        );
      })}
    </Box>
  );
};

export default AnimatedBackground; 