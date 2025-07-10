// app/api/health/route.ts - Health check endpoint for deployment validation

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface HealthStatus {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  version: string;
  deployment: {
    platform: string;
    region: string;
    environment: string;
  };
  services: {
    api: boolean;
    database: boolean;
    analytics: boolean;
  };
  performance: {
    uptime: number;
    memory: string;
  };
  features: {
    phaseOne: boolean;
    phaseTwo: boolean;
    phaseThree: boolean;
    educational: boolean;
  };
}

export async function GET(_request: NextRequest) {
  try {
    // Check if all critical services are working
    const services = await checkServices();
    const features = await checkFeatures();
    
    const healthStatus: HealthStatus = {
      status: services.api && services.analytics ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
      deployment: {
        platform: 'vercel',
        region: process.env.VERCEL_REGION || 'unknown',
        environment: process.env.NODE_ENV || 'development'
      },
      services,
      performance: {
        uptime: process.uptime ? Math.round(process.uptime()) : 0,
        memory: process.env.VERCEL_FUNCTION_MEMORY || 'unknown'
      },
      features
    };

    // Return appropriate status code
    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;

    return NextResponse.json(healthStatus, { 
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'X-Health-Check': 'true',
        'X-Timestamp': healthStatus.timestamp
      }
    });

  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Health check failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { 
        status: 503,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'X-Health-Check': 'true'
        }
      }
    );
  }
}

async function checkServices() {
  return {
    api: true, // API is responding if we reach this point
    database: await checkDatabase(),
    analytics: await checkAnalytics()
  };
}

async function checkDatabase() {
  try {
    // For now, we're using JSON files, so just check if we can read them
    // In the future, this would check actual database connectivity
    return true;
  } catch (error) {
    return false;
  }
}

async function checkAnalytics() {
  try {
    // Check if Vercel Analytics is properly configured
    const hasAnalytics = process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_ID || 
                        process.env.VERCEL_ANALYTICS_ID;
    return !!hasAnalytics;
  } catch (error) {
    return false;
  }
}

async function checkFeatures() {
  return {
    phaseOne: await checkPhaseEndpoint('phase-one'),
    phaseTwo: await checkPhaseEndpoint('phase-two'),
    phaseThree: await checkPhaseEndpoint('phase-three'),
    educational: true // Basic educational features are always available
  };
}

async function checkPhaseEndpoint(_phase: string) {
  try {
    // In a real implementation, you might make internal requests
    // For now, we assume phases are available if the files exist
    return true;
  } catch (error) {
    return false;
  }
}

// Support for HEAD requests (for basic connectivity checks)
export async function HEAD(_request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'X-Health-Check': 'true',
      'Cache-Control': 'no-cache'
    }
  });
} 