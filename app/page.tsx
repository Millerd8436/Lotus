"use client";

import {
  LazyPhase1ExploitativeWebsite,
  LazyPhase2EthicalWebsite,
  LazyReflectionDashboard,
} from "@/components/LazyLoadComponents";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  AnimatedCounter,
  ProgressBar,
  Tooltip,
} from "@/components/ui/InteractiveElements";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Suspense, useEffect, useState } from "react";

// Main App Component
export default function Home() {
  // const router = useRouter(); // Removed unused variable
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(1);
  const [progress, setProgress] = useState(0);

  // Simulate loading and progress
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handlePhaseChange = (phase: number) => {
    setCurrentPhase(phase);
    setIsLoading(true);
    setProgress(0);

    // Simulate loading for phase change
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  const phases = [
    {
      id: 1,
      title: "Professional Predatory Interface",
      subtitle: "Experience realistic payday loan websites",
      description:
        "Navigate through authentic predatory lending interfaces with industry-standard dark patterns and deceptive practices.",
      icon: "🏦",
      color: "from-red-500 to-orange-500",
      features: [
        "Realistic fee presentation",
        "Hidden APR calculations",
        "Urgency tactics",
        "ACH exploitation",
        "Rollover traps",
      ],
    },
    {
      id: 2,
      title: "Ethical Alternative Interface",
      subtitle: "Discover transparent lending alternatives",
      description:
        "Explore ethical lending practices with complete transparency, fair pricing, and consumer protection features.",
      icon: "✨",
      color: "from-green-500 to-emerald-500",
      features: [
        "Transparent pricing",
        "Fair APR disclosure",
        "Alternative suggestions",
        "Educational resources",
        "Consumer protections",
      ],
    },
    {
      id: 3,
      title: "Analysis & Education",
      subtitle: "Comprehensive behavioral analysis",
      description:
        "Deep dive into behavioral patterns, dark pattern recognition, and educational content about predatory lending.",
      icon: "📊",
      color: "from-blue-500 to-indigo-500",
      features: [
        "Behavioral analysis",
        "Dark pattern education",
        "Vulnerability assessment",
        "Comparison tools",
        "Research insights",
      ],
    },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-white">
        <div className="text-center">
          <LoadingSpinner
            size="xl"
            theme="neutral"
            message="Loading Lotus Simulator..."
            showProgress={true}
            progress={progress}
          />
          <div className="mt-8 max-w-md mx-auto">
            <ProgressBar
              progress={progress}
              theme="neutral"
              showLabel={true}
              animated={true}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              Lotus Simulator
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Comprehensive Educational Platform for Understanding Predatory
              Lending Practices
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Tooltip
                content="Start your educational journey through predatory lending simulation"
                theme="analysis"
              >
                <Button
                  variant="professional"
                  size="lg"
                  onClick={() => handlePhaseChange(1)}
                  className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                >
                  🏦 Start Phase 1: Predatory Interface
                </Button>
              </Tooltip>
              <Tooltip
                content="Learn about ethical alternatives and consumer protection"
                theme="ethical"
              >
                <Button
                  variant="professional"
                  size="lg"
                  onClick={() => handlePhaseChange(2)}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                >
                  ✨ Start Phase 2: Ethical Alternatives
                </Button>
              </Tooltip>
            </div>
          </div>
        </div>
      </section>

      {/* Phase Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Three-Phase Educational Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience the complete spectrum from predatory practices to
              ethical alternatives, followed by comprehensive analysis and
              education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {phases.map((phase, index) => (
              <Card
                key={phase.id}
                variant={
                  index === 0
                    ? "dark-pattern"
                    : index === 1
                      ? "ethical"
                      : "success"
                }
                size="lg"
                interactive={true}
                onClick={() => handlePhaseChange(phase.id)}
                className="transform hover:scale-105 transition-all duration-300 cursor-pointer"
              >
                <div className="text-center p-6">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-2xl`}
                  >
                    {phase.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">
                    {phase.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-4">
                    {phase.subtitle}
                  </p>
                  <p className="text-slate-700 mb-6">{phase.description}</p>
                  <div className="space-y-2">
                    {phase.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center text-sm text-slate-600"
                      >
                        <span className="w-2 h-2 bg-slate-400 rounded-full mr-3"></span>
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    variant="professional"
                    size="md"
                    className="mt-6 w-full"
                    onClick={() => {
                      handlePhaseChange(phase.id);
                    }}
                  >
                    Explore Phase {phase.id}
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Educational Impact
            </h2>
            <p className="text-lg text-slate-600">
              Real statistics about payday loan harm and the importance of
              consumer education
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <AnimatedCounter
                value={391}
                theme="exploitative"
                suffix="%"
                className="text-4xl font-bold block mb-2"
              />
              <p className="text-slate-600">Average Payday Loan APR</p>
            </div>
            <div className="text-center">
              <AnimatedCounter
                value={12}
                theme="exploitative"
                suffix=" million"
                className="text-4xl font-bold block mb-2"
              />
              <p className="text-slate-600">
                Americans Use Payday Loans Annually
              </p>
            </div>
            <div className="text-center">
              <AnimatedCounter
                value={80}
                theme="exploitative"
                suffix="%"
                className="text-4xl font-bold block mb-2"
              />
              <p className="text-slate-600">Rollover Rate (Industry Average)</p>
            </div>
            <div className="text-center">
              <AnimatedCounter
                value={520}
                theme="exploitative"
                prefix="$"
                className="text-4xl font-bold block mb-2"
              />
              <p className="text-slate-600">Average Fee for $300 Loan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Phase Display */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Current Phase: {phases[currentPhase - 1]?.title}
            </h2>
            <ProgressBar
              progress={(currentPhase / 3) * 100}
              theme="neutral"
              showLabel={true}
              animated={true}
              className="max-w-md mx-auto"
            />
          </div>

          <Suspense
            fallback={
              <div className="flex justify-center">
                <LoadingSpinner
                  size="lg"
                  theme="professional"
                  message="Loading phase content..."
                />
              </div>
            }
          >
            {currentPhase === 1 && <LazyPhase1ExploitativeWebsite />}
            {currentPhase === 2 && <LazyPhase2EthicalWebsite />}
            {currentPhase === 3 && <LazyReflectionDashboard />}
          </Suspense>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Experience the Full Educational Journey?
          </h2>
          <p className="text-xl text-slate-300 mb-8">
            Navigate through all three phases to gain comprehensive
            understanding of predatory lending practices, ethical alternatives,
            and behavioral analysis.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="professional"
              size="lg"
              onClick={() => handlePhaseChange(1)}
              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              🏦 Start Phase 1: Predatory Interface
            </Button>
            <Button
              variant="professional"
              size="lg"
              onClick={() => handlePhaseChange(2)}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              ✨ Start Phase 2: Ethical Alternatives
            </Button>
            <Button
              variant="professional"
              size="lg"
              onClick={() => handlePhaseChange(3)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              📊 Start Phase 3: Analysis & Education
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
