import { Provider } from '../../types/medical';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Calendar, Plus } from 'lucide-react';

interface ProviderSelectorProps {
  providers: Provider[];
  selectedProvider: Provider | null;
  onSelectProvider: (provider: Provider) => void;
  onAddProvider: () => void;
}

const getProviderStatusColor = (provider: Provider) => {
  const statuses = Object.values(provider.status);
  if (statuses.every(s => s === 'completed')) return 'bg-green-500/10 text-green-600 border-green-500/20';
  if (statuses.some(s => s === 'error')) return 'bg-red-500/10 text-red-600 border-red-500/20';
  if (statuses.some(s => s === 'in-progress')) return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
  return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
};

const getCompletionPercentage = (provider: Provider) => {
  const statuses = Object.values(provider.status);
  const completed = statuses.filter(s => s === 'completed').length;
  return Math.round((completed / statuses.length) * 100);
};

export function ProviderSelector({ 
  providers, 
  selectedProvider, 
  onSelectProvider, 
  onAddProvider 
}: ProviderSelectorProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-canela text-2xl font-medium text-gray-900 mb-1">
              Providers
            </h2>
            <p className="text-sm text-gray-600 font-inter">
              Select a provider to view and manage their data processing workflow
            </p>
          </div>
          <Button 
            onClick={onAddProvider}
            variant="outline"
            className="font-inter font-medium"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Provider
          </Button>
        </div>
      </div>

      {/* Provider Grid */}
      <div className="p-6">
        {providers.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="font-canela text-lg font-medium text-gray-900 mb-2">
              No providers added
            </h3>
            <p className="text-gray-600 font-inter mb-4">
              Add your first provider to start processing medical data
            </p>
            <Button onClick={onAddProvider} className="font-inter font-medium">
              <Plus className="w-4 h-4 mr-2" />
              Add Provider
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {providers.map((provider) => (
              <button
                key={provider.id}
                onClick={() => onSelectProvider(provider)}
                className={`text-left p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md ${
                  selectedProvider?.id === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Provider Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-inter font-semibold text-gray-900 truncate">
                      {provider.name}
                    </h3>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        <span className="font-inter">{provider.zipCode}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span className="font-inter">{provider.date1801}</span>
                      </div>
                    </div>
                  </div>
                  <Badge 
                    variant="outline" 
                    className={`text-xs font-inter ${getProviderStatusColor(provider)}`}
                  >
                    {getCompletionPercentage(provider)}%
                  </Badge>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getCompletionPercentage(provider)}%` }}
                    />
                  </div>
                </div>

                {/* Line Items Count */}
                <div className="text-xs text-gray-600 font-inter">
                  {provider.lineItems.length} line item{provider.lineItems.length !== 1 ? 's' : ''}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}