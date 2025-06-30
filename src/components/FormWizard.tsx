import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import EnhancedBolu from './EnhancedBolu';
import FileUpload from './FileUpload';

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
    introVideo: null,
    cvFile: null,
    portfolioLinks: {
      website: '',
      linkedin: '',
      github: '',
      behance: '',
      instagram: ''
    },
    hourlyRate: '',
    availability: '',
    bookingPreferences: {
      availableDays: [],
      timeSlots: [],
      meetingTypes: [],
      timezone: '',
      callDurations: []
    },
    ...initialData // Load existing data if editing
  });

  const totalSteps = 9; // Increased from 8 to 9 for booking preferences
  const progress = (currentStep / totalSteps) * 100;

  // Available skills for selection
  const availableSkills = [
    'Web Development', 'Mobile Apps', 'UI/UX Design', 'Graphic Design',
    'Digital Marketing', 'Content Writing', 'Translation', 'Photography',
    'Video Editing', 'Social Media', 'SEO', 'Data Analysis',
    'Virtual Assistant', 'Customer Service', 'Consulting', 'Tutoring',
    'Music Production', 'Voice Over', 'Animation', 'Copywriting'
  ];

  // Available days for booking
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Available time slots
  const timeSlots = ['Morning (9AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)'];
  
  // Meeting types
  const meetingTypes = ['Quick Chat (15min)', 'Consultation (30min)', 'Project Discussion (45min)', 'Deep Dive (1hr)'];

  // Handle input changes
  const handleInputChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
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

  // Handle booking preference toggles
  const toggleBookingPreference = (category, item) => {
    setFormData(prev => ({
      ...prev,
      bookingPreferences: {
        ...prev.bookingPreferences,
        [category]: prev.bookingPreferences[category].includes(item)
          ? prev.bookingPreferences[category].filter(i => i !== item)
          : [...prev.bookingPreferences[category], item]
      }
    }));
  };

  // Handle file uploads
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
      case 7: return true; // File uploads are optional
      case 8: return true; // Portfolio links are optional
      case 9: return true; // Booking preferences are optional
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

  // Get Bolu's mood and message based on current step
  const getBoluProps = () => {
    switch (currentStep) {
      case 1:
        return { mood: 'happy' as const, message: "Nice to meet you! What should I call you?" };
      case 2:
        return { mood: 'encouraging' as const, message: "Tell me your story! Don't be shy 😊" };
      case 3:
        return { mood: 'thinking' as const, message: "What amazing services do you offer?" };
      case 4:
        return { mood: 'excited' as const, message: "Show off those skills! ⚡" };
      case 5:
        return { mood: 'happy' as const, message: "Where in the world are you? 🌍" };
      case 6:
        return { mood: 'encouraging' as const, message: "How can clients reach you? 📱" };
      case 7:
        return { mood: 'excited' as const, message: "Let's make your portfolio shine! ✨" };
      case 8:
        return { mood: 'celebrating' as const, message: "Almost done! Share your online presence 🌐" };
      case 9:
        return { mood: 'excited' as const, message: "Let's set up call booking for your clients! 📅" };
      default:
        return { mood: 'happy' as const, message: "You're doing great!" };
    }
  };

  // Render different form steps
  const renderStep = () => {
    const boluProps = getBoluProps();

    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <EnhancedBolu {...boluProps} />
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
              <EnhancedBolu {...boluProps} />
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
              <EnhancedBolu {...boluProps} />
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
              <EnhancedBolu {...boluProps} />
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
              <EnhancedBolu {...boluProps} />
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
              <EnhancedBolu {...boluProps} />
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
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  placeholder="Hourly rate (e.g., $25/hour)"
                  value={formData.hourlyRate}
                  onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                  className="text-lg p-4"
                />
                <Input
                  placeholder="Availability (e.g., Full-time, Part-time)"
                  value={formData.availability}
                  onChange={(e) => handleInputChange('availability', e.target.value)}
                  className="text-lg p-4"
                />
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <EnhancedBolu {...boluProps} />
              <h2 className="text-2xl font-bold text-gray-800">Upload your files</h2>
              <p className="text-gray-600">Make your portfolio stand out! (All optional)</p>
            </div>
            <div className="space-y-6">
              <FileUpload
                type="image"
                label="Profile Photo"
                description="Upload a professional photo of yourself"
                maxSize={5}
                onFileSelect={(file) => handleFileUpload('profilePhoto', file)}
                currentFile={formData.profilePhoto}
              />
              <FileUpload
                type="video"
                label="Intro Video"
                description="Record a short video introducing yourself (max 2 minutes)"
                maxSize={50}
                onFileSelect={(file) => handleFileUpload('introVideo', file)}
                currentFile={formData.introVideo}
              />
              <FileUpload
                type="document"
                label="CV/Resume"
                description="Upload your resume or CV"
                maxSize={10}
                onFileSelect={(file) => handleFileUpload('cvFile', file)}
                currentFile={formData.cvFile}
              />
            </div>
          </div>
        );

      case 8:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <EnhancedBolu {...boluProps} />
              <h2 className="text-2xl font-bold text-gray-800">Share your online presence</h2>
              <p className="text-gray-600">Add links to your portfolio and social profiles</p>
            </div>
            <div className="space-y-4">
              <Input
                placeholder="Personal website or portfolio URL"
                value={formData.portfolioLinks.website}
                onChange={(e) => handleInputChange('portfolioLinks.website', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="LinkedIn profile URL"
                value={formData.portfolioLinks.linkedin}
                onChange={(e) => handleInputChange('portfolioLinks.linkedin', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="GitHub profile URL"
                value={formData.portfolioLinks.github}
                onChange={(e) => handleInputChange('portfolioLinks.github', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="Behance/Dribbble profile URL"
                value={formData.portfolioLinks.behance}
                onChange={(e) => handleInputChange('portfolioLinks.behance', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="Instagram profile URL"
                value={formData.portfolioLinks.instagram}
                onChange={(e) => handleInputChange('portfolioLinks.instagram', e.target.value)}
                className="text-lg p-4"
              />
            </div>
          </div>
        );

      case 9:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <EnhancedBolu {...boluProps} />
              <h2 className="text-2xl font-bold text-gray-800">Call Booking Preferences</h2>
              <p className="text-gray-600">Make it easy for clients to book calls with you!</p>
            </div>
            
            <div className="space-y-6">
              {/* Available Days */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">📅 When are you usually available?</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {availableDays.map((day) => (
                    <Badge
                      key={day}
                      variant={formData.bookingPreferences.availableDays.includes(day) ? "default" : "outline"}
                      className={`cursor-pointer p-3 text-center transition-all ${
                        formData.bookingPreferences.availableDays.includes(day)
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleBookingPreference('availableDays', day)}
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Time Slots */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">⏰ Preferred time slots</h3>
                <div className="grid md:grid-cols-3 gap-3">
                  {timeSlots.map((slot) => (
                    <Badge
                      key={slot}
                      variant={formData.bookingPreferences.timeSlots.includes(slot) ? "default" : "outline"}
                      className={`cursor-pointer p-3 text-center transition-all ${
                        formData.bookingPreferences.timeSlots.includes(slot)
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleBookingPreference('timeSlots', slot)}
                    >
                      {slot}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Meeting Types */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">💬 What types of calls do you offer?</h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {meetingTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={formData.bookingPreferences.meetingTypes.includes(type) ? "default" : "outline"}
                      className={`cursor-pointer p-3 text-center transition-all ${
                        formData.bookingPreferences.meetingTypes.includes(type)
                          ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => toggleBookingPreference('meetingTypes', type)}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Timezone */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3">🌍 Your timezone (optional)</h3>
                <Input
                  placeholder="e.g., GMT+1, EST, PST, etc."
                  value={formData.bookingPreferences.timezone}
                  onChange={(e) => handleInputChange('bookingPreferences.timezone', e.target.value)}
                  className="text-lg p-4"
                />
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
