'use client';

import { useState } from 'react';
import { Users, Search } from 'lucide-react';

type LeadStatus = 'hot' | 'warm' | 'cold';

interface Lead {
  id: number;
  name: string;
  status: LeadStatus;
  interest: string;
}

const leadsData: Lead[] = [
  { id: 1, name: 'Ahmed Al Mansoori', status: 'hot', interest: 'Palm Jumeirah Villa' },
  { id: 2, name: 'Sarah Johnson', status: 'warm', interest: 'Downtown Sky Villa' }
];

export default function AgentsPage() {
  const [search, setSearch] = useState('');

  const filteredLeads = leadsData.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gray-50 min-h-screen text-slate-900">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold">Agents Dashboard</h1>
          <p className="text-slate-500">Minimalist build to bypass deployment errors.</p>
        </header>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
          <input 
            className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Search leads..."
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-4">
          {filteredLeads.map(lead => (
            <div key={lead.id} className="p-4 bg-white rounded-xl shadow-sm border flex justify-between items-center">
              <div>
                <h3 className="font-bold">{lead.name}</h3>
                <p className="text-sm text-gray-500">{lead.interest}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                lead.status === 'hot' ? 'bg-red-100 text-red-600' : 
                lead.status === 'warm' ? 'bg-orange-100 text-orange-600' : 
                'bg-blue-100 text-blue-600'
              }`}>
                {lead.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
