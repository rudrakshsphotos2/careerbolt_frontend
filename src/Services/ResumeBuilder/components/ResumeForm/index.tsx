import React, { useState } from 'react';
import { useResumeStore } from '../../store/useResumeStore.ts';
import PersonalDetails from './steps/PersonalDetails.tsx';
import Objective from './steps/Objective.tsx';
import Education from './steps/Education.tsx';
import WorkExperience from './steps/WorkExperience.tsx';
import SkillsAndCertificates from './steps/SkillsAndCertificates.tsx';
import StepperForm, { FormStep } from '../StepperForm/StepperForm.tsx';
import { personalDetailsSchema, objectiveSchema, educationSchema, workExperienceSchema, skillsAndCertificatesSchema } from '../../lib/validation.ts';

const steps: FormStep[] = [
  {
    id: 'personal-details',
    title: 'Personal Details',
    description: 'Basic information about you',
    component: <PersonalDetails />,
    validate: () => {
      try {
        const { error } = personalDetailsSchema.validate(
          useResumeStore.getState().data.personal_details,
          { abortEarly: false }
        );
        return error ? error.message : null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'objective',
    title: 'Career Objective',
    description: 'Your career goals and aspirations',
    component: <Objective />,
    validate: () => {
      try {
        const { error } = objectiveSchema.validate(
          useResumeStore.getState().data.objective,
          { abortEarly: false }
        );
        return error ? error.message : null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'education',
    title: 'Education',
    description: 'Your academic background',
    component: <Education />,
    validate: () => {
      try {
        const { error } = educationSchema.validate(
          useResumeStore.getState().data.education,
          { abortEarly: false }
        );
        return error ? error.message : null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'work-experience',
    title: 'Work Experience',
    description: 'Your professional experience',
    component: <WorkExperience />,
    validate: () => {
      try {
        const { error } = workExperienceSchema.validate(
          useResumeStore.getState().data.work_experiences,
          { abortEarly: false }
        );
        return error ? error.message : null;
      } catch (error) {
        return error.message;
      }
    }
  },
  {
    id: 'skills',
    title: 'Skills & Certificates',
    description: 'Your skills and certifications',
    component: <SkillsAndCertificates />,
    validate: () => {
      try {
        const { error } = skillsAndCertificatesSchema.validate(
          useResumeStore.getState().data.skills_and_certificates,
          { abortEarly: false }
        );
        return error ? error.message : null;
      } catch (error) {
        return error.message;
      }
    }
  }
];

const ResumeForm: React.FC = () => {
  const { data } = useResumeStore();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cleanEmptyOptionalFields = (obj: any): any => {
    if (Array.isArray(obj)) {
      return obj.map(cleanEmptyOptionalFields).filter(Boolean);
    }
    
    if (obj && typeof obj === 'object') {
      const cleaned: any = {};
      
      for (const [key, value] of Object.entries(obj)) {
        if (value === null || value === undefined || value === '') {
          continue;
        }
        
        if (Array.isArray(value) && value.length === 0) {
          continue;
        }
        
        if (typeof value === 'object') {
          const cleanedValue = cleanEmptyOptionalFields(value);
          if (Object.keys(cleanedValue).length > 0) {
            cleaned[key] = cleanedValue;
          }
        } else {
          cleaned[key] = value;
        }
      }
      
      return cleaned;
    }
    
    return obj;
  };

  const handleComplete = async () => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const latestData = useResumeStore.getState().data;
      const cleanedData = cleanEmptyOptionalFields(latestData);
      
      const response = await fetch(process.env.REACT_APP_API_URL!, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cleanedData)
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume. Please try again.');
      }

      // Get the PDF blob from the response
      const pdfBlob = await response.blob();
      
      // Create a URL for the blob
      const pdfUrl = window.URL.createObjectURL(pdfBlob);
      
      // Open the PDF in a new tab
      window.open(pdfUrl, '_blank');
      
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1400px] mx-auto px-4 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            {error}
          </div>
        )}
        
        <StepperForm
          steps={steps}
          onComplete={handleComplete}
          initialData={data}
          title="Resume Builder"
          description="Create your professional resume step by step"
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default ResumeForm;