
import React, { useState, useEffect } from 'react';

interface EnhancedBoluProps {
  mood?: 'happy' | 'excited' | 'thinking' | 'celebrating' | 'encouraging';
  message?: string;
  animated?: boolean;
}

const EnhancedBolu = ({ mood = 'happy', message, animated = true }: EnhancedBoluProps) => {
  const [currentAnimation, setCurrentAnimation] = useState('bounce');
  const [showMessage, setShowMessage] = useState(false);

  // Cycle through different animations
  useEffect(() => {
    if (!animated) return;
    
    const animations = ['bounce', 'pulse', 'float'];
    const interval = setInterval(() => {
      setCurrentAnimation(animations[Math.floor(Math.random() * animations.length)]);
    }, 3000);

    return () => clearInterval(interval);
  }, [animated]);

  // Show message with delay
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setShowMessage(true), 500);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const getBoluEmoji = () => {
    switch (mood) {
      case 'excited': return '🤖✨';
      case 'thinking': return '🤖💭';
      case 'celebrating': return '🎉🤖';
      case 'encouraging': return '💪🤖';
      default: return '🤖';
    }
  };

  const getAnimationClass = () => {
    if (!animated) return '';
    switch (currentAnimation) {
      case 'pulse': return 'animate-pulse';
      case 'float': return 'animate-[float_3s_ease-in-out_infinite]';
      default: return 'animate-bounce';
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className={`text-8xl mb-4 ${getAnimationClass()}`}>
        {getBoluEmoji()}
      </div>
      {message && showMessage && (
        <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border-0 mb-4 animate-fade-in">
          <div className="relative">
            <p className="text-gray-700 text-center font-medium">{message}</p>
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-white/90"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedBolu;
