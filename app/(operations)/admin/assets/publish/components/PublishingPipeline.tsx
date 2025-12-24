'use client';

import { FC } from 'react';

interface PublishingStep {
  step: string;
  status: string;
}

interface PublishingPipelineProps {
  steps: PublishingStep[];
}

const PublishingPipeline: FC<PublishingPipelineProps> = ({ steps }) => (
  <div className="space-y-4 p-4 bg-blue-50 border border-blue-200 rounded">
    {steps.map((s) => (
      <div key={s.step} className="flex justify-between">
        <span className="font-medium">{s.step}</span>
        <span className="font-semibold">{s.status}</span>
      </div>
    ))}
  </div>
);

export default PublishingPipeline;
