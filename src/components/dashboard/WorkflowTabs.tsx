import { Provider, WorkflowStep } from '../../types/medical';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  FileText, 
  Search, 
  Shield, 
  DollarSign, 
  FileSpreadsheet,
  Play,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';

interface WorkflowTabsProps {
  provider: Provider;
  onRunStep: (step: WorkflowStep) => void;
}

const workflowSteps = [
  {
    key: 'extraction' as WorkflowStep,
    label: 'Data Extraction',
    icon: FileText,
    description: 'Extract medical data from source documents'
  },
  {
    key: 'cptMatching' as WorkflowStep,
    label: 'CPT Matching',
    icon: Search,
    description: 'Match procedures to CPT codes'
  },
  {
    key: 'ncciEdits' as WorkflowStep,
    label: 'NCCI Edits',
    icon: Shield,
    description: 'Validate against NCCI edit rules'
  },
  {
    key: 'ucrPulling' as WorkflowStep,
    label: 'UCR Pulling',
    icon: DollarSign,
    description: 'Pull usual, customary, and reasonable rates'
  },
  {
    key: 'excelGeneration' as WorkflowStep,
    label: 'Excel Generation',
    icon: FileSpreadsheet,
    description: 'Generate Excel reports and counter affidavits'
  }
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'in-progress':
      return <Clock className="w-4 h-4 text-blue-600" />;
    case 'error':
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <div className="w-4 h-4 rounded-full border-2 border-gray-300" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-500/10 text-green-600 border-green-500/20';
    case 'in-progress':
      return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
    case 'error':
      return 'bg-red-500/10 text-red-600 border-red-500/20';
    default:
      return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
  }
};

export function WorkflowTabs({ provider, onRunStep }: WorkflowTabsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-canela text-2xl font-medium text-gray-900 mb-1">
              Workflow Processing
            </h2>
            <p className="text-sm text-gray-600 font-inter">
              {provider.name} • ZIP {provider.zipCode} • 18.01 Date: {provider.date1801}
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <Tabs defaultValue="extraction" className="w-full">
        <TabsList className="w-full justify-start p-6 bg-transparent border-b border-gray-200 rounded-none h-auto">
          {workflowSteps.map((step) => {
            const status = provider.status[step.key];
            const Icon = step.icon;
            
            return (
              <TabsTrigger
                key={step.key}
                value={step.key}
                className="flex items-center gap-2 px-4 py-3 data-[state=active]:bg-primary/5 data-[state=active]:border-primary data-[state=active]:border-b-2 rounded-none border-b-2 border-transparent font-inter"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{step.label}</span>
                {getStatusIcon(status)}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {workflowSteps.map((step) => {
          const status = provider.status[step.key];
          const Icon = step.icon;
          
          return (
            <TabsContent key={step.key} value={step.key} className="p-6 mt-0">
              <div className="space-y-6">
                {/* Step Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div>
                      <h3 className="font-canela text-xl font-medium text-gray-900">
                        {step.label}
                      </h3>
                      <p className="text-sm text-gray-600 font-inter">
                        {step.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge 
                      variant="outline" 
                      className={`font-inter ${getStatusColor(status)}`}
                    >
                      {status}
                    </Badge>
                    {status === 'pending' && (
                      <Button 
                        onClick={() => onRunStep(step.key)}
                        className="font-inter font-medium"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Run Step
                      </Button>
                    )}
                  </div>
                </div>

                {/* Step Content */}
                <div className="bg-gray-50 rounded-lg p-6">
                  {step.key === 'extraction' && (
                    <div>
                      <h4 className="font-inter font-semibold text-gray-900 mb-3">
                        Data Extraction Status
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-2">
                          <p className="text-sm text-gray-600 font-inter">
                            ✓ Successfully extracted {provider.lineItems.length} line items
                          </p>
                          <p className="text-sm text-gray-600 font-inter">
                            ✓ Provider information validated
                          </p>
                          <p className="text-sm text-gray-600 font-inter">
                            ✓ 18.01 date confirmed: {provider.date1801}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 font-inter">
                          Ready to extract medical data from source documents
                        </p>
                      )}
                    </div>
                  )}

                  {step.key === 'cptMatching' && (
                    <div>
                      <h4 className="font-inter font-semibold text-gray-900 mb-3">
                        CPT Code Matching
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-2">
                          {provider.lineItems.map((item) => (
                            <div key={item.id} className="flex justify-between items-center text-sm">
                              <span className="font-inter text-gray-600">{item.description}</span>
                              <Badge variant="outline" className="font-inter">
                                {item.cptCode}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-gray-600 font-inter">
                          Match extracted procedures to appropriate CPT codes
                        </p>
                      )}
                    </div>
                  )}

                  {step.key === 'ncciEdits' && (
                    <div>
                      <h4 className="font-inter font-semibold text-gray-900 mb-3">
                        NCCI Edit Validation
                      </h4>
                      <p className="text-sm text-gray-600 font-inter">
                        Validate procedure combinations against NCCI edit rules
                      </p>
                    </div>
                  )}

                  {step.key === 'ucrPulling' && (
                    <div>
                      <h4 className="font-inter font-semibold text-gray-900 mb-3">
                        UCR Rate Pulling
                      </h4>
                      <p className="text-sm text-gray-600 font-inter">
                        Pull usual, customary, and reasonable rates for ZIP code {provider.zipCode}
                      </p>
                    </div>
                  )}

                  {step.key === 'excelGeneration' && (
                    <div>
                      <h4 className="font-inter font-semibold text-gray-900 mb-3">
                        Report Generation
                      </h4>
                      <p className="text-sm text-gray-600 font-inter">
                        Generate Excel reports and counter affidavit documents
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}