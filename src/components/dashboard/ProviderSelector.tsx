import { Provider } from '../../types/medical';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, Building2, MapPin, Calendar } from 'lucide-react';

interface ProviderSelectorProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  onSelectProvider: (provider: Provider) => void;
  onAddProvider: () => void;
}

const getOverallStatus = (provider: Provider) => {
  const statuses = Object.values(provider.status);
  if (statuses.every(s => s === 'completed')) return 'completed';
  if (statuses.some(s => s === 'error')) return 'error';
  if (statuses.some(s => s === 'in-progress')) return 'in-progress';
  if (statuses.some(s => s === 'completed')) return 'in-progress';
  return 'pending';
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

export function ProviderSelector({ 
  providers, 
  selectedProvider, 
  onSelectProvider, 
  onAddProvider 
}: ProviderSelectorProps) {
  if (providers.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center mx-auto mb-4">
            <Building2 className="w-6 h-6 text-muted-foreground" />
          </div>
          <h3 className="font-canela text-lg font-medium text-foreground mb-2">
            No providers added
          </h3>
          <p className="text-sm text-muted-foreground font-inter mb-4">
            Add your first provider to start processing medical data
          </p>
          <Button onClick={onAddProvider} className="font-inter font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-canela text-2xl font-medium text-foreground mb-1">
              Providers
            </h2>
            <p className="text-sm text-muted-foreground font-inter">
              Select a provider to view and manage their workflow
            </p>
          </div>
          <Button onClick={onAddProvider} variant="outline" className="font-inter font-medium">
            <Plus className="w-4 h-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Provider Grid */}
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {providers.map((provider) => {
            const overallStatus = getOverallStatus(provider);
            const completedSteps = Object.values(provider.status).filter(s => s === 'completed').length;
            const totalSteps = Object.keys(provider.status).length;
            
            return (
              <button
                key={provider.id}
                onClick={() => onSelectProvider(provider)}
                className={`text-left p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                  selectedProvider?.id === provider.id
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border bg-card hover:border-primary/50'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs font-inter ${getStatusColor(overallStatus)}`}
                    >
                      {overallStatus}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="font-inter font-semibold text-foreground mb-2 line-clamp-2">
                  {provider.name}
                </h3>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-inter">
                    <MapPin className="w-3 h-3" />
                    <span>ZIP {provider.zipCode}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground font-inter">
                    <Calendar className="w-3 h-3" />
                    <span>18.01 Date: {provider.date1801}</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-inter">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-foreground font-medium">
                      {completedSteps}/{totalSteps} steps
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary rounded-full h-2 transition-all duration-300"
                      style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                    />
                  </div>
                </div>
                
                {provider.lineItems.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-muted-foreground font-inter">
                      {provider.lineItems.length} line item{provider.lineItems.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}