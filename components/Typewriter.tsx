import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  texts: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({ 
  texts, 
  typeSpeed = 100, 
  deleteSpeed = 50, 
  pauseDuration = 2000, 
  className 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const currentFullText = texts[currentTextIndex];

    const handleTyping = () => {
      if (isDeleting) {
        // Deleting
        setDisplayedText(currentFullText.substring(0, displayedText.length - 1));
        
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      } else {
        // Typing
        setDisplayedText(currentFullText.substring(0, displayedText.length + 1));

        if (displayedText.length === currentFullText.length) {
          // Finished typing one phrase, pause before deleting
          timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
          return; 
        }
      }
    };

    timeout = setTimeout(handleTyping, isDeleting ? deleteSpeed : typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentTextIndex, texts, typeSpeed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

export default Typewriter;