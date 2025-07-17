import { Case } from '../types/medical';

export const mockCases: Case[] = [
  {
    id: 'case-001',
    name: 'Metropolitan Health Network',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:22:00Z',
    overallStatus: 'in-progress',
    providers: [
      {
        id: 'prov-001',
        name: 'Dr. Sarah Johnson',
        zipCode: '10001',
        date1801: '2024-01-15',
        status: {
          extraction: 'completed',
          cptMatching: 'completed',
          ncciEdits: 'in-progress',
          ucrPulling: 'pending',
          excelGeneration: 'pending'
        },
        lineItems: [
          {
            id: 'li-001',
            cptCode: '99213',
            description: 'Office visit, established patient',
            units: 1,
            amount: 150.00,
            status: 'validated'
          },
          {
            id: 'li-002',
            cptCode: '90834',
            description: 'Psychotherapy, 45 minutes',
            units: 1,
            amount: 120.00,
            status: 'validated'
          }
        ]
      },
      {
        id: 'prov-002',
        name: 'City Medical Center',
        zipCode: '10001',
        date1801: '2024-01-15',
        status: {
          extraction: 'completed',
          cptMatching: 'in-progress',
          ncciEdits: 'pending',
          ucrPulling: 'pending',
          excelGeneration: 'pending'
        },
        lineItems: [
          {
            id: 'li-003',
            cptCode: '99214',
            description: 'Office visit, detailed',
            units: 1,
            amount: 200.00,
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'case-002',
    name: 'Regional Healthcare Alliance',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    overallStatus: 'completed',
    providers: [
      {
        id: 'prov-003',
        name: 'Westside Clinic',
        zipCode: '90210',
        date1801: '2024-01-14',
        status: {
          extraction: 'completed',
          cptMatching: 'completed',
          ncciEdits: 'completed',
          ucrPulling: 'completed',
          excelGeneration: 'completed'
        },
        lineItems: [
          {
            id: 'li-004',
            cptCode: '99215',
            description: 'Office visit, comprehensive',
            units: 1,
            amount: 250.00,
            status: 'validated',
            ucrAmount: 275.00
          }
        ]
      }
    ]
  },
  {
    id: 'case-003',
    name: 'Northern Medical Group',
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-13T11:20:00Z',
    overallStatus: 'draft',
    providers: [
      {
        id: 'prov-004',
        name: 'Dr. Michael Chen',
        zipCode: '02101',
        date1801: '2024-01-13',
        status: {
          extraction: 'pending',
          cptMatching: 'pending',
          ncciEdits: 'pending',
          ucrPulling: 'pending',
          excelGeneration: 'pending'
        },
        lineItems: []
      }
    ]
  }
];