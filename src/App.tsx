import { useState } from 'react';
import { Case, Provider, WorkflowStep } from './types/medical';
import { mockCases } from './data/mockData';
import { Sidebar } from './components/layout/Sidebar';
import { ProviderSelector } from './components/dashboard/ProviderSelector';
import { WorkflowTabs } from './components/dashboard/WorkflowTabs';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { Button } from './components/ui/button';
import { FileText, Moon, Sun } from 'lucide-react';

function AppContent() {
  const { theme, toggleTheme } = useTheme();
  const [cases, setCases] = useState<Case[]>(mockCases);
  const [selectedCase, setSelectedCase] = useState<Case | null>(mockCases[0]);
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(
    mockCases[0]?.providers[0] || null
  );

  const handleSelectCase = (caseItem: Case) => {
    setSelectedCase(caseItem);
    setSelectedProvider(caseItem.providers[0] || null);
  };

  const handleNewCase = () => {
    const newCase: Case = {
      id: `case-${Date.now()}`,
      name: `New Case ${cases.length + 1}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      overallStatus: 'draft',
      providers: []
    };
    setCases([newCase, ...cases]);
    setSelectedCase(newCase);
    setSelectedProvider(null);
  };

  const handleAddProvider = () => {
    if (!selectedCase) return;
    
    const newProvider: Provider = {
      id: `prov-${Date.now()}`,
      name: `New Provider ${selectedCase.providers.length + 1}`,
      zipCode: '00000',
      date1801: new Date().toISOString().split('T')[0],
      status: {
        extraction: 'pending',
        cptMatching: 'pending',
        ncciEdits: 'pending',
        ucrPulling: 'pending',
        excelGeneration: 'pending'
      },
      lineItems: []
    };

    const updatedCase = {
      ...selectedCase,
      providers: [...selectedCase.providers, newProvider],
      updatedAt: new Date().toISOString()
    };

    setCases(cases.map(c => c.id === selectedCase.id ? updatedCase : c));
    setSelectedCase(updatedCase);
    setSelectedProvider(newProvider);
  };

  const handleRunStep = (step: WorkflowStep) => {
    if (!selectedProvider || !selectedCase) return;

    // Simulate step execution
    const updatedProvider = {
      ...selectedProvider,
      status: {
        ...selectedProvider.status,
        [step]: 'in-progress'
      }
    };

    // Simulate completion after 2 seconds
    setTimeout(() => {
      const completedProvider = {
        ...updatedProvider,
        status: {
          ...updatedProvider.status,
          [step]: 'completed'
        }
      };

      const updatedCase = {
        ...selectedCase,
        providers: selectedCase.providers.map(p => 
          p.id === selectedProvider.id ? completedProvider : p
        ),
        updatedAt: new Date().toISOString()
      };

      setCases(cases.map(c => c.id === selectedCase.id ? updatedCase : c));
      setSelectedCase(updatedCase);
      setSelectedProvider(completedProvider);
    }, 2000);

    // Update immediately to show in-progress state
    const updatedCase = {
      ...selectedCase,
      providers: selectedCase.providers.map(p => 
        p.id === selectedProvider.id ? updatedProvider : p
      ),
      updatedAt: new Date().toISOString()
    };

    setCases(cases.map(c => c.id === selectedCase.id ? updatedCase : c));
    setSelectedCase(updatedCase);
    setSelectedProvider(updatedProvider);
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar
        cases={cases}
        selectedCase={selectedCase}
        onSelectCase={handleSelectCase}
        onNewCase={handleNewCase}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {selectedCase ? (
          <div className="h-full overflow-y-auto">
            <div className="max-w-8xl mx-auto p-6 space-y-6">
              {/* Header with Theme Toggle */}
              <div className="flex items-center justify-between">
                <div></div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={toggleTheme}
                  className="font-inter"
                >
                  {theme === 'light' ? (
                    <Moon className="w-4 h-4 mr-2" />
                  ) : (
                    <Sun className="w-4 h-4 mr-2" />
                  )}
                  {theme === 'light' ? 'Dark' : 'Light'} Mode
                </Button>
              </div>

              {/* Case Header */}
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="font-canela text-3xl font-medium text-foreground mb-2">
                      {selectedCase.name}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground font-inter">
                      <span>Created {new Date(selectedCase.createdAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Last updated {new Date(selectedCase.updatedAt).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>{selectedCase.providers.length} provider{selectedCase.providers.length !== 1 ? 's' : ''}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Provider Selection */}
              <ProviderSelector
                providers={selectedCase.providers}
                selectedProvider={selectedProvider}
                onSelectProvider={setSelectedProvider}
                onAddProvider={handleAddProvider}
              />

              {/* Workflow Tabs */}
              {selectedProvider && (
                <WorkflowTabs
                  provider={selectedProvider}
                  onRunStep={handleRunStep}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="font-canela text-xl font-medium text-foreground mb-2">
                No case selected
              </h2>
              <p className="text-muted-foreground font-inter">
                Select a case from the sidebar to get started
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;