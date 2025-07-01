
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import EnhancedBolu from '../EnhancedBolu';

interface PersonalInfoStepsProps {
  step: number;
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onToggleSkill: (skill: string) => void;
  availableSkills: string[];
}

const PersonalInfoSteps = ({ step, formData, onInputChange, onToggleSkill, availableSkills }: PersonalInfoStepsProps) => {
  const getBoluProps = (stepNum: number) => {
    switch (stepNum) {
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
      default:
        return { mood: 'happy' as const, message: "You're doing great!" };
    }
  };

  const boluProps = getBoluProps(step);

  switch (step) {
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
            onChange={(e) => onInputChange('name', e.target.value)}
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
            onChange={(e) => onInputChange('bio', e.target.value)}
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
            onChange={(e) => onInputChange('services', e.target.value)}
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
                onClick={() => onToggleSkill(skill)}
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
            onChange={(e) => onInputChange('location', e.target.value)}
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
              onChange={(e) => onInputChange('email', e.target.value)}
              className="text-lg p-4"
            />
            <Input
              placeholder="Phone number (optional)"
              value={formData.phone}
              onChange={(e) => onInputChange('phone', e.target.value)}
              className="text-lg p-4"
            />
            <Input
              placeholder="WhatsApp number (optional)"
              value={formData.whatsapp}
              onChange={(e) => onInputChange('whatsapp', e.target.value)}
              className="text-lg p-4"
            />
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                placeholder="Hourly rate (e.g., $25/hour)"
                value={formData.hourlyRate}
                onChange={(e) => onInputChange('hourlyRate', e.target.value)}
                className="text-lg p-4"
              />
              <Input
                placeholder="Availability (e.g., Full-time, Part-time)"
                value={formData.availability}
                onChange={(e) => onInputChange('availability', e.target.value)}
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

export default PersonalInfoSteps;
