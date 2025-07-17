import { Case } from '../types/medical';

export const mockCases: Case[] = [
  {
    id: 'case-001',
    name: 'Metropolitan Health Network - Q1 2024',
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-16T14:22:00Z',
    overallStatus: 'in-progress',
    providers: [
      {
        id: 'prov-001',
        name: 'Dr. Sarah Johnson, MD - Internal Medicine',
        zipCode: '10001',
        date1801: '2024-01-15',
        status: {
          extraction: 'completed',
          cptMatching: 'completed',
          ncciEdits: 'completed',
          ucrPulling: 'in-progress',
          excelGeneration: 'pending'
        },
        lineItems: [
          {
            id: 'li-001',
            cptCode: '99213',
            description: 'Office/outpatient visit, established patient, low complexity',
            units: 1,
            amount: 150.00,
            status: 'validated',
            ucrAmount: 165.00,
            ncciEdits: []
          },
          {
            id: 'li-002',
            cptCode: '90834',
            description: 'Psychotherapy, 45 minutes with patient',
            units: 1,
            amount: 120.00,
            status: 'validated',
            ucrAmount: 135.00,
            ncciEdits: []
          },
          {
            id: 'li-003',
            cptCode: '36415',
            description: 'Collection of venous blood by venipuncture',
            units: 1,
            amount: 25.00,
            status: 'validated',
            ucrAmount: 28.00,
            ncciEdits: []
          },
          {
            id: 'li-004',
            cptCode: '80053',
            description: 'Comprehensive metabolic panel',
            units: 1,
            amount: 45.00,
            status: 'validated',
            ucrAmount: 52.00,
            ncciEdits: []
          }
        ]
      },
      {
        id: 'prov-002',
        name: 'City Medical Center - Cardiology Dept',
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
            id: 'li-005',
            cptCode: '99214',
            description: 'Office/outpatient visit, established patient, moderate complexity',
            units: 1,
            amount: 200.00,
            status: 'validated',
            ncciEdits: []
          },
          {
            id: 'li-006',
            cptCode: '93000',
            description: 'Electrocardiogram, routine ECG with 12 leads',
            units: 1,
            amount: 85.00,
            status: 'validated',
            ncciEdits: []
          },
          {
            id: 'li-007',
            cptCode: '93306',
            description: 'Echocardiography, transthoracic, real-time',
            units: 1,
            amount: 350.00,
            status: 'validated',
            ncciEdits: []
          }
        ]
      },
      {
        id: 'prov-003',
        name: 'Manhattan Orthopedic Associates',
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
            id: 'li-008',
            cptCode: '99215',
            description: 'Office/outpatient visit, established patient, high complexity',
            units: 1,
            amount: 275.00,
            status: 'pending'
          },
          {
            id: 'li-009',
            cptCode: '73721',
            description: 'MRI lower extremity without contrast',
            units: 1,
            amount: 1200.00,
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'case-002',
    name: 'Regional Healthcare Alliance - Surgical Claims',
    createdAt: '2024-01-14T09:15:00Z',
    updatedAt: '2024-01-14T16:45:00Z',
    overallStatus: 'completed',
    providers: [
      {
        id: 'prov-004',
        name: 'Westside Surgical Center',
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
            id: 'li-010',
            cptCode: '47562',
            description: 'Laparoscopic cholecystectomy',
            units: 1,
            amount: 2500.00,
            status: 'validated',
            ucrAmount: 2750.00,
            ncciEdits: []
          },
          {
            id: 'li-011',
            cptCode: '00790',
            description: 'Anesthesia for intraperitoneal procedures',
            units: 3,
            amount: 450.00,
            status: 'validated',
            ucrAmount: 495.00,
            ncciEdits: []
          },
          {
            id: 'li-012',
            cptCode: '76700',
            description: 'Ultrasound, abdominal, real time',
            units: 1,
            amount: 180.00,
            status: 'validated',
            ucrAmount: 198.00,
            ncciEdits: []
          }
        ]
      },
      {
        id: 'prov-005',
        name: 'Beverly Hills Anesthesia Group',
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
            id: 'li-013',
            cptCode: '00840',
            description: 'Anesthesia for intraperitoneal procedures in lower abdomen',
            units: 4,
            amount: 600.00,
            status: 'validated',
            ucrAmount: 660.00,
            ncciEdits: []
          }
        ]
      }
    ]
  },
  {
    id: 'case-003',
    name: 'Northern Medical Group - Emergency Department',
    createdAt: '2024-01-13T11:20:00Z',
    updatedAt: '2024-01-16T09:30:00Z',
    overallStatus: 'in-progress',
    providers: [
      {
        id: 'prov-006',
        name: 'Dr. Michael Chen, MD - Emergency Medicine',
        zipCode: '02101',
        date1801: '2024-01-13',
        status: {
          extraction: 'completed',
          cptMatching: 'completed',
          ncciEdits: 'pending',
          ucrPulling: 'pending',
          excelGeneration: 'pending'
        },
        lineItems: [
          {
            id: 'li-014',
            cptCode: '99284',
            description: 'Emergency department visit, high complexity',
            units: 1,
            amount: 450.00,
            status: 'validated'
          },
          {
            id: 'li-015',
            cptCode: '71020',
            description: 'Chest X-ray, 2 views',
            units: 1,
            amount: 120.00,
            status: 'validated'
          },
          {
            id: 'li-016',
            cptCode: '80048',
            description: 'Basic metabolic panel',
            units: 1,
            amount: 35.00,
            status: 'validated'
          }
        ]
      },
      {
        id: 'prov-007',
        name: 'Boston Radiology Associates',
        zipCode: '02101',
        date1801: '2024-01-13',
        status: {
          extraction: 'completed',
          cptMatching: 'in-progress',
          ncciEdits: 'pending',
          ucrPulling: 'pending',
          excelGeneration: 'pending'
        },
        lineItems: [
          {
            id: 'li-017',
            cptCode: '74177',
            description: 'CT abdomen and pelvis with contrast',
            units: 1,
            amount: 850.00,
            status: 'pending'
          },
          {
            id: 'li-018',
            cptCode: '76700',
            description: 'Ultrasound, abdominal, real time',
            units: 1,
            amount: 180.00,
            status: 'pending'
          }
        ]
      }
    ]
  },
  {
    id: 'case-004',
    name: 'Pacific Coast Medical - Outpatient Surgery',
    createdAt: '2024-01-12T14:45:00Z',
    updatedAt: '2024-01-12T14:45:00Z',
    overallStatus: 'draft',
    providers: [
      {
        id: 'prov-008',
        name: 'Dr. Lisa Rodriguez, MD - Dermatology',
        zipCode: '94102',
        date1801: '2024-01-12',
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
  },
  {
    id: 'case-005',
    name: 'Texas Medical Center - Oncology Division',
    createdAt: '2024-01-11T08:15:00Z',
    updatedAt: '2024-01-15T17:20:00Z',
    overallStatus: 'error',
    providers: [
      {
        id: 'prov-009',
        name: 'Houston Cancer Institute',
        zipCode: '77030',
        date1801: '2024-01-11',
        status: {
          extraction: 'completed',
          cptMatching: 'completed',
          ncciEdits: 'error',
          ucrPulling: 'pending',
          excelGeneration: 'pending'
        },
        lineItems: [
          {
            id: 'li-019',
            cptCode: '96413',
            description: 'Chemotherapy administration, IV infusion, up to 1 hour',
            units: 1,
            amount: 350.00,
            status: 'error',
            ncciEdits: ['Bundling conflict with 96365']
          },
          {
            id: 'li-020',
            cptCode: '96365',
            description: 'IV infusion, for therapy, up to 1 hour',
            units: 1,
            amount: 150.00,
            status: 'error',
            ncciEdits: ['Bundling conflict with 96413']
          }
        ]
      }
    ]
  }
];