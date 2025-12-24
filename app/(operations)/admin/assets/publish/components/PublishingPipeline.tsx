'use client';

import { FC } from 'react';

interface Step {
  step: string;
  status: string;
}

interface PublishingPipelineProps {
  steps: Step[];
}

const PublishingPipeline: FC<PublishingPipelineProps> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((item, idx) => (
        <div key={idx} className="p-4 border rounded flex justify-between items-center bg-gray-50">
          <span className="font-medium">{item.step}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
};

export default PublishingPipeline;
