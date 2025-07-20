"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const phases = [
    {
      id: 1,
      title: "Phase 1: Exploitative Experience",
      subtitle: "Experience predatory lending tactics",
      description:
        "See how payday lenders use dark patterns, hidden fees, and psychological manipulation to trap borrowers in debt cycles.",
      color: "border-red-500 bg-red-50",
      buttonColor: "bg-red-600 hover:bg-red-700",
      route: "/exploitative",
    },
    {
      id: 2,
      title: "Phase 2: Retrospective Analysis",
      subtitle: "Analyze what happened",
      description:
        "Review your experience with a Kantian ethical framework. Identify dark patterns and understand the manipulation tactics used.",
      color: "border-yellow-500 bg-yellow-50",
      buttonColor: "bg-yellow-600 hover:bg-yellow-700",
      route: "/reflection",
    },
    {
      id: 3,
      title: "Phase 3: Live Annotation",
      subtitle: "Learn in real-time",
      description:
        "Experience the same loan process with live annotations that expose each manipulation tactic as it happens.",
      color: "border-blue-500 bg-blue-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      route: "/teaching",
    },
    {
      id: 4,
      title: "Phase 4: Ethical Redesign",
      subtitle: "See the alternative",
      description:
        "Experience how lending should work: transparent, fair, and respectful. Based on Kantian ethics and consumer protection principles.",
      color: "border-green-500 bg-green-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      route: "/ethical",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Lotus Educational Platform
            </h1>
            <p className="text-xl text-gray-600">
              Understanding Predatory Lending Through Interactive Simulation
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Choose Your Learning Path
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            This educational platform demonstrates the contrast between
            predatory and ethical lending practices. Each phase builds on the
            previous one to create a comprehensive understanding.
          </p>
        </div>

        {/* Phase Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {phases.map((phase) => (
            <Card
              key={phase.id}
              className={`p-8 border-2 ${phase.color} hover:shadow-xl transition-shadow`}
            >
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">{phase.title}</h3>
                  <span className="text-4xl font-bold text-gray-300">
                    {phase.id}
                  </span>
                </div>
                <p className="text-lg font-semibold text-gray-700">
                  {phase.subtitle}
                </p>
              </div>

              <p className="text-gray-600 mb-6 min-h-[60px]">
                {phase.description}
              </p>

              <Button
                size="lg"
                className={`w-full ${phase.buttonColor} text-white`}
                onClick={() => router.push(phase.route)}
              >
                Start {phase.title.split(":")[0]} →
              </Button>
            </Card>
          ))}
        </div>

        {/* Educational Notice */}
        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6 text-center">
          <p className="text-sm font-semibold text-yellow-800 mb-2">
            ⚠️ Educational Simulation Notice
          </p>
          <p className="text-sm text-gray-700">
            This is an educational platform designed to teach about predatory
            lending practices. No real loans are offered or processed. Always
            consult qualified financial advisors for real financial decisions.
          </p>
        </div>

        {/* Quick Start Guide */}
        <div className="mt-12 text-center">
          <h3 className="text-lg font-bold mb-4">Recommended Learning Path</h3>
          <div className="flex justify-center items-center space-x-4">
            <div className="bg-red-100 px-4 py-2 rounded-full">Phase 1</div>
            <span>→</span>
            <div className="bg-yellow-100 px-4 py-2 rounded-full">Phase 2</div>
            <span>→</span>
            <div className="bg-blue-100 px-4 py-2 rounded-full">Phase 3</div>
            <span>→</span>
            <div className="bg-green-100 px-4 py-2 rounded-full">Phase 4</div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Complete all phases for the full educational experience
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-8 bg-gray-100 border-t">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          <p className="mb-2">
            Created for educational purposes to expose predatory lending
            practices
          </p>
          <p>
            If you need real financial help, please contact a nonprofit credit
            counseling agency
          </p>
        </div>
      </footer>
    </div>
  );
}
