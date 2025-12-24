'use client';

interface PipelineStep {
  stepEn: string;
  stepAr: string;
  status: 'complete' | 'pending' | 'scheduled';
  noteEn?: string;
  noteAr?: string;
  link?: string;
}

interface PublishingPipelineProps {
  steps: PipelineStep[];
  lang: 'en' | 'ar';
}

export default function PublishingPipeline({ steps, lang }: PublishingPipelineProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete': return 'text-green-600';
      case 'pending': return 'text-yellow-500';
      case 'scheduled': return 'text-blue-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {steps.map((step, idx) => (
        <div key={idx} className="p-4 border rounded bg-gray-50">
          <div className="flex justify-between items-center">
            <span className="font-medium">{lang === 'en' ? step.stepEn : step.stepAr}</span>
            <span className={getStatusColor(step.status)}>{step.status}</span>
          </div>
          {step.noteEn && (
            <p className="text-sm mt-1 text-gray-700">
              {lang === 'en' ? step.noteEn : step.noteAr}
            </p>
          )}
          {step.link && (
            <a href={step.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline text-sm">
              {lang === 'en' ? 'Reference' : 'مرجع'}
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
