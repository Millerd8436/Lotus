import { NextRequest, NextResponse } from 'next/server';
import { 
  ResearchPlatformFactory, 
  type ResearchPlatformConfig 
} from '@/core/research';

// Research Platform Configuration
const RESEARCH_CONFIG: ResearchPlatformConfig = {
  security: {
    level: 'SECRET',
    encryptionStandard: 'AES-256-GCM',
    accessControl: 'zero_trust',
  },
  validation: {
    strictnessLevel: 'ultra_strict',
    qualityThreshold: 99.5,
    errorTolerance: 0,
  },
  monitoring: {
    precision: 'microsecond',
    predictiveAnalysis: true,
    realTimeAlerts: true,
  },
  statistical: {
    powerRequirement: 0.80,
    alphaLevel: 0.05,
    effectSizeMinimum: 0.3,
  },
  compliance: {
    irbApproval: 'IRB-2025-001',
    regulatoryFramework: ['45 CFR 46', 'HIPAA', '21 CFR 11'],
    auditLevel: 'comprehensive',
  },
};

// Initialize Research Platform
let researchPlatform: ReturnType<typeof ResearchPlatformFactory.createUltraStrictPlatform> | null = null;

function getResearchPlatform() {
  if (!researchPlatform) {
    researchPlatform = ResearchPlatformFactory.createUltraStrictPlatform(RESEARCH_CONFIG);
  }
  return researchPlatform;
}

// POST: Initialize Research Session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    const platform = getResearchPlatform();

    switch (action) {
      case 'initialize_session':
        const session = platform.dataCollection.initializeSession(
          data.participantId,
          data.condition
        );
        
        // Initialize security context
        const securityContext = {
          userId: data.participantId,
          resource: 'research_session',
          permissions: ['read', 'write'],
          deviceId: data.deviceId,
          networkLocation: request.headers.get('x-forwarded-for') || 'unknown',
        };

        // Validate access
        const accessDecision = await platform.security.validateAccess(
          {
            userId: data.participantId,
            resource: 'research_session',
            action: 'create',
            credentials: data.credentials || {},
            deviceId: data.deviceId,
          },
          securityContext
        );

        if (!accessDecision.granted) {
          return NextResponse.json({
            success: false,
            error: 'Access denied',
            reason: accessDecision.reason,
          }, { status: 403 });
        }

        // Initialize monitoring
        const monitoringMetrics = await platform.monitoring.collectMetrics();

        return NextResponse.json({
          success: true,
          data: {
            sessionId: session.id,
            accessDecision,
            monitoringMetrics: {
              systemHealth: monitoringMetrics.performance.cpuUtilization < 80 ? 'optimal' : 'degraded',
              dataQuality: monitoringMetrics.business.dataQualityIndex,
            },
          },
        });

      case 'validate_data':
        const validationResult = platform.validation.validateResearchData(
          data.eventData,
          data.context
        );

        if (!validationResult.isValid) {
          // Log validation failure
          console.warn('Research data validation failed:', {
            score: validationResult.validationScore,
            errors: validationResult.errors,
            participantId: data.context.participantId,
          });
        }

        return NextResponse.json({
          success: true,
          validation: validationResult,
        });

      case 'statistical_analysis':
        const statisticalResult = await platform.statistics.validateStatisticalAnalysis(
          data.treatmentData,
          data.controlData,
          data.studyDesign,
          data.metadata
        );

        return NextResponse.json({
          success: true,
          analysis: statisticalResult,
        });

      case 'security_check':
        const threatDetection = await platform.security.detectThreats(
          data.activityData,
          data.context
        );

        if (threatDetection.riskScore > 70) {
          console.error('High-risk security threat detected:', threatDetection);
        }

        return NextResponse.json({
          success: true,
          security: {
            riskScore: threatDetection.riskScore,
            threats: threatDetection.threats,
            recommendations: threatDetection.recommendations,
          },
        });

      case 'health_check':
        const healthReport = await platform.monitoring.performHealthCheck();

        return NextResponse.json({
          success: true,
          health: healthReport,
        });

      case 'platform_status':
        const platformStatus = {
          validation: platform.validation.getValidationStatistics(),
          security: platform.security.getSecurityMetrics(),
          monitoring: platform.monitoring.getMonitoringStatus(),
          irb: platform.irbCompliance.generateAuditReport(),
        };

        return NextResponse.json({
          success: true,
          status: platformStatus,
        });

      default:
        return NextResponse.json({
          success: false,
          error: 'Unknown action',
          supportedActions: [
            'initialize_session',
            'validate_data', 
            'statistical_analysis',
            'security_check',
            'health_check',
            'platform_status'
          ],
        }, { status: 400 });
    }

  } catch (error) {
    console.error('Research Platform API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Research platform error',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}

// GET: Platform Status and Metrics
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const detail = searchParams.get('detail') || 'basic';

    const platform = getResearchPlatform();

    if (detail === 'comprehensive') {
      // Comprehensive status check
      const [
        healthReport,
        securityMetrics,
        monitoringStatus,
        validationStats,
        irbAudit
      ] = await Promise.all([
        platform.monitoring.performHealthCheck(),
        Promise.resolve(platform.security.getSecurityMetrics()),
        Promise.resolve(platform.monitoring.getMonitoringStatus()),
        Promise.resolve(platform.validation.getValidationStatistics()),
        Promise.resolve(platform.irbCompliance.generateAuditReport()),
      ]);

      return NextResponse.json({
        timestamp: Date.now(),
        platform: 'Lotus Research Platform',
        version: '2.0.0',
        status: 'operational',
        components: {
          health: healthReport,
          security: securityMetrics,
          monitoring: monitoringStatus,
          validation: validationStats,
          compliance: irbAudit,
        },
        configuration: RESEARCH_CONFIG,
      });
    } else {
      // Basic status check
      const basicStatus = {
        timestamp: Date.now(),
        platform: 'Lotus Research Platform',
        status: 'operational',
        version: '2.0.0',
        uptime: process.uptime() * 1000, // milliseconds
        components: {
          validation: 'operational',
          security: 'operational', 
          monitoring: 'operational',
          statistics: 'operational',
          compliance: 'operational',
        },
      };

      return NextResponse.json(basicStatus);
    }

  } catch (error) {
    console.error('Research Platform Status Error:', error);
    
    return NextResponse.json({
      timestamp: Date.now(),
      platform: 'Lotus Research Platform',
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
} 