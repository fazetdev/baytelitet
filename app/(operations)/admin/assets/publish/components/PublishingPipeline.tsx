'use client';

import { FC } from 'react';

interface Step {
  step: string;
  status: string;
}

interface Props {
  steps: Step[];
}

const PublishingPipeline: FC<Props> = ({ steps }) => {
  return (
    <div className="space-y-4">
      {steps.map((s, idx) => (
        <div key={idx} className="flex justify-between p-4 bg-gray-50 rounded border border-gray-200">
          <span>{s.step}</span>
          <span>{s.status}</span>
        </div>
      ))}
    </div>
  );
};

export default PublishingPipeline;
