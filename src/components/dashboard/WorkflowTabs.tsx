import { Provider, WorkflowStep } from '../../types/medical';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { 
  FileText, 
  Search, 
  Shield, 
  DollarSign, 
  FileSpreadsheet,
  Play,
  CheckCircle,
  Clock,
  AlertCircle,
  Download,
  Eye,
  AlertTriangle
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
      return <div className="w-4 h-4 rounded-full border-2 border-muted-foreground" />;
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
      return 'bg-muted text-muted-foreground border-border';
  }
};

export function WorkflowTabs({ provider, onRunStep }: WorkflowTabsProps) {
  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-canela text-2xl font-medium text-foreground mb-1">
              Workflow Processing
            </h2>
            <p className="text-sm text-muted-foreground font-inter">
              {provider.name} • ZIP {provider.zipCode} • 18.01 Date: {provider.date1801}
            </p>
          </div>
        </div>
      </div>

      {/* Workflow Steps */}
      <Tabs defaultValue="extraction" className="w-full">
        <TabsList className="w-full justify-start p-6 bg-transparent border-b border-border rounded-none h-auto">
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
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-canela text-xl font-medium text-foreground">
                        {step.label}
                      </h3>
                      <p className="text-sm text-muted-foreground font-inter">
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
                <div className="bg-muted/50 rounded-lg p-6">
                  {step.key === 'extraction' && (
                    <div>
                      <h4 className="font-inter font-semibold text-foreground mb-4">
                        Data Extraction Results
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-foreground">{provider.lineItems.length}</div>
                              <div className="text-sm text-muted-foreground font-inter">Line Items Extracted</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-foreground">
                                ${provider.lineItems.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">Total Amount</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-green-600">✓</div>
                              <div className="text-sm text-muted-foreground font-inter">Provider Validated</div>
                            </div>
                          </div>
                          
                          {provider.lineItems.length > 0 && (
                            <div>
                              <h5 className="font-inter font-medium text-foreground mb-3">Extracted Line Items</h5>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="font-inter">Description</TableHead>
                                    <TableHead className="font-inter">Units</TableHead>
                                    <TableHead className="font-inter">Amount</TableHead>
                                    <TableHead className="font-inter">Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {provider.lineItems.map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell className="font-inter">{item.description}</TableCell>
                                      <TableCell className="font-inter">{item.units}</TableCell>
                                      <TableCell className="font-inter">${item.amount.toFixed(2)}</TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className={`font-inter ${getStatusColor(item.status)}`}>
                                          {item.status}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-inter">
                          Ready to extract medical data from source documents. This process will identify procedures, diagnoses, and billing information.
                        </p>
                      )}
                    </div>
                  )}

                  {step.key === 'cptMatching' && (
                    <div>
                      <h4 className="font-inter font-semibold text-foreground mb-4">
                        CPT Code Matching Results
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-green-600">
                                {provider.lineItems.filter(item => item.cptCode).length}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">CPT Codes Matched</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-foreground">100%</div>
                              <div className="text-sm text-muted-foreground font-inter">Match Accuracy</div>
                            </div>
                          </div>
                          
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-inter">CPT Code</TableHead>
                                <TableHead className="font-inter">Description</TableHead>
                                <TableHead className="font-inter">Amount</TableHead>
                                <TableHead className="font-inter">Status</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {provider.lineItems.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <Badge variant="outline" className="font-inter font-mono">
                                      {item.cptCode}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="font-inter">{item.description}</TableCell>
                                  <TableCell className="font-inter">${item.amount.toFixed(2)}</TableCell>
                                  <TableCell>
                                    <Badge variant="outline" className={`font-inter ${getStatusColor(item.status)}`}>
                                      {item.status}
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-inter">
                          Match extracted procedures to appropriate CPT codes using the latest AMA CPT code database.
                        </p>
                      )}
                    </div>
                  )}

                  {step.key === 'ncciEdits' && (
                    <div>
                      <h4 className="font-inter font-semibold text-foreground mb-4">
                        NCCI Edit Validation
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-green-600">
                                {provider.lineItems.filter(item => !item.ncciEdits || item.ncciEdits.length === 0).length}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">Clean Claims</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-red-600">
                                {provider.lineItems.filter(item => item.ncciEdits && item.ncciEdits.length > 0).length}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">Edit Conflicts</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-foreground">
                                {Math.round((provider.lineItems.filter(item => !item.ncciEdits || item.ncciEdits.length === 0).length / provider.lineItems.length) * 100)}%
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">Pass Rate</div>
                            </div>
                          </div>
                          
                          {provider.lineItems.some(item => item.ncciEdits && item.ncciEdits.length > 0) && (
                            <div>
                              <h5 className="font-inter font-medium text-foreground mb-3 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-red-600" />
                                NCCI Edit Conflicts
                              </h5>
                              <Table>
                                <TableHeader>
                                  <TableRow>
                                    <TableHead className="font-inter">CPT Code</TableHead>
                                    <TableHead className="font-inter">Description</TableHead>
                                    <TableHead className="font-inter">Edit Conflicts</TableHead>
                                    <TableHead className="font-inter">Status</TableHead>
                                  </TableRow>
                                </TableHeader>
                                <TableBody>
                                  {provider.lineItems
                                    .filter(item => item.ncciEdits && item.ncciEdits.length > 0)
                                    .map((item) => (
                                    <TableRow key={item.id}>
                                      <TableCell>
                                        <Badge variant="outline" className="font-inter font-mono">
                                          {item.cptCode}
                                        </Badge>
                                      </TableCell>
                                      <TableCell className="font-inter">{item.description}</TableCell>
                                      <TableCell>
                                        <div className="space-y-1">
                                          {item.ncciEdits?.map((edit, index) => (
                                            <Badge key={index} variant="destructive" className="font-inter text-xs">
                                              {edit}
                                            </Badge>
                                          ))}
                                        </div>
                                      </TableCell>
                                      <TableCell>
                                        <Badge variant="outline" className={`font-inter ${getStatusColor(item.status)}`}>
                                          {item.status}
                                        </Badge>
                                      </TableCell>
                                    </TableRow>
                                  ))}
                                </TableBody>
                              </Table>
                            </div>
                          )}
                        </div>
                      ) : status === 'error' ? (
                        <div className="space-y-4">
                          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                            <div className="flex items-center gap-2 text-red-600 mb-2">
                              <AlertCircle className="w-4 h-4" />
                              <span className="font-inter font-medium">NCCI Edit Conflicts Detected</span>
                            </div>
                            <p className="text-sm text-red-600 font-inter">
                              Multiple bundling conflicts found. Manual review required.
                            </p>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-inter">
                          Validate procedure combinations against NCCI edit rules to identify bundling conflicts and modifier requirements.
                        </p>
                      )}
                    </div>
                  )}

                  {step.key === 'ucrPulling' && (
                    <div>
                      <h4 className="font-inter font-semibold text-foreground mb-4">
                        UCR Rate Analysis
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-foreground">
                                ${provider.lineItems.reduce((sum, item) => sum + (item.ucrAmount || 0), 0).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">Total UCR Amount</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-green-600">
                                +${(provider.lineItems.reduce((sum, item) => sum + (item.ucrAmount || 0), 0) - 
                                   provider.lineItems.reduce((sum, item) => sum + item.amount, 0)).toFixed(2)}
                              </div>
                              <div className="text-sm text-muted-foreground font-inter">UCR Uplift</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-foreground">{provider.zipCode}</div>
                              <div className="text-sm text-muted-foreground font-inter">ZIP Code</div>
                            </div>
                          </div>
                          
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-inter">CPT Code</TableHead>
                                <TableHead className="font-inter">Billed Amount</TableHead>
                                <TableHead className="font-inter">UCR Amount</TableHead>
                                <TableHead className="font-inter">Difference</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {provider.lineItems.map((item) => (
                                <TableRow key={item.id}>
                                  <TableCell>
                                    <Badge variant="outline" className="font-inter font-mono">
                                      {item.cptCode}
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="font-inter">${item.amount.toFixed(2)}</TableCell>
                                  <TableCell className="font-inter">
                                    {item.ucrAmount ? `$${item.ucrAmount.toFixed(2)}` : 'Pending'}
                                  </TableCell>
                                  <TableCell className="font-inter">
                                    {item.ucrAmount ? (
                                      <span className={item.ucrAmount > item.amount ? 'text-green-600' : 'text-red-600'}>
                                        ${(item.ucrAmount - item.amount).toFixed(2)}
                                      </span>
                                    ) : '-'}
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-inter">
                          Pull usual, customary, and reasonable rates for ZIP code {provider.zipCode} to establish fair market pricing.
                        </p>
                      )}
                    </div>
                  )}

                  {step.key === 'excelGeneration' && (
                    <div>
                      <h4 className="font-inter font-semibold text-foreground mb-4">
                        Report Generation
                      </h4>
                      {status === 'completed' ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-green-600">✓</div>
                              <div className="text-sm text-muted-foreground font-inter">Excel Report Generated</div>
                            </div>
                            <div className="bg-card p-4 rounded-lg border border-border">
                              <div className="text-2xl font-bold text-green-600">✓</div>
                              <div className="text-sm text-muted-foreground font-inter">Counter Affidavit Ready</div>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <Button variant="outline" className="w-full justify-start font-inter">
                              <Download className="w-4 h-4 mr-2" />
                              Download Excel Report
                            </Button>
                            <Button variant="outline" className="w-full justify-start font-inter">
                              <Download className="w-4 h-4 mr-2" />
                              Download Counter Affidavit
                            </Button>
                            <Button variant="outline" className="w-full justify-start font-inter">
                              <Eye className="w-4 h-4 mr-2" />
                              Preview Summary Report
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-muted-foreground font-inter">
                          Generate comprehensive Excel reports and counter affidavit documents for submission.
                        </p>
                      )}
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