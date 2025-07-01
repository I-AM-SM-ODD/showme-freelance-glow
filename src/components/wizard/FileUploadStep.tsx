
import React from 'react';
import EnhancedBolu from '../EnhancedBolu';
import FileUpload from '../FileUpload';

interface FileUploadStepProps {
  formData: any;
  onFileUpload: (field: string, file: any) => void;
}

const FileUploadStep = ({ formData, onFileUpload }: FileUploadStepProps) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <EnhancedBolu mood="excited" message="Let's make your portfolio shine! ✨" />
        <h2 className="text-2xl font-bold text-gray-800">Upload your files</h2>
        <p className="text-gray-600">Make your portfolio stand out! (All optional)</p>
      </div>
      <div className="space-y-6">
        <FileUpload
          type="image"
          label="Profile Photo"
          description="Upload a professional photo of yourself"
          maxSize={5}
          onFileSelect={(file) => onFileUpload('profilePhoto', file)}
          currentFile={formData.profilePhoto}
        />
        <FileUpload
          type="video"
          label="Intro Video"
          description="Record a short video introducing yourself (max 2 minutes)"
          maxSize={50}
          onFileSelect={(file) => onFileUpload('introVideo', file)}
          currentFile={formData.introVideo}
        />
        <FileUpload
          type="document"
          label="CV/Resume"
          description="Upload your resume or CV"
          maxSize={10}
          onFileSelect={(file) => onFileUpload('cvFile', file)}
          currentFile={formData.cvFile}
        />
      </div>
    </div>
  );
};

export default FileUploadStep;
