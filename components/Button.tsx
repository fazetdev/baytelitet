import { ReactNode } from 'react';

export default function Button({ 
  children, 
  className, 
  ...props 
}: { 
  children: ReactNode; 
  className?: string;
  [key: string]: any;
}) {
  return (
    <button 
      className={`px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-all ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
}
