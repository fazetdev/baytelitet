'use client';

import { FC } from 'react';

interface MarketSegmentationProps {
  regions: { name: string; status: string }[];
}

const MarketSegmentation: FC<MarketSegmentationProps> = ({ regions }) => (
  <div className="space-y-2">
    {regions.map((region) => (
      <div
        key={region.name}
        className="flex justify-between p-3 border border-gray-200 rounded bg-white/5"
      >
        <span>{region.name}</span>
        <span>{region.status}</span>
      </div>
    ))}
  </div>
);

export default MarketSegmentation;
