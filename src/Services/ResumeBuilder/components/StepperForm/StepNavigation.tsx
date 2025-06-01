import React from 'react';

interface StepNavigationProps {
  currentStepIndex: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  isSubmitting?: boolean;
}

const StepNavigation: React.FC<StepNavigationProps> = ({
  currentStepIndex,
  totalSteps,
  onPrevious,
  onNext,
  isSubmitting = false,
}) => {
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;
  
  return (
    <div className="flex justify-between items-center p-6 border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={isFirstStep || isSubmitting}
        className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
          isFirstStep || isSubmitting
            ? 'text-gray-400 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100 active:bg-gray-200'
        }`}
      >
        Back
      </button>
      
      <button
        onClick={onNext}
        disabled={isSubmitting}
        className={`px-6 py-2 rounded-lg font-medium text-white transition-colors duration-200 ${
          isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-900 hover:bg-blue-800 active:bg-blue-950'
        }`}
      >
        {isLastStep ? (isSubmitting ? 'Generating...' : 'Generate Resume') : 'Next'}
      </button>
    </div>
  );
};

export default StepNavigation;