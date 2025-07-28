import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/app/lib/prisma';

// Statistical Analysis Export Structure
interface StatisticalExportRow {
  // Experimental Control Variables
  participantId: string;
  sessionStarted: string;
  sessionCompleted: string;
  loanOrder: string; // "BNPL,Payday,EWA,Installment"
  priorLoanExperience: boolean | null;
  
  // Loan Interaction (one row per loan per participant)
  loanType: string; // IV: Primary independent variable
  presentationOrder: number; // Covariate: fatigue control
  
  // Behavioral DVs (Universal Across Loan Types)
  totalTimeMs: number;
  clicksOnFeeDisclosure: number;
  clicksOnTermsDetails: number;
  scrollDepthPercent: number;
  feeDisclosureViewedMs: number;
  termsDisclosureViewedMs: number;
  changedDefaultValues: boolean;
  completedWithoutReading: boolean;
  
  // Comprehension DVs (Primary Outcomes)
  totalCostCorrect: boolean;
  feeStructureCorrect: boolean;
  repaymentTermsCorrect: boolean;
  compoundingRiskCorrect: boolean;
  comprehensionScore: number; // Sum of correct answers (0-4)
  
  // Trust/Perception DVs (Primary Outcomes) 
  trustRating: number; // 1-7 scale
  ethicalityRating: number; // 1-7 scale
  clarityRating: number; // 1-7 scale
  wouldRecommendRating: number; // 1-7 scale
  
  // Loan-Specific IVs (Deceptive Mechanisms Exposed)
  // Payday IVs
  payday_rolloverWarningExposed?: boolean;
  payday_aprBuried?: boolean;
  payday_urgencyTimer?: boolean;
  payday_aprDisclosureClicked?: boolean;
  payday_rolloverTermsClicked?: boolean;
  payday_timeOnAPR?: number;
  
  // BNPL IVs
  bnpl_creditDisguise?: boolean;
  bnpl_zeroInterestEmphasis?: boolean;
  bnpl_seamlessFlow?: boolean;
  bnpl_lateFeesClicked?: boolean;
  bnpl_creditCheckViewed?: boolean;
  bnpl_timeOnLateFees?: number;
  
  // EWA IVs
  ewa_tipCoercion?: boolean;
  ewa_employerAffiliation?: boolean;
  ewa_notLoanDenial?: boolean;
  ewa_tipPercentageChosen?: number;
  ewa_changedTipAmount?: boolean;
  ewa_timeOnTipSection?: number;
  
  // Installment IVs
  installment_paymentAnchoring?: boolean;
  installment_termAmbiguity?: boolean;
  installment_preApproval?: boolean;
  installment_loanAmountChanged?: boolean;
  installment_termLengthChanged?: boolean;
  installment_timeOnTerms?: number;
}

interface FinalComparisonRow {
  participantId: string;
  sessionCompleted: string;
  
  // Final ranking DVs (cross-loan comparison)
  trustRanking: string; // "BNPL,EWA,Installment,Payday"
  clarityRanking: string;
  ethicalityRanking: string;
  wouldUseRanking: string;
  
  // Comprehension comparison
  mostTransparentLoan: string | null;
  leastTransparentLoan: string | null;
  mostExpensiveLoan: string | null;
  leastExpensiveLoan: string | null;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || 'csv';
    const analysisType = searchParams.get('analysis') || 'full';
    
    if (analysisType === 'interactions') {
      return await exportLoanInteractions(format);
    } else if (analysisType === 'comparisons') {
      return await exportFinalComparisons(format);
    } else {
      return await exportFullDataset(format);
    }
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json({ error: 'Export failed' }, { status: 500 });
  }
}

async function exportLoanInteractions(format: string) {
  // Fetch all loan interactions with related data
  const interactions = await prisma.loanInteraction.findMany({
    include: {
      participant: true,
      comprehensionQuiz: true,
      paydaySpecific: true,
      bnplSpecific: true,
      ewaSpecific: true,
      installmentSpecific: true,
    },
    orderBy: [
      { participant: { createdAt: 'asc' } },
      { presentationOrder: 'asc' }
    ]
  });

  const exportData: StatisticalExportRow[] = interactions.map(interaction => {
    const base: StatisticalExportRow = {
      participantId: interaction.participantId,
      sessionStarted: interaction.participant.createdAt.toISOString(),
      sessionCompleted: interaction.participant.completedAt?.toISOString() || '',
      loanOrder: interaction.participant.loanOrder.join(','),
      priorLoanExperience: interaction.participant.priorLoanExperience,
      
      loanType: interaction.loanType,
      presentationOrder: interaction.presentationOrder,
      
      // Universal behavioral DVs
      totalTimeMs: interaction.totalTimeMs,
      clicksOnFeeDisclosure: interaction.clicksOnFeeDisclosure,
      clicksOnTermsDetails: interaction.clicksOnTermsDetails,
      scrollDepthPercent: interaction.scrollDepthPercent,
      feeDisclosureViewedMs: interaction.feeDisclosureViewedMs,
      termsDisclosureViewedMs: interaction.termsDisclosureViewedMs,
      changedDefaultValues: interaction.changedDefaultValues,
      completedWithoutReading: interaction.completedWithoutReading,
      
      // Comprehension DVs
      totalCostCorrect: interaction.comprehensionQuiz?.totalCostCorrect || false,
      feeStructureCorrect: interaction.comprehensionQuiz?.feeStructureCorrect || false,
      repaymentTermsCorrect: interaction.comprehensionQuiz?.repaymentTermsCorrect || false,
      compoundingRiskCorrect: interaction.comprehensionQuiz?.compoundingRiskCorrect || false,
      comprehensionScore: [
        interaction.comprehensionQuiz?.totalCostCorrect,
        interaction.comprehensionQuiz?.feeStructureCorrect,
        interaction.comprehensionQuiz?.repaymentTermsCorrect,
        interaction.comprehensionQuiz?.compoundingRiskCorrect
      ].filter(Boolean).length,
      
      // Trust/Perception DVs
      trustRating: interaction.comprehensionQuiz?.trustRating || 0,
      ethicalityRating: interaction.comprehensionQuiz?.ethicalityRating || 0,
      clarityRating: interaction.comprehensionQuiz?.clarityRating || 0,
      wouldRecommendRating: interaction.comprehensionQuiz?.wouldRecommendRating || 0,
    };

    // Add loan-specific data
    if (interaction.loanType === 'Payday' && interaction.paydaySpecific) {
      Object.assign(base, {
        payday_rolloverWarningExposed: interaction.paydaySpecific.exposedToRolloverWarning,
        payday_aprBuried: interaction.paydaySpecific.sawAPRBuried,
        payday_urgencyTimer: interaction.paydaySpecific.experiencedUrgencyTimer,
        payday_aprDisclosureClicked: interaction.paydaySpecific.aprDisclosureClicked,
        payday_rolloverTermsClicked: interaction.paydaySpecific.rolloverTermsClicked,
        payday_timeOnAPR: interaction.paydaySpecific.timeSpentOnAPRMs,
      });
    }

    if (interaction.loanType === 'BNPL' && interaction.bnplSpecific) {
      Object.assign(base, {
        bnpl_creditDisguise: interaction.bnplSpecific.exposedToCreditDisguise,
        bnpl_zeroInterestEmphasis: interaction.bnplSpecific.sawZeroInterestEmphasis,
        bnpl_seamlessFlow: interaction.bnplSpecific.experiencedSeamlessFlow,
        bnpl_lateFeesClicked: interaction.bnplSpecific.lateFeesDisclosureClicked,
        bnpl_creditCheckViewed: interaction.bnplSpecific.creditCheckNoticeViewed,
        bnpl_timeOnLateFees: interaction.bnplSpecific.timeSpentOnLateFeesMs,
      });
    }

    if (interaction.loanType === 'EWA' && interaction.ewaSpecific) {
      Object.assign(base, {
        ewa_tipCoercion: interaction.ewaSpecific.exposedToTipCoercion,
        ewa_employerAffiliation: interaction.ewaSpecific.sawEmployerAffiliation,
        ewa_notLoanDenial: interaction.ewaSpecific.experiencedNotLoanDenial,
        ewa_tipPercentageChosen: interaction.ewaSpecific.tipPercentageChosen,
        ewa_changedTipAmount: interaction.ewaSpecific.changedTipAmount,
        ewa_timeOnTipSection: interaction.ewaSpecific.timeSpentOnTipSectionMs,
      });
    }

    if (interaction.loanType === 'Installment' && interaction.installmentSpecific) {
      Object.assign(base, {
        installment_paymentAnchoring: interaction.installmentSpecific.exposedToPaymentAnchoring,
        installment_termAmbiguity: interaction.installmentSpecific.sawTermAmbiguity,
        installment_preApproval: interaction.installmentSpecific.experiencedPreApproval,
        installment_loanAmountChanged: interaction.installmentSpecific.loanAmountChanged,
        installment_termLengthChanged: interaction.installmentSpecific.termLengthChanged,
        installment_timeOnTerms: interaction.installmentSpecific.timeSpentOnTermsMs,
      });
    }

    return base;
  });

  if (format === 'json') {
    return NextResponse.json(exportData);
  }

  // CSV format
  const csv = convertToCSV(exportData);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="loan_interactions_statistical.csv"'
    }
  });
}

async function exportFinalComparisons(format: string) {
  const comparisons = await prisma.finalComparison.findMany({
    include: {
      participant: true
    },
    orderBy: {
      participant: { createdAt: 'asc' }
    }
  });

  const exportData: FinalComparisonRow[] = comparisons.map(comp => ({
    participantId: comp.participantId,
    sessionCompleted: comp.participant.completedAt?.toISOString() || comp.createdAt.toISOString(),
    trustRanking: comp.trustRanking.join(','),
    clarityRanking: comp.clarityRanking.join(','),
    ethicalityRanking: comp.ethicalityRanking.join(','),
    wouldUseRanking: comp.wouldUseRanking.join(','),
    mostTransparentLoan: comp.mostTransparentLoan,
    leastTransparentLoan: comp.leastTransparentLoan,
    mostExpensiveLoan: comp.mostExpensiveLoan,
    leastExpensiveLoan: comp.leastExpensiveLoan,
  }));

  if (format === 'json') {
    return NextResponse.json(exportData);
  }

  const csv = convertToCSV(exportData);
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="final_comparisons_statistical.csv"'
    }
  });
}

async function exportFullDataset(format: string) {
  // Combined export for complete analysis
  const interactions = await exportLoanInteractions('json');
  const comparisons = await exportFinalComparisons('json');
  
  const fullData = {
    loanInteractions: await interactions.json(),
    finalComparisons: await comparisons.json(),
    exportMetadata: {
      exportedAt: new Date().toISOString(),
      totalParticipants: await prisma.participantSession.count(),
      totalInteractions: await prisma.loanInteraction.count(),
      analysisReadyData: true
    }
  };

  if (format === 'json') {
    return NextResponse.json(fullData);
  }

  // For CSV, return interactions (primary analysis file)
  return await exportLoanInteractions('csv');
}

function convertToCSV(data: any[]): string {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(','),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        if (value === null || value === undefined) return '';
        if (typeof value === 'string' && value.includes(',')) {
          return `"${value}"`;
        }
        return value.toString();
      }).join(',')
    )
  ].join('\n');
  
  return csvContent;
} 