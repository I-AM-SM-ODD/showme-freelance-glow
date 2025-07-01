
import React, { useState, useEffect } from 'react';
import WelcomeScreen from '../components/WelcomeScreen';
import FormWizard from '../components/FormWizard';
import Portfolio from '../components/Portfolio';
import InvoiceGenerator from '../components/InvoiceGenerator';

// Main app component that manages the overall flow
const Index = () => {
  const [currentStep, setCurrentStep] = useState('welcome'); // 'welcome', 'form', 'portfolio', 'invoices'
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

  // Handle navigation to invoices
  const handleOpenInvoices = () => {
    setCurrentStep('invoices');
  };

  // Handle navigation back to portfolio
  const handleBackToPortfolio = () => {
    setCurrentStep('portfolio');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
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
          onOpenInvoices={handleOpenInvoices}
        />
      )}

      {currentStep === 'invoices' && (
        <div>
          <div className="p-4">
            <button
              onClick={handleBackToPortfolio}
              className="mb-4 px-4 py-2 bg-white text-gray-700 rounded-lg shadow-sm border hover:bg-gray-50 transition-colors"
            >
              ← Back to Portfolio
            </button>
          </div>
          <InvoiceGenerator />
        </div>
      )}
    </div>
  );
};

export default Index;
