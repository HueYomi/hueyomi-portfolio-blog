'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface TypewriterTextProps extends TextProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delay?: number;
}

/**
 * TypewriterText component for animated text display
 * Cycles through multiple texts with typing animation
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  speed = 150,
  deleteSpeed = 100,
  delay = 2000,
  ...textProps
}) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  // Memoize the texts array to prevent unnecessary re-renders
  const textsString = texts.join(',');
  const memoizedTexts = useMemo(() => texts, [textsString]);

  useEffect(() => {
    if (!memoizedTexts || memoizedTexts.length === 0) return;

    const currentFullText = memoizedTexts[currentIndex] || '';

    const timeout = setTimeout(() => {
      if (isPaused) {
        setIsPaused(false);
        setIsDeleting(true);
        return;
      }

      if (isDeleting) {
        // Deleting characters
        if (currentText.length > 0) {
          setCurrentText(currentFullText.substring(0, currentText.length - 1));
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % memoizedTexts.length);
        }
      } else {
        // Typing characters
        if (currentText.length < currentFullText.length) {
          setCurrentText(currentFullText.substring(0, currentText.length + 1));
        } else {
          // Finished typing, pause before deleting
          setIsPaused(true);
        }
      }
    }, isPaused ? delay : isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [currentText, currentIndex, isDeleting, isPaused, memoizedTexts, speed, deleteSpeed, delay]);

  return (
    <Text {...textProps}>
      {currentText}
      <Text as="span" opacity={0.7} animation="blink 1s infinite">
        |
      </Text>
    </Text>
  );
};

/**
 * Simple typewriter effect for a single text
 */
export const SimpleTypewriter: React.FC<{
  text: string;
  speed?: number;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
} & Omit<TextProps, 'children'>> = ({
  text,
  speed = 100,
  showCursor = true,
  cursorChar = '|',
  onComplete,
  ...textProps
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [displayText, text, speed, isComplete, onComplete]);

  // Reset when text changes
  useEffect(() => {
    setDisplayText('');
    setIsComplete(false);
  }, [text]);

  return (
    <Text {...textProps}>
      {displayText}
      {showCursor && (
        <Text
          as="span"
          animation="blink 1s infinite"
          sx={{
            '@keyframes blink': {
              '0%, 50%': { opacity: 1 },
              '51%, 100%': { opacity: 0 },
            },
          }}
        >
          {cursorChar}
        </Text>
      )}
    </Text>
  );
};

export default TypewriterText; 