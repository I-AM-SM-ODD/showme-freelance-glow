
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface FormStepProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onSubmit: () => void;
  isValid: boolean;
  children: React.ReactNode;
}

const FormStep = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrev, 
  onSubmit, 
  isValid, 
  children 
}: FormStepProps) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-8 bg-white/90 backdrop-blur-sm shadow-xl border-0">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            <span className="text-sm text-gray-600">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Form content */}
        <div className="mb-8">
          {children}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onPrev}
            disabled={currentStep === 1}
            className="px-6"
          >
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={onNext}
              disabled={!isValid}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-6"
            >
              Next ✨
            </Button>
          ) : (
            <Button
              onClick={onSubmit}
              disabled={!isValid}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6"
            >
              Create Portfolio! 🎉
            </Button>
          )}
        </div>

        {/* Validation message */}
        {!isValid && (
          <p className="text-center text-sm text-orange-600 mt-4">
            Please fill in the required information to continue
          </p>
        )}
      </Card>
    </div>
  );
};

export default FormStep;
