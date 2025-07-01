
export const transformFormDataToPortfolio = (formData: any) => {
  return {
    personalInfo: {
      name: formData.name || '',
      title: formData.title || 'Freelancer',
      location: formData.location || '',
      phone: formData.phone || '',
      email: formData.email || '',
      website: formData.portfolioLinks?.website || '',
      about: formData.bio || ''
    },
    skills: formData.skills || [],
    experience: formData.experience || [],
    education: formData.education || [],
    projects: formData.projects || [],
    testimonials: formData.testimonials || [],
    services: formData.services ? [{
      name: 'General Services',
      description: formData.services,
      price: parseInt(formData.hourlyRate?.replace(/[^0-9]/g, '')) || 50
    }] : [],
    booking: {
      isOpen: true
    },
    bookingPreferences: formData.bookingPreferences || {
      availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      timeSlots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'],
      meetingTypes: ['Discovery Call', 'Project Discussion', 'Consultation'],
      timezone: 'UTC'
    }
  };
};
