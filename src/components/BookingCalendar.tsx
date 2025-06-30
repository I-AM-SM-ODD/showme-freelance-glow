
import React, { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface BookingCalendarProps {
  availableDays: string[];
  timeSlots: string[];
  meetingTypes: string[];
  onBookingSelect: (booking: {
    date: Date;
    timeSlot: string;
    meetingType: string;
  }) => void;
}

const BookingCalendar = ({ 
  availableDays, 
  timeSlots, 
  meetingTypes, 
  onBookingSelect 
}: BookingCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [selectedMeetingType, setSelectedMeetingType] = useState<string>('');

  // Map day names to day numbers (0 = Sunday, 1 = Monday, etc.)
  const dayNameToNumber = {
    'Sunday': 0, 'Monday': 1, 'Tuesday': 2, 'Wednesday': 3,
    'Thursday': 4, 'Friday': 5, 'Saturday': 6
  };

  // Check if a date is available based on freelancer's preferences
  const isDateAvailable = (date: Date) => {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return availableDays.includes(dayName) && date >= new Date();
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (selectedDate && selectedTimeSlot && selectedMeetingType) {
      onBookingSelect({
        date: selectedDate,
        timeSlot: selectedTimeSlot,
        meetingType: selectedMeetingType
      });
    }
  };

  const isBookingComplete = selectedDate && selectedTimeSlot && selectedMeetingType;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">📅 Book a Call</h2>
        <p className="text-gray-600">Choose your preferred date and time</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar */}
        <Card className="p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Select Date</h3>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            disabled={(date) => !isDateAvailable(date)}
            className={cn("w-full pointer-events-auto")}
          />
          <div className="mt-4 text-sm text-gray-500">
            <p>Available days: {availableDays.join(', ')}</p>
          </div>
        </Card>

        {/* Time Slots and Meeting Types */}
        <div className="space-y-6">
          {/* Time Slots */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Select Time</h3>
            <div className="space-y-2">
              {timeSlots.map((slot) => (
                <Badge
                  key={slot}
                  variant={selectedTimeSlot === slot ? "default" : "outline"}
                  className={`w-full cursor-pointer p-3 text-center transition-all ${
                    selectedTimeSlot === slot
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTimeSlot(slot)}
                >
                  {slot}
                </Badge>
              ))}
            </div>
          </Card>

          {/* Meeting Types */}
          <Card className="p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Meeting Type</h3>
            <div className="space-y-2">
              {meetingTypes.map((type) => (
                <Badge
                  key={type}
                  variant={selectedMeetingType === type ? "default" : "outline"}
                  className={`w-full cursor-pointer p-3 text-center transition-all ${
                    selectedMeetingType === type
                      ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedMeetingType(type)}
                >
                  {type}
                </Badge>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Booking Summary */}
      {selectedDate && (
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-gray-800 mb-4">📋 Booking Summary</h3>
          <div className="space-y-2 text-gray-700">
            <p><strong>Date:</strong> {selectedDate.toLocaleDateString()}</p>
            {selectedTimeSlot && <p><strong>Time:</strong> {selectedTimeSlot}</p>}
            {selectedMeetingType && <p><strong>Type:</strong> {selectedMeetingType}</p>}
          </div>
          
          <Button
            onClick={handleConfirmBooking}
            disabled={!isBookingComplete}
            className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
          >
            {isBookingComplete ? 'Confirm Booking 🎉' : 'Complete Selection First'}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default BookingCalendar;
