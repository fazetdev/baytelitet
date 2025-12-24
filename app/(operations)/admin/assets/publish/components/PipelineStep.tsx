'use client';

interface PipelineStepProps {
  step: string;
  status: string;
}

export default function PipelineStep({ step, status }: PipelineStepProps) {
  return (
    <div className="flex justify-between items-center p-4 mb-2 bg-white/5 border border-gray-200 rounded">
      <span className="font-medium">{step}</span>
      <span className="font-bold">{status}</span>
    </div>
  );
}
