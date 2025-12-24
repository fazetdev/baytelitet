'use client';

import { FC } from 'react';

interface PipelineStepProps {
  step: string;
  status: string;
}

const PipelineStep: FC<PipelineStepProps> = ({ step, status }) => {
  return (
    <div className="flex justify-between items-center p-4 mb-2 border border-gray-200 rounded">
      <span className="font-medium">{step}</span>
      <span className="font-semibold">{status}</span>
    </div>
  );
};

export default PipelineStep;
