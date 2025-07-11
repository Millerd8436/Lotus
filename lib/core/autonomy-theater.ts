"use client";

import React from "react";
import { useEducation } from "../providers/EducationProvider";
import { useSimulation } from "../providers/SimulationProvider";
import CardSkeleton from '../ui/CardSkeleton';
import EthicalFrameworksExplainer from './EthicalFrameworksExplainer';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";

/**
 * ReflectionDashboard - Phase 3 comprehensive analysis and educational insights.
 * Implements UI streaming with React Suspense to show a loading skeleton
 * while data-heavy components are fetched and rendered on the server.
 */
const ReflectionDashboard: React.FC = () => {
  const { getSimulationReport } = useSimulation();
  const { getProgressReport } = useEducation();

  const simulationReport = getSimulationReport();
  const progressReport = getProgressReport();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <h1 className="text-2xl font-bold">Reflection Dashboard</h1>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              {/* These cards are static and load instantly */}
              <Card>
                <CardHeader>
                  <CardTitle>Phase 1: Exploitative</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>A simulation of a predatory payday loan website.</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Phase 2: Ethical</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>An ethical alternative with transparent terms.</p>
                </CardContent>
              </Card>
               {/* This card's content will be streamed */}
              <Card>
                <CardHeader>
                  <CardTitle>Ethical Frameworks</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<CardSkeleton />}>
                    <EthicalFrameworksExplainer />
                  </Suspense>
                </CardContent>
              </Card>
               {/* This card could also be streamed */}
               <Card>
                <CardHeader>
                  <CardTitle>Autonomy Report</CardTitle>
                </CardHeader>
                <CardContent>
                   <Suspense fallback={<CardSkeleton />}>
                    {/* <AutonomyReport report={autonomyReport} /> */}
                    <div className="text-sm text-gray-500">Analysis pending...</div>
                   </Suspense>
                </CardContent>
              </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
               {/* This card's content will be streamed */}
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Behavioral Analysis</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <Suspense fallback={<CardSkeleton />}>
                    {/* <BehavioralAnalysis report={simulationReport} /> */}
                    <div className="text-sm text-gray-500">Behavioral analysis loading...</div>
                  </Suspense>
                </CardContent>
              </Card>
               {/* This card's content will be streamed */}
              <Card className="col-span-3">
                <CardHeader>
                  <CardTitle>Educational Progress</CardTitle>
                  <CardDescription>
                    Your journey to financial empowerment.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                   <Suspense fallback={<CardSkeleton />}>
                    {/* <EducationalContent progress={progressReport} /> */}
                     <div className="text-sm text-gray-500">Progress report loading...</div>
                   </Suspense>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReflectionDashboard;
