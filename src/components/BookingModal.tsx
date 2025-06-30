
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import BookingCalendar from './BookingCalendar';
import BookingForm from './BookingForm';
import EnhancedBolu from './EnhancedBolu';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  freelancerData: {
    name: string;
    bookingPreferences: {
      availableDays: string[];
      timeSlots: string[];
      meetingTypes: string[];
      timezone?: string;
    };
  };
}

const BookingModal = ({ isOpen, onClose, freelancerData }: BookingModalProps) => {
  const [currentStep, setCurrentStep] = useState<'calendar' | 'form' | 'confirmation'>('calendar');
  const [selectedBooking, setSelectedBooking] = useState<{
    date: Date;
    timeSlot: string;
    meetingType: string;
  } | null>(null);
  
  const { toast } = useToast();

  const handleBookingSelect = (booking: { date: Date; timeSlot: string; meetingType: string }) => {
    setSelectedBooking(booking);
    setCurrentStep('form');
  };

  const handleFormSubmit = (formData: any) => {
    // Save booking to localStorage (in a real app, this would go to a backend)
    const bookings = JSON.parse(localStorage.getItem('showme-bookings') || '[]');
    const newBooking = {
      id: Date.now(),
      freelancer: freelancerData.name,
      client: formData,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    bookings.push(newBooking);
    localStorage.setItem('showme-bookings', JSON.stringify(bookings));
    
    setCurrentStep('confirmation');
    
    toast({
      title: "Booking Request Sent! 🎉",
      description: `Your call with ${freelancerData.name} has been requested.`,
    });
  };

  const handleBack = () => {
    if (currentStep === 'form') {
      setCurrentStep('calendar');
    }
  };

  const handleClose = () => {
    setCurrentStep('calendar');
    setSelectedBooking(null);
    onClose();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 'calendar':
        return (
          <BookingCalendar
            availableDays={freelancerData.bookingPreferences.availableDays}
            timeSlots={freelancerData.bookingPreferences.timeSlots}
            meetingTypes={freelancerData.bookingPreferences.meetingTypes}
            onBookingSelect={handleBookingSelect}
          />
        );
      
      case 'form':
        return selectedBooking ? (
          <BookingForm
            bookingDetails={selectedBooking}
            onSubmit={handleFormSubmit}
            onBack={handleBack}
          />
        ) : null;
      
      case 'confirmation':
        return (
          <div className="text-center space-y-6 py-8">
            <EnhancedBolu mood="celebrating" message="Your booking request has been sent!" />
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">🎉 Booking Requested!</h2>
              <p className="text-gray-600 mb-6">
                {freelancerData.name} will review your request and get back to you soon.
              </p>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-green-800 mb-2">What happens next?</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>✅ {freelancerData.name} will receive your booking request</li>
                  <li>📧 You'll get a confirmation email</li>
                  <li>📅 They'll send you a calendar invite if approved</li>
                  <li>💬 You can prepare any questions beforehand</li>
                </ul>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Book a Call with {freelancerData.name}
            {freelancerData.bookingPreferences.timezone && (
              <span className="text-sm font-normal text-gray-500 ml-2">
                ({freelancerData.bookingPreferences.timezone})
              </span>
            )}
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {renderStep()}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
