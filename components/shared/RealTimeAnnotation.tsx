import React from 'react';

interface RealTimeAnnotationProps {
  tactic: string;
  explanation: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

const RealTimeAnnotation: React.FC<RealTimeAnnotationProps> = ({ tactic, explanation, severity }) => {
  const severityColors = {
    low: 'bg-green-100 border-green-500 text-green-800',
    medium: 'bg-yellow-100 border-yellow-500 text-yellow-800',
    high: 'bg-red-100 border-red-500 text-red-800',
    critical: 'bg-red-200 border-red-700 text-red-900 font-bold',
  };

  return (
    <div className={`p-4 mt-4 border-l-4 ${severityColors[severity]}`}>
      <h4 className="font-bold">Dark Pattern Detected: {tactic}</h4>
      <p>{explanation}</p>
    </div>
  );
};

export default RealTimeAnnotation;
