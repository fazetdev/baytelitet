"use client";

import { create } from 'zustand';

interface Lead {
  id: string;
  propertyId: number;
  name: string;
  email: string;
  phone: string;
  message?: string;
  type: 'contact' | 'schedule' | 'callback';
  date: Date;
  status: 'new' | 'contacted' | 'scheduled' | 'closed';
}

interface LeadsStore {
  leads: Lead[];
  addLead: (leadData: Omit<Lead, 'id' | 'date' | 'status'>) => void;
  contactLead: (propertyId: number, name: string, email: string, phone: string) => void;
  scheduleTour: (propertyId: number, date: Date) => void;
  getPropertyLeads: (propertyId: number) => Lead[];
}

export const useLeads = create<LeadsStore>((set, get) => ({
  leads: [],
  
  addLead: (leadData) => {
    const newLead: Lead = {
      ...leadData,
      id: Date.now().toString(),
      date: new Date(),
      status: 'new',
    };
    set((state) => ({ leads: [...state.leads, newLead] }));
    console.log('New lead created:', newLead);
  },
  
  contactLead: (propertyId, name, email, phone) => {
    get().addLead({
      propertyId,
      name,
      email,
      phone,
      type: 'contact',
    });
  },
  
  scheduleTour: (propertyId, date) => {
    const name = prompt('Enter your name:') || '';
    const email = prompt('Enter your email:') || '';
    const phone = prompt('Enter your phone:') || '';
    
    if (name && email && phone) {
      get().addLead({
        propertyId,
        name,
        email,
        phone,
        message: `Scheduled tour for ${date.toLocaleDateString()}`,
        type: 'schedule',
      });
    }
  },
  
  getPropertyLeads: (propertyId) => {
    return get().leads.filter(lead => lead.propertyId === propertyId);
  },
}));
