
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import EnhancedBolu from '../EnhancedBolu';

interface EducationStepProps {
  formData: any;
  onAddEducation: () => void;
  onRemoveArrayItem: (arrayName: string, index: number) => void;
  onUpdateArrayItem: (arrayName: string, index: number, field: string, value: any) => void;
}

const EducationStep = ({ 
  formData, 
  onAddEducation, 
  onRemoveArrayItem, 
  onUpdateArrayItem 
}: EducationStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="happy" message="What about your education? 🎓" />
        <h2 className="text-2xl font-bold text-gray-800">Education</h2>
        <p className="text-gray-600">Add your educational background (optional)</p>
      </div>
      <div className="space-y-4">
        {formData.education.map((edu: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Education #{index + 1}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('education', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Degree/Certification"
              value={edu.degree}
              onChange={(e) => onUpdateArrayItem('education', index, 'degree', e.target.value)}
            />
            <Input
              placeholder="Institution name"
              value={edu.institution}
              onChange={(e) => onUpdateArrayItem('education', index, 'institution', e.target.value)}
            />
            <div className="grid grid-cols-2 gap-3">
              <Input
                placeholder="Start date"
                value={edu.startDate}
                onChange={(e) => onUpdateArrayItem('education', index, 'startDate', e.target.value)}
              />
              <Input
                placeholder="End date"
                value={edu.endDate}
                onChange={(e) => onUpdateArrayItem('education', index, 'endDate', e.target.value)}
              />
            </div>
            <Textarea
              placeholder="Additional details"
              value={edu.description}
              onChange={(e) => onUpdateArrayItem('education', index, 'description', e.target.value)}
            />
          </div>
        ))}
        <Button onClick={onAddEducation} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </div>
    </div>
  );
};

export default EducationStep;
