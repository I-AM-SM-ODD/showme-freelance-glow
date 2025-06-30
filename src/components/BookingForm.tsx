
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface BookingFormProps {
  bookingDetails: {
    date: Date;
    timeSlot: string;
    meetingType: string;
  };
  onSubmit: (formData: {
    name: string;
    email: string;
    phone?: string;
    message: string;
    bookingDetails: {
      date: Date;
      timeSlot: string;
      meetingType: string;
    };
  }) => void;
  onBack: () => void;
}

const BookingForm = ({ bookingDetails, onSubmit, onBack }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name, email, and message are required",
        variant: "destructive"
      });
      return;
    }

    onSubmit({
      ...formData,
      bookingDetails
    });
  };

  const isFormValid = formData.name.trim() && formData.email.trim() && formData.message.trim();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📝 Your Details</h2>
        <p className="text-gray-600">Tell us about yourself and your project</p>
      </div>

      {/* Booking Summary */}
      <Card className="p-4 bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-2">Your Selected Booking:</h3>
        <div className="text-sm text-gray-600 space-y-1">
          <p>📅 {bookingDetails.date.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}</p>
          <p>⏰ {bookingDetails.timeSlot}</p>
          <p>💬 {bookingDetails.meetingType}</p>
        </div>
      </Card>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <Input
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <Input
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number (optional)
          </label>
          <Input
            type="tel"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tell us about your project *
          </label>
          <Textarea
            placeholder="Describe your project, goals, and what you'd like to discuss during the call..."
            value={formData.message}
            onChange={(e) => handleInputChange('message', e.target.value)}
            className="w-full min-h-24"
            required
          />
        </div>

        <div className="flex justify-between pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="px-6"
          >
            ← Back to Calendar
          </Button>
          
          <Button
            type="submit"
            disabled={!isFormValid}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-6"
          >
            Book Call 🚀
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
