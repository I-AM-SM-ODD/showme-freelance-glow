
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import EnhancedBolu from '../EnhancedBolu';

interface TestimonialsStepProps {
  formData: any;
  onAddTestimonial: () => void;
  onRemoveArrayItem: (arrayName: string, index: number) => void;
  onUpdateArrayItem: (arrayName: string, index: number, field: string, value: any) => void;
}

const TestimonialsStep = ({ 
  formData, 
  onAddTestimonial, 
  onRemoveArrayItem, 
  onUpdateArrayItem 
}: TestimonialsStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="celebrating" message="Any client testimonials? ⭐" />
        <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
        <p className="text-gray-600">Add client testimonials (optional)</p>
      </div>
      <div className="space-y-4">
        {formData.testimonials.map((testimonial: any, index: number) => (
          <div key={index} className="border rounded-lg p-4 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Testimonial #{index + 1}</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemoveArrayItem('testimonials', index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
            <Input
              placeholder="Client name"
              value={testimonial.author}
              onChange={(e) => onUpdateArrayItem('testimonials', index, 'author', e.target.value)}
            />
            <Textarea
              placeholder="What did they say about your work?"
              value={testimonial.quote}
              onChange={(e) => onUpdateArrayItem('testimonials', index, 'quote', e.target.value)}
            />
          </div>
        ))}
        <Button onClick={onAddTestimonial} variant="outline" className="w-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
    </div>
  );
};

export default TestimonialsStep;
