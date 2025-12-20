'use client';

import { useState } from 'react';

const roles = [
  { id: 'buyer', label: 'Buyer' },
  { id: 'investor', label: 'Investor' },
  { id: 'developer', label: 'Developer' },
  { id: 'agent', label: 'Agent' },
];

export default function RoleSelector() {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <section className="py-16 bg-bayt-light text-bayt-dark">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">
          Choose Your Role
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelectedRole(role.id)}
              aria-pressed={selectedRole === role.id}
              className={`px-6 py-4 rounded-xl font-semibold transition-all transform 
                ${selectedRole === role.id 
                  ? 'bg-bayt-warm text-bayt-dark scale-105 shadow-2xl' 
                  : 'bg-white text-bayt-dark hover:bg-bayt-warm hover:text-bayt-dark hover:scale-105'}`}
            >
              {role.label}
            </button>
          ))}
        </div>
        {selectedRole && (
          <p className="mt-6 text-xl">
            Selected Role: <span className="font-bold">{roles.find(r => r.id === selectedRole)?.label}</span>
          </p>
        )}
      </div>
    </section>
  );
}
