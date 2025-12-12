'use client';

export default function Slider({ value, onChange, min = 0, max = 100 }: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="w-full">
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-sm text-gray-600 mt-1">
        <span>{min}%</span>
        <span className="font-bold">{value}%</span>
        <span>{max}%</span>
      </div>
    </div>
  );
}
