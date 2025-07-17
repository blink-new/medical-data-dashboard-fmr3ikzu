export interface Provider {
  id: string;
  name: string;
  zipCode: string;
  date1801: string; // 18.01 Date shared by all line items under one provider
  status: {
    extraction: 'pending' | 'in-progress' | 'completed' | 'error';
    cptMatching: 'pending' | 'in-progress' | 'completed' | 'error';
    ncciEdits: 'pending' | 'in-progress' | 'completed' | 'error';
    ucrPulling: 'pending' | 'in-progress' | 'completed' | 'error';
    excelGeneration: 'pending' | 'in-progress' | 'completed' | 'error';
  };
  lineItems: LineItem[];
}

export interface LineItem {
  id: string;
  cptCode: string;
  description: string;
  units: number;
  amount: number;
  status: 'pending' | 'validated' | 'error';
  ncciEdits?: string[];
  ucrAmount?: number;
}

export interface Case {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  providers: Provider[];
  overallStatus: 'draft' | 'in-progress' | 'completed' | 'error';
}

export type WorkflowStep = 'extraction' | 'cptMatching' | 'ncciEdits' | 'ucrPulling' | 'excelGeneration';