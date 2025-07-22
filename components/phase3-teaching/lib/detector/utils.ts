import { Eye, Zap, Lock, DollarSign, Info } from 'lucide-react';

export const getPatternCategory = (category: string) => {
  switch (category.toLowerCase()) {
    case 'visual':
      return {
        name: 'Visual Deception',
        color: 'bg-red-500',
        icon: 'eye',
      };
    case 'cognitive':
      return {
        name: 'Cognitive Pressure',
        color: 'bg-yellow-500',
        icon: 'zap',
      };
    case 'contractual':
      return {
        name: 'Contractual Traps',
        color: 'bg-blue-500',
        icon: 'lock',
      };
    case 'financial':
      return {
        name: 'Financial Exploitation',
        color: 'bg-green-500',
        icon: 'dollar-sign',
      };
    default:
      return {
        name: 'General',
        color: 'bg-gray-500',
        icon: 'info',
      };
  }
};

export const getIconForCategory = (iconName: string) => {
  switch (iconName) {
    case 'eye':
      return <Eye className="w-4 h-4" />;
    case 'zap':
      return <Zap className="w-4 h-4" />;
    case 'lock':
      return <Lock className="w-4 h-4" />;
    case 'dollar-sign':
      return <DollarSign className="w-4 h-4" />;
    default:
      return <Info className="w-4 h-4" />;
  }
}; 