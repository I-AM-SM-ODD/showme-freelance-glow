
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import BookingModal from './BookingModal';

// Portfolio display component
const Portfolio = ({ data, onStartOver, onEdit }) => {
  const [showConfetti, setShowConfetti] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const { toast } = useToast();

  // Handle sharing portfolio
  const handleShare = (platform) => {
    const portfolioUrl = window.location.href;
    const shareText = `Check out ${data.name}'s freelancer portfolio!`;

    switch (platform) {
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareText + ' ' + portfolioUrl)}`);
        break;
      case 'copy':
        navigator.clipboard.writeText(portfolioUrl);
        toast({
          title: "Link copied! 📋",
          description: "Portfolio link copied to clipboard",
        });
        break;
      default:
        break;
    }
  };

  // Check if booking is enabled
  const hasBookingEnabled = data.bookingPreferences && 
    (data.bookingPreferences.availableDays?.length > 0 || 
     data.bookingPreferences.timeSlots?.length > 0 || 
     data.bookingPreferences.meetingTypes?.length > 0);

  // Remove confetti after animation
  React.useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen p-4">
      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
          <div className="text-6xl animate-bounce">🎉</div>
          <div className="absolute top-20 left-1/4 text-4xl animate-pulse">✨</div>
          <div className="absolute top-32 right-1/3 text-3xl animate-bounce delay-300">🎊</div>
          <div className="absolute bottom-1/3 left-1/3 text-5xl animate-pulse delay-500">🌟</div>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Action buttons */}
        <div className="mb-6 flex justify-center gap-4">
          <Button
            onClick={onEdit}
            variant="outline"
            className="px-6"
          >
            ✏️ Edit Info
          </Button>
          <Button
            onClick={onStartOver}
            variant="outline"
            className="px-6"
          >
            🔄 Start Over
          </Button>
        </div>

        {/* Portfolio content */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-xl border-0">
          {/* Header section */}
          <div className="text-center mb-8">
            <div className="w-24 h-24 bg-gradient-to-r from-orange-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-4">
              {data.name.charAt(0).toUpperCase()}
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">{data.name}</h1>
            <p className="text-xl text-gray-600 mb-4">📍 {data.location}</p>
            
            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              {data.skills.map((skill, index) => (
                <Badge 
                  key={index} 
                  className="bg-gradient-to-r from-orange-500 to-purple-600 text-white px-3 py-1"
                >
                  {skill}
                </Badge>
              ))}
            </div>

            {/* Book a Call Button */}
            {hasBookingEnabled && (
              <div className="mb-6">
                <Button
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white px-8 py-3 text-lg"
                >
                  📅 Book a Call
                </Button>
                <p className="text-sm text-gray-500 mt-2">
                  Available: {data.bookingPreferences.availableDays?.join(', ') || 'Flexible schedule'}
                </p>
              </div>
            )}
          </div>

          {/* About section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">👋</span> About Me
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{data.bio}</p>
          </div>

          {/* Services section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">🛠️</span> Services I Offer
            </h2>
            <p className="text-gray-700 leading-relaxed text-lg">{data.services}</p>
          </div>

          {/* Booking Preferences (if enabled) */}
          {hasBookingEnabled && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📅</span> Call Booking
              </h2>
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {data.bookingPreferences.availableDays?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">📅 Available Days</h3>
                      <div className="flex flex-wrap gap-1">
                        {data.bookingPreferences.availableDays.map((day, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {day}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.bookingPreferences.timeSlots?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">⏰ Time Slots</h3>
                      <div className="space-y-1">
                        {data.bookingPreferences.timeSlots.map((slot, index) => (
                          <p key={index} className="text-sm text-gray-600">{slot}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {data.bookingPreferences.meetingTypes?.length > 0 && (
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2">💬 Call Types</h3>
                      <div className="space-y-1">
                        {data.bookingPreferences.meetingTypes.map((type, index) => (
                          <p key={index} className="text-sm text-gray-600">{type}</p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    onClick={() => setIsBookingModalOpen(true)}
                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white"
                  >
                    📞 Schedule a Call Now
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Contact section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
              <span className="mr-2">📱</span> Let's Work Together
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                <span className="text-2xl">📧</span>
                <div>
                  <p className="font-semibold text-gray-800">Email</p>
                  <a href={`mailto:${data.email}`} className="text-blue-600 hover:underline">
                    {data.email}
                  </a>
                </div>
              </div>
              
              {data.phone && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl">📞</span>
                  <div>
                    <p className="font-semibold text-gray-800">Phone</p>
                    <a href={`tel:${data.phone}`} className="text-blue-600 hover:underline">
                      {data.phone}
                    </a>
                  </div>
                </div>
              )}
              
              {data.whatsapp && (
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <span className="text-2xl">💬</span>
                  <div>
                    <p className="font-semibold text-gray-800">WhatsApp</p>
                    <a 
                      href={`https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}`}
                      className="text-green-600 hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {data.whatsapp}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Share section */}
          <div className="text-center border-t pt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🚀 Share This Portfolio
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white px-6"
              >
                💬 Share on WhatsApp
              </Button>
              <Button
                onClick={() => handleShare('copy')}
                variant="outline"
                className="px-6"
              >
                📋 Copy Link
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Share this portfolio with potential clients!
            </p>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500">
          <p>Made with ❤️ using ShowMe</p>
          <p className="text-sm">Empowering freelancers worldwide 🌍</p>
        </div>
      </div>

      {/* Booking Modal */}
      {hasBookingEnabled && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          freelancerData={data}
        />
      )}
    </div>
  );
};

export default Portfolio;
