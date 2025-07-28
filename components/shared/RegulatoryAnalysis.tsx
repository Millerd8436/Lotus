"use client";

import {
  AlertTriangle,
  Ban,
  FileText,
  Gavel,
  MapPin,
  Scale,
  Shield,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./Button";
import { Card } from "./Card";

interface StateRegulation {
  state: string;
  usuryCapAPR: number | null;
  paydayStatus: "legal" | "prohibited" | "restricted";
  rentABankVulnerable: boolean;
  cfpbEnforcementActions: number;
  consumerProtections: string[];
  loopholes: string[];
  maddenImpact: "high" | "medium" | "low";
}

interface RegulatoryCase {
  id: string;
  name: string;
  year: number;
  impact: string;
  description: string;
  exploitedBy: string[];
}

export function RegulatoryAnalysis() {
  const [selectedState, setSelectedState] = useState<string>("CA");
  const [simulationMode, setSimulationMode] = useState<
    "madden" | "colorado" | "cfpb" | "rentabank"
  >("madden");

  // Key regulatory cases and their impacts
  const regulatoryCases: RegulatoryCase[] = [
    {
      id: "madden_v_midland",
      name: "Madden v. Midland Funding",
      year: 2015,
      impact: "Created uncertainty about valid-when-made doctrine",
      description:
        "Second Circuit ruled that non-bank debt buyers cannot charge interest rates that would violate state usury laws, even if the original bank could",
      exploitedBy: [
        "Rent-a-bank schemes",
        "Offshore lenders",
        "Fintech partnerships",
      ],
    },
    {
      id: "colorado_optout",
      name: "Colorado Opt-Out Law",
      year: 2023,
      impact: "Allows banks to opt out of state interest rate caps",
      description:
        "Banks can export their home state rates to Colorado if they opt out of state consumer protections",
      exploitedBy: ["WebBank", "Cross River Bank", "Celtic Bank"],
    },
    {
      id: "cfpb_small_dollar",
      name: "CFPB Small Dollar Rule (Rescinded)",
      year: 2020,
      impact: "Removed ability-to-repay requirements",
      description:
        "Trump administration removed underwriting requirements for payday loans",
      exploitedBy: [
        "All major payday lenders",
        "Online lenders",
        "Tribal lenders",
      ],
    },
  ];

  // State-by-state regulations (2025 data)
  const stateRegulations: Record<string, StateRegulation> = {
    CA: {
      state: "California",
      usuryCapAPR: 36,
      paydayStatus: "restricted",
      rentABankVulnerable: true,
      cfpbEnforcementActions: 47,
      consumerProtections: [
        "APR cap at 36% for loans under $10,000",
        "Cooling-off period between loans",
        "Database to track borrowing",
      ],
      loopholes: [
        "Loans over $10,000 uncapped",
        "Rent-a-bank partnerships legal",
        "Open-end credit lines exempt",
      ],
      maddenImpact: "high",
    },
    TX: {
      state: "Texas",
      usuryCapAPR: null,
      paydayStatus: "legal",
      rentABankVulnerable: false,
      cfpbEnforcementActions: 12,
      consumerProtections: [
        "Municipal ordinances in some cities",
        "Disclosure requirements",
      ],
      loopholes: [
        "No state APR cap",
        "Credit Service Organizations (CSO) model",
        "No cooling-off period",
        "Unlimited rollovers",
      ],
      maddenImpact: "low",
    },
    NY: {
      state: "New York",
      usuryCapAPR: 16,
      paydayStatus: "prohibited",
      rentABankVulnerable: true,
      cfpbEnforcementActions: 89,
      consumerProtections: [
        "Criminal usury at 25% APR",
        "Strong enforcement",
        "Unlicensed lending prohibited",
      ],
      loopholes: [
        "Madden ruling creates uncertainty",
        "Tribal lender claims of immunity",
        "Offshore online lenders",
      ],
      maddenImpact: "high",
    },
    UT: {
      state: "Utah",
      usuryCapAPR: null,
      paydayStatus: "legal",
      rentABankVulnerable: false,
      cfpbEnforcementActions: 3,
      consumerProtections: [
        "Extended payment plan option",
        "Notice before default",
      ],
      loopholes: [
        "No APR cap",
        "Home to rent-a-bank partners",
        "Minimal regulations",
        "No database tracking",
      ],
      maddenImpact: "low",
    },
    CO: {
      state: "Colorado",
      usuryCapAPR: 36,
      paydayStatus: "restricted",
      rentABankVulnerable: true,
      cfpbEnforcementActions: 21,
      consumerProtections: [
        "36% APR cap since 2018",
        "Minimum 6-month term",
        "No balloon payments",
      ],
      loopholes: [
        "Bank opt-out provision (2023)",
        "Fintech partnership gray area",
        "Merchant cash advances exempt",
      ],
      maddenImpact: "medium",
    },
  };

  const currentState = stateRegulations[selectedState];

  // Simulate different regulatory scenarios
  const simulateScenario = (scenario: string) => {
    switch (scenario) {
      case "madden":
        return {
          title: "Madden v. Midland Impact Simulation",
          description: "How debt buyers exploit regulatory uncertainty",
          tactics: [
            "Originate loans through Utah bank at 189% APR",
            "Immediately sell to non-bank entity",
            "Continue charging 189% in states with 36% caps",
            'Claim "valid-when-made" protection',
            "Threaten litigation against consumers who challenge rates",
          ],
          defense:
            "Some courts reject this, others allow it - creating a patchwork of enforcement",
        };

      case "colorado":
        return {
          title: "Colorado Opt-Out Exploitation",
          description: "How banks bypass state consumer protections",
          tactics: [
            "Utah bank opts out of Colorado rate caps",
            "Partners with fintech to originate 150% APR loans",
            "Exports Utah's non-existent rate cap to Colorado",
            "Bypasses Colorado's 36% APR law entirely",
            "Markets aggressively to Colorado residents",
          ],
          defense: "Colorado legislature considering closing this loophole",
        };

      case "cfpb":
        return {
          title: "CFPB Enforcement Gaps",
          description: "Areas where federal oversight fails",
          tactics: [
            "Tribal lenders claim sovereign immunity",
            "Offshore lenders ignore US laws",
            "Rent-a-bank schemes in regulatory gray area",
            "Small dollar lenders under $1M volume fly under radar",
            "State-chartered lenders avoid federal oversight",
          ],
          defense: "State attorneys general must fill enforcement gap",
        };

      case "rentabank":
        return {
          title: "Rent-a-Bank Scheme Mechanics",
          description: "Step-by-step exploitation of banking laws",
          tactics: [
            "Non-bank lender partners with FDIC bank",
            'Bank "originates" loan for 1-2 days',
            "Loan immediately sold to non-bank partner",
            "Non-bank services loan at bank's home state rate",
            "Evades borrower's state usury laws completely",
          ],
          defense: "True Lender doctrine challenges, but enforcement varies",
        };
    }
  };

  const currentSimulation = simulateScenario(simulationMode);

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Scale className="w-6 h-6 text-purple-600" />
          Regulatory Analysis: How Lenders Exploit Legal Loopholes (2025)
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          Understanding how predatory lenders circumvent consumer protection
          laws through regulatory arbitrage, court rulings, and legislative
          gaps.
        </p>
      </Card>

      {/* State Selector */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          State-by-State Analysis
        </h3>

        <div className="flex gap-2 mb-6 flex-wrap">
          {Object.keys(stateRegulations).map((state) => (
            <Button
              key={state}
              variant={selectedState === state ? "default" : "outline"}
              onClick={() => setSelectedState(state)}
              size="sm"
            >
              {state}
            </Button>
          ))}
        </div>

        {/* State Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">
              {currentState.state} Overview
            </h4>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <span className="font-medium">Usury Cap</span>
                <span
                  className={
                    currentState.usuryCapAPR ? "text-green-600" : "text-red-600"
                  }
                >
                  {currentState.usuryCapAPR
                    ? `${currentState.usuryCapAPR}% APR`
                    : "NO CAP ⚠️"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <span className="font-medium">Payday Loan Status</span>
                <span
                  className={`capitalize ${
                    currentState.paydayStatus === "prohibited"
                      ? "text-green-600"
                      : currentState.paydayStatus === "restricted"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {currentState.paydayStatus}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <span className="font-medium">Rent-a-Bank Risk</span>
                <span
                  className={
                    currentState.rentABankVulnerable
                      ? "text-red-600"
                      : "text-green-600"
                  }
                >
                  {currentState.rentABankVulnerable
                    ? "VULNERABLE"
                    : "Protected"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <span className="font-medium">CFPB Actions</span>
                <span>{currentState.cfpbEnforcementActions}</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-gray-100 dark:bg-gray-800 rounded">
                <span className="font-medium">Madden Impact</span>
                <span
                  className={`capitalize ${
                    currentState.maddenImpact === "high"
                      ? "text-red-600"
                      : currentState.maddenImpact === "medium"
                      ? "text-yellow-600"
                      : "text-green-600"
                  }`}
                >
                  {currentState.maddenImpact}
                </span>
              </div>
            </div>
          </div>

          <div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-600" />
                Consumer Protections
              </h4>
              <ul className="space-y-1">
                {currentState.consumerProtections.map((protection, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-green-600 mt-0.5">✓</span>
                    <span>{protection}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                Legal Loopholes
              </h4>
              <ul className="space-y-1">
                {currentState.loopholes.map((loophole, i) => (
                  <li key={i} className="text-sm flex items-start gap-2">
                    <span className="text-red-600 mt-0.5">⚠</span>
                    <span>{loophole}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Card>

      {/* Regulatory Exploitation Simulations */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Gavel className="w-5 h-5" />
          Regulatory Exploitation Simulator
        </h3>

        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={simulationMode === "madden" ? "default" : "outline"}
            onClick={() => setSimulationMode("madden")}
            size="sm"
          >
            Madden Ruling
          </Button>
          <Button
            variant={simulationMode === "colorado" ? "default" : "outline"}
            onClick={() => setSimulationMode("colorado")}
            size="sm"
          >
            Colorado Opt-Out
          </Button>
          <Button
            variant={simulationMode === "cfpb" ? "default" : "outline"}
            onClick={() => setSimulationMode("cfpb")}
            size="sm"
          >
            CFPB Gaps
          </Button>
          <Button
            variant={simulationMode === "rentabank" ? "default" : "outline"}
            onClick={() => setSimulationMode("rentabank")}
            size="sm"
          >
            Rent-a-Bank
          </Button>
        </div>

        {currentSimulation && (
          <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
            <h4 className="font-bold text-lg mb-2">
              {currentSimulation.title}
            </h4>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {currentSimulation.description}
            </p>

            <div className="mb-4">
              <h5 className="font-semibold mb-2">Exploitation Tactics:</h5>
              <ol className="space-y-2">
                {currentSimulation.tactics.map((tactic, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <span className="font-bold text-red-600">{i + 1}.</span>
                    <span>{tactic}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="bg-yellow-100 dark:bg-yellow-900/20 p-3 rounded">
              <strong>Legal Defense Status:</strong> {currentSimulation.defense}
            </div>
          </div>
        )}
      </Card>

      {/* Major Cases Timeline */}
      <Card className="p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Major Regulatory Cases & Their Exploitation
        </h3>

        <div className="space-y-4">
          {regulatoryCases.map((case_) => (
            <div key={case_.id} className="border-l-4 border-purple-500 pl-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-bold">
                    {case_.name} ({case_.year})
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {case_.description}
                  </p>
                  <p className="text-sm font-semibold text-red-600 mt-2">
                    Impact: {case_.impact}
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <span className="text-xs text-gray-500">Exploited by: </span>
                {case_.exploitedBy.map((exploiter, i) => (
                  <span
                    key={i}
                    className="text-xs bg-red-100 dark:bg-red-900/20 px-2 py-1 rounded mr-1"
                  >
                    {exploiter}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Call to Action */}
      <Card className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Ban className="w-5 h-5" />
          How to Fight Back
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <h4 className="font-semibold mb-2">For Consumers:</h4>
            <ul className="text-sm space-y-1">
              <li>• Report violations to CFPB and state AG</li>
              <li>• Document all loan terms and communications</li>
              <li>• Seek legal aid for usury violations</li>
              <li>• Support state legislation for APR caps</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-2">For Advocates:</h4>
            <ul className="text-sm space-y-1">
              <li>• Push for federal 36% APR cap</li>
              <li>• Support True Lender doctrine</li>
              <li>• Advocate for CFPB funding</li>
              <li>• Expose rent-a-bank schemes</li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => alert("File a CFPB complaint")}
          >
            File CFPB Complaint
          </Button>
          <Button
            variant="secondary"
            onClick={() => alert("Contact your state attorney general")}
          >
            Contact State AG
          </Button>
        </div>
      </Card>
    </div>
  );
}
