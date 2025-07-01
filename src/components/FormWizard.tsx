
import React, { useState } from 'react';
import FormStep from './wizard/FormStep';
import PersonalInfoSteps from './wizard/PersonalInfoSteps';
import FileUploadStep from './wizard/FileUploadStep';
import PortfolioLinksStep from './wizard/PortfolioLinksStep';
import ExperienceStep from './wizard/ExperienceStep';
import EducationStep from './wizard/EducationStep';
import ProjectsStep from './wizard/ProjectsStep';
import TestimonialsStep from './wizard/TestimonialsStep';
import BookingPreferencesStep from './wizard/BookingPreferencesStep';

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
    experience: [],
    education: [],
    projects: [],
    testimonials: [],
    bookingPreferences: {
      availableDays: [],
      timeSlots: [],
      meetingTypes: [],
      timezone: '',
      callDurations: []
    },
    ...initialData // Load existing data if editing
  });

  const totalSteps = 13;

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

  // Add array item functions
  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: '', company: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', startDate: '', endDate: '', description: '' }]
    }));
  };

  const addProject = () => {
    setFormData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: '', description: '', link: '' }]
    }));
  };

  const addTestimonial = () => {
    setFormData(prev => ({
      ...prev,
      testimonials: [...prev.testimonials, { author: '', quote: '' }]
    }));
  };

  // Remove array item functions
  const removeArrayItem = (arrayName, index) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index)
    }));
  };

  // Update array item functions
  const updateArrayItem = (arrayName, index, field, value) => {
    setFormData(prev => ({
      ...prev,
      [arrayName]: prev[arrayName].map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
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
      case 9: return true; // Experience is optional
      case 10: return true; // Education is optional
      case 11: return true; // Projects are optional
      case 12: return true; // Testimonials are optional
      case 13: return true; // Booking preferences are optional
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

  // Render step content
  const renderStepContent = () => {
    if (currentStep >= 1 && currentStep <= 6) {
      return (
        <PersonalInfoSteps
          step={currentStep}
          formData={formData}
          onInputChange={handleInputChange}
          onToggleSkill={toggleSkill}
          availableSkills={availableSkills}
        />
      );
    }

    switch (currentStep) {
      case 7:
        return (
          <FileUploadStep
            formData={formData}
            onFileUpload={handleFileUpload}
          />
        );
      case 8:
        return (
          <PortfolioLinksStep
            formData={formData}
            onInputChange={handleInputChange}
          />
        );
      case 9:
        return (
          <ExperienceStep
            formData={formData}
            onAddExperience={addExperience}
            onRemoveArrayItem={removeArrayItem}
            onUpdateArrayItem={updateArrayItem}
          />
        );
      case 10:
        return (
          <EducationStep
            formData={formData}
            onAddEducation={addEducation}
            onRemoveArrayItem={removeArrayItem}
            onUpdateArrayItem={updateArrayItem}
          />
        );
      case 11:
        return (
          <ProjectsStep
            formData={formData}
            onAddProject={addProject}
            onRemoveArrayItem={removeArrayItem}
            onUpdateArrayItem={updateArrayItem}
          />
        );
      case 12:
        return (
          <TestimonialsStep
            formData={formData}
            onAddTestimonial={addTestimonial}
            onRemoveArrayItem={removeArrayItem}
            onUpdateArrayItem={updateArrayItem}
          />
        );
      case 13:
        return (
          <BookingPreferencesStep
            formData={formData}
            onInputChange={handleInputChange}
            onToggleBookingPreference={toggleBookingPreference}
          />
        );
      default:
        return null;
    }
  };

  return (
    <FormStep
      currentStep={currentStep}
      totalSteps={totalSteps}
      onNext={nextStep}
      onPrev={prevStep}
      onSubmit={handleSubmit}
      isValid={isStepValid()}
    >
      {renderStepContent()}
    </FormStep>
  );
};

export default FormWizard;
