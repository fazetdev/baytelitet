'use client';

import { useUserRole } from '@/context/useUserRole';

const roles = ['buyer', 'investor', 'developer', 'agent'] as const;

export default function RoleSelector() {
  const { role, setRole } = useUserRole();

  return (
    <div className="my-6 flex flex-col items-center">
      <h3 className="text-lg font-semibold mb-2">Choose Your Role</h3>
      <div className="flex gap-4">
        {roles.map((r) => (
          <button
            key={r}
            onClick={() => setRole(r)}
            className={`px-4 py-2 rounded-lg border font-semibold transition-colors duration-300
              ${
                role === r
                  ? 'bg-bayt-warm text-bayt-dark border-bayt-dark'
                  : 'bg-bayt-cool text-bayt-dark border-bayt-dark hover:bg-bayt-cultural hover:text-white'
              }`}
            aria-label={`Select role ${r}`}
          >
            {r.charAt(0).toUpperCase() + r.slice(1)}
          </button>
        ))}
      </div>
      {role && <p className="mt-2 text-bayt-dark">Selected Role: {role.charAt(0).toUpperCase() + role.slice(1)}</p>}
    </div>
  );
}
