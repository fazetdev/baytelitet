'use client';

interface PipelineStepProps {
  step: string;
  status: string;
}

export default function PipelineStep({ step, status }: PipelineStepProps) {
  return (
    <div className="flex justify-between p-4 border border-gray-200 rounded mb-2">
      <span className="font-medium">{step}</span>
      <span>{status}</span>
    </div>
  );
}
