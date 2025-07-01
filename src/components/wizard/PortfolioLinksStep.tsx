
import React from 'react';
import { Input } from '@/components/ui/input';
import EnhancedBolu from '../EnhancedBolu';

interface PortfolioLinksStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
}

const PortfolioLinksStep = ({ formData, onInputChange }: PortfolioLinksStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="celebrating" message="Share your online presence 🌐" />
        <h2 className="text-2xl font-bold text-gray-800">Share your online presence</h2>
        <p className="text-gray-600">Add links to your portfolio and social profiles</p>
      </div>
      <div className="space-y-4">
        <Input
          placeholder="Personal website or portfolio URL"
          value={formData.portfolioLinks.website}
          onChange={(e) => onInputChange('portfolioLinks.website', e.target.value)}
          className="text-lg p-4"
        />
        <Input
          placeholder="LinkedIn profile URL"
          value={formData.portfolioLinks.linkedin}
          onChange={(e) => onInputChange('portfolioLinks.linkedin', e.target.value)}
          className="text-lg p-4"
        />
        <Input
          placeholder="GitHub profile URL"
          value={formData.portfolioLinks.github}
          onChange={(e) => onInputChange('portfolioLinks.github', e.target.value)}
          className="text-lg p-4"
        />
        <Input
          placeholder="Behance/Dribbble profile URL"
          value={formData.portfolioLinks.behance}
          onChange={(e) => onInputChange('portfolioLinks.behance', e.target.value)}
          className="text-lg p-4"
        />
        <Input
          placeholder="Instagram profile URL"
          value={formData.portfolioLinks.instagram}
          onChange={(e) => onInputChange('portfolioLinks.instagram', e.target.value)}
          className="text-lg p-4"
        />
      </div>
    </div>
  );
};

export default PortfolioLinksStep;
