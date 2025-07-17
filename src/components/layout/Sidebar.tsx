import { useState } from 'react';
import { Case } from '../../types/medical';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Plus, FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';

interface SidebarProps {
  cases: Case[];
  selectedCase: Case | null;
  onSelectCase: (caseItem: Case) => void;
  onNewCase: () => void;
}

const getStatusColor = (status: Case['overallStatus']) => {
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

const getStatusIcon = (status: Case['overallStatus']) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="w-3 h-3" />;
    case 'in-progress':
      return <Clock className="w-3 h-3" />;
    case 'error':
      return <AlertCircle className="w-3 h-3" />;
    default:
      return <FileText className="w-3 h-3" />;
  }
};

export function Sidebar({ cases, selectedCase, onSelectCase, onNewCase }: SidebarProps) {
  return (
    <div className="w-80 bg-sidebar border-r border-sidebar-border flex flex-col h-screen">
      {/* Header */}
      <div className="p-6 border-b border-sidebar-border">
        <h1 className="font-canela text-xl font-medium text-sidebar-foreground mb-1">
          Medical Data
        </h1>
        <p className="text-sm text-sidebar-foreground/70 font-inter">
          Processing Dashboard
        </p>
      </div>

      {/* New Case Button */}
      <div className="p-4 border-b border-sidebar-border">
        <Button 
          onClick={onNewCase}
          className="w-full bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90 font-inter font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Case
        </Button>
      </div>

      {/* Cases List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-xs font-inter font-semibold text-sidebar-foreground/50 uppercase tracking-wider mb-3">
            Cases ({cases.length})
          </h2>
          
          <div className="space-y-2">
            {cases.map((caseItem) => (
              <button
                key={caseItem.id}
                onClick={() => onSelectCase(caseItem)}
                className={`w-full text-left p-3 rounded-lg transition-all duration-200 group ${
                  selectedCase?.id === caseItem.id
                    ? 'bg-sidebar-accent border border-sidebar-border'
                    : 'hover:bg-sidebar-accent/50'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-inter font-medium text-sm text-sidebar-foreground line-clamp-2 group-hover:text-sidebar-primary transition-colors">
                    {caseItem.name}
                  </h3>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 text-xs font-inter flex items-center gap-1 ${getStatusColor(caseItem.overallStatus)}`}
                  >
                    {getStatusIcon(caseItem.overallStatus)}
                    {caseItem.overallStatus}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-xs text-sidebar-foreground/60 font-inter">
                  <span>{caseItem.providers.length} provider{caseItem.providers.length !== 1 ? 's' : ''}</span>
                  <span>{new Date(caseItem.updatedAt).toLocaleDateString()}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/50 font-inter">
          <p>Medical Data Processing v1.0</p>
          <p className="mt-1">© 2024 Healthcare Analytics</p>
        </div>
      </div>
    </div>
  );
}