'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Text, TextProps } from '@chakra-ui/react';

interface TypewriterTextProps extends Omit<TextProps, 'children'> {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  cursorChar?: string;
  onComplete?: () => void;
}

/**
 * TypewriterText component for animated text display
 * Cycles through multiple texts with typing animation
 */
export const TypewriterText: React.FC<TypewriterTextProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  loop = true,
  showCursor = true,
  cursorChar = '|',
  onComplete,
  ...textProps
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const typeText = useCallback(() => {
    const fullText = texts[currentTextIndex];
    
    if (!isDeleting) {
      // Typing forward
      if (currentText.length < fullText.length) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
      } else {
        // Finished typing, pause before deleting
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting
      if (currentText.length > 0) {
        setCurrentText(fullText.substring(0, currentText.length - 1));
      } else {
        // Finished deleting, move to next text
        setIsDeleting(false);
        const nextIndex = (currentTextIndex + 1) % texts.length;
        setCurrentTextIndex(nextIndex);
        
        // If we've completed all texts and not looping, call onComplete
        if (nextIndex === 0 && !loop) {
          onComplete?.();
          return;
        }
      }
    }
  }, [
    texts,
    currentTextIndex,
    currentText,
    isDeleting,
    pauseDuration,
    loop,
    onComplete,
  ]);

  useEffect(() => {
    if (texts.length === 0 || isPaused) return;

    const timeout = setTimeout(
      typeText,
      isDeleting ? deleteSpeed : speed
    );

    return () => clearTimeout(timeout);
  }, [typeText, isDeleting, speed, deleteSpeed, isPaused]);

  // Reset when texts change
  useEffect(() => {
    setCurrentTextIndex(0);
    setCurrentText('');
    setIsDeleting(false);
    setIsPaused(false);
  }, [texts]);

  if (texts.length === 0) {
    return null;
  }

  return (
    <Text {...textProps}>
      {currentText}
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