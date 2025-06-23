
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

// Welcome screen component with Bolu mascot introduction
const WelcomeScreen = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 text-center bg-white/90 backdrop-blur-sm shadow-xl border-0">
        {/* Mascot and welcome message */}
        <div className="mb-8">
          <div className="text-8xl mb-4 animate-bounce">🤖</div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hi there! I'm Bolu ✨
          </h1>
          <p className="text-xl text-gray-600 mb-6">
            Your friendly AI assistant
          </p>
        </div>

        {/* Welcome message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-orange-500 to-purple-600 bg-clip-text text-transparent mb-4">
            Welcome to ShowMe
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            🌍 Let's create your amazing freelancer portfolio together! 
            I'll help you showcase your skills and connect with clients worldwide.
          </p>
          <div className="text-left bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">What we'll do together:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>✨ Share your story and skills</li>
              <li>🎯 Highlight your services</li>
              <li>📸 Add your photo and intro</li>
              <li>🚀 Create a beautiful portfolio</li>
              <li>🔗 Get a shareable link instantly</li>
            </ul>
          </div>
        </div>

        {/* Call to action */}
        <div>
          <Button 
            onClick={onStart}
            className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white text-lg px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Let's Get Started! 🚀
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Takes just 3-5 minutes • No signup required
          </p>
        </div>
      </Card>
    </div>
  );
};

export default WelcomeScreen;
