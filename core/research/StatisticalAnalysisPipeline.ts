/**
 * Real-Time Statistical Analysis Pipeline for Research Validation
 * Provides continuous monitoring of statistical power, effect sizes, and research integrity
 */

export interface StatisticalResult {
  testType: string;
  statistic: number;
  pValue: number;
  effectSize: number;
  confidenceInterval: [number, number];
  powerAnalysis: PowerAnalysis;
  interpretation: string;
  recommendation: 'continue' | 'stop_success' | 'stop_futility' | 'increase_sample';
}

export interface PowerAnalysis {
  currentPower: number;
  targetPower: number;
  currentSampleSize: number;
  requiredSampleSize: number;
  alpha: number;
  beta: number;
  minimumDetectableEffect: number;
}

export interface EffectSizeAnalysis {
  cohensD: number;
  hedgesG: number;
  r: number;
  eta2: number;
  interpretation: 'negligible' | 'small' | 'medium' | 'large' | 'very_large';
  practicalSignificance: boolean;
}

export interface BayesianAnalysis {
  bayesFactor: number;
  posteriorProbability: number;
  priorOdds: number;
  evidenceStrength: 'decisive' | 'very_strong' | 'strong' | 'moderate' | 'weak' | 'inconclusive';
  credibleInterval: [number, number];
}

export interface DataQualityMetrics {
  completeness: number; // 0-100
  consistency: number; // 0-100
  accuracy: number; // 0-100
  validity: number; // 0-100
  reliability: number; // 0-100
  overallQuality: number; // 0-100
  outlierPercentage: number;
  missingDataPercentage: number;
  attentionCheckPassRate: number;
}

class StatisticalAnalysisPipeline {
  private alpha: number = 0.05;
  private targetPower: number = 0.80;
  private minimumEffectSize: number = 0.3;
  private analysisHistory: StatisticalResult[] = [];
  private qualityThresholds: DataQualityMetrics = {
    completeness: 95,
    consistency: 90,
    accuracy: 95,
    validity: 85,
    reliability: 90,
    overallQuality: 90,
    outlierPercentage: 5,
    missingDataPercentage: 5,
    attentionCheckPassRate: 90,
  };

  constructor(options?: {
    alpha?: number;
    targetPower?: number;
    minimumEffectSize?: number;
  }) {
    if (options) {
      this.alpha = options.alpha || this.alpha;
      this.targetPower = options.targetPower || this.targetPower;
      this.minimumEffectSize = options.minimumEffectSize || this.minimumEffectSize;
    }
  }

  // Main analysis entry point
  public async analyzeExperimentData(
    treatmentData: number[],
    controlData: number[],
    qualityMetrics: DataQualityMetrics
  ): Promise<StatisticalResult> {
    
    // Pre-analysis data quality check
    const qualityAssessment = this.assessDataQuality(qualityMetrics);
    if (!qualityAssessment.meetsStandards) {
      throw new Error(`Data quality below standards: ${qualityAssessment.issues.join(', ')}`);
    }

    // Primary statistical test
    const tTestResult = this.performTTest(treatmentData, controlData);
    
    // Effect size analysis
    const effectSize = this.calculateEffectSize(treatmentData, controlData);
    
    // Power analysis
    const powerAnalysis = this.calculatePowerAnalysis(
      treatmentData.length + controlData.length,
      effectSize.cohensD
    );
    
    // Bayesian analysis for additional evidence
    const bayesianResult = this.performBayesianAnalysis(treatmentData, controlData);
    
    // Generate recommendations
    const recommendation = this.generateRecommendation(
      tTestResult,
      effectSize,
      powerAnalysis,
      bayesianResult
    );

    const result: StatisticalResult = {
      testType: 'welch_t_test',
      statistic: tTestResult.t,
      pValue: tTestResult.pValue,
      effectSize: effectSize.cohensD,
      confidenceInterval: tTestResult.confidenceInterval,
      powerAnalysis: {
        currentPower: powerAnalysis.observedPower,
        targetPower: this.targetPower,
        currentSampleSize: treatmentData.length + controlData.length,
        requiredSampleSize: powerAnalysis.requiredSampleSize,
        alpha: this.alpha,
        beta: 1 - this.targetPower,
        minimumDetectableEffect: this.minimumEffectSize,
      },
      interpretation: this.interpretResults(tTestResult, effectSize, bayesianResult),
      recommendation,
    };

    // Store in analysis history
    this.analysisHistory.push(result);
    
    // Trigger alerts if necessary
    this.checkAlertConditions(result);

    return result;
  }

  // Welch's t-test (unequal variances)
  private performTTest(group1: number[], group2: number[]): {
    t: number;
    pValue: number;
    degreesOfFreedom: number;
    confidenceInterval: [number, number];
  } {
    const n1 = group1.length;
    const n2 = group2.length;
    
    const mean1 = this.calculateMean(group1);
    const mean2 = this.calculateMean(group2);
    const var1 = this.calculateVariance(group1);
    const var2 = this.calculateVariance(group2);
    
    // Welch's t-statistic
    const pooledSE = Math.sqrt(var1 / n1 + var2 / n2);
    const t = (mean1 - mean2) / pooledSE;
    
    // Welch-Satterthwaite degrees of freedom
    const df = Math.pow(var1 / n1 + var2 / n2, 2) / 
               (Math.pow(var1 / n1, 2) / (n1 - 1) + Math.pow(var2 / n2, 2) / (n2 - 1));
    
    // Two-tailed p-value
    const pValue = 2 * (1 - this.tCDF(Math.abs(t), df));
    
    // 95% confidence interval for difference in means
    const tCritical = this.tInverse(0.025, df);
    const marginOfError = tCritical * pooledSE;
    const meanDiff = mean1 - mean2;
    const confidenceInterval: [number, number] = [
      meanDiff - marginOfError,
      meanDiff + marginOfError
    ];
    
    return { t, pValue, degreesOfFreedom: df, confidenceInterval };
  }

  // Cohen's d and related effect sizes
  private calculateEffectSize(group1: number[], group2: number[]): EffectSizeAnalysis {
    const mean1 = this.calculateMean(group1);
    const mean2 = this.calculateMean(group2);
    const var1 = this.calculateVariance(group1);
    const var2 = this.calculateVariance(group2);
    const n1 = group1.length;
    const n2 = group2.length;
    
    // Cohen's d (pooled standard deviation)
    const pooledSD = Math.sqrt(((n1 - 1) * var1 + (n2 - 1) * var2) / (n1 + n2 - 2));
    const cohensD = (mean1 - mean2) / pooledSD;
    
    // Hedges' g (bias-corrected)
    const correctionFactor = 1 - (3 / (4 * (n1 + n2) - 9));
    const hedgesG = cohensD * correctionFactor;
    
    // Correlation coefficient r
    const t = cohensD * Math.sqrt((n1 * n2) / (n1 + n2));
    const df = n1 + n2 - 2;
    const r = Math.sqrt(Math.pow(t, 2) / (Math.pow(t, 2) + df));
    
    // Eta squared (proportion of variance explained)
    const eta2 = Math.pow(r, 2);
    
    // Interpretation
    const interpretation = this.interpretEffectSize(Math.abs(cohensD));
    const practicalSignificance = Math.abs(cohensD) >= this.minimumEffectSize;
    
    return {
      cohensD,
      hedgesG,
      r,
      eta2,
      interpretation,
      practicalSignificance,
    };
  }

  // Statistical power analysis
  private calculatePowerAnalysis(currentN: number, observedEffect: number): {
    observedPower: number;
    requiredSampleSize: number;
    powerCurve: Array<{ n: number; power: number }>;
  } {
    // Calculate observed power
    const observedPower = this.calculatePower(currentN / 2, observedEffect, this.alpha);
    
    // Calculate required sample size for target power
    const requiredSampleSize = this.calculateRequiredSampleSize(
      this.minimumEffectSize,
      this.targetPower,
      this.alpha
    );
    
    // Generate power curve
    const powerCurve = [];
    for (let n = 10; n <= Math.max(currentN * 2, 500); n += 10) {
      const power = this.calculatePower(n / 2, this.minimumEffectSize, this.alpha);
      powerCurve.push({ n, power });
    }
    
    return { observedPower, requiredSampleSize, powerCurve };
  }

  // Bayesian t-test using default priors
  private performBayesianAnalysis(group1: number[], group2: number[]): BayesianAnalysis {
    // Simplified Bayesian analysis using BIC approximation
    const n1 = group1.length;
    const n2 = group2.length;
    const tResult = this.performTTest(group1, group2);
    
    // BIC approximation for Bayes Factor
    const bic = Math.log(n1 + n2) * 1 - 2 * Math.log(1 - this.tCDF(Math.abs(tResult.t), tResult.degreesOfFreedom));
    const bayesFactor = Math.exp(-0.5 * bic);
    
    // Posterior probability (assuming equal priors)
    const posteriorProbability = bayesFactor / (1 + bayesFactor);
    
    // Evidence strength interpretation
    const evidenceStrength = this.interpretBayesFactor(bayesFactor);
    
    // Credible interval (approximated from frequentist CI)
    const credibleInterval = tResult.confidenceInterval;
    
    return {
      bayesFactor,
      posteriorProbability,
      priorOdds: 1, // Equal priors
      evidenceStrength,
      credibleInterval,
    };
  }

  // Data quality assessment
  private assessDataQuality(metrics: DataQualityMetrics): {
    meetsStandards: boolean;
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    
    if (metrics.completeness < this.qualityThresholds.completeness) {
      issues.push(`Data completeness ${metrics.completeness}% below threshold ${this.qualityThresholds.completeness}%`);
      recommendations.push('Implement additional data collection measures');
    }
    
    if (metrics.attentionCheckPassRate < this.qualityThresholds.attentionCheckPassRate) {
      issues.push(`Attention check pass rate ${metrics.attentionCheckPassRate}% below threshold`);
      recommendations.push('Review attention check mechanisms');
    }
    
    if (metrics.outlierPercentage > this.qualityThresholds.outlierPercentage) {
      issues.push(`Outlier percentage ${metrics.outlierPercentage}% above threshold`);
      recommendations.push('Investigate potential data quality issues');
    }
    
    if (metrics.overallQuality < this.qualityThresholds.overallQuality) {
      issues.push(`Overall quality ${metrics.overallQuality}% below threshold`);
      recommendations.push('Consider data cleaning and validation procedures');
    }
    
    return {
      meetsStandards: issues.length === 0,
      issues,
      recommendations,
    };
  }

  // Generate study recommendations
  private generateRecommendation(
    tTest: any,
    effectSize: EffectSizeAnalysis,
    powerAnalysis: any,
    bayesian: BayesianAnalysis
  ): 'continue' | 'stop_success' | 'stop_futility' | 'increase_sample' {
    
    // Stop for success: significant result with adequate power and effect size
    if (tTest.pValue < this.alpha && 
        effectSize.practicalSignificance && 
        powerAnalysis.observedPower > 0.80 &&
        bayesian.evidenceStrength !== 'inconclusive') {
      return 'stop_success';
    }
    
    // Stop for futility: very low effect size with high power
    if (powerAnalysis.observedPower > 0.90 && 
        Math.abs(effectSize.cohensD) < 0.1 &&
        bayesian.evidenceStrength === 'inconclusive') {
      return 'stop_futility';
    }
    
    // Increase sample if trending toward significance but underpowered
    if (tTest.pValue < 0.10 && 
        powerAnalysis.observedPower < 0.70 &&
        Math.abs(effectSize.cohensD) > 0.2) {
      return 'increase_sample';
    }
    
    // Continue data collection
    return 'continue';
  }

  // Utility functions for statistical calculations
  private calculateMean(data: number[]): number {
    return data.reduce((sum, x) => sum + x, 0) / data.length;
  }

  private calculateVariance(data: number[]): number {
    const mean = this.calculateMean(data);
    const sumSquaredDiffs = data.reduce((sum, x) => sum + Math.pow(x - mean, 2), 0);
    return sumSquaredDiffs / (data.length - 1);
  }

  private calculatePower(n: number, effectSize: number, alpha: number): number {
    // Simplified power calculation for two-sample t-test
    const delta = effectSize * Math.sqrt(n / 2);
    const tCritical = this.tInverse(alpha / 2, 2 * n - 2);
    const power = 1 - this.tCDF(tCritical - delta, 2 * n - 2) + 
                     this.tCDF(-tCritical - delta, 2 * n - 2);
    return Math.max(0, Math.min(1, power));
  }

  private calculateRequiredSampleSize(effectSize: number, power: number, alpha: number): number {
    // Iterative search for required sample size
    let n = 10;
    while (n < 10000) {
      const calculatedPower = this.calculatePower(n, effectSize, alpha);
      if (calculatedPower >= power) {
        return n * 2; // Total sample size (both groups)
      }
      n += 1;
    }
    return 10000; // Maximum reasonable sample size
  }

  // Approximation functions for t-distribution
  private tCDF(t: number, df: number): number {
    // Approximation of t-distribution CDF
    const x = df / (t * t + df);
    return 0.5 + (t > 0 ? 0.5 : -0.5) * this.incompleteBeta(0.5, df / 2, x);
  }

  private tInverse(p: number, df: number): number {
    // Approximation of t-distribution inverse CDF
    // Simplified implementation for demonstration
    return 1.96; // Normal approximation for large df
  }

  private incompleteBeta(a: number, b: number, x: number): number {
    // Simplified incomplete beta function
    // This would need a proper implementation for production use
    return 0.5; // Placeholder
  }

  // Interpretation functions
  private interpretEffectSize(d: number): 'negligible' | 'small' | 'medium' | 'large' | 'very_large' {
    if (d < 0.01) return 'negligible';
    if (d < 0.20) return 'small';
    if (d < 0.50) return 'medium';
    if (d < 0.80) return 'large';
    return 'very_large';
  }

  private interpretBayesFactor(bf: number): 'decisive' | 'very_strong' | 'strong' | 'moderate' | 'weak' | 'inconclusive' {
    if (bf > 100) return 'decisive';
    if (bf > 30) return 'very_strong';
    if (bf > 10) return 'strong';
    if (bf > 3) return 'moderate';
    if (bf > 1) return 'weak';
    return 'inconclusive';
  }

  private interpretResults(
    tTest: any, 
    effectSize: EffectSizeAnalysis, 
    bayesian: BayesianAnalysis
  ): string {
    const significance = tTest.pValue < this.alpha ? 'statistically significant' : 'not statistically significant';
    const practical = effectSize.practicalSignificance ? 'practically significant' : 'not practically significant';
    const evidence = `Bayesian evidence is ${bayesian.evidenceStrength}`;
    
    return `Result is ${significance} (p = ${tTest.pValue.toFixed(4)}) and ${practical} (d = ${effectSize.cohensD.toFixed(3)}). ${evidence} (BF = ${bayesian.bayesFactor.toFixed(2)}).`;
  }

  // Alert system for critical findings
  private checkAlertConditions(result: StatisticalResult): void {
    // Alert for significant results
    if (result.pValue < this.alpha && result.recommendation === 'stop_success') {
      console.log('🎉 RESEARCH ALERT: Significant effect detected! Consider stopping for success.');
    }
    
    // Alert for futility
    if (result.recommendation === 'stop_futility') {
      console.log('⚠️ RESEARCH ALERT: Low probability of detecting meaningful effect. Consider stopping for futility.');
    }
    
    // Alert for sample size needs
    if (result.recommendation === 'increase_sample') {
      console.log(`📊 RESEARCH ALERT: Increase sample size to n=${result.powerAnalysis.requiredSampleSize} for adequate power.`);
    }
  }

  // Export analysis history for meta-analysis
  public getAnalysisHistory(): StatisticalResult[] {
    return [...this.analysisHistory];
  }

  // Generate comprehensive report
  public generateReport(): {
    summary: string;
    currentStatus: string;
    recommendations: string[];
    powerAnalysis: PowerAnalysis;
    dataQuality: string;
  } {
    const latest = this.analysisHistory[this.analysisHistory.length - 1];
    if (!latest) {
      return {
        summary: 'No analysis data available',
        currentStatus: 'Awaiting data',
        recommendations: ['Begin data collection'],
        powerAnalysis: {
          currentPower: 0,
          targetPower: this.targetPower,
          currentSampleSize: 0,
          requiredSampleSize: 0,
          alpha: this.alpha,
          beta: 1 - this.targetPower,
          minimumDetectableEffect: this.minimumEffectSize,
        },
        dataQuality: 'Unknown',
      };
    }
    
    return {
      summary: latest.interpretation,
      currentStatus: latest.recommendation,
      recommendations: this.getDetailedRecommendations(latest),
      powerAnalysis: latest.powerAnalysis,
      dataQuality: 'Meets research standards',
    };
  }

  private getDetailedRecommendations(result: StatisticalResult): string[] {
    const recommendations: string[] = [];
    
    if (result.powerAnalysis.currentPower < 0.80) {
      recommendations.push(`Increase sample size to ${result.powerAnalysis.requiredSampleSize} for adequate power`);
    }
    
    if (Math.abs(result.effectSize) < this.minimumEffectSize) {
      recommendations.push('Consider modifying intervention to increase effect size');
    }
    
    if (result.recommendation === 'continue') {
      recommendations.push('Continue data collection and monitor results');
    }
    
    return recommendations;
  }
}

export default StatisticalAnalysisPipeline; 