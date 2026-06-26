/**
 * Types definition for BackStage Lead Generation and Strategic Diagnostic System
 */

export interface Lead {
  id?: string;
  name: string;
  company: string;
  whatsapp: string;
  instagram: string;
  segment: string;
  challenges: string[];
}

export interface Diagnostic {
  companyName: string;
  instagram: string;
  authorityScore: number;
  marketPositioning: string;
  socialMediaAdvice: string[];
  automationAdvice: string[];
  trafficAdvice: string[];
  actionPlan: string[];
  estimatedGrowthPotential: string;
}

export interface AdminLead {
  id: string;
  name: string;
  company: string;
  whatsapp: string;
  instagram: string;
  segment: string;
  challenges: string[];
  source: string;
  createdAt: string;
  diagnostic: Diagnostic | null;
}
