export type LeadStatus = 'New' | 'Contacted' | 'Viewing' | 'Negotiating' | 'Escrow' | 'Closed' | 'Lost';

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsappEnabled: boolean;
  budget: number;
  currency: string;
  nationality: string;
  interestType: 'Investment' | 'Residential';
  visaCandidate: boolean; // Flagged if budget > 2M AED
  source: 'GoldenVisaChecker' | 'RentalCalculator' | 'PropertyView';
  assignedPropertyId?: string;
  status: LeadStatus;
  createdAt: string;
  lastInteraction: string;
}

export interface AgentListing {
  id: string;
  title: string;
  permitNumber: string; // Trakheesi / RERA License
  permitExpiry: string;
  status: 'Draft' | 'Pending_Approval' | 'Live' | 'Sold';
  price: number;
  developer?: string; // e.g., Emaar, Sobha
  location: string;
  type: 'Off-Plan' | 'Ready';
}

export interface AgentStats {
  totalCommission: number;
  activeLeads: number;
  closedDeals: number;
  conversionRate: number;
}
