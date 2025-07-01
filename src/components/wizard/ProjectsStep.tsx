
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import EnhancedBolu from '../EnhancedBolu';

interface ProjectsStepProps {
  formData: any;
  onAddProject: () => void;
  onRemoveArrayItem: (arrayName: string, index: number) => void;
  onUpdateArrayItem: (arrayName: string, index: number, field: string, value: any) => void;
}

const ProjectsStep = ({ 
  formData, 
  onAddProject, 
  onRemoveArrayItem, 
  onUpdateArrayItem 
}: ProjectsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="excited" message="Show off your best projects! 🚀" />
        <h2 className="text-2xl font-bold text-gray-800">Projects</h2>
        <p className="text-gray-600">Showcase your best work (optional)</p>
      </div>
      <div className="space-y-4">
        {formData.projects.map((project: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Project #{index + 1}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('projects', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Project name"
              value={project.name}
              onChange={(e) => onUpdateArrayItem('projects', index, 'name', e.target.value)}
            />
            <Input
              placeholder="Project link/URL"
              value={project.link}
              onChange={(e) => onUpdateArrayItem('projects', index, 'link', e.target.value)}
            />
            <Textarea
              placeholder="Project description"
              value={project.description}
              onChange={(e) => onUpdateArrayItem('projects', index, 'description', e.target.value)}
            />
          </div>
        ))}
        <Button onClick={onAddProject} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
      </div>
    </div>
  );
};

export default ProjectsStep;
