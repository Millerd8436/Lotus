"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { TrendingUp, TrendingDown, BarChart3, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface MarketRate {
  lender: string;
  apr: number;
  fees: number;
  popularity: number;
  timeToApproval: string;
  rating: number;
}

interface MarketTrend {
  period: string;
  avgAPR: number;
  direction: 'up' | 'down' | 'stable';
  changePercent: number;
}

interface MarketDataSimulatorProps {
  loanType: 'Payday' | 'Installment' | 'EWA' | 'BNPL';
  loanAmount: number;
  currentAPR: number;
  showCompetitors?: boolean;
  showTrends?: boolean;
  onRateUpdate?: (newRate: number) => void;
}

export const MarketDataSimulator: React.FC<MarketDataSimulatorProps> = ({
  loanType,
  loanAmount,
  currentAPR,
  showCompetitors = true,
  showTrends = true,
  onRateUpdate
}) => {
  const [currentRates, setCurrentRates] = useState<MarketRate[]>([]);
  const [marketTrends, setMarketTrends] = useState<MarketTrend[]>([]);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());
  const [isLive, setIsLive] = useState(true);

  // Generate realistic competitor data based on loan type
  const generateCompetitorRates = (): MarketRate[] => {
    const baseRates = {
      'Payday': { min: 300, max: 600, fees: [15, 25, 30] },
      'Installment': { min: 25, max: 199, fees: [50, 75, 100] },
      'EWA': { min: 0, max: 36, fees: [2, 5, 8] },
      'BNPL': { min: 0, max: 29.99, fees: [0, 5, 10] }
    };

    const competitors = {
      'Payday': ['CashAdvance Plus', 'QuickCash Pro', 'InstantMoney', 'FastFunds', 'CheckMate'],
      'Installment': ['PersonalLoans.com', 'LendingTree', 'Prosper', 'Upstart', 'Best Egg'],
      'EWA': ['Earnin', 'Dave', 'Brigit', 'MoneyLion', 'Chime SpotMe'],
      'BNPL': ['Afterpay', 'Klarna', 'Affirm', 'Sezzle', 'Zip']
    };

    const timeToApproval = {
      'Payday': ['Instant', '5 minutes', '15 minutes'],
      'Installment': ['Same day', '1-2 days', '3-5 days'],
      'EWA': ['Instant', 'Next business day', '2-3 days'],
      'BNPL': ['Instant', '30 seconds', '2 minutes']
    };

    const { min, max, fees } = baseRates[loanType];
    const lenderNames = competitors[loanType];
    const approvalTimes = timeToApproval[loanType];

    return lenderNames.map((name, index) => {
      // Add some realistic variance around the current APR
      const variance = (Math.random() - 0.5) * 0.3; // ±15%
      const apr = Math.max(min, Math.min(max, currentAPR * (1 + variance)));
      
      return {
        lender: name,
        apr: Math.round(apr * 100) / 100,
        fees: fees[index % fees.length] + Math.floor(Math.random() * 10),
        popularity: Math.floor(Math.random() * 40) + 60, // 60-100%
        timeToApproval: approvalTimes[Math.floor(Math.random() * approvalTimes.length)],
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10 // 3.0-5.0 stars
      };
    });
  };

  // Generate market trend data
  const generateMarketTrends = (): MarketTrend[] => {
    const periods = ['7d', '30d', '90d', '1y'];
    const baseAPR = currentAPR;
    
    return periods.map((period, index) => {
      const variance = Math.random() * 0.2 - 0.1; // ±10%
      const avgAPR = baseAPR * (1 + variance);
      const changePercent = variance * 100;
      
      return {
        period,
        avgAPR: Math.round(avgAPR * 100) / 100,
        direction: changePercent > 2 ? 'up' : changePercent < -2 ? 'down' : 'stable',
        changePercent: Math.abs(changePercent)
      };
    });
  };

  // Simulate live rate updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      setCurrentRates(prev => 
        prev.map(rate => ({
          ...rate,
          apr: Math.max(0, rate.apr + (Math.random() - 0.5) * 2) // Small fluctuations
        }))
      );
      setLastUpdated(new Date());

      // Occasionally trigger rate update for main application
      if (Math.random() < 0.1 && onRateUpdate) { // 10% chance
        const adjustment = (Math.random() - 0.5) * 10; // ±5%
        onRateUpdate(Math.max(0, currentAPR + adjustment));
      }
    }, 15000); // Update every 15 seconds

    return () => clearInterval(interval);
  }, [isLive, currentAPR, onRateUpdate]);

  // Initialize data
  useEffect(() => {
    setCurrentRates(generateCompetitorRates());
    setMarketTrends(generateMarketTrends());
  }, [loanType, currentAPR]);

  const currentRank = useMemo(() => {
    const allRates = [...currentRates, { apr: currentAPR, lender: 'Current Offer' }];
    const sorted = allRates.sort((a, b) => a.apr - b.apr);
    return sorted.findIndex(rate => rate.lender === 'Current Offer') + 1;
  }, [currentRates, currentAPR]);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Market Status Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-green-50 rounded-lg border">
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${isLive ? 'bg-green-500' : 'bg-gray-400'} animate-pulse`} />
          <div>
            <div className="font-medium text-gray-900">Market Data</div>
            <div className="text-sm text-gray-600">
              Last updated: {formatTime(lastUpdated)}
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsLive(!isLive)}
          className="flex items-center space-x-2 px-3 py-2 bg-white rounded-md border hover:bg-gray-50"
        >
          <RefreshCw className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
          <span className="text-sm">{isLive ? 'Live' : 'Paused'}</span>
        </button>
      </div>

      {/* Current Offer Position */}
      <div className="p-4 bg-blue-50 rounded-lg border-2 border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-blue-900">Your Rate Position</div>
            <div className="text-sm text-blue-700">
              Ranked #{currentRank} out of {currentRates.length + 1} lenders
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-900">{currentAPR.toFixed(1)}%</div>
            <div className="text-sm text-blue-700">APR</div>
          </div>
        </div>
      </div>

      {/* Market Trends */}
      {showTrends && marketTrends.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2 mb-3">
            <BarChart3 className="w-5 h-5 text-gray-600" />
            <span className="font-medium text-gray-900">Market Trends - {loanType} Loans</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {marketTrends.map((trend) => (
              <div key={trend.period} className="text-center p-3 bg-white rounded border">
                <div className="text-xs text-gray-500 uppercase tracking-wide">{trend.period}</div>
                <div className="text-lg font-bold text-gray-900">{trend.avgAPR.toFixed(1)}%</div>
                <div className={`flex items-center justify-center space-x-1 text-xs ${
                  trend.direction === 'up' ? 'text-red-600' : 
                  trend.direction === 'down' ? 'text-green-600' : 'text-gray-600'
                }`}>
                  {trend.direction === 'up' && <TrendingUp className="w-3 h-3" />}
                  {trend.direction === 'down' && <TrendingDown className="w-3 h-3" />}
                  <span>{trend.changePercent.toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Competitor Rates */}
      {showCompetitors && currentRates.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="font-medium text-gray-900 mb-3">
            Competitor Rates (${loanAmount} {loanType} Loan)
          </div>
          <div className="space-y-2">
            {currentRates.slice(0, 5).map((rate) => (
              <motion.div
                key={rate.lender}
                className="flex items-center justify-between p-3 bg-white rounded border hover:border-gray-300 transition-colors"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{rate.lender}</div>
                  <div className="text-sm text-gray-600">
                    {rate.timeToApproval} • {rate.rating}★ • {rate.popularity}% approval rate
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-gray-900">{rate.apr.toFixed(1)}% APR</div>
                  <div className="text-sm text-gray-600">${rate.fees} fees</div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-3 text-xs text-gray-500">
            * Rates shown are estimates and may vary based on creditworthiness and other factors.
            Data refreshes every 15 seconds during market hours.
          </div>
        </div>
      )}

      {/* Market Disclaimer */}
      <div className="p-3 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
        <strong>Market Data Disclaimer:</strong> Rate information is provided for comparison purposes only. 
        Actual rates may vary and are subject to lender approval and market conditions. 
        This is simulated data for research purposes.
      </div>
    </div>
  );
};

export default MarketDataSimulator; 
