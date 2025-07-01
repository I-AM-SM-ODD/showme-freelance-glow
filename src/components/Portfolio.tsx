import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Star, 
  Calendar, 
  Clock, 
  Edit3, 
  RotateCcw,
  FileText,
  ExternalLink,
  Download
} from 'lucide-react';
import BookingModal from './BookingModal';

interface PortfolioData {
  personalInfo: {
    name: string;
    title: string;
    location: string;
    phone: string;
    email: string;
    website: string;
    about: string;
  };
  skills: string[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    institution: string;
    degree: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  projects: {
    name: string;
    description: string;
    link: string;
  }[];
  testimonials: {
    author: string;
    quote: string;
  }[];
  services: {
    name: string;
    description: string;
    price: number;
  }[];
  booking: {
    isOpen: boolean;
  };
  bookingPreferences: {
    availableDays: string[];
    timeSlots: string[];
    meetingTypes: string[];
    timezone: string;
  };
}

const Portfolio = ({ data, onStartOver, onEdit, onOpenInvoices }) => {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  // Create freelancer data for booking modal
  const freelancerData = {
    name: data.personalInfo.name,
    bookingPreferences: data.bookingPreferences || {
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
      meetingTypes: ['Discovery Call', 'Project Discussion', 'Consultation'],
      timezone: 'UTC'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header with Actions */}
      <div className="bg-white/80 backdrop-blur-lg border-b border-white/20 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{data.personalInfo.name}</h1>
              <p className="text-gray-600">{data.personalInfo.title}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button onClick={onEdit} variant="outline" size="sm" className="bg-white/50">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Portfolio
              </Button>
              <Button onClick={onOpenInvoices} variant="outline" size="sm" className="bg-white/50">
                <FileText className="w-4 h-4 mr-2" />
                Invoice Generator
              </Button>
              <Button onClick={onStartOver} variant="outline" size="sm" className="bg-white/50">
                <RotateCcw className="w-4 h-4 mr-2" />
                Start Over
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Personal Information */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Globe className="w-4 h-4" />
              <a href={data.personalInfo.website} target="_blank" rel="noopener noreferrer" className="underline">
                {data.personalInfo.website}
              </a>
            </div>
            <div>
              <p className="text-gray-700">{data.personalInfo.about}</p>
            </div>
          </CardContent>
        </Card>

        {/* Skills */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Skills</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, index) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Experience */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.experience.map((exp, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{exp.title}</h3>
                  <div className="text-sm text-gray-600">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
                <h4 className="text-md font-medium text-gray-700">{exp.company}</h4>
                <p className="text-gray-700">{exp.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Education */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Education</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.education.map((edu, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{edu.degree}</h3>
                  <div className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <h4 className="text-md font-medium text-gray-700">{edu.institution}</h4>
                <p className="text-gray-700">{edu.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Projects */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.projects.map((project, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-brand hover:underline flex items-center gap-1">
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </a>
                </div>
                <p className="text-gray-700">{project.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Testimonials */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Testimonials</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.testimonials.map((testimonial, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="mb-2">
                  <Star className="w-5 h-5 text-yellow-500 inline-block mr-1" />
                  <span className="font-semibold text-gray-900">{testimonial.author}</span>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </CardContent>
        </Card>

         {/* Services */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {data.services.map((service, index) => (
              <div key={index} className="border rounded-md p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <p className="text-gray-700">{service.description}</p>
                  </div>
                  <div className="text-xl font-bold text-brand">${service.price}</div>
                </div>
                <Button onClick={handleOpenBooking} variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isBookingOpen} 
        onClose={handleCloseBooking} 
        freelancerData={freelancerData}
      />
    </div>
  );
};

export default Portfolio;
