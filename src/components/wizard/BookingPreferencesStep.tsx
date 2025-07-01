
import React from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import EnhancedBolu from '../EnhancedBolu';

interface BookingPreferencesStepProps {
  formData: any;
  onInputChange: (field: string, value: any) => void;
  onToggleBookingPreference: (category: string, item: string) => void;
}

const BookingPreferencesStep = ({ 
  formData, 
  onInputChange, 
  onToggleBookingPreference 
}: BookingPreferencesStepProps) => {
  const availableDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const timeSlots = ['Morning (9AM-12PM)', 'Afternoon (12PM-5PM)', 'Evening (5PM-8PM)'];
  const meetingTypes = ['Quick Chat (15min)', 'Consultation (30min)', 'Project Discussion (45min)', 'Deep Dive (1hr)'];

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="excited" message="Let's set up call booking for your clients! 📅" />
        <h2 className="text-2xl font-bold text-gray-800">Call Booking Preferences</h2>
        <p className="text-gray-600">Make it easy for clients to book calls with you!</p>
      </div>
      
      <div className="space-y-6">
        {/* Available Days */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">📅 When are you usually available?</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {availableDays.map((day) => (
              <Badge
                key={day}
                variant={formData.bookingPreferences.availableDays.includes(day) ? "default" : "outline"}
                className={`cursor-pointer p-3 text-center transition-all ${
                  formData.bookingPreferences.availableDays.includes(day)
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onToggleBookingPreference('availableDays', day)}
              >
                {day}
              </Badge>
            ))}
          </div>
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">⏰ Preferred time slots</h3>
          <div className="grid md:grid-cols-3 gap-3">
            {timeSlots.map((slot) => (
              <Badge
                key={slot}
                variant={formData.bookingPreferences.timeSlots.includes(slot) ? "default" : "outline"}
                className={`cursor-pointer p-3 text-center transition-all ${
                  formData.bookingPreferences.timeSlots.includes(slot)
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onToggleBookingPreference('timeSlots', slot)}
              >
                {slot}
              </Badge>
            ))}
          </div>
        </div>

        {/* Meeting Types */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">💬 What types of calls do you offer?</h3>
          <div className="grid md:grid-cols-2 gap-3">
            {meetingTypes.map((type) => (
              <Badge
                key={type}
                variant={formData.bookingPreferences.meetingTypes.includes(type) ? "default" : "outline"}
                className={`cursor-pointer p-3 text-center transition-all ${
                  formData.bookingPreferences.meetingTypes.includes(type)
                    ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white'
                    : 'hover:bg-gray-100'
                }`}
                onClick={() => onToggleBookingPreference('meetingTypes', type)}
              >
                {type}
              </Badge>
            ))}
          </div>
        </div>

        {/* Timezone */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">🌍 Your timezone (optional)</h3>
          <Input
            placeholder="e.g., GMT+1, EST, PST, etc."
            value={formData.bookingPreferences.timezone}
            onChange={(e) => onInputChange('bookingPreferences.timezone', e.target.value)}
            className="text-lg p-4"
          />
        </div>
      </div>
    </div>
  );
};

export default BookingPreferencesStep;
