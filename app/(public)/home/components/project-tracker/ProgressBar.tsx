'use client';

interface ProgressBarProps {
  progress: number; // percentage 0-100
}

export default function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-3">
      <div
        className="bg-bayt-warm h-3 rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
