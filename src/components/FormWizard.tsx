
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

// Multi-step form wizard component
const FormWizard = ({ onComplete, initialData }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    bio: '',
    services: '',
    skills: [],
    location: '',
    email: '',
    phone: '',
    whatsapp: '',
    profilePhoto: null,
    introMedia: null,
    ...initialData // Load existing data if editing
  });

  const totalSteps = 6;
  const progress = (currentStep / totalSteps) * 100;

  // Available skills for selection
  const availableSkills = [
    'Web Development', 'Mobile Apps', 'UI/UX Design', 'Graphic Design',
    'Digital Marketing', 'Content Writing', 'Translation', 'Photography',
    'Video Editing', 'Social Media', 'SEO', 'Data Analysis',
    'Virtual Assistant', 'Customer Service', 'Consulting', 'Tutoring',
    'Music Production', 'Voice Over', 'Animation', 'Copywriting'
  ];

  // Handle input changes
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle skill selection
  const toggleSkill = (skill) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  // Handle file uploads (placeholder for now)
  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  // Validate current step
  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.name.trim() !== '';
      case 2: return formData.bio.trim() !== '';
      case 3: return formData.services.trim() !== '';
      case 4: return formData.skills.length > 0;
      case 5: return formData.location.trim() !== '';
      case 6: return formData.email.trim() !== '';
      default: return true;
    }
  };

  // Move to next step
  const nextStep = () => {
    if (currentStep < totalSteps && isStepValid()) {
      setCurrentStep(prev => prev + 1);
    }
  };

  // Move to previous step
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Complete form and submit
  const handleSubmit = () => {
    if (isStepValid()) {
      onComplete(formData);
    }
  };

  // Render different form steps
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">👋</div>
              <h2 className="text-2xl font-bold text-gray-800">What's your name?</h2>
              <p className="text-gray-600">Let's start with the basics!</p>
            </div>
            <Input
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="text-lg p-4"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📝</div>
              <h2 className="text-2xl font-bold text-gray-800">Tell us about yourself</h2>
              <p className="text-gray-600">Share your story and experience</p>
            </div>
            <Textarea
              placeholder="I'm a passionate freelancer who loves... (Share your background, experience, and what drives you)"
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="min-h-32 text-lg p-4"
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🛠️</div>
              <h2 className="text-2xl font-bold text-gray-800">What services do you offer?</h2>
              <p className="text-gray-600">Describe what you can help clients with</p>
            </div>
            <Textarea
              placeholder="I offer web development, UI/UX design, and digital marketing services. I can help you..."
              value={formData.services}
              onChange={(e) => handleInputChange('services', e.target.value)}
              className="min-h-32 text-lg p-4"
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-800">What are your skills?</h2>
              <p className="text-gray-600">Select all that apply (choose at least one)</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {availableSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant={formData.skills.includes(skill) ? "default" : "outline"}
                  className={`cursor-pointer p-3 text-center transition-all ${
                    formData.skills.includes(skill)
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => toggleSkill(skill)}
                >
                  {skill}
                </Badge>
              ))}
            </div>
            {formData.skills.length > 0 && (
              <div className="text-center text-sm text-gray-600">
                Selected: {formData.skills.length} skill{formData.skills.length > 1 ? 's' : ''}
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🌍</div>
              <h2 className="text-2xl font-bold text-gray-800">Where are you located?</h2>
              <p className="text-gray-600">Help clients know your timezone and location</p>
            </div>
            <Input
              placeholder="e.g., Lagos, Nigeria or New York, USA"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="text-lg p-4"
            />
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">📱</div>
              <h2 className="text-2xl font-bold text-gray-800">How can clients reach you?</h2>
              <p className="text-gray-600">Add your contact information</p>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="your.email@example.com *"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="Phone number (optional)"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="WhatsApp number (optional)"
                value={formData.whatsapp}
                onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                className="text-lg p-4"
              />
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="font-semibold text-gray-800">Optional uploads:</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">📸</div>
                  <p className="text-sm text-gray-600">Profile Photo</p>
                  <p className="text-xs text-gray-500">Coming soon!</p>
                </div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <div className="text-2xl mb-2">🎥</div>
                  <p className="text-sm text-gray-600">Intro Video/Audio</p>
                  <p className="text-xs text-gray-500">Coming soon!</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

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
          {renderStep()}
        </div>

        {/* Navigation buttons */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="px-6"
          >
            Back
          </Button>
          
          {currentStep < totalSteps ? (
            <Button
              onClick={nextStep}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-orange-500 to-purple-600 hover:from-orange-600 hover:to-purple-700 text-white px-6"
            >
              Next ✨
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={!isStepValid()}
              className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6"
            >
              Create Portfolio! 🎉
            </Button>
          )}
        </div>

        {/* Validation message */}
        {!isStepValid() && (
          <p className="text-center text-sm text-orange-600 mt-4">
            Please fill in the required information to continue
          </p>
        )}
      </Card>
    </div>
  );
};

export default FormWizard;
