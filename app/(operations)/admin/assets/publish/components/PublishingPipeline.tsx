'use client';

interface PipelineStep {
  step: string;
  status: string;
}

interface PublishingPipelineProps {
  steps: PipelineStep[];
}

export default function PublishingPipeline({ steps }: PublishingPipelineProps) {
  return (
    <div className="space-y-4">
      {steps.map((item, idx) => (
        <div key={idx} className="flex justify-between p-4 border border-gray-200 rounded bg-gray-50">
          <span className="font-medium">{item.step}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
}
