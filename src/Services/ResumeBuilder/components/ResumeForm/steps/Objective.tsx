import React from 'react';
import FormRow from '../../form/FormRow.tsx';
import TextAreaField from '../../form/TextAreaField.tsx';
import { useResumeStore } from '../../../store/useResumeStore.ts';

const Objective: React.FC = () => {
  const { data, updateData } = useResumeStore();
  const { objective } = data;

  const handleChange = (value: string) => {
    updateData({
      objective: {
        ...objective,
        description: value
      }
    });
  };

  return (
    <div className="space-y-6 max-h-[calc(100vh-400px)] overflow-y-auto pr-4">
      <FormRow fullWidth>
        <TextAreaField
          label="Career Objective"
          value={objective.description}
          onChange={handleChange}
          required
          placeholder="Write a brief summary of your career objectives and goals..."
          rows={6}
        />
      </FormRow>
    </div>
  );
};

export default Objective;