'use client';

import { FC } from 'react';

interface PipelineStepProps {
  step: string;
  status: string;
}

const PipelineStep: FC<PipelineStepProps> = ({ step, status }) => (
  <div className="flex justify-between items-center p-4 border border-gray-200 rounded bg-white/5">
    <span className="font-medium">{step}</span>
    <span className="font-mono">{status}</span>
  </div>
);

export default PipelineStep;
