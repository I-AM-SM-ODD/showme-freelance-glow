
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import EnhancedBolu from '../EnhancedBolu';

interface ExperienceStepProps {
  formData: any;
  onAddExperience: () => void;
  onRemoveArrayItem: (arrayName: string, index: number) => void;
  onUpdateArrayItem: (arrayName: string, index: number, field: string, value: any) => void;
}

const ExperienceStep = ({ 
  formData, 
  onAddExperience, 
  onRemoveArrayItem, 
  onUpdateArrayItem 
}: ExperienceStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="thinking" message="Tell me about your work experience! 💼" />
        <h2 className="text-2xl font-bold text-gray-800">Work Experience</h2>
        <p className="text-gray-600">Add your professional experience (optional)</p>
      </div>
      <div className="space-y-4">
        {formData.experience.map((exp: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Experience #{index + 1}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('experience', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Job title"
              value={exp.title}
              onChange={(e) => onUpdateArrayItem('experience', index, 'title', e.target.value)}
            />
            <Input
              placeholder="Company name"
              value={exp.company}
              onChange={(e) => onUpdateArrayItem('experience', index, 'company', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Start date"
                value={exp.startDate}
                onChange={(e) => onUpdateArrayItem('experience', index, 'startDate', e.target.value)}
              />
              <Input
                placeholder="End date (or 'Present')"
                value={exp.endDate}
                onChange={(e) => onUpdateArrayItem('experience', index, 'endDate', e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Describe your role and achievements"
              value={exp.description}
              onChange={(e) => onUpdateArrayItem('experience', index, 'description', e.target.value)}
            />
          </div>
        ))}
        <Button onClick={onAddExperience} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Experience
        </Button>
      </div>
    </div>
  );
};

export default ExperienceStep;
