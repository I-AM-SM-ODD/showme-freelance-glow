
import React, { useState, useEffect } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import FormWizard from '../components/FormWizard';
import Portfolio from '../components/Portfolio';

// Main app component that manages the overall flow
const Index = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'form', 'portfolio'
  const [portfolioData, setPortfolioData] = useState(null);

  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('showme-portfolio');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setPortfolioData(parsed);
      } catch (error) {
        console.log('No valid saved data found');
      }
    }
  }, []);

  // Handle moving to the form step
  const handleStartForm = () => {
    setCurrentStep('form');
  };

  // Handle form completion and moving to portfolio view
  const handleFormComplete = (data) => {
    setPortfolioData(data);
    // Save to localStorage
    localStorage.setItem('showme-portfolio', JSON.stringify(data));
    setCurrentStep('portfolio');
  };

  // Handle starting over (clear data and go back to welcome)
  const handleStartOver = () => {
    setPortfolioData(null);
    localStorage.removeItem('showme-portfolio');
    setCurrentStep('welcome');
  };

  // Handle editing (go back to form with existing data)
  const handleEdit = () => {
    setCurrentStep('form');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-pink-50 to-purple-100">
      {currentStep === 'welcome' && (
        <WelcomeScreen onStart={handleStartForm} />
      )}
      
      {currentStep === 'form' && (
        <FormWizard 
          onComplete={handleFormComplete}
          initialData={portfolioData}
        />
      )}
      
      {currentStep === 'portfolio' && portfolioData && (
        <Portfolio 
          data={portfolioData}
          onStartOver={handleStartOver}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default Index;
