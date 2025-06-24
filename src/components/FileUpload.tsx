
import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, FileText, Image, Video } from 'lucide-react';

interface FileUploadProps {
  type: 'image' | 'video' | 'document' | 'any';
  onFileSelect: (file: File | null) => void;
  currentFile?: File | null;
  maxSize?: number; // in MB
  accept?: string;
  label: string;
  description?: string;
}

const FileUpload = ({ 
  type, 
  onFileSelect, 
  currentFile, 
  maxSize = 10, 
  accept, 
  label, 
  description 
}: FileUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const getAcceptString = () => {
    if (accept) return accept;
    switch (type) {
      case 'image': return 'image/*';
      case 'video': return 'video/*';
      case 'document': return '.pdf,.doc,.docx';
      default: return '*/*';
    }
  };

  const validateFile = (file: File): boolean => {
    // Size validation
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive"
      });
      return false;
    }

    // Type validation
    const acceptedTypes = getAcceptString().split(',').map(t => t.trim());
    const isValidType = acceptedTypes.some(acceptedType => {
      if (acceptedType === '*/*') return true;
      if (acceptedType.startsWith('.')) {
        return file.name.toLowerCase().endsWith(acceptedType.toLowerCase());
      }
      return file.type.match(acceptedType.replace('*', '.*'));
    });

    if (!isValidType) {
      toast({
        title: "Invalid file type",
        description: `Please select a valid file type: ${getAcceptString()}`,
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileSelect = (file: File) => {
    if (!validateFile(file)) return;

    onFileSelect(file);

    // Create preview for images
    if (type === 'image' && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }

    toast({
      title: "File uploaded successfully! 📁",
      description: `${file.name} has been uploaded`,
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    onFileSelect(null);
    setPreview(null);
  };

  const getFileIcon = () => {
    switch (type) {
      case 'image': return <Image className="w-8 h-8" />;
      case 'video': return <Video className="w-8 h-8" />;
      case 'document': return <FileText className="w-8 h-8" />;
      default: return <Upload className="w-8 h-8" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-gray-800 mb-1">{label}</h3>
        {description && (
          <p className="text-sm text-gray-600">{description}</p>
        )}
      </div>

      {currentFile ? (
        <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {preview ? (
                <img src={preview} alt="Preview" className="w-12 h-12 object-cover rounded" />
              ) : (
                getFileIcon()
              )}
              <div>
                <p className="font-medium text-gray-800">{currentFile.name}</p>
                <p className="text-sm text-gray-600">
                  {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={removeFile}
              className="text-red-600 hover:text-red-700"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
            isDragOver
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="flex flex-col items-center space-y-2">
            {getFileIcon()}
            <p className="text-gray-600">
              Drag & drop your file here, or <span className="text-blue-600">browse</span>
            </p>
            <p className="text-xs text-gray-500">
              Max size: {maxSize}MB • {getAcceptString()}
            </p>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={getAcceptString()}
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};

export default FileUpload;
